import { getDeliveryTypeLabel } from "../../shared/utils/statusLabels";
import type {
  DeliveryType,
  OrderStatus,
  RentalOrder,
  RentalOrderItem,
} from "./rentalOrdersTypes";

const currencyFormatter = new Intl.NumberFormat("ru-BY", {
  style: "currency",
  currency: "BYN",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const ORDER_STATUS_FILTERS = [
  { value: "ALL", label: "Все" },
  { value: "PENDING", label: "Ожидает подтверждения" },
  { value: "APPROVED", label: "Подтверждена" },
  { value: "ACTIVE", label: "Активна" },
  { value: "COMPLETED", label: "Завершена" },
  { value: "CANCELLED", label: "Отменена" },
  { value: "REJECTED", label: "Отклонена" },
] as const;

export type OrderStatusFilterValue = (typeof ORDER_STATUS_FILTERS)[number]["value"];

export function formatCurrency(value: number) {
  return currencyFormatter.format(value ?? 0);
}

export function formatDate(value: string | Date) {
  return dateFormatter.format(new Date(value));
}

export function formatDateTime(value: string | Date) {
  return dateTimeFormatter.format(new Date(value));
}

export function formatDateRange(startDate: string, endDate: string) {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export function getTotalItemsCount(items: RentalOrderItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function pluralize(value: number, forms: [string, string, string]) {
  const absolute = Math.abs(value) % 100;
  const lastDigit = absolute % 10;

  if (absolute > 10 && absolute < 20) {
    return forms[2];
  }

  if (lastDigit > 1 && lastDigit < 5) {
    return forms[1];
  }

  if (lastDigit === 1) {
    return forms[0];
  }

  return forms[2];
}

export function formatItemsCountLabel(items: RentalOrderItem[]) {
  const totalItems = getTotalItemsCount(items);
  return `${totalItems} ${pluralize(totalItems, ["позиция", "позиции", "позиций"])}`;
}

export function formatDaysCountLabel(daysCount: number) {
  return `${daysCount} ${pluralize(daysCount, ["день", "дня", "дней"])}`;
}

export function parseOrderStatus(
  value: string | null | undefined,
): OrderStatus | undefined {
  if (!value) {
    return undefined;
  }

  const knownStatuses: OrderStatus[] = [
    "PENDING",
    "APPROVED",
    "ACTIVE",
    "COMPLETED",
    "CANCELLED",
    "REJECTED",
  ];

  return knownStatuses.includes(value as OrderStatus) ? (value as OrderStatus) : undefined;
}

export function canCancelRentalOrder(status: OrderStatus) {
  return status === "PENDING" || status === "APPROVED";
}

export function getDeliveryTypeSummary(
  deliveryType: DeliveryType,
  deliveryAddress: string | null,
) {
  if (deliveryType === "DELIVERY" && deliveryAddress) {
    return `${getDeliveryTypeLabel(deliveryType)}, ${deliveryAddress}`;
  }

  return getDeliveryTypeLabel(deliveryType);
}

export function getOrderSurfaceMeta(order: RentalOrder) {
  return [
    {
      label: "Период аренды",
      value: formatDateRange(order.startDate, order.endDate),
    },
    {
      label: "Срок",
      value: formatDaysCountLabel(order.daysCount),
    },
    {
      label: "Получение",
      value: getDeliveryTypeSummary(order.deliveryType, order.deliveryAddress),
    },
  ];
}
