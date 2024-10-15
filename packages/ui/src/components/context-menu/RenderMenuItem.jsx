import { computed, inject } from 'vue'
import HlIcon from '../icon/Index.vue'

export default {
  props: {
    options: {
      type: Array,
      requred: true,
    },
  },
  components: {
    HlIcon,
  },
  setup(props, { emit }) {
    const context_item_renders = inject('context_item_renders', [])

    function handelClick(index) {
      emit('selected', index)
    }

    // 有插槽以插槽为准，没有以options为准
    const list = computed(() =>
      context_item_renders.value.length > 0
        ? context_item_renders.value
        : props.options,
    )

    return () => (
      <div class="hl-context-menu-content">
        {list.value.map((render, index) => {
          return (
            <div
              class="hl-context-menu-item"
              onClick={() => handelClick(index)}
              style={`color:${render.color}`}
            >
              {render.label
                ? [
                    <HlIcon icon={render.icon} />,
                    <span class="ml-1">{render.label}</span>,
                  ]
                : render(props.options[index])}
            </div>
          )
        })}
      </div>
    )
  },
}
