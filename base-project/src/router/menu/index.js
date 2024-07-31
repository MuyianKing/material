import Layout from '@layout/Main.vue'

export const menuList = [
  {
    path: '/home',
    component: () => import('@views/home/Index.vue'),
    meta: {
      title: '首页',
      icon: 'mage:layout-center-fill',
    },
  },
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

export default [{
  path: '/Login',
  component: () => import('@views/Login.vue'),
  meta: {
    title: '登录',
  },
}, {
  path: '/forbidden',
  component: () => import('@views/403.vue'),
}, {
  path: '/:pathMatch(.*)*',
  component: () => import('@views/404.vue'),
}, {
  path: '/',
  component: Layout,
  redirect: '/home',
  name: 'admin',
  children: menuList,
}]
