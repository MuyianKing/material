// 行政案件
export default class {
  constructor(cause, orgJobIdcard = false) {
    cause = cause || {}
    this.organization = cause.organization_id || '' // 单位

    const { task_police } = cause
    if (orgJobIdcard) {
      this.idCard = cause.id_cards?.map(item => item.organization.map(e => `${e.organization_id}/${e.job_id}/${item.id_card}`)) || [] // 身份证号
    } else {
      this.idCard = task_police?.idCard || cause.id_cards?.map(item => item.id_card) || [] // 身份证号
    }
    this.policeId = task_police?.policeId || '' // 警号
  }
}
