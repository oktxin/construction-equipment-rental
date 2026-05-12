import { z } from "zod";

export const categoryListQuerySchema = z.object({
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const createCategorySchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000).optional().nullable(),
  iconName: z.string().trim().max(120).optional().nullable(),
});

export const updateCategorySchema = createCategorySchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const categorySlugParamSchema = z.object({
  slug: z.string().trim().min(1),
});

export const categoryIdParamSchema = z.object({
  id: z.string().trim().min(1),
});

export type CategoryListQueryInput = z.infer<typeof categoryListQuerySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
