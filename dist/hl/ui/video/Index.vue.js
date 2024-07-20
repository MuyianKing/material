import { computed as i, openBlock as a, createElementBlock as c, normalizeStyle as s, unref as l, createCommentVNode as d, renderSlot as p } from "vue";
import { openFullScreen as h } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/dom.js";
/* empty css           */
import m from "../_virtual/_plugin-vue_export-helper.js";
const y = ["controls", "src"], g = {
  __name: "Index",
  props: {
    src: {
      type: String,
      default: ""
    },
    prefix: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "auto"
    },
    width: {
      type: String,
      default: "300px"
    },
    // 是否显示控制条
    controls: {
      type: Boolean,
      default: !1
    },
    // 设置视频缩放模式
    fit: {
      type: String,
      default: "contain"
    },
    noPreview: {
      type: Boolean,
      default: !1
    }
  },
  setup(r) {
    const t = r;
    function v() {
    }
    const o = i(() => t.src ? (t.src, t.prefix, void 0) : "");
    function n(e) {
      e.target.paused ? e.target.play() : e.target.pause();
    }
    function u(e) {
      h(e.target), e.target.paused && n(e);
    }
    const f = i(() => ({
      height: t.height,
      width: t.width
    }));
    return (e, w) => (a(), c("div", {
      class: "hl-preview-video",
      style: s(l(f))
    }, [
      l(o) ? (a(), c("video", {
        key: 0,
        class: "w-full h-full",
        controls: r.controls && !r.noPreview,
        src: l(o),
        style: s({ objectFit: r.fit }),
        title: "单击播放暂停，双击全屏播放",
        onClick: n,
        onDblclick: u
      }, null, 44, y)) : d("", !0),
      p(e.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}, B = /* @__PURE__ */ m(g, [["__scopeId", "data-v-9f081467"]]);
export {
  B as default
};
