/**
 * 指令：v-display
 * 功能：页面出现在可视区域调一次
 * @type {import('vue').Directive}
 * @example
 * <div v-display="handleDisplay">
 * 内容
 * </div>
 */
const vDisplay = {
  mounted(el, binding) {
    if (binding.value && typeof binding.value === 'function') {
      // 监听dom的可视化变化
      el._intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0]?.intersectionRatio > 0) {
          binding.value()
        }
      })
      el._intersectionObserver.observe(el)

      // 导航到新页面、切换标签页、关闭标签页、最小化或关闭浏览器
      el.visibilitychange = () => {
        if (document.visibilityState === 'visible') {
          binding.value()
        }
      }
      document.addEventListener('visibilitychange', el.visibilitychange)
    }
  },
  beforeUnmount(el) {
    el._intersectionObserver && el._intersectionObserver.disconnect()
    el._intersectionObserver = null

    // 销毁visibilitychange事件
    document.removeEventListener('visibilitychange', el.visibilitychange)
    el.visibilitychange = null
  },
}

export default vDisplay
