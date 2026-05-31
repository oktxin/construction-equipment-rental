import dotenv from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

const rootEnvPath = resolve(process.cwd(), "..", ".env");
const localEnvPath = resolve(process.cwd(), ".env");

if (existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

if (existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
}

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().int().positive().default(4000),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
  DATABASE_URL: z
    .string()
    .min(1)
    .default("postgresql://postgres:postgres@localhost:5432/buildrent?schema=public"),
  JWT_SECRET: z.string().min(1).default("change_me_in_production"),
  JWT_EXPIRES_IN: z.string().min(1).default("7d"),
  ADMIN_EMAIL: z.string().email().default("admin@buildrent.local"),
  ADMIN_PASSWORD: z.string().min(8).default("Admin12345!"),
  ADMIN_FULL_NAME: z.string().min(1).default("Администратор BuildRent"),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(4).max(15).default(10),
  REPORT_STORAGE_PATH: z.string().min(1).default("./uploads/reports"),
});

export const env = envSchema.parse(process.env);
