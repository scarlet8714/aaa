import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 直接攔截後端所在的實際路徑
      '/hw3_614410164/backend': {
        target: 'http://wwweb2026.csie.io:51010',
        changeOrigin: true,
        // 這裡不需要 rewrite 了，因為路徑已經是對的
      }
    }
  }
});
