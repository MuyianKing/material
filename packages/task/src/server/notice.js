import http from '../hooks/request'
import wjpcs from '../api/wjpcs'

/**
 * 获取通知列表
 * @param {object} params
 * @param {number} params.page 页码
 * @param {number} params.limit 页大小
 */
export async function getNoticeList(params) {
  const data = await http.post(wjpcs.noticeList, params)

  data.data.forEach((item) => {
    if (item.file_info) {
      item.file_info.name = item.file_info.fileName
    }
    item.noticeListName = item.noticeLogList.map(log => log.userInfo?.name).join('、')
    item.noticeLenght = item.noticeLogList?.length || 0
  })
  return data
}

/**
 * 手动创建通知
 * @param {object} params
 * @param {string} params.type 通知类型 1-手动创建
 * @param {string} params.title 标题内容
 * @param {string} params.time 通知时间
 * @param {string} params.filename 附件id
 */
export function createNotice(params) {
  const _params = {
    ...params,
    type: 1,
    filename: params.file?.id,
    file: undefined,
  }
  return http.post(wjpcs.noticeCreate, _params)
}

/**
 * 删除通知
 * @param id 通知ID
 */
export function deleteNotice(id) {
  return http.post(wjpcs.noticeDelete, { id })
}

/**
 * 标记通知已读
 * @param {object} params
 * @param {number} params.notice_id 通知ID
 * @param {string} params.police_id 警员ID
 */
export function markNoticeRead(params) {
  return http.post(wjpcs.noticeRead, params)
}
