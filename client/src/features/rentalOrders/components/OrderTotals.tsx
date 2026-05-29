import { Card } from "../../../shared/ui";
import type { RentalOrder } from "../rentalOrdersTypes";
import {
  formatCurrency,
  formatDateRange,
  formatDaysCountLabel,
  formatItemsCountLabel,
} from "../rentalOrdersUtils";

function TotalsRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className={highlight ? "font-semibold text-foreground" : "text-foreground/62"}>
        {label}
      </span>
      <span
        className={
          highlight
            ? "font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground"
            : "font-semibold text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}

export type OrderTotalsProps = {
  order: RentalOrder;
};

export function OrderTotals({ order }: OrderTotalsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-5">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Финальная сумма
          </h2>
          <p className="mt-2 text-sm leading-6 text-foreground/62">
            Итоги по аренде, залогу и доставке уже зафиксированы в заявке.
          </p>
        </div>

        <div className="rounded-display border border-border/55 bg-background/45 p-4 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-foreground/56">Период</span>
              <span className="font-medium text-foreground">
                {formatDateRange(order.startDate, order.endDate)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-foreground/56">Срок</span>
              <span className="font-medium text-foreground">
                {formatDaysCountLabel(order.daysCount)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-foreground/56">Позиции</span>
              <span className="font-medium text-foreground">
                {formatItemsCountLabel(order.items)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TotalsRow label="Аренда" value={formatCurrency(order.subtotal)} />
          <TotalsRow label="Залог" value={formatCurrency(order.depositTotal)} />
          <TotalsRow label="Доставка" value={formatCurrency(order.deliveryPrice)} />
          <div className="border-t border-border/45 pt-4">
            <TotalsRow label="Итого" value={formatCurrency(order.totalPrice)} highlight />
          </div>
        </div>
      </div>
    </Card>
  );
}
