<script setup>
import DateComp from './components/Date.vue'
import DateElRange from './components/DateElRange.vue'
import DateRange from './components/DateRange.vue'

defineProps({
  // date range el-range
  type: {
    type: String,
    default: 'date',
  },
  dateType: {
    type: String,
    default: 'date',
  },
})
</script>

<template>
  {{ type }}
  <date-comp v-if="type === 'date'" :type="dateType" v-bind="$attrs" />
  <date-el-range v-if="type === 'el-range'" :type="dateType" v-bind="$attrs" />
  <date-range v-else :type="dateType" v-bind="$attrs" />
</template>
