<script setup>
const model = defineModel()
</script>

<template>
  <hl-input v-model="model" class="mt-2 form-task-fixed-comp">
    <template #prefix>
      小数点后保留
    </template>
    <template #append>
      位
    </template>
  </hl-input>
</template>

<style lang='scss'>
.form-task-fixed-comp {
  .el-input__wrapper {
    padding: 1px !important;

    .el-input__inner {
      padding: 0 10px;
    }

    .el-input__prefix,
    .el-input__suffix {
      padding: 0 10px;
      background-color: #f5f7fa;
    }

    .el-input__prefix {
      border-radius: 4px 0 0 4px;
    }

    .el-input__suffix {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
