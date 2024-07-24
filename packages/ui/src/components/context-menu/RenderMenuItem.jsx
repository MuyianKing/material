// eslint-disable-next-line no-unused-vars
import HlIcon from '../icon/Index.vue'

import './render.menuitem.scss'

export default {
  props: {
    options: {
      type: Array,
      requred: true,
    },
  },
  setup(props, { emit }) {
    const context_item_renders = inject('context_item_renders')

    function handelClick(index) {
      emit('selected', index)
    }

    // 有插槽以插槽为准，没有以options为准
    const list = computed(() => context_item_renders.value.length > 0 ? context_item_renders.value : props.options)

    return () => (
      <div class="context-menu-content">
        {list.value.map((render, index) => {
          return (
            <div class="hl-context-menu-item" onClick={() => handelClick(index)} style={`color:${render.color}`}>
              {render.label
                ? (
                    [
                      <HlIcon icon={render.icon} />,
                      <span class="ml-1">{render.label}</span>,
                    ])
                : render(props.options[index])}
            </div>
          )
        })}
      </div>
    )
  },
}
