import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = fileURLToPath(import.meta.url)
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, '../index.js'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'lodash-es',
        /^@hl\//,
        '@vueuse/core',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'packages/directions',
        entryFileNames: '[name].js',
        dir: './dist/directions',
        exports: 'named',
        format: 'es',
      },
    },
  },
})
