import { Badge } from "../../../../shared/ui";
import type { ReportType } from "../../../reports/reportsTypes";
import { getAdminReportTypeLabel } from "../adminReportsUtils";

const typeVariants: Record<ReportType, "accent" | "neutral" | "warning" | "success"> = {
  ORDER_DOCUMENT: "neutral",
  RENTAL_HISTORY: "accent",
  ADMIN_RENTAL_STATISTICS: "success",
  EQUIPMENT_UTILIZATION: "warning",
};

export type AdminReportTypeBadgeProps = {
  type: ReportType;
};

export function AdminReportTypeBadge({ type }: AdminReportTypeBadgeProps) {
  return <Badge variant={typeVariants[type]}>{getAdminReportTypeLabel(type)}</Badge>;
}
