import { Button, Modal } from "../../../../shared/ui";
import { adminGhostButtonClassName } from "../../components/adminUiStyles";
import type { AdminUser } from "../adminUsersTypes";

export type AdminUserBlockModalProps = {
  open: boolean;
  user: AdminUser | null;
  isSubmitting?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

export function AdminUserBlockModal({
  open,
  user,
  isSubmitting = false,
  error,
  onConfirm,
  onClose,
}: AdminUserBlockModalProps) {
  const isBlocked = Boolean(user?.isBlocked);

  return (
    <Modal open={open} onClose={onClose} variant="admin" className="max-w-lg">
      <div className="space-y-5">
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-[#F4EFE6]">
          {isBlocked ? "Разблокировать пользователя?" : "Заблокировать пользователя?"}
        </h2>
        <p className="text-sm leading-6 text-[rgba(244,239,230,0.72)]">
          {user
            ? isBlocked
              ? `Пользователь ${user.fullName} снова получит доступ к платформе и личному кабинету.`
              : `Пользователь ${user.fullName} не сможет входить в аккаунт, пока блокировка не будет снята.`
            : "Подтвердите действие для выбранного пользователя."}
        </p>

        {error ? (
          <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="ghost"
            className={adminGhostButtonClassName}
            onClick={onClose}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button
            variant={isBlocked ? "secondary" : "danger"}
            className={isBlocked ? "bg-secondary text-white hover:bg-secondary-soft" : undefined}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Выполняем..."
              : isBlocked
                ? "Разблокировать"
                : "Заблокировать"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
