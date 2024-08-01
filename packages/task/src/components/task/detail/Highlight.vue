<script setup>
import { HlIcon, HlPreview } from '@hl/ui'
import RevBtn from '../options/common/RevBtn.vue'
import { removeWorkAskFor } from '../../../server/task'

defineProps({
  interaction: {
    type: Array,
    default() {
      return []
    },
  },
  data: {
    type: Object,
    required: true,
  },
})
const emits = defineEmits(['remove'])

function is_close(id_card) {
  const userStore = hl.getUserInfo?.()
  if (userStore) {
    return userStore.id_card === id_card
  }
  return false
}

async function submit(work_id) {
  try {
    await removeWorkAskFor(work_id)
    emits('remove', work_id)
    hl.message.success('操作成功')
  } catch (e) {
    hl.message.error(e, '删除失败')
  }
}
</script>

<template>
  <div>
    <template v-if="!interaction.includes(data.type)">
      <div v-html="data.a_result_log" />
    </template>
    <template v-else>
      <div class="highlight">
        <div>
          <div v-html="data.a_result_log" />
          <div class="mt-1">
            <div>
              要求：<span class="mx-1">{{ data.data.content.remark }}</span>
            </div>
            <div class="flex content">
              <div class="mt-1 label">
                附件：
              </div>
              <div>
                <hl-preview :files="data.data.content.file_ids" />
                <hl-preview :files="data.data.content.img_ids" />
              </div>
            </div>
          </div>
        </div>
        <rev-btn @click="submit(data.id)">
          <hl-icon v-if="is_close(data.id_card)" class="icon" icon="iconamoon:close-circle-1" />
        </rev-btn>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.highlight {
  border: 1px solid red;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;

  .label {
    color: #606266;
  }

  .content {
    color: #0c88e8;
    cursor: pointer;
  }

  .icon {
    display: none;
  }

  &:hover .icon {
    display: block;
    color: red;
  }
}
</style>
