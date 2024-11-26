import { isEmail, isIP, isInt, isLatLong, isMobilePhone, isPort } from 'validator'
import { isTruth } from './common'

// vant-ui的校验回调
function vantCallback(data) {
  if (data instanceof Error) {
    return data.message
  }

  return data || ''
}

/**
 * 表单校验方法生成器
 * @param {object|null} rule 目前为element-plus校验中的校验规则，其他传null
 * @param {*} value 校验的值
 * @param {*} validateFun 校验的方法
 * @param {Function} callback 校验回调
 * @param {string} errorMsg 错误提示
 * @returns {Function} 校验方法
 */
export function validateService(rule, value, validateFun, callback, errorMsg) {
  callback = callback || vantCallback

  value = getValue(rule, value, callback)
  if (!isTruth(value)) {
    return callback()
  }

  if (validateFun(`${value}`)) {
    return callback()
  } else {
    return callback(new Error(errorMsg))
  }
}

// 获取值
function getValue(rule, value, callback) {
  // vant-ui取第二个参数
  if (callback === vantCallback) {
    value = rule
  }

  return value
}

// 验证表单是整数
export function v_int(rule, value, callback) {
  return validateService(rule, value, isInt, callback, '只能是整数')
}

// 验证表单是车牌
export function v_carnum(rule, value, callback) {
  return validateService(rule, value, () => {
    const car_num_reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4,5}[A-Z0-9挂学警港澳]$/
    return car_num_reg.test(value)
  }, callback, '车牌格式错误')
}

// 验证表单是端口号
export function v_port(rule, value, callback) {
  return validateService(rule, value, isPort, callback, '端口号格式错误')
}

// 验证表单是邮箱
export function v_email(rule, value, callback) {
  return validateService(rule, value, isEmail, callback, '邮箱地址格式错误')
}

// 验证表单手机号
export function v_phone(rule, value, callback) {
  return validateService(rule, value, isMobilePhone, callback, '手机号码格式错误')
}

// 验证座机
export function v_tel(rule, value, callback) {
  return validateService(rule, value, isTelphone, callback, '电话号码格式错误')
}

// 验证表单IP
export function v_ip(rule, value, callback) {
  return validateService(rule, value, isIP, callback, 'IP格式错误')
}

// 验证表单经纬度
export function v_latlong(lat, lon, callback) {
  return validateService(null, `${lat},${lon}`, isLatLong, callback, '经纬度格式错误')
}

// 验证表单身份证
export function v_id_num(rule, value, callback) {
  return validateService(rule, value, isIdcardAll, callback, '身份证格式错误')
}

// 验证手机号和座机号
export function v_phoneOrTel(rule, value, callback) {
  return validateService(rule, value, (val) => {
    return isMobilePhone(val) || isTelphone(val)
  }, callback, '电话号码格式错误')
}

// 判断身份证号是否合法
export function isIdNum(code) {
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  }
  let pass = true
  if (!code || !/^\d{6}(?:18|19|20)?\d{2}(?:0[1-9]|1[120])(?:0[1-9]|[12]\d|3[01])\d{3}(?:\d|X)$/i.test(code)) {
    pass = false
  } else if (!city[code.substr(0, 2)]) {
    pass = false
  } else if (code.length === 18) {
    code = code.split('')
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    let ai = 0
    let wi = 0
    for (let i = 0; i < 17; i++) {
      ai = code[i]
      wi = factor[i]
      sum += ai * wi
    }

    if (parity[sum % 11].toString() !== code[17].toString()) {
      pass = false
    }
  }
  return pass
}

// 判断对象给定的字段是否存在空值、null、undefined、0
export function isObjectEmpty(obj, keys) {
  for (let i = 0; i < keys.length; i++) {
    if (!obj[keys[i]]) {
      return true
    }
  }
  return false
}

// 检查是否是json字符串
export function isJson(str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  }
}

// 校验是否是电话号码
export function isTelphone(val) {
  const testFixedPhone = /^\d{5,}$/
  return testFixedPhone.test(val)
}

// 验证大陆身份证号或者港澳台身份证号或者护照
export function isIdcardAll(value) {
  return isGangAo(value) || isTaiwan(value) || isIdNum(value) || value === ''
}

/**
 * 校验是否为合法港澳身份证
 * @param {string} value
 * @returns {boolean} true|false
 */
export function isGangAo(value) {
  const testHongKong = /^[A-Z]\d{6,10}(?:\(\w\))?$/
  return testHongKong.test(value)
}

/**
 * 校验是否为合法台湾身份证
 * @param {string} value
 * @returns {boolean} true|false
 */
export function isTaiwan(value) {
  const testTaiwan = /^[A-Z]{1,2}\d{8}(?:\d{2})?$/
  return testTaiwan.test(value)
}
