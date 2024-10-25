import Layout from '@layout/Main.vue'

export const menuList = [
  {
    path: '/use-list',
    component: () => import('@views/use-list/Index.vue'),
    meta: {
      title: 'use-list',
      icon: 'clarity:users-solid',
    },
  },
]

export default [
  {
    path: '/Login',
    component: () => import('@views/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/use-list',
    name: 'admin',
    children: menuList,
  },
]
