<script setup>
import { HlDate, HlResetButton } from '@hl/ui'
import { reactive, ref } from 'vue'

const date_obj = reactive({
  start: '2024-10-01',
  end: '2024-12-12',
})

const value = ref('')

function handleClick() {
  date_obj.start = ''
}
</script>

<template>
  <div class="p-4">
    <hl-reset-button class="mb-4" no-confirm @click="handleClick" />

    <div>
      v-model：{{ value }}
    </div>
    <div>
      v-model:start：{{ date_obj.start }}
    </div>
    <div>
      v-model:end：{{ date_obj.end }}
    </div>
    <div>
      <hl-date v-model="value" v-model:start="date_obj.start" v-model:end="date_obj.end" end-value-format="YYYY-MM-DD 23:59:59" type="el-range" date-type="datetime" />
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
