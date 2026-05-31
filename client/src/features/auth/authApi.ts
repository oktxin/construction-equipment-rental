import { apiClient } from "../../shared/api/apiClient";
import type { AuthResponse, AuthUser } from "../../shared/types/auth";
import type { LoginPayload, RegisterPayload } from "./authTypes";

type ApiSuccess<T> = {
  status: "success";
  message?: string;
  data: T;
};

export async function loginRequest(payload: LoginPayload) {
  const response = await apiClient.post<ApiSuccess<AuthResponse>>("/auth/login", payload);
  return response.data.data;
}

export async function registerRequest(payload: RegisterPayload) {
  const response = await apiClient.post<ApiSuccess<AuthResponse>>("/auth/register", payload);
  return response.data.data;
}

export async function fetchCurrentUserRequest() {
  const response = await apiClient.get<ApiSuccess<AuthUser>>("/auth/me");
  return response.data.data;
}
