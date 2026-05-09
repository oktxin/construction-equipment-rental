import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

app.listen(env.SERVER_PORT, () => {
  console.log(`BuildRent API listening on http://localhost:${env.SERVER_PORT}`);
});
