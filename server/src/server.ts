import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

const server = app.listen(env.SERVER_PORT, () => {
  console.log(`BuildRent API listening on http://localhost:${env.SERVER_PORT}`);
});

process.once("SIGINT", () => {
  server.close(() => process.exit(0));
});

process.once("SIGTERM", () => {
  server.close(() => process.exit(0));
});
