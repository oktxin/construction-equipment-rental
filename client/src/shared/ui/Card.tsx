import { HTMLAttributes } from "react";

import { cn } from "../utils/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "public" | "admin";
  hoverable?: boolean;
};

export function Card({
  className,
  tone = "public",
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border transition duration-300",
        tone === "public"
          ? "border-border/70 bg-card shadow-industrial"
          : "border-white/10 bg-adminSurface text-white shadow-industrial-dark",
        hoverable &&
          (tone === "public"
            ? "hover:-translate-y-1 hover:bg-card-hover hover:shadow-industrial-lg"
            : "hover:-translate-y-1 hover:bg-adminSurface-strong hover:shadow-industrial-dark-lg"),
        className,
      )}
      {...props}
    />
  );
}
