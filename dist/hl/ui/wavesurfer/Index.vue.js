import { useModel as i, ref as n, watch as u, nextTick as d, openBlock as m, createElementBlock as f, createElementVNode as c, createVNode as p, createCommentVNode as _, pushScopeId as v, popScopeId as g } from "vue";
import h from "../node_modules/.pnpm/wavesurfer.js@7.8.2/node_modules/wavesurfer.js/dist/wavesurfer.esm.js";
import y from "../node_modules/.pnpm/wavesurfer.js@7.8.2/node_modules/wavesurfer.js/dist/plugins/hover.esm.js";
import k from "../icon/Index.vue.js";
/* empty css           */
import w from "../_virtual/_plugin-vue_export-helper.js";
const b = (o) => (v("data-v-98b0ed3c"), o = o(), g(), o), C = {
  key: 0,
  class: "wavesurfer"
}, V = /* @__PURE__ */ b(() => /* @__PURE__ */ c("div", { class: "tips" }, " 双击暂停，单击播放 ", -1)), x = {
  __name: "Index",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const l = i(o, "modelValue"), a = n();
    let e = null, r = 0;
    u(l, () => {
      l.value && (hl.message.loading("加载中..."), d(() => {
        e = h.create({
          container: a.value,
          scrollParent: !0,
          waveColor: variables["color-primary"],
          progressColor: "gray",
          url: l.value,
          autoplay: !0,
          plugins: [
            y.create({
              lineColor: "#ff0000",
              lineWidth: 2,
              labelBackground: "#555",
              labelColor: "#fff",
              labelSize: "11px"
            })
          ]
        }), e.on("ready", () => {
          console.log("ready"), hl.message.closeLoading();
        }), e.on("click", () => {
          r && clearTimeout(r), e.setVolume(0), e.isPlaying() || e.play(), r = setTimeout(() => {
            e.setVolume(1);
          }, 500);
        }), e.on("dblclick", () => {
          e.isPlaying() && e.pause();
        }), e.on("error", (s) => {
          hl.message.error(s, "播放失败"), t();
        });
      }));
    });
    function t() {
      e && e.destroy(), hl.message.closeLoading(), l.value = "";
    }
    return (s, I) => l.value ? (m(), f("div", C, [
      V,
      c("div", {
        ref_key: "wavesurfer_ref",
        ref: a,
        class: "w-full"
      }, null, 512),
      p(k, {
        icon: "carbon:close-outline",
        class: "close-item",
        onClick: t
      })
    ])) : _("", !0);
  }
}, L = /* @__PURE__ */ w(x, [["__scopeId", "data-v-98b0ed3c"]]);
export {
  L as default
};
