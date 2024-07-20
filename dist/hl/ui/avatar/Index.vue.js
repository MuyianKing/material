import { ref as m, computed as l, openBlock as d, createBlock as i, unref as r, withCtx as p, renderSlot as f, createElementVNode as _, createCommentVNode as v } from "vue";
import h from "../node_modules/.pnpm/@multiavatar_multiavatar@1.0.7/node_modules/@multiavatar/multiavatar/dist/esm/index.js";
import { ElAvatar as g } from "element-plus";
/* empty css           */
import x from "../_virtual/_plugin-vue_export-helper.js";
const E = ["innerHTML"], k = {
  __name: "Index",
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const o = e, s = useUserStore(), t = m(!1);
    function n() {
      t.value = !0;
    }
    const a = h(s.name || "用户"), c = l(() => !o.src || t);
    return (u, C) => (d(), i(r(g), {
      src: e.src,
      onError: n
    }, {
      default: p(() => [
        r(c) ? f(u.$slots, "error", { key: 0 }, () => [
          _("div", {
            class: "svg-avatar",
            innerHTML: r(a)
          }, null, 8, E)
        ], !0) : v("", !0)
      ]),
      _: 3
    }, 8, ["src"]));
  }
}, H = /* @__PURE__ */ x(k, [["__scopeId", "data-v-9645e83e"]]);
export {
  H as default
};
