<script setup>
import OverviewList from './overview/Index.vue'
import ScoreList from './score/Index.vue'

const currentTab = ref(1)
</script>

<template>
  <div class="h-full w-full p-[10px] pt-0">
    <div class="w-full h-full p-[10px] rounded-[10px] bg-white">
      <el-tabs v-model="currentTab">
        <el-tab-pane :name="1" label="任务概况">
          <overview-list class="p-0" />
        </el-tab-pane>
        <el-tab-pane :name="2" label="扣分情况" lazy>
          <score-list class="p-0" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs) {
  height: 100%;

  .el-tabs__content {
    height: calc(100% - 55px);
  }

  .el-tab-pane {
    height: 100%;
  }
}
</style>
