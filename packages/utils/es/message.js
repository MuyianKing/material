import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

let loading_instance = null

/**
 * 关闭loading
 */
export function closeLoading() {
  loading_instance && loading_instance.close()
  loading_instance = null
}

/**
 * loading提示
 * @param {string} message 提示信息
 * @param {object} params element plus的相关配置
 */
export function loading(message, params = {}) {
  loading_instance = ElLoading.service({
    text: message || '',
    ...params,
  })
  return loading_instance
}

/**
 * 错误提示
 * @param {Error} e
 * @param {string} msg 错误信息
 */
export function error(e, msg) {
  console.log(e)
  if (e === 'cancel' || e.errno === 401) {
    return
  }
  const error_message = e ? (e.error || e.message || '') : ''
  ElMessage.error(`${msg ? `${msg}` : ''}${msg && error_message ? '：' : ''}${error_message ? `${error_message}` : ''}`)
}

/**
 * 成功提示
 * @param {string} msg
 */
export function success(msg) {
  ElMessage.success(msg)
}

/**
 * 警告提示
 * @param {string} msg
 */
export function warning(msg) {
  ElMessage.warning(msg)
}

/**
 * 确认提示
 * @param {string} msg 提示信息
 * @param {string} title 标题 默认“提示”
 * @param {object} params element plus的相关配置
 */
export function confirm(msg, title, params = {}) {
  return ElMessageBox.confirm(
    msg,
    title || '提示',
    {
      ...params,
      confirmButtonText: params.confirmText || '确定',
      cancelButtonText: params.cancelText || '取消',
      type: params.type || 'warning',
    },
  )
}
