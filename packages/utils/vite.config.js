import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {},
  },
  build: {
    lib: {
      entry: resolve(__dirname, './index.js'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'lodash-es',
        '@vueuse/core',
        /^@hl\//,
        'vue',
        'element-plus',
        /^element-plus/,
        'nanoid',
        /^echarts/,
        'js-cookie',
        /^validator/,
        'dayjs',
      ],
      output: {
        preserveModules: true,
        entryFileNames: '[name].js',
        dir: './base-project/dist/hl/utils',
        exports: 'named',
        format: 'es',
      },
    },
  },
})
