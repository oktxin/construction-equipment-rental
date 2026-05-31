import { useEffect, useState } from "react";

import { Button } from "../../../../shared/ui";
import type { ReportFormat, ReportType } from "../../../reports/reportsTypes";
import {
  ADMIN_REPORT_FORMAT_OPTIONS,
  ADMIN_REPORT_TYPE_OPTIONS,
} from "../adminReportsUtils";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

export type AdminReportsFilterValues = {
  type: ReportType | "";
  format: ReportFormat | "";
  userId: string;
  limit: number;
};

export type AdminReportsFilterUserOption = {
  id: string;
  fullName: string;
  email: string;
};

export type AdminReportsFiltersProps = {
  values: AdminReportsFilterValues;
  users: AdminReportsFilterUserOption[];
  isPending?: boolean;
  isUsersLoading?: boolean;
  usersError?: string | null;
  onSubmit: (values: AdminReportsFilterValues) => void;
  onReset: () => void;
};

export function AdminReportsFilters({
  values,
  users,
  isPending = false,
  isUsersLoading = false,
  usersError = null,
  onSubmit,
  onReset,
}: AdminReportsFiltersProps) {
  const [formValues, setFormValues] = useState(values);

  useEffect(() => {
    setFormValues(values);
  }, [values]);

  return (
    <form
      className="rounded-[28px] border border-white/10 bg-adminSurface p-5 shadow-industrial-dark"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formValues);
      }}
    >
      <div className="grid gap-4 xl:grid-cols-[220px_180px_minmax(0,1fr)_140px]">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-reports-type">
            Тип отчёта
          </label>
          <div className="relative">
            <select
              id="admin-reports-type"
              value={formValues.type}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  type: event.target.value as ReportType | "",
                }))
              }
            >
              <option value="">Все типы</option>
              {ADMIN_REPORT_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-reports-format">
            Формат
          </label>
          <div className="relative">
            <select
              id="admin-reports-format"
              value={formValues.format}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  format: event.target.value as ReportFormat | "",
                }))
              }
            >
              <option value="">Все форматы</option>
              {ADMIN_REPORT_FORMAT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-reports-user">
            Пользователь
          </label>
          <div className="relative">
            <select
              id="admin-reports-user"
              value={formValues.userId}
              disabled={isUsersLoading || Boolean(usersError)}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  userId: event.target.value,
                }))
              }
            >
              <option value="">
                {isUsersLoading ? "Загружаем пользователей..." : "Все пользователи"}
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}, {user.email}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-reports-limit">
            На странице
          </label>
          <div className="relative">
            <select
              id="admin-reports-limit"
              value={formValues.limit}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  limit: Number(event.target.value) || 10,
                }))
              }
            >
              {[10, 20, 50].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-white/52">
            Фильтры хранятся в URL и сбрасывают страницу на первую при изменении.
          </p>
          {usersError ? (
            <p className="text-sm text-amber-300">
              Не удалось загрузить список пользователей. Фильтр временно недоступен.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={onReset}
          >
            Сбросить
          </Button>
          <Button
            type="submit"
            className="bg-primary text-foreground hover:bg-primary-strong"
            disabled={isPending}
          >
            {isPending ? "Обновляем..." : "Применить"}
          </Button>
        </div>
      </div>
    </form>
  );
}
