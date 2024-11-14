function getCompPath(instance) {
  const type = instance.type || instance.$?.type
  const path = type?.name || type?.__file || type?.__name

  let path_array = []

  if (path === 'RouterView') {
    return null
  }

  path_array.push(path)

  const parent = instance.parent || instance.$?.parent
  let parent_paths = null
  if (parent) {
    parent_paths = getCompPath(parent)
  }

  if (parent_paths) {
    path_array = [
      ...parent_paths,
      ...path_array,
    ]
  }

  return path_array
}

/**
 * 全局异常处理
 */
export default function (app, callback) {
  callback = callback && typeof callback === 'function' ? callback : null

  app.config.errorHandler = (err, instance) => {
    const path = getCompPath(instance)

    if (callback) {
      callback(`
      <div style="font-size:22px;margin-bottom:5px">未知错误</div>
      <div style="line-height:22px">当前路由: ${location.hash || location.href}</div>
      <div style="line-height:22px">组件路径: ${path.join('=>')}</div>
      <div style="line-height:22px">错误信息: ${err.message}</div>
      `)
    }
  }

  // 未捕获的异步异常
  window.onerror = function (message, source, lineno, colno, error) {
    if (error && source && callback) {
      callback(`
        <div style="font-size:22px;margin-bottom:5px">未知错误</div>
         <div style="line-height:22px">当前路由: ${location.hash || location.href}</div>
        <div style="line-height:22px">错误位置: ${source || ''}</div>
        <div style="line-height:22px">错误信息: ${error?.message}</div>
        `)
    }

    // 阻止向上抛出
    return true
  }
}
