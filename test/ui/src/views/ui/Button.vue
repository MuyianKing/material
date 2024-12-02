<script setup>
import TestCompWrapper from '@comp/test-comp-wrapper/Index.vue'
import { HlAddButton, HlButton, HlDelButton, HlDetailButton, HlExportButton, HlImportButton } from '@hl/ui'
</script>

<template>
  <div class="pl-4 pt-4">
    <test-comp-wrapper title="正常按钮">
      <div class="flex items-center">
        <!-- 正常按钮 -->
        <hl-button type="danger">
          提交
        </hl-button>

        <hl-button type="primary" plain>
          提交
        </hl-button>

        <hl-button type="warning" loading>
          提交
        </hl-button>
      </div>
    </test-comp-wrapper>

    <div class="flex items-center mt-4">
      <!-- 添加按钮 -->
      <hl-add-button />
      <hl-add-button>创建</hl-add-button>
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

    <div class="flex items-center mt-4">
      <!-- 删除按钮 -->
      <hl-del-button />
      <hl-del-button text class="ml-4" />
      <hl-del-button text="自定义文字" class="ml-4" />
    </div>

    <div class="flex items-center mt-4">
      <!-- 删除按钮 -->
      <hl-detail-button />
      <hl-detail-button text class="ml-4" />
      <hl-detail-button text="自定义文字" class="ml-4" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>
