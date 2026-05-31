import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../shared/ui";
import { getUserRoleLabel } from "../../../../shared/utils/statusLabels";
import type { AdminUser, UpdateAdminUserPayload } from "../adminUsersTypes";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

const userSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Укажите имя не короче 2 символов")
    .max(120, "Максимум 120 символов"),
  phone: z
    .union([
      z.literal(""),
      z
        .string()
        .trim()
        .regex(/^\+?[0-9]{7,20}$/, "Используйте международный формат телефона"),
    ])
    .optional(),
  avatarUrl: z
    .union([z.literal(""), z.string().trim().url("Укажите корректный URL")])
    .optional(),
});

type AdminUserFormValues = z.infer<typeof userSchema>;

function buildDefaultValues(user: AdminUser): AdminUserFormValues {
  return {
    fullName: user.fullName,
    phone: user.phone ?? "",
    avatarUrl: user.avatarUrl ?? "",
  };
}

export type AdminUserFormProps = {
  user: AdminUser;
  isSubmitting?: boolean;
  successMessage?: string | null;
  serverError?: string | null;
  onSubmit: (values: UpdateAdminUserPayload) => void;
};

export function AdminUserForm({
  user,
  isSubmitting = false,
  successMessage,
  serverError,
  onSubmit,
}: AdminUserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<AdminUserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: buildDefaultValues(user),
  });

  useEffect(() => {
    reset(buildDefaultValues(user));
  }, [reset, user]);

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) =>
        onSubmit({
          fullName: values.fullName.trim(),
          phone: values.phone?.trim() ? values.phone.trim() : null,
          avatarUrl: values.avatarUrl?.trim() ? values.avatarUrl.trim() : null,
        }),
      )}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white/78">Email</span>
          <input className={fieldClassName + " text-white/56"} value={user.email} disabled />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white/78">Роль</span>
          <input
            className={fieldClassName + " text-white/56"}
            value={getUserRoleLabel(user.role.name)}
            disabled
          />
        </label>
      </div>

      <div className="grid gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white/78">ФИО</span>
          <input
            type="text"
            className={fieldClassName}
            placeholder="Например, Иван Петров"
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="text-sm text-rose-300">{errors.fullName.message}</p>
          ) : null}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white/78">Телефон</span>
          <input
            type="text"
            className={fieldClassName}
            placeholder="+375291234567"
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="text-sm text-rose-300">{errors.phone.message}</p>
          ) : null}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white/78">Ссылка на аватар</span>
          <input
            type="url"
            className={fieldClassName}
            placeholder="https://example.com/avatar.jpg"
            {...register("avatarUrl")}
          />
          {errors.avatarUrl ? (
            <p className="text-sm text-rose-300">{errors.avatarUrl.message}</p>
          ) : (
            <p className="text-sm text-white/48">
              Поле можно оставить пустым, если аватар не нужен.
            </p>
          )}
        </label>
      </div>

      {successMessage ? (
        <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </p>
      ) : null}

      {serverError ? (
        <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/48">
          Email и роль доступны только для просмотра.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={() => reset(buildDefaultValues(user))}
            disabled={isSubmitting || !isDirty}
          >
            Сбросить
          </Button>
          <Button
            type="submit"
            className="bg-primary text-foreground hover:bg-primary-strong"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? "Сохраняем..." : "Сохранить изменения"}
          </Button>
        </div>
      </div>
    </form>
  );
}
