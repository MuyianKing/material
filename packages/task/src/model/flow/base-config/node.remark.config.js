import ComplexUser from '../../../model/ComplexUser'
import NodeBaseConfig from './node.base.config'

/**
 * 节点数据的基础配置
 */
export default class NodeEndConfig extends NodeBaseConfig {
  constructor(model = {}) {
    model = model || {}

    super(model)

    // 名称配置的label
    this._name_label = model._name_label || '按钮名称'

    // 自定义节点ID
    this.custom_id = model.custom_id || ''

    // 自定义用户 0-一般配置  1-自定义  2-节点继承
    this.custom_user = model.custom_user || 0

    // 生效节点
    this.valid_nodes = model.valid_nodes || []

    // 处置人
    this.handler = model.handler || new ComplexUser()

    this.other_node = model.other_node || ''

    // 通知方式
    this.notice_type = model.notice_type || []

    // 通知内容：${title} - 占位任务标题
    this.notice_message = model.notice_message || '${app}中有一个《${title}》提交了一条信息，请注意查收'

    // 通知人员配置方式
    this.notice_user = model.notice_user || 0

    // 通知人员
    this.notice_handler = model.notice_handler || new ComplexUser()

    // 继承节点
    this.notice_node = model.notice_node || ''
  }
}
