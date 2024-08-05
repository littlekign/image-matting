import{u as S,r as u,y as G,A as N,k as A,a,c as n,b as s,t as r,g,h as $,I as D,F as k,l as y,C as h,m as b,p as E,d as T}from"./index-ud1mkppS.js";import{m as w}from"./message-CcOXwnpb.js";import{c as C}from"./convert_image-Coi8lgej.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";const d=_=>(E("data-v-352e4603"),_=_(),T(),_),z={class:"mx-auto"},U={class:"flex justify-center space-x-10 mt-4"},J=["value"],O=["disabled"],W={key:0,class:"mt-4 flex justify-center items-center"},q={class:"badge badge-info"},H={class:"mt-4 flex justify-center items-center"},K={class:"space-y-2 max-w-3xl min-w-96 overflow-y-auto",style:{"max-height":"60vh"}},Q={class:"grow ml-4 flex flex-col truncate"},R=["title"],X=["title"],Y={class:"flex-none btn btn-circle btn-ghost ml-4"},Z=["onClick"],ee=d(()=>s("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4",class:"opacity-25"},null,-1)),te=d(()=>s("path",{fill:"currentColor",d:"M4 12a8 8 0 017.5-7.98A4 4 0 104 12h4z",class:"opacity-75"},null,-1)),se=[ee,te],oe=["onClick"],le=d(()=>s("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"},null,-1)),ae=[le],ne=["onClick"],re=d(()=>s("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"},null,-1)),ce=[re],ie={key:1,class:"mt-6 text-center"},ue={key:2,class:"flex justify-center items-center"},de=d(()=>s("div",{class:"loader"},null,-1)),_e=[de],ve={__name:"MultiConvertImage",setup(_){const{t:v}=S(),p=u(!1),I=["PNG","JPEG","GIF","BMP","WEBP","ICO","ICNS","TIFF","PDF"],m=u("PNG"),c=u(null),i=u(!1),l=u([]),F=async()=>{const e=await b("open_folder_dialog","");e.code===200?c.value=e.data.folder_path:w.error(e.error_msg)},B=()=>{i.value=!1;for(let e=0;e<l.value.length;e++){const o=l.value[e];o.status==="waiting"&&(o.status="")}},P=G(()=>l.value.filter(e=>e.status==="processed").length),L=async()=>{p.value=!0;const e=await C("get_folder_convert_images",c.value);console.log("getConvertFileList",e),e.code===200?l.value=e.data.convert_images:w.error(e.error_msg),p.value=!1};N(c,async()=>{c.value&&await L()});const f=async e=>{await b("open_and_select_file",e)},M=async()=>{if(!i.value){i.value=!0,console.log("start deal image");for(let e=0;e<l.value.length;e++){const o=l.value[e];o.status===""&&(o.status="waiting")}for(let e=0;e<l.value.length;e++){const o=l.value[e];if(i.value===!0){if(o.status==="waiting"){console.log("deal image",o.image_path,c.value);const t=await C("convert_image_from_folder",{image_path:o.image_path,folder_path:c.value,output_format:m.value});t.code===200?(o.status="processed",o.convert_result=t.data.convert_result):(o.status="error",w.error(t.error_msg))}}else break}i.value=!1}};return A(()=>{i.value=!1,l.value=[],c.value=null}),(e,o)=>(a(),n("div",z,[s("div",U,[s("button",{class:"bg-green-500 btn text-white px-4 py-2 rounded-full btn-md",onClick:F},r(g(v)("convert.mult_convert_image.select_folder_btn")),1),$(s("select",{"onUpdate:modelValue":o[0]||(o[0]=t=>m.value=t),class:"select select-bordered w-32 px-4"},[(a(),n(k,null,y(I,t=>s("option",{value:t},r(t),9,J)),64))],512),[[D,m.value]]),s("button",{disabled:!m.value||!c.value,onClick:M,class:"bg-green-500 btn text-white px-4 py-2 rounded-full btn-md"},r(g(v)("convert.mult_convert_image.start_convert_btn")),9,O)]),l.value.length!==0?(a(),n("div",W,[s("span",q,r(g(v)("common.processing"))+" "+r(P.value)+" / "+r(l.value.length),1)])):h("",!0),s("div",H,[s("ul",K,[(a(!0),n(k,null,y(l.value,(t,j)=>(a(),n("li",{key:j,class:"flex p-2 rounded-lg"},[s("div",Q,[s("p",{class:"truncate",title:t.image_name},r(t.image_name),9,R),s("p",{class:"text-xs text-gray-400 truncate",title:t.image_path},r(t.image_path),9,X)]),s("span",Y,[t.status==="waiting"?(a(),n("svg",{key:0,onClick:x=>f(t.image_path),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",class:"w-6 h-6 animate-spin"},se,8,Z)):t.status==="processed"?(a(),n("svg",{key:1,onClick:x=>f(t.convert_result),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",class:"w-6 h-6 text-green-500"},ae,8,oe)):t.status==="error"?(a(),n("svg",{key:2,onClick:x=>f(t.image_path),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",class:"w-6 h-6 text-red-500"},ce,8,ne)):h("",!0)])]))),128))])]),i.value?(a(),n("div",ie,[s("button",{onClick:o[1]||(o[1]=t=>B()),class:"bg-green-500 text-white px-4 py-2 rounded-full"},r(g(v)("convert.mult_convert_image.finish")),1)])):h("",!0),p.value?(a(),n("div",ue,_e)):h("",!0)]))}},fe=V(ve,[["__scopeId","data-v-352e4603"]]);export{fe as default};