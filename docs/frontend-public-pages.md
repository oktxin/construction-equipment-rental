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

## MyOrdersPage

The `/orders` page is now connected to the protected client flow and shows the current user's rental history.

### Connected endpoints

- `GET /api/rental-orders/my`

### What MyOrdersPage supports

- breadcrumbs `Главная / Мои заявки`
- page header with a CTA back to the catalog
- status tabs for `ALL`, `PENDING`, `APPROVED`, `ACTIVE`, `COMPLETED`, `CANCELLED`, and `REJECTED`
- page reset to `1` when the status filter changes
- `OrderCard` blocks with order number, status, rental period, item count, total amount, and link to detail page
- pagination for multi-page order history
- Russian loading, empty, and error states

### Query parameters

- `status`
- `page`

### Responsive behavior

- desktop: full-width order cards with inline summary blocks
- tablet: cards keep the same hierarchy and totals move into stacked groups
- mobile: status tabs scroll horizontally, cards stay in one column, and there is no horizontal overflow at `320px`

## OrderDetailPage

The `/orders/:id` page opens a full detail view for one rental order and keeps documents and destructive actions inside the same protected screen.

### Connected endpoints

- `GET /api/rental-orders/my/:id`
- `PATCH /api/rental-orders/:id/cancel`
- `POST /api/reports/order/:orderId`
- `GET /api/reports/:id/download`

### What OrderDetailPage supports

- breadcrumbs `Главная / Мои заявки / BR-...`
- header with order number, status badge, created date, and back button
- `OrderTimeline` for regular order progression and a separate negative-state layout for `CANCELLED` and `REJECTED`
- rental details block with dates, delivery type, delivery address, customer comment, and manager comment
- `OrderItemsList` with item-by-item cost breakdown
- `OrderTotals` in the sticky summary column
- `OrderDocumentsPanel` with separate loading state for `PDF` and `DOCX`
- `OrderActions` with a confirmation modal and in-place state refresh after cancellation

### Cancel order flow

- cancel is shown only for `PENDING` and `APPROVED`
- the user confirms the action in a modal
- the page updates local detail state after a successful `PATCH`
- success and error feedback remain visible inside the actions card

### Order documents flow

- reports are generated only after clicking `Скачать PDF` or `Скачать DOCX`
- frontend first calls `POST /api/reports/order/:orderId`
- after receiving `report.id`, frontend downloads the file through `GET /api/reports/:id/download`
- download uses `blob` plus a temporary link so authenticated file saving works correctly in the browser

### Responsive behavior

- desktop: main content on the left, sticky summary and actions on the right
- tablet: the summary column moves below the main content while keeping block order readable
- mobile: the layout becomes a single column, sticky behavior disappears naturally, and download/cancel buttons remain full-width

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

## FavoritesPage

Страница `/favorites` теперь подключена к живому списку избранного клиента и остаётся внутри существующего light industrial client area.

### Connected endpoints

- `GET /api/favorites`
- `DELETE /api/favorites/:equipmentId`

### What FavoritesPage supports

- breadcrumbs `Главная / Избранное`
- page header с CTA обратно в каталог
- grid `3 / 2 / 1` на desktop, tablet и mobile
- переиспользование `EquipmentCard` для сохранённой техники
- локальный feedback после удаления из избранного
- loading, error, empty states и pagination

### Responsive behavior

- desktop: три карточки в ряд
- tablet: две карточки в ряд
- mobile: одна карточка в ряд без horizontal overflow на `320px`

## ProfilePage

Страница `/profile` собирает карточку пользователя, форму редактирования и быстрые действия клиентского кабинета.

### Connected endpoints

- `GET /api/auth/me`
- `PATCH /api/users/:id`

### What ProfilePage supports

- breadcrumbs `Главная / Профиль`
- summary card с ФИО, email, телефоном, ролью и датой регистрации
- форма на `react-hook-form + zod`
- editable fields: `fullName`, `phone`, `avatarUrl`
- readonly fields: `email`, `role`
- обновление auth user после успешного сохранения
- быстрые переходы в `/orders`, `/favorites`, `/reports`, `/catalog`

### Responsive behavior

- desktop: form content и quick actions разнесены по двум колонкам
- mobile: форма и action cards складываются в одну колонку без overflow

## ReportsPage

Страница `/reports` показывает клиентские документы и историю выгрузок с отдельным действием скачивания для каждой записи.

### Connected endpoints

- `GET /api/reports/my`
- `GET /api/reports/:id/download`

### What ReportsPage supports

- breadcrumbs `Главная / Отчёты`
- page header с переходом к заявкам
- filters by report `type` and `format`
- reset filters action
- list of report cards with title, type, format, created date, and related order
- download button с отдельным loading state на уровне одной записи
- loading, error, empty states и pagination

### Responsive behavior

- desktop: filters and cards remain inline and readable
- mobile: filters stack vertically, cards stay single-column, and the page keeps `320px` stability without overflow
