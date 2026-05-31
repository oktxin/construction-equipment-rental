import { useEffect } from "react";

import { Button, LoadingSkeleton } from "../../../../shared/ui";
import { formatDate } from "../../../rentalOrders/rentalOrdersUtils";
import type { AdminReview, UpdateAdminReviewPayload } from "../adminReviewsTypes";
import { AdminReviewEditForm } from "./AdminReviewEditForm";
import { AdminReviewModerationActions } from "./AdminReviewModerationActions";
import { AdminReviewRatingBadge } from "./AdminReviewRatingBadge";

type SummaryFieldProps = {
  label: string;
  value: string;
};

function SummaryField({ label, value }: SummaryFieldProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/38">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/72">{value}</p>
    </div>
  );
}

export type AdminReviewDetailPanelProps = {
  open: boolean;
  review: AdminReview | null;
  isLoading: boolean;
  error: string | null;
  editMessage?: string | null;
  editError?: string | null;
  actionMessage?: string | null;
  actionError?: string | null;
  isUpdating?: boolean;
  isPublishing?: boolean;
  isDeleting?: boolean;
  onClose: () => void;
  onRetry: () => void;
  onSubmitUpdate: (values: UpdateAdminReviewPayload) => void;
  onTogglePublish: (review: AdminReview) => void;
  onDelete: (review: AdminReview) => void;
};

export function AdminReviewDetailPanel({
  open,
  review,
  isLoading,
  error,
  editMessage,
  editError,
  actionMessage,
  actionError,
  isUpdating = false,
  isPublishing = false,
  isDeleting = false,
  onClose,
  onRetry,
  onSubmitUpdate,
  onTogglePublish,
  onDelete,
}: AdminReviewDetailPanelProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Закрыть панель отзыва"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside className="relative z-10 flex h-full w-full flex-col border-l border-white/10 bg-adminBackground shadow-industrial-dark-xl sm:max-w-[720px]">
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-6">
          <div className="min-w-0 space-y-2">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              Детали отзыва
            </p>
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
              {review ? review.equipment.name : "Загрузка"}
            </h2>
            {review ? <AdminReviewRatingBadge rating={review.rating} /> : null}
          </div>

          <Button
            variant="ghost"
            className="border-white/10 bg-adminSurface text-white hover:bg-adminSurface-strong"
            onClick={onClose}
          >
            Закрыть
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {isLoading ? (
            <div className="space-y-4">
              <LoadingSkeleton tone="admin" lines={6} />
              <LoadingSkeleton tone="admin" lines={8} />
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="rounded-[24px] border border-rose-400/20 bg-rose-400/8 p-5">
              <h3 className="font-heading text-xl font-semibold text-white">
                Не удалось загрузить отзыв
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/68">{error}</p>
              <div className="mt-4">
                <Button
                  className="bg-primary text-foreground hover:bg-primary-strong"
                  onClick={onRetry}
                >
                  Повторить
                </Button>
              </div>
            </div>
          ) : null}

          {!isLoading && !error && review ? (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <SummaryField
                  label="Пользователь"
                  value={`${review.user.fullName}\n${review.user.email}`}
                />
                <SummaryField
                  label="Оборудование"
                  value={`${review.equipment.name}\n${review.equipment.category.name}`}
                />
                <SummaryField label="Создан" value={formatDate(review.createdAt)} />
                <SummaryField
                  label="Обновлён"
                  value={formatDate(review.updatedAt ?? review.createdAt)}
                />
              </div>

              <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
                    Полный текст
                  </h3>
                  <p className="text-sm leading-6 text-white/58">
                    Исходный текст отзыва в текущем состоянии.
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="whitespace-pre-line text-sm leading-7 text-white/76">
                    {review.text}
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
                    Редактирование
                  </h3>
                  <p className="text-sm leading-6 text-white/58">
                    Можно скорректировать рейтинг и текст без выхода со страницы.
                  </p>
                </div>

                <div className="mt-4">
                  <AdminReviewEditForm
                    review={review}
                    isSubmitting={isUpdating}
                    successMessage={editMessage}
                    serverError={editError}
                    onSubmit={onSubmitUpdate}
                  />
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
                    Модерация
                  </h3>
                  <p className="text-sm leading-6 text-white/58">
                    Управляйте публикацией и при необходимости удаляйте отзыв.
                  </p>
                </div>

                <div className="mt-4">
                  <AdminReviewModerationActions
                    review={review}
                    isPublishing={isPublishing}
                    isDeleting={isDeleting}
                    actionMessage={actionMessage}
                    actionError={actionError}
                    onTogglePublish={onTogglePublish}
                    onDelete={onDelete}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
