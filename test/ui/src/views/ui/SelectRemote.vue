<script setup>
import HlSelectRemopte from '@hl/ui/src/components/select-remote'
import { guid } from '@hl/utils'
import { ref } from 'vue'

async function getData(query) {
  if (query.id !== undefined) {
    return {
      count: 1,
      data: (Array.isArray(query.id) ? query.id : [query.id]).map((value) => {
        return {
          value,
          label: `init_${value}`,
        }
      }),
    }
  }

  if (query.query !== undefined && query.query !== '') {
    return {
      count: 1,
      data: [{
        label: query.query,
        value: guid(),
      }],
    }
  }

  const data = []
  for (let i = 0; i < 20; i++) {
    data.push({
      label: `label${i}`,
      value: i,
    })
  }

  return {
    count: 20,
    data,
  }
}

const test = ref(0)

const test2 = ref([1, 2])

const data_config = {
  label_key: 'label',
  value_key: 'value',
}
</script>

<template>
  <div>
    <hl-select-remopte v-model="test" :server="getData" :data-config="data_config" />

    <hl-select-remopte v-model="test2" :server="getData" multiple :data-config="data_config" />
  </div>
</template>
