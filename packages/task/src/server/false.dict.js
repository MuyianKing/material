import http from '../hooks/request'
import api from '../api'

/**
 * 获取指定类型字典数据
 * @param {string} type 类型
 * @returns {Promise} list
 */
export async function getList(type) {
  const result = await http.post(api.dict, {
    label: type,
  })
  return result.data || []
}
