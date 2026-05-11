import { Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import type { RoleName, SafeUser } from "../auth/auth.types";
import type {
  BlockUserInput,
  UpdateUserInput,
  UsersQueryInput,
} from "./users.validators";

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

function buildUsersWhere(query: UsersQueryInput): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {};

  if (query.search) {
    where.OR = [
      {
        fullName: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        phone: {
          contains: query.search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (query.role) {
    where.role = {
      name: query.role,
    };
  }

  if (typeof query.isBlocked === "boolean") {
    where.isBlocked = query.isBlocked;
  }

  return where;
}

export async function listUsers(query: UsersQueryInput) {
  const where = buildUsersWhere(query);
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: safeUserInclude,
      skip,
      take: query.limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    items: items.map(sanitizeUser),
    meta: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / query.limit)),
    },
  };
}

export async function getUserById(
  targetUserId: string,
  requester: { userId: string; role: RoleName },
) {
  if (requester.role !== "ADMIN" && requester.userId !== targetUserId) {
    throw new ApiError(403, "You do not have permission to view this user");
  }

  const user = await prisma.user.findUnique({
    where: { id: targetUserId },
    include: safeUserInclude,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return sanitizeUser(user);
}

export async function updateUser(
  targetUserId: string,
  input: UpdateUserInput,
  requester: { userId: string; role: RoleName },
) {
  if (requester.role !== "ADMIN" && requester.userId !== targetUserId) {
    throw new ApiError(403, "You do not have permission to update this user");
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: targetUserId },
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  if (input.email && input.email !== existingUser.email) {
    const duplicate = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (duplicate) {
      throw new ApiError(409, "Email is already in use");
    }
  }

  const data: Prisma.UserUpdateInput = {
    fullName: input.fullName,
    email: input.email,
    phone: input.phone === null ? null : input.phone,
    avatarUrl: input.avatarUrl === null ? null : input.avatarUrl,
  };

  if (requester.role === "ADMIN") {
    if (typeof input.isBlocked === "boolean") {
      data.isBlocked = input.isBlocked;
    }

    if (input.roleId) {
      data.role = {
        connect: {
          id: input.roleId,
        },
      };
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: targetUserId },
    data,
    include: safeUserInclude,
  });

  return sanitizeUser(updatedUser);
}

export async function setUserBlockedState(
  targetUserId: string,
  input: BlockUserInput,
) {
  const existingUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    include: {
      role: true,
    },
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  if (existingUser.role.name === "ADMIN" && input.isBlocked) {
    throw new ApiError(409, "Admin user cannot be blocked through this endpoint");
  }

  const updatedUser = await prisma.user.update({
    where: { id: targetUserId },
    data: {
      isBlocked: input.isBlocked,
    },
    include: safeUserInclude,
  });

  return sanitizeUser(updatedUser);
}
