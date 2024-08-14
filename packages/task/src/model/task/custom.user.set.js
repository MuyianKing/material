export default class CustomUserSet {
  constructor(model = {}) {
    model = model || {}
    // 模板ID
    this.config_uuid = model.config_uuid

    // 组织/职位/身份证
    this.id_cards = model.id_cards || []

    // 组织机构编码
    this.organization_id = model.organization_id || ''
  }
}
