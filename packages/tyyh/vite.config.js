import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import libCss from 'vite-plugin-libcss'

export default defineConfig({
  build: {
    outDir: './base-project/dist/hl/tyyh',
    cssCodeSplit: true,
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      external: [
        'vue',
        /^@hl\//,
        '@vueuse/core',
        'dayjs',
        'lodash-es',
        /^element-plus/,
      ],
      output: [
        {
          format: 'es',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'packages/tyyh',
          dir: './base-project/dist/hl/tyyh',
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
      ],
      treeshake: false,
    },
    lib: {
      entry: resolve(__dirname, './index.js'),
    },
  },
  plugins: [
    vue(),
    libCss(),
  ],
})
