<script setup>
import { ref } from 'vue'
import { HlButton, HlDialog } from '@hl/ui'
import { ElCheckbox } from 'element-plus'

import { getOrgList, setOrg } from '../../../../../../server/common.task.page'
import OrgTree from './OrgTree.vue'

import 'element-plus/es/components/checkbox/style/css'

const props = defineProps({
  configUuid: {
    type: String,
    required: true,
  },
})

const show = ref(false)

const selected = ref([])
const allSelect = ref([])

async function getData() {
  try {
    const res = await getOrgList(props.configUuid)
    selected.value = res.selected
    allSelect.value = res.all_org
  } catch (e) {
    hl.message.error(e, '获取可下发单位列表失败')
  }
}

function handleOpen() {
  show.value = true
  getData()
}

const orgTreeRef = ref(null)

// 提交
async function handleSubmit() {
  try {
    await setOrg({
      config_uuid: props.configUuid,
      orgs: selected.value,
    })
    show.value = false
    hl.message.success('保存成功')
  } catch (e) {
    hl.message.error(e, '配置可下发单位失败')
  }
}
</script>

<template>
  <hl-button text="单位管理" @click="handleOpen" />

  <hl-dialog v-model="show" title="配置下发单位" width="40%" top="10px">
    <el-checkbox label="全选/全不选" @change="orgTreeRef?.allSelected">
      全选/全不选
    </el-checkbox>

    <div class="tree">
      <org-tree ref="orgTreeRef" v-model="selected" :all-data="allSelect" />
    </div>

    <template #footer>
      <hl-button @click="handleSubmit">
        提交
      </hl-button>
    </template>
  </hl-dialog>
</template>

<style scoped lang="scss">
.tree {
  border: 1px solid rgb(240, 240, 240);
  border-radius: 5px;
  padding: 10px;
  max-height: calc(100% - 400px);
}
</style>
