import { StatusBadge } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { OrderStatus } from "../../rentalOrders/rentalOrdersTypes";
import { formatDateTime } from "../../rentalOrders/rentalOrdersUtils";

type TimelineStep = {
  label: string;
  description: string;
  state: "complete" | "current" | "upcoming";
};

function getTimelineSteps(
  status: OrderStatus,
  createdAt: string,
  updatedAt: string,
): TimelineStep[] {
  const currentStepByStatus = {
    PENDING: 1,
    APPROVED: 2,
    ACTIVE: 3,
    COMPLETED: 4,
  } as const;

  const currentStep = currentStepByStatus[status as keyof typeof currentStepByStatus] ?? 1;

  return [
    {
      label: "Создана",
      description: `Заявка поступила ${formatDateTime(createdAt)}`,
      state: currentStep > 1 ? "complete" : "current",
    },
    {
      label: "Подтверждение",
      description:
        status === "PENDING"
          ? "Заявка ждёт решения менеджера."
          : "Подтверждение уже пройдено.",
      state: currentStep === 2 ? "current" : currentStep > 2 ? "complete" : "upcoming",
    },
    {
      label: "Активная аренда",
      description:
        status === "ACTIVE"
          ? "Техника выдана и аренда активна."
          : status === "COMPLETED"
            ? "Этап выдачи уже завершён."
            : "Этап начнётся после подтверждения и выдачи.",
      state: currentStep === 3 ? "current" : currentStep > 3 ? "complete" : "upcoming",
    },
    {
      label: "Завершение",
      description:
        status === "COMPLETED"
          ? `Заявка закрыта ${formatDateTime(updatedAt)}`
          : "После возврата техника уйдёт в завершённые.",
      state: currentStep === 4 ? "current" : "upcoming",
    },
  ];
}

export type AdminOrderStatusTimelineProps = {
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export function AdminOrderStatusTimeline({
  status,
  createdAt,
  updatedAt,
}: AdminOrderStatusTimelineProps) {
  if (status === "CANCELLED" || status === "REJECTED") {
    return (
      <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/78">Состояние заявки</p>
            <p className="max-w-[30rem] text-sm leading-6 text-white/58">
              {status === "CANCELLED"
                ? "Заявка остановлена до завершения аренды."
                : "Заявка не перешла в аренду и была отклонена."}
            </p>
          </div>
          <StatusBadge status={status} context="order" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/38">Создана</p>
            <p className="mt-2 font-medium text-white">{formatDateTime(createdAt)}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/38">
              {status === "CANCELLED" ? "Отменена" : "Отклонена"}
            </p>
            <p className="mt-2 font-medium text-white">{formatDateTime(updatedAt)}</p>
          </div>
        </div>
      </div>
    );
  }

  const steps = getTimelineSteps(status, createdAt, updatedAt);

  return (
    <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/78">Операционный путь</p>
          <p className="max-w-[34rem] text-sm leading-6 text-white/58">
            Таймлайн помогает быстро понять, где заявка находится прямо сейчас.
          </p>
        </div>
        <StatusBadge status={status} context="order" />
      </div>

      <div className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <div key={step.label} className="relative pl-11">
            {index < steps.length - 1 ? (
              <span
                className={cn(
                  "absolute left-[0.8rem] top-7 h-[calc(100%+0.9rem)] w-px",
                  step.state === "complete" ? "bg-primary/45" : "bg-white/10",
                )}
              />
            ) : null}

            <span
              className={cn(
                "absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                step.state === "complete" && "border-primary/60 bg-primary/18 text-primary",
                step.state === "current" && "border-primary bg-primary text-foreground",
                step.state === "upcoming" && "border-white/12 bg-white/[0.03] text-white/38",
              )}
            >
              {index + 1}
            </span>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="font-medium text-white">{step.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/58">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

