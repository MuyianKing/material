import http from '../hooks/request'
import api from '../api'

/**
 * 获取任务清单
 * @returns {Promise<Array>} 任务列表
 */
export async function getTaskList() {
  const result = await http.post(api.benchesTaskList)
  return result?.data || []
}

/**
 * 设置任务清单
 * @param config_List
 * @returns {Promise<*>}
 */
export async function setTaskList(config_List) {
  return http.post(api.benchesTaskSet, {
    subs: filteNoUseFields(config_List),
  })
}

function filteNoUseFields(list) {
  list.forEach((item) => {
    delete item.value
    delete item.unfinish

    if (item.children) {
      return filteNoUseFields(item.children)
    }
  })

  return list
}

/**
 * 我的任务
 */
export function myTaskCount() {
  return http.post(api.myTaskCount)
}

/**
 * 获取关注任务列表
 */
export function getTaskSubscriptionList() {
  return http.post(api.taskSubscriptionList)
}

/**
 * 获取任务模板树
 */
export function getConfigTree() {
  return http.post(api.benchesConfigTree)
}

/**
 * 配置关注任务
 */
export function setSubscriptionTask(params) {
  return http.post(api.benchesSubscriptionTask, params)
}

/**
 * 取消任务
 */
export function cancelTask(params) {
  return http.post(api.benchesTaskCancel, params)
}

// 获取是否监控任务数据
export async function isBenchesJK() {
  return await http.post(api.benchesJKRYGet)
}

// 设置是否监控任务数据
export async function setBenchesJK(params) {
  await http.post(api.benchesJKRYSet, params)
}

/**
 * 设置是否显示组组任务
 * @param {number} info_group 组任务信息 0:不显示 1:显示
 */
export async function setGroupTaskShow(info_group) {
  return await http.post(api.benchesInfoGroupSet, { info_group })
}
