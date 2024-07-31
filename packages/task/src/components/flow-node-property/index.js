export default {
  // 自动导入该文件下的所有vue文件，以“Form文件夹名”作为组件名称注册全局组件
  install(app) {
    const globModules = import.meta.glob('./*/*.vue', { eager: true })
    for (const key in globModules) {
      const path = key.split('/')
      let name = path[path.length - 2]

      if (name) {
        // first-last =>FirstLast
        name = name.split('-').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('')
        app.component(`FlowNodeProperty${name}`, globModules[key].default)
      }
    }
  },
}
