import { Card, EmptyState } from "../../../shared/ui";
import type { EquipmentReview } from "../catalogTypes";

const ratingFormatter = new Intl.NumberFormat("ru-RU", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

type EquipmentReviewsProps = {
  reviews: EquipmentReview[];
  averageRating: number | null;
  reviewsCount: number;
};

function formatRating(value: number | null) {
  return value === null ? "Нет оценок" : `${ratingFormatter.format(value)} / 5`;
}

export function EquipmentReviews({
  reviews,
  averageRating,
  reviewsCount,
}: EquipmentReviewsProps) {
  return (
    <div className="space-y-5">
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Отзывы
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-foreground/68">
              Публикуем только подтвержденные отзывы клиентов по реальным арендам оборудования.
            </p>
          </div>
          <div className="rounded-display border border-border/55 bg-background/65 px-5 py-4">
            <div className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground">
              {formatRating(averageRating)}
            </div>
            <p className="mt-1 text-sm text-foreground/62">
              {reviewsCount > 0 ? `${reviewsCount} отзывов` : "Пока без отзывов"}
            </p>
          </div>
        </div>
      </Card>

      {reviews.length === 0 ? (
        <EmptyState
          title="Пока нет отзывов"
          description="Станьте первым клиентом, который поделится опытом аренды этой позиции."
          className="p-6"
        />
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{review.user.fullName}</h3>
                  <p className="text-sm text-foreground/58">
                    {dateFormatter.format(new Date(review.createdAt))}
                  </p>
                </div>
                <div className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-strong">
                  {ratingFormatter.format(review.rating)} / 5
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-foreground/74">{review.text}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
