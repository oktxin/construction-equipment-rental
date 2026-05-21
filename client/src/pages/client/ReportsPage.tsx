import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function ReportsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Client shell"
        title="Reports foundation"
        description="Downloadable PDF and DOCX history will surface here once report listing and generation flows are connected."
        summary={[
          "Protected access is already in place for report routes.",
          "The page layout anticipates file actions, metadata and report states.",
          "Shared empty and loading surfaces are ready for no-data and generation states.",
          "Admin and client report UX are intentionally split by tone.",
        ]}
        metrics={[
          { label: "Downloads", value: "Planned", status: "PENDING" },
          { label: "Access", value: "Protected", status: "APPROVED" },
          { label: "Format support", value: "PDF / DOCX", status: "AVAILABLE" },
        ]}
      />
    </div>
  );
}
