import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, EmptyState, LoadingSkeleton, PageHeader, StatusBadge } from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";
import { formatCurrency, formatDateRange } from "../../features/rentalOrders/rentalOrdersUtils";
import { AdminStatsCard } from "../../features/admin/components/AdminStatsCard";
import { getAdminStatusBadgeClassName } from "../../features/admin/components/adminBadgeStyles";
import { getAdminOrders } from "../../features/admin/orders/adminOrdersApi";
import { buildAdminDashboardStats } from "../../features/admin/orders/adminOrdersUtils";
import type { AdminOrder } from "../../features/admin/orders/adminOrdersTypes";

async function loadDashboardOrders() {
  const firstPage = await getAdminOrders({
    page: 1,
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  let items = [...firstPage.items];

  if (firstPage.pagination.totalPages > 1) {
    const pageRequests = Array.from(
      { length: firstPage.pagination.totalPages - 1 },
      (_, index) =>
        getAdminOrders({
          page: index + 2,
          limit: 100,
          sortBy: "createdAt",
          sortOrder: "desc",
        }),
    );

    const pages = await Promise.all(pageRequests);
    items = items.concat(pages.flatMap((page) => page.items));
  }

  return items.sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

function RecentOrderRow({ order }: { order: AdminOrder }) {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-adminBackground/60 p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge
            status={order.status}
            context="order"
            className={getAdminStatusBadgeClassName(order.status)}
          />
          <span className="text-xs uppercase tracking-[0.18em] text-white/35">
            {order.orderNumber}
          </span>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-white">{order.user.fullName}</p>
          <p className="text-sm text-white/56">{order.user.email}</p>
        </div>

        <p className="text-sm leading-6 text-white/58">
          Период аренды: {formatDateRange(order.startDate, order.endDate)}
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:min-w-[220px] lg:items-end">
        <p className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
          {formatCurrency(order.totalPrice)}
        </p>
        <Link to={`/admin/orders?selected=${order.id}`}>
          <Button
            variant="ghost"
            className="w-full border-white/10 bg-adminSurface text-white hover:bg-adminSurface-strong lg:w-auto"
          >
            Открыть
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchOrders() {
    setIsLoading(true);
    setError(null);

    try {
      const items = await loadDashboardOrders();
      setOrders(items);
    } catch (fetchError) {
      setError(getErrorMessage(fetchError));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchOrders();
  }, []);

  const stats = buildAdminDashboardStats(orders);
  const recentOrders = orders.slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Панель администратора"
        title="Панель администратора"
        description="Оперативная сводка по заявкам, арендам и активности сервиса."
        actions={
          <Link to="/admin/orders">
            <Button className="bg-primary text-foreground hover:bg-primary-strong">
              Перейти к заявкам
            </Button>
          </Link>
        }
      />

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} tone="admin" className="min-h-[168px]" lines={4} />
            ))}
          </div>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
            <LoadingSkeleton tone="admin" className="min-h-[420px]" lines={8} />
            <LoadingSkeleton tone="admin" className="min-h-[320px]" lines={6} />
          </div>
        </div>
      ) : null}

      {!isLoading && error ? (
        <EmptyState
          tone="admin"
          title="Не удалось загрузить сводку"
          description={error}
        >
          <div className="pt-3">
            <Button
              className="bg-primary text-foreground hover:bg-primary-strong"
              onClick={() => void fetchOrders()}
            >
              Повторить
            </Button>
          </div>
        </EmptyState>
      ) : null}

      {!isLoading && !error ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AdminStatsCard
              label="Всего заявок"
              value={String(stats.totalOrders)}
              description="Все заявки, доступные через admin rental orders API."
              trend="Общий поток"
              tone="accent"
            />
            <AdminStatsCard
              label="Ожидают подтверждения"
              value={String(stats.pendingCount)}
              description="Новые заявки, которым требуется решение менеджера."
              trend="Приоритет"
              tone="warning"
            />
            <AdminStatsCard
              label="Активные аренды"
              value={String(stats.activeCount)}
              description="Заказы, по которым техника уже выдана клиенту."
              trend="В работе"
              tone="accent"
            />
            <AdminStatsCard
              label="Завершённые"
              value={String(stats.completedCount)}
              description="Аренды, закрытые после возврата и финальной проверки."
              trend="Закрыты"
              tone="success"
            />
            <AdminStatsCard
              label="Отмены и отклонения"
              value={String(stats.cancelledOrRejectedCount)}
              description="Заявки, которые не дошли до выдачи техники."
              trend="Контроль"
              tone="danger"
            />
            <AdminStatsCard
              label="Сумма заявок"
              value={formatCurrency(stats.totalAmount)}
              description="Суммарный денежный объём по доступным админке заказам."
              trend="BYN"
              tone="accent"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
            <section className="rounded-[32px] border border-white/10 bg-adminSurface p-5 shadow-industrial-dark sm:p-6">
              <div className="flex flex-col gap-3 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Последние заявки
                  </p>
                  <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
                    Живая очередь по заявкам
                  </h2>
                  <p className="max-w-[34rem] text-sm leading-6 text-white/58">
                    Быстрый срез по самым свежим заказам без перегруза графиками и лишними виджетами.
                  </p>
                </div>

                <Link to="/admin/orders">
                  <Button
                    variant="ghost"
                    className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                  >
                    Весь список
                  </Button>
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {recentOrders.length ? (
                  recentOrders.map((order) => <RecentOrderRow key={order.id} order={order} />)
                ) : (
                  <EmptyState
                    tone="admin"
                    title="Заявок пока нет"
                    description="Как только появятся первые обращения, здесь появится оперативная очередь."
                  />
                )}
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-adminSurface p-5 shadow-industrial-dark sm:p-6">
              <div className="space-y-2">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Быстрые действия
                </p>
                <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
                  Операционный доступ
                </h2>
                <p className="text-sm leading-6 text-white/58">
                  Короткие переходы в ключевые разделы админки.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <Link to="/admin/orders" className="block">
                  <div className="rounded-[24px] border border-primary/20 bg-primary/10 p-4 transition hover:border-primary/35 hover:bg-primary/14">
                    <p className="font-medium text-white">Перейти к заявкам</p>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      Фильтры, список заказов, detail panel, смена статусов и комментарии.
                    </p>
                  </div>
                </Link>

                <Link to="/admin/equipment" className="block">
                  <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-4 transition hover:bg-adminBackground/80">
                    <p className="font-medium text-white">Управление оборудованием</p>
                    <p className="mt-2 text-sm leading-6 text-white/56">
                      Раздел уже доступен в навигации и остаётся следующим рабочим контуром.
                    </p>
                  </div>
                </Link>

                <Link to="/admin/reviews" className="block">
                  <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-4 transition hover:bg-adminBackground/80">
                    <p className="font-medium text-white">Отзывы</p>
                    <p className="mt-2 text-sm leading-6 text-white/56">
                      Модерация клиентских отзывов и контроль публичной витрины.
                    </p>
                  </div>
                </Link>

                <Link to="/admin/reports" className="block">
                  <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-4 transition hover:bg-adminBackground/80">
                    <p className="font-medium text-white">Отчёты</p>
                    <p className="mt-2 text-sm leading-6 text-white/56">
                      История выгрузок, статистические документы и дополнительные аналитические срезы.
                    </p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </>
      ) : null}
    </div>
  );
}
