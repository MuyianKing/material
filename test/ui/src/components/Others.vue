<script setup>
const context_menu_ref = ref()

const menu_options = [{
  label: '第一',
  value: 1,
}, {
  label: '第二',
  value: 2,
}]

function handleRightClick() {
  context_menu_ref.value.toggle({ id: '1223' })
}

function handleMenuClick(data) {
  console.log('这是右击绑定的数据', data)
}

const show_dialog = ref(false)
</script>

<template>
  <div class="pl-4 pt-4">
    <hl-block-title>头像</hl-block-title>

    <div class="flex mt-2">
      <hl-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
      <hl-avatar class="ml-4" />
    </div>

    <hl-block-title class="mt-4">
      右击组件
    </hl-block-title>
    <hl-button class="mt-4" @contextmenu.prevent="handleRightClick">
      右击这里
    </hl-button>
    <hl-context-menu ref="context_menu_ref" :options="menu_options" @click="handleMenuClick" />

    <hl-block-title class="mt-4">
      弹窗
    </hl-block-title>

    <hl-button class="mt-4" @click="show_dialog = true">
      打开弹窗
    </hl-button>
    <hl-dialog v-model="show_dialog" title="测试">
      测试
    </hl-dialog>
  </div>
</template>

<style lang='scss' scoped></style>
