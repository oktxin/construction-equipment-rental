import type {
  Category,
  EquipmentDetail,
  EquipmentImage,
  EquipmentSpec,
  PaginationMeta,
} from "../../catalog/catalogTypes";
import type {
  AdminCategory,
  AdminCategoryPayload,
  AdminEquipment,
  AdminEquipmentDeleteResult,
  AdminEquipmentDetail,
  AdminEquipmentImageInput,
  AdminEquipmentSpecInput,
} from "./adminCatalogTypes";

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
  id?: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  equipmentId?: string;
  createdAt?: string;
};

type RawEquipmentSpec = {
  id?: string;
  name: string;
  value: string;
  unit: string | null;
  sortOrder: number;
};

type RawEquipment = Omit<AdminEquipment, "dailyPrice" | "depositAmount" | "quantityTotal" | "quantityAvailable"> & {
  dailyPrice: number | string;
  depositAmount: number | string;
  quantityTotal: number | string;
  quantityAvailable: number | string;
};

type RawEquipmentDetail = Omit<AdminEquipmentDetail, "images" | "specs" | "reviews"> & {
  dailyPrice: number | string;
  depositAmount: number | string;
  quantityTotal: number | string;
  quantityAvailable: number | string;
  power: number | string | null;
  weight: number | string | null;
  averageRating: number | string | null;
  reviewsCount: number | string;
  images: RawEquipmentImage[];
  specs: RawEquipmentSpec[];
  reviews: EquipmentDetail["reviews"];
};

export const ADMIN_CATEGORY_DEFAULT_LIMIT = 10;
export const ADMIN_EQUIPMENT_DEFAULT_LIMIT = 10;

export function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

export function normalizePagination(pagination: PaginationMeta): PaginationMeta {
  return {
    page: Number(pagination.page) || 1,
    limit: Number(pagination.limit) || ADMIN_EQUIPMENT_DEFAULT_LIMIT,
    total: Number(pagination.total) || 0,
    totalPages: Number(pagination.totalPages) || 1,
  };
}

export function normalizeAdminSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

export function parseFeaturedFilter(value: string | null): boolean | undefined {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

export function formatInventoryLabel(available: number, total: number) {
  return `${available} / ${total}`;
}

export function normalizeCategory(category: RawCategory | Category | AdminCategory) {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    iconName: category.iconName,
    equipmentCount:
      "equipmentCount" in category
        ? Number(category.equipmentCount) || 0
        : category._count?.equipment ?? 0,
  } satisfies AdminCategory;
}

export function normalizeEquipmentImage(image: RawEquipmentImage | EquipmentImage): EquipmentImage {
  return {
    id: image.id ?? image.url,
    url: image.url,
    alt: image.alt,
    sortOrder: Number(image.sortOrder) || 0,
    equipmentId: image.equipmentId,
    createdAt: image.createdAt,
  };
}

export function normalizeEquipmentSpec(spec: RawEquipmentSpec | EquipmentSpec): EquipmentSpec {
  return {
    id: spec.id ?? `${spec.name}-${spec.sortOrder}`,
    name: spec.name,
    value: spec.value,
    unit: spec.unit,
    sortOrder: Number(spec.sortOrder) || 0,
  };
}

export function normalizeEquipment(item: RawEquipment | AdminEquipment): AdminEquipment {
  return {
    ...item,
    dailyPrice: Number(item.dailyPrice) || 0,
    depositAmount: Number(item.depositAmount) || 0,
    quantityTotal: Number(item.quantityTotal) || 0,
    quantityAvailable: Number(item.quantityAvailable) || 0,
  };
}

export function normalizeEquipmentDetail(item: RawEquipmentDetail | EquipmentDetail): AdminEquipmentDetail {
  return {
    ...item,
    dailyPrice: Number(item.dailyPrice) || 0,
    depositAmount: Number(item.depositAmount) || 0,
    quantityTotal: Number(item.quantityTotal) || 0,
    quantityAvailable: Number(item.quantityAvailable) || 0,
    power: item.power === null ? null : Number(item.power),
    weight: item.weight === null ? null : Number(item.weight),
    averageRating: item.averageRating === null ? null : Number(item.averageRating),
    reviewsCount: Number(item.reviewsCount) || 0,
    images: (item.images ?? []).map(normalizeEquipmentImage),
    specs: (item.specs ?? []).map(normalizeEquipmentSpec),
    reviews: item.reviews ?? [],
  };
}

export function buildAdminEquipmentSearchParams(input: {
  search?: string;
  categorySlug?: string;
  status?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (input.search?.trim()) {
    params.set("search", input.search.trim());
  }

  if (input.categorySlug?.trim()) {
    params.set("categorySlug", input.categorySlug.trim());
  }

  if (input.status) {
    params.set("status", input.status);
  }

  if (typeof input.isFeatured === "boolean") {
    params.set("isFeatured", String(input.isFeatured));
  }

  if ((input.page ?? 1) > 1) {
    params.set("page", String(input.page));
  }

  if ((input.limit ?? ADMIN_EQUIPMENT_DEFAULT_LIMIT) !== ADMIN_EQUIPMENT_DEFAULT_LIMIT) {
    params.set("limit", String(input.limit));
  }

  return params;
}

export function buildAdminCategorySearchParams(input: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (input.search?.trim()) {
    params.set("search", input.search.trim());
  }

  if ((input.page ?? 1) > 1) {
    params.set("page", String(input.page));
  }

  if ((input.limit ?? ADMIN_CATEGORY_DEFAULT_LIMIT) !== ADMIN_CATEGORY_DEFAULT_LIMIT) {
    params.set("limit", String(input.limit));
  }

  return params;
}

export function mapCategoryPayload(payload: AdminCategoryPayload) {
  return {
    name: payload.name.trim(),
    slug: normalizeAdminSlug(payload.slug),
    description: payload.description?.trim() ? payload.description.trim() : null,
    iconName: payload.iconName?.trim() ? payload.iconName.trim() : null,
  };
}

export function mapEquipmentPayloadImages(images?: AdminEquipmentImageInput[]) {
  return (images ?? []).map((image) => ({
    url: image.url.trim(),
    alt: image.alt?.trim() ? image.alt.trim() : null,
    sortOrder: Number(image.sortOrder) || 0,
  }));
}

export function mapEquipmentPayloadSpecs(specs?: AdminEquipmentSpecInput[]) {
  return (specs ?? []).map((spec) => ({
    name: spec.name.trim(),
    value: spec.value.trim(),
    unit: spec.unit?.trim() ? spec.unit.trim() : null,
    sortOrder: Number(spec.sortOrder) || 0,
  }));
}

export function normalizeDeleteResult(result: AdminEquipmentDeleteResult): AdminEquipmentDeleteResult {
  return {
    deleted: Boolean(result.deleted),
    archived: Boolean(result.archived),
    equipment: result.equipment,
  };
}
