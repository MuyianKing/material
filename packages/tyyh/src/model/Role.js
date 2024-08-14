export default class {
  constructor(role = {}) {
    role = role || {}

    this.id = role.id || ''

    // 角色名字
    this.role_name = role.role_name || ''

    // 项目
    this.project_id = role.project_id || ''

    // 角色值
    this.role_id = role.role_id || ''

    // 人员
    this.police_id = role.police_id || []

    // 部门
    this.organization_id = role.organization_id || []

    // 职位
    this.job_id = role.job_id || []

    // 角色分组
    this.role_group = role.role_group || 1

    // 是否默认分组
    this.role_default = role.role_default

    // 角色生效时间
    this.start_time = role.start_time || ''

    // 角色失效时间
    this.end_time = role.end_time || ''
  }
}
