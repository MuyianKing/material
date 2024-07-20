import { openBlock as e, createBlock as o, unref as a, withCtx as c, createCommentVNode as p, createTextVNode as d, toDisplayString as i, renderSlot as l } from "vue";
import r from "../icon/Index.vue.js";
import { ElButton as u } from "element-plus";
/* empty css           */
import m from "../_virtual/_plugin-vue_export-helper.js";
const s = {
  __name: "Index",
  props: {
    icon: {
      type: Boolean,
      default: !1
    },
    text: {
      type: String,
      default: "导出"
    },
    type: {
      type: String,
      default: "button"
    }
  },
  setup(t) {
    return (n, f) => t.type === "button" ? (e(), o(a(u), {
      key: 0,
      type: "success"
    }, {
      default: c(() => [
        t.icon ? (e(), o(r, {
          key: 0,
          icon: "ph:export-bold",
          class: "mr-1"
        })) : p("", !0),
        d(" " + i(t.text) + " ", 1),
        l(n.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    })) : (e(), o(r, {
      key: 1,
      icon: "ph:export-bold",
      class: "mr-1 icon-item"
    }));
  }
}, b = /* @__PURE__ */ m(s, [["__scopeId", "data-v-8ad8da80"]]);
export {
  b as default
};
