import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function MyOrdersPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Client shell"
        title="My orders foundation"
        description="Order history, status overview and drill-in navigation will be built here after the frontend catalog and checkout stages."
        summary={[
          "Shared badges already support order status colors and labels.",
          "The route is protected and ready for authenticated users only.",
          "This page is shaped for either card-based or table-like history blocks.",
          "Order density will be introduced later without breaking the overall theme.",
        ]}
        metrics={[
          { label: "Status UI", value: "Ready", status: "ACTIVE" },
          { label: "Route guard", value: "Enabled", status: "APPROVED" },
          { label: "History data", value: "Next", status: "PENDING" },
        ]}
      />
    </div>
  );
}
