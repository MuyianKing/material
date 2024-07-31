import { getLabelByVal } from '@hl/utils/common'
import { deductionType, taskStatusOptions } from '../default/instruct'
import wjpcs from '../api/wjpcs'
import http from '../hooks/request'

/**
 * 获取局长指令列表
 * @param {object} params
 * @param {string} params.query 查询条件 可以根据指令标题，指令内容，拟办意见查询
 * @param {string} params.type 类型 我的下发。。。
 * @param {string} params.task_id 任务ID
 * @param {number} params.page 页码
 * @param {number} params.limit 页大小
 * @param {string} params.create_start_time 创建开始时间
 * @param {string} params.create_end_time 创建结束时间
 * @param {string} params.organization 组织机构
 */
export async function getJzzlList(params) {
  const data = await http.post(wjpcs.jzzlList, params)
  data.count = data.data.total
  data.header = data.data.header || ''
  data.resource = data.data.resource || false
  data.data = data.data.list || []
  data.data.forEach((item) => {
    const color = getLabelByVal(taskStatusOptions, item['任务状态'], { label: 'color' })
    item['任务状态'] = [{ html: item['任务状态'], color, name: [] }]
  })
  return data
}

/**
 * @param task_id 任务ID
 * @param list_type 惹怒我类型
 * @returns {Promise<void>}
 */
export async function getJzzlOne(task_id, list_type) {
  const data = await getJzzlList({ task_id, list_type })

  if (data.data[0]) {
    return data.data[0]
  }

  throw new Error('未获取到局长指令信息')
}

/**
 * 局长指令类型选择
 * @param {object} params
 */
export async function getJzzlType(params) {
  try {
    const data = await http.post(wjpcs.jzzlType, params)
    return data.data.map(item => ({ label: item, value: item }))
  } catch (error) {
    hl.message.error(error, '获取局长指令类型失败')
    throw error
  }
}

/**
 * 局长指令组织机构选择
 */
export async function getJzzlOrg() {
  return http.post(wjpcs.jzzlOrg)
}

/**
 * 局长指令导出
 * @param {object} params 导出参数（获取局长指令列表接口参数）
 */
export async function exportJzzl(params) {
  return http.download(wjpcs.jzzlExport, params)
}

/**
 * 局长指令统计
 * @param {object} params
 */
export async function getJzzlCount(params) {
  return http.post(wjpcs.jzzlCount, params)
}

const rowKeys = [
  {
    label: '未签收',
    label_type: 1,
    key: 'un_sgin',
  },
  {
    label: '已签收',
    label_type: 2,
    key: 'sign',
  },
  {
    label: '超时签收',
    label_type: 3,
    key: 'sign_out_time',
  },
  {
    label: '未反馈',
    label_type: 4,
    key: 'un_work',
  },
  {
    label: '已反馈',
    label_type: 5,
    key: 'work',
  },
  {
    label: '超时反馈',
    label_type: 6,
    key: 'work_out_time',
  },
  {
    label: '总计',
    label_type: -1,
    key: 'total',
  },
]

/**
 * 局长指令任务统计
 * @param {object} params
 * @param {string} params.create_start_time 创建开始时间
 * @param {string} params.create_end_time 创建结束时间
 */
export async function getJzzlTaskCount(params) {
  if (!params.type)
    params.type = ''

  const result = await http.post(wjpcs.jzzlTaskCount, params)
  const header = [{
    key: 'organization',
  }, ...rowKeys]

  // 总计
  const total_data = {
    un_sgin: 0,
    sign: 0,
    sign_out_time: 0,
    un_work: 0,
    work: 0,
    work_out_time: 0,
    total: 0,
  }
  const data = result.data.filter(item => item.organization_id).map((item) => {
    for (const key in total_data) {
      total_data[key] += item[key]
    }

    return item
  })
  data.push({ organization: '分局统计', type: 'total', ...total_data })
  return {
    data,
    count: 0,
    header,
  }
}

/**
 * 局长指令扣分情况
 * 同上
 */
export async function getJzzlScore(params) {
  return http.post(wjpcs.jzzlScore, params)
}

/**
 * 扣分记录
 * @param {object} params
 * @param {string} params.create_start_time 创建开始时间
 * @param {string} params.create_end_time 创建结束时间
 * @param {string} params.organization 组织机构 (必填)
 * @param {string} params.type 类型（扣分类型 1：签收超时，2：反馈超时，3：24h未签收，4：24h未反馈）
 */
export async function getJzzlScoreRecord(params) {
  const data = await http.post(wjpcs.jzzlScoreList, params)
  data.data?.forEach((item) => {
    item.scoreType = getLabelByVal(deductionType, item.type, { obj: true })
  })

  return data
}

/**
 * 导出局长指令
 * @param {string} params.create_start_time 创建开始时间
 * @param {string} params.create_end_time 创建结束时间
 * @param {string} params.list_type 列表类型 1：局长治理。2；督办指令
 * @param {string} params.type 类型（扣分类型 1：签收超时，2：反馈超时，3：24h未签收，4：24h未反馈）
 */
export async function exportJzzlCount(params) {
  return http.download(wjpcs.exportJzzlCount, params)
}
