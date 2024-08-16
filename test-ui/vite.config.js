import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import { defineConfig, loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import useAlias from './alias.config'

const { alias_map } = useAlias()

export default ({ mode }) => {
  // 获取.env文件里定义的环境变量
  const env = loadEnv(mode, process.cwd())

  // 插件
  const plugins = [
    vue(),
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
    resolve: {
      alias: alias_map,
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss,
        ],
      },
    },
  })
}
