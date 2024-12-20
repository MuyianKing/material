import api from '../api'

/**
 * 获取指定标签资源
 * @param {string} label
 * @returns {Array} 资源
 */
export async function getResourcesByLabel(label) {
  const result = await hl.http.post(api.resource, {
    opt: 'resources_menu_ry',
    label,
  })

  return result.data || []
}
