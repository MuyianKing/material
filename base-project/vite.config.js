import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import legacy from 'vite-plugin-legacy-swc'
import tailwindcss from 'tailwindcss'
import postcssPresetEnv from 'postcss-preset-env'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import ElementPlus from 'unplugin-element-plus/vite'
import { defineConfig, loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import viteImagemin from 'vite-plugin-imagemin'
import viteCompression from 'vite-plugin-compression'
import useAlias from './alias.config'

const { alias_map } = useAlias()

export default ({ mode }) => {
  // 获取.env文件里定义的环境变量
  const env = loadEnv(mode, process.cwd())

  // 插件
  const plugins = [
    vue(),
    vueJsx(),
    VueSetupExtend(),
    ElementPlus(),
    // 图片压缩
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 90,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      eslintrc: {
        enabled: false,
      },
      dirs: [
        './src/pinia/modules',
      ],
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
                path: `@hl/ui/src/index.js`,
              }
            }
          },
        },
      ],
      dts: true,
    }),
    visualizer({
      emitFile: false,
      file: 'stats.html',
      open: false,
    }),
  ]

  // 是否需要兼容老版本浏览器
  if (env.VITE_POLYFILL_OLD_BROSWER === '1') {
    plugins.push(
      legacy({
        targets: ['chrome < 60', 'not IE 11'],
      }),
    )
  }

  // 是否开启gzip
  if (env.VITE_GZIP === '1') {
    plugins.push(
      viteCompression({
        threshold: 2000,
      }),
    )
  }

  // 服务器配置
  const server = {}

  // 是否启用https
  if (env.VITE_HTTPS === '1') {
    plugins.push(basicSsl())
    server.https = true
  }

  // 开启跨域
  if (env.VITE_CORS === '1') {
    server.proxy = {
      '/api': {
        target: env.VITE_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => {
          path = path.replace(/^\/api/, '')
          return path
        },
      },
    }
  }

  return defineConfig({
    base: './',
    server,
    plugins,
    optimizeDeps: {
      include: ['element-plus/es'],
    },
    build: {
      reportCompressedSize: false,
      assetsDir: 'static/',
      sourcemap: false,
      rollupOptions: {
        output: [
          {
            chunkFileNames: 'static/js/[name].[hash].js',
            entryFileNames: 'static/js/[name].[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          },
        ],
      },
    },
    resolve: {
      alias: alias_map,
    },
    css: {
      postcss: {
        plugins: [
          postcssPresetEnv({
            autoprefixer: {
              overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', '> 1%'],
              grid: true,
            },
          }),
          postcssFlexbugsFixes,
          tailwindcss,
        ],
      },
    },
  })
}
