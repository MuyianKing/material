import api from '../api'
import http from '../utils/request'

export async function getList(params) {
  return http.post(api.project, params)
}
