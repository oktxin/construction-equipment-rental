import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminCategoriesPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Admin foundation"
      title="Category management shell"
      description="Slug, icon, description and equipment relation management will land here once CRUD flows are wired in."
      summary={[
        "Prepared for compact management patterns rather than decorative cards.",
        "Uses the same admin visual system as the rest of operations.",
        "Can grow into modal- or side-panel-based editing without redesigning the shell.",
        "Shared buttons and headers already support the required action rhythm.",
      ]}
    />
  );
}
