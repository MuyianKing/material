import { property_list } from './config'

export default {
  // 自动导入该文件下的所有vue文件，以“Form文件夹名”作为组件名称注册全局组件
  install(app) {
    property_list.forEach((comp) => {
      app.component(comp.key, comp.component)
    })
  },
}
