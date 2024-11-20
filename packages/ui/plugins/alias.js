export function HlUIAlias() {
  return {
    name: 'my-plugin',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('style/index.js')) {
        return
      }

      return code.replace(/@hl\/theme-chalk/g, '@hl/ui/theme-chalk')
    },
  }
}
