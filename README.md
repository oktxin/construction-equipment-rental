# BuildRent

BuildRent is a coursework project for building an online platform to rent construction equipment. The platform will combine a public catalog, customer rental flow, personal account, and an admin area for equipment, orders, users, and reports.

## Project Materials

- Architecture plan: [docs/architecture-plan.md](docs/architecture-plan.md)
- Google Docs reference: https://docs.google.com/document/d/1fMx8kRFZ0IwHiYF-MDHM7ZCR3fo7Ycgh/edit?usp=sharing&ouid=106355912309267225557&rtpof=true&sd=true

## Tech Stack

- Frontend: React, TypeScript, Vite, React Router, Redux Toolkit, Axios, Tailwind CSS, React Hook Form, Zod
- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL, dotenv, cors, helmet, morgan, bcrypt, jsonwebtoken

## Project Structure

```text
BuildRent/
  client/   # React + Vite frontend
  server/   # Express + Prisma backend
  docs/     # Architecture and project docs
```

## Environment Variables

1. Copy `.env.example` to `.env` in the project root.
2. Adjust values if needed.

The frontend Vite config reads variables from the project root, and the backend also loads the root `.env`.

## Run Commands

### Install dependencies

```bash
npm install
```

### Run client

```bash
npm run dev:client
```

### Run server

```bash
npm run dev:server
```

### Type check all workspaces

```bash
npm run typecheck
```

### Build all workspaces

```bash
npm run build
```

## Database Setup

1. Create PostgreSQL database `buildrent`.
2. Copy `.env.example` to `.env`.
3. Make sure `DATABASE_URL` points to your local PostgreSQL instance.

### Generate Prisma Client

```bash
npm run prisma:generate --workspace server
```

### Apply Prisma migrations

```bash
npm run prisma:migrate --workspace server
```

### Open Prisma Studio

```bash
npm run prisma:studio --workspace server
```

### Seed base roles and admin

```bash
npm run prisma:seed --workspace server
```

On a clean database, the seed creates a full demo dataset for testing:

- 2 roles
- 13 users (1 admin + 12 clients)
- 9 categories
- 45 equipment records
- 90 equipment images
- 180 equipment specs
- 35 rental orders with mixed statuses
- 30 favorites
- 40 reviews
- 20 payments
- 10 reports

On a clean database the seed produces 500+ records in total and is safe to re-run because it uses stable identifiers and replaces only its own test data.

Test accounts:

- `admin@buildrent.local` / `Admin12345!`
- any seeded client account / `Client12345!`

The default administrator can still be configured through environment variables:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_FULL_NAME`

### Create JSON backup

```bash
npm run prisma:backup --workspace server
```

This creates `server/prisma/backups/buildrent_seed_backup.json`.

If `pg_dump` is available in your environment, the same script also attempts to create:

`server/prisma/backups/buildrent_seed_backup.sql`

## Database Seed And Backup

Use these commands after migrations are applied:

```bash
npm run prisma:seed --workspace server
npm run prisma:backup --workspace server
```

The seed prints the actual current database totals to the console after completion, and the backup script exports the main tables for demonstration or restore-oriented review.

## Frontend Design Concept

The frontend visual direction, UI-kit rules, layout system, and implementation roadmap are documented in [docs/frontend-design-concept.md](docs/frontend-design-concept.md).

## Frontend Foundation

The first frontend foundation pass now includes:

- theme tokens and global styles
- public, auth, and admin layouts
- protected and admin-only routes
- shared UI building blocks
- auth state with token persistence
- placeholder pages for public, client, and admin flows

Frontend documentation:

- [docs/frontend-foundation.md](docs/frontend-foundation.md)
- [docs/frontend-public-pages.md](docs/frontend-public-pages.md)

Main frontend routes currently prepared:

- `/`
- `/catalog`
- `/equipment/:slug`
- `/login`
- `/register`
- `/favorites`
- `/orders`
- `/orders/:id`
- `/reports`
- `/profile`
- `/checkout`
- `/admin`
- `/admin/equipment`
- `/admin/categories`
- `/admin/orders`
- `/admin/users`
- `/admin/reviews`
- `/admin/reports`

Frontend environment:

- `VITE_API_URL=http://localhost:4000/api`

Public homepage:

- `/` now loads live categories from `GET /api/categories`
- `/` now loads featured equipment from `GET /api/equipment/featured`

Public catalog page:

- `/catalog` now loads live equipment from `GET /api/equipment`
- supports search, filters, sorting, pagination, and category deep links
- keeps catalog settings in `localStorage` under `buildrent.catalog.filters`
- syncs active catalog state with `URLSearchParams`

Equipment detail page:

- `/equipment/:slug` now loads live equipment details from `GET /api/equipment/:slug`
- supports image gallery, technical specs, reviews, favorite toggle, similar equipment, and CTA to `/checkout?equipmentId=...`
- uses favorites endpoints `GET /api/favorites/check/:equipmentId`, `POST /api/favorites/:equipmentId`, `DELETE /api/favorites/:equipmentId`
- loads public reviews from `GET /api/reviews/equipment/:equipmentId`

Checkout page:

- `/checkout` is protected by `ProtectedRoute` and now opens a live rental checkout flow
- loads the selected equipment from `GET /api/equipment/by-id/:id`
- calculates totals via `POST /api/rental-orders/calculate`
- creates rental orders via `POST /api/rental-orders`
- shows a success state with a link to `/orders`

Run frontend locally:

```bash
npm run dev:client
```

## Frontend Auth Flow

The frontend auth flow is now connected to the backend API and includes:

- live `login`, `register`, and `fetch me` requests
- session bootstrap from `localStorage`
- protected client routes and admin-only routes
- logout with full token cleanup
- normalized Russian error messages for auth forms

Demo access:

- client: `ivan.petrov@buildrent.local` / `Client12345!`
- admin: `admin@buildrent.local` / `Admin12345!`

Redirect behavior:

- admin users go to `/admin` after login
- client users return to the protected route they originally requested when possible
- otherwise clients go to `/catalog`

Token storage:

- `localStorage` key: `buildrent.auth.token`

## Authentication API

Authentication is implemented with JWT Bearer access tokens.

### Authorization header

```text
Authorization: Bearer <token>
```

### Main endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users`
- `GET /api/users/:id`
- `PATCH /api/users/:id`
- `PATCH /api/users/:id/block`

### Create admin user

1. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_FULL_NAME` in `.env`.
2. Run:

```bash
npm run prisma:seed --workspace server
```

## Catalog API

The backend now includes public catalog and admin catalog management endpoints.

### Public endpoints

- `GET /api/categories`
- `GET /api/categories/:slug`
- `GET /api/equipment`
- `GET /api/equipment/featured`
- `GET /api/equipment/by-id/:id`
- `GET /api/equipment/:slug`

### Admin catalog endpoints

- `POST /api/categories`
- `PATCH /api/categories/:id`
- `DELETE /api/categories/:id`
- `POST /api/equipment`
- `PATCH /api/equipment/:id`
- `PUT /api/equipment/:id/images`
- `PUT /api/equipment/:id/specs`
- `DELETE /api/equipment/:id`

### Catalog filters

- `search`
- `categorySlug`
- `minPrice`
- `maxPrice`
- `status`
- `isFeatured`
- `sortBy`
- `sortOrder`
- `page`
- `limit`

### Sorting

- `name`
- `dailyPrice`
- `createdAt`
- `popularity`
- `rating`

Detailed examples are documented in [docs/catalog-api.md](docs/catalog-api.md).

## Rental Orders API

The backend now includes rental order calculation, customer rental flow, and admin order management.

### Main endpoints

- `POST /api/rental-orders/calculate`
- `POST /api/rental-orders`
- `GET /api/rental-orders/my`
- `GET /api/rental-orders/my/:id`
- `PATCH /api/rental-orders/:id/cancel`
- `GET /api/admin/rental-orders`
- `GET /api/admin/rental-orders/:id`
- `PATCH /api/admin/rental-orders/:id/status`
- `PATCH /api/admin/rental-orders/:id/comment`

### Status flow

- `PENDING -> APPROVED -> ACTIVE -> COMPLETED`
- `PENDING -> REJECTED`
- `PENDING -> CANCELLED`
- `APPROVED -> CANCELLED`

### Inventory strategy

- `PENDING` orders do not reserve inventory yet
- `APPROVED` reserves stock by decreasing `quantityAvailable`
- `APPROVED -> CANCELLED` returns stock
- `ACTIVE -> COMPLETED` returns stock

Detailed examples are documented in [docs/rental-orders-api.md](docs/rental-orders-api.md).

## Favorites and Reviews API

The backend now includes favorites and equipment reviews with moderation support.

### Main favorites endpoints

- `GET /api/favorites`
- `POST /api/favorites/:equipmentId`
- `DELETE /api/favorites/:equipmentId`
- `GET /api/favorites/check/:equipmentId`

### Main reviews endpoints

- `GET /api/reviews/equipment/:equipmentId`
- `POST /api/reviews`
- `PATCH /api/reviews/:id`
- `DELETE /api/reviews/:id`
- `GET /api/reviews/my`
- `GET /api/admin/reviews`
- `PATCH /api/admin/reviews/:id/publish`

### Behavior

- users can add and remove favorites only for themselves
- archived equipment cannot be added to favorites
- one user can leave only one review per equipment
- public reviews show only published entries
- admin can moderate review visibility
- `averageRating` and `reviewsCount` in catalog are based only on published reviews

Detailed examples are documented in [docs/favorites-reviews-api.md](docs/favorites-reviews-api.md).

## Reports API

The backend now includes downloadable reports for rental orders, rental history, and admin rental statistics.

### Available reports

- `ORDER_DOCUMENT`
- `RENTAL_HISTORY`
- `ADMIN_RENTAL_STATISTICS`

### Supported formats

- `PDF`
- `DOCX`

### Main endpoints

- `POST /api/reports/order/:orderId`
- `POST /api/reports/rental-history`
- `GET /api/reports/my`
- `GET /api/reports/:id/download`
- `POST /api/admin/reports/rental-statistics`
- `GET /api/admin/reports`
- `DELETE /api/admin/reports/:id`

### Storage

- generated files are stored in `server/uploads/reports`
- report metadata is saved in the `Report` table
- files are served through `/uploads`

Detailed examples are documented in [docs/reports-api.md](docs/reports-api.md).

## Health Check

After starting the server, open:

```text
http://localhost:4000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "BuildRent API is running"
}
```
