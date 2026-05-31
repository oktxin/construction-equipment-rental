import type { PaginationMeta } from "../../catalog/catalogTypes";
import type {
  DeleteReviewResponse,
  ReviewEquipmentSummary,
  ReviewSortBy,
  ReviewSortOrder,
} from "../../reviews/reviewsTypes";

export type AdminReview = {
  id: string;
  userId?: string;
  equipmentId?: string;
  rating: number;
  text: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
  user: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    email: string;
  };
  equipment: ReviewEquipmentSummary;
};

export type AdminReviewsResponse = {
  items: AdminReview[];
  pagination: PaginationMeta;
};

export type AdminReviewsQueryParams = {
  search?: string;
  equipmentId?: string;
  userId?: string;
  rating?: number;
  isPublished?: boolean;
  page?: number;
  limit?: number;
  sortBy?: ReviewSortBy;
  sortOrder?: ReviewSortOrder;
};

export type PublishReviewPayload = {
  isPublished: boolean;
};

export type UpdateAdminReviewPayload = {
  rating?: number;
  text?: string;
};

export type DeleteAdminReviewResponse = DeleteReviewResponse;
