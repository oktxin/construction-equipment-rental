import { apiClient } from "../../shared/api/apiClient";
import type {
  CreateRentalOrderRequest,
  RentalOrder,
  RentalOrderCalculateRequest,
  RentalOrderCalculateResponse,
  RentalOrdersQueryParams,
  RentalOrdersResponse,
} from "./rentalOrdersTypes";

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

  return unwrapData(response.data);
}

export async function getMyOrders(params?: RentalOrdersQueryParams) {
  const response = await apiClient.get<ApiEnvelope<RentalOrdersResponse>>(
    "/rental-orders/my",
    { params },
  );

  return unwrapData(response.data);
}

export async function getMyOrderById(id: string) {
  const response = await apiClient.get<ApiEnvelope<RentalOrder>>(`/rental-orders/my/${id}`);
  return unwrapData(response.data);
}
