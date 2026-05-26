import { StatusBadge } from "../../../shared/ui";
import type { EquipmentStatus } from "../catalogTypes";

export type EquipmentAvailabilityProps = {
  status: EquipmentStatus;
  quantityAvailable: number;
};

export function EquipmentAvailability({
  status,
  quantityAvailable,
}: EquipmentAvailabilityProps) {
  return (
    <div className="flex items-center gap-3">
      <StatusBadge status={status} context="equipment" />
      <span className="text-sm text-foreground/58">
        {quantityAvailable > 0 ? `${quantityAvailable} ед. свободно` : "Поставка по подтверждению"}
      </span>
    </div>
  );
}
