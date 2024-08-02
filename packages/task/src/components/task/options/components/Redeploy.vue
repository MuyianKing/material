<script setup>
import { PersonSelectPanel } from '@hl/tyyh'
import { ref } from 'vue'
import { HlFormDialog, HlFormItem } from '@hl/ui'
import { ElButton, ElLink } from 'element-plus'
import { taskRedeploy } from '../../../../server'

import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/link/style/css'

import '@hl/ui/src/components/form-dialog/Index.css'
import '@hl/ui/src/components/form-item/Index.css'

const props = defineProps({
  taskId: {
    type: [String, Number],
    default: '',
  },
  button: {
    type: Boolean,
    default: true,
  },
})
// 转派之后本来的人依然可以看到这条转派数据，不需要刷新
defineEmits(['refresh-one'])

const dialogShow = ref(false)
const form = ref({})

function handleClick() {
  dialogShow.value = true
  form.value = {
    new_id_card: [],
    task_id: props.taskId,
  }
}
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" type="danger" @click="handleClick">
    转派
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="danger" v-bind="$attrs" @click="handleClick">
    <slot>
      转派
    </slot>
  </el-link>

  <hl-form-dialog v-model="dialogShow" :model="form" :title="`转派-${taskId}`" :server="taskRedeploy" width="50%" top="30"
    @refresh="$emit('refresh-one')">
    <hl-form-item label="转派人员">
      <person-select-panel v-model="form.new_id_card" />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style scoped lang="scss"></style>
