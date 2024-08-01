<script setup>
import { ref } from 'vue'
import AuditList from './components/AuditList.vue'

defineProps({
  taskId: {
    type: [String, Number],
    default: '',
  },
  button: {
    type: Boolean,
    default: true,
  },
})
const isShow = ref(false)
</script>

<template>
  <el-button v-if="button" type="warning" v-bind="$attrs" @click="isShow = true">
    审批反馈
  </el-button>
  <el-link v-else :underline="false" class="mx-1 whitespace-nowrap" type="warning" v-bind="$attrs" @click="isShow = true">
    审批反馈
  </el-link>

  <audit-list v-model="isShow" :task-id="taskId" />
</template>

<style scoped lang="scss">

</style>
