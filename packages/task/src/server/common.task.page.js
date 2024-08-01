import api from '../api'
import { formatTaskParamsType } from './task'

export async function getList(params) {
  const result = await hl.http.post(api.taskInfoList, {
    ...params,
    type: params.list_type,
  })

  result.header_config = result.data.header?.map((item) => {
    return {
      label: item.name,
      prop: item.item,
    }
  }) || []

  result.count = result.data.total
  result.data = result.data.list
  return result
}

// 获取查询条件
export async function taskQueryGet(config_uuid) {
  const result = await hl.http.post(api.taskQueryGet, { config_uuid })
  return formatTaskParamsType(result.data || [])
}

// 获取可操作的按钮
export async function getOptBtn(config_uuid) {
  const result = await hl.http.post(api.taskListBtn, { config_uuid })
  return result?.data || {}
}

// 获取配置的单位数据
export async function getOrgList(config_uuid) {
  const result = await hl.http.post(api.taskListOrgGet, {
    config_uuid,
  })

  return {
    selected: result.data.list || [],
    all_org: result.data.all_org || [],
  }
}

/**
 * 设置单位
 * @param params
 * @param {string} params.config_uuid  任务模板ID
 * @param {Array<string>} params.orgs  单位
 */
export async function setOrg(params) {
  return hl.http.post(api.taskListOrgSet, params)
}

/**
 * 为单位设置指定任务模板的联络人
 * @param params
 * @param {string} params.config_uuid
 * @param {Array} params.id_cards
 * @param {string} params.organization_id
 */
export async function setLinkPerson(params) {
  return hl.http.post(api.taskListUserSet, params)
}

/**
 * 根据模板id获取各个单位设置的联络人
 * @param params
 * @param {string} params.config_uuid 模板ID
 * @returns {Promise<Array>} 联络人数据
 */
export async function getLinkPerson(params) {
  return hl.http.post(api.taskListUserGet, params)
}

/**
 * 根据模板id获取各个单位设置的联络人
 * @param params
 * @param {string} params.config_uuid 模板ID
 * @returns {Promise<Array>} 联络人数据
 */
export async function getLinkPersonOne(params) {
  const result = await getLinkPerson(params)

  return result?.data[0] || null
}

/**
 * 设置自定义条件
 * @param {object} params
 * @param {string} params.config_uuid 模板ID
 * @param {Array} params.items 参数
 */
export async function setQuery(params) {
  return hl.http.post(api.taskListQuerySet, params)
}

/**
 * 根据任务模板ID获取自定义条件
 * @param {string} config_uuid 模板ID
 */
export async function getQuery(config_uuid) {
  const data = await hl.http.post(api.taskListQueryGet, {
    config_uuid,
  })
  return data.data.map(item => item.item)
}

/**
 * 设置自定义表头
 * @param {object} params
 * @param {string} params.config_uuid 模板ID
 * @param {Array} params.items 参数
 */
export async function setHeader(params) {
  return hl.http.post(api.taskListListSet, params)
}

/**
 * 根据任务模板ID获取所有自定义表头
 * @param {string} config_uuid 模板ID
 * @return {Promise<Array>} 所有表头字段
 */
export async function getAvailableHeader(config_uuid) {
  const data = await hl.http.post(api.taskListParamsGet, {
    config_uuid,
  })

  return data?.data || []
}

/**
 * 根据任务模板ID获取已配置自定义表头
 * @param {string} config_uuid 模板ID
 * @return {Promise<Array<string>>} 已配置自定义表
 */
export async function getHeader(config_uuid) {
  const data = await hl.http.post(api.taskListLiastGet, {
    config_uuid,
  })
  return data.data.map(item => item.item)
}
