import NodeStartConfig from '../model/flow/base-config/node.start.config'
import NodeSignConfig from '../model/flow/base-config/node.sign.config'
import NodeWorkConfig from '../model/flow/base-config/node.work.config'
import NodeEndConfig from '../model/flow/base-config/node.end.config'
import NodeAuditConfig from '../model/flow/base-config/node.audit.config'
import NodePcsConfig from '../model/flow/base-config/node.pcs.config'
import NodeRemarkConfig from '../model/flow/base-config/node.remark.config'

// 办理节点配置
export const work_node_config = {
  // 类型
  type: 'WorkNode',
  // 图标
  icon: 'twemoji:person-bowing',
  // 组件顶部背景颜色
  top_bg: '#5692ff',
  // 基础配置
  base_config: {
    // 标题
    title: '办理',
    sign: 'or',
  },
  _constructor: NodeWorkConfig,
}

// 审批人点配置
export const audit_node_config = {
  // 类型
  type: 'AuditNode',
  // 图标
  icon: 'twemoji:man-office-worker-medium-light-skin-tone',
  // 组件顶部背景颜色
  top_bg: '#ff8e56',

  // 基础配置
  base_config: {
    // 标题
    title: '审批',
    sign: 'or',
  },
  _constructor: NodeAuditConfig,
}

// 开始节点配置
export const start_node_config = {
  type: 'StartNode',
  icon: 'noto-v1:locked-with-pen',
  top_bg: '#7a939d',
  // 基础配置
  base_config: {
    // 标题
    title: '发起',
  },
  _constructor: NodeStartConfig,
}

// 签收节点配置
export const sign_node_config = {
  type: 'SignNode',
  icon: 'noto-v1:locked-with-pen',
  top_bg: '#67c23a',
  // 基础配置
  base_config: {
    // 标题
    title: '签收',
    sign: 'pass',
  },
  _constructor: NodeSignConfig,
}

// 结束节点配置
export const end_node_config = {
  type: 'EndNode',
  icon: 'noto-v1:locked-with-pen',
  top_bg: '#ff5656',
  base_config: {
    // 标题
    title: '结束',
  },
  _constructor: NodeEndConfig,
}

// 派出所节点配置
export const pcs_node_config = {
  category: 'other',
  type: 'PcsNode',
  icon: 'twemoji:oncoming-police-car',
  top_bg: '#1748a3',
  base_config: {
    // 标题
    title: '数字派出所',
  },
  _constructor: NodePcsConfig,
}

// 备注节点
export const remark_node_config = {
  category: 'other',
  type: 'RemarkNode',
  icon: 'noto:bookmark-tabs',
  top_bg: '#7b7b78',
  base_config: {
    // 标题
    title: '备注',
  },
  _constructor: NodeRemarkConfig,
}

// 所有节点配置
export const node_list = [
  start_node_config,
  sign_node_config,
  work_node_config,
  audit_node_config,
  end_node_config,
  pcs_node_config,
  remark_node_config,
]

// 流转方式
export const sign_type_list = [{
  label: '会签',
  value: 'and',
}, {
  label: '或签',
  value: 'or',
}, {
  label: '过签',
  value: 'pass',
}]

export const is_multiple_handle = [{
  label: '是',
  value: 1,
}, {
  label: '否',
  value: 0,
}]

// 表单内联系人校验的字段
export const check_config = [{
  label: '处置人',
  key: 'handler',
  type: 'form_user',
}, {
  label: '抄送人',
  key: 'copyer',
  type: 'form_user',
}, {
  label: '协办人',
  key: 'helper',
  type: 'form_user',
}, {
  label: '初次处置期限',
  key: 'first_value',
  goto(form) {
    return form.first_unit === 3
  },
}, {
  label: '再次处置期限',
  key: 'second_value',
  goto(form) {
    return form.second_unit === 3
  },
}]
