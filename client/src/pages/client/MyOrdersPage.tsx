import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function MyOrdersPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Клиентский кабинет"
        title="Мои заявки"
        description="История заявок, обзор статусов и переход к деталям появятся здесь после этапов каталога и оформления аренды."
        summary={[
          "Общие бейджи уже поддерживают цвета и русские подписи статусов заявок.",
          "Маршрут защищен и рассчитан только на авторизованных пользователей.",
          "Страница подходит как для карточного, так и для табличного сценария истории.",
          "Плотность данных можно будет нарастить позже без потери общей темы.",
        ]}
        metrics={[
          { label: "Статусы", value: "Готовы", status: "ACTIVE", statusContext: "order" },
          { label: "Защита маршрута", value: "Включена", status: "APPROVED", statusContext: "order" },
          { label: "История", value: "Следующий этап", status: "PENDING", statusContext: "order" },
        ]}
      />
    </div>
  );
}
