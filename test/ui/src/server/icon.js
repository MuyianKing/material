import http from '../utils/request'

export async function getIcons(params) {
  const result = await http.get(hl.api.icon.search, params)

  return {
    count: result.count,
    data: result.icons,
  }
}
