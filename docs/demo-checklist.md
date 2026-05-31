# Demo checklist

## Перед показом

1. Выполнить `npm run prisma:seed --workspace server`.
2. Выполнить `npm run prisma:backup --workspace server`.
3. Запустить API: `npm run dev:server`.
4. Запустить frontend: `npm run dev:client`.
5. Проверить `http://localhost:4000/api/health`.
6. Открыть `http://localhost:5173`.

## Демо-учётки

- клиент: `ivan.petrov@buildrent.local` / `Client12345!`
- администратор: `admin@buildrent.local` / `Admin12345!`

## Сценарий показа: гость

1. Главная страница `/`: показать hero-блок, категории и витрину оборудования.
2. Каталог `/catalog`: показать поиск, фильтры, сортировку и пагинацию.
3. Карточка оборудования `/equipment/:slug`: показать галерею, характеристики, похожие позиции и отзывы.
4. Защита маршрутов: открыть `/favorites` или `/orders` без авторизации и показать редирект на `/login`.

## Сценарий показа: клиент

1. Войти через быстрый demo-доступ на `/login`.
2. Добавить позицию в избранное и открыть `/favorites`.
3. Открыть карточку техники и перейти в `/checkout`.
4. Показать расчёт аренды, адрес доставки, комментарий и успешное создание заявки.
5. Открыть `/orders` и `/orders/:id`, показать статусы, состав заявки и документы.
6. Открыть `/profile` и `/reports`, показать редактирование профиля и историю отчётов.
7. Попробовать открыть `/admin` и показать защиту роли с редиректом на `/`.

## Сценарий показа: администратор

1. Войти как `admin@buildrent.local`.
2. Открыть `/admin` и показать сводку по заявкам.
3. Открыть `/admin/orders`: фильтры, детали, смену статуса, комментарий менеджера.
4. Открыть `/admin/equipment`: фильтры, редактирование позиции, изображения, характеристики.
5. Открыть `/admin/categories`: поиск, создание или редактирование категории.
6. Открыть `/admin/users`: фильтры, карточку пользователя, блокировку.
7. Открыть `/admin/reviews`: модерацию публикации и редактирование текста.
8. Открыть `/admin/reports`: фильтры, генерацию отчёта и скачивание.

## Что держать под рукой

- README: [README.md](C:\Users\oneye\Documents\BuildRent\README.md)
- краткое резюме: [project-summary.md](C:\Users\oneye\Documents\BuildRent\docs\project-summary.md)
- backup базы: [buildrent_seed_backup.json](C:\Users\oneye\Documents\BuildRent\server\prisma\backups\buildrent_seed_backup.json)

## Если что-то пошло не так

1. Перезапустить сервер и frontend.
2. Снова выполнить `npm run prisma:seed --workspace server`.
3. Проверить, что API отвечает по `/api/health`.
4. Очистить `localStorage` браузера и повторить вход.
