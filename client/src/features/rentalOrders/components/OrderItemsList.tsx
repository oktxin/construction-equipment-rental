import { Link } from "react-router-dom";

import { Card } from "../../../shared/ui";
import type { RentalOrderItem } from "../rentalOrdersTypes";
import {
  formatCurrency,
  formatDaysCountLabel,
} from "../rentalOrdersUtils";

export type OrderItemsListProps = {
  items: RentalOrderItem[];
  title?: string;
};

export function OrderItemsList({
  items,
  title = "Состав заявки",
}: OrderItemsListProps) {
  return (
    <Card className="p-6 sm:p-7">
      <div className="space-y-5">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-foreground/62">
            Каждая позиция показывает количество, ставку в день и итог по строке.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 rounded-display border border-border/60 bg-background/45 p-4 sm:grid-cols-[88px_minmax(0,1fr)] sm:p-5"
            >
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
                {item.equipment.mainImage ? (
                  <img
                    src={item.equipment.mainImage.url}
                    alt={item.equipment.mainImage.alt ?? item.equipment.name}
                    className="h-24 w-full object-cover sm:h-full"
                  />
                ) : (
                  <div className="flex h-24 items-end bg-secondary p-3 text-background sm:h-full">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                      BuildRent
                    </span>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground/46">
                    {item.equipment.category.name}
                  </p>
                  <Link
                    to={`/equipment/${item.equipment.slug}`}
                    className="mt-2 block font-heading text-xl font-semibold tracking-[-0.03em] text-foreground transition hover:text-accent-strong"
                  >
                    {item.equipment.name}
                  </Link>
                  <p className="mt-2 text-sm leading-6 text-foreground/64">
                    {[item.equipment.brand, item.equipment.model].filter(Boolean).join(" / ") ||
                      "Позиция из каталога"}
                  </p>
                </div>

                <div className="grid gap-3 rounded-display border border-border/50 bg-card px-4 py-3 text-sm md:min-w-[240px]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-foreground/56">Количество</span>
                    <span className="font-semibold text-foreground">{item.quantity} шт.</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-foreground/56">Цена в день</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(item.dailyPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-foreground/56">Срок</span>
                    <span className="font-semibold text-foreground">
                      {formatDaysCountLabel(item.daysCount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-border/45 pt-3">
                    <span className="text-foreground/56">Сумма</span>
                    <span className="font-heading text-lg font-semibold text-foreground">
                      {formatCurrency(item.lineTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
