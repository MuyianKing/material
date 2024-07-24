import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      external: [
        'vue',
        'element-plus',
        '@hl/utils',
        '@iconify/vue',
        '@vueuse/core',
        'dayjs',
        'lodash-es',
      ],
      output: [
        {
          format: 'es',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src/components',
          dir: './dist/hl/ui',
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
      ],
    },
    lib: {
      entry: resolve(__dirname, './src/components/index.js'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
      ],
      eslintrc: {
        enabled: true,
      },
    }),
  ],
})
