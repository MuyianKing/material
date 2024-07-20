import { mergeModels as f, useModel as M, computed as n, watch as S, nextTick as m, openBlock as F, createElementBlock as $, createVNode as y, unref as r, mergeProps as h, createElementVNode as w, toDisplayString as x } from "vue";
import { ElDatePicker as g } from "element-plus";
const H = { class: "flex items-center" }, P = { class: "mx-2 text-gray-400 separator" }, N = {
  __name: "DateRange",
  props: /* @__PURE__ */ f({
    // 类型：同el-date
    type: {
      type: String,
      default: "date"
    },
    start: {
      type: String,
      default: ""
    },
    end: {
      type: String,
      default: ""
    },
    startPlaceholder: {
      type: String,
      default: "请选择开始时间"
    },
    endPlaceholder: {
      type: String,
      default: "请选择结束时间"
    },
    format: {
      // 显示在输入框的格式
      type: String,
      default: ""
    },
    valueFormat: {
      // 绑定值的格式
      type: String,
      default: ""
    },
    startValueFormat: {
      // 开始时间绑定值的格式
      type: String,
      default: ""
    },
    endValueFormat: {
      // 结束时间绑定值的格式
      type: String,
      default: ""
    },
    separator: {
      type: String,
      default: " ~ "
    },
    // 单个时间组件的长度
    width: {
      type: [String, Number],
      default: ""
    },
    // 是否关闭开始时间比结束时间大的提示,默认关闭不会改变v-model的值，不会执行change事件
    noWarning: {
      type: Boolean,
      default: !1
    },
    emptyValue: {
      type: [String, Number, Object],
      default: ""
    }
  }, {
    modelValue: {
      type: String,
      default: ""
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ f(["update:start", "update:end", "change"], ["update:modelValue"]),
  setup(l, { emit: Y }) {
    const t = l, u = Y, a = M(l, "modelValue");
    function v(e) {
      e = e || t.emptyValue, u("update:start", e), m(() => {
        const o = a.value.split("_");
        a.value = `${e}_${o[1] || ""}`, d(e);
      });
    }
    function _(e) {
      e = e || t.emptyValue, u("update:end", e), m(() => {
        const o = a.value.split("_");
        a.value = `${o[0] || ""}_${e}`, d(e);
      });
    }
    function d(e) {
      u("change", e);
    }
    const s = n(() => t.format ? t.format : t.type === "datetime" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"), i = n(() => t.startValueFormat ? t.startValueFormat : t.valueFormat ? t.valueFormat : t.type === "datetime" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"), p = n(() => t.endValueFormat ? t.endValueFormat : t.valueFormat ? t.valueFormat : t.type === "datetime" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"), c = n(() => t.width === "auto" ? {
      flex: 1
    } : {
      width: `${t.width || (t.type === "date" ? 150 : 200)}px !important`
    }), V = n(() => {
      var e;
      return t.start || ((e = a.value) == null ? void 0 : e.split("_")[0]) || "";
    }), D = n(() => {
      var e;
      return t.end || ((e = a.value) == null ? void 0 : e.split("_")[1]) || "";
    });
    return S(a, () => {
      m(() => {
        const e = a.value.split("_").filter((o) => o);
        e.length >= 2 && (a.value = `${dayjs(e[0]).format(i.value)}_${dayjs(e[1]).format(p.value)}`, d(a.value));
      });
    }, {
      immediate: !0,
      once: !0
    }), (e, o) => (F(), $("div", H, [
      y(r(g), h(e.$attrs, {
        "model-value": r(V),
        type: l.type,
        placeholder: l.startPlaceholder || "请选择开始时间",
        format: r(s),
        "value-format": r(i),
        style: r(c),
        "onUpdate:modelValue": v
      }), null, 16, ["model-value", "type", "placeholder", "format", "value-format", "style"]),
      w("span", P, x(l.separator), 1),
      y(r(g), h(e.$attrs, {
        "model-value": r(D),
        type: l.type,
        placeholder: l.endPlaceholder || "请选择结束时间",
        format: r(s),
        "value-format": r(p),
        style: r(c),
        "onUpdate:modelValue": _
      }), null, 16, ["model-value", "type", "placeholder", "format", "value-format", "style"])
    ]));
  }
};
export {
  N as default
};
