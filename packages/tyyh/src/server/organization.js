import http from '../utils/request'
import api from '../api'

/**
 * 获取组织机构列表
 * @param {*} params
 */
export async function getList(params) {
  return http.post(api.org, {
    opt: 'organization_tree',
    ...params,
  })
}

/**
 * 根据ID获取单位信息
 * @param {string} ids
 */
export async function getOrgInfo(ids) {
  const result = await http.post(api.org, {
    opt: 'organization_list',
    organization_id: ids,
  })

  if (result.data) {
    return result.data
  }

  return []
}

/**
 * 获取组织机构列表：会根据用户层级返回单位数据
 * @param {*} params
 */
export async function getTreeList(params = {}) {
  return http.post(api.org, {
    opt: 'organization_tree',
    need_top: 0,
    ...params,
  })
}
