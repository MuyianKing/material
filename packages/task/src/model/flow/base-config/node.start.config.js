import NodeBaseConfig from './node.base.config'

/**
 * 节点数据的基础配置
 */
export default class NodeStartConfig extends NodeBaseConfig {
  constructor(model = {}) {
    model = model || {}

    super(model)

    this.re_delivery = model.re_delivery || 0

    // 通知方式
    this.notice_type = model.notice_type || []

    // 通知内容：${title} - 占位任务标题
    this.notice_message = model.notice_message || '${app}中有一个《${title}》任务需要您重发，请注意查收'
  }
}
