<script setup>
import { HlPage } from '@hl/ui'
import { confirmUploadCreateTask } from '../../../server/task'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  tableLoading: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['confirmed', 'change-page'])

const query = defineModel('query', {
  type: Object,
  required: true,
})

const check = ref([])
const excludeChecked = ref([])
const checkAll = ref(false)

const loading = ref(false)
async function handleConfirm() {
  try {
    loading.value = true
    const group_id = await confirmUploadCreateTask({
      select_all: Number(checkAll.value),
      ids: checkAll.value ? excludeChecked.value : check.value,
      update_id: props.data.update_id,
    })
    hl.message.success('上传成功')
    emits('confirmed', group_id)
  } catch (e) {
    hl.message.error(e, '上传任务失败')
  } finally {
    loading.value = false
  }
}

const attrs = useAttrs()
watch(() => attrs.modelValue, (value) => {
  if (value) {
    checkAll.value = false
  }
})
</script>

<template>
  <hl-dialog title="确认上传创建任务" width="70%" top="30">
    <hl-table v-model:check="check" v-model:check-all="checkAll" v-model:exclude-checked="excludeChecked" v-loading="tableLoading" :data="data.data" select row-key="_id">
      <hl-table-column v-for="key in data.header" :key="key" :label="key">
        <template #default="{ row }">
          {{ row[key] }}
        </template>
      </hl-table-column>
    </hl-table>

    <hl-page v-model="query.page" :size="query.limit" :count="data.count" @change="$emit('change-page')" />
    <template #footer>
      <hl-button :loading="loading" @click="handleConfirm">
        确定
      </hl-button>
    </template>
  </hl-dialog>
</template>

<style scoped lang="scss"></style>
