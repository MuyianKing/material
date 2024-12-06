<script setup>
import TestCompWrapper from '@comp/test-comp-wrapper/Index.vue'
import { CircleSelect, JobCascader, RoleSelect } from '@hl/tyyh'
import { HlBlockTitle } from '@hl/ui'
</script>

<template>
  <div class="p-4 overflow-y-auto h-full">
    <test-comp-wrapper title="角色选择">
      <div class="flex mt-2">
        <div class="flex-1">
          <hl-block-title type="success">
            单选
          </hl-block-title>
          <role-select class="mt-2" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">
            多选
          </hl-block-title>
          <role-select multiple class="mt-2" />
        </div>
      </div>
    </test-comp-wrapper>

    <test-comp-wrapper title="圈层选择">
      <div class="flex mt-2">
        <div class="flex-1">
          <hl-block-title type="success">
            单选
          </hl-block-title>
          <circle-select class="mt-2" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">
            多选
          </hl-block-title>
          <circle-select multiple class="mt-2" />
        </div>
      </div>
    </test-comp-wrapper>

    <test-comp-wrapper title="职位级联选择">
      <div class="flex mt-2">
        <div class="flex-1">
          <hl-block-title type="success">
            单选
          </hl-block-title>
          <job-cascader class="mt-2 w-full" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">
            多选
          </hl-block-title>
          <job-cascader multiple class="mt-2 w-full" />
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
