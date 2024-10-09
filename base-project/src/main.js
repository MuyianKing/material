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
import useThemeStore from '@pinia/useThemeStore'
import useUserStore from '@pinia/useUserStore'
import useAppStore from '@pinia/useAppStore'
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
  getUserInfo() {
    return useUserStore()
  },
  getAppInfo() {
    return useAppStore()
  },
  // 变量备份
  variables: { ...variables },
}

const app = createApp(App)

app.use(pinia)
  .use(router)
  .use(directions)
  .mount('#app')

const theme = useThemeStore()
theme.initTheme()
