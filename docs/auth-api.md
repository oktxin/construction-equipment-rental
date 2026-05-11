# BuildRent Authentication API

## Overview

This document describes the authentication and user access layer of BuildRent. The backend currently supports:

- client registration
- user login
- current user lookup
- role-based access control
- admin-protected user listing and blocking

## Roles

- `ADMIN` — full access to administrative endpoints
- `CLIENT` — regular authenticated user

## Authorization Model

The API uses JWT Bearer access tokens.

Example header:

```text
Authorization: Bearer <token>
```

Protected endpoints require a valid token. Role-restricted endpoints also require a matching role.

## Endpoints

### `POST /api/auth/register`

Registers a new client user.

Example request:

```json
{
  "fullName": "Иван Иванов",
  "email": "ivan@example.com",
  "phone": "+375291234567",
  "password": "Password123!"
}
```

Example success response:

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "clx...",
      "fullName": "Иван Иванов",
      "email": "ivan@example.com",
      "phone": "+375291234567",
      "avatarUrl": null,
      "isBlocked": false,
      "createdAt": "2026-05-31T12:00:00.000Z",
      "updatedAt": "2026-05-31T12:00:00.000Z",
      "role": {
        "id": "clx...",
        "name": "CLIENT",
        "description": "Client who can browse catalog and place rental orders"
      }
    },
    "token": "<jwt>"
  }
}
```

Possible errors:

- `400` validation error
- `409` email already exists
- `500` missing role configuration

### `POST /api/auth/login`

Authenticates an existing user.

Example request:

```json
{
  "email": "ivan@example.com",
  "password": "Password123!"
}
```

Example success response:

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clx...",
      "fullName": "Иван Иванов",
      "email": "ivan@example.com",
      "phone": "+375291234567",
      "avatarUrl": null,
      "isBlocked": false,
      "createdAt": "2026-05-31T12:00:00.000Z",
      "updatedAt": "2026-05-31T12:00:00.000Z",
      "role": {
        "id": "clx...",
        "name": "CLIENT",
        "description": "Client who can browse catalog and place rental orders"
      }
    },
    "token": "<jwt>"
  }
}
```

Possible errors:

- `400` validation error
- `401` invalid email or password
- `403` blocked user

### `GET /api/auth/me`

Returns the current authorized user.

Requires:

```text
Authorization: Bearer <token>
```

Example success response:

```json
{
  "status": "success",
  "message": "Current user fetched successfully",
  "data": {
    "id": "clx...",
    "fullName": "Иван Иванов",
    "email": "ivan@example.com",
    "phone": "+375291234567",
    "avatarUrl": null,
    "isBlocked": false,
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z",
    "role": {
      "id": "clx...",
      "name": "CLIENT",
      "description": "Client who can browse catalog and place rental orders"
    }
  }
}
```

Possible errors:

- `401` missing or invalid token
- `403` blocked user
- `404` user not found

### `GET /api/users`

Admin-only protected route example.

Supports query params:

- `search`
- `role`
- `isBlocked`
- `page`
- `limit`

Example request:

```text
GET /api/users?role=CLIENT&page=1&limit=10
```

Possible errors:

- `401` missing token
- `403` role is not allowed

### `GET /api/users/:id`

Accessible by:

- `ADMIN`
- the same authenticated user

### `PATCH /api/users/:id`

Accessible by:

- `ADMIN`
- the same authenticated user

Notes:

- regular clients cannot elevate roles or change `isBlocked`
- admins may update `roleId` and `isBlocked`

### `PATCH /api/users/:id/block`

Admin-only endpoint to block or unblock a user.

Example request:

```json
{
  "isBlocked": true
}
```

## Middleware

### `authMiddleware`

- extracts Bearer token from `Authorization`
- verifies JWT
- adds `req.user`
- returns `401` for missing or invalid token

### `roleMiddleware`

- checks the current authenticated role
- returns `403` for forbidden access

## Error Format

Errors return JSON in a shared structure:

```json
{
  "status": "error",
  "message": "Validation failed",
  "details": {}
}
```

Common statuses:

- `400` validation error
- `401` unauthorized
- `403` forbidden
- `404` not found
- `409` conflict
- `500` internal server error
