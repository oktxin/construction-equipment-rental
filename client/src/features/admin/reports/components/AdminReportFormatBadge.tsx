import { Badge } from "../../../../shared/ui";
import type { ReportFormat } from "../../../reports/reportsTypes";
import { adminBadgeStyles } from "../../components/adminBadgeStyles";

export type AdminReportFormatBadgeProps = {
  format: ReportFormat;
};

export function AdminReportFormatBadge({ format }: AdminReportFormatBadgeProps) {
  return (
    <Badge
      variant={format === "PDF" ? "danger" : "accent"}
      className={format === "PDF" ? adminBadgeStyles.danger : adminBadgeStyles.info}
    >
      {format}
    </Badge>
  );
}
