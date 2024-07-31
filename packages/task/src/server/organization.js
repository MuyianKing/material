import http from '../hooks/request'

import api from '../api'

/**
 * 获取组织机构层级
 */
export async function getDwcjList() {
  const result = await http.post(api.dwcj)
  return result?.data || []
}
