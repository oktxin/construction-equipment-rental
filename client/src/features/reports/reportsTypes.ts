import type { PaginationMeta } from "../catalog/catalogTypes";

export type ReportType =
  | "ORDER_DOCUMENT"
  | "RENTAL_HISTORY"
  | "ADMIN_RENTAL_STATISTICS"
  | "EQUIPMENT_UTILIZATION";

export type ReportFormat = "PDF" | "DOCX";

export type Report = {
  id: string;
  userId: string;
  rentalOrderId: string | null;
  type: ReportType;
  format: ReportFormat;
  title: string;
  fileUrl: string | null;
  downloadUrl: string;
  createdAt: string;
  rentalOrder?: {
    id: string;
    orderNumber: string;
    status: "PENDING" | "APPROVED" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "REJECTED";
  } | null;
};

export type ReportsQueryParams = {
  type?: ReportType;
  format?: ReportFormat;
  page?: number;
  limit?: number;
};

export type ReportsResponse = {
  items: Report[];
  pagination: PaginationMeta;
};

export type DownloadedReport = {
  blob: Blob;
  fileName: string;
};
