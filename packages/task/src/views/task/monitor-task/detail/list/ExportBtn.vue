<script setup>
import { exportDetail } from '../../../../../server/infoGroup'

const props = defineProps({
  query: {
    type: Object,
    default: () => ({}),
  },
})

function handleExport() {
  hl.message.loading('正在导出，请稍后...')
  exportDetail(props.query).then((res) => {
    hl.file.download(res.url, res.file_name)
  }).catch((e) => {
    hl.message.error(e, '导出失败')
  }).finally(() => {
    hl.message.closeLoading()
  })
}
</script>

<template>
  <hl-export-button @click="handleExport" />
</template>

<style lang="scss" scoped>

</style>
