import api from '../api'

export async function getUserList(params, config = {}) {
  const { simple, label_config } = config

  const result = await hl.http.post(api.user, {
    ...params,
    opt: 'user_get_v_0_0_2',
  })

  if (simple === false) {
    console.log('config', label_config)
    result.data.forEach((item) => {
      if (item.organization?.length > 0) {
        const org = item.organization[0]
        item.name = label_config ? label_config.replace('$name', item.name).replace('$org', org.organization_name || '').replace('$job', org.job_name || '') : `${item.name}（${org.organization_name} - ${org.job_name}）`
      }
    })
  }

  return result
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

  const result = await hl.http.post(api.user, {
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

/**
 * 修改密码
 * @param {object} params
 * @param {string} params.police_id 警号
 * @param {string} params.password 新密码
 * @returns {Promise<object>} 是否成功
 */
export async function updatePassword(params) {
  return hl.http.post(api.user, {
    opt: 'user_password',
    ...params,
  })
}

/**
 * 修改用户信息
 * @param {object} params
 * @param {string} params.id_card 身份证号
 * @param {string} params.phone 手机号
 * @param {string} params.password 手机短号
 * @returns {Promise<object>} 是否成功
 */
export async function updateUserInfo(params) {
  return hl.http.post(api.user, {
    opt: 'user_update_basic_v_0_0_2',
    ...params,
  })
}
