<script setup>
import { mix } from '@hl/utils/color'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const userStore = hl.getUserInfo()

const _status_list = computed(() => {
  return props.data?.map((item) => {
    return {
      html: item.html,
      name: item.name,
      is_self: item.name[0] === userStore.name,
      style: {
        color: item.color,
        backgroundColor: mix(item.color, '#ffffff', 0.8),
      },
    }
  }) || []
})
</script>

<template>
  <div v-if="data">
    <div v-for="(item, index) in _status_list" :key="index">
      <template v-if="!item.is_self">
        <span v-for="user in item.name" :key="user" class="m-1 text-blue-400">
          {{ user }}
        </span>
      </template>
      <span :style="item.style" class="info-item">
        {{ item.html }}
      </span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.info-item {
  white-space: nowrap;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
}
</style>
