<script setup>
import { delGroup } from '../../../../server/group'

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

const emits = defineEmits(['refresh'])

async function handleDel() {
  try {
    await hl.message.confirm('确定删除该任务专题')
    await delGroup(props.data.group_id)
    hl.message.success('删除成功')
    emits('refresh')
  } catch (error) {
    if (error !== 'cancel') {
      hl.message.error(error, '删除失败')
    }
  }
}
</script>

<template>
  <div v-if="data" class="group-item" title="双击修改">
    <div class="title">
      {{ data.group_name }}
    </div>
    <div class="remark">
      {{ data.remark }}
    </div>
    <div class="footer">
      <div class="flex items-center">
        <hl-icon icon="bx:bxs-user-plus" size="22px" />
        <span>{{ data.name }}</span>
      </div>
      <div class="flex items-center">
        <hl-icon icon="bx:bxs-time-five" />
        <span>{{ data.create_time?.substring(0, 16) }}</span>
      </div>
    </div>
    <hl-icon class="close-item" icon="material-symbols-light:close" @click="handleDel" />
  </div>
</template>

<style lang='scss' scoped>
.group-item {
  background-color: white;
  border-radius: 5px;
  padding: 5px 10px;
  height: fit-content;
  height: 150px;
  position: relative;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all ease 0.5;
  cursor: pointer;

  .title {
    font-size: 18px;
    font-weight: bold;
    color: var(--color-primary);
  }

  .remark {
    color: gray;
    margin: 10px 0;
    flex: 1;
  }

  .close-item {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 22px;
    display: none;
  }

  .close-item:hover {
    cursor: pointer;
    color: var(--color-danger);
  }

  .footer {
    display: flex;
    justify-content: space-between;
    color: #666;
    align-items: center;
  }
}

.group-item:hover {
  box-shadow: 0 0 20px var(--color-primary);
  border: 1px solid var(--color-primary);
  z-index: 2;

  .close-item {
    display: block;
  }
}
</style>
