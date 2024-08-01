<script setup>
import { ref } from 'vue'
import { HlAddButton } from '@hl/ui'

import PublishTask from '../../../../publish/Index.vue'

defineProps({
  configUuid: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['refresh'])
const showPublish = ref(false)
</script>

<template>
  <hl-add-button icon text="发布" @click="showPublish = true" />

  <publish-task v-model="showPublish" :config-uuid @refresh="emits('refresh')" />
</template>

<style scoped lang="scss">

</style>
