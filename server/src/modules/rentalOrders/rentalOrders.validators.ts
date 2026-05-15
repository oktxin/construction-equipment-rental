import { DeliveryType, OrderStatus } from "@prisma/client";
import { z } from "zod";

function isSupportedEntityId(value: string) {
  return (
    z.string().uuid().safeParse(value).success ||
    /^c[a-z0-9]{8,}$/i.test(value)
  );
}

function isDateOnlyString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime());
}

const idSchema = z
  .string()
  .trim()
  .min(1)
  .refine(isSupportedEntityId, "Identifier format is not supported");

const dateStringSchema = z
  .string()
  .trim()
  .refine(isDateOnlyString, "Date must be in YYYY-MM-DD format");

const rentalOrderItemSchema = z.object({
  equipmentId: idSchema,
  quantity: z.coerce.number().int().min(1),
});

const rentalOrderBaseShape = {
  startDate: dateStringSchema,
  endDate: dateStringSchema,
  deliveryType: z.nativeEnum(DeliveryType),
  items: z.array(rentalOrderItemSchema).min(1),
};

function applyRentalOrderBaseRules(
  value: {
    startDate: string;
    endDate: string;
    items: Array<{ equipmentId: string }>;
  },
  ctx: z.RefinementCtx,
) {
  if (value.startDate > value.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "startDate cannot be later than endDate",
      path: ["startDate"],
    });
  }

  const uniqueEquipmentIds = new Set(value.items.map((item) => item.equipmentId));
  if (uniqueEquipmentIds.size !== value.items.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Duplicate equipmentId values are not allowed",
      path: ["items"],
    });
  }
}

const rentalOrderBaseSchema = z
  .object(rentalOrderBaseShape)
  .superRefine(applyRentalOrderBaseRules);

export const calculateRentalOrderSchema = rentalOrderBaseSchema;

export const createRentalOrderSchema = z
  .object({
    ...rentalOrderBaseShape,
    deliveryAddress: z.string().trim().max(1000).optional().nullable(),
    customerComment: z.string().trim().max(2000).optional().nullable(),
  })
  .superRefine((value, ctx) => {
    applyRentalOrderBaseRules(value, ctx);

    if (
      value.deliveryType === DeliveryType.DELIVERY &&
      !value.deliveryAddress?.trim()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "deliveryAddress is required for DELIVERY",
        path: ["deliveryAddress"],
      });
    }
  });

export const rentalOrderIdParamSchema = z.object({
  id: idSchema,
});

export const myRentalOrdersQuerySchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.enum(["createdAt", "startDate", "totalPrice", "status"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const adminRentalOrdersQuerySchema = z
  .object({
    status: z.nativeEnum(OrderStatus).optional(),
    search: z.string().trim().optional(),
    startDateFrom: dateStringSchema.optional(),
    startDateTo: dateStringSchema.optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sortBy: z
      .enum(["createdAt", "startDate", "totalPrice", "status", "orderNumber"])
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .superRefine((value, ctx) => {
    if (
      value.startDateFrom &&
      value.startDateTo &&
      value.startDateFrom > value.startDateTo
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "startDateFrom cannot be later than startDateTo",
        path: ["startDateFrom"],
      });
    }
  });

export const updateRentalOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  managerComment: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .nullable()
    .transform((value) => {
      if (value === undefined) {
        return undefined;
      }

      return value === "" ? null : value;
    }),
});

export const updateRentalOrderCommentSchema = z.object({
  managerComment: z
    .string()
    .trim()
    .max(2000)
    .nullable()
    .transform((value) => (value === "" ? null : value)),
});

export type CalculateRentalOrderInput = z.infer<
  typeof calculateRentalOrderSchema
>;
export type CreateRentalOrderInput = z.infer<typeof createRentalOrderSchema>;
export type MyRentalOrdersQueryInput = z.infer<
  typeof myRentalOrdersQuerySchema
>;
export type AdminRentalOrdersQueryInput = z.infer<
  typeof adminRentalOrdersQuerySchema
>;
export type UpdateRentalOrderStatusInput = z.infer<
  typeof updateRentalOrderStatusSchema
>;
export type UpdateRentalOrderCommentInput = z.infer<
  typeof updateRentalOrderCommentSchema
>;
