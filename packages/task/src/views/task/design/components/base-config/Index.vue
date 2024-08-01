<script setup>
import { inject, ref, toRefs } from 'vue'
import { HlFormItem, HlIconSelect, HlInput, HlRadio } from '@hl/ui'
import { ElForm } from 'element-plus'

import { is_has_pass } from '../../../../../default/index'
import ComplexControlSelect from '../../../../../components/person-complex-select/Index.vue'
import ComplexControlSelectArray from '../../../../../components/person-complex-select-array/Index.vue'
import TaskIcon from '../../../../../components/task/Icon.vue'
import TaskGroupSelect from '../../../../../components/task/GroupSelect.vue'
import DictPicker from '../../../../../components/false-dict/Picker.vue'
import { rwdd_type_list } from '../../../../../default/task'
import LabelTitle from './LabelTitle.vue'

import 'element-plus/es/components/form/style/css'

const { base_info } = toRefs(inject('task_config'))

const form_ref = ref()
defineExpose({
  validate() {
    try {
      return form_ref.value.validate()
    } catch (e) {
      console.log('base-config', e)
    }
  },
})
</script>

<template>
  <div class="base-config-wrapper">
    <el-form ref="form_ref" :model="base_info">
      <hl-form-item label="任务图标">
        <task-icon class="mr-4" :icon="base_info.logo" :size="30" />
        <hl-icon-select v-model="base_info.logo" />
      </hl-form-item>

      <hl-form-item label="任务名称" required prop="config_name">
        <hl-input v-model="base_info.config_name" />
      </hl-form-item>

      <hl-form-item label="任务专题" prop="group_id" required>
        <task-group-select v-model="base_info.group_id" />
      </hl-form-item>

      <hl-form-item label="谁可以编辑此任务模板">
        <complex-control-select v-model="base_info.glry_qx" title="谁可以编辑此任务模板" />
      </hl-form-item>

      <hl-form-item label="谁可以下发此任务">
        <complex-control-select v-model="base_info.cjfw_qx" title="谁可以下发此任务" />
      </hl-form-item>

      <hl-form-item label="任务查看范围">
        <complex-control-select-array v-model="base_info.jkry_qx" title="任务查看范围" />
      </hl-form-item>

      <hl-form-item label="任务下发范围">
        <complex-control-select v-model="base_info.xffw_qx" title="任务下发范围" />
      </hl-form-item>

      <hl-form-item label="任务说明">
        <hl-input v-model="base_info.remark" type="textarea" maxlength="200" show-word-limit :rows="3" />
      </hl-form-item>

      <!-- ----------------------呈请延长---------------------- -->
      <label-title title="呈请延长">
        <hl-form-item label="是否允许呈请延长">
          <hl-radio v-model="base_info.cqyc_rx" :options="is_has_pass" />
        </hl-form-item>
        <template v-if="base_info.cqyc_rx">
          <hl-form-item label="呈请延长允许申请次数">
            <hl-input v-model="base_info.cqyc_cs" type="number" />
          </hl-form-item>
          <hl-form-item label="呈请延长后是否通知审批人员">
            <dict-picker v-model="base_info.cqyc_tz" type="notice_type" comp="radio" />
          </hl-form-item>
          <hl-form-item v-if="base_info.cqyc_tz" label="呈请延长短信通知内容">
            <hl-input v-model="base_info.cqyc_dx" type="textarea" maxlength="200" show-word-limit />
          </hl-form-item>
        </template>
      </label-title>

      <!-- ----------------------移交申请---------------------- -->
      <label-title title="移交申请">
        <hl-form-item label="是否允许移交申请">
          <hl-radio v-model="base_info.yjsq_rx" :options="is_has_pass" />
        </hl-form-item>
        <template v-if="base_info.yjsq_rx">
          <hl-form-item label="移交申请后是否通知审批人员">
            <dict-picker v-model="base_info.yjsq_tz" type="notice_type" comp="radio" />
          </hl-form-item>
          <hl-form-item v-if="base_info.yjsq_tz" label="短信通知内容">
            <hl-input v-model="base_info.yjsq_dx" type="textarea" maxlength="200" show-word-limit />
          </hl-form-item>
        </template>
      </label-title>

      <!-- ----------------------审批---------------------- -->
      <label-title title="呈请延长和移交申请审批人员">
        <hl-form-item label="是否允许审批">
          <hl-radio v-model="base_info.spry_rx" :options="is_has_pass" />
        </hl-form-item>
        <hl-form-item v-if="base_info.spry_rx" label="审批人员">
          <complex-control-select-array v-model="base_info.spry_qx" title="审批人员" />
        </hl-form-item>
      </label-title>

      <!-- ----------------------批注---------------------- -->
      <label-title title="工作要求">
        <hl-form-item label="是否允许下发工作要求">
          <hl-radio v-model="base_info.pzry_rx" :options="is_has_pass" />
        </hl-form-item>
        <template v-if="base_info.pzry_rx">
          <hl-form-item label="下发人员">
            <complex-control-select-array v-model="base_info.pzry_qx" title="下发人员" />
          </hl-form-item>
          <hl-form-item label="下发后是否通知处置人员">
            <dict-picker v-model="base_info.pzry_tz" type="notice_type" comp="radio" />
          </hl-form-item>
          <hl-form-item v-if="base_info.pzry_tz" label="短信通知内容">
            <hl-input v-model="base_info.pzry_dx" type="textarea" maxlength="200" show-word-limit />
          </hl-form-item>
        </template>
      </label-title>

      <!-- ----------------------任务调度---------------------- -->
      <label-title title="任务调度">
        <hl-form-item label="是否允许任务调度">
          <hl-radio v-model="base_info.rwdd_rx" :options="is_has_pass" />
        </hl-form-item>
        <template v-if="base_info.rwdd_rx">
          <hl-form-item label="任务调度类型">
            <hl-radio v-model="base_info.rwdd_type" :options="rwdd_type_list" />
          </hl-form-item>
          <hl-form-item label="调度人员">
            <complex-control-select-array v-model="base_info.rwdd_qx" title="调度人员" />
          </hl-form-item>
        </template>
      </label-title>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.base-config-wrapper {
  background-color: #fff;
  width: 700px;
  height: calc(100% - 20px);
  margin: 10px auto 0;
  padding: 20px;
  overflow: auto;

  :deep(.el-form-item) {
    flex-direction: column;

    &>.el-form-item__label {
      display: block;
      font-weight: bold;
    }
  }

  :deep(fieldset .el-form-item) {
    flex-direction: row;
  }
}
</style>
