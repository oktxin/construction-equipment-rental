import { useNavigate } from "react-router-dom";

import { Button, Card, StatusBadge } from "../../../shared/ui";
import type { EquipmentDetail } from "../catalogTypes";
import { EquipmentAvailability } from "./EquipmentAvailability";
import { EquipmentPrice } from "./EquipmentPrice";
import { FavoriteButton } from "./FavoriteButton";

type EquipmentSummaryPanelProps = {
  equipment: EquipmentDetail;
};

function isRentAvailable(equipment: EquipmentDetail) {
  return equipment.status === "AVAILABLE" && equipment.quantityAvailable > 0;
}

export function EquipmentSummaryPanel({
  equipment,
}: EquipmentSummaryPanelProps) {
  const navigate = useNavigate();
  const canRent = isRentAvailable(equipment);

  return (
    <Card className="space-y-6 p-6 xl:sticky xl:top-24">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={equipment.status} context="equipment" />
          {equipment.isFeatured ? (
            <span className="rounded-full border border-accent/35 bg-accent/12 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-strong">
              Популярная позиция
            </span>
          ) : null}
        </div>

        <EquipmentPrice
          dailyPrice={equipment.dailyPrice}
          depositAmount={equipment.depositAmount}
        />

        <EquipmentAvailability
          status={equipment.status}
          quantityAvailable={equipment.quantityAvailable}
        />
      </div>

      <div className="grid gap-3 rounded-display border border-border/55 bg-background/45 p-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-foreground/62">Всего единиц</span>
          <span className="font-semibold text-foreground">{equipment.quantityTotal}</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-foreground/62">Свободно сейчас</span>
          <span className="font-semibold text-foreground">{equipment.quantityAvailable}</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-foreground/62">Категория</span>
          <span className="font-semibold text-foreground">{equipment.category.name}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          className="w-full justify-center"
          disabled={!canRent}
          onClick={() => navigate(`/checkout?equipmentId=${equipment.id}`)}
        >
          {canRent ? "Оформить аренду" : "Сейчас недоступно"}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full justify-center"
          onClick={() => navigate("/catalog")}
        >
          Вернуться в каталог
        </Button>

        <FavoriteButton equipmentId={equipment.id} />
      </div>

      <p className="text-sm leading-6 text-foreground/62">
        {canRent
          ? "Переход к оформлению ведет на защищенный checkout. Если вы еще не вошли, приложение сначала откроет страницу авторизации."
          : "Позиция временно недоступна для подтверждения аренды. Можно сохранить ее в избранное и вернуться позже."}
      </p>
    </Card>
  );
}
