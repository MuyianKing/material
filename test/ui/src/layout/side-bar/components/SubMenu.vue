<script setup>
import { HlIcon } from '@hl/ui'
import { ElMenuItem, ElSubMenu } from 'element-plus/es'
import 'element-plus/es/components/menu-item/style/css'
import 'element-plus/es/components/sub-menu/style/css'

defineProps({
  menu: {
    type: Object,
    default() {
      return {}
    },
  },
  fatherPath: {
    type: String,
    default: '/',
  },
})

function pathResolve(parentPath, path) {
  const childPath = path.startsWith('/') || !path ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, '/').trim()
}
</script>

<template>
  <template v-if="!menu.meta?.hide">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.path" :index="pathResolve(fatherPath, menu.path)">
      <template #title>
        <hl-icon v-if="menu.meta?.icon" :icon="menu.meta.icon" class="top-item-icon" />
        <span class="item-title">{{ menu.meta?.title }}</span>
      </template>

      <template v-for="item in menu.children" :key="item.path">
        <sub-menu :menu="item" :father-path="pathResolve(fatherPath, menu.path)" />
      </template>
    </el-sub-menu>
    <el-menu-item v-else :index="pathResolve(fatherPath, menu.path)">
      <hl-icon v-if="menu.meta?.icon" :icon="menu.meta.icon" class="top-item-icon" />
      <span class="item-title">{{ menu.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>
.top-item-icon {
  width: 25px;
  flex-shrink: 0;
  font-size: 20px !important;
  margin-right: 5px;
}

.item-title {
  height: var(--side-menu-item-height);
  line-height: var(--side-menu-item-height);
  font-size: 13px;
}
</style>
