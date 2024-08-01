<script setup>
import { HlAddButton, HlBlockTitle, HlButton, HlDelButton, HlDetailButton, HlEditButton, HlExportButton, HlImportButton, HlResetButton, HlSearchButton } from '@hl/ui'
</script>

<template>
  <div class="pl-6 pt-4">
    <hl-block-title>普通按钮</hl-block-title>
    <div class="pl-4">
      <hl-button>默认按钮</hl-button>
      <hl-button type="success">
        成功按钮
      </hl-button>
      <hl-button>失败按钮</hl-button>
      <hl-button>警告按钮</hl-button>
    </div>

    <hl-block-title>内置按钮</hl-block-title>
    <div class="pl-4">
      <hl-add-button />
      <hl-search-button />
      <hl-reset-button />
      <hl-import-button />
      <hl-export-button />
    </div>

    <div class="pl-4 mt-4">
      <hl-edit-button />
      <hl-detail-button />
      <hl-del-button />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.hl-block-title {
  margin: 10px 0;
}
</style>
