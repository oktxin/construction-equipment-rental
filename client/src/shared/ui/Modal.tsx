import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

import { cn } from "../utils/cn";

export type ModalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
}>;

export function Modal({ open, onClose, title, className, children }: ModalProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-2xl rounded-display border border-border/70 bg-card p-6 shadow-industrial-xl",
          className,
        )}
      >
        {title ? <h2 className="font-heading text-2xl font-semibold text-foreground">{title}</h2> : null}
        <div className={title ? "mt-4" : ""}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
