import { HlAddButton, HlPage, HlSearchButton, HlSearchPage } from '@hl/ui'
import '@hl/theme-chalk/search-page.scss'
import '@hl/theme-chalk/search-button.scss'
import '@hl/theme-chalk/add-button.scss'
import '@hl/theme-chalk/page.scss'

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
    getData: {
      type: Function,
      required: true,
      default() {
        return () => { }
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

    // 分页
    const default_slots = [() => <HlPage modelValue={props.query.page} size={props.query.limit} sizes={props.pageConfig?.sizes} count={props.tableData.count || 0} onUpdate:modelValue={val => emit('updatePage', val)} onUpdate:size={val => emit('updateSize', val)} onChange={props.getData} />]
    if (slots.default) {
      default_slots.push(slots.default)
    }

    return () => (
      <HlSearchPage class="list-page" loading={props._loading?.value}>
        {{
          header: () => header.map(slot => (typeof slot === 'function' ? slot() : slot)),
          button: () => button.map(slot => (typeof slot === 'function' ? slot() : slot)),
          table: () => (slots.table ? slots.table() : ''),
          default: () => default_slots.map(slot => (typeof slot === 'function' ? slot() : slot)),
        }}
      </HlSearchPage>
    )
  },
}
