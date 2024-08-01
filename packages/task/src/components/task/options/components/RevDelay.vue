<script setup>
import { ElButton, ElLink } from 'element-plus'
import RevBtn from '../common/RevBtn.vue'
import { revDelayTask } from '../../../../server'

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
    await revDelayTask(props.taskId)
    emits('refresh-one')
  } catch (error) {
    hl.message.error(error, '撤销延时申请失败')
  }
}
</script>

<template>
  <rev-btn text="撤销呈请延长" @click="submit">
    <el-button v-if="button" v-bind="$attrs" type="warning">
      撤销呈请延长
    </el-button>
    <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="warning" v-bind="$attrs">
      <slot>
        撤销呈请延长
      </slot>
    </el-link>
  </rev-btn>
</template>

<style scoped lang="scss"></style>
