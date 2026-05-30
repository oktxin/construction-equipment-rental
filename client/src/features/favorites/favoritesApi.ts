import { apiClient } from "../../shared/api/apiClient";
import type {
  FavoriteAddResponse,
  FavoriteCheckResponse,
  FavoriteListItem,
  FavoriteRemoveResponse,
  FavoriteQueryParams,
  FavoritesResponse,
} from "./favoritesTypes";
import type { PaginationMeta } from "../catalog/catalogTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type RawFavoriteEquipment = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  dailyPrice: number;
  depositAmount: number;
  quantityTotal: number;
  status: FavoriteListItem["equipment"]["status"];
  quantityAvailable: number;
  category: FavoriteListItem["equipment"]["category"];
  mainImage: FavoriteListItem["equipment"]["mainImage"];
  averageRating: number | null;
  reviewsCount: number;
  brand?: string | null;
  model?: string | null;
  isFeatured?: boolean;
};

type RawFavoriteListItem = {
  id: string;
  createdAt: string;
  equipment: RawFavoriteEquipment;
};

function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

function normalizePagination(pagination: PaginationMeta): PaginationMeta {
  return {
    page: Number(pagination.page) || 1,
    limit: Number(pagination.limit) || 10,
    total: Number(pagination.total) || 0,
    totalPages: Number(pagination.totalPages) || 1,
  };
}

function normalizeFavoriteItem(item: RawFavoriteListItem): FavoriteListItem {
  return {
    id: item.id,
    createdAt: item.createdAt,
    equipment: {
      ...item.equipment,
      brand: item.equipment.brand ?? null,
      model: item.equipment.model ?? null,
      isFeatured: item.equipment.isFeatured ?? false,
      dailyPrice: Number(item.equipment.dailyPrice) || 0,
      depositAmount: Number(item.equipment.depositAmount) || 0,
      quantityTotal: Number(item.equipment.quantityTotal) || 0,
      quantityAvailable: Number(item.equipment.quantityAvailable) || 0,
      averageRating:
        item.equipment.averageRating === null ? null : Number(item.equipment.averageRating),
      reviewsCount: Number(item.equipment.reviewsCount) || 0,
    },
  };
}

export async function getFavorites(params?: FavoriteQueryParams) {
  const response = await apiClient.get<
    ApiEnvelope<{
      items: RawFavoriteListItem[];
      pagination: PaginationMeta;
    }>
  >("/favorites", { params });
  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeFavoriteItem),
    pagination: normalizePagination(data.pagination),
  } satisfies FavoritesResponse;
}

export async function checkFavorite(equipmentId: string) {
  const response = await apiClient.get<ApiEnvelope<FavoriteCheckResponse>>(
    `/favorites/check/${equipmentId}`,
  );

  return unwrapData(response.data);
}

export async function addFavorite(equipmentId: string) {
  const response = await apiClient.post<
    ApiEnvelope<{
      created: boolean;
      favorite: FavoriteAddResponse["favorite"];
    }>
  >(`/favorites/${equipmentId}`);
  const data = unwrapData(response.data);

  return {
    created: data.created,
    favorite: data.favorite,
    isFavorite: true,
  } satisfies FavoriteAddResponse;
}

export async function removeFavorite(equipmentId: string) {
  const response = await apiClient.delete<ApiEnvelope<FavoriteRemoveResponse>>(
    `/favorites/${equipmentId}`,
  );

  return unwrapData(response.data);
}
