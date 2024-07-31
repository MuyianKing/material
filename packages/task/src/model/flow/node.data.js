import { getLabelByVal } from '@hl/utils/common'
import { node_list } from '../../default/flow'

/**
 * 节点数据
 */
export default class NodeData {
  constructor(model = {}) {
    model = model || {}

    this.id = model.id || ''

    // 节点类型：取自@def/flow/node_list
    this.type = model.type || 'WorkNode'

    // 结束节点不需要关联表单
    if (this.type !== 'EndNode') {
      // 关联的表单ID
      this.form_id = model.form_id || ''
    }

    const node_config = getLabelByVal(node_list, this.type, {
      value: 'type',
      obj: true,
    })

    // 基础配置
    this.base_config = new node_config._constructor({
      ...(model.base_config || node_config.base_config),
      type: this.type,
    })
  }
}
