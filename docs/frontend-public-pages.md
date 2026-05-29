# Frontend Public Pages

## HomePage

Главная страница подключена к реальному public API и собирается из отдельных секций:

- hero с главным CTA;
- блок преимуществ;
- блок категорий;
- featured equipment;
- секция "Как это работает";
- финальный CTA в каталог.

### Подключенные endpoints

- `GET /api/categories`
- `GET /api/equipment/featured`

## Public catalog API layer

Во frontend используется отдельный public catalog слой:

- `client/src/features/catalog/catalogTypes.ts`
- `client/src/features/catalog/catalogApi.ts`

В нем описаны:

- типы категорий;
- типы карточек оборудования;
- типы detail response для `/equipment/:slug` и `/equipment/by-id/:id`;
- pagination metadata;
- методы загрузки public catalog data.

## Reusable Components

Для публичных страниц подготовлены переиспользуемые компоненты:

- `CategoryCard`
- `EquipmentCard`
- `EquipmentPrice`
- `EquipmentAvailability`
- `EquipmentGallery`
- `EquipmentSpecsTable`
- `EquipmentReviews`
- `EquipmentSummaryPanel`
- `SimilarEquipmentSection`
- `FavoriteButton`

## CatalogPage

Страница `/catalog` подключена к `GET /api/equipment` и работает как полноценный публичный каталог.

### Подключенные endpoints

- `GET /api/equipment`
- `GET /api/categories`

### Что поддерживает CatalogPage

- поиск по `name`, `brand`, `model` через `search`;
- фильтр по `categorySlug`;
- фильтр по диапазону `minPrice` / `maxPrice`;
- фильтр по `status` (`AVAILABLE`, `UNAVAILABLE`, `MAINTENANCE`);
- переключатель `isFeatured`;
- сортировку по `createdAt`, `dailyPrice`, `name`, `rating`;
- пагинацию через `page` и `limit`.

### URLSearchParams и localStorage

Каталог использует `useCatalogFilters`, который:

- читает начальное состояние из `URLSearchParams`;
- если URL пустой, восстанавливает состояние из `localStorage`;
- синхронизирует фильтры, сортировку и лимит с URL;
- сохраняет настройки в `localStorage` по ключу `buildrent.catalog.filters`;
- очищает и URL, и `localStorage` по кнопке сброса.

### Состояния страницы

- skeleton для фильтров и сетки карточек;
- отдельный error state для каталога;
- отдельная ошибка загрузки категорий внутри блока фильтров;
- empty state для пустой выдачи;
- валидация диапазона цены без отправки некорректного запроса.

### Responsive behavior

- desktop: sticky-блок фильтров и сетка из 3 карточек;
- tablet: сетка из 2 карточек;
- mobile: одна карточка в ряд и отдельная нижняя панель фильтров.

## EquipmentDetailPage

Страница `/equipment/:slug` подключена к живому API и открывает публичную карточку оборудования с галереей, характеристиками, отзывами, избранным и CTA на аренду.

### Подключенные endpoints

- `GET /api/equipment/:slug`
- `GET /api/reviews/equipment/:equipmentId`
- `GET /api/favorites/check/:equipmentId`
- `POST /api/favorites/:equipmentId`
- `DELETE /api/favorites/:equipmentId`

### Что поддерживает EquipmentDetailPage

- breadcrumbs `Главная / Каталог / Название оборудования`;
- адаптивную галерею с главным изображением, миниатюрами и fallback-блоком;
- summary panel с ценой за сутки, залогом, статусом, свободным количеством, CTA и кнопкой избранного;
- основные данные по позиции: `name`, `brand`, `model`, `shortDescription`, `description`, `averageRating`, `reviewsCount`;
- таблицу характеристик из `specs` с добавлением `power` и `weight`, если они пришли в detail response;
- блок отзывов с опубликованными review entries, датой, рейтингом и текстом;
- секцию похожего оборудования на базе `similarEquipment` и `EquipmentCard`;
- переход к `/checkout?equipmentId=<id>` через защищенный checkout route.

### Favorites flow

- если пользователь не авторизован, кнопка "В избранное" ведет на `/login` и сохраняет previous location;
- если пользователь авторизован, detail page делает `checkFavorite`, затем позволяет выполнить `addFavorite` и `removeFavorite`;
- в кнопке есть loading-состояния: `Проверяем...`, `Добавляем...`, `Удаляем...`.

### Loading, error, not found

- loading state: отдельные skeleton-блоки для breadcrumbs, галереи, summary panel и секций контента;
- error state: русское сообщение "Не удалось загрузить карточку оборудования" и кнопка "Повторить";
- not found state: русское сообщение "Оборудование не найдено" и CTA "Вернуться в каталог";
- reviews endpoint не ломает страницу целиком: при ошибке detail page использует reviews из detail response, если они уже пришли.

### Responsive behavior

- desktop: двухколоночный верхний блок `gallery + summary`, секция похожего оборудования в 4 колонки;
- tablet: галерея и summary складываются в вертикальный поток, similar equipment идет по 2 карточки в ряд;
- mobile: одна карточка в ряд, миниатюры без horizontal overflow, характеристики читаются как вертикальный список, layout остается стабильным на ширине `320px`.

## CheckoutPage

Страница `/checkout` работает как защищенный клиентский checkout flow и принимает `equipmentId` через query string.

### Подключенные endpoints

- `GET /api/equipment/by-id/:id`
- `POST /api/rental-orders/calculate`
- `POST /api/rental-orders`
- `GET /api/rental-orders/my`

### Что поддерживает CheckoutPage

- загрузку выбранной позиции по `equipmentId` из query string;
- форму на `react-hook-form` + `zod` с русскими сообщениями валидации;
- поля `startDate`, `endDate`, `quantity`, `deliveryType`, `deliveryAddress`, `customerComment`;
- условное отображение адреса только для `DELIVERY`;
- автоматический предварительный расчет стоимости с debounce и ручную кнопку пересчета;
- создание rental order только после актуального расчета;
- success state с номером заявки, статусом, итоговой суммой и переходом в `/orders`;
- дополнительную backend-проверку, что новая заявка появилась в `GET /api/rental-orders/my`.

### Loading, error, empty

- empty state, если `equipmentId` не передан;
- equipment loading skeleton для формы и summary;
- error state загрузки оборудования с retry;
- блок недоступности, если позиция не может быть арендована сейчас;
- inline error state для расчета и создания заявки.

### Responsive behavior

- desktop: форма слева и sticky summary справа;
- tablet: summary уходит под форму, блоки сохраняют плотный и читаемый ритм;
- mobile: вся форма собирается в одну колонку без overflow, кнопки и карточка summary остаются удобными для тапа.
