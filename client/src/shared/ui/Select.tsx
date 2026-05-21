import { SelectHTMLAttributes, forwardRef } from "react";

import { cn } from "../utils/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError = false, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-12 w-full appearance-none rounded-2xl border bg-white/70 px-4 pr-11 text-[0.98rem] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] outline-none transition duration-300 focus-visible:border-primary focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:border-border/50 disabled:bg-card disabled:text-foreground/50",
            hasError ? "border-danger focus-visible:border-danger focus-visible:ring-danger/20" : "border-border/80",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-foreground/60" />
      </div>
    );
  },
);

Select.displayName = "Select";
