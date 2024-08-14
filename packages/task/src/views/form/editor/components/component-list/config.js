// 所有的组件
export const components_list_config = [{
  name: '基础组件',
  id: 'base',
  children: [{
    id: 'FormInput',
    name: '输入框',
  }, {
    id: 'FormTextarea',
    name: '多行输入框',
  }, {
    id: 'FormSelect',
    name: '下拉框',
  }, {
    id: 'FormDate',
    name: '日期时间',
  }, {
    id: 'FormUpload',
    name: '附件上传',
  }, {
    id: 'FormPlainText',
    name: '纯文本',
  }, {
    id: 'FormRichText',
    name: '富文本',
  }, {
    id: 'FormOuterComp',
    name: '外部组件',
  }],
}, {
  name: '布局组件',
  id: 'layout',
  children: [{
    id: 'FormDivider',
    name: '分割线',
  }, {
    id: 'FormFlex',
    name: '栅格布局',
  }],
}, {
  name: '任务组件',
  id: 'task',
  children: [{
    id: 'FormTitle',
    name: '任务标题',
  }, {
    id: 'FormLevel',
    name: '任务等级',
  }, {
    id: 'FormCycleDays',
    name: '循环周期',
  }, {
    id: 'FormDeadline',
    name: '任务期限',
  }, {
    id: 'FormPersonSelect',
    name: '人员选择',
  }, {
    id: 'FormTaskUser',
    name: '人员筛选',
  }, {
    id: 'FormOrg',
    name: '组织选择',
  }, {
    id: 'FormSupplement',
    name: '补充数据',
  }],
}, {
  name: '业务组件',
  id: 'task',
  children: [{
    id: 'AlarmSelect',
    name: '警情选择',
  },
  ],
}]
