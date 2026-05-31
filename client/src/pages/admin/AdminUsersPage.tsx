import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchMe, selectAuth } from "../../features/auth/authSlice";
import {
  getAdminUserById,
  getAdminUsers,
  toggleUserBlock,
  updateAdminUser,
} from "../../features/admin/users/adminUsersApi";
import type {
  AdminUser,
  UpdateAdminUserPayload,
} from "../../features/admin/users/adminUsersTypes";
import {
  ADMIN_USERS_DEFAULT_LIMIT,
  buildAdminUsersSearchParams,
  mergeAdminUser,
  parsePositiveInteger,
  parseUserBlockedFilter,
  parseUserRole,
} from "../../features/admin/users/adminUsersUtils";
import {
  AdminUserBlockModal,
} from "../../features/admin/users/components/AdminUserBlockModal";
import {
  AdminUserDetailPanel,
} from "../../features/admin/users/components/AdminUserDetailPanel";
import {
  AdminUsersFilters,
  type AdminUsersFilterValues,
} from "../../features/admin/users/components/AdminUsersFilters";
import { AdminUsersTable } from "../../features/admin/users/components/AdminUsersTable";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { Button, Card, EmptyState, LoadingSkeleton, PageHeader } from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";

type FeedbackState = { type: "success" | "error"; message: string } | null;

export function AdminUsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const search = searchParams.get("search") ?? "";
  const role = parseUserRole(searchParams.get("role"));
  const isBlocked = parseUserBlockedFilter(searchParams.get("isBlocked"));
  const page = parsePositiveInteger(searchParams.get("page"), 1);
  const limit = parsePositiveInteger(searchParams.get("limit"), ADMIN_USERS_DEFAULT_LIMIT);
  const selectedUserId = searchParams.get("selected");

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ADMIN_USERS_DEFAULT_LIMIT,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const [blockTarget, setBlockTarget] = useState<AdminUser | null>(null);
  const [blockModalError, setBlockModalError] = useState<string | null>(null);
  const [isBlockingUser, setIsBlockingUser] = useState(false);

  async function fetchUsers(silent = false) {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const response = await getAdminUsers({
        search: search || undefined,
        role: role || undefined,
        isBlocked,
        page,
        limit,
      });

      setUsers(response.items);
      setPagination(response.pagination);
    } catch (fetchError) {
      setError(getErrorMessage(fetchError));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  async function fetchUserDetail(userId: string) {
    const userFromList = users.find((item) => item.id === userId) ?? null;

    setSelectedUser(userFromList);
    setDetailLoading(true);
    setDetailError(null);

    try {
      const response = await getAdminUserById(userId);
      setSelectedUser(response);
    } catch (fetchError) {
      setDetailError(getErrorMessage(fetchError));
    } finally {
      setDetailLoading(false);
    }
  }

  useEffect(() => {
    void fetchUsers(users.length > 0);
  }, [search, role, isBlocked, page, limit]);

  useEffect(() => {
    if (!selectedUserId) {
      setSelectedUser(null);
      setDetailError(null);
      setDetailLoading(false);
      return;
    }

    void fetchUserDetail(selectedUserId);
  }, [selectedUserId]);

  useEffect(() => {
    setUpdateMessage(null);
    setUpdateError(null);
  }, [selectedUser?.id]);

  function handleApplyFilters(values: AdminUsersFilterValues) {
    setSearchParams(
      buildAdminUsersSearchParams({
        ...values,
        page: 1,
      }),
    );
  }

  function handleResetFilters() {
    setSearchParams(new URLSearchParams());
  }

  function handleChangePage(nextPage: number) {
    setSearchParams(
      buildAdminUsersSearchParams({
        search,
        role,
        isBlocked,
        limit,
        page: nextPage,
        selected: selectedUserId,
      }),
    );
  }

  function handleOpenDetail(userId: string) {
    setSearchParams(
      buildAdminUsersSearchParams({
        search,
        role,
        isBlocked,
        limit,
        page,
        selected: userId,
      }),
    );
  }

  function handleCloseDetail() {
    setSearchParams(
      buildAdminUsersSearchParams({
        search,
        role,
        isBlocked,
        limit,
        page,
      }),
    );
  }

  async function handleUpdateUser(values: UpdateAdminUserPayload) {
    if (!selectedUser) {
      return;
    }

    setIsUpdatingUser(true);
    setUpdateMessage(null);
    setUpdateError(null);
    setFeedback(null);

    try {
      const updatedUser = await updateAdminUser(selectedUser.id, values);

      setSelectedUser(updatedUser);
      setUsers((current) => mergeAdminUser(current, updatedUser));
      setUpdateMessage("Данные пользователя сохранены.");

      if (auth.user?.id === updatedUser.id) {
        void dispatch(fetchMe());
      }

      void fetchUsers(true);
    } catch (submitError) {
      setUpdateError(getErrorMessage(submitError));
    } finally {
      setIsUpdatingUser(false);
    }
  }

  function handleRequestToggleBlock(user: AdminUser) {
    setBlockTarget(user);
    setBlockModalError(null);
  }

  async function handleConfirmToggleBlock() {
    if (!blockTarget) {
      return;
    }

    setIsBlockingUser(true);
    setBlockModalError(null);
    setFeedback(null);

    try {
      const updatedUser = await toggleUserBlock(blockTarget.id, {
        isBlocked: !blockTarget.isBlocked,
      });

      setUsers((current) => mergeAdminUser(current, updatedUser));

      if (selectedUser?.id === updatedUser.id) {
        setSelectedUser(updatedUser);
      }

      setBlockTarget(null);
      setFeedback({
        type: "success",
        message: updatedUser.isBlocked
          ? "Пользователь заблокирован."
          : "Пользователь разблокирован.",
      });

      void fetchUsers(true);
    } catch (submitError) {
      setBlockModalError(getErrorMessage(submitError));
    } finally {
      setIsBlockingUser(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Пользователи"
        title="Пользователи"
        description="Управляйте аккаунтами клиентов и контролируйте доступ к платформе."
        actions={
          <div className="rounded-full border border-white/10 bg-adminBackground/60 px-4 py-2 text-sm text-white/64">
            Всего в выборке <span className="ml-2 font-semibold text-white">{pagination.total}</span>
          </div>
        }
      />

      {feedback ? (
        <Card
          tone="admin"
          className={
            feedback.type === "success"
              ? "border-emerald-400/25 bg-emerald-500/10 p-4 text-emerald-100"
              : "border-rose-400/25 bg-rose-500/10 p-4 text-rose-100"
          }
        >
          {feedback.message}
        </Card>
      ) : null}

      <AdminUsersFilters
        values={{
          search,
          role,
          isBlocked,
          limit,
        }}
        isPending={isRefreshing}
        onSubmit={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {isLoading ? <LoadingSkeleton tone="admin" lines={10} className="min-h-[420px]" /> : null}

      {!isLoading && error ? (
        <EmptyState
          tone="admin"
          title="Не удалось загрузить пользователей"
          description={error}
        >
          <div className="pt-3">
            <Button
              className="bg-primary text-foreground hover:bg-primary-strong"
              onClick={() => void fetchUsers()}
            >
              Повторить
            </Button>
          </div>
        </EmptyState>
      ) : null}

      {!isLoading && !error ? (
        <>
          {isRefreshing ? (
            <div className="rounded-full border border-white/10 bg-adminSurface px-4 py-2 text-sm text-white/56">
              Обновляем список пользователей...
            </div>
          ) : null}

          <AdminUsersTable
            items={users}
            onOpen={handleOpenDetail}
            onEdit={handleOpenDetail}
            onToggleBlock={handleRequestToggleBlock}
          />

          {pagination.totalPages > 1 ? (
            <Card tone="admin" className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/58">
                  Страница {pagination.page} из {pagination.totalPages}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="ghost"
                    className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                    disabled={pagination.page <= 1}
                    onClick={() => handleChangePage(pagination.page - 1)}
                  >
                    Назад
                  </Button>
                  <Button
                    className="bg-primary text-foreground hover:bg-primary-strong"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => handleChangePage(pagination.page + 1)}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            </Card>
          ) : null}
        </>
      ) : null}

      <AdminUserDetailPanel
        open={Boolean(selectedUserId)}
        user={selectedUser}
        isLoading={detailLoading}
        error={detailError}
        updateMessage={updateMessage}
        updateError={updateError}
        isUpdating={isUpdatingUser}
        isBlocking={isBlockingUser}
        onClose={handleCloseDetail}
        onRetry={() => {
          if (selectedUserId) {
            void fetchUserDetail(selectedUserId);
          }
        }}
        onSubmitUpdate={handleUpdateUser}
        onRequestToggleBlock={handleRequestToggleBlock}
      />

      <AdminUserBlockModal
        open={Boolean(blockTarget)}
        user={blockTarget}
        isSubmitting={isBlockingUser}
        error={blockModalError}
        onConfirm={() => void handleConfirmToggleBlock()}
        onClose={() => {
          if (isBlockingUser) {
            return;
          }

          setBlockTarget(null);
          setBlockModalError(null);
        }}
      />
    </div>
  );
}
