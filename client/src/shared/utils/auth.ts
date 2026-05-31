import type { AuthUser, RoleName } from "../types/auth";

export const AUTH_TOKEN_STORAGE_KEY = "buildrent.auth.token";

export function getStoredAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function persistAuthToken(token: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}

export function getUserRoleName(user: Pick<AuthUser, "role"> | null | undefined): RoleName | null {
  return user?.role?.name ?? null;
}

export function isAdminUser(user: Pick<AuthUser, "role"> | null | undefined) {
  return getUserRoleName(user) === "ADMIN";
}

export function getDefaultPostAuthPath(user: Pick<AuthUser, "role"> | null | undefined) {
  return isAdminUser(user) ? "/admin" : "/catalog";
}
