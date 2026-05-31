import { useEffect } from "react";

import { Badge, Button, LoadingSkeleton } from "../../../../shared/ui";
import { formatDate } from "../../../rentalOrders/rentalOrdersUtils";
import type { AdminUser, UpdateAdminUserPayload } from "../adminUsersTypes";
import { AdminUserForm } from "./AdminUserForm";
import { AdminUserRoleBadge } from "./AdminUserRoleBadge";

type SummaryFieldProps = {
  label: string;
  value: string;
};

function SummaryField({ label, value }: SummaryFieldProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/38">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/72">{value}</p>
    </div>
  );
}

function UserBlockBadge({ isBlocked }: { isBlocked: boolean }) {
  return (
    <Badge variant={isBlocked ? "danger" : "success"}>
      {isBlocked ? "Заблокирован" : "Активен"}
    </Badge>
  );
}

export type AdminUserDetailPanelProps = {
  open: boolean;
  user: AdminUser | null;
  isLoading: boolean;
  error: string | null;
  updateMessage?: string | null;
  updateError?: string | null;
  isUpdating?: boolean;
  isBlocking?: boolean;
  onClose: () => void;
  onRetry: () => void;
  onSubmitUpdate: (values: UpdateAdminUserPayload) => void;
  onRequestToggleBlock: (user: AdminUser) => void;
};

export function AdminUserDetailPanel({
  open,
  user,
  isLoading,
  error,
  updateMessage,
  updateError,
  isUpdating = false,
  isBlocking = false,
  onClose,
  onRetry,
  onSubmitUpdate,
  onRequestToggleBlock,
}: AdminUserDetailPanelProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Закрыть панель пользователя"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside className="relative z-10 flex h-full w-full flex-col border-l border-white/10 bg-adminBackground shadow-industrial-dark-xl sm:max-w-[680px]">
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-6">
          <div className="min-w-0 space-y-2">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              Карточка пользователя
            </p>
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
              {user ? user.fullName : "Загрузка"}
            </h2>
            {user ? (
              <div className="flex flex-wrap items-center gap-2">
                <AdminUserRoleBadge role={user.role.name} />
                <UserBlockBadge isBlocked={user.isBlocked} />
              </div>
            ) : null}
          </div>

          <Button
            variant="ghost"
            className="border-white/10 bg-adminSurface text-white hover:bg-adminSurface-strong"
            onClick={onClose}
          >
            Закрыть
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {isLoading ? (
            <div className="space-y-4">
              <LoadingSkeleton tone="admin" lines={6} />
              <LoadingSkeleton tone="admin" lines={8} />
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="rounded-[24px] border border-rose-400/20 bg-rose-400/8 p-5">
              <h3 className="font-heading text-xl font-semibold text-white">
                Не удалось загрузить пользователя
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/68">{error}</p>
              <div className="mt-4">
                <Button
                  className="bg-primary text-foreground hover:bg-primary-strong"
                  onClick={onRetry}
                >
                  Повторить
                </Button>
              </div>
            </div>
          ) : null}

          {!isLoading && !error && user ? (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <SummaryField label="Email" value={user.email} />
                <SummaryField label="Телефон" value={user.phone || "Не указан"} />
                <SummaryField label="Регистрация" value={formatDate(user.createdAt)} />
                <SummaryField label="Последнее обновление" value={formatDate(user.updatedAt)} />
              </div>

              <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
                    Быстрые действия
                  </h3>
                  <p className="text-sm leading-6 text-white/58">
                    Управляйте доступом к платформе и отслеживайте состояние аккаунта.
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    variant={user.isBlocked ? "secondary" : "danger"}
                    className={user.isBlocked ? "bg-secondary text-white hover:bg-secondary-soft" : undefined}
                    onClick={() => onRequestToggleBlock(user)}
                    disabled={isBlocking}
                  >
                    {isBlocking
                      ? "Выполняем..."
                      : user.isBlocked
                        ? "Разблокировать пользователя"
                        : "Заблокировать пользователя"}
                  </Button>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
                    Редактирование профиля
                  </h3>
                  <p className="text-sm leading-6 text-white/58">
                    Изменения сохраняются без смены пароля и сразу применяются в админке.
                  </p>
                </div>

                <div className="mt-4">
                  <AdminUserForm
                    user={user}
                    isSubmitting={isUpdating}
                    successMessage={updateMessage}
                    serverError={updateError}
                    onSubmit={onSubmitUpdate}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
