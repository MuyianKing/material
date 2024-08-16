<script setup>
import { ElTooltip } from 'element-plus'
import IconComp from '../icon/Index.vue'

defineProps({
  placement: {
    type: String,
    default: 'top',
  },
})
</script>

<template>
  <el-tooltip effect="dark" :placement="placement">
    <template #content>
      <slot />
    </template>
    <icon-comp icon="mingcute:question-fill" class="text-gray-600 cursor-pointer" v-bind="$attrs" />
  </el-tooltip>
</template>
