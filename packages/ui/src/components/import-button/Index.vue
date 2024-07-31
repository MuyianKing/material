<script setup name="HlImportButton">
import { ElButton } from 'element-plus'
import IconComp from '../icon/Index.vue'
import 'element-plus/es/components/button/style/css'

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

<style lang="scss" scoped>
.hl-ui-zw {
  color: red;
}
</style>
