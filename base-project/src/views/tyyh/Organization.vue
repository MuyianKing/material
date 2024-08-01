<script setup>
import { Organization } from '@hl/tyyh'
import TestCompWrapper from '@comp/test-comp-wrapper/Index.vue'
import { HlBlockTitle } from '@hl/ui'
</script>

<template>
  <div class="p-4 overflow-y-auto h-full">
    <test-comp-wrapper title="单位选择">
      <div class="flex mt-2">
        <div class="flex-1">
          <hl-block-title type="success">
            单选
          </hl-block-title>
          <organization class="mt-2 w-full" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">
            多选
          </hl-block-title>
          <organization multiple class="mt-2 w-full" />
        </div>
      </div>
    </test-comp-wrapper>

    <test-comp-wrapper title="单位下拉选择">
      <div class="flex mt-2">
        <div class="flex-1">
          <hl-block-title type="success">
            单选
          </hl-block-title>
          <organization comp="dropdown" class="mt-2 w-full" label="单位" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">
            多选
          </hl-block-title>
          <organization comp="dropdown" multiple class="mt-2 w-full" label="单位" />
        </div>
      </div>
    </test-comp-wrapper>

    <test-comp-wrapper title="单位树形选择">
      <div class="flex mt-2">
        <div class="flex-1">
          <hl-block-title type="success">
            单选
          </hl-block-title>
          <organization comp="tree" class="mt-2 w-full" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">
            多选
          </hl-block-title>
          <organization comp="tree" multiple class="mt-2 w-full" />
        </div>
      </div>
    </test-comp-wrapper>

    <test-comp-wrapper title="单位插件选择">
      <div class="flex mt-2 h-[300px] overflow-y-auto">
        <div class="flex-1">
          <hl-block-title type="success">
            单选
          </hl-block-title>
          <organization type="plugin" class="mt-2 w-full" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">
            多选
          </hl-block-title>
          <organization type="plugin" multiple class="mt-2 w-full" />
        </div>
      </div>
    </test-comp-wrapper>
  </div>
</template>

<style lang='scss' scoped>
.test-comp-wrapper {
  margin-bottom: 15px;
}

.test-comp-wrapper:last-child {
  margin-bottom: 0;
}
</style>
