import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { OrderActions } from "../../features/rentalOrders/components/OrderActions";
import { OrderDocumentsPanel } from "../../features/rentalOrders/components/OrderDocumentsPanel";
import { OrderItemsList } from "../../features/rentalOrders/components/OrderItemsList";
import { OrderTimeline } from "../../features/rentalOrders/components/OrderTimeline";
import { OrderTotals } from "../../features/rentalOrders/components/OrderTotals";
import { getMyOrderById } from "../../features/rentalOrders/rentalOrdersApi";
import type { RentalOrder } from "../../features/rentalOrders/rentalOrdersTypes";
import {
  formatDate,
  formatDateRange,
  formatDaysCountLabel,
  getOrderSurfaceMeta,
} from "../../features/rentalOrders/rentalOrdersUtils";
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  LoadingSkeleton,
  StatusBadge,
} from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";

function OrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      <LoadingSkeleton lines={3} className="min-h-[120px]" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <LoadingSkeleton lines={8} className="min-h-[260px]" />
          <LoadingSkeleton lines={10} className="min-h-[340px]" />
          <LoadingSkeleton lines={9} className="min-h-[420px]" />
        </div>
        <div className="space-y-6">
          <LoadingSkeleton lines={7} className="min-h-[260px]" />
          <LoadingSkeleton lines={6} className="min-h-[220px]" />
          <LoadingSkeleton lines={5} className="min-h-[220px]" />
        </div>
      </div>
    </div>
  );
}

function OrderRentalDetails({ order }: { order: RentalOrder }) {
  const meta = getOrderSurfaceMeta(order);

  return (
    <Card className="p-6 sm:p-7">
      <div className="space-y-5">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Данные аренды
          </h2>
          <p className="mt-2 text-sm leading-6 text-foreground/62">
            Основные параметры заявки, комментарии и выбранный способ получения.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {meta.map((item) => (
            <div
              key={item.label}
              className="rounded-display border border-border/55 bg-background/45 p-4"
            >
              <p className="text-sm text-foreground/56">{item.label}</p>
              <p className="mt-2 font-semibold leading-6 text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-display border border-border/55 bg-card p-4">
            <p className="text-sm text-foreground/56">Адрес доставки</p>
            <p className="mt-2 text-sm leading-6 text-foreground/72">
              {order.deliveryAddress?.trim() || "Не требуется для самовывоза"}
            </p>
          </div>
          <div className="rounded-display border border-border/55 bg-card p-4">
            <p className="text-sm text-foreground/56">Срок аренды</p>
            <p className="mt-2 text-sm leading-6 text-foreground/72">
              {formatDateRange(order.startDate, order.endDate)}, {formatDaysCountLabel(order.daysCount)}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-display border border-border/55 bg-card p-4">
            <p className="text-sm text-foreground/56">Комментарий клиента</p>
            <p className="mt-2 text-sm leading-6 text-foreground/72">
              {order.customerComment?.trim() || "Комментарий не добавлен"}
            </p>
          </div>
          <div className="rounded-display border border-border/55 bg-card p-4">
            <p className="text-sm text-foreground/56">Комментарий менеджера</p>
            <p className="mt-2 text-sm leading-6 text-foreground/72">
              {order.managerComment?.trim() || "Пока без комментария"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function OrderDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<RentalOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!id) {
      setOrder(null);
      setError("Заявка не найдена");
      setIsLoading(false);
      return;
    }

    let isActive = true;

    const loadOrder = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getMyOrderById(id);
        if (!isActive) {
          return;
        }

        setOrder(data);
      } catch (loadError) {
        if (!isActive) {
          return;
        }

        setError(getErrorMessage(loadError));
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadOrder();

    return () => {
      isActive = false;
    };
  }, [id, reloadKey]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <OrderDetailSkeleton />
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          title="Не удалось загрузить заявку"
          description={error ?? "Попробуйте открыть заявку позже."}
        >
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button onClick={() => setReloadKey((value) => value + 1)}>Повторить</Button>
            <Link to="/orders">
              <Button variant="ghost">Вернуться к списку</Button>
            </Link>
          </div>
        </EmptyState>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Главная", to: "/" },
            { label: "Мои заявки", to: "/orders" },
            { label: order.orderNumber },
          ]}
        />

        <Card className="p-6 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={order.status} context="order" />
                <span className="rounded-full border border-border/60 bg-background/50 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/62">
                  Создана {formatDate(order.createdAt)}
                </span>
              </div>

              <div>
                <p className="text-sm text-foreground/56">Номер заявки</p>
                <h1 className="font-heading text-[clamp(2.4rem,4vw,4rem)] font-semibold tracking-[-0.05em] text-foreground">
                  {order.orderNumber}
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-6 text-foreground/68">
                Период аренды: {formatDateRange(order.startDate, order.endDate)}. Внутри страницы
                собраны статусы, состав заявки, документы и доступные действия.
              </p>
            </div>

            <Button variant="ghost" onClick={() => navigate("/orders")}>
              Назад к заявкам
            </Button>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <OrderTimeline order={order} />
            <OrderRentalDetails order={order} />
            <OrderItemsList items={order.items} />
          </div>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <OrderTotals order={order} />
            <OrderDocumentsPanel orderId={order.id} />
            <OrderActions order={order} onOrderUpdated={setOrder} />
          </aside>
        </div>
      </div>
    </main>
  );
}
