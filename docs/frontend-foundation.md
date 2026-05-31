# Frontend Foundation

## Что уже собрано

На текущем этапе BuildRent уже получил рабочий frontend-каркас без попытки преждевременно достроить весь продуктовый интерфейс.

Сейчас в проекте есть:

- дизайн-токены и глобальная тема;
- shared UI-компоненты;
- public, auth и admin layouts;
- маршруты для публичной, клиентской и административной частей;
- protected routes и admin-only routes;
- API client с Bearer token interceptor;
- auth state на Redux Toolkit;
- набор аккуратных placeholder-страниц;
- русифицированный базовый home shell.

## Русский язык интерфейса

Фронтенд теперь ориентирован на русский язык по умолчанию.

Переведены:

- Header;
- Footer;
- MobileNav;
- AdminSidebar;
- AdminTopbar;
- AuthLayout;
- LoginPage;
- RegisterPage;
- HomePage;
- все placeholder-страницы public/client/admin;
- NotFoundPage;
- тексты по умолчанию внутри `FoundationPlaceholder`;
- ошибки auth-state, которые могут всплывать в UI.

Навигационные подписи приведены к одному словарю:

- `Главная`
- `Каталог`
- `Как это работает`
- `Избранное`
- `Мои заявки`
- `Профиль`
- `Войти`
- `Регистрация`
- `Выйти`
- `Обзор`
- `Оборудование`
- `Категории`
- `Заявки`
- `Пользователи`
- `Отзывы`
- `Отчеты`

## Статусы и русские labels

Добавлен helper `client/src/shared/utils/statusLabels.ts`.

В нем собраны русские подписи для:

- `EquipmentStatus`
- `OrderStatus`
- `PaymentStatus`
- `DeliveryType`
- `ReportType`
- `ReportFormat`

`StatusBadge` теперь получает русскую подпись через этот helper и поддерживает контекст статуса, чтобы одинаковые коды вроде `PENDING` могли отображаться корректно для разных доменов.

Примеры:

- `AVAILABLE -> Доступно`
- `MAINTENANCE -> На обслуживании`
- `PENDING (order) -> Ожидает подтверждения`
- `PENDING (payment) -> Ожидает оплаты`
- `ACTIVE (order) -> Активна`
- `PDF -> PDF`

## Исправление auth layout

Auth-shell приведен к более устойчивой адаптивной схеме:

- левая брендовая колонка остается только на `lg+`;
- на mobile и tablet остается одна компактная карточка;
- у auth-card есть `min-w-0`, уменьшенный базовый padding и безопасная ширина;
- в `/login` и `/register` кнопки и блоки больше не выталкивают контент вправо;
- `Демо-доступ` больше не ломает layout и теперь полезен: он подставляет демонстрационные данные в поля формы.

Login и register страницы также получили:

- русские заголовки и описания;
- русские labels для всех полей;
- понятные переходы `Нет аккаунта? Зарегистрироваться` и `Уже есть аккаунт? Войти`;
- компактные демо-блоки без горизонтального переполнения.

## Проверка адаптива auth pages

После правок auth-страницы проверяются в нескольких состояниях:

- desktop;
- tablet;
- mobile;
- ширина `320px`.

Критерии проверки:

- нет горизонтального скролла;
- форма остается читаемой;
- поля и кнопки не вылезают за границы карточки;
- split-screen корректно работает на desktop;
- mobile-версия остается одним цельным карточным экраном.

## Layouts и маршруты

### PublicLayout

- теплый светлый фон;
- атмосферные индустриальные пятна в фоне;
- header, main, footer;
- без горизонтального overflow.

### AuthLayout

- split-screen на desktop;
- крупный brand-block слева;
- auth-card справа;
- единая карточка на mobile.

### AdminLayout

- темная operational-оболочка;
- responsive sidebar;
- topbar;
- контентная зона под data-heavy экраны.

### Public routes

- `/`
- `/catalog`
- `/equipment/:slug`
- `/login`
- `/register`
- `/404`

### Protected client routes

- `/favorites`
- `/orders`
- `/orders/:id`
- `/reports`
- `/profile`
- `/checkout`

### Admin routes

- `/admin`
- `/admin/equipment`
- `/admin/categories`
- `/admin/orders`
- `/admin/users`
- `/admin/reviews`
- `/admin/reports`

## Что дальше

Логичный следующий этап:

1. Подключить реальные submit-flow для `login` и `register`.
2. Начать наполнять `CatalogPage` живыми фильтрами и карточками техники.
3. Собрать `EquipmentDetailPage` и `CheckoutPage` поверх уже русифицированного UI-слоя.
4. Подключить клиентские и admin-экраны к реальному backend API.

## Реальный auth-flow

Теперь frontend использует живой сценарий авторизации поверх backend API:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me`

Что реализовано:

- login и register формы переведены на `react-hook-form` + `zod`;
- token сохраняется в `localStorage` по ключу `buildrent.auth.token`;
- `apiClient` автоматически добавляет `Authorization: Bearer <token>`;
- `AuthBootstrap` при старте приложения пытается восстановить сессию через `GET /api/auth/me`;
- если `fetchMe` возвращает `401`, token очищается без зависания интерфейса;
- `logout` очищает Redux auth-state и `localStorage`, затем возвращает пользователя на `/`;
- ошибки backend нормализуются в понятные русские сообщения.

## Login / Register

`/login` теперь поддерживает:

- реальные submit-запросы в backend;
- loading и disabled state на кнопках;
- русские ошибки валидации;
- русское сообщение об ошибке входа;
- demo-вход как клиент и как администратор;
- возврат на защищённый маршрут после успешного входа, если пользователь пришёл с него.

`/register` теперь поддерживает:

- полную форму `fullName`, `email`, `phone`, `password`, `confirmPassword`;
- валидацию совпадения паролей;
- success feedback после регистрации;
- автоматический вход после успешного создания аккаунта;
- редирект в каталог после регистрации.

## Demo-доступ

Для проверки auth-flow доступны demo-учётки:

- клиент: `ivan.petrov@buildrent.local` / `Client12345!`
- администратор: `admin@buildrent.local` / `Admin12345!`

Форма регистрации также умеет быстро подставлять пример нового профиля с уникальным email для повторяемых тестов.

## Protected Routes

Поведение маршрутов теперь такое:

- `ProtectedRoute` ждёт завершения auth initialization и не редиректит раньше времени;
- при попытке открыть защищённый клиентский маршрут без авторизации пользователь уходит на `/login`;
- исходный маршрут сохраняется в `location.state.from`, чтобы вернуть клиента после логина;
- `AdminRoute` отдельно проверяет наличие роли `ADMIN`;
- пользователь без admin-прав не попадает в `/admin`.
