import ComplexUser from '../../../model/ComplexUser'
import NodeBaseConfig from './node.base.config'

/**
 * 节点数据的基础配置
 */
export default class NodeSignConfig extends NodeBaseConfig {
  constructor(model = {}) {
    model = model || {}

    super(model)

    // 自定义用户
    this.custom_user = model.custom_user || 0

    // 处置人
    this.handler = model.handler || new ComplexUser()

    // 抄送人
    this.copyer = model.copyer || new ComplexUser()

    // 抄送人通知类型
    this.cc_type = model.cc_type || []

    // 抄送人通知内容
    this.cc_message = model.cc_message || '${app}中有一个抄送《${title}》任务抄送通知，请注意查收'

    // 协办人
    this.helper = model.helper || new ComplexUser()

    // 继承的其他节点的节点id
    this.other_node = model.other_node || ''

    // 流转方式 and-会签 or-会签 pass-过签
    this.sign = model.sign || 'pass'

    // 签收即已读
    this.read_is_sign = model.read_is_sign || 0

    // 通知方式
    this.notice_type = model.notice_type || []

    // 通知内容：${title} - 占位任务标题
    this.notice_message = model.notice_message || '${app}中有一个《${title}》任务需要您签收，请注意查收'

    // 初次处置期限
    this.first_unit = model.first_unit || 1
    this.first_value = model.first_value || ''

    // 再次处置期限
    this.second_unit = model.second_unit || 1
    this.second_value = model.second_value || ''

    // 是否跳过节假日
    this.pass_holiday = model.pass_holiday || 1

    // 是否办签
    this.is_has_pass = model.is_has_pass || 1

    // 临期通知
    this.near_type = model.near_type || []

    // 临期计算方式：1-小时  2-百分比
    this.near_unit = model.near_unit || 1

    // 小时数或者百分数
    this.near_value = model.near_value || 24

    // 通知时间
    this.near_notice_time = model.near_notice_time || '9-18'

    // 通知内容
    this.near_message = model.near_message || '${app}中有一个《${title}》任务即将过期，请注意签收'

    // 过期通知
    this.expired_type = model.expired_type || []

    // 抄送人通知内容
    this.expired_message = model.expired_message || '${app}中有一个任务已过期，请及时完成'
  }
}
