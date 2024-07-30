import { defineConfig } from "vite";
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './index.js'),
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "lodash-es",
        /^@hl\//,
        "vue",
        "element-plus",
        /^element-plus/,
        "nanoid",
        /^echarts/,
        "js-cookie",
        /^validator/
      ],
      output: {
        preserveModules: true,
        entryFileNames: "[name].js",
        dir: './dist/hl/utils',
        exports: "named",
        format: "es"
      },
    },
  },
});
