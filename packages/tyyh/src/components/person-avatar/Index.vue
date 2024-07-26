<script setup>
const user = useUserStore()
</script>

<template>
  <hl-avatar :size="34" fit="cover" :src="user.image_url">
    <template #error>
      <div class="text-avatar">
        {{ user.name.substring(user.name.length - 2) }}
      </div>
    </template>
  </hl-avatar>
</template>

<style scoped lang="scss">
.text-avatar {
  background-color: #0c88e8;
  border-radius: 50%;
  display: block;
  width: 100%;
  height: 100%;
  line-height: 34px;
  text-align: center;
}
</style>
