import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { formatDateTime, pluralize } from "../../features/rentalOrders/rentalOrdersUtils";
import { downloadReport, getMyReports } from "../../features/reports/reportsApi";
import type {
  Report,
  ReportFormat,
  ReportType,
  ReportsResponse,
} from "../../features/reports/reportsTypes";
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  LoadingSkeleton,
  PageHeader,
  Select,
  StatusBadge,
} from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";
import {
  getOrderStatusLabel,
  getReportFormatLabel,
  getReportTypeLabel,
} from "../../shared/utils/statusLabels";

const REPORTS_PER_PAGE = 8;

const reportTypeOptions: Array<{ value: "ALL" | ReportType; label: string }> = [
  { value: "ALL", label: "Все типы" },
  { value: "ORDER_DOCUMENT", label: "Документ по заявке" },
  { value: "RENTAL_HISTORY", label: "История аренды" },
  { value: "ADMIN_RENTAL_STATISTICS", label: "Статистика аренд" },
  { value: "EQUIPMENT_UTILIZATION", label: "Использование оборудования" },
];

const reportFormatOptions: Array<{ value: "ALL" | ReportFormat; label: string }> = [
  { value: "ALL", label: "Все форматы" },
  { value: "PDF", label: "PDF" },
  { value: "DOCX", label: "DOCX" },
];

function buildPaginationItems(page: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, "ellipsis-right", totalPages] as const;
  }

  if (page >= totalPages - 2) {
    return [1, "ellipsis-left", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "ellipsis-left", page - 1, page, page + 1, "ellipsis-right", totalPages] as const;
}

function ReportsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <LoadingSkeleton key={index} lines={6} className="min-h-[220px]" />
      ))}
    </div>
  );
}

function ReportsPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const items = buildPaginationItems(page, totalPages);

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground/62">
          Страница {page} из {totalPages}.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Назад
          </Button>

          {items.map((item, index) =>
            typeof item === "number" ? (
              <button
                key={`${item}-${index}`}
                type="button"
                className={
                  item === page
                    ? "inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-secondary bg-secondary px-3 text-sm font-semibold text-background shadow-industrial-dark"
                    : "inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-border/70 bg-white/35 px-3 text-sm font-semibold text-foreground transition hover:bg-card"
                }
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ) : (
              <span key={`${item}-${index}`} className="px-1 text-sm text-foreground/45">
                ...
              </span>
            ),
          )}

          <Button
            variant="ghost"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Далее
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ReportCard({
  report,
  isDownloading,
  onDownload,
}: {
  report: Report;
  isDownloading: boolean;
  onDownload: (report: Report) => void;
}) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={report.type} context="reportType" />
            <StatusBadge status={report.format} context="reportFormat" />
            {report.rentalOrder ? (
              <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/62">
                Заявка {report.rentalOrder.orderNumber}
              </span>
            ) : null}
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              {report.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-foreground/62">
              Создан {formatDateTime(report.createdAt)}. Тип: {getReportTypeLabel(report.type)}. Формат:{" "}
              {getReportFormatLabel(report.format)}.
            </p>
          </div>

          {report.rentalOrder ? (
            <div className="rounded-display border border-border/60 bg-background/45 p-4">
              <p className="text-sm text-foreground/56">Связанная заявка</p>
              <p className="mt-2 font-semibold text-foreground">{report.rentalOrder.orderNumber}</p>
              <p className="mt-1 text-sm text-foreground/62">
                Статус: {getOrderStatusLabel(report.rentalOrder.status)}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[220px]">
          <Button
            className="w-full justify-center"
            onClick={() => onDownload(report)}
            disabled={isDownloading}
          >
            {isDownloading ? "Скачиваем..." : "Скачать"}
          </Button>
          <p className="text-sm text-foreground/56">
            Файл скачивается через защищённый blob-ответ без потери авторизации.
          </p>
        </div>
      </div>
    </Card>
  );
}

export function ReportsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reportsData, setReportsData] = useState<ReportsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [downloadingReportId, setDownloadingReportId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const typeValue = (searchParams.get("type") as ReportType | null) ?? "ALL";
  const formatValue = (searchParams.get("format") as ReportFormat | null) ?? "ALL";
  const pageFromQuery = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isFinite(pageFromQuery) && pageFromQuery > 0 ? Math.floor(pageFromQuery) : 1;

  useEffect(() => {
    let isActive = true;

    const loadReports = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getMyReports({
          type: typeValue === "ALL" ? undefined : typeValue,
          format: formatValue === "ALL" ? undefined : formatValue,
          page: currentPage,
          limit: REPORTS_PER_PAGE,
        });

        if (!isActive) {
          return;
        }

        setReportsData(data);
      } catch (loadError) {
        if (!isActive) {
          return;
        }

        setError(getErrorMessage(loadError));
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadReports();

    return () => {
      isActive = false;
    };
  }, [currentPage, formatValue, reloadKey, typeValue]);

  const reports = reportsData?.items ?? [];
  const pagination = reportsData?.pagination ?? {
    page: currentPage,
    limit: REPORTS_PER_PAGE,
    total: 0,
    totalPages: 1,
  };

  const summaryText = useMemo(() => {
    const parts = [];

    if (typeValue !== "ALL") {
      parts.push(`тип: ${getReportTypeLabel(typeValue)}`);
    }

    if (formatValue !== "ALL") {
      parts.push(`формат: ${getReportFormatLabel(formatValue)}`);
    }

    if (parts.length === 0) {
      return "Показаны все документы клиента.";
    }

    return `Активные фильтры: ${parts.join(", ")}.`;
  }, [formatValue, typeValue]);

  const reportsCountLabel = `${pagination.total} ${pluralize(pagination.total, [
    "отчёт",
    "отчёта",
    "отчётов",
  ])}`;

  const updateFilter = (key: "type" | "format", value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value === "ALL") {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(page));
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("type");
    nextParams.delete("format");
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  const handleDownload = async (report: Report) => {
    setFeedback(null);
    setDownloadingReportId(report.id);

    try {
      const downloaded = await downloadReport(report.id);
      setFeedback({
        type: "success",
        message: `Файл скачан: ${downloaded.fileName}`,
      });
    } catch (downloadError) {
      setFeedback({
        type: "error",
        message: getErrorMessage(downloadError),
      });
    } finally {
      setDownloadingReportId(null);
    }
  };

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Главная", to: "/" },
            { label: "Отчёты" },
          ]}
        />

        <PageHeader
          eyebrow="Клиентский кабинет"
          title="Отчёты"
          description="Скачивайте документы по заявкам и историю аренды."
          actions={
            <Link to="/orders">
              <Button>Перейти к моим заявкам</Button>
            </Link>
          }
        />

        <Card className="p-5 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-foreground/78">
                <span>Тип отчёта</span>
                <Select value={typeValue} onChange={(event) => updateFilter("type", event.target.value)}>
                  {reportTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </label>

              <label className="space-y-2 text-sm font-medium text-foreground/78">
                <span>Формат</span>
                <Select value={formatValue} onChange={(event) => updateFilter("format", event.target.value)}>
                  {reportFormatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="ghost" onClick={handleResetFilters}>
                Сбросить
              </Button>
            </div>
          </div>

          <div className="mt-4 rounded-display border border-border/60 bg-background/45 p-4">
            <p className="text-sm leading-6 text-foreground/62">{summaryText}</p>
          </div>
        </Card>

        {feedback ? (
          <Card
            className={
              feedback.type === "success"
                ? "border-success/25 bg-success/8 p-4"
                : "border-danger/25 bg-danger/8 p-4"
            }
          >
            <p className={feedback.type === "success" ? "text-success" : "text-danger"}>
              {feedback.message}
            </p>
          </Card>
        ) : null}

        {error && !reportsData ? (
          <EmptyState
            title="Не удалось загрузить отчёты"
            description={error}
          >
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button onClick={() => setReloadKey((value) => value + 1)}>Повторить</Button>
              <Link to="/orders">
                <Button variant="ghost">Перейти к моим заявкам</Button>
              </Link>
            </div>
          </EmptyState>
        ) : null}

        {isLoading ? <ReportsSkeleton /> : null}

        {!isLoading && error && reportsData ? (
          <Card className="border-danger/25 bg-danger/8 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-danger">Не удалось обновить список отчётов</p>
                <p className="mt-1 text-sm leading-6 text-foreground/72">{error}</p>
              </div>
              <Button variant="ghost" onClick={() => setReloadKey((value) => value + 1)}>
                Повторить
              </Button>
            </div>
          </Card>
        ) : null}

        {!isLoading && !error && reports.length === 0 ? (
          <EmptyState
            title="Отчётов пока нет"
            description="Сформируйте документ на странице конкретной заявки."
          >
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              {(typeValue !== "ALL" || formatValue !== "ALL") ? (
                <Button variant="ghost" onClick={handleResetFilters}>
                  Сбросить фильтры
                </Button>
              ) : null}
              <Link to="/orders">
                <Button>Перейти к моим заявкам</Button>
              </Link>
            </div>
          </EmptyState>
        ) : null}

        {!isLoading && reports.length > 0 ? (
          <>
            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-strong">
                    Архив документов
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    {reportsCountLabel}
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-foreground/62">
                  Для каждого файла доступна отдельная загрузка без блокировки остальных карточек.
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  isDownloading={downloadingReportId === report.id}
                  onDownload={handleDownload}
                />
              ))}
            </div>

            <ReportsPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : null}
      </div>
    </main>
  );
}
