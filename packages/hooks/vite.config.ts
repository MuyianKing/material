import { resolve } from "node:path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const outDir = resolve(import.meta.dirname, "../dist-utils/es");

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
    },
  },
  build: {
    lib: {
      entry: "./src/index.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "lodash-es",
        "@hl/utils"
      ],
      output: {
        entryFileNames: "[name].js",
        dir: outDir,
        exports: "named",
        format: "es",
        preserveModules: true,
      },
    },
  },
});
