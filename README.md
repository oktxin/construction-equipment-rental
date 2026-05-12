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

The seed creates `ADMIN`, `CLIENT`, and a default administrator from environment variables:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_FULL_NAME`

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
