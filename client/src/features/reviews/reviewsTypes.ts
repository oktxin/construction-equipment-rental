import type { EquipmentReview, PaginationMeta } from "../catalog/catalogTypes";

export type ReviewSortBy = "createdAt" | "updatedAt" | "rating";
export type ReviewSortOrder = "asc" | "desc";

export type EquipmentReviewsQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: ReviewSortBy;
  sortOrder?: ReviewSortOrder;
  rating?: number;
};

export type MyReviewsQueryParams = {
  page?: number;
  limit?: number;
};

export type ReviewEquipmentSummary = {
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

export type ReviewItem = EquipmentReview & {
  user: EquipmentReview["user"] & {
    email?: string;
  };
  equipment?: ReviewEquipmentSummary;
};

export type EquipmentReviewsResponse = {
  items: ReviewItem[];
  pagination: PaginationMeta;
};

export type MyReviewsResponse = {
  items: ReviewItem[];
  pagination: PaginationMeta;
};

export type CreateReviewPayload = {
  equipmentId: string;
  rating: number;
  text: string;
};

export type UpdateReviewPayload = {
  rating: number;
  text: string;
};

export type DeleteReviewResponse = {
  deleted: boolean;
  id: string;
};
