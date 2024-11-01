import Layout from '@layout/Main.vue'

export const menuList = [
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
        path: 'date',
        component: () => import('@views/ui/Date.vue'),
        meta: {
          title: '日期时间',
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
        path: 'select-remote',
        component: () => import('@views/ui/SelectRemote.vue'),
        meta: {
          title: '远程下拉',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'context-menu',
        component: () => import('@views/ui/Contextmenu.vue'),
        meta: {
          title: '右击菜单',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'page',
        component: () => import('@views/ui/Page.vue'),
        meta: {
          title: '分页',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'block-title',
        component: () => import('@views/ui/BlockTitle.vue'),
        meta: {
          title: '个性标题',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'edit-info',
        component: () => import('@views/ui/EditInfo.vue'),
        meta: {
          title: '可编辑文本',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'dropdown',
        component: () => import('@views/ui/Dropdown.vue'),
        meta: {
          title: '下拉组件',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'dropdown-casacader',
        component: () => import('@views/ui/DropdownCascader.vue'),
        meta: {
          title: '级联下拉',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'grid',
        component: () => import('@views/ui/Grid.vue'),
        meta: {
          title: 'Grid布局',
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
