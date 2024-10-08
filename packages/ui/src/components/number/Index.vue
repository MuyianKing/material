<script setup name="HlDataNum">
import { ref, watchEffect } from 'vue'

const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
  separator: {
    type: String,
    default: ',',
  },
})

// 处理数据
const num_format = ref([])
const suffix = ref('')
function handeNum() {
  // 先处理大数据
  let num = props.num
  if (num > 100000000000) {
    suffix.value = '千亿'
    num = (num / 100000000000).toFixed(2)
  } else if (num > 100000000) {
    suffix.value = '亿'
    num = (num / 100000000).toFixed(2)
  } else if (num > 10000) {
    suffix.value = '万'
    num = (num / 10000).toFixed(2)
    console.log(num, num / 10000)
  }

  num_format.value = thousands(disZore(num))
}

// 去掉小数点后的无效0
function disZore(num) {
  let str = num.toString().split('.')

  if (str[1]) {
    const suffix_list = str[1].split('')
    let i = suffix_list.length - 1
    for (; i >= 0; i--) {
      if (+suffix_list[i] !== 0) {
        break
      }
    }

    suffix_list.splice(i + 1)
    if (suffix_list.length > 0) {
      str = `${str[0]}.${suffix_list.join('')}`
    } else {
      str = str[0]
    }
  }
  return +str
}

// 千分位分割
function thousands(num) {
  const str = num.toString()
  const reg = str.includes('.') ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
  return str.replace(reg, `$1${props.separator}`)
}

watchEffect(() => {
  handeNum()
})
</script>

<template>
  <span class="hl-data-num">{{ num_format }}{{ suffix }}</span>
</template>
