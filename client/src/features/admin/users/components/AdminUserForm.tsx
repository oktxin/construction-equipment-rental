import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../shared/ui";
import {
  adminErrorTextClassName,
  adminFieldClassName,
  adminGhostButtonClassName,
  adminHintTextClassName,
  adminLabelClassName,
  adminMutedTextClassName,
} from "../../components/adminUiStyles";
import { getUserRoleLabel } from "../../../../shared/utils/statusLabels";
import type { AdminUser, UpdateAdminUserPayload } from "../adminUsersTypes";

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
          <span className={adminLabelClassName}>Email</span>
          <input className={adminFieldClassName + " text-[rgba(244,239,230,0.56)]"} value={user.email} disabled />
        </label>

        <label className="space-y-2">
          <span className={adminLabelClassName}>Роль</span>
          <input
            className={adminFieldClassName + " text-[rgba(244,239,230,0.56)]"}
            value={getUserRoleLabel(user.role.name)}
            disabled
          />
        </label>
      </div>

      <div className="grid gap-4">
        <label className="space-y-2">
          <span className={adminLabelClassName}>ФИО</span>
          <input
            type="text"
            className={adminFieldClassName}
            placeholder="Например, Иван Петров"
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className={adminErrorTextClassName}>{errors.fullName.message}</p>
          ) : null}
        </label>

        <label className="space-y-2">
          <span className={adminLabelClassName}>Телефон</span>
          <input
            type="text"
            className={adminFieldClassName}
            placeholder="+375291234567"
            {...register("phone")}
          />
          {errors.phone ? (
            <p className={adminErrorTextClassName}>{errors.phone.message}</p>
          ) : null}
        </label>

        <label className="space-y-2">
          <span className={adminLabelClassName}>Ссылка на аватар</span>
          <input
            type="url"
            className={adminFieldClassName}
            placeholder="https://example.com/avatar.jpg"
            {...register("avatarUrl")}
          />
          {errors.avatarUrl ? (
            <p className={adminErrorTextClassName}>{errors.avatarUrl.message}</p>
          ) : (
            <p className={adminMutedTextClassName}>
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
        <p className={adminHintTextClassName}>
          Email и роль доступны только для просмотра.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className={adminGhostButtonClassName}
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
