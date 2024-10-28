<script setup>
import HlSidebar from '@layout/side-bar/Index.vue'
import ExitFull from '@layout/ExitFull.vue'
import HlHeader from '@layout/Header.vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import useTagsStore from '@pinia/useTagsStore'
import useAppStore from '@pinia/useAppStore'
import { computed, h, ref, watch } from 'vue'

const appStore = useAppStore()

const tags = useTagsStore()
const _route = useRoute()
const tagsList = computed(() => tags.tagsList)

// 设置标签
function setTags(tag_toute) {
  const isExist = tagsList.value.some(item => item.path === tag_toute.fullPath)
  if (!isExist) {
    tags.setTagsItem({
      name: tag_toute.name,
      title: tag_toute.meta.title,
      path: tag_toute.fullPath,
    })
  }
}

setTags(_route)

const collapse = ref(+hl.storage.get('collapse') === 1)
watch(collapse, (val) => {
  hl.storage.set('collapse', val ? 1 : 0)
})

onBeforeRouteUpdate((to) => {
  setTags(to)
})

const show = computed(() => _route.path !== 'login')

// 用来存已经创建的组件
const components_map = new Map()
// 返回组件实例
function formatComponentInstance(component, route) {
  const component_name = component.type.name

  /**
   * 如果组件名以Template结尾则重新生成一个组件实例并缓存起来
   *
   * TODO: 可设置最大缓存个数
   */
  if (component_name && component_name.endsWith('Template')) {
    if (component) {
      let new_comp
      const new_comp_name = route.path

      if (components_map.has(new_comp_name)) {
        new_comp = components_map.get(new_comp_name)
      } else {
        // 缓存
        new_comp = {
          name: new_comp_name,
          render() {
            return h(component)
          },
        }
        components_map.set(new_comp_name, new_comp)
      }

      return h(new_comp)
    }
  } else {
    return component
  }
}
</script>

<template>
  <div v-if="show" class="main-body-wrapper">
    <exit-full v-if="appStore.full_page" />
    <hl-sidebar v-model="collapse" />
    <div class="bottom-wrapper">
      <hl-header v-model:collapse="collapse" :class="{ 'hidden-hidden': appStore.full_page }" />
      <div class="content-box" :class="{ 'content-collapse': collapse }">
        <router-view v-if="tags.reload" v-slot="{ Component, route }">
          <transition name="fade">
            <keep-alive :exclude="/.*(NoAlive)$/" :max="15">
              <component :is="formatComponentInstance(Component, route)" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hidden-hidden {
  width: 0 !important;
  height: 0;
  overflow: hidden;
}

.main-body-wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .bottom-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;

    .content-box {
      background: #eee;
      flex: 1;
      min-width: 0;
      min-height: 0;

      .tags-item {
        margin: 10px 0;
      }
    }
  }

  .content-collapse {
    left: 65px;
  }
}
</style>
