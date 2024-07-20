import { mergeModels as f, useModel as v, computed as s, openBlock as u, createBlock as i, unref as n, normalizeClass as y, withCtx as m, createElementBlock as _, Fragment as h, renderList as x, createTextVNode as g, toDisplayString as k } from "vue";
import { ElCheckboxGroup as C, ElCheckbox as b } from "element-plus";
/* empty css           */
import B from "../_virtual/_plugin-vue_export-helper.js";
const A = {
  __name: "Index",
  props: /* @__PURE__ */ f({
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: !0
    },
    // 每个选项是否一行显示
    line: {
      type: Boolean,
      default: !1
    }
  }, {
    modelValue: {
      type: [String, Array, Number],
      default() {
        return [];
      }
    },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(a) {
    const o = a, l = v(a, "modelValue");
    function p(e) {
      l.value = o.multiple ? e : e.pop() || "";
    }
    const c = s(() => {
      if (!l.value)
        return [];
      let e;
      return Array.isArray(l.value) ? e = l.value : typeof l.value == "number" ? e = [l.value] : e = l.value.toString().split(",").filter((t) => t), o.multiple ? e.map((t) => d.value[t]) || [] : e || [];
    }), d = s(() => {
      const e = {};
      return o.options.forEach((t) => {
        e[`${t.value}`] = t.value;
      }), e;
    });
    return (e, t) => (u(), i(n(C), {
      class: y({ "line-item": a.line }),
      "model-value": n(c),
      onChange: p
    }, {
      default: m(() => [
        (u(!0), _(h, null, x(a.options, (r) => (u(), i(n(b), {
          key: r.value,
          value: r.value
        }, {
          default: m(() => [
            g(k(r.label), 1)
          ]),
          _: 2
        }, 1032, ["value"]))), 128))
      ]),
      _: 1
    }, 8, ["class", "model-value"]));
  }
}, I = /* @__PURE__ */ B(A, [["__scopeId", "data-v-874d3e52"]]);
export {
  I as default
};
