import type { PaginationMeta } from "../../catalog/catalogTypes";
import type { ReportFormat, ReportType } from "../../reports/reportsTypes";
import type { AdminReport, DownloadedAdminReport } from "./adminReportsTypes";

type ApiEnvelope<T> = {
  status?: "success" | "error";
  success?: boolean;
  message?: string;
  data: T;
};

type PaginationLike = Partial<PaginationMeta> | undefined;

export const ADMIN_REPORTS_DEFAULT_LIMIT = 10;

export const ADMIN_REPORT_TYPE_OPTIONS: Array<{ value: ReportType; label: string }> = [
  { value: "ORDER_DOCUMENT", label: "Документ по заявке" },
  { value: "RENTAL_HISTORY", label: "История аренды" },
  { value: "ADMIN_RENTAL_STATISTICS", label: "Статистика аренды" },
  { value: "EQUIPMENT_UTILIZATION", label: "Использование оборудования" },
];

export const ADMIN_REPORT_FORMAT_OPTIONS: Array<{ value: ReportFormat; label: string }> = [
  { value: "PDF", label: "PDF" },
  { value: "DOCX", label: "DOCX" },
];

const reportTypeLabels: Record<ReportType, string> = {
  ORDER_DOCUMENT: "Документ по заявке",
  RENTAL_HISTORY: "История аренды",
  ADMIN_RENTAL_STATISTICS: "Статистика аренды",
  EQUIPMENT_UTILIZATION: "Использование оборудования",
};

function getFileExtensionFromContentType(contentType?: string) {
  const normalized = contentType?.toLowerCase() ?? "";

  if (normalized.includes("pdf")) {
    return "pdf";
  }

  if (
    normalized.includes("wordprocessingml") ||
    normalized.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
  ) {
    return "docx";
  }

  return "bin";
}

export function unwrapData<T>(payload: ApiEnvelope<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

export function normalizePagination(pagination: PaginationLike): PaginationMeta {
  return {
    page: Number(pagination?.page) || 1,
    limit: Number(pagination?.limit) || ADMIN_REPORTS_DEFAULT_LIMIT,
    total: Number(pagination?.total) || 0,
    totalPages: Number(pagination?.totalPages) || 1,
  };
}

export function normalizeAdminReport(report: AdminReport): AdminReport {
  return {
    ...report,
    rentalOrder: report.rentalOrder ?? null,
  };
}

export function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

export function parseReportType(value: string | null): ReportType | "" {
  if (
    value === "ORDER_DOCUMENT" ||
    value === "RENTAL_HISTORY" ||
    value === "ADMIN_RENTAL_STATISTICS" ||
    value === "EQUIPMENT_UTILIZATION"
  ) {
    return value;
  }

  return "";
}

export function parseReportFormat(value: string | null): ReportFormat | "" {
  if (value === "PDF" || value === "DOCX") {
    return value;
  }

  return "";
}

export function buildAdminReportsSearchParams(input: {
  type?: ReportType | "";
  format?: ReportFormat | "";
  userId?: string;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (input.type) {
    params.set("type", input.type);
  }

  if (input.format) {
    params.set("format", input.format);
  }

  if (input.userId?.trim()) {
    params.set("userId", input.userId.trim());
  }

  if ((input.page ?? 1) > 1) {
    params.set("page", String(input.page));
  }

  if ((input.limit ?? ADMIN_REPORTS_DEFAULT_LIMIT) !== ADMIN_REPORTS_DEFAULT_LIMIT) {
    params.set("limit", String(input.limit));
  }

  return params;
}

export function getAdminReportTypeLabel(type: ReportType) {
  return reportTypeLabels[type];
}

export function extractFileName(contentDisposition?: string) {
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

export function buildFallbackAdminReportFileName(reportId: string, contentType?: string) {
  return `buildrent-report-${reportId}.${getFileExtensionFromContentType(contentType)}`;
}

export function triggerBrowserDownload({ blob, fileName }: DownloadedAdminReport) {
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
