import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function AdminCategoriesPage() {
  return (
    <FoundationPlaceholder
      tone="admin"
      eyebrow="Панель администратора"
      title="Категории"
      description="Здесь появится управление slug, иконками, описаниями и связями категорий с оборудованием."
      summary={[
        "Экран подготовлен под компактные сценарии управления, а не под декоративные карточки.",
        "Использует ту же административную систему, что и остальная рабочая часть проекта.",
        "Может вырасти в modal- или side-panel-редактирование без пересборки оболочки.",
        "Общие buttons и headers уже поддерживают нужный action-ритм.",
      ]}
    />
  );
}
