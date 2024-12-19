/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default () => {
  // 插件
  const plugins = [
    vue(),
    vueJsx(),
  ]
  return defineConfig({
    base: './',
    plugins,
    test: {
      server: {
        deps: {
          inline: ['element-plus'],
        },
      },
      coverage: {
        provider: 'v8',
        enabled: true,
        reporter: 'html',
      },
    },
  })
}
