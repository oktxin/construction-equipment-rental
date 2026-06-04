import type { EquipmentStatus } from "../catalogTypes";
import { getEquipmentAvailabilityMeta } from "../catalogAvailability";
import { EquipmentAvailabilityBadge } from "./EquipmentAvailabilityBadge";

export type EquipmentAvailabilityProps = {
  status: EquipmentStatus;
  quantityAvailable: number;
};

export function EquipmentAvailability({
  status,
  quantityAvailable,
}: EquipmentAvailabilityProps) {
  const availability = getEquipmentAvailabilityMeta({ status, quantityAvailable });

  return (
    <div className="flex flex-wrap items-center gap-3">
      <EquipmentAvailabilityBadge
        status={status}
        quantityAvailable={quantityAvailable}
      />
      <span className="min-w-0 break-words text-sm text-foreground/58">
        {availability.details}
      </span>
    </div>
  );
}
