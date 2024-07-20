import { useCssVars as n, openBlock as o, createElementBlock as s, createElementVNode as l, normalizeClass as c, createCommentVNode as i, renderSlot as r, createTextVNode as a, toDisplayString as d } from "vue";
/* empty css           */
import f from "../_virtual/_plugin-vue_export-helper.js";
const u = { class: "flex h-full justify-between" }, m = { class: "flex h-full" }, y = { class: "title flex items-center justify-center" }, p = {
  __name: "Index",
  props: {
    type: {
      type: String,
      default: "primary"
    },
    title: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 16
    },
    showBlock: {
      type: Boolean,
      default: !0
    },
    color: {
      type: String,
      default: " #595757"
    }
  },
  setup(e) {
    return n((t) => ({
      d3ebbc82: e.color,
      ff577dd8: e.fontSize
    })), (t, h) => (o(), s("div", u, [
      l("div", m, [
        e.showBlock ? (o(), s("div", {
          key: 0,
          class: c(["block", e.type])
        }, null, 2)) : i("", !0),
        l("div", y, [
          r(t.$slots, "default", {}, () => [
            a(d(e.title), 1)
          ], !0)
        ])
      ]),
      l("div", null, [
        r(t.$slots, "after", {}, void 0, !0)
      ])
    ]));
  }
}, _ = /* @__PURE__ */ f(p, [["__scopeId", "data-v-6525559e"]]);
export {
  _ as default
};
