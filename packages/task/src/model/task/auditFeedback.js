export class AuditFeedback {
  constructor(model = {}) {
    // id
    this.id = model.id || ''

    // 原因
    this.remark = model.remark || ''

    // 审批结果
    this.result = model.result || ''
  }
}
