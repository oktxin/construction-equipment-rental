import { useEffect, useState } from "react";

import { Button } from "../../../shared/ui";
import type { OrderStatus } from "../../rentalOrders/rentalOrdersTypes";
import { ADMIN_ORDER_STATUS_OPTIONS } from "../orders/adminOrdersUtils";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

type AdminOrderFilterValues = {
  search: string;
  status: OrderStatus | "";
  startDateFrom: string;
  startDateTo: string;
  limit: number;
};

export type AdminOrderFiltersProps = {
  values: AdminOrderFilterValues;
  onSubmit: (values: AdminOrderFilterValues) => void;
  onReset: () => void;
  isPending?: boolean;
};

export function AdminOrderFilters({
  values,
  onSubmit,
  onReset,
  isPending = false,
}: AdminOrderFiltersProps) {
  const [formValues, setFormValues] = useState(values);

  useEffect(() => {
    setFormValues(values);
  }, [
    values.limit,
    values.search,
    values.startDateFrom,
    values.startDateTo,
    values.status,
  ]);

  return (
    <form
      className="rounded-[28px] border border-white/10 bg-adminSurface p-5 shadow-industrial-dark"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formValues);
      }}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_220px_180px_180px_140px]">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-order-search">
            Поиск
          </label>
          <input
            id="admin-order-search"
            type="text"
            placeholder="Номер заявки, email или клиент"
            value={formValues.search}
            className={fieldClassName}
            onChange={(event) =>
              setFormValues((current) => ({ ...current, search: event.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-order-status">
            Статус
          </label>
          <div className="relative">
            <select
              id="admin-order-status"
              value={formValues.status}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  status: event.target.value as OrderStatus | "",
                }))
              }
            >
              <option value="">Все статусы</option>
              {ADMIN_ORDER_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-order-date-from">
            С даты
          </label>
          <input
            id="admin-order-date-from"
            type="date"
            value={formValues.startDateFrom}
            className={fieldClassName}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                startDateFrom: event.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-order-date-to">
            По дату
          </label>
          <input
            id="admin-order-date-to"
            type="date"
            value={formValues.startDateTo}
            className={fieldClassName}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                startDateTo: event.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-order-limit">
            На странице
          </label>
          <div className="relative">
            <select
              id="admin-order-limit"
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
          Фильтры сохраняются в URL и удобно шарятся внутри админки.
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
