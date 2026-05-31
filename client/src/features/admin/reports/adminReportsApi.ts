import { apiClient } from "../../../shared/api/apiClient";
import type {
  AdminReport,
  AdminReportsQueryParams,
  AdminReportsResponse,
  CreateAdminRentalStatisticsReportPayload,
  DeleteAdminReportResponse,
  DownloadedAdminReport,
} from "./adminReportsTypes";
import {
  buildFallbackAdminReportFileName,
  extractFileName,
  normalizeAdminReport,
  normalizePagination,
  triggerBrowserDownload,
  unwrapData,
} from "./adminReportsUtils";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type RawAdminReportsResponse = {
  items: AdminReport[];
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

export async function getAdminReports(params?: AdminReportsQueryParams) {
  const response = await apiClient.get<ApiEnvelope<RawAdminReportsResponse>>("/admin/reports", {
    params,
  });
  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeAdminReport),
    pagination: normalizePagination(data.pagination ?? data.meta),
  } satisfies AdminReportsResponse;
}

export async function createAdminRentalStatisticsReport(
  payload: CreateAdminRentalStatisticsReportPayload,
) {
  const response = await apiClient.post<ApiEnvelope<AdminReport>>(
    "/admin/reports/rental-statistics",
    payload,
    { timeout: 30000 },
  );

  return normalizeAdminReport(unwrapData(response.data));
}

export async function deleteAdminReport(id: string) {
  const response = await apiClient.delete<ApiEnvelope<DeleteAdminReportResponse>>(
    `/admin/reports/${id}`,
  );

  return unwrapData(response.data);
}

export async function downloadAdminReport(id: string) {
  const response = await apiClient.get<Blob>(`/reports/${id}/download`, {
    responseType: "blob",
    timeout: 60000,
  });
  const contentDispositionHeader = response.headers["content-disposition"];
  const contentTypeHeader = response.headers["content-type"];

  const fileName =
    extractFileName(
      typeof contentDispositionHeader === "string" ? contentDispositionHeader : undefined,
    ) ??
    buildFallbackAdminReportFileName(
      id,
      typeof contentTypeHeader === "string" ? contentTypeHeader : undefined,
    );

  const downloadedReport = {
    blob: response.data,
    fileName,
  } satisfies DownloadedAdminReport;

  triggerBrowserDownload(downloadedReport);

  return downloadedReport;
}
