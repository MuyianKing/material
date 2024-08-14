import { cloneDeep, concat } from 'lodash-es'
import { error } from '@hl/utils/es/message'
import { reactive, ref, watch } from 'vue'

export default function (props, emits, apiSelect, config = {}) {
  const select_value = ref('')
  const dataList = ref([])

  const selected_list = {}
  const need_selected_list = config.need_selected_list || false

  if (need_selected_list) {
    watch(select_value, (val) => {
      if (!Array.isArray(val)) {
        val = (val || '').split(',').filter(f => !!f)
      }

      // 删掉已经不存在的
      Object.keys(selected_list).forEach((key) => {
        if (!val.includes(key)) {
          delete selected_list[key]
        }
      })

      // 添加新的
      val.forEach((key) => {
        if (!selected_list[key]) {
          selected_list[key] = dataList.value.find(item => item.id === key)
        }
      })
    })
  }

  const query = reactive({
    opt: 'get',
    limit: 20,
    page: 1,
    id: '',
    ...(config.params || {}),
  })

  const commonInit = async () => {
    const key = config.key || 'id'
    dataList.value = []
    const params = { ...query }
    const value = props.modelValue

    // value可能是数组
    if (Array.isArray(value)) {
      params[key] = value.join(',')
    } else if (value) {
      params[key] = value
    }

    // 有初始id根据id获取
    if (params[key]) {
      const data = await apiSelect(params)
      if (data && data.data) {
        dataList.value = formatData(data.data)
      }
    }
    const data = await apiSelect(query)
    dataList.value = concat(dataList.value, filterData(formatData(data.data)))

    if (props.multiple) {
      if (Array.isArray(value)) {
        select_value.value = cloneDeep(value)
      } else {
        select_value.value = value ? value.toString().split(',') : []
      }

      select_value.value = select_value.value.map(item => item.toString())
    } else if (Array.isArray(value)) {
      select_value.value = value.join(',')
    } else {
      select_value.value = value ? value.toString() : ''
    }
  }

  const formatData = data =>
    commonFormatData(data, config.format_config || {})

  // 格式化数据
  const commonFormatData = (data, keys = {}) => {
    if (!data || data.length === 0) {
      return []
    }
    const id_key = keys.id_key ? keys.id_key : 'id'
    const name_key = keys.name_key ? keys.name_key : 'name'
    const extend_keys = keys.extend_keys ? keys.extend_keys : []

    return data.map((item) => {
      const new_item = {
        id: `${item[id_key].toString()}`,
        name: item[name_key],
      }

      // 额外字段数据
      extend_keys.forEach((key) => {
        new_item[key] = item[key]
      })
      return new_item
    })
  }

  // 去掉已经包含的数据
  const filterData = (data) => {
    let fData = data
    const ids = dataList.value.map(item => item.id)
    if (ids.length > 0) {
      fData = data.filter(item => !ids.includes(item.id))
    }
    return fData
  }

  // 是否还有更多
  let hasMore = true

  // 搜索
  const search = () => {
    apiSelect(query)
      .then((data) => {
        hasMore = data.count > query.limit * query.page

        dataList.value = concat(
          dataList.value,
          filterData(formatData(data.data)),
        )
      })
      .catch((e) => {
        error(e)
      })
  }

  // 搜索
  const commonFilter = () => {
    document.getElementsByClassName(
      'el-scrollbar__view el-select-dropdown__list',
    ).scrollTop = 0
    dataList.value = []
    query.page = 1
    search()
  }

  // 下拉加载更多
  const loadmore = () => {
    if (hasMore) {
      query.page++
      search()
    }
  }

  // 下拉框值变化类型：self-自身选择改变不需要做任何操作，outer-外部手动改变
  let value_change_type = 'outer'

  // 下拉事件
  const handleSelChange = (val) => {
    value_change_type = 'self'
    // 给我什么类型的就返回什么类型的数据
    let return_data = null
    if (props.multiple) {
      // 处理有全选时的数据冲突，只适用value为number类型
      if (props.selectAll) {
        const last = val[val.length - 1]
        if (last === 'all') {
          // 选了全体人员，清除非其自定义人员
          const new_val = []
          val.forEach((item) => {
            if (Number.isNaN(+item)) {
              new_val.push(item)
            }
          })
          val = new_val
        } else if (val.length > 1) {
          const index = val.findIndex(item => item === 'all')

          if (index > -1 && !Number.isNaN(+last)) {
            val.splice(index, 1)
          }
        }
      }

      return_data = Array.isArray(props.modelValue) ? val : val.join(',')
    } else {
      return_data = Array.isArray(props.modelValue) ? [val] : val
    }
    emits('update:modelValue', return_data)
  }

  watch(
    () => props.modelValue,
    () => {
      if (value_change_type !== 'self') {
        commonInit()
      }
      // 默认外部更新数据
      value_change_type = 'outer'
    },
    {
      immediate: true,
    },
  )

  return {
    select_value,
    dataList,
    apiSelect,
    query,
    selected_list,
    loadmore,
    handleSelChange,
    commonFilter,
  }
}
