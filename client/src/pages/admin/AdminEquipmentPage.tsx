import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminEquipmentPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Admin foundation"
      title="Equipment management shell"
      description="Inventory controls, status changes, featured flags and asset maintenance will be added here in the next admin stage."
      summary={[
        "The page is reserved for dense but readable operational UI.",
        "Shared status badges already support equipment statuses.",
        "Table and edit flows are intentionally postponed until the next stage.",
        "The layout already accounts for filters, quick actions and side panels.",
      ]}
    />
  );
}
