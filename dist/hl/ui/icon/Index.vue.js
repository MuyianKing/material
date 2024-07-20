import { useCssVars as s, unref as o, computed as n, openBlock as p, createBlock as a } from "vue";
import { Icon as m } from "@iconify/vue";
import { getCanUseValue as i } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/common.js";
/* empty css           */
import u from "../_virtual/_plugin-vue_export-helper.js";
const f = {
  __name: "Index",
  props: {
    size: {
      type: [Number, String],
      default: "18px"
    },
    color: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    s((c) => ({
      "0292406a": o(r),
      "02251364": e.color
    }));
    const t = e, r = n(() => i(t.size));
    return (c, l) => (p(), a(o(m), { class: "hl-icon" }));
  }
}, g = /* @__PURE__ */ u(f, [["__scopeId", "data-v-b70ec4bf"]]);
export {
  g as default
};
