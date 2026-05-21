import { InputHTMLAttributes, forwardRef } from "react";

import { cn } from "../utils/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          "h-12 w-full rounded-2xl border bg-white/70 px-4 text-[0.98rem] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] outline-none transition duration-300 placeholder:text-foreground/45 focus-visible:border-primary focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:border-border/50 disabled:bg-card disabled:text-foreground/50",
          hasError ? "border-danger focus-visible:border-danger focus-visible:ring-danger/20" : "border-border/80",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
