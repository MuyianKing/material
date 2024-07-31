<script setup>
import { guid } from '@hl/utils/common'
import TreeSelect from '../../../../../../components/task/TreeSelect.vue'
import { setSubscriptionTask } from '../../../../../../server/benches'

const props = defineProps({
  taskData: {
    type: Array,
    required: true,
  },
})
const emits = defineEmits(['refresh'])

const show = ref(false)
const form = ref({
  config_uuids: [],
  uuid: guid(8),
})

function handleChange(data) {
  if (data.length === 1) {
    form.value.title = data[0].label
  } else {
    form.value.title = ''
  }
}

async function handleSubmit() {
  try {
    const data = [...props.taskData, form.value]
    await setSubscriptionTask({ data })
    show.value = false
    hl.message.success('保存成功')
    emits('refresh')
  } catch (e) {
    hl.message.error(e, '配置关注列表失败')
  }
}
</script>

<template>
  <div>
    <div class="flex items-center subscription" @click="show = true">
      <hl-icon icon="material-symbols:subscriptions-outline" size="14" />
      订阅
    </div>

    <hl-form-dialog v-model="show" :model="form" title="订阅关注任务" width="500px" top="50px" label-width="120" @submit="handleSubmit">
      <div class="px-5">
        <hl-form-item label="关注任务" prop="config_uuids" required>
          <tree-select v-model="form.config_uuids" multiple @change="handleChange" />
        </hl-form-item>
        <hl-form-item label="任务标题" prop="title" required>
          <hl-input v-model="form.title" />
        </hl-form-item>
        <hl-form-item label="任务开始时间" prop="start_time" required>
          <hl-date v-model="form.start_time" type="date" style="width: 100%;" />
        </hl-form-item>
      </div>
    </hl-form-dialog>
  </div>
</template>

<style scoped lang="scss">
.subscription {
  color: #0c88e8;
  cursor: pointer;
  font-size: 13px;
}
</style>
