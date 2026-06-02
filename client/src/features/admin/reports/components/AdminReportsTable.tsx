import { Button, Card, EmptyState } from "../../../../shared/ui";
import { formatDateTime } from "../../../rentalOrders/rentalOrdersUtils";
import { AdminDataTable } from "../../components/AdminDataTable";
import type { AdminReport } from "../adminReportsTypes";
import { AdminReportFormatBadge } from "./AdminReportFormatBadge";
import { AdminReportTypeBadge } from "./AdminReportTypeBadge";

function MobileReportCard({
  report,
  isDownloading,
  onDownload,
  onDelete,
}: {
  report: AdminReport;
  isDownloading: boolean;
  onDownload: (report: AdminReport) => void;
  onDelete: (report: AdminReport) => void;
}) {
  return (
    <Card tone="admin" className="p-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <AdminReportTypeBadge type={report.type} />
              <AdminReportFormatBadge format={report.format} />
            </div>
            <div>
              <p className="font-medium text-white">{report.title}</p>
              <p className="mt-1 text-sm text-white/68">
                {report.user?.fullName ?? "Пользователь не указан"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 rounded-[22px] border border-white/8 bg-adminBackground/60 p-4 text-sm text-white/64">
          <div className="flex items-start justify-between gap-4">
            <span>Заявка</span>
            <span className="max-w-[220px] text-right text-white">
              {report.rentalOrder?.orderNumber ?? "Без привязки к заявке"}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span>Дата</span>
            <span className="max-w-[220px] text-right text-white">
              {formatDateTime(report.createdAt)}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            disabled={isDownloading}
            onClick={() => onDownload(report)}
          >
            {isDownloading ? "Скачиваем..." : "Скачать"}
          </Button>
          <Button variant="danger" onClick={() => onDelete(report)}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
}

export type AdminReportsTableProps = {
  items: AdminReport[];
  downloadingReportId?: string | null;
  onDownload: (report: AdminReport) => void;
  onDelete: (report: AdminReport) => void;
};

export function AdminReportsTable({
  items,
  downloadingReportId = null,
  onDownload,
  onDelete,
}: AdminReportsTableProps) {
  return (
    <AdminDataTable
      rows={items}
      getRowKey={(item) => item.id}
      emptyState={
        <EmptyState
          tone="admin"
          title="Отчётов пока нет"
          description="Сформируйте статистический отчёт или откройте документы пользователей."
        />
      }
      renderMobileCard={(item) => (
        <MobileReportCard
          report={item}
          isDownloading={downloadingReportId === item.id}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      )}
      columns={[
        {
          key: "title",
          header: "Отчёт",
          cellClassName: "min-w-[260px]",
          render: (item) => (
            <div className="space-y-1">
              <p className="font-medium text-white">{item.title}</p>
              <p className="text-sm text-white/64">{item.id}</p>
            </div>
          ),
        },
        {
          key: "type",
          header: "Тип",
          cellClassName: "min-w-[170px]",
          render: (item) => <AdminReportTypeBadge type={item.type} />,
        },
        {
          key: "format",
          header: "Формат",
          cellClassName: "min-w-[120px]",
          render: (item) => <AdminReportFormatBadge format={item.format} />,
        },
        {
          key: "user",
          header: "Пользователь",
          cellClassName: "min-w-[220px]",
          render: (item) => (
            <div className="space-y-1">
              <p className="text-white">{item.user?.fullName ?? "Не указан"}</p>
              <p className="text-sm text-white/60">{item.user?.email ?? "Нет email"}</p>
            </div>
          ),
        },
        {
          key: "order",
          header: "Заявка",
          cellClassName: "min-w-[150px]",
          render: (item) => (
            <p className="text-white/76">
              {item.rentalOrder?.orderNumber ?? "Без заявки"}
            </p>
          ),
        },
        {
          key: "createdAt",
          header: "Создан",
          cellClassName: "min-w-[180px]",
          render: (item) => <p className="text-white/76">{formatDateTime(item.createdAt)}</p>,
        },
        {
          key: "actions",
          header: "Действия",
          className: "text-right",
          cellClassName: "min-w-[240px] text-right",
          render: (item) => (
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                disabled={downloadingReportId === item.id}
                onClick={() => onDownload(item)}
              >
                {downloadingReportId === item.id ? "Скачиваем..." : "Скачать"}
              </Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(item)}>
                Удалить
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}
