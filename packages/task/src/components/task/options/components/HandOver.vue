<script setup>
import { PersonSelectPanel } from '@hl/tyyh'
import { moveTask } from '../../../../server'
import MoveModel from '../../../../model/task/move'

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
defineEmits(['refresh-one'])

const show_detail = ref(false)
function handleClick() {
  show_detail.value = true
}

const form = ref(new MoveModel())
watch(show_detail, (val) => {
  if (val) {
    form.value = new MoveModel(props.taskId)
  }
})
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" type="danger" @click="handleClick">
    移交申请
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="danger" v-bind="$attrs" @click="handleClick">
    <slot>
      移交申请
    </slot>
  </el-link>

  <hl-form-dialog v-model="show_detail" title="审核移交" :model="form" :server="moveTask" @refresh="$emit('refresh-one')">
    <hl-form-item label="移交给" required prop="id_card">
      <person-select-panel v-model="form.id_card" :multiple="false" />
    </hl-form-item>
    <hl-form-item label="移交理由" required prop="remark">
      <hl-input v-model="form.remark" type="textarea" :rows="4" />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style lang='scss' scoped></style>
