import { generateApis } from '@utils/api'
/**
 * 生成所有的请求路径
 */
function generate() {
  // 引入api文件
  const globModules = import.meta.glob(`./apis/*.js`, { eager: true })
  const api = generateApis(globModules)
  return api
}

export default generate()
