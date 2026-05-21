import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function CatalogPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Catalog shell"
        title="Equipment catalog foundation"
        description="Search, filter and sorting zones are prepared here as a calm, industrial browsing workspace for the next feature stage."
        summary={[
          "Sticky filter panel and mobile drawer behavior are planned.",
          "Equipment cards will plug into the shared design tokens and status badges.",
          "Pagination and sorting live here, but full catalog logic is intentionally deferred.",
          "This shell protects the visual direction before API density arrives.",
        ]}
        metrics={[
          { label: "Layout mode", value: "Grid", status: "AVAILABLE" },
          { label: "Filters", value: "Prepared", status: "PENDING" },
          { label: "Data wiring", value: "Next", status: "APPROVED" },
        ]}
      />
    </div>
  );
}
