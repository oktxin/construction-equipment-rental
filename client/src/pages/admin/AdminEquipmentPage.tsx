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
import { getErrorMessage } from "../../shared/utils/errorMessage";
import type { EquipmentStatus } from "../../features/catalog/catalogTypes";
import {
  createEquipment,
  deleteEquipment,
  getAdminCategories,
  getAdminEquipment,
  getAdminEquipmentById,
  replaceEquipmentImages,
  replaceEquipmentSpecs,
  updateEquipment,
} from "../../features/admin/catalog/adminCatalogApi";
import type {
  AdminCategory,
  AdminEquipment,
  AdminEquipmentDetail,
  AdminEquipmentPayload,
} from "../../features/admin/catalog/adminCatalogTypes";
import {
  ADMIN_EQUIPMENT_DEFAULT_LIMIT,
  buildAdminEquipmentSearchParams,
  parseFeaturedFilter,
  parsePositiveInteger,
} from "../../features/admin/catalog/adminCatalogUtils";
import { AdminDeleteConfirmModal } from "../../features/admin/catalog/components/AdminDeleteConfirmModal";
import { adminModalClassName } from "../../features/admin/components/adminUiStyles";
import {
  AdminEquipmentFilters,
  type AdminEquipmentFilterValues,
} from "../../features/admin/catalog/components/AdminEquipmentFilters";
import { AdminEquipmentForm } from "../../features/admin/catalog/components/AdminEquipmentForm";
import { AdminEquipmentImagesEditor } from "../../features/admin/catalog/components/AdminEquipmentImagesEditor";
import { AdminEquipmentSpecsEditor } from "../../features/admin/catalog/components/AdminEquipmentSpecsEditor";
import { AdminEquipmentTable } from "../../features/admin/catalog/components/AdminEquipmentTable";

const knownStatuses: EquipmentStatus[] = [
  "AVAILABLE",
  "UNAVAILABLE",
  "MAINTENANCE",
  "ARCHIVED",
];

type EquipmentModalMode = "create" | "edit" | "images" | "specs" | null;
type FeedbackState = { type: "success" | "error"; message: string } | null;

function parseEquipmentStatus(value: string | null): EquipmentStatus | "" {
  if (!value) {
    return "";
  }

  return knownStatuses.includes(value as EquipmentStatus) ? (value as EquipmentStatus) : "";
}

function getEquipmentModalTitle(mode: EquipmentModalMode) {
  switch (mode) {
    case "create":
      return "Добавить оборудование";
    case "edit":
      return "Редактирование оборудования";
    case "images":
      return "Изображения оборудования";
    case "specs":
      return "Характеристики оборудования";
    default:
      return "";
  }
}

export function AdminEquipmentPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const categorySlug = searchParams.get("categorySlug") ?? "";
  const status = parseEquipmentStatus(searchParams.get("status"));
  const isFeatured = parseFeaturedFilter(searchParams.get("isFeatured"));
  const page = parsePositiveInteger(searchParams.get("page"), 1);
  const limit = parsePositiveInteger(searchParams.get("limit"), ADMIN_EQUIPMENT_DEFAULT_LIMIT);

  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [items, setItems] = useState<AdminEquipment[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ADMIN_EQUIPMENT_DEFAULT_LIMIT,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const [modalMode, setModalMode] = useState<EquipmentModalMode>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<AdminEquipment | null>(null);
  const [selectedEquipmentDetail, setSelectedEquipmentDetail] = useState<AdminEquipmentDetail | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSubmitError, setModalSubmitError] = useState<string | null>(null);
  const [isSavingForm, setIsSavingForm] = useState(false);
  const [isSavingImages, setIsSavingImages] = useState(false);
  const [isSavingSpecs, setIsSavingSpecs] = useState(false);

  const [equipmentToDelete, setEquipmentToDelete] = useState<AdminEquipment | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function fetchCategories() {
    setCategoriesError(null);

    try {
      const response = await getAdminCategories({ page: 1, limit: 100 });
      setCategories(response.items);
    } catch (fetchError) {
      setCategoriesError(getErrorMessage(fetchError));
    }
  }

  async function fetchEquipment(silent = false) {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const response = await getAdminEquipment({
        search: search || undefined,
        categorySlug: categorySlug || undefined,
        status: status || undefined,
        isFeatured,
        page,
        limit,
        sortBy: "createdAt",
        sortOrder: "desc",
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

  async function loadEquipmentDetail(equipment: AdminEquipment, mode: Exclude<EquipmentModalMode, "create" | null>) {
    setSelectedEquipment(equipment);
    setSelectedEquipmentDetail(null);
    setModalMode(mode);
    setModalError(null);
    setModalSubmitError(null);
    setIsModalLoading(true);

    try {
      const detail = await getAdminEquipmentById(equipment.id);
      setSelectedEquipmentDetail(detail);
    } catch (fetchError) {
      setModalError(getErrorMessage(fetchError));
    } finally {
      setIsModalLoading(false);
    }
  }

  useEffect(() => {
    void fetchCategories();
  }, []);

  useEffect(() => {
    void fetchEquipment(items.length > 0);
  }, [search, categorySlug, status, isFeatured, page, limit]);

  function closeModal() {
    setModalMode(null);
    setSelectedEquipment(null);
    setSelectedEquipmentDetail(null);
    setModalError(null);
    setModalSubmitError(null);
    setIsModalLoading(false);
  }

  function handleApplyFilters(values: AdminEquipmentFilterValues) {
    setSearchParams(
      buildAdminEquipmentSearchParams({
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
      buildAdminEquipmentSearchParams({
        search,
        categorySlug,
        status,
        isFeatured,
        page: nextPage,
        limit,
      }),
    );
  }

  async function handleCreateEquipment(values: AdminEquipmentPayload) {
    setIsSavingForm(true);
    setModalSubmitError(null);

    try {
      await createEquipment({
        ...values,
        images: [],
        specs: [],
      });

      closeModal();
      setFeedback({
        type: "success",
        message: "Оборудование создано. Изображения и характеристики можно добавить отдельно.",
      });
      await fetchEquipment(true);
    } catch (submitError) {
      setModalSubmitError(getErrorMessage(submitError));
    } finally {
      setIsSavingForm(false);
    }
  }

  async function handleUpdateEquipment(values: AdminEquipmentPayload) {
    if (!selectedEquipment) {
      return;
    }

    setIsSavingForm(true);
    setModalSubmitError(null);

    try {
      await updateEquipment(selectedEquipment.id, values);
      closeModal();
      setFeedback({
        type: "success",
        message: "Параметры оборудования обновлены.",
      });
      await fetchEquipment(true);
    } catch (submitError) {
      setModalSubmitError(getErrorMessage(submitError));
    } finally {
      setIsSavingForm(false);
    }
  }

  async function handleSaveImages(
    images: Array<{ url: string; alt: string | null; sortOrder: number }>,
  ) {
    if (!selectedEquipment) {
      return;
    }

    setIsSavingImages(true);
    setModalSubmitError(null);

    try {
      await replaceEquipmentImages(selectedEquipment.id, images);
      closeModal();
      setFeedback({
        type: "success",
        message: "Изображения оборудования обновлены.",
      });
      await fetchEquipment(true);
    } catch (submitError) {
      setModalSubmitError(getErrorMessage(submitError));
    } finally {
      setIsSavingImages(false);
    }
  }

  async function handleSaveSpecs(
    specs: Array<{ name: string; value: string; unit: string | null; sortOrder: number }>,
  ) {
    if (!selectedEquipment) {
      return;
    }

    setIsSavingSpecs(true);
    setModalSubmitError(null);

    try {
      await replaceEquipmentSpecs(selectedEquipment.id, specs);
      closeModal();
      setFeedback({
        type: "success",
        message: "Характеристики оборудования обновлены.",
      });
      await fetchEquipment(true);
    } catch (submitError) {
      setModalSubmitError(getErrorMessage(submitError));
    } finally {
      setIsSavingSpecs(false);
    }
  }

  async function handleDeleteEquipment() {
    if (!equipmentToDelete) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteEquipment(equipmentToDelete.id);
      setEquipmentToDelete(null);
      setFeedback({
        type: "success",
        message: "Оборудование удалено или переведено в архив.",
      });
      await fetchEquipment(true);
    } catch (submitError) {
      setDeleteError(getErrorMessage(submitError));
    } finally {
      setIsDeleting(false);
    }
  }

  const formInitialValues = selectedEquipmentDetail
    ? {
        categoryId: selectedEquipmentDetail.categoryId,
        name: selectedEquipmentDetail.name,
        slug: selectedEquipmentDetail.slug,
        shortDescription: selectedEquipmentDetail.shortDescription,
        description: selectedEquipmentDetail.description,
        brand: selectedEquipmentDetail.brand,
        model: selectedEquipmentDetail.model,
        dailyPrice: selectedEquipmentDetail.dailyPrice,
        depositAmount: selectedEquipmentDetail.depositAmount,
        quantityTotal: selectedEquipmentDetail.quantityTotal,
        quantityAvailable: selectedEquipmentDetail.quantityAvailable,
        power:
          selectedEquipmentDetail.power === null ? "" : String(selectedEquipmentDetail.power),
        weight:
          selectedEquipmentDetail.weight === null ? "" : String(selectedEquipmentDetail.weight),
        status: selectedEquipmentDetail.status,
        isFeatured: selectedEquipmentDetail.isFeatured,
      }
    : undefined;

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Каталог"
        title="Оборудование"
        description="Управляйте техникой, ценами, статусами, изображениями и характеристиками."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-white/10 bg-adminBackground/60 px-4 py-2 text-sm text-white/64">
              Позиций в выборке <span className="ml-2 font-semibold text-white">{pagination.total}</span>
            </div>
            <Button
              className="bg-primary text-foreground hover:bg-primary-strong"
              onClick={() => {
                setFeedback(null);
                setModalSubmitError(null);
                setModalMode("create");
              }}
            >
              Добавить оборудование
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

      {categoriesError ? (
        <EmptyState
          tone="admin"
          title="Не удалось загрузить категории"
          description={categoriesError}
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

      <AdminEquipmentFilters
        values={{
          search,
          categorySlug,
          status,
          isFeatured,
          limit,
        }}
        categories={categories}
        isPending={isRefreshing}
        onSubmit={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {isLoading ? <LoadingSkeleton tone="admin" lines={10} className="min-h-[460px]" /> : null}

      {!isLoading && error ? (
        <EmptyState
          tone="admin"
          title="Не удалось загрузить оборудование"
          description={error}
        >
          <div className="pt-3">
            <Button
              className="bg-primary text-foreground hover:bg-primary-strong"
              onClick={() => void fetchEquipment()}
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
              Обновляем список оборудования...
            </div>
          ) : null}

          <AdminEquipmentTable
            items={items}
            onEdit={(equipment) => {
              setFeedback(null);
              void loadEquipmentDetail(equipment, "edit");
            }}
            onEditImages={(equipment) => {
              setFeedback(null);
              void loadEquipmentDetail(equipment, "images");
            }}
            onEditSpecs={(equipment) => {
              setFeedback(null);
              void loadEquipmentDetail(equipment, "specs");
            }}
            onDelete={(equipment) => {
              setDeleteError(null);
              setEquipmentToDelete(equipment);
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
          if (isSavingForm || isSavingImages || isSavingSpecs) {
            return;
          }

          closeModal();
        }}
        variant="admin"
        className={`max-h-[calc(100dvh-2rem)] max-w-5xl overflow-y-auto ${adminModalClassName}`}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-[#F4EFE6]">
              {getEquipmentModalTitle(modalMode)}
            </h2>
            <p className="text-sm leading-6 text-[rgba(244,239,230,0.72)]">
              {modalMode === "create"
                ? "Создайте новую позицию каталога. Изображения и характеристики можно дополнить сразу после сохранения."
                : selectedEquipment
                  ? `Работаем с позицией ${selectedEquipment.name}.`
                  : "Загрузка данных позиции..."}
            </p>
          </div>

          {isModalLoading ? (
            <LoadingSkeleton tone="admin" lines={8} className="min-h-[360px]" />
          ) : null}

          {!isModalLoading && modalError ? (
            <EmptyState
              tone="admin"
              title="Не удалось загрузить данные оборудования"
              description={modalError}
            >
              <div className="pt-3">
                {selectedEquipment ? (
                  <Button
                    className="bg-primary text-foreground hover:bg-primary-strong"
                    onClick={() =>
                      void loadEquipmentDetail(
                        selectedEquipment,
                        (modalMode === "edit" || modalMode === "images" || modalMode === "specs"
                          ? modalMode
                          : "edit"),
                      )
                    }
                  >
                    Повторить
                  </Button>
                ) : null}
              </div>
            </EmptyState>
          ) : null}

          {!isModalLoading && !modalError && modalMode === "create" ? (
            <AdminEquipmentForm
              categories={categories}
              isSubmitting={isSavingForm}
              serverError={modalSubmitError}
              submitLabel="Создать оборудование"
              onSubmit={handleCreateEquipment}
              onCancel={closeModal}
            />
          ) : null}

          {!isModalLoading && !modalError && modalMode === "edit" && formInitialValues ? (
            <AdminEquipmentForm
              categories={categories}
              initialValues={formInitialValues}
              isSubmitting={isSavingForm}
              serverError={modalSubmitError}
              submitLabel="Сохранить изменения"
              onSubmit={handleUpdateEquipment}
              onCancel={closeModal}
            />
          ) : null}

          {!isModalLoading &&
          !modalError &&
          modalMode === "images" &&
          selectedEquipmentDetail ? (
            <AdminEquipmentImagesEditor
              equipmentName={selectedEquipmentDetail.name}
              initialImages={selectedEquipmentDetail.images}
              isSubmitting={isSavingImages}
              error={modalSubmitError}
              onSubmit={handleSaveImages}
              onCancel={closeModal}
            />
          ) : null}

          {!isModalLoading &&
          !modalError &&
          modalMode === "specs" &&
          selectedEquipmentDetail ? (
            <AdminEquipmentSpecsEditor
              equipmentName={selectedEquipmentDetail.name}
              initialSpecs={selectedEquipmentDetail.specs}
              isSubmitting={isSavingSpecs}
              error={modalSubmitError}
              onSubmit={handleSaveSpecs}
              onCancel={closeModal}
            />
          ) : null}
        </div>
      </Modal>

      <AdminDeleteConfirmModal
        open={Boolean(equipmentToDelete)}
        title="Удалить оборудование?"
        description="Если оборудование уже связано с заявками, сервер переведёт его в архив."
        confirmLabel="Удалить или архивировать"
        isSubmitting={isDeleting}
        error={deleteError}
        onConfirm={() => void handleDeleteEquipment()}
        onClose={() => {
          if (isDeleting) {
            return;
          }

          setEquipmentToDelete(null);
          setDeleteError(null);
        }}
      />
    </div>
  );
}
