import { apiClient } from "../../shared/api/apiClient";
import type {
  CreateRentalOrderRequest,
  RentalOrder,
  RentalOrderCalculateRequest,
  RentalOrderCalculateResponse,
  RentalOrdersQueryParams,
  RentalOrdersResponse,
} from "./rentalOrdersTypes";
import type { PaginationMeta } from "../catalog/catalogTypes";

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

function normalizeRentalOrder(order: RentalOrder): RentalOrder {
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

export async function calculateRentalOrder(payload: RentalOrderCalculateRequest) {
  const response = await apiClient.post<ApiEnvelope<RentalOrderCalculateResponse>>(
    "/rental-orders/calculate",
    payload,
  );

  return unwrapData(response.data);
}

export async function createRentalOrder(payload: CreateRentalOrderRequest) {
  const response = await apiClient.post<ApiEnvelope<RentalOrder>>(
    "/rental-orders",
    payload,
  );

  return normalizeRentalOrder(unwrapData(response.data));
}

export async function getMyOrders(params?: RentalOrdersQueryParams) {
  const response = await apiClient.get<ApiEnvelope<RentalOrdersResponse>>(
    "/rental-orders/my",
    { params },
  );

  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeRentalOrder),
    pagination: normalizePagination(data.pagination),
  } satisfies RentalOrdersResponse;
}

export async function getMyOrderById(id: string) {
  const response = await apiClient.get<ApiEnvelope<RentalOrder>>(`/rental-orders/my/${id}`);
  return normalizeRentalOrder(unwrapData(response.data));
}

export async function cancelRentalOrder(id: string) {
  const response = await apiClient.patch<ApiEnvelope<RentalOrder>>(
    `/rental-orders/${id}/cancel`,
  );

  return normalizeRentalOrder(unwrapData(response.data));
}
