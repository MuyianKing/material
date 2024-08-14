/**
 * 获取指定类型的用户数据
 * @param {string} type
 * @returns value
 */
export function getUserValueByType(type) {
  const userStore = hl.getUserInfo()
  switch (type) {
    case 'name':
      return userStore.username
    case 'police_id':
      return userStore.police_id
    case 'id_card':
      return userStore.id_card
    case 'org':
      return userStore.organization?.organization_name
    default:
      return userStore.username
  }
}
