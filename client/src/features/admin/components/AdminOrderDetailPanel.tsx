import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, LoadingSkeleton, StatusBadge } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import { getDeliveryTypeLabel } from "../../../shared/utils/statusLabels";
import type { OrderStatus } from "../../rentalOrders/rentalOrdersTypes";
import {
  formatCurrency,
  formatDate,
  formatDateRange,
} from "../../rentalOrders/rentalOrdersUtils";
import type { AdminOrder } from "../orders/adminOrdersTypes";
import { AdminOrderCommentForm } from "./AdminOrderCommentForm";
import { AdminOrderStatusSelect } from "./AdminOrderStatusSelect";
import { AdminOrderStatusTimeline } from "./AdminOrderStatusTimeline";

const panelTextareaClassName =
  "min-h-[120px] w-full rounded-2xl border border-white/10 bg-adminBackground px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

type SummaryFieldProps = {
  label: string;
  value: string;
  tone?: "default" | "accent";
};

function SummaryField({ label, value, tone = "default" }: SummaryFieldProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/38">
        {label}
      </p>
      <p
        className={cn(
          "mt-2 whitespace-pre-line text-sm leading-6",
          tone === "accent" ? "font-semibold text-white" : "text-white/72",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export type AdminOrderDetailPanelProps = {
  open: boolean;
  order: AdminOrder | null;
  isLoading: boolean;
  error: string | null;
  statusValue: OrderStatus;
  statusComment: string;
  commentValue: string;
  statusMessage?: string | null;
  statusError?: string | null;
  commentMessage?: string | null;
  commentError?: string | null;
  isUpdatingStatus?: boolean;
  isUpdatingComment?: boolean;
  onClose: () => void;
  onRetry: () => void;
  onStatusChange: (status: OrderStatus) => void;
  onStatusCommentChange: (value: string) => void;
  onCommentChange: (value: string) => void;
  onSubmitStatus: () => void;
  onSubmitComment: () => void;
};

export function AdminOrderDetailPanel({
  open,
  order,
  isLoading,
  error,
  statusValue,
  statusComment,
  commentValue,
  statusMessage,
  statusError,
  commentMessage,
  commentError,
  isUpdatingStatus = false,
  isUpdatingComment = false,
  onClose,
  onRetry,
  onStatusChange,
  onStatusCommentChange,
  onCommentChange,
  onSubmitStatus,
  onSubmitComment,
}: AdminOrderDetailPanelProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Закрыть панель заявки"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside className="relative z-10 flex h-full w-full flex-col border-l border-white/10 bg-adminBackground shadow-industrial-dark-xl sm:max-w-[680px]">
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-6">
          <div className="min-w-0 space-y-2">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              Детали заявки
            </p>
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
              {order ? order.orderNumber : "Загрузка"}
            </h2>
            {order ? <StatusBadge status={order.status} context="order" /> : null}
          </div>

          <Button
            variant="ghost"
            className="border-white/10 bg-adminSurface text-white hover:bg-adminSurface-strong"
            onClick={onClose}
          >
            Закрыть
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {isLoading ? (
            <div className="space-y-4">
              <LoadingSkeleton tone="admin" lines={6} />
              <LoadingSkeleton tone="admin" lines={8} />
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="rounded-[24px] border border-rose-400/20 bg-rose-400/8 p-5">
              <h3 className="font-heading text-xl font-semibold text-white">
                Не удалось загрузить заявку
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/68">{error}</p>
              <div className="mt-4">
                <Button
                  className="bg-primary text-foreground hover:bg-primary-strong"
                  onClick={onRetry}
                >
                  Повторить
                </Button>
              </div>
            </div>
          ) : null}

          {!isLoading && !error && order ? (
            <div className="space-y-5">
              <AdminOrderStatusTimeline
                status={order.status}
                createdAt={order.createdAt}
                updatedAt={order.updatedAt}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <SummaryField
                  label="Клиент"
                  value={`${order.user.fullName}\n${order.user.email}${order.user.phone ? `\n${order.user.phone}` : ""}`}
                  tone="accent"
                />
                <SummaryField
                  label="Период"
                  value={`${formatDateRange(order.startDate, order.endDate)}\nСоздана ${formatDate(order.createdAt)}`}
                />
                <SummaryField
                  label="Получение"
                  value={
                    order.deliveryType === "DELIVERY" && order.deliveryAddress
                      ? `${getDeliveryTypeLabel(order.deliveryType)}\n${order.deliveryAddress}`
                      : getDeliveryTypeLabel(order.deliveryType)
                  }
                />
                <SummaryField
                  label="Сумма"
                  value={`${formatCurrency(order.totalPrice)}\nЗалог ${formatCurrency(order.depositTotal)}`}
                  tone="accent"
                />
              </div>

              <div className="grid gap-4">
                <SummaryField
                  label="Комментарий клиента"
                  value={order.customerComment?.trim() || "Комментарий не оставлен"}
                />
                <SummaryField
                  label="Текущий комментарий менеджера"
                  value={order.managerComment?.trim() || "Комментарий ещё не добавлен"}
                />
              </div>

              <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
                    Состав заявки
                  </h3>
                  <p className="text-sm leading-6 text-white/58">
                    Позиции, количество и итог по каждой строке.
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                            {item.equipment.category.name}
                          </p>
                          <Link
                            to={`/equipment/${item.equipment.slug}`}
                            className="mt-2 block font-medium text-white transition hover:text-primary"
                          >
                            {item.equipment.name}
                          </Link>
                          <p className="mt-2 text-sm leading-6 text-white/56">
                            {[item.equipment.brand, item.equipment.model].filter(Boolean).join(" / ") ||
                              "Позиция из каталога"}
                          </p>
                        </div>

                        <div className="grid gap-2 text-sm text-white/68 sm:min-w-[220px]">
                          <div className="flex items-center justify-between gap-4">
                            <span>Количество</span>
                            <span className="font-medium text-white">{item.quantity} шт.</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span>Ставка</span>
                            <span className="font-medium text-white">
                              {formatCurrency(item.dailyPrice)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-2">
                            <span>Сумма</span>
                            <span className="font-medium text-white">
                              {formatCurrency(item.lineTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
                    Управление статусом
                  </h3>
                  <p className="text-sm leading-6 text-white/58">
                    Изменение статуса обновляет заявку и сразу отражается в списке.
                  </p>
                </div>

                <div className="mt-4 space-y-4">
                  <AdminOrderStatusSelect
                    id="admin-order-status-select"
                    value={statusValue}
                    currentStatus={order.status}
                    disabled={isUpdatingStatus}
                    onChange={onStatusChange}
                  />

                  <div className="space-y-2">
                    <label
                      htmlFor="admin-order-status-comment"
                      className="text-sm font-medium text-white/78"
                    >
                      Комментарий к обновлению
                    </label>
                    <textarea
                      id="admin-order-status-comment"
                      value={statusComment}
                      className={panelTextareaClassName}
                      placeholder="Например: заявка подтверждена после проверки наличия техники."
                      onChange={(event) => onStatusCommentChange(event.target.value)}
                    />
                  </div>

                  {statusMessage ? (
                    <p className="text-sm text-emerald-300">{statusMessage}</p>
                  ) : null}
                  {statusError ? <p className="text-sm text-rose-300">{statusError}</p> : null}

                  <div className="flex justify-end">
                    <Button
                      className="bg-primary text-foreground hover:bg-primary-strong"
                      disabled={isUpdatingStatus}
                      onClick={onSubmitStatus}
                    >
                      {isUpdatingStatus ? "Обновляем..." : "Обновить статус"}
                    </Button>
                  </div>
                </div>
              </div>

              <AdminOrderCommentForm
                value={commentValue}
                message={commentMessage}
                error={commentError}
                isSubmitting={isUpdatingComment}
                onChange={onCommentChange}
                onSubmit={onSubmitComment}
              />
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
