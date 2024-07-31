<script setup>
const props = defineProps({
  level: {
    type: Array,
    default: () => ([]),
  },
})
defineEmits(['back'])

const orgs = ref([])
watch(() => props.level, (level) => {
  orgs.value = level
}, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(org, index) in orgs" :key="org.value">
      <span class="cursor-pointer" :class="{ active: index === orgs.length - 1 }" @click="$emit('back', org)">{{ org.label }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang='scss' scoped>
.active {
  color: var(--color-primary);
}
</style>
