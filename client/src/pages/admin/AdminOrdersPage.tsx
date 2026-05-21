import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminOrdersPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Admin foundation"
      title="Order operations shell"
      description="Approval, status transitions and manager comments will be managed from this workspace in the next admin implementation stage."
      summary={[
        "This route is built around high-signal status visibility.",
        "The shell leaves room for filters, list density and detail drill-ins.",
        "StatusBadge already supports the backend order states.",
        "The admin workspace remains practical, not dashboard-generic.",
      ]}
      metrics={[
        { label: "Workflow", value: "Prepared", status: "APPROVED" },
        { label: "Statuses", value: "Mapped", status: "ACTIVE" },
        { label: "Actions", value: "Next", status: "PENDING" },
      ]}
    />
  );
}
