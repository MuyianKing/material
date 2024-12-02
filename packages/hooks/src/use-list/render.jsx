import { HlAddButton, HlPage, HlSearchButton, HlSearchPage } from '@hl/ui'

export default {
  name: 'HlListPageRender',
  components: {
    HlAddButton,
    HlPage,
    HlSearchButton,
    HlSearchPage,
  },
  props: {
    query: {
      type: Object,
      default() {
        return {}
      },
    },
    pageQuery: {
      type: Object,
      default: {},
    },
    _loading: {
      type: Object,
      default() {
        return null
      },
    },
    tableData: {
      type: Object,
      default() {
        return {}
      },
    },
    // 隐藏添加按钮
    noAdd: {
      type: Boolean,
      default: false,
    },
    // 隐藏搜索按钮
    noSearch: {
      type: Boolean,
      default: false,
    },
    pageConfig: {
      type: Object,
      default: null,
    },
    noPage: {
      type: Boolean,
      default: false,
    },
    advancedText: {
      type: String,
      default: '高级搜索',
    },
  },
  setup(props, { slots, emit }) {
    // 列表页头部搜索区域
    const header = []

    // 搜索表单
    if (slots.search) {
      header.push(slots.search)
    }

    const button = []

    // 搜索按钮
    if (!props.noSearch) {
      button.push(() => <HlSearchButton onClick={() => emit('search')} />)
    }

    // 添加按钮
    if (!props.noAdd) {
      button.push(() => <HlAddButton onClick={() => emit('add', null)} />)
    }

    // 其他按钮
    if (slots.button) {
      button.push(slots.button)
    }

    // 高级搜索
    const advanced = []
    if (slots.advanced) {
      advanced.push(slots.advanced)
    }

    const default_slots = []

    // 分页
    if (!props.noPage) {
      default_slots.push(() => <HlPage modelValue={props.pageQuery.page} size={props.pageQuery.limit} sizes={props.pageConfig?.sizes} count={props.tableData.count || 0} onUpdate:modelValue={val => emit('updatePage', val)} onUpdate:size={val => emit('updateSize', val)} onChange={() => emit('getData')} />)
    }

    // 默认插槽
    if (slots.default) {
      default_slots.push(slots.default)
    }

    return () => (
      <HlSearchPage class="list-page" loading={props._loading?.value} advancedText={advanced.length === 0 ? '' : props.advancedText}>
        {{
          header: () => header.map(slot => (typeof slot === 'function' ? slot() : slot)),
          button: () => button.map(slot => (typeof slot === 'function' ? slot() : slot)),
          advanced: () => advanced.map(slot => (typeof slot === 'function' ? slot() : slot)),
          table: () => (slots.table ? slots.table() : ''),
          default: () => default_slots.map(slot => (typeof slot === 'function' ? slot() : slot)),
        }}
      </HlSearchPage>
    )
  },
}
