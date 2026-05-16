# Seed And Backup

## Goal

The BuildRent seed prepares a predictable demo database for coursework presentation, backend testing, and manual API checks.

The dataset is intentionally large enough to exceed the coursework requirement of 200 total records. On a clean database the seed creates more than 500 records.

## What The Seed Creates On A Clean Database

- roles: 2
- users: 13
- categories: 9
- equipment: 45
- equipment images: 90
- equipment specs: 180
- rental orders: 35
- favorites: 30
- reviews: 40
- payments: 20
- reports: 10

The rental orders include the following statuses:

- `PENDING`
- `APPROVED`
- `ACTIVE`
- `COMPLETED`
- `CANCELLED`
- `REJECTED`

The equipment catalog includes mixed statuses as well:

- `AVAILABLE`
- `UNAVAILABLE`
- `MAINTENANCE`
- `ARCHIVED`

## Test Accounts

- admin: `admin@buildrent.local` / `Admin12345!`
- clients: seeded client emails / `Client12345!`

The admin account can still be overridden with:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_FULL_NAME`

## Idempotency

The seed is designed to be re-runnable:

- roles, users, categories, and equipment use stable unique identifiers
- seeded rental orders use the `BR-SEED-` prefix
- seeded reports use the `Seed:` title prefix
- seeded favorites and reviews are recreated only for seeded client accounts
- seeded images and specs are fully replaced for seeded equipment

Running the seed again should refresh the same demo dataset instead of creating uncontrolled duplicates.

## Run The Seed

```bash
npm run prisma:seed --workspace server
```

After completion, the script prints a summary of the actual current database totals, for example:

```text
Seed completed:
- roles: X
- users: X
- categories: X
- equipment: X
- equipmentImages: X
- equipmentSpecs: X
- rentalOrders: X
- rentalOrderItems: X
- favorites: X
- reviews: X
- payments: X
- reports: X
- total records: X
```

## Create Backup

```bash
npm run prisma:backup --workspace server
```

The backup script exports the main tables into:

- `server/prisma/backups/buildrent_seed_backup.json`

If `pg_dump` is available in `PATH`, it also tries to generate:

- `server/prisma/backups/buildrent_seed_backup.sql`

## How To Use The Backup

The JSON backup is useful for:

- demonstrating that the database is populated
- checking exact seeded records without opening Prisma Studio
- comparing database state after repeated seed runs

The SQL backup, when available, is useful for:

- restoring the same snapshot into PostgreSQL
- keeping a database dump next to the repository for review

## Manual Verification Targets

After seeding, the following endpoints should return meaningful data:

- `GET /api/categories`
- `GET /api/equipment`
- `GET /api/equipment/featured`
- `GET /api/reviews/equipment/:equipmentId`
- `GET /api/admin/rental-orders`
- `GET /api/admin/reports`
