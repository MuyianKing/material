import { ElMessage } from 'element-plus'

/**
 * 全局异常处理
 */
export default function handleError(app) {
  app.config.errorHandler = (err, instance, info) => {
    console.log(err)
    ElMessage({
      type: 'error',
      dangerouslyUseHTMLString: true,
      duration: 5000,
      message: `
      <div style="font-size:22px;margin-bottom:5px">未知错误</div>
      <div style="line-height:22px">组件位置: ${instance.$options.name}</div>
      <div style="line-height:22px">错误钩子: ${info}</div>
      <div style="line-height:22px">错误信息: ${err.message}</div>
      `,
    })
  }

  // 未捕获的异步异常
  window.onerror = function (message, source, lineno, colno, error) {
    if (error && source) {
      ElMessage({
        type: 'error',
        dangerouslyUseHTMLString: true,
        duration: 5000,
        message: `
        <div style="font-size:22px;margin-bottom:5px">未知错误</div>
        <div style="line-height:22px">错误位置: ${source || ''}</div>
        <div style="line-height:22px">错误信息: ${error?.message}</div>
        `,
      })
    }

    // 阻止向上抛出
    return true
  }
}
