import { apiClient } from "../../shared/api/apiClient";
import type { EquipmentReview } from "../catalog/catalogTypes";
import type {
  EquipmentReviewsQueryParams,
  EquipmentReviewsResponse,
} from "./reviewsTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
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

function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

function normalizeReview(review: RawEquipmentReview): EquipmentReview {
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
    pagination: data.pagination,
  } satisfies EquipmentReviewsResponse;
}
