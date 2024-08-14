<script setup>
import { ElButton, ElLink, ElTooltip } from 'element-plus'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/tooltip/style/css'
import 'element-plus/es/components/link/style/css'
import HlIcon from '../icon/Index.vue'

defineOptions({
  name: 'HlButton',
})

defineProps({
  icon: {
    type: String,
    default: '',
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    default: 18,
  },
  text: {
    type: String,
    default: '',
  },
  // button-按钮  icon-图标  text-文本
  buttonType: {
    type: String,
    default: 'button',
  },
  placement: {
    type: String,
    default: 'top',
  },
  type: {
    type: String,
    default: 'primary',
  },
})

const emits = defineEmits(['click'])
function handleClick() {
  emits('click')
}
</script>

<template>
  <!-- 纯文本 -->
  <el-link v-if="buttonType === 'text'" class="hl-button" :type v-bind="$attrs" @click="handleClick">
    <slot>
      {{ text }}
    </slot>
  </el-link>

  <!-- 按钮 -->
  <el-button v-else-if="buttonType === 'button'" class="hl-button" :type v-bind="$attrs" @click="handleClick">
    <hl-icon v-if="icon && showIcon" :icon theme="outline" class="mr-1" />
    {{ text }}
    <slot />
  </el-button>

  <!-- 图标带提示 -->
  <el-tooltip v-else-if="text" :content="text" effect="light" :placement="placement">
    <hl-icon v-bind="$attrs" :icon :size theme="outline" class="hl-button cursor-pointer" @click="handleClick" />
  </el-tooltip>

  <!-- 图标无提示 -->
  <hl-icon v-else v-bind="$attrs" :icon :size theme="outline" class="hl-button cursor-pointer" @click="handleClick" />
</template>

<style lang="scss" scoped>
.hl-ui.zw {
  color: red;
}
</style>
