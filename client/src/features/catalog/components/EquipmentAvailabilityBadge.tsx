import { Badge } from "../../../shared/ui";
import type { EquipmentStatus } from "../catalogTypes";
import { getEquipmentAvailabilityMeta } from "../catalogAvailability";

type EquipmentAvailabilityBadgeProps = {
  status: EquipmentStatus;
  quantityAvailable: number;
  className?: string;
};

export function EquipmentAvailabilityBadge({
  status,
  quantityAvailable,
  className,
}: EquipmentAvailabilityBadgeProps) {
  const availability = getEquipmentAvailabilityMeta({ status, quantityAvailable });

  return (
    <Badge variant={availability.variant} className={className}>
      {availability.label}
    </Badge>
  );
}
