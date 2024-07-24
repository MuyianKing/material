import {defineStore} from 'pinia'

export default defineStore('dynamicRouter', {
  state: () => ({
    // 动态路由
    list: [],
  }),
  actions: {
    getComp(components_map, key) {
      const comp = components_map[key]
      return comp[Object.keys(comp)[0]]
    },
    // 初始化动态路由
    initDynamicRoutes(router) {
      this.list.forEach((item) => {
        if (item.component) {
          router.addRoute('admin', {
            name: item.name,
            path: item.path,
            component: this.getComp(components_map, item.component),
            meta: item.meta,
          })
        }
      })
    },
    clearData(router) {
      this.list.forEach((item) => {
        router.removeRoute(item.name)
      })
      this.$reset()
    },
  },
  persist: {
    enabled: true,
  },
})
