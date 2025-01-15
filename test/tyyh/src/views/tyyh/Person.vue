<script setup>
import TestCompWrapper from '@comp/test-comp-wrapper/Index.vue'
import { PersonAvatar, PersonSelect } from '@hl/tyyh'
import { HlBlockTitle } from '@hl/ui'

import { ref } from 'vue'

const p = ref('055206')

const p2 = ref(['320401199210122812', '320911198110316311', '320421197210205611', '340323199711294237'])
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
          <hl-block-title type="success">
            单选
          </hl-block-title>
          <person-select v-model="p" class="mt-2" disabled-person="320401199210122812" label-config="$name - ($job)" />
        </div>
        <div class="flex-1 ml-4">
          <hl-block-title type="success">
            多选
          </hl-block-title>
          <person-select v-model="p2" multiple expand readonly class="mt-2" />
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
