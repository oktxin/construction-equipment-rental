import type { AuthUser } from "../../../shared/types/auth";
import { Card, EmptyState } from "../../../shared/ui";
import type { EquipmentReview } from "../catalogTypes";
import { MyReviewPanel } from "../../reviews/components/MyReviewPanel";
import { ReviewCard } from "../../reviews/components/ReviewCard";

const ratingFormatter = new Intl.NumberFormat("ru-RU", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

type EquipmentReviewsProps = {
  equipmentId: string;
  reviews: EquipmentReview[];
  averageRating: number | null;
  reviewsCount: number;
  currentUser: AuthUser | null;
  isAuthReady: boolean;
  reviewsError?: string | null;
  onReviewsChanged: () => Promise<void>;
};

function formatRating(value: number | null) {
  return value === null ? "Нет оценок" : `${ratingFormatter.format(value)} / 5`;
}

function getReviewsLabel(count: number) {
  const remainder10 = count % 10;
  const remainder100 = count % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    return `${count} отзыв`;
  }

  if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 12 || remainder100 > 14)) {
    return `${count} отзыва`;
  }

  return `${count} отзывов`;
}

export function EquipmentReviews({
  equipmentId,
  reviews,
  averageRating,
  reviewsCount,
  currentUser,
  isAuthReady,
  reviewsError,
  onReviewsChanged,
}: EquipmentReviewsProps) {
  const ownReview =
    currentUser ? reviews.find((review) => review.user.id === currentUser.id) ?? null : null;
  const publicReviews = ownReview
    ? reviews.filter((review) => review.id !== ownReview.id)
    : reviews;

  return (
    <div className="space-y-5" data-testid="equipment-reviews">
      <Card className="p-6" data-testid="reviews-summary">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Отзывы
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-foreground/68">
              Публикуем отзывы клиентов по реальному опыту аренды, чтобы по карточке было легче
              оценить состояние техники и понятность сервиса.
            </p>
          </div>
          <div className="rounded-display border border-border/55 bg-background/65 px-5 py-4">
            <div
              className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground"
              data-testid="reviews-average"
            >
              {formatRating(averageRating)}
            </div>
            <p className="mt-1 text-sm text-foreground/62" data-testid="reviews-count">
              {reviewsCount > 0 ? getReviewsLabel(reviewsCount) : "Пока без отзывов"}
            </p>
          </div>
        </div>
      </Card>

      <MyReviewPanel
        equipmentId={equipmentId}
        currentUser={currentUser}
        ownReview={ownReview}
        isAuthReady={isAuthReady}
        onReviewsChanged={onReviewsChanged}
      />

      {reviewsError ? (
        <Card className="border-warning/30 bg-warning/10 p-4">
          <p className="text-sm leading-6 text-foreground/74">
            Не удалось полностью обновить список отзывов. Повторите действие чуть позже.
          </p>
        </Card>
      ) : null}

      {reviews.length === 0 ? (
        <EmptyState
          title="Пока нет отзывов"
          description="Станьте первым клиентом, который поделится опытом аренды этой позиции."
          className="p-6"
        />
      ) : (
        <div className="space-y-4">
          {publicReviews.length > 0 ? (
            <>
              <div className="space-y-1">
                <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-foreground">
                  {ownReview ? "Отзывы клиентов" : "Все отзывы"}
                </h3>
                <p className="text-sm leading-6 text-foreground/62">
                  {ownReview
                    ? "Ваш отзыв закреплён выше, остальные мнения собраны ниже."
                    : "Список открыт всем посетителям страницы, даже без авторизации."}
                </p>
              </div>

              <div className="grid gap-4" data-testid="public-reviews-list">
                {publicReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </>
          ) : ownReview ? (
            <Card className="p-5 sm:p-6">
              <p className="font-semibold text-foreground">Пока это единственный отзыв по этой позиции.</p>
              <p className="mt-2 text-sm leading-6 text-foreground/62">
                Как только появятся новые отзывы клиентов, они появятся в этом блоке ниже вашего.
              </p>
            </Card>
          ) : null}
        </div>
      )}
    </div>
  );
}
