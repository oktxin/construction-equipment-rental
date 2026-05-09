import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "..", "");
  const clientPort = Number(env.CLIENT_PORT || "5173");

  return {
    envDir: "..",
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: clientPort,
    },
    preview: {
      host: "0.0.0.0",
      port: clientPort,
    },
  };
});
