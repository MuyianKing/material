import Layout from '@layout/Main.vue'

export const menuList = [{
  path: '/home',
  component: () => import('@views/home/Index.vue'),
  meta: {
    title: '首页',
    icon: 'mage:layout-center-fill',
  },
}
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
  children: menuList
},]
