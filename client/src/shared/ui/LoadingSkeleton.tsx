import { HTMLAttributes } from "react";

import { cn } from "../utils/cn";

export type LoadingSkeletonProps = HTMLAttributes<HTMLDivElement> & {
  lines?: number;
  tone?: "public" | "admin";
};

export function LoadingSkeleton({
  className,
  lines = 3,
  tone = "public",
  ...props
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-card border p-6",
        tone === "public"
          ? "border-border/70 bg-card"
          : "border-white/10 bg-adminSurface",
        className,
      )}
      {...props}
    >
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-4 animate-pulse rounded-full",
              tone === "public" ? "bg-secondary/12" : "bg-white/10",
              index === 0 ? "w-3/4" : index === lines - 1 ? "w-1/2" : "w-full",
            )}
          />
        ))}
      </div>
    </div>
  );
}
