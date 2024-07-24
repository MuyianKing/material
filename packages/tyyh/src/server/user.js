import http from '../hooks/request'
import api from '../api'

export function getUserList(params) {
  return http.post(api.user, {
    ...params,
    opt: 'user_get_v_0_0_2',
  })
}

/**
 * 获取人员列表：按单位职务区分人员
 * @param params
 * @returns {Promise<*>} list
 */
export async function getUserListWithEachOrgJob(params) {
  let id_card_list = params.id_card?.split(',') || []
  id_card_list = id_card_list.map(item => item.split('/'))
  id_card_list = id_card_list.map(item => item[item.length - 1] || '')

  const result = await http.post(api.user, {
    ...params,
    id_card: id_card_list.filter(item => item).join(','),
    opt: 'user_get_v_0_0_2',
  })

  const newValue = []
  result.data.forEach((item) => {
    item.organization.forEach((org) => {
      newValue.push({
        name: `${item.name}（${org.organization_name} - ${org.job_name}）`,
        id_card: `${org.organization_id}/${org.job_id}/${item.id_card}`,
      })
    })
  })

  result.data = newValue
  return result
}
