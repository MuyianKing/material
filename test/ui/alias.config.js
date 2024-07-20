import { resolve } from 'node:path'

const alias_path = [
  ['@', './src'],
  ['@comp', './src/components'],
  ['@views', './src/views'],
]

export default function useAlias() {
  // 处理成vite需要的格式
  const alias_map = {}
  alias_path.forEach((item) => {
    alias_map[item[0]] = item[1].startsWith('@') ? item[1] : resolve(__dirname, item[1].replace('./', ''))
  })

  return {
    alias_map,
    alias_path,
  }
}
