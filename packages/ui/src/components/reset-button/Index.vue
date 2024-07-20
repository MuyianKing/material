<script name="HlResetButton" setup>
import IconComp from '../icon/Index.vue'
import { ElButton, ElPopconfirm } from "element-plus"

defineProps({
  icon: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '重置',
  },
  noConfirm: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['confirm'])

function confirm() {
  emits('confirm')
}
</script>

<template>
  <el-button v-if="noConfirm" v-bind="$attrs" type="warning" @click="confirm">
    <icon-comp icon="ri:refresh-line" class="mr-1" style="font-size: 17px;" />
    {{ text }}
    <slot />
  </el-button>
  <el-popconfirm v-else title="确定要重置所有筛选吗?" @confirm="confirm">
    <template #reference>
      <el-button v-bind="$attrs" type="warning">
        <icon-comp icon="ri:refresh-line" class="mr-1" style="font-size: 17px;" />
        {{ text }}
        <slot />
      </el-button>
    </template>
  </el-popconfirm>
</template>
