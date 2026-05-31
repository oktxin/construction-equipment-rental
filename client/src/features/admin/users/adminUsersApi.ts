import { apiClient } from "../../../shared/api/apiClient";
import type {
  AdminUser,
  AdminUsersQueryParams,
  AdminUsersResponse,
  ToggleUserBlockPayload,
  UpdateAdminUserPayload,
} from "./adminUsersTypes";
import {
  normalizeAdminUser,
  normalizePagination,
  unwrapData,
} from "./adminUsersUtils";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type RawAdminUsersResponse = {
  items: AdminUser[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

function mapUpdatePayload(payload: UpdateAdminUserPayload) {
  return {
    fullName: payload.fullName?.trim(),
    phone:
      payload.phone === undefined
        ? undefined
        : payload.phone?.trim()
          ? payload.phone.trim()
          : null,
    avatarUrl:
      payload.avatarUrl === undefined
        ? undefined
        : payload.avatarUrl?.trim()
          ? payload.avatarUrl.trim()
          : null,
  };
}

export async function getAdminUsers(params?: AdminUsersQueryParams) {
  const response = await apiClient.get<ApiEnvelope<RawAdminUsersResponse>>("/users", {
    params,
  });
  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeAdminUser),
    pagination: normalizePagination(data.meta ?? data.pagination),
  } satisfies AdminUsersResponse;
}

export async function getAdminUserById(id: string) {
  const response = await apiClient.get<ApiEnvelope<AdminUser>>(`/users/${id}`);
  return normalizeAdminUser(unwrapData(response.data));
}

export async function updateAdminUser(id: string, payload: UpdateAdminUserPayload) {
  const response = await apiClient.patch<ApiEnvelope<AdminUser>>(
    `/users/${id}`,
    mapUpdatePayload(payload),
  );

  return normalizeAdminUser(unwrapData(response.data));
}

export async function toggleUserBlock(id: string, payload: ToggleUserBlockPayload) {
  const response = await apiClient.patch<ApiEnvelope<AdminUser>>(
    `/users/${id}/block`,
    payload,
  );

  return normalizeAdminUser(unwrapData(response.data));
}
