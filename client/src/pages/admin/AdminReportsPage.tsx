import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getAdminUsers } from "../../features/admin/users/adminUsersApi";
import type { AdminUser } from "../../features/admin/users/adminUsersTypes";
import {
  createAdminRentalStatisticsReport,
  deleteAdminReport,
  downloadAdminReport,
  getAdminReports,
} from "../../features/admin/reports/adminReportsApi";
import type { AdminReport } from "../../features/admin/reports/adminReportsTypes";
import {
  ADMIN_REPORTS_DEFAULT_LIMIT,
  buildAdminReportsSearchParams,
  parsePositiveInteger,
  parseReportFormat,
  parseReportType,
} from "../../features/admin/reports/adminReportsUtils";
import { AdminReportDeleteModal } from "../../features/admin/reports/components/AdminReportDeleteModal";
import { AdminReportGenerateForm } from "../../features/admin/reports/components/AdminReportGenerateForm";
import {
  AdminReportsFilters,
  type AdminReportsFilterUserOption,
  type AdminReportsFilterValues,
} from "../../features/admin/reports/components/AdminReportsFilters";
import { AdminReportsTable } from "../../features/admin/reports/components/AdminReportsTable";
import { Button, Card, EmptyState, LoadingSkeleton, PageHeader } from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";

type FeedbackState = { type: "success" | "error"; message: string } | null;

export function AdminReportsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = parseReportType(searchParams.get("type"));
  const format = parseReportFormat(searchParams.get("format"));
  const userId = searchParams.get("userId") ?? "";
  const page = parsePositiveInteger(searchParams.get("page"), 1);
  const limit = parsePositiveInteger(searchParams.get("limit"), ADMIN_REPORTS_DEFAULT_LIMIT);

  const [reports, setReports] = useState<AdminReport[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ADMIN_REPORTS_DEFAULT_LIMIT,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [actionFeedback, setActionFeedback] = useState<FeedbackState>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationSuccess, setGenerationSuccess] = useState<string | null>(null);
  const [generatedReport, setGeneratedReport] = useState<AdminReport | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const [downloadingReportId, setDownloadingReportId] = useState<string | null>(null);

  const [reportToDelete, setReportToDelete] = useState<AdminReport | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeletingReport, setIsDeletingReport] = useState(false);

  const [userOptions, setUserOptions] = useState<AdminReportsFilterUserOption[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  async function fetchReports(silent = false) {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const response = await getAdminReports({
        type: type || undefined,
        format: format || undefined,
        userId: userId || undefined,
        page,
        limit,
      });

      setReports(response.items);
      setPagination(response.pagination);
    } catch (fetchError) {
      setError(getErrorMessage(fetchError));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  async function fetchUsers() {
    setIsUsersLoading(true);
    setUsersError(null);

    try {
      const response = await getAdminUsers({
        page: 1,
        limit: 100,
      });

      setUserOptions(
        response.items.map((user: AdminUser) => ({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        })),
      );
    } catch (fetchError) {
      setUsersError(getErrorMessage(fetchError));
      setUserOptions([]);
    } finally {
      setIsUsersLoading(false);
    }
  }

  useEffect(() => {
    void fetchReports(reports.length > 0);
  }, [type, format, userId, page, limit]);

  useEffect(() => {
    void fetchUsers();
  }, []);

  function handleApplyFilters(values: AdminReportsFilterValues) {
    setSearchParams(
      buildAdminReportsSearchParams({
        ...values,
        page: 1,
      }),
    );
  }

  function handleResetFilters() {
    setSearchParams(new URLSearchParams());
  }

  function handleChangePage(nextPage: number) {
    setSearchParams(
      buildAdminReportsSearchParams({
        type,
        format,
        userId,
        limit,
        page: nextPage,
      }),
    );
  }

  async function handleGenerateReport(payload: {
    format: "PDF" | "DOCX";
    dateFrom: string;
    dateTo: string;
  }) {
    setIsGeneratingReport(true);
    setGenerationError(null);
    setGenerationSuccess(null);
    setGeneratedReport(null);
    setActionFeedback(null);

    try {
      const report = await createAdminRentalStatisticsReport(payload);

      setGeneratedReport(report);
      setGenerationSuccess("Отчёт сформирован. Его можно скачать сразу или найти в списке ниже.");
      void fetchReports(true);
    } catch (submitError) {
      setGenerationError(getErrorMessage(submitError));
    } finally {
      setIsGeneratingReport(false);
    }
  }

  async function handleDownloadReport(report: AdminReport) {
    setDownloadingReportId(report.id);
    setActionFeedback(null);

    try {
      await downloadAdminReport(report.id);
      setActionFeedback({
        type: "success",
        message: `Отчёт «${report.title}» скачан.`,
      });
    } catch (downloadError) {
      setActionFeedback({
        type: "error",
        message: getErrorMessage(downloadError),
      });
    } finally {
      setDownloadingReportId(null);
    }
  }

  async function handleConfirmDelete() {
    if (!reportToDelete) {
      return;
    }

    setIsDeletingReport(true);
    setDeleteError(null);
    setActionFeedback(null);

    try {
      await deleteAdminReport(reportToDelete.id);

      const isLastItemOnPage = reports.length === 1 && page > 1;

      setReports((current) => current.filter((item) => item.id !== reportToDelete.id));
      setReportToDelete(null);
      setActionFeedback({
        type: "success",
        message: "Отчёт удалён.",
      });

      if (generatedReport?.id === reportToDelete.id) {
        setGeneratedReport(null);
        setGenerationSuccess(null);
      }

      if (isLastItemOnPage) {
        setSearchParams(
          buildAdminReportsSearchParams({
            type,
            format,
            userId,
            limit,
            page: page - 1,
          }),
        );
        return;
      }

      void fetchReports(true);
    } catch (submitError) {
      setDeleteError(getErrorMessage(submitError));
    } finally {
      setIsDeletingReport(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Отчёты"
        title="Отчёты"
        description="Формируйте статистику аренды и управляйте документами пользователей в едином операционном потоке."
        actions={
          <div className="rounded-full border border-white/10 bg-adminBackground/60 px-4 py-2 text-sm text-white/64">
            Всего в выборке <span className="ml-2 font-semibold text-white">{pagination.total}</span>
          </div>
        }
      />

      <AdminReportGenerateForm
        isSubmitting={isGeneratingReport}
        submitError={generationError}
        submitSuccess={generationSuccess}
        generatedReport={generatedReport}
        isDownloadingGenerated={downloadingReportId === generatedReport?.id}
        onSubmit={handleGenerateReport}
        onDownloadGenerated={(report) => void handleDownloadReport(report)}
      />

      {actionFeedback ? (
        <Card
          tone="admin"
          className={
            actionFeedback.type === "success"
              ? "border-emerald-400/25 bg-emerald-500/10 p-4 text-emerald-100"
              : "border-rose-400/25 bg-rose-500/10 p-4 text-rose-100"
          }
        >
          {actionFeedback.message}
        </Card>
      ) : null}

      <AdminReportsFilters
        values={{
          type,
          format,
          userId,
          limit,
        }}
        users={userOptions}
        isPending={isRefreshing}
        isUsersLoading={isUsersLoading}
        usersError={usersError}
        onSubmit={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {isLoading ? <LoadingSkeleton tone="admin" lines={11} className="min-h-[420px]" /> : null}

      {!isLoading && error ? (
        <EmptyState
          tone="admin"
          title="Не удалось загрузить отчёты"
          description={error}
        >
          <div className="pt-3">
            <Button
              className="bg-primary text-foreground hover:bg-primary-strong"
              onClick={() => void fetchReports()}
            >
              Повторить
            </Button>
          </div>
        </EmptyState>
      ) : null}

      {!isLoading && !error ? (
        <>
          {isRefreshing ? (
            <div className="rounded-full border border-white/10 bg-adminSurface px-4 py-2 text-sm text-white/56">
              Обновляем список отчётов...
            </div>
          ) : null}

          <AdminReportsTable
            items={reports}
            downloadingReportId={downloadingReportId}
            onDownload={(report) => void handleDownloadReport(report)}
            onDelete={setReportToDelete}
          />

          {pagination.totalPages > 1 ? (
            <Card tone="admin" className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/58">
                  Страница {pagination.page} из {pagination.totalPages}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="ghost"
                    className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                    disabled={pagination.page <= 1}
                    onClick={() => handleChangePage(pagination.page - 1)}
                  >
                    Назад
                  </Button>
                  <Button
                    className="bg-primary text-foreground hover:bg-primary-strong"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => handleChangePage(pagination.page + 1)}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            </Card>
          ) : null}
        </>
      ) : null}

      <AdminReportDeleteModal
        open={Boolean(reportToDelete)}
        report={reportToDelete}
        isSubmitting={isDeletingReport}
        error={deleteError}
        onConfirm={() => void handleConfirmDelete()}
        onClose={() => {
          if (isDeletingReport) {
            return;
          }

          setReportToDelete(null);
          setDeleteError(null);
        }}
      />
    </div>
  );
}
