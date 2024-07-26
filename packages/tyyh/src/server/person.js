import http from '../utils/request'
import api from '../api'

/**
 * 获取人员
 * @param {*} params
 */
export async function getList(params) {
  const result = await http.post(api.user, {
    opt: 'user_get_v_0_0_2',
    ...params,
  })

  return result
}

// 获取角色用户
export function getUserRole(params) {
  return http.post(api.user, {
    opt: 'user_role',
    ...params,
  })
}
