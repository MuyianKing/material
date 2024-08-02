<script setup>
import { ref } from 'vue'
import { HlButton, HlDialog, HlTable, HlTableColumn } from '@hl/ui'
import { ElButton, ElLink, vLoading } from 'element-plus'
import { taskDing, taskGetDing } from '../../../../server'
import 'element-plus/es/components/loading/style/css'

import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/link/style/css'

import '@hl/ui/src/components/dialog/Index.css'
import '@hl/ui/src/components/table/Index.css'
import '@hl/ui/src/components/table-column/Index.css'
import '@hl/ui/src/components/button/Index.css'

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
const emits = defineEmits(['refresh-one'])

const dialogShow = ref(false)
function handleClick() {
  dialogShow.value = true

  // 初始化全选的数据
  checkAll.value = false
  check.value = []
  excludeChecked.value = []
  getData()
}

// 是否多选
const checkAll = ref(false)
// 选中的数据
const check = ref([])
// 全选后忽略的数据
const excludeChecked = ref([])
// loading
const tableLoading = ref(false)
// 表格数据
const data = ref([])
// 获取接口
async function getData() {
  try {
    const res = await taskGetDing({ task_id: props.taskId })
    data.value = res.data.filter(item => item)
  } catch (e) {
    hl.message.error(e, '获取通知人员失败')
  }
}

const loading = ref(false)
// 发布通知
async function handleConfirm() {
  try {
    loading.value = true
    await taskDing({ task_id: props.taskId, id_card: check.value })
    dialogShow.value = false
    hl.message.success('通知成功')
    emits('refresh-one')
  } catch (e) {
    hl.message.error(e, '通知失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-button v-if="button" v-bind="$attrs" type="warning" @click="handleClick">
    通知
  </el-button>
  <el-link v-else :underline="false" class="m-1 whitespace-nowrap" type="warning" v-bind="$attrs" @click="handleClick">
    <slot>
      通知
    </slot>
  </el-link>

  <hl-dialog v-model="dialogShow" title="通知人员" width="70%" top="30">
    <hl-table v-model:check="check" v-model:check-all="checkAll" v-model:exclude-checked="excludeChecked"
      v-loading="tableLoading" row-key="id_card" :data="data" select>
      <hl-table-column label="姓名" prop="name" />
      <hl-table-column label="手机号" prop="phone" />
      <hl-table-column label="警号" prop="police_id" />
    </hl-table>

    <template #footer>
      <hl-button :loading="loading" @click="handleConfirm">
        确定
      </hl-button>
    </template>
  </hl-dialog>
</template>

<style scoped lang="scss"></style>
