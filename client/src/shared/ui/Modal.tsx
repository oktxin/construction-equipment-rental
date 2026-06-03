import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

import { cn } from "../utils/cn";

export type ModalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  variant?: "default" | "admin";
}>;

const modalToneClassNames = {
  default: {
    overlay: "bg-secondary/60 backdrop-blur-sm",
    content: "border-border/70 bg-card text-foreground shadow-industrial-xl",
    title: "text-foreground",
  },
  admin: {
    overlay: "bg-black/70 backdrop-blur-sm",
    content:
      "border-[rgba(255,255,255,0.14)] bg-[#1A1F24] text-[#F4EFE6] shadow-industrial-dark-xl",
    title: "text-[#F4EFE6]",
  },
} as const;

export function Modal({ open, onClose, title, className, children, variant = "default" }: ModalProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const tone = modalToneClassNames[variant];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close modal overlay"
        className={cn("absolute inset-0", tone.overlay)}
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 my-auto w-full max-w-2xl rounded-display border p-5 sm:p-6",
          tone.content,
          className,
        )}
      >
        {title ? <h2 className={cn("font-heading text-2xl font-semibold", tone.title)}>{title}</h2> : null}
        <div className={title ? "mt-4" : ""}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
