import {
  OrderStatus,
  ReportFormat,
  ReportType,
  type Prisma,
} from "@prisma/client";
import path from "node:path";

import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import {
  buildStoredReportFileName,
  deleteStoredReportFile,
  reportFileExists,
  resolveStoredFilePath,
  saveReportBuffer,
} from "../../utils/fileStorage";
import { buildPaginationMeta, getPaginationParams } from "../../utils/pagination";
import { generateReportFile } from "./reports.generator";
import type {
  AdminRentalStatisticsReportPayload,
  OrderReportPayload,
  ReportListItem,
  ReportWithRelations,
  ReportsActor,
  RentalHistoryReportPayload,
} from "./reports.types";
import type {
  AdminReportsQueryInput,
  GenerateAdminStatisticsReportInput,
  GenerateOrderReportInput,
  GenerateRentalHistoryReportInput,
  MyReportsQueryInput,
} from "./reports.validators";

const orderReportInclude = {
  user: {
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
    },
  },
  items: {
    include: {
      equipment: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  },
} satisfies Prisma.RentalOrderInclude;

const reportInclude = {
  user: {
    select: {
      id: true,
      fullName: true,
      email: true,
    },
  },
  rentalOrder: {
    select: {
      id: true,
      orderNumber: true,
      status: true,
    },
  },
} satisfies Prisma.ReportInclude;

type OrderWithRelations = Prisma.RentalOrderGetPayload<{
  include: typeof orderReportInclude;
}>;

function formatDateKey(dateString?: string | null) {
  return dateString ? dateString.replace(/-/g, "") : "all-time";
}

function toStartOfDay(dateString: string) {
  return new Date(`${dateString}T00:00:00.000Z`);
}

function toEndOfDay(dateString: string) {
  return new Date(`${dateString}T23:59:59.999Z`);
}

function buildOrderDateWhere(
  dateFrom?: string,
  dateTo?: string,
): Prisma.RentalOrderWhereInput["createdAt"] | undefined {
  if (!dateFrom && !dateTo) {
    return undefined;
  }

  const where: Prisma.DateTimeFilter = {};

  if (dateFrom) {
    where.gte = toStartOfDay(dateFrom);
  }

  if (dateTo) {
    where.lte = toEndOfDay(dateTo);
  }

  return where;
}

function serializeReport(
  report: ReportWithRelations,
  options?: { includeUser?: boolean },
): ReportListItem {
  return {
    id: report.id,
    userId: report.userId,
    rentalOrderId: report.rentalOrderId,
    type: report.type,
    format: report.format,
    title: report.title,
    fileUrl: report.fileUrl,
    downloadUrl: `/api/reports/${report.id}/download`,
    createdAt: report.createdAt,
    rentalOrder: report.rentalOrder,
    ...(options?.includeUser ? { user: report.user } : {}),
  };
}

async function ensureReportExists(id: string) {
  const report = await prisma.report.findUnique({
    where: { id },
    include: reportInclude,
  });

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return report;
}

async function ensureOrderExists(orderId: string) {
  const order = await prisma.rentalOrder.findUnique({
    where: { id: orderId },
    include: orderReportInclude,
  });

  if (!order) {
    throw new ApiError(404, "Rental order not found");
  }

  return order;
}

function ensureOrderReportAccess(order: OrderWithRelations, actor: ReportsActor) {
  if (actor.role !== "ADMIN" && order.userId !== actor.userId) {
    throw new ApiError(403, "You do not have permission to access this rental order report");
  }
}

function buildOrderReportPayload(order: OrderWithRelations): OrderReportPayload {
  return {
    generatedAt: new Date(),
    title: `Документ по заявке ${order.orderNumber}`,
    order: {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      startDate: order.startDate,
      endDate: order.endDate,
      deliveryType: order.deliveryType,
      deliveryAddress: order.deliveryAddress,
      customerComment: order.customerComment,
      managerComment: order.managerComment,
      subtotal: Number(order.subtotal),
      depositTotal: Number(order.depositTotal),
      deliveryPrice: Number(order.deliveryPrice),
      totalPrice: Number(order.totalPrice),
      customer: {
        fullName: order.user.fullName,
        email: order.user.email,
        phone: order.user.phone,
      },
      items: order.items.map((item) => ({
        equipmentName: item.equipment.name,
        equipmentSlug: item.equipment.slug,
        quantity: item.quantity,
        dailyPrice: Number(item.dailyPrice),
        daysCount: item.daysCount,
        lineTotal: Number(item.lineTotal),
      })),
    },
  };
}

async function createStoredReportRecord(params: {
  actorUserId: string;
  rentalOrderId?: string | null;
  type:
    | "ORDER_DOCUMENT"
    | "RENTAL_HISTORY"
    | "ADMIN_RENTAL_STATISTICS";
  format: ReportFormat;
  title: string;
  filePrefix: string;
  payload:
    | OrderReportPayload
    | RentalHistoryReportPayload
    | AdminRentalStatisticsReportPayload;
}) {
  const generated = await generateReportFile(
    params.type,
    params.format,
    params.payload as never,
  );
  const fileName = buildStoredReportFileName(params.filePrefix, generated.extension);
  const storedFile = await saveReportBuffer(fileName, generated.buffer);

  try {
    const report = await prisma.report.create({
      data: {
        userId: params.actorUserId,
        rentalOrderId: params.rentalOrderId ?? null,
        type: params.type,
        format: params.format,
        title: params.title,
        fileUrl: storedFile.fileUrl,
      },
      include: reportInclude,
    });

    return serializeReport(report, { includeUser: true });
  } catch (error) {
    await deleteStoredReportFile(storedFile.fileUrl);
    throw error;
  }
}

export async function generateOrderReport(
  orderId: string,
  actor: ReportsActor,
  input: GenerateOrderReportInput,
) {
  const order = await ensureOrderExists(orderId);
  ensureOrderReportAccess(order, actor);
  const payload = buildOrderReportPayload(order);

  return createStoredReportRecord({
    actorUserId: actor.userId,
    rentalOrderId: order.id,
    type: ReportType.ORDER_DOCUMENT,
    format: input.format,
    title: payload.title,
    filePrefix: `order-${order.orderNumber}`,
    payload,
  });
}

export async function generateRentalHistoryReport(
  actor: ReportsActor,
  input: GenerateRentalHistoryReportInput,
) {
  const user = await prisma.user.findUnique({
    where: { id: actor.userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const createdAtFilter = buildOrderDateWhere(input.dateFrom, input.dateTo);
  const orders = await prisma.rentalOrder.findMany({
    where: {
      userId: actor.userId,
      ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
    },
    include: {
      items: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const payload: RentalHistoryReportPayload = {
    generatedAt: new Date(),
    title: `История аренд ${user.fullName}`,
    user,
    period: {
      dateFrom: input.dateFrom ?? null,
      dateTo: input.dateTo ?? null,
    },
    orders: orders.map((order) => ({
      orderNumber: order.orderNumber,
      status: order.status,
      startDate: order.startDate,
      endDate: order.endDate,
      itemsCount: order.items.length,
      totalPrice: Number(order.totalPrice),
    })),
    totals: {
      ordersCount: orders.length,
      grandTotal: Number(
        orders.reduce((sum, order) => sum + Number(order.totalPrice), 0).toFixed(2),
      ),
    },
  };

  return createStoredReportRecord({
    actorUserId: actor.userId,
    type: ReportType.RENTAL_HISTORY,
    format: input.format,
    title: payload.title,
    filePrefix: `rental-history-${formatDateKey(input.dateFrom)}-${formatDateKey(input.dateTo)}`,
    payload,
  });
}

export async function listMyReports(
  actor: ReportsActor,
  query: MyReportsQueryInput,
) {
  const where: Prisma.ReportWhereInput = {
    userId: actor.userId,
  };

  if (query.type) {
    where.type = query.type;
  }

  if (query.format) {
    where.format = query.format;
  }

  const { page, limit, skip } = getPaginationParams(query);
  const [items, total] = await Promise.all([
    prisma.report.findMany({
      where,
      include: reportInclude,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.report.count({ where }),
  ]);

  return {
    items: items.map((item) => serializeReport(item)),
    pagination: buildPaginationMeta({ page, limit, total }),
  };
}

export async function getReportDownloadForActor(id: string, actor: ReportsActor) {
  const report = await ensureReportExists(id);

  if (actor.role !== "ADMIN" && report.userId !== actor.userId) {
    throw new ApiError(403, "You do not have permission to download this report");
  }

  if (!report.fileUrl) {
    throw new ApiError(404, "Report file is not available");
  }

  const fileExists = await reportFileExists(report.fileUrl);
  if (!fileExists) {
    throw new ApiError(404, "Report file was not found on disk");
  }

  const absolutePath = resolveStoredFilePath(report.fileUrl);

  return {
    report: serializeReport(report, { includeUser: actor.role === "ADMIN" }),
    absolutePath,
    downloadName: path.basename(absolutePath),
  };
}

export async function generateAdminRentalStatisticsReport(
  actor: ReportsActor,
  input: GenerateAdminStatisticsReportInput,
) {
  const createdAtFilter = buildOrderDateWhere(input.dateFrom, input.dateTo);
  const orders = await prisma.rentalOrder.findMany({
    where: createdAtFilter ? { createdAt: createdAtFilter } : {},
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
      items: {
        include: {
          equipment: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const byStatusMap = new Map<OrderStatus, number>();
  const equipmentMap = new Map<
    string,
    { equipmentName: string; rentalsCount: number; quantityTotal: number }
  >();
  const clientsMap = new Map<
    string,
    { clientName: string; clientEmail: string; ordersCount: number }
  >();

  for (const order of orders) {
    byStatusMap.set(order.status, (byStatusMap.get(order.status) ?? 0) + 1);

    const clientEntry = clientsMap.get(order.userId);
    if (clientEntry) {
      clientEntry.ordersCount += 1;
    } else {
      clientsMap.set(order.userId, {
        clientName: order.user.fullName,
        clientEmail: order.user.email,
        ordersCount: 1,
      });
    }

    const equipmentIdsInOrder = new Set<string>();
    for (const item of order.items) {
      const existing = equipmentMap.get(item.equipmentId);
      if (existing) {
        existing.quantityTotal += item.quantity;
      } else {
        equipmentMap.set(item.equipmentId, {
          equipmentName: item.equipment.name,
          rentalsCount: 0,
          quantityTotal: item.quantity,
        });
      }

      equipmentIdsInOrder.add(item.equipmentId);
    }

    for (const equipmentId of equipmentIdsInOrder) {
      const entry = equipmentMap.get(equipmentId);
      if (entry) {
        entry.rentalsCount += 1;
      }
    }
  }

  const payload: AdminRentalStatisticsReportPayload = {
    generatedAt: new Date(),
    title: "Админский отчет по арендам",
    period: {
      dateFrom: input.dateFrom ?? null,
      dateTo: input.dateTo ?? null,
    },
    summary: {
      ordersCount: orders.length,
      totalRentalSum: Number(
        orders.reduce((sum, order) => sum + Number(order.totalPrice), 0).toFixed(2),
      ),
      totalDepositSum: Number(
        orders.reduce((sum, order) => sum + Number(order.depositTotal), 0).toFixed(2),
      ),
      completedCount: byStatusMap.get(OrderStatus.COMPLETED) ?? 0,
      cancelledCount:
        (byStatusMap.get(OrderStatus.CANCELLED) ?? 0) +
        (byStatusMap.get(OrderStatus.REJECTED) ?? 0),
      activeCount:
        (byStatusMap.get(OrderStatus.ACTIVE) ?? 0) +
        (byStatusMap.get(OrderStatus.APPROVED) ?? 0),
    },
    byStatus: Array.from(byStatusMap.entries()).map(([status, count]) => ({
      status,
      count,
    })),
    topEquipment: Array.from(equipmentMap.values())
      .sort((left, right) => {
        if (right.rentalsCount !== left.rentalsCount) {
          return right.rentalsCount - left.rentalsCount;
        }

        return right.quantityTotal - left.quantityTotal;
      })
      .slice(0, 5),
    topClients: Array.from(clientsMap.values())
      .sort((left, right) => right.ordersCount - left.ordersCount)
      .slice(0, 5),
  };

  return createStoredReportRecord({
    actorUserId: actor.userId,
    type: ReportType.ADMIN_RENTAL_STATISTICS,
    format: input.format,
    title: payload.title,
    filePrefix: `admin-rental-statistics-${formatDateKey(input.dateFrom)}-${formatDateKey(input.dateTo)}`,
    payload,
  });
}

export async function listAdminReports(query: AdminReportsQueryInput) {
  const where: Prisma.ReportWhereInput = {};

  if (query.type) {
    where.type = query.type;
  }

  if (query.format) {
    where.format = query.format;
  }

  if (query.userId) {
    where.userId = query.userId;
  }

  const { page, limit, skip } = getPaginationParams(query);
  const [items, total] = await Promise.all([
    prisma.report.findMany({
      where,
      include: reportInclude,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.report.count({ where }),
  ]);

  return {
    items: items.map((item) => serializeReport(item, { includeUser: true })),
    pagination: buildPaginationMeta({ page, limit, total }),
  };
}

export async function deleteAdminReport(id: string) {
  const report = await ensureReportExists(id);
  const fileDeleteResult = await deleteStoredReportFile(report.fileUrl);

  await prisma.report.delete({
    where: { id },
  });

  return {
    deleted: true,
    id,
    fileDeleted: fileDeleteResult.deleted,
  };
}
