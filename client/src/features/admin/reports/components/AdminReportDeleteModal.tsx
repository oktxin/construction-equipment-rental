import { Button, Modal } from "../../../../shared/ui";
import type { AdminReport } from "../adminReportsTypes";

export type AdminReportDeleteModalProps = {
  open: boolean;
  report: AdminReport | null;
  isSubmitting?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

export function AdminReportDeleteModal({
  open,
  report,
  isSubmitting = false,
  error = null,
  onConfirm,
  onClose,
}: AdminReportDeleteModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="max-w-lg border-white/10 bg-adminSurface text-white"
    >
      <div className="space-y-5">
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-white">
          Удалить отчёт?
        </h2>
        <div className="space-y-3 text-sm leading-6 text-white/68">
          <p>Файл отчёта также будет удалён, если он существует.</p>
          {report ? (
            <p className="rounded-2xl border border-white/10 bg-adminBackground/60 px-4 py-3 text-white/82">
              {report.title}
            </p>
          ) : null}
        </div>

        {error ? <p className="rounded-2xl bg-danger/12 px-4 py-3 text-sm text-rose-300">{error}</p> : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? "Удаляем..." : "Удалить"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
