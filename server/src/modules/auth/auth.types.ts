import type { Role, User } from "@prisma/client";

export type RoleName = "ADMIN" | "CLIENT";

export type AccessTokenPayload = {
  userId: string;
  role: RoleName;
};

export type SafeUser = Omit<User, "passwordHash" | "roleId"> & {
  role: Pick<Role, "id" | "name" | "description">;
};

export type AuthResponse = {
  user: SafeUser;
  token: string;
};
