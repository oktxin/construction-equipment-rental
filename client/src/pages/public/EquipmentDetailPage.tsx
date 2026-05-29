import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getEquipmentBySlug } from "../../features/catalog/catalogApi";
import { EquipmentGallery } from "../../features/catalog/components/EquipmentGallery";
import { EquipmentReviews } from "../../features/catalog/components/EquipmentReviews";
import { EquipmentSpecsTable } from "../../features/catalog/components/EquipmentSpecsTable";
import { EquipmentSummaryPanel } from "../../features/catalog/components/EquipmentSummaryPanel";
import { SimilarEquipmentSection } from "../../features/catalog/components/SimilarEquipmentSection";
import type {
  EquipmentDetail,
  EquipmentReview,
  EquipmentSpec,
} from "../../features/catalog/catalogTypes";
import { getEquipmentReviews } from "../../features/reviews/reviewsApi";
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  LoadingSkeleton,
  StatusBadge,
} from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";

const ratingFormatter = new Intl.NumberFormat("ru-RU", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function EquipmentDetailSkeleton() {
  return (
    <div className="space-y-8">
      <LoadingSkeleton lines={2} className="min-h-[72px]" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
        <LoadingSkeleton lines={6} className="min-h-[540px]" />
        <LoadingSkeleton lines={7} className="min-h-[420px]" />
      </div>
      <LoadingSkeleton lines={6} className="min-h-[260px]" />
      <LoadingSkeleton lines={5} className="min-h-[220px]" />
    </div>
  );
}

function buildSpecs(equipment: EquipmentDetail): EquipmentSpec[] {
  const extraSpecs: EquipmentSpec[] = [];

  if (equipment.power !== null) {
    extraSpecs.push({
      id: `${equipment.id}-power`,
      name: "Мощность",
      value: equipment.power.toString(),
      unit: "кВт",
      sortOrder: -2,
    });
  }

  if (equipment.weight !== null) {
    extraSpecs.push({
      id: `${equipment.id}-weight`,
      name: "Вес",
      value: equipment.weight.toString(),
      unit: "кг",
      sortOrder: -1,
    });
  }

  return [...extraSpecs, ...equipment.specs].sort(
    (left, right) => left.sortOrder - right.sortOrder,
  );
}

function buildRatingLabel(averageRating: number | null, reviewsCount: number) {
  if (averageRating === null || reviewsCount === 0) {
    return "Пока без отзывов";
  }

  return `${ratingFormatter.format(averageRating)} из 5, ${reviewsCount} отзывов`;
}

export function EquipmentDetailPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<EquipmentDetail | null>(null);
  const [reviews, setReviews] = useState<EquipmentReview[] | null>(null);
  const [reviewsTotal, setReviewsTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!slug) {
      setEquipment(null);
      setReviews(null);
      setReviewsTotal(null);
      setError("Некорректный адрес карточки оборудования");
      setIsNotFound(false);
      setIsLoading(false);
      return;
    }

    let isActive = true;

    const loadEquipment = async () => {
      setIsLoading(true);
      setError(null);
      setIsNotFound(false);
      setReviews(null);
      setReviewsTotal(null);

      try {
        const data = await getEquipmentBySlug(slug);
        if (!isActive) {
          return;
        }

        setEquipment(data);
      } catch (requestError) {
        if (!isActive) {
          return;
        }

        setEquipment(null);
        setReviews(null);
        setReviewsTotal(null);

        if (axios.isAxiosError(requestError) && requestError.response?.status === 404) {
          setIsNotFound(true);
          setError(null);
        } else {
          setError(getErrorMessage(requestError));
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadEquipment();

    return () => {
      isActive = false;
    };
  }, [reloadKey, slug]);

  useEffect(() => {
    if (!equipment) {
      return;
    }

    let isActive = true;

    const loadReviews = async () => {
      setIsReviewsLoading(true);

      try {
        const data = await getEquipmentReviews(equipment.id, {
          page: 1,
          limit: 12,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        if (!isActive) {
          return;
        }

        setReviews(data.items);
        setReviewsTotal(data.pagination.total);
      } catch {
        if (!isActive) {
          return;
        }

        setReviews(null);
        setReviewsTotal(null);
      } finally {
        if (isActive) {
          setIsReviewsLoading(false);
        }
      }
    };

    void loadReviews();

    return () => {
      isActive = false;
    };
  }, [equipment]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <EquipmentDetailSkeleton />
      </main>
    );
  }

  if (isNotFound) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          title="Оборудование не найдено"
          description="Возможно, позиция была удалена или перенесена в архив."
        >
          <div className="pt-2">
            <Button onClick={() => navigate("/catalog")}>Вернуться в каталог</Button>
          </div>
        </EmptyState>
      </main>
    );
  }

  if (error || !equipment) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          title="Не удалось загрузить карточку оборудования"
          description={error ?? "Повторите попытку чуть позже."}
        >
          <div className="pt-2">
            <Button onClick={() => setReloadKey((value) => value + 1)}>Повторить</Button>
          </div>
        </EmptyState>
      </main>
    );
  }

  const specs = buildSpecs(equipment);
  const visibleReviews = reviews ?? equipment.reviews;
  const reviewsCount = reviewsTotal ?? equipment.reviewsCount;

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "Главная", to: "/" },
            { label: "Каталог", to: "/catalog" },
            { label: equipment.name },
          ]}
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
          <EquipmentGallery name={equipment.name} images={equipment.images} />
          <EquipmentSummaryPanel equipment={equipment} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <Card className="space-y-6 p-6 sm:p-7">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={equipment.status} context="equipment" />
                <span className="rounded-full border border-border/55 bg-background/55 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground/72">
                  {equipment.category.name}
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="max-w-4xl font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-[3.25rem]">
                  {equipment.name}
                </h1>
                <p className="text-sm uppercase tracking-[0.16em] text-foreground/46">
                  {[equipment.brand, equipment.model].filter(Boolean).join(" / ") ||
                    "Позиция BuildRent"}
                </p>
                <p className="max-w-3xl text-base leading-7 text-foreground/74">
                  {equipment.shortDescription ??
                    "Позиция подключена к живому каталогу и готова к просмотру, сохранению в избранное и переходу к оформлению аренды."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 border-t border-border/45 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-foreground/58">Средняя оценка</p>
                <p className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
                  {buildRatingLabel(equipment.averageRating, reviewsCount)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/58">Доступность</p>
                <p className="mt-2 text-base leading-7 text-foreground/74">
                  {equipment.quantityAvailable > 0
                    ? `Свободно ${equipment.quantityAvailable} из ${equipment.quantityTotal} единиц.`
                    : "Свободных единиц сейчас нет, но карточка и условия аренды остаются доступны для просмотра."}
                </p>
              </div>
            </div>

            <div className="border-t border-border/45 pt-6">
              <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
                Описание
              </h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-foreground/74">
                {equipment.description ??
                  equipment.shortDescription ??
                  "Подробное описание для этой позиции еще готовится. Основные условия аренды, цена и доступность уже доступны в сводном блоке."}
              </p>
            </div>
          </Card>

          <Card className="space-y-4 p-6">
            <div>
              <p className="text-sm font-medium text-foreground/58">Категория</p>
              <p className="mt-2 font-semibold text-foreground">{equipment.category.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/58">Залог</p>
              <p className="mt-2 font-semibold text-foreground">{equipment.depositAmount} BYN</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/58">Ставка в сутки</p>
              <p className="mt-2 font-semibold text-foreground">{equipment.dailyPrice} BYN</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/58">Отзывы</p>
              <p className="mt-2 font-semibold text-foreground">
                {isReviewsLoading ? "Обновляем список..." : `${reviewsCount} опубликовано`}
              </p>
            </div>
          </Card>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Характеристики
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-foreground/68">
              Ключевые технические параметры, которые помогают быстро оценить совместимость оборудования с задачей на объекте.
            </p>
          </div>
          <EquipmentSpecsTable specs={specs} />
        </section>

        <section>
          <EquipmentReviews
            reviews={visibleReviews}
            averageRating={equipment.averageRating}
            reviewsCount={reviewsCount}
          />
        </section>

        <SimilarEquipmentSection items={equipment.similarEquipment} />
      </div>
    </main>
  );
}
