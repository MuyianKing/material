<script setup>
import HlTags from '@layout/Tags.vue'
import HlTheme from '@layout/theme/Index.vue'
import { exitFullScreen, openFullScreen } from '@utils/dom'
import { logout } from '@server/user'

const user = useUserStore()

const isfull = ref(false)

// 用户名下拉菜单选择事件
const router = useRouter()

function handleDown(command) {
  if (command === 'loginout') {
    logout(router)
  } else if (command === 'user') {
    router.push('/user/info')
  }
}

function fullScreen() {
  isfull.value = !isfull.value
  if (isfull.value) {
    openFullScreen()
  } else {
    exitFullScreen()
  }
}
</script>

<template>
  <div class="outer-header">
    <div class="header">
      <hl-tags class="tags-wrapper" />
      <div class="header-right">
        <div class="header-user-con">
          <hl-theme class="cursor-pointer" />
          <hl-icon class="cursor-pointer" icon="icon-park-outline:full-screen" @click="fullScreen" />
          <el-dropdown class="user-name" trigger="click" @command="handleDown">
            <span class="el-dropdown-link">
              <span class="ml-2 text-gray-900">{{ user.name }}</span>
              <i class="el-icon-caret-bottom" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="user">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item divided command="loginout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$tab-height: var(--tab-height);

.outer-header {
  height: $tab-height;
  transition: all linear 0.2s;
}

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: $tab-height;
  color: var(--el-bar-text-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--tab-bg);
  background-size: 100% 100%;

  .tags-wrapper {
    flex: 1;
    min-width: 0;
    margin-right: 15px;
  }

  .logo {
    line-height: $tab-height;
    display: flex;
    align-items: center;
    font-size: 23px;
    font-weight: 500;
    width: fit-content;
    color: white;
  }

  .logo:hover {
    text-decoration: none;
    cursor: pointer;
  }
}

.header-right {
  float: right;
  padding-right: 20px;
}

.header-user-con {
  display: flex;
  height: $tab-height;
  align-items: center;
  color: #333;

  & > * {
    margin-left: 20px;
  }
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--el-bar-text-color);
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
