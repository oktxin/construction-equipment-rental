import { type StatusLabelContext, type StatusLabelKey, getStatusLabel } from "../utils/statusLabels";
import { Badge } from "./Badge";

const statusVariantMap: Record<StatusLabelKey, Parameters<typeof Badge>[0]["variant"]> = {
  AVAILABLE: "success",
  UNAVAILABLE: "danger",
  MAINTENANCE: "warning",
  ARCHIVED: "neutral",
  DRAFT: "neutral",
  PENDING: "warning",
  APPROVED: "accent",
  ACTIVE: "accent",
  COMPLETED: "success",
  CANCELLED: "danger",
  REJECTED: "danger",
  PAID: "success",
  FAILED: "danger",
  REFUNDED: "neutral",
  PICKUP: "accent",
  DELIVERY: "accent",
  ORDER_DOCUMENT: "neutral",
  RENTAL_HISTORY: "neutral",
  ADMIN_RENTAL_STATISTICS: "accent",
  EQUIPMENT_UTILIZATION: "accent",
  PDF: "neutral",
  DOCX: "neutral",
};

export type StatusBadgeProps = {
  status: StatusLabelKey;
  context?: StatusLabelContext;
  className?: string;
};

export function StatusBadge({
  status,
  context = "generic",
  className,
}: StatusBadgeProps) {
  return (
    <Badge variant={statusVariantMap[status]} className={className}>
      {getStatusLabel(status, context)}
    </Badge>
  );
}
