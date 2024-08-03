<script setup>
import { ref, useAttrs } from 'vue'
import { HlFormDialog, HlFormItem } from '@hl/ui'

import { PersonSelect } from '@hl/tyyh'
import UserModel from '../../../../../../model/task/custom.user.set'
import { setLinkPerson } from '../../../../../../server/common.task.page'
import '@hl/ui/src/components/form-dialog/Index.css'
import '@hl/ui/src/components/form-item/Index.css'

const props = defineProps({
  configUuid: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    default: null,
  },
  text: {
    type: String,
    default: '人员',
  },
})

defineEmits(['refresh'])

const form = ref({})

const attrs = useAttrs()
watch(() => attrs.modelValue, (val) => {
  if (val) {
    form.value = new UserModel({
      ...props.data,
      config_uuid: props.configUuid,
    })
  }
})
</script>

<template>
  <hl-form-dialog :title="`设置${text} (${data?.organization_name})`" top="50px" width="40%" :model="form"
                  :server="setLinkPerson" @success="$emit('refresh')"
  >
    <hl-form-item :label="text">
      <person-select v-model="form.id_cards" clearable multiple org-job-idcard
                     :extend-params="{ organization_id: form.organization_id }" has-next
      />
    </hl-form-item>
  </hl-form-dialog>
</template>

<style scoped lang="scss"></style>
