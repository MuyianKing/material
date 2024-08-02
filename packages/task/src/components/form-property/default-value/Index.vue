<script setup>
import { computed, inject } from 'vue'
import { HlFormItem } from '@hl/ui'
import SelectComp from './components/Select.vue'
import UploadComp from './components/Upload.vue'
import DateTime from './components/DateTime.vue'
import DeadlineComp from './components/Deadline.vue'
import TaskUser from './components/TaskUser.vue'
import OtherDefault from './components/other/Index.vue'
import RichText from './components/RichText.vue'
import '@hl/ui/src/components/form-item/Index.css'

const value = defineModel()
const { property_config } = toRefs(inject('editor_store'))
const property = computed(() => property_config.value.property)
</script>

<template>
  <hl-form-item v-if="value" label-width="0px">
    <select-comp v-if="value.type === 'select'" v-model="value.value" />
    <upload-comp v-else-if="value.type === 'form_upload'" v-model="value.value" :property="property" />
    <date-time v-else-if="value.type === 'datetime'" v-model="value.value" :property="property" />
    <deadline-comp v-else-if="value.type === 'deadline'" v-model="value.value" />
    <task-user v-else-if="value.type === 'task_user'" v-model="value.value" />
    <rich-text v-else-if="value.type === 'rich_text'" v-model="value.value" />
    <!--  其他默认配置 -->
    <other-default v-else v-model="value" />
  </hl-form-item>
</template>

<style lang='scss' scoped></style>
