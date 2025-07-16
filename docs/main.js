import{W as Dr,D as Fr}from"./assets/wcc_runner-DxPI38tH.js";var k=typeof window<"u"?window:null,Mt=k===null,Ie=Mt?void 0:k.document,H="addEventListener",U="removeEventListener",at="getBoundingClientRect",Ee="_a",K="_b",Z="_c",Fe="horizontal",q=function(){return!1},kr=Mt?"calc":["","-webkit-","-moz-","-o-"].filter(function(e){var t=Ie.createElement("div");return t.style.cssText="width:"+e+"calc(9px)",!!t.style.length}).shift()+"calc",bn=function(e){return typeof e=="string"||e instanceof String},tn=function(e){if(bn(e)){var t=Ie.querySelector(e);if(!t)throw new Error("Selector "+e+" did not match a DOM element");return t}return e},R=function(e,t,n){var r=e[t];return r!==void 0?r:n},ke=function(e,t,n,r){if(t){if(r==="end")return 0;if(r==="center")return e/2}else if(n){if(r==="start")return 0;if(r==="center")return e/2}return e},Br=function(e,t){var n=Ie.createElement("div");return n.className="gutter gutter-"+t,n},Hr=function(e,t,n){var r={};return bn(t)?r[e]=t:r[e]=kr+"("+t+"% - "+n+"px)",r},Ur=function(e,t){var n;return n={},n[e]=t+"px",n},Kr=function(e,t){if(t===void 0&&(t={}),Mt)return{};var n=e,r,i,s,a,o,c;Array.from&&(n=Array.from(n));var u=tn(n[0]),d=u.parentNode,m=getComputedStyle?getComputedStyle(d):null,v=m?m.flexDirection:null,E=R(t,"sizes")||n.map(function(){return 100/n.length}),I=R(t,"minSize",100),G=Array.isArray(I)?I:n.map(function(){return I}),_=R(t,"maxSize",1/0),b=Array.isArray(_)?_:n.map(function(){return _}),w=R(t,"expandToMin",!1),A=R(t,"gutterSize",10),C=R(t,"gutterAlign","center"),F=R(t,"snapOffset",30),Y=Array.isArray(F)?F:n.map(function(){return F}),X=R(t,"dragInterval",1),p=R(t,"direction",Fe),g=R(t,"cursor",p===Fe?"col-resize":"row-resize"),x=R(t,"gutter",Br),L=R(t,"elementStyle",Hr),T=R(t,"gutterStyle",Ur);p===Fe?(r="width",i="clientX",s="left",a="right",o="clientWidth"):p==="vertical"&&(r="height",i="clientY",s="top",a="bottom",o="clientHeight");function j(h,l,f,y){var P=L(r,l,f,y);Object.keys(P).forEach(function(z){h.style[z]=P[z]})}function st(h,l,f){var y=T(r,l,f);Object.keys(y).forEach(function(P){h.style[P]=y[P]})}function se(){return c.map(function(h){return h.size})}function je(h){return"touches"in h?h.touches[0][i]:h[i]}function Xt(h){var l=c[this.a],f=c[this.b],y=l.size+f.size;l.size=h/this.size*y,f.size=y-h/this.size*y,j(l.element,l.size,this[K],l.i),j(f.element,f.size,this[Z],f.i)}function Lr(h){var l,f=c[this.a],y=c[this.b];this.dragging&&(l=je(h)-this.start+(this[K]-this.dragOffset),X>1&&(l=Math.round(l/X)*X),l<=f.minSize+f.snapOffset+this[K]?l=f.minSize+this[K]:l>=this.size-(y.minSize+y.snapOffset+this[Z])&&(l=this.size-(y.minSize+this[Z])),l>=f.maxSize-f.snapOffset+this[K]?l=f.maxSize+this[K]:l<=this.size-(y.maxSize-y.snapOffset+this[Z])&&(l=this.size-(y.maxSize+this[Z])),Xt.call(this,l),R(t,"onDrag",q)(se()))}function Zt(){var h=c[this.a].element,l=c[this.b].element,f=h[at](),y=l[at]();this.size=f[r]+y[r]+this[K]+this[Z],this.start=f[s],this.end=f[a]}function Pr(h){if(!getComputedStyle)return null;var l=getComputedStyle(h);if(!l)return null;var f=h[o];return f===0?null:(p===Fe?f-=parseFloat(l.paddingLeft)+parseFloat(l.paddingRight):f-=parseFloat(l.paddingTop)+parseFloat(l.paddingBottom),f)}function Qt(h){var l=Pr(d);if(l===null||G.reduce(function(z,D){return z+D},0)>l)return h;var f=0,y=[],P=h.map(function(z,D){var oe=l*z/100,$e=ke(A,D===0,D===h.length-1,C),De=G[D]+$e;return oe<De?(f+=De-oe,y.push(0),De):(y.push(oe-De),oe)});return f===0?h:P.map(function(z,D){var oe=z;if(f>0&&y[D]-f>0){var $e=Math.min(f,y[D]-f);f-=$e,oe=z-$e}return oe/l*100})}function Rr(){var h=this,l=c[h.a].element,f=c[h.b].element;h.dragging&&R(t,"onDragEnd",q)(se()),h.dragging=!1,k[U]("mouseup",h.stop),k[U]("touchend",h.stop),k[U]("touchcancel",h.stop),k[U]("mousemove",h.move),k[U]("touchmove",h.move),h.stop=null,h.move=null,l[U]("selectstart",q),l[U]("dragstart",q),f[U]("selectstart",q),f[U]("dragstart",q),l.style.userSelect="",l.style.webkitUserSelect="",l.style.MozUserSelect="",l.style.pointerEvents="",f.style.userSelect="",f.style.webkitUserSelect="",f.style.MozUserSelect="",f.style.pointerEvents="",h.gutter.style.cursor="",h.parent.style.cursor="",Ie.body.style.cursor=""}function Nr(h){if(!("button"in h&&h.button!==0)){var l=this,f=c[l.a].element,y=c[l.b].element;l.dragging||R(t,"onDragStart",q)(se()),h.preventDefault(),l.dragging=!0,l.move=Lr.bind(l),l.stop=Rr.bind(l),k[H]("mouseup",l.stop),k[H]("touchend",l.stop),k[H]("touchcancel",l.stop),k[H]("mousemove",l.move),k[H]("touchmove",l.move),f[H]("selectstart",q),f[H]("dragstart",q),y[H]("selectstart",q),y[H]("dragstart",q),f.style.userSelect="none",f.style.webkitUserSelect="none",f.style.MozUserSelect="none",f.style.pointerEvents="none",y.style.userSelect="none",y.style.webkitUserSelect="none",y.style.MozUserSelect="none",y.style.pointerEvents="none",l.gutter.style.cursor=g,l.parent.style.cursor=g,Ie.body.style.cursor=g,Zt.call(l),l.dragOffset=je(h)-l.end}}E=Qt(E);var ae=[];c=n.map(function(h,l){var f={element:tn(h),size:E[l],minSize:G[l],maxSize:b[l],snapOffset:Y[l],i:l},y;if(l>0&&(y={a:l-1,b:l,dragging:!1,direction:p,parent:d},y[K]=ke(A,l-1===0,!1,C),y[Z]=ke(A,!1,l===n.length-1,C),v==="row-reverse"||v==="column-reverse")){var P=y.a;y.a=y.b,y.b=P}if(l>0){var z=x(l,p,f.element);st(z,A,l),y[Ee]=Nr.bind(y),z[H]("mousedown",y[Ee]),z[H]("touchstart",y[Ee]),d.insertBefore(z,f.element),y.gutter=z}return j(f.element,f.size,ke(A,l===0,l===n.length-1,C),l),l>0&&ae.push(y),f});function en(h){var l=h.i===ae.length,f=l?ae[h.i-1]:ae[h.i];Zt.call(f);var y=l?f.size-h.minSize-f[Z]:h.minSize+f[K];Xt.call(f,y)}c.forEach(function(h){var l=h.element[at]()[r];l<h.minSize&&(w?en(h):h.minSize=l)});function jr(h){var l=Qt(h);l.forEach(function(f,y){if(y>0){var P=ae[y-1],z=c[P.a],D=c[P.b];z.size=l[y-1],D.size=f,j(z.element,z.size,P[K],z.i),j(D.element,D.size,P[Z],D.i)}})}function $r(h,l){ae.forEach(function(f){if(l!==!0?f.parent.removeChild(f.gutter):(f.gutter[U]("mousedown",f[Ee]),f.gutter[U]("touchstart",f[Ee])),h!==!0){var y=L(r,f.a.size,f[K]);Object.keys(y).forEach(function(P){c[f.a].element.style[P]="",c[f.b].element.style[P]=""})}})}return{setSizes:jr,getSizes:se,collapse:function(l){en(c[l])},destroy:$r,parent:d,pairs:ae}};let ee;class qr{constructor(t,n,r,i=0,s=1/0){this.terminalLineNo=t,this.sourceLineNo=n,this.message=r,this.colStart=i,this.tokenLength=s}}const _e=class _e{static clamp(t,n,r){return r<n||t<n?n:t>r?r:t}static async bolbToBase64(t){return await new Promise(n=>{const r=new FileReader;r.onloadend=()=>n(r.result.replace(/data:.*\/.*;base64,/,"")),r.readAsDataURL(t)})}static async base64ToBlob(t){return await fetch("data:application/octet-stream;base64,"+t).then(n=>n.blob())}static async compressText(t){const n=new Response(t).body.pipeThrough(new CompressionStream("deflate"));return await new Response(n).blob()}static async decompressText(t){const n=t.stream().pipeThrough(new DecompressionStream("deflate"));return new Response(n).text()}static setTerminal(t){ee=t}static putTerminal(t){ee.updateOptions({readOnly:!1}),ee.executeEdits("",[{range:ee.getSelection(),text:t.toString()}]),ee.updateOptions({readOnly:!0})}static putTerminalError(t){console.error(t),_e.putTerminal(t)}static clearTerminal(){ee.setScrollTop(0),ee.setValue("")}static analyzeCompileErrors(){const t=ee.getValue().split(`
`),n=[];for(let r=0;r<t.length;++r){const i=t[r];if(i==="")continue;let s=i.match(/^main\.c\((\d+)\):\s?(.*)(\s*)$/);if(s){const a=parseInt(s[1]),o=s[2];n.push(new qr(r,a,o))}if(s=i.match(/^(\s*)(\^~*)/),s){const a=s[1],o=s[2];if(n.length>0){const c=n[n.length-1];c.colStart=a.length+1,c.tokenLength=o.length}}}_e.compileErrors=n}static clearCompileErrors(){_e.compileErrors=null}};_e.compileErrors=null;let $=_e;var dt=!1,pt=!1,ue=[],ht=-1;function Wr(e){Vr(e)}function Vr(e){ue.includes(e)||ue.push(e),Jr()}function Gr(e){let t=ue.indexOf(e);t!==-1&&t>ht&&ue.splice(t,1)}function Jr(){!pt&&!dt&&(dt=!0,queueMicrotask(Yr))}function Yr(){dt=!1,pt=!0;for(let e=0;e<ue.length;e++)ue[e](),ht=e;ue.length=0,ht=-1,pt=!1}var ve,ge,be,xn,gt=!0;function Xr(e){gt=!1,e(),gt=!0}function Zr(e){ve=e.reactive,be=e.release,ge=t=>e.effect(t,{scheduler:n=>{gt?Wr(n):n()}}),xn=e.raw}function nn(e){ge=e}function Qr(e){let t=()=>{};return[r=>{let i=ge(r);return e._x_effects||(e._x_effects=new Set,e._x_runEffects=()=>{e._x_effects.forEach(s=>s())}),e._x_effects.add(i),t=()=>{i!==void 0&&(e._x_effects.delete(i),be(i))},i},()=>{t()}]}function wn(e,t){let n=!0,r,i=ge(()=>{let s=e();JSON.stringify(s),n?r=s:queueMicrotask(()=>{t(s,r),r=s}),n=!1});return()=>be(i)}var Sn=[],En=[],An=[];function ei(e){An.push(e)}function Tt(e,t){typeof t=="function"?(e._x_cleanups||(e._x_cleanups=[]),e._x_cleanups.push(t)):(t=e,En.push(t))}function On(e){Sn.push(e)}function Cn(e,t,n){e._x_attributeCleanups||(e._x_attributeCleanups={}),e._x_attributeCleanups[t]||(e._x_attributeCleanups[t]=[]),e._x_attributeCleanups[t].push(n)}function zn(e,t){e._x_attributeCleanups&&Object.entries(e._x_attributeCleanups).forEach(([n,r])=>{(t===void 0||t.includes(n))&&(r.forEach(i=>i()),delete e._x_attributeCleanups[n])})}function ti(e){var t,n;for((t=e._x_effects)==null||t.forEach(Gr);(n=e._x_cleanups)!=null&&n.length;)e._x_cleanups.pop()()}var It=new MutationObserver(Nt),Lt=!1;function Pt(){It.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0}),Lt=!0}function Mn(){ni(),It.disconnect(),Lt=!1}var Ae=[];function ni(){let e=It.takeRecords();Ae.push(()=>e.length>0&&Nt(e));let t=Ae.length;queueMicrotask(()=>{if(Ae.length===t)for(;Ae.length>0;)Ae.shift()()})}function O(e){if(!Lt)return e();Mn();let t=e();return Pt(),t}var Rt=!1,Ge=[];function ri(){Rt=!0}function ii(){Rt=!1,Nt(Ge),Ge=[]}function Nt(e){if(Rt){Ge=Ge.concat(e);return}let t=[],n=new Set,r=new Map,i=new Map;for(let s=0;s<e.length;s++)if(!e[s].target._x_ignoreMutationObserver&&(e[s].type==="childList"&&(e[s].removedNodes.forEach(a=>{a.nodeType===1&&a._x_marker&&n.add(a)}),e[s].addedNodes.forEach(a=>{if(a.nodeType===1){if(n.has(a)){n.delete(a);return}a._x_marker||t.push(a)}})),e[s].type==="attributes")){let a=e[s].target,o=e[s].attributeName,c=e[s].oldValue,u=()=>{r.has(a)||r.set(a,[]),r.get(a).push({name:o,value:a.getAttribute(o)})},d=()=>{i.has(a)||i.set(a,[]),i.get(a).push(o)};a.hasAttribute(o)&&c===null?u():a.hasAttribute(o)?(d(),u()):d()}i.forEach((s,a)=>{zn(a,s)}),r.forEach((s,a)=>{Sn.forEach(o=>o(a,s))});for(let s of n)t.some(a=>a.contains(s))||En.forEach(a=>a(s));for(let s of t)s.isConnected&&An.forEach(a=>a(s));t=null,n=null,r=null,i=null}function Tn(e){return Re(ye(e))}function Pe(e,t,n){return e._x_dataStack=[t,...ye(n||e)],()=>{e._x_dataStack=e._x_dataStack.filter(r=>r!==t)}}function ye(e){return e._x_dataStack?e._x_dataStack:typeof ShadowRoot=="function"&&e instanceof ShadowRoot?ye(e.host):e.parentNode?ye(e.parentNode):[]}function Re(e){return new Proxy({objects:e},si)}var si={ownKeys({objects:e}){return Array.from(new Set(e.flatMap(t=>Object.keys(t))))},has({objects:e},t){return t==Symbol.unscopables?!1:e.some(n=>Object.prototype.hasOwnProperty.call(n,t)||Reflect.has(n,t))},get({objects:e},t,n){return t=="toJSON"?ai:Reflect.get(e.find(r=>Reflect.has(r,t))||{},t,n)},set({objects:e},t,n,r){const i=e.find(a=>Object.prototype.hasOwnProperty.call(a,t))||e[e.length-1],s=Object.getOwnPropertyDescriptor(i,t);return s!=null&&s.set&&(s!=null&&s.get)?s.set.call(r,n)||!0:Reflect.set(i,t,n)}};function ai(){return Reflect.ownKeys(this).reduce((t,n)=>(t[n]=Reflect.get(this,n),t),{})}function In(e){let t=r=>typeof r=="object"&&!Array.isArray(r)&&r!==null,n=(r,i="")=>{Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([s,{value:a,enumerable:o}])=>{if(o===!1||a===void 0||typeof a=="object"&&a!==null&&a.__v_skip)return;let c=i===""?s:`${i}.${s}`;typeof a=="object"&&a!==null&&a._x_interceptor?r[s]=a.initialize(e,c,s):t(a)&&a!==r&&!(a instanceof Element)&&n(a,c)})};return n(e)}function Ln(e,t=()=>{}){let n={initialValue:void 0,_x_interceptor:!0,initialize(r,i,s){return e(this.initialValue,()=>oi(r,i),a=>_t(r,i,a),i,s)}};return t(n),r=>{if(typeof r=="object"&&r!==null&&r._x_interceptor){let i=n.initialize.bind(n);n.initialize=(s,a,o)=>{let c=r.initialize(s,a,o);return n.initialValue=c,i(s,a,o)}}else n.initialValue=r;return n}}function oi(e,t){return t.split(".").reduce((n,r)=>n[r],e)}function _t(e,t,n){if(typeof t=="string"&&(t=t.split(".")),t.length===1)e[t[0]]=n;else{if(t.length===0)throw error;return e[t[0]]||(e[t[0]]={}),_t(e[t[0]],t.slice(1),n)}}var Pn={};function V(e,t){Pn[e]=t}function yt(e,t){let n=ci(t);return Object.entries(Pn).forEach(([r,i])=>{Object.defineProperty(e,`$${r}`,{get(){return i(t,n)},enumerable:!1})}),e}function ci(e){let[t,n]=Fn(e),r={interceptor:Ln,...t};return Tt(e,n),r}function li(e,t,n,...r){try{return n(...r)}catch(i){Le(i,e,t)}}function Le(e,t,n=void 0){e=Object.assign(e??{message:"No error message given."},{el:t,expression:n}),console.warn(`Alpine Expression Error: ${e.message}

${n?'Expression: "'+n+`"

`:""}`,t),setTimeout(()=>{throw e},0)}var We=!0;function Rn(e){let t=We;We=!1;let n=e();return We=t,n}function fe(e,t,n={}){let r;return N(e,t)(i=>r=i,n),r}function N(...e){return Nn(...e)}var Nn=jn;function ui(e){Nn=e}function jn(e,t){let n={};yt(n,e);let r=[n,...ye(e)],i=typeof t=="function"?fi(r,t):pi(r,t,e);return li.bind(null,e,t,i)}function fi(e,t){return(n=()=>{},{scope:r={},params:i=[]}={})=>{let s=t.apply(Re([r,...e]),i);Je(n,s)}}var ot={};function di(e,t){if(ot[e])return ot[e];let n=Object.getPrototypeOf(async function(){}).constructor,r=/^[\n\s]*if.*\(.*\)/.test(e.trim())||/^(let|const)\s/.test(e.trim())?`(async()=>{ ${e} })()`:e,s=(()=>{try{let a=new n(["__self","scope"],`with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);return Object.defineProperty(a,"name",{value:`[Alpine] ${e}`}),a}catch(a){return Le(a,t,e),Promise.resolve()}})();return ot[e]=s,s}function pi(e,t,n){let r=di(t,n);return(i=()=>{},{scope:s={},params:a=[]}={})=>{r.result=void 0,r.finished=!1;let o=Re([s,...e]);if(typeof r=="function"){let c=r(r,o).catch(u=>Le(u,n,t));r.finished?(Je(i,r.result,o,a,n),r.result=void 0):c.then(u=>{Je(i,u,o,a,n)}).catch(u=>Le(u,n,t)).finally(()=>r.result=void 0)}}}function Je(e,t,n,r,i){if(We&&typeof t=="function"){let s=t.apply(n,r);s instanceof Promise?s.then(a=>Je(e,a,n,r)).catch(a=>Le(a,i,t)):e(s)}else typeof t=="object"&&t instanceof Promise?t.then(s=>e(s)):e(t)}var jt="x-";function xe(e=""){return jt+e}function hi(e){jt=e}var Ye={};function M(e,t){return Ye[e]=t,{before(n){if(!Ye[n]){console.warn(String.raw`Cannot find directive \`${n}\`. \`${e}\` will use the default order of execution`);return}const r=le.indexOf(n);le.splice(r>=0?r:le.indexOf("DEFAULT"),0,e)}}}function gi(e){return Object.keys(Ye).includes(e)}function $t(e,t,n){if(t=Array.from(t),e._x_virtualDirectives){let s=Object.entries(e._x_virtualDirectives).map(([o,c])=>({name:o,value:c})),a=$n(s);s=s.map(o=>a.find(c=>c.name===o.name)?{name:`x-bind:${o.name}`,value:`"${o.value}"`}:o),t=t.concat(s)}let r={};return t.map(Hn((s,a)=>r[s]=a)).filter(Kn).map(mi(r,n)).sort(vi).map(s=>yi(e,s))}function $n(e){return Array.from(e).map(Hn()).filter(t=>!Kn(t))}var mt=!1,ze=new Map,Dn=Symbol();function _i(e){mt=!0;let t=Symbol();Dn=t,ze.set(t,[]);let n=()=>{for(;ze.get(t).length;)ze.get(t).shift()();ze.delete(t)},r=()=>{mt=!1,n()};e(n),r()}function Fn(e){let t=[],n=o=>t.push(o),[r,i]=Qr(e);return t.push(i),[{Alpine:Ne,effect:r,cleanup:n,evaluateLater:N.bind(N,e),evaluate:fe.bind(fe,e)},()=>t.forEach(o=>o())]}function yi(e,t){let n=()=>{},r=Ye[t.type]||n,[i,s]=Fn(e);Cn(e,t.original,s);let a=()=>{e._x_ignore||e._x_ignoreSelf||(r.inline&&r.inline(e,t,i),r=r.bind(r,e,t,i),mt?ze.get(Dn).push(r):r())};return a.runCleanups=s,a}var kn=(e,t)=>({name:n,value:r})=>(n.startsWith(e)&&(n=n.replace(e,t)),{name:n,value:r}),Bn=e=>e;function Hn(e=()=>{}){return({name:t,value:n})=>{let{name:r,value:i}=Un.reduce((s,a)=>a(s),{name:t,value:n});return r!==t&&e(r,t),{name:r,value:i}}}var Un=[];function Dt(e){Un.push(e)}function Kn({name:e}){return qn().test(e)}var qn=()=>new RegExp(`^${jt}([^:^.]+)\\b`);function mi(e,t){return({name:n,value:r})=>{let i=n.match(qn()),s=n.match(/:([a-zA-Z0-9\-_:]+)/),a=n.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],o=t||e[n]||n;return{type:i?i[1]:null,value:s?s[1]:null,modifiers:a.map(c=>c.replace(".","")),expression:r,original:o}}}var vt="DEFAULT",le=["ignore","ref","data","id","anchor","bind","init","for","model","modelable","transition","show","if",vt,"teleport"];function vi(e,t){let n=le.indexOf(e.type)===-1?vt:e.type,r=le.indexOf(t.type)===-1?vt:t.type;return le.indexOf(n)-le.indexOf(r)}function Me(e,t,n={}){e.dispatchEvent(new CustomEvent(t,{detail:n,bubbles:!0,composed:!0,cancelable:!0}))}function he(e,t){if(typeof ShadowRoot=="function"&&e instanceof ShadowRoot){Array.from(e.children).forEach(i=>he(i,t));return}let n=!1;if(t(e,()=>n=!0),n)return;let r=e.firstElementChild;for(;r;)he(r,t),r=r.nextElementSibling}function B(e,...t){console.warn(`Alpine Warning: ${e}`,...t)}var rn=!1;function bi(){rn&&B("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),rn=!0,document.body||B("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),Me(document,"alpine:init"),Me(document,"alpine:initializing"),Pt(),ei(t=>Q(t,he)),Tt(t=>Se(t)),On((t,n)=>{$t(t,n).forEach(r=>r())});let e=t=>!Ze(t.parentElement,!0);Array.from(document.querySelectorAll(Gn().join(","))).filter(e).forEach(t=>{Q(t)}),Me(document,"alpine:initialized"),setTimeout(()=>{Ei()})}var Ft=[],Wn=[];function Vn(){return Ft.map(e=>e())}function Gn(){return Ft.concat(Wn).map(e=>e())}function Jn(e){Ft.push(e)}function Yn(e){Wn.push(e)}function Ze(e,t=!1){return we(e,n=>{if((t?Gn():Vn()).some(i=>n.matches(i)))return!0})}function we(e,t){if(e){if(t(e))return e;if(e._x_teleportBack&&(e=e._x_teleportBack),!!e.parentElement)return we(e.parentElement,t)}}function xi(e){return Vn().some(t=>e.matches(t))}var Xn=[];function wi(e){Xn.push(e)}var Si=1;function Q(e,t=he,n=()=>{}){we(e,r=>r._x_ignore)||_i(()=>{t(e,(r,i)=>{r._x_marker||(n(r,i),Xn.forEach(s=>s(r,i)),$t(r,r.attributes).forEach(s=>s()),r._x_ignore||(r._x_marker=Si++),r._x_ignore&&i())})})}function Se(e,t=he){t(e,n=>{ti(n),zn(n),delete n._x_marker})}function Ei(){[["ui","dialog",["[x-dialog], [x-popover]"]],["anchor","anchor",["[x-anchor]"]],["sort","sort",["[x-sort]"]]].forEach(([t,n,r])=>{gi(n)||r.some(i=>{if(document.querySelector(i))return B(`found "${i}", but missing ${t} plugin`),!0})})}var bt=[],kt=!1;function Bt(e=()=>{}){return queueMicrotask(()=>{kt||setTimeout(()=>{xt()})}),new Promise(t=>{bt.push(()=>{e(),t()})})}function xt(){for(kt=!1;bt.length;)bt.shift()()}function Ai(){kt=!0}function Ht(e,t){return Array.isArray(t)?sn(e,t.join(" ")):typeof t=="object"&&t!==null?Oi(e,t):typeof t=="function"?Ht(e,t()):sn(e,t)}function sn(e,t){let n=i=>i.split(" ").filter(s=>!e.classList.contains(s)).filter(Boolean),r=i=>(e.classList.add(...i),()=>{e.classList.remove(...i)});return t=t===!0?t="":t||"",r(n(t))}function Oi(e,t){let n=o=>o.split(" ").filter(Boolean),r=Object.entries(t).flatMap(([o,c])=>c?n(o):!1).filter(Boolean),i=Object.entries(t).flatMap(([o,c])=>c?!1:n(o)).filter(Boolean),s=[],a=[];return i.forEach(o=>{e.classList.contains(o)&&(e.classList.remove(o),a.push(o))}),r.forEach(o=>{e.classList.contains(o)||(e.classList.add(o),s.push(o))}),()=>{a.forEach(o=>e.classList.add(o)),s.forEach(o=>e.classList.remove(o))}}function Qe(e,t){return typeof t=="object"&&t!==null?Ci(e,t):zi(e,t)}function Ci(e,t){let n={};return Object.entries(t).forEach(([r,i])=>{n[r]=e.style[r],r.startsWith("--")||(r=Mi(r)),e.style.setProperty(r,i)}),setTimeout(()=>{e.style.length===0&&e.removeAttribute("style")}),()=>{Qe(e,n)}}function zi(e,t){let n=e.getAttribute("style",t);return e.setAttribute("style",t),()=>{e.setAttribute("style",n||"")}}function Mi(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function wt(e,t=()=>{}){let n=!1;return function(){n?t.apply(this,arguments):(n=!0,e.apply(this,arguments))}}M("transition",(e,{value:t,modifiers:n,expression:r},{evaluate:i})=>{typeof r=="function"&&(r=i(r)),r!==!1&&(!r||typeof r=="boolean"?Ii(e,n,t):Ti(e,r,t))});function Ti(e,t,n){Zn(e,Ht,""),{enter:i=>{e._x_transition.enter.during=i},"enter-start":i=>{e._x_transition.enter.start=i},"enter-end":i=>{e._x_transition.enter.end=i},leave:i=>{e._x_transition.leave.during=i},"leave-start":i=>{e._x_transition.leave.start=i},"leave-end":i=>{e._x_transition.leave.end=i}}[n](t)}function Ii(e,t,n){Zn(e,Qe);let r=!t.includes("in")&&!t.includes("out")&&!n,i=r||t.includes("in")||["enter"].includes(n),s=r||t.includes("out")||["leave"].includes(n);t.includes("in")&&!r&&(t=t.filter((b,w)=>w<t.indexOf("out"))),t.includes("out")&&!r&&(t=t.filter((b,w)=>w>t.indexOf("out")));let a=!t.includes("opacity")&&!t.includes("scale"),o=a||t.includes("opacity"),c=a||t.includes("scale"),u=o?0:1,d=c?Oe(t,"scale",95)/100:1,m=Oe(t,"delay",0)/1e3,v=Oe(t,"origin","center"),E="opacity, transform",I=Oe(t,"duration",150)/1e3,G=Oe(t,"duration",75)/1e3,_="cubic-bezier(0.4, 0.0, 0.2, 1)";i&&(e._x_transition.enter.during={transformOrigin:v,transitionDelay:`${m}s`,transitionProperty:E,transitionDuration:`${I}s`,transitionTimingFunction:_},e._x_transition.enter.start={opacity:u,transform:`scale(${d})`},e._x_transition.enter.end={opacity:1,transform:"scale(1)"}),s&&(e._x_transition.leave.during={transformOrigin:v,transitionDelay:`${m}s`,transitionProperty:E,transitionDuration:`${G}s`,transitionTimingFunction:_},e._x_transition.leave.start={opacity:1,transform:"scale(1)"},e._x_transition.leave.end={opacity:u,transform:`scale(${d})`})}function Zn(e,t,n={}){e._x_transition||(e._x_transition={enter:{during:n,start:n,end:n},leave:{during:n,start:n,end:n},in(r=()=>{},i=()=>{}){St(e,t,{during:this.enter.during,start:this.enter.start,end:this.enter.end},r,i)},out(r=()=>{},i=()=>{}){St(e,t,{during:this.leave.during,start:this.leave.start,end:this.leave.end},r,i)}})}window.Element.prototype._x_toggleAndCascadeWithTransitions=function(e,t,n,r){const i=document.visibilityState==="visible"?requestAnimationFrame:setTimeout;let s=()=>i(n);if(t){e._x_transition&&(e._x_transition.enter||e._x_transition.leave)?e._x_transition.enter&&(Object.entries(e._x_transition.enter.during).length||Object.entries(e._x_transition.enter.start).length||Object.entries(e._x_transition.enter.end).length)?e._x_transition.in(n):s():e._x_transition?e._x_transition.in(n):s();return}e._x_hidePromise=e._x_transition?new Promise((a,o)=>{e._x_transition.out(()=>{},()=>a(r)),e._x_transitioning&&e._x_transitioning.beforeCancel(()=>o({isFromCancelledTransition:!0}))}):Promise.resolve(r),queueMicrotask(()=>{let a=Qn(e);a?(a._x_hideChildren||(a._x_hideChildren=[]),a._x_hideChildren.push(e)):i(()=>{let o=c=>{let u=Promise.all([c._x_hidePromise,...(c._x_hideChildren||[]).map(o)]).then(([d])=>d==null?void 0:d());return delete c._x_hidePromise,delete c._x_hideChildren,u};o(e).catch(c=>{if(!c.isFromCancelledTransition)throw c})})})};function Qn(e){let t=e.parentNode;if(t)return t._x_hidePromise?t:Qn(t)}function St(e,t,{during:n,start:r,end:i}={},s=()=>{},a=()=>{}){if(e._x_transitioning&&e._x_transitioning.cancel(),Object.keys(n).length===0&&Object.keys(r).length===0&&Object.keys(i).length===0){s(),a();return}let o,c,u;Li(e,{start(){o=t(e,r)},during(){c=t(e,n)},before:s,end(){o(),u=t(e,i)},after:a,cleanup(){c(),u()}})}function Li(e,t){let n,r,i,s=wt(()=>{O(()=>{n=!0,r||t.before(),i||(t.end(),xt()),t.after(),e.isConnected&&t.cleanup(),delete e._x_transitioning})});e._x_transitioning={beforeCancels:[],beforeCancel(a){this.beforeCancels.push(a)},cancel:wt(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();s()}),finish:s},O(()=>{t.start(),t.during()}),Ai(),requestAnimationFrame(()=>{if(n)return;let a=Number(getComputedStyle(e).transitionDuration.replace(/,.*/,"").replace("s",""))*1e3,o=Number(getComputedStyle(e).transitionDelay.replace(/,.*/,"").replace("s",""))*1e3;a===0&&(a=Number(getComputedStyle(e).animationDuration.replace("s",""))*1e3),O(()=>{t.before()}),r=!0,requestAnimationFrame(()=>{n||(O(()=>{t.end()}),xt(),setTimeout(e._x_transitioning.finish,a+o),i=!0)})})}function Oe(e,t,n){if(e.indexOf(t)===-1)return n;const r=e[e.indexOf(t)+1];if(!r||t==="scale"&&isNaN(r))return n;if(t==="duration"||t==="delay"){let i=r.match(/([0-9]+)ms/);if(i)return i[1]}return t==="origin"&&["top","right","left","center","bottom"].includes(e[e.indexOf(t)+2])?[r,e[e.indexOf(t)+2]].join(" "):r}var ne=!1;function ie(e,t=()=>{}){return(...n)=>ne?t(...n):e(...n)}function Pi(e){return(...t)=>ne&&e(...t)}var er=[];function et(e){er.push(e)}function Ri(e,t){er.forEach(n=>n(e,t)),ne=!0,tr(()=>{Q(t,(n,r)=>{r(n,()=>{})})}),ne=!1}var Et=!1;function Ni(e,t){t._x_dataStack||(t._x_dataStack=e._x_dataStack),ne=!0,Et=!0,tr(()=>{ji(t)}),ne=!1,Et=!1}function ji(e){let t=!1;Q(e,(r,i)=>{he(r,(s,a)=>{if(t&&xi(s))return a();t=!0,i(s,a)})})}function tr(e){let t=ge;nn((n,r)=>{let i=t(n);return be(i),()=>{}}),e(),nn(t)}function nr(e,t,n,r=[]){switch(e._x_bindings||(e._x_bindings=ve({})),e._x_bindings[t]=n,t=r.includes("camel")?Ki(t):t,t){case"value":$i(e,n);break;case"style":Fi(e,n);break;case"class":Di(e,n);break;case"selected":case"checked":ki(e,t,n);break;default:rr(e,t,n);break}}function $i(e,t){if(ar(e))e.attributes.value===void 0&&(e.value=t),window.fromModel&&(typeof t=="boolean"?e.checked=Ve(e.value)===t:e.checked=an(e.value,t));else if(Ut(e))Number.isInteger(t)?e.value=t:!Array.isArray(t)&&typeof t!="boolean"&&![null,void 0].includes(t)?e.value=String(t):Array.isArray(t)?e.checked=t.some(n=>an(n,e.value)):e.checked=!!t;else if(e.tagName==="SELECT")Ui(e,t);else{if(e.value===t)return;e.value=t===void 0?"":t}}function Di(e,t){e._x_undoAddedClasses&&e._x_undoAddedClasses(),e._x_undoAddedClasses=Ht(e,t)}function Fi(e,t){e._x_undoAddedStyles&&e._x_undoAddedStyles(),e._x_undoAddedStyles=Qe(e,t)}function ki(e,t,n){rr(e,t,n),Hi(e,t,n)}function rr(e,t,n){[null,void 0,!1].includes(n)&&Wi(t)?e.removeAttribute(t):(ir(t)&&(n=t),Bi(e,t,n))}function Bi(e,t,n){e.getAttribute(t)!=n&&e.setAttribute(t,n)}function Hi(e,t,n){e[t]!==n&&(e[t]=n)}function Ui(e,t){const n=[].concat(t).map(r=>r+"");Array.from(e.options).forEach(r=>{r.selected=n.includes(r.value)})}function Ki(e){return e.toLowerCase().replace(/-(\w)/g,(t,n)=>n.toUpperCase())}function an(e,t){return e==t}function Ve(e){return[1,"1","true","on","yes",!0].includes(e)?!0:[0,"0","false","off","no",!1].includes(e)?!1:e?!!e:null}var qi=new Set(["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected","shadowrootclonable","shadowrootdelegatesfocus","shadowrootserializable"]);function ir(e){return qi.has(e)}function Wi(e){return!["aria-pressed","aria-checked","aria-expanded","aria-selected"].includes(e)}function Vi(e,t,n){return e._x_bindings&&e._x_bindings[t]!==void 0?e._x_bindings[t]:sr(e,t,n)}function Gi(e,t,n,r=!0){if(e._x_bindings&&e._x_bindings[t]!==void 0)return e._x_bindings[t];if(e._x_inlineBindings&&e._x_inlineBindings[t]!==void 0){let i=e._x_inlineBindings[t];return i.extract=r,Rn(()=>fe(e,i.expression))}return sr(e,t,n)}function sr(e,t,n){let r=e.getAttribute(t);return r===null?typeof n=="function"?n():n:r===""?!0:ir(t)?!![t,"true"].includes(r):r}function Ut(e){return e.type==="checkbox"||e.localName==="ui-checkbox"||e.localName==="ui-switch"}function ar(e){return e.type==="radio"||e.localName==="ui-radio"}function or(e,t){var n;return function(){var r=this,i=arguments,s=function(){n=null,e.apply(r,i)};clearTimeout(n),n=setTimeout(s,t)}}function cr(e,t){let n;return function(){let r=this,i=arguments;n||(e.apply(r,i),n=!0,setTimeout(()=>n=!1,t))}}function lr({get:e,set:t},{get:n,set:r}){let i=!0,s,a=ge(()=>{let o=e(),c=n();if(i)r(ct(o)),i=!1;else{let u=JSON.stringify(o),d=JSON.stringify(c);u!==s?r(ct(o)):u!==d&&t(ct(c))}s=JSON.stringify(e()),JSON.stringify(n())});return()=>{be(a)}}function ct(e){return typeof e=="object"?JSON.parse(JSON.stringify(e)):e}function Ji(e){(Array.isArray(e)?e:[e]).forEach(n=>n(Ne))}var ce={},on=!1;function Yi(e,t){if(on||(ce=ve(ce),on=!0),t===void 0)return ce[e];ce[e]=t,In(ce[e]),typeof t=="object"&&t!==null&&t.hasOwnProperty("init")&&typeof t.init=="function"&&ce[e].init()}function Xi(){return ce}var ur={};function Zi(e,t){let n=typeof t!="function"?()=>t:t;return e instanceof Element?fr(e,n()):(ur[e]=n,()=>{})}function Qi(e){return Object.entries(ur).forEach(([t,n])=>{Object.defineProperty(e,t,{get(){return(...r)=>n(...r)}})}),e}function fr(e,t,n){let r=[];for(;r.length;)r.pop()();let i=Object.entries(t).map(([a,o])=>({name:a,value:o})),s=$n(i);return i=i.map(a=>s.find(o=>o.name===a.name)?{name:`x-bind:${a.name}`,value:`"${a.value}"`}:a),$t(e,i,n).map(a=>{r.push(a.runCleanups),a()}),()=>{for(;r.length;)r.pop()()}}var dr={};function es(e,t){dr[e]=t}function ts(e,t){return Object.entries(dr).forEach(([n,r])=>{Object.defineProperty(e,n,{get(){return(...i)=>r.bind(t)(...i)},enumerable:!1})}),e}var ns={get reactive(){return ve},get release(){return be},get effect(){return ge},get raw(){return xn},version:"3.14.9",flushAndStopDeferringMutations:ii,dontAutoEvaluateFunctions:Rn,disableEffectScheduling:Xr,startObservingMutations:Pt,stopObservingMutations:Mn,setReactivityEngine:Zr,onAttributeRemoved:Cn,onAttributesAdded:On,closestDataStack:ye,skipDuringClone:ie,onlyDuringClone:Pi,addRootSelector:Jn,addInitSelector:Yn,interceptClone:et,addScopeToNode:Pe,deferMutations:ri,mapAttributes:Dt,evaluateLater:N,interceptInit:wi,setEvaluator:ui,mergeProxies:Re,extractProp:Gi,findClosest:we,onElRemoved:Tt,closestRoot:Ze,destroyTree:Se,interceptor:Ln,transition:St,setStyles:Qe,mutateDom:O,directive:M,entangle:lr,throttle:cr,debounce:or,evaluate:fe,initTree:Q,nextTick:Bt,prefixed:xe,prefix:hi,plugin:Ji,magic:V,store:Yi,start:bi,clone:Ni,cloneNode:Ri,bound:Vi,$data:Tn,watch:wn,walk:he,data:es,bind:Zi},Ne=ns;function rs(e,t){const n=Object.create(null),r=e.split(",");for(let i=0;i<r.length;i++)n[r[i]]=!0;return i=>!!n[i]}var is=Object.freeze({}),ss=Object.prototype.hasOwnProperty,tt=(e,t)=>ss.call(e,t),de=Array.isArray,Te=e=>pr(e)==="[object Map]",as=e=>typeof e=="string",Kt=e=>typeof e=="symbol",nt=e=>e!==null&&typeof e=="object",os=Object.prototype.toString,pr=e=>os.call(e),hr=e=>pr(e).slice(8,-1),qt=e=>as(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,cs=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},ls=cs(e=>e.charAt(0).toUpperCase()+e.slice(1)),gr=(e,t)=>e!==t&&(e===e||t===t),At=new WeakMap,Ce=[],J,pe=Symbol("iterate"),Ot=Symbol("Map key iterate");function us(e){return e&&e._isEffect===!0}function fs(e,t=is){us(e)&&(e=e.raw);const n=hs(e,t);return t.lazy||n(),n}function ds(e){e.active&&(_r(e),e.options.onStop&&e.options.onStop(),e.active=!1)}var ps=0;function hs(e,t){const n=function(){if(!n.active)return e();if(!Ce.includes(n)){_r(n);try{return _s(),Ce.push(n),J=n,e()}finally{Ce.pop(),yr(),J=Ce[Ce.length-1]}}};return n.id=ps++,n.allowRecurse=!!t.allowRecurse,n._isEffect=!0,n.active=!0,n.raw=e,n.deps=[],n.options=t,n}function _r(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}var me=!0,Wt=[];function gs(){Wt.push(me),me=!1}function _s(){Wt.push(me),me=!0}function yr(){const e=Wt.pop();me=e===void 0?!0:e}function W(e,t,n){if(!me||J===void 0)return;let r=At.get(e);r||At.set(e,r=new Map);let i=r.get(n);i||r.set(n,i=new Set),i.has(J)||(i.add(J),J.deps.push(i),J.options.onTrack&&J.options.onTrack({effect:J,target:e,type:t,key:n}))}function re(e,t,n,r,i,s){const a=At.get(e);if(!a)return;const o=new Set,c=d=>{d&&d.forEach(m=>{(m!==J||m.allowRecurse)&&o.add(m)})};if(t==="clear")a.forEach(c);else if(n==="length"&&de(e))a.forEach((d,m)=>{(m==="length"||m>=r)&&c(d)});else switch(n!==void 0&&c(a.get(n)),t){case"add":de(e)?qt(n)&&c(a.get("length")):(c(a.get(pe)),Te(e)&&c(a.get(Ot)));break;case"delete":de(e)||(c(a.get(pe)),Te(e)&&c(a.get(Ot)));break;case"set":Te(e)&&c(a.get(pe));break}const u=d=>{d.options.onTrigger&&d.options.onTrigger({effect:d,target:e,key:n,type:t,newValue:r,oldValue:i,oldTarget:s}),d.options.scheduler?d.options.scheduler(d):d()};o.forEach(u)}var ys=rs("__proto__,__v_isRef,__isVue"),mr=new Set(Object.getOwnPropertyNames(Symbol).map(e=>Symbol[e]).filter(Kt)),ms=vr(),vs=vr(!0),cn=bs();function bs(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=S(this);for(let s=0,a=this.length;s<a;s++)W(r,"get",s+"");const i=r[t](...n);return i===-1||i===!1?r[t](...n.map(S)):i}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){gs();const r=S(this)[t].apply(this,n);return yr(),r}}),e}function vr(e=!1,t=!1){return function(r,i,s){if(i==="__v_isReactive")return!e;if(i==="__v_isReadonly")return e;if(i==="__v_raw"&&s===(e?t?Rs:Sr:t?Ps:wr).get(r))return r;const a=de(r);if(!e&&a&&tt(cn,i))return Reflect.get(cn,i,s);const o=Reflect.get(r,i,s);return(Kt(i)?mr.has(i):ys(i))||(e||W(r,"get",i),t)?o:Ct(o)?!a||!qt(i)?o.value:o:nt(o)?e?Er(o):Yt(o):o}}var xs=ws();function ws(e=!1){return function(n,r,i,s){let a=n[r];if(!e&&(i=S(i),a=S(a),!de(n)&&Ct(a)&&!Ct(i)))return a.value=i,!0;const o=de(n)&&qt(r)?Number(r)<n.length:tt(n,r),c=Reflect.set(n,r,i,s);return n===S(s)&&(o?gr(i,a)&&re(n,"set",r,i,a):re(n,"add",r,i)),c}}function Ss(e,t){const n=tt(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&re(e,"delete",t,void 0,r),i}function Es(e,t){const n=Reflect.has(e,t);return(!Kt(t)||!mr.has(t))&&W(e,"has",t),n}function As(e){return W(e,"iterate",de(e)?"length":pe),Reflect.ownKeys(e)}var Os={get:ms,set:xs,deleteProperty:Ss,has:Es,ownKeys:As},Cs={get:vs,set(e,t){return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`,e),!0},deleteProperty(e,t){return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`,e),!0}},Vt=e=>nt(e)?Yt(e):e,Gt=e=>nt(e)?Er(e):e,Jt=e=>e,rt=e=>Reflect.getPrototypeOf(e);function Be(e,t,n=!1,r=!1){e=e.__v_raw;const i=S(e),s=S(t);t!==s&&!n&&W(i,"get",t),!n&&W(i,"get",s);const{has:a}=rt(i),o=r?Jt:n?Gt:Vt;if(a.call(i,t))return o(e.get(t));if(a.call(i,s))return o(e.get(s));e!==i&&e.get(t)}function He(e,t=!1){const n=this.__v_raw,r=S(n),i=S(e);return e!==i&&!t&&W(r,"has",e),!t&&W(r,"has",i),e===i?n.has(e):n.has(e)||n.has(i)}function Ue(e,t=!1){return e=e.__v_raw,!t&&W(S(e),"iterate",pe),Reflect.get(e,"size",e)}function ln(e){e=S(e);const t=S(this);return rt(t).has.call(t,e)||(t.add(e),re(t,"add",e,e)),this}function un(e,t){t=S(t);const n=S(this),{has:r,get:i}=rt(n);let s=r.call(n,e);s?xr(n,r,e):(e=S(e),s=r.call(n,e));const a=i.call(n,e);return n.set(e,t),s?gr(t,a)&&re(n,"set",e,t,a):re(n,"add",e,t),this}function fn(e){const t=S(this),{has:n,get:r}=rt(t);let i=n.call(t,e);i?xr(t,n,e):(e=S(e),i=n.call(t,e));const s=r?r.call(t,e):void 0,a=t.delete(e);return i&&re(t,"delete",e,void 0,s),a}function dn(){const e=S(this),t=e.size!==0,n=Te(e)?new Map(e):new Set(e),r=e.clear();return t&&re(e,"clear",void 0,void 0,n),r}function Ke(e,t){return function(r,i){const s=this,a=s.__v_raw,o=S(a),c=t?Jt:e?Gt:Vt;return!e&&W(o,"iterate",pe),a.forEach((u,d)=>r.call(i,c(u),c(d),s))}}function qe(e,t,n){return function(...r){const i=this.__v_raw,s=S(i),a=Te(s),o=e==="entries"||e===Symbol.iterator&&a,c=e==="keys"&&a,u=i[e](...r),d=n?Jt:t?Gt:Vt;return!t&&W(s,"iterate",c?Ot:pe),{next(){const{value:m,done:v}=u.next();return v?{value:m,done:v}:{value:o?[d(m[0]),d(m[1])]:d(m),done:v}},[Symbol.iterator](){return this}}}}function te(e){return function(...t){{const n=t[0]?`on key "${t[0]}" `:"";console.warn(`${ls(e)} operation ${n}failed: target is readonly.`,S(this))}return e==="delete"?!1:this}}function zs(){const e={get(s){return Be(this,s)},get size(){return Ue(this)},has:He,add:ln,set:un,delete:fn,clear:dn,forEach:Ke(!1,!1)},t={get(s){return Be(this,s,!1,!0)},get size(){return Ue(this)},has:He,add:ln,set:un,delete:fn,clear:dn,forEach:Ke(!1,!0)},n={get(s){return Be(this,s,!0)},get size(){return Ue(this,!0)},has(s){return He.call(this,s,!0)},add:te("add"),set:te("set"),delete:te("delete"),clear:te("clear"),forEach:Ke(!0,!1)},r={get(s){return Be(this,s,!0,!0)},get size(){return Ue(this,!0)},has(s){return He.call(this,s,!0)},add:te("add"),set:te("set"),delete:te("delete"),clear:te("clear"),forEach:Ke(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=qe(s,!1,!1),n[s]=qe(s,!0,!1),t[s]=qe(s,!1,!0),r[s]=qe(s,!0,!0)}),[e,n,t,r]}var[Ms,Ts,oa,ca]=zs();function br(e,t){const n=e?Ts:Ms;return(r,i,s)=>i==="__v_isReactive"?!e:i==="__v_isReadonly"?e:i==="__v_raw"?r:Reflect.get(tt(n,i)&&i in r?n:r,i,s)}var Is={get:br(!1)},Ls={get:br(!0)};function xr(e,t,n){const r=S(n);if(r!==n&&t.call(e,r)){const i=hr(e);console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}var wr=new WeakMap,Ps=new WeakMap,Sr=new WeakMap,Rs=new WeakMap;function Ns(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function js(e){return e.__v_skip||!Object.isExtensible(e)?0:Ns(hr(e))}function Yt(e){return e&&e.__v_isReadonly?e:Ar(e,!1,Os,Is,wr)}function Er(e){return Ar(e,!0,Cs,Ls,Sr)}function Ar(e,t,n,r,i){if(!nt(e))return console.warn(`value cannot be made reactive: ${String(e)}`),e;if(e.__v_raw&&!(t&&e.__v_isReactive))return e;const s=i.get(e);if(s)return s;const a=js(e);if(a===0)return e;const o=new Proxy(e,a===2?r:n);return i.set(e,o),o}function S(e){return e&&S(e.__v_raw)||e}function Ct(e){return!!(e&&e.__v_isRef===!0)}V("nextTick",()=>Bt);V("dispatch",e=>Me.bind(Me,e));V("watch",(e,{evaluateLater:t,cleanup:n})=>(r,i)=>{let s=t(r),o=wn(()=>{let c;return s(u=>c=u),c},i);n(o)});V("store",Xi);V("data",e=>Tn(e));V("root",e=>Ze(e));V("refs",e=>(e._x_refs_proxy||(e._x_refs_proxy=Re($s(e))),e._x_refs_proxy));function $s(e){let t=[];return we(e,n=>{n._x_refs&&t.push(n._x_refs)}),t}var lt={};function Or(e){return lt[e]||(lt[e]=0),++lt[e]}function Ds(e,t){return we(e,n=>{if(n._x_ids&&n._x_ids[t])return!0})}function Fs(e,t){e._x_ids||(e._x_ids={}),e._x_ids[t]||(e._x_ids[t]=Or(t))}V("id",(e,{cleanup:t})=>(n,r=null)=>{let i=`${n}${r?`-${r}`:""}`;return ks(e,i,t,()=>{let s=Ds(e,n),a=s?s._x_ids[n]:Or(n);return r?`${n}-${a}-${r}`:`${n}-${a}`})});et((e,t)=>{e._x_id&&(t._x_id=e._x_id)});function ks(e,t,n,r){if(e._x_id||(e._x_id={}),e._x_id[t])return e._x_id[t];let i=r();return e._x_id[t]=i,n(()=>{delete e._x_id[t]}),i}V("el",e=>e);Cr("Focus","focus","focus");Cr("Persist","persist","persist");function Cr(e,t,n){V(t,r=>B(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,r))}M("modelable",(e,{expression:t},{effect:n,evaluateLater:r,cleanup:i})=>{let s=r(t),a=()=>{let d;return s(m=>d=m),d},o=r(`${t} = __placeholder`),c=d=>o(()=>{},{scope:{__placeholder:d}}),u=a();c(u),queueMicrotask(()=>{if(!e._x_model)return;e._x_removeModelListeners.default();let d=e._x_model.get,m=e._x_model.set,v=lr({get(){return d()},set(E){m(E)}},{get(){return a()},set(E){c(E)}});i(v)})});M("teleport",(e,{modifiers:t,expression:n},{cleanup:r})=>{e.tagName.toLowerCase()!=="template"&&B("x-teleport can only be used on a <template> tag",e);let i=pn(n),s=e.content.cloneNode(!0).firstElementChild;e._x_teleport=s,s._x_teleportBack=e,e.setAttribute("data-teleport-template",!0),s.setAttribute("data-teleport-target",!0),e._x_forwardEvents&&e._x_forwardEvents.forEach(o=>{s.addEventListener(o,c=>{c.stopPropagation(),e.dispatchEvent(new c.constructor(c.type,c))})}),Pe(s,{},e);let a=(o,c,u)=>{u.includes("prepend")?c.parentNode.insertBefore(o,c):u.includes("append")?c.parentNode.insertBefore(o,c.nextSibling):c.appendChild(o)};O(()=>{a(s,i,t),ie(()=>{Q(s)})()}),e._x_teleportPutBack=()=>{let o=pn(n);O(()=>{a(e._x_teleport,o,t)})},r(()=>O(()=>{s.remove(),Se(s)}))});var Bs=document.createElement("div");function pn(e){let t=ie(()=>document.querySelector(e),()=>Bs)();return t||B(`Cannot find x-teleport element for selector: "${e}"`),t}var zr=()=>{};zr.inline=(e,{modifiers:t},{cleanup:n})=>{t.includes("self")?e._x_ignoreSelf=!0:e._x_ignore=!0,n(()=>{t.includes("self")?delete e._x_ignoreSelf:delete e._x_ignore})};M("ignore",zr);M("effect",ie((e,{expression:t},{effect:n})=>{n(N(e,t))}));function zt(e,t,n,r){let i=e,s=c=>r(c),a={},o=(c,u)=>d=>u(c,d);if(n.includes("dot")&&(t=Hs(t)),n.includes("camel")&&(t=Us(t)),n.includes("passive")&&(a.passive=!0),n.includes("capture")&&(a.capture=!0),n.includes("window")&&(i=window),n.includes("document")&&(i=document),n.includes("debounce")){let c=n[n.indexOf("debounce")+1]||"invalid-wait",u=Xe(c.split("ms")[0])?Number(c.split("ms")[0]):250;s=or(s,u)}if(n.includes("throttle")){let c=n[n.indexOf("throttle")+1]||"invalid-wait",u=Xe(c.split("ms")[0])?Number(c.split("ms")[0]):250;s=cr(s,u)}return n.includes("prevent")&&(s=o(s,(c,u)=>{u.preventDefault(),c(u)})),n.includes("stop")&&(s=o(s,(c,u)=>{u.stopPropagation(),c(u)})),n.includes("once")&&(s=o(s,(c,u)=>{c(u),i.removeEventListener(t,s,a)})),(n.includes("away")||n.includes("outside"))&&(i=document,s=o(s,(c,u)=>{e.contains(u.target)||u.target.isConnected!==!1&&(e.offsetWidth<1&&e.offsetHeight<1||e._x_isShown!==!1&&c(u))})),n.includes("self")&&(s=o(s,(c,u)=>{u.target===e&&c(u)})),(qs(t)||Mr(t))&&(s=o(s,(c,u)=>{Ws(u,n)||c(u)})),i.addEventListener(t,s,a),()=>{i.removeEventListener(t,s,a)}}function Hs(e){return e.replace(/-/g,".")}function Us(e){return e.toLowerCase().replace(/-(\w)/g,(t,n)=>n.toUpperCase())}function Xe(e){return!Array.isArray(e)&&!isNaN(e)}function Ks(e){return[" ","_"].includes(e)?e:e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase()}function qs(e){return["keydown","keyup"].includes(e)}function Mr(e){return["contextmenu","click","mouse"].some(t=>e.includes(t))}function Ws(e,t){let n=t.filter(s=>!["window","document","prevent","stop","once","capture","self","away","outside","passive"].includes(s));if(n.includes("debounce")){let s=n.indexOf("debounce");n.splice(s,Xe((n[s+1]||"invalid-wait").split("ms")[0])?2:1)}if(n.includes("throttle")){let s=n.indexOf("throttle");n.splice(s,Xe((n[s+1]||"invalid-wait").split("ms")[0])?2:1)}if(n.length===0||n.length===1&&hn(e.key).includes(n[0]))return!1;const i=["ctrl","shift","alt","meta","cmd","super"].filter(s=>n.includes(s));return n=n.filter(s=>!i.includes(s)),!(i.length>0&&i.filter(a=>((a==="cmd"||a==="super")&&(a="meta"),e[`${a}Key`])).length===i.length&&(Mr(e.type)||hn(e.key).includes(n[0])))}function hn(e){if(!e)return[];e=Ks(e);let t={ctrl:"control",slash:"/",space:" ",spacebar:" ",cmd:"meta",esc:"escape",up:"arrow-up",down:"arrow-down",left:"arrow-left",right:"arrow-right",period:".",comma:",",equal:"=",minus:"-",underscore:"_"};return t[e]=e,Object.keys(t).map(n=>{if(t[n]===e)return n}).filter(n=>n)}M("model",(e,{modifiers:t,expression:n},{effect:r,cleanup:i})=>{let s=e;t.includes("parent")&&(s=e.parentNode);let a=N(s,n),o;typeof n=="string"?o=N(s,`${n} = __placeholder`):typeof n=="function"&&typeof n()=="string"?o=N(s,`${n()} = __placeholder`):o=()=>{};let c=()=>{let v;return a(E=>v=E),gn(v)?v.get():v},u=v=>{let E;a(I=>E=I),gn(E)?E.set(v):o(()=>{},{scope:{__placeholder:v}})};typeof n=="string"&&e.type==="radio"&&O(()=>{e.hasAttribute("name")||e.setAttribute("name",n)});var d=e.tagName.toLowerCase()==="select"||["checkbox","radio"].includes(e.type)||t.includes("lazy")?"change":"input";let m=ne?()=>{}:zt(e,d,t,v=>{u(ut(e,t,v,c()))});if(t.includes("fill")&&([void 0,null,""].includes(c())||Ut(e)&&Array.isArray(c())||e.tagName.toLowerCase()==="select"&&e.multiple)&&u(ut(e,t,{target:e},c())),e._x_removeModelListeners||(e._x_removeModelListeners={}),e._x_removeModelListeners.default=m,i(()=>e._x_removeModelListeners.default()),e.form){let v=zt(e.form,"reset",[],E=>{Bt(()=>e._x_model&&e._x_model.set(ut(e,t,{target:e},c())))});i(()=>v())}e._x_model={get(){return c()},set(v){u(v)}},e._x_forceModelUpdate=v=>{v===void 0&&typeof n=="string"&&n.match(/\./)&&(v=""),window.fromModel=!0,O(()=>nr(e,"value",v)),delete window.fromModel},r(()=>{let v=c();t.includes("unintrusive")&&document.activeElement.isSameNode(e)||e._x_forceModelUpdate(v)})});function ut(e,t,n,r){return O(()=>{if(n instanceof CustomEvent&&n.detail!==void 0)return n.detail!==null&&n.detail!==void 0?n.detail:n.target.value;if(Ut(e))if(Array.isArray(r)){let i=null;return t.includes("number")?i=ft(n.target.value):t.includes("boolean")?i=Ve(n.target.value):i=n.target.value,n.target.checked?r.includes(i)?r:r.concat([i]):r.filter(s=>!Vs(s,i))}else return n.target.checked;else{if(e.tagName.toLowerCase()==="select"&&e.multiple)return t.includes("number")?Array.from(n.target.selectedOptions).map(i=>{let s=i.value||i.text;return ft(s)}):t.includes("boolean")?Array.from(n.target.selectedOptions).map(i=>{let s=i.value||i.text;return Ve(s)}):Array.from(n.target.selectedOptions).map(i=>i.value||i.text);{let i;return ar(e)?n.target.checked?i=n.target.value:i=r:i=n.target.value,t.includes("number")?ft(i):t.includes("boolean")?Ve(i):t.includes("trim")?i.trim():i}}})}function ft(e){let t=e?parseFloat(e):null;return Gs(t)?t:e}function Vs(e,t){return e==t}function Gs(e){return!Array.isArray(e)&&!isNaN(e)}function gn(e){return e!==null&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"}M("cloak",e=>queueMicrotask(()=>O(()=>e.removeAttribute(xe("cloak")))));Yn(()=>`[${xe("init")}]`);M("init",ie((e,{expression:t},{evaluate:n})=>typeof t=="string"?!!t.trim()&&n(t,{},!1):n(t,{},!1)));M("text",(e,{expression:t},{effect:n,evaluateLater:r})=>{let i=r(t);n(()=>{i(s=>{O(()=>{e.textContent=s})})})});M("html",(e,{expression:t},{effect:n,evaluateLater:r})=>{let i=r(t);n(()=>{i(s=>{O(()=>{e.innerHTML=s,e._x_ignoreSelf=!0,Q(e),delete e._x_ignoreSelf})})})});Dt(kn(":",Bn(xe("bind:"))));var Tr=(e,{value:t,modifiers:n,expression:r,original:i},{effect:s,cleanup:a})=>{if(!t){let c={};Qi(c),N(e,r)(d=>{fr(e,d,i)},{scope:c});return}if(t==="key")return Js(e,r);if(e._x_inlineBindings&&e._x_inlineBindings[t]&&e._x_inlineBindings[t].extract)return;let o=N(e,r);s(()=>o(c=>{c===void 0&&typeof r=="string"&&r.match(/\./)&&(c=""),O(()=>nr(e,t,c,n))})),a(()=>{e._x_undoAddedClasses&&e._x_undoAddedClasses(),e._x_undoAddedStyles&&e._x_undoAddedStyles()})};Tr.inline=(e,{value:t,modifiers:n,expression:r})=>{t&&(e._x_inlineBindings||(e._x_inlineBindings={}),e._x_inlineBindings[t]={expression:r,extract:!1})};M("bind",Tr);function Js(e,t){e._x_keyExpression=t}Jn(()=>`[${xe("data")}]`);M("data",(e,{expression:t},{cleanup:n})=>{if(Ys(e))return;t=t===""?"{}":t;let r={};yt(r,e);let i={};ts(i,r);let s=fe(e,t,{scope:i});(s===void 0||s===!0)&&(s={}),yt(s,e);let a=ve(s);In(a);let o=Pe(e,a);a.init&&fe(e,a.init),n(()=>{a.destroy&&fe(e,a.destroy),o()})});et((e,t)=>{e._x_dataStack&&(t._x_dataStack=e._x_dataStack,t.setAttribute("data-has-alpine-state",!0))});function Ys(e){return ne?Et?!0:e.hasAttribute("data-has-alpine-state"):!1}M("show",(e,{modifiers:t,expression:n},{effect:r})=>{let i=N(e,n);e._x_doHide||(e._x_doHide=()=>{O(()=>{e.style.setProperty("display","none",t.includes("important")?"important":void 0)})}),e._x_doShow||(e._x_doShow=()=>{O(()=>{e.style.length===1&&e.style.display==="none"?e.removeAttribute("style"):e.style.removeProperty("display")})});let s=()=>{e._x_doHide(),e._x_isShown=!1},a=()=>{e._x_doShow(),e._x_isShown=!0},o=()=>setTimeout(a),c=wt(m=>m?a():s(),m=>{typeof e._x_toggleAndCascadeWithTransitions=="function"?e._x_toggleAndCascadeWithTransitions(e,m,a,s):m?o():s()}),u,d=!0;r(()=>i(m=>{!d&&m===u||(t.includes("immediate")&&(m?o():s()),c(m),u=m,d=!1)}))});M("for",(e,{expression:t},{effect:n,cleanup:r})=>{let i=Zs(t),s=N(e,i.items),a=N(e,e._x_keyExpression||"index");e._x_prevKeys=[],e._x_lookup={},n(()=>Xs(e,i,s,a)),r(()=>{Object.values(e._x_lookup).forEach(o=>O(()=>{Se(o),o.remove()})),delete e._x_prevKeys,delete e._x_lookup})});function Xs(e,t,n,r){let i=a=>typeof a=="object"&&!Array.isArray(a),s=e;n(a=>{Qs(a)&&a>=0&&(a=Array.from(Array(a).keys(),_=>_+1)),a===void 0&&(a=[]);let o=e._x_lookup,c=e._x_prevKeys,u=[],d=[];if(i(a))a=Object.entries(a).map(([_,b])=>{let w=_n(t,b,_,a);r(A=>{d.includes(A)&&B("Duplicate key on x-for",e),d.push(A)},{scope:{index:_,...w}}),u.push(w)});else for(let _=0;_<a.length;_++){let b=_n(t,a[_],_,a);r(w=>{d.includes(w)&&B("Duplicate key on x-for",e),d.push(w)},{scope:{index:_,...b}}),u.push(b)}let m=[],v=[],E=[],I=[];for(let _=0;_<c.length;_++){let b=c[_];d.indexOf(b)===-1&&E.push(b)}c=c.filter(_=>!E.includes(_));let G="template";for(let _=0;_<d.length;_++){let b=d[_],w=c.indexOf(b);if(w===-1)c.splice(_,0,b),m.push([G,_]);else if(w!==_){let A=c.splice(_,1)[0],C=c.splice(w-1,1)[0];c.splice(_,0,C),c.splice(w,0,A),v.push([A,C])}else I.push(b);G=b}for(let _=0;_<E.length;_++){let b=E[_];b in o&&(O(()=>{Se(o[b]),o[b].remove()}),delete o[b])}for(let _=0;_<v.length;_++){let[b,w]=v[_],A=o[b],C=o[w],F=document.createElement("div");O(()=>{C||B('x-for ":key" is undefined or invalid',s,w,o),C.after(F),A.after(C),C._x_currentIfEl&&C.after(C._x_currentIfEl),F.before(A),A._x_currentIfEl&&A.after(A._x_currentIfEl),F.remove()}),C._x_refreshXForScope(u[d.indexOf(w)])}for(let _=0;_<m.length;_++){let[b,w]=m[_],A=b==="template"?s:o[b];A._x_currentIfEl&&(A=A._x_currentIfEl);let C=u[w],F=d[w],Y=document.importNode(s.content,!0).firstElementChild,X=ve(C);Pe(Y,X,s),Y._x_refreshXForScope=p=>{Object.entries(p).forEach(([g,x])=>{X[g]=x})},O(()=>{A.after(Y),ie(()=>Q(Y))()}),typeof F=="object"&&B("x-for key cannot be an object, it must be a string or an integer",s),o[F]=Y}for(let _=0;_<I.length;_++)o[I[_]]._x_refreshXForScope(u[d.indexOf(I[_])]);s._x_prevKeys=d})}function Zs(e){let t=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,n=/^\s*\(|\)\s*$/g,r=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,i=e.match(r);if(!i)return;let s={};s.items=i[2].trim();let a=i[1].replace(n,"").trim(),o=a.match(t);return o?(s.item=a.replace(t,"").trim(),s.index=o[1].trim(),o[2]&&(s.collection=o[2].trim())):s.item=a,s}function _n(e,t,n,r){let i={};return/^\[.*\]$/.test(e.item)&&Array.isArray(t)?e.item.replace("[","").replace("]","").split(",").map(a=>a.trim()).forEach((a,o)=>{i[a]=t[o]}):/^\{.*\}$/.test(e.item)&&!Array.isArray(t)&&typeof t=="object"?e.item.replace("{","").replace("}","").split(",").map(a=>a.trim()).forEach(a=>{i[a]=t[a]}):i[e.item]=t,e.index&&(i[e.index]=n),e.collection&&(i[e.collection]=r),i}function Qs(e){return!Array.isArray(e)&&!isNaN(e)}function Ir(){}Ir.inline=(e,{expression:t},{cleanup:n})=>{let r=Ze(e);r._x_refs||(r._x_refs={}),r._x_refs[t]=e,n(()=>delete r._x_refs[t])};M("ref",Ir);M("if",(e,{expression:t},{effect:n,cleanup:r})=>{e.tagName.toLowerCase()!=="template"&&B("x-if can only be used on a <template> tag",e);let i=N(e,t),s=()=>{if(e._x_currentIfEl)return e._x_currentIfEl;let o=e.content.cloneNode(!0).firstElementChild;return Pe(o,{},e),O(()=>{e.after(o),ie(()=>Q(o))()}),e._x_currentIfEl=o,e._x_undoIf=()=>{O(()=>{Se(o),o.remove()}),delete e._x_currentIfEl},o},a=()=>{e._x_undoIf&&(e._x_undoIf(),delete e._x_undoIf)};n(()=>i(o=>{o?s():a()})),r(()=>e._x_undoIf&&e._x_undoIf())});M("id",(e,{expression:t},{evaluate:n})=>{n(t).forEach(i=>Fs(e,i))});et((e,t)=>{e._x_ids&&(t._x_ids=e._x_ids)});Dt(kn("@",Bn(xe("on:"))));M("on",ie((e,{value:t,modifiers:n,expression:r},{cleanup:i})=>{let s=r?N(e,r):()=>{};e.tagName.toLowerCase()==="template"&&(e._x_forwardEvents||(e._x_forwardEvents=[]),e._x_forwardEvents.includes(t)||e._x_forwardEvents.push(t));let a=zt(e,t,n,o=>{s(()=>{},{scope:{$event:o},params:[o]})});i(()=>a())}));it("Collapse","collapse","collapse");it("Intersect","intersect","intersect");it("Focus","trap","focus");it("Mask","mask","mask");function it(e,t,n){M(t,r=>B(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,r))}Ne.setEvaluator(jn);Ne.setReactivityEngine({reactive:Yt,effect:fs,release:ds,raw:S});var ea=Ne,yn=ea;const ta=`// Hello, world!

#include <stdio.h>

int main(void) {
    printf("Hello, world!\\n");
    return 0;
}
`,na=`// Malloc and pointer example

#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

void sieve(int n) {
    uint8_t *notprime = calloc(sizeof(*notprime), n);
    if (notprime == NULL) {
        exit(1);
    }

    for (int i = 2; i < n; ++i) {
        if (notprime[i])
            continue;
        printf("%d\\n", i);
        for (int j = i * i; j < n; j += i)
            notprime[j] = true;
    }
    free(notprime);
}

int main(int argc, char *argv[]) {
    int n = 100;
    if (argc > 1) {
        n = atoi(argv[1]);
        if (n < 2) {
            return 1;
        }
    }
    sieve(n);
    return 0;
}
`,ra=`// Function pointer example

#include <alloca.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void dump(const char *title, int *array, int n) {
    printf("%s", title);
    for (int i = 0; i < n; ++i)
        printf("%d ", array[i]);
    printf("\\n");
}

int compare(const void *va, const void *vb) {
    const int *pa = va;
    const int *pb = vb;
    return *pa - *pb;
}

int main(int argc, char *argv[]) {
    int N = 10;
    if (argc > 1)
        N = atoi(argv[1]);

    srand(time(NULL));

    int *array = alloca(sizeof(*array) * N);
    for (int i = 0; i < N; ++i) {
        array[i] = rand() % N;
    }

    dump("Before:", array, N);
    qsort(array, N, sizeof(*array), compare);
    dump("After :", array, N);

    return 0;
}
`,ia=`// Floating point number example

#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef SAVE_PPM
#define WIDTH        (256)
#define HEIGHT       (256)
#else
#define WIDTH        (80)
#define HEIGHT       (40)
#endif

#define NSUBSAMPLES  (2)
#define NAO_SAMPLES  (8)

typedef struct {double x, y, z;} vec;

double vdot(const vec *v0, const vec *v1) {
    return v0->x * v1->x + v0->y * v1->y + v0->z * v1->z;
}

void vnormalize(vec *c) {
    double length = sqrt(vdot(c, c));
    if (length > 1.0e-17) {
        c->x /= length;
        c->y /= length;
        c->z /= length;
    }
}

double EPS = 1.0e-6;

typedef struct {
    double t;
    vec p;
    vec n;
} Isect;

typedef struct {
    vec center;
    double radius;
} Sphere;

typedef struct {
    vec p;
    vec n;
} Plane;

typedef struct {
    vec org;
    vec dir;
} Ray;

void ray_sphere_intersect(Isect *isect, const Ray *ray, const Sphere *sphere) {
    vec rs;
    rs.x = ray->org.x - sphere->center.x;
    rs.y = ray->org.y - sphere->center.y;
    rs.z = ray->org.z - sphere->center.z;

    double B = vdot(&rs, &ray->dir);
    double C = vdot(&rs, &rs) - sphere->radius * sphere->radius;
    double D = B * B - C;
    if (D > 0.0) {
        double t = -B - sqrt(D);
        if (t > EPS && t < isect->t) {
            isect->t = t;

            isect->p.x = ray->org.x + ray->dir.x * t;
            isect->p.y = ray->org.y + ray->dir.y * t;
            isect->p.z = ray->org.z + ray->dir.z * t;

            isect->n.x = isect->p.x - sphere->center.x;
            isect->n.y = isect->p.y - sphere->center.y;
            isect->n.z = isect->p.z - sphere->center.z;
            vnormalize(&isect->n);
        }
    }
}

void ray_plane_intersect(Isect *isect, const Ray *ray, const Plane *plane) {
    double d = -vdot(&plane->p, &plane->n);
    double v = vdot(&ray->dir, &plane->n);

    if (fabs(v) < EPS)
        return;

    double t = -(vdot(&ray->org, &plane->n) + d) / v;
    if (t > EPS && t < isect->t) {
        isect->t = t;

        isect->p.x = ray->org.x + ray->dir.x * t;
        isect->p.y = ray->org.y + ray->dir.y * t;
        isect->p.z = ray->org.z + ray->dir.z * t;

        isect->n = plane->n;
    }
}

void orthoBasis(vec *basis, const vec *n) {
    basis[2] = *n;
    double sign = copysign(1.0, n->z);
    const double a = -1.0 / (sign + n->z);
    const double b = n->x * n->y * a;
    basis[0].x = 1.0 + sign * n->x * n->x * a;
    basis[0].y = sign * b;
    basis[0].z = -sign * n->x;
    basis[1].x = b;
    basis[1].y = sign + n->y * n->y * a;
    basis[1].z = -n->y;
}

const Sphere spheres[3] = {
    {{-2.0, 0, -3.5},  0.5},
    {{-0.5, 0, -3.0},  0.5},
    {{ 1.0, 0, -2.2},  0.5},
};

const Plane plane = {
    {0.0, -0.5, 0.0},
    {0.0,  1.0, 0.0},
};

vec ambient_occlusion(const Isect *isect) {
    int ntheta = NAO_SAMPLES;
    int nphi   = NAO_SAMPLES;

    vec basis[3];
    orthoBasis(basis, &isect->n);

    int occlusion = 0;
    for (int j = 0; j < ntheta; ++j) {
        for (int i = 0; i < nphi; ++i) {
            double theta = sqrt(drand48());
            double phi   = 2.0 * M_PI * drand48();

            double x = cos(phi) * theta;
            double y = sin(phi) * theta;
            double z = sqrt(1.0 - theta * theta);

            // local -> global
            double rx = x * basis[0].x + y * basis[1].x + z * basis[2].x;
            double ry = x * basis[0].y + y * basis[1].y + z * basis[2].y;
            double rz = x * basis[0].z + y * basis[1].z + z * basis[2].z;

            Ray ray;
            ray.org = isect->p;
            ray.dir.x = rx;
            ray.dir.y = ry;
            ray.dir.z = rz;

            Isect occIsect;
            occIsect.t = HUGE_VAL;

            ray_sphere_intersect(&occIsect, &ray, &spheres[0]);
            ray_sphere_intersect(&occIsect, &ray, &spheres[1]);
            ray_sphere_intersect(&occIsect, &ray, &spheres[2]);
            ray_plane_intersect (&occIsect, &ray, &plane);

            if (occIsect.t < HUGE_VAL)
                ++occlusion;
        }
    }

    double c = (ntheta * nphi - occlusion) / (double)(ntheta * nphi);
    return (vec){c, c, c};
}

unsigned char clamp(double f) {
    int i = (int)(f * 255.5);
    if (i < 0) i = 0;
    else if (i > 255) i = 255;
    return i;
}

void render(unsigned char *img, int w, int h, int nsubsamples) {
    double coeff = 1.0 / (nsubsamples * nsubsamples);
    unsigned char *dst = img;
    for (int y = 0; y < h; ++y) {
        for (int x = 0; x < w; ++x) {
            double cr = 0, cg = 0, cb = 0;
            for (int v = 0; v < nsubsamples; ++v) {
                for (int u = 0; u < nsubsamples; ++u) {
                    double px =  (x + (u / (double)nsubsamples) - (w / 2.0)) / (w / 2.0);
                    double py = -(y + (v / (double)nsubsamples) - (h / 2.0)) / (h / 2.0);

                    Ray ray;
                    ray.org.x = 0.0;
                    ray.org.y = 0.0;
                    ray.org.z = 0.0;

                    ray.dir.x = px;
                    ray.dir.y = py;
                    ray.dir.z = -1.0;
                    vnormalize(&ray.dir);

                    Isect isect;
                    isect.t = HUGE_VAL;

                    ray_sphere_intersect(&isect, &ray, &spheres[0]);
                    ray_sphere_intersect(&isect, &ray, &spheres[1]);
                    ray_sphere_intersect(&isect, &ray, &spheres[2]);
                    ray_plane_intersect (&isect, &ray, &plane);

                    if (isect.t < HUGE_VAL) {
                        vec col = ambient_occlusion(&isect);
                        cr += col.x;
                        cg += col.y;
                        cb += col.z;
                    }
                }
            }

            *dst++ = clamp(cr * coeff);
            *dst++ = clamp(cg * coeff);
            *dst++ = clamp(cb * coeff);
        }
    }
}

void showGraphicAsText(int width, int height, unsigned char *img) {
    static const char GRAYSCALE[] =
        "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\\\|()1{}[]?-_+~<>i!lI;:,\\"^\`'. ";
    const double S = (sizeof(GRAYSCALE) - 1) / 256.0;
    char line[width + 1];
    line[width] = '\\0';
    for (int i = 0; i < height; ++i) {
        for (int j = 0; j < width; ++j) {
            int index = (j + i * width) * 3;
            unsigned char r = img[index + 0];
            unsigned char g = img[index + 1];
            unsigned char b = img[index + 2];
            int k = r * (0.3 * S) + g * (0.59 * S) + b * (0.11 * S);
            line[j] = GRAYSCALE[k];
        }
        puts(line);
    }
}

#ifdef SAVE_PPM
void save_ppm(const char *fname, int w, int h, unsigned char *img) {
    FILE *fp = fopen(fname, "wb");
    fprintf(fp, "P6\\n%d %d\\n255\\n", w, h);
    fwrite(img, w * h * 3, 1, fp);
    fclose(fp);
}
#endif

int main(int argc, char *argv[]) {
    int width = argc > 1 ? atoi(argv[1]) : WIDTH;
    int height = argc > 2 ? atoi(argv[2]) : HEIGHT;
    int nsubsamples = argc > 3 ? atoi(argv[3]) : NSUBSAMPLES;
    unsigned char *img = malloc(width * height * 3);
    render(img, width, height, nsubsamples);
#ifdef SAVE_PPM
    save_ppm("ao.ppm", width, height, img);
#else
    showGraphicAsText(width, height, img);
#endif
    return 0;
}
`,mn=16,vn="wcc-code";function sa(){const e=monaco.editor.create(document.getElementById("editor"),{language:"c",minimap:{enabled:!1},fontSize:mn,renderWhitespace:"trailing"});let t=0;e.getModel().updateOptions({tabSize:4});function n(){return t>0&&t!==e.getModel().getAlternativeVersionId()}function r(){e.pushUndoStop(),t=e.getModel().getAlternativeVersionId()}function i(){t=e.getModel().getAlternativeVersionId()}function s(p,g){return p==null||n()&&!window.confirm(`Buffer modified. ${g} anyway?`)?!1:($.clearTerminal(),e.setValue(p),r(),e.setScrollPosition({scrollTop:0}),e.focus(),!0)}function a(){const p=localStorage.getItem(vn);return p==null?!1:(s(p,""),!0)}function o(){const p=e.getValue();localStorage.setItem(vn,p),i()}const c=monaco.editor.create(document.getElementById("terminal"),{language:"txt",lineNumbers:"off",minimap:{enabled:!1},fontSize:mn,readOnly:!0});c.onMouseDown(p=>{const g=$.compileErrors;if(g==null)return;const x=p.target.position;for(let L=g.length;--L>=0;){const T=g[L];if(T.terminalLineNo<=x.lineNumber){e.revealLineInCenter(T.sourceLineNo);const j=new monaco.Range(T.sourceLineNo,T.colStart,T.sourceLineNo,T.colStart+T.tokenLength);e.setSelection(j),e.focus();break}}}),$.setTerminal(c);let u=33;const d=Kr(["#editor","#terminal-container"],{direction:"vertical",sizes:[100,0],minSize:[100,0],onDrag:()=>{e.layout(),c.layout()},onDragEnd:p=>{p[1]>=5&&(u=p[1])}});function m(p=!0){p?d.setSizes([100-u,u]):d.collapse(1),e.layout(),c.layout()}function v(){m(d.getSizes()[1]<5)}function E(p){return encodeURIComponent(p).replace(/[!'()*]/g,g=>"%"+g.charCodeAt(0).toString(16))}function I(){window.location.search!==""&&window.history.replaceState(null,document.title,window.location.pathname)}function G(){return o(),alert("Saved!"),window.location.hash="",!0}async function _(p){try{const g=await p.createWritable(),x=e.getValue();return await g.write(x),await g.close(),i(),alert(`${p.name} Saved!`),!0}catch(g){return console.error(g),!1}}const b=new Dr;async function w(p,g){const x="main.c";return await b.writeFile(x,p),$.clearCompileErrors(),await b.compile(x,g)!==0?($.analyzeCompileErrors(),m(),null):"a.wasm"}async function A(p,g){$.clearTerminal(),e.focus();const x="main.o",L=g?["-c","-o",x]:void 0,T=await w(e.getValue(),L);if(T==null)return;if(g){const st=await b.readFile(x),se=new Fr(st.buffer);se.setLogFunc(je=>$.putTerminal(`${je}
`)),se.dump(),m();return}const j=p===""?[]:p.trim().split(/\s+/);j.unshift("a.wasm"),m(),await b.runWasi(T,j),await b.clearTemporaries()}window.addEventListener("load",()=>{window.addEventListener("resize",()=>{e.layout(),c.layout()},!1),window.addEventListener("beforeunload",p=>{n()&&(p.preventDefault(),p.returnValue="")}),e.layout(),c.layout()});const C={types:[{description:"C source",accept:{"text/c":[".c"]}}]},F="Run",Y="Compile",X={hello:ta,sieve:na,qsort:ra,aobench:ia};window.initialData={showSysmenu:!1,example:"",shareUrl:null,args:"",loaded:!1,busy:!1,canAccessLocalFile:!!window.showOpenFilePicker,fileHandle:null,runMode:F,showRunModeDropdown:!1,async init(){b.setConsoleOutFunction((g,x)=>$.putTerminal(g)),b.setUp().then(()=>this.loaded=!0);const p=new URLSearchParams(window.location.search);if(p.has("codez")){const g=p.get("codez")||"",x=await $.base64ToBlob(g),L=await $.decompressText(x);s(L,""),this.args=p.get("args")||""}else p.has("code")?(s(p.get("code")||"",""),this.args=p.get("args")||""):a()||s(X.hello,"Hello");e.addAction({id:"run",label:"Run",keybindings:[monaco.KeyMod.CtrlCmd|monaco.KeyCode.Enter],run:()=>this.runCode()}),e.addAction({id:"save",label:"Save",keybindings:[monaco.KeyMod.CtrlCmd|monaco.KeyCode.KeyS],run:()=>this.saveFile()}),this.$watch("example",g=>{this.closeSysmenu(),I();const x=X[g],L=document.getElementById("example-select"),T=[].slice.call(L.options).find(j=>j.value===g);s(x,`Load "${T.text}"`),this.args="",this.example="",this.fileHandle=null})},async onClickNavOpen(){const p=e.getValue().trim();if(p!==""){const g={};if(typeof Response>"u")g.code=p;else{const T=await $.compressText(p),j=await $.bolbToBase64(T);g.codez=j}const x=this.args.trim();x!==""&&(g.args=x);const L=Object.keys(g).map(T=>`${T}=${E(g[T])}`).join("&");this.shareUrl=`?${L}`}else this.shareUrl=null;this.showSysmenu=!0},closeSysmenu(){this.showSysmenu=!1},newFile(p){p.preventDefault(),this.closeSysmenu(),s("","New"),this.fileHandle=null,I()},async loadFile(p){p.preventDefault();try{const[g]=await window.showOpenFilePicker(C),L=await(await g.getFile()).text();s(L,`Load "${g.name}"`),this.fileHandle=g}finally{this.closeSysmenu(),I()}},async saveFile(p){p==null||p.preventDefault();let g=!1;if(this.canAccessLocalFile){if(this.fileHandle==null)return await this.saveFileAs(p);this.closeSysmenu(),g=await _(this.fileHandle)}else this.closeSysmenu(),g=G();return g&&I(),g},async saveFileAs(p){p==null||p.preventDefault();let g=!1;try{const x=await window.showSaveFilePicker(C);g=await _(x),g&&(this.fileHandle=x)}catch(x){console.error(x)}return this.closeSysmenu(),g&&I(),g},shareLink(p){if(p.preventDefault(),this.shareUrl!=null){this.closeSysmenu();const g=new URL(this.shareUrl,window.location.href);let x=g.pathname;g.search&&(x+=g.search),window.history.replaceState(null,document.title,x),navigator.clipboard.writeText(g.toString()).then(L=>alert("URL copied!"))}return!1},async runCode(){!this.loaded&&this.busy||(this.busy=!0,await A(this.args,this.runMode===Y),this.busy=!1)},toggleRunModeDropdown(){this.showRunModeDropdown=!this.showRunModeDropdown,this.showRunModeDropdown||e.focus()},closeRunModeDropdown(){this.showRunModeDropdown=!1,e.focus()},toggleTerminal(){v()},setRunMode(p){this.runMode=p,this.closeRunModeDropdown()}},window.Alpine=yn,yn.start()}window.require.config({paths:{vs:"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs"}});window.require(["vs/editor/editor.main"],()=>sa());
