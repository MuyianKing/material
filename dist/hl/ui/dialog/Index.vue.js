import { useSlots as x, ref as S, computed as f, useAttrs as k, watch as $, nextTick as u, openBlock as C, createBlock as b, unref as r, normalizeStyle as q, createSlots as v, withCtx as p, renderSlot as g } from "vue";
import { ElDialog as B } from "element-plus";
/* empty css           */
const T = {
  __name: "Index",
  props: {
    closeOnClickModal: {
      type: Boolean,
      default: !1
    },
    top: {
      type: [String, Number],
      default: 150
    },
    height: {
      type: String,
      default: ""
    },
    destroyOnClose: {
      type: Boolean,
      default: !0
    }
  },
  setup(t, { expose: h }) {
    const o = t, s = x(), a = S("");
    function n() {
      u(() => {
        var d;
        const e = a.value.dialogContentRef.$el, l = e.querySelector(".el-dialog__header").clientHeight, i = s.footer ? ((d = e.querySelector(".el-dialog__footer")) == null ? void 0 : d.clientHeight) || 72 : 0, _ = e.offsetTop;
        o.height ? e.querySelector(".el-dialog__body").style.height = `calc(${o.height} - ${l + i}px)` : e.querySelector(".el-dialog__body").style.maxHeight = `calc(100vh - ${l + 2 * _ + i}px)`;
      });
    }
    const c = f(() => {
      let e = "10px";
      return o.top && (Number.isNaN(+o.top) ? e = o.top === "auto" ? "" : o.top : e = `${o.top}px`), e;
    }), y = k();
    $(() => y.modelValue, (e) => {
      e && u(() => {
        n();
      });
    }, {
      immediate: !0
    });
    const m = f(() => ({
      marginTop: c.value ? 0 : "",
      top: c.value,
      height: o.height
    }));
    return h({
      setMaxHeight: n
    }), (e, l) => (C(), b(r(B), {
      ref_key: "dialog_ref",
      ref: a,
      "close-on-click-modal": t.closeOnClickModal,
      "destroy-on-close": t.destroyOnClose,
      style: q(r(m)),
      "append-to-body": "",
      class: "hl-custome-dialog"
    }, v({
      default: p(() => [
        g(e.$slots, "default")
      ]),
      _: 2
    }, [
      r(s).footer ? {
        name: "footer",
        fn: p(() => [
          g(e.$slots, "footer")
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["close-on-click-modal", "destroy-on-close", "style"]));
  }
};
export {
  T as default
};
