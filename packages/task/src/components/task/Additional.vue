<script setup>
import { getLabelByVal } from '@hl/utils/common'
import { additional_type_list } from '../../default/task'

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
})

// 根据数据生成日志内容
function generateLog(data, result, _persons) {
  console.log(props.list)

  if (!data) {
    return ''
  }

  const opt_name = getLabelByVal(additional_type_list, result)

  switch (data.type) {
    // 呈请延长
    case 'period_applyfor':
      return `
      <span style="color:#5692ff">${_persons?.[data.id_card]?.name ? _persons[data.id_card].name : data.id_card}</span>
      <span style="padding:0 0.5px">${opt_name}</span>
      <span style="color:#ff8e56">呈请延长</span>
      <span>延长至</span>
      <span style="color:#5692ff">${data.new_end_time}</span>
`
    // 移交申请
    case 'yijiao_applyfor':
      return `
      <span style="color:#5692ff">${_persons?.[data.id_card]?.name ? _persons[data.id_card].name : data.id_card}</span>
      <span style="padding:0 0.5px">${opt_name}</span>
      <span style="color:#ff5656">移交申请</span>`
    default:
      break
  }
}
</script>

<template>
  <div v-html="generateLog(list?.[list.length - 1]?.data, list?.[list.length - 1]?.result, list?.[list.length - 1]?._persons)" />
</template>

<style lang='scss' scoped></style>
