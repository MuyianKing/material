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
        "element-plus"
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'packages/hooks',
        entryFileNames: "[name].js",
        dir: './dist/hl/hooks',
        exports: "named",
        format: "es"
      },
    },
  },
});
