import { HTMLAttributes } from "react";

import { cn } from "../utils/cn";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "accent";

const badgeVariants: Record<BadgeVariant, string> = {
  success: "border-success/30 bg-success/12 text-success",
  warning: "border-warning/35 bg-warning/12 text-warning-strong",
  danger: "border-danger/30 bg-danger/12 text-danger",
  neutral: "border-border/70 bg-secondary/8 text-foreground/75",
  accent: "border-accent/35 bg-accent/12 text-accent-strong",
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
