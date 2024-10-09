function Resolver() {
  return {
    type: 'component',
    resolve: (name) => {
      if (name.startsWith('Hl')) {
        return {
          name,
          importName: name,
          from: '@hl/ui',
          path: `@hl/ui/index.js`,
        }
      }
    },
  }
}

export const HlUIResolver = Resolver
export default Resolver
