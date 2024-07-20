import { ref as x, onMounted as E, computed as B, resolveDirective as D, withDirectives as H, openBlock as W, createElementBlock as X, createElementVNode as Y, normalizeStyle as A, unref as I, renderSlot as z, nextTick as $ } from "vue";
/* empty css           */
import V from "../_virtual/_plugin-vue_export-helper.js";
const C = {
  __name: "Index",
  props: {
    // 是否开启自动滚动
    auto: {
      type: Boolean,
      default: !1
    },
    // 自动滚动每次只滚动一个元素，间隔interval后再次滚动，单位毫秒，0一直滚动
    interval: {
      type: Number,
      default: 0
    },
    // 滚动一个元素所需事件单位秒
    speed: {
      type: Number,
      default: 1
    },
    hoverStop: {
      type: Boolean,
      default: !0
    },
    // 滚动方向：vertical：垂直  horizontal-水平
    direction: {
      type: String,
      default: "horizontal"
    }
  },
  setup(N) {
    const n = N, l = x(), t = x();
    let a = 0;
    E(() => {
      n.direction === "vertical" ? a = -(l.value.scrollHeight - l.value.clientHeight) : a = -(l.value.scrollWidth - l.value.clientWidth);
    });
    let v = 0, s = 0;
    function _(e) {
      const i = n.direction === "vertical" ? e.clientY : e.clientX, r = v === 0 ? 1 : i - v;
      v = i, s = s + r, s < a ? s = a : s > 0 && (s = 0);
      const p = n.direction === "vertical" ? "translateY" : "translateX";
      t.value.style.transform = `${p}(${s}px)`;
    }
    function S() {
      v = 0, t.value.style["user-select"] = "none", l.value.addEventListener("mousemove", _);
    }
    function h() {
      t.value.style["user-select"] = "", l.value.removeEventListener("mousemove", _);
    }
    let u = 0, d = 0, c = 0, o = 1, y = 0;
    function m() {
      d = setTimeout(() => {
        if (!t.value) {
          m();
          return;
        }
        b(), m();
      }, n.interval || n.speed * 1e3);
    }
    function b() {
      if (!t.value)
        return;
      const e = t.value.children;
      u -= L(e[c]) * o;
      const i = n.direction === "vertical" ? "translateY" : "translateX";
      y = Date.now(), t.value.style.transform = `${i}(${u}px)`, c += o, o === 1 && u <= a ? o = -1 : o === -1 && u >= 0 && (o = 1);
    }
    function L(e) {
      return n.direction === "vertical" ? e.clientHeight + g(e, n.direction) : e.clientWidth + g(e, n.direction);
    }
    function g(e, i) {
      const r = getComputedStyle(e);
      return i === "vertical" ? Number.parseFloat(r["margin-top"].replace("px", "")) + Number.parseFloat(r["margin-bottom"].replace("px", "")) : Number.parseFloat(r["margin-left"].replace("px", "")) + Number.parseFloat(r["margin-right"].replace("px", ""));
    }
    function k() {
      useEventListener(l.value, "mousedown", S), useEventListener(l.value, "mouseleave", h), useEventListener(l.value, "mouseup", h);
    }
    function w() {
      n.hoverStop && (useEventListener(l.value, "mouseenter", () => f(!1)), useEventListener(l.value, "mouseleave", () => f(!0)));
    }
    function F() {
      $(() => {
        n.auto ? (t.value.style.transition = `all linear ${n.speed}s`, w()) : k();
        let e = "visible";
        setInterval(() => {
          const i = document.visibilityState;
          e !== i && (f(i === "visible"), e = i);
        }, 1e3);
      });
    }
    function M({ visible: e }) {
      $(() => {
        f(e);
      });
    }
    function f(e) {
      if (e)
        t.value && (t.value.style.transition = `all linear ${n.speed}s`), b(), m();
      else if (d && clearTimeout(d), !n.interval && t.value && t.value.children[c]) {
        t.value.style.transition = "";
        const i = n.direction === "vertical" ? t.value.children[c].clientHeight : t.value.children[c].clientWidth, r = i - i * (Date.now() - y) / n.speed / 1e3;
        if (t.value.style.transform) {
          const p = n.direction === "vertical" ? "translateY" : "translateX";
          t.value.style.transform = `${p}(${+t.value.style.transform.split("(")[1].split("px)")[0] + r}px)`, u += r;
        }
      }
    }
    const T = B(() => ({
      "flex-direction": n.direction === "vertical" ? "column" : ""
    }));
    return E(() => {
      F();
    }), (e, i) => {
      const r = D("visible");
      return H((W(), X("div", {
        ref_key: "outer_ref",
        ref: l,
        class: "mouse-move"
      }, [
        Y("div", {
          ref_key: "inner_ref",
          ref: t,
          class: "move-container",
          style: A(I(T))
        }, [
          z(e.$slots, "default", {}, void 0, !0)
        ], 4)
      ])), [
        [r, M]
      ]);
    };
  }
}, G = /* @__PURE__ */ V(C, [["__scopeId", "data-v-d990670c"]]);
export {
  G as default
};
