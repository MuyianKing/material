import { computed as i, openBlock as n, createElementBlock as p, normalizeClass as l, createElementVNode as d, toDisplayString as c, unref as o, createCommentVNode as m } from "vue";
/* empty css           */
import f from "../_virtual/_plugin-vue_export-helper.js";
const _ = { class: "word-no-wrap" }, u = {
  key: 0,
  class: "ml-1 word-no-wrap"
}, w = {
  __name: "Index",
  props: {
    time: {
      type: String,
      default: ""
    },
    separator: {
      type: String,
      default: " "
    },
    nowrap: {
      type: Boolean,
      default: !1
    }
  },
  setup(r) {
    const a = r, e = i(() => {
      var t;
      return ((t = a.time) == null ? void 0 : t.split(a.separator).filter((s) => s)) || ["", ""];
    });
    return (t, s) => (n(), p("div", {
      class: l([{ "flex-wrap": !r.nowrap }, "flex justify-center"])
    }, [
      d("div", _, c(o(e)[0] || ""), 1),
      o(e)[1] ? (n(), p("div", u, c(o(e)[1] || ""), 1)) : m("", !0)
    ], 2));
  }
}, g = /* @__PURE__ */ f(w, [["__scopeId", "data-v-3e9bda2d"]]);
export {
  g as default
};
