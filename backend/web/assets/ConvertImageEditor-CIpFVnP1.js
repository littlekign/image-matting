import{m as u,u as y,j as x,r as l,A as F,a as m,c as _,f as w,b as a,t as c,g as p,h as P,I as C,F as B,l as E}from"./index-MjFPWu0o.js";import{I as k}from"./ImageCroperView-BmsvzW7g.js";import{m as i}from"./message-CyredAYb.js";import{_ as N}from"./_plugin-vue_export-helper-DlAUqK2U.js";async function O(d,s){return await u(`convert_image__${d}`,s)}const G={class:"container mx-auto"},S={class:"flex justify-center space-x-10 mt-4"},T=["value"],U=["disabled"],z={__name:"ConvertImageEditor",setup(d){const{t:s}=y();x();const f=l(""),o=l(""),n=l("PNG"),g=l({move:!0,crop:!1,cancel:!1,confirm:!1,zoomIn:!0,zoomOut:!0,rotateLeft:!1,rotateRight:!1,flipHorizontal:!1,flipVertical:!1,background:!1,delete:!1,play:!1}),v=["PNG","JPEG","GIF","BMP","WEBP","ICO","ICNS","TIFF","PDF"],b=async e=>{const t=await u("get_local_file_base64",e);return t.code===200?t.data.base64_image:(i.error(t.error_msg),"")},I=async()=>{const e=await u("open_file_dialog",!1);e.code===200&&(o.value=e.data.file_path)};F(o,async e=>{e&&(f.value=await b(e))});const h=async()=>{const e=await O("get_convert_image",{input_path:o.value,output_format:n.value});e.code===200?i.info("success"):(loading.value=!1,i.error(e.error_msg))};return(e,t)=>(m(),_("div",G,[w(k,{imageUrl:f.value,toolbarOptions:g.value},null,8,["imageUrl","toolbarOptions"]),a("div",S,[a("button",{class:"bg-green-500 btn text-white px-4 py-2 rounded-full btn-md",onClick:I},c(p(s)("convert.convert_image.select_btn")),1),P(a("select",{"onUpdate:modelValue":t[0]||(t[0]=r=>n.value=r),class:"select select-bordered w-32 px-4"},[(m(),_(B,null,E(v,r=>a("option",{value:r},c(r),9,T)),64))],512),[[C,n.value]]),a("button",{disabled:!o.value,onClick:h,class:"bg-green-500 btn text-white px-4 py-2 rounded-full btn-md"},c(p(s)("convert.convert_image.convert_btn")),9,U)])]))}},j=N(z,[["__scopeId","data-v-3d1e34d0"]]);export{j as default};