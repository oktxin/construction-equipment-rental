import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Button,
  Card,
  EmptyState,
  LoadingSkeleton,
  Modal,
  PageHeader,
} from "../../shared/ui";
import {
  createCategory,
  deleteCategory,
  getAdminCategories,
  updateCategory,
} from "../../features/admin/catalog/adminCatalogApi";
import type { AdminCategory, AdminCategoryPayload } from "../../features/admin/catalog/adminCatalogTypes";
import {
  ADMIN_CATEGORY_DEFAULT_LIMIT,
  buildAdminCategorySearchParams,
  parsePositiveInteger,
} from "../../features/admin/catalog/adminCatalogUtils";
import { AdminCategoryForm } from "../../features/admin/catalog/components/AdminCategoryForm";
import { AdminCategoryTable } from "../../features/admin/catalog/components/AdminCategoryTable";
import { AdminDeleteConfirmModal } from "../../features/admin/catalog/components/AdminDeleteConfirmModal";
import { getErrorMessage } from "../../shared/utils/errorMessage";

type CategoryModalMode = "create" | "edit" | null;
type FeedbackState = { type: "success" | "error"; message: string } | null;

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function AdminCategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = parsePositiveInteger(searchParams.get("page"), 1);
  const limit = parsePositiveInteger(searchParams.get("limit"), ADMIN_CATEGORY_DEFAULT_LIMIT);

  const [items, setItems] = useState<AdminCategory[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ADMIN_CATEGORY_DEFAULT_LIMIT,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const [modalMode, setModalMode] = useState<CategoryModalMode>(null);
  const [selectedCategory, setSelectedCategory] = useState<AdminCategory | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState<AdminCategory | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function fetchCategories(silent = false) {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const response = await getAdminCategories({
        search: search || undefined,
        page,
        limit,
      });

      setItems(response.items);
      setPagination(response.pagination);
    } catch (fetchError) {
      setError(getErrorMessage(fetchError));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    void fetchCategories(items.length > 0);
  }, [search, page, limit]);

  function handleChangePage(nextPage: number) {
    setSearchParams(
      buildAdminCategorySearchParams({
        search,
        page: nextPage,
        limit,
      }),
    );
  }

  function closeModal() {
    setModalMode(null);
    setSelectedCategory(null);
    setModalError(null);
  }

  async function handleCreateCategory(values: AdminCategoryPayload) {
    setIsSaving(true);
    setModalError(null);

    try {
      await createCategory(values);
      closeModal();
      setFeedback({
        type: "success",
        message: "Категория добавлена в каталог.",
      });
      await fetchCategories(true);
    } catch (submitError) {
      setModalError(getErrorMessage(submitError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdateCategory(values: AdminCategoryPayload) {
    if (!selectedCategory) {
      return;
    }

    setIsSaving(true);
    setModalError(null);

    try {
      await updateCategory(selectedCategory.id, values);
      closeModal();
      setFeedback({
        type: "success",
        message: "Категория обновлена.",
      });
      await fetchCategories(true);
    } catch (submitError) {
      setModalError(getErrorMessage(submitError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteCategory() {
    if (!categoryToDelete) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
      setFeedback({
        type: "success",
        message: "Категория удалена.",
      });
      await fetchCategories(true);
    } catch (submitError) {
      setDeleteError(getErrorMessage(submitError));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Каталог"
        title="Категории"
        description="Настраивайте разделы каталога и навигацию по оборудованию."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-white/10 bg-adminBackground/60 px-4 py-2 text-sm text-white/64">
              Категорий <span className="ml-2 font-semibold text-white">{pagination.total}</span>
            </div>
            <Button
              className="bg-primary text-foreground hover:bg-primary-strong"
              onClick={() => {
                setFeedback(null);
                setModalError(null);
                setModalMode("create");
              }}
            >
              Добавить категорию
            </Button>
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

      <form
        className="rounded-[28px] border border-white/10 bg-adminSurface p-5 shadow-industrial-dark"
        onSubmit={(event) => {
          event.preventDefault();

          const form = new FormData(event.currentTarget);
          const nextSearch = String(form.get("search") ?? "");
          const nextLimit = Number(form.get("limit")) || ADMIN_CATEGORY_DEFAULT_LIMIT;

          setSearchParams(
            buildAdminCategorySearchParams({
              search: nextSearch,
              page: 1,
              limit: nextLimit,
            }),
          );
        }}
      >
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_180px_auto]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/78" htmlFor="admin-categories-search">
              Поиск
            </label>
            <input
              id="admin-categories-search"
              name="search"
              type="text"
              defaultValue={search}
              className={fieldClassName}
              placeholder="Название, slug или описание"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/78" htmlFor="admin-categories-limit">
              На странице
            </label>
            <div className="relative">
              <select
                id="admin-categories-limit"
                name="limit"
                defaultValue={limit}
                className={fieldClassName + " appearance-none pr-11"}
              >
                {[10, 20, 50].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
              onClick={() => setSearchParams(new URLSearchParams())}
            >
              Сбросить
            </Button>
            <Button type="submit" className="bg-primary text-foreground hover:bg-primary-strong" disabled={isRefreshing}>
              {isRefreshing ? "Обновляем..." : "Применить"}
            </Button>
          </div>
        </div>
      </form>

      {isLoading ? <LoadingSkeleton tone="admin" lines={8} className="min-h-[400px]" /> : null}

      {!isLoading && error ? (
        <EmptyState
          tone="admin"
          title="Не удалось загрузить категории"
          description={error}
        >
          <div className="pt-3">
            <Button
              className="bg-primary text-foreground hover:bg-primary-strong"
              onClick={() => void fetchCategories()}
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
              Обновляем список категорий...
            </div>
          ) : null}

          <AdminCategoryTable
            items={items}
            onEdit={(category) => {
              setFeedback(null);
              setModalError(null);
              setSelectedCategory(category);
              setModalMode("edit");
            }}
            onDelete={(category) => {
              setDeleteError(null);
              setCategoryToDelete(category);
            }}
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

      <Modal
        open={modalMode !== null}
        onClose={() => {
          if (isSaving) {
            return;
          }

          closeModal();
        }}
        className="max-h-[calc(100dvh-2rem)] max-w-4xl overflow-y-auto border-white/10 bg-adminSurface text-white"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-white">
              {modalMode === "create" ? "Добавить категорию" : "Редактирование категории"}
            </h2>
            <p className="text-sm leading-6 text-white/58">
              {modalMode === "create"
                ? "Создайте новый раздел каталога и подготовьте его для фильтров и навигации."
                : selectedCategory
                  ? `Редактируем категорию ${selectedCategory.name}.`
                  : "Подготовка формы..."}
            </p>
          </div>

          {modalMode === "create" ? (
            <AdminCategoryForm
              isSubmitting={isSaving}
              serverError={modalError}
              submitLabel="Создать категорию"
              onSubmit={handleCreateCategory}
              onCancel={closeModal}
            />
          ) : null}

          {modalMode === "edit" && selectedCategory ? (
            <AdminCategoryForm
              initialValues={{
                name: selectedCategory.name,
                slug: selectedCategory.slug,
                description: selectedCategory.description,
                iconName: selectedCategory.iconName,
              }}
              isSubmitting={isSaving}
              serverError={modalError}
              submitLabel="Сохранить изменения"
              onSubmit={handleUpdateCategory}
              onCancel={closeModal}
            />
          ) : null}
        </div>
      </Modal>

      <AdminDeleteConfirmModal
        open={Boolean(categoryToDelete)}
        title="Удалить категорию?"
        description="Если категория уже используется в оборудовании, сервер вернёт ошибку и удаление будет отменено."
        confirmLabel="Удалить категорию"
        isSubmitting={isDeleting}
        error={deleteError}
        onConfirm={() => void handleDeleteCategory()}
        onClose={() => {
          if (isDeleting) {
            return;
          }

          setCategoryToDelete(null);
          setDeleteError(null);
        }}
      />
    </div>
  );
}
