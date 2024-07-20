import { inject as c, useSlots as r, onMounted as s, nextTick as _, openBlock as u, createElementBlock as l } from "vue";
const m = {
  __name: "Index",
  setup(a) {
    const t = c("context_item_renders");
    function n(e) {
      return e.label;
    }
    const o = r();
    return s(() => {
      _(() => {
        t.value.push(o.default || n);
      });
    }), (e, i) => (u(), l("div"));
  }
};
export {
  m as default
};
