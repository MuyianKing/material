<script setup>
import { ElButton, ElTooltip } from 'element-plus'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/tooltip/style/css'
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
  iconSize: {
    type: Number,
    default: 18,
  },
  text: {
    type: String,
    default: '',
  },
  // button-按钮  icon-图标
  buttonType: {
    type: String,
    default: 'button',
  },
  btnType: {
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
  <span v-if="btnType === 'link'" class="add-button mx-1">{{ text }}</span>
  <el-button v-else-if="buttonType === 'button'" :type="type" v-bind="$attrs" @click="handleClick">
    <hl-icon v-if="icon && showIcon" :icon="icon" theme="outline" class="mr-1" />
    {{ text }}
    <slot />
  </el-button>
  <el-tooltip v-else-if="text" :content="text" effect="light" :placement="placement">
    <hl-icon v-bind="$attrs" :icon="icon" :size="iconSize" theme="outline" class="icon" @click="handleClick" />
  </el-tooltip>

  <hl-icon v-else v-bind="$attrs" :icon="icon" :size="iconSize" theme="outline" class="icon" @click="handleClick" />
</template>

<style lang="scss" scoped>
.icon {
  margin: 0 3px;
  cursor: pointer;
}

.el-button {
  padding: 0 15px;
}
</style>
