<script setup>
import { ref, useAttrs, watch } from 'vue'
import { HlAddButton, HlDelButton, HlDialog } from '@hl/ui'
import { ElAlert } from 'element-plus'

import { cloneDeep } from 'lodash-es'
import { getList } from '@hl/tyyh/src/server/person'
import { taskDeploy } from '../../../../../server/task'
import AddPerson from './AddPerson.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['refresh'])

const persons = ref([])

let change = false

function handleDelete(item) {
  if (!props.data.process_id || !props.data.task_id) {
    return hl.message.warning('任务信息不完整，请检查后再删除')
  }
  hl.message.loading('正在删除')
  taskDeploy({
    deploy: 4,
    task_ids: [props.data.task_id],
    process_id: props.data.process_id,
    old_id_card: item.id_card,
  }).then(() => {
    change = true
    hl.message.success('删除成功')

    persons.value = persons.value.filter(i => i.id_card !== item.id_card)
  }).catch((e) => {
    hl.message.error(e, '删除失败')
  }).finally(() => {
    hl.message.closeLoading()
  })
}

const loading = ref(true)

async function handleAddSuccess(idCards) {
  loading.value = true
  change = true
  getList({ id_card: idCards }).then((res) => {
    res = res.data || []
    res = res[0] || {}
    if (res.id_card) {
      persons.value = persons.value.concat(res)
    } else {
      hl.message.warning('获取新加人员信息失败,请刷新页面重试')
    }
  }).catch((err) => {
    hl.message.error(err, '获取新加人员信息失败,请刷新页面重试')
  }).finally(() => {
    loading.value = false
  })
}

const addPersonShow = ref(false)

function handleAdd() {
  addPersonShow.value = true
}

function handleClose() {
  if (change) {
    emits('refresh')
  }
}

const attrs = useAttrs()
watch(() => attrs.modelValue, (val) => {
  if (!val) {
    return
  }
  change = false
  persons.value = cloneDeep(props.data.person)
})
</script>

<template>
  <hl-dialog :title="data.dialog_title" width="600" @close="handleClose">
    <div v-loading class="min-h-[100px]">
      <el-alert title="下方列出来的是当前节点的所有处置人，您可以删除他们，也可以添加新的处置人" type="warning" :closable="false" class="mb-4" center />
      <div v-for="item in persons" :key="item.id" class="person-item">
        <div class="flex-1 min-w-0">
          <div>{{ item.name }}</div>
          <div>{{ item.organization.map(i => i.organization_nick).join('、') }}</div>
        </div>
        <hl-del-button v-if="persons.length > 1" icon @click="handleDelete(item)" />
      </div>
      <div v-if="persons.length === 0" class="text-center leading-[100px] text-gray-400">
        暂无人员，请添加
      </div>
    </div>

    <template #footer>
      <hl-add-button @click="handleAdd" />
    </template>

    <add-person v-model="addPersonShow" :process-id="data.process_id" :task-id="data.task_id"
      @success="handleAddSuccess" />
  </hl-dialog>
</template>

<style lang="scss" scoped>
.person-item {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
</style>
