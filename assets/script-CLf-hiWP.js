import{s as b}from"./supabase-BcuJ3xoD.js";const X="00000000-0000-0000-0000-000000000000";let ce={},xe={},se=X;function be(e){se=e||X,ce={},xe={}}const N=()=>se;async function wa(){const[e,t]=await Promise.all([b.from("settings").select("key,value").eq("tenant_id",se),b.from("site_content").select("*").eq("tenant_id",se)]);if(e.data&&e.data.forEach(n=>{ce[n.key]=n.value}),t.data&&t.data.forEach(n=>{xe[n.key]=n}),(!t.data||t.data.length===0)&&se!==X){const[n,a]=await Promise.all([b.from("settings").select("key,value").eq("tenant_id",X),b.from("site_content").select("*").eq("tenant_id",X)]);n.data&&n.data.forEach(o=>{ce[o.key]===void 0&&(ce[o.key]=o.value)}),a.data&&a.data.forEach(o=>{xe[o.key]||(xe[o.key]=o)})}}const K=(e,t=null)=>ce[e]!==void 0?ce[e]:t,Le=(e,t="pt")=>{const n=xe[e];return n&&(n["value_"+t]||n.value_pt)||null};async function we(e){const t=new Date().toISOString(),n=e.map(([o,i])=>({key:o,value:i,tenant_id:se,updated_at:t})),{error:a}=await b.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,i])=>{ce[o]=i}),!a}async function Ue(e,{pt:t,en:n,es:a}){const o=new Date().toISOString(),i={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:se,updated_at:o},{error:r}=await b.from("site_content").upsert(i,{onConflict:"key,tenant_id"});return r||(xe[e]=i),se!==X&&await b.from("site_content").upsert({key:e,value_pt:t,value_en:n,value_es:a,tenant_id:X,updated_at:o},{onConflict:"key,tenant_id"}),!r}async function Ze(e,t,n){const{error:a}=await b.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function ft(){const e=document.documentElement,t=K("visual.accent_color","#b8962e"),n=K("visual.primary_bg","#0f1c2e"),a=K("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=K("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(d=>{d.src=o});const i=K("company.favicon_url","/favicon.ico"),r=document.querySelector('link[rel="shortcut icon"]');r&&(r.href=i);const l=K("visual.hero_bg_url","");if(l){const d=document.querySelector(".hero, .hero-v2");d&&(d.style.backgroundImage="url('"+l+"')")}}function $t(e){e=e||"pt";const t=v=>Le(v,e)||"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector('[data-i18n="hero.subtitle"]')||document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small, footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const i=document.querySelector('[data-i18n="inst.p1"]'),r=document.querySelector('[data-i18n="inst.p2"]'),l=document.querySelector('[data-i18n="inst.p3"]');i&&t("inst.bio_p1")&&(i.innerHTML=t("inst.bio_p1")),r&&t("inst.bio_p2")&&(r.innerHTML=t("inst.bio_p2")),l&&t("inst.bio_p3")&&(l.innerHTML=t("inst.bio_p3"));const d=document.querySelector('[data-i18n="inst.stat1_num"]'),c=document.querySelector('[data-i18n="inst.stat2_num"]')||document.querySelector('[data-i18n-num="inst.stat2num"]'),s=document.querySelector('[data-i18n="inst.stat3_num"]'),m=document.querySelector('[data-i18n="inst.stat1_label"]')||document.querySelector('[data-i18n="inst.stat1"]'),u=document.querySelector('[data-i18n="inst.stat2_label"]')||document.querySelector('[data-i18n="inst.stat2"]'),E=document.querySelector('[data-i18n="inst.stat3_label"]')||document.querySelector('[data-i18n="inst.stat3"]');d&&t("inst.stat1_num")&&(d.innerHTML=t("inst.stat1_num")),c&&t("inst.stat2_num")&&(c.innerHTML=t("inst.stat2_num")),s&&t("inst.stat3_num")&&(s.innerHTML=t("inst.stat3_num")),m&&t("inst.stat1_label")&&(m.innerHTML=t("inst.stat1_label")),u&&t("inst.stat2_label")&&(u.innerHTML=t("inst.stat2_label")),E&&t("inst.stat3_label")&&(E.innerHTML=t("inst.stat3_label"));const w=document.getElementById("dep-grid");if(w){const v=Le("testimonials",e)||Le("testimonials","pt");if(v)try{const I=JSON.parse(v);if(Array.isArray(I)&&I.length>0){let S=function(p){return String(p||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},_=function(p){let g=0;for(const h of p||"?")g=g*31+h.charCodeAt(0)&4294967295;return $[Math.abs(g)%$.length]};const $=["#0d2144","#1a3a5c","#0a1628","#164a3c","#2d1b3d","#3d1a1a","#1a2f4a"];w.innerHTML=I.map(p=>`
            <div class="dep-card-v2">
              <div class="dep-stars-v2">${"★".repeat(p.stars||5)}</div>
              <p class="dep-text-v2">"${S(p.text)}"</p>
              <div class="dep-author-v2">
                <div class="dep-avatar-v2" style="background:${_(p.name)}">${(p.name||"?")[0].toUpperCase()}</div>
                <div>
                  <div class="dep-name-v2">${S(p.name)}</div>
                  <div class="dep-role-v2">${S(p.role)}</div>
                </div>
              </div>
            </div>`).join("")}}catch{}}const x=Le("seo.title_pt",e);x&&(document.title=x);const k=Le("seo.description_pt",e);if(k){const v=document.querySelector('meta[name="description"]');v&&(v.content=k)}}function St(e){if(!e)return;const t="https://wa.me/"+e;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const Ea="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let Te="5547999701743";const Ia="onknpbzdcrhbfozzvxtz.supabase.co",_t="/storage/v1/object/public/";function qe(e){if(!e||typeof e!="string"||!window.__USE_CF_PROXY||!e.includes(Ia)||!e.includes(_t))return e;const t=window.location.hostname;if(t!=="omarcorretor.com.br"&&t!=="www.omarcorretor.com.br")return e;try{const n=new URL(e);return"https://omarcorretor.com.br"+n.pathname.replace(_t,"/img/")+n.search}catch{return e}}(function(){typeof window>"u"||window.location.hostname!=="omarcorretor.com.br"&&window.location.hostname!=="www.omarcorretor.com.br"||fetch("/img/healthz",{method:"HEAD",cache:"no-store"}).then(t=>{(t.headers.get("cf-ray")||t.headers.get("Cf-Ray"))&&(window.__USE_CF_PROXY=!0)}).catch(()=>{})})();function ka(e){return Array.isArray(e)?e.map(qe):e}const Ie=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],$a=5.7;function De(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/$a).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let A=[],y=null,Me=[];const at="imobi_lead_tracking",Vt=90*24*60*60*1e3;function Xe(e){try{const t=document.cookie?document.cookie.split("; "):[];for(const n of t){const a=n.indexOf("=");if(a<0)continue;if(n.slice(0,a)===e)return decodeURIComponent(n.slice(a+1))}return null}catch{return null}}function Sa(){if(typeof window>"u")return null;try{const e=new URLSearchParams(window.location.search),t={utm_source:e.get("utm_source"),utm_medium:e.get("utm_medium"),utm_campaign:e.get("utm_campaign"),utm_content:e.get("utm_content"),utm_term:e.get("utm_term"),fbclid:e.get("fbclid"),gclid:e.get("gclid"),fbp:Xe("_fbp"),fbc:Xe("_fbc"),landing_url:window.location.href,captured_at:Date.now()};if(t.fbclid&&!t.fbc){const i=Math.floor(Date.now()/1e3);t.fbc=`fb.1.${i}.${t.fbclid}`}const n=t.utm_source||t.utm_campaign||t.fbclid||t.gclid,a=localStorage.getItem(at);let o=t;if(a)try{const i=JSON.parse(a);i&&i.captured_at&&Date.now()-i.captured_at<Vt&&!n&&(o={...i,fbp:t.fbp||i.fbp,fbc:t.fbc||i.fbc})}catch{}return localStorage.setItem(at,JSON.stringify(o)),o}catch{return null}}function Lt(){try{const e=localStorage.getItem(at);if(!e)return{};const t=JSON.parse(e);if(!t||!t.captured_at||Date.now()-t.captured_at>Vt)return{};const n=Xe("_fbp"),a=Xe("_fbc");return{utm_source:t.utm_source||null,utm_medium:t.utm_medium||null,utm_campaign:t.utm_campaign||null,utm_content:t.utm_content||null,utm_term:t.utm_term||null,fbclid:t.fbclid||null,gclid:t.gclid||null,fbp:n||t.fbp||null,fbc:a||t.fbc||null,landing_url:t.landing_url||null}}catch{return{}}}typeof window<"u"&&setTimeout(Sa,100);let Xt=!1;b.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(Xt=!0)});function nt(e,t,n){try{localStorage.setItem(e,JSON.stringify({v:t,exp:Date.now()+n}))}catch{}}function Pe(e){try{const t=localStorage.getItem(e);if(!t)return null;const n=JSON.parse(t);return Date.now()>n.exp?(localStorage.removeItem(e),null):n.v}catch{return null}}async function Gt({background:e=!1}={}){const t=window.location.hostname;if(t==="localhost"||t==="127.0.0.1"){const{data:s,error:m}=await b.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return m&&console.error("Supabase select error:",m),s||[]}const a=`imobi_tenant_${t.replace(/^www\./,"")}`;let o=N();if(!o||o===X){const s=Pe(a);if(s)o=s,be(o);else{const m=t.replace(/^www\./,"");for(const u of[m,"www."+m]){const{data:E}=await b.from("tenants").select("id").eq("domain",u).maybeSingle();if(E!=null&&E.id){o=E.id,be(o);break}}o&&o!==X&&nt(a,o,24*60*60*1e3)}}if(!o||o===X)return console.warn("[ImobiCRM] Tenant não encontrado para domínio:",t),[];const i=`imobi_props_${o}`,r=5*60*1e3;if(!e){const s=Pe(i);if(s)return setTimeout(()=>Gt({background:!0}),100),s}const{data:l,error:d}=await b.from("properties").select("*").eq("published",!0).eq("tenant_id",o).order("created_at",{ascending:!1});if(d)return console.error("Supabase select error:",d),Pe(i)||[];const c=l||[];return nt(i,c,r),e&&typeof me=="function"&&me().catch(()=>{}),c}async function Jt(){let e=b.from("properties").select("*").order("created_at",{ascending:!1});(y==null?void 0:y.role)==="super_admin"||(y!=null&&y.tenant_id?e=e.eq("tenant_id",y.tenant_id):e=e.or("tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000"));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):(A=t||[],cn(),mn(),A)}async function _a(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await b.from("properties").update(a).eq("id",t);if(o)throw o;const i=A.findIndex(r=>r.id===t);i>=0&&(A[i]={...A[i],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await b.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&A.unshift(t[0])}}async function La(e){const{error:t}=await b.from("properties").delete().eq("id",e);if(t)throw t;A=A.filter(n=>n.id!==e)}const Wt="imobi_sec_login_attempts",Kt=5,Ba=15*60*1e3,Yt=2*60*60*1e3;function Qt(){try{const e=localStorage.getItem(Wt);return e?JSON.parse(e):{count:0,blockedUntil:0}}catch{return{count:0,blockedUntil:0}}}function vt(e){try{localStorage.setItem(Wt,JSON.stringify(e))}catch{}}function Ca(){const e=Qt();return e.blockedUntil&&Date.now()<e.blockedUntil?{blocked:!0,minutesLeft:Math.ceil((e.blockedUntil-Date.now())/6e4)}:(e.blockedUntil&&Date.now()>=e.blockedUntil&&vt({count:0,blockedUntil:0}),{blocked:!1})}function Ta(){const e=Qt();return e.count=(e.count||0)+1,e.count>=Kt&&(e.blockedUntil=Date.now()+Ba,e.count=0),vt(e),e}function Aa(){vt({count:0,blockedUntil:0})}function qa(e,t="info"){if(typeof document>"u")return;const n={info:"#0f172a",success:"#16a34a",error:"#dc2626",warn:"#d97706"},a=document.createElement("div");a.textContent=e,a.style.cssText=`position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:${n[t]||n.info};color:#fff;padding:12px 22px;border-radius:24px;font-size:14px;font-weight:600;z-index:99999;box-shadow:0 6px 24px rgba(0,0,0,0.25);opacity:0;transition:opacity 0.2s, bottom 0.3s;pointer-events:none;max-width:90vw;text-align:center;`,document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity="1",a.style.bottom="40px"}),setTimeout(()=>{a.style.opacity="0",a.style.bottom="24px",setTimeout(()=>a.remove(),300)},3e3)}typeof window<"u"&&(window.toast=qa);typeof window<"u"&&!window._shortcutsAttached&&(window._shortcutsAttached=!0,document.addEventListener("keydown",e=>{if(e.key==="Escape"&&(["property-modal","view-modal","lead-modal","tarefa-modal","import-modal","property-modal-create"].forEach(t=>{const n=document.getElementById(t);n&&!n.classList.contains("hidden")&&n.classList.add("hidden")}),document.querySelectorAll('.side-panel.open, [data-panel-open="true"]').forEach(t=>{t.classList.remove("open"),t.dataset.panelOpen="false"}),document.body.style.overflow=""),(e.metaKey||e.ctrlKey)&&e.key==="k"){const t=document.getElementById("global-search")||document.querySelector('input[type="search"]');t&&(e.preventDefault(),t.focus())}if((e.metaKey||e.ctrlKey)&&e.key==="s"){const t=document.querySelector('.modal:not(.hidden) button[type="submit"], .modal:not(.hidden) .btn-primary, .side-panel.open .btn-primary');t&&(e.preventDefault(),t.click())}}));typeof window<"u"&&!window._globalErrHandlerAttached&&(window._globalErrHandlerAttached=!0,window.addEventListener("unhandledrejection",e=>{console.warn("[CRM] Promise sem catch:",e.reason)}),window.addEventListener("error",e=>{e.error&&e.error.message&&console.warn("[CRM] Erro:",e.error.message)}));async function Ma(e,t){const n=Ca();if(n.blocked)return alert(`🔒 Muitas tentativas falhas. Tente novamente em ${n.minutesLeft} minuto(s).`),!1;const{error:a}=await b.auth.signInWithPassword({email:e,password:t});if(a){const o=Ta();if(o.blockedUntil)alert("🔒 Login bloqueado por 15 minutos após 5 tentativas erradas.");else{const i=Kt-o.count;console.warn(`[SEC] Login falhou. ${i} tentativa(s) restante(s) antes do bloqueio.`)}return!1}return Aa(),ot(),!0}let et=null;function ot(){try{localStorage.setItem("imobi_sec_last_activity",String(Date.now()))}catch{}et&&clearTimeout(et),et=setTimeout(async()=>{console.warn("[SEC] Inativo por 2h — fazendo logout automático.");try{await b.auth.signOut()}catch{}try{localStorage.removeItem("imobi_sec_last_activity")}catch{}alert("🔒 Sua sessão expirou por inatividade. Faça login de novo."),location.reload()},Yt)}function za(){if(!(typeof window>"u")){["click","keydown","mousemove","touchstart","scroll"].forEach(e=>{window.addEventListener(e,()=>ot(),{passive:!0})});try{const e=parseInt(localStorage.getItem("imobi_sec_last_activity")||"0",10);if(e&&Date.now()-e>Yt){console.warn("[SEC] Sessão já estava expirada ao carregar — fazendo logout."),b.auth.signOut().finally(()=>location.reload());return}}catch{}ot()}}b.auth.onAuthStateChange((e,t)=>{t&&t.user&&za()});function je(e,t=1e3,n=.7){return new Promise((a,o)=>{const i=new Image,r=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(r);const l=document.createElement("canvas");let d=i.width,c=i.height;d>t&&(c=Math.round(c*t/d),d=t),l.width=d,l.height=c;const s=l.getContext("2d");s.drawImage(i,0,0,d,c);const m=new Image;m.crossOrigin="anonymous",m.onload=()=>{const u=Math.round(d*.18),E=Math.round(m.naturalHeight*u/m.naturalWidth),w=Math.round(d*.02),x=d-u-w,k=c-E-w;s.globalAlpha=.45,s.drawImage(m,x,k,u,E),s.globalAlpha=1,l.toBlob(v=>v?a(v):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.onerror=()=>{l.toBlob(u=>u?a(u):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.src="/logo.png"},i.onerror=o,i.src=r})}async function Na(e){const t=await je(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await b.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=b.storage.from("imoveis").getPublicUrl(n);return o}async function Ra(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await Na(n[o]));return a}function Zt(e){if(!e)return{};const t={};return e.querySelectorAll(".icard-img-wrap").forEach(n=>{const a=n.dataset.pid,o=n.dataset.idx;a&&o&&o!=="0"&&(t[a]=parseInt(o,10))}),t}function ea(e,t){!e||!t||Object.entries(t).forEach(([n,a])=>{const o=e.querySelector('.icard-img-wrap[data-pid="'+n+'"]');if(!o)return;const i=parseInt(o.dataset.total,10);if(!i||i<2)return;const r=a%i;o.dataset.idx=r;try{const d=JSON.parse(decodeURIComponent(o.dataset.images||"[]"));if(d[r]){const c=o.querySelector(".carousel-img"),s=o.querySelector(".carousel-img-bg"),m=qe(d[r]);c&&(c.src=m),s&&(s.src=m)}}catch{}const l=o.querySelectorAll(".icard-dot");if(l.length){const d=r%l.length;l.forEach((c,s)=>c.classList.toggle("active",s===d))}})}function Da(e){const t=document.getElementById("collections-wrap");if(!t)return;const n=d=>e.filter(c=>{if(c.collection){try{const m=JSON.parse(c.collection);if(Array.isArray(m))return m.includes(d)}catch{}if(c.collection===d)return!0}const s=((c.title||"")+" "+(c.description||"")).toLowerCase();return d==="frente-mar"?s.includes("frente mar")||s.includes("frente ao mar"):d==="decorados"?s.includes("decorad")||s.includes("mobiliado"):d==="casas-condominio"?(c.condominium||"").length>2:!1});function a(d,c,s,m){if(!s.length)return"";const u=s.slice(0,8).map(E=>ht(E)).join("");return`
      <div class="colecao-section">
        <div class="colecao-header">
          <h2 class="colecao-title" style="color:${c}">${f(d)}</h2>
          <a href="${f(m)}" class="colecao-ver-todos">Ver todos</a>
        </div>
        <div class="imoveis-grid colecao-grid" data-collection="${d}">${u}</div>
      </div>`}const o=n("frente-mar"),i=n("decorados"),r=n("casas-condominio"),l=Zt(t);t.innerHTML=[a("Imóveis Disponíveis","var(--navy, #0d2144)",e,"imoveis.html"),o.length?a("Coleção FRENTE MAR","var(--navy, #0d2144)",o,"imoveis.html?collection=frente-mar"):"",i.length?a("Coleção DECORADOS","var(--navy, #0d2144)",i,"imoveis.html?collection=decorados"):"",r.length?a("Coleção CASAS EM CONDOMÍNIO","var(--navy, #0d2144)",r,"imoveis.html?collection=casas-condominio"):""].join(""),ea(t,l),t._carouselDelegated||(t._carouselDelegated=!0,t.addEventListener("click",yt),t.addEventListener("touchend",function(d){const c=d.target.closest(".carousel-btn");c&&(d.preventDefault(),d.stopPropagation(),ta(c.closest(".icard-img-wrap"),c.classList.contains("carousel-next")?1:-1))},{passive:!1}))}async function me(){var E,w,x,k,v,I;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await Gt();A=n,((E=document.getElementById("selecao-carousel"))==null?void 0:E.innerHTML)===""&&ja(n);const a=((w=document.getElementById("city-filter"))==null?void 0:w.value)||"",o=((x=document.getElementById("neighborhood-filter"))==null?void 0:x.value)||"",i=((k=document.getElementById("bedrooms-filter"))==null?void 0:k.value)||"",r=((v=document.getElementById("parking-filter"))==null?void 0:v.value)||"",l=((I=document.getElementById("construction-filter"))==null?void 0:I.value)||"",{min:d,max:c}=Oa(),s=n.filter($=>{if(a&&$.city!==a||o&&$.neighborhood!==o||i&&(i==="4+"&&Number($.bedrooms)<4||i!=="4+"&&Number($.bedrooms)!==Number(i))||r&&(r==="4+"&&Number($.parking)<4||r!=="4+"&&Number($.parking)!==Number(r))||l&&$.construction_status!==l)return!1;const S=String($.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),_=parseInt(S,10)||0;return!(_<d||c!==1/0&&_>c)});if(e){Da(n);return}if(!s.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}const m=Zt(t);t.innerHTML=s.map($=>ht($)).join(""),ea(t,m);const u=document.getElementById("properties");u&&!u._carouselDelegated&&(u._carouselDelegated=!0,u.addEventListener("click",yt))}function ja(e){var o,i,r;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(l=>ht(l)).join(""),t._carouselDelegated||(t._carouselDelegated=!0,t.addEventListener("click",yt));const a=t.closest(".selecao-carousel-wrap");(i=a==null?void 0:a.querySelector(".selecao-prev"))==null||i.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(r=a==null?void 0:a.querySelector(".selecao-next"))==null||r.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),me()};function ta(e,t){var i;const n=parseInt(e.dataset.total,10);if(!n||n<2)return;let a=parseInt(e.dataset.idx,10)||0;a=(a+t+n)%n,e.dataset.idx=a;try{const r=JSON.parse(decodeURIComponent(e.dataset.images||"[]"));if(r.length&&r[a]){const l=qe(r[a]),d=e.querySelector(".carousel-img"),c=e.querySelector(".carousel-img-bg");d&&(d.src=l),c&&(c.src=l)}}catch{const l=A.find(u=>String(u.id)===String(e.dataset.pid)),d=(i=l==null?void 0:l.images)!=null&&i.length?l.images:Ie,c=e.querySelector(".carousel-img"),s=e.querySelector(".carousel-img-bg"),m=d[a]?qe(d[a]):"";c&&m&&(c.src=m),s&&m&&(s.src=m)}const o=e.querySelectorAll(".icard-dot");if(o.length){const r=a%o.length;o.forEach((l,d)=>l.classList.toggle("active",d===r))}}function yt(e){const t=e.target.closest(".carousel-btn");if(t){e.preventDefault(),e.stopPropagation();const a=t.closest(".icard-img-wrap");a&&ta(a,t.classList.contains("carousel-next")?1:-1);return}if(e.target.closest(".icard-wa")||e.target.closest(".icard-heart"))return;const n=e.target.closest("[data-href]");if(n){e.preventDefault(),window.location.href=n.dataset.href;return}}function Oa(){var a;const e=((a=document.getElementById("price-range"))==null?void 0:a.value)||"";if(!e)return{min:0,max:1/0};const[t,n]=e.split("-");return{min:parseInt(t,10)||0,max:n?parseInt(n,10):1/0}}function Ha(){const e=document.getElementById("price-range");e&&e.addEventListener("change",()=>me())}function Ua(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=fe();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${f(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=fe().find(i=>i.name===e.value),o=a?xt(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(i=>`<option value="${i.name}">${f(i.name)}</option>`).join(""),me()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",me)})}function ze(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var r;const a=n.cover_image||((r=n.images)==null?void 0:r[0])||Ie[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",i=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${f(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${f(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+f(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${f(o)}</td>
      <td class="cell-price">${f(De(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${i}</td>
      <td>
        <div class="action-btns">
          ${(y==null?void 0:y.role)==="admin"||(y==null?void 0:y.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(y==null?void 0:y.role)==="admin"||(y==null?void 0:y.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function Pa(){const e=document.getElementById("f-city");if(!e)return;const t=fe(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${f(a.name)}</option>`).join(""),n&&(e.value=n)}function Fa(){var e,t,n,a,o,i,r,l,d,c,s,m,u,E,w;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((i=document.getElementById("f-condominium"))==null?void 0:i.value)||"").trim().toLowerCase(),priceMin:parseFloat((r=document.getElementById("f-price-min"))==null?void 0:r.value)||0,priceMax:parseFloat((l=document.getElementById("f-price-max"))==null?void 0:l.value)||1/0,areaMin:parseFloat((d=document.getElementById("f-area-min"))==null?void 0:d.value)||0,areaMax:parseFloat((c=document.getElementById("f-area-max"))==null?void 0:c.value)||1/0,construction:((s=document.getElementById("f-construction"))==null?void 0:s.value)||"",published:((m=document.getElementById("f-published"))==null?void 0:m.value)||"",bedrooms:((u=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:u.dataset.val)||"",suites:((E=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:E.dataset.val)||"",parking:((w=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:w.dataset.val)||""}}function bt(e){const t=Fa();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const i=parseFloat(a.area)||0;return!(t.areaMin>0&&i<t.areaMin||t.areaMax<1/0&&i>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Ge(){if(!document.getElementById("admin-properties"))return;const e=await Jt(),t=e.length,n=e.filter(r=>r.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),i=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),i&&(i.textContent="—"),Pa(),ze(A)}let V=null,ee="",oe=[];function it(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden",(!history.state||history.state.modal!=="property")&&history.pushState({modal:"property"},"")}function Fe(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow="",history.state&&history.state.modal==="property"&&history.back()}window._modalPopstateBound||(window._modalPopstateBound=!0,window.addEventListener("popstate",()=>{const e=document.getElementById("property-modal");e&&!e.classList.contains("hidden")&&(e.classList.add("hidden"),document.body.style.overflow="")}));function Ne(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(oe=Array.isArray(e)?[...e]:[],!oe.length){t.style.display="none";return}t.style.display="",n.innerHTML=oe.map(a=>`
    <div class="cover-thumb-wrap${a===ee?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star" title="Marcar como capa">★</span>
      <button type="button" class="cover-delete" title="Remover foto" aria-label="Remover foto">🗑️</button>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",o=>{o.target.closest(".cover-delete")||(ee=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(i=>i.classList.remove("selected")),a.classList.add("selected"))})}),n.querySelectorAll(".cover-delete").forEach(a=>{a.addEventListener("click",o=>{o.stopPropagation();const i=a.closest(".cover-thumb-wrap"),r=i==null?void 0:i.dataset.url;r&&confirm("Remover esta foto do imóvel?")&&(oe=oe.filter(l=>l!==r),ee===r&&(ee=oe[0]||""),Ne(oe))})})}}function tt(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{var d;n.preventDefault();const a=new FormData(e),o=a.getAll("images");let i=[];const r=o.filter(c=>c.size>0);if(V&&(i=[...oe]),r.length){t.disabled=!0,t.textContent=`Enviando 0/${r.length} foto…`;try{const c=await Ra(r,(s,m)=>{t.textContent=`Enviando ${s}/${m} foto…`});i=[...i,...c]}catch(c){console.error("Erro no upload:",c),t.disabled=!1,t.textContent=V?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}i.length||(i=[...Ie]);const l={...V?{id:V}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),state:a.get("state")||"",neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:i,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:ee||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",furnishing_status:a.get("furnishing_status")||"",furnished:a.get("furnishing_status")==="mobiliado",collection:JSON.stringify(["col_frente_mar","col_decorados","col_casas","col_alto_padrao","col_lancamentos"].filter(c=>a.get(c)).map(c=>a.get(c))),tenant_id:V?((d=A.find(c=>c.id===V))==null?void 0:d.tenant_id)??(y==null?void 0:y.tenant_id)??null:(y==null?void 0:y.tenant_id)??null};try{await _a(l),V=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const c=document.getElementById("adminPublished");c&&(c.value="true");const s=document.getElementById("adminNeighborhood");s&&(s.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),ee="",Ne([]),Fe(),await Ge()}catch(c){console.error(c),t.disabled=!1,t.textContent=V?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((c==null?void 0:c.message)||JSON.stringify(c)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await La(o),await Ge()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((y==null?void 0:y.role)!=="admin"&&(y==null?void 0:y.role)!=="super_admin")return;const o=Number(n.target.dataset.id);if(!o)return;const i=A.find(s=>s.id===o);if(!i)return;V=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=i.title||"",e.querySelector('[name="rua"]').value=i.rua||"",e.querySelector('[name="numero"]').value=i.numero||"",e.querySelector('[name="city"]').value=i.city||"";const r=e.querySelector('[name="state"]');r&&(r.value=i.state||""),e.querySelector('[name="price"]').value=i.price||"",e.querySelector('[name="bedrooms"]').value=i.bedrooms||"",e.querySelector('[name="suites"]').value=i.suites||"",e.querySelector('[name="area"]').value=i.area||"",e.querySelector('[name="parking"]').value=i.parking||"",e.querySelector('[name="description"]').value=i.description||"",e.querySelector('[name="construction_status"]').value=i.construction_status||"",e.querySelector('[name="owner_name"]').value=i.owner_name||"",e.querySelector('[name="owner_phone"]').value=i.owner_phone||"",e.querySelector('[name="owner_email"]').value=i.owner_email||"",e.querySelector('[name="owner_notes"]').value=i.owner_notes||"",e.querySelector('[name="condominium"]').value=i.condominium||"";const l=e.querySelector('[name="furnishing_status"]');if(l){const s=i.furnishing_status||(i.furnished===!0?"mobiliado":"vazio");l.value=s}try{const s=JSON.parse(i.collection||"[]");["col_frente_mar","col_decorados","col_casas","col_alto_padrao","col_lancamentos"].forEach(m=>{const u=e.querySelector('[name="'+m+'"]');u&&(u.checked=s.includes(u.value))})}catch{}const d=document.getElementById("adminPublished");d&&(d.value=i.published===!0?"true":"false");const c=document.getElementById("adminCitySelect");c&&(c.value=i.city||"",c.dispatchEvent(new Event("change")),setTimeout(()=>{const s=document.getElementById("adminNeighborhood");s&&(s.value=i.neighborhood||"")},50)),ee=i.cover_image||((a=i.images)==null?void 0:a[0])||"",Ne(i.images||[]),it("Editar Imóvel")}})}function f(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function Va(e){return e?String(e).replace(/\s*\([A-Z]{2}\)\s*$/i,"").trim():""}function Xa(e,t,n,a,o){const i=[];e&&i.push(e),n&&i.push(n);const r=Va(a);return r&&i.push(r+(o?" - "+o:"")),i.join(", ")}function ht(e){var x;const t=(x=e.images)!=null&&x.length?e.images:Ie,n=ka(t),a=n.length,o=qe(e.cover_image||n[0]),i=Xa(e.rua,e.numero,e.neighborhood,e.city,e.state),r=De(e.price,window.currentLang||"pt"),l=`https://omarcorretor.com.br/property.html?id=${e.id}`,d=encodeURIComponent(`Olá! Tenho interesse no imóvel *${e.title}*${e.reference?` (Ref: ${e.reference})`:""}. Poderia me dar mais informações?
${l}`),c=e.area?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>${e.area}m²</span>`:"",s=e.bedrooms?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20v-6a2 2 0 012-2h16a2 2 0 012 2v6"/><path d="M2 14V8a2 2 0 012-2h4l2 3h8a2 2 0 012 2v3"/></svg>${e.bedrooms} quarto${e.bedrooms!=1?"s":""}</span>`:"",m=e.bathrooms?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 000-2.12L6 1.5a1.5 1.5 0 00-2.12 0L2 3.38a1.5 1.5 0 000 2.12L5.5 9"/><path d="M2 20h20M20 12H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2z"/></svg>${e.bathrooms} banheiro${e.bathrooms!=1?"s":""}</span>`:"",u=e.parking?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>${e.parking} vaga${e.parking!=1?"s":""}</span>`:"",E=Math.max(1,Math.min(a,6)),w=`<div class="icard-dots">${Array.from({length:E},(k,v)=>`<span class="icard-dot${v===0?" active":""}"></span>`).join("")}</div>`;return`
    <div class="imovel-card" data-pid="${e.id}">
      <div class="icard-img-wrap" data-total="${a}" data-idx="0" data-pid="${e.id}" data-images="${encodeURIComponent(JSON.stringify(n))}">
        <img src="${f(o)}" alt="" class="icard-img-bg carousel-img-bg" aria-hidden="true" loading="lazy" decoding="async">
        <div class="icard-img-link" data-href="property.html?id=${e.id}" role="link" tabindex="0" aria-label="Ver ${f(e.title)}">
          <img src="${f(o)}" alt="${f(e.title)}" class="icard-img carousel-img" loading="lazy" decoding="async">
        </div>
        ${a>1?`
          <button type="button" class="carousel-btn carousel-prev icard-prev" aria-label="Anterior">&#8249;</button>
          <button type="button" class="carousel-btn carousel-next icard-next" aria-label="Próximo">&#8250;</button>
        `:""}
        ${w}
      </div>
      <div class="icard-body" data-href="property.html?id=${e.id}">
        ${(()=>{const k=e.furnishing_status||(e.furnished===!0?"mobiliado":"");return k==="mobiliado"?'<span class="icard-badge badge-furn-mob">Mobiliado</span>':k==="semimobiliado"?'<span class="icard-badge badge-furn-semi">Semimobiliado</span>':k==="vazio"?'<span class="icard-badge badge-furn-vazio">Vazio</span>':""})()}
        <div class="icard-neighborhood">${f(e.neighborhood||e.title)}</div>
        <div class="icard-address">${f(i)}</div>
        ${c||s||m||u?`<div class="icard-specs">${c}${s}${m}${u}</div>`:""}
        <div class="icard-price-row">
          <div>
            <div class="icard-price-label">Comprar</div>
            <div class="icard-price">${f(r)}</div>
          </div>
        </div>
        <div class="icard-footer">
          <span class="icard-code">Cód. ${f(String(e.reference||e.id))}</span>
          <a href="https://wa.me/${Te}?text=${d}" target="_blank" rel="noopener" class="icard-wa" title="WhatsApp" onclick="fbq('track', 'Contact')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 24l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          </a>
          <a href="property.html?id=${e.id}" class="icard-heart" title="Ver detalhes">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `}let ie=[],Q=0;function Ga(e){var m,u;const t=document.getElementById("view-modal-edit");t&&(t.dataset.pid=e.id),document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const n=document.getElementById("view-status-badge");e.published?(n.textContent="● Publicado",n.className="badge badge-green"):(n.textContent="○ Rascunho",n.className="badge badge-gray");const a=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=a.length?`📍 ${a.join(", ")}`:"";const o=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.join(" "))}`;document.getElementById("view-map-link").href=o,document.getElementById("view-directions-link").href=o;const i=((m=e.images)==null?void 0:m[0])||Ie[0];document.getElementById("view-thumb-preview").src=i,ie=(u=e.images)!=null&&u.length?e.images:Ie,Q=0,Je(),document.getElementById("view-price").textContent=De(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const r=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),r&&(r.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(E=>E.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(E=>E.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const d="https://omarcorretor.com.br/property.html?id="+e.id,c=document.getElementById("share-link-input");c&&(c.value=d);const s=document.getElementById("share-panel");s&&(s.style.display="none",s.dataset.pid=e.id),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Oe(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Je(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=ie[Q],e.alt=`Foto ${Q+1}`;const i=ie.length>1;n.style.display=i?"flex":"none",a.style.display=i?"flex":"none",t.textContent=i?`${Q+1} / ${ie.length}`:"",o.innerHTML=i?ie.map((r,l)=>`<img src="${r}" class="view-thumb${l===Q?" active":""}" data-i="${l}" alt="Foto ${l+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(r=>{r.addEventListener("click",()=>{Q=+r.dataset.i,Je()})})}async function Bt(e){const{data:t}=await b.from("profiles").select("*").eq("id",e).maybeSingle();return t}function We(e){var m,u;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const i=(e==null?void 0:e.name)||"Sem nome",r=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=i,o&&(o.textContent=r),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((m=i[0])==null?void 0:m.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const l=document.getElementById("avatar-dd-name"),d=document.getElementById("avatar-dd-role"),c=document.getElementById("avatar-dd-img"),s=document.getElementById("avatar-dd-initial");l&&(l.textContent=i),d&&(d.textContent=r),e!=null&&e.avatar_url&&c?(c.src=e.avatar_url,c.style.display="",s&&(s.style.display="none")):(s&&(s.textContent=((u=i[0])==null?void 0:u.toUpperCase())||"?",s.style.display=""),c&&(c.style.display="none"))}async function Ct(e){const t=document.getElementById("avatar-dd-ver-site");if(!t)return;const n=(e==null?void 0:e.tenant_id)||N(),a=n&&n!==X,o=window.location.origin,i=a?`${o}/demo.html?key=${n}`:`${o}/index.html`;if(t.href=i,!!a)try{const{data:r}=await b.from("tenants").select("domain").eq("id",n).maybeSingle(),l=window.location.hostname.replace(/^www\./,""),d=((r==null?void 0:r.domain)||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim();d&&d!==l&&(t.href=`https://${d}`)}catch{}}const He={dashboard:()=>Ln(),empresa:()=>ra(),visual:()=>la(),"site-config":()=>ca(),"crm-config":()=>ma(),integracoes:()=>pa(),midia:()=>ua(),depoimentos:()=>da()};function ae(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);if(t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),typeof He<"u"&&He[e]){const o=He[e];He[e]=null,setTimeout(o,0)}(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),Z(),e==="contatos"&&on(),e==="funil"&&Ka(),e==="tarefas"&&Qa()}function Tt(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:ra,visual:la,"site-config":ca,"crm-config":ma,integracoes:pa,midia:ua,depoimentos:da}).forEach(([a,o])=>{const i=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);i&&i.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>un(),{once:!0}),window.lucide&&lucide.createIcons()}}function Z(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function Ja(){var a,o,i;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
    <div class="modal" style="max-width:400px;">
      <div class="modal-header">
        <h3>Alterar Senha</h3>
        <button class="modal-close" id="cp-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
          <label class="form-label">Nova senha</label>
          <input id="cp-new" type="password" class="form-control" placeholder="Mínimo 12 caracteres">
        </div>
        <div class="form-group">
          <label class="form-label">Confirmar nova senha</label>
          <input id="cp-confirm" type="password" class="form-control" placeholder="Repita a senha">
        </div>
        <p id="cp-msg" style="display:none;font-size:13px;margin:0;"></p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cp-cancel">Cancelar</button>
        <button class="btn-primary" id="cp-save" style="margin:0;">Salvar Senha</button>
      </div>
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",r=>{r.target===t&&n()}),(i=document.getElementById("cp-save"))==null||i.addEventListener("click",async()=>{var m,u;const r=((m=document.getElementById("cp-new"))==null?void 0:m.value)||"",l=((u=document.getElementById("cp-confirm"))==null?void 0:u.value)||"",d=document.getElementById("cp-msg"),c=document.getElementById("cp-save");if(d.style.display="none",r.length<12){d.style.color="#ef4444",d.textContent="Mínimo 6 caracteres.",d.style.display="";return}if(r!==l){d.style.color="#ef4444",d.textContent="As senhas não coincidem.",d.style.display="";return}c.disabled=!0,c.textContent="Salvando…";const{error:s}=await b.auth.updateUser({password:r});if(c.disabled=!1,c.textContent="Salvar Senha",s){d.style.color="#ef4444",d.textContent="Erro: "+s.message,d.style.display="";return}d.style.color="#16a34a",d.textContent="✅ Senha alterada com sucesso!",d.style.display="",setTimeout(n,1500)})}function Wa(){var i,r,l,d,c;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((i=document.getElementById("topnav-avatar-img"))==null?void 0:i.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
    <div class="modal" style="max-width:380px;">
      <div class="modal-header">
        <h3>Alterar Foto</h3>
        <button class="modal-close" id="cph-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;border:3px solid #e2e8f0;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
          <img id="cph-preview" src="${a?n:""}" alt="" style="width:100%;height:100%;object-fit:cover;display:${a?"":"none"};">
          <span id="cph-initial" style="font-size:32px;font-weight:700;color:#64748b;display:${a?"none":""};">${((y==null?void 0:y.name)||"?")[0].toUpperCase()}</span>
        </div>
        <label class="btn-secondary" style="cursor:pointer;padding:10px 20px;">
          <input id="cph-file" type="file" accept="image/*" style="display:none"> Escolher Foto
        </label>
        <p id="cph-msg" style="display:none;font-size:13px;margin:0;"></p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cph-cancel">Cancelar</button>
        <button class="btn-primary" id="cph-save" style="margin:0;" disabled>Salvar Foto</button>
      </div>
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(r=document.getElementById("cph-close"))==null||r.addEventListener("click",o),(l=document.getElementById("cph-cancel"))==null||l.addEventListener("click",o),t.addEventListener("click",s=>{s.target===t&&o()}),(d=document.getElementById("cph-file"))==null||d.addEventListener("change",s=>{const m=s.target.files[0];if(!m)return;const u=URL.createObjectURL(m),E=document.getElementById("cph-preview"),w=document.getElementById("cph-initial");E&&(E.src=u,E.style.display=""),w&&(w.style.display="none"),document.getElementById("cph-save").disabled=!1}),(c=document.getElementById("cph-save"))==null||c.addEventListener("click",async()=>{var E;const s=(E=document.getElementById("cph-file"))==null?void 0:E.files[0];if(!s)return;const m=document.getElementById("cph-save"),u=document.getElementById("cph-msg");m.disabled=!0,m.textContent="Salvando…";try{const w=await je(s,400,.85),x=`avatars/${y.id}-${Date.now()}.jpg`,{error:k}=await b.storage.from("imoveis").upload(x,w,{contentType:"image/jpeg",upsert:!0});if(k)throw k;const{data:{publicUrl:v}}=b.storage.from("imoveis").getPublicUrl(x);await b.from("profiles").update({avatar_url:v}).eq("id",y.id),y={...y,avatar_url:v},We(y),o()}catch(w){u.style.color="#ef4444",u.textContent="Erro: "+w.message,u.style.display="",m.disabled=!1,m.textContent="Salvar Foto"}})}function st(e,t){var i,r,l;const n=document.getElementById("add-corretor-modal-root");n&&n.remove();const a=document.createElement("div");a.id="add-corretor-modal-root",a.className="modal-backdrop",a.innerHTML=`
    <div class="modal" style="max-width:440px;">
      <div class="modal-header">
        <h3>Adicionar Usuário</h3>
        <button class="modal-close" id="ac-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
          <label class="form-label">Função *</label>
          <select id="ac-role" class="form-control">
            <option value="corretor">Corretor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">E-mail *</label>
          <input id="ac-email" type="email" class="form-control" placeholder="usuario@email.com">
        </div>
        <div class="form-group">
          <label class="form-label">Senha de acesso *</label>
          <input id="ac-password" type="text" class="form-control" placeholder="Mínimo 12 caracteres">
        </div>
        <p id="ac-note" style="display:none;font-size:13px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:0;line-height:1.6;"></p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="ac-cancel">Cancelar</button>
        <button class="btn-primary" id="ac-save" style="margin:0;">+ Criar Acesso</button>
      </div>
    </div>`,document.body.appendChild(a);const o=()=>a.remove();(i=document.getElementById("ac-close"))==null||i.addEventListener("click",o),(r=document.getElementById("ac-cancel"))==null||r.addEventListener("click",o),a.addEventListener("click",d=>{d.target===a&&o()}),(l=document.getElementById("ac-save"))==null||l.addEventListener("click",async()=>{var u,E,w;const d=(u=document.getElementById("ac-email"))==null?void 0:u.value.trim(),c=(E=document.getElementById("ac-password"))==null?void 0:E.value.trim(),s=document.getElementById("ac-save"),m=document.getElementById("ac-note");if(!d){alert("Informe o e-mail do corretor.");return}if(!c||c.length<12){alert("A senha precisa ter no mínimo 6 caracteres.");return}s.disabled=!0,s.textContent="Criando…",m.style.display="none";try{const x=e||(y==null?void 0:y.tenant_id)||null,k=((w=document.getElementById("ac-role"))==null?void 0:w.value)||"corretor",v=await ge({email:d,password:c,role:k,tenant_id:x});s.disabled=!1,s.textContent="+ Criar Acesso",v.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",v.email_sent===!1?(m.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${f(d)}<br><strong>Senha:</strong> ${f(c)}`,m.style.color="#0f172a"):(m.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",m.style.color="#16a34a"),m.style.display="",typeof t=="function"&&setTimeout(t,1500)):alert("Erro: "+(v.error||"Falha desconhecida"))}catch(x){s.disabled=!1,s.textContent="+ Criar Acesso",alert("Erro: "+x.message)}})}function At(){var i,r,l,d,c,s,m,u,E,w,x;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",k=>{var I;k.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(I=document.getElementById("notif-dropdown"))==null||I.classList.add("hidden")}),(i=document.getElementById("avatar-dd-change-photo"))==null||i.addEventListener("click",k=>{k.stopPropagation(),Z(),Wa()}),(r=document.getElementById("avatar-dd-change-pass"))==null||r.addEventListener("click",k=>{k.stopPropagation(),Z(),Ja()}),(l=document.getElementById("avatar-dd-add-corretor"))==null||l.addEventListener("click",k=>{k.stopPropagation(),Z(),st()}),(d=document.getElementById("avatar-dd-settings"))==null||d.addEventListener("click",k=>{k.stopPropagation(),Z(),ae("settings")}),(c=document.getElementById("avatar-dd-logout"))==null||c.addEventListener("click",async k=>{k.stopPropagation(),await b.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",k=>{var I;k.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((I=document.getElementById("avatar-dropdown"))==null||I.classList.add("hidden"),en())}),(s=document.getElementById("notif-mark-all"))==null||s.addEventListener("click",()=>{tn(),Z()}),(m=document.getElementById("btn-search-open"))==null||m.addEventListener("click",()=>{var k,v;(k=document.getElementById("search-overlay"))==null||k.classList.remove("hidden"),(v=document.getElementById("search-input"))==null||v.focus()}),(u=document.getElementById("search-overlay-close"))==null||u.addEventListener("click",()=>{var k;(k=document.getElementById("search-overlay"))==null||k.classList.add("hidden")}),(E=document.getElementById("search-overlay"))==null||E.addEventListener("click",k=>{k.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(w=document.getElementById("search-input"))==null||w.addEventListener("input",k=>{clearTimeout(o),o=setTimeout(()=>Za(k.target.value.trim()),280)}),(x=document.getElementById("search-input"))==null||x.addEventListener("keydown",k=>{var v;k.key==="Escape"&&((v=document.getElementById("search-overlay"))==null||v.classList.add("hidden"))}),document.addEventListener("click",Z)}let dt=!1,W=[],Ke=[],ke=[],pe={},aa=[],j=null,Be=null,J={search:"",tags:new Set,status:""};async function Ka(){var t;if(window._kanbanRefreshTimer&&clearInterval(window._kanbanRefreshTimer),window._kanbanRefreshTimer=setInterval(()=>{const n=document.querySelector('.section[data-section="funil"]');!n||n.offsetParent===null||Re().catch(()=>{})},3e4),dt){await qt();return}dt=!0,await qt(),(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>lt()),xn();const e=document.getElementById("funil-pipe-sel");e==null||e.addEventListener("change",async()=>{j=parseInt(e.value,10),await Re()})}function rt(e){var i;const t=document.getElementById("kanban-filters");if(!t)return;t.style.display="block";const n=document.getElementById("kf-status");n&&(n.innerHTML='<option value="">Todos os status</option>'+aa.map(r=>`<option value="${f(r.name)}">${f(r.name)}</option>`).join(""),n.value=J.status,n.onchange=()=>{J.status=n.value,le()});const a=document.getElementById("kf-tags");if(a){if(!e.length){a.style.display="none";return}a.style.display="flex",a.innerHTML='<span class="kf-tags-label">Tags:</span>'+e.map(r=>`<button class="kf-tag-btn${J.tags.has(r.name)?" active":""}" data-tag="${f(r.name)}"
          style="--kf-tc:${r.color}">
          ${f(r.name)}
        </button>`).join(""),a.querySelectorAll(".kf-tag-btn").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.tag;J.tags.has(l)?J.tags.delete(l):J.tags.add(l),rt(e),le()})})}const o=document.getElementById("kf-search");o&&(o.value=J.search,o.oninput=()=>{J.search=o.value.toLowerCase(),le()}),(i=document.getElementById("kf-clear"))==null||i.addEventListener("click",()=>{J={search:"",tags:new Set,status:""},rt(e),le()})}async function qt(){const e=N(),[{data:t},{data:n},{data:a}]=await Promise.all([b.from("crm_pipelines").select("*").eq("tenant_id",e).order("sort_order"),b.from("crm_tags").select("*").eq("tenant_id",e).order("name"),b.from("crm_lead_statuses").select("*").eq("tenant_id",e).order("sort_order")]);W=t||[],aa=a||[],pe={},(n||[]).forEach(l=>{pe[l.name]=l});const o=W.map(l=>l.id),{data:i}=o.length?await b.from("crm_stages").select("*").in("pipeline_id",o).order("sort_order"):{data:[]};Ke=i||[],rt(n||[]);const r=document.getElementById("funil-pipe-sel");if(r){const l=j;r.innerHTML=W.length?W.map(c=>`<option value="${c.id}">${f(c.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const d=W.find(c=>c.id===l)||W.find(c=>c.is_default)||W[0];d?(r.value=d.id,j=d.id):j=null}await Re()}async function Re(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=b.from("leads").select("*").order("created_at",{ascending:!1});(y==null?void 0:y.role)==="corretor"?t=t.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id)),j&&(t=t.eq("pipeline_id",j));const{data:n}=await t;ke=n||[],le()}function le(){const e=document.getElementById("kanban-board");if(!e)return;const t=Ke.filter(i=>i.pipeline_id===j);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n=J,a=ke.filter(i=>{if(n.search&&!`${i.name||""} ${i.phone||""} ${i.email||""}`.toLowerCase().includes(n.search)||n.status&&i.status!==n.status)return!1;if(n.tags.size>0){const r=Array.isArray(i.tags)?i.tags:[];if(![...n.tags].every(l=>r.includes(l)))return!1}return!0}),o={};t.forEach(i=>{o[i.name]=[]}),a.forEach(i=>{var l,d,c,s;const r=i.stage||((l=t[0])==null?void 0:l.name);o[r]||(o[((d=t[0])==null?void 0:d.name)||""]=[]),(s=o[r]||o[(c=t[0])==null?void 0:c.name])==null||s.push(i)}),e.innerHTML=t.map(i=>{const r=o[i.name]||[],l=r.length?r.map(s=>{const m=(s.phone||"").replace(/\D/g,""),u=encodeURIComponent(`Olá ${s.name}! Aqui é da ${K("company.name","nossa imobiliária")}. Vi seu interesse e gostaria de ajudar. Posso falar agora?`),E=s.status==="quente"?"Quente":s.status==="frio"?"Frio":s.status==="morno"?"Morno":"Em andamento";s.interest;const w=Array.isArray(s.tags)?s.tags.length:0;return`
        <div class="kanban-card" draggable="true" data-id="${s.id}" data-stage="${f(i.name)}" style="cursor:pointer;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
            <span class="rd-card-status">${f(E)}</span>
            <button class="rd-card-info-btn" data-lead="${s.id}" title="Ver resumo" onclick="event.stopPropagation();window.openLeadSidePanel('${s.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </button>
          </div>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;">
            <div class="kanban-card-name" style="flex:1;">${f(s.name||"—")}</div>
            ${m?`<a href="https://wa.me/${m}?text=${u}" target="_blank" rel="noopener"
              onclick="event.stopPropagation()"
              style="flex-shrink:0;width:28px;height:28px;background:#25d366;border-radius:6px;display:flex;align-items:center;justify-content:center;text-decoration:none;"
              title="Abrir WhatsApp" onclick="fbq('track', 'Contact')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>`:""}
          </div>
          ${s.phone?`<div class="kanban-card-info">📞 ${f(s.phone)}</div>`:""}
          ${s.email?`<div class="kanban-card-info" style="font-size:11px;color:#94a3b8;">✉ ${f(s.email)}</div>`:""}
          ${s.notes?`<div class="kanban-card-info" style="font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px;">📝 ${f(s.notes)}</div>`:""}
          ${w>0||s.source?`<div class="kanban-card-tags" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:2px;">
            ${s.source?`<span class="kanban-card-tag">${f(s.source)}</span>`:""}
            ${Array.isArray(s.tags)?s.tags.map(x=>{const k=pe[x],v=(k==null?void 0:k.color)||"#0369a1";return`<span class="kanban-card-tag" style="background:${v}18;color:${v};border:1px solid ${v}44;">${f(x)}</span>`}).join(""):""}
          </div>`:""}
          <div class="rd-card-icons">
            <span title="Avaliação">
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${s.priority==="high"?"⭐":"1"}
            </span>
            <span title="Responsável">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
          </div>
          <button class="rd-card-task-btn" data-lead="${s.id}" onclick="event.stopPropagation()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Criar Tarefa
          </button>
        </div>`}).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>',d=r.reduce((s,m)=>s+(Number(m.budget_max)||0),0),c=d>0?"R$ "+d.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ 0,00";return`
      <div class="kanban-col" data-stage="${f(i.name)}">
        <div class="kanban-col-header">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${i.color||"#0ea5e9"}"></div>
            ${f(i.name.toUpperCase())} (${r.length})
          </div>
        </div>
        <div class="rd-col-value">${c}</div>
        <div class="rd-col-actions">
          <button class="rd-col-action" title="Atualizar coluna" data-stage="${f(i.name)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/></svg>
          </button>
          <button class="rd-col-action" title="Ver análises da etapa">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </button>
        </div>
        <div class="kanban-cards" data-stage="${f(i.name)}">${l}</div>
      </div>`}).join(""),Ya(),window.lucide&&lucide.createIcons()}window.openLeadSidePanel=function(e){var r,l;const t=(typeof ke<"u"?ke:[]).find(d=>String(d.id)===String(e));if(!t){console.warn("[Sidepanel] lead não encontrado:",e);return}(r=document.getElementById("rd-lead-sidepanel"))==null||r.remove(),(l=document.getElementById("rd-lead-sidepanel-backdrop"))==null||l.remove();const n=document.createElement("div");n.id="rd-lead-sidepanel-backdrop",n.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.45);z-index:1400;opacity:0;transition:opacity .2s;",n.addEventListener("click",()=>window.closeLeadSidePanel());const a=document.createElement("div");a.id="rd-lead-sidepanel",a.className="rd-lead-sidepanel";const o=d=>{if(!d)return"—";try{const c=new Date(d),s=String(c.getDate()).padStart(2,"0"),m=String(c.getMonth()+1).padStart(2,"0");return`${s}/${m}/${c.getFullYear()} às ${String(c.getHours()).padStart(2,"0")}:${String(c.getMinutes()).padStart(2,"0")}`}catch{return d}},i=(t.notes?1:0)+(t.updated_at&&t.updated_at!==t.created_at?1:0);a.innerHTML=['<div class="rd-lead-sidepanel-header">','<div class="rd-lead-sidepanel-title">Sobre a Negociação</div>','<button class="rd-lead-sidepanel-close" onclick="window.closeLeadSidePanel()" title="Fechar">','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',"</button>","</div>",'<div class="rd-lead-sidepanel-body">','<div class="rd-lead-sidepanel-section-label">DADOS GERAIS</div>',`<div class="rd-lead-field"><div class="rd-lead-field-label">Nome</div><div class="rd-lead-field-value">${f(t.name||"—")}</div></div>`,t.phone?`<div class="rd-lead-field"><div class="rd-lead-field-label">Telefone</div><div class="rd-lead-field-value">📞 ${f(t.phone)}</div></div>`:"",t.email?`<div class="rd-lead-field"><div class="rd-lead-field-label">E-mail</div><div class="rd-lead-field-value">✉ ${f(t.email)}</div></div>`:"",`<div class="rd-lead-field"><div class="rd-lead-field-label">Fonte</div><div class="rd-lead-field-value">${f(t.source||"Não informado")}</div></div>`,t.utm_campaign?`<div class="rd-lead-field"><div class="rd-lead-field-label">Campanha</div><div class="rd-lead-field-value">${f(t.utm_campaign)}</div></div>`:"",t.utm_source?`<div class="rd-lead-field"><div class="rd-lead-field-label">UTM Source</div><div class="rd-lead-field-value">${f(t.utm_source)}</div></div>`:"",`<div class="rd-lead-field"><div class="rd-lead-field-label">Interações</div><div class="rd-lead-field-value">${i} interaç${i===1?"ão":"ões"}</div></div>`,t.notes?`<div class="rd-lead-field"><div class="rd-lead-field-label">Última anotação</div><div class="rd-lead-field-value" style="background:#f8fafc;padding:10px 12px;border-radius:6px;border-left:3px solid #06b6d4;">${f(t.notes)}</div></div>`:"",`<div class="rd-lead-field"><div class="rd-lead-field-label">Data de criação</div><div class="rd-lead-field-value">${o(t.created_at)}</div></div>`,t.updated_at&&t.updated_at!==t.created_at?`<div class="rd-lead-field"><div class="rd-lead-field-label">Último contato</div><div class="rd-lead-field-value">${o(t.updated_at)}</div></div>`:"",`<div class="rd-lead-field"><div class="rd-lead-field-label">Previsão de fechamento</div><div class="rd-lead-field-value" style="color:${t.next_contact?"#0f172a":"#94a3b8"}">${t.next_contact?o(t.next_contact):"Não preenchido"}</div></div>`,t.interest?`<div class="rd-lead-field"><div class="rd-lead-field-label">Qualificação / Interesse</div><div class="rd-lead-field-value">${f(t.interest)}</div></div>`:"",Array.isArray(t.tags)&&t.tags.length?`<div class="rd-lead-field"><div class="rd-lead-field-label">Tags</div><div class="rd-lead-field-value" style="display:flex;flex-wrap:wrap;gap:4px">${t.tags.map(d=>`<span style="background:#ecfeff;color:#0e7490;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600">${f(d)}</span>`).join("")}</div></div>`:"","</div>",'<div class="rd-lead-sidepanel-footer">',t.phone?`<button class="rd-btn-primary" style="background:#25d366;flex:1;" onclick="window.open('https://wa.me/${(t.phone||"").replace(/\D/g,"")}','_blank');if(typeof fbq==='function')fbq('track','Contact')">WhatsApp</button>`:"",`<button class="rd-btn-primary" style="flex:1;" onclick="window.closeLeadSidePanel();if(typeof openLeadModal==='function'){const l=kanbanLeads.find(x=>String(x.id)==='${t.id}');if(l)openLeadModal(l);}">Abrir Negociação</button>`,"</div>"].join(""),document.body.appendChild(n),document.body.appendChild(a),requestAnimationFrame(()=>{n.style.opacity="1",a.classList.add("open")})};window.closeLeadSidePanel=function(){const e=document.getElementById("rd-lead-sidepanel"),t=document.getElementById("rd-lead-sidepanel-backdrop");e&&(e.classList.remove("open"),setTimeout(()=>e.remove(),250)),t&&(t.style.opacity="0",setTimeout(()=>t.remove(),250))};function Ya(){const e=document.getElementById("kanban-board");e&&(e._kanbanListenersAttached||(e._kanbanListenersAttached=!0,e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>lt())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=ke.find(a=>String(a.id)===String(t.dataset.id));n&&lt(n)}),t.addEventListener("dragstart",n=>{Be=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!Be||!a)return;const o=ke.find(l=>String(l.id)===String(Be)),i=o==null?void 0:o.stage;o&&(o.stage=a,le());const{error:r}=await b.from("leads").update({stage:a}).eq("id",Be);r&&(console.warn("[Kanban] falha ao mover lead:",r),o&&(o.stage=i,le()),alert("Erro ao mover lead. Tente de novo.")),Be=null})})))}async function lt(e=null){var w,x,k;(w=document.getElementById("lead-detail-panel"))==null||w.remove();const t=!e,n=N(),{data:a}=await b.from("crm_tags").select("*").eq("tenant_id",n).order("name"),{data:o}=await b.from("crm_lead_statuses").select("*").eq("tenant_id",n).order("sort_order"),i=e!=null&&e.pipeline_id&&((x=W.find(v=>v.id===e.pipeline_id))==null?void 0:x.id)||j;function r(v){return Ke.filter(I=>I.pipeline_id===v).map(I=>`<option value="${f(I.name)}" ${(e==null?void 0:e.stage)===I.name?"selected":""}>${f(I.name)}</option>`).join("")}const l=W.map(v=>`<option value="${v.id}" ${v.id===i?"selected":""}>${f(v.name)}</option>`).join(""),d=r(i),c=((e==null?void 0:e.phone)||"").replace(/\D/g,""),s=document.createElement("div");s.id="lead-detail-panel",s.style.cssText="position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:#fff;box-shadow:-4px 0 32px rgba(0,0,0,.15);z-index:1000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;",s.innerHTML=`
    <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0;">${t?"+ Novo Lead":"✏️ Editar Lead"}</h3>
      <button id="ldp-close" style="background:none;border:none;cursor:pointer;font-size:22px;color:#94a3b8;line-height:1;">✕</button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:20px 24px;display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">NOME *</label>
        <input id="ldp-name" class="form-input" type="text" value="${f((e==null?void 0:e.name)||"")}" placeholder="Nome do cliente">
      </div>
      <div style="display:flex;gap:10px;">
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">TELEFONE</label>
          <input id="ldp-phone" class="form-input" type="tel" value="${f((e==null?void 0:e.phone)||"")}" placeholder="(00) 00000-0000">
        </div>
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">E-MAIL</label>
          <input id="ldp-email" class="form-input" type="email" value="${f((e==null?void 0:e.email)||"")}" placeholder="email@...">
        </div>
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ORIGEM</label>
        <input id="ldp-source" class="form-input" type="text" value="${f((e==null?void 0:e.source)||"")}" placeholder="site, indicação, instagram…">
      </div>
      ${W.length>1?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">FUNIL</label>
        <select id="ldp-pipe" class="form-input">${l}</select>
      </div>`:""}
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ETAPA DO FUNIL</label>
        <select id="ldp-stage" class="form-input">${d}</select>
      </div>
      ${o!=null&&o.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">STATUS</label>
        <select id="ldp-status" class="form-input">
          <option value="">— Sem status —</option>
          ${o.map(v=>`<option value="${v.name}" ${(e==null?void 0:e.status)===v.name?"selected":""}>${f(v.name)}</option>`).join("")}
        </select>
      </div>`:""}
      <div id="ldp-tags-wrap" class="ldp-tags-section">
        <label class="ldp-field-label">TAGS</label>
        <div class="ldp-tag-badge-area" id="ldp-tag-badge-area">
          ${((e==null?void 0:e.tags)||[]).map(v=>{const $=(pe[v]||{}).color||"#6366F1";return`<span class="ldp-tag-badge" data-tag="${f(v)}" style="background:${$}18;color:${$};border-color:${$}55;">${f(v)}<span class="ldp-tag-rm" data-tag="${f(v)}">×</span></span>`}).join("")||'<span class="ldp-tag-empty">Nenhuma tag — clique em + para adicionar</span>'}
        </div>
        <div class="ldp-tag-add-row">
          <button id="ldp-tag-add-btn" class="ldp-tag-add-btn" type="button">+ Adicionar Tag</button>
          <div id="ldp-tag-dropdown" class="ldp-tag-dropdown hidden">
            <div class="ldp-tag-search-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input id="ldp-tag-search" class="ldp-tag-search" placeholder="Buscar tag…" autocomplete="off" type="text">
            </div>
            <div id="ldp-tag-opt-list" class="ldp-tag-opt-list"></div>
            <div class="ldp-tag-dd-footer">
              <button id="ldp-tag-show-create" class="ldp-tag-show-create" type="button">+ Criar nova tag</button>
            </div>
            <div id="ldp-tag-create-row" class="ldp-tag-create-row hidden">
              <input id="ldp-tag-new-name" class="ldp-tag-new-name" placeholder="Nome da nova tag…" autocomplete="off" type="text">
              <input type="color" id="ldp-tag-new-color" value="#6366F1" class="ldp-tag-new-color" title="Cor da tag">
              <button id="ldp-tag-create-btn" class="ldp-tag-create-btn" type="button">Criar e adicionar</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ANOTAÇÕES</label>
        <textarea id="ldp-notes" class="form-input" rows="4" placeholder="Observações, interesses, próximos passos…" style="resize:vertical;">${f((e==null?void 0:e.notes)||"")}</textarea>
      </div>
      ${c?(()=>{const v=encodeURIComponent(`Olá ${e!=null&&e.name?e.name.split(" ")[0]:""}! Aqui é da ${K("company.name","nossa imobiliária")}. Vi seu interesse em imóveis e gostaria de ajudá-lo. Posso falar agora?`);return`<a href="https://wa.me/${c}?text=${v}" target="_blank" rel="noopener"
          style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25d366;color:#fff;text-decoration:none;border-radius:8px;padding:10px;font-size:13px;font-weight:700;" onclick="fbq('track', 'Contact')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          Iniciar conversa no WhatsApp
        </a>`})():""}
      <div id="ldp-msg" style="font-size:13px;min-height:18px;"></div>
    </div>
    <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;flex-shrink:0;">
      ${t?"":'<button id="ldp-delete" style="background:#fee2e2;color:#dc2626;border:none;border-radius:8px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;">🗑️ Excluir</button>'}
      <button id="ldp-save" style="flex:1;background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 16px;font-size:14px;font-weight:700;cursor:pointer;">💾 Salvar</button>
    </div>
  `,document.body.appendChild(s),requestAnimationFrame(()=>{s.style.transform="translateX(0)"}),_n(s,a||[],pe);const m=s.querySelector("#ldp-pipe"),u=s.querySelector("#ldp-stage");m&&u&&m.addEventListener("change",()=>{const v=m.value,I=Ke.filter($=>$.pipeline_id===v);u.innerHTML=I.map($=>`<option value="${$.name}">${$.name}</option>`).join("")||'<option value="">— sem etapas —</option>'});const E=()=>{s.style.transform="translateX(100%)",setTimeout(()=>s.remove(),250)};document.getElementById("ldp-close").addEventListener("click",E),document.getElementById("ldp-save").addEventListener("click",async()=>{var B,C;const v=document.getElementById("ldp-save"),I=document.getElementById("ldp-msg"),$=document.getElementById("ldp-name").value.trim();if(!$){I.style.color="#ef4444",I.textContent="Nome é obrigatório.";return}v.disabled=!0,v.textContent="Salvando…";const S=[...s.querySelectorAll("#ldp-tag-badge-area .ldp-tag-badge[data-tag]")].map(T=>T.dataset.tag),_=document.getElementById("ldp-pipe"),p=_?_.value:i||j,g=t?typeof Lt=="function"?Lt():{}:{},h={name:$,phone:document.getElementById("ldp-phone").value.trim()||null,email:document.getElementById("ldp-email").value.trim()||null,source:document.getElementById("ldp-source").value.trim()||null,pipeline_id:p||null,stage:((B=document.getElementById("ldp-stage"))==null?void 0:B.value)||null,status:((C=document.getElementById("ldp-status"))==null?void 0:C.value)||null,notes:document.getElementById("ldp-notes").value.trim()||null,tags:S,tenant_id:N(),...t?{utm_source:g.utm_source||null,utm_medium:g.utm_medium||null,utm_campaign:g.utm_campaign||null,utm_content:g.utm_content||null,utm_term:g.utm_term||null,fbclid:g.fbclid||null,gclid:g.gclid||null,fbp:g.fbp||null,fbc:g.fbc||null,landing_url:g.landing_url||null,user_agent:navigator.userAgent||null}:{}};let L;if(t?{error:L}=await b.from("leads").insert(h):{error:L}=await b.from("leads").update(h).eq("id",e.id),v.disabled=!1,v.textContent="💾 Salvar",L){I.style.color="#ef4444",I.textContent="Erro: "+L.message;return}I.style.color="#22c55e",I.textContent="✅ Salvo!",E(),Re().catch(T=>console.warn("[Kanban] reload falhou:",T)),t&&typeof sendLeadToCAPI=="function"&&sendLeadToCAPI({name:h.name,email:h.email,phone:h.phone,tracking:g}).then(async T=>{if(T!=null&&T.ok){console.log("[CAPI] Lead enviado ao Meta:",T.event_id);try{await b.from("leads").update({capi_event_id:T.event_id,capi_sent_at:new Date().toISOString()}).eq("name",h.name).eq("phone",h.phone||"").order("created_at",{ascending:!1}).limit(1)}catch(q){console.warn("[CAPI] falha ao salvar event_id:",q)}}else console.warn("[CAPI] não confirmado pelo Meta:",T)}).catch(T=>console.warn("[CAPI] erro:",T))}),(k=document.getElementById("ldp-delete"))==null||k.addEventListener("click",async()=>{confirm(`Excluir o lead "${e==null?void 0:e.name}"?`)&&(await b.from("leads").delete().eq("id",e.id),E(),Re())})}let U=[],Mt=!1,he="pending";async function Qa(){var e;window._tarefasRefreshTimer&&clearInterval(window._tarefasRefreshTimer),window._tarefasRefreshTimer=setInterval(()=>{const t=document.querySelector('.section[data-section="tarefas"]');!t||t.offsetParent===null||zt().catch(()=>{})},3e4),!Mt&&(Mt=!0,await zt(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>oa()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),he=t.dataset.filter,$e()})}))}async function zt(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=b.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(y==null?void 0:y.role)==="corretor"?t=t.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
      <div style="text-align:center;padding:40px;color:#94a3b8;">
        <div style="font-size:32px;margin-bottom:8px;">📋</div>
        <p style="margin-bottom:12px;">Para usar Tarefas, execute o SQL abaixo no Supabase:</p>
        <code style="font-size:11px;background:#f1f5f9;padding:8px 12px;border-radius:8px;display:block;text-align:left;white-space:pre;overflow-x:auto;">CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid,
  assigned_to uuid,
  title text NOT NULL,
  description text,
  due_date date,
  priority text DEFAULT 'medium',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tasks_access" ON public.tasks
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);</code>
      </div>`);return}U=n||[],$e()}function na(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function $e(){const e=document.getElementById("tarefas-list");if(!e)return;let t=U;if(he==="pending"&&(t=U.filter(a=>a.status!=="done")),he==="done"&&(t=U.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${he==="done"?"✅":"📋"}</div>
      <p>${he==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=na(a.due_date),i=o?o.toLocaleDateString("pt-BR"):"",r=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${f(a.title)}</div>
          <div class="tarefa-meta">
            ${i?`<span style="${r?"color:#ef4444;":""}">📅 ${i}${r?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${f(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const i=a.dataset.id,r=a.checked?"done":"pending";await b.from("tasks").update({status:r}).eq("id",i);const l=U.find(d=>String(d.id)===i);l&&(l.status=r),$e()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await b.from("tasks").delete().eq("id",a.dataset.id),U=U.filter(i=>String(i.id)!==String(a.dataset.id)),$e())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const i=a.dataset.id,r=U.find(l=>String(l.id)===i);r&&oa(r)})})}function oa(e=null){var d,c,s,m;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=na(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const i=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",r=document.createElement("div");r.id="tarefa-modal-root",r.className="modal-backdrop",r.innerHTML=`
    <div class="modal" style="max-width:520px;">
      <div class="modal-header">
        <h3 style="display:flex;align-items:center;gap:10px;">
          ${a?'<span style="color:#22c55e;font-size:18px;">✅</span>':'<span style="font-size:18px;">📋</span>'}
          ${n?"Editar Tarefa":"Nova Tarefa"}
        </h3>
        <button class="modal-close" id="tm-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;">
        ${n&&a?'<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 14px;margin-bottom:16px;color:#15803d;font-size:13px;font-weight:600;">✅ Tarefa concluída</div>':""}
        <form id="tarefa-form" style="display:flex;flex-direction:column;gap:16px;">
          <div class="form-group">
            <label class="form-label">Título *</label>
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${f((e==null?void 0:e.title)||"")}">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prazo</label>
              <input name="due_date" type="date" class="form-control" value="${i}">
            </div>
            <div class="form-group">
              <label class="form-label">Prioridade</label>
              <select name="priority" class="form-control">
                <option value="low" ${(e==null?void 0:e.priority)==="low"?"selected":""}>Baixa</option>
                <option value="medium" ${!(e!=null&&e.priority)||(e==null?void 0:e.priority)==="medium"?"selected":""}>Média</option>
                <option value="high" ${(e==null?void 0:e.priority)==="high"?"selected":""}>Alta</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Descrição</label>
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${f((e==null?void 0:e.description)||"")}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer" style="display:flex;gap:8px;justify-content:space-between;align-items:center;">
        <div style="display:flex;gap:8px;">
          ${n?`<button id="tm-toggle-done" style="padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:2px solid ${a?"#94a3b8":"#22c55e"};background:${a?"#f8fafc":"#f0fdf4"};color:${a?"#64748b":"#15803d"};">
            ${a?"↩ Reabrir tarefa":"✅ Marcar como Concluída"}
          </button>`:""}
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="tm-cancel">Cancelar</button>
          <button class="btn-primary" id="tm-save" style="margin:0;">${n?"Salvar":"Criar Tarefa"}</button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(r);const l=()=>r.remove();(d=document.getElementById("tm-close"))==null||d.addEventListener("click",l),(c=document.getElementById("tm-cancel"))==null||c.addEventListener("click",l),r.addEventListener("click",u=>{u.target===r&&l()}),(s=document.getElementById("tm-toggle-done"))==null||s.addEventListener("click",async()=>{const u=a?"pending":"done";await b.from("tasks").update({status:u}).eq("id",e.id);const E=U.find(w=>String(w.id)===String(e.id));E&&(E.status=u),l(),u==="done"&&(he="done",document.querySelectorAll(".tarefa-filter-btn").forEach(w=>{w.classList.toggle("active",w.dataset.filter==="done")})),$e()}),(m=document.getElementById("tm-save"))==null||m.addEventListener("click",async()=>{var v,I;const u=document.getElementById("tarefa-form");if(!u.checkValidity()){u.reportValidity();return}const E=new FormData(u),w=document.getElementById("tm-save");w.disabled=!0,w.textContent="Salvando…";const x={title:(v=E.get("title"))==null?void 0:v.trim(),description:((I=E.get("description"))==null?void 0:I.trim())||null,due_date:E.get("due_date")||null,priority:E.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null};let k;if(n){if({error:k}=await b.from("tasks").update(x).eq("id",e.id),!k){const $=U.findIndex(S=>String(S.id)===String(e.id));$>=0&&(U[$]={...U[$],...x})}}else{const{data:$,error:S}=await b.from("tasks").insert(x).select();k=S,!k&&($!=null&&$[0])&&U.unshift($[0])}if(w.disabled=!1,w.textContent=n?"Salvar":"Criar Tarefa",k){alert("Erro: "+k.message);return}l(),$e()})}async function Za(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;y==null||y.role,y==null||y.tenant_id;const[{data:a},{data:o}]=await Promise.all([b.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),b.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),i=[];a!=null&&a.length&&(i.push('<div class="search-group-label">Imóveis</div>'),i.push(...a.map(r=>`
      <div class="search-result-item" data-type="property" data-id="${r.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${f(r.title||"—")}</div>
          <div class="search-result-sub">${f(r.reference||"")} · ${f(r.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(i.push('<div class="search-group-label">Leads / Contatos</div>'),i.push(...o.map(r=>`
      <div class="search-result-item" data-type="lead" data-id="${r.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${f(r.name||"—")}</div>
          <div class="search-result-sub">${f(r.email||r.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=i.length?i.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(r=>{r.addEventListener("click",()=>{var l;(l=document.getElementById("search-overlay"))==null||l.classList.add("hidden"),r.dataset.type==="lead"?ae("contatos"):ae("properties")})})}let te=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function en(){var r;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=b.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(l=>!te.includes(String(l.id))),i=document.getElementById("notif-badge");if(i&&(i.textContent=o.length,o.length>0?i.classList.remove("hidden"):i.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(l=>{const d=an(l.created_at);return`
      <div class="notif-item${!te.includes(String(l.id))?" unread":""}" data-id="${l.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${f(l.name||"—")}</div>
          <div class="notif-item-sub">${f(l.phone||l.source||"")} · ${d}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(r=document.getElementById("notif-see-all"))==null||r.addEventListener("click",l=>{l.preventDefault(),Z(),ae("contatos")}),e.querySelectorAll(".notif-item").forEach(l=>{l.addEventListener("click",()=>{te.push(l.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(te)),l.classList.remove("unread"),Z(),ae("contatos")})})}function tn(){var e;document.querySelectorAll(".notif-item").forEach(t=>te.push(t.dataset.id)),te=[...new Set(te)],localStorage.setItem("crm_notifs_read",JSON.stringify(te)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function an(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function nn(){let e=b.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);y!=null&&y.tenant_id&&(e=e.eq("tenant_id",y.tenant_id));const{data:t}=await e,a=(t||[]).filter(i=>!te.includes(String(i.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let Y=[],H=1;const Ce=10;let Nt=!1;async function on(){var t,n,a,o,i,r,l,d,c;window._contatosRefreshTimer&&clearInterval(window._contatosRefreshTimer),window._contatosRefreshTimer=setInterval(()=>{const s=document.querySelector('.section[data-section="contatos"]');!s||s.offsetParent===null||ct().catch(()=>{})},3e4),document.getElementById("section-contatos")&&(Nt||(Nt=!0,await ct(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{H=1,ue()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",s=>{s.key==="Enter"&&(H=1,ue())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>ia()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",rn),(i=document.getElementById("import-modal-close"))==null||i.addEventListener("click",mt),(r=document.getElementById("import-modal-cancel"))==null||r.addEventListener("click",mt),(l=document.getElementById("download-template"))==null||l.addEventListener("click",s=>{s.preventDefault();const m=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,u=new Blob([m],{type:"text/csv"}),E=document.createElement("a");E.href=URL.createObjectURL(u),E.download="modelo_contatos.csv",E.click()}),(d=document.getElementById("import-csv-file"))==null||d.addEventListener("change",sn),(c=document.getElementById("import-modal-confirm"))==null||c.addEventListener("click",dn)))}async function ct(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=b.from("leads").select("*").order("created_at",{ascending:!1});(y==null?void 0:y.role)==="corretor"?t=t.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id));const{data:a}=await t;Y=a||[],ue()}function ue(){var l,d,c;const e=(((l=document.getElementById("contato-search"))==null?void 0:l.value)||"").toLowerCase(),t=e?Y.filter(s=>(s.name||"").toLowerCase().includes(e)||(s.email||"").toLowerCase().includes(e)||(s.phone||"").toLowerCase().includes(e)):Y,n=t.length,a=Math.max(1,Math.ceil(n/Ce));H>a&&(H=a);const o=t.slice((H-1)*Ce,H*Ce),i=document.getElementById("contatos-tbody");if(!i)return;o.length?i.innerHTML=o.map(s=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${s.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${s.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${f(s.name||"—")}</a>
        </td>
        <td>${f(s.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${s.email?f(s.email):"—"}</td>
        <td style="font-size:13px;">${s.phone?f(s.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${f(s.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td style="display:flex;gap:6px;align-items:center;">
          ${(()=>{const m=(s.phone||"").replace(/\D/g,"");if(!m)return"";const u=encodeURIComponent(`Olá ${(s.name||"").split(" ")[0]}! Aqui é da ${K("company.name","nossa imobiliária")}. Podemos conversar sobre seu interesse em imóveis?`);return`<a href="https://wa.me/${m}?text=${u}" target="_blank" rel="noopener" title="WhatsApp"
              style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;" onclick="fbq('track', 'Contact')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
            </a>`})()}
          <button class="icon-btn contato-edit-btn" data-id="${s.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):i.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const r=document.getElementById("contatos-pagination");if(r){const s=n===0?0:(H-1)*Ce+1,m=Math.min(H*Ce,n);r.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${s}–${m}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${H<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${H} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${H>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(d=r.querySelector("#pag-prev"))==null||d.addEventListener("click",()=>{H--,ue()}),(c=r.querySelector("#pag-next"))==null||c.addEventListener("click",()=>{H++,ue()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(s=>{s.addEventListener("click",m=>{m.preventDefault();const u=s.dataset.id,E=Y.find(w=>String(w.id)===String(u));E&&ia(E)})})}async function ia(e=null){var v,I,$,S,_,p;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=N(),[{data:o},{data:i},{data:r}]=await Promise.all([b.from("crm_pipelines").select("*").eq("tenant_id",a).order("sort_order"),b.from("crm_tags").select("*").eq("tenant_id",a).order("name"),b.from("crm_lead_statuses").select("*").eq("tenant_id",a).order("sort_order")]),l=o||[],d=i||[],c=r||[],s=l.map(g=>g.id),{data:m}=s.length?await b.from("crm_stages").select("*").in("pipeline_id",s).order("sort_order"):{data:[]},u=m||[],E=(e==null?void 0:e.pipeline_id)||((v=l[0])==null?void 0:v.id)||"";function w(g){const h=u.filter(L=>L.pipeline_id===g);return h.length?'<option value="">— Selecionar etapa —</option>'+h.map(L=>`<option value="${f(L.name)}" ${(e==null?void 0:e.stage)===L.name?"selected":""}>${f(L.name)}</option>`).join(""):'<option value="">— Nenhuma etapa —</option>'}const x=document.createElement("div");x.id="contato-modal-root",x.className="modal-backdrop",x.innerHTML=`
    <div class="modal" style="max-width:600px;max-height:90vh;display:flex;flex-direction:column;">
      <div class="modal-header" style="flex-shrink:0;">
        <h3>${n?"Editar Contato":"Novo Contato"}</h3>
        <button class="modal-close" id="cm-close">✕</button>
      </div>
      <div class="modal-body" style="overflow-y:auto;flex:1;">
        <form id="contato-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nome *</label>
              <input name="name" required class="form-control" placeholder="Nome completo" value="${f((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${f((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${f((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${f((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${f((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${f((e==null?void 0:e.city_interest)||"")}">
            </div>
          </div>

          ${l.length?`
          <div style="border-top:1px solid #f1f5f9;margin:8px 0 12px;padding-top:14px;">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;margin-bottom:10px;">FUNIL DE NEGOCIAÇÃO</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Funil</label>
                <select id="cm-pipe" name="pipeline_id" class="form-control">
                  <option value="">— Sem funil —</option>
                  ${l.map(g=>`<option value="${g.id}" ${String(e==null?void 0:e.pipeline_id)===String(g.id)?"selected":""}>${f(g.name)}</option>`).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Etapa</label>
                <select id="cm-stage" name="stage" class="form-control">
                  ${w(E)}
                </select>
              </div>
            </div>
          </div>`:""}

          ${c.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="">— Sem status —</option>
                ${c.map(g=>`<option value="${f(g.name)}" ${(e==null?void 0:e.status)===g.name?"selected":""}>${f(g.name)}</option>`).join("")}
              </select>
            </div>
          </div>`:""}

          ${d.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Tags</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                ${d.map(g=>`
                  <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:5px 12px;border-radius:20px;background:${g.color}18;border:1.5px solid ${g.color}55;font-size:12px;font-weight:600;color:${g.color};transition:opacity .15s;">
                    <input type="checkbox" name="tag" value="${f(g.name)}" style="margin:0;accent-color:${g.color};" ${((e==null?void 0:e.tags)||[]).includes(g.name)?"checked":""}>
                    ${f(g.name)}
                  </label>`).join("")}
              </div>
            </div>
          </div>`:""}

          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${f((e==null?void 0:e.notes)||"")}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer" style="flex-shrink:0;">
        ${n?'<button class="btn-danger" id="cm-delete" style="margin-right:auto;">🗑️ Excluir</button>':""}
        <button class="btn-cancel" id="cm-cancel">Cancelar</button>
        <button class="btn-primary" id="cm-save" style="margin:0;">${n?"Salvar":"Criar Contato"}</button>
      </div>
    </div>
  `,document.body.appendChild(x);const k=()=>x.remove();(I=document.getElementById("cm-close"))==null||I.addEventListener("click",k),($=document.getElementById("cm-cancel"))==null||$.addEventListener("click",k),x.addEventListener("click",g=>{g.target===x&&k()}),(S=document.getElementById("cm-pipe"))==null||S.addEventListener("change",g=>{const h=document.getElementById("cm-stage");h&&(h.innerHTML=w(g.target.value))}),(_=document.getElementById("cm-delete"))==null||_.addEventListener("click",async()=>{if(!confirm(`Excluir o contato "${e==null?void 0:e.name}"?`))return;await b.from("leads").delete().eq("id",e.id);const g=Y.findIndex(h=>String(h.id)===String(e.id));g>=0&&Y.splice(g,1),k(),ue()}),(p=document.getElementById("cm-save"))==null||p.addEventListener("click",async()=>{var M,O,P,ne,re,Se,_e;const g=document.getElementById("contato-form");if(!g.checkValidity()){g.reportValidity();return}const h=new FormData(g),L=document.getElementById("cm-save");L.disabled=!0,L.textContent="Salvando…";const B=h.getAll("tag"),C=h.get("pipeline_id")||null,T={name:(M=h.get("name"))==null?void 0:M.trim(),company:((O=h.get("company"))==null?void 0:O.trim())||null,email:((P=h.get("email"))==null?void 0:P.trim())||null,phone:((ne=h.get("phone"))==null?void 0:ne.trim())||null,job_title:((re=h.get("job_title"))==null?void 0:re.trim())||null,city_interest:((Se=h.get("city_interest"))==null?void 0:Se.trim())||null,notes:((_e=h.get("notes"))==null?void 0:_e.trim())||null,pipeline_id:C,stage:h.get("stage")||null,status:h.get("status")||null,tags:B,assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null,source:(e==null?void 0:e.source)||"manual"};let q;if(n){if({error:q}=await b.from("leads").update(T).eq("id",e.id),!q){const F=Y.findIndex(ye=>String(ye.id)===String(e.id));F>=0&&(Y[F]={...Y[F],...T})}}else{const{data:F,error:ye}=await b.from("leads").insert(T).select();q=ye,!q&&(F!=null&&F[0])&&Y.unshift(F[0])}if(L.disabled=!1,L.textContent=n?"Salvar":"Criar Contato",q){alert("Erro: "+q.message);return}k(),ue()})}let Ee=[];function sn(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{Ee=a.target.result.split(`
`).filter(l=>l.trim()).slice(1).map(l=>{const[d,c,s,m,u]=l.split(",").map(E=>E.trim().replace(/^"|"$/g,""));return{name:d,email:c,phone:s,company:m,job_title:u}}).filter(l=>l.name);const i=document.getElementById("import-preview");i&&(i.textContent=`${Ee.length} contato(s) encontrados para importar.`);const r=document.getElementById("import-modal-confirm");r&&(r.disabled=Ee.length===0)},n.readAsText(t)}async function dn(){if(!Ee.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=Ee.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null})),{error:n}=await b.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}mt(),await ct(),alert(`${t.length} contato(s) importados com sucesso!`)}function rn(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),Ee=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function mt(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const ln="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function ge(e){return(await fetch(ln,{method:"POST",headers:{Authorization:`Bearer ${Ea}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function Rt(e){var d,c,s,m;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),i=document.getElementById("settings-avatar-input"),r=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:u}}=await b.auth.getUser();n.value=(u==null?void 0:u.email)||""}const l=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=l),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),i==null||i.addEventListener("change",u=>{const E=u.target.files[0];if(!E)return;const w=URL.createObjectURL(E);a&&(a.src=w,a.style.display=""),o&&(o.style.display="none")}),(d=document.getElementById("btn-change-password"))==null||d.addEventListener("click",async()=>{var v,I;const u=((v=document.getElementById("change-password-new"))==null?void 0:v.value)||"",E=((I=document.getElementById("change-password-confirm"))==null?void 0:I.value)||"",w=document.getElementById("change-password-msg"),x=document.getElementById("btn-change-password");if(w&&(w.style.display="none"),u.length<12){w&&(w.textContent="Mínimo 6 caracteres.",w.style.display="");return}if(u!==E){w&&(w.textContent="As senhas não coincidem.",w.style.display="");return}x&&(x.disabled=!0,x.textContent="Salvando…");const{error:k}=await b.auth.updateUser({password:u});x&&(x.disabled=!1,x.textContent="Salvar Nova Senha"),k?w&&(w.textContent="Erro: "+k.message,w.style.display=""):(w&&(w.style.color="#16a34a",w.textContent="Senha alterada com sucesso!",w.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),r==null||r.addEventListener("click",async()=>{var I;const u=t.value.trim();let E=(y==null?void 0:y.avatar_url)||"";const w=i==null?void 0:i.files[0],x=r.textContent;if(r.disabled=!0,r.textContent="Salvando…",w)try{const $=await je(w,400,.85),S=`avatars/${y.id}-${Date.now()}.jpg`,{error:_}=await b.storage.from("imoveis").upload(S,$,{contentType:"image/jpeg",upsert:!0});if(!_){const{data:{publicUrl:p}}=b.storage.from("imoveis").getPublicUrl(S);E=p}}catch($){console.error("Avatar upload:",$)}const{error:k}=await b.from("profiles").update({name:u,avatar_url:E}).eq("id",y.id);if(r.disabled=!1,r.textContent=x,k){alert("Erro ao salvar perfil.");return}y={...y,name:u,avatar_url:E},We(y);const v=document.getElementById("settings-avatar-initial");v&&(v.textContent=((I=u[0])==null?void 0:I.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const u=document.getElementById("settings-corretores-section");u&&(u.style.display=""),await Ye(),(c=document.getElementById("btn-invite-corretor"))==null||c.addEventListener("click",async()=>{var I,$;const w=(I=document.getElementById("invite-email"))==null?void 0:I.value.trim(),x=($=document.getElementById("invite-password"))==null?void 0:$.value.trim(),k=document.getElementById("btn-invite-corretor"),v=document.getElementById("invite-note");if(!w){alert("Informe o e-mail do corretor.");return}if(!x||x.length<12){alert("A senha precisa ter no mínimo 6 caracteres.");return}k&&(k.disabled=!0,k.textContent="Criando…"),v&&(v.style.display="none");try{const S=await ge({email:w,password:x,tenant_id:(y==null?void 0:y.tenant_id)||null});if(S.success){const _=document.getElementById("invite-email"),p=document.getElementById("invite-password");_&&(_.value=""),p&&(p.value=""),await Ye(),v&&(S.email_sent===!1?(v.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${f(w)}<br>
                <strong>Senha:</strong> ${f(x)}`,v.style.color="#0f172a"):(v.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",v.style.color="#16a34a"),v.style.display="")}else alert("Erro: "+(S.error||"Falha desconhecida"))}catch(S){alert("Erro ao criar acesso: "+S.message)}finally{k&&(k.disabled=!1,k.textContent="+ Criar Acesso")}});const E=document.getElementById("settings-locations-section");E&&(E.style.display=""),await Ae(),(s=document.getElementById("loc-add-city-btn"))==null||s.addEventListener("click",async()=>{const w=document.getElementById("loc-new-city"),x=w==null?void 0:w.value.trim();if(!x)return;const{error:k}=await b.from("locations").insert({type:"cidade",name:x});if(k){alert("Erro ao adicionar cidade.");return}w&&(w.value=""),await Ae(),wt()}),(m=document.getElementById("loc-add-neighborhood-btn"))==null||m.addEventListener("click",async()=>{var I;const w=parseInt((I=document.getElementById("loc-new-neighborhood-city"))==null?void 0:I.value,10),x=document.getElementById("loc-new-neighborhood"),k=x==null?void 0:x.value.trim();if(!w||!k){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:v}=await b.from("locations").insert({type:"bairro",name:k,parent_id:w});if(v){alert("Erro ao adicionar bairro.");return}x&&(x.value=""),await Ae()})}}async function Ye(){const e=document.getElementById("corretores-list");if(!e)return;let t=b.from("profiles").select("*").order("created_at");y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const i=(o.name||"?")[0].toUpperCase(),r=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${f(i)}</div>`,l=o.id===(y==null?void 0:y.id),d=o.active!==!1,c=d?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',s=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,m=l?"":d?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,u=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${r}
        <div>
          <div class="corretor-name">${f(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${c}
        ${s}
        ${m}
        ${u}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{var r;(r=o.options[o.selectedIndex])!=null&&r.text,o.disabled=!0;const{error:i}=await b.from("profiles").update({role:o.value}).eq("id",o.dataset.uid);o.disabled=!1,i&&(console.warn("[Profiles] erro ao trocar role:",i),alert("Erro ao salvar: "+i.message))})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.uid,r=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const l=await ge({action:"toggle",userId:i,active:!r});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await Ye()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var l,d;const i=o.dataset.uid,r=((d=(l=o.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:d.textContent)||"este corretor";if(confirm(`Excluir "${r}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const c=await ge({action:"delete",userId:i});c.success||alert("Erro ao excluir: "+(c.error||"Falha desconhecida"))}catch(c){alert("Erro: "+c.message)}await Ye()}})})}async function sa(){const{data:e,error:t}=await b.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(Me=e||[],Me)}function fe(){return Me.filter(e=>e.type==="cidade")}function xt(e){return Me.filter(t=>t.type==="bairro"&&t.parent_id===e)}function wt(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=fe();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${f(a.name)}</option>`).join(""),t&&(e.value=t)}async function Ae(){await sa();const e=fe(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(i=>`
        <div class="loc-item">
          <span class="loc-item-name">${f(i.name)}</span>
          <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=Me.filter(i=>i.type==="bairro");n.innerHTML=o.length?o.map(i=>{const r=e.find(l=>l.id===i.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${f(i.name)}</div>
              ${r?`<div class="loc-item-sub">${f(r.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(i=>`<option value="${i.id}">${f(i.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{const r=i.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${r}" e todos os bairros vinculados?`))return;const{error:l}=await b.from("locations").delete().eq("id",i.dataset.id);if(l){alert("Erro ao excluir.");return}await Ae(),wt()})}),n.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:r}=await b.from("locations").delete().eq("id",i.dataset.id);if(r){alert("Erro ao excluir.");return}await Ae()})})}function Dt(){var n,a,o,i,r,l,d,c,s,m,u,E,w,x,k,v,I,$,S,_;document.querySelectorAll(".filter-btn").forEach(p=>{p.addEventListener("click",()=>{const g=p.closest(".filter-btns"),h=p.classList.contains("active");g.querySelectorAll(".filter-btn").forEach(L=>L.classList.remove("active")),h||p.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var B;const p=(B=document.getElementById("f-city"))==null?void 0:B.value,g=fe().find(C=>C.name===p),h=g?xt(g.id):[],L=document.getElementById("f-neighborhood");L&&(L.innerHTML='<option value="">Todos</option>'+h.map(C=>`<option value="${C.name}">${f(C.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{ze(bt(A))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{const p=document.querySelector(".admin-filter-panel");if(p){p.querySelectorAll('input[type="text"], input[type="number"]').forEach(h=>{h.value=""}),p.querySelectorAll("select").forEach(h=>{h.selectedIndex=0});const g=document.getElementById("f-neighborhood");g&&(g.innerHTML='<option value="">Todos</option>'),p.querySelectorAll(".filter-btn.active").forEach(h=>h.classList.remove("active"))}ze(A)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(p=>{p.addEventListener("click",()=>{ae(p.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(p=>{p.addEventListener("click",()=>{ae(p.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(p=>{p.addEventListener("click",g=>{g.stopPropagation();const h=p.closest(".topnav-dropdown");h==null||h.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(L=>{L!==h&&L.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(p=>p.classList.remove("open"))}),(i=document.getElementById("modal-close"))==null||i.addEventListener("click",Fe),(r=document.getElementById("modal-cancel"))==null||r.addEventListener("click",Fe),(l=document.getElementById("property-modal"))==null||l.addEventListener("click",p=>{p.target.id==="property-modal"&&Fe()}),(d=document.getElementById("btn-new-property"))==null||d.addEventListener("click",()=>{V=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",ee="",Ne([]),it("Novo Imóvel")}),(c=document.getElementById("logout-btn"))==null||c.addEventListener("click",async()=>{await b.auth.signOut(),location.reload()}),(s=document.getElementById("view-prev"))==null||s.addEventListener("click",()=>{Q=(Q-1+ie.length)%ie.length,Je()}),(m=document.getElementById("view-next"))==null||m.addEventListener("click",()=>{Q=(Q+1)%ie.length,Je()}),(u=document.getElementById("view-modal-close"))==null||u.addEventListener("click",Oe),(E=document.getElementById("view-modal-close2"))==null||E.addEventListener("click",Oe),(w=document.getElementById("view-modal"))==null||w.addEventListener("click",p=>{p.target.id==="view-modal"&&Oe()}),(x=document.getElementById("view-modal-share"))==null||x.addEventListener("click",()=>{const p=document.getElementById("share-panel");if(!p)return;const g=p.style.display!=="none";p.style.display=g?"none":"block"}),(k=document.getElementById("share-whatsapp"))==null||k.addEventListener("click",()=>{var O,P,ne;const p=(O=document.getElementById("share-link-input"))==null?void 0:O.value;if(!p)return;const g=Number((P=document.getElementById("share-panel"))==null?void 0:P.dataset.pid),h=A.find(re=>re.id===g),L=(h==null?void 0:h.title)||((ne=document.getElementById("view-modal-title"))==null?void 0:ne.textContent)||"Imóvel",B=h!=null&&h.price?` — ${De(h.price,"pt")}`:"",C=h!=null&&h.reference?` | Ref: ${h.reference}`:"",T=[h==null?void 0:h.neighborhood,h==null?void 0:h.city].filter(Boolean).join(", "),q=T?`
📍 ${T}`:"",M=encodeURIComponent(`Olha esse imóvel que encontrei: *${L}*${B}${C}${q}

${p}`);window.open("https://wa.me/?text="+M,"_blank")}),(v=document.getElementById("share-instagram"))==null||v.addEventListener("click",()=>{var g,h;const p=(g=document.getElementById("share-link-input"))==null?void 0:g.value;p&&((h=navigator.clipboard)==null||h.writeText(p),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(I=document.getElementById("share-email"))==null||I.addEventListener("click",()=>{var B,C;const p=(B=document.getElementById("share-link-input"))==null?void 0:B.value;if(!p)return;const g=((C=document.getElementById("view-modal-title"))==null?void 0:C.textContent)||"Imóvel",h=encodeURIComponent("Imóvel: "+g),L=encodeURIComponent(`Olá! Segue o link do imóvel:

`+p);window.open("mailto:?subject="+h+"&body="+L,"_blank")}),($=document.getElementById("share-copy"))==null||$.addEventListener("click",()=>{var g;const p=document.getElementById("share-link-input");p&&((g=navigator.clipboard)==null||g.writeText(p.value).then(()=>{const h=document.getElementById("share-copy"),L=h.textContent;h.textContent="✅ Copiado!",setTimeout(()=>{h.textContent=L},2e3)}))}),(S=document.getElementById("view-modal-edit"))==null||S.addEventListener("click",()=>{var T;if((y==null?void 0:y.role)!=="admin"&&(y==null?void 0:y.role)!=="super_admin")return;const p=Number(document.getElementById("view-modal-edit").dataset.pid),g=A.find(q=>q.id===p);if(!g)return;Oe(),V=g.id;const h=document.getElementById("property-form"),L=document.getElementById("form-submit-btn");L.textContent="Salvar Alterações",h.querySelector('[name="title"]').value=g.title||"",h.querySelector('[name="rua"]').value=g.rua||"",h.querySelector('[name="numero"]').value=g.numero||"",h.querySelector('[name="city"]').value=g.city||"",h.querySelector('[name="price"]').value=g.price||"",h.querySelector('[name="bedrooms"]').value=g.bedrooms||"",h.querySelector('[name="suites"]').value=g.suites||"",h.querySelector('[name="parking"]').value=g.parking||"",h.querySelector('[name="description"]').value=g.description||"",h.querySelector('[name="construction_status"]').value=g.construction_status||"",h.querySelector('[name="owner_name"]').value=g.owner_name||"",h.querySelector('[name="owner_phone"]').value=g.owner_phone||"",h.querySelector('[name="owner_email"]').value=g.owner_email||"",h.querySelector('[name="owner_notes"]').value=g.owner_notes||"",h.querySelector('[name="condominium"]').value=g.condominium||"";const B=document.getElementById("adminPublished");B&&(B.value=g.published===!0?"true":"false");const C=document.getElementById("adminCitySelect");C&&(C.value=g.city||"",C.dispatchEvent(new Event("change")),setTimeout(()=>{const q=document.getElementById("adminNeighborhood");q&&(q.value=g.neighborhood||"")},50)),ee=g.cover_image||((T=g.images)==null?void 0:T[0])||"",Ne(g.images||[]),it("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(p=>{p.addEventListener("click",()=>{var g;document.querySelectorAll(".tab-btn").forEach(h=>h.classList.remove("active")),p.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(h=>h.classList.add("hidden")),(g=document.getElementById(`tab-${p.dataset.tab}`))==null||g.classList.remove("hidden")})}),(_=document.getElementById("admin-properties"))==null||_.addEventListener("click",p=>{if(p.target.closest(".action-btns"))return;const g=p.target.closest("tr");if(!g)return;const h=Number(g.dataset.id);if(!h)return;const L=A.find(B=>B.id===h);L&&Ga(L)})}async function da(){const e=document.getElementById("section-depoimentos");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("site_content").select("value_pt").eq("key","testimonials").eq("tenant_id",N()).maybeSingle();let n=[];try{n=JSON.parse((t==null?void 0:t.value_pt)||"[]")}catch{n=[]}function a(r){const l=["#0d2144","#1a3a5c","#0a1628","#164a3c","#2d1b3d","#3d1a1a","#1a2f4a"];let d=0;for(const c of r||"?")d=d*31+c.charCodeAt(0)&4294967295;return l[Math.abs(d)%l.length]}function o(){e.querySelector("#dep-save-msg"),e.innerHTML=`
      <div class="section-topbar">
        <div>
          <div class="section-title">Depoimentos</div>
          <div class="section-sub">Gerencie os depoimentos exibidos no site público</div>
        </div>
        <button class="btn-primary" id="dep-add-btn">+ Novo Depoimento</button>
      </div>

      <div id="dep-list" style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;max-width:800px">
        ${n.length===0?'<p style="color:#94a3b8;font-size:14px">Nenhum depoimento cadastrado ainda.</p>':n.map((d,c)=>`
            <div class="dep-admin-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px">
              <div style="width:40px;height:40px;border-radius:50%;background:${a(d.name)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0">${(d.name||"?")[0].toUpperCase()}</div>
              <div style="flex:1;min-width:0">
                <div style="color:#f59e0b;font-size:14px;margin-bottom:4px">${"★".repeat(d.stars||5)}</div>
                <p style="color:#374151;font-size:14px;line-height:1.5;margin:0 0 6px;font-style:italic">"${f(d.text||"")}"</p>
                <div style="font-weight:600;font-size:13px;color:#0f172a">${f(d.name||"")}</div>
                <div style="font-size:12px;color:#64748b">${f(d.role||"")}</div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0">
                <button class="btn-cancel" data-edit="${c}" style="padding:6px 12px;font-size:12px">Editar</button>
                <button class="icon-btn del-btn" data-del="${c}" style="background:#fee2e2;color:#dc2626;border:none" title="Remover"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>
              </div>
            </div>`).join("")}
      </div>

      <div id="dep-form-wrap" style="display:none;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:12px;padding:24px;max-width:600px;margin-bottom:24px">
        <h3 id="dep-form-title" style="margin:0 0 16px;font-size:16px;color:#0f172a">Novo Depoimento</h3>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label class="form-label">Avaliação</label>
            <select id="dep-stars" class="form-control" style="max-width:180px">
              <option value="5">★★★★★ (5 estrelas)</option>
              <option value="4">★★★★☆ (4 estrelas)</option>
              <option value="3">★★★☆☆ (3 estrelas)</option>
            </select>
          </div>
          <div>
            <label class="form-label">Depoimento <span style="color:#94a3b8;font-size:11px">(sem aspas)</span></label>
            <textarea id="dep-text" class="form-control" rows="3" placeholder="O Isaac foi muito além do esperado..."></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label class="form-label">Nome</label>
              <input id="dep-name" class="form-control" placeholder="Fernando Almeida">
            </div>
            <div>
              <label class="form-label">Cargo / Cidade</label>
              <input id="dep-role" class="form-control" placeholder="Investidor — São Paulo, SP">
            </div>
          </div>
          <div style="display:flex;gap:10px;margin-top:4px">
            <button class="btn-primary" id="dep-form-save">Salvar</button>
            <button class="btn-cancel" id="dep-form-cancel">Cancelar</button>
            <span id="dep-save-msg" class="cfg-save-msg" style="display:none;align-self:center"></span>
          </div>
        </div>
      </div>
    `,e.dataset.loaded="1";let r=-1;function l(d=-1){r=d;const c=e.querySelector("#dep-form-wrap");c.style.display="",e.querySelector("#dep-form-title").textContent=d>=0?"Editar Depoimento":"Novo Depoimento";const s=d>=0?n[d]:{};e.querySelector("#dep-stars").value=String(s.stars||5),e.querySelector("#dep-text").value=s.text||"",e.querySelector("#dep-name").value=s.name||"",e.querySelector("#dep-role").value=s.role||"",e.querySelector("#dep-text").focus()}e.querySelector("#dep-add-btn").addEventListener("click",()=>l(-1)),e.querySelector("#dep-form-cancel").addEventListener("click",()=>{e.querySelector("#dep-form-wrap").style.display="none",r=-1}),e.addEventListener("click",d=>{const c=d.target.closest("[data-edit]"),s=d.target.closest("[data-del]");if(c&&l(parseInt(c.dataset.edit)),s){const m=parseInt(s.dataset.del);confirm("Remover este depoimento?")&&(n.splice(m,1),i().then(()=>o()))}}),e.querySelector("#dep-form-save").addEventListener("click",async()=>{const d=e.querySelector("#dep-form-save"),c=e.querySelector("#dep-save-msg"),s=e.querySelector("#dep-text").value.trim(),m=e.querySelector("#dep-name").value.trim(),u=e.querySelector("#dep-role").value.trim(),E=parseInt(e.querySelector("#dep-stars").value);if(!s||!m){alert("Preencha o depoimento e o nome.");return}d.disabled=!0,d.textContent="Salvando…";const w={stars:E,text:s,name:m,role:u};r>=0?n[r]=w:n.push(w);const x=await i();d.disabled=!1,d.textContent="Salvar",G(c,x),x&&(e.querySelector("#dep-form-wrap").style.display="none",r=-1,o())})}async function i(){const r=JSON.stringify(n);return await Ue("testimonials",{pt:r,en:r,es:r})}o()}document.addEventListener("DOMContentLoaded",async()=>{var l,d,c;const t=window.location.hostname.replace(/^www\./,"");if(t&&t!=="localhost"&&t!=="127.0.0.1"){const s=`imobi_tenant_${t}`,m=Pe(s);if(m)be(m);else{let u=null;for(const E of[t,"www."+t]){const{data:w}=await b.from("tenants").select("id").eq("domain",E).maybeSingle();if(w!=null&&w.id){u=w;break}}u!=null&&u.id&&(be(u.id),nt(s,u.id,24*60*60*1e3))}}await Promise.all([wa(),sa()]),Te=K("company.whatsapp",Te),ft(),Ha(),Ua();const n=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");n&&a&&(wt(),n.addEventListener("change",()=>{const s=fe().find(u=>u.name===n.value),m=s?xt(s.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+m.map(u=>`<option value="${u.name}">${f(u.name)}</option>`).join("")}));const o=document.getElementById("admin-login"),i=document.getElementById("admin-root");if(o){const s=new URLSearchParams(window.location.hash.replace("#","")),m=new URLSearchParams(window.location.search),u=s.get("type")||m.get("type")||"",E=Xt||u==="recovery"||u==="invite"||window.location.hash.includes("access_token")||m.has("code"),w=document.getElementById("password-reset-overlay");if(E){o.style.display="none",i&&i.classList.add("hidden"),w&&(w.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async k=>{var p,g;k.preventDefault();const v=((p=document.getElementById("new-password"))==null?void 0:p.value)||"",I=((g=document.getElementById("confirm-password"))==null?void 0:g.value)||"",$=document.getElementById("password-reset-msg"),S=k.target.querySelector('button[type="submit"]');if($&&($.style.display="none"),v!==I){$&&($.textContent="As senhas não coincidem.",$.style.display="");return}S&&(S.disabled=!0,S.textContent="Salvando…");const{error:_}=await b.auth.updateUser({password:v});if(_){$&&($.textContent="Erro: "+_.message,$.style.display=""),S&&(S.disabled=!1,S.textContent="Definir Senha");return}window.location.href=window.location.pathname}),m.has("code")&&await b.auth.exchangeCodeForSession(m.get("code")??"");return}const{data:{session:x}}=await b.auth.getSession();if(x){if(o.classList.add("hidden"),i&&i.classList.remove("hidden"),tt(),Dt(),At(),window.lucide&&lucide.createIcons(),y=await Bt(x.user.id),!y){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden");return}if(y.active===!1){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(y.needs_password_reset){o.style.display="none",i&&i.classList.add("hidden");const k=document.getElementById("password-reset-overlay");k&&(k.style.display="flex"),(d=document.getElementById("password-reset-form"))==null||d.addEventListener("submit",async v=>{var g,h;v.preventDefault();const I=((g=document.getElementById("new-password"))==null?void 0:g.value)||"",$=((h=document.getElementById("confirm-password"))==null?void 0:h.value)||"",S=document.getElementById("password-reset-msg"),_=v.target.querySelector('button[type="submit"]');if(S&&(S.style.display="none"),I!==$){S&&(S.textContent="As senhas não coincidem.",S.style.display="");return}if(I.length<12){S&&(S.textContent="Mínimo 6 caracteres.",S.style.display="");return}_&&(_.disabled=!0,_.textContent="Salvando…");const{error:p}=await b.auth.updateUser({password:I});if(p){S&&(S.textContent="Erro: "+p.message,S.style.display=""),_&&(_.disabled=!1,_.textContent="Definir Senha");return}await b.from("profiles").update({needs_password_reset:!1}).eq("id",y.id),window.location.href=window.location.pathname});return}be((y==null?void 0:y.tenant_id)||null),We(y),Ct(y),Tt(y.role),await Ge(),await Rt(y),window.lucide&&lucide.createIcons(),nn(),ae("dashboard")}else{i&&i.classList.add("hidden"),o.classList.remove("hidden");const k=document.getElementById("login-form");k&&((c=document.getElementById("forgot-password-btn"))==null||c.addEventListener("click",async()=>{var $,S;const v=(S=($=k.querySelector('input[name="email"]'))==null?void 0:$.value)==null?void 0:S.trim();if(!v){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:I}=await b.auth.resetPasswordForEmail(v,{redirectTo:"https://omarcorretor.com.br/ios.imobi.html"});alert(I?"Erro: "+I.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),k.addEventListener("submit",async v=>{v.preventDefault();const I=k.querySelector('button[type="submit"]'),$=new FormData(k),S=$.get("email"),_=$.get("password");I&&(I.disabled=!0,I.textContent="Entrando…");try{if(await Ma(S,_)){o.classList.add("hidden"),i&&i.classList.remove("hidden"),tt(),Dt(),window.lucide&&lucide.createIcons();const{data:{session:g}}=await b.auth.getSession();if(y=g?await Bt(g.user.id):null,!y){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Perfil não encontrado. Entre em contato com o administrador.");return}if(y.active===!1){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}At(),be((y==null?void 0:y.tenant_id)||null),We(y),Ct(y),Tt(y.role),await Ge(),await Rt(y),window.lucide&&lucide.createIcons(),ae("dashboard")}else alert("E-mail ou senha incorretos")}catch(p){alert("Erro ao fazer login: "+((p==null?void 0:p.message)||String(p)))}finally{I&&(I.disabled=!1,I.textContent="Entrar")}}))}}else tt();await me();const r=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();$t(r),St(Te),window._applyDynamicContent=$t,window._applyWhatsAppLinks=St,document.querySelectorAll(".nav-dropdown-btn").forEach(s=>{var u;const m=(u=s.closest(".nav-dropdown"))==null?void 0:u.querySelector(".nav-dropdown-menu");m&&s.addEventListener("click",E=>{E.stopPropagation(),m.classList.toggle("js-open"),document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(w=>{w!==m&&w.classList.remove("js-open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(s=>s.classList.remove("js-open"))})});async function cn(){const e=A.filter(o=>!o.reference);if(!e.length)return;const t=A.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,i)=>o.id-i.id);for(const o of a){const i="IO-"+String(n).padStart(4,"0"),{error:r}=await b.from("properties").update({reference:i}).eq("id",o.id);if(!r){const l=A.findIndex(d=>d.id===o.id);l>=0&&(A[l].reference=i),n++}}ze(bt(A))}async function mn(){const e=A.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(i=>!i.includes("/wm-")))continue;const a=[];let o=!1;for(const i of t.images)if(i.includes("/wm-"))a.push(i);else try{const r=await pn(i);a.push(r),o=!0}catch{a.push(i)}if(o){await b.from("properties").update({images:a}).eq("id",t.id);const i=A.findIndex(r=>r.id===t.id);i>=0&&(A[i].images=a)}}ze(bt(A))}}async function pn(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),i=o.ok?await o.blob():null,r=i?URL.createObjectURL(i):null;return new Promise(l=>{const d=new Image;d.onload=()=>{URL.revokeObjectURL(a);const c=document.createElement("canvas"),s=1200;let m=d.width,u=d.height;m>s&&(u=Math.round(u*s/m),m=s),c.width=m,c.height=u;const E=c.getContext("2d");E.drawImage(d,0,0,m,u);const w=x=>{if(x){const k=Math.round(m*.18),v=Math.round(x.naturalHeight*k/x.naturalWidth),I=Math.round(m*.02);E.globalAlpha=.45,E.drawImage(x,m-k-I,u-v-I,k,v),E.globalAlpha=1}c.toBlob(async k=>{try{const v=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:I}=await b.storage.from("imoveis").upload(v,k,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(I){console.error("Upload watermark error:",I),l(e);return}const{data:{publicUrl:$}}=b.storage.from("imoveis").getPublicUrl(v);l($)}catch(v){console.error("Watermark upload exception:",v),l(e)}},"image/jpeg",.82)};if(r){const x=new Image;x.onload=()=>{URL.revokeObjectURL(r),w(x)},x.onerror=()=>{URL.revokeObjectURL(r),w(null)},x.src=r}else w(null)},d.onerror=()=>{URL.revokeObjectURL(a),l(e)},d.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function G(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function Et(e,t="assets"){const n=await je(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await b.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:i}}=b.storage.from("imoveis").getPublicUrl(a);return i}async function ra(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("settings").select("key,value").eq("tenant_id",N()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>f(String(n[o]||""));e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Empresa</div><div class="section-sub">Identidade, contatos e redes sociais</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏢</span> Identidade</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nome da Empresa</label>
          <input id="co-name" class="form-control" value="${a("company.name")}" placeholder="Nome completo">
          <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece no <strong>cabeçalho, rodapé e aba do navegador</strong> do site.</p>
        </div>
        <div class="form-group">
          <label class="form-label">CRECI</label>
          <input id="co-creci" class="form-control" value="${a("company.creci")}" placeholder="Ex: 69965F">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:12px">
        <label class="form-label">Logo</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="co-logo-url" class="form-control" value="${a("company.logo_url")}" placeholder="/logo.png ou https://...">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="co-logo-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece no <strong>topo e rodapé do site</strong>. PNG transparente, mín. 200×60 px.</p>
        <div class="logo-preview-box" style="margin-top:10px">
          <img id="co-logo-preview" src="${a("company.logo_url")||"/logo.png"}" alt="Preview">
          <span style="font-size:12px;color:#9ca3af">Preview do logotipo</span>
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Favicon (URL)</label>
        <input id="co-favicon-url" class="form-control" value="${a("company.favicon_url")}" placeholder="/favicon.ico">
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Ícone exibido na <strong>aba do navegador</strong>.</p>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="co-save-identity">Salvar Identidade</button>
        <span id="co-identity-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📞</span> Contatos</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">WhatsApp <small style="color:#9ca3af">(somente números, com DDI)</small></label>
          <input id="co-whatsapp" class="form-control" value="${a("company.whatsapp")}" placeholder="5547999701743">
          <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Ativa o <strong>botão verde flutuante</strong> no site e no link de cada imóvel.</p>
        </div>
        <div class="form-group">
          <label class="form-label">Telefone (exibição)</label>
          <input id="co-phone" class="form-control" value="${a("company.phone")}" placeholder="(47) 99970-1743">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">E-mail</label>
          <input id="co-email" type="email" class="form-control" value="${a("company.email")}" placeholder="contato@empresa.com">
        </div>
        <div class="form-group">
          <label class="form-label">Endereço (resumido)</label>
          <input id="co-address" class="form-control" value="${a("company.address")}" placeholder="Cidade, UF">
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="co-save-contacts">Salvar Contatos</button>
        <span id="co-contacts-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📱</span> Redes Sociais</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Instagram</label>
          <input id="co-instagram" class="form-control" value="${a("company.instagram_url")}" placeholder="https://instagram.com/...">
        </div>
        <div class="form-group">
          <label class="form-label">Facebook</label>
          <input id="co-facebook" class="form-control" value="${a("company.facebook_url")}" placeholder="https://facebook.com/...">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">YouTube</label>
          <input id="co-youtube" class="form-control" value="${a("company.youtube_url")}" placeholder="https://youtube.com/...">
        </div>
        <div class="form-group">
          <label class="form-label">TikTok</label>
          <input id="co-tiktok" class="form-control" value="${a("company.tiktok_url")}" placeholder="https://tiktok.com/@...">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">LinkedIn</label>
        <input id="co-linkedin" class="form-control" value="${a("company.linkedin_url")}" placeholder="https://linkedin.com/in/...">
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="co-save-social">Salvar Redes Sociais</button>
        <span id="co-social-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const i=o.target.files[0];if(i)try{const r=await Et(i,"logos");document.getElementById("co-logo-url").value=r,document.getElementById("co-logo-preview").src=r}catch(r){alert("Erro no upload: "+r.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const i=await we([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);i&&ft(),o.disabled=!1,o.textContent="Salvar Identidade",G(document.getElementById("co-identity-msg"),i)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const i=document.getElementById("co-whatsapp").value.trim(),r=await we([["company.whatsapp",i],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);r&&i&&(Te=i),o.disabled=!1,o.textContent="Salvar Contatos",G(document.getElementById("co-contacts-msg"),r)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const i=await we([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",G(document.getElementById("co-social-msg"),i)})}async function la(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("settings").select("key,value").eq("tenant_id",N()),n={};t==null||t.forEach(s=>{n[s.key]=s.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",i=n["visual.secondary_bg"]||"#1a2f4a",r=n["visual.hero_bg_url"]||"",l=n["visual.price_max_slider"]||13e7;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Visual</div><div class="section-sub">Cores, identidade visual e imagens</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🎨</span> Preview ao Vivo</div>
      <div class="visual-preview">
        <div class="visual-preview-bar" id="vp-bar"></div>
        <div class="visual-preview-body">
          <div class="visual-preview-dot" id="vp-dot"></div>
          <div class="visual-preview-text">Cor de destaque do sistema</div>
          <div class="visual-preview-btn" id="vp-btn">Botão</div>
        </div>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🖌️</span> Paleta de Cores</div>

      <div class="color-row">
        <div>
          <label class="form-label">Cor de Destaque</label>
          <p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">📍 Botões, links ativos e ícones no <strong>site e no CRM</strong>.</p>
        </div>
        <div class="color-swatch">
          <input type="color" id="col-accent" value="${a}">
          <input type="text"  id="col-accent-hex" value="${a}" maxlength="7" placeholder="#b8962e">
        </div>
      </div>
      <div class="color-row">
        <div>
          <label class="form-label">Fundo Principal</label>
          <p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">📍 Cor do <strong>cabeçalho e seções escuras</strong> do site.</p>
        </div>
        <div class="color-swatch">
          <input type="color" id="col-primary" value="${o}">
          <input type="text"  id="col-primary-hex" value="${o}" maxlength="7">
        </div>
      </div>
      <div class="color-row">
        <div>
          <label class="form-label">Fundo Secundário</label>
          <p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">📍 Cor das <strong>seções intermediárias</strong> do site.</p>
        </div>
        <div class="color-swatch">
          <input type="color" id="col-secondary" value="${i}">
          <input type="text"  id="col-secondary-hex" value="${i}" maxlength="7">
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-colors">Salvar Cores</button>
        <button class="btn-cancel"  id="visual-reset-colors">Restaurar Padrão</button>
        <span id="visual-colors-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🖼️</span> Imagens do Site</div>
      <div class="form-group" style="margin-bottom:16px">
        <label class="form-label">Imagem de Fundo do Hero (Banner Principal)</label>
        <div style="display:flex;gap:8px">
          <input id="vis-hero-url" class="form-control" value="${f(r)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 <strong>Foto de fundo do banner</strong> no topo do site. Recomendado: 1920×1080 px.</p>
        <div id="vis-hero-preview" style="margin-top:10px;display:${r?"":"none"}">
          <img src="${f(r)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Preço Máximo do Slider de Busca</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="vis-price-max" type="number" class="form-control" value="${l}" min="100000" step="1000000" style="max-width:200px">
          <span style="font-size:13px;color:#9ca3af">R$</span>
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-images">Salvar Imagens</button>
        <span id="visual-images-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `;function d(s,m,u){const E=document.getElementById(s),w=document.getElementById(m);E==null||E.addEventListener("input",x=>{w.value=x.target.value,u()}),w==null||w.addEventListener("input",x=>{/^#[0-9a-fA-F]{6}$/.test(x.target.value)&&(E.value=x.target.value,u())})}function c(){var m,u,E,w;const s=((m=document.getElementById("col-accent-hex"))==null?void 0:m.value)||"#b8962e";(u=document.getElementById("vp-bar"))==null||u.style.setProperty("background",s),(E=document.getElementById("vp-dot"))==null||E.style.setProperty("background",s),(w=document.getElementById("vp-btn"))==null||w.style.setProperty("background",s),document.documentElement.style.setProperty("--accent",s)}d("col-accent","col-accent-hex",c),d("col-primary","col-primary-hex",()=>{}),d("col-secondary","col-secondary-hex",()=>{}),c(),document.getElementById("vis-hero-file").addEventListener("change",async s=>{const m=s.target.files[0];if(m)try{const u=await Et(m,"hero");document.getElementById("vis-hero-url").value=u;const E=document.getElementById("vis-hero-preview");E.innerHTML=`<img src="${u}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,E.style.display=""}catch(u){alert("Erro no upload: "+u.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const s=document.getElementById("visual-save-colors");s.disabled=!0,s.textContent="Salvando…";const m=await we([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);m&&ft(),s.disabled=!1,s.textContent="Salvar Cores",G(document.getElementById("visual-colors-msg"),m)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",c())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const s=document.getElementById("visual-save-images");s.disabled=!0,s.textContent="Salvando…";const m=await we([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);s.disabled=!1,s.textContent="Salvar Imagens",G(document.getElementById("visual-images-msg"),m)})}async function ca(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("site_content").select("*").eq("tenant_id",N()),n={};t==null||t.forEach(d=>{n[d.key]=d});const a=(d,c)=>{var s;return f(((s=n[d])==null?void 0:s[`value_${c}`])||"")},o=["pt","en","es"],i={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},r=d=>o.map(c=>`<button class="content-tab${c===d?" active":""}" data-lang="${c}">${i[c]}</button>`).join(""),l=d=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${d}" value="${a("hero.title",d)}">
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto principal em <strong>destaque no banner do site</strong> (frase de impacto).</p>
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${d}" rows="3">${a("hero.subtitle",d)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto menor abaixo do título, também no <strong>banner principal</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${d}" rows="4">${a("inst.bio_p1",d)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece na seção <strong>"Sobre"</strong> do site.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${d}" rows="3">${a("inst.bio_p2",d)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Segundo parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${d}" rows="3">${a("inst.bio_p3",d)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Terceiro parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${d}" value="${a("inst.stat1_num",d)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${d}" value="${a("inst.stat2_num",d)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${d}" value="${a("inst.stat3_num",d)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${d}" value="${a("inst.stat1_label",d)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${d}" value="${a("inst.stat2_label",d)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${d}" value="${a("inst.stat3_label",d)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${d}" value="${a("footer.text",d)}">
    </div>
  `;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${r("pt")}</div>
      <div id="sc-panels">
        ${o.map(d=>`<div class="content-panel${d==="pt"?" active":""}" data-panel="${d}">${l(d)}</div>`).join("")}
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="sc-save-btn">Salvar Conteúdo</button>
        <span id="sc-save-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔍</span> SEO</div>
      <div class="content-field">
        <label class="form-label">Title da Página (PT)</label>
        <input id="seo-title" class="form-control" value="${a("seo.title_pt","pt")}" placeholder="Nome — Cargo">
      </div>
      <div class="content-field">
        <label class="form-label">Meta Description (PT)</label>
        <textarea id="seo-desc" class="form-control" rows="2" placeholder="Descrição curta para o Google…">${a("seo.description_pt","pt")}</textarea>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="seo-save-btn">Salvar SEO</button>
        <span id="seo-save-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `,document.getElementById("sc-tabs").addEventListener("click",d=>{var s;const c=d.target.closest(".content-tab");c&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(m=>m.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(m=>m.classList.remove("active")),c.classList.add("active"),(s=document.querySelector(`#sc-panels [data-panel="${c.dataset.lang}"]`))==null||s.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const d=document.getElementById("sc-save-btn");d.disabled=!0,d.textContent="Salvando…";const c={};document.querySelectorAll(".sc-field").forEach(m=>{const u=m.dataset.key,E=m.dataset.lang;c[u]||(c[u]={}),c[u][E]=m.value});let s=!0;for(const[m,u]of Object.entries(c))await Ue(m,{pt:u.pt,en:u.en,es:u.es})||(s=!1);d.disabled=!1,d.textContent="Salvar Conteúdo",G(document.getElementById("sc-save-msg"),s)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const d=document.getElementById("seo-save-btn");d.disabled=!0,d.textContent="Salvando…";const c=document.getElementById("seo-title").value.trim(),s=document.getElementById("seo-desc").value.trim(),m=await Ue("seo.title_pt",{pt:c,en:c,es:c})&&await Ue("seo.description_pt",{pt:s,en:s,es:s});d.disabled=!1,d.textContent="Salvar SEO",G(document.getElementById("seo-save-msg"),m)})}async function ma(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await R())}async function R(){var v,I,$,S,_;const e=document.getElementById("crm-body");if(!e)return;const t=N(),[{data:n},{data:a},{data:o},{data:i}]=await Promise.all([b.from("crm_pipelines").select("*").eq("tenant_id",t).order("sort_order"),b.from("crm_stages").select("*").eq("tenant_id",t).order("sort_order"),b.from("crm_tags").select("*").eq("tenant_id",t).order("name"),b.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("sort_order")]),r=n||[],d=(typeof j<"u"&&j?r.find(p=>p.id===j):null)||r.find(p=>p.is_default)||r[0],c=r.map(p=>`<option value="${p.id}"${p.id===(d==null?void 0:d.id)?" selected":""}>${f(p.name)}</option>`).join(""),s=(a||[]).filter(p=>p.pipeline_id===(d==null?void 0:d.id)).sort((p,g)=>(p.sort_order??0)-(g.sort_order??0)),m=s.map((p,g)=>`
    <div class="stage-item stage-draggable" data-id="${p.id}" data-idx="${g}" draggable="true">
      <span class="stage-drag-handle" title="Arrastar para reordenar">⋮⋮</span>
      <div class="stage-color-dot" style="background:${p.color}"></div>
      <input type="text" class="stage-name-input" value="${f(p.name)}" data-sid="${p.id}" data-orig="${f(p.name)}" placeholder="Nome da etapa">
      <input type="color" value="${p.color}" data-sid="${p.id}" class="stage-color-pick" title="Cor da etapa">
      <button class="icon-btn del-btn stage-del" data-id="${p.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>';(o||[]).map(p=>`<span class="tag-chip" style="background:${p.color}" data-id="${p.id}">
      ${f(p.name)}
      <button class="tag-chip-del" data-id="${p.id}" title="Remover">✕</button>
    </span>`).join("");const u=(i||[]).map(p=>`
    <div class="stage-item" data-id="${p.id}">
      <div class="stage-color-dot" style="background:${p.color}"></div>
      <span class="stage-name">${f(p.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${p.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${p.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>

      <!-- Seletor de Funil + ações sobre o funil inteiro -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:240px">
            <label style="font-size:13px;font-weight:600;color:#475569;white-space:nowrap">Funil ativo:</label>
            <select class="pipeline-select" id="crm-pipe-sel" style="flex:1;min-width:200px;font-size:14px;padding:8px 10px;border:1px solid var(--border);border-radius:6px">${c}</select>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn-secondary" id="crm-rename-pipeline" style="font-size:13px;padding:7px 14px" title="Renomear este funil">✏️ Renomear</button>
            <button class="btn-secondary" id="crm-set-default-pipeline" style="font-size:13px;padding:7px 14px" title="Marcar como padrão">⭐ Tornar padrão</button>
            <button class="btn-secondary" id="crm-delete-pipeline" style="font-size:13px;padding:7px 14px;color:#dc2626;border-color:#fecaca" title="Excluir este funil">🗑️ Excluir funil</button>
            <button class="btn-primary" id="crm-add-pipeline" style="font-size:13px;padding:7px 14px">➕ Novo Funil</button>
          </div>
        </div>
        ${d!=null&&d.is_default?'<div style="margin-top:8px;font-size:12px;color:#059669"><strong>⭐ Funil padrão</strong> · usado por novos leads</div>':""}
      </div>

      <!-- Banner explicativo -->
      <div style="background:linear-gradient(to right,#fffbeb,#fef3c7);border:1px solid #fde68a;border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <div style="display:flex;align-items:flex-start;gap:12px">
          <span style="font-size:24px;line-height:1">💡</span>
          <div style="font-size:13px;color:#78350f;line-height:1.6">
            <div style="font-weight:700;margin-bottom:4px;color:#92400e">Como editar as etapas do funil "${f((d==null?void 0:d.name)||"")}"</div>
            <div>• <strong>Reordenar:</strong> arraste pela alça <span style="display:inline-block;background:#C9A227;color:#fff;padding:2px 8px;border-radius:4px;font-weight:700;letter-spacing:-2px;font-family:monospace;font-size:14px">⋮⋮</span> dourada</div>
            <div>• <strong>Renomear:</strong> clique no nome da etapa, edite e tecle Enter</div>
            <div>• <strong>Mudar cor:</strong> clique no quadradinho colorido</div>
            <div>• <strong>Excluir:</strong> clique no 🗑️ (cuidado: leads dessa etapa ficam órfãos)</div>
          </div>
        </div>
      </div>

      <!-- Cabeçalho da lista -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding:0 4px">
        <div style="font-size:13px;font-weight:700;color:#0f172a;letter-spacing:0.02em;text-transform:uppercase">
          Etapas (${s.length})
        </div>
        <div style="font-size:11px;color:#94a3b8">A ordem aqui = ordem das colunas no Kanban</div>
      </div>

      <!-- Lista de etapas drag-and-drop -->
      <div class="stages-list" id="crm-stages-list">${m}</div>

      <!-- Form de adicionar etapa -->
      <div class="stage-add-row" style="margin-top:12px;padding:12px;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px">
        <input id="crm-new-stage" type="text" class="form-control" placeholder="Nome da nova etapa (ex: Visita Marcada, Sem Resposta…)">
        <input type="color" id="crm-new-stage-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <button class="btn-primary" id="crm-add-stage">➕ Adicionar Etapa</button>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏷️</span> Tags de Classificação</div>
      <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Classifique seus leads com tags coloridas personalizadas. Use emojis no nome para identificar visualmente.</p>
      <div class="tm-list" id="crm-tags-list">
        ${(o||[]).length?(o||[]).map(p=>`
        <div class="tm-row" data-id="${p.id}">
          <div class="tm-color-swatch" style="background:${p.color}" onclick="this.nextElementSibling.click()" title="Alterar cor"></div>
          <input type="color" class="tm-color-input" data-id="${p.id}" value="${p.color}" title="Cor da tag">
          <input class="tm-name-input form-control" type="text" value="${f(p.name)}" data-id="${p.id}" data-orig="${f(p.name)}" placeholder="Nome da tag">
          <button class="btn-primary tm-save-btn" data-id="${p.id}">Salvar</button>
          <button class="icon-btn del-btn tm-del-btn" data-id="${p.id}" title="Excluir tag">🗑️</button>
        </div>`).join(""):'<p style="color:#9ca3af;font-size:13px;margin:0;padding:8px 0;">Nenhuma tag criada ainda. Adicione abaixo ou use as sugestões rápidas.</p>'}
      </div>
      <div class="tm-add-row">
        <input id="crm-new-tag" type="text" class="form-control" placeholder="Nome da nova tag… (ex: 🔴 Quente)">
        <input type="color" id="crm-new-tag-color" value="#6366F1" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px;flex-shrink:0;">
        <button class="btn-primary" id="crm-add-tag">+ Adicionar Tag</button>
      </div>
      <div class="tm-templates">
        <div class="tm-templates-label">⚡ Sugestões rápidas — clique para adicionar:</div>
        <div class="tm-tpl-grid" id="tm-tpl-grid">
          ${[{name:"🔴 Quente",color:"#EF4444"},{name:"🟡 Morno",color:"#F59E0B"},{name:"🔵 Frio",color:"#3B82F6"},{name:"💰 Investidor",color:"#8B5CF6"},{name:"⭐ Alto Padrão",color:"#C9A227"},{name:"🏦 Financiamento",color:"#0EA5E9"},{name:"🔄 Permuta",color:"#374151"},{name:"🏠 Comprador",color:"#10B981"},{name:"📋 Proprietário",color:"#F97316"}].filter(p=>!(o||[]).some(g=>g.name===p.name)).map(p=>`<button class="tm-tpl-btn" data-name="${f(p.name)}" data-color="${p.color}" style="border-color:${p.color};color:${p.color};background:${p.color}15;">${f(p.name)}</button>`).join("")}
        </div>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📋</span> Status de Leads</div>
      <div class="stages-list" id="crm-status-list">${u}</div>
      <div class="stage-add-row">
        <input id="crm-new-status" type="text" class="form-control" placeholder="Nome do status…">
        <input type="color" id="crm-new-status-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text);white-space:nowrap">
          <input type="checkbox" id="crm-new-status-final"> Status final
        </label>
        <button class="btn-primary" id="crm-add-status">Adicionar</button>
      </div>
    </div>
  `;const E=document.getElementById("crm-pipe-sel");E&&E.addEventListener("change",async()=>{const p=parseInt(E.value,10);if(!isNaN(p))try{j=p}catch{}await R()});const w=d==null?void 0:d.id;(v=document.getElementById("crm-rename-pipeline"))==null||v.addEventListener("click",async()=>{if(!w)return;const p=prompt("Novo nome do funil:",(d==null?void 0:d.name)||"");if(!p||p.trim()===(d==null?void 0:d.name))return;const{error:g}=await b.from("crm_pipelines").update({name:p.trim()}).eq("id",w);if(g){alert("Erro: "+g.message);return}await R()}),(I=document.getElementById("crm-set-default-pipeline"))==null||I.addEventListener("click",async()=>{if(w){if(d!=null&&d.is_default){alert("Este funil já é o padrão.");return}try{const p=N();await b.from("crm_pipelines").update({is_default:!1}).eq("tenant_id",p),await b.from("crm_pipelines").update({is_default:!0}).eq("id",w),await R()}catch(p){alert("Erro: "+p.message)}}}),($=document.getElementById("crm-delete-pipeline"))==null||$.addEventListener("click",async()=>{if(w){if(r.length===1){alert("Não pode excluir o único funil. Crie outro antes.");return}confirm(`Excluir o funil "${d==null?void 0:d.name}" e todas as suas etapas?

Leads associados ficarão sem funil — você pode movê-los depois.`)&&(await b.from("crm_stages").delete().eq("pipeline_id",w),await b.from("crm_pipelines").delete().eq("id",w),j=null,await R())}}),document.getElementById("crm-add-stage").addEventListener("click",async()=>{const p=document.getElementById("crm-new-stage").value.trim(),g=document.getElementById("crm-new-stage-color").value,h=parseInt(document.getElementById("crm-pipe-sel").value,10);p&&(await b.from("crm_stages").insert({pipeline_id:h,name:p,color:g,sort_order:99,tenant_id:N()}),document.getElementById("crm-new-stage").value="",await R())}),e.querySelectorAll(".stage-del").forEach(p=>{p.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await b.from("crm_stages").delete().eq("id",p.dataset.id),await R())})}),e.querySelectorAll(".stage-name-input").forEach(p=>{p.addEventListener("blur",async()=>{const g=p.value.trim(),h=p.dataset.orig;if(!g||g===h){p.value=h;return}p.disabled=!0;const{error:L}=await b.from("crm_stages").update({name:g}).eq("id",p.dataset.sid);if(p.disabled=!1,L){console.warn("[Etapas] erro ao renomear:",L),p.value=h,alert("Erro ao renomear: "+L.message);return}p.dataset.orig=g,p.style.background="#dcfce7",setTimeout(()=>{p.style.background=""},800)}),p.addEventListener("keydown",g=>{g.key==="Enter"&&(g.preventDefault(),p.blur()),g.key==="Escape"&&(p.value=p.dataset.orig,p.blur())})}),document.getElementById("crm-stages-list");let x=null;e.querySelectorAll(".stage-draggable").forEach(p=>{p.addEventListener("dragstart",g=>{x=p,p.classList.add("stage-dragging"),g.dataTransfer.effectAllowed="move";try{g.dataTransfer.setData("text/plain",p.dataset.id)}catch{}}),p.addEventListener("dragend",()=>{p.classList.remove("stage-dragging"),e.querySelectorAll(".stage-drop-over").forEach(g=>g.classList.remove("stage-drop-over"))}),p.addEventListener("dragover",g=>{g.preventDefault(),g.dataTransfer.dropEffect="move",p!==x&&(e.querySelectorAll(".stage-drop-over").forEach(h=>h.classList.remove("stage-drop-over")),p.classList.add("stage-drop-over"))}),p.addEventListener("dragleave",()=>{p.classList.remove("stage-drop-over")}),p.addEventListener("drop",async g=>{if(g.preventDefault(),!x||p===x)return;const h=x.dataset.id,L=p.dataset.id,B=s.findIndex(M=>String(M.id)===String(h)),C=s.findIndex(M=>String(M.id)===String(L));if(B<0||C<0)return;const T=s.splice(B,1)[0];s.splice(C,0,T);const q=s.map((M,O)=>b.from("crm_stages").update({sort_order:O}).eq("id",M.id));x=null,await Promise.all(q).catch(M=>console.warn("[stages] erro reordenar:",M)),await R()})}),e.querySelectorAll(".stage-color-pick").forEach(p=>{p.addEventListener("change",async g=>{await b.from("crm_stages").update({color:g.target.value}).eq("id",p.dataset.sid);const h=p.closest(".stage-item").querySelector(".stage-color-dot");h&&(h.style.background=g.target.value)})});const k=async()=>{const p=document.getElementById("crm-new-tag"),g=document.getElementById("crm-new-tag-color"),h=p==null?void 0:p.value.trim(),L=(g==null?void 0:g.value)||"#6366F1";if(!h){p==null||p.focus();return}await b.from("crm_tags").insert({name:h,color:L,tenant_id:N()}),p&&(p.value=""),await R()};(S=document.getElementById("crm-add-tag"))==null||S.addEventListener("click",k),(_=document.getElementById("crm-new-tag"))==null||_.addEventListener("keydown",p=>{p.key==="Enter"&&k()}),e.querySelectorAll(".tm-del-btn").forEach(p=>{p.addEventListener("click",async()=>{confirm("Excluir esta tag? Os leads que a possuem não serão afetados.")&&(await b.from("crm_tags").delete().eq("id",p.dataset.id),await R())})}),e.querySelectorAll(".tm-name-input").forEach(p=>{const g=p.closest(".tm-row"),h=g==null?void 0:g.querySelector(".tm-save-btn");h&&(h.style.display="none"),p.addEventListener("input",()=>{const L=p.value.trim()!==p.dataset.orig;h&&(h.style.display=L?"":"none")})}),e.querySelectorAll(".tm-color-input").forEach(p=>{const g=p.closest(".tm-row"),h=g==null?void 0:g.querySelector(".tm-color-swatch"),L=g==null?void 0:g.querySelector(".tm-save-btn");p.addEventListener("input",B=>{h&&(h.style.background=B.target.value),L&&(L.style.display="")})}),e.querySelectorAll(".tm-save-btn").forEach(p=>{p.style.display="none",p.addEventListener("click",async()=>{var B,C;const g=p.closest(".tm-row"),h=(B=g.querySelector(".tm-name-input"))==null?void 0:B.value.trim(),L=(C=g.querySelector(".tm-color-input"))==null?void 0:C.value;h&&(p.disabled=!0,p.textContent="✓ Salvando…",await b.from("crm_tags").update({name:h,color:L}).eq("id",p.dataset.id),await R())})}),e.querySelectorAll(".tm-tpl-btn").forEach(p=>{p.addEventListener("click",async()=>{const g=p.dataset.name,h=p.dataset.color;p.disabled=!0,p.innerHTML="✓",await b.from("crm_tags").insert({name:g,color:h,tenant_id:N()}),await R()})}),e.querySelectorAll(".tag-chip-del").forEach(p=>{p.addEventListener("click",async()=>{await b.from("crm_tags").delete().eq("id",p.dataset.id),await R()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const p=document.getElementById("crm-new-status").value.trim(),g=document.getElementById("crm-new-status-color").value,h=document.getElementById("crm-new-status-final").checked;p&&(await b.from("crm_lead_statuses").insert({name:p,color:g,is_final:h,sort_order:99,tenant_id:N()}),document.getElementById("crm-new-status").value="",await R())}),e.querySelectorAll(".status-del").forEach(p=>{p.addEventListener("click",async()=>{confirm("Remover este status?")&&(await b.from("crm_lead_statuses").delete().eq("id",p.dataset.id),await R())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var h;const p=(h=prompt("Nome do novo funil:"))==null?void 0:h.trim();if(!p)return;const{error:g}=await b.from("crm_pipelines").insert({name:p,sort_order:99,tenant_id:N()});if(g){alert("Erro ao criar funil: "+g.message);return}dt=!1,await R()})}async function pa(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("integrations").select("*"),n={};t==null||t.forEach(l=>{n[l.key]=l});const a=l=>{var d;return f(((d=n[l])==null?void 0:d.value)||"")},o=l=>{var d;return(d=n[l])!=null&&d.enabled?"checked":""},i=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],r=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${i.map(l=>`
        <div class="integration-row">
          <div class="integration-icon">${l.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${l.label}</div>
            <div class="integration-desc">${l.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${l.key}" ${o(l.key)}>
              <span class="toggle-slider"></span>
            </label>
            <input type="text" class="integration-value intg-val" data-key="${l.key}"
              value="${a(l.key)}" placeholder="${l.placeholder}">
          </div>
        </div>
      `).join("")}
      <div class="cfg-save-row">
        <button class="btn-primary" id="intg-save-tracking">Salvar Integrações</button>
        <span id="intg-tracking-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📧</span> Configurações de E-mail (SMTP)</div>
      <p style="font-size:13px;color:#9ca3af;margin:0 0 16px">Configure para enviar e-mails via servidor próprio.</p>
      ${r.map(l=>`
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label">${l.label}</label>
          <input class="form-control smtp-field" data-key="${l.key}" value="${a(l.key)}" placeholder="${l.placeholder}">
        </div>
      `).join("")}
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Senha SMTP <small style="color:#9ca3af">(salva de forma segura)</small></label>
        <input type="password" id="smtp-pass" class="form-control" placeholder="••••••••••">
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="intg-save-smtp">Salvar SMTP</button>
        <span id="intg-smtp-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var m;const l=document.getElementById("intg-save-tracking");l.disabled=!0,l.textContent="Salvando…";let d=!0;const c=document.querySelectorAll(".intg-val"),s=document.querySelectorAll(".intg-toggle");for(let u=0;u<c.length;u++){const E=c[u].dataset.key,w=c[u].value.trim(),x=((m=s[u])==null?void 0:m.checked)??!1;await Ze(E,w,x)||(d=!1)}l.disabled=!1,l.textContent="Salvar Integrações",G(document.getElementById("intg-tracking-msg"),d)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const l=document.getElementById("intg-save-smtp");l.disabled=!0,l.textContent="Salvando…";const d=document.querySelectorAll(".smtp-field");let c=!0;for(const m of d)await Ze(m.dataset.key,m.value.trim(),!0)||(c=!1);const s=document.getElementById("smtp-pass").value;s&&(await Ze("smtp_pass",s,!0)||(c=!1)),l.disabled=!1,l.textContent="Salvar SMTP",G(document.getElementById("intg-smtp-msg"),c)})}async function ua(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Biblioteca de Mídia</div><div class="section-sub">Gerencie imagens e arquivos do sistema</div></div>
    </div>
    <div class="cfg-card">
      <div class="cfg-card-title"><span>📤</span> Upload de Arquivos</div>
      <div class="media-upload-area" id="media-drop-area">
        <input type="file" id="media-file-input" accept="image/*" multiple>
        <div class="media-upload-icon">🖼️</div>
        <div class="media-upload-text">
          <strong>Clique para selecionar</strong> ou arraste as imagens aqui<br>
          <small style="color:#9ca3af">JPG, PNG, WEBP — máximo 10MB por arquivo</small>
        </div>
      </div>
      <div class="upload-progress" id="media-upload-progress">
        <div class="upload-progress-bar"><div class="upload-progress-fill" id="media-progress-fill"></div></div>
        <div class="upload-progress-text" id="media-progress-text">Enviando…</div>
      </div>
    </div>
    <div class="cfg-card">
      <div class="cfg-card-title" style="margin-bottom:12px"><span>📁</span> Arquivos Enviados</div>
      <div class="media-grid" id="media-grid">
        <div class="media-empty">Carregando…</div>
      </div>
    </div>
  `,await pt(),document.getElementById("media-file-input").addEventListener("change",async n=>{var d,c;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),i=document.getElementById("media-progress-fill"),r=document.getElementById("media-progress-text");o.style.display="";let l=0;for(const s of a){r.textContent=`Enviando ${l+1}/${a.length}…`,i.style.width=`${Math.round(l/a.length*100)}%`;try{const m=await Et(s,"media"),u=s.name.replace(/\.[^.]+$/,"").slice(0,60);await b.from("media_library").insert({name:u,url:m,type:"image",size:s.size,created_by:(c=(d=(await b.auth.getUser()).data)==null?void 0:d.user)==null?void 0:c.id})}catch(m){console.error("Media upload error:",m)}l++}i.style.width="100%",r.textContent=`✓ ${l} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",i.style.width="0"},2e3),await pt(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function pt(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await b.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${f(a.url)}">
      <img src="${f(a.url)}" alt="${f(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${f(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${f(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation(),(i=navigator.clipboard)==null||i.writeText(a.dataset.url).then(()=>{const r=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=r},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await b.from("media_library").delete().eq("id",a.dataset.id),await pt())})})}async function un(){var t,n,a,o,i;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title">⚡ Painel Global da Plataforma</div>
      <div class="sa-tabs">
        <button class="sa-tab active" data-tab="tenants">🏢 Imobiliárias</button>
        <button class="sa-tab" data-tab="plans">📦 Planos</button>
        <button class="sa-tab" data-tab="subscriptions">💳 Assinaturas</button>
        <button class="sa-tab" data-tab="global-users">👥 Usuários Globais</button>
        <button class="sa-tab" data-tab="platform">⚙️ Plataforma</button>
      </div>
      <div id="sa-panel-tenants" class="sa-panel">
        <div class="sa-toolbar">
          <input id="sa-tenant-search" class="sa-search" type="text" placeholder="Buscar imobiliária…">
          <button id="sa-tenant-new" class="btn-primary-sm">+ Nova Imobiliária</button>
        </div>
        <div id="sa-tenants-list" class="sa-list"><div class="sa-loading">Carregando…</div></div>
      </div>
      <div id="sa-panel-plans" class="sa-panel hidden">
        <div id="sa-plans-list" class="sa-list"><div class="sa-loading">Carregando…</div></div>
      </div>
      <div id="sa-panel-subscriptions" class="sa-panel hidden">
        <div class="sa-toolbar">
          <select id="sa-sub-filter" class="sa-select">
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="trialing">Trial</option>
            <option value="past_due">Inadimplente</option>
            <option value="cancelled">Cancelado</option>
            <option value="paused">Pausado</option>
          </select>
        </div>
        <div id="sa-subs-list" class="sa-list"><div class="sa-loading">Carregando…</div></div>
      </div>
      <div id="sa-panel-global-users" class="sa-panel hidden">
        <div class="sa-toolbar">
          <input id="sa-user-search" class="sa-search" type="text" placeholder="Buscar usuário…">
        </div>
        <div id="sa-users-list" class="sa-list"><div class="sa-loading">Carregando…</div></div>
      </div>
      <div id="sa-panel-platform" class="sa-panel hidden">
        <div class="sa-platform-grid">
          <div class="sa-stat-card">
            <div class="sa-stat-label">Total de Imobiliárias</div>
            <div class="sa-stat-value" id="sa-stat-tenants">—</div>
          </div>
          <div class="sa-stat-card">
            <div class="sa-stat-label">Usuários Ativos</div>
            <div class="sa-stat-value" id="sa-stat-users">—</div>
          </div>
          <div class="sa-stat-card">
            <div class="sa-stat-label">Assinaturas Ativas</div>
            <div class="sa-stat-value" id="sa-stat-subs">—</div>
          </div>
          <div class="sa-stat-card">
            <div class="sa-stat-label">Imóveis Publicados</div>
            <div class="sa-stat-value" id="sa-stat-props">—</div>
          </div>
        </div>
        <div class="cfg-card" style="margin-top:16px">
          <div class="cfg-card-title">Configurações Globais da Plataforma</div>
          <div class="form-group">
            <label>Nome da Plataforma</label>
            <input id="sa-plat-name" type="text" class="form-input" placeholder="ImobiPro SaaS">
          </div>
          <div class="form-group">
            <label>Email de Suporte</label>
            <input id="sa-plat-email" type="email" class="form-input" placeholder="suporte@imobipro.com.br">
          </div>
          <div class="form-group">
            <label>Trial padrão (dias)</label>
            <input id="sa-plat-trial" type="number" class="form-input" placeholder="14" min="0" max="90">
          </div>
          <div class="cfg-save-row">
            <button id="sa-plat-save" class="btn-primary-sm">Salvar Configurações</button>
            <span id="sa-plat-msg" class="cfg-save-msg"></span>
          </div>
        </div>
      </div>
    </div>
  `,e.querySelectorAll(".sa-tab").forEach(r=>{r.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(d=>d.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(d=>d.classList.add("hidden")),r.classList.add("active");const l=e.querySelector(`#sa-panel-${r.dataset.tab}`);l&&l.classList.remove("hidden"),r.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&de(),r.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&gn(),r.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&jt(),r.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&Ot(),r.dataset.tab==="platform"&&Ht()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",jt),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",de),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",Ot),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>yn()),(i=e.querySelector("#sa-plat-save"))==null||i.addEventListener("click",fn),de(),Ht())}async function de(){var l,d;const e=document.getElementById("sa-tenants-list"),t=((d=(l=document.getElementById("sa-tenant-search"))==null?void 0:l.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=b.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const i=(a||[]).filter(c=>{var s,m;return!t||((s=c.name)==null?void 0:s.toLowerCase().includes(t))||((m=c.slug)==null?void 0:m.toLowerCase().includes(t))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const r=c=>c.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=i.map(c=>{var s;return`
    <div class="sa-list-row" data-action="open-panel" data-id="${c.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${c.logo_url?`<img class="sa-tenant-logo" src="${f(c.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${f(c.name||"—")}</div>
          <div class="sa-list-sub">${f(c.slug||"")} · ${f(((s=c.plans)==null?void 0:s.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${r(c)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${c.id}" data-active="${c.active}" title="${c.active?"Desativar":"Ativar"}">${c.active?"⏸️":"▶️"}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(c=>{c.addEventListener("click",async s=>{s.stopPropagation();const m=c.dataset.active==="true";await b.from("tenants").update({active:!m}).eq("id",c.dataset.id),de()})}),e.querySelectorAll('[data-action="open-panel"]').forEach(c=>{c.addEventListener("click",()=>{const s=(i||[]).find(m=>String(m.id)===String(c.dataset.id));s&&bn(s)})})}async function gn(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await b.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${f(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function jt(){var l;const e=document.getElementById("sa-subs-list"),t=((l=document.getElementById("sa-sub-filter"))==null?void 0:l.value)||"";if(!e)return;e.dataset.loaded="1";let n=b.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const i={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},r={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(d=>{var c,s,m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${f(((c=d.tenants)==null?void 0:c.name)||"—")}</div>
          <div class="sa-list-sub">${f(((s=d.plans)==null?void 0:s.name)||"—")} · R$ ${Number(((m=d.plans)==null?void 0:m.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${i[d.status]||"gray"}">${r[d.status]||d.status}</span>
        <span class="sa-list-date">${d.current_period_end?new Date(d.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function Ot(){var r,l;const e=document.getElementById("sa-users-list"),t=((l=(r=document.getElementById("sa-user-search"))==null?void 0:r.value)==null?void 0:l.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await b.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(d=>{var c,s;return!t||((c=d.name)==null?void 0:c.toLowerCase().includes(t))||((s=d.email)==null?void 0:s.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const i={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(d=>{var c;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(d.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${f(d.name||"—")}</div>
          <div class="sa-list-sub">${f(((c=d.tenants)==null?void 0:c.name)||"Sem imobiliária")} · ${i[d.role]||d.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${d.active!==!1?"sa-badge-green":"sa-badge-red"}">${d.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function Ht(){const[e,t,n,a]=await Promise.all([b.from("tenants").select("id",{count:"exact",head:!0}),b.from("profiles").select("id",{count:"exact",head:!0}),b.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),b.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(i,r)=>{const l=document.getElementById(i);l&&(l.textContent=r??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function fn(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await we([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),G(t,!0)}function vn(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function yn(){var a,o,i,r,l,d;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
    <div class="sa-modal" style="max-width:540px;">
      <div class="sa-modal-header">
        <h3>Nova Imobiliária</h3>
        <button class="sa-modal-close" id="sa-modal-close-btn">✕</button>
      </div>
      <div class="sa-modal-body">

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:10px;">Dados da Imobiliária</div>
        <div class="form-group"><label>Nome da Imobiliária *</label><input id="nt-name" class="form-input" type="text" placeholder="Ex: Imobiliária ABC"></div>
        <div class="form-group"><label>Slug (URL única) *</label><input id="nt-slug" class="form-input" type="text" placeholder="imobiliaria-abc"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="nt-domain" class="form-input" type="text" placeholder="abc.imobipro.com.br"></div>
        <div class="form-group"><label>Plano</label>
          <select id="nt-plan" class="form-input">
            <option value="">Carregando planos…</option>
          </select>
        </div>

        <div style="height:1px;background:#e2e8f0;margin:16px 0;"></div>
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:10px;">Login do Administrador</div>
        <p style="font-size:12px;color:#64748b;margin-bottom:12px;">O admin desta imobiliária poderá criar e gerenciar os corretores dela.</p>
        <div class="form-group"><label>E-mail do Admin *</label><input id="nt-admin-email" class="form-input" type="email" placeholder="admin@imobiliariaabc.com.br"></div>
        <div class="form-group"><label>Senha *</label>
          <div style="position:relative;">
            <input id="nt-admin-password" class="form-input" type="password" placeholder="Mínimo 12 caracteres" style="padding-right:38px;">
            <button type="button" id="nt-pwd-toggle" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#94a3b8;font-size:16px;">👁</button>
          </div>
        </div>

        <div id="nt-msg" style="font-size:13px;margin-top:4px;"></div>
      </div>
      <div class="sa-modal-footer">
        <button id="nt-cancel" class="btn-secondary-sm">Cancelar</button>
        <button id="nt-save" class="btn-primary-sm">Criar Imobiliária</button>
      </div>
    </div>
  `,document.body.appendChild(t),b.from("plans").select("id, name").then(({data:c})=>{const s=document.getElementById("nt-plan");s&&c&&(s.innerHTML='<option value="">Sem plano</option>'+c.map(m=>`<option value="${m.id}">${f(m.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",c=>{const s=document.getElementById("nt-slug");s&&!s.dataset.manual&&(s.value=vn(c.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",c=>{c.target.dataset.manual="1"}),(i=document.getElementById("nt-pwd-toggle"))==null||i.addEventListener("click",()=>{const c=document.getElementById("nt-admin-password");c.type=c.type==="password"?"text":"password"});const n=()=>t.remove();(r=document.getElementById("sa-modal-close-btn"))==null||r.addEventListener("click",n),(l=document.getElementById("nt-cancel"))==null||l.addEventListener("click",n),t.addEventListener("click",c=>{c.target===t&&n()}),(d=document.getElementById("nt-save"))==null||d.addEventListener("click",async()=>{var _,p,g,h,L,B,C,T,q,M,O,P;const c=(p=(_=document.getElementById("nt-name"))==null?void 0:_.value)==null?void 0:p.trim(),s=(h=(g=document.getElementById("nt-slug"))==null?void 0:g.value)==null?void 0:h.trim(),m=(B=(L=document.getElementById("nt-domain"))==null?void 0:L.value)==null?void 0:B.trim(),u=(C=document.getElementById("nt-plan"))==null?void 0:C.value,E=(q=(T=document.getElementById("nt-admin-email"))==null?void 0:T.value)==null?void 0:q.trim(),w=(O=(M=document.getElementById("nt-admin-password"))==null?void 0:M.value)==null?void 0:O.trim(),x=document.getElementById("nt-msg"),k=document.getElementById("nt-save");if(!c||!s){x.textContent="❌ Nome e slug são obrigatórios.",x.style.color="#ef4444";return}if(!E){x.textContent="❌ Informe o e-mail do admin.",x.style.color="#ef4444";return}if(!w||w.length<12){x.textContent="❌ A senha precisa ter mínimo 6 caracteres.",x.style.color="#ef4444";return}k.disabled=!0,k.textContent="Criando…",x.textContent="⏳ Criando imobiliária…",x.style.color="#64748b";const{data:v,error:I}=await b.from("tenants").insert({name:c,slug:s,domain:m||null,plan_id:u||null,active:!0}).select();if(I){k.disabled=!1,k.textContent="Criar Imobiliária",x.textContent="❌ "+I.message,x.style.color="#ef4444";return}const $=(P=v==null?void 0:v[0])==null?void 0:P.id;x.textContent="⏳ Criando usuário admin…";const S=await ge({email:E,password:w,role:"admin",tenant_id:$});if(!(S!=null&&S.success)){k.disabled=!1,k.textContent="Criar Imobiliária",x.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+f((S==null?void 0:S.error)||"Desconhecido"),x.style.color="#f59e0b",n(),de().catch(()=>{});return}$&&(S!=null&&S.user_id)&&!(S!=null&&S.linked)&&await b.from("profiles").update({tenant_id:$}).eq("id",S.user_id),k.disabled=!1,k.textContent="Criar Imobiliária",S.email_sent===!1?(x.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${f(S.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${f(E)}</strong><br>
          Senha: <strong>${f(w)}</strong>
        </div>`,x.style.color="#0f172a"):(x.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",x.style.color="#22c55e",n(),de().catch(()=>{}))})}function bn(e){var a;(a=document.getElementById("tenant-panel"))==null||a.remove();const t=document.createElement("div");t.id="tenant-panel",t.style.cssText="position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;";const n=[{id:"properties",label:"🏠 Imóveis"},{id:"leads",label:"📋 Leads"},{id:"users",label:"👥 Corretores"},{id:"api",label:"🔗 Site & API"},{id:"config",label:"⚙️ Configurações"}];t.innerHTML=`
    <div style="background:#0a1628;padding:14px 24px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:10;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.3);">
      <button id="tp-back" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;padding:7px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">← Imobiliárias</button>
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
        ${e.logo_url?`<img src="${f(e.logo_url)}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0;">`:'<div style="width:36px;height:36px;background:rgba(255,255,255,.1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏢</div>'}
        <div style="min-width:0;">
          <div style="color:#fff;font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${f(e.name)}</div>
          <div style="color:#94a3b8;font-size:12px;">${f(e.slug||"")} · ${e.active!==!1?'<span style="color:#4ade80;">● Ativo</span>':'<span style="color:#f87171;">● Inativo</span>'}</div>
        </div>
      </div>
      <button id="tp-edit-btn" style="background:#c9a84c;border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">✏️ Editar dados</button>
    </div>
    <div style="background:#fff;border-bottom:2px solid #e2e8f0;padding:0 24px;display:flex;gap:0;flex-shrink:0;overflow-x:auto;">
      ${n.map((o,i)=>`<button class="tp-tab" data-tab="${o.id}" style="padding:14px 20px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:${i===0?"700":"500"};color:${i===0?"#2563eb":"#64748b"};border-bottom:2px solid ${i===0?"#2563eb":"transparent"};margin-bottom:-2px;white-space:nowrap;transition:all .15s;">${o.label}</button>`).join("")}
    </div>
    <div id="tp-content" style="padding:24px;flex:1;max-width:1200px;margin:0 auto;width:100%;box-sizing:border-box;"></div>
  `,document.body.appendChild(t),document.getElementById("tp-back").addEventListener("click",()=>t.remove()),document.getElementById("tp-edit-btn").addEventListener("click",()=>ga(e)),t.querySelectorAll(".tp-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".tp-tab").forEach(i=>{i.style.fontWeight="500",i.style.color="#64748b",i.style.borderBottomColor="transparent"}),o.style.fontWeight="700",o.style.color="#2563eb",o.style.borderBottomColor="#2563eb",ut(e,o.dataset.tab)})}),ut(e,"properties")}function hn(e,t){const n=document.getElementById("tp-prop-edit-modal");n&&n.remove();const a=document.createElement("div");a.id="tp-prop-edit-modal",a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;";const o=(l,d,c,s="text",m="")=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${d}</label>
      <input id="${l}" type="${s}" value="${f(String(c||""))}" ${m}
        style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;outline:none;">
    </div>`,i=(l,d,c,s)=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${d}</label>
      <select id="${l}" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;background:#fff;">
        ${c.map(([m,u])=>`<option value="${m}"${s===m?" selected":""}>${u}</option>`).join("")}
      </select>
    </div>`;a.innerHTML=`
    <div style="background:#fff;border-radius:16px;width:100%;max-width:680px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.25);">
      <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
        <h3 style="margin:0;font-size:17px;font-weight:700;color:#0f172a;">✏️ Editar Imóvel</h3>
        <button id="tpe-close" style="background:none;border:none;font-size:20px;cursor:pointer;color:#94a3b8;line-height:1;">✕</button>
      </div>
      <div style="padding:24px;overflow-y:auto;display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        ${o("tpe-title","TÍTULO *",e.title,"text",'style="grid-column:span 2;border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;"')}
        ${o("tpe-price","PREÇO (R$)",e.price)}
        ${o("tpe-area","ÁREA (m²)",e.area)}
        ${o("tpe-bedrooms","DORMITÓRIOS",e.bedrooms,"number")}
        ${o("tpe-suites","SUÍTES",e.suites,"number")}
        ${o("tpe-parking","VAGAS",e.parking,"number")}
        ${o("tpe-reference","REFERÊNCIA",e.reference)}
        ${o("tpe-city","CIDADE",e.city)}
        ${o("tpe-neighborhood","BAIRRO",e.neighborhood)}
        ${o("tpe-rua","RUA",e.rua)}
        ${o("tpe-numero","NÚMERO",e.numero)}
        ${i("tpe-construction","STATUS DA OBRA",[["","Selecione"],["pronto","Pronto"],["pre-lancamento","Pré-lançamento"],["lancamento","Lançamento"],["em-obra","Em obra"]],e.construction_status)}
        ${i("tpe-published","PUBLICAÇÃO",[["true","Publicado"],["false","Rascunho"]],String(e.published))}
        <div style="grid-column:span 2;display:flex;flex-direction:column;gap:4px;">
          <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">DESCRIÇÃO</label>
          <textarea id="tpe-description" rows="4" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;resize:vertical;font-family:inherit;">${f(e.description||"")}</textarea>
        </div>
        <div id="tpe-msg" style="grid-column:span 2;font-size:13px;min-height:16px;"></div>
      </div>
      <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;justify-content:flex-end;flex-shrink:0;">
        <button id="tpe-cancel" style="background:#f1f5f9;color:#475569;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">Cancelar</button>
        <button id="tpe-save" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 24px;cursor:pointer;font-size:14px;font-weight:700;">💾 Salvar</button>
      </div>
    </div>`,document.body.appendChild(a);const r=()=>a.remove();document.getElementById("tpe-close").addEventListener("click",r),document.getElementById("tpe-cancel").addEventListener("click",r),a.addEventListener("click",l=>{l.target===a&&r()}),document.getElementById("tpe-save").addEventListener("click",async()=>{const l=document.getElementById("tpe-save"),d=document.getElementById("tpe-msg"),c=document.getElementById("tpe-title").value.trim();if(!c){d.style.color="#ef4444",d.textContent="Título é obrigatório.";return}l.disabled=!0,l.textContent="Salvando…";const s={title:c,price:document.getElementById("tpe-price").value.trim()||null,area:document.getElementById("tpe-area").value.trim()||null,bedrooms:document.getElementById("tpe-bedrooms").value||null,suites:document.getElementById("tpe-suites").value||null,parking:document.getElementById("tpe-parking").value||null,reference:document.getElementById("tpe-reference").value.trim()||null,city:document.getElementById("tpe-city").value.trim()||null,neighborhood:document.getElementById("tpe-neighborhood").value.trim()||null,rua:document.getElementById("tpe-rua").value.trim()||null,numero:document.getElementById("tpe-numero").value.trim()||null,construction_status:document.getElementById("tpe-construction").value||null,published:document.getElementById("tpe-published").value==="true",description:document.getElementById("tpe-description").value.trim()||null},{error:m}=await b.from("properties").update(s).eq("id",e.id);if(m){d.style.color="#ef4444",d.textContent="Erro: "+m.message,l.disabled=!1,l.textContent="💾 Salvar";return}d.style.color="#16a34a",d.textContent="✅ Salvo!",setTimeout(()=>{r(),typeof t=="function"&&t()},800)})}async function ut(e,t){var i,r,l,d,c;const n=document.getElementById("tp-content");if(!n)return;n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>';const a=()=>ut(e,t),o=(s,m)=>`background:${s};color:${m};border:none;border-radius:6px;padding:5px 12px;cursor:pointer;font-size:12px;font-weight:600;white-space:nowrap;`;if(t==="properties"){const{data:s}=await b.from("properties").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1});if(!(s!=null&&s.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>';return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${s.length} imóvel(is)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:600px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">IMÓVEL</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">CIDADE</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">PREÇO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody id="tp-prop-tbody">${s.map(m=>{var u;return`
            <tr data-pid="${m.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  ${(u=m.images)!=null&&u[0]?`<img src="${m.images[0]}" style="width:52px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;">`:'<div style="width:52px;height:38px;background:#e2e8f0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>'}
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${f(m.title||"")}</div><div style="font-size:11px;color:#94a3b8;">${f(m.reference||"")}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${f([m.neighborhood,m.city].filter(Boolean).join(", "))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">${f(De(m.price,"pt"))}</td>
              <td style="padding:12px 16px;text-align:center;">${m.published?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Publicado</span>':'<span style="background:#f1f5f9;color:#64748b;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Rascunho</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-prop-edit" data-pid="${m.id}" style="${o("#eff6ff","#1d4ed8")}">✏️ Editar</button>
                  <button class="tp-prop-toggle" data-pid="${m.id}" data-pub="${m.published?"1":"0"}" style="${o(m.published?"#fef3c7":"#dcfce7",m.published?"#92400e":"#15803d")}">${m.published?"Despublicar":"Publicar"}</button>
                  <button class="tp-prop-del" data-pid="${m.id}" style="${o("#fee2e2","#dc2626")}">Excluir</button>
                </div>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`,n.querySelectorAll(".tp-prop-edit").forEach(m=>{m.addEventListener("click",()=>{const u=Number(m.dataset.pid),E=s.find(w=>w.id===u);E&&hn(E,a)})}),n.querySelectorAll(".tp-prop-toggle").forEach(m=>{m.addEventListener("click",async()=>{const u=Number(m.dataset.pid),E=m.dataset.pub==="1";m.disabled=!0,m.textContent="…",await b.from("properties").update({published:!E}).eq("id",u),a()})}),n.querySelectorAll(".tp-prop-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Excluir este imóvel permanentemente?")&&(m.disabled=!0,m.textContent="…",await b.from("properties").delete().eq("id",Number(m.dataset.pid)),a())})})}if(t==="leads"){const{data:s}=await b.from("leads").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}).limit(200);if(!(s!=null&&s.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">📋</div><p style="font-size:14px;">Nenhum lead ainda.</p></div>';return}const m=u=>({novo:"#dbeafe,#1d4ed8",contato:"#fef3c7,#92400e",proposta:"#ede9fe,#6d28d9",fechado:"#dcfce7,#15803d"})[u]||"#f1f5f9,#64748b";n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${s.length} lead(s)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:560px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">NOME</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">CONTATO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">ETAPA</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">DATA</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody>${s.map(u=>{const[E,w]=m(u.stage||u.status||"").split(","),x=(u.phone||"").replace(/\D/g,"");return`<tr data-lid="${u.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${f(u.name||"")}</td>
              <td style="padding:12px 16px;">
                <div style="font-size:13px;color:#475569;">${f(u.phone||"—")}</div>
                <div style="font-size:11px;color:#94a3b8;">${f(u.email||"")}</div>
              </td>
              <td style="padding:12px 16px;"><span style="background:${E};color:${w};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${f(u.stage||u.status||"Novo")}</span></td>
              <td style="padding:12px 16px;font-size:12px;color:#94a3b8;">${new Date(u.created_at).toLocaleDateString("pt-BR")}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;align-items:center;">
                  ${x?`<a href="https://wa.me/${x}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;" title="WhatsApp" onclick="fbq('track', 'Contact')"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg></a>`:""}
                  <button class="tp-lead-del" data-lid="${u.id}" style="${o("#fee2e2","#dc2626")}">Excluir</button>
                </div>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`,n.querySelectorAll(".tp-lead-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Excluir este lead permanentemente?")&&(u.disabled=!0,u.textContent="…",await b.from("leads").delete().eq("id",u.dataset.lid),a())})})}if(t==="users"){const{data:s}=await b.from("profiles").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}),m='<button id="tp-add-corretor" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;font-weight:600;">+ Adicionar Usuário</button>';if(!(s!=null&&s.length)){n.innerHTML=`<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">👥</div><p style="font-size:14px;margin-bottom:16px;">Nenhum corretor cadastrado ainda.</p>${m}</div>`,(i=n.querySelector("#tp-add-corretor"))==null||i.addEventListener("click",()=>st(e.id,a));return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${s.length} usuário(s)</h3>
          ${m}
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:520px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">USUÁRIO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">FUNÇÃO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody>${s.map(u=>`
            <tr data-uid="${u.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${f(u.name||u.email||"—")}</div><div style="font-size:11px;color:#94a3b8;">${f(u.email||"")}</div></td>
              <td style="padding:12px 16px;">
                <select class="tp-role-sel" data-uid="${u.id}" style="border:1px solid #e2e8f0;border-radius:6px;padding:4px 8px;font-size:13px;color:#0f172a;background:#fff;cursor:pointer;">
                  <option value="admin" ${u.role==="admin"?"selected":""}>Admin</option>
                  <option value="corretor" ${u.role==="corretor"?"selected":""}>Corretor</option>
                </select>
              </td>
              <td style="padding:12px 16px;text-align:center;">${u.active!==!1?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Ativo</span>':'<span style="background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Pausado</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-user-toggle" data-uid="${u.id}" data-active="${u.active!==!1?"1":"0"}" style="${o(u.active!==!1?"#fef3c7":"#dcfce7",u.active!==!1?"#92400e":"#15803d")}">${u.active!==!1?"Pausar":"Ativar"}</button>
                  <button class="tp-user-del" data-uid="${u.id}" style="${o("#fee2e2","#dc2626")}">Remover</button>
                </div>
              </td>
            </tr>`).join("")}
          </tbody>
        </table></div>
      </div>`,(r=n.querySelector("#tp-add-corretor"))==null||r.addEventListener("click",()=>st(e.id,a)),n.querySelectorAll(".tp-role-sel").forEach(u=>{u.addEventListener("change",async()=>{const E=u.dataset.uid;u.disabled=!0,await b.from("profiles").update({role:u.value}).eq("id",E),u.disabled=!1})}),n.querySelectorAll(".tp-user-toggle").forEach(u=>{u.addEventListener("click",async()=>{const E=u.dataset.uid,w=u.dataset.active==="1";u.disabled=!0,u.textContent="…",await b.from("profiles").update({active:!w}).eq("id",E),a()})}),n.querySelectorAll(".tp-user-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover este usuário da imobiliária? O acesso ao sistema será excluído permanentemente.")&&(u.disabled=!0,u.textContent="…",await ge({action:"delete",userId:u.dataset.uid}),a())})})}if(t==="api"){const s="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api",m=(e.domain||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim(),u=m?`https://${m}`:`https://omarcorretor.com.br/demo.html?key=${e.id}`,E=m?"🌐 Site da Imobiliária":"🌐 Site Demonstração",w=m?"Site oficial da imobiliária integrado ao CRM.":"Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.",x=m?"Abrir site →":"Abrir site demo →";n.innerHTML=`
      <div style="display:grid;gap:20px;max-width:800px;">
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🔑 Chave de API</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Use para conectar qualquer site externo ao CRM desta imobiliária.</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <input type="text" value="${f(e.id)}" readonly style="flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:monospace;font-size:13px;background:#f8fafc;min-width:0;">
            <button id="tp-copy-key" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">${E}</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">${w}</p>
          <a href="${f(u)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">${x}</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${f(u)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/properties?key=${f(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/properties/{id}?key=${f(e.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${s}/leads?key=${f(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/settings?key=${f(e.id)}</div>
          </div>
        </div>
      </div>`,(l=document.getElementById("tp-copy-key"))==null||l.addEventListener("click",()=>{var I;(I=navigator.clipboard)==null||I.writeText(e.id);const k=document.getElementById("tp-copy-key"),v=k.textContent;k.textContent="✅ Copiada!",setTimeout(()=>{k.textContent=v},2e3)})}if(t==="config"){const{data:s}=await b.from("settings").select("key,value").eq("tenant_id",e.id),m={};s==null||s.forEach(E=>{m[E.key]=E.value});const u=(E,w)=>`
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${E}</div>
        <div style="font-size:14px;color:#0f172a;">${f(String(w||"—"))}</div>
      </div>`;n.innerHTML=`
      <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);max-width:560px;">
        <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 20px;">⚙️ Configurações da imobiliária</h3>
        ${u("NOME DA EMPRESA",m["company.name"]||e.name)}
        ${u("TELEFONE",m["company.phone"])}
        ${u("E-MAIL",m["company.email"])}
        ${u("WHATSAPP",m["company.whatsapp"])}
        ${u("CIDADE",m["company.city"])}
        ${u("DOMÍNIO DO SITE",e.domain)}
        ${u("PLANO",((d=e.plans)==null?void 0:d.name)||"Sem plano")}
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
          <button id="tp-open-edit" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">✏️ Editar dados completos</button>
        </div>
      </div>`,(c=document.getElementById("tp-open-edit"))==null||c.addEventListener("click",()=>ga(e))}}function ga(e){var c,s,m,u,E,w,x,k;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
    <div class="sa-modal" style="max-width:560px;">
      <div class="sa-modal-header">
        <h3>Editar Imobiliária</h3>
        <button class="sa-modal-close" id="et-close">✕</button>
      </div>

      <!-- Abas -->
      <div style="display:flex;border-bottom:1px solid #e2e8f0;padding:0 20px;gap:4px;flex-shrink:0;">
        <button id="et-tab-dados"   style="padding:10px 16px;font-size:13px;font-weight:600;border:none;background:none;cursor:pointer;border-bottom:2px solid #2563eb;color:#2563eb;">Dados</button>
        <button id="et-tab-config"  style="padding:10px 16px;font-size:13px;font-weight:500;border:none;background:none;cursor:pointer;border-bottom:2px solid transparent;color:#64748b;">⚙️ Contato</button>
        <button id="et-tab-api"     style="padding:10px 16px;font-size:13px;font-weight:500;border:none;background:none;cursor:pointer;border-bottom:2px solid transparent;color:#64748b;">🔑 API</button>
      </div>

      <!-- Aba: Dados -->
      <div id="et-pane-dados" class="sa-modal-body">
        <div style="display:flex;align-items:center;gap:16px;">
          <div id="et-logo-preview" style="width:72px;height:72px;border-radius:12px;border:2px dashed #e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#f8fafc;flex-shrink:0;cursor:pointer;" title="Clique para alterar a logo">
            ${e.logo_url?`<img src="${f(e.logo_url)}" style="width:100%;height:100%;object-fit:cover;">`:'<span style="font-size:28px;">🏢</span>'}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · 256×256px</div>
          </div>
        </div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${f(e.name||"")}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${f(e.slug||"")}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${f(e.domain||"")}" placeholder="abc.imobipro.com.br"></div>
        <div class="form-group"><label>Plano</label>
          <select id="et-plan" class="form-input"><option value="">Sem plano</option></select>
        </div>
        <div style="height:1px;background:#e2e8f0;"></div>
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;">Criar / Trocar Admin</div>
        <p style="font-size:12px;color:#64748b;margin:0;">Opcional: cria um novo acesso de administrador.</p>
        <div class="form-group"><label>E-mail do Admin</label><input id="et-admin-email" class="form-input" type="email" placeholder="admin@imobiliaria.com.br"></div>
        <div class="form-group"><label>Senha</label>
          <div style="position:relative;">
            <input id="et-admin-password" class="form-input" type="password" placeholder="Mínimo 12 caracteres" style="padding-right:38px;">
            <button type="button" id="et-pwd-toggle" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#94a3b8;font-size:16px;">👁</button>
          </div>
        </div>
        <div id="et-msg" style="font-size:13px;"></div>
      </div>

      <!-- Aba: Contato -->
      <div id="et-pane-config" class="sa-modal-body" style="display:none;">
        <div id="et-cfg-loading" style="text-align:center;padding:32px;color:#64748b;">⏳ Carregando…</div>
      </div>

      <!-- Aba: API -->
      <div id="et-pane-api" class="sa-modal-body" style="display:none;">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px;">
          <div style="font-size:12px;font-weight:700;color:#1d4ed8;margin-bottom:6px;">🔑 Chave de API desta Imobiliária</div>
          <p style="font-size:12px;color:#1e40af;margin:0 0 10px;">Use esta chave para conectar qualquer site ao CRM.</p>
          <div style="display:flex;gap:8px;align-items:center;">
            <input id="et-api-key" class="form-input" type="text" value="${f(e.id||"")}" readonly
              style="font-family:monospace;font-size:11px;background:#fff;color:#1e3a5f;flex:1;letter-spacing:.02em;">
            <button id="et-copy-key" class="btn-secondary-sm" style="white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Endpoints disponíveis</div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([v,I,$])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${v==="GET"?"#dcfce7":"#fef9c3"};color:${v==="GET"?"#15803d":"#854d0e"};">${v}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${I}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${$}</div>
            </div>`).join("")}
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Exemplo rápido (JavaScript)</div>
        <pre style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;font-size:11px;overflow-x:auto;margin:0;line-height:1.6;"><code>const KEY = '${f(e.id)}'
const API = '${a}'

// Listar imóveis
const res = await fetch(\`\${API}/properties?key=\${KEY}&limit=12\`)
const { data } = await res.json()

// Enviar lead
await fetch(\`\${API}/leads?key=\${KEY}\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'João', phone: '47999001234' })
})</code></pre>
      </div>

      <div class="sa-modal-footer">
        <button id="et-delete" class="btn-danger-sm">🗑️ Excluir</button>
        <button id="et-cancel" class="btn-secondary-sm">Cancelar</button>
        <button id="et-save" class="btn-primary-sm">Salvar</button>
      </div>
    </div>
  `,document.body.appendChild(n),b.from("plans").select("id, name").then(({data:v})=>{const I=document.getElementById("et-plan");I&&v&&(I.innerHTML='<option value="">Sem plano</option>'+v.map($=>`<option value="${$.id}"${String($.id)===String(e.plan_id)?" selected":""}>${f($.name)}</option>`).join(""))}),(c=document.getElementById("et-logo-input"))==null||c.addEventListener("change",v=>{const I=v.target.files[0];if(!I)return;const $=URL.createObjectURL(I),S=document.getElementById("et-logo-preview");S&&(S.innerHTML=`<img src="${$}" style="width:100%;height:100%;object-fit:cover;">`)}),(s=document.getElementById("et-logo-preview"))==null||s.addEventListener("click",()=>{var v;(v=document.getElementById("et-logo-input"))==null||v.click()}),(m=document.getElementById("et-pwd-toggle"))==null||m.addEventListener("click",()=>{const v=document.getElementById("et-admin-password");v.type=v.type==="password"?"text":"password"}),(u=document.getElementById("et-copy-key"))==null||u.addEventListener("click",()=>{var S,_;const v=(S=document.getElementById("et-api-key"))==null?void 0:S.value;if(!v)return;(_=navigator.clipboard)==null||_.writeText(v);const I=document.getElementById("et-copy-key"),$=I.textContent;I.textContent="✅ Copiada!",setTimeout(()=>{I.textContent=$},2e3)});const o=["dados","config","api"];function i(v){o.forEach(I=>{document.getElementById(`et-pane-${I}`).style.display=I===v?"":"none";const $=document.getElementById(`et-tab-${I}`);$.style.borderBottomColor=I===v?"#2563eb":"transparent",$.style.color=I===v?"#2563eb":"#64748b",$.style.fontWeight=I===v?"600":"500"}),v==="config"&&l()}o.forEach(v=>{var I;return(I=document.getElementById(`et-tab-${v}`))==null?void 0:I.addEventListener("click",()=>i(v))});let r=!1;async function l(){var $;if(r)return;r=!0;const{data:v}=await b.from("settings").select("key,value").eq("tenant_id",e.id),I={};v==null||v.forEach(S=>{I[S.key]=S.value}),document.getElementById("et-pane-config").innerHTML=`
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${f(I["company.whatsapp"]||"")}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${f(I["company.phone"]||"")}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${f(I["company.email"]||"")}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${f(I["company.city"]||I["company.address"]||"")}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${f(I["company.slogan"]||"")}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `,($=document.getElementById("et-cfg-save"))==null||$.addEventListener("click",async()=>{const S=document.getElementById("et-cfg-save"),_=document.getElementById("et-cfg-msg");S.disabled=!0,S.textContent="Salvando…",_.textContent="",_.style.color="#64748b";const p=document.getElementById("et-cfg-wa").value.trim().replace(/\D/g,""),g=document.getElementById("et-cfg-phone").value.trim(),h=document.getElementById("et-cfg-email").value.trim(),L=document.getElementById("et-cfg-city").value.trim(),B=document.getElementById("et-cfg-slogan").value.trim(),{error:C}=await b.from("settings").upsert([{key:"company.whatsapp",value:p,tenant_id:e.id},{key:"company.phone",value:g,tenant_id:e.id},{key:"company.email",value:h,tenant_id:e.id},{key:"company.city",value:L,tenant_id:e.id},{key:"company.address",value:L,tenant_id:e.id},{key:"company.slogan",value:B,tenant_id:e.id}],{onConflict:"tenant_id,key"});S.disabled=!1,S.textContent="💾 Salvar configurações",C?(_.textContent="❌ "+C.message,_.style.color="#ef4444"):(_.textContent="✅ Configurações salvas!",_.style.color="#22c55e")})}const d=()=>n.remove();(E=document.getElementById("et-close"))==null||E.addEventListener("click",d),(w=document.getElementById("et-cancel"))==null||w.addEventListener("click",d),n.addEventListener("click",v=>{v.target===n&&d()}),(x=document.getElementById("et-delete"))==null||x.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const I=document.getElementById("et-delete");I.disabled=!0,I.textContent="Excluindo…";const{error:$}=await b.from("tenants").delete().eq("id",e.id);if($){alert("Erro ao excluir: "+$.message),I.disabled=!1,I.textContent="🗑️ Excluir";return}d(),de()}),(k=document.getElementById("et-save"))==null||k.addEventListener("click",async()=>{var T,q,M,O,P,ne,re,Se,_e,F,ye,It;const v=(q=(T=document.getElementById("et-name"))==null?void 0:T.value)==null?void 0:q.trim(),I=(O=(M=document.getElementById("et-slug"))==null?void 0:M.value)==null?void 0:O.trim(),$=(ne=(P=document.getElementById("et-domain"))==null?void 0:P.value)==null?void 0:ne.trim(),S=(re=document.getElementById("et-plan"))==null?void 0:re.value,_=(_e=(Se=document.getElementById("et-admin-email"))==null?void 0:Se.value)==null?void 0:_e.trim(),p=(ye=(F=document.getElementById("et-admin-password"))==null?void 0:F.value)==null?void 0:ye.trim(),g=(It=document.getElementById("et-logo-input"))==null?void 0:It.files[0],h=document.getElementById("et-msg"),L=document.getElementById("et-save");if(!v){h.textContent="❌ Nome é obrigatório.",h.style.color="#ef4444";return}L.disabled=!0,L.textContent="Salvando…",h.textContent="⏳ Salvando…",h.style.color="#64748b";let B=e.logo_url;if(g)try{const z=await je(g,256,.85),kt=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:ha}=await b.storage.from("imoveis").upload(kt,z,{contentType:"image/jpeg",upsert:!0});if(!ha){const{data:{publicUrl:xa}}=b.storage.from("imoveis").getPublicUrl(kt);B=xa}}catch(z){console.error("Logo upload:",z)}const{error:C}=await b.from("tenants").update({name:v,slug:I||e.slug,domain:$||null,plan_id:S||null,logo_url:B}).eq("id",e.id);if(C){L.disabled=!1,L.textContent="Salvar",h.textContent="❌ "+C.message,h.style.color="#ef4444";return}if(_&&p&&p.length>=6){h.textContent="⏳ Criando usuário admin…";const z=await ge({email:_,password:p,role:"admin",tenant_id:e.id});z!=null&&z.success?(z!=null&&z.user_id&&!(z!=null&&z.linked)&&await b.from("profiles").update({tenant_id:e.id}).eq("id",z.user_id),h.textContent="✅ Salvo e admin criado!",h.style.color="#22c55e"):(h.textContent="⚠️ Salvo, mas erro ao criar admin: "+((z==null?void 0:z.error)||"Tente novamente"),h.style.color="#f59e0b")}else h.textContent="✅ Imobiliária atualizada!",h.style.color="#22c55e";L.disabled=!1,L.textContent="Salvar",setTimeout(()=>{d(),de()},1200)})}const Ut=[{key:"name",label:"Nome",required:!0},{key:"phone",label:"Telefone",required:!1},{key:"email",label:"E-mail",required:!1},{key:"notes",label:"Notas",required:!1}];let Qe=[],ve=[],Ve={};function xn(){var e;(e=document.getElementById("btn-import-leads"))==null||e.addEventListener("click",wn)}function wn(){Qe=[],ve=[],Ve={};const e=document.createElement("div");e.id="import-leads-overlay",e.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9000;display:flex;align-items:center;justify-content:center;",e.innerHTML=`
    <div id="import-leads-modal" style="background:#fff;border-radius:12px;width:min(680px,96vw);max-height:90vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.22);padding:32px 28px 24px;position:relative;">
      <button onclick="document.getElementById('import-leads-overlay').remove()" style="position:absolute;top:14px;right:18px;background:none;border:none;font-size:22px;cursor:pointer;color:#888;">✕</button>
      <h2 style="margin:0 0 6px;font-size:1.2rem;color:#1e293b;">📥 Importar Contatos</h2>
      <p style="margin:0 0 20px;color:#64748b;font-size:.9rem;">Envie um arquivo CSV ou Excel (.xlsx) com sua lista de contatos.</p>

      <!-- Step 1: Upload -->
      <div id="import-step-upload">
        <div id="import-drop-zone" style="border:2px dashed #c7d2e0;border-radius:10px;padding:36px 24px;text-align:center;cursor:pointer;transition:border-color .2s;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" style="margin-bottom:10px;"><path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4M12 3v11M8 7l4-4 4 4"/></svg>
          <p style="margin:0 0 6px;color:#475569;font-weight:600;">Arraste o arquivo aqui</p>
          <p style="margin:0;color:#94a3b8;font-size:.82rem;">ou clique para selecionar &nbsp;·&nbsp; CSV ou XLSX</p>
        </div>
        <input type="file" id="import-file-input" accept=".csv,.xlsx,.xls" style="display:none">
        <div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <button onclick="downloadImportTemplate()" style="background:none;border:none;color:#3b82f6;cursor:pointer;font-size:.85rem;padding:0;text-decoration:underline;">⬇ Baixar modelo CSV</button>
          <span id="import-file-status" style="color:#64748b;font-size:.85rem;"></span>
        </div>
        <p id="import-upload-error" style="color:#ef4444;font-size:.83rem;margin:10px 0 0;display:none;"></p>
      </div>

      <!-- Step 2: Mapping -->
      <div id="import-step-map" style="display:none;">
        <div style="margin-bottom:14px;">
          <label style="font-size:.85rem;font-weight:600;color:#374151;display:block;margin-bottom:4px;">Etapa (estágio) dos leads importados</label>
          <select id="import-stage-sel" style="width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:7px;font-size:.9rem;color:#1e293b;">
            <option value="">Carregando etapas…</option>
          </select>
        </div>
        <p style="font-size:.85rem;font-weight:600;color:#374151;margin:0 0 10px;">Mapeie as colunas do arquivo:</p>
        <div id="import-field-rows" style="display:grid;gap:10px;"></div>
        <div style="margin-top:18px;border:1px solid #e2e8f0;border-radius:8px;overflow:auto;">
          <p style="font-size:.78rem;color:#94a3b8;margin:8px 12px 4px;">Pré-visualização (5 primeiras linhas)</p>
          <div id="import-preview-wrap" style="overflow-x:auto;"></div>
        </div>
        <div style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end;">
          <button onclick="resetImportStep()" style="padding:9px 20px;border:1px solid #d1d5db;border-radius:7px;background:#fff;cursor:pointer;font-size:.9rem;color:#374151;">← Voltar</button>
          <button onclick="confirmImportLeads()" id="btn-confirm-import" style="padding:9px 22px;background:#22c55e;color:#fff;border:none;border-radius:7px;cursor:pointer;font-weight:600;font-size:.9rem;">Importar leads</button>
        </div>
      </div>

      <!-- Step 3: Result -->
      <div id="import-step-result" style="display:none;text-align:center;padding:20px 0;">
        <div id="import-result-icon" style="font-size:3rem;margin-bottom:12px;">✅</div>
        <p id="import-result-msg" style="font-size:1rem;font-weight:600;color:#1e293b;margin:0 0 18px;"></p>
        <button onclick="document.getElementById('import-leads-overlay').remove();reloadFunilData()" style="padding:10px 26px;background:#3b82f6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Ver leads no funil</button>
      </div>
    </div>`,document.body.appendChild(e),fa();const t=document.getElementById("import-drop-zone"),n=document.getElementById("import-file-input");function a(i){i.preventDefault()}document.addEventListener("dragover",a),document.addEventListener("drop",a),t.addEventListener("click",()=>n.click()),t.addEventListener("dragenter",i=>{i.preventDefault(),t.style.borderColor="#3b82f6",t.style.background="#eff6ff"}),t.addEventListener("dragover",i=>{i.preventDefault(),t.style.borderColor="#3b82f6",t.style.background="#eff6ff"}),t.addEventListener("dragleave",i=>{t.contains(i.relatedTarget)||(t.style.borderColor="#c7d2e0",t.style.background="")}),t.addEventListener("drop",i=>{var l,d;i.preventDefault(),t.style.borderColor="#c7d2e0",t.style.background="";const r=(d=(l=i.dataTransfer)==null?void 0:l.files)==null?void 0:d[0];r&&Pt(r)}),n.addEventListener("change",i=>{var l;const r=(l=i.target.files)==null?void 0:l[0];r&&Pt(r),i.target.value=""});const o=new MutationObserver(()=>{document.getElementById("import-leads-overlay")||(document.removeEventListener("dragover",a),document.removeEventListener("drop",a),o.disconnect())});o.observe(document.body,{childList:!0})}async function fa(){const e=document.getElementById("import-stage-sel");if(!e)return;const t=await getTenantId(),{data:n}=await b.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("position");n&&n.length?(e.innerHTML=n.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),n[0].id,e.onchange=()=>{e.value}):e.innerHTML='<option value="">— sem etapas cadastradas —</option>'}function Pt(e){if(!e)return;const t=document.getElementById("import-file-status"),n=document.getElementById("import-upload-error");n.style.display="none";const a=e.name.toLowerCase();if(t.textContent=`📄 ${e.name} (${(e.size/1024).toFixed(1)} KB)`,a.endsWith(".csv")){const o=new FileReader;o.onload=i=>{const r=En(i.target.result);if(r.error){n.textContent=r.error,n.style.display="";return}ve=r.headers,Qe=r.rows,va()},o.readAsText(e,"UTF-8")}else if(a.endsWith(".xlsx")||a.endsWith(".xls")){const o=new FileReader;o.onload=i=>In(i.target.result),o.readAsArrayBuffer(e)}else n.textContent="Formato não suportado. Use CSV ou XLSX.",n.style.display=""}function En(e){const t=e.split(`
`)[0]||"",n=t.split(";").length>t.split(",").length?";":",",a=e.split(`
`).map(l=>l.trimEnd()).filter(l=>l.length);if(a.length<2)return{error:"Arquivo vazio ou sem dados."};function o(l){const d=[];let c="",s=!1;for(let m=0;m<l.length;m++){const u=l[m];u==='"'?s&&l[m+1]==='"'?(c+='"',m++):s=!s:u===n&&!s?(d.push(c.trim()),c=""):c+=u}return d.push(c.trim()),d}const i=o(a[0]).map(l=>l.replace(/^["']+|["']+$/g,"")),r=a.slice(1).map(o);return{headers:i,rows:r}}async function In(e){const t=document.getElementById("import-upload-error");try{window.XLSX||await new Promise((i,r)=>{const l=document.createElement("script");l.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",l.onload=i,l.onerror=r,document.head.appendChild(l)});const n=window.XLSX.read(e,{type:"array"}),a=n.Sheets[n.SheetNames[0]],o=window.XLSX.utils.sheet_to_json(a,{header:1,defval:""});if(!o||o.length<2){t.textContent="Planilha vazia.",t.style.display="";return}ve=o[0].map(String),Qe=o.slice(1),va()}catch(n){t.textContent="Erro ao ler o arquivo Excel: "+n.message,t.style.display=""}}function kn(e,t){for(let n=0;n<e.length;n++){const a=e[n].toLowerCase();if(t.some(o=>a.includes(o)))return n}return""}function va(){document.getElementById("import-step-upload").style.display="none",document.getElementById("import-step-map").style.display="";const e=document.getElementById("import-field-rows"),t={name:["nome","name","contact","cliente","contato"],phone:["tel","fone","celular","whatsapp","phone","mobile"],email:["email","e-mail","mail"],notes:["obs","nota","note","comment","coment","descri"]},n='<option value="">— ignorar —</option>'+ve.map((a,o)=>`<option value="${o}">${f(a)}</option>`).join("");e.innerHTML=Ut.map(a=>{const o=kn(ve,t[a.key]||[]);return Ve[a.key]=o!==""?parseInt(o):"",`
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;">
        <label style="font-size:.87rem;color:#374151;font-weight:500;">${a.label}${a.required?' <span style="color:#ef4444">*</span>':""}</label>
        <select id="import-map-${a.key}" onchange="importMapping['${a.key}']=this.value===''?'':parseInt(this.value)"
                style="padding:7px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:.87rem;">
          ${n}
        </select>
      </div>`}).join(""),Ut.forEach(a=>{const o=document.getElementById(`import-map-${a.key}`);o&&Ve[a.key]!==""&&(o.value=Ve[a.key])}),$n(),fa()}function $n(){const e=document.getElementById("import-preview-wrap");if(!e)return;const t=Qe.slice(0,5);if(!t.length){e.innerHTML='<p style="padding:10px;color:#94a3b8;font-size:.8rem;">Sem dados</p>';return}const n=`<tr>${ve.map(o=>`<th style="padding:6px 10px;background:#f1f5f9;font-size:.78rem;white-space:nowrap;border:1px solid #e2e8f0;">${f(o)}</th>`).join("")}</tr>`,a=t.map(o=>`<tr>${ve.map((i,r)=>`<td style="padding:5px 10px;font-size:.78rem;border:1px solid #e2e8f0;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis;">${f(String(o[r]??""))}</td>`).join("")}</tr>`).join("");e.innerHTML=`<table style="border-collapse:collapse;min-width:100%;">${n}${a}</table>`}function Sn(){return window.Chart?Promise.resolve():new Promise((e,t)=>{const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}function _n(e,t,n){const a=e.querySelector("#ldp-tag-badge-area"),o=e.querySelector("#ldp-tag-add-btn"),i=e.querySelector("#ldp-tag-dropdown"),r=e.querySelector("#ldp-tag-search"),l=e.querySelector("#ldp-tag-opt-list"),d=e.querySelector("#ldp-tag-show-create"),c=e.querySelector("#ldp-tag-create-row"),s=e.querySelector("#ldp-tag-new-name"),m=e.querySelector("#ldp-tag-new-color"),u=e.querySelector("#ldp-tag-create-btn");if(!a||!o||!i)return;function E(){return[...a.querySelectorAll(".ldp-tag-badge[data-tag]")].map($=>$.dataset.tag)}function w($){if(!$.length){a.innerHTML='<span class="ldp-tag-empty">Nenhuma tag — clique em + para adicionar</span>';return}a.innerHTML=$.map(S=>{const p=(n[S]||{}).color||"#6366F1";return`<span class="ldp-tag-badge" data-tag="${f(S)}" style="background:${p}18;color:${p};border-color:${p}55;">
        ${f(S)}<span class="ldp-tag-rm" data-tag="${f(S)}">×</span>
      </span>`}).join("")}function x($=""){const S=E(),_=$.toLowerCase().trim(),p=t.filter(g=>!_||g.name.toLowerCase().includes(_));if(!p.length){l.innerHTML='<div class="ldp-tag-opt-empty">Nenhuma tag encontrada</div>';return}l.innerHTML=p.map(g=>{const h=S.includes(g.name);return`<div class="ldp-tag-opt${h?" active":""}" data-tag="${f(g.name)}" style="--tc:${g.color}">
        <span class="ldp-tag-opt-dot" style="background:${g.color}"></span>
        <span class="ldp-tag-opt-name">${f(g.name)}</span>
        ${h?'<span class="ldp-tag-opt-check">✓</span>':""}
      </div>`}).join("")}function k(){i.classList.remove("hidden"),x(""),r.value="",c.classList.add("hidden"),r.focus()}function v(){i.classList.add("hidden")}o.addEventListener("click",$=>{$.stopPropagation(),i.classList.contains("hidden")?k():v()}),document.addEventListener("mousedown",function $(S){e.contains(S.target)||(v(),document.removeEventListener("mousedown",$))}),i.addEventListener("mousedown",$=>$.stopPropagation()),r.addEventListener("input",()=>x(r.value)),l.addEventListener("click",$=>{const S=$.target.closest(".ldp-tag-opt");if(!S)return;const _=S.dataset.tag,p=E();p.includes(_)?w(p.filter(g=>g!==_)):w([...p,_]),x(r.value)}),a.addEventListener("click",$=>{const S=$.target.closest(".ldp-tag-rm");if(!S)return;const _=S.dataset.tag;w(E().filter(p=>p!==_))}),d.addEventListener("click",()=>{c.classList.toggle("hidden"),c.classList.contains("hidden")||s.focus()});async function I(){const $=s.value.trim();if(!$){s.focus();return}const S=m.value||"#6366F1";if(t.some(_=>_.name.toLowerCase()===$.toLowerCase())){s.style.borderColor="#ef4444",setTimeout(()=>{s.style.borderColor=""},1500);return}u.disabled=!0,u.textContent="Criando…";try{const{data:_,error:p}=await b.from("crm_tags").insert({name:$,color:S,tenant_id:y==null?void 0:y.tenant_id}).select().single();if(p)throw p;const g={id:_.id,name:_.name,color:_.color};t.push(g),n[g.name]=g,typeof pe<"u"&&(pe[g.name]=g),w([...E(),g.name]),x(r.value),s.value="",m.value="#6366F1",c.classList.add("hidden")}catch(_){console.error("Error creating tag:",_),alert("Erro ao criar tag: "+(_.message||_))}finally{u.disabled=!1,u.textContent="Criar e adicionar"}}u.addEventListener("click",I),s.addEventListener("keydown",$=>{$.key==="Enter"&&I()})}async function Ln(){var k;const e=document.getElementById("section-dashboard");if(!e)return;e.dataset.dbInit==="1"&&(window._dbLeadsChartInstance&&(window.window._dbLeadsChartInstance.destroy(),window._dbLeadsChartInstance=null),window._dbOriginChartInstance&&(window.window._dbOriginChartInstance.destroy(),window._dbOriginChartInstance=null)),e.dataset.dbInit="1",e.innerHTML=`
<div class="db-wrap">

  <!-- Header -->
  <div class="db-header">
    <div>
      <h1 class="db-greeting">Carregando… <span class="db-greeting-name" id="db-greeting-name"></span></h1>
      <p class="db-subline" id="db-subline">Preparando seu painel…</p>
    </div>
    <div class="db-header-chips" id="db-header-chips"></div>
  </div>

  <!-- KPI Cards -->
  <div class="db-kpis">
    ${["db-kpi-indigo","db-kpi-emerald","db-kpi-amber","db-kpi-sky"].map((v,I)=>`
    <div class="db-kpi ${v}" id="db-kpi-${I}">
      <div class="db-kpi-icon">
        <div class="db-skeleton" style="width:22px;height:22px;border-radius:4px;"></div>
      </div>
      <div class="db-kpi-body">
        <div class="db-skeleton db-skel-val"></div>
        <div class="db-skeleton db-skel-lbl" style="margin-top:6px;"></div>
        <div class="db-skeleton db-skel-trend" style="margin-top:8px;"></div>
      </div>
    </div>`).join("")}
  </div>

  <!-- Charts Row -->
  <div class="db-row-main">
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Leads Recebidos</div>
          <div class="db-card-sub">Evolução por período</div>
        </div>
        <div class="db-ptabs" id="db-ptabs">
          <button class="db-ptab active" data-p="7">7 dias</button>
          <button class="db-ptab" data-p="30">30 dias</button>
          <button class="db-ptab" data-p="90">3 meses</button>
        </div>
      </div>
      <div class="db-chart-wrap"><canvas id="db-leads-chart"></canvas></div>
    </div>
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Origem dos Leads</div>
          <div class="db-card-sub">Distribuição por canal</div>
        </div>
      </div>
      <div class="db-donut-wrap"><canvas id="db-origin-chart"></canvas></div>
      <div id="db-origin-legend" class="db-origin-legend"></div>
    </div>
  </div>

  <!-- Second Row -->
  <div class="db-row-secondary">
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Leads Recentes</div>
          <div class="db-card-sub" id="db-leads-sub">Últimos contatos recebidos</div>
        </div>
        <button class="db-card-link" onclick="navigateToSection('funil')">Ver todos →</button>
      </div>
      <div class="db-table-scroll">
        <table class="db-table">
          <thead><tr>
            <th>Contato</th>
            <th>Origem</th>
            <th>Status</th>
            <th>Data</th>
            <th></th>
          </tr></thead>
          <tbody id="db-leads-tbody">
            <tr><td colspan="5" class="db-empty"><div class="db-empty-icon">⏳</div><div class="db-empty-text">Carregando leads…</div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Imóveis do Portfólio</div>
          <div class="db-card-sub">Mais recentes</div>
        </div>
        <button class="db-card-link" onclick="navigateToSection('properties')">Ver todos →</button>
      </div>
      <div class="db-prop-list" id="db-top-props">
        <div class="db-empty"><div class="db-empty-icon">⏳</div><div class="db-empty-text">Carregando…</div></div>
      </div>
    </div>
  </div>

  <!-- Third Row -->
  <div class="db-row-third">
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Atividade Recente</div>
          <div class="db-card-sub">Histórico do sistema</div>
        </div>
      </div>
      <div class="db-timeline" id="db-timeline">
        <div class="db-empty"><div class="db-empty-icon">⏳</div><div class="db-empty-text">Carregando…</div></div>
      </div>
    </div>
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Resumo da Carteira</div>
          <div class="db-card-sub">Situação dos imóveis</div>
        </div>
      </div>
      <div class="db-portfolio-grid" id="db-portfolio"></div>
    </div>
  </div>

</div>`;const n=new Date,a=n.getHours(),o=a<12?"Bom dia":a<18?"Boa tarde":"Boa noite",i=["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],r=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],l=`${i[n.getDay()]}, ${n.getDate()} de ${r[n.getMonth()]} de ${n.getFullYear()}`,d=((k=y==null?void 0:y.name)==null?void 0:k.split(" ")[0])||"Corretor",c=e.querySelector(".db-greeting");c&&(c.innerHTML=`${o}, <span class="db-greeting-name">${D(d)}</span> 👋`);const s=document.getElementById("db-subline");s&&(s.textContent=`Aqui está o resumo do seu negócio — ${l}`);let m=[],u=[];try{const[v,I]=await Promise.all([Jt(),Bn()]);m=v||[],u=I||[]}catch(v){console.warn("[Dashboard] Erro ao carregar dados:",v)}Cn(m,u,n);const E=m.filter(v=>v.published).length,w=u.filter(v=>gt(v.created_at)===gt(n.toISOString())).length,x=document.getElementById("db-header-chips");x&&(x.innerHTML=`
    <span class="db-chip db-chip-green">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      ${E} publicados
    </span>
    <span class="db-chip db-chip-blue">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      ${w} lead${w!==1?"s":""} hoje
    </span>
    <span class="db-chip db-chip-gold">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      ${l.split(",")[0]}
    </span>`),An(u,m),qn(m),Mn(m,u,n),zn(m,u);try{await Sn(),Ft(u,7),Tn(u),document.querySelectorAll(".db-ptab").forEach(v=>{v.addEventListener("click",()=>{document.querySelectorAll(".db-ptab").forEach($=>$.classList.remove("active")),v.classList.add("active");const I=parseInt(v.dataset.p);window._dbSelectedDays=I,Ft(u,I)})})}catch(v){console.warn("[Dashboard] Chart.js não carregou:",v)}window.lucide&&lucide.createIcons(),window._dbRefreshTimer&&clearInterval(window._dbRefreshTimer),window._dbRefreshTimer=setInterval(()=>{const v=document.getElementById("dashboard-content")||document.querySelector(".db-dashboard");!v||v.offsetParent===null||typeof renderDashboard=="function"&&renderDashboard(!0)},3e4)}function D(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function gt(e){return(e||"").slice(0,10)}function ya(e,t){if(!e)return"—";const n=t-new Date(e),a=Math.floor(n/6e4);if(a<2)return"agora mesmo";if(a<60)return`há ${a}min`;const o=Math.floor(a/60);if(o<24)return`há ${o}h`;const i=Math.floor(o/24);return i===1?"ontem":i<7?`há ${i} dias`:new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}function ba(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(0)+"k":String(e)}async function Bn(){let e=b.from("leads").select("*").order("created_at",{ascending:!1}).limit(500);(y==null?void 0:y.role)==="corretor"?e=e.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(e=e.eq("tenant_id",y.tenant_id));const{data:t,error:n}=await e;return n?(console.warn("[Dashboard] leads fetch error:",n.message),[]):t||[]}function Cn(e,t,n){const a=e.length,o=e.filter(x=>x.published).length,i=t.length,r=t.filter(x=>x.stage&&x.stage!=="perdido"&&x.stage!=="fechado").length,l=new Date(n);l.setDate(l.getDate()-30);const d=new Date(n);d.setDate(d.getDate()-60);const c=e.filter(x=>x.created_at&&new Date(x.created_at)>=l).length,s=e.filter(x=>x.created_at&&new Date(x.created_at)>=d&&new Date(x.created_at)<l).length,m=t.filter(x=>x.created_at&&new Date(x.created_at)>=l).length,u=t.filter(x=>x.created_at&&new Date(x.created_at)>=d&&new Date(x.created_at)<l).length;function E(x,k,v){if(k===0&&x===0)return'<span class="db-kpi-trend db-trend-neu">Sem dados</span>';if(k===0)return'<span class="db-kpi-trend db-trend-up">▲ Novo</span>';const I=Math.round((x-k)/k*100);return I===0?'<span class="db-kpi-trend db-trend-neu">= Estável</span>':I>0?`<span class="db-kpi-trend db-trend-up">▲ +${I}% ${v}</span>`:`<span class="db-kpi-trend db-trend-down">▼ ${I}% ${v}</span>`}[{idx:0,val:a,label:"Total de Imóveis",trend:E(c,s,"este mês"),icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'},{idx:1,val:o,label:"Publicados no Site",trend:o===0?'<span class="db-kpi-trend db-trend-neu">Nenhum publicado</span>':`<span class="db-kpi-trend db-trend-up">${Math.round(o/Math.max(a,1)*100)}% do total</span>`,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'},{idx:2,val:i,label:"Leads Recebidos",trend:E(m,u,"vs. mês ant."),icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'},{idx:3,val:r,label:"Em Negociação",trend:r===0?'<span class="db-kpi-trend db-trend-neu">Nenhum ativo</span>':'<span class="db-kpi-trend db-trend-up">▲ Ativos</span>',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>'}].forEach(({idx:x,val:k,label:v,trend:I,icon:$})=>{const S=document.getElementById(`db-kpi-${x}`);S&&(S.innerHTML=`
      <div class="db-kpi-icon">${$}</div>
      <div class="db-kpi-body">
        <div class="db-kpi-val">${ba(k)}</div>
        <div class="db-kpi-lbl">${D(v)}</div>
        ${I}
      </div>`)})}function Ft(e,t){const n=document.getElementById("db-leads-chart");if(!n||!window.Chart)return;if(window._dbLeadsChartInstance){try{window._dbLeadsChartInstance.destroy()}catch{}window._dbLeadsChartInstance=null}const a=[],o=[],i=new Date;for(let l=t-1;l>=0;l--){const d=new Date(i);d.setDate(d.getDate()-l);const c=d.toISOString().slice(0,10),s=t<=7?d.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".",""):t<=30?d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}):d.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"});a.push(s),o.push(e.filter(m=>gt(m.created_at)===c).length)}const r=Math.max(...o,1);window._dbLeadsChartInstance=new Chart(n,{type:"bar",data:{labels:a,datasets:[{label:"Leads",data:o,backgroundColor:o.map(l=>l===r&&r>0?"rgba(201,162,39,0.90)":"rgba(201,162,39,0.35)"),borderColor:"#C9A227",borderWidth:1.5,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!0,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#0F172A",padding:10,callbacks:{label:l=>` ${l.parsed.y} lead${l.parsed.y!==1?"s":""}`}}},scales:{x:{grid:{display:!1},ticks:{color:"#94A3B8",font:{size:11}}},y:{beginAtZero:!0,grid:{color:"rgba(226,232,240,0.6)",drawBorder:!1},ticks:{color:"#94A3B8",font:{size:11},precision:0,stepSize:Math.max(1,Math.ceil(r/4))}}}}})}window._dbOriginChartInstance=null;function Tn(e){const t=document.getElementById("db-origin-chart"),n=document.getElementById("db-origin-legend");if(!t||!window.Chart)return;window._dbOriginChartInstance&&(window._dbOriginChartInstance.destroy(),_dbOriginChartInstance=null);const a={};e.forEach(c=>{const s=c.source||"Direto",m=s.charAt(0).toUpperCase()+s.slice(1);a[m]=(a[m]||0)+1}),Object.keys(a).length===0&&(a.Site=0,a.WhatsApp=0,a.Indicação=0);const o=Object.keys(a),i=Object.values(a),r=["#6366F1","#10B981","#F59E0B","#0EA5E9","#EC4899","#8B5CF6","#14B8A6","#94A3B8"],l=o.map((c,s)=>r[s%r.length]),d=i.reduce((c,s)=>c+s,0);window._dbOriginChartInstance=new Chart(t,{type:"doughnut",data:{labels:o,datasets:[{data:i,backgroundColor:l,borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!0,cutout:"68%",plugins:{legend:{display:!1},tooltip:{backgroundColor:"#0F172A",padding:10,callbacks:{label:c=>{const s=d>0?Math.round(c.parsed/d*100):0;return` ${c.label}: ${c.parsed} (${s}%)`}}}}}}),n&&(d===0?n.innerHTML='<div class="db-empty" style="padding:12px 0"><div class="db-empty-text">Nenhum lead ainda<br><span style="font-size:11px;color:#CBD5E1">Os canais aparecerão aqui quando houver leads</span></div></div>':n.innerHTML=o.map((c,s)=>`
        <div class="db-legend-item">
          <div class="db-legend-dot-row">
            <span class="db-legend-dot" style="background:${l[s]}"></span>
            <span>${D(c)}</span>
          </div>
          <span class="db-legend-val">${i[s]}</span>
        </div>`).join(""))}function An(e,t){const n=document.getElementById("db-leads-tbody"),a=document.getElementById("db-leads-sub");if(!n)return;const o=e.slice(0,8),i=new Date;if(a&&(a.textContent=`${e.length} lead${e.length!==1?"s":""} no total`),o.length===0){n.innerHTML='<tr><td colspan="5"><div class="db-empty"><div class="db-empty-icon">💬</div><div class="db-empty-text">Nenhum lead recebido ainda</div></div></td></tr>';return}const r={novo:{cls:"db-status-novo",label:"Novo"},contatado:{cls:"db-status-contatado",label:"Contatado"},negociando:{cls:"db-status-negociando",label:"Negociando"},fechado:{cls:"db-status-fechado",label:"Fechado"},perdido:{cls:"db-status-perdido",label:"Perdido"}};n.innerHTML=o.map(l=>{const d=r[l.status]||{cls:"db-status-novo",label:l.status||"Novo"},c=l.property_id?t.find(m=>String(m.id)===String(l.property_id)):null,s=l.source?l.source.charAt(0).toUpperCase()+l.source.slice(1):"Direto";return`
    <tr>
      <td>
        <div class="db-lead-name">${D(l.name||"—")}</div>
        <div class="db-lead-phone">${D(l.phone||l.email||"—")}</div>
        ${c?`<div style="font-size:11px;color:#94A3B8;margin-top:1px;">${D(c.title||"")}</div>`:""}
      </td>
      <td><span class="db-lead-src">${D(s)}</span></td>
      <td><span class="db-status-badge ${d.cls}">${D(d.label)}</span></td>
      <td style="color:#64748B;font-size:12px;">${ya(l.created_at,i)}</td>
      <td><button class="db-btn-view" onclick="navigateToSection('funil')">Ver Lead</button></td>
    </tr>`}).join("")}function qn(e){const t=document.getElementById("db-top-props");if(!t)return;const n=[...e].sort((a,o)=>new Date(o.created_at)-new Date(a.created_at)).slice(0,6);if(n.length===0){t.innerHTML='<div class="db-empty"><div class="db-empty-icon">🏠</div><div class="db-empty-text">Nenhum imóvel cadastrado ainda</div></div>';return}t.innerHTML=n.map((a,o)=>{const i=(()=>{try{return Array.isArray(a.images)?a.images:JSON.parse(a.images||"[]")}catch{return[]}})(),r=a.cover_image||i.find(u=>u&&u.startsWith("http"))||"",l=o===0?"rank-1":o===1?"rank-2":o===2?"rank-3":"",d=a.published?"pub":"rascunho",c=a.published?"Publicado":"Rascunho",s=[a.neighborhood,a.city].filter(Boolean).join(", ")||"—",m=a.price?`R$ ${String(a.price).replace(/[^0-9,.]/g,"")}`:"—";return`
    <div class="db-prop-item">
      <div class="db-prop-rank ${l}">${o+1}</div>
      ${r?`<img class="db-prop-thumb" src="${D(r)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
      <div class="db-prop-thumb-ph" ${r?'style="display:none"':""}>🏠</div>
      <div class="db-prop-info">
        <div class="db-prop-name" title="${D(a.title||"")}">${D(a.title||"Sem título")}</div>
        <div class="db-prop-city">${D(s)} · ${D(m)}</div>
      </div>
      <span class="db-prop-badge ${d}">${c}</span>
    </div>`}).join("")}function Mn(e,t,n){var i;const a=document.getElementById("db-timeline");if(!a)return;const o=[];o.push({icon:"👤",cls:"tl-login",title:"Você entrou no sistema",meta:`Bem-vindo de volta, ${((i=y==null?void 0:y.name)==null?void 0:i.split(" ")[0])||"Corretor"}`,time:n.toISOString()}),t.slice(0,3).forEach(r=>{o.push({icon:"💬",cls:"tl-lead",title:`Novo lead: ${r.name||"Sem nome"}`,meta:`Origem: ${r.source||"Direto"} · ${r.phone||r.email||""}`,time:r.created_at})}),e.slice(0,3).forEach(r=>{const l=r.published?"Imóvel publicado":"Imóvel cadastrado";o.push({icon:"🏠",cls:"tl-prop",title:`${l}: ${r.title||"Sem título"}`,meta:`${r.city||""} · ${r.reference||""}`,time:r.created_at})}),o.sort((r,l)=>new Date(l.time)-new Date(r.time)),a.innerHTML=o.slice(0,8).map(r=>`
    <div class="db-tl-item">
      <div class="db-tl-icon ${r.cls}">${r.icon}</div>
      <div class="db-tl-body">
        <div class="db-tl-title">${D(r.title)}</div>
        ${r.meta?`<div class="db-tl-meta">${D(r.meta)}</div>`:""}
      </div>
      <div class="db-tl-time">${ya(r.time,n)}</div>
    </div>`).join(""),o.length===0&&(a.innerHTML='<div class="db-empty"><div class="db-empty-icon">📋</div><div class="db-empty-text">Sem atividades recentes</div></div>')}function zn(e,t){const n=document.getElementById("db-portfolio");if(!n)return;const a=e.length,o=e.filter(c=>c.published).length,i=a-o,r=t.filter(c=>c.stage&&c.stage!=="perdido"&&c.stage!=="fechado").length,l=e.filter(c=>{try{const s=Array.isArray(c.collection)?c.collection:JSON.parse(c.collection||"[]");return s.includes("alto-padrao")||s.includes("lancamentos")||s.includes("decorados")}catch{return!1}}).length,d=[{icon:"✅",val:o,lbl:"Imóveis Ativos"},{icon:"📝",val:i,lbl:"Em Rascunho"},{icon:"🤝",val:r,lbl:"Em Negociação"},{icon:"⭐",val:l,lbl:"Em Coleções"}];n.innerHTML=d.map(c=>`
    <div class="db-port-card">
      <div class="db-port-icon">${c.icon}</div>
      <div class="db-port-val">${ba(c.val)}</div>
      <div class="db-port-lbl">${D(c.lbl)}</div>
    </div>`).join("")}
