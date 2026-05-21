import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminUsersPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Admin foundation"
      title="User management shell"
      description="Blocking, role display and account search will be connected here after the core admin data stage begins."
      summary={[
        "Prepared for compact, utilitarian user administration.",
        "Role-aware auth state already exists in the frontend store.",
        "The shell can host filters and quick row actions without redesign.",
        "This is intentionally calmer than the public product pages.",
      ]}
    />
  );
}
