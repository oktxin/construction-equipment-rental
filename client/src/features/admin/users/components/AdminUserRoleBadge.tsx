import { Badge } from "../../../../shared/ui";
import { getUserRoleLabel } from "../../../../shared/utils/statusLabels";
import type { RoleName } from "../../../../shared/types/auth";

export type AdminUserRoleBadgeProps = {
  role: RoleName;
};

export function AdminUserRoleBadge({ role }: AdminUserRoleBadgeProps) {
  return (
    <Badge variant={role === "ADMIN" ? "accent" : "neutral"}>
      {getUserRoleLabel(role)}
    </Badge>
  );
}
