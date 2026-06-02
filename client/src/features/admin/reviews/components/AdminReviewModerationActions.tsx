import { Badge, Button } from "../../../../shared/ui";
import type { AdminReview } from "../adminReviewsTypes";
import { adminBadgeStyles } from "../../components/adminBadgeStyles";

function PublishBadge({ isPublished }: { isPublished: boolean }) {
  return (
    <Badge variant={isPublished ? "success" : "warning"} className={isPublished ? adminBadgeStyles.success : adminBadgeStyles.warning}>
      {isPublished ? "Опубликован" : "Скрыт"}
    </Badge>
  );
}

export type AdminReviewModerationActionsProps = {
  review: AdminReview;
  isPublishing?: boolean;
  isDeleting?: boolean;
  actionMessage?: string | null;
  actionError?: string | null;
  onTogglePublish: (review: AdminReview) => void;
  onDelete: (review: AdminReview) => void;
};

export function AdminReviewModerationActions({
  review,
  isPublishing = false,
  isDeleting = false,
  actionMessage,
  actionError,
  onTogglePublish,
  onDelete,
}: AdminReviewModerationActionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <PublishBadge isPublished={review.isPublished} />
        <span className="text-sm text-white/58">
          Отзыв {review.isPublished ? "виден на публичной витрине" : "скрыт с публичной витрины"}.
        </span>
      </div>

      {actionMessage ? (
        <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {actionMessage}
        </p>
      ) : null}

      {actionError ? (
        <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {actionError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          variant={review.isPublished ? "secondary" : "primary"}
          className={review.isPublished ? "bg-secondary text-white hover:bg-secondary-soft" : "bg-primary text-foreground hover:bg-primary-strong"}
          onClick={() => onTogglePublish(review)}
          disabled={isPublishing}
        >
          {isPublishing
            ? "Обновляем..."
            : review.isPublished
              ? "Скрыть отзыв"
              : "Опубликовать отзыв"}
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(review)}
          disabled={isDeleting}
        >
          {isDeleting ? "Удаляем..." : "Удалить отзыв"}
        </Button>
      </div>
    </div>
  );
}
