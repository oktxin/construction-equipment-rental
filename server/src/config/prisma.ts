import { PrismaClient } from "@prisma/client";

type GlobalPrisma = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as GlobalPrisma;

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
