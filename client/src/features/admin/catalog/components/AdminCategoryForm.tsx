import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../shared/ui";
import {
  adminErrorTextClassName,
  adminFieldClassName,
  adminGhostButtonClassName,
  adminHintTextClassName,
  adminLabelClassName,
  adminTextareaClassName,
} from "../../components/adminUiStyles";
import type { AdminCategoryPayload } from "../adminCatalogTypes";
import { normalizeAdminSlug } from "../adminCatalogUtils";

const categorySchema = z.object({
  name: z.string().trim().min(1, "Укажите название категории").max(120, "Максимум 120 символов"),
  slug: z.string().trim().min(1, "Укажите slug").max(120, "Максимум 120 символов"),
  description: z.string().trim().max(1000, "Максимум 1000 символов"),
  iconName: z.string().trim().max(120, "Максимум 120 символов"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

function buildDefaultValues(initialValues?: Partial<AdminCategoryPayload>): CategoryFormValues {
  return {
    name: initialValues?.name ?? "",
    slug: initialValues?.slug ?? "",
    description: initialValues?.description ?? "",
    iconName: initialValues?.iconName ?? "",
  };
}

export type AdminCategoryFormProps = {
  initialValues?: Partial<AdminCategoryPayload>;
  isSubmitting?: boolean;
  serverError?: string | null;
  submitLabel?: string;
  onSubmit: (values: AdminCategoryPayload) => void;
  onCancel: () => void;
};

export function AdminCategoryForm({
  initialValues,
  isSubmitting = false,
  serverError,
  submitLabel = "Сохранить категорию",
  onSubmit,
  onCancel,
}: AdminCategoryFormProps) {
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialValues?.slug));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
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
          name: values.name.trim(),
          slug: normalizeAdminSlug(values.slug),
          description: values.description.trim() ? values.description.trim() : null,
          iconName: values.iconName.trim() ? values.iconName.trim() : null,
        }),
      )}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className={adminLabelClassName} htmlFor="admin-category-name">
            Название
          </label>
          <input
            id="admin-category-name"
            type="text"
            className={adminFieldClassName}
            placeholder="Например, Генераторы"
            {...register("name")}
          />
          {errors.name ? <p className={adminErrorTextClassName}>{errors.name.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className={adminLabelClassName} htmlFor="admin-category-slug">
            Slug
          </label>
          <input
            id="admin-category-slug"
            type="text"
            className={adminFieldClassName}
            placeholder="generators"
            {...slugRegister}
            onChange={(event) => {
              setIsSlugManual(true);
              slugRegister.onChange(event);
            }}
          />
          {errors.slug ? <p className={adminErrorTextClassName}>{errors.slug.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-2">
          <label className={adminLabelClassName} htmlFor="admin-category-description">
            Описание
          </label>
          <textarea
            id="admin-category-description"
            className={adminTextareaClassName}
            placeholder="Коротко опишите, что входит в раздел."
            {...register("description")}
          />
          {errors.description ? (
            <p className={adminErrorTextClassName}>{errors.description.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className={adminLabelClassName} htmlFor="admin-category-icon">
            Icon name
          </label>
          <input
            id="admin-category-icon"
            type="text"
            className={adminFieldClassName}
            placeholder="hammer"
            {...register("iconName")}
          />
          <p className={adminHintTextClassName}>
            Можно использовать техническое имя иконки или внутренний descriptor для каталога.
          </p>
          {errors.iconName ? (
            <p className={adminErrorTextClassName}>{errors.iconName.message}</p>
          ) : null}
        </div>
      </div>

      {serverError ? <p className="rounded-2xl bg-danger/12 px-4 py-3 text-sm text-[#FF8A75]">{serverError}</p> : null}

      <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          className={adminGhostButtonClassName}
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
