<script setup>
import useBus from '@utils/bus'
import { getJzzlCount } from '../../../../../server/instruct'
import { taskStatus } from '../../../../../default/instruct'

const props = defineProps({
  listType: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['handle-change'])

const currentTab = defineModel()

const tabData = ref(taskStatus)

function handleTabChange(tab) {
  const tabs = tabData.value.filter(item => item.value === tab)
  emits('handle-change', tabs[0])
}

const tabCount = ref({})

async function getCount() {
  const data = await getJzzlCount({
    list_type: props.listType,
  })
  tabCount.value = data.data
}

onMounted(() => {
  getCount()
})

const { addBus } = useBus()
addBus('refreshTableRow', () => {
  // 监听用户操作改变之后刷新数量
  getCount()
})
</script>

<template>
  <div class="tabs">
    <el-tabs v-model="currentTab" @tab-change="handleTabChange">
      <el-tab-pane v-for="item in tabData" :key="item.label" :name="item.value">
        <template #label>
          <el-badge :show-zero="false" :value="tabCount[item.unreadKey]" class="item">
            <div>{{ item.label }}</div>
          </el-badge>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
</style>
