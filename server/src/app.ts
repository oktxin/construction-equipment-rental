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

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
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
