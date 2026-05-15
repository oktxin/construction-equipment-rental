import { DeliveryType, OrderStatus, type Prisma } from "@prisma/client";

import type { RoleName } from "../auth/auth.types";

export type RentalOrderActor = {
  userId: string;
  role: RoleName;
};

export type RentalOrderSortBy = "createdAt" | "startDate" | "totalPrice" | "status";
export type AdminRentalOrderSortBy =
  | RentalOrderSortBy
  | "orderNumber";

export type RentalOrderCalculationItem = {
  equipmentId: string;
  quantity: number;
};

export type ValidatedRentalEquipmentItem = {
  equipment: {
    id: string;
    name: string;
    slug: string;
    brand: string | null;
    model: string | null;
    dailyPrice: Prisma.Decimal;
    depositAmount: Prisma.Decimal;
    quantityAvailable: number;
    status: string;
  };
  quantity: number;
};

export type RentalOrderCalculationTotals = {
  daysCount: number;
  currency: "BYN";
  deliveryType: DeliveryType;
  subtotal: number;
  depositTotal: number;
  deliveryPrice: number;
  totalPrice: number;
  items: Array<{
    equipmentId: string;
    name: string;
    slug: string;
    brand: string | null;
    model: string | null;
    quantity: number;
    dailyPrice: number;
    depositAmount: number;
    daysCount: number;
    subtotal: number;
    depositTotal: number;
    lineTotal: number;
  }>;
};

export const INVENTORY_HOLDING_STATUSES: OrderStatus[] = [
  OrderStatus.APPROVED,
  OrderStatus.ACTIVE,
];
