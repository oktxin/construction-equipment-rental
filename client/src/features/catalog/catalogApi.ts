import { apiClient } from "../../shared/api/apiClient";
import type {
  CatalogQueryParams,
  CatalogResponse,
  CategoriesResponse,
  Category,
  CategoryQueryParams,
  EquipmentDetail,
  EquipmentListItem,
  FeaturedEquipmentResponse,
} from "./catalogTypes";

type ApiSuccess<T> = {
  status?: "success";
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

function unwrapData<T>(response: ApiSuccess<T>) {
  return response.data;
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
  const response = await apiClient.get<ApiSuccess<{ items: RawCategory[]; pagination: CategoriesResponse["pagination"] }>>(
    "/categories",
    { params },
  );

  const data = unwrapData(response.data);

  return {
    items: data.items.map(normalizeCategory),
    pagination: data.pagination,
  } satisfies CategoriesResponse;
}

export async function getFeaturedEquipment() {
  const response = await apiClient.get<ApiSuccess<FeaturedEquipmentResponse>>("/equipment/featured");
  return unwrapData(response.data);
}

export async function getEquipment(params?: CatalogQueryParams) {
  const response = await apiClient.get<ApiSuccess<CatalogResponse>>("/equipment", { params });
  return unwrapData(response.data);
}

export async function getEquipmentBySlug(slug: string) {
  const response = await apiClient.get<ApiSuccess<EquipmentDetail>>(`/equipment/${slug}`);
  return unwrapData(response.data);
}
