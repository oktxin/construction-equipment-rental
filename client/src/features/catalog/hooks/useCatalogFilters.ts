import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type {
  CatalogFilterState,
  CatalogQueryParams,
  CatalogSortBy,
  CatalogSortOrder,
  PersistedCatalogFilters,
  PublicEquipmentStatus,
} from "../catalogTypes";

export const CATALOG_STORAGE_KEY = "buildrent.catalog.filters";

export const DEFAULT_CATALOG_FILTERS: CatalogFilterState = {
  search: "",
  categorySlug: "",
  minPrice: undefined,
  maxPrice: undefined,
  status: undefined,
  isFeatured: false,
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  limit: 12,
};

const VALID_SORTS: CatalogSortBy[] = ["name", "dailyPrice", "createdAt", "popularity", "rating"];
const VALID_SORT_ORDERS: CatalogSortOrder[] = ["asc", "desc"];
const VALID_STATUSES: PublicEquipmentStatus[] = ["AVAILABLE", "UNAVAILABLE", "MAINTENANCE"];
const SEARCH_PARAM_KEYS = [
  "search",
  "categorySlug",
  "minPrice",
  "maxPrice",
  "status",
  "isFeatured",
  "sortBy",
  "sortOrder",
  "page",
  "limit",
] as const;

function parsePositiveNumber(value: string | null) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined;
  }

  return parsed;
}

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = parsePositiveNumber(value);

  if (parsed === undefined) {
    return fallback;
  }

  return Math.max(1, Math.floor(parsed));
}

function normalizeFilters(nextFilters: Partial<CatalogFilterState>): CatalogFilterState {
  const sortBy = VALID_SORTS.includes(nextFilters.sortBy as CatalogSortBy)
    ? (nextFilters.sortBy as CatalogSortBy)
    : DEFAULT_CATALOG_FILTERS.sortBy;

  const sortOrder = VALID_SORT_ORDERS.includes(nextFilters.sortOrder as CatalogSortOrder)
    ? (nextFilters.sortOrder as CatalogSortOrder)
    : DEFAULT_CATALOG_FILTERS.sortOrder;

  const status = VALID_STATUSES.includes(nextFilters.status as PublicEquipmentStatus)
    ? (nextFilters.status as PublicEquipmentStatus)
    : undefined;

  const minPrice =
    typeof nextFilters.minPrice === "number" && Number.isFinite(nextFilters.minPrice) && nextFilters.minPrice >= 0
      ? nextFilters.minPrice
      : undefined;

  const maxPrice =
    typeof nextFilters.maxPrice === "number" && Number.isFinite(nextFilters.maxPrice) && nextFilters.maxPrice >= 0
      ? nextFilters.maxPrice
      : undefined;

  return {
    search: (nextFilters.search ?? DEFAULT_CATALOG_FILTERS.search).trim(),
    categorySlug: (nextFilters.categorySlug ?? DEFAULT_CATALOG_FILTERS.categorySlug).trim(),
    minPrice,
    maxPrice,
    status,
    isFeatured: Boolean(nextFilters.isFeatured),
    sortBy,
    sortOrder,
    page:
      typeof nextFilters.page === "number" && Number.isFinite(nextFilters.page) && nextFilters.page > 0
        ? Math.floor(nextFilters.page)
        : DEFAULT_CATALOG_FILTERS.page,
    limit:
      typeof nextFilters.limit === "number" && Number.isFinite(nextFilters.limit) && nextFilters.limit > 0
        ? Math.floor(nextFilters.limit)
        : DEFAULT_CATALOG_FILTERS.limit,
  };
}

function hasKnownSearchParams(searchParams: URLSearchParams) {
  return SEARCH_PARAM_KEYS.some((key) => searchParams.has(key));
}

function parseFiltersFromSearchParams(searchParams: URLSearchParams) {
  return normalizeFilters({
    search: searchParams.get("search") ?? DEFAULT_CATALOG_FILTERS.search,
    categorySlug: searchParams.get("categorySlug") ?? DEFAULT_CATALOG_FILTERS.categorySlug,
    minPrice: parsePositiveNumber(searchParams.get("minPrice")),
    maxPrice: parsePositiveNumber(searchParams.get("maxPrice")),
    status: (searchParams.get("status") as PublicEquipmentStatus | null) ?? undefined,
    isFeatured: searchParams.get("isFeatured") === "true",
    sortBy: (searchParams.get("sortBy") as CatalogSortBy | null) ?? DEFAULT_CATALOG_FILTERS.sortBy,
    sortOrder: (searchParams.get("sortOrder") as CatalogSortOrder | null) ?? DEFAULT_CATALOG_FILTERS.sortOrder,
    page: parsePositiveInteger(searchParams.get("page"), DEFAULT_CATALOG_FILTERS.page),
    limit: parsePositiveInteger(searchParams.get("limit"), DEFAULT_CATALOG_FILTERS.limit),
  });
}

function buildSearchParams(filters: CatalogFilterState) {
  const normalized = normalizeFilters(filters);
  const params = new URLSearchParams();

  if (normalized.search) {
    params.set("search", normalized.search);
  }

  if (normalized.categorySlug) {
    params.set("categorySlug", normalized.categorySlug);
  }

  if (typeof normalized.minPrice === "number") {
    params.set("minPrice", String(normalized.minPrice));
  }

  if (typeof normalized.maxPrice === "number") {
    params.set("maxPrice", String(normalized.maxPrice));
  }

  if (normalized.status) {
    params.set("status", normalized.status);
  }

  if (normalized.isFeatured) {
    params.set("isFeatured", "true");
  }

  if (normalized.sortBy !== DEFAULT_CATALOG_FILTERS.sortBy) {
    params.set("sortBy", normalized.sortBy);
  }

  if (normalized.sortOrder !== DEFAULT_CATALOG_FILTERS.sortOrder) {
    params.set("sortOrder", normalized.sortOrder);
  }

  if (normalized.page > 1) {
    params.set("page", String(normalized.page));
  }

  if (normalized.limit !== DEFAULT_CATALOG_FILTERS.limit) {
    params.set("limit", String(normalized.limit));
  }

  return params;
}

function readStoredFilters() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(CATALOG_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<PersistedCatalogFilters>;
    return normalizeFilters({
      ...DEFAULT_CATALOG_FILTERS,
      ...parsed,
      page: DEFAULT_CATALOG_FILTERS.page,
    });
  } catch {
    window.localStorage.removeItem(CATALOG_STORAGE_KEY);
    return null;
  }
}

function getPersistedFilters(filters: CatalogFilterState): PersistedCatalogFilters {
  return {
    search: filters.search,
    categorySlug: filters.categorySlug,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    status: filters.status,
    isFeatured: filters.isFeatured,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    limit: filters.limit,
  };
}

function hasPersistableFilters(filters: PersistedCatalogFilters) {
  return Boolean(
    filters.search ||
      filters.categorySlug ||
      typeof filters.minPrice === "number" ||
      typeof filters.maxPrice === "number" ||
      filters.status ||
      filters.isFeatured ||
      filters.sortBy !== DEFAULT_CATALOG_FILTERS.sortBy ||
      filters.sortOrder !== DEFAULT_CATALOG_FILTERS.sortOrder ||
      filters.limit !== DEFAULT_CATALOG_FILTERS.limit,
  );
}

export function getCatalogPriceRangeError(minPrice?: number, maxPrice?: number) {
  if (typeof minPrice === "number" && typeof maxPrice === "number" && minPrice > maxPrice) {
    return "Минимальная цена не может быть больше максимальной.";
  }

  return null;
}

export function buildEquipmentQuery(filters: CatalogFilterState): CatalogQueryParams {
  const normalized = normalizeFilters(filters);

  return {
    search: normalized.search || undefined,
    categorySlug: normalized.categorySlug || undefined,
    minPrice: normalized.minPrice,
    maxPrice: normalized.maxPrice,
    status: normalized.status,
    isFeatured: normalized.isFeatured ? true : undefined,
    sortBy: normalized.sortBy,
    sortOrder: normalized.sortOrder,
    page: normalized.page,
    limit: normalized.limit,
  };
}

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isReady, setIsReady] = useState(false);
  const filters = parseFiltersFromSearchParams(searchParams);

  useEffect(() => {
    if (isReady) {
      return;
    }

    if (hasKnownSearchParams(searchParams)) {
      setIsReady(true);
      return;
    }

    const storedFilters = readStoredFilters();
    if (storedFilters) {
      setSearchParams(buildSearchParams(storedFilters), { replace: true });
      return;
    }

    setIsReady(true);
  }, [isReady, searchParams, setSearchParams]);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") {
      return;
    }

    const persistedFilters = getPersistedFilters(filters);

    if (!hasPersistableFilters(persistedFilters)) {
      window.localStorage.removeItem(CATALOG_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(persistedFilters));
  }, [filters, isReady]);

  function updateSearchState(nextFilters: CatalogFilterState) {
    setSearchParams(buildSearchParams(nextFilters), { replace: true });
  }

  function setFilter<Key extends keyof CatalogFilterState>(key: Key, value: CatalogFilterState[Key]) {
    if (key === "page") {
      setPage(Number(value));
      return;
    }

    const nextFilters = normalizeFilters({
      ...filters,
      [key]: value,
      page: 1,
    });

    updateSearchState(nextFilters);
  }

  function setPage(page: number) {
    const nextFilters = normalizeFilters({
      ...filters,
      page,
    });

    updateSearchState(nextFilters);
  }

  function setSort(sortBy: CatalogSortBy, sortOrder: CatalogSortOrder) {
    const nextFilters = normalizeFilters({
      ...filters,
      sortBy,
      sortOrder,
      page: 1,
    });

    updateSearchState(nextFilters);
  }

  function setFilters(nextFilters: Partial<CatalogFilterState>) {
    const mergedFilters = normalizeFilters({
      ...filters,
      ...nextFilters,
      page: nextFilters.page ?? 1,
    });

    updateSearchState(mergedFilters);
  }

  function replaceFilters(nextFilters: CatalogFilterState) {
    const normalized = normalizeFilters({
      ...nextFilters,
      page: 1,
    });

    updateSearchState(normalized);
  }

  function resetFilters() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CATALOG_STORAGE_KEY);
    }

    setSearchParams(new URLSearchParams(), { replace: true });
  }

  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.categorySlug) ||
    typeof filters.minPrice === "number" ||
    typeof filters.maxPrice === "number" ||
    Boolean(filters.status) ||
    filters.isFeatured ||
    filters.sortBy !== DEFAULT_CATALOG_FILTERS.sortBy ||
    filters.sortOrder !== DEFAULT_CATALOG_FILTERS.sortOrder ||
    filters.limit !== DEFAULT_CATALOG_FILTERS.limit;

  const activeFiltersCount = [
    Boolean(filters.search),
    Boolean(filters.categorySlug),
    typeof filters.minPrice === "number" || typeof filters.maxPrice === "number",
    Boolean(filters.status),
    filters.isFeatured,
  ].filter(Boolean).length;

  return {
    filters,
    isReady,
    hasActiveFilters,
    activeFiltersCount,
    priceRangeError: getCatalogPriceRangeError(filters.minPrice, filters.maxPrice),
    setFilter,
    setFilters,
    replaceFilters,
    setPage,
    setSort,
    resetFilters,
  };
}
