<script setup>
import theme from '@style/theme.module.scss'
import { computed, ref } from 'vue'
import { HlIcon } from '@hl/ui'
import { ElPopover } from 'element-plus'
import InputComp from './components/Input.vue'
import DropdownComp from './components/Dropdown.vue'
import DateComp from './components/Date.vue'

import 'element-plus/es/components/popover/style/css'

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['search'])

const model_value = defineModel()
const start_time = defineModel('start')
const end_time = defineModel('end')

const visible = ref(false)
function handleSearch({ value, start, end }) {
  if (props.config.type === 'date') {
    start_time.value = start
    end_time.value = end
  } else {
    model_value.value = value
  }

  emits('search')
  visible.value = false
}

const placeholder_comp = computed(() => {
  return `请输入${props.config?.label || ''}`
})

const width_map = {
  input: 300,
  date: 417,
}

const active = computed(() => {
  return !!(model_value.value || start_time.value || end_time.value)
})
</script>

<template>
  <el-popover v-if="config?.type !== 'dropdown'" v-model:visible="visible" :width="width_map[props.config?.type]"
    trigger="click">
    <template #reference>
      <div class="flex items-center" :class="{ 'active-search': active }">
        <span>{{ config.label }}</span>
        <hl-icon icon="ph:caret-down" size="14px" />
      </div>
    </template>

    <input-comp v-if="config?.type === 'input'" :placeholder="placeholder_comp" @search="handleSearch" />
    <date-comp v-if="config?.type === 'date'" @search="handleSearch" />
  </el-popover>

  <dropdown-comp v-else :config="config" :light-color="theme['color-danger']" @search="handleSearch" />
</template>

<style lang='scss' scoped>
.active-search {
  color: var(--color-danger);
}
</style>
