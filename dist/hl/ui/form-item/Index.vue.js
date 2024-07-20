import { getCurrentInstance as _, computed as d, ref as S, onMounted as v, openBlock as L, createBlock as N, unref as a, createSlots as B, withCtx as u, renderSlot as s } from "vue";
import { v_id_num as C, v_phone as $, v_carnum as w, v_int as x, v_ip as A, v_port as E, v_email as I } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/validator.js";
import { ElFormItem as M } from "element-plus";
/* empty css           */
import q from "../_virtual/_plugin-vue_export-helper.js";
const W = {
  __name: "Index",
  props: {
    // 提示信息：组件会自动根据表单组件判断是“请选择”还是“请输入”，当无法正确判断时需要手动设置改属性
    info: {
      type: String,
      default: ""
    },
    // 必填
    required: {
      type: Boolean,
      default: !1
    },
    // 身份证号
    idCard: {
      type: Boolean,
      default: !1
    },
    email: {
      type: Boolean,
      default: !1
    },
    // 整型
    integer: {
      type: Boolean,
      default: !1
    },
    // 数字
    number: {
      type: Boolean,
      default: !1
    },
    // 手机号
    phone: {
      type: Boolean,
      default: !1
    },
    // 车牌号
    carNum: {
      type: Boolean,
      default: !1
    },
    // IP地址
    ip: {
      type: Boolean,
      default: !1
    },
    // 端口
    port: {
      type: Boolean,
      default: !1
    },
    // 最大长度
    maxLength: {
      type: [Number, String],
      default: ""
    },
    // 最小长度
    minLength: {
      type: [Number, String],
      default: 0
    },
    // 是否校验正在上传图片，表单中有上传附件并且开启了自动上传则需要开启
    uploadLoading: {
      type: Boolean,
      default: !1
    },
    // 当字段类型是数组时，可能需要校验数组长度，具体场景比如上传文件的最小个数，下拉框需要限定选择的最少项
    minCount: {
      type: [String, Number],
      default: 0
    },
    // 配合minCount，当不满足minCount时的提示信息
    minCountMsg: {
      type: String,
      default: ""
    },
    // 校验触发方式
    trigger: {
      type: String,
      default: "change"
    },
    // 自定义校验规则
    rules: {
      type: [Object, Array],
      default() {
        return null;
      }
    },
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: [Number, String],
      default: ""
    }
  },
  setup(f) {
    const t = f, i = _();
    function p(r, n, e) {
      const o = Number.parseFloat(t.maxLength);
      (n == null ? void 0 : n.toString().length) > o && e(new Error(`最大长度为${o}`)), e();
    }
    function m(r, n, e) {
      const o = Number.parseFloat(t.minLength);
      (n == null ? void 0 : n.toString().length) < o && e(new Error(`最小长度为${o}`)), e();
    }
    function g(r, n, e) {
      Number.isNaN(+n) && e(new Error("请输入数字")), e();
    }
    function h(r, n, e) {
      if (Array.isArray(n))
        for (let o = 0; o < n.length; o++)
          n[o].loading && e(new Error("请等待文件上传"));
      else n != null && n.loading && e(new Error("请等待文件上传"));
      e();
    }
    function y(r, n, e) {
      Array.isArray(n) && n.length < +t.minCount && e(new Error(t.minCountMsg || `最少${t.minCount}个`)), e();
    }
    const c = d(() => {
      var o;
      let r = [];
      t.rules && (r = Array.isArray(t.rules) ? [...t.rules] : [t.rules]);
      const n = `${t.info || l.value || "请输入"}${(o = t.label) == null ? void 0 : o.replace("：", "").replace(":", "")}`, e = t.trigger;
      return t.required && r.push({ required: !0, message: n, trigger: e }), t.idCard && r.push({ validator: C, trigger: e }), t.phone && r.push({ validator: $, trigger: e }), t.carNum && r.push({ validator: w, trigger: e }), t.integer && r.push({ validator: x, trigger: e }), t.ip && r.push({ validator: A, trigger: e }), t.port && r.push({ validator: E, trigger: e }), t.minLength && r.push({ validator: m, trigger: e }), t.maxLength && r.push({ validator: p, trigger: e }), t.number && r.push({ validator: g, trigger: e }), t.email && r.push({ validator: I, trigger: e }), t.uploadLoading && r.push({ validator: h, trigger: e }), t.minCount > 0 && r.push({ validator: y, trigger: e }), r;
    }), b = d(() => t.labelWidth ? t.labelWidth === "fit" ? `calc(${t.label.length}em + 15px)` : t.labelWidth : ""), l = S();
    return v(() => {
      var r, n, e;
      (e = (n = (r = i == null ? void 0 : i.vnode) == null ? void 0 : r.el) == null ? void 0 : n.querySelector) != null && e.call(n, ".el-form-item__content").querySelector(".el-input") ? l.value = "请输入" : l.value = "请选择";
    }), (r, n) => (L(), N(a(M), {
      rules: a(c),
      "label-width": a(b),
      label: f.label
    }, B({
      default: u(() => [
        s(r.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      r.$slots.label ? {
        name: "label",
        fn: u(() => [
          s(r.$slots, "label", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      r.$slots.error ? {
        name: "error",
        fn: u(() => [
          s(r.$slots, "error", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["rules", "label-width", "label"]));
  }
}, U = /* @__PURE__ */ q(W, [["__scopeId", "data-v-b60c8f75"]]);
export {
  U as default
};
