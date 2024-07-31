import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'

class ProcessModel extends PolylineEdgeModel {
  getEdgeStyle() {
    const style = super.getEdgeStyle()
    const { properties } = this

    style.stroke = 'gray'
    if (properties?.active) {
      style.stroke = 'red'
    } else if (properties?.condition?.length > 0) {
      style.stroke = 'orange'
    }

    // 添加初始化
    if (!properties.condition) {
      properties.condition = []
    }
    return style
  }
}

export default {
  type: 'link',
  view: PolylineEdge,
  model: ProcessModel,
}
