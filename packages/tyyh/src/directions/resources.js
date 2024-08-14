// 当页面进入可视区域后调用binding绑定的方法
function removeEl(el) {
  el._parentNode = el.parentNode
  el._placeholderNode = document.createComment('auth')
  el.parentNode?.replaceChild(el._placeholderNode, el)
}

function addEl(el) {
  el._parentNode?.replaceChild(el, el._placeholderNode)
}

/**
 * @type {import('vue').Directive<HTMLElement,string>}
 */
const vResources = {
  mounted(el, binding) {
    const resources_id = hl.getUserInfo().resources_id || []
    if (!resources_id.includes(binding.value)) {
      removeEl(el)
    }
  },
  updated(el, binding) {
    const resources_id = hl.getUserInfo().resources_id || []
    if (!resources_id.includes(binding.value)) {
      removeEl(el)
    } else {
      addEl(el)
    }
  },
}

export { vResources }
