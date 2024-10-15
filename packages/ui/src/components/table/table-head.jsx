import { ElCheckbox } from 'element-plus'

import { computed, inject, watch } from 'vue'

export default {
  components: {
    ElCheckbox,
  },
  props: {
    // 开启选择
    select: {
      type: Boolean,
      default: false,
    },
    excludeChecked: {
      type: Array,
      default: () => ([]),
    },
    checkAll: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = inject('hlTableStore', { columns: [] })
    const columns = computed(() => store.value.columns)

    const align_map = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    }

    function spanClick(column, index) {
      emit('spanClick', column, index)
    }

    let _change_self = false

    function changeCheckAll(val) {
      _change_self = true
      emit('update:checkAll', val)
      emit('changeCheckAll', val)
    }

    watch(() => props.excludeChecked, (value) => {
      if (_change_self) {
        _change_self = false
        return
      }
      emit('update:checkAll', value.length <= 0)
    })
    return () => (
      <table class="hl-table-header" cellspacing="0" cellpadding="0" border="0">
        <thead>
          <tr className="hl-table-tr">
            {
              (props.select) && (
                <th className="hl-table-td hl-table-th hl-table-checkbox" style="width:60px;min-width:60px;max-width:60px;text-align:center">
                  <ElCheckbox size="large" modelValue={props.checkAll} onChange={changeCheckAll} />
                </th>
              )
            }
            {columns.value.filter(column => column.show).map((column, index) => (
              <th
                class={`hl-table-td hl-table-th ${column.className}`}
                style={column.thStyle}
                key={column.uuid}
                onClick={() => {
                  spanClick(column, index)
                }}
              >
                <div class="hl-table-td-div" style={{ justifyContent: align_map[column.style.textAlign] }}>
                  {column.renderHeader
                    ? column.renderHeader()
                    : (
                        <span style={{ verticalAlign: 'middle', textAlign: column.style.textAlign }}>
                          {column.label}
                        </span>
                      )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
      </table>
    )
  },
}
