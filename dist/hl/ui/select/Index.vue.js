import { computed as x, getCurrentInstance as E, resolveDirective as b, openBlock as e, createBlock as o, unref as r, withCtx as p, withDirectives as v, createElementBlock as c, createTextVNode as S, createCommentVNode as C, Fragment as s, renderList as h, createElementVNode as N } from "vue";
import { ElSelect as I, ElOption as m, ElOptionGroup as w } from "element-plus";
/* empty css           */
import A from "../_virtual/_plugin-vue_export-helper.js";
const D = { class: "relative" }, O = { class: "loading-item" }, F = {
  __name: "Index",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    apiUrl: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number, Array],
      default() {
        return "";
      }
    },
    placeholder: {
      type: String,
      default: ""
    },
    clearable: {
      type: Boolean,
      default: !0
    },
    // 显示全部
    all: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "blur", "change", "bottom"],
  setup(t, { emit: g }) {
    const f = t, n = g, y = x(() => {
      var d, u;
      if (f.placeholder)
        return f.placeholder;
      const l = E();
      return (u = (d = l == null ? void 0 : l.parent) == null ? void 0 : d.props) != null && u.label ? `请选择${l.parent.props.label.replace("：", "").replace(":", "")}` : "请选择";
    });
    function _(l) {
      n("update:modelValue", l), n("change", l);
    }
    function k() {
      n("blur");
    }
    function B() {
      n("bottom");
    }
    return (l, d) => {
      const u = b("loadmore"), V = b("loading");
      return e(), o(r(I), {
        "model-value": t.modelValue,
        placeholder: r(y),
        clearable: t.clearable,
        filterable: "",
        onChange: _,
        onBlur: k
      }, {
        default: p(() => [
          v((e(), c("div", D, [
            t.all ? (e(), o(r(m), {
              key: 0,
              value: ""
            }, {
              default: p(() => [
                S(" 全部 ")
              ]),
              _: 1
            })) : C("", !0),
            (e(!0), c(s, null, h(t.options, (a) => (e(), c(s, {
              key: a.value
            }, [
              a.children ? (e(), o(r(w), {
                key: 0,
                label: a.label
              }, {
                default: p(() => [
                  (e(!0), c(s, null, h(a.children, (i) => (e(), o(r(m), {
                    key: i.value,
                    label: i.label,
                    value: i.value
                  }, null, 8, ["label", "value"]))), 128))
                ]),
                _: 2
              }, 1032, ["label"])) : (e(), o(r(m), {
                key: 1,
                label: a.label,
                value: a.value
              }, null, 8, ["label", "value"]))
            ], 64))), 128))
          ])), [
            [u, B]
          ]),
          v(N("div", O, null, 512), [
            [V, t.loading]
          ])
        ]),
        _: 1
      }, 8, ["model-value", "placeholder", "clearable"]);
    };
  }
}, $ = /* @__PURE__ */ A(F, [["__scopeId", "data-v-4df3750a"]]);
export {
  $ as default
};
