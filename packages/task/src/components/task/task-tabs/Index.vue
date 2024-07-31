<script setup>
import { getCommonUnfinish } from '../../../server'

const props = defineProps({
  configUuid: {
    type: String,
    required: true,
  },
})

const tab_list = ref([])
const active_tab = ref('')

const all_count = defineModel({
  type: Number,
  default: 0,
})

async function getTabs() {
  try {
    const data = await getCommonUnfinish(props.configUuid)
    let sum = 0

    if (tab_list.value.length > 0) {
      tab_list.value.forEach((tab) => {
        tab.count = data.find(item => item.list_name === tab.name)?.un_finish
      })
    } else {
      tab_list.value = data.map((item) => {
        sum += item.un_finish || 0
        return {
          name: item.list_name,
          params: item.params,
          count: item.un_finish,
        }
      })
    }

    all_count.value = sum

    if (active_tab.value === '') {
      active_tab.value = data.find(item => item.is_focus === 1)?.list_name
    }
  } catch (e) {
    hl.message.error(e, '获取任务数据出错')
  }
}

onMounted(() => {
  getTabs()
})

defineExpose({
  getTabs,
})
</script>

<template>
  <el-tabs v-model="active_tab">
    <el-tab-pane v-for="(tab, index) in tab_list" :key="index" :name="tab.name" lazy>
      <template #label>
        <el-badge :value="tab.count" :max="99" :show-zero="false">
          {{ tab.name }}
        </el-badge>
      </template>
      <slot :data="tab" />
    </el-tab-pane>
  </el-tabs>
</template>

<style lang='scss' scoped>
.el-tabs {
  margin: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 0 10px;
  background-color: #fff;

  :deep(.el-tabs__content) {
    height: calc(100% - 55px);

    .el-tab-pane {
      height: 100%;
      padding-bottom: 10px;
    }
  }

  :deep(.search-page) {
    padding: 0 !important;

    .table-body {
      padding: 0 5px !important;
    }

    .search-area {
      padding: 0 !important;
    }
  }
}
</style>
