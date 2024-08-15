<script setup name="HTel">
defineProps({
  tel: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <span class="hl-tel whitespace-nowrap">
    <slot>
      {{ tel }}
    </slot>
  </span>
</template>
