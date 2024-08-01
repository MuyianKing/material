<script setup>
import { getLabelByVal } from '@hl/utils/es/common'
import { HlCheckbox, HlDate, HlFormItem, HlRadio } from '@hl/ui'
import CycledatModel from '../../../../../model/task/cycle.day'

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  text: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel({
  type: [Object, CycledatModel],
  default() {
    return {}
  },
})

// 周期
const cycleType = [{
  label: '单次',
  value: 0,
}, {
  label: '日任务',
  value: 1,
}, {
  label: '周任务',
  value: 7,
}, {
  label: '月任务',
  value: 30,
}]

const weekTaskList = [{
  label: '周一',
  value: '1',
}, {
  label: '周二',
  value: '2',
}, {
  label: '周三',
  value: '3',
}, {
  label: '周四',
  value: '4',
}, {
  label: '周五',
  value: '5',
}, {
  label: '周六',
  value: '6',
}, {
  label: '周日',
  value: '7',
}]

// 月任务
const monthTaskList = []
for (let i = 1; i <= 31; i++) {
  monthTaskList.push({
    label: i > 9 ? i : `0${i}`,
    value: i,
  })
}

const pass_holiday = [{ label: '是', value: 1 }, { label: '否', value: 0 }]
</script>

<template>
  <div class="w-full">
    <hl-form-item label="循环周期：" prop="circle_days.cycleType" :required="!text">
      <span v-if="text">{{ getLabelByVal(cycleType, model?.cycleType) || '单次任务' }}</span>
      <hl-radio v-else v-model="model.cycleType" :options="cycleType" :disabled />
    </hl-form-item>
    <template v-if="Object.keys(model).length > 0">
      <hl-form-item label="开启日期：" prop="circle_days.startDate" :required="text">
        <span v-if="text">{{ model.startDate }}</span>
        <hl-date v-else v-model="model.startDate" class="w-full" :disabled />
      </hl-form-item>
      <hl-form-item label="开启时间：" prop="circle_days.startTime" :required="text">
        <span v-if="text">{{ model.startTime }}</span>
        <el-time-picker v-else v-model="model.startTime" class="w-full" format="HH:mm" placeholder="请选择开始时间" value-format="HH:mm:00" :disabled />
      </hl-form-item>
      <hl-form-item v-if="model.cycleType !== 0 " label="跳过节假日：" prop="circle_days.passHoliday" :required="text">
        <span v-if="text">{{ getLabelByVal(pass_holiday, model.passHoliday) }}</span>
        <hl-radio v-else v-model="model.passHoliday" :disabled :options="pass_holiday" />
      </hl-form-item>
      <hl-form-item v-if="model.cycleType === 7 || (model.cycleType !== 0 && !model.cycleType)" label="周任务：" prop="circle_days.startDay" :required="text">
        <template v-if="text">
          <span v-for="item in weekTaskList.filter(item => model.startDay.includes(item.value))" :key="item.value" class="mr-4 mb-4">{{ item.label }}</span>
        </template>
        <hl-checkbox v-else v-model="model.startDay" :options="weekTaskList" :disabled />
      </hl-form-item>
      <hl-form-item v-if="model.cycleType === 30 || (model.cycleType !== 0 && !model.cycleType)" label="月任务：" prop="circle_days.startDay" :required="text">
        <template v-if="text">
          <span v-for="item in monthTaskList.filter(item => model.startDay.includes(item.value))" :key="item.value" class="mr-4 mb-4">{{ item.label }}</span>
        </template>
        <hl-checkbox v-else v-model="model.startDay" :options="monthTaskList" :disabled />
      </hl-form-item>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>
