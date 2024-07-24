<script setup>
import { getList } from '../../server/job'

const props = defineProps({
  modelValue: {
    type: [Array, String, Number],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])

const data_list = ref([])
function getData() {
  getList().then((data) => {
    data_list.value = data.data[0]?.sub_job || []
    appendSelfToChildren(data_list.value)
  }).catch((e) => {
    hl.message.error(e, '获取职务出错')
  })
}

function appendSelfToChildren(data) {
  data.forEach((item) => {
    if (item.sub_job && item.sub_job.length > 0) {
      appendSelfToChildren(item.sub_job)
      item.sub_job.unshift({
        job_id: item.job_id,
        job_name: item.job_name,
      })
    }
  })
}

function handleChange(val) {
  emits('update:modelValue', val)
}

const _props = computed(() => ({
  value: 'job_id',
  label: 'job_name',
  children: 'sub_job',
  multiple: props.multiple,
  emitPath: false,
}))

onMounted(() => {
  getData()
})
</script>

<template>
  <el-cascader :model-value="modelValue" :options="data_list" :props="_props" @change="handleChange" />
</template>

<style lang="scss" scoped></style>
