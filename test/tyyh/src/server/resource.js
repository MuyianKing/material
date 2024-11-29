import http from '@http'

/**
 * 获取指定标签资源
 * @param {string} label
 * @returns {Array} 资源
 */
export async function getResourcesByLabel(label) {
  const result = await http.post(hl.api.tyyh.resource, {
    opt: 'resources_menu_ry',
    label,
  })

  return result.data || []
}
