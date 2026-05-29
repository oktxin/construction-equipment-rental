import { useState } from "react";

import { Button, Card } from "../../../shared/ui";
import { getErrorMessage } from "../../../shared/utils/errorMessage";
import { createOrderReport, downloadReport } from "../../reports/reportsApi";
import type { ReportFormat } from "../../reports/reportsTypes";

export type OrderDocumentsPanelProps = {
  orderId: string;
};

export function OrderDocumentsPanel({ orderId }: OrderDocumentsPanelProps) {
  const [loadingFormat, setLoadingFormat] = useState<ReportFormat | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleDownload = async (format: ReportFormat) => {
    try {
      setLoadingFormat(format);
      setFeedback(null);

      const report = await createOrderReport(orderId, format);
      const downloaded = await downloadReport(report.id);

      setFeedback({
        type: "success",
        message: `Документ ${format} загружен: ${downloaded.fileName}`,
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setLoadingFormat(null);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Документы
          </h2>
          <p className="mt-2 text-sm leading-6 text-foreground/62">
            Файл формируется по кнопке и сразу отправляется на скачивание.
          </p>
        </div>

        {feedback ? (
          <div
            className={
              feedback.type === "success"
                ? "rounded-display border border-success/30 bg-success/10 px-4 py-3 text-sm leading-6 text-success"
                : "rounded-display border border-danger/30 bg-danger/10 px-4 py-3 text-sm leading-6 text-danger"
            }
          >
            {feedback.message}
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          <Button
            className="w-full justify-center"
            onClick={() => void handleDownload("PDF")}
            disabled={loadingFormat !== null}
          >
            {loadingFormat === "PDF" ? "Готовим PDF..." : "Скачать PDF"}
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-center"
            onClick={() => void handleDownload("DOCX")}
            disabled={loadingFormat !== null}
          >
            {loadingFormat === "DOCX" ? "Готовим DOCX..." : "Скачать DOCX"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
