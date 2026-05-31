import { useEffect, useState } from "react";

import { Button } from "../../../../shared/ui";
import type { EquipmentStatus } from "../../../catalog/catalogTypes";
import type { AdminCategory } from "../adminCatalogTypes";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

const equipmentStatusOptions: Array<{ value: EquipmentStatus; label: string }> = [
  { value: "AVAILABLE", label: "Доступно" },
  { value: "UNAVAILABLE", label: "Недоступно" },
  { value: "MAINTENANCE", label: "На обслуживании" },
  { value: "ARCHIVED", label: "В архиве" },
];

export type AdminEquipmentFilterValues = {
  search: string;
  categorySlug: string;
  status: EquipmentStatus | "";
  isFeatured?: boolean;
  limit: number;
};

export type AdminEquipmentFiltersProps = {
  values: AdminEquipmentFilterValues;
  categories: AdminCategory[];
  isPending?: boolean;
  onSubmit: (values: AdminEquipmentFilterValues) => void;
  onReset: () => void;
};

export function AdminEquipmentFilters({
  values,
  categories,
  isPending = false,
  onSubmit,
  onReset,
}: AdminEquipmentFiltersProps) {
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
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_220px_220px_180px_140px]">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-search">
            Поиск
          </label>
          <input
            id="admin-equipment-search"
            type="text"
            placeholder="Название, бренд, модель или описание"
            value={formValues.search}
            className={fieldClassName}
            onChange={(event) =>
              setFormValues((current) => ({ ...current, search: event.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-category">
            Категория
          </label>
          <div className="relative">
            <select
              id="admin-equipment-category"
              value={formValues.categorySlug}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, categorySlug: event.target.value }))
              }
            >
              <option value="">Все категории</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-status">
            Статус
          </label>
          <div className="relative">
            <select
              id="admin-equipment-status"
              value={formValues.status}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  status: event.target.value as EquipmentStatus | "",
                }))
              }
            >
              <option value="">Все статусы</option>
              {equipmentStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-featured">
            Витрина
          </label>
          <div className="relative">
            <select
              id="admin-equipment-featured"
              value={
                typeof formValues.isFeatured === "boolean" ? String(formValues.isFeatured) : ""
              }
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  isFeatured:
                    event.target.value === ""
                      ? undefined
                      : event.target.value === "true",
                }))
              }
            >
              <option value="">Все позиции</option>
              <option value="true">Только на витрине</option>
              <option value="false">Без витрины</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-equipment-limit">
            На странице
          </label>
          <div className="relative">
            <select
              id="admin-equipment-limit"
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
          Фильтры сохраняются в URL, поэтому удобно возвращаться к нужной выборке.
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
