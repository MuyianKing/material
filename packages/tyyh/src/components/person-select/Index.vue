<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { HlCheckbox, HlRadio, HlSelect } from '@hl/ui'
import { useDebounceFn } from '@vueuse/core'
import { getUserList, getUserListWithEachOrgJob } from '../../server/user'

const props = defineProps({
  // 待选项
  options: {
    type: Array,
    default: null,
  },
  // 接口
  server: {
    type: Function,
    default: null,
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 展开
  expand: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  // true - 一个人在多个单位则会展示多个
  orgJobIdcard: {
    type: Boolean,
    default: false,
  },
  idKey: {
    type: String,
    default: 'id_card',
  },
  organizationId: {
    type: String,
    default: '',
  },
  // 是否包含下级部门人员
  hasNext: {
    type: Boolean,
    default: false,
  },
  // 禁用选项
  disabledPerson: {
    type: [String, Array],
    default() {
      return []
    },
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  labelConfig: {
    type: String,
    default: '',
  },
})

const _options = ref([])
const loading = ref(false)
let has_more = false
const query = {
  page: 1,
  limit: 10,
}

async function getData() {
  try {
    if (props.options) {
      _options.value = props.options
    } else {
      loading.value = true
      if (props.expand) {
        query.limit = 10000
      }

      const config = {
        label_config: props.labelConfig,
        simple: false,
      }

      const { data, count } = await getApi()(query, config)
      if (query.page === 1) {
        _options.value = []

        const id_card = Array.isArray(value.value) ? value.value.join(',') : value.value
        if (id_card) {
          const init_data = await getApi()({
            ...query,
            id_card,
            limit: 100000,
            page: 1,
          })

          formatData(init_data.data).forEach((item) => {
            _options.value.push(item)
          })
        }
      }

      const has_value = Array.isArray(value.value) ? value.value : [value.value]
      formatData(data).forEach((item) => {
        if (!has_value.includes(item.value)) {
          _options.value.push(item)
        }
      })
      has_more = _options.value.length < count
      loading.value = false
    }
  } catch (e) {
    hl.message.error(e, '获取下拉数据出错')
  }
}

const search = useDebounceFn(() => {
  query.page = 1
  getData()
})

/**
 * 获取请求方法
 * @returns {(function(*): *)|*|(function(*): Promise<*>)} 方法
 */
function getApi() {
  if (props.server) {
    return props.server
  }

  if (props.orgJobIdcard) {
    return getUserListWithEachOrgJob
  } else {
    return getUserList
  }
}

function formatData(data) {
  return data.map((item) => {
    return {
      label: item.name,
      value: item[props.idKey],
    }
  })
}

const value = defineModel()

function handleMore() {
  if (has_more) {
    query.page++
    getData()
  }
}

// 自定义搜索
function filter(val) {
  if (query.query === val) {
    return
  }

  // 设置请求的参数
  query.query = val
  search()
}

watch([() => props.organizationId, () => props.hasNext], () => {
  query.organization_id = props.organizationId
  query.sub_organization = props.hasNext ? 1 : 0
  search()
})

// 如果组件的单选多选是变化的，那么需要监听
watchEffect(() => {
  if (props.multiple) {
    // 变为多选，但是值不是数组变为数组
    if (!Array.isArray(value.value)) {
      value.value = value.value ? [value.value] : []
    }
  } else if (Array.isArray(value.value)) {
    // 单选但是值为数组
    value.value = ''
  }
})

watchEffect(() => {
  if (props.options || props.server) {
    search()
  }
})

// 禁用的人
const _d_p = computed(() => {
  if (!props.disabledPerson) {
    return []
  }
  return Array.isArray(props.disabledPerson) ? props.disabledPerson : [props.disabledPerson]
})

onMounted(() => {
  getData()
})
</script>

<template>
  <hl-radio v-if="expand && !multiple" v-model="value" :options="_options" :empty="!required" v-bind="$attrs" :readonly />
  <hl-checkbox v-else-if="expand && multiple" v-model="value" :options="_options" v-bind="$attrs" :readonly />
  <hl-select v-else v-model="value" :options="_options" v-bind="$attrs" :multiple :loading :remote-method="filter" :readonly remote :disabled-options="_d_p" @bottom="handleMore" />
</template>

<style scoped lang="scss"></style>
