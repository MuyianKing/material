import useCustomNode from '../useCustomNode'
import NodeVue from './Node.vue'

export default useCustomNode(NodeVue, {
  node_name: 'RemarkNode',
  anchorsOffset() {
    return []
  },
})
