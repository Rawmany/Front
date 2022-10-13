import { defineConfig } from "vite";
import { resolve } from "path";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    cssInjectedByJsPlugin({
      topExecutionPriority: false,
    }),
  ],
  build: {
    outDir: "front",
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "src/main.tsx"),
      output: {
        entryFileNames: "main.js",
        format: "commonjs",
      },
    },
  },
  server: {
    port: 4200,
  },
});
