import { useEffect, useState } from "react";

import { Button } from "../../../../shared/ui";
import type { ReviewSortBy, ReviewSortOrder } from "../../../reviews/reviewsTypes";
import {
  ADMIN_REVIEW_SORT_OPTIONS,
  getAdminReviewSortValue,
} from "../adminReviewsUtils";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

export type AdminReviewsFilterValues = {
  search: string;
  rating?: number;
  isPublished?: boolean;
  sortBy: ReviewSortBy;
  sortOrder: ReviewSortOrder;
  limit: number;
};

export type AdminReviewsFiltersProps = {
  values: AdminReviewsFilterValues;
  isPending?: boolean;
  onSubmit: (values: AdminReviewsFilterValues) => void;
  onReset: () => void;
};

export function AdminReviewsFilters({
  values,
  isPending = false,
  onSubmit,
  onReset,
}: AdminReviewsFiltersProps) {
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
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_180px_220px_220px_140px]">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-reviews-search">
            Поиск
          </label>
          <input
            id="admin-reviews-search"
            type="text"
            value={formValues.search}
            className={fieldClassName}
            placeholder="Текст отзыва, пользователь или техника"
            onChange={(event) =>
              setFormValues((current) => ({ ...current, search: event.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-reviews-rating">
            Рейтинг
          </label>
          <div className="relative">
            <select
              id="admin-reviews-rating"
              value={formValues.rating ?? ""}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  rating: event.target.value ? Number(event.target.value) : undefined,
                }))
              }
            >
              <option value="">Все оценки</option>
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} из 5
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-reviews-published">
            Публикация
          </label>
          <div className="relative">
            <select
              id="admin-reviews-published"
              value={
                typeof formValues.isPublished === "boolean"
                  ? String(formValues.isPublished)
                  : ""
              }
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  isPublished:
                    event.target.value === ""
                      ? undefined
                      : event.target.value === "true",
                }))
              }
            >
              <option value="">Все отзывы</option>
              <option value="true">Только опубликованные</option>
              <option value="false">Только скрытые</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-reviews-sort">
            Сортировка
          </label>
          <div className="relative">
            <select
              id="admin-reviews-sort"
              value={getAdminReviewSortValue(formValues.sortBy, formValues.sortOrder)}
              className={fieldClassName + " appearance-none pr-11"}
              onChange={(event) => {
                const nextValue = ADMIN_REVIEW_SORT_OPTIONS.find(
                  (option) => option.value === event.target.value,
                );

                if (!nextValue) {
                  return;
                }

                setFormValues((current) => ({
                  ...current,
                  sortBy: nextValue.sortBy,
                  sortOrder: nextValue.sortOrder,
                }));
              }}
            >
              {ADMIN_REVIEW_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/78" htmlFor="admin-reviews-limit">
            На странице
          </label>
          <div className="relative">
            <select
              id="admin-reviews-limit"
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
          Подборка отзывов синхронизирована с URL и удобна для повторного открытия.
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
