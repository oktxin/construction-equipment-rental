import { apiClient } from "../../shared/api/apiClient";
import type {
  CatalogAppliedFilters,
  CatalogQueryParams,
  CatalogResponse,
  CategoriesResponse,
  Category,
  CategoryQueryParams,
  EquipmentDetail,
  FeaturedEquipmentResponse,
  PaginationMeta,
} from "./catalogTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type RawCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconName: string | null;
  _count?: {
    equipment?: number;
  };
};

type RawCatalogResponse = {
  items: CatalogResponse["items"];
  pagination: PaginationMeta;
  filters?: {
    applied?: CatalogAppliedFilters;
  };
};

function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

function normalizePagination(pagination: PaginationMeta): PaginationMeta {
  return {
    page: Number(pagination.page) || 1,
    limit: Number(pagination.limit) || 12,
    total: Number(pagination.total) || 0,
    totalPages: Number(pagination.totalPages) || 1,
  };
}

function normalizeCategory(category: RawCategory): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    iconName: category.iconName,
    equipmentCount: category._count?.equipment ?? 0,
  };
}

export async function getCategories(params?: CategoryQueryParams) {
  const response = await apiClient.get<
    ApiEnvelope<{ items: RawCategory[]; pagination: PaginationMeta }>
  >("/categories", { params });

  const data = unwrapData(response.data);

  return {
    items: data.items.map(normalizeCategory),
    pagination: normalizePagination(data.pagination),
  } satisfies CategoriesResponse;
}

export async function getFeaturedEquipment() {
  const response = await apiClient.get<ApiEnvelope<FeaturedEquipmentResponse>>("/equipment/featured");
  return unwrapData(response.data);
}

export async function getEquipment(params?: CatalogQueryParams) {
  const response = await apiClient.get<ApiEnvelope<RawCatalogResponse>>("/equipment", { params });
  const data = unwrapData(response.data);

  return {
    items: data.items ?? [],
    pagination: normalizePagination(data.pagination),
    filters: data.filters
      ? {
          applied: data.filters.applied ?? {},
        }
      : undefined,
  } satisfies CatalogResponse;
}

export async function getEquipmentBySlug(slug: string) {
  const response = await apiClient.get<ApiEnvelope<EquipmentDetail>>(`/equipment/${slug}`);
  return unwrapData(response.data);
}
