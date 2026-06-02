import { apiClient } from "../../shared/api/apiClient";
import { localizeSpecLabel, localizeSpecUnit, localizeSpecValue } from "../../shared/utils/specLabels";
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

type RawEquipmentImage = {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  equipmentId?: string;
  createdAt?: string;
};

type RawEquipmentSpec = {
  id: string;
  name: string;
  value: string;
  unit: string | null;
  sortOrder: number;
};

type RawEquipmentReview = {
  id: string;
  userId?: string;
  equipmentId?: string;
  rating: number;
  text: string;
  isPublished?: boolean;
  createdAt: string;
  updatedAt?: string;
  user: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
  };
};

type RawEquipmentDetail = Omit<EquipmentDetail, "images" | "specs" | "reviews"> & {
  images: RawEquipmentImage[];
  specs: RawEquipmentSpec[];
  reviews: RawEquipmentReview[];
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

function normalizeEquipmentImage(image: RawEquipmentImage) {
  return {
    id: image.id,
    url: image.url,
    alt: image.alt,
    sortOrder: Number(image.sortOrder) || 0,
    equipmentId: image.equipmentId,
    createdAt: image.createdAt,
  };
}

function normalizeEquipmentSpec(spec: RawEquipmentSpec) {
  return {
    id: spec.id,
    name: localizeSpecLabel(spec.name),
    value: localizeSpecValue(spec.value),
    unit: localizeSpecUnit(spec.unit),
    sortOrder: Number(spec.sortOrder) || 0,
  };
}

function normalizeEquipmentReview(review: RawEquipmentReview) {
  return {
    id: review.id,
    userId: review.userId,
    equipmentId: review.equipmentId,
    rating: Number(review.rating) || 0,
    text: review.text,
    isPublished: review.isPublished,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    user: {
      id: review.user.id,
      fullName: review.user.fullName,
      avatarUrl: review.user.avatarUrl,
    },
  };
}

function normalizeEquipmentDetail(equipment: RawEquipmentDetail): EquipmentDetail {
  return {
    ...equipment,
    dailyPrice: Number(equipment.dailyPrice) || 0,
    depositAmount: Number(equipment.depositAmount) || 0,
    quantityTotal: Number(equipment.quantityTotal) || 0,
    quantityAvailable: Number(equipment.quantityAvailable) || 0,
    power: equipment.power === null ? null : Number(equipment.power),
    weight: equipment.weight === null ? null : Number(equipment.weight),
    averageRating: equipment.averageRating === null ? null : Number(equipment.averageRating),
    reviewsCount: Number(equipment.reviewsCount) || 0,
    images: (equipment.images ?? []).map(normalizeEquipmentImage),
    specs: (equipment.specs ?? []).map(normalizeEquipmentSpec),
    reviews: (equipment.reviews ?? []).map(normalizeEquipmentReview),
    similarEquipment: equipment.similarEquipment ?? [],
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
  const response = await apiClient.get<ApiEnvelope<RawEquipmentDetail>>(`/equipment/${slug}`);
  const data = unwrapData(response.data);

  return normalizeEquipmentDetail(data);
}

export async function getEquipmentById(id: string) {
  const response = await apiClient.get<ApiEnvelope<RawEquipmentDetail>>(`/equipment/by-id/${id}`);
  const data = unwrapData(response.data);

  return normalizeEquipmentDetail(data);
}
