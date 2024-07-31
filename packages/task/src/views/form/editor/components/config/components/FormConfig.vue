<script setup>
const { form_config } = toRefs(inject('editor_store'))
</script>

<template>
  <el-form>
    <hl-form-item label="标签宽度">
      <hl-input v-model="form_config.label_width" type="number">
        <template #append>
          px
        </template>
      </hl-input>
    </hl-form-item>
  </el-form>
</template>
