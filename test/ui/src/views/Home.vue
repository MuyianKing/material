<script setup>
const list = [{
  label: '按钮',
  route: '/button',
}, {
  label: '选择',
  route: '/select',
}, {
  label: '时间日期',
  route: '/date',
}, {
  label: '其他',
  route: '/others',
}]
</script>

<template>
  <div class="pl-4">
    <div v-for="(item, index) in list" :key="index">
      <el-link :href="`#${item.route}`">
        {{ item.label }}
      </el-link>
    </div>
  </div>
</template>

<style scoped></style>
