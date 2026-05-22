import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function CatalogPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Каркас каталога"
        title="Каталог оборудования"
        description="Здесь уже подготовлены зоны поиска, фильтров и сортировки для следующего этапа развития каталога."
        summary={[
          "Запланированы фиксированные фильтры и мобильная выдвижная панель для узких экранов.",
          "Карточки техники подключатся к общим дизайн-токенам и статусным бейджам.",
          "Пагинация и сортировка уже заложены по структуре, но логика подключается следующим этапом.",
          "Каркас сохраняет визуальное направление до появления реальной API-плотности.",
        ]}
        metrics={[
          { label: "Режим выдачи", value: "Сетка", status: "AVAILABLE" },
          { label: "Фильтры", value: "Подготовлены", status: "PENDING" },
          { label: "Подключение данных", value: "Следующий этап", status: "APPROVED" },
        ]}
      />
    </div>
  );
}
