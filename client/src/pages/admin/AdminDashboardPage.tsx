import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminDashboardPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Admin foundation"
      title="Operations dashboard shell"
      description="KPI cards, review queues and report highlights will be built here on top of the dark admin workspace."
      summary={[
        "Dense operational layout is separated from the warmer public browsing shell.",
        "Shared stats-style components are ready to host live numbers later.",
        "Admin routes are guarded for ADMIN role only.",
        "This shell is optimized for a future data-heavy workspace without shipping empty tables now.",
      ]}
      metrics={[
        { label: "Access", value: "Admin only", status: "APPROVED" },
        { label: "Density", value: "Structured", status: "ACTIVE" },
        { label: "Data", value: "Pending", status: "PENDING" },
      ]}
    />
  );
}
