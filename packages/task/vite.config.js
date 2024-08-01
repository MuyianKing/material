import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './index.js'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'lodash-es',
        /^@hl\//,
        'vue',
        /^element-plus/,
        '@vueuse/core',
        /^@logicflow/,
        'quill',
        'vue-router',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'packages/hooks',
        entryFileNames: '[name].js',
        dir: './dist/hl/hooks',
        exports: 'named',
        format: 'es',
      },
    },
  },
})
