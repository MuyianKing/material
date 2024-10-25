<script setup>
import { usePageRequest, useRequest } from '@hl/hooks'

async function server() {

}

usePageRequest(server)
useRequest(server)
</script>

<template>
  <div>test</div>
</template>

<style lang='scss' scoped></style>
