import { Button, Modal } from "../../../../shared/ui";

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
    <Modal
      open={open}
      onClose={onClose}
      className="max-w-lg border-white/10 bg-adminSurface text-white"
    >
      <div className="space-y-5">
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-white">
          {title}
        </h2>
        <p className="text-sm leading-6 text-white/68">{description}</p>

        {error ? <p className="rounded-2xl bg-danger/12 px-4 py-3 text-sm text-rose-300">{error}</p> : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
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
