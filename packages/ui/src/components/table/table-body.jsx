import { isOverflow } from '@hl/utils'
import { useDebounceFn } from '@vueuse/core'
import { ElCheckbox, ElTooltip } from 'element-plus'
import { computed, inject, ref } from 'vue'

export default {
  name: 'HlTableBody',
  components: {
    ElCheckbox,
    ElTooltip,
  },
  props: {
    hover: {
      type: String,
      default: 'default',
    },
    activeIndex: {
      type: [Number, String],
      default: '',
    },
    emptyText: {
      type: String,
      default: '没有数据',
    },
    rowClass: {
      type: Function,
      default() {
        return ''
      },
    },
    tooltipEffect: {
      type: String,
      default: 'light',
    },
    tooltopMaxWidth: {
      type: String,
      default: '50vw',
    },
    // 开启选择
    select: {
      type: Boolean,
      default: false,
    },
    // 主键
    rowKey: {
      type: String,
      default: 'id',
    },
    check: {
      type: Array,
      default() {
        return []
      },
    },
    excludeChecked: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup(props, { emit, slots }) {
    const store = inject('hlTableStore', { columns: [] })
    const columns = computed(() => store.value.columns)
    const data = computed(() => store.value.data)

    function rowClick(row, index) {
      emit('row-click', row, index)
    }

    const tr_style = computed(() => ({
      cursor: props.hover,
    }))

    const tip_content = ref('')
    const visible = ref(false)
    const tip_index = ref(0)

    // 设置tip
    const setTips = useDebounceFn((e, index, col_index) => {
      if (columns.value[col_index]?.noTip) {
        return
      }

      tip_index.value = index
      const dom = e.target
      if (isOverflow(dom) || (dom.children[0] && isOverflow(dom.children[0]))) {
        const { top, left } = dom.getBoundingClientRect()

        let y_offset = 6
        if (index < 2) {
          y_offset = 14 + dom.clientHeight / 2
        }

        position.value = DOMRect.fromRect({
          width: 0,
          height: 0,
          x: left + dom.clientWidth / 2,
          y: top + y_offset,
        })

        tip_content.value = dom.textContent
        visible.value = true
      }
    }, 150)

    // 隐藏tip
    function hideTip() {
      visible.value = false
    }

    const position = ref({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    })

    const triggerRef = ref({
      getBoundingClientRect() {
        return position.value
      },
    })

    function disposeData(oldData, val, org_value, isNull = false) {
      const data = [...oldData]
      if ((isNull ? val === '' : val !== '') && !data.includes(org_value)) {
        data.push(org_value)
      } else {
        const index = data.findIndex(item => item === org_value)
        data.splice(index, 1)
      }

      return data
    }

    function handleCheckboxChange(val, org_value) {
      const check = disposeData(props.check, val, org_value)
      const excludeChecked = disposeData(props.excludeChecked, val, org_value, true)

      emit('update:check', check)
      emit('update:excludeChecked', excludeChecked)
    }

    return () => (
      <table class="hl-table-body" cellspacing="0" cellpadding="0" border="0">
        <tbody>
          {
            data.value.map((row, index) => {
              const arr = [
                <tr
                  key={row[props.rowKey]}
                  className={`hl-table-tr${props.activeIndex !== '' && +props.activeIndex === index ? ' active' : ''} ${index % 2 === 0 ? '' : 'enev'} ${props.rowClass && props.rowClass(row, index)}`}
                  onClick={() => {
                    rowClick(row, index)
                  }}
                  style={tr_style.value}
                >
                  {
                    (props.select) && (
                      <td className="hl-table-td hl-table-checkbox" style="width:60px;min-width:60px;max-width:60px;text-align:center">
                        <ElCheckbox true-value={row[props.rowKey]} false-value="" size="large" v-model={row.checkbox} onChange={val => handleCheckboxChange(val, row[props.rowKey])} />
                      </td>
                    )
                  }

                  {columns.value.filter(column => column.show).map((column, col_index) => (
                    <td key={column.uuid} data-uuid={column.uuid} class={`hl-table-td ${column.className}`} style={column.tdStyle} onMouseenter={e => setTips(e, index, col_index)} onMouseleave={hideTip}>
                      {column.render({
                        row,
                        index,
                      })}
                    </td>
                  ))}
                </tr>,
              ]

              if (slots.extend) {
                arr.push(
                  <tr className={`${index % 2 === 0 ? '' : 'enev'}`}>
                    <td className="extend-td" colspan={columns.value.length}>
                      {slots.extend({
                        row,
                        index,
                      })}
                    </td>
                  </tr>,
                )
              }
              return arr
            })
          }

          {data.value.length === 0 && (
            <tr>
              <td class="hl-table-td hl-table-no-data" colspan={columns.value.length}>
                没有数据
              </td>
            </tr>
          )}

        </tbody>
        <ElTooltip visible={visible.value} append-to="body" raw-content content={`<div style="max-width:${props.tooltopMaxWidth}">${tip_content.value}</div>`} effect={props.tooltipEffect} placement={tip_index.value > 1 ? 'top' : 'bottom'} virtual-triggering virtual-ref={triggerRef.value} />
      </table>
    )
  },
}
