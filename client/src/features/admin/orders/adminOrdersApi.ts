import { apiClient } from "../../../shared/api/apiClient";
import type { PaginationMeta } from "../../catalog/catalogTypes";
import type { RentalOrder } from "../../rentalOrders/rentalOrdersTypes";
import type {
  AdminOrder,
  AdminOrdersQueryParams,
  AdminOrdersResponse,
  UpdateAdminOrderCommentPayload,
  UpdateAdminOrderStatusPayload,
} from "./adminOrdersTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

function normalizePagination(pagination: PaginationMeta): PaginationMeta {
  return {
    page: Number(pagination.page) || 1,
    limit: Number(pagination.limit) || 10,
    total: Number(pagination.total) || 0,
    totalPages: Number(pagination.totalPages) || 1,
  };
}

function normalizeAdminOrder(order: RentalOrder): AdminOrder {
  return {
    ...order,
    daysCount: Number(order.daysCount) || 1,
    subtotal: Number(order.subtotal) || 0,
    depositTotal: Number(order.depositTotal) || 0,
    deliveryPrice: Number(order.deliveryPrice) || 0,
    totalPrice: Number(order.totalPrice) || 0,
    items: (order.items ?? []).map((item) => ({
      ...item,
      quantity: Number(item.quantity) || 0,
      dailyPrice: Number(item.dailyPrice) || 0,
      daysCount: Number(item.daysCount) || 1,
      lineTotal: Number(item.lineTotal) || 0,
      equipment: {
        ...item.equipment,
        quantityAvailable: Number(item.equipment.quantityAvailable) || 0,
      },
    })),
  };
}

export async function getAdminOrders(params?: AdminOrdersQueryParams) {
  const response = await apiClient.get<ApiEnvelope<AdminOrdersResponse>>(
    "/admin/rental-orders",
    { params },
  );

  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeAdminOrder),
    pagination: normalizePagination(data.pagination),
  } satisfies AdminOrdersResponse;
}

export async function getAdminOrderById(id: string) {
  const response = await apiClient.get<ApiEnvelope<AdminOrder>>(`/admin/rental-orders/${id}`);
  return normalizeAdminOrder(unwrapData(response.data));
}

export async function updateAdminOrderStatus(
  id: string,
  payload: UpdateAdminOrderStatusPayload,
) {
  const response = await apiClient.patch<ApiEnvelope<AdminOrder>>(
    `/admin/rental-orders/${id}/status`,
    payload,
  );

  return normalizeAdminOrder(unwrapData(response.data));
}

export async function updateAdminOrderComment(
  id: string,
  payload: UpdateAdminOrderCommentPayload,
) {
  const response = await apiClient.patch<ApiEnvelope<AdminOrder>>(
    `/admin/rental-orders/${id}/comment`,
    payload,
  );

  return normalizeAdminOrder(unwrapData(response.data));
}

