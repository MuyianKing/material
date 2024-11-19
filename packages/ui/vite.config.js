import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

function HlUIAlias() {
  return {
    name: 'my-plugin',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('style/index.js'))
        return

      return code.replace(/@hl\/theme-chalk/g, '@hl/ui/theme-chalk')
    },
  }
}

const __dirname = fileURLToPath(import.meta.url)

export default defineConfig({
  build: {
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
        /^wavesurfer/,
      ],
      output: [
        {
          format: 'es',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'packages/ui',
          dir: './dist/ui',
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
      ],
      treeshake: false,
    },
    lib: {
      entry: [
        resolve(__dirname, '../index.js'),
        resolve(__dirname, '../resolver.js'),
        resolve(__dirname, '../utils.js'),
        resolve(__dirname, '../check.update.js'),
      ],
    },
  },
  plugins: [
    HlUIAlias(),
    vue(),
    vueJsx(),
  ],
})
