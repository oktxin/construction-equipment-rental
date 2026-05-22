import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Защищенное оформление"
        title="Оформление аренды"
        description="Здесь появятся даты, доставка, комментарии и итоговая стоимость после интеграции каталога и карточки техники."
        summary={[
          "Проверка доступа уже удерживает оформление аренды за авторизацией.",
          "Input, select и CTA-компоненты готовы к реальной форме аренды.",
          "Каркас заранее резервирует сильную summary-зону для стоимости и депозита.",
          "Валидация и расчеты намеренно вынесены в следующий продуктовый проход.",
        ]}
        metrics={[
          { label: "Доступ", value: "Защищен", status: "APPROVED" },
          { label: "Форма", value: "Готова", status: "AVAILABLE" },
          { label: "Расчет", value: "Следующий этап", status: "PENDING" },
        ]}
      />
    </div>
  );
}
