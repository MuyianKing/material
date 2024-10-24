<script setup>
import { ElOption, ElSelect, vLoading } from 'element-plus'
import { vLoadmore } from '@hl/directions'
import { ref, useAttrs, watch } from 'vue'

defineOptions({
  name: 'HlSelectRemote',
  description: '远程下拉组件',
})

const props = defineProps({
  server: {
    type: Function,
    required: true,
  },
  all: {
    type: Boolean,
    default: false,
  },
  dataConfig: {
    type: Object,
    default() {
      return {
        label_key: 'name',
        value_key: 'id',
        extend_keys: [],
      }
    },
  },
})

const query = {
  limit: 20,
  page: 1,
  query: '',
}

// 自定义搜索
function filterFun(val) {
  if (is_focus) {
    is_focus = true
    return
  }

  query.page = 1
  query.query = val

  if (val === '') {
    init()
  } else {
    getData()
  }
}

let is_focus = false
function handleFocus() {
  console.log('handleFocus')
  is_focus = true
}

function formatData(data) {
  if (!data || data.length === 0) {
    return []
  }

  const config = props.dataConfig || {}
  const label_key = config.label_key || 'name'
  const value_key = config.value_key || 'id'
  const extend_keys = config.extend_keys || []

  return data.map((item) => {
    const new_item = {
      value: item[value_key],
      label: item[label_key],
    }

    // 额外字段数据
    extend_keys.forEach((key) => {
      new_item[key] = item[key]
    })
    return new_item
  })
}

const loading = ref(false)
// 用给定的方法获取数据
async function getServerData(params) {
  if (!props.server) {
    return []
  }

  loading.value = true
  const { count, data } = await props.server(params)
  loading.value = false
  return {
    count,
    data: formatData(data),
  }
}

const dataList = ref([])
let has_more = true

// 获取数据
async function getData(options = {}) {
  const { append = false, filter_ids = [] } = (options || {})
  const { count, data } = await getServerData(query)

  if (!append) {
    dataList.value = []
  }

  data.forEach((item) => {
    // 过滤掉初始化的数据
    if (!filter_ids.includes(item.value)) {
      dataList.value.push(item)
    }
  })

  has_more = count > dataList.value.length
}

// 加载更多
function loadmore() {
  if (has_more) {
    getData({ append: true })
  }
}

const $attrs = useAttrs()

// 初始化
async function init() {
  // 回显时：如果数据属于第二页数据，不初始化这些数据就回显不出来
  if ($attrs.modelValue !== '' && $attrs.modelValue !== undefined) {
    const { data } = await getServerData({
      id: $attrs.modelValue,
    })

    dataList.value = data
  }

  getData({
    append: true,
    filter_ids: Array.isArray($attrs.modelValue) ? $attrs.modelValue : [$attrs.modelValue],
  })
}

let update_by_self = false
function handleChange() {
  update_by_self = true
}

watch(() => $attrs.modelValue, () => {
  if (!update_by_self) {
    init()
  }

  update_by_self = false
}, {
  immediate: true,
})
</script>

<template>
  <el-select :remote-method="filterFun" filterable remote-show-suffix remote @change="handleChange" @focus="handleFocus">
    <div v-loadmore="loadmore">
      <el-option v-if="all" value="">
        全部
      </el-option>
      <el-option v-for="item in dataList" :key="item.value" :value="item.value" :label="item.label" />
    </div>

    <div v-loading="loading" class="hl-select-loading-item" />
  </el-select>
</template>

<style lang='scss' scoped></style>
