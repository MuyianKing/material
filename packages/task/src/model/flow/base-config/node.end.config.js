import ComplexUser from '../../../model/ComplexUser'
import NodeBaseConfig from './node.base.config'

/**
 * 节点数据的基础配置
 */
export default class NodeEndConfig extends NodeBaseConfig {
  constructor(model = {}) {
    model = model || {}

    super(model)

    // 抄送人
    this.copyer = model.copyer || new ComplexUser()

    // 抄送人通知类型
    this.cc_type = model.cc_type || []

    // 抄送人通知内容
    this.cc_message = model.cc_message || '${app}中有一个抄送《${title}》任务处置结束，请注意查收'
  }
}
