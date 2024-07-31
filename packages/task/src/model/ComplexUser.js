import { cloneDeep } from 'lodash-es'

export default class ComplexUser {
  constructor(model = {}) {
    model = cloneDeep(model || {})

    // 人员
    this.id_cards = model.id_cards || []

    // 职务
    this.jobs = model.jobs || []

    // 单位
    this.organizations = model.organizations || []

    // 角色
    this.roles = model.roles || []

    // 圈层
    this.circles = model.circles || []

    // 表单内联系人
    this.form_user = model.form_user || []

    // 排除人员
    this.exclude_id_cards = model.exclude_id_cards || []

    // 单位层级
    this.dwcjs = model.dwcjs || []

    // 接口
    this.urls = model.urls || []

    // 补充单位节点
    this.extends_org = model.extends_org || ''
  }
}
