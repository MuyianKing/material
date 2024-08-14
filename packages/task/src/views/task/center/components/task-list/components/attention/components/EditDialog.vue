<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { HlFormDialog, HlFormItem, HlInput } from '@hl/ui'

import { cloneDeep } from 'lodash-es'
import { setTaskList } from '../../../../../../../../server/benches'
import TaskGroup from '../../../../../../../../model/benches/task.group'
import useBenchesStore from '../../../../../../../../pinia/modules/useBenchesStore'
import TreeSelect from '../../../../../../../../components/task/TreeSelect.vue'
import '@hl/ui/src/components/form-dialog/Index.css'
import '@hl/ui/src/components/form-item/Index.css'
import '@hl/ui/src/components/input/Index.css'

const emits = defineEmits(['refresh'])

const { attention_config } = storeToRefs(useBenchesStore())

async function submit() {
  try {
    hl.message.loading('正在保存...')
    const { all_config_list, active_index, curren_list, edit_type } = attention_config.value
    // 编辑
    if (edit_type === 'edit') {
      curren_list[active_index] = {
        ...curren_list[active_index],
        ...form.value,
      }
    } else {
      if (!curren_list[active_index].subs) {
        curren_list[active_index].subs = []
      }
      curren_list[active_index].subs.push(form.value)
    }

    await setTaskList(cloneDeep(all_config_list))

    hl.message.success('保存成功')
    attention_config.value.show = false
  } catch (e) {
    hl.message.error(e, '保存失败')
    emits('refresh')
  } finally {
    hl.message.closeLoading()
  }
}

const form = ref(new TaskGroup())
watch(() => attention_config.value.show, (val) => {
  if (val) {
    const { active_index, curren_list, edit_type } = attention_config.value
    if (edit_type === 'edit') {
      form.value = new TaskGroup(curren_list[active_index] || null)
    } else {
      form.value = new TaskGroup()
    }
  }
})
</script>

<template>
  <hl-form-dialog v-model="attention_config.show" :model="form" title="添加任务组" label-width="100px" @submit="submit">
    <hl-form-item label="任务组名称" prop="title" required>
      <hl-input v-model="form.title" />
    </hl-form-item>
    <hl-form-item v-if="form.subs?.length === 0" label="任务模板">
      <tree-select v-model="form.config_uuids" multiple />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style lang='scss' scoped></style>
