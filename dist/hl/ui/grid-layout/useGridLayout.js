import { isRef as p, watch as d } from "vue";
function c(t, e) {
  function s() {
    t.style.display = "grid", t.style["grid-row-gap"] = `${e.row_gap || e.gap || e.column_gap || 10}px`, t.style["grid-column-gap"] = `${e.column_gap || e.gap || e.row_gap || 10}px`;
  }
  function n() {
    const o = t.clientWidth;
    let i = o / e.width;
    i = i - Math.floor(i) > 0.5 ? Math.ceil(i) : Math.floor(i), e.min_width && o / i < e.min_width && (i -= 1), t.style["grid-template-columns"] = `repeat(${i}, 1fr)`;
  }
  let r = null;
  function u() {
    r && r.disconnect(), r = new ResizeObserver(() => {
      n();
    }), r.observe(t);
  }
  function a() {
    s(), n(), u();
  }
  function l() {
    p(t) ? d(t, () => {
      t = t.value, a();
    }, {
      once: !0
    }) : a();
  }
  l();
}
export {
  c as default
};
