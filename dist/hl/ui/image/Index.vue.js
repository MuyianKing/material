import { useCssVars as a, computed as n, resolveDirective as p, openBlock as c, createElementBlock as f, unref as r, createBlock as u, withCtx as d, withDirectives as v, createElementVNode as m, createCommentVNode as w, renderSlot as h } from "vue";
import { ElImage as g } from "element-plus";
/* empty css           */
import _ from "../_virtual/_plugin-vue_export-helper.js";
const x = { class: "hl-preview-img" }, y = {
  class: "w-full h-full",
  "element-loading-text": "加载中..."
}, S = {
  __name: "Index",
  props: {
    src: {
      type: String,
      default: ""
    },
    prefix: {
      type: String,
      default: ""
    },
    preview: {
      type: Array,
      default() {
        return [];
      }
    },
    notPreview: {
      type: Boolean,
      default: !1
    },
    fit: {
      type: String,
      default: "contain"
    },
    height: {
      type: String,
      default: "100px"
    },
    width: {
      type: String,
      default: "100px"
    }
  },
  setup(t) {
    a((l) => ({
      "6ca6efe2": t.height,
      c8088c44: t.width
    }));
    function k() {
    }
    const e = t, i = n(() => e.src ? (e.src, e.prefix, void 0) : ""), o = n(() => e.notPreview ? [] : e.preview && e.preview.length > 0 ? e.preview : [i.value]);
    return (l, B) => {
      const s = p("loading");
      return c(), f("div", x, [
        r(i) ? (c(), u(r(g), {
          key: 0,
          fit: t.fit,
          "preview-src-list": r(o),
          src: r(i),
          class: "w-full h-full",
          "preview-teleported": ""
        }, {
          placeholder: d(() => [
            v(m("div", y, null, 512), [
              [s, !0]
            ])
          ]),
          _: 1
        }, 8, ["fit", "preview-src-list", "src"])) : w("", !0),
        h(l.$slots, "default", {}, void 0, !0)
      ]);
    };
  }
}, D = /* @__PURE__ */ _(S, [["__scopeId", "data-v-5e875987"]]);
export {
  D as default
};
