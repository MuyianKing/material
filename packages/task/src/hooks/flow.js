import { check_config } from '../default/flow'
import { getSomeForms } from '../server/form'
import { getFlatFields } from './form'

/**
 * 校验当前流程是否合法
 * @param {Array< Cell >} cells
 */
export function validateFlowData(cells) {
  const { edges, nodes } = splitNodeEdge(cells)

  // 判断所有节点是否全部关联表单、配置名称、处置人、抄送人、
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const base_config = node.properties.base_config

    const node_type = node.properties.type

    // 结束节点不需要配置任何信息
    if (node_type === 'EndNode') {
      continue
    }

    // 除签收人和派出所节点都需要配置表单
    if (node_type !== 'SignNode' && node_type !== 'AuditNode' && node_type !== 'PcsNode' && !node.properties.form_id) {
      throw new Error(`流程中节点【${base_config.title}】未关联表单`)
    }

    if (!base_config.title) {
      throw new Error(`流程中存在未配置名称的节点`)
    }

    // 是否配置处置人
    if (node_type !== 'StartNode' && node_type !== 'PcsNode' && node_type !== 'WorkNode' && hanlderIsEmpty(base_config)) {
      console.log('base_config', base_config)
      throw new Error(`流程中节点【${base_config.title}】未配置处置人`)
    }
  }

  // 根据边为每个节点生成next 和prev
  const node_map = new Map(nodes.map(item => [item.id, { node: item, next: [], prev: [] }]))
  edges.forEach((edge) => {
    const source = nodes.find(item => item.id === edge.sourceNodeId)
    const target = nodes.find(item => item.id === edge.targetNodeId)
    node_map.get(edge.sourceNodeId).next.push(target.id)
    node_map.get(edge.targetNodeId).prev.push(source.id)
  })

  // 如果办理节点：没有配置处置人并且前置节点是签收节点没有配置人
  for (const edge of edges) {
    // 当前节点
    const node = node_map.get(edge.targetNodeId)

    // 判断是否是办理节点
    if (node.node.type === 'WorkNode') {
      // 获取全部的父节点
      for (const edg of node_map.get(edge.targetNodeId).prev) {
        const last_node = node_map.get(edg).node
        const base_config = last_node.properties.base_config
        // 没有配置处置人并且前置节点是签收节点没有配置人就报异常
        if (hanlderIsEmpty(node.node.properties.base_config) && last_node.type === 'SignNode' && hanlderIsEmpty(base_config)) {
          throw new Error(`流程中节点【${base_config.title}】未配置处置人`)
        }
      }
    }
  }

  // 找出根节点
  const roots = []
  node_map.forEach((item) => {
    if (item.prev.length === 0 && item.node.type !== 'RemarkNode') {
      roots.push(item)
    }
  })

  if (roots.length > 1) {
    throw new Error('只能出现一个开始节点')
  }

  if (roots.filter(item => item.node.properties.type !== 'StartNode').length > 0) {
    throw new Error('开始节点只能是发起人')
  }

  // 判断是否有未结束的路径
  const has_check = []
  while (roots.length > 0) {
    const node = roots.shift()
    has_check.push(node.node.id)
    if (node.next.length > 0) {
      node.next.forEach((next) => {
        if (!has_check.includes(next)) {
          roots.push(node_map.get(next))
        }
      })
    } else {
      if (node.node.properties.type !== 'EndNode') {
        throw new Error(`【${node.node.properties.base_config.title}】不是结束节点`)
      }
    }
  }

  // 判断有没有节点下连接的edge存在相同的condition
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    // 找到source是node的所有edge
    const _edges = edges.filter(item => item.sourceNodeId === node.id)
    if (_edges.length > 1) {
      if (conditionIsEqual(_edges[0].properties.condition, _edges[1].properties.condition)) {
        throw new Error(`【${node.properties.base_config.title}】下至少存在两条路径条件相同，请合并多余的路径`)
      }
    }
  }

  return true
}

/**
 * 校验节点和边之间表单项引用关系：是否存在关联的表单项的表单已不存在
 * @param {Array<Cell>} cells cells
 */
export async function validateOuterFileds(cells) {
  const { nodes, edges } = splitNodeEdge(cells)

  // 节点关联的所有表单
  const form_ids = nodes.map(node => node.properties.form_id).filter(form_id => form_id)

  const form_fields = []
  if (form_ids.length > 0) {
    const forms = await getSomeForms(form_ids)
    forms.forEach((form) => {
      getFlatFields(form.form_field_list).forEach((field) => {
        form_fields.push(`${form.form_id}${field.id}`)
      })
    })
  }

  // 错误信息
  const error = []

  // 校验节点
  nodes.forEach((node) => {
    if (node.type !== 'StartNode' && node.type !== 'EndNode') {
      const base_config = node.properties.base_config

      // 遍历需要校验的字段
      check_config.forEach(({ key, label, type, goto }) => {
        if (type === 'form_user') {
          if ((base_config.custom_user === undefined || base_config.custom_user === 0) && base_config[key] && base_config[key].form_user) {
            const form_user = base_config[key].form_user

            for (let i = 0; i < form_user.length; i++) {
              const user_config = form_user[i]
              // 表单不存在或表单项不存在
              if (!form_ids.includes(user_config.form_id) || !form_fields.includes(`${user_config.form_id}${user_config.field_id}`)) {
                error.unshift({
                  key: `${node.id}_${key}`,
                  id: node.id,
                  message: `【${base_config.title}】节点的【${label}】配置的表单不存在`,
                })
                break
              }
            }
          }
        } else {
          // 其他组件
          if (goto(base_config)) {
            const form_id = (base_config[key].split('__') || [])
            if (form_id && form_id.length > 0) {
              // 表单不存在或表单项不存在
              if (!form_ids.includes(+form_id[0]) || (form_id[1] && !form_fields.includes(`${form_id[0]}${form_id[1]}`))) {
                error.unshift({
                  key: `${node.id}_${key}`,
                  id: node.id,
                  message: `【${base_config.title}】节点的【${label}】配置的表单不存在`,
                })
              }
            }
          }
        }
      })
    }
  })

  // 校验边
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i]
    let { condition } = edge.properties

    if (condition && condition.length > 0) {
      // 过滤掉连接符
      condition = condition.filter(item => item.type === 'condition')

      for (let i = 0; i < condition.length; i++) {
        const cond = condition[i]

        // field[0]格式：节点ID__表单ID
        let fields = null
        if (cond.field && cond.field[0]) {
          fields = cond.field[0].split('__')
        }

        const source = nodes.find(item => item.id === edge.sourceNodeId)
        const target = nodes.find(item => item.id === edge.targetNodeId)
        // 判断关联的表单ID是否存在

        if (fields && fields[1] && (!form_ids.includes(+fields[1]) || (cond.field[1] !== 'pass' && !form_fields.includes(`${fields[1]}${cond.field[1]}`)))) {
          console.log(fields[1], form_ids, cond, form_fields, `${fields[1]}${cond.field[1]}`)

          // 不存在提示
          error.unshift({
            key: `${edge.sourceNodeId}_${edge.targetNodeId}_${cond.id}`,
            id: '',
            message: `【${source.properties.base_config.title}】节点和【${target.properties.base_config.title}】节点之间的流转条件未匹配到表单`,
          })
        } else if (cond.value === '') {
          // 添加了一个条件但是没有配置
          error.unshift({
            key: `${edge.sourceNodeId}_${edge.targetNodeId}_${cond.id}`,
            id: '',
            message: `【${source.properties.base_config.title}】节点和【${target.properties.base_config.title}】节点之间的存在未配置的条件`,
          })
        }
      }
    }
  }

  return error
}

/**
 * 判断所给的两个条件是否一样
 * @param {Condition} c1
 * @param {Condition} c2
 * @return {boolean}
 */
export function conditionIsEqual(c1, c2) {
  // 两个都不合法
  if (!c1 && !c2) {
    return false
  }

  const is_c1_array = Array.isArray(c1)
  const is_c2_array = Array.isArray(c2)

  // 类型不一致
  if (is_c1_array !== is_c2_array) {
    return false
  }

  // 都是数组
  if (is_c1_array && is_c2_array) {
    // 都是空数组
    if (c1.length === 0 && c2.length === 0) {
      return true
    }

    // 长度不一样直接不相等
    if (c1.length !== c2.length) {
      return false
    }

    for (let i = 0; i < c1.length; i++) {
      if (conditionIsEqual(c1[i], c2[i]) === false) {
        return false
      }
    }
  } else {
    // 都不是数组
    c1 = c1 || null
    c2 = c2 || null
    if (c1 === c2) {
      return true
    }

    // 比较对象的所有属性是否相等
    const keys = Array.from(new Set([...Object.keys(c1), ...Object.keys(c1)]))
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (key === 'id') {
        continue
      }

      // 两个都是对象
      if (typeof c1[key] === 'object' && typeof c2[key] === 'object') {
        if (conditionIsEqual(c1[key], c2[key]) === false) {
          return false
        }
      } else if ((typeof c1[key] === 'object' && typeof c2[key] !== 'object') || (typeof c1[key] !== 'object' && typeof c2[key] === 'object')) {
        // 一个是对象，另一个不是对象，直接false
        return false
      } else if (c1[key] !== c2[key]) {
        // 基本类型比较两个值
        return false
      }
    }
  }

  return true
}

/**
 * 拆分node和edge
 * @param {Array<Cell>} cells
 */
export function splitNodeEdge(cells) {
  return cells
}

/**
 * 获取node前面的所有节点ID
 * @param {LogicFlow} lf LogicFlow实例
 * @param {string} node_id
 * @param {object} config 配置
 * @param {boolean} config.obj false-只返回节点id true-返回节点名称和id
 */
export function getPrevNodes(lf, node_id, config = {}) {
  const obj = config?.obj || false

  const has_check = []
  let nodes = [node_id]
  let node_ids = []

  while (nodes.length > 0) {
    const node = nodes.pop()

    const egdes = lf.getNodeEdges(node)
    const prev_node = egdes.filter(item => item.targetNodeId === node && !has_check.includes(node)).map(item => item.sourceNodeId)
    if (prev_node.length > 0) {
      node_ids = [...node_ids, ...prev_node]
      nodes = [...nodes, ...prev_node]
    }

    has_check.push(node)
  }

  if (obj) {
    return node_ids.map((item) => {
      const properties = lf.getProperties(item)

      return {
        label: properties.base_config.title,
        value: properties.id,
        form_id: properties.form_id,
      }
    })
  }

  return node_ids
}

/**
 * 判断节点的处置人是否为空
 * @param {*} config 节点配置
 */
export function hanlderIsEmpty(config) {
  // 1、自定义：直接true
  if (config.custom_user === 1) {
    return false
  } else if (config.custom_user === 2) {
    // 2、节点继承：需要配置继承的节点
    return config.other_node === ''
  } else {
    // 单独配置
    const handler = config.handler
    if (!handler) {
      return true
    }
    return handler.circles.length === 0 && handler.id_cards.length === 0 && handler.jobs.length === 0 && handler.organizations.length === 0 && handler.roles.length === 0 && handler.urls.length === 0 && handler.form_user.length === 0
  }
}

/**
 * 获取所有可联动节点
 * @param lf logicflow对象
 */
export function getAllCanLinkNodes(lf) {
  if (!lf) {
    return []
  }

  const { nodes } = lf.getGraphData()
  return nodes.filter((item) => {
    return !['PcsNode', 'RemarkNode'].includes(item.type)
  }).map((item) => {
    return {
      value: item.id,
      label: item.properties.base_config.title,
    }
  })
}
