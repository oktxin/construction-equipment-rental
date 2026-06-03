import { ReactNode } from "react";

import { cn } from "../utils/cn";

export type PageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
  actions?: ReactNode;
  tone?: "public" | "admin";
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  tone = "public",
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-5 rounded-display border p-6 md:flex-row md:items-end md:justify-between",
        tone === "public"
          ? "border-border/70 bg-card text-foreground shadow-industrial"
          : "border-white/10 bg-adminSurface text-white shadow-industrial-dark",
        className,
      )}
    >
      <div className="min-w-0 max-w-3xl space-y-3">
        {eyebrow ? (
          <p
            className={cn(
              "text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
              tone === "public" ? "text-accent-strong" : "text-primary",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1 className="break-words font-heading text-[1.85rem] font-semibold leading-tight tracking-[-0.03em] sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <p className={tone === "public" ? "max-w-2xl break-words text-foreground/72" : "max-w-2xl break-words text-white/68"}>
          {description}
        </p>
      </div>
      {actions ? <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">{actions}</div> : null}
    </div>
  );
}
