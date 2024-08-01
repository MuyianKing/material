<script setup>
import { provide, ref } from 'vue'
import { HlDialog } from '@hl/ui'
import FormDetail from '../../../../../../views/form/preview/Template.vue'
import ResultAudit from '../../../../../../views/task/detail/components/task-result/components/ResultAudit.vue'
import useDetailData from '../../../useDetailData'
import Audit from './Audit.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  taskId: {
    type: [String, Number],
    default: '',
  },
})
const show = ref(false)
function handleClick() {
  show.value = true

  getIds()
}

const outer_comp_ids = ref()
async function getIds() {
  try {
    const res = useDetailData(props.taskId)
    await res.getData()
    outer_comp_ids.value = res.outer_comp_ids.value
  } catch (e) {
    hl.message.error(e, '获取ids错误')
  }
}

provide('outer_comp_ids', outer_comp_ids)
</script>

<template>
  <el-link type="success" text="详情" @click="handleClick" />

  <hl-dialog v-model="show" title="详情" top="60px">
    <div class="w-full px-10">
      <form-detail :form-data="data?.content || {}" :config="data.a_node_form" mode="text">
        <template #before="{ form }">
          <result-audit v-if="form.pass !== undefined" :data="form" />
        </template>
      </form-detail>
    </div>

    <template #footer>
      <audit type="button" :data="data" />
    </template>
  </hl-dialog>
</template>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  width: fit-content !important;
}
</style>
