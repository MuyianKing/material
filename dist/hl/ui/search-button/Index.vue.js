import { openBlock as o, createBlock as n, withCtx as r, renderSlot as c } from "vue";
import a from "../button/Index.vue.js";
const s = {
  __name: "Index",
  props: {
    icon: {
      type: Boolean,
      default: !0
    },
    text: {
      type: String,
      default: "查询"
    }
  },
  setup(t) {
    return (e, i) => (o(), n(a, {
      icon: "lucide:search",
      "show-icon": t.icon,
      text: t.text
    }, {
      default: r(() => [
        c(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["show-icon", "text"]));
  }
};
export {
  s as default
};
