import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function ProfilePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Client shell"
        title="Profile foundation"
        description="Account details, contact preferences and user-facing shortcuts will live here as a calm client workspace."
        summary={[
          "This screen already sits behind authenticated route protection.",
          "The shell is ready for editable contact blocks and rental activity summaries.",
          "Shared inputs and buttons are available for future forms.",
          "Profile and admin shells stay visually separate by design.",
        ]}
      />
    </div>
  );
}
