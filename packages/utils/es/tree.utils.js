/**
 * 将一维平面数据转换为树形结构
 * @param {Array} list 平面数据
 * @param {object} config 配置
 * @param {Function} config.rootCheck 判断是否为根节点，默认值为falsity则为根节点
 * @param {Function} config.extend_keys 除了props设置的属性外，需要额外添加到树上的属性
 * @param {Function} config.props 数据字段配置
 * @param {Function} config.props.label
 * @param {Function} config.props.children
 * @param {Function} config.props.value
 */
export function makeTree(list, config) {
  const tree_map = {}

  const _config = config || {}
  const props = _config.props || {}
  const label = props.label || 'label'
  const value = props.value || 'value'
  const children = props.children || 'children'
  const parent = props.parent || 'parent'

  list.forEach((item) => {
    const key = item[value]

    if (!tree_map[key]) {
      tree_map[item[value]] = {}
    }

    tree_map[key][label] = item[label]
    tree_map[key][value] = key

    if (item[children]) {
      tree_map[key][children] = item[children]
    }

    // 添加额外的字段
    if (config.extend_keys) {
      config.extend_keys.forEach((key) => {
        tree_map[key] = item[key]
      })
    }

    // 寻找父子关系
    const p_key = item[parent]
    if (p_key) {
      // 当前没有父亲，生成父亲对象
      if (!tree_map[p_key]) {
        tree_map[p_key] = {}
      }

      // 父亲没有children属性：生成空数组
      if (!tree_map[p_key][children]) {
        tree_map[p_key][children] = []
      }

      // 放入父亲的下级
      tree_map[p_key][children].push(tree_map[key])
    }
  })

  // 判断是否为根节点的方式
  let rootCheck = null
  if (config.rootCheck && typeof config.rootCheck === 'function') {
    rootCheck = config.rootCheck
  } else {
    // 默认值为falsity则为根节点
    rootCheck = item => item[value] === '' || +item[value] === undefined || item[value] === 0
  }

  // 寻找根节点
  const keys = Object.keys(tree_map)
  for (let i = 0; i < keys.length; i++) {
    if (rootCheck(tree_map[keys[i]])) {
      return [tree_map[keys[i]]]
    }
  }

  if (keys.length > 0) {
    throw new Error('未找到根节点')
  }

  return []
}

/**
 * 将树扁平化
 * @param tree_data 树形数据
 * @param config 配置
 */
export function flatTree(tree_data, config) {
  const children_key = config.children || 'children'

  const new_arr = []
  if (!tree_data) {
    return []
  }

  tree_data.forEach((item) => {
    if (item[children_key] && item[children_key].length > 0) {
      flatTree(item[children_key], config).forEach((_item) => {
        new_arr.push(_item)
      })
    }

    delete item[children_key]

    new_arr.push(item)
  })

  return new_arr
}
