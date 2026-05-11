import { z } from "zod";

export const usersQuerySchema = z.object({
  search: z.string().trim().optional(),
  role: z.enum(["ADMIN", "CLIENT"]).optional(),
  isBlocked: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .optional()
    .transform((value) => {
      if (value === "true") {
        return true;
      }

      if (value === "false") {
        return false;
      }

      return value;
    }),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const updateUserSchema = z
  .object({
    fullName: z.string().trim().min(2).max(120).optional(),
    email: z.string().trim().email().optional(),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9]{7,20}$/)
      .nullable()
      .optional(),
    avatarUrl: z.string().trim().url().nullable().optional(),
    roleId: z.string().trim().min(1).optional(),
    isBlocked: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const userIdParamSchema = z.object({
  id: z.string().trim().min(1),
});

export const blockUserSchema = z.object({
  isBlocked: z.boolean(),
});

export type UsersQueryInput = z.infer<typeof usersQuerySchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type BlockUserInput = z.infer<typeof blockUserSchema>;
