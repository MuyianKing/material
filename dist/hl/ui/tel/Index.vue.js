import { openBlock as e, createElementBlock as o, toDisplayString as r } from "vue";
/* empty css           */
import s from "../_virtual/_plugin-vue_export-helper.js";
const c = { class: "tel" }, n = {
  __name: "Index",
  props: {
    tel: {
      type: String,
      default: ""
    }
  },
  setup(t) {
    return (p, a) => (e(), o("span", c, r(t.tel), 1));
  }
}, i = /* @__PURE__ */ s(n, [["__scopeId", "data-v-222e8d2d"]]);
export {
  i as default
};
