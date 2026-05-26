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
};

export type EquipmentSpec = {
  id: string;
  name: string;
  value: string;
  unit: string | null;
  sortOrder: number;
};

export type EquipmentStatus = "AVAILABLE" | "UNAVAILABLE" | "MAINTENANCE" | "ARCHIVED";

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
  rating: number;
  comment: string | null;
  createdAt: string;
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

export type CatalogResponse = {
  items: EquipmentListItem[];
  pagination: PaginationMeta;
  filters?: {
    applied: Record<string, unknown>;
  };
};

export type FeaturedEquipmentResponse = EquipmentListItem[];

export type CategoriesResponse = {
  items: Category[];
  pagination: PaginationMeta;
};

export type CatalogQueryParams = {
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: EquipmentStatus;
  isFeatured?: boolean;
  sortBy?: "name" | "dailyPrice" | "createdAt" | "popularity" | "rating";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export type CategoryQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
};
