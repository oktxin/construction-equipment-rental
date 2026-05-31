import { DeliveryType, EquipmentStatus, OrderStatus } from "@prisma/client";

import type { SeedEquipment } from "./equipment";
import type { SeedClient } from "./users";

export type SeedRentalOrderItem = {
  equipmentSlug: string;
  quantity: number;
  dailyPrice: number;
  daysCount: number;
  lineTotal: number;
};

export type SeedRentalOrder = {
  orderNumber: string;
  userEmail: string;
  status: OrderStatus;
  startDate: string;
  endDate: string;
  deliveryType: DeliveryType;
  deliveryAddress: string | null;
  customerComment: string | null;
  managerComment: string | null;
  subtotal: number;
  depositTotal: number;
  deliveryPrice: number;
  totalPrice: number;
  items: SeedRentalOrderItem[];
};

const HOLDING_STATUSES = new Set<OrderStatus>([
  OrderStatus.APPROVED,
  OrderStatus.ACTIVE,
]);

const STATUS_PLAN: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.APPROVED,
  OrderStatus.ACTIVE,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
  OrderStatus.PENDING,
  OrderStatus.APPROVED,
  OrderStatus.COMPLETED,
  OrderStatus.ACTIVE,
  OrderStatus.REJECTED,
  OrderStatus.PENDING,
  OrderStatus.APPROVED,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
  OrderStatus.ACTIVE,
  OrderStatus.PENDING,
  OrderStatus.APPROVED,
  OrderStatus.COMPLETED,
  OrderStatus.PENDING,
  OrderStatus.ACTIVE,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
  OrderStatus.APPROVED,
  OrderStatus.PENDING,
  OrderStatus.COMPLETED,
  OrderStatus.REJECTED,
  OrderStatus.ACTIVE,
  OrderStatus.APPROVED,
  OrderStatus.PENDING,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
  OrderStatus.APPROVED,
  OrderStatus.ACTIVE,
  OrderStatus.COMPLETED,
  OrderStatus.PENDING,
];

const seedTimelineAnchor = new Date("2026-05-31T00:00:00.000Z");

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

function roundMoney(value: number) {
  return Number(value.toFixed(2));
}

function chooseOrderWindow(index: number, status: OrderStatus) {
  const duration = 2 + (index % 5);

  if (status === OrderStatus.COMPLETED) {
    const start = addDays(seedTimelineAnchor, -50 + index);
    return {
      startDate: toDateOnly(start),
      endDate: toDateOnly(addDays(start, duration - 1)),
      daysCount: duration,
    };
  }

  if (status === OrderStatus.ACTIVE) {
    const start = addDays(seedTimelineAnchor, -3 - (index % 3));
    return {
      startDate: toDateOnly(start),
      endDate: toDateOnly(addDays(seedTimelineAnchor, 2 + (index % 4))),
      daysCount: 6 + (index % 3),
    };
  }

  if (status === OrderStatus.APPROVED) {
    const start = addDays(seedTimelineAnchor, 1 + (index % 6));
    return {
      startDate: toDateOnly(start),
      endDate: toDateOnly(addDays(start, duration)),
      daysCount: duration + 1,
    };
  }

  if (status === OrderStatus.PENDING) {
    const start = addDays(seedTimelineAnchor, 5 + (index % 10));
    return {
      startDate: toDateOnly(start),
      endDate: toDateOnly(addDays(start, duration)),
      daysCount: duration + 1,
    };
  }

  if (status === OrderStatus.CANCELLED) {
    const start = addDays(seedTimelineAnchor, -20 + index);
    return {
      startDate: toDateOnly(start),
      endDate: toDateOnly(addDays(start, duration - 1)),
      daysCount: duration,
    };
  }

  const start = addDays(seedTimelineAnchor, 2 + (index % 8));
  return {
    startDate: toDateOnly(start),
    endDate: toDateOnly(addDays(start, duration - 1)),
    daysCount: duration,
  };
}

function chooseCustomerComment(index: number) {
  const comments = [
    "Подтвердите, пожалуйста, выдачу в первой половине дня.",
    "Техника нужна под плотный график отделочных работ.",
    "Доступ на объект открыт после 09:00.",
    "Подскажите, пожалуйста, нужен ли удлинитель для подключения.",
    "Позвоните за час до доставки.",
    "Бригада работает только по будням.",
  ];

  return comments[index % comments.length];
}

function chooseManagerComment(status: OrderStatus, index: number) {
  if (status === OrderStatus.REJECTED) {
    return "Отклонено из-за пересечения с техническим обслуживанием оборудования.";
  }

  if (status === OrderStatus.CANCELLED) {
    return "Заявка отменена по просьбе клиента после изменения графика работ.";
  }

  if (status === OrderStatus.APPROVED) {
    return "Заявка подтверждена после проверки остатков и контактных данных.";
  }

  if (status === OrderStatus.ACTIVE) {
    return "Аренда в процессе, оборудование зарезервировано за клиентом.";
  }

  if (status === OrderStatus.COMPLETED) {
    return "Техника возвращена и проверена складской командой.";
  }

  if (index % 3 === 0) {
    return "Ожидаем финальное подтверждение по времени получения.";
  }

  return null;
}

function createOrderNumber(index: number) {
  return `BR-202605-${`${index + 1}`.padStart(4, "0")}`;
}

export function buildRentalOrderSeeds(params: {
  clients: SeedClient[];
  equipment: SeedEquipment[];
}) {
  const rentableEquipment = params.equipment.filter(
    (item) =>
      item.status === EquipmentStatus.AVAILABLE && item.baseQuantityAvailable > 0,
  );

  const reservedByEquipmentSlug = new Map<string, number>();
  const orders: SeedRentalOrder[] = [];

  for (let index = 0; index < STATUS_PLAN.length; index += 1) {
    const status = STATUS_PLAN[index];
    const user = params.clients[index % params.clients.length];
    const needsReservation = HOLDING_STATUSES.has(status);
    const itemCount = 1 + (index % 3);
    const usedSlugs = new Set<string>();
    const chosenItems: SeedRentalOrderItem[] = [];
    const { startDate, endDate, daysCount } = chooseOrderWindow(index, status);

    for (let itemOffset = 0; itemOffset < itemCount; itemOffset += 1) {
      const desiredQuantity = needsReservation ? 1 : 1 + ((index + itemOffset) % 2);
      let selected: SeedEquipment | null = null;

      for (let probe = 0; probe < rentableEquipment.length; probe += 1) {
        const candidate =
          rentableEquipment[(index * 2 + itemOffset * 5 + probe) % rentableEquipment.length];

        if (usedSlugs.has(candidate.slug)) {
          continue;
        }

        const reserved = reservedByEquipmentSlug.get(candidate.slug) ?? 0;
        const remaining = candidate.baseQuantityAvailable - reserved;
        const quantity = Math.min(desiredQuantity, Math.max(1, candidate.quantityTotal));

        if (needsReservation && remaining < quantity) {
          continue;
        }

        selected = candidate;
        break;
      }

      if (!selected) {
        throw new Error(`Unable to allocate seeded equipment for order ${index + 1}`);
      }

      usedSlugs.add(selected.slug);
      const quantity = needsReservation ? 1 : Math.min(2, selected.quantityTotal);
      const subtotal = roundMoney(selected.dailyPrice * daysCount * quantity);
      const deposit = roundMoney(selected.depositAmount * quantity);

      if (needsReservation) {
        reservedByEquipmentSlug.set(
          selected.slug,
          (reservedByEquipmentSlug.get(selected.slug) ?? 0) + quantity,
        );
      }

      chosenItems.push({
        equipmentSlug: selected.slug,
        quantity,
        dailyPrice: selected.dailyPrice,
        daysCount,
        lineTotal: roundMoney(subtotal + deposit),
      });
    }

    const deliveryType =
      index % 2 === 0 ? DeliveryType.PICKUP : DeliveryType.DELIVERY;
    const subtotal = roundMoney(
      chosenItems.reduce(
        (sum, item) => sum + item.dailyPrice * item.daysCount * item.quantity,
        0,
      ),
    );
    const depositTotal = roundMoney(
      chosenItems.reduce((sum, item) => {
        const equipment = rentableEquipment.find(
          (candidate) => candidate.slug === item.equipmentSlug,
        );
        return sum + (equipment?.depositAmount ?? 0) * item.quantity;
      }, 0),
    );
    const deliveryPrice = deliveryType === DeliveryType.DELIVERY ? 25 : 0;

    orders.push({
      orderNumber: createOrderNumber(index),
      userEmail: user.email,
      status,
      startDate,
      endDate,
      deliveryType,
      deliveryAddress:
        deliveryType === DeliveryType.DELIVERY ? user.deliveryAddress : null,
      customerComment: chooseCustomerComment(index),
      managerComment: chooseManagerComment(status, index),
      subtotal,
      depositTotal,
      deliveryPrice,
      totalPrice: roundMoney(subtotal + depositTotal + deliveryPrice),
      items: chosenItems,
    });
  }

  return {
    orders,
    reservedByEquipmentSlug,
  };
}
