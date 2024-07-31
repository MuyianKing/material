<script setup>
import { task_deadline_type } from '../../../../default/form'

const model = defineModel()
const radio_value = ref(24)

watch(radio_value, (val) => {
  if (val) {
    model.value = val
  } else {
    model.value = dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm')
  }
})
</script>

<template>
  <div class="w-full">
    <hl-radio v-model="radio_value" :options="task_deadline_type" />
    <hl-date v-if="radio_value === 0" v-model="model" class="w-full" date-type="datetime" format="YYYY-MM-DD HH:mm" />
  </div>
</template>

<style lang='scss' scoped></style>
