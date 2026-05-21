import { Link } from "react-router-dom";

import { cn } from "../utils/cn";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  tone?: "public" | "admin";
  className?: string;
};

export function Breadcrumbs({
  items,
  tone = "public",
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className={cn("flex flex-wrap items-center gap-2 text-sm", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className={cn(
                  "transition hover:opacity-100",
                  tone === "public" ? "text-foreground/62 hover:text-foreground" : "text-white/58 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={tone === "public" ? "text-foreground/86" : "text-white/86"}>{item.label}</span>
            )}
            {!isLast ? (
              <span className={tone === "public" ? "text-border" : "text-white/25"}>/</span>
            ) : null}
          </span>
        );
      })}
    </nav>
  );
}
