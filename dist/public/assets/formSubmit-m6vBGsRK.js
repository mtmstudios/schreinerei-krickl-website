import{c as n,r as d,j as l,a as u}from"./index-C5ZYRAWc.js";/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=n("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=n("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=n("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=n("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=n("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),m=d.forwardRef(({className:e,type:r,...s},t)=>l.jsx("input",{type:r,className:u("flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:t,...s}));m.displayName="Input";const f="https://mtmstudios.app.n8n.cloud/webhook/5ee4ef75-c909-4111-b837-ccedbd182a58",p=10*1024*1024,h=["application/pdf","image/jpeg","image/png"];async function g(e){return new Promise((r,s)=>{const t=new FileReader;t.readAsDataURL(e),t.onload=()=>{const c=t.result.split(",")[1];r(c)},t.onerror=o=>s(o)})}function L(e){return h.includes(e.type)?e.size>p?{valid:!1,error:`"${e.name}" ist zu groß (max. 10MB)`}:{valid:!0}:{valid:!1,error:`"${e.name}" ist kein erlaubtes Format (nur PDF, JPG, PNG)`}}function _(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function y(){const e={};if(typeof window>"u")return e;const r=new URLSearchParams(window.location.search);return["utm_source","utm_medium","utm_campaign","utm_term","utm_content"].forEach(t=>{const o=r.get(t);o&&(e[t]=o)}),e}async function I(e,r,s=[]){try{const t=await Promise.all(s.map(async a=>({filename:a.name,mimeType:a.type,data:await g(a)}))),o={formId:e,...r,anhaenge:t,pageUrl:typeof window<"u"?window.location.href:"",...y(),timestamp:new Date().toISOString()},c=JSON.stringify(o),i=await fetch(f,{method:"POST",headers:{"Content-Type":"application/json"},body:c});if(i.ok)try{const a=await i.json();return{ok:a.ok!==!1,message:a.message||"Erfolgreich gesendet",errors:a.errors}}catch{return{ok:!0,message:"Erfolgreich gesendet"}}else{const a=await i.text();throw console.error("Webhook error:",a),new Error(`Webhook returned ${i.status}: ${a}`)}}catch(t){return console.error("Submit error:",t),{ok:!1,message:"Netzwerkfehler. Bitte versuchen Sie es später erneut."}}}export{k as C,w as F,m as I,v as L,E as U,x as a,_ as b,I as s,L as v};
