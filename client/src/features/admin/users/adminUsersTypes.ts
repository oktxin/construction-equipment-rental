import type { AuthUser, RoleName } from "../../../shared/types/auth";
import type { PaginationMeta } from "../../catalog/catalogTypes";

export type AdminUser = AuthUser;

export type AdminUsersResponse = {
  items: AdminUser[];
  pagination: PaginationMeta;
};

export type AdminUsersQueryParams = {
  search?: string;
  role?: RoleName;
  isBlocked?: boolean;
  page?: number;
  limit?: number;
};

export type UpdateAdminUserPayload = {
  fullName?: string;
  phone?: string | null;
  avatarUrl?: string | null;
};

export type ToggleUserBlockPayload = {
  isBlocked: boolean;
};
