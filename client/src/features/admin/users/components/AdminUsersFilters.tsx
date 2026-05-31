import { useEffect, useState } from "react";

import { Button } from "../../../../shared/ui";
import type { RoleName } from "../../../../shared/types/auth";
import { ADMIN_USER_ROLE_OPTIONS } from "../adminUsersUtils";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

export type AdminUsersFilterValues = {
  search: string;
  role: RoleName | "";
  isBlocked?: boolean;
  limit: number;
};

export type AdminUsersFiltersProps = {
  values: AdminUsersFilterValues;
  isPending?: boolean;
  onSubmit: (values: AdminUsersFilterValues) => void;
  onReset: () => void;
};

export function AdminUsersFilters({
  values,
  isPending = false,
  onSubmit,
  onReset,
}: AdminUsersFiltersProps) {
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
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_220px_220px_140px]">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-users-search">
            Поиск
          </label>
          <input
            id="admin-users-search"
            type="text"
            value={formValues.search}
            className={fieldClassName}
            placeholder="ФИО, email или телефон"
            onChange={(event) =>
              setFormValues((current) => ({ ...current, search: event.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-users-role">
            Роль
          </label>
          <div className="relative">
            <select
              id="admin-users-role"
              value={formValues.role}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  role: event.target.value as RoleName | "",
                }))
              }
            >
              <option value="">Все роли</option>
              {ADMIN_USER_ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-users-blocked">
            Доступ
          </label>
          <div className="relative">
            <select
              id="admin-users-blocked"
              value={
                typeof formValues.isBlocked === "boolean"
                  ? String(formValues.isBlocked)
                  : ""
              }
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  isBlocked:
                    event.target.value === ""
                      ? undefined
                      : event.target.value === "true",
                }))
              }
            >
              <option value="">Все пользователи</option>
              <option value="false">Только активные</option>
              <option value="true">Только заблокированные</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-users-limit">
            На странице
          </label>
          <div className="relative">
            <select
              id="admin-users-limit"
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
        <p className="text-sm text-white/52">
          Состояние фильтров хранится в URL и не теряется при возврате к странице.
        </p>
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
