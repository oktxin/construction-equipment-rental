import { HTMLAttributes } from "react";

import { cn } from "../utils/cn";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  tone?: "public" | "admin";
};

export function EmptyState({
  title,
  description,
  tone = "public",
  className,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-display border border-dashed p-8",
        tone === "public"
          ? "border-border/70 bg-card text-foreground"
          : "border-white/15 bg-adminSurface text-white",
        className,
      )}
      {...props}
    >
      <div className="max-w-xl space-y-3">
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
        <p className={tone === "public" ? "text-foreground/70" : "text-white/68"}>{description}</p>
        {children}
      </div>
    </div>
  );
}
