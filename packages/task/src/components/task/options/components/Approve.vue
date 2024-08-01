<script setup>
import { ref } from 'vue'
import { HlButton, HlDialog, HlFormItem, HlRadio } from '@hl/ui'
import FormDetail from '../../../../views/form/preview/Template.vue'
import { auditTask, getTaskById } from '../../../../server'

const props = defineProps({
  taskId: {
    type: [String, Number],
    default: '',
  },
  finish: {
    type: Boolean,
    default: false,
  },
  button: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['refresh-one'])

const show_dialog = ref(false)
const task_config = ref(null)

async function handleClick() {
  task_config.value = await getTaskById(props.taskId)
  show_dialog.value = true
}

const form_ref = ref()

async function submit() {
  try {
    hl.message.loading('提交中...')
    const { form } = await form_ref.value.validate()
    await auditTask(props.taskId, form)
    hl.message.success('操作成功')
    emits('refresh-one')
    show_dialog.value = false
  } catch (e) {
    hl.message.error(e, '操作失败')
  } finally {
    hl.message.closeLoading()
  }
}
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" :type="finish ? 'danger' : 'primary'" @click="handleClick">
    <slot />
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" :type="finish ? 'danger' : 'primary'" v-bind="$attrs" @click="handleClick">
    <slot />
  </el-link>

  <hl-dialog v-model="show_dialog" width="900px" :title="`${task_config?.title}(审批)`" top="60px">
    <form-detail ref="form_ref" :config="task_config.cur_node.form_config">
      <template #before="{ form }">
        <hl-form-item label="是否通过：" required prop="pass">
          <hl-radio v-model="form.pass" :options="task_config.a_node_audit" />
        </hl-form-item>
        <hl-form-item label="审批说明：" :max-length="250" :required="form.pass === 0" prop="text">
          <hl-input v-model="form.text" type="textarea" :rows="4" :maxlength="250" />
        </hl-form-item>
      </template>
    </form-detail>

    <template #footer>
      <hl-button @click="submit">
        提交
      </hl-button>
    </template>
  </hl-dialog>
</template>

<style lang='scss' scoped></style>
