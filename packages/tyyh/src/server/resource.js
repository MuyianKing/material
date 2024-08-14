import api from '../api'

/**
 * @param {*} params
 */
export async function getRouters(params = {}) {
  return hl.http.post(api.resource, {
    opt: 'resources_menu_ry',
    ...params,
  })
}
