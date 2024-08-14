import ComplexUser from '../../model/ComplexUser'

/**
 * 任务基本信息
 */
export default class BaseInfo {
  constructor(model = {}) {
    model = model || {}

    this.config_id = model.config_id

    // 任务名称
    this.config_name = model.config_name || ''

    // 事件管理
    this.event_manager = model.event_manager || ''

    // 分组ID
    this.group_id = model.group_id || ''

    // 图标配置
    this.logo = model.logo || 'fluent:shield-task-24-filled'

    // -------------------------基础权限-------------------------------
    // 谁可以管理更改此模板
    this.glry_qx = model.glry_qx || new ComplexUser()

    // 监控权限
    this.jkry_qx = model.jkry_qx || []

    // 任务创建范围：哪些人可以创建任务，默认全部人员
    this.cjfw_qx = model.cjfw_qx || new ComplexUser()

    // 任务下发范围
    this.xffw_qx = model.xffw_qx || new ComplexUser()

    // ------------------------呈请延长---------------------------------
    // 是否允许呈请延长，默认不允许:0不允许，1允许
    this.cqyc_rx = model.cqyc_rx || 0

    // 呈请延长最多允许次数
    this.cqyc_cs = model.cqyc_cs || 1

    // 呈请延长后是否通知审批人员：0：不通知，1：应用内通知，2：短信通知
    this.cqyc_tz = model.cqyc_tz || 0

    // 呈请延长短信通知内容
    this.cqyc_dx = model.cqyc_dx || ''

    // -------------------------批注-------------------------------------
    // 是否允许批注
    this.pzry_rx = model.pzry_rx || 0

    // 批注人员
    this.pzry_qx = model.pzry_qx || []

    // 批注后是否通知处置人员：0：不通知，1：应用内通知，2：短信通知
    this.pzry_tz = model.pzry_tz || 0

    // 短信通知内容：最长不能超过200
    this.pzry_dx = model.pzry_dx || ''

    // ---------------------------任务调度-----------------------------
    // 是否允许任务调度
    this.rwdd_rx = model.rwdd_rx || 0

    // 调度类型 0-人工确认调度(默认)  1-自动调度
    this.rwdd_type = model.rwdd_type || 0

    // 调度人员
    this.rwdd_qx = model.rwdd_qx || []

    // ----------------------------审批------------------------------
    // 是否允许审批，默认不允许审批:0不允许，1允许
    this.spry_rx = model.spry_rx || 0

    // 审批人员，数组结构，允许多次审批
    this.spry_qx = model.spry_qx || []

    // -------------------------移交申请-----------------------------
    // 是否允许移交申请：默认不允许:0不允许，1允许
    this.yjsq_rx = model.yjsq_rx || 0

    // 移交申请后是否通知审批人员：0：不通知，1：应用内通知，2：短信通知
    this.yjsq_tz = model.yjsq_tz || 0

    // 短信通知内容：最长不能超过200
    this.yjsq_dx = model.yjsq_dx || ''

    // ------------------------延时通知-----------------------------
    this.ystx_gz = model.ystx_gz || {
      // 是否开启定时通知
      fixed_time_enable: 0,

      // 定时通知时间：多个
      fixed_time: [],

      // 延迟通知:0-不开启  1-最长x小时合并  2-最短x小时合并
      delay_time_enable: 0,

      // 延长时间
      delay_time: 5,

      // 节点类型：流程中哪些类型的节点需要开启延迟通知
      delay_type: [1, 3, 9, 10, 11, 20],

      // 通知内容
      content: '${app}中您有${count}个任务需要处置，请及时处理',
    }

    // --------------------------其他-------------------------------
    // 流程配置
    this.process = model.process || []

    // 是否已经发布
    this.is_publish = model.is_publish || 0

    // 备注
    this.remark = model.remark || ''
  }
}
