import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { EquipmentCard } from "../../features/catalog/components/EquipmentCard";
import { getFavorites, removeFavorite } from "../../features/favorites/favoritesApi";
import type { FavoritesResponse } from "../../features/favorites/favoritesTypes";
import { pluralize } from "../../features/rentalOrders/rentalOrdersUtils";
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  LoadingSkeleton,
  PageHeader,
} from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";

const FAVORITES_PER_PAGE = 6;

function buildPaginationItems(page: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, "ellipsis-right", totalPages] as const;
  }

  if (page >= totalPages - 2) {
    return [1, "ellipsis-left", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "ellipsis-left", page - 1, page, page + 1, "ellipsis-right", totalPages] as const;
}

function FavoritesSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: FAVORITES_PER_PAGE }).map((_, index) => (
        <LoadingSkeleton key={index} lines={7} className="min-h-[470px]" />
      ))}
    </div>
  );
}

function FavoritesPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const items = buildPaginationItems(page, totalPages);

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground/62">
          Страница {page} из {totalPages}.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Назад
          </Button>

          {items.map((item, index) =>
            typeof item === "number" ? (
              <button
                key={`${item}-${index}`}
                type="button"
                className={
                  item === page
                    ? "inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-secondary bg-secondary px-3 text-sm font-semibold text-background shadow-industrial-dark"
                    : "inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-border/70 bg-white/35 px-3 text-sm font-semibold text-foreground transition hover:bg-card"
                }
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ) : (
              <span key={`${item}-${index}`} className="px-1 text-sm text-foreground/45">
                ...
              </span>
            ),
          )}

          <Button
            variant="ghost"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Далее
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function FavoritesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [favoritesData, setFavoritesData] = useState<FavoritesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [removingEquipmentId, setRemovingEquipmentId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const pageFromQuery = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isFinite(pageFromQuery) && pageFromQuery > 0 ? Math.floor(pageFromQuery) : 1;

  useEffect(() => {
    let isActive = true;

    const loadFavorites = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getFavorites({
          page: currentPage,
          limit: FAVORITES_PER_PAGE,
        });

        if (!isActive) {
          return;
        }

        setFavoritesData(data);
      } catch (loadError) {
        if (!isActive) {
          return;
        }

        setError(getErrorMessage(loadError));
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadFavorites();

    return () => {
      isActive = false;
    };
  }, [currentPage, reloadKey]);

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(page));
    setSearchParams(nextParams);
  };

  const handleRemoveFavorite = async (equipmentId: string) => {
    const previousData = favoritesData;

    setFeedback(null);
    setRemovingEquipmentId(equipmentId);

    if (previousData) {
      const nextItems = previousData.items.filter((item) => item.equipment.id !== equipmentId);
      const nextTotal = Math.max(0, previousData.pagination.total - 1);
      const nextTotalPages = Math.max(1, Math.ceil(nextTotal / previousData.pagination.limit));

      setFavoritesData({
        items: nextItems,
        pagination: {
          ...previousData.pagination,
          total: nextTotal,
          totalPages: nextTotalPages,
        },
      });
    }

    try {
      await removeFavorite(equipmentId);
      setFeedback({
        type: "success",
        message: "Позиция удалена из избранного.",
      });

      if (previousData?.items.length === 1 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else {
        setReloadKey((value) => value + 1);
      }
    } catch (removeError) {
      setFavoritesData(previousData);
      setFeedback({
        type: "error",
        message: getErrorMessage(removeError),
      });
    } finally {
      setRemovingEquipmentId(null);
    }
  };

  const favorites = favoritesData?.items ?? [];
  const pagination = favoritesData?.pagination ?? {
    page: currentPage,
    limit: FAVORITES_PER_PAGE,
    total: 0,
    totalPages: 1,
  };
  const savedCountLabel = `${pagination.total} ${pluralize(pagination.total, [
    "позиция",
    "позиции",
    "позиций",
  ])}`;

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Главная", to: "/" },
            { label: "Избранное" },
          ]}
        />

        <PageHeader
          eyebrow="Клиентский кабинет"
          title="Избранное"
          description="Сохраняйте оборудование, чтобы быстрее вернуться к аренде."
          actions={
            <Link to="/catalog">
              <Button>Перейти в каталог</Button>
            </Link>
          }
        />

        {feedback ? (
          <Card
            className={
              feedback.type === "success"
                ? "border-success/25 bg-success/8 p-4"
                : "border-danger/25 bg-danger/8 p-4"
            }
          >
            <p className={feedback.type === "success" ? "text-success" : "text-danger"}>
              {feedback.message}
            </p>
          </Card>
        ) : null}

        {error && !favoritesData ? (
          <EmptyState
            title="Не удалось загрузить избранное"
            description={error}
          >
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button onClick={() => setReloadKey((value) => value + 1)}>Повторить</Button>
              <Link to="/catalog">
                <Button variant="ghost">Перейти в каталог</Button>
              </Link>
            </div>
          </EmptyState>
        ) : null}

        {isLoading ? <FavoritesSkeleton /> : null}

        {!isLoading && error && favoritesData ? (
          <Card className="border-danger/25 bg-danger/8 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-danger">Не удалось обновить избранное</p>
                <p className="mt-1 text-sm leading-6 text-foreground/72">{error}</p>
              </div>
              <Button variant="ghost" onClick={() => setReloadKey((value) => value + 1)}>
                Повторить
              </Button>
            </div>
          </Card>
        ) : null}

        {!isLoading && !error && favorites.length === 0 ? (
          <EmptyState
            title="В избранном пока ничего нет"
            description="Добавляйте оборудование из каталога, чтобы быстро вернуться к нему позже."
          >
            <div className="pt-2">
              <Link to="/catalog">
                <Button>Перейти в каталог</Button>
              </Link>
            </div>
          </EmptyState>
        ) : null}

        {!isLoading && favorites.length > 0 ? (
          <>
            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-strong">
                    Сохранённые позиции
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    {savedCountLabel}
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-foreground/62">
                  Удаляйте позиции прямо из списка или открывайте карточку, чтобы вернуться к аренде.
                </p>
              </div>
            </Card>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {favorites.map((favorite) => {
                const isRemoving = removingEquipmentId === favorite.equipment.id;

                return (
                  <div key={favorite.id} className="relative">
                    <div className="absolute right-4 top-4 z-20">
                      <Button
                        size="sm"
                        variant="danger"
                        disabled={Boolean(removingEquipmentId)}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          void handleRemoveFavorite(favorite.equipment.id);
                        }}
                      >
                        {isRemoving ? "Убираем..." : "Убрать"}
                      </Button>
                    </div>
                    <EquipmentCard equipment={favorite.equipment} />
                  </div>
                );
              })}
            </div>

            <FavoritesPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : null}
      </div>
    </main>
  );
}
