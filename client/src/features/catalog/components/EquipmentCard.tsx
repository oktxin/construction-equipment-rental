import { Link } from "react-router-dom";

import { Card } from "../../../shared/ui";
import type { EquipmentListItem } from "../catalogTypes";
import { EquipmentAvailability } from "./EquipmentAvailability";
import { EquipmentPrice } from "./EquipmentPrice";

const ratingFormatter = new Intl.NumberFormat("ru-BY", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const fallbackImage =
  "linear-gradient(145deg, rgba(22,24,27,0.94), rgba(46,50,56,0.78)), radial-gradient(circle at top right, rgba(242,165,49,0.22), transparent 28%)";

export type EquipmentCardProps = {
  equipment: EquipmentListItem;
};

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const imageAlt = equipment.mainImage?.alt ?? equipment.name;

  return (
    <Card hoverable className="group flex h-full flex-col overflow-hidden p-0">
      <Link to={`/equipment/${equipment.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-border/60">
          {equipment.mainImage ? (
            <img
              src={equipment.mainImage.url}
              alt={imageAlt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="flex h-full w-full items-end bg-secondary p-5 text-background"
              style={{ background: fallbackImage }}
            >
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-primary">BuildRent</p>
                <p className="max-w-[18ch] font-heading text-2xl font-semibold leading-tight tracking-[-0.04em]">
                  {equipment.name}
                </p>
              </div>
            </div>
          )}

          <div className="absolute left-4 top-4">
            <span className="rounded-full border border-white/15 bg-secondary/82 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-background backdrop-blur">
              {equipment.category.name}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-foreground">
                  {equipment.name}
                </h3>
                <p className="mt-1 text-sm uppercase tracking-[0.14em] text-foreground/42">
                  {[equipment.brand, equipment.model].filter(Boolean).join(" · ") || "Позиция каталога"}
                </p>
              </div>
              <div className="text-right">
                <div className="font-heading text-lg font-semibold tracking-[-0.03em] text-foreground">
                  {equipment.averageRating ? ratingFormatter.format(equipment.averageRating) : "—"}
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-foreground/42">
                  {equipment.reviewsCount > 0 ? `${equipment.reviewsCount} отзыв.` : "Без отзывов"}
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-foreground/68">
              {equipment.shortDescription ?? "Техника доступна для аренды с прозрачной стоимостью, контролем наличия и документами онлайн."}
            </p>
          </div>

          <EquipmentPrice dailyPrice={equipment.dailyPrice} depositAmount={equipment.depositAmount} />
          <EquipmentAvailability
            status={equipment.status}
            quantityAvailable={equipment.quantityAvailable}
          />

          <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
            <span className="text-sm font-medium text-foreground/72">Подробнее</span>
            <span className="text-sm font-semibold text-accent-strong transition duration-300 group-hover:translate-x-1">
              Открыть →
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
