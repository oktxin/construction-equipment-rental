import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function OrderDetailPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Клиентский кабинет"
        title="Детали заявки"
        description="Этот маршрут подготовлен под сводку аренды, информацию о доставке и ленту статусов по одной заявке."
        summary={[
          "Breadcrumbs и page headers уже поддерживают detail-ориентированный сценарий.",
          "Иерархия статусов и итогов зарезервирована под следующий API-этап.",
          "Каркас остается читаемым на мобильных экранах без принудительных desktop-таблиц.",
          "Будущие действия с отчетами естественно встроятся именно сюда.",
        ]}
      />
    </div>
  );
}
