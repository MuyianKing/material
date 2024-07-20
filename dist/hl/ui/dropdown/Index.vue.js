import { mergeModels as C, useModel as z, ref as k, computed as p, watch as F, resolveComponent as G, openBlock as n, createBlock as i, unref as u, withCtx as d, createElementVNode as x, createElementBlock as y, createVNode as h, isRef as S, createCommentVNode as b, Fragment as _, renderList as B, createTextVNode as E, normalizeClass as w, toDisplayString as I, nextTick as D } from "vue";
import { getLabelByVal as H } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/common.js";
import { ElDropdown as K, ElScrollbar as O, ElCheckbox as N, ElCheckboxGroup as R, ElDropdownMenu as q, ElDropdownItem as M } from "element-plus";
import { HlIcon as J } from "../icon/index.js";
/* empty css           */
import P from "../_virtual/_plugin-vue_export-helper.js";
const Q = { class: "flex flex-col" }, W = {
  key: 0,
  class: "px-2 pt-2"
}, X = {
  key: 0,
  class: "px-4"
}, Y = {
  __name: "Index",
  props: /* @__PURE__ */ C({
    // 待选项
    options: {
      type: Array,
      default: () => []
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: !1
    },
    label: {
      type: String,
      default: ""
    },
    // 是否可搜索
    hasSearch: {
      type: Boolean,
      default: !1
    },
    noAll: {
      type: Boolean,
      default: !1
    },
    // 箭头
    noArrow: {
      type: Boolean,
      default: !1
    }
  }, {
    modelValue: {
      type: [Array, String, Number],
      default: void 0
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ C(["change"], ["update:modelValue"]),
  setup(s, { emit: $ }) {
    const o = s, A = $, l = z(s, "modelValue");
    typeof l.value > "u" && (l.value = o.multiple ? [] : "");
    const V = k(!1), f = k(""), r = p(() => o.options.filter((t) => t.label.includes(f.value)));
    async function g(t) {
      if (!o.multiple)
        l.value = t;
      else {
        const e = [...m.value].filter((c) => !!c);
        e.includes(t.value) ? e.splice(e.indexOf(t.value), 1) : e.push(t.value), Array.isArray(l.value) ? l.value = e : l.value = e.join(",");
      }
      await D(), A("change", l.value);
    }
    const v = k(!1);
    function j(t) {
      t ? l.value = Array.isArray(l.value) ? r.value.map((e) => e.value) : r.value.map((e) => e.value).join(",") : l.value = Array.isArray(l.value) ? [] : "", D(() => {
        v.value = t, A("change", l.value);
      });
    }
    const m = p(() => {
      if (!o.multiple)
        return l.value;
      let t;
      return Array.isArray(l.value) ? t = l.value : typeof l.value == "number" || typeof l.value == "string" ? t = l.value.toString().split(",").map((e) => {
        const c = r.value.findIndex((a) => a.value === e);
        return c !== -1 ? r.value[c].value : "";
      }).filter((e) => !!e) : t = [], t;
    });
    o.multiple && F(() => m.value.length, (t) => {
      v.value = t === r.value.length;
    }, { immediate: !0 });
    const L = p(() => o.multiple ? m.value.length > 0 : l.value !== "" && l.value !== null && typeof l.value < "u"), T = p(() => o.multiple ? o.label : H(r.value, l.value) || o.label);
    return (t, e) => {
      const c = G("el-input");
      return n(), i(u(K), {
        trigger: "click",
        onVisibleChange: e[4] || (e[4] = (a) => {
          V.value = a;
        })
      }, {
        dropdown: d(() => [
          x("div", Q, [
            s.hasSearch ? (n(), y("div", W, [
              h(c, {
                modelValue: u(f),
                "onUpdate:modelValue": e[0] || (e[0] = (a) => S(f) ? f.value = a : null),
                class: "w-full flex-1",
                clearable: "",
                placeholder: "请输入关键字快速搜索",
                onInput: e[1] || (e[1] = (a) => v.value = !1)
              }, null, 8, ["modelValue"])
            ])) : b("", !0),
            h(u(O), {
              class: "py-1",
              "max-height": "280"
            }, {
              default: d(() => [
                s.multiple ? (n(), y("div", X, [
                  s.noAll ? b("", !0) : (n(), i(u(N), {
                    key: 0,
                    modelValue: u(v),
                    "onUpdate:modelValue": e[2] || (e[2] = (a) => S(v) ? v.value = a : null),
                    class: "mr-0",
                    label: "全部",
                    onChange: j
                  }, null, 8, ["modelValue"])),
                  h(u(R), {
                    "model-value": u(m),
                    class: "flex flex-col"
                  }, {
                    default: d(() => [
                      (n(!0), y(_, null, B(u(r), (a) => (n(), i(u(N), {
                        key: a.value,
                        disabled: a.disabled,
                        label: a.label,
                        value: a.value,
                        class: "mr-0",
                        onClick: (U) => g(a)
                      }, null, 8, ["disabled", "label", "value", "onClick"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["model-value"])
                ])) : (n(), i(u(q), { key: 1 }, {
                  default: d(() => [
                    s.noAll ? b("", !0) : (n(), i(u(M), {
                      key: 0,
                      onClick: e[3] || (e[3] = (a) => g(""))
                    }, {
                      default: d(() => [
                        E(" 全部 ")
                      ]),
                      _: 1
                    })),
                    (n(!0), y(_, null, B(u(r), (a) => (n(), i(u(M), {
                      key: a.value,
                      class: w({ active: a.value === l.value }),
                      onClick: (U) => g(a.value)
                    }, {
                      default: d(() => [
                        E(I(a.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["class", "onClick"]))), 128))
                  ]),
                  _: 1
                }))
              ]),
              _: 1
            })
          ])
        ]),
        default: d(() => [
          x("div", {
            class: w([{ "active-label": u(L) }, "flex items-center dropdown-label"])
          }, [
            x("span", null, I(u(T)), 1),
            s.noArrow ? b("", !0) : (n(), i(u(J), {
              key: 0,
              class: w([{ "deg-180": u(V) }, "arrow-icon ml-1"]),
              icon: "iconamoon:arrow-down-2-thin"
            }, null, 8, ["class"]))
          ], 2)
        ]),
        _: 1
      });
    };
  }
}, ne = /* @__PURE__ */ P(Y, [["__scopeId", "data-v-69406e15"]]);
export {
  ne as default
};
