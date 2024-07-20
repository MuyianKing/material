<script setup name="HlEditButton">
import IconComp from '../icon/Index.vue'
import { ElTooltip } from "element-plus"

const emits = defineEmits(['click'])

function handleClick() {
  emits('click')
}
</script>

<template>
  <el-tooltip content="修改" placement="bottom" effect="light">
    <icon-comp class="icon" icon="uil:edit" @click="handleClick" />
  </el-tooltip>
</template>

<style lang="scss" scoped>
.icon {
  margin: 0 3px;
  cursor: pointer;
  color: var(--color-primary);
  font-size: 20px;
}
</style>
