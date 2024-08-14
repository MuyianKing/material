import ComplexUser from '../../../model/ComplexUser'
import NodeBaseConfig from './node.base.config'

/**
 * 节点数据的基础配置
 */
export default class NodeEndConfig extends NodeBaseConfig {
  constructor(model = {}) {
    model = model || {}

    super(model)

    // 自定义用户
    this.custom_user = model.custom_user || 0

    // 处置人
    this.handler = model.handler || new ComplexUser()
    this.handler_label = model.label || '联络人'

    // 继承的其他节点的节点id
    this.other_node = model.other_node || ''

    // 下发单位
    this.send_org = model.send_org || ''

    // 下发角色
    this.send_role = model.send_role || ''

    // 通知方式
    this.notice_type = model.notice_type || []

    // 通知内容：${title} - 占位任务标题
    this.notice_message = model.notice_message || '${app}中有一个《${title}》任务需要您处置，请注意查收'

    // 通知项目
    this.project_id = model.project_id || []

    // 初次处置期限
    this.first_unit = model.first_unit || 1
    this.first_value = model.first_value || ''

    // 再次处置期限
    this.second_unit = model.second_unit || 1
    this.second_value = model.second_value || ''
  }
}
