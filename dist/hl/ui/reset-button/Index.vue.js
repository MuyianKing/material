import { openBlock as f, createBlock as l, unref as o, mergeProps as a, withCtx as n, createVNode as r, createTextVNode as s, toDisplayString as m, renderSlot as c } from "vue";
import p from "../icon/Index.vue.js";
import { ElButton as u, ElPopconfirm as x } from "element-plus";
const h = {
  __name: "Index",
  props: {
    icon: {
      type: Boolean,
      default: !1
    },
    text: {
      type: String,
      default: "重置"
    },
    noConfirm: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["confirm"],
  setup(t, { emit: d }) {
    const y = d;
    function i() {
      y("confirm");
    }
    return (e, C) => t.noConfirm ? (f(), l(o(u), a({ key: 0 }, e.$attrs, {
      type: "warning",
      onClick: i
    }), {
      default: n(() => [
        r(p, {
          icon: "ri:refresh-line",
          class: "mr-1",
          style: { "font-size": "17px" }
        }),
        s(" " + m(t.text) + " ", 1),
        c(e.$slots, "default")
      ]),
      _: 3
    }, 16)) : (f(), l(o(x), {
      key: 1,
      title: "确定要重置所有筛选吗?",
      onConfirm: i
    }, {
      reference: n(() => [
        r(o(u), a(e.$attrs, { type: "warning" }), {
          default: n(() => [
            r(p, {
              icon: "ri:refresh-line",
              class: "mr-1",
              style: { "font-size": "17px" }
            }),
            s(" " + m(t.text) + " ", 1),
            c(e.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }));
  }
};
export {
  h as default
};
