import { ref as n, provide as h, withDirectives as x, openBlock as y, createElementBlock as S, normalizeStyle as k, unref as r, createVNode as $, renderSlot as w, vShow as I, nextTick as g, pushScopeId as E, popScopeId as M, createElementVNode as B } from "vue";
import N from "./RenderMenuItem.js";
/* empty css           */
import V from "../_virtual/_plugin-vue_export-helper.js";
const b = (t) => (E("data-v-8750dd54"), t = t(), M(), t), q = /* @__PURE__ */ b(() => /* @__PURE__ */ B("div", { class: "arrow" }, null, -1)), z = {
  __name: "Index",
  props: {
    options: {
      type: Array,
      required: !0
    }
  },
  emits: ["click"],
  setup(t, { expose: i, emit: u }) {
    const a = t, d = u, p = n([]);
    h("context_item_renders", p);
    const { x: f, y: m } = useMouse(), s = n({
      top: 0,
      left: 0
    }), l = n(), o = n(!1);
    let c = null;
    function _(e) {
      typeof e == "boolean" ? o.value = e : (c = e, o.value = !0), o.value && g(() => {
        s.value = {
          top: `${m.value}px`,
          left: `${f.value}px`,
          width: `${l.value.$el.clientWidth}px`,
          height: `${l.value.$el.clientHeight}px`
        };
      });
    }
    function v(e) {
      d("click", {
        index: e,
        option: a.options[e],
        data: c
      }), o.value = !1;
    }
    return useEventListener(document, "click", () => {
      o.value = !1;
    }), i({
      toggle: _
    }), (e, A) => x((y(), S("div", {
      class: "context-menu",
      style: k(r(s))
    }, [
      q,
      $(r(N), {
        ref_key: "render_ref",
        ref: l,
        options: t.options,
        onSelected: v
      }, null, 8, ["options"]),
      w(e.$slots, "default", {}, void 0, !0)
    ], 4)), [
      [I, r(o)]
    ]);
  }
}, R = /* @__PURE__ */ V(z, [["__scopeId", "data-v-8750dd54"]]);
export {
  R as default
};
