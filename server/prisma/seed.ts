import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { env } from "../src/config/env";
import { comparePasswords, hashPassword } from "../src/utils/password";

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

async function seedRolesAndAdmin() {
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {
      description: "Administrator with full platform access",
    },
    create: {
      name: "ADMIN",
      description: "Administrator with full platform access",
    },
  });

  await prisma.role.upsert({
    where: { name: "CLIENT" },
    update: {
      description: "Client who can browse catalog and place rental orders",
    },
    create: {
      name: "CLIENT",
      description: "Client who can browse catalog and place rental orders",
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL || "admin@buildrent.local";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin12345!";
  const adminFullName = process.env.ADMIN_FULL_NAME || "BuildRent Admin";

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (!existingAdmin) {
    const passwordHash = await hashPassword(adminPassword);

    await prisma.user.create({
      data: {
        fullName: adminFullName,
        email: adminEmail,
        passwordHash,
        roleId: adminRole.id,
      },
    });

    return;
  }

  const passwordMatches = await comparePasswords(
    adminPassword,
    existingAdmin.passwordHash,
  );

  await prisma.user.update({
    where: { id: existingAdmin.id },
    data: {
      fullName: adminFullName,
      roleId: adminRole.id,
      ...(passwordMatches ? {} : { passwordHash: await hashPassword(adminPassword) }),
    },
  });
}

async function main() {
  await seedRolesAndAdmin();
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
