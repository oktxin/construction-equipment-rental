# Seed и backup

## Назначение

`server/prisma/seed.ts` подготавливает стабильную demo-базу для показа курсового проекта, ручной проверки сценариев и повторяемой локальной разработки.

Seed рассчитан на повторный запуск. Он не только обновляет свои записи, но и очищает временные QA/demo-данные:

- тестовые пользователи с адресами `@example.com`;
- служебные учётки вида `codex.auth.*`;
- старые заявки с префиксом `BR-SEED-*`;
- ручные временные категории и оборудование;
- дубликаты, созданные через админку поверх seed-позиций.

## Что создаётся на чистой базе

- роли: `2`
- пользователи: `13`
- категории: `9`
- оборудование: `45`
- изображения оборудования: `90`
- характеристики: `180`
- заявки аренды: `35`
- позиции в заявках: `69`
- избранное: `30`
- отзывы: `40`
- платежи: `20`
- отчёты: `10`
- всего записей: `543`

В seed присутствуют разные статусы заявок:

- `PENDING`
- `APPROVED`
- `ACTIVE`
- `COMPLETED`
- `CANCELLED`
- `REJECTED`

И разные состояния оборудования:

- `AVAILABLE`
- `UNAVAILABLE`
- `MAINTENANCE`
- `ARCHIVED`

## Демо-учётки

- администратор: `admin@buildrent.local` / `Admin12345!`
- клиенты: подготовленные seed-аккаунты / `Client12345!`

При необходимости администратора можно переопределить переменными:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_FULL_NAME`

## Команды

Заполнение базы:

```bash
npm run prisma:seed --workspace server
```

Создание backup:

```bash
npm run prisma:backup --workspace server
```

## Что выводит seed

После завершения seed печатает фактические текущие счётчики базы. Это удобно для быстрого контроля перед демо и после повторного прогона.

Пример формата вывода:

```text
Seed completed:
- roles: 2
- users: 13
- categories: 9
- equipment: 45
- equipmentImages: 90
- equipmentSpecs: 180
- rentalOrders: 35
- rentalOrderItems: 69
- favorites: 30
- reviews: 40
- payments: 20
- reports: 10
- total records: 543
```

## Что создаёт backup

Backup-скрипт сохраняет:

- `server/prisma/backups/buildrent_seed_backup.json`
- `server/prisma/backups/buildrent_seed_backup.sql` — если в системе доступен `pg_dump`

JSON-дамп удобен для:

- быстрой проверки наполненности базы;
- показа структуры данных без Prisma Studio;
- сравнения состояния после повторных запусков.

SQL-дамп удобен для:

- восстановления снимка в PostgreSQL;
- хранения проверяемого артефакта вместе с репозиторием.

## Что стоит проверить после seed

- `GET /api/categories`
- `GET /api/equipment`
- `GET /api/equipment/featured`
- `GET /api/rental-orders/my`
- `GET /api/admin/rental-orders`
- `GET /api/admin/reports`
