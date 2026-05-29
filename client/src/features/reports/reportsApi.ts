import { apiClient } from "../../shared/api/apiClient";
import type { DownloadedReport, ReportFormat, ReportListItem } from "./reportsTypes";

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
  const response = await apiClient.post<ApiEnvelope<ReportListItem>>(
    `/reports/order/${orderId}`,
    { format },
    { timeout: 30000 },
  );

  return unwrapData(response.data);
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
