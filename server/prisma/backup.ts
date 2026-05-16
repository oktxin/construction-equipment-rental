import { Prisma, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { env } from "../src/config/env";

const rootEnvPath = resolve(process.cwd(), "..", ".env");
const localEnvPath = resolve(process.cwd(), ".env");

if (existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

if (existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
}

process.env.DATABASE_URL = process.env.DATABASE_URL || env.DATABASE_URL;

const prisma = new PrismaClient();

const backupDirectory = resolve(process.cwd(), "prisma", "backups");
const jsonBackupPath = resolve(backupDirectory, "buildrent_seed_backup.json");
const sqlBackupPath = resolve(backupDirectory, "buildrent_seed_backup.sql");

function getPgDumpConnectionString() {
  const databaseUrl = process.env.DATABASE_URL ?? env.DATABASE_URL;
  const parsed = new URL(databaseUrl);

  // Prisma keeps the active schema in the connection string, but pg_dump does not
  // understand the `schema` query parameter and fails to parse the URI.
  parsed.searchParams.delete("schema");

  return parsed.toString();
}

function jsonReplacer(_key: string, value: unknown) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value instanceof Prisma.Decimal) {
    return Number(value.toString());
  }

  return value;
}

async function collectBackupData() {
  const [
    roles,
    users,
    categories,
    equipment,
    equipmentImages,
    equipmentSpecs,
    rentalOrders,
    rentalOrderItems,
    favorites,
    reviews,
    payments,
    reports,
  ] = await Promise.all([
    prisma.role.findMany({ orderBy: { name: "asc" } }),
    prisma.user.findMany({ orderBy: { email: "asc" } }),
    prisma.category.findMany({ orderBy: { slug: "asc" } }),
    prisma.equipment.findMany({ orderBy: { slug: "asc" } }),
    prisma.equipmentImage.findMany({
      orderBy: [{ equipmentId: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.equipmentSpec.findMany({
      orderBy: [{ equipmentId: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.rentalOrder.findMany({ orderBy: { orderNumber: "asc" } }),
    prisma.rentalOrderItem.findMany({
      orderBy: [{ rentalOrderId: "asc" }, { createdAt: "asc" }],
    }),
    prisma.favorite.findMany({
      orderBy: [{ userId: "asc" }, { equipmentId: "asc" }],
    }),
    prisma.review.findMany({
      orderBy: [{ equipmentId: "asc" }, { createdAt: "asc" }],
    }),
    prisma.payment.findMany({
      orderBy: [{ rentalOrderId: "asc" }, { createdAt: "asc" }],
    }),
    prisma.report.findMany({
      orderBy: [{ createdAt: "asc" }, { title: "asc" }],
    }),
  ]);

  const summary = {
    roles: roles.length,
    users: users.length,
    categories: categories.length,
    equipment: equipment.length,
    equipmentImages: equipmentImages.length,
    equipmentSpecs: equipmentSpecs.length,
    rentalOrders: rentalOrders.length,
    rentalOrderItems: rentalOrderItems.length,
    favorites: favorites.length,
    reviews: reviews.length,
    payments: payments.length,
    reports: reports.length,
  };

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      ...summary,
      totalRecords: Object.values(summary).reduce((sum, value) => sum + value, 0),
    },
    data: {
      roles,
      users,
      categories,
      equipment,
      equipmentImages,
      equipmentSpecs,
      rentalOrders,
      rentalOrderItems,
      favorites,
      reviews,
      payments,
      reports,
    },
  };
}

function tryCreateSqlBackup() {
  const result = spawnSync(
    "pg_dump",
    [
      "--dbname",
      getPgDumpConnectionString(),
      "--file",
      sqlBackupPath,
      "--clean",
      "--if-exists",
      "--no-owner",
      "--no-privileges",
    ],
    {
      encoding: "utf8",
    },
  );

  if (result.error) {
    const error = result.error as NodeJS.ErrnoException;
    if (error.code === "ENOENT") {
      return {
        created: false,
        reason: "pg_dump is not available in PATH",
      };
    }

    throw result.error;
  }

  if (result.status !== 0) {
    return {
      created: false,
      reason: result.stderr.trim() || `pg_dump exited with code ${result.status}`,
    };
  }

  return {
    created: true,
    reason: null,
  };
}

async function main() {
  mkdirSync(backupDirectory, { recursive: true });

  const backupPayload = await collectBackupData();
  writeFileSync(
    jsonBackupPath,
    JSON.stringify(backupPayload, jsonReplacer, 2),
    "utf8",
  );

  const sqlBackup = tryCreateSqlBackup();

  console.log(`JSON backup created: ${jsonBackupPath}`);
  if (sqlBackup.created) {
    console.log(`SQL backup created: ${sqlBackupPath}`);
  } else {
    console.log(`SQL backup skipped: ${sqlBackup.reason}`);
  }
  console.log(
    `Backup summary: ${backupPayload.summary.totalRecords} total records exported.`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
