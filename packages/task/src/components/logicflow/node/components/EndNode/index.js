import useCustomNode from '../useCustomNode'
import NodeVue from './Node.vue'

export default useCustomNode(NodeVue, {
  node_name: 'EndNode',
  anchorsOffset(width, height) {
    return [
      [0, -height / 2],
      [width / 2, 0],
      [-width / 2, 0],
    ]
  },
  style: {
    height: 34,
    width: 100,
  },
})
