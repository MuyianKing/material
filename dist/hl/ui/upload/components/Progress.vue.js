import { useSlots as p, resolveComponent as a, openBlock as s, createBlock as t, Teleport as n, withDirectives as l, createElementVNode as o, renderSlot as i, unref as u, createCommentVNode as _, vShow as g, pushScopeId as m, popScopeId as f } from "vue";
/* empty css              */
import h from "../../_virtual/_plugin-vue_export-helper.js";
const v = (e) => (m("data-v-b2d87040"), e = e(), f(), e), w = { class: "progress-shadow" }, S = { class: "progress-body" }, b = /* @__PURE__ */ v(() => /* @__PURE__ */ o("div", { class: "title" }, " 正在上传... ", -1)), y = {
  __name: "Progress",
  props: {
    show: {
      type: Boolean,
      default: !1
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const r = p();
    return (c, k) => {
      const d = a("el-progress");
      return s(), t(n, { to: "body" }, [
        l(o("div", w, [
          o("div", S, [
            b,
            i(c.$slots, "default", { percentage: e.progress }, void 0, !0),
            u(r).default ? _("", !0) : (s(), t(d, {
              key: 0,
              "text-inside": "",
              "stroke-width": 20,
              percentage: e.progress,
              class: "progress"
            }, null, 8, ["percentage"]))
          ])
        ], 512), [
          [g, e.show]
        ])
      ]);
    };
  }
}, N = /* @__PURE__ */ h(y, [["__scopeId", "data-v-b2d87040"]]);
export {
  N as default
};
