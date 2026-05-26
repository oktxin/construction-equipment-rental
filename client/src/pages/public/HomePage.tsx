import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getCategories, getFeaturedEquipment } from "../../features/catalog/catalogApi";
import { CategoryCard } from "../../features/catalog/components/CategoryCard";
import { EquipmentCard } from "../../features/catalog/components/EquipmentCard";
import type { Category, EquipmentListItem } from "../../features/catalog/catalogTypes";
import { Badge, Button, Card, EmptyState, LoadingSkeleton } from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";

const advantages = [
  {
    title: "Понятная стоимость",
    description: "Цена за сутки и залог видны сразу, без уточняющих звонков и пересчётов вручную.",
  },
  {
    title: "Проверка доступности",
    description: "Статус техники и наличие отображаются до отправки заявки, чтобы не терять время на пустые позиции.",
  },
  {
    title: "Документы онлайн",
    description: "История аренды, PDF и DOCX-выгрузки уже заложены в рабочий сценарий сервиса.",
  },
  {
    title: "Кабинет без хаоса",
    description: "Избранное, заявки и дальнейшие действия собираются в одном аккуратном клиентском интерфейсе.",
  },
];

const rentalSteps = [
  "Выберите оборудование",
  "Укажите даты и способ получения",
  "Дождитесь подтверждения",
  "Получите технику и документы",
];

function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-3">
        {eyebrow ? (
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent-strong">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="max-w-[18ch] font-heading text-[clamp(2.2rem,3.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-foreground">
          {title}
        </h2>
        <p className="max-w-[65ch] text-base leading-7 text-foreground/68">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

function CompactErrorState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-display border border-danger/30 bg-danger/8 px-4 py-4 text-sm text-foreground">
      <p className="font-semibold text-danger">{title}</p>
      <p className="mt-1 leading-6 text-foreground/70">{description}</p>
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <LoadingSkeleton key={index} lines={4} className="min-h-[250px]" />
      ))}
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <LoadingSkeleton key={index} lines={6} className="min-h-[460px]" />
      ))}
    </div>
  );
}

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredEquipment, setFeaturedEquipment] = useState<EquipmentListItem[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [featuredError, setFeaturedError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);

      try {
        const data = await getCategories({ limit: 8 });
        if (!isActive) {
          return;
        }

        setCategories(data.items.slice(0, 8));
      } catch (error) {
        if (!isActive) {
          return;
        }

        setCategoriesError(getErrorMessage(error));
      } finally {
        if (isActive) {
          setCategoriesLoading(false);
        }
      }
    };

    const loadFeaturedEquipment = async () => {
      setFeaturedLoading(true);
      setFeaturedError(null);

      try {
        const data = await getFeaturedEquipment();
        if (!isActive) {
          return;
        }

        setFeaturedEquipment(data.slice(0, 8));
      } catch (error) {
        if (!isActive) {
          return;
        }

        setFeaturedError(getErrorMessage(error));
      } finally {
        if (isActive) {
          setFeaturedLoading(false);
        }
      }
    };

    void loadCategories();
    void loadFeaturedEquipment();

    return () => {
      isActive = false;
    };
  }, []);

  const availableFeaturedCount = useMemo(
    () => featuredEquipment.filter((item) => item.status === "AVAILABLE").length,
    [featuredEquipment],
  );

  const visibleCategoriesCount = categories.length > 0 ? categories.length : 8;

  return (
    <div className="overflow-x-hidden">
      <section className="relative border-b border-border/55">
        <div className="mx-auto grid min-h-[100dvh] max-w-[1440px] gap-10 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-12">
          <div className="flex flex-col justify-start pt-4 lg:pt-10">
            <h1 className="max-w-[11ch] font-heading text-[clamp(3.1rem,6vw,5.9rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-foreground">
              Аренда строительного оборудования без лишних звонков
            </h1>
            <p className="mt-6 max-w-[57ch] text-lg leading-8 text-foreground/70">
              Выбирайте технику, проверяйте доступность и оформляйте заявку онлайн — от перфоратора до виброплиты.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/catalog">
                <Button size="lg">Перейти в каталог</Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg">
                  Как это работает
                </Button>
              </a>
            </div>
          </div>

          <div className="grid auto-rows-[minmax(168px,1fr)] gap-4 sm:grid-cols-2">
            <Card className="overflow-hidden p-0 sm:col-span-2">
              <div className="relative h-full min-h-[300px] overflow-hidden rounded-card bg-[linear-gradient(142deg,rgba(22,24,27,0.96),rgba(46,50,56,0.78)),radial-gradient(circle_at_top_right,rgba(242,165,49,0.22),transparent_30%)] p-6 text-background md:p-7">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_15px)] opacity-45" />
                <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <Badge variant="accent" className="border-white/10 bg-white/7 text-primary">
                      Живой public flow
                    </Badge>
                    <div className="max-w-[19ch] space-y-3">
                      <h2 className="font-heading text-3xl font-semibold tracking-[-0.05em] text-white md:text-[2.2rem]">
                        Спокойный каталог снаружи, точный контроль внутри.
                      </h2>
                      <p className="text-sm leading-6 text-white/72">
                        BuildRent показывает технику, статусы и условия аренды так, чтобы решение принималось без лишней переписки.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-display border border-white/10 bg-white/7 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/46">Сегодня доступно</p>
                      <p className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-white">
                        {availableFeaturedCount > 0 ? `${availableFeaturedCount}+` : "45+"}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/68">Позиции в выделенной подборке готовы к быстрому старту аренды.</p>
                    </div>
                    <div className="rounded-display border border-white/10 bg-white/7 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/46">Категории</p>
                      <p className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-white">
                        {visibleCategoriesCount}+
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/68">Разделы каталога уже собраны для навигации по реальному инвентарю.</p>
                    </div>
                    <div className="rounded-display border border-white/10 bg-white/7 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/46">Документы</p>
                      <p className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-white">
                        PDF / DOCX
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/68">История аренды и документы уже закладываются в клиентский сценарий.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {advantages.slice(0, 2).map((advantage) => (
              <Card key={advantage.title} hoverable className="p-5">
                <div className="space-y-4">
                  <div className="h-1 w-14 rounded-full bg-primary/65" />
                  <h3 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    {advantage.title}
                  </h3>
                  <p className="text-sm leading-6 text-foreground/66">{advantage.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {advantages.map((advantage, index) => (
            <Card key={advantage.title} hoverable className="p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-foreground/42">0{index + 1}</p>
              <h2 className="mt-5 font-heading text-[1.6rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {advantage.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-foreground/66">{advantage.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-2 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Категории"
          title="Техника распределена по понятным рабочим направлениям."
          description="Категории приходят из backend и сразу ведут в каталог по нужному `categorySlug`, чтобы подбор начинался с задачи, а не с хаотичного списка."
          actions={
            <Link to="/catalog">
              <Button variant="secondary">Все категории</Button>
            </Link>
          }
        />

        <div className="mt-10">
          {categoriesLoading ? <CategoriesSkeleton /> : null}

          {!categoriesLoading && categoriesError ? (
            <CompactErrorState
              title="Не удалось загрузить категории"
              description={categoriesError}
            />
          ) : null}

          {!categoriesLoading && !categoriesError && categories.length === 0 ? (
            <EmptyState
              title="Категории пока пусты"
              description="Когда в каталоге появятся разделы, здесь откроется быстрый вход в подборки по типу оборудования."
            >
              <div className="pt-2">
                <Link to="/catalog">
                  <Button>Открыть каталог</Button>
                </Link>
              </div>
            </EmptyState>
          ) : null}

          {!categoriesLoading && !categoriesError && categories.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Популярные позиции уже готовы к быстрому просмотру."
          description="Featured equipment приходит с backend и показывает, как будет выглядеть живая каталожная карточка с ценой, залогом, статусом и рейтингом."
          actions={
            <Link to="/catalog">
              <Button>Смотреть весь каталог</Button>
            </Link>
          }
        />

        <div className="mt-10">
          {featuredLoading ? <FeaturedSkeleton /> : null}

          {!featuredLoading && featuredError ? (
            <CompactErrorState
              title="Не удалось загрузить популярное оборудование"
              description={featuredError}
            />
          ) : null}

          {!featuredLoading && !featuredError && featuredEquipment.length === 0 ? (
            <EmptyState
              title="Популярная подборка пока пуста"
              description="Когда в каталоге появятся отмеченные featured-позиции, они отобразятся здесь отдельным блоком."
            >
              <div className="pt-2">
                <Link to="/catalog">
                  <Button>Открыть каталог</Button>
                </Link>
              </div>
            </EmptyState>
          ) : null}

          {!featuredLoading && !featuredError && featuredEquipment.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featuredEquipment.map((item) => (
                <EquipmentCard key={item.id} equipment={item} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
          <Card className="p-6 md:p-8">
            <SectionHeading
              eyebrow="Как это работает"
              title="Аренда собирается в четыре ясных шага."
              description="Мы не перегружаем маршрут лишними блоками: сначала подбор, затем условия, подтверждение и выдача техники с документами."
            />
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {rentalSteps.map((step, index) => (
              <Card key={step} hoverable className="p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-foreground/42">Шаг {index + 1}</p>
                <h3 className="mt-5 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
                  {step}
                </h3>
                <p className="mt-3 text-sm leading-6 text-foreground/66">
                  {index === 0
                    ? "Выберите нужную позицию по категории, цене и назначению без лишнего переключения между экранами."
                    : index === 1
                      ? "Даты аренды, способ получения и базовые условия формируют понятный сценарий до отправки заявки."
                      : index === 2
                        ? "После отправки заявки менеджер подтверждает наличие и рабочие детали по реальному инвентарю."
                        : "Клиент получает технику, а история аренды и документы остаются под рукой в личном кабинете."}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
        <Card className="overflow-hidden p-0">
          <div className="relative rounded-card bg-[linear-gradient(140deg,rgba(22,24,27,0.97),rgba(46,50,56,0.84)),radial-gradient(circle_at_top_right,rgba(242,165,49,0.22),transparent_26%)] px-6 py-10 text-background md:px-10 md:py-12">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(118deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_16px)] opacity-35" />
            <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_auto] lg:items-end">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Следующий шаг</p>
                <h2 className="max-w-[15ch] font-heading text-[clamp(2.3rem,4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
                  Подберите оборудование под задачу
                </h2>
                <p className="max-w-[56ch] text-base leading-7 text-white/72">
                  Откройте каталог, перейдите в нужную категорию и начните живой сценарий подбора уже на реальных данных backend.
                </p>
              </div>
              <Link to="/catalog">
                <Button size="lg">Открыть каталог</Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
