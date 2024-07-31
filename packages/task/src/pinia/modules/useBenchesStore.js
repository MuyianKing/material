import { defineStore } from 'pinia'

export default defineStore('benches', {
  state: () => ({
    // 我的任务关注配置
    attention_config: {
      // 所有的配置数据
      all_config_list: [],

      // 不针对层级，只表示当前编辑的是第几个
      active_index: 0,

      // 当前点击的行的数组配置
      curren_list: [],

      // 编辑类型：add-添加儿子  edit-修改自己
      edit_type: 'add',

      show: false,
    },
  }),
  actions: {
    initData(data) {
      if (data) {
        this.$patch(data)
      }
    },
    clear() {
      this.$reset()
    },
  },
})
