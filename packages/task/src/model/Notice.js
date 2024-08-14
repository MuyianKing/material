import { cloneDeep } from 'lodash-es'

export default class Notice {
  constructor(model = {}) {
    model = cloneDeep(model || {})

    // id
    this.id = model.id || ''

    // 标题内容
    this.title = model.title || ''

    // 附件
    this.filename = model.filename || ''
  }
}
