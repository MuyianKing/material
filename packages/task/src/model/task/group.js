import ComplexUser from '../../model/ComplexUser'

export default class TaskGroup {
  constructor(model = {}) {
    model = model || {}

    this.group_id = model.group_id || ''

    // 名称
    this.group_name = model.group_name || ''

    // 任务专题
    this.remark = model.remark || ''

    // 	管理权限
    this.glry_qx = model.glry_qx || new ComplexUser()
  }
}
