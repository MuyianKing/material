import Layout from '@layout/Main.vue'

export const menuList = [
  {
    path: '/tyyh',
    meta: {
      title: '统一用户',
      icon: 'clarity:users-solid',
    },
    children: [
      {
        path: 'person',
        component: () => import('@views/tyyh/Person.vue'),
        meta: {
          title: '人员选择',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'person/panel',
        component: () => import('@views/tyyh/PersonSelectPanel.vue'),
        meta: {
          title: '人员选择面板',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'organiztion',
        component: () => import('@views/tyyh/Organization.vue'),
        meta: {
          title: '单位选择',
          icon: 'clarity:organization-solid',
        },
      },
      {
        path: 'other',
        component: () => import('@views/tyyh/OtherComp.vue'),
        meta: {
          title: '其他',
          icon: 'material-symbols:other-admission-rounded',
        },
      },
    ],
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
    redirect: '/home',
    name: 'admin',
    children: menuList,
  },
]
