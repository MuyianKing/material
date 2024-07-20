import { ref as w, computed as p, openBlock as n, createElementBlock as a, Fragment as x, mergeProps as r, unref as c, createElementVNode as m, createVNode as u, toDisplayString as y, isRef as k, createCommentVNode as V, nextTick as C } from "vue";
import { getSuffix as B, getType as f } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/file.js";
import { loading as D, error as F, closeLoading as S } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/message.js";
import $ from "../wavesurfer/Index.vue.js";
import I from "../icon/Index.vue.js";
/* empty css           */
import N from "../_virtual/_plugin-vue_export-helper.js";
const E = { class: "flex-1-0 card-top" }, T = ["title"], U = {
  __name: "Index",
  props: {
    file: {
      type: Object,
      default() {
        return null;
      }
    },
    noDownload: {
      type: Boolean,
      default: !1
    },
    card: {
      type: Boolean,
      default: !1
    },
    height: {
      type: String,
      default: "auto"
    },
    width: {
      type: String,
      default: "300px"
    }
  },
  setup(o) {
    const e = o;
    function b() {
    }
    function j() {
    }
    const i = w("");
    function s() {
      if ((f(e.file.name) || f(e.file.path)) === "audio") {
        C(() => {
          i.value = (e.file.path, e.file.prefix, void 0);
        });
        return;
      }
      if (!e.noDownload)
        try {
          D("正在打开文件..."), e.file;
        } catch (t) {
          F(t, "打开文件失败");
        } finally {
          S();
        }
    }
    const v = p(() => ({
      height: e.height,
      width: e.width
    })), d = {
      audio: "vscode-icons:folder-type-audio-opened",
      xls: "vscode-icons:file-type-excel",
      xlsx: "vscode-icons:file-type-excel",
      ppt: "vscode-icons:file-type-powerpoint",
      pptx: "vscode-icons:file-type-powerpoint",
      file: "vscode-icons:file-type-word"
    }, h = p(() => {
      var t, l;
      return d[B((t = e.file) == null ? void 0 : t.name)] || d[f((l = e.file) == null ? void 0 : l.name)];
    });
    return (t, l) => o.file && o.file.name ? (n(), a(x, { key: 0 }, [
      o.card ? (n(), a("div", r({
        key: 0,
        class: "card-item",
        style: c(v)
      }, t.$attrs, { onClick: s }), [
        m("div", E, [
          u(I, {
            icon: c(h),
            size: "40"
          }, null, 8, ["icon"])
        ]),
        m("div", {
          class: "line-clamp-1 card-file-name",
          title: o.file.name
        }, y(o.file.name), 9, T)
      ], 16)) : (n(), a("span", r({ key: 1 }, t.$attrs, {
        class: "file-item",
        onClick: s
      }), y(o.file.name), 17)),
      u($, r({
        modelValue: c(i),
        "onUpdate:modelValue": l[0] || (l[0] = (g) => k(i) ? i.value = g : null)
      }, t.$attrs), null, 16, ["modelValue"])
    ], 64)) : V("", !0);
  }
}, q = /* @__PURE__ */ N(U, [["__scopeId", "data-v-d00fdc2a"]]);
export {
  q as default
};
