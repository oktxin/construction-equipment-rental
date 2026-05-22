import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function FavoritesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Клиентский кабинет"
        title="Избранное"
        description="Здесь появятся сохраненные карточки техники, быстрые действия и содержательный empty-state после подключения избранного."
        summary={[
          "Эта страница уже защищена клиентской проверкой доступа.",
          "Карточки сохраненной техники переиспользуют систему каталожных карточек.",
          "Экран заранее собран под информативный empty-state, а не под пустое белое поле.",
          "Микро-отклик для сохранения и удаления будет добавлен на следующем этапе.",
        ]}
        metrics={[
          { label: "Доступ", value: "Защищен", status: "APPROVED" },
          { label: "Карточки", value: "Shared UI", status: "AVAILABLE" },
          { label: "Логика", value: "В очереди", status: "PENDING" },
        ]}
      />
    </div>
  );
}
