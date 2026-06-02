import { Badge } from "../../../../shared/ui";
import type { ReportType } from "../../../reports/reportsTypes";
import { getAdminReportTypeLabel } from "../adminReportsUtils";
import { adminBadgeStyles } from "../../components/adminBadgeStyles";

const typeVariants: Record<ReportType, "accent" | "neutral" | "warning" | "success"> = {
  ORDER_DOCUMENT: "neutral",
  RENTAL_HISTORY: "accent",
  ADMIN_RENTAL_STATISTICS: "success",
  EQUIPMENT_UTILIZATION: "warning",
};

const typeClassNames: Record<ReportType, string> = {
  ORDER_DOCUMENT: adminBadgeStyles.neutral,
  RENTAL_HISTORY: adminBadgeStyles.info,
  ADMIN_RENTAL_STATISTICS: adminBadgeStyles.accent,
  EQUIPMENT_UTILIZATION: adminBadgeStyles.warning,
};

export type AdminReportTypeBadgeProps = {
  type: ReportType;
};

export function AdminReportTypeBadge({ type }: AdminReportTypeBadgeProps) {
  return (
    <Badge variant={typeVariants[type]} className={typeClassNames[type]}>
      {getAdminReportTypeLabel(type)}
    </Badge>
  );
}
