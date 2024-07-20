import { openBlock as c, createBlock as i, unref as n, withCtx as r, createVNode as m } from "vue";
import l from "../icon/Index.vue.js";
import { ElTooltip as p } from "element-plus";
/* empty css           */
import a from "../_virtual/_plugin-vue_export-helper.js";
const s = {
  __name: "Index",
  emits: ["click"],
  setup(_, { emit: t }) {
    const o = t;
    function e() {
      o("click");
    }
    return (f, d) => (c(), i(n(p), {
      content: "修改",
      placement: "bottom",
      effect: "light"
    }, {
      default: r(() => [
        m(l, {
          class: "icon",
          icon: "uil:edit",
          onClick: e
        })
      ]),
      _: 1
    }));
  }
}, B = /* @__PURE__ */ a(s, [["__scopeId", "data-v-3b46d964"]]);
export {
  B as default
};
