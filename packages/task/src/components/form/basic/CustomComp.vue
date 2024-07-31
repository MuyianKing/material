<script setup>
import useGenerateRelative from './hooks/show'

const props = defineProps({
  mode: {
    type: String,
    default: 'edit',
  },
  form: {
    type: Object,
    default() {
      return null
    },
  },
  config: {
    type: Object,
    default() {
      return {}
    },
  },
})

const { form } = toRefs(props)
const { show } = useGenerateRelative(form, props.config, props.mode)

// 组件margin-bottom大小：编辑模式10px，预览模式15px
const mb = computed(() => props.mode === 'edit' ? '10px' : (props.mode === 'preview' ? '18px' : '15px'))
</script>

<template>
  <!-- 该组件用于操作一些公共的变化 -->
  <div v-if="show" class="custome-wrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.custome-wrapper {
  margin-bottom: v-bind(mb);
}
</style>
