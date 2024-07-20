import { openBlock as o, createBlock as e } from "vue";
import n from "../button/Index.vue.js";
const l = {
  __name: "Index",
  props: {
    icon: {
      type: Boolean,
      default: !1
    },
    text: {
      type: String,
      default: "查看"
    }
  },
  setup(t) {
    return (c, i) => (o(), e(n, {
      icon: "icon-park-outline:find",
      text: t.text,
      "show-icon": t.icon,
      "button-type": "icon"
    }, null, 8, ["text", "show-icon"]));
  }
};
export {
  l as default
};
