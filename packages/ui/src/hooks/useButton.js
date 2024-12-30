import { computed, useSlots } from 'vue'

export default function useButton(props, _default, tableIcon) {
  const $slots = useSlots()
  const _text = computed(() => {
    if ($slots.default) {
      return ''
    }

    if (props.text) {
      if (typeof props.text === 'string') {
        return props.text
      }
    }

    return _default
  })

  const buttonType = computed(() => {
    if (props.text !== undefined) {
      return props.text ? 'text' : 'icon'
    }

    return tableIcon || 'icon'
  })

  return {
    _text,
    buttonType,
  }
}
