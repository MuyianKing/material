/**
 * 跳转
 * @param {object} opt
 * @param {string} opt.path 地址
 * @param {object} opt.query 参数
 * @param {object} opt.params 参数
 * @param {object} opt.target 目标窗口，同一个业务对象应该只能打开一个tab
 * @param {string} opt.type 跳转方式：_blank--新tab self--当前页
 * @param {Router} router 路由
 */
export function jump(opt, router) {
  if (!opt.path || !router) {
    return
  }

  const newRouter = {}
  newRouter.path = opt.path
  opt.query && (newRouter.query = opt.query)
  opt.params && (newRouter.params = opt.params)

  if (opt.type === '_blank') {
    const routeUrl = router.resolve(newRouter)
    window.open(routeUrl.href, opt.target ? `_blank_${opt.target}` : '_blank')
  } else {
    router.push(newRouter)
  }
}
