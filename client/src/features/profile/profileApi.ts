import { apiClient } from "../../shared/api/apiClient";
import type { ProfileUpdatePayload, ProfileUpdateResponse } from "./profileTypes";

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

export async function updateProfile(userId: string, payload: ProfileUpdatePayload) {
  const response = await apiClient.patch<ApiEnvelope<ProfileUpdateResponse>>(
    `/users/${userId}`,
    payload,
  );

  return unwrapData(response.data);
}
