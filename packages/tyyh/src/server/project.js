import api from '../api'

export async function getList(params) {
  return hl.http.post(api.project, params)
}
