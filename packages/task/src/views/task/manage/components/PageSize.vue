<script setup>
import { ref, watch } from 'vue'
import { HlSelect } from '@hl/ui'

const props = defineProps({
  to: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
})

const pageSize = defineModel({ type: [String, Number], default: 0 })
const customSize = [
  {
    label: 20,
    value: 20,
  },
  {
    label: 100,
    value: 100,
  },
  {
    label: 200,
    value: 200,
  },
  {
    label: 500,
    value: 500,
  },
  {
    label: 1000,
    value: 1000,
  },
]

let timer = null
const showTep = ref(false)
watch(() => props.show, (val) => {
  timer && clearTimeout(timer)
  if (val) {
    timer = setTimeout(() => {
      showTep.value = true
    }, 1000)
  } else {
    showTep.value = false
  }
})
</script>

<template>
  <teleport v-if="showTep" :to="to">
    <div class="inline-flex ml-4 whitespace-nowrap items-center">
      每页显示
      <hl-select v-model="pageSize"
                 :clearable="false"
                 :options="customSize"
                 allow-create
                 class="mx-1 w-[100px]"
      />
      条
    </div>
  </teleport>
</template>

<style lang="scss" scoped>

</style>
