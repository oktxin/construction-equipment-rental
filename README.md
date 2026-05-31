# BuildRent

BuildRent — курсовой проект онлайн-платформы аренды строительного оборудования. Репозиторий содержит готовый пользовательский каталог, личный кабинет клиента, административную панель и сервер API с демо-данными для показа.

## Что готово

- публичные страницы: главная, каталог, карточка оборудования, регистрация, вход, 404;
- клиентский кабинет: избранное, оформление аренды, список заявок, детальная страница заявки, профиль, отчёты;
- админ-зона: дашборд, управление заявками, оборудованием, категориями, пользователями, отзывами и отчётами;
- сервер на `Express + Prisma + PostgreSQL` с JWT-авторизацией, бизнес-правилами аренды и генерацией `PDF/DOCX`;
- идемпотентный seed и backup для воспроизводимого demo-сценария.

## Технологии

- frontend: `React`, `TypeScript`, `Vite`, `React Router`, `Redux Toolkit`, `Axios`, `React Hook Form`, `Zod`, `Tailwind CSS`;
- backend: `Node.js`, `Express`, `TypeScript`, `Prisma`, `PostgreSQL`, `JWT`, `bcrypt`, `cors`, `helmet`, `morgan`;
- документы: `pdfkit`, `docx`.

## Структура проекта

```text
BuildRent/
  client/   # Vite + React приложение
  server/   # Express API + Prisma
  docs/     # Архитектура, API и материалы к демо
```

## Быстрый старт

1. Установите зависимости:

```bash
npm install
```

2. При необходимости скопируйте `.env.example` в `.env`.

3. Подготовьте базу данных PostgreSQL `buildrent`.

4. Сгенерируйте Prisma Client и примените миграции:

```bash
npm run prisma:generate --workspace server
npm run prisma:migrate --workspace server
```

5. Заполните базу демо-данными:

```bash
npm run prisma:seed --workspace server
```

6. Запустите проект:

```bash
npm run dev:server
npm run dev:client
```

Frontend по умолчанию работает на `http://localhost:5173`, API — на `http://localhost:4000/api`.

## Основные команды

```bash
npm run typecheck
npm run build
npm run prisma:seed --workspace server
npm run prisma:backup --workspace server
```

## Демо-данные и учётки

После `npm run prisma:seed --workspace server` на чистой базе создаются:

- `2` роли;
- `13` пользователей;
- `9` категорий;
- `45` единиц оборудования;
- `35` заявок аренды;
- `30` избранных позиций;
- `40` отзывов;
- `20` платежей;
- `10` отчётов;
- всего `543` записи.

Seed повторяемый: он обновляет свои данные и очищает временные QA/demo-записи, старые `BR-SEED-*` заявки и ручные тестовые дубликаты.

Демо-доступ:

- клиент: `ivan.petrov@buildrent.local` / `Client12345!`
- администратор: `admin@buildrent.local` / `Admin12345!`

## Ключевые маршруты

Публичная часть:

- `/`
- `/catalog`
- `/equipment/:slug`
- `/login`
- `/register`

Клиент:

- `/favorites`
- `/checkout`
- `/orders`
- `/orders/:id`
- `/profile`
- `/reports`

Админ:

- `/admin`
- `/admin/orders`
- `/admin/equipment`
- `/admin/categories`
- `/admin/users`
- `/admin/reviews`
- `/admin/reports`

## Документация

- [Краткое резюме проекта](docs/project-summary.md)
- [Чек-лист для демонстрации](docs/demo-checklist.md)
- [Seed и backup](docs/seed-and-backup.md)
- [Архитектурный план](docs/architecture-plan.md)
- [Дизайн-концепция фронтенда](docs/frontend-design-concept.md)
- [Public pages](docs/frontend-public-pages.md)
- [Admin pages](docs/frontend-admin-pages.md)
- [Catalog API](docs/catalog-api.md)
- [Rental Orders API](docs/rental-orders-api.md)
- [Favorites & Reviews API](docs/favorites-reviews-api.md)
- [Reports API](docs/reports-api.md)

## Проверка API

После запуска сервера проверьте:

```text
http://localhost:4000/api/health
```

Ожидаемый ответ:

```json
{
  "status": "ok",
  "message": "BuildRent API is running"
}
```
