<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['refresh'])
function refresh() {
  if (!props.loading) {
    emits('refresh')
  }
}
const loadingA = ref(props.loading)
watch(
  () => props.loading,
  (loading) => {
    if (loading) {
      loadingA.value = true
    } else {
      setTimeout(() => {
        loadingA.value = false
      }, 500)
    }
  },
)
</script>

<template>
  <el-button type="warning" @click="refresh">
    <hl-icon icon="bitcoin-icons:refresh-filled" :class="{ 'is-loading': loadingA }" />
    <span class="ml-1">刷新</span>
  </el-button>
</template>

<style scoped lang="scss">
.is-loading {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
