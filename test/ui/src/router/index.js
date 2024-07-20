import { createRouter, createWebHashHistory } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: [
    {
      path: '/',
      component: () => import('@views/Home.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/button',
      component: () => import('@comp/Button.vue'),
      meta: {
        title: '按钮',
      },
    },
    {
      path: '/others',
      component: () => import('@comp/Others.vue'),
      meta: {
        title: '按钮',
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  const title = useTitle()
  if (to.meta.title) {
    title.value = `${import.meta.env.VITE_WEB_NAME} - ${to.meta.title || ''}`
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
