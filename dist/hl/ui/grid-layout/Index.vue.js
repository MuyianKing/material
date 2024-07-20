import { ref as n, openBlock as p, createElementBlock as u, renderSlot as i } from "vue";
import m from "./useGridLayout.js";
const f = {
  __name: "Index",
  props: {
    // item的宽度：当剩余的宽度小于width/2，列数向下取整，否则向上取整
    width: {
      type: Number,
      required: !0
    },
    // 当确定的列数后，如果宽度小于min-width，列数加一
    minWidth: {
      type: Number,
      default: 0
    },
    gap: {
      type: Number,
      default: 10
    },
    rowGap: {
      type: Number,
      default: 10
    },
    columnGap: {
      type: Number,
      default: 10
    }
  },
  setup(r) {
    const e = r, t = n();
    function o() {
      m(t, {
        row_gap: e.rowGap || e.gap || e.columnGap || 10,
        column_gap: e.columnGap || e.gap || e.rowGap || 10,
        min_width: e.minWidth,
        width: e.width
      });
    }
    return o(), (a, d) => (p(), u("div", {
      ref_key: "container_ref",
      ref: t,
      class: "grid-layout"
    }, [
      i(a.$slots, "default")
    ], 512));
  }
};
export {
  f as default
};
