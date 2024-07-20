import { computed as h, resolveDirective as g, openBlock as s, createElementBlock as a, Fragment as w, renderList as C, unref as x, withDirectives as k, normalizeClass as T, createVNode as o, createElementVNode as _ } from "vue";
import { getType as p } from "../../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/file.js";
import c from "../../icon/Index.vue.js";
import z from "../../preview/Index.vue.js";
/* empty css             */
import A from "../../_virtual/_plugin-vue_export-helper.js";
const D = { class: "delete-wrapper" }, P = {
  __name: "Preview",
  props: {
    file: {
      type: [String, Array, Object],
      default: ""
    },
    // 展示方式 auto-自动 card-卡片形式
    listType: {
      type: String,
      default: "auto"
    }
  },
  emits: ["delete", "re-upload"],
  setup(r, { emit: d }) {
    const e = r, n = d;
    function m(i) {
      n("delete", i);
    }
    function u(i) {
      n("re-upload", i);
    }
    const f = h(() => e.file ? (Array.isArray(e.file) ? e.file : typeof e.file == "object" ? [e.file] : [{ path: e.file }]).map((l) => ({
      ...l,
      type: p(l.path) || p(l.name)
    })) : []);
    return (i, l) => {
      const y = g("loading");
      return s(!0), a(w, null, C(x(f), (t) => k((s(), a("div", {
        key: t.id,
        class: T(["preview-wrapper", { "my-2": r.listType === "auto", "file-list-wrapper": r.listType === "auto" && !["video", "image"].includes(t.type) }])
      }, [
        o(z, {
          files: t,
          height: "100px",
          width: "100px",
          "no-preview": "",
          "list-type": r.listType
        }, null, 8, ["files", "list-type"]),
        _("div", D, [
          o(c, {
            class: "icon-close",
            icon: "pixelarticons:trash",
            size: "24px",
            onClick: (v) => m(t)
          }, null, 8, ["onClick"]),
          o(c, {
            class: "ml-2",
            icon: "ri:folder-upload-line",
            size: "24px",
            onClick: (v) => u(t)
          }, null, 8, ["onClick"])
        ])
      ], 2)), [
        [y, t.loading]
      ])), 128);
    };
  }
}, N = /* @__PURE__ */ A(P, [["__scopeId", "data-v-c34997f7"]]);
export {
  N as default
};
