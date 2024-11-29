import { error } from '@hl/ui/src/utils/message'
import { pageSize } from '@hl/utils'
import { useDebounceFn } from '@vueuse/core'
import { h, nextTick, onMounted, reactive, watch } from 'vue'
import useRequest from '../request/useListRequest'
import render from './render.jsx'

/**
 * @param {object} params
 * @param {object} params.query 查询需要的参数
 * @param {Function} params.server 请求后台的方法
 * @param { Array } params.data_extend_keys 需要额外从接口中获取的字段，默认只取data和count
 * @param {Function} params.onEnd 获取数据结束后执行的方法
 * @param {Function} params.autoSearch mounted后自动请求数据
 * @param {boolean} params.autoUpdate 参数变化后自动请求数据
 * @param {boolean} params.noPage 是否不渲染分页
 * @param {Function} params.oneServer 更新一行数据接口，如果是null则取server
 * @param {Function} params.oneServerKey 更新一行数据接口参数key，默认id
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
    noPage = false,
    oneServerKey = 'id',
  } = params

  let oneServer = params.oneServer || server
  if (typeof oneServer !== 'function') {
    oneServer = null
  }

  // 条件
  const page_query = reactive({
    page: query.page || 1,
    limit: query.limit || pageSize,
  })

  // 删除分页字段
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
      error(e, '获取数据出错')
    } finally {
      if (onEnd && typeof onEnd === 'function') {
        onEnd()
      }
    }
  }, 300)

  // 更新一行数据
  function updateOne(row, callback) {
    if (!oneServer) {
      return
    }

    // 没有主键代表新增：刷新所有数据
    if (!row[oneServerKey]) {
      getData()
      return
    }

    const params = {}
    params[oneServerKey] = row[oneServerKey]

    oneServer(params).then((data) => {
      if (data?.data) {
        data = Array.isArray(data.data) ? data.data[0] : data.data
      }

      if (!data) {
        error(null, '未获取到更新数据')
        return
      }

      // 根据主键找到需要更新的数据项
      row = list_data.data.find(item => item[oneServerKey] === row[oneServerKey])

      // 更新数据
      for (const key in row) {
        row[key] = data[key]
      }

      // 回调
      if (callback && typeof callback === 'function') {
        callback(row)
      }
    }).catch((e) => {
      error(e, '更新数据出错')
    })
  }

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
      noPage,
      query: query_ref,
      pageQuery: page_query,
      tableData: list_data,
      pageConfig,
      onSearch() {
        search()
      },
      onUpdatePage(page) {
        page_query.page = page

        // 没有自动变化则需要手动触发查询
        if (!autoUpdate) {
          getData()
        }
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
    updateOne,
    // 获取到的数据{data:"列表数据",count:"数据量"}
    table_data: list_data,
    loading,
  }
}
