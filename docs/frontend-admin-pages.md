# Frontend Admin Pages

## AdminDashboardPage

Страница `/admin` теперь использует живые данные из admin rental orders API и показывает operational-first сводку без лишних графиков.

### Подключённые endpoints

- `GET /api/admin/rental-orders`

### Что реализовано

- page header с заголовком "Панель администратора" и переходом к списку заявок
- шесть KPI-карточек:
  - всего заявок
  - ожидают подтверждения
  - активные аренды
  - завершённые
  - отменённые и отклонённые
  - общая сумма заявок
- блок "Последние заявки" с быстрым переходом в detail panel через `/admin/orders?selected=<id>`
- блок quick actions для заявок, оборудования, отзывов и отчётов
- loading, empty и error states на русском

### Как считаются dashboard stats

- страница сначала запрашивает `GET /api/admin/rental-orders?page=1&limit=100&sortBy=createdAt&sortOrder=desc`
- если backend сообщает больше одной страницы, frontend догружает остальные страницы тем же endpoint
- статистика считается локально по агрегированному массиву заявок, без новых backend endpoints
- общая сумма считается как сумма `totalPrice` по доступным администратору заявкам

## AdminOrdersPage

Страница `/admin/orders` стала рабочим центром для обработки заявок.

### Подключённые endpoints

- `GET /api/admin/rental-orders`
- `GET /api/admin/rental-orders/:id`
- `PATCH /api/admin/rental-orders/:id/status`
- `PATCH /api/admin/rental-orders/:id/comment`

### Что реализовано

- page header с описанием рабочего сценария
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
- status update flow с select допустимых переходов, manager comment и success/error feedback
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
- дополнительный внутренний параметр `selected` используется для открытия detail panel по конкретной заявке

Поведение:

- изменение фильтров сбрасывает `page` на `1`
- reset очищает URL целиком
- dashboard может открыть заявку сразу в detail panel через `selected`

### Detail panel

Detail panel показывает:

- номер заявки
- текущий статус
- клиента, email и телефон
- даты аренды и дату создания
- тип получения и адрес доставки
- комментарий клиента
- текущий комментарий менеджера
- список оборудования
- totals по заявке
- таймлайн статуса
- форму обновления статуса
- форму сохранения комментария менеджера

### Status update flow

- менеджер выбирает новый статус из `AdminOrderStatusSelect`
- доступны только допустимые переходы:
  - `PENDING -> APPROVED | REJECTED | CANCELLED`
  - `APPROVED -> ACTIVE | CANCELLED`
  - `ACTIVE -> COMPLETED`
- после `PATCH /api/admin/rental-orders/:id/status` frontend:
  - обновляет detail panel
  - обновляет строку в списке
  - делает тихий refresh списка, чтобы корректно отработали активные фильтры
- ошибки backend нормализуются в русский текст через `getErrorMessage`

### Manager comment flow

- отдельная форма отправляет `PATCH /api/admin/rental-orders/:id/comment`
- после успеха detail panel сразу получает обновлённую заявку
- текущий комментарий синхронизируется и в форме статуса, и в отдельной форме комментария

### Protected admin flow

- `/admin` и `/admin/orders` находятся под `AdminRoute`
- без token пользователь перенаправляется на `/login`
- пользователь без роли `ADMIN` перенаправляется на `/`
- администратор получает доступ к `AdminLayout` и обоим маршрутам

### Responsive behavior

- desktop: список работает как плотная операционная таблица, detail panel открывается справа
- tablet: таблица остаётся в контейнере без общего overflow страницы
- mobile: список переключается в карточки, detail panel становится full-width overlay
- ширина `320px` поддерживается без общего horizontal overflow
