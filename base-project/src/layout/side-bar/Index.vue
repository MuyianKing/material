<script name="Sidebar" setup>
import { HlIcon } from '@hl/ui'
import SubMenu from '@layout/side-bar/components/SubMenu.vue'
import { hasResource } from '@hooks/user'
import { ElMenu } from 'element-plus/es'

import { useRoute, useRouter } from 'vue-router'

import { computed, defineModel, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useThemeStore from '@pinia/useThemeStore.js'
import useDynamicRoutesStore from '@pinia/useDynamicRoutesStore.js'
import { WEB_NAME } from '../../utils/app'

const router = useRouter()
const route = useRoute()
const onRoutes = computed(() => route.path)

/**
 * 根据资源配置生成菜单
 * @param {Array} routes 路由
 */
function createMenuList(routes) {
  const new_routes = []

  routes.forEach((route) => {
    if (hasResource(route.meta.resource)) {
      const new_route = {
        path: route.path,
        meta: route.meta,
      }

      if (route.children && route.children.length > 0) {
        new_route.children = createMenuList(route.children)
      }

      // 路由包含组件或者有儿子才渲染
      if (route.component || new_route.children?.length > 0) {
        new_routes.push(new_route)
      }
    }
  })

  return new_routes
}

// 菜单折叠
const collapse = defineModel({
  type: Boolean,
  default: false,
})

const { theme: storeTheme } = storeToRefs(useThemeStore())

const width = computed(() => {
  return collapse.value ? 'calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)' : storeTheme.value['side-width']
})

const { list } = storeToRefs(useDynamicRoutesStore())

// 菜单
const sideMenu = ref([])
watch(list, (val) => {
  const routes = router.getRoutes().filter(item => item.path === '/')[0].children.filter(item => !item.meta.dynamic)

  if (val) {
    val.reverse().forEach((new_menu) => {
      routes.splice(1, 0, new_menu)
    })
  }

  sideMenu.value = createMenuList(routes)
}, {
  immediate: true,
})

onMounted(() => {
  if (document.body.clientWidth < 1000) {
    collapse.value = !collapse.value
  }
})
</script>

<template>
  <div :style="{ width }" class="anchor-index">
    <el-menu :collapse :default-active="onRoutes" class="sidebar-el-menu" router unique-opened>
      <div class="web-name-wrapper">
        <div v-show="!collapse" class="web-name">
          <span class="logo" href="/">
            {{ WEB_NAME }}
          </span>
        </div>

        <hl-icon :icon="collapse ? 'fa:indent' : 'fa:dedent'" class="collapse-btn" @click="collapse = !collapse" />
      </div>
      <template v-for="item in sideMenu" :key="item.path">
        <sub-menu :menu="item" />
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.anchor-index {
  user-select: none;
  transition: all linear 0.2s;
}

.sidebar-el-menu {
  position: relative;
  height: 100%;
  overflow-y: auto;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.web-name-wrapper {
  height: var(--tab-height);
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 5px;

  .web-name {
    min-width: 0;
    display: flex;
    align-items: center;
    flex: 1;
    margin-right: 5px;
  }

  .collapse-btn {
    color: var(--side-light-color);
    cursor: pointer;
    margin-left: 5px;
    font-size: 16px !important;
  }

  .logo {
    color: var(--side-light-color);
    font-size: 20px;
    padding-left: 4px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: var(--side-width);
}

:deep(.el-menu-item) {
  height: var(--side-menu-item-height);

  &:hover {
    color: var(--color-primary);
  }
}

:deep(.el-menu-item.is-active) {
  color: var(--side-light-color);
}

:deep(.el-menu) {
  border-right: 0 !important;
}
</style>
