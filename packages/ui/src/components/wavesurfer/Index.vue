<script setup>
import WaveSurfer from 'wavesurfer.js'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
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
    hl.message.loading('加载中...')
    nextTick(() => {
      wavesurfer = WaveSurfer.create({
        container: wavesurfer_ref.value,
        scrollParent: true,
        waveColor: variables['color-primary'],
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
        console.log('ready')
        hl.message.closeLoading()
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

      wavesurfer.on('error', (error) => {
        hl.message.error(error, '播放失败')
        handleClose()
      })
    })
  }
})

function handleClose() {
  wavesurfer && wavesurfer.destroy()
  hl.message.closeLoading()
  src.value = ''
}
</script>

<template>
  <div v-if="src" class="wavesurfer">
    <div class="tips">
      双击暂停，单击播放
    </div>
    <div ref="wavesurfer_ref" class="w-full" />
    <icon-comp icon="carbon:close-outline" class="close-item" @click="handleClose" />
  </div>
</template>

<style lang='scss' scoped>
.wavesurfer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .tips {
    position: absolute;
    top: calc(50% - 160px);
    width: 100%;
    text-align: center;
    color: var(--color-danger);
    font-size: 18px;
  }

  .close-item {
    position: absolute;
    top: 100px;
    right: 10px;
    font-size: 58px;
    color: white;
    cursor: pointer;
  }
}
</style>
