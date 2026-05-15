# Rental Orders API

Rental orders cover cost calculation, order creation, customer history, cancellation, and admin order management.

## Authorization

Use Bearer token:

```text
Authorization: Bearer <token>
```

Access:

- `CLIENT` and `ADMIN`: calculate, create, list my orders, get my order, cancel order
- `ADMIN`: list all orders, get any order, update status, update manager comment

## Cost Calculation

Endpoint:

```http
POST /api/rental-orders/calculate
```

Request example:

```json
{
  "startDate": "2026-06-01",
  "endDate": "2026-06-05",
  "deliveryType": "DELIVERY",
  "items": [
    {
      "equipmentId": "cmb2m4z4x0000f4lq2m5j9n8s",
      "quantity": 2
    }
  ]
}
```

Rules:

- dates must be in `YYYY-MM-DD`
- `startDate` cannot be later than `endDate`
- rental days are counted inclusively
- minimum is always `1` day
- every equipment item must exist
- archived, unavailable, and maintenance equipment cannot be rented
- `quantity` must be at least `1`
- requested quantity must not exceed `quantityAvailable`
- delivery price is fixed at `25 BYN` for `DELIVERY`
- pickup delivery price is `0`

Response example:

```json
{
  "status": "success",
  "message": "Rental order calculation completed successfully",
  "data": {
    "daysCount": 5,
    "currency": "BYN",
    "deliveryType": "DELIVERY",
    "subtotal": 450,
    "depositTotal": 600,
    "deliveryPrice": 25,
    "totalPrice": 1075,
    "items": [
      {
        "equipmentId": "cmb2m4z4x0000f4lq2m5j9n8s",
        "name": "Wacker Neuson VP1550",
        "slug": "wacker-neuson-vp1550",
        "brand": "Wacker Neuson",
        "model": "VP1550",
        "quantity": 2,
        "dailyPrice": 45,
        "depositAmount": 300,
        "daysCount": 5,
        "subtotal": 450,
        "depositTotal": 600,
        "lineTotal": 1050
      }
    ]
  }
}
```

## Create Rental Order

Endpoint:

```http
POST /api/rental-orders
```

Request example:

```json
{
  "startDate": "2026-06-01",
  "endDate": "2026-06-05",
  "deliveryType": "DELIVERY",
  "deliveryAddress": "г. Могилев, ул. Первомайская, 10",
  "customerComment": "Нужна доставка утром",
  "items": [
    {
      "equipmentId": "cmb2m4z4x0000f4lq2m5j9n8s",
      "quantity": 1
    }
  ]
}
```

Behavior:

- uses the same validation and calculation as `/calculate`
- creates `RentalOrder` with status `PENDING`
- generates `orderNumber` in `BR-YYYYMMDD-XXXX` format
- creates `RentalOrderItem` rows
- does not reduce `quantityAvailable` while the order is still `PENDING`

Why stock is not reduced on `PENDING`:

- it avoids silent reservation by unconfirmed draft-like requests
- inventory is reserved only when manager confirms the order with `APPROVED`

## My Orders

### List my orders

```http
GET /api/rental-orders/my
```

Query:

- `status`
- `page`
- `limit`
- `sortBy`: `createdAt`, `startDate`, `totalPrice`, `status`
- `sortOrder`: `asc`, `desc`

Response shape:

- `items`
- `pagination`

### Get my order

```http
GET /api/rental-orders/my/:id
```

Rules:

- `CLIENT` can access only their own order
- `ADMIN` can access any order even through this endpoint

## Cancel Order

```http
PATCH /api/rental-orders/:id/cancel
```

Rules:

- `CLIENT` can cancel only their own order
- cancellation is allowed only for `PENDING` and `APPROVED`
- if the order was already `APPROVED`, reserved inventory is returned back
- final status becomes `CANCELLED`

## Admin Rental Orders

### List all orders

```http
GET /api/admin/rental-orders
```

Query:

- `status`
- `search` by `orderNumber`, user email, user full name
- `startDateFrom`
- `startDateTo`
- `page`
- `limit`
- `sortBy`: `createdAt`, `startDate`, `totalPrice`, `status`, `orderNumber`
- `sortOrder`: `asc`, `desc`

### Get order details

```http
GET /api/admin/rental-orders/:id
```

### Update order status

```http
PATCH /api/admin/rental-orders/:id/status
```

Request example:

```json
{
  "status": "APPROVED",
  "managerComment": "Заявка подтверждена, оборудование зарезервировано"
}
```

### Update manager comment

```http
PATCH /api/admin/rental-orders/:id/comment
```

Request example:

```json
{
  "managerComment": "Клиент просил позвонить за час до доставки"
}
```

## Status Flow

Allowed transitions:

- `PENDING -> APPROVED`
- `PENDING -> REJECTED`
- `PENDING -> CANCELLED`
- `APPROVED -> ACTIVE`
- `APPROVED -> CANCELLED`
- `ACTIVE -> COMPLETED`

Forbidden examples:

- `COMPLETED -> ACTIVE`
- `REJECTED -> APPROVED`
- `CANCELLED -> ACTIVE`
- `ACTIVE -> CANCELLED`

Forbidden transition response:

```json
{
  "status": "error",
  "message": "Status transition COMPLETED -> ACTIVE is not allowed",
  "details": null
}
```

## Inventory Rules

How `quantityAvailable` changes:

- `PENDING`: no inventory reservation yet
- `PENDING -> APPROVED`: decrement `quantityAvailable`
- `APPROVED -> ACTIVE`: inventory remains reserved, no extra change
- `APPROVED -> CANCELLED`: increment `quantityAvailable`
- `ACTIVE -> COMPLETED`: increment `quantityAvailable`
- `PENDING -> CANCELLED`: no inventory change
- `PENDING -> REJECTED`: no inventory change

Important:

- status change and inventory update run in one Prisma transaction
- approval re-checks current stock before decrementing
- if stock became insufficient before approval, API returns `409`

## Error Cases

- `400`: validation error, bad date range, forbidden status transition
- `401`: missing or invalid token
- `403`: user tries to access чужой order without admin role
- `404`: order or equipment not found
- `409`: not enough stock, archived equipment, unavailable equipment, inventory conflict during approval

Example validation error:

```json
{
  "status": "error",
  "message": "Validation failed",
  "details": {
    "fieldErrors": {
      "deliveryAddress": [
        "deliveryAddress is required for DELIVERY"
      ]
    }
  }
}
```
