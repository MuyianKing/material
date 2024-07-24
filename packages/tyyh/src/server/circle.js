import http from '../hooks/request'

import api from '../api'
/**
 * 获取列表
 *  @param {object} params
 * @param {string} params.query  查询（圈层或者id模糊查询）
 */
export async function getList(params = {}) {
  const data = await http.post(api.circle, {
    opt: 'get_circle_list',
    ...params,
  })
  return data
}
