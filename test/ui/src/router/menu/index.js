import Layout from '@layout/Main.vue'

export const menuList = [
  {
    path: '/hooks',
    meta: {
      title: 'Hooks',
      icon: 'fluent:window-dev-tools-16-filled',
    },
    children: [
      {
        path: 'uselist',
        component: () => import('@views/hooks/UseList.vue'),
        meta: {
          title: 'UseList',
          icon: 'gg:view-list',
        },
      },
    ],
  },
  {
    path: '/ui',
    meta: {
      title: 'UI',
      icon: 'material-symbols-light:design-services',
    },
    children: [
      {
        path: 'table',
        component: () => import('@views/ui/Table.vue'),
        meta: {
          title: '表格',
          icon: 'bx:table',
        },
      },
      {
        path: 'upload',
        component: () => import('@views/ui/Upload.vue'),
        meta: {
          title: '上传',
          icon: 'ant-design:cloud-upload-outlined',
        },
      },
      {
        path: 'dialog',
        component: () => import('@views/ui/Dialog.vue'),
        meta: {
          title: '弹窗',
          icon: 'material-symbols:dialogs-outline-rounded',
        },
      },
      {
        path: 'button',
        component: () => import('@views/ui/Button.vue'),
        meta: {
          title: '按钮',
          icon: 'iconoir:mouse-button-right',
        },
      },
      {
        path: 'icon',
        component: () => import('@views/ui/Icon.vue'),
        meta: {
          title: '图标',
          icon: 'mdi:emoticon-kiss-outline',
        },
      },
      {
        path: 'form',
        component: () => import('@views/ui/Form.vue'),
        meta: {
          title: '表单',
          icon: 'fa6-brands:wpforms',
        },
      },
      {
        path: 'date',
        component: () => import('@views/ui/Date.vue'),
        meta: {
          title: '日期时间',
          icon: 'fluent-mdl2:event-date',
        },
      },
      {
        path: 'number',
        component: () => import('@views/ui/Number.vue'),
        meta: {
          title: '数字',
          icon: 'fluent-mdl2:number-field',
        },
      },
      {
        path: 'search-page',
        component: () => import('@views/ui/SearchPage.vue'),
        meta: {
          title: '查询页',
          icon: 'ant-design:file-search-outlined',
        },
      },
      {
        path: 'select-remote',
        component: () => import('@views/ui/SelectRemote.vue'),
        meta: {
          title: '远程下拉',
          icon: 'radix-icons:dropdown-menu',
        },
      },
      {
        path: 'context-menu',
        component: () => import('@views/ui/Contextmenu.vue'),
        meta: {
          title: '右击菜单',
          icon: 'material-symbols-light:bottom-right-click-sharp',
        },
      },
      {
        path: 'page',
        component: () => import('@views/ui/Page.vue'),
        meta: {
          title: '分页',
          icon: 'carbon:page-break',
        },
      },
      {
        path: 'block-title',
        component: () => import('@views/ui/BlockTitle.vue'),
        meta: {
          title: '个性标题',
          icon: 'ph:subtitles-bold',
        },
      },
      {
        path: 'edit-info',
        component: () => import('@views/ui/EditInfo.vue'),
        meta: {
          title: '可编辑文本',
          icon: 'akar-icons:edit',
        },
      },
      {
        path: 'dropdown',
        component: () => import('@views/ui/Dropdown.vue'),
        meta: {
          title: '下拉组件',
          icon: 'fluent-mdl2:dropdown',
        },
      },
      {
        path: 'dropdown-casacader',
        component: () => import('@views/ui/DropdownCascader.vue'),
        meta: {
          title: '级联下拉',
          icon: 'carbon:ibm-cloud-direct-link-1-dedicated',
        },
      },
      {
        path: 'grid',
        component: () => import('@views/ui/Grid.vue'),
        meta: {
          title: 'Grid布局',
          icon: 'f7:square-grid-4x3-fill',
        },
      },
      {
        path: 'descriptions',
        component: () => import('@views/ui/Descriptions.vue'),
        meta: {
          title: '描述列表',
          icon: 'fluent:slide-text-24-regular',
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
