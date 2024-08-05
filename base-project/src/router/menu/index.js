import Layout from '@layout/Main.vue'

export const menuList = [
  {
    path: '/home',
    component: () => import('@hl/task/src/views/task/center/Index.vue'),
    meta: {
      title: '首页',
      icon: 'mage:layout-center-fill',
    },
  },
  {
    path: '/task/cz2',
    component: () => import('@hl/task/src/views/task/common-task-page/Index.vue'),
    meta: {
      title: '差旅管理',
      icon: 'mage:layout-center-fill',
      params: {
        config_uuid: 'GI5AC6CV9P',
      },
    },
  },
  {
    path: '/form/editor/index',
    component: () => import('@hl/task/src/views/form/editor'),
    meta: {
      title: '表单编辑',
      icon: 'fluent:settings-24-regular',
    },
  },
  {
    path: '/task',
    meta: {
      title: '自主指令',
      icon: 'clarity:users-solid',
    },
    children: [
      {
        path: 'manage/index',
        component: () => import('@hl/task/src/views/task/manage/Index.vue'),
        meta: {
          title: '任务管理',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'mould/index',
        component: () => import('@hl/task/src/views/task/mould/Index.vue'),
        meta: {
          title: '任务模板',
          icon: 'clarity:user-solid',
        },
      },
      {
        path: 'group/index',
        component: () => import('@hl/task/src/views/task/group/Index.vue'),
        meta: {
          title: '任务专题',
          icon: 'clarity:user-solid',
        },
      },
    ],
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
  path: '/task/design',
  redirect: '/task/design/base-config',
  component: () => import('@hl/task/src/views/task/design/index'),
  meta: {
    title: '任务编辑',
    icon: 'fluent:settings-24-regular',
  },
  children: [{
    path: 'base-config',
    component: () => import('@hl/task/src/views/task/design/components/base-config/Index.vue'),
    meta: {
      title: '基础配置',
      icon: 'icon-park-outline:log',
    },
  }, {
    path: 'flow',
    component: () => import('@hl/task/src/views/flow/editor'),
    meta: {
      title: '流程配置',
      icon: 'icon-park-outline:log',
    },
  }],
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
