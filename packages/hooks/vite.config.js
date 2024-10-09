import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const __dirname = fileURLToPath(import.meta.url)

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, '../index.js'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'lodash-es',
        /^@hl\//,
        'vue',
        /^element-plus/,
        '@hl/ui',
        '@vueuse/core',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'packages/hooks',
        entryFileNames: '[name].js',
        dir: './dist/hooks',
        exports: 'named',
        format: 'es',
      },
    },
  },
})
