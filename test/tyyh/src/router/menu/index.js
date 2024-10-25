import Layout from '@layout/Main.vue'

export const menuList = [
  {
    path: 'person',
    component: () => import('@views/tyyh/Person.vue'),
    meta: {
      title: '人员选择',
      icon: 'fluent-emoji-flat:person',
    },
  },
  {
    path: 'person/panel',
    component: () => import('@views/tyyh/PersonSelectPanel.vue'),
    meta: {
      title: '人员选择面板',
      icon: 'fluent-emoji-flat:person-bowing',
    },
  },
  {
    path: 'organiztion',
    component: () => import('@views/tyyh/Organization.vue'),
    meta: {
      title: '单位选择',
      icon: 'flat-color-icons:org-unit',
    },
  },
  {
    path: 'other',
    component: () => import('@views/tyyh/OtherComp.vue'),
    meta: {
      title: '其他',
      icon: 'fluent-emoji-flat:confetti-ball',
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
    path: '/forbidden',
    component: () => import('@views/403.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@views/404.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/person',
    name: 'admin',
    children: menuList,
  },
]
