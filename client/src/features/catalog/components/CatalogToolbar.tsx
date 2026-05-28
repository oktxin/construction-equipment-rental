import { useEffect, useState } from "react";

import { Button, Card, Input, Select } from "../../../shared/ui";
import type {
  CatalogFilterState,
  CatalogSortBy,
  CatalogSortOrder,
} from "../catalogTypes";

const sortOptions: Array<{
  label: string;
  sortBy: CatalogSortBy;
  sortOrder: CatalogSortOrder;
}> = [
  { label: "По новизне", sortBy: "createdAt", sortOrder: "desc" },
  { label: "Сначала дешевле", sortBy: "dailyPrice", sortOrder: "asc" },
  { label: "Сначала дороже", sortBy: "dailyPrice", sortOrder: "desc" },
  { label: "По названию", sortBy: "name", sortOrder: "asc" },
  { label: "По рейтингу", sortBy: "rating", sortOrder: "desc" },
];

const limitOptions = [12, 24, 36];

function getSortValue(sortBy: CatalogSortBy, sortOrder: CatalogSortOrder) {
  return `${sortBy}:${sortOrder}`;
}

export type CatalogToolbarProps = {
  filters: CatalogFilterState;
  activeFiltersCount: number;
  onSearchChange: (search: string) => void;
  onSortChange: (sortBy: CatalogSortBy, sortOrder: CatalogSortOrder) => void;
  onLimitChange: (limit: number) => void;
  onOpenMobileFilters: () => void;
};

export function CatalogToolbar({
  filters,
  activeFiltersCount,
  onSearchChange,
  onSortChange,
  onLimitChange,
  onOpenMobileFilters,
}: CatalogToolbarProps) {
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const normalizedSearch = searchValue.trim();
      if (normalizedSearch === filters.search) {
        return;
      }

      onSearchChange(normalizedSearch);
    }, 400);

    return () => window.clearTimeout(handle);
  }, [filters.search, onSearchChange, searchValue]);

  return (
    <Card className="overflow-hidden p-0">
      <div className="grid gap-4 px-5 py-5 xl:grid-cols-[minmax(0,1.6fr)_220px_160px_auto] xl:items-center">
        <div className="space-y-2">
          <label htmlFor="catalog-search" className="text-xs uppercase tracking-[0.16em] text-foreground/42">
            Поиск по каталогу
          </label>
          <Input
            id="catalog-search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Поиск по названию, бренду или модели"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="catalog-sort" className="text-xs uppercase tracking-[0.16em] text-foreground/42">
            Сортировка
          </label>
          <Select
            id="catalog-sort"
            value={getSortValue(filters.sortBy, filters.sortOrder)}
            onChange={(event) => {
              const [sortBy, sortOrder] = event.target.value.split(":") as [CatalogSortBy, CatalogSortOrder];
              onSortChange(sortBy, sortOrder);
            }}
          >
            {sortOptions.map((option) => (
              <option key={getSortValue(option.sortBy, option.sortOrder)} value={getSortValue(option.sortBy, option.sortOrder)}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="catalog-limit" className="text-xs uppercase tracking-[0.16em] text-foreground/42">
            На странице
          </label>
          <Select
            id="catalog-limit"
            value={String(filters.limit)}
            onChange={(event) => onLimitChange(Number(event.target.value))}
          >
            {limitOptions.map((limit) => (
              <option key={limit} value={limit}>
                {limit} позиций
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-end xl:justify-end">
          <Button variant="secondary" className="w-full justify-center lg:hidden" onClick={onOpenMobileFilters}>
            {activeFiltersCount > 0 ? `Фильтры (${activeFiltersCount})` : "Фильтры"}
          </Button>
        </div>
      </div>

      <div className="border-t border-border/60 bg-white/18 px-5 py-3 text-sm text-foreground/62">
        {activeFiltersCount > 0
          ? `Активных фильтров: ${activeFiltersCount}. Поиск и сортировка сохраняются после перезагрузки.`
          : "Фильтры, сортировка и лимит сохраняются в localStorage и синхронизируются с URL."}
      </div>
    </Card>
  );
}
