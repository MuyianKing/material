import http from '../hooks/request'
import api from '../api'

/**
 * @param {*} params
 */
export async function getRouters(params = {}) {
  return http.post(api.resource, {
    opt: 'resources_menu_ry',
    ...params,
  })
}
