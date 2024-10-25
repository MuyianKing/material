import { pageSize } from '@hl/utils'
import { useDebounceFn } from '@vueuse/core'
import { h, nextTick, onMounted, reactive, watch } from 'vue'
import useRequest from '../request/useListRequest'
import render from './render.jsx'

/**
 * @param {object} params
 * @param {object} params.query 查询需要的参数
 * @param { Function } params.server 请求后台的方法
 * @param { Array } params.data_extend_keys 需要额外从接口中获取的字段，默认只取data和count
 * @param {Function} params.onEnd 获取数据结束后执行的方法
 * @param {Function} params.autoSearch mounted后自动请求数据
 * @param {boolean} params.autoUpdate 参数变化后自动请求数据
 */
export default function HlListPage(params) {
  const {
    query = {},
    server = null,
    data_extend_keys = [],
    onEnd = null,
    autoSearch = true,
    autoUpdate = true,
    pageConfig = null,
  } = params

  // 条件
  const page_query = reactive({
    page: query.page || 1,
    limit: query.limit || pageSize,
  })

  // 删除无用字段
  delete query.page
  delete query.limit

  const query_ref = reactive(query)

  const { loading, list_data, getList } = useRequest(server)

  /**
   * 获取数据
   * @param {object} options
   * @param {boolean} options.append 是否累加数据
   * @param {boolean} options.clear 是否清空数据数据
   */
  const getData = useDebounceFn(async (options = {}) => {
    try {
      const append = options?.append || false
      await nextTick()
      await getList({
        ...query_ref,
        ...page_query,
      }, {
        append,
        clear: append ? false : !!options.clear,
        data_extend_keys,
      })
    } catch (e) {
      hl.message.error(e, '获取数据出错')
    } finally {
      if (onEnd && typeof onEnd === 'function') {
        onEnd()
      }
    }
  }, 300)

  // 搜索
  const search = () => {
    page_query.page = 1
    getData()
  }

  if (autoUpdate) {
    // 监听表单参数
    watch(query_ref, () => {
      search()
    }, {
      deep: true,
    })

    // 监听分页参数
    watch(page_query, () => {
      getData()
    })
  }

  onMounted(() => {
    if (autoSearch) {
      search()
    }
  })

  return {
    // 组件渲染函数
    HlListPage: h(render, {
      _loading: loading,
      query: query_ref,
      pageQuery: page_query,
      tableData: list_data,
      pageConfig,
      onSearch() {
        search()
      },
      onUpdatePage(page) {
        page_query.page = page
      },
      onUpdateSize(size) {
        page_query.limit = size
      },
    }),
    // 查询条件
    query: query_ref,
    page_query,
    // 获取数据的方法
    getData,
    // 搜索方法：添加防抖和每次会将分页置为1
    search,
    // 获取到的数据{data:"列表数据",count:"数据量"}
    table_data: list_data,
    loading,
  }
}
