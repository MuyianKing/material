import { getResourcesByLabel } from './src/server/resource'
import { getUserInfoByToken, login, logout, updatePassword, updateUserInfo } from './src/server/user'

export * from './src/components/circle-select'
export * from './src/components/job-cascader'
export * from './src/components/organization'
export * from './src/components/person-avatar'
export * from './src/components/person-item'
export * from './src/components/person-select'
export * from './src/components/person-select-panel'
export * from './src/components/project-select'
export * from './src/components/role-select'
export * from './src/directions/resources'

export {
  // 获取指定label资源
  getResourcesByLabel,
  // 根据token获取用户信息
  getUserInfoByToken,
  // 登录
  login,
  // 登出
  logout,
  // 更新密码
  updatePassword,
  // 更新用户信息
  updateUserInfo,
}
