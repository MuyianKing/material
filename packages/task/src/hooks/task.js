/**
 * 解析条件
 * @param {object | Function} query 参数配置
 * @param {boolean} cancel 是否取消参数
 */
export function getQuery(query, cancel = false) {
  const _query = typeof query === 'function' ? query() : query
  if (cancel) {
    for (const key in query) {
      _query[key] = Array.isArray(query[key]) ? [] : ''
    }
  }

  return _query
}
