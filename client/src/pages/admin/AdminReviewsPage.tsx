import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminReviewsPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Admin foundation"
      title="Review moderation shell"
      description="Moderation queues, publication toggles and equipment context will be introduced here in the next admin pass."
      summary={[
        "The visual system is ready for moderation-specific status cues.",
        "This route keeps content dense and readable on both desktop and tablet.",
        "Review states and equipment references will connect cleanly to the shell.",
        "No fake moderation table is shipped before the real data layer.",
      ]}
    />
  );
}
