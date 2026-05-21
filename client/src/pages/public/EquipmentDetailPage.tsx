import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function EquipmentDetailPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Detail shell"
        title="Equipment detail foundation"
        description="Gallery, spec blocks, reviews and rental summary will anchor this route once the catalog integration stage begins."
        summary={[
          "Large image-first detail composition is reserved for this page.",
          "Technical specs and review modules will reuse shared UI and status tokens.",
          "Breadcrumbs and CTA hierarchy are already included in the shared layer.",
          "No fake data table is forced in early, only a shaped page shell.",
        ]}
        metrics={[
          { label: "Gallery", value: "Planned", status: "AVAILABLE" },
          { label: "Reviews", value: "Ready shell", status: "PENDING" },
          { label: "CTA block", value: "Structured", status: "APPROVED" },
        ]}
      />
    </div>
  );
}
