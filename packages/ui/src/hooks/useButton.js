import { computed, useSlots } from 'vue'

export default function useButton(props, _default) {
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

  return {
    _text,
  }
}
