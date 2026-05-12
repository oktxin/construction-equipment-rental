import type { EquipmentStatus } from "@prisma/client";

export type EquipmentSortBy =
  | "name"
  | "dailyPrice"
  | "createdAt"
  | "popularity"
  | "rating";

export type EquipmentSortOrder = "asc" | "desc";

export type CatalogFiltersApplied = {
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: EquipmentStatus;
  isFeatured?: boolean;
  sortBy: EquipmentSortBy;
  sortOrder: EquipmentSortOrder;
};
