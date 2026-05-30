import { getOrderStatusLabel } from "../../../shared/utils/statusLabels";
import {
  formatCurrency,
  formatDateRange,
  formatItemsCountLabel,
} from "../../rentalOrders/rentalOrdersUtils";
import type { OrderStatus } from "../../rentalOrders/rentalOrdersTypes";
import type { AdminOrder } from "./adminOrdersTypes";

export const ADMIN_ORDER_STATUS_OPTIONS: Array<{
  value: OrderStatus;
  label: string;
}> = [
  { value: "PENDING", label: getOrderStatusLabel("PENDING") },
  { value: "APPROVED", label: getOrderStatusLabel("APPROVED") },
  { value: "ACTIVE", label: getOrderStatusLabel("ACTIVE") },
  { value: "COMPLETED", label: getOrderStatusLabel("COMPLETED") },
  { value: "CANCELLED", label: getOrderStatusLabel("CANCELLED") },
  { value: "REJECTED", label: getOrderStatusLabel("REJECTED") },
];

const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["APPROVED", "REJECTED", "CANCELLED"],
  APPROVED: ["ACTIVE", "CANCELLED"],
  ACTIVE: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
  REJECTED: [],
};

export function getAllowedAdminOrderStatuses(currentStatus: OrderStatus) {
  return ORDER_STATUS_TRANSITIONS[currentStatus] ?? [];
}

export function canTransitionAdminOrderStatus(
  currentStatus: OrderStatus,
  nextStatus: OrderStatus,
) {
  return (
    currentStatus === nextStatus ||
    getAllowedAdminOrderStatuses(currentStatus).includes(nextStatus)
  );
}

export function buildAdminDashboardStats(orders: AdminOrder[]) {
  const pendingCount = orders.filter((order) => order.status === "PENDING").length;
  const activeCount = orders.filter((order) => order.status === "ACTIVE").length;
  const completedCount = orders.filter((order) => order.status === "COMPLETED").length;
  const cancelledOrRejectedCount = orders.filter(
    (order) => order.status === "CANCELLED" || order.status === "REJECTED",
  ).length;
  const totalAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return {
    totalOrders: orders.length,
    pendingCount,
    activeCount,
    completedCount,
    cancelledOrRejectedCount,
    totalAmount,
  };
}

export function getAdminOrderSummary(order: AdminOrder) {
  return {
    period: formatDateRange(order.startDate, order.endDate),
    items: formatItemsCountLabel(order.items),
    total: formatCurrency(order.totalPrice),
  };
}

export function mergeAdminOrder(items: AdminOrder[], updatedOrder: AdminOrder) {
  return items.map((item) => (item.id === updatedOrder.id ? updatedOrder : item));
}

