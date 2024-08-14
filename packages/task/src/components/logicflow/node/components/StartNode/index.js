import useCustomNode from '../useCustomNode'
import NodeVue from './Node.vue'

export default useCustomNode(NodeVue, {
  node_name: 'StartNode',
  // 锚点
  anchorsOffset(width, height) {
    return [
      [0, height / 2],
      [width / 4, height / 2],
      [-width / 4, height / 2],
      [width / 2, 0],
      [width / 2, height / 4],
      [width / 2, -height / 4],
      [-width / 2, 0],
      [-width / 2, -height / 4],
      [-width / 2, height / 4],
    ]
  },
})
