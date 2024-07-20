import { ref as p, watch as w, openBlock as i, createElementBlock as a, Fragment as h, renderList as c, unref as d, createBlock as n } from "vue";
import { getType as u } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/file.js";
import g from "../image/Index.vue.js";
import y from "../video/Index.vue.js";
import v from "../file/Index.vue.js";
/* empty css           */
import x from "../_virtual/_plugin-vue_export-helper.js";
const k = { class: "file-preview-wrapper" }, B = {
  __name: "Index",
  props: {
    files: {
      type: [Array, Object],
      default: null
    },
    height: {
      type: String,
      default: "100px"
    },
    width: {
      type: String,
      default: "auto"
    },
    noPreview: {
      type: Boolean,
      default: !1
    },
    // 展示方式 auto-自动 card-卡片形式
    listType: {
      type: String,
      default: "auto"
    }
  },
  setup(t) {
    const r = t, o = p([]), f = p([]);
    return w(() => r.files, (s) => {
      if (o.value = [], f.value = [], !s)
        return;
      (Array.isArray(r.files) ? r.files : typeof r.files == "object" ? [r.files] : [{ path: r.files }]).forEach((e) => {
        const l = {
          ...e,
          type: u(e.path) || u(e.name)
        };
        l.type === "image" || l.type === "video" ? o.value.push(l) : f.value.push(l);
      });
    }, {
      immediate: !0
    }), (s, m) => (i(), a("div", k, [
      (i(!0), a(h, null, c(d(o), (e) => (i(), a(h, {
        key: e.id
      }, [
        e.type === "image" ? (i(), n(g, {
          key: 0,
          height: t.height,
          width: t.width,
          prefix: e.prefix,
          src: e.path || e.fileName,
          fit: "cover",
          class: "preview-item"
        }, null, 8, ["height", "width", "prefix", "src"])) : (i(), n(y, {
          key: 1,
          src: e.path,
          prefix: e.prefix,
          height: t.height,
          width: t.width,
          controls: "",
          "no-preview": t.noPreview,
          class: "preview-item"
        }, null, 8, ["src", "prefix", "height", "width", "no-preview"]))
      ], 64))), 128)),
      (i(!0), a(h, null, c(d(f), (e) => (i(), n(v, {
        key: e.id,
        file: e,
        class: "preview-item",
        card: t.listType === "card",
        height: t.height,
        width: t.width
      }, null, 8, ["file", "card", "height", "width"]))), 128))
    ]));
  }
}, T = /* @__PURE__ */ x(B, [["__scopeId", "data-v-11b583df"]]);
export {
  T as default
};
