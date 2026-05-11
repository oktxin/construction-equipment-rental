import { PrismaClient } from "@prisma/client";

import { env } from "./env";

type GlobalPrisma = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as GlobalPrisma;

process.env.DATABASE_URL = process.env.DATABASE_URL || env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

async function disconnectPrisma() {
  await prisma.$disconnect();
}

process.once("SIGINT", async () => {
  await disconnectPrisma();
  process.exit(0);
});

process.once("SIGTERM", async () => {
  await disconnectPrisma();
  process.exit(0);
});
