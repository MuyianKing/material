export default class EditorStore {
  constructor(model = {}) {
    model = model || {}

    // 表单ID
    this.id = model.id || ''

    // 表单组件
    this.form_field_list = model.form_field_list || []

    // 表单基本配置
    this.form_config = model.form_config || {
      form_name: '未命名表单',
      // label的宽度
      label_width: 90,
    }

    // 当前高亮的组件ID
    this.active_form_item = ''

    // 当前高亮的组件配置
    this.property_config = {}
  }
}
