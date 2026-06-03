import { Button, Modal } from "../../../../shared/ui";
import { adminGhostButtonClassName } from "../../components/adminUiStyles";

export type AdminDeleteConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

export function AdminDeleteConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Удалить",
  cancelLabel = "Отмена",
  isSubmitting = false,
  error,
  onConfirm,
  onClose,
}: AdminDeleteConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} variant="admin" className="max-w-lg">
      <div className="space-y-5">
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-[#F4EFE6]">
          {title}
        </h2>
        <p className="text-sm leading-6 text-[rgba(244,239,230,0.72)]">{description}</p>

        {error ? <p className="rounded-2xl bg-danger/12 px-4 py-3 text-sm text-[#FF8A75]">{error}</p> : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="ghost"
            className={adminGhostButtonClassName}
            onClick={onClose}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? "Выполняем..." : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
