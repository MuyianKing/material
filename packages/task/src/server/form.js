import { cloneDeep } from 'lodash-es'
import api from '../api'
import { deletePropertyConfig } from '../hooks/form'

/**
 * 保存表单配置
 * @param {*} model
 */
export function saveFormConfig(model) {
  model = cloneDeep((model))
  deletePropertyConfig(model.form_field_list)
  return hl.http.post(model.form_id ? api.formEdit : api.formAdd, model)
}

/**
 * 根据表单ID获取表单配置
 * @param {string} form_id 表单ID
 */
export async function getFormById(form_id) {
  const result = await hl.http.post(api.formOne, {
    form_id,
  })

  if (result && result.data) {
    return result.data
  }

  throw new Error('未获取到表单信息')
}

export async function getSomeForms(form_ids) {
  const result = await hl.http.post(api.formSome, {
    form_id: form_ids,
  })

  if (result?.data) {
    return result.data
  }

  throw new Error('未获取到表单信息')
}
