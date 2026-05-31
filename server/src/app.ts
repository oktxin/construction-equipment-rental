import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";

import { env } from "./config/env";
import { prisma } from "./config/prisma";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { apiRouter } from "./routes";

function buildAllowedOrigins() {
  const configuredOrigin = new URL(env.CLIENT_ORIGIN);
  const allowedOrigins = new Set<string>([env.CLIENT_ORIGIN]);

  if (configuredOrigin.hostname === "localhost") {
    allowedOrigins.add(
      `${configuredOrigin.protocol}//127.0.0.1${configuredOrigin.port ? `:${configuredOrigin.port}` : ""}`,
    );
  }

  if (configuredOrigin.hostname === "127.0.0.1") {
    allowedOrigins.add(
      `${configuredOrigin.protocol}//localhost${configuredOrigin.port ? `:${configuredOrigin.port}` : ""}`,
    );
  }

  return allowedOrigins;
}

export function createApp() {
  const app = express();
  const allowedOrigins = buildAllowedOrigins();

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("CORS origin is not allowed"));
      },
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  app.locals.prisma = prisma;
  app.use("/api", apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
