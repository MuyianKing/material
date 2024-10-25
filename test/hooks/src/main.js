import { createApp } from 'vue'
import dayjs from 'dayjs'
import { addAPIProvider, disableCache, enableCache } from '@iconify/vue'

import storage from '@utils/storage'
import * as file from '@utils/file'
import * as common from '@utils/common'
import api from '@api'
import useUserStore from '@pinia/useUserStore'
import * as message from '@hl/utils/es/message'
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

app.use(router)
  .mount('#app')
