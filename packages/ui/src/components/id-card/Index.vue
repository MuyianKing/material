<script setup name="HlIdCard">
defineProps({
  idCard: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <span class="hl-id-card whitespace-nowrap">
    <slot>
      {{ idCard }}
    </slot>
  </span>
</template>
