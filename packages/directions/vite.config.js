import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './index.js'),
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
        dir: './base-project/dist/hl/directions',
        exports: 'named',
        format: 'es',
      },
    },
  },
})
