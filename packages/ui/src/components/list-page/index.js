import { pageSize } from '@hl/utils/es/common'
import { useRequest } from '@hl/hooks'
import render from './render.jsx'

// 条件
const page_query = reactive({
  page: 1,
  limit: pageSize,
})

/**
 * @param {object} params
 * @param {object} params.query 查询需要的参数
 * @param { Function } params.server 请求后台的方法
 * @param { Array } params.data_extend_keys 需要额外从接口中获取的字段，默认只取data和count
 * @param {Function} params.onEnd 获取数据结束后执行的方法
 * @param {Function} params.autoSearch mounted后自动请求数据
 */
export default function HlListPage({ query = {}, server = null, data_extend_keys = [], onEnd = null, autoSearch = true, pageConfig = null }) {
  const query_ref = reactive({
    ...page_query,
    ...query,
  })

  const {
    loading,
    list_data,
    getList,
  } = useRequest(server)

  // 获取数据
  async function getData(opt = {}) {
    try {
      const append = opt?.append || false
      await nextTick()
      await getList(query_ref, {
        append,
        clear: append ? false : !!opt.clear,
        data_extend_keys,
      })
    } catch (e) {
      hl.message.error(e, '获取数据出错')
    } finally {
      if (onEnd && typeof onEnd === 'function') {
        onEnd()
      }
    }
  }

  // 搜索
  const search = useDebounceFn(() => {
    query_ref.page = 1
    getData()
  }, 300)

  onMounted(() => {
    if (autoSearch)
      getData()
  })

  return {
    // 组件渲染函数
    HlListPage: h(render, {
      _loading: loading,
      getData,
      query: query_ref,
      tableData: list_data,
      pageConfig,
      onSearch() {
        search()
      },
      onUpdatePage(page) {
        query_ref.page = page
      },
      onUpdateSize(size) {
        query_ref.limit = size
      },
    }),
    // 查询条件
    query: query_ref,
    // 获取数据的方法
    getData,
    // 搜索方法：添加防抖和每次会将分页置为1
    search,
    // 获取到的数据{data:"列表数据",count:"数据量"}
    table_data: list_data,
    loading,
  }
}

export const useListPage = HlListPage
