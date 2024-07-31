import { cloneDeep } from 'lodash-es'
import { user_type_default } from '../default/form'
import CycledatModel from '../model/task/cycle.day'
import { getUserValueByType } from './user'
import { getFlatFields } from './form'

// 获取默认值
export function getDefault(row) {
  const _property = row._property
  // 设置了默认值
  if (_property.default_value) {
    return getDefaultValue(_property.default_value, _property)
  }

  // 上传组件多选
  if (row.key === 'FormUpload' && _property.upload_multiple) {
    return []
  }

  // 下拉框多选
  if (row.key === 'FormSelect' && _property.multiple) {
    return []
  }

  return ''
}

/**
 * 根据默认值配置返回默认值
 * @param {object} config 默认值配置
 * @returns value
 */
export function getDefaultValue(config, _property) {
  // 配置和表单数据不合法
  if (!config) {
    return ''
  }

  switch (config.type) {
    case 'custome':
    case 'select':
    case 'task_user':
    case 'form_upload':
      return config.value
    case 'datetime':
      return _getDatetimeDefault(config.value, _property)
    case 'math':
    case 'time_diff':
      return ''
    case 'circle_days':
      return new CycledatModel()
    case 'deadline':
      return ''
    default:
      return getUserValueByType(config.type)
  }
}

// datetime
function _getDatetimeDefault(config, _property) {
  switch (config) {
    case 'cur_time':
      if (_property.is_range) {
        return `${dayjs().format('YYYY-MM-DD 00:00:00')}_${dayjs().format('YYYY-MM-DD 23:59:59')}`
      }
      return dayjs().format('YYYY-MM-DD HH:mm:ss')
    default:
      break
  }
}

/**
 * 在提交表单前处理默认值 - 暂不需要
 * @param {object} form_data 表单数据
 * @param {Array} form_fields_config 表单项配置
 * @returns Object
 */
export function handleDefaultValueBeforeSubmit(form_data, form_fields_config) {
  form_data = cloneDeep(form_data)

  // 表单配置扁平化
  form_fields_config = getFlatFields(form_fields_config)

  // 提取默认值配置
  const default_config = {}
  form_fields_config.forEach((item) => {
    default_config[item.id] = item._property.default_value
  })

  // 所有用户类类型
  const user_type = user_type_default.map(item => item.value)

  for (const key in default_config) {
    const item = default_config[key]
    // 用户类表单显示的是指定的类型，但是提交给后端的始终是身份证号
    if (user_type.includes(item.type)) {
      // 1、获取默认值
      const value = getUserValueByType(item.type)
      // 2、判断默认值是否等于当前值：等于替换为身份证号，不等不操作
      if (value === form_data[key]) {
        form_data[key] = getUserValueByType('id_card')
      }
    }
  }

  return form_data
}
