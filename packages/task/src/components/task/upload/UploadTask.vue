<script setup>
import { HlUpload } from '@hl/ui'
import { uploadCreateTask } from '../../../server/task'
import ConfirmUploadTask from './ConfirmUploadTask.vue'
import StartTask from './StartUploadTask.vue'

const props = defineProps({
  configUuid: {
    type: [String, Number],
    required: true,
  },
  isDialog: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['refresh', 'upload-finish'])

const uploadLoading = ref(false)

// 上传前
function uploadStart() {
  uploadLoading.value = true
}

// 模板中的数据数组
const data = ref({
  data: [],
  count: 0,
  update_id: props.configId,
})
const show = ref(false)

const query = reactive({
  limit: 10,
  page: 1,
})

let fileId = ''

// 文件自动上传完成后
async function uploadFinish(file_id) {
  if (file_id) {
    fileId = file_id
  }
  show.value = true
  query.page = 1

  getData()
}

async function getData() {
  try {
    data.value = {
      data: [],
      count: 0,
    }
    const res = await uploadCreateTask({
      ...query,
      update_id: fileId,
      config_uuid: props.configUuid,
    })
    res.data.data = res.data.data.map((_, index) => ({
      ..._,
      序号: (query.page - 1) * query.limit + index + 1,
    }))
    res.data.header.unshift('序号')

    data.value = {
      data: res.data.data,
      header: res.data.header,
      update_id: fileId,
      count: res.count,
    }

    if (!props.isDialog) {
      refresh()
    }
  } catch (e) {
    hl.message.error(e, '上传创建任务失败')
  } finally {
    uploadLoading.value = false
  }
}

const start_config = reactive({
  group_id: '',
  show: false,
})

function handleConfirmed(group_id) {
  show.value = false
  start_config.group_id = group_id
  start_config.show = true
}

function refresh() {
  start_config.show = false
  emits('refresh')
}
</script>

<template>
  <hl-upload :preview="false" multiple type="file" @upload-start="uploadStart" @upload-finish="uploadFinish">
    <div v-if="$slots.default" class="flex items-center">
      <slot :loading="uploadLoading" />
    </div>
    <hl-export-button v-else :loading="uploadLoading" icon text="导入" />
  </hl-upload>

  <template v-if="isDialog">
    <confirm-upload-task v-model="show" v-model:query="query" :data="data" :loading="uploadLoading" @confirmed="handleConfirmed" @change-page="getData" />
    <start-task v-if="start_config.show" v-model="start_config.show" :group-id="start_config.group_id" @submit="refresh" />
  </template>
</template>

<style lang="scss" scoped>
.icon {
  transform: rotateX(180deg);
}
</style>
