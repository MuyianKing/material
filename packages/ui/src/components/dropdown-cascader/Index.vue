<script name="CascaderSelect" setup>
import { getLabelByVal } from '@hl/utils/es/common'
import { cloneDeep } from 'lodash-es'
import { ElCascaderPanel, ElDropdown, ElInput } from 'element-plus'
import { computed, nextTick, ref } from 'vue'
import { HlIcon } from '../icon'

const props = defineProps({
  // 待选项
  options: {
    type: Array,
    default: () => [],
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  // 是否可搜索
  hasSearch: {
    type: Boolean,
    default: false,
  },
  noAll: {
    type: Boolean,
    default: false,
  },
  // 箭头
  noArrow: {
    type: Boolean,
    default: false,
  },
  cascaderProps: {
    type: Object,
    default: () => ({}),
  },
  cascaderAttrs: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['change'])
const cascaderPropsConfig = {
  multiple: props.multiple,
  checkStrictly: false,
  emitPath: false,
  label: 'label',
  value: 'value',
  children: 'children',
  ...props.cascaderProps,
}
const model = defineModel({
  type: [Array, String, Number],
  default: '',
})
const cascaderPanelRef = ref(null)
// 箭头状态
const arrowStatus = ref(false)
// 搜索
const searchKey = ref('')
// 根据搜索关键字过滤选项
const _options = computed(() => {
  const list = cloneDeep(props.options)
  if (!props.noAll) {
    const allOption = {}
    allOption[cascaderPropsConfig.label] = '全部'
    allOption[cascaderPropsConfig.value] = ''
    list.unshift(allOption)
  }
  return list.filter(item => getFilterFlag(item))
})

// 筛选选项
function getFilterFlag(item) {
  if (item[cascaderPropsConfig.label] && item[cascaderPropsConfig.label].includes(searchKey.value)) {
    return true
  }
  if (item[cascaderPropsConfig.children] && Array.isArray(item[cascaderPropsConfig.children])) {
    item[cascaderPropsConfig.children] = item[cascaderPropsConfig.children].filter(child => getFilterFlag(child))
    return item[cascaderPropsConfig.children].some(child => getFilterFlag(child))
  }

  return false
}

async function handleChange() {
  await nextTick()
  if (cascaderPropsConfig.multiple) {
    if (model.value.includes('')) {
      cascaderPanelRef.value.clearCheckedNodes()
      return
    }
    emits('change', cascaderPanelRef.value.getCheckedNodes().map(node => node.data))
  } else {
    emits('change', cascaderPanelRef.value.getCheckedNodes()[0].data)
  }
}

// 值状态
const activeStatus = computed(() => {
  if (!cascaderPropsConfig.multiple) {
    return model.value !== '' && model.value !== null && typeof model.value !== 'undefined'
  }
  return model.value.length > 0
})
// label
const _label = computed(() => {
  if (!props.multiple) {
    return getLabelByVal(_options.value, model.value) || props.label
  }
  return props.label
})
</script>

<template>
  <el-dropdown class="hl-dropdown-cascader" trigger="click" @visible-change="val => { arrowStatus = val }">
    <div :class="{ 'active-label': activeStatus }" class="flex items-center dropdown-label">
      <span>{{ _label }}</span>
      <hl-icon v-if="!noArrow" :class="{ 'deg-180': arrowStatus }" class="arrow-icon ml-1"
               icon="iconamoon:arrow-down-2-thin"
      />
    </div>
    <template #dropdown>
      <div :class="{ 'p-2': hasSearch }" class="flex flex-col">
        <div v-if="hasSearch" class="mb-2">
          <el-input v-model="searchKey" placeholder="请输入关键字快速搜索" />
        </div>
        <el-cascader-panel ref="cascaderPanelRef" v-model="model" :options="_options" :props="cascaderPropsConfig"
                           style="width: fit-content" @change="handleChange"
        />
      </div>
    </template>
  </el-dropdown>
</template>
