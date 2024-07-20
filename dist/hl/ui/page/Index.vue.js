import { computed as c, openBlock as l, createElementBlock as i, unref as o, createElementVNode as s, toDisplayString as r, createTextVNode as f, Fragment as N, createCommentVNode as d, createVNode as V, pushScopeId as b, popScopeId as S } from "vue";
import { ElPagination as k } from "element-plus";
import { pageSize as v } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/common.js";
/* empty css           */
import x from "../_virtual/_plugin-vue_export-helper.js";
const m = (t) => (b("data-v-f1c80eb4"), t = t(), S(), t), I = {
  key: 0,
  class: "pagination-wrapper"
}, P = {
  key: 0,
  class: "info"
}, B = /* @__PURE__ */ m(() => /* @__PURE__ */ s("span", null, "共", -1)), C = { class: "num" }, E = /* @__PURE__ */ m(() => /* @__PURE__ */ s("span", null, "条，当前第", -1)), w = { class: "num" }, U = /* @__PURE__ */ m(() => /* @__PURE__ */ s("span", null, "条", -1)), D = {
  __name: "Index",
  props: {
    // 总条数
    count: {
      type: Number,
      default: 0
    },
    // 每页个数
    size: {
      type: Number,
      default: v
    },
    sizes: {
      type: Boolean,
      default: !1
    },
    modelValue: {
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    }
  },
  emits: ["update:modelValue", "update:size", "change", "update:page"],
  setup(t, { emit: _ }) {
    const a = t, n = _;
    function h(e) {
      n("update:modelValue", e), n("update:page", e), n("change");
    }
    function z(e) {
      console.log(e), n("update:size", e), n("change");
    }
    const u = c(() => a.page - 1 === 0 ? a.modelValue : a.page), g = c(() => a.size * (u.value - 1) + 1), p = c(() => a.count > a.size * u.value ? u.value * a.size : a.count), y = c(() => {
      let e = "prev, pager, next";
      return a.sizes && (e = `sizes,${e}`), e;
    });
    return (e, F) => t.count ? (l(), i("div", I, [
      o(p) ? (l(), i("div", P, [
        B,
        s("span", C, r(t.count), 1),
        E,
        s("span", w, [
          f(r(o(g)) + " ", 1),
          o(g) !== o(p) ? (l(), i(N, { key: 0 }, [
            f("~" + r(o(p)), 1)
          ], 64)) : d("", !0)
        ]),
        U
      ])) : d("", !0),
      V(o(k), {
        "current-page": o(u),
        layout: o(y),
        "page-size": t.size,
        total: t.count,
        background: "",
        "hide-on-single-page": "",
        "onUpdate:currentPage": h,
        "onUpdate:pageSize": z
      }, null, 8, ["current-page", "layout", "page-size", "total"])
    ])) : d("", !0);
  }
}, G = /* @__PURE__ */ x(D, [["__scopeId", "data-v-f1c80eb4"]]);
export {
  G as default
};
