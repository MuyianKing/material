<script setup>
import { HlIcon } from '@hl/ui'
import { ref } from 'vue'
import { ElButton, ElPopover } from 'element-plus'

import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/button/style/css'

defineProps({
  icon: {
    type: String,
    default: 'flowbite:star-solid',
  },
  color: {
    type: String,
    default: '#ffd253',
  },
  message: {
    type: String,
    default: '您确定确认取消关注？',
  },
  placement: {
    type: String,
    default: 'right',
  },
})
const emits = defineEmits(['click'])

const visible = ref(false)

function submit() {
  visible.value = false
  emits('click')
}
</script>

<template>
  <el-popover :placement="placement" :visible="visible">
    <div>
      <p>{{ message }}</p>
      <div class="text-center mt-2">
        <el-button size="small" type="danger" @click="visible = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="submit">
          确定
        </el-button>
      </div>
    </div>
    <template #reference>
      <hl-icon :icon="icon" :color="color" @click="visible = true" />
    </template>
  </el-popover>
</template>

<style scoped lang="scss"></style>
