import http from '../hooks/request'

import api from '../api'

export async function getList(params) {
  return http.post(api.role, {
    opt: 'role_get',
    ...params,
  })
}

/**
 * 保存角色
 * @param params
 * @param params.id 角色ID  (新增时为空)
 * @param params.org_job_police 警员id
 * @param params.organization_id 组织ID
 * @param params.job_id 职务ID
 */
export function saveRole(params) {
  return http.post(api.role, {
    opt: params.id ? 'role_update' : 'role_create',
    ...params,
  })
}
