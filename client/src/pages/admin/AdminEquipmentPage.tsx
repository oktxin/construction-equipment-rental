import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminEquipmentPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Панель администратора"
      title="Оборудование"
      description="Здесь появятся управление остатками, смена статусов, featured-флаги и обслуживание техники."
      summary={[
        "Страница зарезервирована под плотный, но читаемый рабочий интерфейс.",
        "Общие статусные бейджи уже поддерживают статусы оборудования на русском.",
        "Таблицы и edit-flow намеренно вынесены на следующий этап.",
        "Макет уже учитывает фильтры, быстрые действия и боковые панели.",
      ]}
    />
  );
}
