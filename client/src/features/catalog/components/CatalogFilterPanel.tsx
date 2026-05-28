import { Button, Input } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import { getEquipmentStatusLabel } from "../../../shared/utils/statusLabels";
import type {
  CatalogFilterState,
  Category,
  PublicEquipmentStatus,
} from "../catalogTypes";

const statusOptions: Array<{ label: string; value?: PublicEquipmentStatus }> = [
  { label: "Все статусы" },
  { label: getEquipmentStatusLabel("AVAILABLE"), value: "AVAILABLE" },
  { label: getEquipmentStatusLabel("UNAVAILABLE"), value: "UNAVAILABLE" },
  { label: getEquipmentStatusLabel("MAINTENANCE"), value: "MAINTENANCE" },
];

function parseNumberInput(value: string) {
  if (!value.trim()) {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined;
  }

  return parsed;
}

export type CatalogFilterPanelProps = {
  filters: CatalogFilterState;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  priceRangeError?: string | null;
  onCategoryChange: (categorySlug: string) => void;
  onMinPriceChange: (minPrice?: number) => void;
  onMaxPriceChange: (maxPrice?: number) => void;
  onStatusChange: (status?: PublicEquipmentStatus) => void;
  onFeaturedChange: (isFeatured: boolean) => void;
  onReset: () => void;
  showResetButton?: boolean;
  className?: string;
};

export function CatalogFilterPanel({
  filters,
  categories,
  categoriesLoading,
  categoriesError,
  priceRangeError,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onStatusChange,
  onFeaturedChange,
  onReset,
  showResetButton = true,
  className,
}: CatalogFilterPanelProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent-strong">
          Фильтры
        </p>
        <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
          Уточните параметры выдачи
        </h2>
        <p className="mt-2 text-sm leading-6 text-foreground/66">
          Выберите категорию, диапазон цены и текущий статус техники.
        </p>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground">Категория</h3>
          {categories.length > 0 ? (
            <span className="text-xs uppercase tracking-[0.16em] text-foreground/42">
              {categories.length} разделов
            </span>
          ) : null}
        </div>

        {categoriesLoading ? (
          <div className="grid gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-11 animate-pulse rounded-2xl border border-border/60 bg-secondary/8"
              />
            ))}
          </div>
        ) : null}

        {!categoriesLoading && categoriesError ? (
          <div className="rounded-2xl border border-danger/25 bg-danger/8 px-4 py-3 text-sm leading-6 text-foreground/72">
            <p className="font-semibold text-danger">Не удалось загрузить категории</p>
            <p>{categoriesError}</p>
          </div>
        ) : null}

        {!categoriesLoading && !categoriesError ? (
          <div className="grid gap-2">
            <button
              type="button"
              className={cn(
                "flex min-h-[44px] items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition",
                filters.categorySlug
                  ? "border-border/60 bg-background/50 text-foreground/72 hover:border-border"
                  : "border-secondary bg-secondary text-background shadow-industrial-dark",
              )}
              onClick={() => onCategoryChange("")}
            >
              <span className="font-medium">Все категории</span>
              <span className={filters.categorySlug ? "text-foreground/42" : "text-white/62"}>Сброс</span>
            </button>

            {categories.map((category) => {
              const isActive = filters.categorySlug === category.slug;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={cn(
                    "flex min-h-[44px] items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition",
                    isActive
                      ? "border-primary/65 bg-primary/14 text-foreground shadow-industrial"
                      : "border-border/60 bg-background/50 text-foreground/72 hover:border-border hover:bg-white/45",
                  )}
                  onClick={() => onCategoryChange(category.slug)}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="text-xs uppercase tracking-[0.16em] text-foreground/42">
                    {category.equipmentCount}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Цена за сутки</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="catalog-min-price" className="text-xs uppercase tracking-[0.16em] text-foreground/42">
              От
            </label>
            <Input
              id="catalog-min-price"
              type="number"
              min={0}
              inputMode="numeric"
              value={filters.minPrice ?? ""}
              onChange={(event) => onMinPriceChange(parseNumberInput(event.target.value))}
              placeholder="Например, 50"
              hasError={Boolean(priceRangeError)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="catalog-max-price" className="text-xs uppercase tracking-[0.16em] text-foreground/42">
              До
            </label>
            <Input
              id="catalog-max-price"
              type="number"
              min={0}
              inputMode="numeric"
              value={filters.maxPrice ?? ""}
              onChange={(event) => onMaxPriceChange(parseNumberInput(event.target.value))}
              placeholder="Например, 300"
              hasError={Boolean(priceRangeError)}
            />
          </div>
        </div>

        {priceRangeError ? (
          <p className="text-sm leading-6 text-danger">{priceRangeError}</p>
        ) : (
          <p className="text-sm leading-6 text-foreground/60">
            Если диапазон заполнен корректно, каталог обновится автоматически.
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Статус оборудования</h3>
        <div className="grid gap-2">
          {statusOptions.map((option) => {
            const isActive = filters.status === option.value || (!filters.status && !option.value);

            return (
              <button
                key={option.label}
                type="button"
                className={cn(
                  "min-h-[44px] rounded-2xl border px-4 py-3 text-left text-sm font-medium transition",
                  isActive
                    ? "border-primary/65 bg-primary/14 text-foreground shadow-industrial"
                    : "border-border/60 bg-background/50 text-foreground/72 hover:border-border hover:bg-white/45",
                )}
                onClick={() => onStatusChange(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Подборка</h3>
        <label className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/55 px-4 py-4">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[var(--primary)]"
            checked={filters.isFeatured}
            onChange={(event) => onFeaturedChange(event.target.checked)}
          />
          <span className="space-y-1">
            <span className="block text-sm font-medium text-foreground">Только популярное</span>
            <span className="block text-sm leading-6 text-foreground/60">
              Показывать позиции, отмеченные как рекомендуемые.
            </span>
          </span>
        </label>
      </section>

      {showResetButton ? (
        <Button variant="ghost" className="w-full justify-center" onClick={onReset}>
          Сбросить фильтры
        </Button>
      ) : null}
    </div>
  );
}
