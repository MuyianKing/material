import { inject as x, ref as w, computed as y, resolveComponent as u, openBlock as a, createBlock as i, withCtx as r, createVNode as d, createTextVNode as m, createElementVNode as V, unref as f, isRef as B, createElementBlock as C, Fragment as E, renderList as N, toDisplayString as H } from "vue";
import _ from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/storage.js";
import K from "../dialog/Index.vue.js";
import L from "../button/Index.vue.js";
/* empty css                */
import S from "../_virtual/_plugin-vue_export-helper.js";
const T = {
  __name: "EditHeader",
  props: {
    show: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close", "submit"],
  setup(h, { emit: v }) {
    const n = v, s = x("hlTableStore"), l = w([]), k = y(() => {
      const o = _.get(s.value.storageKey) || [];
      return s.value.columns.filter((e) => e.prop && e.label).map((e) => ({
        label: e.label,
        prop: e.prop,
        show: o.length === 0 || o.includes(e.prop)
      }));
    });
    function b() {
      _.set(s.value.storageKey, l.value), s.value.columns.forEach((o) => {
        o.show = !o.prop || l.value.includes(o.prop);
      }), n("submit"), p();
    }
    function p() {
      n("close");
    }
    return (o, c) => {
      const e = u("el-checkbox"), g = u("el-checkbox-group");
      return a(), i(K, {
        "model-value": h.show,
        width: "700px",
        title: "自定义表头",
        onClose: p
      }, {
        footer: r(() => [
          d(L, { onClick: b }, {
            default: r(() => [
              m(" 确认 ")
            ]),
            _: 1
          })
        ]),
        default: r(() => [
          V("div", null, [
            d(g, {
              modelValue: f(l),
              "onUpdate:modelValue": c[0] || (c[0] = (t) => B(l) ? l.value = t : null)
            }, {
              default: r(() => [
                (a(!0), C(E, null, N(f(k), (t) => (a(), i(e, {
                  key: t.prop,
                  value: t.prop,
                  checked: t.show
                }, {
                  default: r(() => [
                    m(H(t.label), 1)
                  ]),
                  _: 2
                }, 1032, ["value", "checked"]))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ]),
        _: 1
      }, 8, ["model-value"]);
    };
  }
}, $ = /* @__PURE__ */ S(T, [["__scopeId", "data-v-88f6f331"]]);
export {
  $ as default
};
