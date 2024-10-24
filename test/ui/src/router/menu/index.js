import Layout from '@layout/Main.vue'

export const menuList = [
  {
    path: '/3d',
    component: () => import('@views/3d/Index.vue'),
    meta: {
      title: '3D',
      icon: 'clarity:users-solid',
    },
  },
  {
    path: '/hooks',
    meta: {
      title: 'Hooks',
      icon: 'clarity:users-solid',
    },
    children: [
      {
        path: 'uselist',
        component: () => import('@views/hooks/UseList.vue'),
        meta: {
          title: 'UseList',
          icon: 'clarity:user-solid',
        },
      },
    ],
  },
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
      {
        path: 'number',
        component: () => import('@views/ui/Number.vue'),
        meta: {
          title: '数字',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'search-page',
        component: () => import('@views/ui/SearchPage.vue'),
        meta: {
          title: '查询页',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'descriptions',
        component: () => import('@views/ui/Descriptions.vue'),
        meta: {
          title: '描述列表',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'select-remote',
        component: () => import('@views/ui/SelectRemote.vue'),
        meta: {
          title: '远程下拉',
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
    redirect: '/ui/table',
    name: 'admin',
    children: menuList,
  },
]
