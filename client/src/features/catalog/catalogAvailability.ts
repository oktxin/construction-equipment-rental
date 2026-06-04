import type { EquipmentStatus } from "./catalogTypes";

type EquipmentAvailabilityLike = {
  status: EquipmentStatus;
  quantityAvailable: number;
};

type EquipmentAvailabilityBadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export type EquipmentAvailabilityMeta = {
  label: string;
  variant: EquipmentAvailabilityBadgeVariant;
  details: string;
  rentHint: string;
};

export function isEquipmentRentable(
  equipment: EquipmentAvailabilityLike | null | undefined,
) {
  if (!equipment) {
    return false;
  }

  return equipment.status === "AVAILABLE" && equipment.quantityAvailable > 0;
}

export function getEquipmentAvailabilityMeta(
  equipment: EquipmentAvailabilityLike,
): EquipmentAvailabilityMeta {
  if (equipment.status === "AVAILABLE") {
    if (equipment.quantityAvailable > 0) {
      return {
        label: "Доступно",
        variant: "success",
        details: `${equipment.quantityAvailable} ед. свободно`,
        rentHint:
          "Переход к оформлению ведет на защищенный checkout. Если вы еще не вошли, приложение сначала откроет страницу авторизации.",
      };
    }

    return {
      label: "Нет свободных единиц",
      variant: "danger",
      details: "Нет свободных единиц",
      rentHint: "Нет свободных единиц для аренды.",
    };
  }

  if (equipment.status === "MAINTENANCE") {
    return {
      label: "На обслуживании",
      variant: "warning",
      details: "Оборудование на обслуживании",
      rentHint: "Оборудование временно недоступно: идет обслуживание.",
    };
  }

  if (equipment.status === "UNAVAILABLE") {
    return {
      label: "Недоступно",
      variant: "danger",
      details: "Недоступно для аренды",
      rentHint: "Оборудование сейчас недоступно для аренды.",
    };
  }

  return {
    label: "В архиве",
    variant: "neutral",
    details: "Позиция в архиве",
    rentHint: "Позиция находится в архиве и недоступна для аренды.",
  };
}
