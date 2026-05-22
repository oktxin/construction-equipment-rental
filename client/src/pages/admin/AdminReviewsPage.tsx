import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminReviewsPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Панель администратора"
      title="Отзывы"
      description="Здесь появятся очереди модерации, публикация отзывов и контекст оборудования на следующем административном этапе."
      summary={[
        "Визуальная система уже готова к moderation-статусам и контекстным сигналам.",
        "Маршрут сохраняет читаемость и на desktop, и на tablet.",
        "Состояния отзывов и связи с оборудованием аккуратно подключатся к существующему каркасу.",
        "До появления реальных данных сюда не добавляется фальшивая таблица модерации.",
      ]}
    />
  );
}
