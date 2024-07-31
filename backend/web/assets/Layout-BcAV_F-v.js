import{r as f,o as k,a as r,c as d,b as e,s as p,p as y,d as b,u as M,e as v,f as a,w as l,g as n,h as $,v as L,n as C,i as m,t as h}from"./index-MjFPWu0o.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";const g=i=>(y("data-v-f5075fd4"),i=i(),b(),i),E={class:"p-4 flex justify-end items-center"},I={class:"flex cursor-pointer gap-2"},B=g(()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("circle",{cx:"12",cy:"12",r:"5"}),e("path",{d:"M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"})],-1)),S=["checked"],T=g(()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})],-1)),N={__name:"Header",setup(i){const t=f(!1),s=f("light"),_=async()=>{const c=await p("get","");s.value=c.data.theme,c.data.theme==="dark"?t.value=!0:t.value=!1},u=async()=>{await p("put",{theme:s.value})},o=async()=>{s.value==="dark"?(s.value="light",t.value=!1,document.documentElement.classList.contains("dark")&&document.documentElement.classList.remove("dark")):(s.value="dark",t.value=!0,document.documentElement.classList.add("dark")),await u()};return k(async()=>{await _(),s.value==="dark"?(t.value=!0,document.documentElement.classList.add("dark")):(t.value=!1,document.documentElement.classList.contains("dark")&&document.documentElement.classList.remove("dark"))}),(c,ce)=>(r(),d("header",E,[e("label",I,[B,e("input",{type:"checkbox",checked:t.value,onChange:o,class:"toggle theme-controller"},null,40,S),T])]))}},V=x(N,[["__scopeId","data-v-f5075fd4"]]),w="/logo.png",j={key:0,class:"p-4"},D=e("div",{class:"avatar"},[e("div",{class:"w-20 rounded-full"},[e("img",{src:w})])],-1),z={class:"mt-4"},A={class:"py-2"},H=e("i",{class:"fa-regular fa-arrows-to-eye text-2xl mr-2"},null,-1),O={class:"py-2"},P=e("i",{class:"fa-solid fa-id-card text-2xl mr-2"},null,-1),U={class:"py-2"},q=e("i",{class:"fa-solid fa-money-bill-transfer text-2xl mr-2"},null,-1),F={class:"py-2"},G=e("i",{class:"fa-solid fa-gear text-2xl mr-2"},null,-1),J={key:1,class:"flex flex-col items-center py-4"},K=e("div",{class:"avatar"},[e("div",{class:"w-8 rounded-full"},[e("img",{src:w})])],-1),Q={class:"mt-4"},R=e("i",{class:"fa-regular fa-arrows-to-eye text-2xl"},null,-1),W=e("i",{class:"fa-solid fa-id-card text-2xl"},null,-1),X=e("i",{class:"fa-solid fa-money-bill-transfer text-2xl"},null,-1),Y=e("i",{class:"fa-solid fa-gear text-2xl"},null,-1),Z={class:"btn btn-circle swap swap-rotate absolute bottom-4 left-2"},ee=e("i",{class:"fa-solid fa-bars swap-off"},null,-1),te=e("i",{class:"fa-solid fa-xmark swap-on"},null,-1),se={__name:"Nav",setup(i){const{t}=M(),s=f(!0);return(_,u)=>{const o=v("router-link");return r(),d("div",{class:C([{"w-50":s.value,"w-16":!s.value},"sidebar transition-all duration-300 relative"])},[s.value?(r(),d("div",j,[D,e("ul",z,[e("li",A,[a(o,{to:"/aimatting",class:"hover:underline flex items-center"},{default:l(()=>[H,m(" "+h(n(t)("menu.ai_matting_name")),1)]),_:1})]),e("li",O,[a(o,{to:"/ai-photo",class:"hover:underline flex items-center"},{default:l(()=>[P,m(h(n(t)("menu.ai_photo_name")),1)]),_:1})]),e("li",U,[a(o,{to:"/convert-home",class:"hover:underline flex items-center"},{default:l(()=>[q,m(" "+h(n(t)("menu.convert_name")),1)]),_:1})]),e("li",F,[a(o,{to:"/setting",class:"hover:underline flex items-center"},{default:l(()=>[G,m(" "+h(n(t)("menu.setting")),1)]),_:1})])])])):(r(),d("div",J,[K,e("div",Q,[a(o,{to:"/","data-tip":n(t)("menu.ai_matting_name"),class:"tooltip tooltip-right hover:underline flex items-center mb-4"},{default:l(()=>[R]),_:1},8,["data-tip"]),a(o,{to:"/ai-photo","data-tip":n(t)("menu.ai_photo_name"),class:"tooltip tooltip-right hover:underline flex items-center mb-4"},{default:l(()=>[W]),_:1},8,["data-tip"]),a(o,{to:"/convert-home","data-tip":n(t)("menu.convert_name"),class:"tooltip tooltip-right hover:underline flex items-center mb-4"},{default:l(()=>[X]),_:1},8,["data-tip"]),a(o,{to:"/setting","data-tip":n(t)("menu.setting"),class:"tooltip tooltip-right hover:underline flex items-center"},{default:l(()=>[Y]),_:1},8,["data-tip"])])])),e("label",Z,[$(e("input",{type:"checkbox","onUpdate:modelValue":u[0]||(u[0]=c=>s.value=c)},null,512),[[L,s.value]]),ee,te])],2)}}},ae={class:"flex flex-col min-h-screen"},oe={class:"flex flex-1"},le={class:"flex-1 flex flex-col p-4"},ne={class:"flex-1 p-4"},ie={__name:"Layout",setup(i){return(t,s)=>{const _=v("router-view");return r(),d("div",ae,[e("div",oe,[a(se),e("div",le,[a(V),e("main",ne,[a(_)])])])])}}},_e=x(ie,[["__scopeId","data-v-e6eb4df4"]]);export{_e as default};