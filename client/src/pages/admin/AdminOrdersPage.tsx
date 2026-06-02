import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AdminDataTable } from "../../features/admin/components/AdminDataTable";
import { AdminOrderDetailPanel } from "../../features/admin/components/AdminOrderDetailPanel";
import { AdminOrderFilters } from "../../features/admin/components/AdminOrderFilters";
import { getAdminStatusBadgeClassName } from "../../features/admin/components/adminBadgeStyles";
import { Button, Card, EmptyState, LoadingSkeleton, PageHeader, StatusBadge } from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";
import {
  formatCurrency,
  formatDate,
  formatDateRange,
  parseOrderStatus,
} from "../../features/rentalOrders/rentalOrdersUtils";
import {
  getAdminOrderById,
  getAdminOrders,
  updateAdminOrderComment,
  updateAdminOrderStatus,
} from "../../features/admin/orders/adminOrdersApi";
import { mergeAdminOrder } from "../../features/admin/orders/adminOrdersUtils";
import type { AdminOrder } from "../../features/admin/orders/adminOrdersTypes";
import type { OrderStatus } from "../../features/rentalOrders/rentalOrdersTypes";

const DEFAULT_LIMIT = 10;

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

function buildOrdersSearchParams(input: {
  search?: string;
  status?: OrderStatus | "";
  startDateFrom?: string;
  startDateTo?: string;
  page?: number;
  limit?: number;
  selected?: string | null;
}) {
  const params = new URLSearchParams();

  if (input.search?.trim()) {
    params.set("search", input.search.trim());
  }

  if (input.status) {
    params.set("status", input.status);
  }

  if (input.startDateFrom) {
    params.set("startDateFrom", input.startDateFrom);
  }

  if (input.startDateTo) {
    params.set("startDateTo", input.startDateTo);
  }

  if ((input.page ?? 1) > 1) {
    params.set("page", String(input.page));
  }

  if ((input.limit ?? DEFAULT_LIMIT) !== DEFAULT_LIMIT) {
    params.set("limit", String(input.limit));
  }

  if (input.selected) {
    params.set("selected", input.selected);
  }

  return params;
}

function MobileOrderCard({
  order,
  onOpen,
}: {
  order: AdminOrder;
  onOpen: (id: string) => void;
}) {
  return (
    <Card tone="admin" className="p-4">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <StatusBadge
              status={order.status}
              context="order"
              className={getAdminStatusBadgeClassName(order.status)}
            />
            <div>
              <p className="font-medium text-white">{order.orderNumber}</p>
              <p className="mt-1 text-sm text-white/56">{order.user.fullName}</p>
            </div>
          </div>
          <p className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
            {formatCurrency(order.totalPrice)}
          </p>
        </div>

        <div className="grid gap-3 rounded-[22px] border border-white/8 bg-adminBackground/60 p-4 text-sm text-white/64">
          <div className="flex items-center justify-between gap-4">
            <span>Контакт</span>
            <span className="text-right text-white">{order.user.email}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Период</span>
            <span className="text-right text-white">
              {formatDateRange(order.startDate, order.endDate)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Создана</span>
            <span className="text-right text-white">{formatDate(order.createdAt)}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
          onClick={() => onOpen(order.id)}
        >
          Открыть
        </Button>
      </div>
    </Card>
  );
}

export function AdminOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const status = parseOrderStatus(searchParams.get("status"));
  const startDateFrom = searchParams.get("startDateFrom") ?? "";
  const startDateTo = searchParams.get("startDateTo") ?? "";
  const page = parsePositiveInteger(searchParams.get("page"), 1);
  const limit = parsePositiveInteger(searchParams.get("limit"), DEFAULT_LIMIT);
  const selectedOrderId = searchParams.get("selected");

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [statusValue, setStatusValue] = useState<OrderStatus>("PENDING");
  const [statusComment, setStatusComment] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [commentMessage, setCommentMessage] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);

  async function fetchOrders(silent = false) {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const response = await getAdminOrders({
        search: search || undefined,
        status,
        startDateFrom: startDateFrom || undefined,
        startDateTo: startDateTo || undefined,
        page,
        limit,
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      setOrders(response.items);
      setPagination(response.pagination);
    } catch (fetchError) {
      setError(getErrorMessage(fetchError));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  async function fetchOrderDetail(orderId: string) {
    const orderFromList = orders.find((item) => item.id === orderId) ?? null;

    setSelectedOrder(orderFromList);
    setDetailLoading(true);
    setDetailError(null);

    try {
      const order = await getAdminOrderById(orderId);
      setSelectedOrder(order);
    } catch (fetchError) {
      setDetailError(getErrorMessage(fetchError));
    } finally {
      setDetailLoading(false);
    }
  }

  useEffect(() => {
    void fetchOrders(orders.length > 0);
  }, [search, status, startDateFrom, startDateTo, page, limit]);

  useEffect(() => {
    if (!selectedOrderId) {
      setSelectedOrder(null);
      setDetailError(null);
      setDetailLoading(false);
      return;
    }

    void fetchOrderDetail(selectedOrderId);
  }, [selectedOrderId]);

  useEffect(() => {
    if (!selectedOrder) {
      return;
    }

    const nextComment = selectedOrder.managerComment ?? "";

    setStatusValue(selectedOrder.status);
    setStatusComment(nextComment);
    setCommentValue(nextComment);
  }, [selectedOrder]);

  useEffect(() => {
    if (!selectedOrder) {
      return;
    }

    setStatusMessage(null);
    setStatusError(null);
    setCommentMessage(null);
    setCommentError(null);
  }, [selectedOrder?.id]);

  async function handleStatusSubmit() {
    if (!selectedOrder) {
      return;
    }

    setIsUpdatingStatus(true);
    setStatusMessage(null);
    setStatusError(null);

    try {
      const updatedOrder = await updateAdminOrderStatus(selectedOrder.id, {
        status: statusValue,
        managerComment: statusComment.trim() ? statusComment.trim() : null,
      });

      setSelectedOrder(updatedOrder);
      setCommentValue(updatedOrder.managerComment ?? "");
      setOrders((current) => mergeAdminOrder(current, updatedOrder));
      setStatusMessage("Статус заявки обновлён");
      void fetchOrders(true);
    } catch (updateError) {
      setStatusError(getErrorMessage(updateError));
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  async function handleCommentSubmit() {
    if (!selectedOrder) {
      return;
    }

    setIsUpdatingComment(true);
    setCommentMessage(null);
    setCommentError(null);

    try {
      const updatedOrder = await updateAdminOrderComment(selectedOrder.id, {
        managerComment: commentValue.trim() ? commentValue.trim() : null,
      });

      setSelectedOrder(updatedOrder);
      setStatusComment(updatedOrder.managerComment ?? "");
      setOrders((current) => mergeAdminOrder(current, updatedOrder));
      setCommentMessage("Комментарий менеджера сохранён");
    } catch (updateError) {
      setCommentError(getErrorMessage(updateError));
    } finally {
      setIsUpdatingComment(false);
    }
  }

  function handleApplyFilters(values: {
    search: string;
    status: OrderStatus | "";
    startDateFrom: string;
    startDateTo: string;
    limit: number;
  }) {
    setSearchParams(
      buildOrdersSearchParams({
        ...values,
        page: 1,
      }),
    );
  }

  function handleResetFilters() {
    setSearchParams(new URLSearchParams());
  }

  function handleChangePage(nextPage: number) {
    setSearchParams(
      buildOrdersSearchParams({
        search,
        status: status ?? "",
        startDateFrom,
        startDateTo,
        limit,
        page: nextPage,
        selected: selectedOrderId,
      }),
    );
  }

  function handleOpenDetail(orderId: string) {
    setSearchParams(
      buildOrdersSearchParams({
        search,
        status: status ?? "",
        startDateFrom,
        startDateTo,
        limit,
        page,
        selected: orderId,
      }),
    );
  }

  function handleCloseDetail() {
    setSearchParams(
      buildOrdersSearchParams({
        search,
        status: status ?? "",
        startDateFrom,
        startDateTo,
        limit,
        page,
      }),
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Панель администратора"
        title="Заявки на аренду"
        description="Подтверждайте заявки, отслеживайте статусы и управляйте комментариями менеджера."
        actions={
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-adminBackground/60 px-4 py-2 text-sm text-white/64">
            <span>Всего в выборке</span>
            <span className="font-semibold text-white">{pagination.total}</span>
          </div>
        }
      />

      <AdminOrderFilters
        values={{
          search,
          status: status ?? "",
          startDateFrom,
          startDateTo,
          limit,
        }}
        isPending={isRefreshing}
        onSubmit={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {isLoading ? <LoadingSkeleton tone="admin" lines={10} className="min-h-[420px]" /> : null}

      {!isLoading && error ? (
        <EmptyState
          tone="admin"
          title="Не удалось загрузить заявки"
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
          {isRefreshing ? (
            <div className="rounded-full border border-white/10 bg-adminSurface px-4 py-2 text-sm text-white/56">
              Обновляем список заявок...
            </div>
          ) : null}

          <AdminDataTable
            rows={orders}
            getRowKey={(order) => order.id}
            emptyState={
              <EmptyState
                tone="admin"
                title="Заявки не найдены"
                description="Измените фильтры или очистите поиск, чтобы увидеть другие заявки."
              />
            }
            renderMobileCard={(order) => (
              <MobileOrderCard order={order} onOpen={handleOpenDetail} />
            )}
            columns={[
              {
                key: "orderNumber",
                header: "Заявка",
                cellClassName: "min-w-[180px]",
                render: (order) => (
                  <div className="space-y-2">
                    <p className="font-medium text-white">{order.orderNumber}</p>
                    <p className="text-sm text-white/56">
                      {formatDateRange(order.startDate, order.endDate)}
                    </p>
                  </div>
                ),
              },
              {
                key: "customer",
                header: "Клиент",
                cellClassName: "min-w-[220px]",
                render: (order) => (
                  <div className="space-y-1">
                    <p className="font-medium text-white">{order.user.fullName}</p>
                    <p className="text-sm text-white/56">{order.user.email}</p>
                    <p className="text-sm text-white/48">{order.user.phone || "Телефон не указан"}</p>
                  </div>
                ),
              },
              {
                key: "delivery",
                header: "Получение",
                cellClassName: "min-w-[150px]",
                render: (order) => (
                  <div className="space-y-1">
                    <p className="text-white">{order.deliveryType === "DELIVERY" ? "Доставка" : "Самовывоз"}</p>
                    <p className="text-sm text-white/56">
                      {order.deliveryAddress || "Адрес не требуется"}
                    </p>
                  </div>
                ),
              },
              {
                key: "status",
                header: "Статус",
                cellClassName: "min-w-[180px]",
                render: (order) => (
                  <StatusBadge
                    status={order.status}
                    context="order"
                    className={getAdminStatusBadgeClassName(order.status)}
                  />
                ),
              },
              {
                key: "total",
                header: "Сумма",
                cellClassName: "min-w-[150px]",
                render: (order) => (
                  <p className="font-heading text-lg font-semibold tracking-[-0.03em] text-white">
                    {formatCurrency(order.totalPrice)}
                  </p>
                ),
              },
              {
                key: "createdAt",
                header: "Создана",
                cellClassName: "min-w-[140px]",
                render: (order) => (
                  <p className="text-white/68">{formatDate(order.createdAt)}</p>
                ),
              },
              {
                key: "actions",
                header: "Действие",
                className: "text-right",
                cellClassName: "min-w-[140px] text-right",
                render: (order) => (
                  <Button
                    variant="ghost"
                    className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                    onClick={() => handleOpenDetail(order.id)}
                  >
                    Открыть
                  </Button>
                ),
              },
            ]}
          />

          {pagination.totalPages > 1 ? (
            <Card tone="admin" className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/58">
                  Страница {pagination.page} из {pagination.totalPages}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="ghost"
                    className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                    disabled={pagination.page <= 1}
                    onClick={() => handleChangePage(pagination.page - 1)}
                  >
                    Назад
                  </Button>
                  <Button
                    className="bg-primary text-foreground hover:bg-primary-strong"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => handleChangePage(pagination.page + 1)}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            </Card>
          ) : null}
        </>
      ) : null}

      <AdminOrderDetailPanel
        open={Boolean(selectedOrderId)}
        order={selectedOrder}
        isLoading={detailLoading}
        error={detailError}
        statusValue={statusValue}
        statusComment={statusComment}
        commentValue={commentValue}
        statusMessage={statusMessage}
        statusError={statusError}
        commentMessage={commentMessage}
        commentError={commentError}
        isUpdatingStatus={isUpdatingStatus}
        isUpdatingComment={isUpdatingComment}
        onClose={handleCloseDetail}
        onRetry={() => {
          if (selectedOrderId) {
            void fetchOrderDetail(selectedOrderId);
          }
        }}
        onStatusChange={setStatusValue}
        onStatusCommentChange={setStatusComment}
        onCommentChange={setCommentValue}
        onSubmitStatus={() => void handleStatusSubmit()}
        onSubmitComment={() => void handleCommentSubmit()}
      />
    </div>
  );
}
