import type { RoleName } from "../../../shared/types/auth";
import type { PaginationMeta } from "../../catalog/catalogTypes";
import type { AdminUser } from "./adminUsersTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type PaginationLike = Partial<PaginationMeta> | undefined;

export const ADMIN_USERS_DEFAULT_LIMIT = 10;

export const ADMIN_USER_ROLE_OPTIONS: Array<{ value: RoleName; label: string }> = [
  { value: "ADMIN", label: "Администратор" },
  { value: "CLIENT", label: "Клиент" },
];

export function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

export function normalizePagination(pagination: PaginationLike): PaginationMeta {
  return {
    page: Number(pagination?.page) || 1,
    limit: Number(pagination?.limit) || ADMIN_USERS_DEFAULT_LIMIT,
    total: Number(pagination?.total) || 0,
    totalPages: Number(pagination?.totalPages) || 1,
  };
}

export function normalizeAdminUser(user: AdminUser): AdminUser {
  return {
    ...user,
    isBlocked: Boolean(user.isBlocked),
  };
}

export function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

export function parseUserRole(value: string | null): RoleName | "" {
  if (value === "ADMIN" || value === "CLIENT") {
    return value;
  }

  return "";
}

export function parseUserBlockedFilter(value: string | null): boolean | undefined {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

export function buildAdminUsersSearchParams(input: {
  search?: string;
  role?: RoleName | "";
  isBlocked?: boolean;
  page?: number;
  limit?: number;
  selected?: string | null;
}) {
  const params = new URLSearchParams();

  if (input.search?.trim()) {
    params.set("search", input.search.trim());
  }

  if (input.role) {
    params.set("role", input.role);
  }

  if (typeof input.isBlocked === "boolean") {
    params.set("isBlocked", String(input.isBlocked));
  }

  if ((input.page ?? 1) > 1) {
    params.set("page", String(input.page));
  }

  if ((input.limit ?? ADMIN_USERS_DEFAULT_LIMIT) !== ADMIN_USERS_DEFAULT_LIMIT) {
    params.set("limit", String(input.limit));
  }

  if (input.selected) {
    params.set("selected", input.selected);
  }

  return params;
}

export function mergeAdminUser(items: AdminUser[], updatedUser: AdminUser) {
  return items.map((item) => (item.id === updatedUser.id ? updatedUser : item));
}
