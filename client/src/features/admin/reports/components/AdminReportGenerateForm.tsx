import { useEffect, useState } from "react";

import { Button, Card } from "../../../../shared/ui";
import type { ReportFormat } from "../../../reports/reportsTypes";
import type {
  AdminReport,
  CreateAdminRentalStatisticsReportPayload,
} from "../adminReportsTypes";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

type FormErrors = {
  dateFrom?: string;
  dateTo?: string;
  format?: string;
};

export type AdminReportGenerateFormProps = {
  isSubmitting?: boolean;
  submitError?: string | null;
  submitSuccess?: string | null;
  generatedReport?: AdminReport | null;
  isDownloadingGenerated?: boolean;
  onSubmit: (values: CreateAdminRentalStatisticsReportPayload) => Promise<void> | void;
  onDownloadGenerated?: (report: AdminReport) => void;
};

export function AdminReportGenerateForm({
  isSubmitting = false,
  submitError = null,
  submitSuccess = null,
  generatedReport = null,
  isDownloadingGenerated = false,
  onSubmit,
  onDownloadGenerated,
}: AdminReportGenerateFormProps) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [format, setFormat] = useState<ReportFormat>("PDF");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (submitSuccess) {
      setErrors({});
    }
  }, [submitSuccess]);

  async function handleSubmit() {
    const nextErrors: FormErrors = {};

    if (!dateFrom) {
      nextErrors.dateFrom = "Выберите дату начала";
    }

    if (!dateTo) {
      nextErrors.dateTo = "Выберите дату окончания";
    }

    if (!format) {
      nextErrors.format = "Выберите формат отчёта";
    }

    if (dateFrom && dateTo && dateFrom > dateTo) {
      nextErrors.dateTo = "Дата окончания не может быть раньше даты начала";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit({
      format,
      dateFrom,
      dateTo,
    });
  }

  return (
    <Card tone="admin" className="overflow-hidden rounded-[32px] p-0">
      <div className="border-b border-white/8 bg-gradient-to-r from-primary/16 via-primary/6 to-transparent px-6 py-5">
        <div className="max-w-3xl space-y-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Статистика аренды
          </p>
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
              Сформировать статистический отчёт
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-white/64 md:text-base">
              Соберите сводку по заявкам за период и сразу сохраните её в PDF или DOCX для
              внутренней отчётности.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_180px_auto]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/78" htmlFor="admin-report-date-from">
              Дата начала
            </label>
            <input
              id="admin-report-date-from"
              type="date"
              value={dateFrom}
              className={fieldClassName}
              onChange={(event) => setDateFrom(event.target.value)}
            />
            {errors.dateFrom ? <p className="text-sm text-rose-300">{errors.dateFrom}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/78" htmlFor="admin-report-date-to">
              Дата окончания
            </label>
            <input
              id="admin-report-date-to"
              type="date"
              value={dateTo}
              className={fieldClassName}
              onChange={(event) => setDateTo(event.target.value)}
            />
            {errors.dateTo ? <p className="text-sm text-rose-300">{errors.dateTo}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/78" htmlFor="admin-report-format">
              Формат
            </label>
            <div className="relative">
              <select
                id="admin-report-format"
                value={format}
                className={fieldClassName + " appearance-none pr-11"}
                onChange={(event) => setFormat(event.target.value as ReportFormat)}
              >
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
            </div>
            {errors.format ? <p className="text-sm text-rose-300">{errors.format}</p> : null}
          </div>

          <div className="space-y-2 lg:self-end">
            <span className="block text-sm font-medium text-transparent">Действие</span>
            <Button
              className="w-full bg-primary text-foreground hover:bg-primary-strong lg:min-w-[220px]"
              disabled={isSubmitting}
              onClick={() => void handleSubmit()}
            >
              {isSubmitting ? "Формируем..." : "Сформировать отчёт"}
            </Button>
          </div>
        </div>

        {submitError ? (
          <div className="rounded-[24px] border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {submitError}
          </div>
        ) : null}

        {submitSuccess ? (
          <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-100">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <p className="font-medium">{submitSuccess}</p>
                {generatedReport ? (
                  <p className="text-emerald-100/80">Файл: {generatedReport.title}</p>
                ) : null}
              </div>
              {generatedReport && onDownloadGenerated ? (
                <Button
                  variant="ghost"
                  className="border-emerald-300/20 bg-emerald-400/10 text-emerald-50 hover:bg-emerald-400/20"
                  disabled={isDownloadingGenerated}
                  onClick={() => onDownloadGenerated(generatedReport)}
                >
                  {isDownloadingGenerated ? "Скачиваем..." : "Скачать сейчас"}
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
