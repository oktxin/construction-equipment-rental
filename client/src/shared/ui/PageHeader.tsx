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
        "flex flex-col gap-5 rounded-display border p-6 md:flex-row md:items-end md:justify-between",
        tone === "public"
          ? "border-border/70 bg-card text-foreground shadow-industrial"
          : "border-white/10 bg-adminSurface text-white shadow-industrial-dark",
        className,
      )}
    >
      <div className="max-w-3xl space-y-3">
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
        <h1 className="font-heading text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          {title}
        </h1>
        <p className={tone === "public" ? "max-w-2xl text-foreground/72" : "max-w-2xl text-white/68"}>
          {description}
        </p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
