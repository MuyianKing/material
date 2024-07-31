import { evalByFun, getLabelByVal } from '@hl/utils/common'
import { show_huo_qie, show_opt_type } from '../../../../default/form'

export default function useGenerateRelative(form, config, mode) {
  /**
   * 根据显示控制配置返回JS表达式
   * @param {object} condition
   */
  function isTruthByConfig(condition) {
    if (condition.type === 'options') {
      return getLabelByVal(show_huo_qie, condition.value, { label: 'condition_value' })
    } else {
      const opt = getLabelByVal(show_opt_type, condition.opt, { obj: true })

      // 定义了条件转换器
      if (typeof opt.conditionFun === 'function') {
        return opt.conditionFun(condition.field, condition.value)
      }

      // 默认转换：
      return `(form['${condition.field}']${opt.conditionFun}'${condition.value}')`
    }
  }

  // 控制组件显示
  function isShow() {
    if (!form.value) {
      return true
    }

    const _property = config?._property

    if (_property) {
      // 没有配置
      if (_property.show.length === 0) {
        return true
      }

      // 根据数组生成所有表达式
      const condition_list = []
      _property.show.forEach((item) => {
        condition_list.push(isTruthByConfig(item))
      })

      return evalByFun(condition_list.join(''), {
        form: {
          ...form.value,
          task_comp_mode: mode,
        },
      })
    }

    return true
  }

  const show = ref(true)
  function initWatcher() {
    const _property_show = config?._property?.show?.filter(item => item.field).map(item =>
      () => form.value?.[item.field[0]],
    )

    if (_property_show && _property_show.length > 0) {
      watch(_property_show, () => {
        show.value = isShow()
      }, {
        deep: true,
        immediate: true,
      })
    }
  }

  onMounted(() => {
    initWatcher()
  })

  return {
    show,
  }
}
