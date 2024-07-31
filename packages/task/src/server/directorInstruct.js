import http from '../hooks/request'
import api from '../api'

export async function getList(params) {
  const result = await http.post(api.taskInfoList, {
    ...params,
    config_id: params.config_id?.join(','),
    type: params.task_type || params.type,
  })
  return result
}
