import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "..", "");
  const clientPort = Number(env.CLIENT_PORT || "5173");

  return {
    envDir: "..",
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return undefined;
            }

            if (id.includes("react-router-dom")) {
              return "router-vendor";
            }

            if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) {
              return "forms-vendor";
            }

            if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
              return "state-vendor";
            }

            if (id.includes("axios")) {
              return "http-vendor";
            }

            return "vendor";
          },
        },
      },
    },
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
