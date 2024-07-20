import { useCssVars as c, unref as l, ref as r, onMounted as h, nextTick as p, resolveDirective as _, openBlock as a, createElementBlock as n, createVNode as b, withCtx as m, createElementVNode as i, renderSlot as o, withDirectives as v } from "vue";
import { ElForm as x } from "element-plus";
/* empty css           */
import g from "../_virtual/_plugin-vue_export-helper.js";
const w = { class: "flex flex-col h-full search-page" }, y = { class: "search-area" }, k = {
  key: 0,
  class: "fixed-button"
}, B = { class: "flex-1 bottom" }, $ = { class: "table-body" }, S = { class: "flex-shrink-0" }, z = {
  __name: "Index",
  props: {
    formSize: {
      type: String,
      default: "default"
    },
    labelWidth: {
      type: [Number, String],
      default: "auto"
    },
    loading: {
      type: Boolean,
      default: !1
    },
    fixedButton: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    c((e) => ({
      "2a32b261": l(s).width,
      "02549fec": l(s).height
    }));
    const u = t, d = r(), s = r({ width: 0, height: 0 });
    return h(() => {
      p(() => {
        u.fixedButton && (s.value = {
          width: `${d.value.clientWidth || 0}px`,
          height: `${d.value.clientHeight || 0}px`
        });
      });
    }), (e, E) => {
      const f = _("loading");
      return a(), n("div", w, [
        b(l(x), {
          size: t.formSize,
          "label-width": t.labelWidth
        }, {
          default: m(() => [
            i("div", y, [
              o(e.$slots, "header", {}, void 0, !0),
              t.fixedButton ? (a(), n("div", k, [
                i("div", {
                  ref_key: "button_wrapper",
                  ref: d,
                  class: "button-wrapper"
                }, [
                  o(e.$slots, "button", {}, void 0, !0)
                ], 512)
              ])) : o(e.$slots, "button", { key: 1 }, void 0, !0)
            ])
          ]),
          _: 3
        }, 8, ["size", "label-width"]),
        i("div", B, [
          v((a(), n("div", $, [
            o(e.$slots, "table", {}, void 0, !0)
          ])), [
            [f, t.loading]
          ]),
          i("div", S, [
            o(e.$slots, "default", {}, void 0, !0)
          ])
        ])
      ]);
    };
  }
}, D = /* @__PURE__ */ g(z, [["__scopeId", "data-v-a3996d04"]]);
export {
  D as default
};
