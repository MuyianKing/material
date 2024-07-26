<script setup>
import { PersonAvatar, PersonSelect, PersonSelectPanel } from "@hl/tyyh"
import TestCompWrapper from "@comp/test-comp-wrapper/Index.vue"

</script>

<template>
  <div class="p-4 overflow-y-auto h-full">
    <test-comp-wrapper title="头像">
      <div class="flex mt-2">
        <person-avatar />
      </div>
    </test-comp-wrapper>

    <test-comp-wrapper title="人员选择">
      <div class="flex mt-2">
        <div class="flex-1">
          <hl-block-title type="success">单选</hl-block-title>
          <PersonSelect class="mt-2" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">多选</hl-block-title>
          <PersonSelect multiple class="mt-2" />
        </div>
      </div>
    </test-comp-wrapper>

    <test-comp-wrapper title="人员面板选择">
      <div class="flex mt-2">
        <div class="flex-1 ml-4">
          <hl-block-title type="success">展开</hl-block-title>
          <PersonSelectPanel expand class="mt-2" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">多选展开</hl-block-title>
          <PersonSelectPanel expand multiple class="mt-2" />
        </div>
      </div>
    </test-comp-wrapper>

    <test-comp-wrapper title="人员选择">
      <div class="flex mt-2 h-[300px] overflow-y-auto">
        <div class="flex-1 ml-4">
          <hl-block-title type="success">展开</hl-block-title>
          <PersonSelect expand class="mt-2" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">多选展开</hl-block-title>
          <PersonSelect expand multiple class="mt-2" />
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
