import { mergeModels as R, useCssVars as ce, useSlots as ue, ref as C, provide as ie, watch as B, nextTick as h, computed as se, useModel as I, onActivated as he, onMounted as fe, onUnmounted as ye, openBlock as K, createElementBlock as me, unref as d, normalizeClass as ge, normalizeStyle as V, createElementVNode as L, renderSlot as M, createBlock as z, createCommentVNode as D, withDirectives as U, createVNode as F, createSlots as ve, withCtx as be, vShow as P } from "vue";
import Se from "./EditHeader.vue.js";
import ke from "./ScrollBar.vue.js";
import pe from "./table-store.js";
import we from "./table-head.js";
import xe from "./table-body.js";
/* empty css           */
import Ce from "../_virtual/_plugin-vue_export-helper.js";
const Be = ["id"], Ee = { class: "hidden-columns" }, We = { class: "w-full h-full" }, Ae = {
  __name: "Index",
  props: /* @__PURE__ */ R({
    data: {
      type: Array,
      default() {
        return [];
      }
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
    // 跨页保留
    crossPage: {
      type: Boolean,
      default: !0
    },
    // 表格的最大高度：不包括表头
    maxHeight: {
      type: String,
      default: ""
    },
    // 显示和隐藏表头定制
    editHeader: {
      type: Boolean,
      default: !1
    },
    // 自定义表头的信息存储在storage，storageKey为对应的key值
    storageKey: {
      type: String,
      default: ""
    },
    // 内容不换行
    nowrap: {
      type: Boolean,
      default: !1
    },
    // 对齐方式
    align: {
      type: String,
      default: "center"
    },
    // 鼠标放到行样式
    hover: {
      type: String,
      default: "default"
    },
    // 是否高亮选中行
    hightLight: {
      type: Boolean,
      default: !1
    },
    // 默认高亮的行
    lightLine: {
      type: Number,
      default: 0
    },
    // 是否根据高亮的行滚动表格让当前的高亮行始终可见
    scrollWhenLight: {
      type: Boolean,
      default: !1
    },
    // 没有数据时显示的文字
    emptyText: {
      type: String,
      default: "没有数据"
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: !0
    },
    // 边框颜色
    borderColor: {
      type: String,
      default: "#dfdfdf"
    },
    borderWidth: {
      type: String,
      default: "1px"
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
      default: "90vw"
    },
    dataChangeToTop: {
      type: Boolean,
      default: !0
    }
  }, {
    excludeChecked: {
      type: Array,
      default: () => []
    },
    excludeCheckedModifiers: {},
    checkAll: {
      type: Boolean,
      default: !1
    },
    checkAllModifiers: {},
    check: {
      type: Array,
      default() {
        return [];
      }
    },
    checkModifiers: {}
  }),
  emits: /* @__PURE__ */ R(["update:edit-header", "row-click", "span-click", "update:lightLine"], ["update:excludeChecked", "update:checkAll", "update:check"]),
  setup(a, { expose: j, emit: G }) {
    ce((e) => ({
      "3f2d5ed0": a.borderWidth,
      "415b5b96": a.borderColor
    }));
    const o = a, E = G, u = Number.parseInt(Math.random() * 1e8, 10), N = ue(), c = C(new pe());
    ie("hlTableStore", c);
    const b = C(!1);
    let H = !1;
    B(() => o.data, () => {
      c.value.setData(o.data), c.value.setStorageKey(o.storageKey), b.value = !0, h(() => {
        H && S();
      });
    }, {
      immediate: !0
    });
    function J() {
      b.value = !0, h(() => {
        S();
      });
    }
    function S() {
      T();
      const e = document.getElementById(u);
      if (!e)
        return;
      Q();
      const t = e.querySelector(".body-wrapper");
      if (t.style.width = "", o.data.length === 0) {
        const l = e.querySelector(".hl-table-header");
        l && h(() => {
          t.style.width = `${l.clientWidth}px`, q();
        });
        return;
      }
      h(() => {
        const l = e.getElementsByClassName("hl-table-body");
        if (!l || l.length === 0)
          return;
        const n = l[0].getElementsByClassName("hl-table-tr");
        if (n && n.length > 0) {
          const r = n[0].getElementsByClassName("hl-table-td"), m = [...c.value.columns];
          for (let i = 0, ne = r.length; i < ne; i++) {
            const re = r[i].getAttribute("data-uuid"), g = m.find((de) => de.uuid === re), v = `${r[i].getBoundingClientRect().width}px`;
            g.tdStyle.maxWidth = v, g.tdStyle.width = v, g.tdStyle.minWidth = v, g.thStyle.minWidth = v, g.thStyle.width = v, g.thStyle.maxWidth = v;
          }
          c.value.setColumns(m), q(), h(() => {
            te();
          });
        }
        setTimeout(() => {
          k.value && k.value.setScroll();
        }, 0), b.value = !1;
      });
    }
    function Q() {
      const e = document.getElementById(u);
      if (!e)
        return;
      const t = e.getElementsByClassName("hl-table-body");
      if (!t || t.length === 0)
        return;
      const l = [...c.value.columns];
      l.forEach((n) => {
        n.tdStyle.maxWidth = "", n.tdStyle.width = n.tdStyle.orgWidth, n.tdStyle.minWidth = n.tdStyle.orgMinWidth, n.thStyle.width = n.tdStyle.orgWidth, n.thStyle.minWidth = n.tdStyle.minWidth, n.thStyle.maxWidth = "";
      }), c.value.setColumns(l);
    }
    const f = C();
    function X(e, t) {
      o.hightLight && (f.value === t ? f.value = -1 : f.value = t, E("update:lightLine", f.value)), E("row-click", e, t);
    }
    B(f, () => {
      o.scrollWhenLight && Y();
    });
    function Y() {
      h(() => {
        const e = document.getElementById(u);
        if (!e)
          return;
        const t = e.getElementsByClassName("hl-table-body");
        if (!t || t.length === 0)
          return;
        const l = t[0].getElementsByClassName("hl-table-tr"), n = o.lightLine;
        let r = 0;
        for (let i = 0; i < n && i < l.length; i++)
          r += l[i].clientHeight;
        const m = e.querySelector(".body-wrapper");
        m.scrollTop = r;
      });
    }
    function Z(e, t) {
      E("span-click", e, t);
    }
    function _() {
      E("update:edit-header", !1);
    }
    const A = C(!1), k = C(), O = se(() => !!N.empty);
    B(
      () => o.lightLine,
      (e) => {
        o.hightLight && (f.value = e);
      },
      {
        immediate: !0
      }
    );
    function q() {
      const e = document.getElementById(u);
      if (!e)
        return;
      const t = e.querySelector(".hidden-columns").querySelectorAll("div");
      if (t && t.length > 0) {
        const l = {};
        c.value.columns.forEach((r) => {
          l[r.uuid] = r;
        });
        const n = [];
        t.forEach((r) => {
          const m = r.getAttribute("id");
          l[m] && n.push(l[m]);
        }), c.value.setColumns(n);
      }
    }
    const p = useDebounceFn(() => {
      b.value = !0, S();
    }, 100);
    let w = null, x = null, $ = 0;
    function ee() {
      useEventListener(window, "resize", p), w = new MutationObserver(p), x = new IntersectionObserver((e) => {
        e[0].intersectionRatio > 0 && $ <= 0 && p(), $ = e[0].intersectionRatio;
      });
    }
    function te() {
      T();
      let e = document.getElementById(u);
      if (e instanceof Element) {
        if (e = e.querySelector(".hl-table-body"), !e)
          return;
        w && w.observe(e, {
          attributes: !0,
          characterData: !0,
          childList: !0,
          subtree: !0,
          attributeOldValue: !0,
          characterDataOldValue: !0
        }), x && x.observe(e);
      }
    }
    const y = I(a, "excludeChecked"), W = I(a, "checkAll"), s = I(a, "check");
    function le(e) {
      W.value = e;
    }
    function ae(e) {
      e ? (o.data.forEach((t) => {
        t.checkbox = t[o.rowKey], s.value.push(t[o.rowKey]);
      }), s.value = Array.from(new Set(s.value)), y.value = []) : (o.data.forEach((t) => {
        t.checkbox = "", y.value.push(t[o.rowKey]);
      }), s.value = []);
    }
    B(W, (e) => {
      ae(e);
    }), B(() => o.data, (e, t) => {
      o.select && (o.crossPage ? e.forEach((l) => {
        if (W.value) {
          y.value.includes(l[o.rowKey]) ? l.checkbox = "" : l.checkbox = l[o.rowKey];
          return;
        }
        s.value.includes(l[o.rowKey]) && (l.checkbox = l[o.rowKey]);
      }) : (s.value = [], y.value = [])), o.dataChangeToTop && e.length === t.length && h(() => {
        document.getElementById(u) && (document.getElementById(u).querySelector(".body-wrapper").scrollTop = 0);
      });
    });
    function T() {
      w && w.disconnect(), x && x.disconnect();
    }
    function oe() {
      k.value && k.value.scrollBar();
    }
    return he(() => {
      p();
    }), fe(() => {
      ee(), h(() => {
        S(), H = !0;
      });
    }), ye(() => {
      T();
    }), j({
      doLayout: S,
      resize: p
    }), (e, t) => (K(), me("div", {
      id: d(u),
      class: ge(["hl-table", { "hl-table-border": a.border, nowrap: a.nowrap && !d(b) }]),
      style: V({ height: a.data.length === 0 ? "100%" : "" })
    }, [
      L("div", Ee, [
        M(e.$slots, "default", {}, void 0, !0)
      ]),
      d(c).columns.filter((l) => l.label).length > 0 ? (K(), z(d(we), {
        key: 0,
        "exclude-checked": y.value,
        "check-all": W.value,
        select: a.select,
        onSpanClick: Z,
        onChangeCheckAll: le
      }, null, 8, ["exclude-checked", "check-all", "select"])) : D("", !0),
      L("div", {
        class: "body-wrapper",
        style: V({ maxHeight: a.maxHeight }),
        onMouseenter: t[2] || (t[2] = (l) => A.value = a.data.length > 0 && !0),
        onMouseleave: t[3] || (t[3] = (l) => A.value = e.fasle),
        onScroll: oe
      }, [
        U(F(d(xe), {
          check: s.value,
          "onUpdate:check": t[0] || (t[0] = (l) => s.value = l),
          excludeChecked: y.value,
          "onUpdate:excludeChecked": t[1] || (t[1] = (l) => y.value = l),
          hover: a.hover,
          "active-index": d(f),
          select: a.select,
          "row-key": a.rowKey,
          "empty-text": a.emptyText,
          "row-class": a.rowClass,
          "tooltip-effect": a.tooltipEffect,
          onRowClick: X
        }, ve({ _: 2 }, [
          d(N).extend ? {
            name: "extend",
            fn: be(({ row: l }) => [
              M(e.$slots, "extend", { row: l }, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["check", "excludeChecked", "hover", "active-index", "select", "row-key", "empty-text", "row-class", "tooltip-effect"]), [
          [P, !(a.data.length === 0 && d(O))]
        ]),
        F(ke, {
          ref_key: "scroll_bar",
          ref: k,
          "table-id": d(u),
          active: d(A)
        }, null, 8, ["table-id", "active"]),
        U(L("div", We, [
          M(e.$slots, "empty", {}, void 0, !0)
        ], 512), [
          [P, a.data.length === 0 && d(O)]
        ])
      ], 36),
      a.storageKey ? (K(), z(Se, {
        key: 1,
        show: a.editHeader,
        onSubmit: J,
        onClose: _
      }, null, 8, ["show"])) : D("", !0)
    ], 14, Be));
  }
}, qe = /* @__PURE__ */ Ce(Ae, [["__scopeId", "data-v-7faecc70"]]);
export {
  qe as default
};
