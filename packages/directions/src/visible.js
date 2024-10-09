/**
 * 指令：v-visible
 * 功能：监听DOM元素滚动到底部触发
 * @type {import('vue').Directive}
 * @example
 * <div v-visible="handleVisible">
 * 内容
 * </div>
 */
const vVisible = {
  mounted(el, binding) {
    if (binding.value && typeof binding.value === 'function') {
      el._intersectionObserver = new IntersectionObserver((entries) => {
        binding.value({
          visible: entries[0]?.intersectionRatio > 0,
        })
      })

      // 开始监听
      el._intersectionObserver.observe(el)
    }
  },
  beforeUnmount(el) {
    el._intersectionObserver && el._intersectionObserver.disconnect()
    el._intersectionObserver = null
  },
}

export default vVisible
