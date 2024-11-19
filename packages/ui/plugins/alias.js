export function HlUIAlias() {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `@hl/${themeChalk}`
  const bundleThemeChalk = `@hl/ui/${themeChalk}`

  return {
    name: 'hl-ui-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk))
        return

      console.log('id', id)

      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute',
      }
    },
  }
}
