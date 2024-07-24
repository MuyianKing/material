export default {
  install(app) {
    const globModules = import.meta.glob(`./src/*.js`, { eager: true })

    for (const key in globModules) {
      app.directive(globModules[key].default.name, globModules[key].default.body)
    }
  },
}
