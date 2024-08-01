import { getLabelByVal } from '@hl/utils/es/common'
import api from '../api'
import { task_status_list } from '../default/task'

/**
 * 获取任务分组列表
 * @param {object} params
 * @param {number} params.create_endtime 创建结束时间
 * @param {number} params.create_starttime 创建开始时间
 * @param {string} params.query 查询关键字（标题）
 */
export async function getList(params) {
  const res = await hl.http.post(api.infoGroupList, params)
  res.data.forEach((item) => {
    const a_organization = item.a_organization || []
    item.a_organization = a_organization.map((org) => {
      const status = getLabelByVal(task_status_list, org.status, { obj: true })
      return {
        ...org,
        statusName: status.label,
        statusColor: status.color,
      }
    })
  })
  return res
}

/**
 * 任务组列表置顶
 * @param {object} params
 * @param {number | string} params.info_group_id 任务分组id
 * @param {number} params.is_top 是否置顶 1置顶 2取消置顶
 */
export function setTop(params) {
  return hl.http.post(api.infoGroupToTop, params)
}

/**
 * 获取任务分组表头
 * @param {number | string} info_group_id 任务分组id
 */
export function getHeader(info_group_id) {
  return hl.http.post(api.infoGroupHeader, { info_group_id })
}

/**
 * 设置任务分组表头
 * @param {object} params
 * @param {number | string} params.info_group_id 任务分组id
 * @param {Array} params.items 表头配置
 */
export async function setHeader(params) {
  return hl.http.post(api.infoGroupSetItems, params)
}

/**
 * 查询条件
 * @param {number | string} info_group_id 任务分组id
 */
export function getWhere(info_group_id) {
  return hl.http.post(api.infoGroupWhere, { info_group_id })
}

/**
 * 设置查询条件
 * @param params
 * @param {number | string} params.info_group_id 任务分组id
 * @param {Array} params.where 查询条件
 */
export function setWhere(params) {
  return hl.http.post(api.infoGroupSetWhere, params)
}

/**
 * 任务组详情
 * @param {object} params
 * @param {number | string} params.info_group_id 任务分组id
 * @param {string} params.where 查询条件
 */
export async function getDetail(params) {
  const res = await hl.http.post(api.infoGroupDetail, {
    ...params,
    circle_index: params.circle_index === '' ? -1 : params.circle_index,
  })

  res.header_config = res.data.items || []
  res.count = res.data.count || 0
  res.circle = res.data.circle?.map((item, index) => {
    return {
      label: item,
      value: index,
    }
  }) || []

  if (res.circle?.length > 0 && params.circle_index === '') {
    params.circle_index = res.circle.length - 1
  }

  const data = res.data.data || []
  const _newData = []
  // 多条的工作处理返回的key（工作节点）
  const workKeys = res.header_config.filter(item => item.node_type === 'WorkNode').map(item => item.item)

  data.forEach((item, index) => {
    const status = getLabelByVal(task_status_list, item.status, { obj: true }) || {}
    item.status = [{
      value: item.status,
      html: status.label,
      color: status.color,
      name: [],
    }]
    console.log((params.page - 1) * params.limit + index + 1)
    item.special_index = (params.page - 1) * params.limit + index + 1

    // 没有内容全为空
    const emptyObj = {}
    workKeys.forEach((key) => {
      emptyObj[key] = ''

      // 数据没值的全部填空数组
      item[key] = item[key] || []
    })

    // 工作key对应的值数组的最大长度
    const len = workKeys.map(key => item[key].length)
    const maxLen = len.length > 0 ? Math.max(...len) : 0
    if (maxLen > 0) {
      const maxKey = workKeys[len.indexOf(maxLen)]
      item[maxKey].forEach((key, i) => {
        const itemObj = {
          ...item,
          row_num: i === 0 ? maxLen : undefined,
        }
        workKeys.forEach((wk) => {
          itemObj[wk] = item[wk][i] || ''
        })
        _newData.push(itemObj)
      })
    } else {
      _newData.push({ ...item, row_num: 1, ...emptyObj })
    }
  })

  res.data = _newData
  console.log(res)
  return res
}

/**
 * 查询参数
 * @param {number | string} info_group_id 任务分组id
 */
export function getParams(info_group_id) {
  return hl.http.post(api.infoGroupParams, { info_group_id })
}

/**
 * 导出任务分组详情
 * @param {object} params
 * @param {number | string} params.info_group_id 任务分组id
 * @param {string} params.where 查询条件
 */
export function exportDetail(params) {
  return hl.http.download(api.infoGroupExport, params)
}

/**
 * 任务组流程
 * @param {object} params
 * @param {number | string} params.info_group_id 任务分组id
 * @param {string} params.where 查询条件
 */
export function getFlow(params) {
  return hl.http.post(api.infoGroupProcess, params)
}
