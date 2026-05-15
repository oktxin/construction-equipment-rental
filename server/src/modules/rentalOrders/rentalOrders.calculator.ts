import {
  DeliveryType,
  EquipmentStatus,
  Prisma,
  PrismaClient,
} from "@prisma/client";

import { ApiError } from "../../utils/apiError";
import type {
  RentalOrderCalculationItem,
  RentalOrderCalculationTotals,
  ValidatedRentalEquipmentItem,
} from "./rentalOrders.types";

type EquipmentReader = PrismaClient | Prisma.TransactionClient;

function parseDateOnlyToUtc(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    throw new ApiError(400, `Invalid date value: ${value}`);
  }

  return date;
}

function roundMoney(value: number) {
  return Number(value.toFixed(2));
}

export function calculateDays(startDate: string, endDate: string) {
  const start = parseDateOnlyToUtc(startDate);
  const end = parseDateOnlyToUtc(endDate);

  if (start.getTime() > end.getTime()) {
    throw new ApiError(400, "startDate cannot be later than endDate");
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const rawDays = Math.floor((end.getTime() - start.getTime()) / millisecondsPerDay) + 1;

  return Math.max(1, rawDays);
}

export function calculateDeliveryPrice(
  deliveryType: DeliveryType,
  subtotal: number,
) {
  if (deliveryType === DeliveryType.PICKUP) {
    return 0;
  }

  if (subtotal <= 0) {
    return 0;
  }

  return 25;
}

export async function validateEquipmentAvailability(
  db: EquipmentReader,
  items: RentalOrderCalculationItem[],
): Promise<ValidatedRentalEquipmentItem[]> {
  const equipmentIds = [...new Set(items.map((item) => item.equipmentId))];
  const equipmentList = await db.equipment.findMany({
    where: {
      id: {
        in: equipmentIds,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      brand: true,
      model: true,
      dailyPrice: true,
      depositAmount: true,
      quantityAvailable: true,
      status: true,
    },
  });

  const equipmentMap = new Map(
    equipmentList.map((equipment) => [equipment.id, equipment]),
  );

  return items.map((item) => {
    const equipment = equipmentMap.get(item.equipmentId);

    if (!equipment) {
      throw new ApiError(404, `Equipment not found: ${item.equipmentId}`);
    }

    if (equipment.status === EquipmentStatus.ARCHIVED) {
      throw new ApiError(409, `${equipment.name} is archived and cannot be rented`);
    }

    if (equipment.status !== EquipmentStatus.AVAILABLE) {
      throw new ApiError(409, `${equipment.name} is not available for rent`);
    }

    if (item.quantity <= 0) {
      throw new ApiError(400, "Item quantity must be greater than zero");
    }

    if (item.quantity > equipment.quantityAvailable) {
      throw new ApiError(
        409,
        `Requested quantity for ${equipment.name} exceeds current availability`,
      );
    }

    return {
      equipment,
      quantity: item.quantity,
    };
  });
}

export function calculateRentalOrderTotals(
  items: ValidatedRentalEquipmentItem[],
  startDate: string,
  endDate: string,
  deliveryType: DeliveryType,
): RentalOrderCalculationTotals {
  const daysCount = calculateDays(startDate, endDate);

  const normalizedItems = items.map(({ equipment, quantity }) => {
    const dailyPrice = Number(equipment.dailyPrice);
    const depositAmount = Number(equipment.depositAmount);
    const subtotal = roundMoney(dailyPrice * daysCount * quantity);
    const depositTotal = roundMoney(depositAmount * quantity);

    return {
      equipmentId: equipment.id,
      name: equipment.name,
      slug: equipment.slug,
      brand: equipment.brand,
      model: equipment.model,
      quantity,
      dailyPrice,
      depositAmount,
      daysCount,
      subtotal,
      depositTotal,
      lineTotal: roundMoney(subtotal + depositTotal),
    };
  });

  const subtotal = roundMoney(
    normalizedItems.reduce((sum, item) => sum + item.subtotal, 0),
  );
  const depositTotal = roundMoney(
    normalizedItems.reduce((sum, item) => sum + item.depositTotal, 0),
  );
  const deliveryPrice = roundMoney(
    calculateDeliveryPrice(deliveryType, subtotal),
  );

  return {
    daysCount,
    currency: "BYN",
    deliveryType,
    subtotal,
    depositTotal,
    deliveryPrice,
    totalPrice: roundMoney(subtotal + depositTotal + deliveryPrice),
    items: normalizedItems,
  };
}

export function toOrderBoundaryDates(startDate: string, endDate: string) {
  const start = parseDateOnlyToUtc(startDate);
  const end = parseDateOnlyToUtc(endDate);
  end.setUTCHours(23, 59, 59, 999);

  if (start.getTime() > end.getTime()) {
    throw new ApiError(400, "startDate cannot be later than endDate");
  }

  return {
    start,
    end,
  };
}
