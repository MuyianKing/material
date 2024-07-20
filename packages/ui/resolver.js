export default {
  type: 'component',
  resolve: (name) => {
    if (name.startsWith('Hl')) {
      const pathName = name.slice(2).toLowerCase()
      return {
        importName: name,
        from: 'hlui',
        path: `@hl/ui/index.js`,
        sideEffects: `@hl/ui/${pathName}/Index.css`,
      }
    }
  },
}
