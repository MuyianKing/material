<script setup>
import { task_status_config } from '../../../../../../default/task.center'

const emit = defineEmits(['refresh'])
const query = defineModel({
  type: Object,
  default: () => ({}),
})
const activeIndex = ref(0)
function handleChange(index) {
  if (activeIndex.value === index)
    return

  activeIndex.value = index
  query.value.type = task_status_config.value[index].key
  let time = task_status_config.value[index].query
  if (typeof task_status_config.value[index].query === 'function') {
    time = task_status_config.value[index].query()
  }
  Object.assign(query.value, time)
  emit('refresh')
}

onMounted(() => {
  const time = task_status_config.value[0].query()
  Object.assign(query.value, time)
})
</script>

<template>
  <div class="sta-wrapper">
    <div v-for="(item, index) in task_status_config" :key="item.key" class="sta-item" :class="{ active: activeIndex === index }" @click="handleChange(index)">
      {{ item.label }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sta-wrapper {
  display: flex;

  $height: 25px;

  .sta-item {
    border-radius: calc($height/2);
    line-height: $height;
    height: $height;
    padding: 0 10px;
    border: 1px solid gray;
    margin-right: 10px;
    font-size: 12px;
    font-weight: bold;
    color: gray;
    user-select: none;
  }

  .active {
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    cursor: pointer;
  }

  .sta-item:last-child {
    margin-right: 0;
  }

  .sta-item:hover {
    color: var(--color-primary);
    cursor: pointer;
  }
}
</style>
