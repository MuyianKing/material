/**
 * select下拉框分页下拉到底部请求新数据
 */
export default {
  name: 'loadmore',
  body: {
    mounted(el, binding) {
      el.time_id = 0
      el.parentNode.parentNode.addEventListener('scroll', function () {
        this.time_id && clearTimeout(this.time_id)
        this.time_id = setTimeout(() => {
          if (this.scrollHeight - (this.clientHeight + this.scrollTop) < 20) {
            binding.value()
          }
          this.time_id = 0
        }, 200)
      })
    },
  },
}
