import { cloneDeep } from 'lodash-es'

export default function (tree_data) {
  tree_data = cloneDeep(tree_data)

  // 计算rowspan
  function compRow(data) {
    data.forEach((item) => {
      if (item.next) {
        compRow(item.next)
        item.rowspan = 0
        item.next.forEach((row) => {
          item.rowspan += row.rowspan
        })
      } else {
        item.rowspan = 1
      }
    })
  }

  // 计算树的最大深度
  function compDepth(t_data) {
    let max_depth = 0
    function fn(data, depth = 1) {
      data.forEach((item) => {
        if (item.next && item.next.length) {
          fn(item.next, depth + 1, max_depth)
        }

        if (max_depth < depth) {
          max_depth = depth
        }
      })
    }

    fn(t_data)

    return max_depth
  }

  // 计算colspan
  function compCol(data, level = 0, max_depth = 3) {
    data.forEach((item) => {
      if (!item.next || item.next.length === 0) {
        item.colspan = max_depth - level
      } else {
        compCol(item.next, level + 1, max_depth)
      }
    })
  }

  // 树形结构转table
  function getAllPath(tree) {
    const paths = []
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].next && tree[i].next.length) {
        // 如果有子节点便继续深入，直到到达叶子节点
        const res = getAllPath(tree[i].next)

        // 遍历最后一层的节点，生成路径
        for (let j = 0; j < res.length; j++) {
          const arr = [...res[j]]

          // 如果没有添加过
          if (!tree[i].append) {
            // 添加已添加标识
            tree[i].append = true
            arr.unshift(tree[i])
          }
          paths.push(arr) // 子节点返回后将其返回的路径与自身拼接
        }
      } else {
        // 没有子节点的话，直接将自身拼接到paths中
        paths.push([tree[i]])
      }
    }
    return paths
  }

  compRow(tree_data)
  const max_depth = compDepth(tree_data)
  compCol(tree_data, 0, max_depth)

  return getAllPath(tree_data)
}
