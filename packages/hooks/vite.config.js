import { defineConfig } from "vite";
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
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
        /^element-plus/,
        "@hl/ui",
        "@vueuse/core"
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
