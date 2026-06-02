import type { EquipmentStatus } from "../../../catalog/catalogTypes";
import { getAdminStatusBadgeClassName } from "../../components/adminBadgeStyles";
import { StatusBadge } from "../../../../shared/ui";

export type AdminEquipmentStatusBadgeProps = {
  status: EquipmentStatus;
  className?: string;
};

export function AdminEquipmentStatusBadge({
  status,
  className,
}: AdminEquipmentStatusBadgeProps) {
  return (
    <StatusBadge
      status={status}
      context="equipment"
      className={`${getAdminStatusBadgeClassName(status)} ${className ?? ""}`.trim()}
    />
  );
}
