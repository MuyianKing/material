import { computed as m, openBlock as d, createBlock as c, unref as r } from "vue";
import { ElDatePicker as f } from "element-plus";
const g = {
  __name: "Date",
  props: {
    type: {
      type: String,
      default: "date"
    },
    modelValue: {
      type: String,
      default: ""
    },
    emptyValue: {
      type: [String, Number, Object],
      default: ""
    },
    placeholder: {
      type: String,
      default: "请选择时间"
    },
    valueFormat: {
      // 绑定值的格式
      type: String,
      default: ""
    },
    format: {
      // 显示在输入框的格式
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: u }) {
    const e = t, l = u, n = m(() => e.valueFormat ? e.valueFormat : o.value), o = m(() => e.format ? e.format : e.type === "datetime" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD");
    function p(a) {
      a = a || e.emptyValue, l("update:modelValue", a), l("change");
    }
    return (a, i) => (d(), c(r(f), {
      "model-value": t.modelValue,
      "value-format": r(n),
      format: r(o),
      type: t.type,
      placeholder: t.placeholder || "请选择",
      "onUpdate:modelValue": p
    }, null, 8, ["model-value", "value-format", "format", "type", "placeholder"]));
  }
};
export {
  g as default
};
