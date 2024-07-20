import { useCssVars as y, ref as s, reactive as v, watch as V, openBlock as t, createElementBlock as o, normalizeClass as k, normalizeStyle as B, unref as a, createBlock as b, isRef as x, Fragment as S, toDisplayString as f, nextTick as w } from "vue";
import { ElInput as E } from "element-plus";
/* empty css           */
import z from "../_virtual/_plugin-vue_export-helper.js";
const C = { key: 0 }, D = { key: 1 }, I = {
  __name: "Index",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    width: {
      type: String,
      default: "100%"
    },
    // 对齐方式
    align: {
      type: String,
      default: "left"
    },
    // 是否可编辑
    editable: {
      type: Boolean,
      default: !0
    },
    // 没有值时的提示信息
    placeholder: {
      type: String,
      default: ""
    },
    // 值为0时是否置为空字符串
    zeroToEmpty: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "change"],
  setup(l, { emit: p }) {
    y((u) => ({
      d82e5610: l.align
    }));
    const n = l, d = p, e = s(""), i = v({
      editing: !1
    });
    V(() => n.modelValue, (u) => {
      e.value = u;
    }, {
      immediate: !0
    });
    const r = s();
    function g() {
      n.editable && (n.zeroToEmpty && e.value === 0 && (e.value = ""), i.editing = !0, w(() => {
        r.value.focus();
      }));
    }
    const c = useDebounceFn(() => {
      i.editing = !1, e.value = e.value.trim(), d("update:modelValue", e.value), e.value !== n.modelValue && d("change", e.value);
    }, 200);
    return (u, m) => (t(), o("div", {
      class: k(["cell-item", { "cursor-pointer": l.editable }]),
      style: B({ width: l.width, textAlign: l.align }),
      onDblclick: g
    }, [
      a(i).editing ? (t(), b(a(E), {
        key: 0,
        ref_key: "input_ref",
        ref: r,
        modelValue: a(e),
        "onUpdate:modelValue": m[0] || (m[0] = (h) => x(e) ? e.value = h : null),
        placeholder: l.placeholder,
        onBlur: a(c),
        onChange: a(c)
      }, null, 8, ["modelValue", "placeholder", "onBlur", "onChange"])) : (t(), o(S, { key: 1 }, [
        l.modelValue !== "" ? (t(), o("span", C, f(l.modelValue), 1)) : (t(), o("span", D, f(l.placeholder), 1))
      ], 64))
    ], 38));
  }
}, R = /* @__PURE__ */ z(I, [["__scopeId", "data-v-e58d5187"]]);
export {
  R as default
};
