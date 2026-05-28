import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "../../../shared/ui";
import {
  DEFAULT_CATALOG_FILTERS,
  getCatalogPriceRangeError,
} from "../hooks/useCatalogFilters";
import type { CatalogFilterState, Category, PublicEquipmentStatus } from "../catalogTypes";
import { CatalogFilterPanel } from "./CatalogFilterPanel";

export type CatalogMobileFiltersProps = {
  open: boolean;
  filters: CatalogFilterState;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  onApply: (filters: CatalogFilterState) => void;
  onReset: () => void;
  onClose: () => void;
};

export function CatalogMobileFilters({
  open,
  filters,
  categories,
  categoriesLoading,
  categoriesError,
  onApply,
  onReset,
  onClose,
}: CatalogMobileFiltersProps) {
  const [draftFilters, setDraftFilters] = useState<CatalogFilterState>(filters);

  useEffect(() => {
    if (!open) {
      return;
    }

    setDraftFilters(filters);
  }, [filters, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  function updateDraftFilters(nextFilters: Partial<CatalogFilterState>) {
    setDraftFilters((current) => ({
      ...current,
      ...nextFilters,
      page: 1,
    }));
  }

  const priceRangeError = getCatalogPriceRangeError(draftFilters.minPrice, draftFilters.maxPrice);

  function handleApply() {
    if (priceRangeError) {
      return;
    }

    onApply({
      ...draftFilters,
      page: 1,
    });
    onClose();
  }

  function handleReset() {
    setDraftFilters(DEFAULT_CATALOG_FILTERS);
    onReset();
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Закрыть фильтры"
        className="absolute inset-0 bg-secondary/58 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-x-0 bottom-0 max-h-[88dvh] rounded-t-[28px] border border-border/60 bg-card shadow-industrial-xl">
        <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-border/45" />

        <div className="flex items-center justify-between px-5 pb-4 pt-5">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent-strong">
              Фильтры
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Подбор каталога
            </h2>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-foreground"
            aria-label="Закрыть панель фильтров"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="max-h-[calc(88dvh-172px)] overflow-y-auto px-5 pb-6">
          <CatalogFilterPanel
            filters={draftFilters}
            categories={categories}
            categoriesLoading={categoriesLoading}
            categoriesError={categoriesError}
            priceRangeError={priceRangeError}
            onCategoryChange={(categorySlug) => updateDraftFilters({ categorySlug })}
            onMinPriceChange={(minPrice) => updateDraftFilters({ minPrice })}
            onMaxPriceChange={(maxPrice) => updateDraftFilters({ maxPrice })}
            onStatusChange={(status?: PublicEquipmentStatus) => updateDraftFilters({ status })}
            onFeaturedChange={(isFeatured) => updateDraftFilters({ isFeatured })}
            onReset={() => setDraftFilters(DEFAULT_CATALOG_FILTERS)}
            showResetButton={false}
          />
        </div>

        <div className="border-t border-border/60 bg-card/95 px-5 py-4 backdrop-blur">
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1 justify-center" onClick={handleReset}>
              Сбросить
            </Button>
            <Button className="flex-1 justify-center" onClick={handleApply} disabled={Boolean(priceRangeError)}>
              Применить
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
