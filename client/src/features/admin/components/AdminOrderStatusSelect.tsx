import type { OrderStatus } from "../../rentalOrders/rentalOrdersTypes";
import {
  ADMIN_ORDER_STATUS_OPTIONS,
  canTransitionAdminOrderStatus,
  getAllowedAdminOrderStatuses,
} from "../orders/adminOrdersUtils";

const selectClassName =
  "h-12 w-full appearance-none rounded-2xl border border-white/10 bg-adminBackground px-4 pr-11 text-sm text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

export type AdminOrderStatusSelectProps = {
  value: OrderStatus;
  currentStatus: OrderStatus;
  onChange: (status: OrderStatus) => void;
  disabled?: boolean;
  id?: string;
};

export function AdminOrderStatusSelect({
  value,
  currentStatus,
  onChange,
  disabled = false,
  id,
}: AdminOrderStatusSelectProps) {
  const nextStatuses = getAllowedAdminOrderStatuses(currentStatus);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-white/78">
          Новый статус
        </label>
        <span className="text-xs text-white/45">
          Доступно: {nextStatuses.length ? nextStatuses.length : "нет переходов"}
        </span>
      </div>

      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          className={selectClassName}
          onChange={(event) => onChange(event.target.value as OrderStatus)}
        >
          {ADMIN_ORDER_STATUS_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={!canTransitionAdminOrderStatus(currentStatus, option.value)}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
      </div>
    </div>
  );
}

