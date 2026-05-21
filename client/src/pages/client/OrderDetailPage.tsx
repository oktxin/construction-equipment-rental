import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function OrderDetailPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Client shell"
        title="Order detail foundation"
        description="This route will carry the detailed rental summary, delivery info and status timeline for a single order."
        summary={[
          "Breadcrumbs and page headers already support this detail-oriented view.",
          "Status and totals hierarchy are reserved for the next API integration phase.",
          "The shell is designed to stay readable on mobile without forcing desktop tables.",
          "Future report actions can attach here naturally.",
        ]}
      />
    </div>
  );
}
