<script setup>
import { onMounted, ref } from 'vue'

import WrapperComp from '../../components/Wrapper.vue'
import { myTaskCount } from '../../../../../server/benches'
import { task_status_config } from '../../../../../default/task.center'
import { getQuery } from '../../../../../hooks/task'
import StaItem from './components/StaItem.vue'

const emits = defineEmits(['search'])

const active_key = ref('')
async function getData() {
  try {
    const { data } = await myTaskCount()
    task_status_config.value.forEach((item) => {
      item.count = data[item.key]
    })
  } catch (error) {
    hl.message.error(error, '获取我的任务数量失败')
  }
}

function handleClick(row) {
  emits('search', getQuery(row.query, active_key.value === row.key))

  if (active_key.value === row.key) {
    active_key.value = ''
  } else {
    active_key.value = row.key
  }
}

onMounted(() => {
  getData()
})
</script>

<template>
  <wrapper-comp title="我的任务">
    <div class="sta-wrapper">
      <sta-item v-for="item in task_status_config" :key="item.key" :config="item" :class="{ 'active-item': active_key === item.key }" @click="handleClick(item)" />
    </div>
  </wrapper-comp>
</template>

<style lang='scss' scoped>
.sta-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.active-item {
  border: 1px solid var(--color-primary) !important;
}
</style>
