import { getLabelByVal } from '@hl/utils/common'

export default class TaskDetail {
  constructor(model = {}) {
    model = model || {}

    this.task_id = model.task_id || ''

    // 标题
    this.title = model.title || ''

    // 唯一编号
    this.config_uuid = model.config_uuid || ''

    // 创建时间
    this.create_time = (model.create_time || '').substring(5)

    // 审批
    this.a_node_audit = [{
      label: model.a_node_audit?.pass_label || '通过',
      value: 1,
    }, {
      label: model.a_node_audit?.reject_label || '驳回',
      value: 0,
    }]

    // 备注操作的节点配置
    this.a_node_info = model.a_node_info || {}

    // 任务开始时间
    this.work_starttime = (model.work_starttime || '').substring(5)

    // 任务截至时间
    this.work_endtime = (model.work_endtime || '').substring(5)

    // 任务状态
    this.status = model.a_status || ''

    // 当前可操作行为
    this.a_handle = model.a_handle || []

    this.a_handle_map = model.a_handle_map || {}

    // 当前可操作行为
    this.a_handle = model.a_handle || []

    // 当前节点的表单配置
    this.cur_node = {
      form_config: model.a_node_form || [],
    }

    // 任务处置流程
    this.result = model.a_result || []

    this.result.forEach((item) => {
      if (item.data?.content?.pass !== undefined) {
        item.data.content.pass_label = getLabelByVal(this.a_node_audit, item.data.content.pass)
      }
    })

    // 开始节点的配置信息
    this.start_node = {
      form_config: model.a_start_node_form || {},
      form_content: model.content || {},
    }

    // 创建人
    this.create_user = []
    const create_user = model.c_user || {}
    for (const key in create_user) {
      this.create_user.push(create_user[key])
    }

    this.create_user = this.create_user?.[0] || null
  }
}
