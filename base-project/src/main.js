import { createApp } from 'vue'
import dayjs from 'dayjs'
import { addAPIProvider, disableCache, enableCache } from '@iconify/vue'

import variables from '@style/theme.module.scss'
import * as message from '@utils/message'
import storage from '@utils/storage'
import * as file from '@utils/file'
import * as common from '@utils/common'
import directions from '@directions'
import api from '@api'
import useDynamicRoutesStore from '@pinia/useDynamicRoutesStore.js'
import useThemeStore from '@pinia/useThemeStore.js'
import { BASE_URL, ICONIFY_API } from './utils/app'
import http from './utils/request'
import pinia from '@/pinia'
import router from '@/router'
import App from '@/App.vue'

addAPIProvider('', {
  resources: [BASE_URL + ICONIFY_API],
})

disableCache('local')
enableCache('session')

// 全局属性
window.dayjs = dayjs
window.hl = {
  message,
  storage,
  file,
  common,
  api,
  http,
  // 变量备份
  variables: { ...variables },
}

const app = createApp(App)

app.use(pinia)

// 初始化动态路由：刷新页面时如果当前页面正好是动态路由页面，不先初始化会跳转到404，后续登录成功之后会重新生成动态路由
useDynamicRoutesStore().initDynamicRoutes(router)
app.use(router)
  .use(directions)
  .mount('#app')

const theme = useThemeStore()
theme.initTheme()
