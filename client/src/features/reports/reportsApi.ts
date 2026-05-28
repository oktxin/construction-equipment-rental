import { apiClient } from "../../shared/api/apiClient";
import type {
  DownloadedReport,
  Report,
  ReportFormat,
  ReportsQueryParams,
  ReportsResponse,
} from "./reportsTypes";
import type { PaginationMeta } from "../catalog/catalogTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type RawReport = Omit<Report, "createdAt"> & {
  createdAt: string;
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

function normalizeReport(item: RawReport): Report {
  return {
    ...item,
    createdAt: item.createdAt,
  };
}

function extractFileName(contentDisposition?: string) {
  if (!contentDisposition) {
    return null;
  }

  const utfMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utfMatch?.[1]) {
    return decodeURIComponent(utfMatch[1]);
  }

  const asciiMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
  return asciiMatch?.[1] ?? null;
}

function triggerBrowserDownload({ blob, fileName }: DownloadedReport) {
  const objectUrl = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.style.display = "none";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => {
    window.URL.revokeObjectURL(objectUrl);
  }, 0);
}

export async function createOrderReport(orderId: string, format: ReportFormat) {
  const response = await apiClient.post<ApiEnvelope<Report>>(
    `/reports/order/${orderId}`,
    { format },
    { timeout: 30000 },
  );

  return unwrapData(response.data);
}

export async function getMyReports(params?: ReportsQueryParams) {
  const response = await apiClient.get<
    ApiEnvelope<{
      items: RawReport[];
      pagination: PaginationMeta;
    }>
  >("/reports/my", { params });
  const data = unwrapData(response.data);

  return {
    items: (data.items ?? []).map(normalizeReport),
    pagination: normalizePagination(data.pagination),
  } satisfies ReportsResponse;
}

export async function downloadReport(reportId: string) {
  const response = await apiClient.get<Blob>(`/reports/${reportId}/download`, {
    responseType: "blob",
    timeout: 60000,
  });

  const fileName =
    extractFileName(response.headers["content-disposition"]) ??
    `buildrent-report-${reportId}`;

  const downloadedReport = {
    blob: response.data,
    fileName,
  } satisfies DownloadedReport;

  triggerBrowserDownload(downloadedReport);

  return downloadedReport;
}
