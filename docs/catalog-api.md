# BuildRent Catalog API

## Overview

This document describes the backend API for the public equipment catalog and admin catalog management.

## Categories Endpoints

### `GET /api/categories`

Public endpoint for category listing.

Query params:

- `search`
- `page`
- `limit`

Example:

```text
GET /api/categories?search=mixer&page=1&limit=10
```

Response shape:

```json
{
  "status": "success",
  "message": "Categories fetched successfully",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "totalPages": 1
    }
  }
}
```

### `GET /api/categories/:slug`

Public endpoint for a single category by slug.

### `POST /api/categories`

Admin-only endpoint for category creation.

Example request:

```json
{
  "name": "Бетономешалки",
  "slug": "concrete-mixers",
  "description": "Оборудование для приготовления бетонных смесей",
  "iconName": "mixer"
}
```

### `PATCH /api/categories/:id`

Admin-only category update.

### `DELETE /api/categories/:id`

Admin-only category deletion.

If the category still contains equipment, API returns `409`.

## Equipment Endpoints

### `GET /api/equipment`

Public catalog endpoint with filters, sorting and pagination.

Supported query params:

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

### Filtering examples

```text
GET /api/equipment?categorySlug=concrete-mixers
GET /api/equipment?search=wacker
GET /api/equipment?minPrice=20&maxPrice=80
GET /api/equipment?isFeatured=true
GET /api/equipment?status=AVAILABLE
```

### Sorting examples

```text
GET /api/equipment?sortBy=dailyPrice&sortOrder=asc
GET /api/equipment?sortBy=name&sortOrder=asc
GET /api/equipment?sortBy=createdAt&sortOrder=desc
GET /api/equipment?sortBy=popularity&sortOrder=desc
GET /api/equipment?sortBy=rating&sortOrder=desc
```

`popularity` and `rating` are handled safely through the backend sort fallback strategy.

### Example catalog response

```json
{
  "status": "success",
  "message": "Equipment catalog fetched successfully",
  "data": {
    "items": [
      {
        "id": "clx...",
        "name": "Wacker Neuson VP1550",
        "slug": "wacker-neuson-vp1550",
        "shortDescription": "Компактная виброплита для уплотнения грунта",
        "brand": "Wacker Neuson",
        "model": "VP1550",
        "dailyPrice": 45,
        "depositAmount": 300,
        "quantityAvailable": 4,
        "status": "AVAILABLE",
        "isFeatured": true,
        "category": {
          "id": "clx...",
          "name": "Виброплиты",
          "slug": "vibroplates",
          "iconName": "plate"
        },
        "mainImage": {
          "id": "clx...",
          "url": "https://example.com/image.jpg",
          "alt": "Виброплита",
          "sortOrder": 1
        },
        "averageRating": 4.5,
        "reviewsCount": 2
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 1,
      "totalPages": 1
    },
    "filters": {
      "applied": {
        "categorySlug": "vibroplates",
        "sortBy": "dailyPrice",
        "sortOrder": "asc"
      }
    }
  }
}
```

### `GET /api/equipment/featured`

Public endpoint for homepage featured equipment.

### `GET /api/equipment/:slug`

Public detailed equipment endpoint.

Response includes:

- core equipment data
- category
- images
- specs
- published reviews
- average rating
- reviews count
- similar equipment

### Example create equipment request

Admin-only endpoint:

`POST /api/equipment`

```json
{
  "categoryId": "cm...",
  "name": "Виброплита Wacker Neuson VP1550",
  "slug": "wacker-neuson-vp1550",
  "shortDescription": "Компактная виброплита для уплотнения грунта и песка",
  "description": "Подробное описание...",
  "brand": "Wacker Neuson",
  "model": "VP1550",
  "dailyPrice": 45,
  "depositAmount": 300,
  "quantityTotal": 5,
  "quantityAvailable": 4,
  "power": "4.8 кВт",
  "weight": "83 кг",
  "status": "AVAILABLE",
  "isFeatured": true,
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Виброплита Wacker Neuson",
      "sortOrder": 1
    }
  ],
  "specs": [
    {
      "name": "Мощность",
      "value": "4.8",
      "unit": "кВт",
      "sortOrder": 1
    }
  ]
}
```

### `PATCH /api/equipment/:id`

Admin-only update for base equipment fields.

### `PUT /api/equipment/:id/images`

Admin-only full replacement of equipment images.

### `PUT /api/equipment/:id/specs`

Admin-only full replacement of equipment specs.

### `DELETE /api/equipment/:id`

Admin-only safe delete behavior:

- if equipment has linked `RentalOrderItem`, it becomes `ARCHIVED`
- if there are no linked order items, equipment is physically deleted

## Errors

Typical error cases:

- `400` validation error
- `403` forbidden
- `404` category or equipment not found
- `409` duplicate slug or delete conflict

All errors are returned in JSON.
