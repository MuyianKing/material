<script setup>
import { is_has_pass } from '../../../../../../default/index'
import { isBenchesJK, setBenchesJK } from '../../../../../../server/benches'

const emits = defineEmits(['search'])
const monitor = defineModel()

function handleChange(state) {
  monitor.value = state
  setContain()
  emits('search')
}

const status = ref(monitor.value)
async function getData() {
  try {
    const res = await isBenchesJK()
    status.value = res.data.contain_jkry
  } catch (error) {
    hl.message.error(error, '获取失败')
  }
}

async function setContain() {
  try {
    await setBenchesJK({ contain_jkry: status.value })
  } catch (error) {
    hl.message.error(error, '设置失败')
  }
}

onMounted(() => {
  getData()
})
</script>

<template>
  <hl-form-item label="包含监控任务" label-width="fit" style="width: 245px;">
    <hl-radio v-model="status" :options="is_has_pass" @change="handleChange" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
