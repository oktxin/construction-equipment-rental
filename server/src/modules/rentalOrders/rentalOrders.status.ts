import { EquipmentStatus, OrderStatus, Prisma } from "@prisma/client";

import { ApiError } from "../../utils/apiError";
import { INVENTORY_HOLDING_STATUSES } from "./rentalOrders.types";

type StatusManagedOrder = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: Array<{
    equipmentId: string;
    quantity: number;
    equipment: {
      id: string;
      name: string;
      status: string;
    };
  }>;
};

const allowedStatusTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.DRAFT]: [],
  [OrderStatus.PENDING]: [
    OrderStatus.APPROVED,
    OrderStatus.REJECTED,
    OrderStatus.CANCELLED,
  ],
  [OrderStatus.APPROVED]: [
    OrderStatus.ACTIVE,
    OrderStatus.CANCELLED,
  ],
  [OrderStatus.ACTIVE]: [OrderStatus.COMPLETED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.REJECTED]: [],
};

function isInventoryHeld(status: OrderStatus) {
  return INVENTORY_HOLDING_STATUSES.includes(status);
}

export function validateStatusTransition(
  currentStatus: OrderStatus,
  nextStatus: OrderStatus,
) {
  if (currentStatus === nextStatus) {
    throw new ApiError(400, `Order already has status ${nextStatus}`);
  }

  if (!allowedStatusTransitions[currentStatus].includes(nextStatus)) {
    throw new ApiError(
      400,
      `Status transition ${currentStatus} -> ${nextStatus} is not allowed`,
    );
  }
}

export async function applyInventoryChangesOnStatusChange(
  tx: Prisma.TransactionClient,
  order: StatusManagedOrder,
  nextStatus: OrderStatus,
) {
  const shouldReserveInventory =
    !isInventoryHeld(order.status) && isInventoryHeld(nextStatus);
  const shouldReleaseInventory =
    isInventoryHeld(order.status) && !isInventoryHeld(nextStatus);

  if (shouldReserveInventory) {
    for (const item of order.items) {
      const updated = await tx.equipment.updateMany({
        where: {
          id: item.equipmentId,
          status: EquipmentStatus.AVAILABLE,
          quantityAvailable: {
            gte: item.quantity,
          },
        },
        data: {
          quantityAvailable: {
            decrement: item.quantity,
          },
        },
      });

      if (updated.count === 0) {
        throw new ApiError(
          409,
          `Equipment ${item.equipment.name} no longer has enough stock for approval`,
        );
      }
    }
  }

  if (shouldReleaseInventory) {
    for (const item of order.items) {
      await tx.equipment.update({
        where: {
          id: item.equipmentId,
        },
        data: {
          quantityAvailable: {
            increment: item.quantity,
          },
        },
      });
    }
  }
}
