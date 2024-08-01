<script setup>
import { ref } from 'vue'
import PropertyConfig from './components/Property.vue'
import FormConfig from './components/FormConfig.vue'

const cur_tab = ref('property')
</script>

<template>
  <div class="property-config-wrapper">
    <el-tabs v-model="cur_tab" stretch>
      <!-- 属性配置 -->
      <el-tab-pane label="标签属性" name="property">
        <property-config />
      </el-tab-pane>

      <!-- 表单配置 -->
      <el-tab-pane label="表单属性" name="form">
        <form-config />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.property-config-wrapper {
  height: 100%;
}

:deep(.el-tabs) {
  height: 100%;

  .el-tabs__content {
    height: calc(100% - 55px);
    padding: 0 10px 10px;
    overflow: auto;
  }
}
</style>
