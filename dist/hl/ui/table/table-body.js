import { isOverflow as S } from "../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/dom.js";
import { ElCheckbox as T, ElTooltip as $ } from "element-plus";
import { inject as B, computed as f, ref as u } from "vue";
const K = {
  name: "HlTableBody",
  props: {
    hover: {
      type: String,
      default: "default"
    },
    activeIndex: {
      type: [Number, String],
      default: ""
    },
    emptyText: {
      type: String,
      default: "没有数据"
    },
    rowClass: {
      type: Function,
      default() {
        return "";
      }
    },
    tooltipEffect: {
      type: String,
      default: "light"
    },
    tooltopMaxWidth: {
      type: String,
      default: "30vw"
    },
    // 开启选择
    select: {
      type: Boolean,
      default: !1
    },
    // 主键
    rowKey: {
      type: String,
      default: "id"
    },
    check: {
      type: Array,
      default() {
        return [];
      }
    },
    excludeChecked: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(l, { emit: r, slots: h }) {
    const v = B("hlTableStore"), i = f(() => v.value.columns), m = f(() => v.value.data);
    function x(a, e) {
      r("row-click", a, e);
    }
    const k = f(() => ({
      cursor: l.hover
    })), y = u(""), d = u(!1), p = u(0);
    function C(a, e, c) {
      var n;
      if ((n = i.value[c]) != null && n.noTip)
        return;
      p.value = e;
      const t = a.target;
      if (S(t)) {
        const { top: o, left: s } = t.getBoundingClientRect();
        g.value = DOMRect.fromRect({
          width: 0,
          height: 0,
          x: s + t.clientWidth / 2,
          y: o + 8 + (e > 0 ? 0 : t.clientHeight)
        }), y.value = t.textContent, d.value = !0;
      }
    }
    function R() {
      d.value = !1;
    }
    const g = u({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }), E = u({
      getBoundingClientRect() {
        return g.value;
      }
    });
    function b(a, e, c, t = !1) {
      const n = [...a];
      if ((t ? e === "" : e !== "") && !n.includes(c))
        n.push(c);
      else {
        const o = n.findIndex((s) => s === c);
        n.splice(o, 1);
      }
      return n;
    }
    function w(a, e) {
      const c = b(l.check, a, e), t = b(l.excludeChecked, a, e, !0);
      r("update:check", c), r("update:excludeChecked", t);
    }
    return () => /* @__PURE__ */ React.createElement("table", { class: "hl-table-body", cellspacing: "0", cellpadding: "0", border: "0" }, /* @__PURE__ */ React.createElement("tbody", null, m.value.map((a, e) => {
      const c = [
        /* @__PURE__ */ React.createElement(
          "tr",
          {
            key: a[l.rowKey],
            className: `hl-table-tr${l.activeIndex !== "" && +l.activeIndex === e ? " active" : ""} ${e % 2 === 0 ? "" : "enev"} ${l.rowClass && l.rowClass(a, e)}`,
            onClick: () => {
              x(a, e);
            },
            style: k.value
          },
          l.select && /* @__PURE__ */ React.createElement("td", { style: "width:60px;min-width:60px;max-width:60px;text-align:center" }, /* @__PURE__ */ React.createElement(T, { "true-value": a[l.rowKey], "false-value": "", size: "large", "v-model": a.checkbox, onChange: (t) => w(t, a[l.rowKey]) })),
          i.value.filter((t) => t.show).map((t, n) => /* @__PURE__ */ React.createElement("td", { key: t.uuid, "data-uuid": t.uuid, class: `hl-table-td ${t.className}`, style: t.tdStyle, onMouseenter: (o) => C(o, e, n), onMouseleave: R }, t.render({
            row: a,
            index: e
          })))
        )
      ];
      return h.extend && c.push(
        /* @__PURE__ */ React.createElement("tr", { className: `${e % 2 === 0 ? "" : "enev"}` }, /* @__PURE__ */ React.createElement("td", { className: "extend-td", colspan: i.value.length }, h.extend({
          row: a,
          index: e
        })))
      ), c;
    }), m.value.length === 0 && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { class: "hl-table-td hl-table-no-data", colspan: i.value.length }, "没有数据"))), /* @__PURE__ */ React.createElement($, { visible: d.value, "append-to": "body", "raw-content": !0, content: `<div style="max-width:${l.tooltopMaxWidth}">${y.value}</div>`, effect: l.tooltipEffect, placement: p.value > 0 ? "top" : "bottom", "virtual-triggering": !0, "virtual-ref": E.value }));
  }
};
export {
  K as default
};
