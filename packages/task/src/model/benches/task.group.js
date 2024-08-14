export default class TaskGroup {
  constructor(model = {}) {
    model = model || {}

    // 包含的模版
    this.config_uuids = model.config_uuids || []

    // 任务组名称
    this.title = model.title || ''

    // 儿子
    this.subs = model.subs || []
  }
}
