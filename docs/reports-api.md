# Reports API

The reports module generates downloadable PDF and DOCX files and stores metadata in the `Report` table.

## Supported report types

- `ORDER_DOCUMENT`
- `RENTAL_HISTORY`
- `ADMIN_RENTAL_STATISTICS`

## Supported formats

- `PDF`
- `DOCX`

## Storage

Generated files are stored locally in:

```text
server/uploads/reports/
```

`fileUrl` is stored as a relative public path, for example:

```text
/uploads/reports/order-br-20260601-0001-a1b2c3d4.pdf
```

## Authorization

Protected endpoints use:

```text
Authorization: Bearer <token>
```

Access rules:

- `CLIENT` and `ADMIN`: order report, rental history, my reports, download with access check
- `ADMIN`: rental statistics, all reports list, report deletion

## Generate order report

```http
POST /api/reports/order/:orderId
```

Protected: `CLIENT`, `ADMIN`

Request:

```json
{
  "format": "PDF"
}
```

Behavior:

- client can generate only for own rental order
- admin can generate for any rental order
- report metadata is saved into `Report`
- response contains `downloadUrl`

Response example:

```json
{
  "status": "success",
  "message": "Order report generated successfully",
  "data": {
    "id": "cmreport1",
    "userId": "cmuser1",
    "rentalOrderId": "cmorder1",
    "type": "ORDER_DOCUMENT",
    "format": "PDF",
    "title": "Order document BR-20260531-1802",
    "fileUrl": "/uploads/reports/order-br-20260531-1802-a1b2c3d4.pdf",
    "downloadUrl": "/api/reports/cmreport1/download",
    "createdAt": "2026-05-16T20:00:00.000Z"
  }
}
```

## Generate rental history report

```http
POST /api/reports/rental-history
```

Protected: `CLIENT`, `ADMIN`

Request example:

```json
{
  "format": "DOCX",
  "dateFrom": "2026-06-01",
  "dateTo": "2026-06-30"
}
```

Behavior:

- user id is always taken from token
- report includes orders in the selected period
- metadata is saved into `Report`

## Get my reports

```http
GET /api/reports/my?type=ORDER_DOCUMENT&format=PDF&page=1&limit=10
```

Protected: `CLIENT`, `ADMIN`

Filters:

- `type`
- `format`
- `page`
- `limit`

## Download report

```http
GET /api/reports/:id/download
```

Protected: `CLIENT`, `ADMIN`

Behavior:

- client can download only own report
- admin can download any report
- file is returned via `res.download`
- if file is missing on disk, API returns `404`

## Generate admin rental statistics report

```http
POST /api/admin/reports/rental-statistics
```

Protected: `ADMIN`

Request example:

```json
{
  "format": "PDF",
  "dateFrom": "2026-06-01",
  "dateTo": "2026-06-30"
}
```

The report contains:

- selected period
- total orders count
- order counts by status
- total rental sum
- total deposit sum
- top equipment by rentals
- top clients by order count
- completed, cancelled, and active counts

## Get all reports

```http
GET /api/admin/reports?type=RENTAL_HISTORY&format=DOCX&userId=cmuser1&page=1&limit=10
```

Protected: `ADMIN`

Filters:

- `type`
- `format`
- `userId`
- `page`
- `limit`

## Delete report

```http
DELETE /api/admin/reports/:id
```

Protected: `ADMIN`

Behavior:

- deletes report record from database
- deletes file from disk if it exists

## Validation

- `format`: `PDF` or `DOCX`
- `dateFrom` and `dateTo`: optional `YYYY-MM-DD`
- `dateFrom` cannot be later than `dateTo`
- ids support `cuid` and `uuid`
- pagination: `page >= 1`, `limit 1..100`
- `type` and `userId` filters are validated

## Security rules

- `passwordHash` is never included in any report
- client cannot generate order report for чужой order
- client cannot download чужой report
- client cannot access admin reports
- file resolution is constrained to `/uploads`

## Error cases

- `400`: invalid format, invalid date range, bad id
- `401`: missing or invalid token
- `403`: access denied
- `404`: report, rental order, or file not found

Example access error:

```json
{
  "status": "error",
  "message": "You do not have permission to download this report",
  "details": null
}
```
