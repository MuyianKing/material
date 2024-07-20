import { openBlock as a, createBlock as r, mergeProps as p } from "vue";
import n from "./components/Date.vue.js";
import y from "./components/DateRange.vue.js";
const l = {
  __name: "Index",
  props: {
    // date range
    type: {
      type: String,
      default: "date"
    },
    dateType: {
      type: String,
      default: "date"
    }
  },
  setup(e) {
    return (t, m) => e.type === "date" ? (a(), r(n, p({
      key: 0,
      type: e.dateType
    }, t.$attrs), null, 16, ["type"])) : (a(), r(y, p({
      key: 1,
      type: e.dateType
    }, t.$attrs), null, 16, ["type"]));
  }
};
export {
  l as default
};
