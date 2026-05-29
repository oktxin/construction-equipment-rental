import { apiClient } from "../../shared/api/apiClient";
import type {
  FavoriteAddResponse,
  FavoriteCheckResponse,
  FavoriteRemoveResponse,
} from "./favoritesTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
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
