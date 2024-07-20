<script setup name="BlockTitle">
defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  title: {
    type: String,
    default: '',
  },
  fontSize: {
    type: Number,
    default: 16,
  },
  showBlock: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: ' #595757',
  },
})
</script>

<template>
  <div class="hl-block-title">
    <div class="flex h-full">
      <div v-if="showBlock" class="block" :class="type" />
      <div class="title flex items-center justify-center">
        <slot>{{ title }}</slot>
      </div>
    </div>
    <div>
      <slot name="after" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hl-block-title {
  display: flex;
}

.block {
  border-radius: 6px;
  width: 6px;
  height: auto;
  margin-right: 8px;
  padding: 5px 0;
}

.title {
  font-weight: bold;
  color: v-bind(color);
  font-size: calc(1px * v-bind(fontSize));
}

.primary {
  background-image: linear-gradient(to bottom, #78c6ff, #1c82f1);
}

.success {
  background-image: linear-gradient(#dbe89b, #81c69e);
}

.danger {
  background-image: linear-gradient(#f08c85, #d8353a);
}
</style>
