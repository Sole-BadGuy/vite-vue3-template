import{r as i,o as m,c as h,d as y,a as g,b as E,e as u,w as l,f as p,g as _,p as b,h as B,i as x,j as C,k as F,E as I,l as V,m as L,n as S,q as k,s as w,t as A,u as D}from"./vendor.823fad1c.js";const N=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}};N();var f=(t,o)=>{for(const[a,n]of o)t[a]=n;return t};const O={};function P(t,o){const a=i("router-view");return m(),h(a)}var $=f(O,[["render",P]]);const q="modulepreload",v={},H="./",W=function(o,a){return!a||a.length===0?o():Promise.all(a.map(n=>{if(n=`${H}${n}`,n in v)return;v[n]=!0;const e=n.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${r}`))return;const s=document.createElement("link");if(s.rel=e?"stylesheet":q,e||(s.as="script",s.crossOrigin=""),s.href=n,document.head.appendChild(s),e)return new Promise((d,c)=>{s.addEventListener("load",d),s.addEventListener("error",c)})})).then(()=>o())};const j=t=>(b("data-v-6af725d9"),t=t(),B(),t),R={class:"loading"},T=_("\u767B\u5F55"),U=_("\u6CE8\u518C"),K=j(()=>p("a",null,"\u5FD8\u8BB0\u5BC6\u7801",-1)),z=y({setup(t){const o=g({});return(a,n)=>{const e=i("el-input"),r=i("el-form-item"),s=i("el-button"),d=i("el-form");return m(),E("div",R,[u(d,{model:o.value},{default:l(()=>[u(r,{label:"\u8D26\u53F7",rules:[{required:!0,message:"\u8D26\u6237\u662F\u5FC5\u586B\u9879"},{type:"number",message:"\u8D26\u53F7\u53EA\u80FD\u662F\u6570\u5B57"}]},{default:l(()=>[u(e,{modelValue:o.value.account,"onUpdate:modelValue":n[0]||(n[0]=c=>o.value.account=c)},null,8,["modelValue"])]),_:1}),u(r,{label:"\u5BC6\u7801",rules:[{required:!0,message:"\u5BC6\u7801\u662F\u5FC5\u586B\u9879"}]},{default:l(()=>[u(e,{modelValue:o.value.passWord,"onUpdate:modelValue":n[1]||(n[1]=c=>o.value.passWord=c)},null,8,["modelValue"])]),_:1}),u(r,{class:"loadingHandle"},{default:l(()=>[p("div",null,[u(s,{type:"primary",plain:""},{default:l(()=>[T]),_:1}),u(s,{type:"primary",plain:""},{default:l(()=>[U]),_:1})]),K]),_:1})]),_:1},8,["model"])])}}});var G=f(z,[["__scopeId","data-v-6af725d9"]]);const J={},M=[{path:"/",name:"Home",component:G},{path:"/vuex",name:"Vuex",component:J},{path:"/axios",name:"Axios",component:()=>W(()=>import("./axios.445b637b.js"),["assets/axios.445b637b.js","assets/vendor.823fad1c.js"])}],Q=x({history:C(),routes:M}),X={count:0};var Y=F({state(){return X},mutations:{increment(t){const o=t;o.count+=1}},actions:{increment(t){t.commit("increment")}},getters:{double(t){return 2*t.count}}});function Z(t){return[I,V,L,S,k,w,A].forEach(o=>{t.use(o)}),t}const ee=D($);Z(ee).use(Q).use(Y).mount("#app");export{f as _};
