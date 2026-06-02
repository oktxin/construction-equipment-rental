const specLabelMap: Record<string, string> = {
  application: "Область применения",
  "archive note": "Архивная заметка",
  "assembly time": "Время сборки",
  "балочные плоскости": "Плоскости лучей",
  "beam planes": "Плоскости лучей",
  "blade diameter": "Диаметр полотна",
  "blade set": "Комплект дисков",
  display: "Дисплей",
  "duty cycle": "Продолжительность включения",
  "drum volume": "Объём барабана",
  "dust extraction": "Пылеудаление",
  "electrode diameter": "Диаметр электрода",
  "mix output": "Выход смеси",
  "maintenance note": "Примечание по обслуживанию",
  range: "Дальность",
  protection: "Защита",
  "pressure switch": "Реле давления",
  "range with prism": "Дальность с призмой",
  storage: "Память",
  "voltage range": "Диапазон напряжения",
  "welding current": "Сварочный ток",
  "громкость барабана": "Объём барабана",
  "диаметр лезвия": "Диаметр полотна",
  "диапазон": "Дальность",
  "диапазон с призмой": "Дальность с призмой",
  "набор лезвий": "Комплект дисков",
  "отображать": "Дисплей",
  "смешать выход": "Выход смеси",
  "удаление пыли": "Пылеудаление",
  "хранилище": "Память",
};

const specValueMap: Record<string, string> = {
  adjustable: "Регулируемый",
  "avr and alternator test": "Проверка AVR и альтернатора",
  automatic: "Автоматический",
  backlit: "С подсветкой",
  belt: "Ременной",
  belarus: "Беларусь",
  "blade guard replacement": "Замена кожуха диска",
  "cast iron": "Чугун",
  "concrete and steel": "Бетон и сталь",
  "construction layout": "Строительная разбивка",
  electric: "Электрический",
  foldable: "Складной",
  forced: "Принудительное",
  "forced air": "Принудительное воздушное охлаждение",
  "heavy steel profiles": "Тяжёлые металлические профили",
  "historical record only": "Только для исторической записи",
  "indoor and facade work": "Внутренние и фасадные работы",
  "large pours": "Крупные заливки",
  "maintenance rotation": "Плановое обслуживание",
  "manual recoil": "Ручной стартер",
  "not offered for new rentals": "Не предлагается для новых аренд",
  "pending calibration": "Ожидает калибровки",
  petrol: "Бензин",
  "portable wheel base": "Переносная колёсная база",
  "road base and yard prep": "Подготовка дорожного основания и двора",
  "road repairs": "Дорожный ремонт",
  "single-phase": "Однофазный",
  "stairwells and interiors": "Лестничные клетки и интерьеры",
  steel: "Сталь",
  supported: "Поддерживается",
  "three-phase": "Трёхфазный",
  "valve block replacement": "Замена клапанного блока",
  "fan and cable inspection": "Проверка вентилятора и кабеля",
  "wheel base": "Колёсная база",
  "wheel set": "Колёсный комплект",
  yes: "Да",
  no: "Нет",
  "большие заливки": "Крупные заливки",
  "внутренняя память": "Встроенная память",
  "двойной диск": "Два диска",
  "замена защиты лезвия": "Замена кожуха диска",
  "наружная сортировка": "Наружная планировка",
  "ожидание диагностики": "Ожидает диагностики",
  "ожидание калибровки": "Ожидает калибровки",
  "план строительства": "Строительная разбивка",
  "переносная колесная база": "Переносная колёсная база",
  "принудительная вентиляция": "Принудительное воздушное охлаждение",
  "принужденный": "Принудительное",
  "ротация технического обслуживания": "Плановое обслуживание",
  "с подсветкой": "С подсветкой",
  "тест avr и генератора переменного тока": "Проверка AVR и альтернатора",
  "только исторические записи": "Только для исторической записи",
};

const specUnitMap: Record<string, string> = {
  bar: "бар",
  h: "ч",
  min: "мин",
  sec: "сек",
  "mm at 30 m": "мм на 30 м",
};

function normalizeKey(value: string) {
  return value.trim().toLowerCase();
}

export function localizeSpecLabel(label: string) {
  return specLabelMap[normalizeKey(label)] ?? label;
}

export function localizeSpecValue(value: string) {
  return specValueMap[normalizeKey(value)] ?? value;
}

export function localizeSpecUnit(unit: string | null | undefined) {
  if (!unit) {
    return unit ?? null;
  }

  return specUnitMap[normalizeKey(unit)] ?? unit;
}
