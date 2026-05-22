import { FoundationPlaceholder } from "../../components/placeholders/FoundationPlaceholder";

export function EquipmentDetailPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <FoundationPlaceholder
        tone="public"
        eyebrow="Карточка техники"
        title="Карточка оборудования"
        description="Здесь появятся галерея, характеристики, отзывы и сводка аренды после подключения каталога."
        summary={[
          "Для этой страницы уже зарезервирована крупная композиция с акцентом на изображения техники.",
          "Технические характеристики и отзывы будут собраны на общем UI-слое и статусных токенах.",
          "Breadcrumbs и CTA-иерархия уже присутствуют в shared-слое.",
          "Здесь нет фальшивых таблиц, только аккуратно собранный продуктовый каркас.",
        ]}
        metrics={[
          { label: "Галерея", value: "Запланирована", status: "AVAILABLE" },
          { label: "Отзывы", value: "Каркас готов", status: "PENDING" },
          { label: "CTA-блок", value: "Собран", status: "APPROVED" },
        ]}
      />
    </div>
  );
}
