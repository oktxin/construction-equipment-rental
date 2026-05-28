import { useEffect, useState } from "react";

import { getCategories, getEquipment } from "../../features/catalog/catalogApi";
import { CatalogFilterPanel } from "../../features/catalog/components/CatalogFilterPanel";
import { CatalogMobileFilters } from "../../features/catalog/components/CatalogMobileFilters";
import { CatalogPagination } from "../../features/catalog/components/CatalogPagination";
import { CatalogResultsSummary } from "../../features/catalog/components/CatalogResultsSummary";
import { CatalogToolbar } from "../../features/catalog/components/CatalogToolbar";
import { EquipmentCard } from "../../features/catalog/components/EquipmentCard";
import {
  buildEquipmentQuery,
  useCatalogFilters,
} from "../../features/catalog/hooks/useCatalogFilters";
import type {
  CatalogResponse,
  Category,
} from "../../features/catalog/catalogTypes";
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  LoadingSkeleton,
  PageHeader,
} from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";
import { getEquipmentStatusLabel } from "../../shared/utils/statusLabels";

const priceFormatter = new Intl.NumberFormat("ru-BY");

function CatalogSidebarSkeleton() {
  return (
    <Card className="p-5">
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`animate-pulse rounded-2xl bg-secondary/8 ${
              index === 0 ? "h-8 w-2/3" : index < 3 ? "h-5 w-full" : "h-11 w-full"
            }`}
          />
        ))}
      </div>
    </Card>
  );
}

function CatalogGridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingSkeleton key={index} lines={6} className="min-h-[440px]" />
      ))}
    </div>
  );
}

function InlineFeedback({
  title,
  description,
  tone = "warning",
  action,
}: {
  title: string;
  description: string;
  tone?: "warning" | "danger";
  action?: React.ReactNode;
}) {
  return (
    <Card
      className={
        tone === "danger"
          ? "border-danger/25 bg-danger/8 p-5"
          : "border-warning/30 bg-warning/10 p-5"
      }
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className={tone === "danger" ? "font-semibold text-danger" : "font-semibold text-warning-strong"}>
            {title}
          </p>
          <p className="mt-1 text-sm leading-6 text-foreground/72">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </Card>
  );
}

function buildActiveFilters(filters: ReturnType<typeof useCatalogFilters>["filters"], categories: Category[]) {
  const activeFilters: string[] = [];

  if (filters.search) {
    activeFilters.push(`Поиск: ${filters.search}`);
  }

  if (filters.categorySlug) {
    const categoryLabel =
      categories.find((category) => category.slug === filters.categorySlug)?.name ?? filters.categorySlug;
    activeFilters.push(`Категория: ${categoryLabel}`);
  }

  if (typeof filters.minPrice === "number" || typeof filters.maxPrice === "number") {
    const min = typeof filters.minPrice === "number" ? `от ${priceFormatter.format(filters.minPrice)}` : "";
    const max = typeof filters.maxPrice === "number" ? `до ${priceFormatter.format(filters.maxPrice)}` : "";
    activeFilters.push(`Цена: ${[min, max].filter(Boolean).join(" ")}`);
  }

  if (filters.status) {
    activeFilters.push(`Статус: ${getEquipmentStatusLabel(filters.status)}`);
  }

  if (filters.isFeatured) {
    activeFilters.push("Только популярное");
  }

  return activeFilters;
}

export function CatalogPage() {
  const {
    filters,
    isReady,
    activeFiltersCount,
    hasActiveFilters,
    priceRangeError,
    setFilter,
    replaceFilters,
    setPage,
    setSort,
    resetFilters,
  } = useCatalogFilters();

  const [catalogData, setCatalogData] = useState<CatalogResponse | null>(null);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);

      try {
        const data = await getCategories({ limit: 100 });
        if (!isActive) {
          return;
        }

        setCategories(data.items);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setCategoriesError(getErrorMessage(error));
      } finally {
        if (isActive) {
          setCategoriesLoading(false);
        }
      }
    };

    void loadCategories();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady || priceRangeError) {
      return;
    }

    let isActive = true;

    const loadCatalog = async () => {
      setCatalogLoading(true);
      setCatalogError(null);

      try {
        const data = await getEquipment(buildEquipmentQuery(filters));
        if (!isActive) {
          return;
        }

        setCatalogData(data);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setCatalogError(getErrorMessage(error));
      } finally {
        if (isActive) {
          setCatalogLoading(false);
        }
      }
    };

    void loadCatalog();

    return () => {
      isActive = false;
    };
  }, [
    filters.categorySlug,
    filters.isFeatured,
    filters.limit,
    filters.maxPrice,
    filters.minPrice,
    filters.page,
    filters.search,
    filters.sortBy,
    filters.sortOrder,
    filters.status,
    isReady,
    priceRangeError,
    reloadKey,
  ]);

  const activeFilters = buildActiveFilters(filters, categories);
  const items = catalogData?.items ?? [];
  const pagination = catalogData?.pagination ?? {
    page: filters.page,
    limit: filters.limit,
    total: 0,
    totalPages: 1,
  };

  return (
    <>
      <section className="border-b border-border/55">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Каталог" },
            ]}
            className="mb-5"
          />

          <PageHeader
            title="Каталог оборудования"
            description="Подберите технику под задачу, срок аренды и бюджет. Поиск, фильтры и сортировка работают на живых данных backend API."
            eyebrow="Публичный каталог"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <CatalogToolbar
          filters={filters}
          activeFiltersCount={activeFiltersCount}
          onSearchChange={(search) => setFilter("search", search)}
          onSortChange={setSort}
          onLimitChange={(limit) => setFilter("limit", limit)}
          onOpenMobileFilters={() => setMobileFiltersOpen(true)}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            {categoriesLoading && categories.length === 0 ? (
              <CatalogSidebarSkeleton />
            ) : (
              <Card className="sticky top-24 p-5">
                <CatalogFilterPanel
                  filters={filters}
                  categories={categories}
                  categoriesLoading={categoriesLoading}
                  categoriesError={categoriesError}
                  priceRangeError={priceRangeError}
                  onCategoryChange={(categorySlug) => setFilter("categorySlug", categorySlug)}
                  onMinPriceChange={(minPrice) => setFilter("minPrice", minPrice)}
                  onMaxPriceChange={(maxPrice) => setFilter("maxPrice", maxPrice)}
                  onStatusChange={(status) => setFilter("status", status)}
                  onFeaturedChange={(isFeatured) => setFilter("isFeatured", isFeatured)}
                  onReset={resetFilters}
                />
              </Card>
            )}
          </aside>

          <div className="min-w-0 space-y-6">
            {catalogData ? (
              <CatalogResultsSummary
                total={pagination.total}
                page={pagination.page}
                totalPages={pagination.totalPages}
                activeFilters={activeFilters}
                onResetFilters={resetFilters}
              />
            ) : null}

            {priceRangeError ? (
              <InlineFeedback
                title="Проверьте диапазон цены"
                description={priceRangeError}
                action={
                  hasActiveFilters ? (
                    <Button variant="ghost" onClick={resetFilters}>
                      Сбросить фильтры
                    </Button>
                  ) : null
                }
              />
            ) : null}

            {catalogError && catalogData ? (
              <InlineFeedback
                title="Не удалось обновить каталог"
                description={catalogError}
                tone="danger"
                action={
                  <Button variant="ghost" onClick={() => setReloadKey((value) => value + 1)}>
                    Повторить
                  </Button>
                }
              />
            ) : null}

            {!catalogData && catalogError ? (
              <EmptyState
                title="Не удалось загрузить каталог"
                description={catalogError}
              >
                <div className="pt-2">
                  <Button onClick={() => setReloadKey((value) => value + 1)}>Повторить</Button>
                </div>
              </EmptyState>
            ) : null}

            {catalogLoading && !catalogError ? (
              <CatalogGridSkeleton count={Math.min(filters.limit, 6)} />
            ) : null}

            {!catalogLoading && !catalogError && !priceRangeError && items.length === 0 ? (
              <EmptyState
                title="Оборудование не найдено"
                description="Попробуйте изменить фильтры или сбросить параметры поиска."
              >
                <div className="pt-2">
                  <Button onClick={resetFilters}>Сбросить фильтры</Button>
                </div>
              </EmptyState>
            ) : null}

            {!catalogLoading && !catalogError && items.length > 0 ? (
              <>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((equipment) => (
                    <EquipmentCard key={equipment.id} equipment={equipment} />
                  ))}
                </div>

                <CatalogPagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={setPage}
                />
              </>
            ) : null}
          </div>
        </div>
      </section>

      <CatalogMobileFilters
        open={mobileFiltersOpen}
        filters={filters}
        categories={categories}
        categoriesLoading={categoriesLoading}
        categoriesError={categoriesError}
        onApply={replaceFilters}
        onReset={resetFilters}
        onClose={() => setMobileFiltersOpen(false)}
      />
    </>
  );
}
