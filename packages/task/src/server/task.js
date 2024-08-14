import { cloneDeep } from 'lodash-es'
import { getLabelByVal } from '@hl/utils/es/common'
import TaskDetail from '../model/task/detail'
import api from '../api'
import { task_status_list } from '../default/task'

/**
 * 发布任务
 */
export async function publishTask(params) {
  if (params.config_uuid) {
    delete params.config_id
  } else if (params.config_id) {
    delete params.config_uuid
  } else {
    throw new Error('任务模板编号缺失')
  }

  return hl.http.post(api.publish, params)
}

/**
 * 获取任务列表
 * @param {*} params
 */
export async function getTaskList(params) {
  const result = await hl.http.post(api.list, params)
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

/**
 * 根据ID获取任务信息
 * @param task_id 任务编号
 * @returns {Promise<*>}
 */
export async function getTaskOne(task_id) {
  const result = await hl.http.post(api.list, {
    task_id,
  })

  if (result.data.list[0]) {
    return result.data.list[0]
  }

  throw new Error('未获取到任务信息')
}

/**
 * 获取任务详情
 * @param {string} task_id 任务Id
 */
export async function getTaskById(task_id) {
  const result = await hl.http.post(api.taskOne, {
    task_id,
  })

  return new TaskDetail(result.data)
}

/**
 * 签收任务
 * @param {string} task_id 任务id
 * @param {string} id_card 签收人身份证 不传默认当前用户
 */
export function signTask(task_id, id_card = '') {
  const user = hl.getUserInfo()
  return hl.http.post(api.taskSign, {
    task_id,
    id_card: id_card || user.id_card,
  })
}

/**
 * 已读任务
 * @param {string} task_id 任务ID
 */
export function readTask(task_id) {
  return hl.http.post(api.taskRead, {
    task_id,
  })
}

/**
 * 更新|处置任务
 * @param {string} task_id 任务ID
 * @param {object} content 处置表单内容
 * @param {*} finish 任务是否处置完成: 1: 处置完成，0:处置中
 * @param {*} id_card 处置人员 不传默认当前用户
 */
export function finishTask(task_id, content, finish, id_card = '') {
  if (content.id) {
    const id = content.id
    delete content.id
    return hl.http.post(api.taskupdateResult, {
      content,
      id,
    })
  } else {
    const user = hl.getUserInfo()
    return hl.http.post(api.taskFinish, {
      task_id,
      content,
      finish,
      id_card: id_card || user.id_card,
    })
  }
}

/**
 * 审批任务
 * @param {string} task_id 任务ID
 * @param {object} content 处置表单内容
 */
export function auditTask(task_id, content) {
  return hl.http.post(api.taskAudit, {
    task_id,
    content,
  })
}

/**
 * 获取已配置的任务列表参数
 * @returns {Promise<Array>} list
 */
export async function getTaskBenchesParams() {
  let result = await hl.http.post(api.taskBenchesParams)

  result = result?.data || []

  return formatTaskParamsType(result)
}

// 处理自定义搜索添加的数据格式
export function formatTaskParamsType(data) {
  const _data = cloneDeep(data)
  _data.forEach((item) => {
    // range是select的待选项需要转换为{label:'',value:''}
    if (item.range && typeof item.range === 'object') {
      item.options = []
      for (const key in item.range) {
        item.options.push({
          label: item.range[key],
          value: key,
        })
      }
    }
  })
  return _data
}

/**
 * 获取可配置的参数
 */
export async function getParams() {
  const result = await hl.http.post(api.taskParams)
  return result.data || []
}

/**
 * 设置列表查询参数
 * @param { Any } items
 * @return { Promise<Array> }} items 参数的key组成的数组
 */
export function setBenchesParams(items) {
  return hl.http.post(api.setBenchesParams, {
    items,
  })
}

/**
 * 设置列表表头
 * @param { Any } items 表头字段的key组成的数组
 */
export function setHeadersParams(items) {
  return hl.http.post(api.setHeaderParams, {
    items,
  })
}

/**
 * 获取列表可配置表头
 */
export async function getHeadersParams() {
  const result = await hl.http.post(api.getHeaderParams)

  return result.data || []
}

/**
 * 延长任务完成时间
 * @param {object} params
 */
export async function delayTask(params) {
  return hl.http.post(api.taskAdditionalDelay, params)
}

/**
 * 撤销延时申请
 * @param {string} task_id
 */
export async function revDelayTask(task_id) {
  return hl.http.post(api.taskRevDelay, { task_id })
}

/**
 * 撤销移交申请
 * @param {string} task_id
 */
export async function revTurnOverTask(task_id) {
  return hl.http.post(api.taskRevTurnOver, { task_id })
}

/**
 * 审批呈请延长
 * @param {object} params
 */
export async function examinesDelayTask(params) {
  return hl.http.post(api.taskExaminesDelay, params)
}

/**
 * 审批移交申请
 * @param {object} params
 */
export async function examinesTurnOverTask(params) {
  return hl.http.post(api.taskTurnOverDelay, params)
}

/**
 * 移交
 * @param {object} params
 */
export async function moveTask(params) {
  params = cloneDeep(params)

  params.id_card = params.id_card[0]
  return hl.http.post(api.taskAdditionalMove, params)
}

/**
 * 上传创建任务
 * @param {object} params
 */
export async function uploadCreateTask(params) {
  return hl.http.post(api.taskConfigImport, params)
}

/**
 * 确认上传创建任务
 * @param {object} params
 */
export async function confirmUploadCreateTask(params) {
  const result = await hl.http.post(api.taskConfigConfirm, params)
  return result?.data
}

/**
 * 添加工作要求
 * @param {object} params
 */
export async function addWorkAskFor(params) {
  return hl.http.post(api.taskAddWorkAskFor, params)
}

/**
 * 删除工作要求
 * @param {string} result_id
 */
export async function removeWorkAskFor(result_id) {
  return hl.http.post(api.taskRemoveWorkAskFor, { result_id })
}

/**
 * 根据单位、职务、角色、接口等获取人员列表
 * @param {*} params
 * @param {boolean} split_org_job  是否根据单位、职位拆分用户
 * @returns {Array} 人员列表
 */
export async function getPersonByAll(params, split_org_job) {
  const result = await hl.http.post(api.multiplePerson, {
    ...params,
  })

  if (split_org_job) {
    const newValue = []
    result.data.forEach((item) => {
      item.organization.forEach((org) => {
        newValue.push({
          ...item,
          name: `${item.name}（${org.organization_name} - ${org.job_name}）`,
          id_card: `${org.organization_id}/${org.job_id}/${item.id_card}`,
        })
      })
    })

    result.data = newValue
  }

  return result
}

/**
 * 获取本级任务
 */
export async function getTaskStep(params) {
  return hl.http.post(api.taskStatistics, params)
}

/**
 * 任务管理（我创建的）
 * @param {object} params
 * @param {string} params.task_id 任务ID
 * @param {string} params.create_start_time 开始时间
 * @param {string} params.create_end_time 结束时间
 */
export async function taskManagement(params) {
  const data = await hl.http.post(api.taskMyCreate, params)
  data.data.forEach((item) => {
    const statusObj = getLabelByVal(task_status_list, item.status, { obj: true }) || {}
    item.statusConfig = [{ html: statusObj.label, color: statusObj.color, name: [] }]
  })
  return data
}

/**
 * 获取单个
 * @param {string} task_id 任务ID
 */
export async function getTaskManagerOne(task_id) {
  return taskManagement({ task_id })
}

/**
 * 删除任务
 * @param {Array | string} task_id
 */
export function deleteTask(task_id) {
  const task_ids = Array.isArray(task_id) ? task_id : [task_id]
  return hl.http.post(api.taskDelete, { task_id: task_ids })
}

/**
 * 启动任务
 * @param {string} task_id 任务ID
 * @param {string} start_time 启动时间
 */
export function startTask(task_id, start_time) {
  const task_ids = Array.isArray(task_id) ? task_id : [task_id]
  return hl.http.post(api.taskStart, { task_id: task_ids, start_time: start_time || undefined })
}

/**
 * 我管理的
 * @param {object} params
 */
export async function taskMyManage(params) {
  const data = await hl.http.post(api.taskMyManage, params)
  data.data.forEach((item) => {
    const statusObj = getLabelByVal(task_status_list, item.status, { obj: true }) || {}
    item.statusConfig = [{ html: statusObj.label, color: statusObj.color, name: [] }]
  })
  return data
}

/**
 * 调度任务 （管理的）
 * @param {object} params
 * @param {string} params.task_id 任务ID
 * @param {string} params.deploy 调度类型 1：两个人员之间调度 2：检测到人员变化 3：指定某个节点调度, 添加一个人  4: 删除一个人
 */
export async function taskDeploy(params) {
  return hl.http.post(api.taskDeploy, params)
}

/**
 * 任务模型列表
 * @param {object} params
 */
export async function taskModelList(params) {
  return hl.http.post(api.infoTaskModelList, params)
}

/**
 * 获取任务通知人员
 * @param {object} params
 * @param {string} params.task_id 任务ID
 */
export async function taskGetDing(params) {
  return hl.http.post(api.taskGetDing, params)
}

/**
 * 再次发布任务通知
 * @param {object} params
 * @param {string} params.task_id 任务ID
 * @param {string} params.id_card 通知人员
 */
export async function taskDing(params) {
  return hl.http.post(api.taskDing, params)
}

/**
 * 移交任务
 * @param {object} params
 * @param {string} params.task_id 任务ID
 * @param {string} params.new_id_card 移交人员
 */
export async function taskTurnOver(params) {
  return hl.http.post(api.taskTurnOver, {
    ...params,
    new_id_card: params.new_id_card.join(','),
  })
}

/**
 * 转派任务
 * @param {object} params
 * @param {string} params.task_id 任务ID
 * @param {string} params.new_id_card 转派人员
 */
export async function taskRedeploy(params) {
  return hl.http.post(api.taskRedeploy, {
    ...params,
    new_id_card: params.new_id_card.join(','),
  })
}

/**
 * 完成任务
 * @param {object} params
 * @param {string} params.task_id 任务ID
 */
export function taskSuccess(params) {
  return hl.http.post(api.taskSuccess, params)
}

/**
 * 获取控制台未完成任务数量
 * @returns {Promise<{
 * unfinish:"未完成数量"
 * }>} 数量
 */
export async function getUnfinishTask() {
  const result = await hl.http.post(api.taskUnfinish)
  return {
    unfinish: result.data,
  }
}

/**
 * 获取通用未完成任务数量
 * @returns {Promise<>} 数量
 */
export async function getCommonUnfinish(config_uuid) {
  const result = await hl.http.post(api.taskInfoUnfinish, {
    config_uuid,
  })
  return result.data || []
}

/**
 * 获取任务详情组件所需操作
 * @param taskId 任务ID
 * @returns {Promise<{result: TaskDetail, outer_comp_ids: *[]}>} data
 */
export async function getTaskDetailData(taskId) {
  const result = await getTaskById(taskId)

  // 去掉选人组件
  if (result.start_node && result.start_node.form_config && result.start_node.form_config.form_field_list) {
    result.start_node.form_config.form_field_list = result.start_node.form_config.form_field_list.filter(item => item.key !== 'FormTaskUser')
  }

  const content = result.start_node.form_content || {}
  const _outer_comp_ids = Object.keys(content).filter(key => key.includes('FormOuterComp')).map(key => content[key]?.id).filter(val => val)

  return {
    _outer_comp_ids,
    result,
  }
}

/**
 * 备注任务
 * @param params
 * @returns {*}
 */
export function remarkTask(params) {
  return hl.http.post(api.taskNodeHandle, params)
}

/**
 * 审批反馈-列表
 * @param params
 * @returns {*}
 */
export function taskAuditFeedbackList(params) {
  return hl.http.post(api.taskAuditFeedbackList, params)
}

/**
 * 审批反馈-审批
 * @param params
 * @returns {*}
 */
export function taskAuditFeedbackAudit(params) {
  return hl.http.post(api.taskAuditFeedbackAudit, params)
}
