import { apiClient } from "../../shared/api/apiClient";
import type {
  CreateReviewPayload,
  DeleteReviewResponse,
  EquipmentReviewsQueryParams,
  EquipmentReviewsResponse,
  MyReviewsQueryParams,
  MyReviewsResponse,
  ReviewItem,
  ReviewEquipmentSummary,
  UpdateReviewPayload,
} from "./reviewsTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type RawReviewItem = {
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
    email?: string;
  };
  equipment?: {
    id: string;
    name: string;
    slug: string;
    status: string;
    shortDescription: string | null;
    category: {
      id: string;
      name: string;
      slug: string;
    };
    mainImage: {
      id: string;
      url: string;
      alt: string | null;
      sortOrder: number;
    } | null;
  };
};

type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

function normalizePagination(pagination: PaginationMeta) {
  return {
    page: Number(pagination.page) || 1,
    limit: Number(pagination.limit) || 10,
    total: Number(pagination.total) || 0,
    totalPages: Number(pagination.totalPages) || 1,
  };
}

function normalizeEquipmentSummary(
  equipment: RawReviewItem["equipment"],
): ReviewEquipmentSummary | undefined {
  if (!equipment) {
    return undefined;
  }

  return {
    id: equipment.id,
    name: equipment.name,
    slug: equipment.slug,
    status: equipment.status,
    shortDescription: equipment.shortDescription,
    category: equipment.category,
    mainImage: equipment.mainImage
      ? {
          id: equipment.mainImage.id,
          url: equipment.mainImage.url,
          alt: equipment.mainImage.alt,
          sortOrder: Number(equipment.mainImage.sortOrder) || 0,
        }
      : null,
  };
}

function normalizeReview(review: RawReviewItem): ReviewItem {
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
      email: review.user.email,
    },
    equipment: normalizeEquipmentSummary(review.equipment),
  };
}

export async function getEquipmentReviews(
  equipmentId: string,
  params?: EquipmentReviewsQueryParams,
) {
  const response = await apiClient.get<ApiEnvelope<EquipmentReviewsResponse>>(
    `/reviews/equipment/${equipmentId}`,
    { params },
  );
  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeReview),
    pagination: normalizePagination(data.pagination),
  } satisfies EquipmentReviewsResponse;
}

export async function createReview(payload: CreateReviewPayload) {
  const response = await apiClient.post<ApiEnvelope<RawReviewItem>>("/reviews", payload);
  return normalizeReview(unwrapData(response.data));
}

export async function updateReview(reviewId: string, payload: UpdateReviewPayload) {
  const response = await apiClient.patch<ApiEnvelope<RawReviewItem>>(
    `/reviews/${reviewId}`,
    payload,
  );
  return normalizeReview(unwrapData(response.data));
}

export async function deleteReview(reviewId: string) {
  const response = await apiClient.delete<ApiEnvelope<DeleteReviewResponse>>(
    `/reviews/${reviewId}`,
  );

  return unwrapData(response.data);
}

export async function getMyReviews(params?: MyReviewsQueryParams) {
  const response = await apiClient.get<ApiEnvelope<MyReviewsResponse>>("/reviews/my", {
    params,
  });
  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeReview),
    pagination: normalizePagination(data.pagination),
  } satisfies MyReviewsResponse;
}
