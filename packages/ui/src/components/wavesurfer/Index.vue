<script setup>
import WaveSurfer from 'wavesurfer.js'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import { nextTick, ref, watch } from 'vue'
import { closeLoading, error, loading } from '../../utils/message'
import IconComp from '../icon/Index.vue'

const src = defineModel({
  type: String,
  default: '',
})

const wavesurfer_ref = ref()

let wavesurfer = null

let wavesurfer_timeout_flg = 0

watch(src, () => {
  if (src.value) {
    loading('加载中...')
    nextTick(() => {
      wavesurfer = WaveSurfer.create({
        container: wavesurfer_ref.value,
        scrollParent: true,
        waveColor: '#409eff',
        progressColor: 'gray',
        url: src.value,
        autoplay: true,
        plugins: [
          Hover.create({
            lineColor: '#ff0000',
            lineWidth: 2,
            labelBackground: '#555',
            labelColor: '#fff',
            labelSize: '11px',
          }),
        ],
      })

      wavesurfer.on('ready', () => {
        closeLoading()
      })

      wavesurfer.on('click', () => {
        wavesurfer_timeout_flg && clearTimeout(wavesurfer_timeout_flg)

        wavesurfer.setVolume(0)
        if (!wavesurfer.isPlaying()) {
          wavesurfer.play()
        }

        wavesurfer_timeout_flg = setTimeout(() => {
          wavesurfer.setVolume(1)
        }, 500)
      })

      wavesurfer.on('dblclick', () => {
        if (wavesurfer.isPlaying()) {
          wavesurfer.pause()
        }
      })

      wavesurfer.on('error', (e) => {
        error(e, '播放失败')
        handleClose()
      })
    })
  }
})

function handleClose() {
  wavesurfer && wavesurfer.destroy()
  closeLoading()
  src.value = ''
}
</script>

<template>
  <div v-if="src" class="hl-wavesurfer">
    <div class="tips">
      双击暂停，单击播放
    </div>
    <div ref="wavesurfer_ref" class="w-full" />
    <icon-comp icon="carbon:close-outline" class="close-item" @click="handleClose" />
  </div>
</template>
