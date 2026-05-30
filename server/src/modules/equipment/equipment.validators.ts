import { EquipmentStatus } from "@prisma/client";
import { z } from "zod";

function parseOptionalNumericText(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === "") {
    return null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value.toString();
  }

  if (typeof value === "string") {
    const normalized = value.replace(",", ".");
    const match = normalized.match(/-?\d+(\.\d+)?/);
    if (!match) {
      throw new Error("Numeric value is required");
    }

    return match[0];
  }

  throw new Error("Numeric value is required");
}

const equipmentImageSchema = z.object({
  url: z.string().trim().url(),
  alt: z.string().trim().max(255).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const equipmentSpecSchema = z.object({
  name: z.string().trim().min(1).max(120),
  value: z.string().trim().min(1).max(255),
  unit: z.string().trim().max(50).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const createEquipmentBaseSchema = z.object({
  categoryId: z.string().trim().min(1),
  name: z.string().trim().min(1).max(180),
  slug: z.string().trim().min(1).max(180),
  shortDescription: z.string().trim().max(255).optional().nullable(),
  description: z.string().trim().max(5000).optional().nullable(),
  brand: z.string().trim().max(120).optional().nullable(),
  model: z.string().trim().max(120).optional().nullable(),
  dailyPrice: z.coerce.number().min(0),
  depositAmount: z.coerce.number().min(0),
  quantityTotal: z.coerce.number().int().min(0),
  quantityAvailable: z.coerce.number().int().min(0),
  power: z
    .any()
    .transform(parseOptionalNumericText)
    .optional(),
  weight: z
    .any()
    .transform(parseOptionalNumericText)
    .optional(),
  status: z.nativeEnum(EquipmentStatus).default(EquipmentStatus.AVAILABLE),
  isFeatured: z.boolean().default(false),
  images: z.array(equipmentImageSchema).default([]),
  specs: z.array(equipmentSpecSchema).default([]),
});

export const equipmentListQuerySchema = z.object({
  search: z.string().trim().optional(),
  categorySlug: z.string().trim().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  status: z.nativeEnum(EquipmentStatus).optional(),
  isFeatured: z
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
  sortBy: z
    .enum(["name", "dailyPrice", "createdAt", "popularity", "rating"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
});

export const createEquipmentSchema = createEquipmentBaseSchema
  .refine((value) => value.quantityAvailable <= value.quantityTotal, {
    message: "quantityAvailable cannot be greater than quantityTotal",
    path: ["quantityAvailable"],
  });

export const updateEquipmentSchema = createEquipmentBaseSchema
  .omit({ images: true, specs: true })
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  })
  .superRefine((value, ctx) => {
    if (
      value.quantityAvailable !== undefined &&
      value.quantityTotal !== undefined &&
      value.quantityAvailable > value.quantityTotal
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "quantityAvailable cannot be greater than quantityTotal",
        path: ["quantityAvailable"],
      });
    }
  });

export const replaceEquipmentImagesSchema = z.object({
  images: z.array(equipmentImageSchema),
});

export const replaceEquipmentSpecsSchema = z.object({
  specs: z.array(equipmentSpecSchema),
});

export const equipmentSlugParamSchema = z.object({
  slug: z.string().trim().min(1),
});

export const equipmentIdParamSchema = z.object({
  id: z.string().trim().min(1),
});

export type EquipmentListQueryInput = z.infer<typeof equipmentListQuerySchema>;
export type CreateEquipmentInput = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentInput = z.infer<typeof updateEquipmentSchema>;
export type ReplaceEquipmentImagesInput = z.infer<
  typeof replaceEquipmentImagesSchema
>;
export type ReplaceEquipmentSpecsInput = z.infer<
  typeof replaceEquipmentSpecsSchema
>;
