<script setup>
import { ref, watch } from 'vue'
import { ElButton, ElLink } from 'element-plus'
import { HlFormDialog, HlFormItem, HlInput, HlUpload } from '@hl/ui'
import { addWorkAskFor } from '../../../../server'
import WorkAskFor from '../../../../model/task/workAskFor'
import TextComposing from '../common/TextComposing.vue'

import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/link/style/css'

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

const form = ref(new WorkAskFor())
watch(show_detail, (val) => {
  if (val) {
    form.value = new WorkAskFor(props.taskId)
  }
})
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" type="warning" @click="handleClick">
    工作要求
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="warning" v-bind="$attrs" @click="handleClick">
    <slot>
      工作要求
    </slot>
  </el-link>

  <hl-form-dialog v-model="show_detail" title="工作要求" :model="form" :server="addWorkAskFor"
                  @refresh="$emit('refresh-one')"
  >
    <hl-form-item label="工作要求" required prop="pizhu[remark]">
      <hl-input v-model="form.pizhu.remark" type="textarea" :rows="4" />
    </hl-form-item>
    <hl-form-item prop="pizhu[file_ids]">
      <template #label>
        <text-composing text="附件" />
      </template>
      <hl-upload v-model="form.pizhu.file_ids" type="file" multiple />
    </hl-form-item>
    <hl-form-item prop="pizhu[img_ids]">
      <template #label>
        <text-composing text="图片" />
      </template>
      <hl-upload v-model="form.pizhu.img_ids" multiple />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style lang='scss' scoped></style>
