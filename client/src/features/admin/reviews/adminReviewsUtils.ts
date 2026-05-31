import type { PaginationMeta } from "../../catalog/catalogTypes";
import type { ReviewEquipmentSummary, ReviewSortBy, ReviewSortOrder } from "../../reviews/reviewsTypes";
import type { AdminReview } from "./adminReviewsTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type RawAdminReview = {
  id: string;
  userId?: string;
  equipmentId?: string;
  rating: number | string;
  text: string;
  isPublished?: boolean;
  createdAt: string;
  updatedAt?: string;
  user: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    email?: string;
  };
  equipment?: ReviewEquipmentSummary;
};

export const ADMIN_REVIEWS_DEFAULT_LIMIT = 10;

export const ADMIN_REVIEW_SORT_OPTIONS: Array<{
  value: string;
  label: string;
  sortBy: ReviewSortBy;
  sortOrder: ReviewSortOrder;
}> = [
  { value: "createdAt:desc", label: "Сначала новые", sortBy: "createdAt", sortOrder: "desc" },
  { value: "createdAt:asc", label: "Сначала старые", sortBy: "createdAt", sortOrder: "asc" },
  { value: "rating:desc", label: "Высокий рейтинг", sortBy: "rating", sortOrder: "desc" },
  { value: "rating:asc", label: "Низкий рейтинг", sortBy: "rating", sortOrder: "asc" },
  { value: "updatedAt:desc", label: "Недавно изменённые", sortBy: "updatedAt", sortOrder: "desc" },
];

export function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

export function normalizePagination(pagination: PaginationMeta): PaginationMeta {
  return {
    page: Number(pagination.page) || 1,
    limit: Number(pagination.limit) || ADMIN_REVIEWS_DEFAULT_LIMIT,
    total: Number(pagination.total) || 0,
    totalPages: Number(pagination.totalPages) || 1,
  };
}

export function normalizeAdminReview(review: RawAdminReview | AdminReview): AdminReview {
  return {
    id: review.id,
    userId: review.userId,
    equipmentId: review.equipmentId,
    rating: Number(review.rating) || 0,
    text: review.text,
    isPublished: Boolean(review.isPublished),
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    user: {
      id: review.user.id,
      fullName: review.user.fullName,
      avatarUrl: review.user.avatarUrl,
      email: review.user.email ?? "",
    },
    equipment: review.equipment as ReviewEquipmentSummary,
  };
}

export function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

export function parseRatingFilter(value: string | null): number | undefined {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 5) {
    return undefined;
  }

  return Math.floor(parsed);
}

export function parseReviewPublishedFilter(value: string | null): boolean | undefined {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

export function getAdminReviewSortValue(sortBy: ReviewSortBy, sortOrder: ReviewSortOrder) {
  return `${sortBy}:${sortOrder}`;
}

export function parseAdminReviewSortValue(value: string | null): {
  sortBy: ReviewSortBy;
  sortOrder: ReviewSortOrder;
} {
  const matchedOption = ADMIN_REVIEW_SORT_OPTIONS.find((option) => option.value === value);

  if (matchedOption) {
    return {
      sortBy: matchedOption.sortBy,
      sortOrder: matchedOption.sortOrder,
    };
  }

  return {
    sortBy: "createdAt",
    sortOrder: "desc",
  };
}

export function buildAdminReviewsSearchParams(input: {
  search?: string;
  rating?: number;
  isPublished?: boolean;
  sortBy?: ReviewSortBy;
  sortOrder?: ReviewSortOrder;
  page?: number;
  limit?: number;
  selected?: string | null;
}) {
  const params = new URLSearchParams();

  if (input.search?.trim()) {
    params.set("search", input.search.trim());
  }

  if (input.rating) {
    params.set("rating", String(input.rating));
  }

  if (typeof input.isPublished === "boolean") {
    params.set("isPublished", String(input.isPublished));
  }

  if ((input.sortBy ?? "createdAt") !== "createdAt") {
    params.set("sortBy", input.sortBy ?? "createdAt");
  }

  if ((input.sortOrder ?? "desc") !== "desc") {
    params.set("sortOrder", input.sortOrder ?? "desc");
  }

  if ((input.page ?? 1) > 1) {
    params.set("page", String(input.page));
  }

  if ((input.limit ?? ADMIN_REVIEWS_DEFAULT_LIMIT) !== ADMIN_REVIEWS_DEFAULT_LIMIT) {
    params.set("limit", String(input.limit));
  }

  if (input.selected) {
    params.set("selected", input.selected);
  }

  return params;
}

export function truncateReviewText(value: string, maxLength = 120) {
  const normalized = value.trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

export function mergeAdminReview(items: AdminReview[], updatedReview: AdminReview) {
  return items.map((item) => (item.id === updatedReview.id ? updatedReview : item));
}
