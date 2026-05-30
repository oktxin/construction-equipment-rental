import { apiClient } from "../../../shared/api/apiClient";
import type { PaginationMeta } from "../../catalog/catalogTypes";
import type {
  AdminCategoryPayload,
  AdminCategoryQueryParams,
  AdminEquipmentDeleteResult,
  AdminEquipmentImageInput,
  AdminEquipmentPayload,
  AdminEquipmentQueryParams,
  AdminEquipmentSpecInput,
  AdminEquipmentUpdatePayload,
} from "./adminCatalogTypes";
import {
  mapCategoryPayload,
  mapEquipmentPayloadImages,
  mapEquipmentPayloadSpecs,
  normalizeCategory,
  normalizeDeleteResult,
  normalizeEquipment,
  normalizeEquipmentDetail,
  normalizePagination,
  unwrapData,
} from "./adminCatalogUtils";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type RawCategoriesResponse = {
  items: Array<ReturnType<typeof normalizeCategory>>;
  pagination: PaginationMeta;
};

type RawEquipmentListResponse = {
  items: Array<ReturnType<typeof normalizeEquipment>>;
  pagination: PaginationMeta;
  filters?: {
    applied?: Record<string, unknown>;
  };
};

export async function getAdminCategories(params?: AdminCategoryQueryParams) {
  const response = await apiClient.get<ApiEnvelope<RawCategoriesResponse>>("/categories", { params });
  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeCategory),
    pagination: normalizePagination(data.pagination),
  };
}

export async function createCategory(payload: AdminCategoryPayload) {
  const response = await apiClient.post<ApiEnvelope<ReturnType<typeof normalizeCategory>>>(
    "/categories",
    mapCategoryPayload(payload),
  );

  return normalizeCategory(unwrapData(response.data));
}

export async function updateCategory(id: string, payload: AdminCategoryPayload) {
  const response = await apiClient.patch<ApiEnvelope<ReturnType<typeof normalizeCategory>>>(
    `/categories/${id}`,
    mapCategoryPayload(payload),
  );

  return normalizeCategory(unwrapData(response.data));
}

export async function deleteCategory(id: string) {
  const response = await apiClient.delete<ApiEnvelope<{ deleted: boolean }>>(`/categories/${id}`);
  return unwrapData(response.data);
}

export async function getAdminEquipment(params?: AdminEquipmentQueryParams) {
  const response = await apiClient.get<ApiEnvelope<RawEquipmentListResponse>>("/equipment", { params });
  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeEquipment),
    pagination: normalizePagination(data.pagination),
    filters: data.filters,
  };
}

export async function getAdminEquipmentById(id: string) {
  const response = await apiClient.get<ApiEnvelope<ReturnType<typeof normalizeEquipmentDetail>>>(
    `/equipment/by-id/${id}`,
  );

  return normalizeEquipmentDetail(unwrapData(response.data));
}

export async function createEquipment(payload: AdminEquipmentPayload) {
  const response = await apiClient.post<ApiEnvelope<ReturnType<typeof normalizeEquipmentDetail>>>(
    "/equipment",
    {
      ...payload,
      slug: payload.slug.trim(),
      shortDescription: payload.shortDescription?.trim() ? payload.shortDescription.trim() : null,
      description: payload.description?.trim() ? payload.description.trim() : null,
      brand: payload.brand?.trim() ? payload.brand.trim() : null,
      model: payload.model?.trim() ? payload.model.trim() : null,
      power: payload.power?.trim() ? payload.power.trim() : null,
      weight: payload.weight?.trim() ? payload.weight.trim() : null,
      images: mapEquipmentPayloadImages(payload.images),
      specs: mapEquipmentPayloadSpecs(payload.specs),
    },
  );

  return normalizeEquipmentDetail(unwrapData(response.data));
}

export async function updateEquipment(id: string, payload: AdminEquipmentUpdatePayload) {
  const response = await apiClient.patch<ApiEnvelope<ReturnType<typeof normalizeEquipmentDetail>>>(
    `/equipment/${id}`,
    {
      ...payload,
      slug: payload.slug?.trim(),
      shortDescription:
        payload.shortDescription === undefined
          ? undefined
          : payload.shortDescription?.trim()
            ? payload.shortDescription.trim()
            : null,
      description:
        payload.description === undefined
          ? undefined
          : payload.description?.trim()
            ? payload.description.trim()
            : null,
      brand:
        payload.brand === undefined
          ? undefined
          : payload.brand?.trim()
            ? payload.brand.trim()
            : null,
      model:
        payload.model === undefined
          ? undefined
          : payload.model?.trim()
            ? payload.model.trim()
            : null,
      power:
        payload.power === undefined
          ? undefined
          : payload.power?.trim()
            ? payload.power.trim()
            : null,
      weight:
        payload.weight === undefined
          ? undefined
          : payload.weight?.trim()
            ? payload.weight.trim()
            : null,
    },
  );

  return normalizeEquipmentDetail(unwrapData(response.data));
}

export async function replaceEquipmentImages(id: string, images: AdminEquipmentImageInput[]) {
  const response = await apiClient.put<
    ApiEnvelope<{ id: string; name: string; slug: string; images: AdminEquipmentImageInput[] }>
  >(`/equipment/${id}/images`, {
    images: mapEquipmentPayloadImages(images),
  });

  return unwrapData(response.data);
}

export async function replaceEquipmentSpecs(id: string, specs: AdminEquipmentSpecInput[]) {
  const response = await apiClient.put<
    ApiEnvelope<{ id: string; name: string; slug: string; specs: AdminEquipmentSpecInput[] }>
  >(`/equipment/${id}/specs`, {
    specs: mapEquipmentPayloadSpecs(specs),
  });

  return unwrapData(response.data);
}

export async function deleteEquipment(id: string) {
  const response = await apiClient.delete<ApiEnvelope<AdminEquipmentDeleteResult>>(`/equipment/${id}`);
  return normalizeDeleteResult(unwrapData(response.data));
}
