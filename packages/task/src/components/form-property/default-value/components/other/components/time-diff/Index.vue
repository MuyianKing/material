<script setup>
import FixedComp from '../../../FixedComp.vue'
import TimerSelect from './components/TimerSelect.vue'
import UnitComp from './components/Unit.vue'

const model = defineModel()
</script>

<template>
  <div class="w-full">
    <timer-select v-model="model.large" placeholder="请选择较大的日期" />
    <timer-select v-model="model.small" placeholder="请选择较小的日期" class="mt-2" />
    <unit-comp v-model="model.unit" placeholder="请选择单位" class="mt-2" />
    <fixed-comp v-model="model.tofix" />
  </div>
</template>

<style lang='scss' scoped></style>
