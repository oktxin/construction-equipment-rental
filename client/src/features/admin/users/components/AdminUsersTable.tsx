import { Badge, Button, Card, EmptyState } from "../../../../shared/ui";
import { formatDate } from "../../../rentalOrders/rentalOrdersUtils";
import type { AdminUser } from "../adminUsersTypes";
import { AdminUserRoleBadge } from "./AdminUserRoleBadge";
import { AdminDataTable } from "../../components/AdminDataTable";
import { adminBadgeStyles } from "../../components/adminBadgeStyles";

function UserBlockBadge({ isBlocked }: { isBlocked: boolean }) {
  return (
    <Badge variant={isBlocked ? "danger" : "success"} className={isBlocked ? adminBadgeStyles.danger : adminBadgeStyles.success}>
      {isBlocked ? "Заблокирован" : "Активен"}
    </Badge>
  );
}

function MobileUserCard({
  user,
  onOpen,
  onEdit,
  onToggleBlock,
}: {
  user: AdminUser;
  onOpen: (userId: string) => void;
  onEdit: (userId: string) => void;
  onToggleBlock: (user: AdminUser) => void;
}) {
  return (
    <Card tone="admin" className="p-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <AdminUserRoleBadge role={user.role.name} />
            <div>
              <p className="font-medium text-white">{user.fullName}</p>
              <p className="mt-1 text-sm text-white/68">{user.email}</p>
            </div>
          </div>
          <UserBlockBadge isBlocked={user.isBlocked} />
        </div>

        <div className="grid gap-3 rounded-[22px] border border-white/8 bg-adminBackground/60 p-4 text-sm text-white/64">
          <div className="flex items-center justify-between gap-4">
            <span>Телефон</span>
            <span className="text-right text-white">
              {user.phone || "Не указан"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Регистрация</span>
            <span className="text-right text-white">{formatDate(user.createdAt)}</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={() => onOpen(user.id)}
          >
            Открыть
          </Button>
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={() => onEdit(user.id)}
          >
            Редактировать
          </Button>
          <Button
            variant={user.isBlocked ? "secondary" : "danger"}
            className={user.isBlocked ? "bg-secondary text-white hover:bg-secondary-soft" : undefined}
            onClick={() => onToggleBlock(user)}
          >
            {user.isBlocked ? "Разблокировать" : "Заблокировать"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export type AdminUsersTableProps = {
  items: AdminUser[];
  onOpen: (userId: string) => void;
  onEdit: (userId: string) => void;
  onToggleBlock: (user: AdminUser) => void;
};

export function AdminUsersTable({
  items,
  onOpen,
  onEdit,
  onToggleBlock,
}: AdminUsersTableProps) {
  return (
    <AdminDataTable
      rows={items}
      getRowKey={(item) => item.id}
      emptyState={
        <EmptyState
          tone="admin"
          title="Пользователи не найдены"
          description="Измените условия поиска или снимите часть фильтров, чтобы увидеть другие аккаунты."
        />
      }
      renderMobileCard={(item) => (
        <MobileUserCard
          user={item}
          onOpen={onOpen}
          onEdit={onEdit}
          onToggleBlock={onToggleBlock}
        />
      )}
      columns={[
        {
          key: "fullName",
          header: "Пользователь",
          cellClassName: "min-w-[220px]",
          render: (item) => (
            <div className="space-y-1">
              <p className="font-medium text-white">{item.fullName}</p>
              <p className="text-sm text-white/68">{item.email}</p>
            </div>
          ),
        },
        {
          key: "phone",
          header: "Телефон",
          cellClassName: "min-w-[160px]",
          render: (item) => <p className="text-white/80">{item.phone || "Не указан"}</p>,
        },
        {
          key: "role",
          header: "Роль",
          cellClassName: "min-w-[140px]",
          render: (item) => <AdminUserRoleBadge role={item.role.name} />,
        },
        {
          key: "isBlocked",
          header: "Доступ",
          cellClassName: "min-w-[160px]",
          render: (item) => <UserBlockBadge isBlocked={item.isBlocked} />,
        },
        {
          key: "createdAt",
          header: "Регистрация",
          cellClassName: "min-w-[150px]",
          render: (item) => <p className="text-white/76">{formatDate(item.createdAt)}</p>,
        },
        {
          key: "actions",
          header: "Действия",
          className: "text-right",
          cellClassName: "min-w-[280px] text-right",
          render: (item) => (
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                onClick={() => onOpen(item.id)}
              >
                Открыть
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                onClick={() => onEdit(item.id)}
              >
                Редактировать
              </Button>
              <Button
                size="sm"
                variant={item.isBlocked ? "secondary" : "danger"}
                className={item.isBlocked ? "bg-secondary text-white hover:bg-secondary-soft" : undefined}
                onClick={() => onToggleBlock(item)}
              >
                {item.isBlocked ? "Разблокировать" : "Заблокировать"}
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}
