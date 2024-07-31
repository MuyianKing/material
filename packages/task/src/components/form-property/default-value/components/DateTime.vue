<script setup>
const props = defineProps({
  property: {
    type: Object,
    default: null,
  },
})

const options = [{
  label: '当前时间 — 填写表单的时间',
  value: 'cur_time',
}]

const model = defineModel()

const format_date = computed(() => {
  switch (model.value) {
    case 'cur_time':
      return dayjs().format(props.property?.date_format || 'YYYY-MM-DD')
    default:
      return ''
  }
})
</script>

<template>
  <div class="w-full">
    <hl-select v-model="model" :options="options" />
    <div class="default-wrapper mt-2">
      {{ format_date }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
@import './common.scss';
</style>
