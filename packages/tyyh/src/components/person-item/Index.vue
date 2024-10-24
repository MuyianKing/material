<script setup>
import { HlIcon, HlImage } from '@hl/ui'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
  close: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['clear'])

function clearPerson() {
  emits('clear', props.user)
}
</script>

<template>
  <div class="single-member relative">
    <div v-if="close" class="clear" @click="clearPerson">
      <hl-icon icon="carbon:close-outline" />
    </div>
    <div class="member-image">
      <hl-image v-if="user.image_url" :src="user.image_url" class="img" fit="contain" />
      <div v-else class="img no-image">
        <div>{{ user.name?.slice(0, 2) || '名字' }}</div>
      </div>
    </div>
    <div class="member-info">
      <p class="name">
        {{ user.name }}
      </p>
      <p class="police-id">
        {{ user.police_id }}
      </p>
      <div v-for="item in user.organization" :key="item.job_id + item.organization_id" class="duty">
        <p>{{ item.organization_nick }}</p>
        <p>{{ item.job_name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.single-member {
  position: relative;
  margin: 3px;
  padding: 0 3px;
  width: 134px;
  height: 160px;
  max-height: 160px;
  min-height: 160px;
  text-align: center;
  border: 1px solid #dfdfdf;
  background-color: #fff;
  overflow: hidden;

  &:hover {
    .member-image {
      height: 60px;
      transition: 0.4s;
    }

    .member-info {
      height: calc(100% - 65px);
    }
  }
}

.member-image {
  height: 136px;
  width: 100%;
  transition: height 0.4s;
  border-bottom: 5px solid #1fb554;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;

  .img {
    width: 100%;
    height: 136px;
    vertical-align: middle;

    &.no-image div {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);

      width: 80px;
      height: 80px;
      line-height: 80px;
      border-radius: 50%;
      background-color: #ccc;
      font-size: 16px;
    }
  }
}

.member-info {
  transition: height 0.4s;
  overflow: hidden auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  & > p {
    font-size: 14px;
    font-weight: 300;
    line-height: 22px;
  }
}

.duty {
  font-size: 12px;

  &:not(&:last-child) {
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
}

.clear {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
  z-index: 9;
}
</style>
