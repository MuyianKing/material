import { addPrefixToUrls } from '@hl/utils'

export default addPrefixToUrls('/tyyh/api', {
  user: '/user',
  org: '/organization_rk',
  role: '/role',
  auth: '/gw_auth',
  auth_random: '/gw_random',
  login: '/login',
  logout: '/logout',
  job: '/job_rk',
  circle: '/circle',
  resource: '/resources',
  project: '/project',
})
