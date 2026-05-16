import { z } from "zod";

function isSupportedEntityId(value: string) {
  return (
    z.string().uuid().safeParse(value).success ||
    /^c[a-z0-9]{8,}$/i.test(value)
  );
}

const equipmentIdSchema = z
  .string()
  .trim()
  .min(1)
  .refine(isSupportedEntityId, "Identifier format is not supported");

export const favoriteEquipmentParamSchema = z.object({
  equipmentId: equipmentIdSchema,
});

export const favoritesListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type FavoritesListQueryInput = z.infer<typeof favoritesListQuerySchema>;
