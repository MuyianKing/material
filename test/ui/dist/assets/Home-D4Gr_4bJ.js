import{b as _,d as m,u as h,c as y,o as a,a as l,e as u,w as k,r as b,f as d,g as c,n as f,h as p,i as g,F as v,j as C,k as E,l as $,m as B,t as N}from"./index-DntoZYTM.js";import{i as S,E as w,_ as L}from"./index-BMuQHOI0.js";const V=_({type:{type:String,values:["primary","success","warning","info","danger","default"],default:"default"},underline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},href:{type:String,default:""},target:{type:String,default:"_self"},icon:{type:S}}),P={click:n=>n instanceof MouseEvent},D=["href","target"],F=m({name:"ElLink"}),I=m({...F,props:V,emits:P,setup(n,{emit:r}){const s=n,t=h("link"),i=y(()=>[t.b(),t.m(s.type),t.is("disabled",s.disabled),t.is("underline",s.underline&&!s.disabled)]);function o(e){s.disabled||r("click",e)}return(e,H)=>(a(),l("a",{class:f(d(i)),href:e.disabled||!e.href?void 0:e.href,target:e.disabled||!e.href?void 0:e.target,onClick:o},[e.icon?(a(),u(d(w),{key:0},{default:k(()=>[(a(),u(b(e.icon)))]),_:1})):c("v-if",!0),e.$slots.default?(a(),l("span",{key:1,class:f(d(t).e("inner"))},[p(e.$slots,"default")],2)):c("v-if",!0),e.$slots.icon?p(e.$slots,"icon",{key:2}):c("v-if",!0)],10,D))}});var T=L(I,[["__file","link.vue"]]);const j=g(T),z={class:"pl-4"},q={__name:"Home",setup(n){const r=[{label:"按钮",route:"/button"},{label:"其他",route:"/others"}];return(s,t)=>{const i=j;return a(),l("div",z,[(a(),l(v,null,C(r,(o,e)=>E("div",{key:e},[$(i,{href:`#${o.route}`},{default:k(()=>[B(N(o.label),1)]),_:2},1032,["href"])])),64))])}}};export{q as default};
