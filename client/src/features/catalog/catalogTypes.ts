export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconName: string | null;
  equipmentCount: number;
};

export type EquipmentImage = {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  equipmentId?: string;
  createdAt?: string;
};

export type EquipmentSpec = {
  id: string;
  name: string;
  value: string;
  unit: string | null;
  sortOrder: number;
};

export type EquipmentStatus = "AVAILABLE" | "UNAVAILABLE" | "MAINTENANCE" | "ARCHIVED";
export type PublicEquipmentStatus = Exclude<EquipmentStatus, "ARCHIVED">;

export type CatalogSortBy = "name" | "dailyPrice" | "createdAt" | "popularity" | "rating";
export type CatalogSortOrder = "asc" | "desc";

export type EquipmentListItem = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  brand: string | null;
  model: string | null;
  dailyPrice: number;
  depositAmount: number;
  quantityAvailable: number;
  status: EquipmentStatus;
  isFeatured: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
    iconName: string | null;
  };
  mainImage: EquipmentImage | null;
  averageRating: number | null;
  reviewsCount: number;
};

export type EquipmentReview = {
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

export type EquipmentDetail = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  brand: string | null;
  model: string | null;
  dailyPrice: number;
  depositAmount: number;
  quantityTotal: number;
  quantityAvailable: number;
  power: number | null;
  weight: number | null;
  status: EquipmentStatus;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    iconName: string | null;
  };
  images: EquipmentImage[];
  specs: EquipmentSpec[];
  reviews: EquipmentReview[];
  averageRating: number | null;
  reviewsCount: number;
  similarEquipment: EquipmentListItem[];
};

export type CatalogFilterState = {
  search: string;
  categorySlug: string;
  minPrice?: number;
  maxPrice?: number;
  status?: PublicEquipmentStatus;
  isFeatured: boolean;
  sortBy: CatalogSortBy;
  sortOrder: CatalogSortOrder;
  page: number;
  limit: number;
};

export type PersistedCatalogFilters = Pick<
  CatalogFilterState,
  "search" | "categorySlug" | "minPrice" | "maxPrice" | "status" | "isFeatured" | "sortBy" | "sortOrder" | "limit"
>;

export type CatalogQueryParams = {
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: PublicEquipmentStatus;
  isFeatured?: boolean;
  sortBy?: CatalogSortBy;
  sortOrder?: CatalogSortOrder;
  page?: number;
  limit?: number;
};

export type CatalogAppliedFilters = Partial<CatalogQueryParams>;

export type CatalogResponse = {
  items: EquipmentListItem[];
  pagination: PaginationMeta;
  filters?: {
    applied?: CatalogAppliedFilters;
  };
};

export type FeaturedEquipmentResponse = EquipmentListItem[];

export type CategoriesResponse = {
  items: Category[];
  pagination: PaginationMeta;
};

export type CategoryQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
};
