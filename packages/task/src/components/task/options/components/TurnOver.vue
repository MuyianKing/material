<script setup>
import { PersonSelectPanel } from '@hl/tyyh'
import { ref } from 'vue'
import { ElButton, ElLink } from 'element-plus'
import { HlFormDialog, HlFormItem } from '@hl/ui'
import { taskTurnOver } from '../../../../server'

import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/link/style/css'
import '@hl/ui/src/components/form-dialog/Index.css'
import '@hl/ui/src/components/form-item/Index.css'

import '@hl/tyyh/src/components/person-select-panel/Index.css'

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
defineEmits(['refresh'])

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
    移交
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="danger" v-bind="$attrs" @click="handleClick">
    <slot>
      移交
    </slot>
  </el-link>

  <hl-form-dialog v-model="dialogShow" :model="form" :title="`移交-${taskId}`" :server="taskTurnOver" width="50%" top="30"
                  @success="$emit('refresh')"
  >
    <hl-form-item label="移交人员">
      <person-select-panel v-model="form.new_id_card" />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style scoped lang="scss"></style>
