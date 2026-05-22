import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function ProfilePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Клиентский кабинет"
        title="Профиль"
        description="Здесь будут жить учетные данные, контактные настройки и клиентские быстрые действия."
        summary={[
          "Экран уже расположен за защищенным маршрутом авторизованного пользователя.",
          "Каркас готов к редактируемым контактным блокам и сводке арендной активности.",
          "Общие inputs и buttons уже доступны для будущих форм.",
          "Профиль и админка остаются визуально разделены по замыслу дизайн-системы.",
        ]}
      />
    </div>
  );
}
