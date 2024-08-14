<script setup>
import { ElButton, ElLink } from 'element-plus'
import RevBtn from '../common/RevBtn.vue'
import { revTurnOverTask } from '../../../../server'

import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/link/style/css'

const props = defineProps({
  taskId: {
    type: String,
    default: '',
  },
  button: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['refresh-one'])

async function submit() {
  try {
    await revTurnOverTask(props.taskId)
    emits('refresh-one')
  } catch (error) {
    hl.message.error(error, '撤销移交申请失败')
  }
}
</script>

<template>
  <rev-btn text="撤销移交申请" @click="submit">
    <el-button v-if="button" v-bind="$attrs" type="warning">
      撤销移交申请
    </el-button>
    <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="warning" v-bind="$attrs">
      <slot>
        撤销移交申请
      </slot>
    </el-link>
  </rev-btn>
</template>

<style scoped lang="scss"></style>
