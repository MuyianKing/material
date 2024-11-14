import validator from 'validator'
import { isTruth } from './common'

const { isInt, isPort, isMobilePhone, isIP, isLatLong, isEmail } = validator

// 验证表单是整数
export function v_int(rule, value, callback) {
  if (!isTruth(value)) {
    callback()
    return
  }
  if (isInt(`${value}`)) {
    callback()
  } else {
    callback(new Error('只能是整数'))
  }
}

// 验证表单是车牌
export function v_carnum(rule, value, callback) {
  if (!isTruth(value)) {
    callback()
    return
  }
  const car_num_reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4,5}[A-Z0-9挂学警港澳]$/
  if (car_num_reg.test(value)) {
    callback()
  } else {
    callback(new Error('车牌格式错误'))
  }
}

// 验证表单是端口号
export function v_port(rule, value, callback) {
  if (!isTruth(value)) {
    callback()
    return
  }
  if (isPort(`${value}`)) {
    callback()
  } else {
    callback(new Error('端口号格式错误'))
  }
}

// 验证表单是邮箱
export function v_email(rule, value, callback) {
  if (!isTruth(value)) {
    callback()
    return
  }
  if (isEmail(`${value}`)) {
    callback()
  } else {
    callback(new Error('邮箱地址格式错误'))
  }
}

// 验证表单手机号
export function v_phone(rule, value, callback) {
  if (!isTruth(value)) {
    callback()
    return
  }

  if (isMobilePhone(value, 'zh-CN')) {
    callback()
  } else {
    callback(new Error('手机号码格式错误'))
  }
}

// 验证座机
export function v_tel(rule, value, callback) {
  if (!isTruth(value)) {
    callback()
    return
  }
  const testFixedPhone = /^\d{5,}$/
  if (testFixedPhone.test(value)) {
    callback()
  } else {
    callback(new Error('电话号码格式错误'))
  }
}

// 验证表单IP
export function v_ip(rule, value, callback) {
  if (!isTruth(value)) {
    callback()
    return
  }
  if (isIP(value)) {
    callback()
  } else {
    callback(new Error('IP格式错误'))
  }
}

// 验证表单经纬度
export function v_latlong(lat, lon, callback) {
  if (!isTruth(lat) && !isTruth(lon)) {
    callback()
    return
  }

  if (isLatLong(`${lat},${lon}`)) {
    callback()
  } else {
    callback(new Error('经纬度格式错误'))
  }
}

// 验证表单身份证
export function v_id_num(rule, value, callback) {
  if (!isTruth(value)) {
    callback()
    return
  }
  if (isIdNum(value)) {
    callback()
  } else {
    callback(new Error('身份证格式错误'))
  }
}

// 验证手机号和座机号
export function v_phoneOrTel(rule, value, callback) {
  const testFixedPhone = /^0\d{2,3}-?\d{7,8}(-\d{1,6})?$/
  const testMobilePhone = /^1[3-9]\d{9}$/
  if (testFixedPhone.test(value) || testMobilePhone.test(value) || value === '') {
    callback()
  } else {
    callback(new Error('电话号码格式错误'))
  }
}

// 验证大陆身份证号或者港澳台身份证号或者护照
export function v_id_numOrPassport(rule, value, callback) {
  // 港澳身份证 /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
  const testHongKong = /^([A-Z]\d{6,10}(\(\w\))?)$/
  // 护照 /^([a-zA-z]|[0-9]){5,17}$/
  const testPassport = /^[A-Z0-9]{5,17}$/i
  if (testHongKong.test(value) || testPassport.test(value) || isIdNum(value) || value === '') {
    callback()
  } else {
    callback(new Error('身份证格式错误'))
  }
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
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[120])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
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
