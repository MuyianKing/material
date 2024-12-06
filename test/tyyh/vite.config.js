import process from 'node:process'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'
import { defineConfig, loadEnv } from 'vite'
import useAlias from './alias.config'

const { alias_map } = useAlias()

export default ({ mode }) => {
  // 获取.env文件里定义的环境变量
  const env = loadEnv(mode, process.cwd())

  // 插件
  const plugins = [
    vue(),
    vueJsx(),

  ]

  // 服务器配置
  const server = {}

  // 是否启用https
  if (env.VITE_HTTPS === '1') {
    plugins.push(basicSsl())
    server.https = true
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
