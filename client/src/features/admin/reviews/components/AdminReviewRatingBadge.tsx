import { Badge } from "../../../../shared/ui";

export type AdminReviewRatingBadgeProps = {
  rating: number;
};

export function AdminReviewRatingBadge({ rating }: AdminReviewRatingBadgeProps) {
  const variant =
    rating >= 5 ? "success" : rating >= 4 ? "accent" : rating === 3 ? "warning" : "danger";

  return <Badge variant={variant}>{rating.toFixed(1).replace(".0", "")} / 5</Badge>;
}
