<script setup>
import { HlAddButton, HlButton, HlDelButton, HlDetailButton, HlExportButton, HlImportButton } from '@ui'
</script>

<template>
  <div class="pl-4 pt-4">
    <div class="flex items-center">
      <!-- 正常按钮 -->
      <hl-button>test</hl-button>

      <!-- 图标按钮 -->
      <!-- 图标按钮 -->
      <hl-button icon="icon-park:user" button-type="icon" :size="30" />
      <hl-button icon="icon-park:user" button-type="icon" :size="30" text="带提示的图标按钮" />

      <!-- 文子按钮 -->
      <hl-button button-type="text">
        test
      </hl-button>
    </div>

    <div class="flex items-center mt-4">
      <!-- 添加按钮 -->
      <hl-add-button />
      <hl-add-button>创建</hl-add-button>
    </div>

    <div class="flex items-center mt-4">
      <!-- 删除按钮 -->
      <hl-del-button />
      <hl-del-button text class="ml-4" />
    </div>

    <div class="flex items-center mt-4">
      <!-- 查看按钮 -->
      <hl-detail-button :size="30" />
      <hl-detail-button text class="ml-4" />
      <hl-detail-button text class="ml-4">
        点击查看
      </hl-detail-button>
    </div>

    <div class="flex items-center mt-4">
      <!-- 导出按钮 -->
      <hl-export-button />
      <hl-export-button text class="ml-4">
        点击导出
      </hl-export-button>
    </div>

    <div class="flex items-center mt-4">
      <!-- 导入按钮 -->
      <hl-import-button />
      <hl-import-button text class="ml-4">
        点击导入
      </hl-import-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>
