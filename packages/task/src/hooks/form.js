/**
 * 将表单项配置拆为一维数组
 * @param {Array} list 表单项配置
 * @param {object} params
 * @param {Array} params.exclude 不需要包含的表单项ID
 */
export function getFlatFields(list, params = {}) {
  if (!list) {
    return []
  }

  const new_arr = []
  const exclude = params.exclude || []

  list.forEach((item) => {
    if (item.children) {
      // 栅格布局是二维数组
      if (item.key === 'FormFlex') {
        item.children.forEach((child) => {
          getFlatFields(child).forEach((inner_child) => {
            if (!exclude.includes(inner_child.id)) {
              new_arr.push(inner_child)
            }
          })
        })
      }
    } else {
      if (!exclude.includes(item.id)) {
        new_arr.push(item)
      }
    }
  })

  return new_arr
}

/**
 *  删除表单配置中的_property_config
 */
export function deletePropertyConfig(list) {
  list.forEach((item) => {
    if (item.children) {
      // 栅格布局是二维数组
      if (item.key === 'FormFlex') {
        item.children.forEach((child) => {
          deletePropertyConfig(child)
        })
      }
    } else {
      delete item._property_config
    }
  })
}

/**
 * 校验表单是否合法
 * @param {Array} list 表单项配置
 * @param {object} params
 * @param {boolean} params.is_start 是否是开始节点
 */
export function validateForm(list, params = {}) {
  // params = params || {}
  // const is_start = params?.is_start || false

  // 扁平化
  list = getFlatFields(list)

  // 生成配置项的map
  const list_map = {}
  list.forEach((item) => {
    list_map[item.id] = item
  })
}
