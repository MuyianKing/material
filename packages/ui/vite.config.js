import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      external: [
        /^@hl\//,
        'vue',
        /^element-plus/,
        '@vueuse/core',
        'dayjs',
        'lodash-es',
        'validator',
        'js-cookie',
        'nanoid',
        '@iconify/vue',
        /^@multiavatar\/multiavatar/,
        /^wavesurfer/
      ],
      output: [
        {
          format: 'es',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'packages/ui',
          dir: './dist/hl/ui',
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
      ],
    },
    lib: {
      entry: resolve(__dirname, './index.js'),
    },
  },
  plugins: [
    vue(),
    vueJsx()
  ],
})
