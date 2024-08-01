<script setup>
import MyCreate from './my-create/Index.vue'
import MyManage from './my-manage/Index.vue'

const tabsValue = ref(0)

const tabData = [
  {
    label: '我创建的',
    value: 0,
    unreadKey: 'tgreadNotNum',
    component: markRaw(MyCreate),
  },
  {
    label: '我管理的',
    value: 1,
    unreadKey: 'tbreadNotNum',
    component: markRaw(MyManage),
  },
]
</script>

<template>
  <div class="home-admin-container">
    <div class="home-admin-content flex flex-col py-[10px]">
      <el-tabs v-model="tabsValue" class="h-full" type="border-card">
        <el-tab-pane v-for="item in tabData" :key="item.label" :name="item.value" lazy>
          <template #label>
            <div>{{ item.label }}</div>
          </template>
          <component :is="item.component" style="padding: 0" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-admin-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-top: 0;

  .home-admin-content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 10px;
  }
}

:deep(.el-tabs) {
  height: 100%;

  .el-tabs__content {
    height: calc(100% - 40px);
    padding: 4px 0 0;

    .el-tab-pane {
      height: 100%;

      .bottom {
        margin-top: 0;
      }

      .table-body {
        padding: 0;
      }
    }
  }
}
</style>
