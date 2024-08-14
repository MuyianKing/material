import { HtmlNode, HtmlNodeModel } from '@logicflow/core'
import { createApp, h } from 'vue'
import NodeData from '../../../../model/flow/node.data'

export default function useCustomNode(comp, {
  node_name,
  anchorsOffset,
  style,
}) {
  // 提供节点的dom
  class CustomHtmlNode extends HtmlNode {
    constructor(props) {
      super(props)

      this.isMounted = false
      this.vm = h(comp, {
        // 将数据写入组件的properties属性
        properties: new NodeData(props.model.getProperties()),
      })
      this.app = createApp({
        render: () => this.vm,
      })
    }

    setHtml(rootEl) {
      if (!this.isMounted) {
        this.isMounted = true
        const node = document.createElement('div')
        rootEl.appendChild(node)
        this.app.mount(node)
      } else {
        this.vm.component.props.properties = this.props.model.getProperties()
      }
    }
  }

  // 提供节点的样式
  class CustomHtmlNodeModel extends HtmlNodeModel {
    getNodeStyle() {
      const style = super.getNodeStyle()
      style.stroke = ''
      return style
    }

    setAttributes() {
      this.text.editable = false
      const width = style?.width || 200
      const height = style?.height || 80
      this.width = width
      this.height = height
    }

    getDefaultAnchor() {
      const { width, height, x, y, id } = this

      // 默认锚点
      let _anchorsOffset = [
        [0, height / 2],
        [width / 4, height / 2],
        [-width / 4, height / 2],
        [width / 2, 0],
        [width / 2, height / 4],
        [width / 2, -height / 4],
        [-width / 2, 0],
        [-width / 2, -height / 4],
        [-width / 2, height / 4],
        [0, -height / 2],
        [width / 4, -height / 2],
        [-width / 4, -height / 2],
      ]

      if (anchorsOffset && typeof anchorsOffset === 'function') {
        _anchorsOffset = anchorsOffset(width, height)
      }

      return _anchorsOffset.map((item, index) => {
        return {
          x: x - item[0],
          y: y + item[1],
          id: `${id}_${index}`,
        }
      })
    }
  }

  return {
    type: node_name,
    view: CustomHtmlNode,
    model: CustomHtmlNodeModel,
  }
}
