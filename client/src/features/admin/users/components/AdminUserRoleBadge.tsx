import { Badge } from "../../../../shared/ui";
import { adminBadgeStyles } from "../../components/adminBadgeStyles";
import { getUserRoleLabel } from "../../../../shared/utils/statusLabels";
import type { RoleName } from "../../../../shared/types/auth";

export type AdminUserRoleBadgeProps = {
  role: RoleName;
};

export function AdminUserRoleBadge({ role }: AdminUserRoleBadgeProps) {
  return (
    <Badge
      variant={role === "ADMIN" ? "accent" : "neutral"}
      className={role === "ADMIN" ? adminBadgeStyles.accent : adminBadgeStyles.info}
    >
      {getUserRoleLabel(role)}
    </Badge>
  );
}
