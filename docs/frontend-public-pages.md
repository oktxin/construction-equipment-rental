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

## CatalogPage

Страница `/catalog` теперь подключена к живому backend endpoint `GET /api/equipment` и работает как полноценный публичный каталог.

### Подключённые endpoints

- `GET /api/equipment`
- `GET /api/categories`

### Что поддерживает CatalogPage

- поиск по `name`, `brand`, `model` через `search`;
- фильтр по `categorySlug`;
- фильтр по диапазону `minPrice` / `maxPrice`;
- фильтр по `status` (`AVAILABLE`, `UNAVAILABLE`, `MAINTENANCE`);
- переключатель `isFeatured` для популярных позиций;
- сортировку по `createdAt`, `dailyPrice`, `name`, `rating`;
- пагинацию через `page` и `limit`.

### URLSearchParams и localStorage

Каталог использует хук `useCatalogFilters`, который:

- читает начальное состояние из `URLSearchParams`;
- если URL пустой, восстанавливает состояние из `localStorage`;
- синхронизирует фильтры, сортировку и лимит с URL;
- сохраняет настройки в `localStorage` по ключу `buildrent.catalog.filters`;
- очищает и URL, и `localStorage` по кнопке сброса.

Сохраняются:

- `search`
- `categorySlug`
- `minPrice`
- `maxPrice`
- `status`
- `isFeatured`
- `sortBy`
- `sortOrder`
- `limit`

### Состояния страницы

На CatalogPage реализованы:

- skeleton для фильтров и сетки карточек;
- отдельный error state для каталога;
- отдельная ошибка загрузки категорий внутри блока фильтров;
- empty state для пустой выдачи;
- валидация диапазона цены без отправки некорректного запроса.

### Responsive behavior

Страница адаптирована для:

- desktop: левый sticky-блок фильтров и сетка из 3 карточек;
- tablet: сетка из 2 карточек;
- mobile: одна карточка в ряд и отдельная нижняя панель фильтров с кнопками "Применить" и "Сбросить".
