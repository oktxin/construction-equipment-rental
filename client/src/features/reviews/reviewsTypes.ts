import type { PaginationMeta, EquipmentReview } from "../catalog/catalogTypes";

export type ReviewSortBy = "createdAt" | "updatedAt" | "rating";
export type ReviewSortOrder = "asc" | "desc";

export type EquipmentReviewsQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: ReviewSortBy;
  sortOrder?: ReviewSortOrder;
  rating?: number;
};

export type EquipmentReviewsResponse = {
  items: EquipmentReview[];
  pagination: PaginationMeta;
};
