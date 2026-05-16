import { ReportFormat, ReportType } from "@prisma/client";
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

const reportGenerationSchema = z.object({
  format: z.nativeEnum(ReportFormat),
});

const optionalDateRangeShape = {
  dateFrom: dateStringSchema.optional(),
  dateTo: dateStringSchema.optional(),
};

function applyOptionalDateRangeRules(
  value: { dateFrom?: string; dateTo?: string },
  ctx: z.RefinementCtx,
) {
  if (value.dateFrom && value.dateTo && value.dateFrom > value.dateTo) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "dateFrom cannot be later than dateTo",
      path: ["dateFrom"],
    });
  }
}

export const orderReportParamsSchema = z.object({
  orderId: idSchema,
});

export const reportIdParamSchema = z.object({
  id: idSchema,
});

export const generateOrderReportSchema = reportGenerationSchema;

export const generateRentalHistoryReportSchema = z
  .object({
    format: z.nativeEnum(ReportFormat),
    ...optionalDateRangeShape,
  })
  .superRefine(applyOptionalDateRangeRules);

export const generateAdminStatisticsReportSchema = z
  .object({
    format: z.nativeEnum(ReportFormat),
    ...optionalDateRangeShape,
  })
  .superRefine(applyOptionalDateRangeRules);

export const myReportsQuerySchema = z.object({
  type: z.nativeEnum(ReportType).optional(),
  format: z.nativeEnum(ReportFormat).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const adminReportsQuerySchema = z.object({
  type: z.nativeEnum(ReportType).optional(),
  format: z.nativeEnum(ReportFormat).optional(),
  userId: idSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type GenerateOrderReportInput = z.infer<typeof generateOrderReportSchema>;
export type GenerateRentalHistoryReportInput = z.infer<
  typeof generateRentalHistoryReportSchema
>;
export type GenerateAdminStatisticsReportInput = z.infer<
  typeof generateAdminStatisticsReportSchema
>;
export type MyReportsQueryInput = z.infer<typeof myReportsQuerySchema>;
export type AdminReportsQueryInput = z.infer<typeof adminReportsQuerySchema>;
