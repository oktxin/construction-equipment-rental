import { apiClient } from "../../shared/api/apiClient";
import type { AuthResponse } from "../../shared/types/auth";
import type { LoginPayload, RegisterPayload } from "./authTypes";

export async function loginRequest(payload: LoginPayload) {
  const response = await apiClient.post<{ data: AuthResponse }>("/auth/login", payload);
  return response.data.data;
}

export async function registerRequest(payload: RegisterPayload) {
  const response = await apiClient.post<{ data: AuthResponse }>("/auth/register", payload);
  return response.data.data;
}

export async function fetchCurrentUserRequest() {
  const response = await apiClient.get<{ data: { user: AuthResponse["user"] } }>("/auth/me");
  return response.data.data.user;
}
