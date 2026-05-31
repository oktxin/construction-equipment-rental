import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AdminDeleteConfirmModal } from "../../features/admin/catalog/components/AdminDeleteConfirmModal";
import {
  deleteReview,
  getAdminReviews,
  publishReview,
  updateReview,
} from "../../features/admin/reviews/adminReviewsApi";
import type {
  AdminReview,
  UpdateAdminReviewPayload,
} from "../../features/admin/reviews/adminReviewsTypes";
import {
  ADMIN_REVIEWS_DEFAULT_LIMIT,
  buildAdminReviewsSearchParams,
  mergeAdminReview,
  parsePositiveInteger,
  parseRatingFilter,
  parseReviewPublishedFilter,
} from "../../features/admin/reviews/adminReviewsUtils";
import {
  AdminReviewDetailPanel,
} from "../../features/admin/reviews/components/AdminReviewDetailPanel";
import {
  AdminReviewsFilters,
  type AdminReviewsFilterValues,
} from "../../features/admin/reviews/components/AdminReviewsFilters";
import { AdminReviewsTable } from "../../features/admin/reviews/components/AdminReviewsTable";
import { Button, Card, EmptyState, LoadingSkeleton, PageHeader } from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";
import type { ReviewSortBy, ReviewSortOrder } from "../../features/reviews/reviewsTypes";

type FeedbackState = { type: "success" | "error"; message: string } | null;

const knownSortBy: ReviewSortBy[] = ["createdAt", "updatedAt", "rating"];
const knownSortOrder: ReviewSortOrder[] = ["asc", "desc"];

function parseSortBy(value: string | null): ReviewSortBy {
  if (value && knownSortBy.includes(value as ReviewSortBy)) {
    return value as ReviewSortBy;
  }

  return "createdAt";
}

function parseSortOrder(value: string | null): ReviewSortOrder {
  if (value && knownSortOrder.includes(value as ReviewSortOrder)) {
    return value as ReviewSortOrder;
  }

  return "desc";
}

export function AdminReviewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const rating = parseRatingFilter(searchParams.get("rating"));
  const isPublished = parseReviewPublishedFilter(searchParams.get("isPublished"));
  const sortBy = parseSortBy(searchParams.get("sortBy"));
  const sortOrder = parseSortOrder(searchParams.get("sortOrder"));
  const page = parsePositiveInteger(searchParams.get("page"), 1);
  const limit = parsePositiveInteger(searchParams.get("limit"), ADMIN_REVIEWS_DEFAULT_LIMIT);
  const selectedReviewId = searchParams.get("selected");

  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ADMIN_REVIEWS_DEFAULT_LIMIT,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isUpdatingReview, setIsUpdatingReview] = useState(false);
  const [isPublishingReview, setIsPublishingReview] = useState(false);

  const [reviewToDelete, setReviewToDelete] = useState<AdminReview | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeletingReview, setIsDeletingReview] = useState(false);

  async function fetchReviews(silent = false) {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const response = await getAdminReviews({
        search: search || undefined,
        rating,
        isPublished,
        page,
        limit,
        sortBy,
        sortOrder,
      });

      setReviews(response.items);
      setPagination(response.pagination);
    } catch (fetchError) {
      setError(getErrorMessage(fetchError));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    void fetchReviews(reviews.length > 0);
  }, [search, rating, isPublished, sortBy, sortOrder, page, limit]);

  useEffect(() => {
    if (!selectedReviewId) {
      setSelectedReview(null);
      setDetailError(null);
      return;
    }

    const reviewFromList = reviews.find((item) => item.id === selectedReviewId) ?? null;

    if (reviewFromList) {
      setSelectedReview(reviewFromList);
      setDetailError(null);
      return;
    }

    if (!isLoading) {
      setSelectedReview(null);
      setDetailError("Не удалось найти выбранный отзыв в текущей выборке.");
    }
  }, [isLoading, reviews, selectedReviewId]);

  useEffect(() => {
    setEditMessage(null);
    setEditError(null);
    setActionMessage(null);
    setActionError(null);
  }, [selectedReview?.id]);

  function handleApplyFilters(values: AdminReviewsFilterValues) {
    setSearchParams(
      buildAdminReviewsSearchParams({
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
      buildAdminReviewsSearchParams({
        search,
        rating,
        isPublished,
        sortBy,
        sortOrder,
        limit,
        page: nextPage,
        selected: selectedReviewId,
      }),
    );
  }

  function handleOpenDetail(reviewId: string) {
    setSearchParams(
      buildAdminReviewsSearchParams({
        search,
        rating,
        isPublished,
        sortBy,
        sortOrder,
        limit,
        page,
        selected: reviewId,
      }),
    );
  }

  function handleCloseDetail() {
    setSearchParams(
      buildAdminReviewsSearchParams({
        search,
        rating,
        isPublished,
        sortBy,
        sortOrder,
        limit,
        page,
      }),
    );
  }

  async function handleUpdateReview(values: UpdateAdminReviewPayload) {
    if (!selectedReview) {
      return;
    }

    setIsUpdatingReview(true);
    setEditMessage(null);
    setEditError(null);
    setFeedback(null);

    try {
      const updatedReview = await updateReview(selectedReview.id, values);

      setSelectedReview(updatedReview);
      setReviews((current) => mergeAdminReview(current, updatedReview));
      setEditMessage("Отзыв обновлён.");

      void fetchReviews(true);
    } catch (submitError) {
      setEditError(getErrorMessage(submitError));
    } finally {
      setIsUpdatingReview(false);
    }
  }

  async function handleTogglePublish(review: AdminReview) {
    setIsPublishingReview(true);
    setActionMessage(null);
    setActionError(null);
    setFeedback(null);

    try {
      const updatedReview = await publishReview(review.id, {
        isPublished: !review.isPublished,
      });

      setReviews((current) => mergeAdminReview(current, updatedReview));

      if (selectedReview?.id === updatedReview.id) {
        setSelectedReview(updatedReview);
      }

      const message = updatedReview.isPublished
        ? "Отзыв опубликован."
        : "Отзыв скрыт с витрины.";

      setActionMessage(message);
      setFeedback({ type: "success", message });

      void fetchReviews(true);
    } catch (submitError) {
      const message = getErrorMessage(submitError);
      setActionError(message);
      setFeedback({ type: "error", message });
    } finally {
      setIsPublishingReview(false);
    }
  }

  async function handleConfirmDelete() {
    if (!reviewToDelete) {
      return;
    }

    setIsDeletingReview(true);
    setDeleteError(null);
    setFeedback(null);

    try {
      await deleteReview(reviewToDelete.id);

      if (selectedReviewId === reviewToDelete.id) {
        handleCloseDetail();
      }

      setReviews((current) => current.filter((item) => item.id !== reviewToDelete.id));
      setReviewToDelete(null);
      setFeedback({
        type: "success",
        message: "Отзыв удалён.",
      });

      void fetchReviews(true);
    } catch (submitError) {
      setDeleteError(getErrorMessage(submitError));
    } finally {
      setIsDeletingReview(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Отзывы"
        title="Отзывы"
        description="Модерируйте отзывы клиентов и контролируйте публичную витрину."
        actions={
          <div className="rounded-full border border-white/10 bg-adminBackground/60 px-4 py-2 text-sm text-white/64">
            Всего в выборке <span className="ml-2 font-semibold text-white">{pagination.total}</span>
          </div>
        }
      />

      {feedback ? (
        <Card
          tone="admin"
          className={
            feedback.type === "success"
              ? "border-emerald-400/25 bg-emerald-500/10 p-4 text-emerald-100"
              : "border-rose-400/25 bg-rose-500/10 p-4 text-rose-100"
          }
        >
          {feedback.message}
        </Card>
      ) : null}

      <AdminReviewsFilters
        values={{
          search,
          rating,
          isPublished,
          sortBy,
          sortOrder,
          limit,
        }}
        isPending={isRefreshing}
        onSubmit={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {isLoading ? <LoadingSkeleton tone="admin" lines={10} className="min-h-[420px]" /> : null}

      {!isLoading && error ? (
        <EmptyState
          tone="admin"
          title="Не удалось загрузить отзывы"
          description={error}
        >
          <div className="pt-3">
            <Button
              className="bg-primary text-foreground hover:bg-primary-strong"
              onClick={() => void fetchReviews()}
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
              Обновляем список отзывов...
            </div>
          ) : null}

          <AdminReviewsTable
            items={reviews}
            onOpen={handleOpenDetail}
            onEdit={handleOpenDetail}
            onTogglePublish={(review) => void handleTogglePublish(review)}
            onDelete={setReviewToDelete}
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

      <AdminReviewDetailPanel
        open={Boolean(selectedReviewId)}
        review={selectedReview}
        isLoading={isLoading && Boolean(selectedReviewId)}
        error={detailError}
        editMessage={editMessage}
        editError={editError}
        actionMessage={actionMessage}
        actionError={actionError}
        isUpdating={isUpdatingReview}
        isPublishing={isPublishingReview}
        isDeleting={isDeletingReview}
        onClose={handleCloseDetail}
        onRetry={() => void fetchReviews()}
        onSubmitUpdate={handleUpdateReview}
        onTogglePublish={(review) => void handleTogglePublish(review)}
        onDelete={setReviewToDelete}
      />

      <AdminDeleteConfirmModal
        open={Boolean(reviewToDelete)}
        title="Удалить отзыв?"
        description="Удаление необратимо. Отзыв исчезнет из административной очереди и с публичной витрины."
        confirmLabel="Удалить отзыв"
        isSubmitting={isDeletingReview}
        error={deleteError}
        onConfirm={() => void handleConfirmDelete()}
        onClose={() => {
          if (isDeletingReview) {
            return;
          }

          setReviewToDelete(null);
          setDeleteError(null);
        }}
      />
    </div>
  );
}
