import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function FavoritesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Client shell"
        title="Favorites foundation"
        description="Saved equipment cards, quick compare actions and empty-state UX will live here when favorites are connected."
        summary={[
          "Protected route logic already guards this client-only page.",
          "Saved equipment cards will reuse the catalog card system.",
          "This view is shaped for an informative empty state, not a blank white page.",
          "Micro-feedback for save and remove actions will be added later.",
        ]}
        metrics={[
          { label: "Access", value: "Protected", status: "APPROVED" },
          { label: "Cards", value: "Shared UI", status: "AVAILABLE" },
          { label: "Logic", value: "Pending", status: "PENDING" },
        ]}
      />
    </div>
  );
}
