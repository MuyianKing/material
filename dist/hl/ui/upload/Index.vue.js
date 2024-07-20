import { mergeModels as _, useCssVars as j, unref as o, useSlots as M, useModel as N, ref as c, computed as m, provide as R, openBlock as n, createElementBlock as b, Fragment as w, createElementVNode as $, mergeProps as D, createBlock as g, renderSlot as y, createCommentVNode as v, createSlots as C, withCtx as F, nextTick as S } from "vue";
import { AUDIO_SUFFIX as L, FILE_SUFFIX as P } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/file.js";
import { error as X } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/message.js";
import q from "./components/Trigger.vue.js";
import z from "./components/Preview.vue.js";
import G from "./components/Progress.vue.js";
import { getAllType as H } from "./hooks/index.js";
/* empty css           */
import J from "../_virtual/_plugin-vue_export-helper.js";
const K = {
  __name: "Index",
  props: /* @__PURE__ */ _({
    // 文件类型 video：视频 image：图片 file：文件 audio：音频, all:所有文件类型
    type: {
      type: [String, Array],
      default: "image"
    },
    // 指定文件后缀用于过滤待选文件类型
    suffix: {
      type: [String, Array],
      default: ""
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: !1
    },
    // 最大上传数量
    maxCount: {
      type: Number,
      default: 99
    },
    // 最小上传数量
    minCount: {
      type: Number,
      default: 9
    },
    // 自动上传
    autoUpload: {
      type: Boolean,
      default: !0
    },
    // 进度条
    progress: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    // 预览文件
    preview: {
      type: Boolean,
      default: !0
    },
    // 展示方式 auto-自动 card-卡片形式
    listType: {
      type: String,
      default: "auto"
    },
    // 触发区域样式：card-卡片  line-一行
    triggerType: {
      type: String,
      default: "line"
    },
    uploadFile: {
      type: Function,
      default: null
    }
  }, {
    modelValue: {
      type: [Array, Object],
      default: null
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ _(["upload-start", "upload-finish"], ["update:modelValue"]),
  setup(i, { emit: U }) {
    j((l) => ({
      "66be6b48": o(E)
    }));
    const r = i, h = U;
    function Q() {
    }
    const u = M(), a = N(i, "modelValue");
    function B(l) {
      if (r.multiple) {
        const t = a.value.findIndex((e) => e.id === l.id);
        t > -1 && a.value.splice(t, 1);
      } else
        a.value = null;
    }
    let s = null;
    const x = c();
    function I(l) {
      x.value.triggerAdd(), s = l;
    }
    async function T(l) {
      let t = {
        id: hl.common.guid(),
        name: l.name,
        path: URL.createObjectURL(l)
      };
      if (r.multiple) {
        a.value || (a.value = []), await S();
        let e = a.value.length;
        s ? (e = a.value.findIndex((O) => O.id === s.id), e > -1 ? a.value.splice(e, 1, t) : (a.value.push(t), e = a.value.length - 1)) : a.value.push(t), t = a.value[e];
      } else
        a.value = t;
      if (r.autoUpload) {
        await S(), d(t, {
          loading: !0
        });
        try {
          const e = await V(l);
          d(t, {
            path: e.path,
            id: e.id,
            loading: !1
          }), h("upload-finish", e.id);
        } catch (e) {
          X(e, "文件上传失败");
        }
      } else
        d(t, {
          file: l
        });
    }
    function d(l, t) {
      r.multiple ? Object.keys(t).forEach((e) => {
        l[e] = t[e], e === "loading" && t[e] === !1 && delete l[e];
      }) : Object.keys(t).forEach((e) => {
        a.value[e] = t[e], e === "loading" && t[e] === !1 && delete a.value[e];
      });
    }
    const f = c(0), p = c(!1);
    async function V(l) {
      h("upload-start"), r.progress && (p.value = !0, f.value = 0);
      const t = await void 0;
      if (p.value = !1, f.value = 0, t)
        return t[0];
      throw new Error("上传失败");
    }
    const k = m(() => ({
      multiple: r.multiple,
      files: a.value,
      maxCount: r.maxCount,
      minCount: r.minCount,
      type: r.type,
      suffix: r.suffix,
      disabled: r.disabled
    })), A = m(() => {
      const l = H(r.type, r.suffix);
      for (let t = 0; t < l.length; t++)
        if ([...L, ...P].includes(l[t]))
          return !1;
      return !0;
    });
    R("is_only_video_image", A);
    const E = m(() => r.multiple ? "5px" : "");
    return (l, t) => (n(), b(w, null, [
      $("div", D(l.$attrs, {
        class: ["upload-wrapper", { "flex-style": i.listType === "card" }]
      }), [
        i.preview ? (n(), b(w, { key: 0 }, [
          o(u).preview ? y(l.$slots, "preview", { key: 1 }, void 0, !0) : (n(), g(z, {
            key: 0,
            file: a.value,
            "list-type": i.listType,
            onDelete: B,
            onReUpload: I
          }, null, 8, ["file", "list-type"]))
        ], 64)) : v("", !0),
        i.readonly ? v("", !0) : (n(), g(q, {
          key: 1,
          ref_key: "trigger_ref",
          ref: x,
          config: o(k),
          "trigger-type": i.triggerType,
          onSelectFile: T
        }, C({ _: 2 }, [
          o(u).default ? {
            name: "trigger",
            fn: F(() => [
              y(l.$slots, "default", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["config", "trigger-type"]))
      ], 16),
      i.progress ? (n(), g(G, {
        key: 0,
        show: o(p),
        progress: o(f)
      }, C({ _: 2 }, [
        o(u).progress ? {
          name: "default",
          fn: F(({ percentage: e }) => [
            y(l.$slots, "progress", { percentage: e }, void 0, !0)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["show", "progress"])) : v("", !0)
    ], 64));
  }
}, oe = /* @__PURE__ */ J(K, [["__scopeId", "data-v-a938a75f"]]);
export {
  oe as default
};
