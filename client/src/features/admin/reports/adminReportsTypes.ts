import type { PaginationMeta } from "../../catalog/catalogTypes";
import type { ReportFormat, ReportType } from "../../reports/reportsTypes";

export type AdminReportUser = {
  id: string;
  fullName: string;
  email: string;
};

export type AdminReportRentalOrder = {
  id: string;
  orderNumber: string;
  status: "PENDING" | "APPROVED" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "REJECTED";
};

export type AdminReport = {
  id: string;
  userId: string;
  rentalOrderId: string | null;
  type: ReportType;
  format: ReportFormat;
  title: string;
  fileUrl: string | null;
  downloadUrl: string;
  createdAt: string;
  user?: AdminReportUser;
  rentalOrder?: AdminReportRentalOrder | null;
};

export type AdminReportsQueryParams = {
  type?: ReportType;
  format?: ReportFormat;
  userId?: string;
  page?: number;
  limit?: number;
};

export type AdminReportsResponse = {
  items: AdminReport[];
  pagination: PaginationMeta;
};

export type CreateAdminRentalStatisticsReportPayload = {
  format: ReportFormat;
  dateFrom: string;
  dateTo: string;
};

export type DeleteAdminReportResponse = {
  deleted: boolean;
  id: string;
  fileDeleted: boolean;
};

export type DownloadedAdminReport = {
  blob: Blob;
  fileName: string;
};
