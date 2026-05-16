import { z } from "zod";

function isSupportedEntityId(value: string) {
  return (
    z.string().uuid().safeParse(value).success ||
    /^c[a-z0-9]{8,}$/i.test(value)
  );
}

const idSchema = z
  .string()
  .trim()
  .min(1)
  .refine(isSupportedEntityId, "Identifier format is not supported");

const reviewTextSchema = z.string().trim().min(10).max(1000);

export const equipmentReviewParamSchema = z.object({
  equipmentId: idSchema,
});

export const reviewIdParamSchema = z.object({
  id: idSchema,
});

export const publicEquipmentReviewsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.enum(["createdAt", "updatedAt", "rating"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  rating: z.coerce.number().int().min(1).max(5).optional(),
});

export const createReviewSchema = z.object({
  equipmentId: idSchema,
  rating: z.coerce.number().int().min(1).max(5),
  text: reviewTextSchema,
});

export const updateReviewSchema = z
  .object({
    rating: z.coerce.number().int().min(1).max(5).optional(),
    text: reviewTextSchema.optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const myReviewsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const adminReviewsQuerySchema = z.object({
  search: z.string().trim().optional(),
  equipmentId: idSchema.optional(),
  userId: idSchema.optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  isPublished: z
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
  sortBy: z.enum(["createdAt", "updatedAt", "rating"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const updateReviewPublishSchema = z.object({
  isPublished: z.boolean(),
});

export type PublicEquipmentReviewsQueryInput = z.infer<
  typeof publicEquipmentReviewsQuerySchema
>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type MyReviewsQueryInput = z.infer<typeof myReviewsQuerySchema>;
export type AdminReviewsQueryInput = z.infer<typeof adminReviewsQuerySchema>;
export type UpdateReviewPublishInput = z.infer<
  typeof updateReviewPublishSchema
>;
