import { nanoid } from 'nanoid'

// 默认分页大小
export const pageSize = 20

/**
 * 判断字符串是否合法
 * @param {string} str
 * @returns boolean 如果时null、false、''、'false'、'null'、'NULL'、'undefined'返回false，否则返回true
 */
export function isTruth(str) {
  return !(!str || str === 'null' || str === 'NULL' || str === 'undefined' || str === 'false')
}

/**
 * 判断someArray里面是否有元素在arr里面
 * @param {Array} someArray
 * @param {Array} arr
 */
export function someInArray(someArray, arr) {
  let i = 0
  const len = someArray.length
  for (; i < len; i++) {
    if (arr.includes(someArray[i])) {
      break
    }
  }

  return i < len
}

export function guid(len = 16) {
  return nanoid(len).replace('-', '_')
}

export function getLabelByVal(array, val, config = {}) {
  const label = config.label || 'label'
  const value = config.value || 'value'
  const obj = config.obj || false
  for (let i = 0; i < array.length; i++) {
    if (val === array[i][value]) {
      if (obj) {
        return array[i]
      }
      return array[i][label]
    }
  }
  return null
}

/**
 * JSON 解析
 * @param {string} str
 * @param {*} def 解析失败返回值
 */
export function jsonparse(str, def = {}) {
  try {
    return JSON.parse(str)
  } catch (error) {
    return def
  }
}

/**
 * 数组去重
 * @param {Array} arr
 */
export const arrayUnion = arr => Array.from(new Set(arr))

/**
 * 首字母大写
 * @param {string} str
 */
export function firstUpcase(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * 将传入的字符串或数字转成可以直接使用到设置元素宽度是值
 * @param {string | number} str
 */
export function getCanUseValue(str) {
  if (Number.isNaN(+str)) {
    return str
  }

  return `${str}px`
}

/**
 * 获取地址栏参数
 * @param {string} key 参数名
 */
export function getUrlParam(key) {
  const params = useUrlSearchParams('history')

  let value = params[key]
  if (!value) {
    const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`)
    value = window.location.hash.split('?')[1]?.match(reg)?.[2] || ''
  }
  return value || ''
}

/**
 * 返回表达式值
 * @param {string} code 执行的表达式
 * @param {*} ctx 执行的环境
 */
export function evalByFun(code, ctx) {
  return new Function('global', `with(global){return ${code}}`).call(ctx, ctx)
}

export function convertToChinaNum(num) {
  const arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']// 可继续追加更高位转换值
  if (!num || Number.isNaN(num)) {
    return '零'
  }
  const english = num.toString().split('')
  let result = ''
  for (let i = 0; i < english.length; i++) {
    const des_i = english.length - 1 - i// 倒序排列设值
    result = arr2[i] + result
    const arr1_index = english[des_i]
    result = arr1[arr1_index] + result
  }
  // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零([千百十])/g, '零').replace(/十零/g, '十')
  // 合并中间多个零为一个零
  result = result.replace(/零+/g, '零')
  // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
  // 将【亿万】换成【亿】
  result = result.replace(/亿万/g, '亿')
  // 移除末尾的零
  result = result.replace(/零+$/, '')
  // 将【零一十】换成【零十】
  // result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十')
  return result
}
