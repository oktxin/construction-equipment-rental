import type { AuthResponse, AuthUser } from "../../shared/types/auth";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
};

export type AuthRequestResult = AuthResponse;
