import { IMAGE_SUFFIX as a, VIDEO_SUFFIX as c, FILE_SUFFIX as l, AUDIO_SUFFIX as i, getMimeType as _ } from "../../node_modules/.pnpm/@hl_utils@0.0.2_vue@3.4.33_typescript@5.5.3_/node_modules/@hl/utils/es/file.js";
const s = {
  image: a,
  video: c,
  file: l,
  audio: i
};
function p(r, t) {
  try {
    let e = [];
    if ((Array.isArray(r) ? r : r ? [r] : []).forEach((n) => {
      e = e.concat(s[n] || []);
    }), t && (t = Array.isArray(t) ? t : [t], t && t.length > 0)) {
      const n = [];
      t.forEach((o) => {
        e.includes(o) && n.push(o);
      }), e = n, e.length === 0 && console.warn("type和suffix设置冲突");
    }
    return e;
  } catch (e) {
    console.log(e);
  }
}
function g(r, t) {
  const e = p(r, t);
  return e.length === 0 ? "*/*" : _(e);
}
export {
  g as getAcceptType,
  p as getAllType
};
