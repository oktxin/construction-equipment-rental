import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { OrderCard } from "../../features/rentalOrders/components/OrderCard";
import { OrderStatusTabs } from "../../features/rentalOrders/components/OrderStatusTabs";
import { getMyOrders } from "../../features/rentalOrders/rentalOrdersApi";
import type { RentalOrdersResponse } from "../../features/rentalOrders/rentalOrdersTypes";
import {
  ORDER_STATUS_FILTERS,
  type OrderStatusFilterValue,
  parseOrderStatus,
} from "../../features/rentalOrders/rentalOrdersUtils";
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  LoadingSkeleton,
  PageHeader,
} from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";
import { getOrderStatusLabel } from "../../shared/utils/statusLabels";

const ORDERS_PER_PAGE = 6;

function buildPaginationItems(page: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, "ellipsis-right", totalPages] as const;
  }

  if (page >= totalPages - 2) {
    return [1, "ellipsis-left", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "ellipsis-left", page - 1, page, page + 1, "ellipsis-right", totalPages] as const;
}

function OrdersListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <LoadingSkeleton key={index} lines={6} className="min-h-[290px]" />
      ))}
    </div>
  );
}

function OrdersPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const items = buildPaginationItems(page, totalPages);

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground/62">
          Страница {page} из {totalPages}.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Назад
          </Button>

          {items.map((item, index) =>
            typeof item === "number" ? (
              <button
                key={`${item}-${index}`}
                type="button"
                className={
                  item === page
                    ? "inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-secondary bg-secondary px-3 text-sm font-semibold text-background shadow-industrial-dark"
                    : "inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-border/70 bg-white/35 px-3 text-sm font-semibold text-foreground transition hover:bg-card"
                }
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ) : (
              <span key={`${item}-${index}`} className="px-1 text-sm text-foreground/45">
                ...
              </span>
            ),
          )}

          <Button
            variant="ghost"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Далее
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function MyOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ordersData, setOrdersData] = useState<RentalOrdersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const currentStatus = (searchParams.get("status") as OrderStatusFilterValue | null) ?? "ALL";
  const parsedStatus = parseOrderStatus(currentStatus === "ALL" ? undefined : currentStatus);
  const pageFromQuery = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isFinite(pageFromQuery) && pageFromQuery > 0 ? Math.floor(pageFromQuery) : 1;

  useEffect(() => {
    let isActive = true;

    const loadOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getMyOrders({
          status: parsedStatus,
          page: currentPage,
          limit: ORDERS_PER_PAGE,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        if (!isActive) {
          return;
        }

        setOrdersData(data);
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

    void loadOrders();

    return () => {
      isActive = false;
    };
  }, [currentPage, parsedStatus, reloadKey]);

  const statusSummary = useMemo(() => {
    if (!parsedStatus) {
      return "Показаны все заявки текущего пользователя.";
    }

    return `Показаны заявки со статусом «${getOrderStatusLabel(parsedStatus)}».`;
  }, [parsedStatus]);

  const handleStatusChange = (value: OrderStatusFilterValue) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value === "ALL") {
      nextParams.delete("status");
    } else {
      nextParams.set("status", value);
    }

    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(page));
    setSearchParams(nextParams);
  };

  const handleResetStatus = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("status");
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  const orders = ordersData?.items ?? [];
  const pagination = ordersData?.pagination ?? {
    page: currentPage,
    limit: ORDERS_PER_PAGE,
    total: 0,
    totalPages: 1,
  };

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Главная", to: "/" },
            { label: "Мои заявки" },
          ]}
        />

        <PageHeader
          eyebrow="Клиентский кабинет"
          title="Мои заявки"
          description="Следите за статусами аренды, открывайте детали и скачивайте документы."
          actions={
            <Link to="/catalog">
              <Button>Перейти в каталог</Button>
            </Link>
          }
        />

        <Card className="p-5 sm:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-foreground">
                Фильтр по статусу
              </p>
              <p className="text-sm leading-6 text-foreground/62">{statusSummary}</p>
            </div>
            <OrderStatusTabs value={currentStatus} onChange={handleStatusChange} />
          </div>
        </Card>

        {error && !ordersData ? (
          <EmptyState
            title="Не удалось загрузить заявки"
            description={error}
          >
            <div className="pt-2">
              <Button onClick={() => setReloadKey((value) => value + 1)}>Повторить</Button>
            </div>
          </EmptyState>
        ) : null}

        {isLoading ? <OrdersListSkeleton /> : null}

        {!isLoading && error && ordersData ? (
          <Card className="border-danger/25 bg-danger/8 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-danger">Не удалось обновить список заявок</p>
                <p className="mt-1 text-sm leading-6 text-foreground/72">{error}</p>
              </div>
              <Button variant="ghost" onClick={() => setReloadKey((value) => value + 1)}>
                Повторить
              </Button>
            </div>
          </Card>
        ) : null}

        {!isLoading && !error && orders.length === 0 ? (
          <EmptyState
            title={parsedStatus ? "Заявок с этим статусом пока нет" : "Заявок пока нет"}
            description={
              parsedStatus
                ? "Попробуйте выбрать другой статус или вернуться к полному списку."
                : "Выберите оборудование в каталоге и оформите первую аренду."
            }
          >
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              {parsedStatus ? (
                <Button variant="ghost" onClick={handleResetStatus}>
                  Показать все заявки
                </Button>
              ) : null}
              <Link to="/catalog">
                <Button>Перейти в каталог</Button>
              </Link>
            </div>
          </EmptyState>
        ) : null}

        {!isLoading && orders.length > 0 ? (
          <>
            <Card className="p-4 sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-foreground">История аренд</p>
                  <p className="mt-1 text-sm leading-6 text-foreground/62">
                    Найдено {pagination.total} {pagination.total === 1 ? "заявка" : "заявок"}.
                  </p>
                </div>
                <p className="text-sm text-foreground/56">
                  Сортировка: сначала новые.
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            <OrdersPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : null}
      </div>
    </main>
  );
}
