import { defineStore } from 'pinia'
import NodeData from '../../model/flow/node.data'
import { getFormById } from '../../server/form'
import { getFlatFields } from '../../hooks/form'
import { getAllCanLinkNodes } from '../../hooks/flow'

export default defineStore('flow', {
  // 正在编辑的边或节点的配置
  state: () => ({
    show: false,

    // 所有可联动节点
    all_can_link_nodes: [],

    // node的前所有节点ID关联的表单ID
    prev_form_id: [],

    // node的前所有节点
    prev_nodes: [],

    // 节点配置
    node: null,

    // 边配置
    edge: null,

    // 错误信息
    error_message: [],

    // 触发重新获取数据
    update_count: 0,
  }),
  actions: {
    open() {
      if (this.show) {
        this.show = false
        setTimeout(() => {
          this.show = true
        }, 300)
      } else {
        this.show = true
      }
    },
    // 打开基础配置
    openBaseConfig(data, lf) {
      this.edge = null
      this.node = new NodeData(data)

      // 当前节点前面所有已关联表单的节点:过滤调循环
      const form_ids = Array.from(new Set(data.prev_form_id.filter(item => item.form_id).map(item => item.form_id)))

      this.prev_form_id = form_ids.map((id) => {
        return data.prev_form_id.find(node => node.form_id === id)
      })

      this.prev_nodes = this.prev_form_id.map((item) => {
        return {
          label: item.node_name,
          value: item.node_id,
        }
      })

      this.all_can_link_nodes = getAllCanLinkNodes(lf)

      this.open()
    },

    // 打开边配置
    async openEdgeConfig(data) {
      const { edge, nodes } = data

      const result = []

      // 因为node存在循环引用时数组会重复所以需要去重
      const node_ids = Array.from(new Set(nodes.filter(item => item.form_id).map(item => item.id)))
      let _nodes = node_ids.map((id) => {
        return nodes.find(node => node.id === id)
      })
      _nodes.forEach((node) => {
        result.push(getFormById(node.form_id))
      })

      // 获取表单数据
      Promise.all(result).then((res) => {
        const form_field_list = []

        res.forEach((item, index) => {
          const node = _nodes[index]
          form_field_list.push({
            node_name: node.base_config.title,
            _node_id: node.id,
            node_id: `${node.id}__${node.form_id}`,
            children: getFlatFields(item.form_field_list),
          })
        })

        // 先处理有表单的审批节点
        form_field_list.forEach((item) => {
          const _node = nodes.find(node => node.id === item._node_id)
          if (_node.type === 'AuditNode') {
            item.children.push(createAudioConfig(_node))
          }
        })

        // 再处理没有关联表单的审批节点
        _nodes = Array.from(new Set(nodes.filter(item => !item.form_id && item.type === 'AuditNode').map(item => item.id))).map((id) => {
          return nodes.find(node => node.id === id)
        })

        _nodes.forEach((node) => {
          form_field_list.push({
            node_name: node.base_config.title,
            node_id: `${node.id}__${node.form_id}`,
            children: [createAudioConfig(node)],
          })
        })

        this.node = null
        this.edge = {
          properties: {
            condition: [],
            ...edge,
          },
          form_field_list: form_field_list || [],
        }
        this.open()
      })
    },
    // 关闭配置页面
    closeConfig(lf) {
      this.show = false
      if (lf && this.edge) {
        const _edge = lf.getEdgeModelById(this.edge.properties.id)
        _edge.setProperties({
          ..._edge.getProperties(),
          active: false,
        })
      }

      this.node = null
      this.edge = null
    },
  },
})

function createAudioConfig(node) {
  return {
    id: 'pass',
    key: 'FormSelect',
    _property: {
      editable: true,
      label: '审核状态',
      options: [{
        label: node.base_config.pass_label,
        value: 1,
      }, {
        label: node.base_config.reject_label,
        value: 0,
      }],
    },
  }
}
