import {
  DeliveryType,
  OrderStatus,
  Prisma,
  type PrismaClient,
} from "@prisma/client";

import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { buildPaginationMeta, getPaginationParams } from "../../utils/pagination";
import {
  calculateRentalOrderTotals,
  toOrderBoundaryDates,
  validateEquipmentAvailability,
} from "./rentalOrders.calculator";
import {
  applyInventoryChangesOnStatusChange,
  validateStatusTransition,
} from "./rentalOrders.status";
import type {
  AdminRentalOrderSortBy,
  RentalOrderActor,
  RentalOrderSortBy,
} from "./rentalOrders.types";
import type {
  AdminRentalOrdersQueryInput,
  CalculateRentalOrderInput,
  CreateRentalOrderInput,
  MyRentalOrdersQueryInput,
  UpdateRentalOrderCommentInput,
  UpdateRentalOrderStatusInput,
} from "./rentalOrders.validators";

type DatabaseClient = PrismaClient | Prisma.TransactionClient;

const rentalOrderInclude = {
  user: {
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
    },
  },
  items: {
    orderBy: {
      createdAt: "asc",
    },
    include: {
      equipment: {
        select: {
          id: true,
          name: true,
          slug: true,
          brand: true,
          model: true,
          status: true,
          quantityAvailable: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          images: {
            take: 1,
            orderBy: {
              sortOrder: "asc",
            },
            select: {
              id: true,
              url: true,
              alt: true,
              sortOrder: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.RentalOrderInclude;

type RentalOrderWithRelations = Prisma.RentalOrderGetPayload<{
  include: typeof rentalOrderInclude;
}>;

function mapSortOrder<TField extends string>(
  sortBy: TField,
  sortOrder: "asc" | "desc",
) {
  return {
    [sortBy]: sortOrder,
  } as Record<TField, "asc" | "desc">;
}

function serializeRentalOrder(order: RentalOrderWithRelations) {
  return {
    id: order.id,
    userId: order.userId,
    orderNumber: order.orderNumber,
    status: order.status,
    startDate: order.startDate,
    endDate: order.endDate,
    daysCount: order.items[0]?.daysCount ?? 1,
    deliveryType: order.deliveryType,
    deliveryAddress: order.deliveryAddress,
    customerComment: order.customerComment,
    managerComment: order.managerComment,
    subtotal: Number(order.subtotal),
    depositTotal: Number(order.depositTotal),
    deliveryPrice: Number(order.deliveryPrice),
    totalPrice: Number(order.totalPrice),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    user: order.user,
    items: order.items.map((item) => ({
      id: item.id,
      equipmentId: item.equipmentId,
      quantity: item.quantity,
      dailyPrice: Number(item.dailyPrice),
      daysCount: item.daysCount,
      lineTotal: Number(item.lineTotal),
      equipment: {
        id: item.equipment.id,
        name: item.equipment.name,
        slug: item.equipment.slug,
        brand: item.equipment.brand,
        model: item.equipment.model,
        status: item.equipment.status,
        quantityAvailable: item.equipment.quantityAvailable,
        category: item.equipment.category,
        mainImage: item.equipment.images[0] ?? null,
      },
    })),
  };
}

function buildMyOrdersWhere(
  actor: RentalOrderActor,
  query: MyRentalOrdersQueryInput,
): Prisma.RentalOrderWhereInput {
  const where: Prisma.RentalOrderWhereInput = {
    userId: actor.userId,
  };

  if (query.status) {
    where.status = query.status;
  }

  return where;
}

function buildAdminOrdersWhere(
  query: AdminRentalOrdersQueryInput,
): Prisma.RentalOrderWhereInput {
  const where: Prisma.RentalOrderWhereInput = {};

  if (query.status) {
    where.status = query.status;
  }

  if (query.search) {
    where.OR = [
      {
        orderNumber: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        user: {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      },
      {
        user: {
          fullName: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  if (query.startDateFrom || query.startDateTo) {
    where.startDate = {};

    if (query.startDateFrom) {
      where.startDate.gte = toOrderBoundaryDates(
        query.startDateFrom,
        query.startDateFrom,
      ).start;
    }

    if (query.startDateTo) {
      where.startDate.lte = toOrderBoundaryDates(
        query.startDateTo,
        query.startDateTo,
      ).end;
    }
  }

  return where;
}

async function ensureRentalOrderExists(
  db: DatabaseClient,
  id: string,
) {
  const order = await db.rentalOrder.findUnique({
    where: { id },
    include: rentalOrderInclude,
  });

  if (!order) {
    throw new ApiError(404, "Rental order not found");
  }

  return order;
}

async function prepareRentalOrderCalculation(
  db: DatabaseClient,
  input: Pick<
    CreateRentalOrderInput,
    "startDate" | "endDate" | "deliveryType" | "items"
  >,
) {
  const validatedItems = await validateEquipmentAvailability(db, input.items);
  return calculateRentalOrderTotals(
    validatedItems,
    input.startDate,
    input.endDate,
    input.deliveryType,
  );
}

function formatOrderDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}${month}${day}`;
}

async function generateOrderNumber(tx: Prisma.TransactionClient) {
  const prefix = `BR-${formatOrderDateKey(new Date())}`;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const suffix = `${Math.floor(1000 + Math.random() * 9000)}`;
    const orderNumber = `${prefix}-${suffix}`;
    const existing = await tx.rentalOrder.findUnique({
      where: {
        orderNumber,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return orderNumber;
    }
  }

  throw new ApiError(500, "Unable to generate a unique order number");
}

function getStatusUpdateData(
  payload:
    | UpdateRentalOrderStatusInput
    | UpdateRentalOrderCommentInput,
) {
  if (!("managerComment" in payload)) {
    return {};
  }

  return {
    managerComment: payload.managerComment,
  };
}

export async function calculateRentalOrder(
  input: CalculateRentalOrderInput,
) {
  return prepareRentalOrderCalculation(prisma, input);
}

export async function createRentalOrder(
  actor: RentalOrderActor,
  input: CreateRentalOrderInput,
) {
  const { start, end } = toOrderBoundaryDates(input.startDate, input.endDate);

  const order = await prisma.$transaction(async (tx) => {
    const totals = await prepareRentalOrderCalculation(tx, input);
    const orderNumber = await generateOrderNumber(tx);

    return tx.rentalOrder.create({
      data: {
        userId: actor.userId,
        orderNumber,
        status: OrderStatus.PENDING,
        startDate: start,
        endDate: end,
        deliveryType: input.deliveryType,
        deliveryAddress:
          input.deliveryType === DeliveryType.DELIVERY
            ? (input.deliveryAddress ?? null)
            : null,
        customerComment: input.customerComment ?? null,
        subtotal: totals.subtotal,
        depositTotal: totals.depositTotal,
        deliveryPrice: totals.deliveryPrice,
        totalPrice: totals.totalPrice,
        items: {
          create: totals.items.map((item) => ({
            equipmentId: item.equipmentId,
            quantity: item.quantity,
            dailyPrice: item.dailyPrice,
            daysCount: item.daysCount,
            lineTotal: item.lineTotal,
          })),
        },
      },
      include: rentalOrderInclude,
    });
  });

  return serializeRentalOrder(order);
}

export async function listMyRentalOrders(
  actor: RentalOrderActor,
  query: MyRentalOrdersQueryInput,
) {
  const where = buildMyOrdersWhere(actor, query);
  const { page, limit, skip } = getPaginationParams(query);
  const orderBy = mapSortOrder<RentalOrderSortBy>(query.sortBy, query.sortOrder);

  const [items, total] = await Promise.all([
    prisma.rentalOrder.findMany({
      where,
      include: rentalOrderInclude,
      skip,
      take: limit,
      orderBy,
    }),
    prisma.rentalOrder.count({ where }),
  ]);

  return {
    items: items.map(serializeRentalOrder),
    pagination: buildPaginationMeta({ page, limit, total }),
  };
}

export async function getRentalOrderForActor(
  id: string,
  actor: RentalOrderActor,
) {
  const order = await ensureRentalOrderExists(prisma, id);

  if (actor.role !== "ADMIN" && order.userId !== actor.userId) {
    throw new ApiError(403, "You do not have permission to view this rental order");
  }

  return serializeRentalOrder(order);
}

export async function cancelRentalOrder(
  id: string,
  actor: RentalOrderActor,
) {
  return prisma.$transaction(async (tx) => {
    const order = await ensureRentalOrderExists(tx, id);

    if (actor.role !== "ADMIN" && order.userId !== actor.userId) {
      throw new ApiError(403, "You do not have permission to cancel this rental order");
    }

    validateStatusTransition(order.status, OrderStatus.CANCELLED);
    await applyInventoryChangesOnStatusChange(tx, order, OrderStatus.CANCELLED);

    const updated = await tx.rentalOrder.update({
      where: { id },
      data: {
        status: OrderStatus.CANCELLED,
      },
      include: rentalOrderInclude,
    });

    return serializeRentalOrder(updated);
  });
}

export async function listAdminRentalOrders(
  query: AdminRentalOrdersQueryInput,
) {
  const where = buildAdminOrdersWhere(query);
  const { page, limit, skip } = getPaginationParams(query);
  const orderBy = mapSortOrder<AdminRentalOrderSortBy>(
    query.sortBy,
    query.sortOrder,
  );

  const [items, total] = await Promise.all([
    prisma.rentalOrder.findMany({
      where,
      include: rentalOrderInclude,
      skip,
      take: limit,
      orderBy,
    }),
    prisma.rentalOrder.count({ where }),
  ]);

  return {
    items: items.map(serializeRentalOrder),
    pagination: buildPaginationMeta({ page, limit, total }),
  };
}

export async function getAdminRentalOrderById(id: string) {
  const order = await ensureRentalOrderExists(prisma, id);
  return serializeRentalOrder(order);
}

export async function updateRentalOrderStatus(
  id: string,
  input: UpdateRentalOrderStatusInput,
) {
  return prisma.$transaction(async (tx) => {
    const order = await ensureRentalOrderExists(tx, id);

    validateStatusTransition(order.status, input.status);
    await applyInventoryChangesOnStatusChange(tx, order, input.status);

    const updated = await tx.rentalOrder.update({
      where: { id },
      data: {
        status: input.status,
        ...getStatusUpdateData(input),
      },
      include: rentalOrderInclude,
    });

    return serializeRentalOrder(updated);
  });
}

export async function updateRentalOrderComment(
  id: string,
  input: UpdateRentalOrderCommentInput,
) {
  const existingOrder = await prisma.rentalOrder.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existingOrder) {
    throw new ApiError(404, "Rental order not found");
  }

  const updated = await prisma.rentalOrder.update({
    where: { id },
    data: {
      ...getStatusUpdateData(input),
    },
    include: rentalOrderInclude,
  });

  return serializeRentalOrder(updated);
}

export function describeInventoryStrategy() {
  return {
    pending: "PENDING orders do not reserve stock yet.",
    approved: "APPROVED reserves inventory by decrementing quantityAvailable.",
    active: "ACTIVE keeps the reservation without additional inventory changes.",
    cancelledOrRejected:
      "CANCELLED and REJECTED do not hold inventory. APPROVED -> CANCELLED returns stock.",
    completed:
      "ACTIVE -> COMPLETED returns quantityAvailable because the equipment is considered returned.",
  };
}
