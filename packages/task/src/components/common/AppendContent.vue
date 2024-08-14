<script setup>

</script>

<template>
  <div class="append-body">
    <div v-if="$slots.prepend" class="append-item">
      <slot name="prepend" />
    </div>
    <div class="append-content">
      <slot />
    </div>
    <div v-if="$slots.append" class="append-item">
      <slot name="append" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.append-body {
  box-shadow: 0 0 0 1px var(--el-border-color, var(--el-border-color)) inset;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  display: flex;
  align-items: center;
  padding: 1px;
  width: 100%;

  .append-content {
    flex: 1;
    min-width: 0;
  }

  .append-item {
    background-color: var(--el-fill-color-light);
    border-left: 1px solid var(--el-border-color);
  }

  :deep(*) {
    box-shadow: none !important;
    background-color: transparent;
  }
}
</style>
