import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function ReportsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Клиентский кабинет"
        title="Отчеты"
        description="Здесь появятся выгрузки PDF и DOCX, как только будут подключены листинг и генерация отчетов."
        summary={[
          "Доступ к разделу уже защищен клиентской проверкой доступа.",
          "Макет страницы заранее учитывает файловые действия, метаданные и состояния отчетов.",
          "Общие состояния загрузки и пустого списка уже готовы к сценариям без данных и генерации.",
          "Опыт клиента и администратора в отчетах намеренно разведен по тону и плотности.",
        ]}
        metrics={[
          { label: "Выгрузки", value: "Запланированы", status: "PENDING" },
          { label: "Доступ", value: "Защищен", status: "APPROVED" },
          { label: "Форматы", value: "PDF / DOCX", status: "AVAILABLE" },
        ]}
      />
    </div>
  );
}
