<script setup>
import DateComp from './components/Date.vue'
import DateRange from './components/DateRange.vue'

defineProps({
  // date range
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
  <date-comp v-if="type === 'date'" :type="dateType" v-bind="$attrs" />
  <date-range v-else :type="dateType" v-bind="$attrs" />
</template>

<style lang="scss" scoped>
.hl-ui-zw {
  color: red;
}
</style>
