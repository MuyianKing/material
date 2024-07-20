import { ref as m, openBlock as y, createBlock as b, withCtx as a, renderSlot as c, createVNode as p, unref as n, createTextVNode as v, toDisplayString as x, mergeProps as w } from "vue";
import S from "../dialog/Index.vue.js";
import { ElButton as V, ElForm as B } from "element-plus";
/* empty css           */
import N from "../_virtual/_plugin-vue_export-helper.js";
const k = {
  __name: "Index",
  props: {
    // 显示隐藏弹框
    modelValue: {
      type: Boolean,
      default: !1
    },
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 校验规则
    rules: {
      type: Object,
      default() {
        return {};
      }
    },
    // el-form的model
    model: {
      type: Object,
      default() {
        return null;
      }
    },
    // 弹框宽度
    width: {
      type: [Number, String],
      default: "500px"
    },
    // 弹框距离顶部的距离
    top: {
      type: [String, Number],
      default: "150px"
    },
    // 保存按钮文本
    submitText: {
      type: String,
      default: "提交"
    },
    inline: {
      type: Boolean,
      default: !1
    },
    // 提交调用的server方法
    server: {
      type: Function,
      default: null
    },
    labelWidth: {
      type: [String, Number],
      default: "80px"
    }
  },
  emits: ["update:modelValue", "error", "success", "refresh", "submit"],
  setup(e, { expose: h, emit: g }) {
    const u = e, t = g, i = m(!1), r = m();
    function d() {
      if (!u.model) {
        hl.message.warning("hl-form-dialog组件未设置model属性");
        return;
      }
      r.value.validate(async (l) => {
        if (l) {
          const o = u.server;
          o && typeof o == "function" ? (i.value = !0, o(u.model).then((s) => {
            hl.message.success("保存成功"), t("success", s), t("refresh"), f();
          }).catch((s) => {
            hl.message.error(s, "保存失败"), t("error");
          }).finally(() => {
            i.value = !1;
          })) : t("submit");
        }
      });
    }
    function f() {
      r.value.clearValidate(), t("update:modelValue", !1);
    }
    return h({
      getFormRef: () => r.value
    }), (l, o) => (y(), b(S, {
      "model-value": e.modelValue,
      title: e.title,
      width: e.width,
      top: e.top,
      onClose: f
    }, {
      footer: a(() => [
        c(l.$slots, "footer", { submit: d }, () => [
          p(n(V), {
            type: "primary",
            loading: n(i),
            onClick: d
          }, {
            default: a(() => [
              v(x(e.submitText), 1)
            ]),
            _: 1
          }, 8, ["loading"])
        ], !0)
      ]),
      default: a(() => [
        p(n(B), w({
          ref_key: "form_ref",
          ref: r,
          class: { "inline-form": e.inline },
          model: e.model,
          rules: e.rules,
          "label-width": e.labelWidth
        }, l.$attrs, { "scroll-to-error": "" }), {
          default: a(() => [
            c(l.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        }, 16, ["class", "model", "rules", "label-width"])
      ]),
      _: 3
    }, 8, ["model-value", "title", "width", "top"]));
  }
}, D = /* @__PURE__ */ N(k, [["__scopeId", "data-v-d6ee9a97"]]);
export {
  D as default
};
