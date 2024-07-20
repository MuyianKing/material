import { openBlock as e, createElementBlock as r, toDisplayString as o } from "vue";
/* empty css           */
import a from "../_virtual/_plugin-vue_export-helper.js";
const c = { class: "id-card" }, d = {
  __name: "Index",
  props: {
    idCard: {
      type: String,
      default: ""
    }
  },
  setup(t) {
    return (s, n) => (e(), r("span", c, o(t.idCard), 1));
  }
}, m = /* @__PURE__ */ a(d, [["__scopeId", "data-v-63ee8c02"]]);
export {
  m as default
};
