# Favorites and Reviews API

This document describes backend endpoints for favorites and equipment reviews.

## Authorization

Use Bearer token for protected endpoints:

```text
Authorization: Bearer <token>
```

Access rules:

- public: published equipment reviews
- `CLIENT` and `ADMIN`: favorites, create review, edit own review, delete own review, get my reviews
- `ADMIN`: moderation list and publish/hide review endpoint

## Favorites

### Get favorites

```http
GET /api/favorites?page=1&limit=10
```

Protected: `CLIENT`, `ADMIN`

Response:

```json
{
  "status": "success",
  "message": "Favorites fetched successfully",
  "data": {
    "items": [
      {
        "id": "cmb8favorite1",
        "createdAt": "2026-05-16T09:00:00.000Z",
        "equipment": {
          "id": "cmb8equipment1",
          "name": "Wacker Neuson VP1550",
          "slug": "wacker-neuson-vp1550",
          "shortDescription": "Compact plate compactor",
          "dailyPrice": 45,
          "depositAmount": 300,
          "status": "AVAILABLE",
          "quantityAvailable": 4,
          "category": {
            "id": "cmb8category1",
            "name": "Compactors",
            "slug": "compactors",
            "iconName": "compactor"
          },
          "mainImage": {
            "id": "cmb8image1",
            "url": "https://example.com/image.jpg",
            "alt": "Wacker compactor",
            "sortOrder": 1
          },
          "averageRating": 4.5,
          "reviewsCount": 10
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

### Add to favorites

```http
POST /api/favorites/:equipmentId
```

Protected: `CLIENT`, `ADMIN`

Rules:

- equipment must exist
- archived equipment cannot be added
- repeated `POST` does not create duplicate
- if favorite already exists, API returns success with existing record

### Remove from favorites

```http
DELETE /api/favorites/:equipmentId
```

Protected: `CLIENT`, `ADMIN`

Behavior:

- removal is idempotent
- if record does not exist, API still returns success and explains that the item is already absent

### Check favorite state

```http
GET /api/favorites/check/:equipmentId
```

Protected: `CLIENT`, `ADMIN`

Response:

```json
{
  "status": "success",
  "message": "Favorite status fetched successfully",
  "data": {
    "isFavorite": true
  }
}
```

## Reviews

### Public published reviews

```http
GET /api/reviews/equipment/:equipmentId?page=1&limit=10&sortBy=createdAt&sortOrder=desc&rating=5
```

Public endpoint.

Behavior:

- returns only `isPublished=true`
- user fields are limited to `id`, `fullName`, `avatarUrl`
- no password hash is ever returned

### Create review

```http
POST /api/reviews
```

Protected: `CLIENT`, `ADMIN`

Request:

```json
{
  "equipmentId": "cmb8equipment1",
  "rating": 5,
  "text": "Оборудование в хорошем состоянии, аренду оформили быстро и без проблем."
}
```

Rules:

- equipment must exist
- archived equipment cannot receive review
- rating must be from `1` to `5`
- text length must be from `10` to `1000`
- one user can leave only one review per equipment
- duplicate review attempt returns `409`
- new review is created with `isPublished=true`

### Update review

```http
PATCH /api/reviews/:id
```

Protected: `CLIENT`, `ADMIN`

Rules:

- client can edit only own review
- admin can edit any review
- rating must stay within `1..5`
- text must stay within `10..1000`

### Delete review

```http
DELETE /api/reviews/:id
```

Protected: `CLIENT`, `ADMIN`

Rules:

- client can delete only own review
- admin can delete any review
- review is physically deleted

### Get my reviews

```http
GET /api/reviews/my?page=1&limit=10
```

Protected: `CLIENT`, `ADMIN`

## Admin moderation

### Get all reviews

```http
GET /api/admin/reviews?search=wacker&rating=5&isPublished=true&page=1&limit=10&sortBy=createdAt&sortOrder=desc
```

Protected: `ADMIN`

Available filters:

- `search`
- `equipmentId`
- `userId`
- `rating`
- `isPublished`
- `page`
- `limit`
- `sortBy`: `createdAt`, `updatedAt`, `rating`
- `sortOrder`: `asc`, `desc`

### Publish or hide review

```http
PATCH /api/admin/reviews/:id/publish
```

Request:

```json
{
  "isPublished": false
}
```

Protected: `ADMIN`

Behavior:

- `true` publishes review
- `false` hides review from public endpoints and from published reviews inside equipment card

## Rating and review count in catalog

Catalog and equipment details use only published reviews:

- `averageRating` is calculated only from `isPublished=true`
- `reviewsCount` counts only `isPublished=true`

No new Prisma fields were added for that. Values are calculated from `Review` records directly.

## Error Cases

- `400`: validation failed
- `401`: missing or invalid token
- `403`: client tries to edit/delete someone else’s review or access admin moderation
- `404`: equipment or review not found
- `409`: duplicate review, archived equipment in favorites, archived equipment review attempt

Example duplicate review error:

```json
{
  "status": "error",
  "message": "You have already left a review for this equipment",
  "details": null
}
```
