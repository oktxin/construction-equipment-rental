import { Button, Modal } from "../../../../shared/ui";
import { adminGhostButtonClassName, adminInsetPanelClassName } from "../../components/adminUiStyles";
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
    <Modal open={open} onClose={onClose} variant="admin" className="max-w-lg">
      <div className="space-y-5">
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-[#F4EFE6]">
          Удалить отчёт?
        </h2>
        <div className="space-y-3 text-sm leading-6 text-[rgba(244,239,230,0.72)]">
          <p>Файл отчёта также будет удалён, если он существует.</p>
          {report ? (
            <p className={`${adminInsetPanelClassName} px-4 py-3 text-[#F4EFE6]`}>
              {report.title}
            </p>
          ) : null}
        </div>

        {error ? <p className="rounded-2xl bg-danger/12 px-4 py-3 text-sm text-[#FF8A75]">{error}</p> : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="ghost"
            className={adminGhostButtonClassName}
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
