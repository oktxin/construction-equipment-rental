import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-foreground shadow-industrial hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-industrial-lg active:translate-y-0 active:scale-[0.99]",
  secondary:
    "bg-secondary text-background shadow-industrial-dark hover:-translate-y-0.5 hover:bg-secondary-soft active:translate-y-0 active:scale-[0.99]",
  ghost:
    "border border-border/70 bg-white/20 text-foreground hover:-translate-y-0.5 hover:bg-card-hover active:translate-y-0 active:scale-[0.99]",
  danger:
    "bg-danger text-white shadow-industrial hover:-translate-y-0.5 hover:bg-danger-strong active:translate-y-0 active:scale-[0.99]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.95rem]",
  lg: "h-14 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:border-border/50 disabled:bg-muted/60 disabled:text-foreground/45 disabled:shadow-none",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
