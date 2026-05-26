# Frontend Public Pages

## HomePage

Главная страница теперь подключена к реальному public API и собирается из отдельных секций:

- hero с индустриальным визуальным блоком и главными CTA;
- блок преимуществ;
- блок категорий;
- блок featured equipment;
- блок "Как это работает";
- финальный CTA в каталог.

## Подключённые endpoints

Для текущего этапа реально используются:

- `GET /api/categories`
- `GET /api/equipment/featured`

В public catalog API layer также подготовлены:

- `GET /api/equipment`
- `GET /api/equipment/:slug`

## Public catalog API layer

Во frontend добавлен слой:

- `client/src/features/catalog/catalogTypes.ts`
- `client/src/features/catalog/catalogApi.ts`

В нём описаны:

- типы категорий;
- типы каталожных карточек оборудования;
- типы детальной карточки;
- pagination metadata;
- методы запроса public catalog data.

## Reusable Components

Для HomePage и следующего этапа каталога созданы:

- `CategoryCard`
- `EquipmentCard`
- `EquipmentPrice`
- `EquipmentAvailability`

Компоненты уже готовы к повторному использованию в:

- главной странице;
- будущем каталоге;
- связанных подборках;
- похожем оборудовании.

## Состояния

На HomePage реализованы отдельные состояния для каждой data-секции:

- отдельный loading state для категорий;
- отдельный loading state для featured equipment;
- отдельный error state для категорий;
- отдельный error state для featured equipment;
- empty state, если backend вернул пустой набор.

Ошибки одной секции не ломают вторую и не ломают весь экран.
