import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import postcssPresetEnv from 'postcss-preset-env'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import tailwindcss from 'tailwindcss'
import useAlias from './alias.config'

const { alias_map } = useAlias()

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        '@vueuse/core',
        'vue-router',
      ],
      eslintrc: {
        enabled: true,
      },
      dts: true,
    }),
    Components({
      directoryAsNamespace: true,
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        {
          type: 'component',
          resolve: (name) => {
            if (name.startsWith('Hl')) {
              return {
                importName: name,
                from: 'hlui',
                path: `@hl/ui/src/components/index.js`,
              }
            }
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: alias_map,
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          autoprefixer: {
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              '> 1%',
            ],
            grid: false,
          },
        }),
        postcssFlexbugsFixes,
        tailwindcss,
      ],
    },
  },
})
