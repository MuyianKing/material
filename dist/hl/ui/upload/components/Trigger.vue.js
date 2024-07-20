import { useSlots as S, computed as l, ref as w, openBlock as r, createElementBlock as n, Fragment as g, unref as a, mergeProps as I, renderSlot as b, createVNode as d, createCommentVNode as m, createElementVNode as _, pushScopeId as A, popScopeId as B } from "vue";
import { getMimeType as O, getSuffix as z } from "../../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/file.js";
import { getAcceptType as E } from "../hooks/index.js";
import y from "../../icon/Index.vue.js";
/* empty css             */
import M from "../../_virtual/_plugin-vue_export-helper.js";
const N = (t) => (A("data-v-9e3ac7ec"), t = t(), B(), t), V = { key: 0 }, P = {
  key: 1,
  class: "upload-icon"
}, $ = /* @__PURE__ */ N(() => /* @__PURE__ */ _("span", { class: "ml-1" }, "点击上传附件", -1)), j = ["accept"], F = {
  __name: "Trigger",
  props: {
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    triggerType: {
      type: String,
      default: "card"
    }
  },
  emits: ["select-file"],
  setup(t, { expose: h, emit: v }) {
    const o = t, k = v, C = S(), f = l(() => {
      const e = o.config.files;
      return e ? Array.isArray(e) ? e : [e] : [];
    }), T = l(() => {
      const e = o.config;
      return !e.multiple && f.value.length > 0 ? !1 : f.value.length < e.maxCount;
    }), i = w();
    function u() {
      o.config.disabled || i.value.click();
    }
    function x(e) {
      var p;
      const s = e.target.files[0];
      if (i.value.value = null, c.value !== "*/*" && !c.value.includes(((p = O(z(s.name))) == null ? void 0 : p[0]) || "")) {
        hl.message.confirm("请不要自行选择【所有文件】，上传指定类型外的文件", {
          type: "warning",
          buttonSize: "large",
          confirmButtonText: "我已知晓",
          center: !0,
          showCancelButton: !1,
          showClose: !1,
          closeOnClickModal: !1,
          closeOnPressEscape: !1,
          closeOnHashChange: !1
        });
        return;
      }
      k("select-file", s);
    }
    const c = l(() => E(o.config.type, o.config.suffix));
    return h({
      triggerAdd: u
    }), (e, s) => (r(), n(g, null, [
      a(T) ? (r(), n("div", I({ key: 0 }, e.$attrs, {
        class: ["cursor-pointer normal-trigger", { "trigger-item": t.triggerType === "card", "w-full": t.triggerType === "line" }],
        onClick: u
      }), [
        b(e.$slots, "trigger", {}, void 0, !0),
        a(C).trigger ? m("", !0) : (r(), n(g, { key: 0 }, [
          t.triggerType === "card" ? (r(), n("div", V, [
            d(y, {
              icon: "bitcoin-icons:plus-outline",
              style: { "font-size": "28px" }
            })
          ])) : (r(), n("div", P, [
            d(y, {
              icon: "ic:round-cloud-upload",
              style: { "font-size": "20px" }
            }),
            $
          ]))
        ], 64))
      ], 16)) : m("", !0),
      _("input", {
        ref_key: "file_input_ref",
        ref: i,
        type: "file",
        accept: a(c),
        style: { display: "none" },
        onChange: x
      }, null, 40, j)
    ], 64));
  }
}, L = /* @__PURE__ */ M(F, [["__scopeId", "data-v-9e3ac7ec"]]);
export {
  L as default
};
