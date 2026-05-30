# Frontend Admin Pages

## AdminDashboardPage

Страница `/admin` использует live-данные из admin rental orders API и показывает operational-first сводку без лишних графиков.

### Подключённые endpoints

- `GET /api/admin/rental-orders`

### Что реализовано

- page header с быстрым переходом к списку заявок
- KPI-карточки по всем заявкам, ожиданию подтверждения, активным арендам, завершённым и отменённым сценариям
- блок "Последние заявки" с переходом в detail panel через `/admin/orders?selected=<id>`
- quick actions для заявок, оборудования, отзывов и отчётов
- loading, empty и error states на русском

## AdminOrdersPage

Страница `/admin/orders` работает как рабочий центр для обработки заявок.

### Подключённые endpoints

- `GET /api/admin/rental-orders`
- `GET /api/admin/rental-orders/:id`
- `PATCH /api/admin/rental-orders/:id/status`
- `PATCH /api/admin/rental-orders/:id/comment`

### Что реализовано

- page header с описанием сценария
- фильтры:
  - `search`
  - `status`
  - `startDateFrom`
  - `startDateTo`
  - `limit`
- responsive list:
  - desktop и tablet используют table wrapper с внутренним safe horizontal scroll
  - mobile показывает карточки заявок без page overflow
- пагинация
- detail panel справа на desktop и full-width overlay на mobile
- status update flow с допустимыми переходами, manager comment и success/error feedback
- отдельная форма сохранения manager comment
- русские loading, empty и error states

### Search params

Страница хранит состояние в `URLSearchParams`:

- `status`
- `search`
- `startDateFrom`
- `startDateTo`
- `page`
- `limit`
- `selected` для открытия detail panel по конкретной заявке

### Protected admin flow

- `/admin` и `/admin/orders` находятся под `AdminRoute`
- без token пользователь перенаправляется на `/login`
- пользователь без роли `ADMIN` перенаправляется на `/`
- администратор получает доступ к `AdminLayout` и admin-маршрутам

## AdminEquipmentPage

Страница `/admin/equipment` теперь работает как живая админская поверхность каталога для техники.

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

- page header с итоговым счётчиком и CTA "Добавить оборудование"
- фильтры:
  - `search`
  - `categorySlug`
  - `status`
  - `isFeatured`
  - `limit`
- фильтры живут в `URLSearchParams`, а reset очищает URL полностью
- desktop и tablet показывают плотную responsive table с safe horizontal scroll внутри контейнера
- mobile переключается на карточки без общего overflow страницы
- modal создания и редактирования с полями каталога, цен, остатков и статуса
- отдельный modal редактора изображений с preview, `url`, `alt`, `sortOrder`, добавлением и удалением строк
- отдельный modal редактора характеристик с `name`, `value`, `unit`, `sortOrder`
- delete or archive confirm flow с feedback "Оборудование удалено или переведено в архив."
- loading, empty, error и success states на русском

### Фильтры и URL

Страница хранит состояние в `URLSearchParams`:

- `search`
- `categorySlug`
- `status`
- `isFeatured`
- `page`
- `limit`

Поведение:

- изменение фильтров сбрасывает `page` на `1`
- reset очищает весь query string
- список обновляется тихо, если пользователь уже работает со страницей

### Создание и редактирование

- форма валидирует обязательные поля `name`, `slug`, `categoryId`, `status`
- `dailyPrice`, `depositAmount`, `quantityTotal`, `quantityAvailable` не могут быть отрицательными
- `quantityAvailable` не может превышать `quantityTotal`
- `slug` автогенерируется из `name`, пока пользователь не начал редактировать его вручную
- создание использует пустые массивы `images` и `specs`, чтобы отдельные редакторы можно было открыть сразу после сохранения

### Изображения и характеристики

- редактор изображений полностью заменяет текущий набор через `PUT /api/equipment/:id/images`
- редактор характеристик полностью заменяет текущий набор через `PUT /api/equipment/:id/specs`
- оба редактора поддерживают add/remove row, локальную валидацию и сохранение без выхода со страницы

### Responsive behavior

- desktop: плотная operational table с быстрыми действиями в строке
- tablet: safe horizontal scroll остаётся внутри таблицы и не ломает layout
- mobile: карточки вместо таблицы, модалки помещаются в viewport
- ширина `320px` поддерживается без общего horizontal overflow

## AdminCategoriesPage

Страница `/admin/categories` теперь управляет разделами каталога в том же admin-стиле.

### Подключённые endpoints

- `GET /api/categories`
- `POST /api/categories`
- `PATCH /api/categories/:id`
- `DELETE /api/categories/:id`

### Что реализовано

- page header с итоговым счётчиком и CTA "Добавить категорию"
- toolbar с `search`, `limit` и reset
- таблица категорий с `name`, `slug`, `description`, `iconName`, действиями
- mobile-представление через карточки
- modal создания и редактирования категории
- auto-slug из `name`, пока slug не изменён вручную
- delete confirm с обработкой серверной ошибки, если категория уже используется
- loading, empty, error и success states на русском

### Search params

Страница хранит состояние в `URLSearchParams`:

- `search`
- `page`
- `limit`

### Поведение удаления

- если категория не связана с оборудованием, она удаляется
- если backend возвращает конфликт использования, frontend показывает сообщение:
  - "Категорию нельзя удалить, пока к ней привязано оборудование."

### Protected admin flow

- `/admin/equipment` и `/admin/categories` находятся под `AdminRoute`
- пользователь без token перенаправляется на `/login`
- пользователь без роли `ADMIN` перенаправляется на `/`
- администратор получает доступ к обоим маршрутам через `AdminLayout`
