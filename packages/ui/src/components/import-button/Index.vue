<script setup name="HlImportButton">
import IconComp from '../icon/Index.vue'
import { ElButton } from "element-plus"

defineProps({
  icon: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '导入',
  },
})
</script>

<template>
  <el-button color="#626aef">
    <icon-comp icon="bx:import" class="mr-1" style="font-size: 20px;" />
    {{ text }}
    <slot />
  </el-button>
</template>
