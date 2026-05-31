import { apiClient } from "../../../shared/api/apiClient";
import type {
  AdminReview,
  AdminReviewsQueryParams,
  AdminReviewsResponse,
  DeleteAdminReviewResponse,
  PublishReviewPayload,
  UpdateAdminReviewPayload,
} from "./adminReviewsTypes";
import {
  normalizeAdminReview,
  normalizePagination,
  unwrapData,
} from "./adminReviewsUtils";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type RawAdminReviewsResponse = {
  items: AdminReview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

function mapUpdatePayload(payload: UpdateAdminReviewPayload) {
  return {
    rating: payload.rating,
    text: payload.text?.trim(),
  };
}

export async function getAdminReviews(params?: AdminReviewsQueryParams) {
  const response = await apiClient.get<ApiEnvelope<RawAdminReviewsResponse>>(
    "/admin/reviews",
    { params },
  );
  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeAdminReview),
    pagination: normalizePagination(data.pagination),
  } satisfies AdminReviewsResponse;
}

export async function publishReview(id: string, payload: PublishReviewPayload) {
  const response = await apiClient.patch<ApiEnvelope<AdminReview>>(
    `/admin/reviews/${id}/publish`,
    payload,
  );

  return normalizeAdminReview(unwrapData(response.data));
}

export async function updateReview(id: string, payload: UpdateAdminReviewPayload) {
  const response = await apiClient.patch<ApiEnvelope<AdminReview>>(
    `/reviews/${id}`,
    mapUpdatePayload(payload),
  );

  return normalizeAdminReview(unwrapData(response.data));
}

export async function deleteReview(id: string) {
  const response = await apiClient.delete<ApiEnvelope<DeleteAdminReviewResponse>>(
    `/reviews/${id}`,
  );

  return unwrapData(response.data);
}
