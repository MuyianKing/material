import http from '../hooks/request'
import api from '../api'

/**
 * 保存任务配置
 */
export function saveTaskConfig(params) {
  return http.post(params.config_id ? api.taskConfigEdit : api.taskConfigAdd, params)
}

/**
 * 发布任务配置
 */
export async function publishTaskConfig(params) {
  const data = await saveTaskConfig(params)
  const config_id = data.data.config_id

  return http.post(api.taskConfigPublish, {
    config_id,
  })
}

/**
 * 获取任务树
 * @param {*} params
 * @returns {Promise} data
 */
export async function getTaskTree(params) {
  const result = await http.post(api.taskTree, params)
  return result?.data || []
}

/**
 * groupList
 *根据任务id获取任务配置
 */
export async function getTaskConfigById(config_id) {
  const params = {}
  Number.isNaN(+config_id) ? params.config_uuid = config_id : params.config_id = config_id

  const result = await http.post(api.taskConfigOne, params)

  if (result?.data) {
    return result?.data
  }

  throw new Error('未获取到相关数据')
}

/**
 * 获取任务发布时所需的信息
 * @param {*} config_id
 */
export async function getPublishConfig(config_id) {
  const result = await getTaskConfigById(config_id)
  const property = result.process.nodes.filter(item => item.type === 'StartNode')[0]?.properties
  return {
    form_id: property.form_id,
    config_name: result.config_name,
  }
}

/**
 * 删除任务
 * @param {*} config_id
 */
export function delTaskConfig(config_id) {
  return http.post(api.taskConfigDel, {
    config_id,
  })
}

/**
 * 停用任务
 * @param {*} config_id
 */
export function stopTaskConfig(config_id) {
  return http.post(api.taskConfigStop, {
    config_id,
  })
}

/**
 * 起用任务
 * @param {*} config_id
 */
export function startTaskConfig(config_id) {
  return http.post(api.taskConfigStart, {
    config_id,
  })
}

/**
 * 下载模板
 * @param {String||Number} config_uuid 模板ID
 */
export async function exportTemplate(config_uuid) {
  return http.download(api.taskConfigExport, { config_uuid })
}
