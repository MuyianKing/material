import { openBlock as o, createBlock as n, withCtx as r, renderSlot as a } from "vue";
import c from "../button/Index.vue.js";
const d = {
  __name: "Index",
  props: {
    icon: {
      type: Boolean,
      default: !0
    },
    text: {
      type: String,
      default: "添加"
    }
  },
  setup(t) {
    return (e, i) => (o(), n(c, {
      type: "danger",
      icon: "icon-park-outline:add-one",
      "show-icon": t.icon,
      text: t.text
    }, {
      default: r(() => [
        a(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["show-icon", "text"]));
  }
};
export {
  d as default
};
