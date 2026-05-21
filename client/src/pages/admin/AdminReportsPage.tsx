import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminReportsPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Admin foundation"
      title="Admin reports shell"
      description="Operational exports, generated documents and statistics controls will be added here once report UI work begins."
      summary={[
        "Prepared for mixed metadata, filters and action-heavy report cards.",
        "The route stays consistent with the rest of admin operations UI.",
        "Export and generation states can reuse the shared loading and empty surfaces.",
        "The backend already supports reports, this shell prepares the frontend landing zone.",
      ]}
      metrics={[
        { label: "Exports", value: "Prepared", status: "AVAILABLE" },
        { label: "Visibility", value: "Admin only", status: "APPROVED" },
        { label: "Analytics", value: "Next", status: "PENDING" },
      ]}
    />
  );
}
