<script setup>
import { getLabelByVal } from '@hl/utils/es/common'
import { ElCheckbox, ElCheckboxGroup, ElDropdown, ElDropdownItem, ElDropdownMenu, ElScrollbar } from 'element-plus'
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
})

const emits = defineEmits(['change'])
const model = defineModel({
  type: [Array, String, Number],
  default: undefined,
})
// 多选并且没有初始值，置为空数组
if (typeof model.value === 'undefined') {
  model.value = props.multiple ? [] : ''
}

// 箭头状态
const arrowStatus = ref(false)
// 搜索
const searchKey = ref('')
// 根据搜索关键字过滤选项
const _options = computed(() => props.options.filter(item => item.label.includes(searchKey.value)))

// 选择
async function handleSingleChange(val) {
  if (!props.multiple) { // 单选
    model.value = val
  } else { // 多选
    const _val = [..._value.value].filter(item => !!item)
    if (_val.includes(val.value)) {
      _val.splice(_val.indexOf(val.value), 1)
    } else {
      _val.push(val.value)
    }
    if (Array.isArray(model.value)) {
      model.value = _val
    } else {
      model.value = _val.join(',')
    }
  }
  await nextTick()
  emits('change', model.value)
}

// 多选时全部选项
const multipleAllValue = ref(false)

function allChecked(val) {
  if (val) {
    model.value = Array.isArray(model.value) ? _options.value.map(item => item.value) : _options.value.map(item => item.value).join(',')
  } else {
    model.value = Array.isArray(model.value) ? [] : ''
  }
  nextTick(() => {
    multipleAllValue.value = val
    emits('change', model.value)
  })
}

// 值
const _value = computed(() => {
  if (!props.multiple) {
    return model.value
  }
  let _val
  if (Array.isArray(model.value)) {
    _val = model.value
  } else if (typeof model.value === 'number' || typeof model.value === 'string') {
    // 有东西，但是不是数组
    _val = model.value.toString().split(',').map((item) => {
      const _index = _options.value.findIndex(option => option.value === item)
      if (_index !== -1) {
        return _options.value[_index].value
      }
      // 找不到选项
      return ''
    }).filter(item => !!item)
  } else {
    _val = []
  }
  return _val
})
if (props.multiple) {
  watch(() => _value.value.length, (val) => {
    multipleAllValue.value = val === _options.value.length
  }, { immediate: true })
}
// 值状态
const activeStatus = computed(() => {
  if (!props.multiple) {
    return model.value !== '' && model.value !== null && typeof model.value !== 'undefined'
  }
  return _value.value.length > 0
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
  <el-dropdown trigger="click" @visible-change="val => { arrowStatus = val }">
    <div :class="{ 'active-label': activeStatus }" class="flex items-center dropdown-label">
      <span>{{ _label }}</span>
      <hl-icon v-if="!noArrow" :class="{ 'deg-180': arrowStatus }" class="arrow-icon ml-1" icon="iconamoon:arrow-down-2-thin" />
    </div>
    <template #dropdown>
      <div class="flex flex-col">
        <div v-if="hasSearch" class="px-2 pt-2">
          <el-input v-model="searchKey" class="w-full flex-1" clearable placeholder="请输入关键字快速搜索" @input="multipleAllValue = false" />
        </div>
        <el-scrollbar class="py-1" max-height="280">
          <div v-if="multiple" class="px-4">
            <el-checkbox v-if="!noAll" v-model="multipleAllValue" class="mr-0" label="全部" @change="allChecked" />
            <el-checkbox-group :model-value="_value" class="flex flex-col">
              <el-checkbox v-for="item in _options" :key="item.value" :disabled="item.disabled" :label="item.label" :value="item.value" class="mr-0" @click="handleSingleChange(item)" />
            </el-checkbox-group>
          </div>
          <template v-else>
            <el-dropdown-menu>
              <el-dropdown-item v-if="!noAll" @click="handleSingleChange('')">
                全部
              </el-dropdown-item>
              <el-dropdown-item v-for="item in _options" :key="item.value" :class="{ active: item.value === model }" @click="handleSingleChange(item.value)">
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-scrollbar>
      </div>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
:deep(.active) {
  background-color: var(--color-primary);
  color: white;
}

.dropdown-label {
  color: white;
  cursor: pointer;
  line-height: normal;
}

.active-label {
  color: var(--color-primary);
}

.arrow-icon {
  transition: all ease 0.5s;
}

.deg-180 {
  transform: rotate(180deg);
}
</style>
