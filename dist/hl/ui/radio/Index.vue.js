import { openBlock as o, createBlock as r, unref as c, normalizeClass as f, withCtx as i, createElementBlock as p, Fragment as v, renderList as y, createTextVNode as g, toDisplayString as k } from "vue";
import { ElRadioGroup as V, ElRadio as h } from "element-plus";
/* empty css           */
import x from "../_virtual/_plugin-vue_export-helper.js";
const B = {
  __name: "Index",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    modelValue: {
      type: [String, Number, Boolean],
      default() {
        return "";
      }
    },
    empty: {
      type: Boolean,
      default() {
        return !1;
      }
    },
    // 每个选项是否一行显示
    line: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: d }) {
    const n = t, a = d;
    function m(e) {
      a("update:modelValue", e), a("change", e);
    }
    function s(e) {
      if (!n.empty)
        return;
      const u = n.modelValue;
      setTimeout(() => {
        u === e.value && a("update:modelValue", 0);
      });
    }
    return (e, u) => (o(), r(c(V), {
      "model-value": t.modelValue,
      class: f({ "line-item": t.line }),
      onChange: m
    }, {
      default: i(() => [
        (o(!0), p(v, null, y(t.options, (l) => (o(), r(c(h), {
          key: l.value,
          value: l.value,
          onClick: (_) => s(l)
        }, {
          default: i(() => [
            g(k(l.label), 1)
          ]),
          _: 2
        }, 1032, ["value", "onClick"]))), 128))
      ]),
      _: 1
    }, 8, ["model-value", "class"]));
  }
}, I = /* @__PURE__ */ x(B, [["__scopeId", "data-v-facbf046"]]);
export {
  I as default
};
