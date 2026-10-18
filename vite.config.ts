import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: false // Tells Vite to look directly at our root manifest.json file
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/@sentry/")) return "sentry";
          if (id.includes("/node_modules/@supabase/")) return "supabase";
          if (id.includes("/node_modules/motion/") || id.includes("/node_modules/framer-motion/")) {
            return "motion";
          }
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }
        }
      }
    }
  },
  server: {
    port: 10000,
    host: true
  }
});
