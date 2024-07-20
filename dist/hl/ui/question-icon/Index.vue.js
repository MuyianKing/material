import { openBlock as r, createBlock as n, unref as l, withCtx as t, renderSlot as a, createVNode as c, mergeProps as p } from "vue";
import m from "../icon/Index.vue.js";
import { ElTooltip as s } from "element-plus";
const _ = {
  __name: "Index",
  props: {
    placement: {
      type: String,
      default: "top"
    }
  },
  setup(o) {
    return (e, f) => (r(), n(l(s), {
      effect: "dark",
      placement: o.placement
    }, {
      content: t(() => [
        a(e.$slots, "default")
      ]),
      default: t(() => [
        c(m, p({
          icon: "mingcute:question-fill",
          class: "text-gray-600 cursor-pointer"
        }, e.$attrs), null, 16)
      ]),
      _: 3
    }, 8, ["placement"]));
  }
};
export {
  _ as default
};
