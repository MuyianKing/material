import { useSlots as S, inject as _, getCurrentInstance as N, onMounted as T, openBlock as C, createElementBlock as W, unref as v, h as i } from "vue";
import E from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/storage.js";
import { guid as j } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/common.js";
import w from "../time/Index.vue.js";
import A from "../id-card/Index.vue.js";
import B from "../tel/Index.vue.js";
import c from "../preview/Index.vue.js";
const H = ["id"], $ = {
  __name: "Index",
  props: {
    type: {
      type: String,
      default: "default"
    },
    prop: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    index: {
      type: [String, Number, Function],
      default: ""
    },
    width: {
      type: [String, Number],
      default: ""
    },
    minWidth: {
      type: [String, Number],
      default: ""
    },
    extraWidth: {
      type: Number,
      default: 0
    },
    align: {
      type: String,
      default: ""
    },
    style: {
      type: [String, Object],
      default: ""
    },
    className: {
      type: String,
      default: ""
    },
    // 表头标签样式
    labelStyle: {
      type: [String, Object],
      default: ""
    },
    noTip: {
      type: Boolean,
      default: !1
    }
  },
  setup(f) {
    const e = f, a = j(), m = function({ row: t, index: n }) {
      switch (e.type) {
        case "index":
          return typeof e.index == "function" ? e.index(n) : e.index === "" ? n + 1 : e.index;
        case "time":
          return i(w, { time: t[e.prop] });
        case "id-card":
          return i(A, { idCard: t[e.prop] });
        case "tel":
          return i(B, { tel: t[e.prop] });
        case "image":
          return i(c, { files: t[e.prop], width: "60px", height: "60px" });
        case "file":
          return i(c, { files: t[e.prop] });
        default:
          return t[e.prop] === void 0 || t[e.prop] === null ? "" : t[e.prop];
      }
    }, o = S(), y = _("hlTableStore"), h = N(), g = o.default || m;
    function b(t) {
      return g(t);
    }
    function x() {
      let t = h.parent, n = e.minWidth;
      n && !Number.isNaN(+n) ? n += "px" : n || (n = `calc(${(e.label || (e.type === "index" ? "序号" : "")).length}em + ${20 + e.extraWidth}px)`);
      let l = e.width;
      l && !Number.isNaN(+l) && (l += "px");
      const p = {
        textAlign: e.align || t.props.align || "left",
        minWidth: n,
        width: l
      };
      function s(r, u = 1) {
        if ((r.type.__name || r.type.name) !== "HlTable") {
          if (u > 3)
            throw new Error("请将hl-table-column放在hl-table中");
          s(r.parent, u + 1);
        }
        return r;
      }
      t = s(t);
      const d = E.get(y.value.storageKey) || [];
      t.provides.hlTableStore.value.insertColumn({
        uuid: a,
        ...e,
        label: e.label || (e.type === "index" ? "序号" : ""),
        className: e.className,
        noTip: e.noTip,
        style: p,
        tdStyle: {
          ...e.style,
          ...p,
          // 渲染过程中会把width覆盖掉，需要缓存
          orgWidth: l,
          orgMinWidth: n
        },
        thStyle: {},
        labelStyle: e.labelStyle,
        render: b,
        renderHeader: o.header || null,
        show: !e.prop || d.length === 0 || d.includes(e.prop)
      });
    }
    return T(() => {
      x();
    }), (t, n) => (C(), W("div", { id: v(a) }, null, 8, H));
  }
};
export {
  $ as default
};
