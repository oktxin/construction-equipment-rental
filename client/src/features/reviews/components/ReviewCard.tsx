import { Button, Card } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { EquipmentReview } from "../../catalog/catalogTypes";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

type ReviewCardProps = {
  review: EquipmentReview;
  isOwn?: boolean;
  isActionDisabled?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
};

function buildInitials(fullName: string) {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ReviewCard({
  review,
  isOwn = false,
  isActionDisabled = false,
  onEdit,
  onDelete,
  className,
}: ReviewCardProps) {
  const canManage = isOwn && (onEdit || onDelete);

  return (
    <Card
      className={cn(
        "p-5 sm:p-6",
        isOwn && "border-accent/30 bg-gradient-to-br from-card via-card to-accent/5",
        className,
      )}
      data-testid={isOwn ? "own-review-card" : "review-card"}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/55 text-sm font-bold text-secondary">
              {review.user.avatarUrl ? (
                <img
                  src={review.user.avatarUrl}
                  alt={review.user.fullName}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                buildInitials(review.user.fullName || "BR")
              )}
            </div>

            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-foreground">{review.user.fullName}</h3>
                {isOwn ? (
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">
                    Ваш отзыв
                  </span>
                ) : null}
              </div>

              <p className="text-sm text-foreground/58">
                {dateFormatter.format(new Date(review.updatedAt ?? review.createdAt))}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center justify-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-strong">
            {review.rating} / 5
          </div>
        </div>

        <p className="text-sm leading-7 text-foreground/74">{review.text}</p>

        {canManage ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {onEdit ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-center sm:w-auto"
                onClick={onEdit}
                disabled={isActionDisabled}
              >
                Редактировать
              </Button>
            ) : null}

            {onDelete ? (
              <Button
                type="button"
                variant="danger"
                size="sm"
                className="w-full justify-center sm:w-auto"
                onClick={onDelete}
                disabled={isActionDisabled}
              >
                Удалить
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
