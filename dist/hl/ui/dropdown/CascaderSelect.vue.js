import { mergeModels as b, useModel as N, ref as i, computed as f, openBlock as p, createBlock as V, unref as t, withCtx as w, createElementVNode as m, normalizeClass as h, createElementBlock as P, createVNode as C, isRef as E, createCommentVNode as k, toDisplayString as D, nextTick as I } from "vue";
import { getLabelByVal as M } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/common.js";
import { cloneDeep as O } from "lodash-es";
import { ElDropdown as R, ElInput as j, ElCascaderPanel as F } from "element-plus";
import { HlIcon as U } from "../icon/index.js";
/* empty css                    */
import _ from "../_virtual/_plugin-vue_export-helper.js";
const z = {
  key: 0,
  class: "mb-2"
}, H = {
  __name: "CascaderSelect",
  props: /* @__PURE__ */ b({
    // 待选项
    options: {
      type: Array,
      default: () => []
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: !1
    },
    label: {
      type: String,
      default: ""
    },
    // 是否可搜索
    hasSearch: {
      type: Boolean,
      default: !1
    },
    noAll: {
      type: Boolean,
      default: !1
    },
    // 箭头
    noArrow: {
      type: Boolean,
      default: !1
    },
    cascaderProps: {
      type: Object,
      default: () => ({})
    },
    cascaderAttrs: {
      type: Object,
      default: () => ({})
    }
  }, {
    modelValue: {
      type: [Array, String, Number],
      default: ""
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ b(["change"], ["update:modelValue"]),
  setup(n, { emit: S }) {
    const r = n, v = S, a = {
      multiple: r.multiple,
      checkStrictly: !1,
      emitPath: !1,
      label: "label",
      value: "value",
      children: "children",
      ...r.cascaderProps
    }, o = N(n, "modelValue"), c = i(null), y = i(!1), u = i(""), g = f(() => {
      const l = O(r.options);
      if (!r.noAll) {
        const e = {};
        e[a.label] = "全部", e[a.value] = "", l.unshift(e);
      }
      return l.filter((e) => d(e));
    });
    function d(l) {
      return l[a.label] && l[a.label].includes(u.value) ? !0 : l[a.children] && Array.isArray(l[a.children]) ? (l[a.children] = l[a.children].filter((e) => d(e)), l[a.children].some((e) => d(e))) : !1;
    }
    async function A() {
      if (await I(), a.multiple) {
        if (o.value.includes("")) {
          c.value.clearCheckedNodes();
          return;
        }
        v("change", c.value.getCheckedNodes().map((l) => l.data));
      } else
        v("change", c.value.getCheckedNodes()[0].data);
    }
    const x = f(() => a.multiple ? o.value.length > 0 : o.value !== "" && o.value !== null && typeof o.value < "u"), B = f(() => r.multiple ? r.label : M(g.value, o.value) || r.label);
    return (l, e) => (p(), V(t(R), {
      trigger: "click",
      onVisibleChange: e[2] || (e[2] = (s) => {
        y.value = s;
      })
    }, {
      dropdown: w(() => [
        m("div", {
          class: h([{ "p-2": n.hasSearch }, "flex flex-col"])
        }, [
          n.hasSearch ? (p(), P("div", z, [
            C(t(j), {
              modelValue: t(u),
              "onUpdate:modelValue": e[0] || (e[0] = (s) => E(u) ? u.value = s : null),
              placeholder: "请输入关键字快速搜索"
            }, null, 8, ["modelValue"])
          ])) : k("", !0),
          C(t(F), {
            ref_key: "cascaderPanelRef",
            ref: c,
            modelValue: o.value,
            "onUpdate:modelValue": e[1] || (e[1] = (s) => o.value = s),
            options: t(g),
            props: a,
            style: { width: "fit-content" },
            onChange: A
          }, null, 8, ["modelValue", "options"])
        ], 2)
      ]),
      default: w(() => [
        m("div", {
          class: h([{ "active-label": t(x) }, "flex items-center dropdown-label"])
        }, [
          m("span", null, D(t(B)), 1),
          n.noArrow ? k("", !0) : (p(), V(t(U), {
            key: 0,
            class: h([{ "deg-180": t(y) }, "arrow-icon ml-1"]),
            icon: "iconamoon:arrow-down-2-thin"
          }, null, 8, ["class"]))
        ], 2)
      ]),
      _: 1
    }));
  }
}, W = /* @__PURE__ */ _(H, [["__scopeId", "data-v-9b6e5542"]]);
export {
  W as default
};
