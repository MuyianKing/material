<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { HlFormItem, HlSelect } from '@hl/ui'

const _property = defineModel()

const date_format_type = [{
  label: '年-月-日',
  value: 'YYYY-MM-DD',
}, {
  label: '年/月/日',
  value: 'YYYY/MM/DD',
}]

const time_format_type = [{
  label: '时:分:秒',
  value: 'HH:mm:ss',
}, {
  label: '时:分',
  value: 'HH:mm',
}]

const date_format = ref('YYYY-MM-DD')
const time_format = ref('HH:mm:ss')

watch(() => _property.value.date_type, (val) => {
  if (val === 'year') {
    date_format.value = 'YYYY'
    time_format.value = ''
  } else if (val === 'month') {
    date_format.value = 'MM'
    time_format.value = ''
  } else if (val === 'date') {
    date_format.value = 'YYYY-MM-DD'
    time_format.value = ''
  } else if (val === 'datetime') {
    date_format.value = 'YYYY-MM-DD'
    time_format.value = 'HH:mm:ss'
  }
})

watchEffect(() => {
  if (_property.value.date_type === 'datetime') {
    _property.value.date_format = `${date_format.value} ${time_format.value}`.trim()
  } else {
    _property.value.date_format = `${date_format.value}`.trim()
  }
})

// 再次返回时使用上一次离开时保存的时间格式
onMounted(() => {
  if (_property.value.__format) {
    const { date, time } = _property.value.__format
    date_format.value = date
    time_format.value = time
  }
})

// 离开时保存当前组件选择的时间格式
onUnmounted(() => {
  _property.value.__format = {
    date: date_format.value,
    time: time_format.value,
  }
})
</script>

<template>
  <!-- 时间组件设置格式属性:
    年默认YYYY,月默认MM,不需要用户配置
    日期:默认YYYY-MM-DD,可选YYYY年MM月DD日
    日期时间:在日期的基础上加一个配置时间的格式选择:默认HH:mm:ss,可选HH时mm分ss秒|HH:mm|HH时:mm分
  -->
  <template v-if="_property.date_format !== undefined && _property.date_type !== 'month' && _property.date_type !== 'year'">
    <hl-form-item v-if="_property.date_type === 'date' || _property.date_type === 'datetime'" label="日期格式">
      <hl-select v-model="date_format" :options="date_format_type" />
    </hl-form-item>
    <hl-form-item v-if="_property.date_type === 'datetime'" label="时间格式">
      <hl-select v-model="time_format" :options="time_format_type" />
    </hl-form-item>
  </template>
</template>

<style lang='scss' scoped></style>
