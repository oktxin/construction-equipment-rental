import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminReportsPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Панель администратора"
      title="Отчеты"
      description="Здесь появятся выгрузки, сгенерированные документы и управление статистическими отчетами."
      summary={[
        "Экран подготовлен под смешанные метаданные, фильтры и action-heavy карточки отчетов.",
        "Маршрут остается консистентным с остальной системой административного интерфейса.",
        "Состояния выгрузки и генерации переиспользуют общие loading и empty-сценарии.",
        "Сервер уже поддерживает отчеты, а этот каркас готовит чистую точку входа для интерфейса.",
      ]}
      metrics={[
        { label: "Выгрузки", value: "Подготовлены", status: "AVAILABLE" },
        { label: "Видимость", value: "Только admin", status: "APPROVED" },
        { label: "Аналитика", value: "Следующий этап", status: "PENDING" },
      ]}
    />
  );
}
