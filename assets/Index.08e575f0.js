var D=Object.defineProperty;var $=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var g=(e,t,s)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,x=(e,t)=>{for(var s in t||(t={}))I.call(t,s)&&g(e,s,t[s]);if($)for(var s of $(t))F.call(t,s)&&g(e,s,t[s]);return e};import{g as f,y as k,B,r as d,o as p,c as y,w as o,p as a,t as T,m as n,s as E,v as C,N as i,h as v,j as l,R as N,A as S,ap as j}from"./vendor.a62b2750.js";import{_ as m,u as w}from"./index.0cf17714.js";const R=f({setup(){const e=k({updateTime:12.66});return x({},B(e))}}),A=e=>(E("data-v-62ce065b"),e=e(),C(),e),V=A(()=>a("span",null,"\u4F9D\u8D56\u4FE1\u606F",-1)),z={style:{float:"right"}},G={class:"bottom-btn"},M={target:"_blank",href:"https://github.com/vuejs/vue-next"},q=i(" vue3.x "),H={target:"_blank",href:"https://element-plus.gitee.io/#/zh-CN"},J=i(" element-plus "),K={target:"_blank",href:"https://github.com/intlify/vue-i18n-next"},L=i("vue-i18n-next"),O={target:"_blank",href:"https://www.tslang.cn/docs/home.html"},P=i("ts-3.9.3");function Q(e,t,s,c,_,h){const r=d("el-button"),u=d("el-card");return p(),y(u,{class:"card",shadow:"never"},{default:o(()=>[a("div",null,[V,a("div",z,"\u90E8\u7F72\u65F6\u95F4:"+T(e.updateTime),1)]),a("div",G,[a("a",M,[n(r,{type:"success"},{default:o(()=>[q]),_:1})]),a("a",H,[n(r,{type:"primary"},{default:o(()=>[J]),_:1})]),a("a",K,[n(r,{type:"warning"},{default:o(()=>[L]),_:1})]),a("a",O,[n(r,{type:"primary"},{default:o(()=>[P]),_:1})])])]),_:1})}var U=m(R,[["render",Q],["__scopeId","data-v-62ce065b"]]);const W={components:{DependsTable:U},setup(){}},X={class:"dashboard-editor-container"};function Y(e,t,s,c,_,h){const r=d("DependsTable"),u=d("el-col"),b=d("el-row");return p(),v("div",X,[n(b,{gutter:8},{default:o(()=>[n(u,{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:16},xl:{span:16},style:{"padding-right":"8px","margin-bottom":"30px"}},{default:o(()=>[n(r)]),_:1})]),_:1}),n(b,null,{default:o(()=>[n(u,{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:16},xl:{span:16},style:{"padding-right":"8px","margin-bottom":"30px"}})]),_:1})])}var Z=m(W,[["render",Y],["__scopeId","data-v-25c129cd"]]);const ee=f({components:{},setup(){const e="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3",t=w(),s=l(()=>t.state.user.name),c=l(()=>t.state.user.avatar),_=l(()=>t.state.user.roles);return{emptyGif:e,name:s,avatar:c,roles:_}}}),te={class:"dashboard-editor-container"};function se(e,t,s,c,_,h){return p(),v("div",te,"\u7F16\u8F91\u6743\u9650\u4E3B\u9875")}var ne=m(ee,[["render",se],["__scopeId","data-v-50741645"]]);const oe=f({components:{AdminDashboard:Z,EditorDashboard:ne},setup(){const e=w(),t=N("AdminDashboard"),s=l(()=>e.state.user.roles);return S(()=>{s.value.includes("admin")||(t.value="EditorDashboard")}),{currentRole:t}}}),ae={class:"dashboard-container"};function re(e,t,s,c,_,h){return p(),v("div",ae,[(p(),y(j(e.currentRole)))])}var pe=m(oe,[["render",re]]);export{pe as default};
