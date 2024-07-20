import { ref as d, resolveComponent as v, openBlock as x, createBlock as _, unref as a, withCtx as o, createElementVNode as l, createVNode as n, toDisplayString as k, createTextVNode as r } from "vue";
import b from "../button/Index.vue.js";
import { ElPopover as y } from "element-plus";
/* empty css           */
import g from "../_virtual/_plugin-vue_export-helper.js";
const C = { class: "text-center mt-2" }, B = { class: "inline-flex" }, S = {
  __name: "Index",
  props: {
    message: {
      type: String,
      default: "您确定确认删除？"
    },
    noPopover: {
      type: Boolean,
      default: !1
    },
    placement: {
      type: String,
      default: "top"
    },
    text: {
      type: String,
      default: "删除"
    }
  },
  emits: ["click"],
  setup(e, { emit: p }) {
    const m = e, i = p, t = d(!1);
    function u() {
      t.value = !1, i("click");
    }
    function f() {
      m.noPopover ? i("click") : t.value = !0;
    }
    return (h, c) => {
      const s = v("el-button");
      return x(), _(a(y), {
        placement: e.placement,
        visible: a(t)
      }, {
        reference: o(() => [
          l("div", B, [
            n(b, {
              text: e.text,
              "button-type": "icon",
              class: "del-icon",
              icon: "icon-park-outline:delete",
              onClick: f
            }, null, 8, ["text"])
          ])
        ]),
        default: o(() => [
          l("div", null, [
            l("p", null, k(e.message), 1),
            l("div", C, [
              n(s, {
                size: "small",
                type: "danger",
                onClick: c[0] || (c[0] = (N) => t.value = !1)
              }, {
                default: o(() => [
                  r(" 取消 ")
                ]),
                _: 1
              }),
              n(s, {
                size: "small",
                type: "primary",
                onClick: u
              }, {
                default: o(() => [
                  r(" 确定 ")
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }, 8, ["placement", "visible"]);
    };
  }
}, I = /* @__PURE__ */ g(S, [["__scopeId", "data-v-dc30b8b4"]]);
export {
  I as default
};
