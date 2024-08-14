// 任务类型
export const taskStatus = [{
  label: '我的任务',
  value: 89,
  unreadKey: 'count89',
  taskStatusOption: [{
    label: '未签收',
    value: 2,
  }, {
    label: '未完成',
    value: 3,
  }, {
    label: '已完成',
    value: 4,
  }],
}, {
  label: '待我审核',
  value: 11,
  unreadKey: 'count11',
  taskStatusOption: [{
    label: '未审批',
    value: 12,
  }, {
    label: '已审批',
    value: 13,
  }],
}, {
  label: '我的下发',
  value: 31,
  count: 60,
  unreadKey: 'count31',
}, {
  label: '全部任务',
  value: 99,
  count: 240,
  unreadKey: 'count99',
  taskStatusOption: [{
    label: '全部未完成',
    value: 97,
  }, {
    label: '全部已完成',
    value: 98,
  }, {
    label: '不属我监控的',
    value: 89,
  }],
}]

// 任务状态
export const taskStatusOptions = [
  {
    label: '异常',
    value: '异常',
    color: '#E6A23C',
  },
  {
    label: '未签收',
    value: '未签收',
    color: '#F56C6C',
  },
  {
    label: '未办结',
    value: '未办结',
    color: '#F56C6C',
  },
  {
    label: '已办结',
    value: '已办结',
    color: '#67C23A',
  },
]

// 扣分类型 扣分类型 1：签收超时，2：反馈超时，3：24h未签收，4：24h未反馈
export const deductionType = [
  {
    label: '签收超时',
    value: 1,
    type: 'danger',
  },
  {
    label: '反馈超时',
    value: 2,
    type: 'danger',
  },
  {
    label: '24h未签收',
    value: 3,
    type: 'warning',
  },
  {
    label: '24h未反馈',
    value: 4,
    type: 'warning',
  },
]
