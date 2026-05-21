export type RoleName = "ADMIN" | "CLIENT";

export type AuthRole = {
  id: string;
  name: RoleName;
  description?: string | null;
};

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  role: AuthRole;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};
