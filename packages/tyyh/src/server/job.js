import http from '../utils/request'

import api from '../api'

/**
 * 获取组织机构列表
 * @param {*} params
 */
export async function getList(params) {
  return http.post(api.job, {
    opt: 'job_get',
    ...params,
  })
}
