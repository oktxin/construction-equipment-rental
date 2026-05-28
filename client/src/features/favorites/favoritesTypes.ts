import type { EquipmentListItem, PaginationMeta } from "../catalog/catalogTypes";

export type FavoriteQueryParams = {
  page?: number;
  limit?: number;
};

export type FavoriteEquipment = EquipmentListItem;

export type FavoriteCheckResponse = {
  isFavorite: boolean;
};

export type FavoriteListItem = {
  id: string;
  createdAt: string;
  equipment: FavoriteEquipment;
};

export type FavoriteAddResponse = {
  created: boolean;
  isFavorite: true;
  favorite: FavoriteListItem;
};

export type FavoriteRemoveResponse = {
  deleted: boolean;
  equipmentId: string;
  isFavorite: false;
};

export type FavoritesResponse = {
  items: FavoriteListItem[];
  pagination: PaginationMeta;
};
