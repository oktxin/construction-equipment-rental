import type { EquipmentListItem } from "../catalog/catalogTypes";

export type FavoriteCheckResponse = {
  isFavorite: boolean;
};

export type FavoriteListItem = {
  id: string;
  createdAt: string;
  equipment: EquipmentListItem;
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
