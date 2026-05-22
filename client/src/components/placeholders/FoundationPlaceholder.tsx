import { ReactNode } from "react";

import { Badge, Button, Card, EmptyState, LoadingSkeleton, PageHeader, StatusBadge } from "../../shared/ui";
import type { StatusLabelContext } from "../../shared/utils/statusLabels";

export type FoundationPlaceholderProps = {
  title: string;
  description: string;
  eyebrow: string;
  tone?: "public" | "admin";
  summary: string[];
  metrics?: Array<{
    label: string;
    value: string;
    status?: Parameters<typeof StatusBadge>[0]["status"];
    statusContext?: StatusLabelContext;
  }>;
  actions?: ReactNode;
};

export function FoundationPlaceholder({
  title,
  description,
  eyebrow,
  tone = "public",
  summary,
  metrics,
  actions,
}: FoundationPlaceholderProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        eyebrow={eyebrow}
        tone={tone}
        actions={
          actions ?? (
            <>
              <Button
                variant={tone === "public" ? "primary" : "ghost"}
                className={
                  tone === "admin"
                    ? "border-white/10 bg-adminSurface text-white hover:bg-adminSurface-strong"
                    : ""
                }
              >
                Следующий этап
              </Button>
              <Button
                variant="ghost"
                className={
                  tone === "admin"
                    ? "border-white/10 bg-adminSurface text-white hover:bg-adminSurface-strong"
                    : ""
                }
              >
                Просмотр каркаса
              </Button>
            </>
          )
        }
      />

      {metrics?.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.label} tone={tone} hoverable className="p-5">
              <p
                className={
                  tone === "public"
                    ? "text-sm uppercase tracking-[0.18em] text-foreground/48"
                    : "text-sm uppercase tracking-[0.18em] text-white/42"
                }
              >
                {metric.label}
              </p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="font-heading text-3xl font-semibold tracking-[-0.04em]">
                  {metric.value}
                </p>
                {metric.status ? (
                  <StatusBadge status={metric.status} context={metric.statusContext} />
                ) : (
                  <Badge variant="accent">Основа</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card tone={tone} className="p-6">
          <div className="space-y-5">
            <div>
              <p
                className={
                  tone === "public"
                    ? "text-sm uppercase tracking-[0.18em] text-accent-strong"
                    : "text-sm uppercase tracking-[0.18em] text-primary"
                }
              >
                Следующий контент
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em]">
                Страница уже собрана по структуре и готова к подключению живых данных.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {summary.map((item) => (
                <div
                  key={item}
                  className={
                    tone === "public"
                      ? "rounded-display border border-border/70 bg-background/55 p-4 text-sm leading-6 text-foreground/72"
                      : "rounded-display border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/70"
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          <LoadingSkeleton tone={tone} lines={4} />
          <EmptyState
            tone={tone}
            title="Дальше подключается живая функциональность"
            description="Каркас, маршруты и общий интерфейс уже готовы. На следующем этапе сюда подключаются каталог, формы, таблицы и реальные сценарии аренды."
          />
        </div>
      </div>
    </div>
  );
}
