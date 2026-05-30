import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../shared/ui";
import type { Category, EquipmentStatus } from "../../../catalog/catalogTypes";
import type { AdminEquipmentPayload } from "../adminCatalogTypes";
import { normalizeAdminSlug } from "../adminCatalogUtils";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

const textareaClassName =
  "min-h-[132px] w-full rounded-2xl border border-white/10 bg-adminBackground px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

const equipmentStatusOptions: Array<{ value: EquipmentStatus; label: string }> = [
  { value: "AVAILABLE", label: "Доступно" },
  { value: "UNAVAILABLE", label: "Недоступно" },
  { value: "MAINTENANCE", label: "На обслуживании" },
  { value: "ARCHIVED", label: "В архиве" },
];

const equipmentSchema = z
  .object({
    categoryId: z.string().trim().min(1, "Выберите категорию"),
    name: z.string().trim().min(1, "Укажите название").max(180, "Максимум 180 символов"),
    slug: z.string().trim().min(1, "Укажите slug").max(180, "Максимум 180 символов"),
    shortDescription: z.string().trim().max(255, "Максимум 255 символов"),
    description: z.string().trim().max(5000, "Максимум 5000 символов"),
    brand: z.string().trim().max(120, "Максимум 120 символов"),
    model: z.string().trim().max(120, "Максимум 120 символов"),
    dailyPrice: z.coerce.number().min(0, "Цена не может быть отрицательной"),
    depositAmount: z.coerce.number().min(0, "Залог не может быть отрицательным"),
    quantityTotal: z.coerce.number().int().min(0, "Общий остаток не может быть отрицательным"),
    quantityAvailable: z.coerce
      .number()
      .int()
      .min(0, "Доступное количество не может быть отрицательным"),
    power: z.string().trim().max(40, "Максимум 40 символов"),
    weight: z.string().trim().max(40, "Максимум 40 символов"),
    status: z.enum(["AVAILABLE", "UNAVAILABLE", "MAINTENANCE", "ARCHIVED"]),
    isFeatured: z.boolean(),
  })
  .refine((values) => values.quantityAvailable <= values.quantityTotal, {
    message: "Доступное количество не может превышать общий остаток",
    path: ["quantityAvailable"],
  });

type EquipmentFormValues = z.infer<typeof equipmentSchema>;

function buildDefaultValues(initialValues?: Partial<AdminEquipmentPayload>): EquipmentFormValues {
  return {
    categoryId: initialValues?.categoryId ?? "",
    name: initialValues?.name ?? "",
    slug: initialValues?.slug ?? "",
    shortDescription: initialValues?.shortDescription ?? "",
    description: initialValues?.description ?? "",
    brand: initialValues?.brand ?? "",
    model: initialValues?.model ?? "",
    dailyPrice: initialValues?.dailyPrice ?? 0,
    depositAmount: initialValues?.depositAmount ?? 0,
    quantityTotal: initialValues?.quantityTotal ?? 0,
    quantityAvailable: initialValues?.quantityAvailable ?? 0,
    power: initialValues?.power ?? "",
    weight: initialValues?.weight ?? "",
    status: initialValues?.status ?? "AVAILABLE",
    isFeatured: initialValues?.isFeatured ?? false,
  };
}

export type AdminEquipmentFormProps = {
  categories: Category[];
  initialValues?: Partial<AdminEquipmentPayload>;
  isSubmitting?: boolean;
  serverError?: string | null;
  submitLabel?: string;
  onSubmit: (values: AdminEquipmentPayload) => void;
  onCancel: () => void;
};

export function AdminEquipmentForm({
  categories,
  initialValues,
  isSubmitting = false,
  serverError,
  submitLabel = "Сохранить оборудование",
  onSubmit,
  onCancel,
}: AdminEquipmentFormProps) {
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialValues?.slug));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: buildDefaultValues(initialValues),
  });

  useEffect(() => {
    reset(buildDefaultValues(initialValues));
    setIsSlugManual(Boolean(initialValues?.slug));
  }, [initialValues, reset]);

  const nameValue = watch("name");
  const slugRegister = register("slug");

  useEffect(() => {
    if (isSlugManual) {
      return;
    }

    setValue("slug", normalizeAdminSlug(nameValue), { shouldValidate: true });
  }, [isSlugManual, nameValue, setValue]);

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) =>
        onSubmit({
          categoryId: values.categoryId,
          name: values.name.trim(),
          slug: normalizeAdminSlug(values.slug),
          shortDescription: values.shortDescription.trim() ? values.shortDescription.trim() : null,
          description: values.description.trim() ? values.description.trim() : null,
          brand: values.brand.trim() ? values.brand.trim() : null,
          model: values.model.trim() ? values.model.trim() : null,
          dailyPrice: values.dailyPrice,
          depositAmount: values.depositAmount,
          quantityTotal: values.quantityTotal,
          quantityAvailable: values.quantityAvailable,
          power: values.power.trim() ? values.power.trim() : null,
          weight: values.weight.trim() ? values.weight.trim() : null,
          status: values.status,
          isFeatured: values.isFeatured,
        }),
      )}
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-name">
            Название
          </label>
          <input
            id="admin-equipment-name"
            type="text"
            className={fieldClassName}
            placeholder="Например, Bosch GBH 8-45 DV"
            {...register("name")}
          />
          {errors.name ? <p className="text-sm text-rose-300">{errors.name.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-form-category">
            Категория
          </label>
          <div className="relative">
            <select
              id="admin-equipment-form-category"
              className={fieldClassName + " appearance-none pr-11"}
              {...register("categoryId")}
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
          {errors.categoryId ? (
            <p className="text-sm text-rose-300">{errors.categoryId.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-slug">
            Slug
          </label>
          <input
            id="admin-equipment-slug"
            type="text"
            className={fieldClassName}
            placeholder="bosch-gbh-8-45-dv"
            {...slugRegister}
            onChange={(event) => {
              setIsSlugManual(true);
              slugRegister.onChange(event);
            }}
          />
          {errors.slug ? <p className="text-sm text-rose-300">{errors.slug.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-form-status">
            Статус
          </label>
          <div className="relative">
            <select
              id="admin-equipment-form-status"
              className={fieldClassName + " appearance-none pr-11"}
              {...register("status")}
            >
              {equipmentStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
          {errors.status ? <p className="text-sm text-rose-300">{errors.status.message}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-short-description">
          Короткое описание
        </label>
        <textarea
          id="admin-equipment-short-description"
          className={textareaClassName}
          placeholder="Короткий текст для списков и карточек каталога."
          {...register("shortDescription")}
        />
        {errors.shortDescription ? (
          <p className="text-sm text-rose-300">{errors.shortDescription.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-description">
          Полное описание
        </label>
        <textarea
          id="admin-equipment-description"
          className={textareaClassName + " min-h-[180px]"}
          placeholder="Подробное описание сценариев использования и состояния техники."
          {...register("description")}
        />
        {errors.description ? (
          <p className="text-sm text-rose-300">{errors.description.message}</p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-brand">
            Бренд
          </label>
          <input id="admin-equipment-brand" type="text" className={fieldClassName} {...register("brand")} />
          {errors.brand ? <p className="text-sm text-rose-300">{errors.brand.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-model">
            Модель
          </label>
          <input id="admin-equipment-model" type="text" className={fieldClassName} {...register("model")} />
          {errors.model ? <p className="text-sm text-rose-300">{errors.model.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-power">
            Мощность
          </label>
          <input
            id="admin-equipment-power"
            type="text"
            className={fieldClassName}
            placeholder="2200"
            {...register("power")}
          />
          {errors.power ? <p className="text-sm text-rose-300">{errors.power.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-weight">
            Вес
          </label>
          <input
            id="admin-equipment-weight"
            type="text"
            className={fieldClassName}
            placeholder="32.5"
            {...register("weight")}
          />
          {errors.weight ? <p className="text-sm text-rose-300">{errors.weight.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-daily-price">
            Цена в сутки
          </label>
          <input
            id="admin-equipment-daily-price"
            type="number"
            min={0}
            step={1}
            className={fieldClassName}
            {...register("dailyPrice", { valueAsNumber: true })}
          />
          {errors.dailyPrice ? (
            <p className="text-sm text-rose-300">{errors.dailyPrice.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-deposit">
            Залог
          </label>
          <input
            id="admin-equipment-deposit"
            type="number"
            min={0}
            step={1}
            className={fieldClassName}
            {...register("depositAmount", { valueAsNumber: true })}
          />
          {errors.depositAmount ? (
            <p className="text-sm text-rose-300">{errors.depositAmount.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-total">
            Всего единиц
          </label>
          <input
            id="admin-equipment-total"
            type="number"
            min={0}
            step={1}
            className={fieldClassName}
            {...register("quantityTotal", { valueAsNumber: true })}
          />
          {errors.quantityTotal ? (
            <p className="text-sm text-rose-300">{errors.quantityTotal.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-available">
            Доступно сейчас
          </label>
          <input
            id="admin-equipment-available"
            type="number"
            min={0}
            step={1}
            className={fieldClassName}
            {...register("quantityAvailable", { valueAsNumber: true })}
          />
          {errors.quantityAvailable ? (
            <p className="text-sm text-rose-300">{errors.quantityAvailable.message}</p>
          ) : null}
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-adminBackground/60 px-4 py-3 text-sm text-white/78">
        <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-transparent" {...register("isFeatured")} />
        Показывать позицию в featured-подборках каталога
      </label>

      {serverError ? <p className="rounded-2xl bg-danger/12 px-4 py-3 text-sm text-rose-300">{serverError}</p> : null}

      <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
        <Button type="submit" className="bg-primary text-foreground hover:bg-primary-strong" disabled={isSubmitting}>
          {isSubmitting ? "Сохраняем..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
