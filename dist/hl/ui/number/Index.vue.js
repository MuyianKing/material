import { ref as a, watchEffect as m, openBlock as _, createElementBlock as g, toDisplayString as c, unref as u } from "vue";
/* empty css           */
import x from "../_virtual/_plugin-vue_export-helper.js";
const h = { class: "hl-data-num" }, v = {
  __name: "Index",
  props: {
    num: {
      type: Number,
      default: 0
    },
    separator: {
      type: String,
      default: ","
    }
  },
  setup(l) {
    const s = l, i = a([]), o = a("");
    function f() {
      let t = s.num;
      t > 1e11 ? (o.value = "千亿", t = (t / 1e11).toFixed(2)) : t > 1e8 ? (o.value = "亿", t = (t / 1e8).toFixed(2)) : t > 1e4 && (o.value = "万", t = (t / 1e4).toFixed(2)), i.value = d(p(t));
    }
    function p(t) {
      let e = t.toString().split(".");
      if (e[1]) {
        const n = e[1].split("");
        let r = n.length - 1;
        for (; r >= 0 && +n[r] == 0; r--)
          ;
        n.splice(r + 1), n.length > 0 ? e = `${e[0]}.${n.join("")}` : e = e[0];
      }
      return +e;
    }
    function d(t) {
      const e = t.toString(), n = e.includes(".") ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return e.replace(n, `$1${s.separator}`);
    }
    return m(() => {
      f();
    }), (t, e) => (_(), g("span", h, c(u(i)) + c(u(o)), 1));
  }
}, k = /* @__PURE__ */ x(v, [["__scopeId", "data-v-6ec173a4"]]);
export {
  k as default
};
