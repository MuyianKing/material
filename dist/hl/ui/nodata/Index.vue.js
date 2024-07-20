import { useCssVars as n, computed as r, openBlock as i, createElementBlock as d, createElementVNode as o, unref as c, toDisplayString as l, renderSlot as m } from "vue";
import f from "../assets/img/no-data.png.js";
/* empty css           */
import u from "../_virtual/_plugin-vue_export-helper.js";
const p = { class: "no-data" }, g = ["src"], h = { class: "no-data-text" }, _ = {
  __name: "Index",
  props: {
    img: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "auto"
    },
    width: {
      type: String,
      default: "100%"
    },
    text: {
      type: String,
      default: "没有数据"
    }
  },
  setup(t) {
    n((e) => ({
      be026970: t.width,
      "650ba3e5": t.height
    }));
    const s = t, a = r(() => s.img || f);
    return (e, x) => (i(), d("div", p, [
      o("img", {
        class: "no-data-img",
        src: c(a)
      }, null, 8, g),
      o("div", h, l(t.text), 1),
      m(e.$slots, "default", {}, void 0, !0)
    ]));
  }
}, k = /* @__PURE__ */ u(_, [["__scopeId", "data-v-f03f70f8"]]);
export {
  k as default
};
