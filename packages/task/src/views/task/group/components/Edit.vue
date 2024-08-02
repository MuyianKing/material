<script setup>
import { computed, ref, useAttrs, watch } from 'vue'
import { HlFormDialog, HlFormItem, HlInput, HlQuestionIcon } from '@hl/ui'

import ComplexControlSelect from '../../../../components/person-complex-select/Index.vue'
import TaskGroup from '../../../../model/task/group'
import { saveGroup } from '../../../../server/group'
import '@hl/ui/src/components/form-dialog/Index.css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/input/Index.css'
import '@hl/ui/src/components/question-icon/Index.css'

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

const form = ref(new TaskGroup())

const $attrs = useAttrs()
watch(() => $attrs.modelValue, (val) => {
  if (val) {
    form.value = new TaskGroup(props.data)
  }
})

const title = computed(() => `${form.value.group_id ? '修改' : '创建'}专题`)
</script>

<template>
  <hl-form-dialog :title="title" :model="form" :server="saveGroup">
    <hl-form-item label="专题名称" required>
      <hl-input v-model="form.group_name" />
    </hl-form-item>
    <hl-form-item label="专题描述" required>
      <hl-input v-model="form.remark" :rows="4" type="textarea" />
    </hl-form-item>
    <hl-form-item label="管理权限">
      <complex-control-select v-model="form.glry_qx" class="flex-1-0" />
      <hl-question-icon style="position: absolute;right: -1em;">
        配置谁可以对您创建的任务专题进行修改、删除操作
      </hl-question-icon>
    </hl-form-item>
  </hl-form-dialog>
</template>

<style lang='scss' scoped></style>
