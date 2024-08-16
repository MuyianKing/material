import Layout from '@layout/Main.vue'

export const menuList = [
  {
    path: '/ui',
    meta: {
      title: 'UI',
      icon: 'clarity:users-solid',
    },
    children: [
      {
        path: 'table',
        component: () => import('@views/ui/Table.vue'),
        meta: {
          title: '表格',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'upload',
        component: () => import('@views/ui/Upload.vue'),
        meta: {
          title: '上传',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'dialog',
        component: () => import('@views/ui/Dialog.vue'),
        meta: {
          title: '弹窗',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'button',
        component: () => import('@views/ui/Button.vue'),
        meta: {
          title: '按钮',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'icon',
        component: () => import('@views/ui/Icon.vue'),
        meta: {
          title: '图标',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'form',
        component: () => import('@views/ui/Form.vue'),
        meta: {
          title: '表单',
          icon: 'clarity:user-solid',
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
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'admin',
    children: menuList,
  },
]
