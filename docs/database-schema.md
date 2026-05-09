# BuildRent Database Schema

## Purpose of the Database

The BuildRent database stores the core business data for an online construction equipment rental platform. It supports user roles, equipment catalog management, equipment details, rental orders, favorites, reviews, mock payments, and report generation.

## Tables Overview

- `Role`
- `User`
- `Category`
- `Equipment`
- `EquipmentImage`
- `EquipmentSpec`
- `RentalOrder`
- `RentalOrderItem`
- `Favorite`
- `Review`
- `Payment`
- `Report`

## Tables and Responsibilities

### `Role`

- Stores system roles.
- Main fields: `id`, `name`, `description`, `createdAt`, `updatedAt`.
- Used to separate admin and client permissions.

### `User`

- Stores user accounts.
- Main fields: `id`, `fullName`, `email`, `phone`, `passwordHash`, `avatarUrl`, `roleId`, `isBlocked`, `createdAt`, `updatedAt`.
- Connected to orders, favorites, reviews, and reports.

### `Category`

- Stores equipment categories.
- Main fields: `id`, `name`, `slug`, `description`, `iconName`, `createdAt`, `updatedAt`.
- Used to group equipment in the catalog.

### `Equipment`

- Stores rentable equipment items.
- Main fields: `id`, `categoryId`, `name`, `slug`, `shortDescription`, `description`, `brand`, `model`, `dailyPrice`, `depositAmount`, `quantityTotal`, `quantityAvailable`, `power`, `weight`, `status`, `isFeatured`, `createdAt`, `updatedAt`.
- Central table for catalog, equipment detail pages, reviews, favorites, and order items.

### `EquipmentImage`

- Stores gallery images for equipment.
- Main fields: `id`, `equipmentId`, `url`, `alt`, `sortOrder`, `createdAt`.
- Separated from `Equipment` to avoid repeated image columns and to support multi-image galleries.

### `EquipmentSpec`

- Stores technical specifications as normalized key-value rows.
- Main fields: `id`, `equipmentId`, `name`, `value`, `unit`, `sortOrder`.
- Supports flexible specification sets for different equipment types.

### `RentalOrder`

- Stores rental requests and active rental orders.
- Main fields: `id`, `userId`, `orderNumber`, `status`, `startDate`, `endDate`, `deliveryType`, `deliveryAddress`, `customerComment`, `managerComment`, `subtotal`, `depositTotal`, `deliveryPrice`, `totalPrice`, `createdAt`, `updatedAt`.
- Used in customer account pages, admin order management, and reports.

### `RentalOrderItem`

- Stores individual equipment positions inside a rental order.
- Main fields: `id`, `rentalOrderId`, `equipmentId`, `quantity`, `dailyPrice`, `daysCount`, `lineTotal`, `createdAt`.
- Keeps order composition separate from the order header.

### `Favorite`

- Stores user favorites.
- Main fields: `id`, `userId`, `equipmentId`, `createdAt`.
- Includes unique constraint on `userId + equipmentId`.

### `Review`

- Stores customer reviews about equipment.
- Main fields: `id`, `userId`, `equipmentId`, `rating`, `text`, `isPublished`, `createdAt`, `updatedAt`.
- Supports moderation and later rating aggregation.

### `Payment`

- Stores mock payments for rental orders.
- Main fields: `id`, `rentalOrderId`, `amount`, `status`, `method`, `paidAt`, `createdAt`, `updatedAt`.
- Used for mock payment status tracking and financial reporting.

### `Report`

- Stores generated report metadata.
- Main fields: `id`, `userId`, `rentalOrderId`, `type`, `format`, `title`, `fileUrl`, `createdAt`.
- Supports both user-facing downloadable documents and admin analytics exports.

## Relationships Between Tables

- `Role 1:M User`
- `User 1:M RentalOrder`
- `User 1:M Favorite`
- `User 1:M Review`
- `User 1:M Report`
- `Category 1:M Equipment`
- `Equipment 1:M EquipmentImage`
- `Equipment 1:M EquipmentSpec`
- `Equipment 1:M RentalOrderItem`
- `Equipment 1:M Favorite`
- `Equipment 1:M Review`
- `RentalOrder 1:M RentalOrderItem`
- `RentalOrder 1:M Payment`
- `RentalOrder 1:M Report`

## Why the Schema Matches 3NF

- Each table stores data about one business entity only.
- Repeating groups are extracted into separate tables:
  `EquipmentImage`, `EquipmentSpec`, `RentalOrderItem`, `Favorite`.
- Non-key fields depend on the whole key and only on the key.
- Lookup-like business classification is separated from transactional data:
  `Role` and `Category` are independent.
- Order header data is separated from order line data.
- Technical specs are normalized into rows rather than many nullable columns.

## Tables Used for Reports

- `RentalOrder`
- `RentalOrderItem`
- `Payment`
- `Report`
- `Equipment`
- `Category`
- `User`

These tables support order documents, rental history exports, admin rental statistics, and equipment utilization reports.

## Tables Used for the Catalog

- `Category`
- `Equipment`
- `EquipmentImage`
- `EquipmentSpec`
- `Review`
- `Favorite`

These tables support listing, filtering, equipment detail pages, galleries, technical specs, and engagement features.

## Tables Used for the Personal Account

- `User`
- `RentalOrder`
- `RentalOrderItem`
- `Favorite`
- `Review`
- `Payment`
- `Report`

These tables support profile data, order history, favorites, reviews, downloadable files, and payment status.

## Tables Used for the Admin Panel

- `User`
- `Role`
- `Category`
- `Equipment`
- `EquipmentImage`
- `EquipmentSpec`
- `RentalOrder`
- `RentalOrderItem`
- `Payment`
- `Review`
- `Report`

These tables support user management, catalog management, order moderation, review moderation, and reporting.
