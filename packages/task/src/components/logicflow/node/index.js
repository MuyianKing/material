/**
 * 注册所有自定义节点
 */
export function registerAllNodes(lf) {
  const globModules = import.meta.glob('./components/*/*.js', { eager: true })

  for (const key in globModules) {
    lf.register(globModules[key].default)
  }
}
