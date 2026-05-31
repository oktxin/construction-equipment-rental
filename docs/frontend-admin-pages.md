# Frontend Admin Pages

Документ описывает текущее состояние административных маршрутов фронтенда BuildRent и их live-интеграцию с backend API.

## AdminDashboardPage

Страница `/admin` показывает оперативную сводку по заявкам без перегруженных графиков.

### Подключённые endpoints

- `GET /api/admin/rental-orders`

### Что реализовано

- page header с быстрым переходом к списку заявок
- KPI-карточки по основным статусам и общей сумме
- блок последних заявок с быстрым переходом в detail panel
- quick actions для заявок, каталога, отзывов и отчётов
- loading, empty и error states на русском

## AdminOrdersPage

Страница `/admin/orders` работает как рабочий центр обработки заявок.

### Подключённые endpoints

- `GET /api/admin/rental-orders`
- `GET /api/admin/rental-orders/:id`
- `PATCH /api/admin/rental-orders/:id/status`
- `PATCH /api/admin/rental-orders/:id/comment`

### Что реализовано

- page header с описанием сценария
- фильтры `search`, `status`, `startDateFrom`, `startDateTo`, `limit`
- responsive table на desktop и tablet
- mobile cards без общего overflow
- пагинация
- detail panel справа на desktop и full-width overlay на mobile
- обновление статуса и комментария менеджера
- loading, empty, error и success states

### Search params

- `search`
- `status`
- `startDateFrom`
- `startDateTo`
- `page`
- `limit`
- `selected`

### Protected admin flow

- `/admin` и `/admin/orders` работают под `AdminRoute`
- пользователь без token уходит на `/login`
- пользователь без роли `ADMIN` уходит на `/`

## AdminEquipmentPage

Страница `/admin/equipment` управляет каталогом техники.

### Подключённые endpoints

- `GET /api/categories`
- `GET /api/equipment`
- `GET /api/equipment/by-id/:id`
- `POST /api/equipment`
- `PATCH /api/equipment/:id`
- `PUT /api/equipment/:id/images`
- `PUT /api/equipment/:id/specs`
- `DELETE /api/equipment/:id`

### Что реализовано

- page header с итоговым счётчиком и CTA
- фильтры `search`, `categorySlug`, `status`, `isFeatured`, `limit`
- responsive table и mobile cards
- создание и редактирование оборудования
- отдельные редакторы изображений и характеристик
- safe delete или archive behavior
- loading, empty, error и success states

### Search params

- `search`
- `categorySlug`
- `status`
- `isFeatured`
- `page`
- `limit`

## AdminCategoriesPage

Страница `/admin/categories` управляет разделами каталога.

### Подключённые endpoints

- `GET /api/categories`
- `POST /api/categories`
- `PATCH /api/categories/:id`
- `DELETE /api/categories/:id`

### Что реализовано

- page header с итоговым счётчиком и CTA
- toolbar с `search`, `limit` и reset
- table view на desktop и cards на mobile
- создание и редактирование категорий
- auto-slug от `name`, пока slug не меняют вручную
- confirm flow удаления с обработкой серверного конфликта
- loading, empty, error и success states

### Search params

- `search`
- `page`
- `limit`

## AdminUsersPage

Страница `/admin/users` управляет аккаунтами пользователей в существующем тёмном operational UI.

### Подключённые endpoints

- `GET /api/users`
- `GET /api/users/:id`
- `PATCH /api/users/:id`
- `PATCH /api/users/:id/block`

### Что реализовано

- page header с итоговым счётчиком по выборке
- фильтры `search`, `role`, `isBlocked`, `limit`
- responsive table на desktop и tablet
- mobile cards на узких экранах
- detail panel с карточкой пользователя и быстрыми действиями
- редактирование `fullName`, `phone`, `avatarUrl`
- confirm modal для блокировки и разблокировки
- обновление detail panel и списка после edit/block action
- русские loading, empty, error и success states

### Search params

- `search`
- `role`
- `isBlocked`
- `page`
- `limit`
- `selected`

### Поведение

- изменение фильтров сбрасывает `page` на `1`
- state фильтров сохраняется в `URLSearchParams`
- после редактирования текущего admin-аккаунта вызывается `fetchMe`
- список обновляется тихо, если пользователь уже работает со страницей

### Protected admin flow

- `/admin/users` работает под `AdminRoute`
- пользователь без token уходит на `/login`
- пользователь без роли `ADMIN` уходит на `/`

## AdminReviewsPage

Страница `/admin/reviews` закрывает сценарий модерации отзывов.

### Подключённые endpoints

- `GET /api/admin/reviews`
- `PATCH /api/admin/reviews/:id/publish`
- `PATCH /api/reviews/:id`
- `DELETE /api/reviews/:id`

### Что реализовано

- page header с итоговым счётчиком по выборке
- фильтры `search`, `rating`, `isPublished`, `sortBy`, `sortOrder`, `limit`
- responsive moderation table на desktop и tablet
- mobile cards без общего overflow
- detail panel с полным текстом, пользователем и оборудованием
- редактирование `rating` и `text` с валидацией `1..5` и `10..1000`
- moderation actions: publish, hide, delete
- confirm modal удаления
- обновление списка и detail panel после moderation actions
- русские loading, empty, error и success states

### Search params

- `search`
- `rating`
- `isPublished`
- `sortBy`
- `sortOrder`
- `page`
- `limit`
- `selected`

### Поведение

- изменение фильтров сбрасывает `page` на `1`
- state фильтров сохраняется в `URLSearchParams`
- publish или hide action обновляет текущую строку и detail panel
- delete action закрывает detail panel, если удалён выбранный отзыв

### Protected admin flow

- `/admin/reviews` работает под `AdminRoute`
- пользователь без token уходит на `/login`
- пользователь без роли `ADMIN` уходит на `/`

## AdminReportsPage

Страница `/admin/reports` превращает отчёты в рабочий инструмент админки: статистику можно сформировать по периоду, а уже созданные документы можно фильтровать, скачивать и удалять.

### Подключённые endpoints

- `GET /api/admin/reports`
- `POST /api/admin/reports/rental-statistics`
- `DELETE /api/admin/reports/:id`
- `GET /api/reports/:id/download`
- `GET /api/users`

### Что реализовано

- page header с общим счётчиком по текущей выборке
- верхний блок генерации статистического отчёта по периоду в `PDF` или `DOCX`
- валидация `dateFrom`, `dateTo`, `format` с русскими сообщениями
- success-сценарий после генерации с возможностью сразу скачать новый файл
- фильтры `type`, `format`, `userId`, `limit`
- синхронизация фильтров и пагинации с `URLSearchParams`
- responsive table на desktop и tablet
- mobile cards без общего horizontal overflow
- построчное скачивание с локальным loading state только для выбранной строки
- confirm modal для удаления отчёта
- русские loading, empty, error и success states

### Search params

- `type`
- `format`
- `userId`
- `page`
- `limit`

### Поведение

- изменение фильтров сбрасывает `page` на `1`
- reset очищает `URLSearchParams`
- после генерации список отчётов тихо перечитывается
- после удаления последнего элемента на странице список возвращается на предыдущую страницу
- фильтр по пользователю использует `GET /api/users` и показывает список доступных аккаунтов
- download использует `blob`, временную ссылку и имя из `Content-Disposition`, если оно пришло от сервера

### Protected admin flow

- `/admin/reports` работает под `AdminRoute`
- пользователь без token уходит на `/login`
- пользователь без роли `ADMIN` уходит на `/`
