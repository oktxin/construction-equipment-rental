import { cn } from "../../../shared/utils/cn";
import {
  ORDER_STATUS_FILTERS,
  type OrderStatusFilterValue,
} from "../rentalOrdersUtils";

export type OrderStatusTabsProps = {
  value: OrderStatusFilterValue;
  onChange: (value: OrderStatusFilterValue) => void;
};

export function OrderStatusTabs({ value, onChange }: OrderStatusTabsProps) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-center gap-2">
        {ORDER_STATUS_FILTERS.map((status) => (
          <button
            key={status.value}
            type="button"
            onClick={() => onChange(status.value)}
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition",
              value === status.value
                ? "border-secondary bg-secondary text-background shadow-industrial-dark"
                : "border-border/70 bg-card text-foreground/70 hover:-translate-y-0.5 hover:bg-card-hover hover:text-foreground",
            )}
            aria-pressed={value === status.value}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}
