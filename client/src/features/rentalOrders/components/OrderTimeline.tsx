import { Card, StatusBadge } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { RentalOrder } from "../rentalOrdersTypes";
import { formatDateTime } from "../rentalOrdersUtils";

type TimelineStep = {
  label: string;
  description: string;
  state: "complete" | "current" | "upcoming";
};

function getTimelineSteps(order: RentalOrder): TimelineStep[] {
  const currentStepByStatus = {
    PENDING: 1,
    APPROVED: 1,
    ACTIVE: 2,
    COMPLETED: 3,
  } as const;

  const currentStep = currentStepByStatus[order.status as keyof typeof currentStepByStatus] ?? 0;

  return [
    {
      label: "Заявка создана",
      description: `Создана ${formatDateTime(order.createdAt)}`,
      state: currentStep > 0 ? "complete" : "current",
    },
    {
      label: "Подтверждение",
      description:
        order.status === "PENDING"
          ? "Ожидает подтверждения менеджером."
          : order.status === "APPROVED"
            ? "Заявка подтверждена, техника зарезервирована."
            : "Этап подтверждения завершен.",
      state: currentStep === 1 ? "current" : currentStep > 1 ? "complete" : "upcoming",
    },
    {
      label: "Аренда активна",
      description:
        order.status === "ACTIVE"
          ? "Техника выдана, аренда находится в активной фазе."
          : order.status === "COMPLETED"
            ? "Активная фаза завершена."
            : "Этап начнется после выдачи оборудования.",
      state: currentStep === 2 ? "current" : currentStep > 2 ? "complete" : "upcoming",
    },
    {
      label: "Завершение",
      description:
        order.status === "COMPLETED"
          ? `Заявка завершена ${formatDateTime(order.updatedAt)}`
          : "После возврата техники заявка перейдет в завершенные.",
      state: currentStep === 3 ? "current" : currentStep > 3 ? "complete" : "upcoming",
    },
  ];
}

function NegativeStatusTimeline({ order }: { order: RentalOrder }) {
  const isCancelled = order.status === "CANCELLED";

  return (
    <Card className="p-6 sm:p-7">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Статус заявки
            </h2>
            <p className="mt-2 text-sm leading-6 text-foreground/62">
              {isCancelled
                ? "Заявка была остановлена до завершения аренды."
                : "Заявка не перешла в активную аренду и была закрыта менеджером."}
            </p>
          </div>
          <StatusBadge status={order.status} context="order" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-display border border-border/60 bg-background/45 p-4">
            <p className="text-sm text-foreground/56">Создана</p>
            <p className="mt-2 font-semibold text-foreground">
              {formatDateTime(order.createdAt)}
            </p>
          </div>
          <div className="rounded-display border border-border/60 bg-background/45 p-4">
            <p className="text-sm text-foreground/56">
              {isCancelled ? "Отменена" : "Отклонена"}
            </p>
            <p className="mt-2 font-semibold text-foreground">
              {formatDateTime(order.updatedAt)}
            </p>
          </div>
        </div>

        {order.managerComment?.trim() ? (
          <div className="rounded-display border border-border/60 bg-card p-4">
            <p className="text-sm text-foreground/56">Комментарий менеджера</p>
            <p className="mt-2 text-sm leading-6 text-foreground/72">{order.managerComment}</p>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export type OrderTimelineProps = {
  order: RentalOrder;
};

export function OrderTimeline({ order }: OrderTimelineProps) {
  if (order.status === "CANCELLED" || order.status === "REJECTED") {
    return <NegativeStatusTimeline order={order} />;
  }

  const steps = getTimelineSteps(order);

  return (
    <Card className="p-6 sm:p-7">
      <div className="space-y-5">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Ход заявки
          </h2>
          <p className="mt-2 text-sm leading-6 text-foreground/62">
            Текущий этап помогает быстро понять, что уже произошло и что будет дальше.
          </p>
        </div>

        <div className="space-y-5">
          {steps.map((step, index) => (
            <div key={step.label} className="relative pl-12">
              {index < steps.length - 1 ? (
                <span
                  className={cn(
                    "absolute left-[0.95rem] top-8 h-[calc(100%+0.8rem)] w-px",
                    step.state === "complete" ? "bg-secondary/35" : "bg-border/45",
                  )}
                />
              ) : null}

              <span
                className={cn(
                  "absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                  step.state === "complete" &&
                    "border-secondary bg-secondary text-background",
                  step.state === "current" &&
                    "border-primary bg-primary text-foreground shadow-industrial",
                  step.state === "upcoming" &&
                    "border-border/70 bg-card text-foreground/56",
                )}
              >
                {index + 1}
              </span>

              <div className="rounded-display border border-border/55 bg-background/45 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{step.label}</p>
                    <p className="mt-1 text-sm leading-6 text-foreground/66">
                      {step.description}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-[0.72rem] font-semibold uppercase tracking-[0.16em]",
                      step.state === "complete" && "text-success",
                      step.state === "current" && "text-accent-strong",
                      step.state === "upcoming" && "text-foreground/44",
                    )}
                  >
                    {step.state === "complete"
                      ? "Готово"
                      : step.state === "current"
                        ? "Текущий этап"
                        : "Впереди"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
