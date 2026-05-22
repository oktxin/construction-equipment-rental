export const genericStatusLabels = {
  AVAILABLE: "Доступно",
  UNAVAILABLE: "Недоступно",
  MAINTENANCE: "На обслуживании",
  ARCHIVED: "В архиве",
  DRAFT: "Черновик",
  PENDING: "В ожидании",
  APPROVED: "Подтверждено",
  ACTIVE: "Активно",
  COMPLETED: "Завершено",
  CANCELLED: "Отменено",
  REJECTED: "Отклонено",
  PAID: "Оплачено",
  FAILED: "Ошибка",
  REFUNDED: "Возврат",
  PICKUP: "Самовывоз",
  DELIVERY: "Доставка",
  ORDER_DOCUMENT: "Документ по заявке",
  RENTAL_HISTORY: "История аренды",
  ADMIN_RENTAL_STATISTICS: "Статистика аренд",
  EQUIPMENT_UTILIZATION: "Использование оборудования",
  PDF: "PDF",
  DOCX: "DOCX",
} as const;

export type StatusLabelKey = keyof typeof genericStatusLabels;
export type StatusLabelContext =
  | "generic"
  | "equipment"
  | "order"
  | "payment"
  | "delivery"
  | "reportType"
  | "reportFormat";

const contextLabels: Record<
  Exclude<StatusLabelContext, "generic">,
  Partial<Record<StatusLabelKey, string>>
> = {
  equipment: {
    AVAILABLE: "Доступно",
    UNAVAILABLE: "Недоступно",
    MAINTENANCE: "На обслуживании",
    ARCHIVED: "В архиве",
  },
  order: {
    DRAFT: "Черновик",
    PENDING: "Ожидает подтверждения",
    APPROVED: "Подтверждена",
    ACTIVE: "Активна",
    COMPLETED: "Завершена",
    CANCELLED: "Отменена",
    REJECTED: "Отклонена",
  },
  payment: {
    PENDING: "Ожидает оплаты",
    PAID: "Оплачено",
    FAILED: "Ошибка оплаты",
    REFUNDED: "Возврат",
  },
  delivery: {
    PICKUP: "Самовывоз",
    DELIVERY: "Доставка",
  },
  reportType: {
    ORDER_DOCUMENT: "Документ по заявке",
    RENTAL_HISTORY: "История аренды",
    ADMIN_RENTAL_STATISTICS: "Статистика аренд",
    EQUIPMENT_UTILIZATION: "Использование оборудования",
  },
  reportFormat: {
    PDF: "PDF",
    DOCX: "DOCX",
  },
};

export function getStatusLabel(
  status: StatusLabelKey,
  context: StatusLabelContext = "generic",
) {
  if (context === "generic") {
    return genericStatusLabels[status];
  }

  return contextLabels[context][status] ?? genericStatusLabels[status];
}

export const getEquipmentStatusLabel = (status: StatusLabelKey) =>
  getStatusLabel(status, "equipment");

export const getOrderStatusLabel = (status: StatusLabelKey) =>
  getStatusLabel(status, "order");

export const getPaymentStatusLabel = (status: StatusLabelKey) =>
  getStatusLabel(status, "payment");

export const getDeliveryTypeLabel = (status: StatusLabelKey) =>
  getStatusLabel(status, "delivery");

export const getReportTypeLabel = (status: StatusLabelKey) =>
  getStatusLabel(status, "reportType");

export const getReportFormatLabel = (status: StatusLabelKey) =>
  getStatusLabel(status, "reportFormat");
