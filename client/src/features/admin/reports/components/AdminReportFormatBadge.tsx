import { Badge } from "../../../../shared/ui";
import type { ReportFormat } from "../../../reports/reportsTypes";

export type AdminReportFormatBadgeProps = {
  format: ReportFormat;
};

export function AdminReportFormatBadge({ format }: AdminReportFormatBadgeProps) {
  return <Badge variant={format === "PDF" ? "danger" : "accent"}>{format}</Badge>;
}
