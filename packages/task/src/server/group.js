import api from '../api'

/**
 * 获取任务分组列表
 */
export function getList(params) {
  return hl.http.post(api.groupList, params)
}

/**
 * 保存任务专题
 */
export function saveGroup(params) {
  return hl.http.post(params.group_id ? api.groupEdit : api.groupCreate, params)
}

/**
 * 排序
 * @param {Array} group_ids 分组group_id组成的数组
 */
export function sortGroup(group_ids) {
  return hl.http.post(api.groupSort, { group_id: group_ids })
}

/**
 * 删除
 * @param {Array} group_id 分组id
 */
export async function delGroup(group_id) {
  if (!group_id) {
    throw new Error('缺少ID')
  }
  return hl.http.post(api.groupDel, { group_id })
}
