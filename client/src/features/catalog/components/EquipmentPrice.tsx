import { cn } from "../../../shared/utils/cn";

export type EquipmentPriceProps = {
  dailyPrice: number;
  depositAmount: number;
  className?: string;
};

const bynFormatter = new Intl.NumberFormat("ru-BY", {
  style: "currency",
  currency: "BYN",
  maximumFractionDigits: 0,
});

function formatPrice(value: number) {
  return bynFormatter.format(value);
}

export function EquipmentPrice({ dailyPrice, depositAmount, className }: EquipmentPriceProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="font-heading text-[1.4rem] font-semibold leading-none tracking-[-0.03em] text-foreground">
        от {formatPrice(dailyPrice)} / сутки
      </div>
      <p className="text-sm leading-6 text-foreground/62">Залог: {formatPrice(depositAmount)}</p>
    </div>
  );
}
