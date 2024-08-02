<script setup>
import { computed, onMounted, ref } from 'vue'
import { HlFormItem } from '@hl/ui'
import { ElInput, ElOption, ElSelect, ElTooltip } from 'element-plus'
import { taskModelList } from '../../../server/task'
import 'element-plus/es/components/tooltip/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import '@hl/ui/src/components/form-item/Index.css'

const props = defineProps({
  type: {
    type: String,
    default: 'linqi',
  },
})

const value = defineModel()
function habndleChange() {
  value.value.near_value = ''
}

// 根据原则的值改变css的值
const inputDisplay = computed(() => value.value.near_unit === 4 ? 'none' : 'block')

// 获取selected数据
const options = ref([])
async function getData() {
  try {
    const res = await taskModelList({ type: props.type })
    options.value = res.data
  } catch (error) {
    hl.message.error(error, '获取通知模型列表失败')
  }
}

onMounted(() => {
  getData()
})
</script>

<template>
  <hl-form-item v-if="value.near_type !== 0 && value.near_type.length > 0" label="计算方式">
    <el-input v-model="value.near_value" class="flex-1" :disabled="value.near_unit === 4">
      <template v-if="value.near_unit === 4" #prepend>
        <el-select v-model="value.near_value" placeholder="请选择通知模型" style="width: 192px;background-color:#fff;">
          <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.name" />
        </el-select>
      </template>
      <template #append>
        <el-select v-model="value.near_unit" placeholder="请选择计算方式" style="width: 75px;" @change="habndleChange">
          <el-option label="小时" :value="1" />
          <el-option label="天" :value="2" />
          <el-option label="%" :value="3" />
          <el-option label="通知模型" :value="4" />
        </el-select>
      </template>
    </el-input>

    <el-tooltip effect="dark" placement="top-start">
      <template #content>
        <div>24小时：距离任务还有24小时时发送通知</div>
        <div>24%：当任务距离结束还剩下24%的时间时发送通知</div>
      </template>
      <hl-icon icon="mingcute:question-fill" class="text-gray-600 ml-2 cursor-pointer" />
    </el-tooltip>
  </hl-form-item>
</template>

<style lang='scss' scoped>
:deep(.el-input__wrapper) {
  display: v-bind(inputDisplay);
}
</style>
