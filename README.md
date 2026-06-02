# BuildRent

BuildRent — курсовой fullstack-проект онлайн-платформы аренды строительного оборудования. Сервис объединяет публичный каталог техники, оформление аренды, личный кабинет клиента и административную панель для управления оборудованием, заявками, пользователями, отзывами и отчётами.

## Стек

- frontend: `React`, `TypeScript`, `Vite`, `React Router`, `Redux Toolkit`, `Axios`, `React Hook Form`, `Zod`, `Tailwind CSS`
- backend: `Node.js`, `Express`, `TypeScript`, `Prisma`, `PostgreSQL`
- документы: `PDF`, `DOCX`

## Запуск

```bash
npm install
npm run prisma:generate --workspace server
npm run prisma:migrate --workspace server
npm run prisma:seed --workspace server
npm run dev:server
npm run dev:client
```

Frontend по умолчанию работает на `http://localhost:5173`, API — на `http://localhost:4000/api`.

## База данных

- СУБД: `PostgreSQL`
- ORM: `Prisma`

## Демо-учётки

- клиент: `ivan.petrov@buildrent.local` / `Client12345!`
- администратор: `admin@buildrent.local` / `Admin12345!`

## Основные маршруты

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

## Основные возможности

- просмотр каталога, категорий и карточек оборудования;
- регистрация и авторизация пользователей;
- оформление аренды и расчёт стоимости;
- избранное, история заявок, профиль и отчёты клиента;
- управление оборудованием, категориями, пользователями, отзывами и отчётами в админ-панели;
- генерация и скачивание документов.
