import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminOrdersPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Панель администратора"
      title="Заявки"
      description="Здесь будут жить подтверждение, смена статусов и комментарии менеджера по каждой заявке."
      summary={[
        "Маршрут изначально построен вокруг высокосигнальной видимости статусов.",
        "Каркас оставляет место под фильтры, плотные списки и углубленный просмотр деталей.",
        "StatusBadge уже поддерживает backend-состояния заявок с русскими labels.",
        "Рабочее пространство остается практичным, а не абстрактно dashboard-типовым.",
      ]}
      metrics={[
        { label: "Workflow", value: "Подготовлен", status: "APPROVED", statusContext: "order" },
        { label: "Статусы", value: "Сопоставлены", status: "ACTIVE", statusContext: "order" },
        { label: "Действия", value: "Следующий этап", status: "PENDING", statusContext: "order" },
      ]}
    />
  );
}
