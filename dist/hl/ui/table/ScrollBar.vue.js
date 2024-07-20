import { ref as f, unref as d, openBlock as b, createElementBlock as m, normalizeClass as y, createCommentVNode as h } from "vue";
/* empty css               */
import g from "../_virtual/_plugin-vue_export-helper.js";
const B = {
  __name: "ScrollBar",
  props: {
    tableId: {
      type: [String, Number],
      default: ""
    },
    active: {
      type: Boolean,
      default: !1
    }
  },
  setup(n, { expose: u }) {
    const s = n, o = f(!1);
    let c = 0, t = null, a = 0, r = null;
    function p() {
      const e = document.getElementById(s.tableId);
      if (!e)
        return;
      r || (r = e.querySelector(".body-wrapper"));
      const l = r.clientHeight, i = e.querySelector(".hl-table-body").clientHeight;
      o.value = i > l, c = i - l, t = null, a = 0;
    }
    function _() {
      const e = document.getElementById(s.tableId);
      if (e && o.value) {
        t || (r = e.querySelector(".body-wrapper"), t = e.querySelector(".scroll-bar"), a = t.clientHeight);
        const l = r.scrollTop / c;
        l <= 1 && (t.style.top = `calc(${l * 100}% + ${(c - a) * l}px)`);
      }
    }
    return u({
      setScroll: p,
      scrollBar: _
    }), (e, l) => d(o) ? (b(), m("div", {
      key: 0,
      class: y(["scroll-bar", { active: n.active }])
    }, null, 2)) : h("", !0);
  }
}, x = /* @__PURE__ */ g(B, [["__scopeId", "data-v-666af53c"]]);
export {
  x as default
};
