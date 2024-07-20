/* empty css                */
import { ElCheckbox as i } from "element-plus";
import { inject as o, computed as f, watch as b } from "vue";
const k = {
  name: "HlTableHead",
  props: {
    // 开启选择
    select: {
      type: Boolean,
      default: !1
    },
    excludeChecked: {
      type: Array,
      default: () => []
    },
    checkAll: {
      type: Boolean,
      default: !1
    }
  },
  setup(l, { emit: t }) {
    const n = o("hlTableStore"), r = f(() => n.value.columns), s = {
      left: "flex-start",
      center: "center",
      right: "flex-end"
    };
    function h(e, c) {
      t("spanClick", e, c);
    }
    let a = !1;
    function d(e) {
      a = !0, t("update:checkAll", e), t("changeCheckAll", e);
    }
    return b(() => l.excludeChecked, (e) => {
      if (a) {
        a = !1;
        return;
      }
      t("update:checkAll", e.length <= 0);
    }), () => /* @__PURE__ */ React.createElement("table", { class: "hl-table-header", cellspacing: "0", cellpadding: "0", border: "0" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "hl-table-tr" }, l.select && /* @__PURE__ */ React.createElement("th", { className: "hl-table-td hl-table-th hl-table-checkbox" }, /* @__PURE__ */ React.createElement(i, { size: "large", modelValue: l.checkAll, onChange: d })), r.value.filter((e) => e.show).map((e, c) => /* @__PURE__ */ React.createElement(
      "th",
      {
        class: `hl-table-td hl-table-th ${e.className}`,
        style: e.thStyle,
        key: e.uuid,
        onClick: () => {
          h(e, c);
        }
      },
      /* @__PURE__ */ React.createElement("div", { class: "hl-table-td-div", style: { justifyContent: s[e.style.textAlign] } }, e.renderHeader ? e.renderHeader() : /* @__PURE__ */ React.createElement("span", { style: { verticalAlign: "middle", textAlign: e.style.textAlign } }, e.label))
    )))));
  }
};
export {
  k as default
};
