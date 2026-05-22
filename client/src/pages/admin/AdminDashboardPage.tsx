import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminDashboardPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Панель администратора"
      title="Панель администратора"
      description="Здесь появятся KPI-карточки, очереди модерации и сводка отчетов поверх темной административной рабочей зоны."
      summary={[
        "Плотный рабочий макет намеренно отделен от более теплого публичного каталога.",
        "Общие карточки статистики уже готовы принять живые цифры.",
        "Admin-маршруты защищены только для роли ADMIN.",
        "Каркас оптимизирован под насыщенное данными рабочее пространство без пустых таблиц на старте.",
      ]}
      metrics={[
        { label: "Доступ", value: "Только admin", status: "APPROVED" },
        { label: "Плотность", value: "Собрана", status: "ACTIVE" },
        { label: "Данные", value: "В очереди", status: "PENDING" },
      ]}
    />
  );
}
