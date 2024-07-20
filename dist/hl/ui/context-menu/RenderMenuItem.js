import s from "../icon/Index.vue.js";
/* empty css                     */
import { inject as m, computed as r } from "vue";
const d = {
  props: {
    options: {
      type: Array,
      requred: !0
    }
  },
  setup(t, { emit: n }) {
    const o = m("context_item_renders");
    function l(e) {
      n("selected", e);
    }
    const a = r(() => o.value.length > 0 ? o.value : t.options);
    return () => /* @__PURE__ */ React.createElement("div", { class: "context-menu-content" }, a.value.map((e, c) => /* @__PURE__ */ React.createElement("div", { class: "hl-context-menu-item", onClick: () => l(c), style: `color:${e.color}` }, e.label ? [
      /* @__PURE__ */ React.createElement(s, { icon: e.icon }),
      /* @__PURE__ */ React.createElement("span", { class: "ml-1" }, e.label)
    ] : e(t.options[c]))));
  }
};
export {
  d as default
};
