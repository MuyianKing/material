import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = fileURLToPath(import.meta.url)

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {},
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, '../index.js'),
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
        dir: './dist/utils',
        exports: 'named',
        format: 'es',
      },
    },
  },
})
