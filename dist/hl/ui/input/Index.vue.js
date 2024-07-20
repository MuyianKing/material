import { mergeModels as k, ref as o, getCurrentInstance as M, computed as f, useModel as S, openBlock as B, createElementBlock as E, Fragment as I, createVNode as h, unref as n, mergeProps as L, createSlots as R, withCtx as s, renderSlot as m, createElementVNode as V } from "vue";
import { ElInput as C, ElPopover as _ } from "element-plus";
const z = ["innerHTML"], P = {
  __name: "Index",
  props: /* @__PURE__ */ k({
    // 提示信息,不填取 请输入+父组件的label属性值
    placeholder: {
      type: String,
      default: ""
    },
    // 指引内容
    tip: {
      type: String,
      default: ""
    },
    // 指引标题，不填取父组件的label属性值
    tipLabel: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(i) {
    const l = i, d = o(""), r = o(!1), g = o({
      getBoundingClientRect() {
        return u.value;
      }
    }), u = o({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    });
    function v(e) {
      const t = e.target.parentNode;
      if (l.tip) {
        const { top: c, left: $ } = t.getBoundingClientRect();
        u.value = DOMRect.fromRect({
          width: 0,
          height: 0,
          x: $ + t.clientWidth / 2,
          y: c
        }), a.parent.vnode.el && (d.value = t.clientWidth), r.value = !0;
      }
    }
    function b() {
      r.value = !1;
    }
    const a = M(), y = f(() => {
      var e, t;
      return l.placeholder ? l.placeholder : (t = (e = a.parent) == null ? void 0 : e.props) != null && t.label ? `请输入${a.parent.props.label.replace("：", "").replace(":", "") || ""}` : "请输入";
    }), w = f(() => {
      const e = [], t = l.tipLabel || "提示";
      return t && e.push(`<div style="color:#feb059;width:100%;font-size:15px;font-weight:bold;"><span style="width:16px;height:16px;font-weight:600;line-height:16px;font-size:14px;border-radius:50%;background-color:#feb059;margin-right:5px;display:inline-block;text-align:center;color:white">?</span>${t}</div>`), e.push(`<div style="width:100%;font-size:14px;">${l.tip}</div>`), e.join("<br/>");
    }), p = S(i, "modelValue");
    function x(e) {
      l.type === "number" ? p.value = e === "" ? "" : +e : p.value = e;
    }
    return (e, t) => (B(), E(I, null, [
      h(n(C), L({
        "model-value": p.value,
        placeholder: n(y),
        type: i.type,
        clearable: "",
        "show-word-limit": ""
      }, e.$attrs, {
        onBlur: b,
        onFocus: v,
        onInput: x
      }), R({ _: 2 }, [
        e.$slots.prefix ? {
          name: "prefix",
          fn: s(() => [
            m(e.$slots, "prefix")
          ]),
          key: "0"
        } : void 0,
        e.$slots.append ? {
          name: "suffix",
          fn: s(() => [
            m(e.$slots, "append")
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["model-value", "placeholder", "type"]),
      h(n(_), {
        "virtual-ref": n(g),
        visible: n(r),
        width: n(d),
        placement: "top",
        "virtual-triggering": ""
      }, {
        default: s(() => [
          V("div", { innerHTML: n(w) }, null, 8, z)
        ]),
        _: 1
      }, 8, ["virtual-ref", "visible", "width"])
    ], 64));
  }
};
export {
  P as default
};
