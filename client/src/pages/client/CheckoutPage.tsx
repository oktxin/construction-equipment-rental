import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Protected checkout shell"
        title="Rental checkout foundation"
        description="Dates, delivery, comment fields and totals will be implemented here after catalog and detail page integration."
        summary={[
          "Route protection already keeps checkout behind authentication.",
          "Input, select and CTA components are ready for the real rental form.",
          "The shell reserves a strong summary zone for pricing and deposit totals.",
          "Validation and calculation logic are intentionally deferred to the next implementation pass.",
        ]}
        metrics={[
          { label: "Access", value: "Protected", status: "APPROVED" },
          { label: "Form shell", value: "Ready", status: "AVAILABLE" },
          { label: "Calculation", value: "Next", status: "PENDING" },
        ]}
      />
    </div>
  );
}
