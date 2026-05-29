import { Link } from "react-router-dom";

import { Button, Card, StatusBadge } from "../../../shared/ui";
import { getDeliveryTypeLabel } from "../../../shared/utils/statusLabels";
import type { RentalOrder } from "../rentalOrdersTypes";
import {
  formatCurrency,
  formatDate,
  formatDateRange,
  formatItemsCountLabel,
} from "../rentalOrdersUtils";

export type OrderCardProps = {
  order: RentalOrder;
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card hoverable className="p-5 sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={order.status} context="order" />
              <span className="rounded-full border border-border/60 bg-background/50 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/62">
                {getDeliveryTypeLabel(order.deliveryType)}
              </span>
            </div>

            <div>
              <p className="text-sm text-foreground/56">Заявка</p>
              <h2 className="font-heading text-[1.8rem] font-semibold tracking-[-0.04em] text-foreground">
                {order.orderNumber}
              </h2>
            </div>

            <p className="text-sm leading-6 text-foreground/68">
              Период аренды: {formatDateRange(order.startDate, order.endDate)}
            </p>
          </div>

          <div className="rounded-display border border-border/55 bg-background/50 px-4 py-3 lg:min-w-[220px]">
            <p className="text-sm text-foreground/56">Итого по заявке</p>
            <p className="mt-2 font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground">
              {formatCurrency(order.totalPrice)}
            </p>
          </div>
        </div>

        <div className="grid gap-4 border-t border-border/45 pt-5 md:grid-cols-3">
          <div>
            <p className="text-sm text-foreground/56">Создана</p>
            <p className="mt-1 font-medium text-foreground">{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-foreground/56">Позиции</p>
            <p className="mt-1 font-medium text-foreground">{formatItemsCountLabel(order.items)}</p>
          </div>
          <div>
            <p className="text-sm text-foreground/56">Комментарий клиента</p>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-foreground/72">
              {order.customerComment?.trim() || "Без комментария"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-foreground/62">
            Детали, документы и отмена заявки доступны на отдельной странице.
          </p>

          <Link to={`/orders/${order.id}`}>
            <Button variant="ghost" size="sm">
              Подробнее
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
