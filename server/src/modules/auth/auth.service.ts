import { Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { signAccessToken } from "../../utils/jwt";
import { comparePasswords, hashPassword } from "../../utils/password";
import type {
  AuthResponse,
  RoleName,
  SafeUser,
} from "./auth.types";
import type { LoginInput, RegisterInput } from "./auth.validators";

const safeUserInclude = {
  role: {
    select: {
      id: true,
      name: true,
      description: true,
    },
  },
} satisfies Prisma.UserInclude;

function sanitizeUser<
  T extends Prisma.UserGetPayload<{
    include: typeof safeUserInclude;
  }>,
>(user: T): SafeUser {
  const { passwordHash: _passwordHash, roleId: _roleId, ...safeUser } = user;
  return safeUser;
}

async function getRoleByName(roleName: RoleName) {
  const role = await prisma.role.findUnique({
    where: { name: roleName },
  });

  if (!role) {
    throw new ApiError(500, `Role ${roleName} is not configured`);
  }

  return role;
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new ApiError(409, "Email is already in use");
  }

  const clientRole = await getRoleByName("CLIENT");
  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      passwordHash,
      roleId: clientRole.id,
    },
    include: safeUserInclude,
  });

  const safeUser = sanitizeUser(user);
  const token = signAccessToken({
    userId: user.id,
    role: user.role.name as RoleName,
  });

  return {
    user: safeUser,
    token,
  };
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: safeUserInclude,
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const passwordMatches = await comparePasswords(input.password, user.passwordHash);

  if (!passwordMatches) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.isBlocked) {
    throw new ApiError(403, "User account is blocked");
  }

  const safeUser = sanitizeUser(user);
  const token = signAccessToken({
    userId: user.id,
    role: user.role.name as RoleName,
  });

  return {
    user: safeUser,
    token,
  };
}

export async function getCurrentUser(userId: string): Promise<SafeUser> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: safeUserInclude,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isBlocked) {
    throw new ApiError(403, "User account is blocked");
  }

  return sanitizeUser(user);
}
