import { Badge } from "../../../../shared/ui";
import { adminBadgeStyles } from "../../components/adminBadgeStyles";

export type AdminReviewRatingBadgeProps = {
  rating: number;
};

export function AdminReviewRatingBadge({ rating }: AdminReviewRatingBadgeProps) {
  const variant =
    rating >= 5 ? "success" : rating >= 4 ? "accent" : rating === 3 ? "warning" : "danger";
  const className =
    rating >= 5
      ? adminBadgeStyles.success
      : rating >= 4
        ? adminBadgeStyles.accent
        : rating === 3
          ? adminBadgeStyles.warning
          : adminBadgeStyles.danger;

  return (
    <Badge variant={variant} className={className}>
      {rating.toFixed(1).replace(".0", "")} / 5
    </Badge>
  );
}
