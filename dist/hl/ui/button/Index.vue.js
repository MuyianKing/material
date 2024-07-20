import { openBlock as e, createElementBlock as f, toDisplayString as a, createBlock as o, unref as u, mergeProps as c, withCtx as m, createCommentVNode as s, createTextVNode as y, renderSlot as k, createVNode as p } from "vue";
import { ElButton as b, ElTooltip as S } from "element-plus";
/* empty css                                                                                                                   */
/* empty css                                                                                                                        */
import l from "../icon/Index.vue.js";
/* empty css           */
import g from "../_virtual/_plugin-vue_export-helper.js";
const h = {
  key: 0,
  class: "add-button mx-1"
}, x = /* @__PURE__ */ Object.assign({
  name: "HlButton"
}, {
  __name: "Index",
  props: {
    icon: {
      type: String,
      default: ""
    },
    showIcon: {
      type: Boolean,
      default: !0
    },
    iconSize: {
      type: Number,
      default: 18
    },
    text: {
      type: String,
      default: ""
    },
    // button-按钮  icon-图标
    buttonType: {
      type: String,
      default: "button"
    },
    btnType: {
      type: String,
      default: "button"
    },
    placement: {
      type: String,
      default: "top"
    },
    type: {
      type: String,
      default: "primary"
    }
  },
  emits: ["click"],
  setup(t, { emit: r }) {
    const d = r;
    function i() {
      d("click");
    }
    return (n, C) => t.btnType === "link" ? (e(), f("span", h, a(t.text), 1)) : t.buttonType === "button" ? (e(), o(u(b), c({
      key: 1,
      type: t.type
    }, n.$attrs, { onClick: i }), {
      default: m(() => [
        t.icon && t.showIcon ? (e(), o(l, {
          key: 0,
          icon: t.icon,
          theme: "outline",
          class: "mr-1"
        }, null, 8, ["icon"])) : s("", !0),
        y(" " + a(t.text) + " ", 1),
        k(n.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["type"])) : t.text ? (e(), o(u(S), {
      key: 2,
      content: t.text,
      effect: "light",
      placement: t.placement
    }, {
      default: m(() => [
        p(l, c(n.$attrs, {
          icon: t.icon,
          size: t.iconSize,
          theme: "outline",
          class: "icon",
          onClick: i
        }), null, 16, ["icon", "size"])
      ]),
      _: 1
    }, 8, ["content", "placement"])) : (e(), o(l, c({ key: 3 }, n.$attrs, {
      icon: t.icon,
      size: t.iconSize,
      theme: "outline",
      class: "icon",
      onClick: i
    }), null, 16, ["icon", "size"]));
  }
}), E = /* @__PURE__ */ g(x, [["__scopeId", "data-v-d78e66b1"]]);
export {
  E as default
};
