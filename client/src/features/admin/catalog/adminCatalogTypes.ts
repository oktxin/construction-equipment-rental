import type {
  CatalogQueryParams,
  CatalogResponse,
  CategoriesResponse,
  Category,
  CategoryQueryParams,
  EquipmentDetail,
  EquipmentImage,
  EquipmentListItem,
  EquipmentSpec,
  EquipmentStatus,
} from "../../catalog/catalogTypes";

export type AdminCategory = Category;
export type AdminCategoryListResponse = CategoriesResponse;
export type AdminCategoryQueryParams = CategoryQueryParams;

export type AdminCategoryPayload = {
  name: string;
  slug: string;
  description?: string | null;
  iconName?: string | null;
};

export type AdminEquipment = EquipmentListItem;
export type AdminEquipmentDetail = EquipmentDetail;
export type AdminEquipmentListResponse = CatalogResponse;
export type AdminEquipmentQueryParams = Omit<CatalogQueryParams, "status"> & {
  status?: EquipmentStatus;
};

export type AdminEquipmentImageInput = Pick<EquipmentImage, "url" | "alt" | "sortOrder">;
export type AdminEquipmentSpecInput = Pick<EquipmentSpec, "name" | "value" | "unit" | "sortOrder">;

export type AdminEquipmentPayload = {
  categoryId: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  brand?: string | null;
  model?: string | null;
  dailyPrice: number;
  depositAmount: number;
  quantityTotal: number;
  quantityAvailable: number;
  power?: string | null;
  weight?: string | null;
  status: EquipmentStatus;
  isFeatured: boolean;
  images?: AdminEquipmentImageInput[];
  specs?: AdminEquipmentSpecInput[];
};

export type AdminEquipmentUpdatePayload = Partial<Omit<AdminEquipmentPayload, "images" | "specs">>;

export type AdminEquipmentDeleteResult = {
  deleted: boolean;
  archived: boolean;
  equipment?: {
    id: string;
    status: EquipmentStatus;
    isFeatured: boolean;
  };
};
