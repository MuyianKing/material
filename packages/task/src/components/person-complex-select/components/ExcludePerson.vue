<script setup>
defineProps({
  list: {
    type: Array,
    default: () => ([]),
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
})

const emits = defineEmits(['close'])
function close(user) {
  emits('close', user)
}
</script>

<template>
  <div>
    <span v-if="list.length === 0" class="placeholder-item">{{ placeholder }}</span>
    <el-tag v-for="tag in list" :key="tag.name" closable type="primary" class="mx-1" @close="close(tag)">
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<style scoped lang="scss">
.placeholder-item {
  color: var(--color-info);
}
</style>
