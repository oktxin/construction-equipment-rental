# Frontend Foundation

## Что реализовано

На этом этапе собран фундамент frontend-части BuildRent, без попытки досрочно реализовать весь продуктовый интерфейс.

Сейчас готовы:

- дизайн-токены и глобальная тема;
- глобальные стили и типографика;
- shared UI-компоненты;
- public, auth и admin layouts;
- маршруты public/client/admin;
- protected routes и admin-only routes;
- API client с Bearer token interceptor;
- auth state на Redux Toolkit;
- набор красивых страниц-заглушек;
- базовая home shell для публичной части.

## Theme tokens

В тему перенесены ключевые токены из `docs/frontend-design-concept.md`:

- `background`
- `foreground`
- `primary`
- `secondary`
- `accent`
- `muted`
- `border`
- `danger`
- `success`
- `warning`
- `card`
- `card-hover`
- `admin-background`
- `admin-surface`

Токены добавлены как CSS variables и подключены в Tailwind-конфиг.

## Layouts

### PublicLayout

- тёплый светлый фон;
- industrial ambient background;
- header;
- main content area;
- footer;
- no horizontal overflow.

### AuthLayout

- split-screen на desktop;
- слева брендовый визуальный блок;
- справа auth card;
- на mobile остаётся компактная карточка.

### AdminLayout

- тёмная рабочая оболочка;
- responsive sidebar;
- topbar;
- content area для будущих data-heavy экранов.

## Routes

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

## Protected routes

### ProtectedRoute

- если auth ещё инициализируется, показывает loading shell;
- если нет `token` и `user`, перенаправляет на `/login`;
- если пользователь авторизован, рендерит вложенный route.

### AdminRoute

- если auth загружается, показывает admin loading shell;
- если пользователь не авторизован, редиректит на `/login`;
- если роль не `ADMIN`, редиректит на `/`;
- только ADMIN получает доступ к `/admin/*`.

## Auth state

В `features/auth` подготовлены:

- `authSlice.ts`
- `authApi.ts`
- `authTypes.ts`

Текущее поведение:

- хранение `token`;
- хранение `user`;
- `login`;
- `register`;
- `fetchMe`;
- `logout`;
- восстановление token из `localStorage`;
- сохранение token в `localStorage`;
- удаление token при logout или невалидной сессии;
- автоматическая инициализация auth в `AppProviders`.

## Shared UI components

Подготовлены:

- `Button`
- `Input`
- `Select`
- `Badge`
- `StatusBadge`
- `Card`
- `Modal`
- `EmptyState`
- `LoadingSkeleton`
- `PageHeader`
- `Breadcrumbs`

Они уже поддерживают:

- variants;
- className override;
- public/admin visual tones;
- hover/focus/active states;
- аккуратную типографику и shape-system из дизайн-концепции.

## Public/Admin split

### Public

- светлый бетонный фон;
- тёплые строительные акценты;
- более воздушные блоки;
- image-first and CTA-friendly surfaces.

### Admin

- тёмный графитовый фон;
- плотные operational surfaces;
- меньше декоративности;
- больше control-oriented hierarchy.

## Страницы-заглушки

Сейчас добавлены foundation pages для:

- Home
- Catalog
- Equipment detail
- Login
- Register
- Favorites
- My orders
- Order detail
- Reports
- Profile
- Checkout
- Admin dashboard
- Admin equipment
- Admin categories
- Admin orders
- Admin users
- Admin reviews
- Admin reports
- 404

Это ещё не финальные продуктовые страницы, а аккуратные shells под дальнейшую реализацию.

## Что дальше

Следующими логичными этапами остаются:

1. Реализация auth forms и full login/register UX.
2. Реализация public home page уже с контентной детализацией.
3. Реализация catalog page с фильтрами, сортировкой и пагинацией.
4. Реализация equipment detail page.
5. Реализация checkout flow.
6. Реализация client pages с реальными API.
7. Реализация admin data views и report UI.
