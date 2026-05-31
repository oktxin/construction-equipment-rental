export type SeedCategory = {
  name: string;
  slug: string;
  description: string;
  iconName: string;
};

export const CATEGORY_SEEDS: SeedCategory[] = [
  {
    name: "Отбойные молотки",
    slug: "demolition-hammers",
    description: "Тяжёлый ударный инструмент для бетона, кирпича и демонтажных работ.",
    iconName: "hammer",
  },
  {
    name: "Бетономешалки",
    slug: "concrete-mixers",
    description: "Мобильные и площадочные бетономешалки для отделки, кладки и монолитных задач.",
    iconName: "drum",
  },
  {
    name: "Виброплиты",
    slug: "plate-compactors",
    description: "Оборудование для уплотнения оснований, обратной засыпки и благоустройства.",
    iconName: "layers",
  },
  {
    name: "Генераторы",
    slug: "generators",
    description: "Источники питания для площадок без постоянного электричества и резервных сценариев.",
    iconName: "zap",
  },
  {
    name: "Компрессоры",
    slug: "compressors",
    description: "Воздушное оборудование для пневмоинструмента, покраски и сервисных работ.",
    iconName: "wind",
  },
  {
    name: "Вышки и леса",
    slug: "scaffolding-towers",
    description: "Безопасные системы доступа для фасадных, отделочных и внутренних работ.",
    iconName: "building-2",
  },
  {
    name: "Сварочное оборудование",
    slug: "welding-equipment",
    description: "Инверторы и комплектующие для металлоконструкций, ремонта и монтажа.",
    iconName: "wrench",
  },
  {
    name: "Пилы и резчики",
    slug: "saws-cutters",
    description: "Инструменты для резки металла, камня, железобетона и асфальта.",
    iconName: "disc-3",
  },
  {
    name: "Измерительный инструмент",
    slug: "measuring-tools",
    description: "Точная техника для разметки, нивелирования и контроля качества на объекте.",
    iconName: "ruler",
  },
];
