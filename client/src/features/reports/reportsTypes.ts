export type ReportType =
  | "ORDER_DOCUMENT"
  | "RENTAL_HISTORY"
  | "ADMIN_RENTAL_STATISTICS"
  | "EQUIPMENT_UTILIZATION";

export type ReportFormat = "PDF" | "DOCX";

export type ReportListItem = {
  id: string;
  userId: string;
  rentalOrderId: string | null;
  type: ReportType;
  format: ReportFormat;
  title: string;
  fileUrl: string | null;
  downloadUrl: string;
  createdAt: string;
};

export type DownloadedReport = {
  blob: Blob;
  fileName: string;
};
