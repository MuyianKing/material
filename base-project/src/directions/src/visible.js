export default {
  name: 'visible',
  body: {
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
  },
}
