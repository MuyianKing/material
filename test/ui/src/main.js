import App from '@/App.vue'
import pinia from '@/pinia'
import router from '@/router'

import api from '@api'
import * as message from '@hl/ui/src/utils/message'
import { addAPIProvider, disableCache, enableCache } from '@iconify/vue'
import useThemeStore from '@pinia/useThemeStore'
import useUserStore from '@pinia/useUserStore'
import * as common from '@utils/common'
import * as file from '@utils/file'
import storage from '@utils/storage'
import dayjs from 'dayjs'
import { createApp } from 'vue'
import { BASE_URL, ICONIFY_API } from './utils/app'
import http from './utils/request'

addAPIProvider('', {
  resources: [BASE_URL + ICONIFY_API],
})

disableCache('local')
enableCache('session')

// 全局属性
window.dayjs = dayjs
window.hl = {
  storage,
  message,
  file,
  common,
  api,
  http,
  getUserInfo() {
    return useUserStore()
  },
}

const app = createApp(App)

app.use(pinia)
  .use(router)
  .mount('#app')

const theme = useThemeStore()
theme.initTheme()
