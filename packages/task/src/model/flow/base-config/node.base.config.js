/**
 * 节点数据的基础配置
 */
export default class NodeBaseConfig {
  constructor(model = {}) {
    model = model || {}

    // 节点名称
    this.title = model.title || ''

    // 自定义节点ID
    this.custom_id = model.custom_id || ''

    // 备注
    this.remark = model.remark || ''
  }
}
