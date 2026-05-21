import { Badge } from "./Badge";

type SupportedStatus =
  | "AVAILABLE"
  | "UNAVAILABLE"
  | "MAINTENANCE"
  | "ARCHIVED"
  | "PENDING"
  | "APPROVED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

const statusVariantMap: Record<SupportedStatus, Parameters<typeof Badge>[0]["variant"]> = {
  AVAILABLE: "success",
  UNAVAILABLE: "danger",
  MAINTENANCE: "warning",
  ARCHIVED: "neutral",
  PENDING: "warning",
  APPROVED: "accent",
  ACTIVE: "accent",
  COMPLETED: "success",
  CANCELLED: "danger",
  REJECTED: "danger",
  PAID: "success",
  FAILED: "danger",
  REFUNDED: "neutral",
};

const labelMap: Record<SupportedStatus, string> = {
  AVAILABLE: "Available",
  UNAVAILABLE: "Unavailable",
  MAINTENANCE: "Maintenance",
  ARCHIVED: "Archived",
  PENDING: "Pending",
  APPROVED: "Approved",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export type StatusBadgeProps = {
  status: SupportedStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariantMap[status]} className={className}>
      {labelMap[status]}
    </Badge>
  );
}
