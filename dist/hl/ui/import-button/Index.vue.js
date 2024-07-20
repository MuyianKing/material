import { openBlock as o, createBlock as r, unref as a, withCtx as n, createVNode as l, createTextVNode as c, toDisplayString as p, renderSlot as f } from "vue";
import s from "../icon/Index.vue.js";
import { ElButton as i } from "element-plus";
const _ = {
  __name: "Index",
  props: {
    icon: {
      type: Boolean,
      default: !1
    },
    text: {
      type: String,
      default: "导入"
    }
  },
  setup(t) {
    return (e, m) => (o(), r(a(i), { color: "#626aef" }, {
      default: n(() => [
        l(s, {
          icon: "bx:import",
          class: "mr-1",
          style: { "font-size": "20px" }
        }),
        c(" " + p(t.text) + " ", 1),
        f(e.$slots, "default")
      ]),
      _: 3
    }));
  }
};
export {
  _ as default
};
