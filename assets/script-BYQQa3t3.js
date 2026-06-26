import{s as b}from"./supabase-BcuJ3xoD.js";const Y="00000000-0000-0000-0000-000000000000";let fe={},Se={},pe=Y;function Ie(e){pe=e||Y,fe={},Se={}}const z=()=>pe;async function La(){const[e,t]=await Promise.all([b.from("settings").select("key,value").eq("tenant_id",pe),b.from("site_content").select("*").eq("tenant_id",pe)]);if(e.data&&e.data.forEach(n=>{fe[n.key]=n.value}),t.data&&t.data.forEach(n=>{Se[n.key]=n}),(!t.data||t.data.length===0)&&pe!==Y){const[n,a]=await Promise.all([b.from("settings").select("key,value").eq("tenant_id",Y),b.from("site_content").select("*").eq("tenant_id",Y)]);n.data&&n.data.forEach(o=>{fe[o.key]===void 0&&(fe[o.key]=o.value)}),a.data&&a.data.forEach(o=>{Se[o.key]||(Se[o.key]=o)})}}const ee=(e,t=null)=>fe[e]!==void 0?fe[e]:t,ze=(e,t="pt")=>{const n=Se[e];return n&&(n["value_"+t]||n.value_pt)||null};async function _e(e){const t=new Date().toISOString(),n=e.map(([o,i])=>({key:o,value:i,tenant_id:pe,updated_at:t})),{error:a}=await b.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,i])=>{fe[o]=i}),!a}async function We(e,{pt:t,en:n,es:a}){const o=new Date().toISOString(),i={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:pe,updated_at:o},{error:c}=await b.from("site_content").upsert(i,{onConflict:"key,tenant_id"});return c||(Se[e]=i),pe!==Y&&await b.from("site_content").upsert({key:e,value_pt:t,value_en:n,value_es:a,tenant_id:Y,updated_at:o},{onConflict:"key,tenant_id"}),!c}async function ot(e,t,n){const{error:a}=await b.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function xt(){const e=document.documentElement,t=ee("visual.accent_color","#b8962e"),n=ee("visual.primary_bg","#0f1c2e"),a=ee("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=ee("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(r=>{r.src=o});const i=ee("company.favicon_url","/favicon.ico"),c=document.querySelector('link[rel="shortcut icon"]');c&&(c.href=i);const s=ee("visual.hero_bg_url","");if(s){const r=document.querySelector(".hero, .hero-v2");r&&(r.style.backgroundImage="url('"+s+"')")}}function Ct(e){e=e||"pt";const t=f=>ze(f,e)||"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector('[data-i18n="hero.subtitle"]')||document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small, footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const i=document.querySelector('[data-i18n="inst.p1"]'),c=document.querySelector('[data-i18n="inst.p2"]'),s=document.querySelector('[data-i18n="inst.p3"]');i&&t("inst.bio_p1")&&(i.innerHTML=t("inst.bio_p1")),c&&t("inst.bio_p2")&&(c.innerHTML=t("inst.bio_p2")),s&&t("inst.bio_p3")&&(s.innerHTML=t("inst.bio_p3"));const r=document.querySelector('[data-i18n="inst.stat1_num"]'),l=document.querySelector('[data-i18n="inst.stat2_num"]')||document.querySelector('[data-i18n-num="inst.stat2num"]'),d=document.querySelector('[data-i18n="inst.stat3_num"]'),p=document.querySelector('[data-i18n="inst.stat1_label"]')||document.querySelector('[data-i18n="inst.stat1"]'),u=document.querySelector('[data-i18n="inst.stat2_label"]')||document.querySelector('[data-i18n="inst.stat2"]'),w=document.querySelector('[data-i18n="inst.stat3_label"]')||document.querySelector('[data-i18n="inst.stat3"]');r&&t("inst.stat1_num")&&(r.innerHTML=t("inst.stat1_num")),l&&t("inst.stat2_num")&&(l.innerHTML=t("inst.stat2_num")),d&&t("inst.stat3_num")&&(d.innerHTML=t("inst.stat3_num")),p&&t("inst.stat1_label")&&(p.innerHTML=t("inst.stat1_label")),u&&t("inst.stat2_label")&&(u.innerHTML=t("inst.stat2_label")),w&&t("inst.stat3_label")&&(w.innerHTML=t("inst.stat3_label"));const E=document.getElementById("dep-grid");if(E){const f=ze("testimonials",e)||ze("testimonials","pt");if(f)try{const $=JSON.parse(f);if(Array.isArray($)&&$.length>0){let k=function(m){return String(m||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},_=function(m){let v=0;for(const x of m||"?")v=v*31+x.charCodeAt(0)&4294967295;return S[Math.abs(v)%S.length]};const S=["#0d2144","#1a3a5c","#0a1628","#164a3c","#2d1b3d","#3d1a1a","#1a2f4a"];E.innerHTML=$.map(m=>`
            <div class="dep-card-v2">
              <div class="dep-stars-v2">${"★".repeat(m.stars||5)}</div>
              <p class="dep-text-v2">"${k(m.text)}"</p>
              <div class="dep-author-v2">
                <div class="dep-avatar-v2" style="background:${_(m.name)}">${(m.name||"?")[0].toUpperCase()}</div>
                <div>
                  <div class="dep-name-v2">${k(m.name)}</div>
                  <div class="dep-role-v2">${k(m.role)}</div>
                </div>
              </div>
            </div>`).join("")}}catch{}}const I=ze("seo.title_pt",e);I&&(document.title=I);const h=ze("seo.description_pt",e);if(h){const f=document.querySelector('meta[name="description"]');f&&(f.content=h)}}function Tt(e){if(!e)return;const t="https://wa.me/"+e;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const Ba="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let Re="5547999701743";const Ca="onknpbzdcrhbfozzvxtz.supabase.co",qt="/storage/v1/object/public/";function He(e){if(!e||typeof e!="string"||!window.__USE_CF_PROXY||!e.includes(Ca)||!e.includes(qt))return e;const t=window.location.hostname;if(t!=="omarcorretor.com.br"&&t!=="www.omarcorretor.com.br")return e;try{const n=new URL(e);return"https://omarcorretor.com.br"+n.pathname.replace(qt,"/img/")+n.search}catch{return e}}(function(){typeof window>"u"||window.location.hostname!=="omarcorretor.com.br"&&window.location.hostname!=="www.omarcorretor.com.br"||fetch("/img/healthz",{method:"HEAD",cache:"no-store"}).then(t=>{(t.headers.get("cf-ray")||t.headers.get("Cf-Ray"))&&(window.__USE_CF_PROXY=!0)}).catch(()=>{})})();function Ta(e){return Array.isArray(e)?e.map(He):e}const Ce=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],qa=5.7;function Fe(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/qa).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let q=[],y=null,Oe=[];const dt="imobi_lead_tracking",Qt=90*24*60*60*1e3;function Qe(e){try{const t=document.cookie?document.cookie.split("; "):[];for(const n of t){const a=n.indexOf("=");if(a<0)continue;if(n.slice(0,a)===e)return decodeURIComponent(n.slice(a+1))}return null}catch{return null}}function Aa(){if(typeof window>"u")return null;try{const e=new URLSearchParams(window.location.search),t={utm_source:e.get("utm_source"),utm_medium:e.get("utm_medium"),utm_campaign:e.get("utm_campaign"),utm_content:e.get("utm_content"),utm_term:e.get("utm_term"),fbclid:e.get("fbclid"),gclid:e.get("gclid"),fbp:Qe("_fbp"),fbc:Qe("_fbc"),landing_url:window.location.href,captured_at:Date.now()};if(t.fbclid&&!t.fbc){const i=Math.floor(Date.now()/1e3);t.fbc=`fb.1.${i}.${t.fbclid}`}const n=t.utm_source||t.utm_campaign||t.fbclid||t.gclid,a=localStorage.getItem(dt);let o=t;if(a)try{const i=JSON.parse(a);i&&i.captured_at&&Date.now()-i.captured_at<Qt&&!n&&(o={...i,fbp:t.fbp||i.fbp,fbc:t.fbc||i.fbc})}catch{}return localStorage.setItem(dt,JSON.stringify(o)),o}catch{return null}}function At(){try{const e=localStorage.getItem(dt);if(!e)return{};const t=JSON.parse(e);if(!t||!t.captured_at||Date.now()-t.captured_at>Qt)return{};const n=Qe("_fbp"),a=Qe("_fbc");return{utm_source:t.utm_source||null,utm_medium:t.utm_medium||null,utm_campaign:t.utm_campaign||null,utm_content:t.utm_content||null,utm_term:t.utm_term||null,fbclid:t.fbclid||null,gclid:t.gclid||null,fbp:n||t.fbp||null,fbc:a||t.fbc||null,landing_url:t.landing_url||null}}catch{return{}}}typeof window<"u"&&setTimeout(Aa,100);let Zt=!1;b.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(Zt=!0)});function rt(e,t,n){try{localStorage.setItem(e,JSON.stringify({v:t,exp:Date.now()+n}))}catch{}}function Je(e){try{const t=localStorage.getItem(e);if(!t)return null;const n=JSON.parse(t);return Date.now()>n.exp?(localStorage.removeItem(e),null):n.v}catch{return null}}async function ea({background:e=!1}={}){const t=window.location.hostname;if(t==="localhost"||t==="127.0.0.1"){const{data:d,error:p}=await b.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return p&&console.error("Supabase select error:",p),d||[]}const a=`imobi_tenant_${t.replace(/^www\./,"")}`;let o=z();if(!o||o===Y){const d=Je(a);if(d)o=d,Ie(o);else{const p=t.replace(/^www\./,"");for(const u of[p,"www."+p]){const{data:w}=await b.from("tenants").select("id").eq("domain",u).maybeSingle();if(w!=null&&w.id){o=w.id,Ie(o);break}}o&&o!==Y&&rt(a,o,24*60*60*1e3)}}if(!o||o===Y)return console.warn("[ImobiCRM] Tenant não encontrado para domínio:",t),[];const i=`imobi_props_${o}`,c=5*60*1e3;if(!e){const d=Je(i);if(d)return setTimeout(()=>ea({background:!0}),100),d}const{data:s,error:r}=await b.from("properties").select("*").eq("published",!0).eq("tenant_id",o).order("created_at",{ascending:!1});if(r)return console.error("Supabase select error:",r),Je(i)||[];const l=s||[];return rt(i,l,c),e&&typeof ve=="function"&&ve().catch(()=>{}),l}async function ta(){let e=b.from("properties").select("*").order("created_at",{ascending:!1});(y==null?void 0:y.role)==="super_admin"||(y!=null&&y.tenant_id?e=e.eq("tenant_id",y.tenant_id):e=e.or("tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000"));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):(q=t||[],vn(),yn(),q)}async function Ma(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await b.from("properties").update(a).eq("id",t);if(o)throw o;const i=q.findIndex(c=>c.id===t);i>=0&&(q[i]={...q[i],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await b.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&q.unshift(t[0])}}async function za(e){const{error:t}=await b.from("properties").delete().eq("id",e);if(t)throw t;q=q.filter(n=>n.id!==e)}const aa="imobi_sec_login_attempts",na=5,Da=15*60*1e3,oa=2*60*60*1e3;function ia(){try{const e=localStorage.getItem(aa);return e?JSON.parse(e):{count:0,blockedUntil:0}}catch{return{count:0,blockedUntil:0}}}function wt(e){try{localStorage.setItem(aa,JSON.stringify(e))}catch{}}function Na(){const e=ia();return e.blockedUntil&&Date.now()<e.blockedUntil?{blocked:!0,minutesLeft:Math.ceil((e.blockedUntil-Date.now())/6e4)}:(e.blockedUntil&&Date.now()>=e.blockedUntil&&wt({count:0,blockedUntil:0}),{blocked:!1})}function Ra(){const e=ia();return e.count=(e.count||0)+1,e.count>=na&&(e.blockedUntil=Date.now()+Da,e.count=0),wt(e),e}function ja(){wt({count:0,blockedUntil:0})}function A(e,t="info"){if(typeof document>"u")return;const n={info:"#0f172a",success:"#16a34a",error:"#dc2626",warn:"#d97706"},a=document.createElement("div");a.textContent=e,a.style.cssText=`position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:${n[t]||n.info};color:#fff;padding:12px 22px;border-radius:24px;font-size:14px;font-weight:600;z-index:99999;box-shadow:0 6px 24px rgba(0,0,0,0.25);opacity:0;transition:opacity 0.2s, bottom 0.3s;pointer-events:none;max-width:90vw;text-align:center;`,document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity="1",a.style.bottom="40px"}),setTimeout(()=>{a.style.opacity="0",a.style.bottom="24px",setTimeout(()=>a.remove(),300)},3e3)}typeof window<"u"&&(window.toast=A);typeof window<"u"&&!window._shortcutsAttached&&(window._shortcutsAttached=!0,document.addEventListener("keydown",e=>{if(e.key==="Escape"&&(["property-modal","view-modal","lead-modal","tarefa-modal","import-modal","property-modal-create"].forEach(t=>{const n=document.getElementById(t);n&&!n.classList.contains("hidden")&&n.classList.add("hidden")}),document.querySelectorAll('.side-panel.open, [data-panel-open="true"]').forEach(t=>{t.classList.remove("open"),t.dataset.panelOpen="false"}),document.body.style.overflow=""),(e.metaKey||e.ctrlKey)&&e.key==="k"){const t=document.getElementById("global-search")||document.querySelector('input[type="search"]');t&&(e.preventDefault(),t.focus())}if((e.metaKey||e.ctrlKey)&&e.key==="s"){const t=document.querySelector('.modal:not(.hidden) button[type="submit"], .modal:not(.hidden) .btn-primary, .side-panel.open .btn-primary');t&&(e.preventDefault(),t.click())}}));typeof window<"u"&&!window._globalErrHandlerAttached&&(window._globalErrHandlerAttached=!0,window.addEventListener("unhandledrejection",e=>{console.warn("[CRM] Promise sem catch:",e.reason)}),window.addEventListener("error",e=>{e.error&&e.error.message&&console.warn("[CRM] Erro:",e.error.message)}));async function Ha(e,t){const n=Na();if(n.blocked)return alert(`🔒 Muitas tentativas falhas. Tente novamente em ${n.minutesLeft} minuto(s).`),!1;const{error:a}=await b.auth.signInWithPassword({email:e,password:t});if(a){const o=Ra();if(o.blockedUntil)alert("🔒 Login bloqueado por 15 minutos após 5 tentativas erradas.");else{const i=na-o.count;console.warn(`[SEC] Login falhou. ${i} tentativa(s) restante(s) antes do bloqueio.`)}return!1}return ja(),lt(),!0}let it=null;function lt(){try{localStorage.setItem("imobi_sec_last_activity",String(Date.now()))}catch{}it&&clearTimeout(it),it=setTimeout(async()=>{console.warn("[SEC] Inativo por 2h — fazendo logout automático.");try{await b.auth.signOut()}catch{}try{localStorage.removeItem("imobi_sec_last_activity")}catch{}alert("🔒 Sua sessão expirou por inatividade. Faça login de novo."),location.reload()},oa)}function Oa(){if(!(typeof window>"u")){["click","keydown","mousemove","touchstart","scroll"].forEach(e=>{window.addEventListener(e,()=>lt(),{passive:!0})});try{const e=parseInt(localStorage.getItem("imobi_sec_last_activity")||"0",10);if(e&&Date.now()-e>oa){console.warn("[SEC] Sessão já estava expirada ao carregar — fazendo logout."),b.auth.signOut().finally(()=>location.reload());return}}catch{}lt()}}b.auth.onAuthStateChange((e,t)=>{t&&t.user&&Oa()});function Ve(e,t=1e3,n=.7){return new Promise((a,o)=>{const i=new Image,c=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(c);const s=document.createElement("canvas");let r=i.width,l=i.height;r>t&&(l=Math.round(l*t/r),r=t),s.width=r,s.height=l;const d=s.getContext("2d");d.drawImage(i,0,0,r,l);const p=new Image;p.crossOrigin="anonymous",p.onload=()=>{const u=Math.round(r*.18),w=Math.round(p.naturalHeight*u/p.naturalWidth),E=Math.round(r*.02),I=r-u-E,h=l-w-E;d.globalAlpha=.45,d.drawImage(p,I,h,u,w),d.globalAlpha=1,s.toBlob(f=>f?a(f):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},p.onerror=()=>{s.toBlob(u=>u?a(u):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},p.src="/logo.png"},i.onerror=o,i.src=c})}async function Pa(e){const t=await Ve(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await b.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=b.storage.from("imoveis").getPublicUrl(n);return o}async function Ua(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await Pa(n[o]));return a}function sa(e){if(!e)return{};const t={};return e.querySelectorAll(".icard-img-wrap").forEach(n=>{const a=n.dataset.pid,o=n.dataset.idx;a&&o&&o!=="0"&&(t[a]=parseInt(o,10))}),t}function da(e,t){!e||!t||Object.entries(t).forEach(([n,a])=>{const o=e.querySelector('.icard-img-wrap[data-pid="'+n+'"]');if(!o)return;const i=parseInt(o.dataset.total,10);if(!i||i<2)return;const c=a%i;o.dataset.idx=c;try{const r=JSON.parse(decodeURIComponent(o.dataset.images||"[]"));if(r[c]){const l=o.querySelector(".carousel-img"),d=o.querySelector(".carousel-img-bg"),p=He(r[c]);l&&(l.src=p),d&&(d.src=p)}}catch{}const s=o.querySelectorAll(".icard-dot");if(s.length){const r=c%s.length;s.forEach((l,d)=>l.classList.toggle("active",d===r))}})}function Fa(e){const t=document.getElementById("collections-wrap");if(!t)return;const n=r=>e.filter(l=>{if(l.collection){try{const p=JSON.parse(l.collection);if(Array.isArray(p))return p.includes(r)}catch{}if(l.collection===r)return!0}const d=((l.title||"")+" "+(l.description||"")).toLowerCase();return r==="frente-mar"?d.includes("frente mar")||d.includes("frente ao mar"):r==="decorados"?d.includes("decorad")||d.includes("mobiliado"):r==="casas-condominio"?(l.condominium||"").length>2:!1});function a(r,l,d,p){if(!d.length)return"";const u=d.slice(0,8).map(w=>It(w)).join("");return`
      <div class="colecao-section">
        <div class="colecao-header">
          <h2 class="colecao-title" style="color:${l}">${g(r)}</h2>
          <a href="${g(p)}" class="colecao-ver-todos">Ver todos</a>
        </div>
        <div class="imoveis-grid colecao-grid" data-collection="${r}">${u}</div>
      </div>`}const o=n("frente-mar"),i=n("decorados"),c=n("casas-condominio"),s=sa(t);t.innerHTML=[a("Imóveis Disponíveis","var(--navy, #0d2144)",e,"imoveis.html"),o.length?a("Coleção FRENTE MAR","var(--navy, #0d2144)",o,"imoveis.html?collection=frente-mar"):"",i.length?a("Coleção DECORADOS","var(--navy, #0d2144)",i,"imoveis.html?collection=decorados"):"",c.length?a("Coleção CASAS EM CONDOMÍNIO","var(--navy, #0d2144)",c,"imoveis.html?collection=casas-condominio"):""].join(""),da(t,s),t._carouselDelegated||(t._carouselDelegated=!0,t.addEventListener("click",Et),t.addEventListener("touchend",function(r){const l=r.target.closest(".carousel-btn");l&&(r.preventDefault(),r.stopPropagation(),ra(l.closest(".icard-img-wrap"),l.classList.contains("carousel-next")?1:-1))},{passive:!1}))}async function ve(){var w,E,I,h,f,$;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await ea();q=n,((w=document.getElementById("selecao-carousel"))==null?void 0:w.innerHTML)===""&&Va(n);const a=((E=document.getElementById("city-filter"))==null?void 0:E.value)||"",o=((I=document.getElementById("neighborhood-filter"))==null?void 0:I.value)||"",i=((h=document.getElementById("bedrooms-filter"))==null?void 0:h.value)||"",c=((f=document.getElementById("parking-filter"))==null?void 0:f.value)||"",s=(($=document.getElementById("construction-filter"))==null?void 0:$.value)||"",{min:r,max:l}=Xa(),d=n.filter(S=>{if(a&&S.city!==a||o&&S.neighborhood!==o||i&&(i==="4+"&&Number(S.bedrooms)<4||i!=="4+"&&Number(S.bedrooms)!==Number(i))||c&&(c==="4+"&&Number(S.parking)<4||c!=="4+"&&Number(S.parking)!==Number(c))||s&&S.construction_status!==s)return!1;const k=String(S.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),_=parseInt(k,10)||0;return!(_<r||l!==1/0&&_>l)});if(e){Fa(n);return}if(!d.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}const p=sa(t);t.innerHTML=d.map(S=>It(S)).join(""),da(t,p);const u=document.getElementById("properties");u&&!u._carouselDelegated&&(u._carouselDelegated=!0,u.addEventListener("click",Et))}function Va(e){var o,i,c;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(s=>It(s)).join(""),t._carouselDelegated||(t._carouselDelegated=!0,t.addEventListener("click",Et));const a=t.closest(".selecao-carousel-wrap");(i=a==null?void 0:a.querySelector(".selecao-prev"))==null||i.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(c=a==null?void 0:a.querySelector(".selecao-next"))==null||c.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),ve()};function ra(e,t){var i;const n=parseInt(e.dataset.total,10);if(!n||n<2)return;let a=parseInt(e.dataset.idx,10)||0;a=(a+t+n)%n,e.dataset.idx=a;try{const c=JSON.parse(decodeURIComponent(e.dataset.images||"[]"));if(c.length&&c[a]){const s=He(c[a]),r=e.querySelector(".carousel-img"),l=e.querySelector(".carousel-img-bg");r&&(r.src=s),l&&(l.src=s)}}catch{const s=q.find(u=>String(u.id)===String(e.dataset.pid)),r=(i=s==null?void 0:s.images)!=null&&i.length?s.images:Ce,l=e.querySelector(".carousel-img"),d=e.querySelector(".carousel-img-bg"),p=r[a]?He(r[a]):"";l&&p&&(l.src=p),d&&p&&(d.src=p)}const o=e.querySelectorAll(".icard-dot");if(o.length){const c=a%o.length;o.forEach((s,r)=>s.classList.toggle("active",r===c))}}function Et(e){const t=e.target.closest(".carousel-btn");if(t){e.preventDefault(),e.stopPropagation();const a=t.closest(".icard-img-wrap");a&&ra(a,t.classList.contains("carousel-next")?1:-1);return}if(e.target.closest(".icard-wa")||e.target.closest(".icard-heart"))return;const n=e.target.closest("[data-href]");if(n){e.preventDefault(),window.location.href=n.dataset.href;return}}function Xa(){var a;const e=((a=document.getElementById("price-range"))==null?void 0:a.value)||"";if(!e)return{min:0,max:1/0};const[t,n]=e.split("-");return{min:parseInt(t,10)||0,max:n?parseInt(n,10):1/0}}function Ga(){const e=document.getElementById("price-range");e&&e.addEventListener("change",()=>ve())}function Wa(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=xe();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${g(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=xe().find(i=>i.name===e.value),o=a?$t(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(i=>`<option value="${i.name}">${g(i.name)}</option>`).join(""),ve()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",ve)})}function Pe(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var c;const a=n.cover_image||((c=n.images)==null?void 0:c[0])||Ce[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",i=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${g(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${g(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+g(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${g(o)}</td>
      <td class="cell-price">${g(Fe(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${i}</td>
      <td>
        <div class="action-btns">
          ${(y==null?void 0:y.role)==="admin"||(y==null?void 0:y.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(y==null?void 0:y.role)==="admin"||(y==null?void 0:y.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function Ja(){const e=document.getElementById("f-city");if(!e)return;const t=xe(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${g(a.name)}</option>`).join(""),n&&(e.value=n)}function Ka(){var e,t,n,a,o,i,c,s,r,l,d,p,u,w,E;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((i=document.getElementById("f-condominium"))==null?void 0:i.value)||"").trim().toLowerCase(),priceMin:parseFloat((c=document.getElementById("f-price-min"))==null?void 0:c.value)||0,priceMax:parseFloat((s=document.getElementById("f-price-max"))==null?void 0:s.value)||1/0,areaMin:parseFloat((r=document.getElementById("f-area-min"))==null?void 0:r.value)||0,areaMax:parseFloat((l=document.getElementById("f-area-max"))==null?void 0:l.value)||1/0,construction:((d=document.getElementById("f-construction"))==null?void 0:d.value)||"",published:((p=document.getElementById("f-published"))==null?void 0:p.value)||"",bedrooms:((u=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:u.dataset.val)||"",suites:((w=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:w.dataset.val)||"",parking:((E=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:E.dataset.val)||""}}function kt(e){const t=Ka();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const i=parseFloat(a.area)||0;return!(t.areaMin>0&&i<t.areaMin||t.areaMax<1/0&&i>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Ze(){if(!document.getElementById("admin-properties"))return;const e=await ta(),t=e.length,n=e.filter(c=>c.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),i=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),i&&(i.textContent="—"),Ja(),Pe(q)}let K=null,oe="",le=[];function ct(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden",(!history.state||history.state.modal!=="property")&&history.pushState({modal:"property"},"")}function Ke(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow="",history.state&&history.state.modal==="property"&&history.back()}window._modalPopstateBound||(window._modalPopstateBound=!0,window.addEventListener("popstate",()=>{const e=document.getElementById("property-modal");e&&!e.classList.contains("hidden")&&(e.classList.add("hidden"),document.body.style.overflow="")}));function Ue(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(le=Array.isArray(e)?[...e]:[],!le.length){t.style.display="none";return}t.style.display="",n.innerHTML=le.map(a=>`
    <div class="cover-thumb-wrap${a===oe?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star" title="Marcar como capa">★</span>
      <button type="button" class="cover-delete" title="Remover foto" aria-label="Remover foto">🗑️</button>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",o=>{o.target.closest(".cover-delete")||(oe=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(i=>i.classList.remove("selected")),a.classList.add("selected"))})}),n.querySelectorAll(".cover-delete").forEach(a=>{a.addEventListener("click",o=>{o.stopPropagation();const i=a.closest(".cover-thumb-wrap"),c=i==null?void 0:i.dataset.url;c&&confirm("Remover esta foto do imóvel?")&&(le=le.filter(s=>s!==c),oe===c&&(oe=le[0]||""),Ue(le))})})}}function st(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{var r;n.preventDefault();const a=new FormData(e),o=a.getAll("images");let i=[];const c=o.filter(l=>l.size>0);if(K&&(i=[...le]),c.length){t.disabled=!0,t.textContent=`Enviando 0/${c.length} foto…`;try{const l=await Ua(c,(d,p)=>{t.textContent=`Enviando ${d}/${p} foto…`});i=[...i,...l]}catch(l){console.error("Erro no upload:",l),t.disabled=!1,t.textContent=K?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}i.length||(i=[...Ce]);const s={...K?{id:K}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),state:a.get("state")||"",neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:i,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:oe||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",furnishing_status:a.get("furnishing_status")||"",furnished:a.get("furnishing_status")==="mobiliado",collection:JSON.stringify(["col_frente_mar","col_decorados","col_casas","col_alto_padrao","col_lancamentos"].filter(l=>a.get(l)).map(l=>a.get(l))),tenant_id:K?((r=q.find(l=>l.id===K))==null?void 0:r.tenant_id)??(y==null?void 0:y.tenant_id)??null:(y==null?void 0:y.tenant_id)??null};try{await Ma(s),K=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const l=document.getElementById("adminPublished");l&&(l.value="true");const d=document.getElementById("adminNeighborhood");d&&(d.innerHTML='<option value="">Selecione a cidade primeiro</option>');const p=document.getElementById("adminConstructionStatus");p&&(p.value=""),oe="",Ue([]),Ke(),await Ze()}catch(l){console.error(l),t.disabled=!1,t.textContent=K?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((l==null?void 0:l.message)||JSON.stringify(l)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await za(o),await Ze()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((y==null?void 0:y.role)!=="admin"&&(y==null?void 0:y.role)!=="super_admin")return;const o=Number(n.target.dataset.id);if(!o)return;const i=q.find(d=>d.id===o);if(!i)return;K=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=i.title||"",e.querySelector('[name="rua"]').value=i.rua||"",e.querySelector('[name="numero"]').value=i.numero||"",e.querySelector('[name="city"]').value=i.city||"";const c=e.querySelector('[name="state"]');c&&(c.value=i.state||""),e.querySelector('[name="price"]').value=i.price||"",e.querySelector('[name="bedrooms"]').value=i.bedrooms||"",e.querySelector('[name="suites"]').value=i.suites||"",e.querySelector('[name="area"]').value=i.area||"",e.querySelector('[name="parking"]').value=i.parking||"",e.querySelector('[name="description"]').value=i.description||"",e.querySelector('[name="construction_status"]').value=i.construction_status||"",e.querySelector('[name="owner_name"]').value=i.owner_name||"",e.querySelector('[name="owner_phone"]').value=i.owner_phone||"",e.querySelector('[name="owner_email"]').value=i.owner_email||"",e.querySelector('[name="owner_notes"]').value=i.owner_notes||"",e.querySelector('[name="condominium"]').value=i.condominium||"";const s=e.querySelector('[name="furnishing_status"]');if(s){const d=i.furnishing_status||(i.furnished===!0?"mobiliado":"vazio");s.value=d}try{const d=JSON.parse(i.collection||"[]");["col_frente_mar","col_decorados","col_casas","col_alto_padrao","col_lancamentos"].forEach(p=>{const u=e.querySelector('[name="'+p+'"]');u&&(u.checked=d.includes(u.value))})}catch{}const r=document.getElementById("adminPublished");r&&(r.value=i.published===!0?"true":"false");const l=document.getElementById("adminCitySelect");l&&(l.value=i.city||"",l.dispatchEvent(new Event("change")),setTimeout(()=>{const d=document.getElementById("adminNeighborhood");d&&(d.value=i.neighborhood||"")},50)),oe=i.cover_image||((a=i.images)==null?void 0:a[0])||"",Ue(i.images||[]),ct("Editar Imóvel")}})}function g(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function Ya(e){return e?String(e).replace(/\s*\([A-Z]{2}\)\s*$/i,"").trim():""}function Qa(e,t,n){const a=[];e&&a.push(e);const o=Ya(t);return o&&a.push(o+(n?"/"+n:"")),a.join(", ")}function It(e){var I;const t=(I=e.images)!=null&&I.length?e.images:Ce,n=Ta(t),a=n.length,o=He(e.cover_image||n[0]),i=Qa(e.neighborhood,e.city,e.state),c=Fe(e.price,window.currentLang||"pt"),s=`https://omarcorretor.com.br/property.html?id=${e.id}`,r=encodeURIComponent(`Olá! Tenho interesse no imóvel *${e.title}*${e.reference?` (Ref: ${e.reference})`:""}. Poderia me dar mais informações?
${s}`),l=e.area?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>${e.area}m²</span>`:"",d=e.bedrooms?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20v-6a2 2 0 012-2h16a2 2 0 012 2v6"/><path d="M2 14V8a2 2 0 012-2h4l2 3h8a2 2 0 012 2v3"/></svg>${e.bedrooms} quarto${e.bedrooms!=1?"s":""}</span>`:"",p=e.bathrooms?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 000-2.12L6 1.5a1.5 1.5 0 00-2.12 0L2 3.38a1.5 1.5 0 000 2.12L5.5 9"/><path d="M2 20h20M20 12H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2z"/></svg>${e.bathrooms} banheiro${e.bathrooms!=1?"s":""}</span>`:"",u=e.parking?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>${e.parking} vaga${e.parking!=1?"s":""}</span>`:"",w=Math.max(1,Math.min(a,6)),E=`<div class="icard-dots">${Array.from({length:w},(h,f)=>`<span class="icard-dot${f===0?" active":""}"></span>`).join("")}</div>`;return`
    <div class="imovel-card" data-pid="${e.id}">
      <div class="icard-img-wrap" data-total="${a}" data-idx="0" data-pid="${e.id}" data-images="${encodeURIComponent(JSON.stringify(n))}">
        <img src="${g(o)}" alt="" class="icard-img-bg carousel-img-bg" aria-hidden="true" loading="lazy" decoding="async">
        <div class="icard-img-link" data-href="property.html?id=${e.id}" role="link" tabindex="0" aria-label="Ver ${g(e.title)}">
          <img src="${g(o)}" alt="${g(e.title)}" class="icard-img carousel-img" loading="lazy" decoding="async">
        </div>
        ${a>1?`
          <button type="button" class="carousel-btn carousel-prev icard-prev" aria-label="Anterior">&#8249;</button>
          <button type="button" class="carousel-btn carousel-next icard-next" aria-label="Próximo">&#8250;</button>
        `:""}
        ${E}
      </div>
      <div class="icard-body" data-href="property.html?id=${e.id}">
        ${(()=>{const h=e.furnishing_status||(e.furnished===!0?"mobiliado":"");return h==="mobiliado"?'<span class="icard-badge badge-furn-mob">Mobiliado</span>':h==="semimobiliado"?'<span class="icard-badge badge-furn-semi">Semimobiliado</span>':h==="vazio"?'<span class="icard-badge badge-furn-vazio">Vazio</span>':""})()}
        <div class="icard-neighborhood">${g(e.neighborhood||e.title)}</div>
        <div class="icard-address">${g(i)}</div>
        ${l||d||p||u?`<div class="icard-specs">${l}${d}${p}${u}</div>`:""}
        <div class="icard-price-row">
          <div>
            <div class="icard-price-label">Comprar</div>
            <div class="icard-price">${g(c)}</div>
          </div>
        </div>
        <div class="icard-footer">
          <span class="icard-code">Cód. ${g(String(e.reference||e.id))}</span>
          <a href="https://wa.me/${Re}?text=${r}" target="_blank" rel="noopener" class="icard-wa" title="WhatsApp" onclick="fbq('track', 'Contact')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 24l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          </a>
          <a href="property.html?id=${e.id}" class="icard-heart" title="Ver detalhes">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `}let ce=[],ae=0;function Za(e){var p,u;const t=document.getElementById("view-modal-edit");t&&(t.dataset.pid=e.id),document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const n=document.getElementById("view-status-badge");e.published?(n.textContent="● Publicado",n.className="badge badge-green"):(n.textContent="○ Rascunho",n.className="badge badge-gray");const a=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=a.length?`📍 ${a.join(", ")}`:"";const o=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.join(" "))}`;document.getElementById("view-map-link").href=o,document.getElementById("view-directions-link").href=o;const i=((p=e.images)==null?void 0:p[0])||Ce[0];document.getElementById("view-thumb-preview").src=i,ce=(u=e.images)!=null&&u.length?e.images:Ce,ae=0,et(),document.getElementById("view-price").textContent=Fe(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const c=document.getElementById("view-condominium-item"),s=document.getElementById("view-condominium");s&&(s.textContent=e.condominium||""),c&&(c.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(w=>w.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(w=>w.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const r="https://omarcorretor.com.br/property.html?id="+e.id,l=document.getElementById("share-link-input");l&&(l.value=r);const d=document.getElementById("share-panel");d&&(d.style.display="none",d.dataset.pid=e.id),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Xe(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function et(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=ce[ae],e.alt=`Foto ${ae+1}`;const i=ce.length>1;n.style.display=i?"flex":"none",a.style.display=i?"flex":"none",t.textContent=i?`${ae+1} / ${ce.length}`:"",o.innerHTML=i?ce.map((c,s)=>`<img src="${c}" class="view-thumb${s===ae?" active":""}" data-i="${s}" alt="Foto ${s+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(c=>{c.addEventListener("click",()=>{ae=+c.dataset.i,et()})})}async function Mt(e){const{data:t}=await b.from("profiles").select("*").eq("id",e).maybeSingle();return t}function tt(e){var p,u;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const i=(e==null?void 0:e.name)||"Sem nome",c=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=i,o&&(o.textContent=c),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((p=i[0])==null?void 0:p.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const s=document.getElementById("avatar-dd-name"),r=document.getElementById("avatar-dd-role"),l=document.getElementById("avatar-dd-img"),d=document.getElementById("avatar-dd-initial");s&&(s.textContent=i),r&&(r.textContent=c),e!=null&&e.avatar_url&&l?(l.src=e.avatar_url,l.style.display="",d&&(d.style.display="none")):(d&&(d.textContent=((u=i[0])==null?void 0:u.toUpperCase())||"?",d.style.display=""),l&&(l.style.display="none"))}async function zt(e){const t=document.getElementById("avatar-dd-ver-site");if(!t)return;const n=(e==null?void 0:e.tenant_id)||z(),a=n&&n!==Y,o=window.location.origin,i=a?`${o}/demo.html?key=${n}`:`${o}/index.html`;if(t.href=i,!!a)try{const{data:c}=await b.from("tenants").select("domain").eq("id",n).maybeSingle(),s=window.location.hostname.replace(/^www\./,""),r=((c==null?void 0:c.domain)||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim();r&&r!==s&&(t.href=`https://${r}`)}catch{}}const Ge={dashboard:()=>Mn(),empresa:()=>va(),visual:()=>ya(),"site-config":()=>ba(),"crm-config":()=>ha(),integracoes:()=>xa(),midia:()=>wa(),depoimentos:()=>fa()};function de(e){var n,a;e==="vendas"&&setTimeout(()=>ca().catch(()=>{}),50),e==="perdas"&&setTimeout(()=>pa().catch(()=>{}),50),document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);if(t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),typeof Ge<"u"&&Ge[e]){const o=Ge[e];Ge[e]=null,setTimeout(o,0)}(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),ne(),e==="contatos"&&pn(),e==="funil"&&an(),e==="tarefas"&&on()}function Dt(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:va,visual:ya,"site-config":ba,"crm-config":ha,integracoes:xa,midia:wa,depoimentos:fa}).forEach(([a,o])=>{const i=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);i&&i.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>hn(),{once:!0}),window.lucide&&lucide.createIcons()}}function ne(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function en(){var a,o,i;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",c=>{c.target===t&&n()}),(i=document.getElementById("cp-save"))==null||i.addEventListener("click",async()=>{var p,u;const c=((p=document.getElementById("cp-new"))==null?void 0:p.value)||"",s=((u=document.getElementById("cp-confirm"))==null?void 0:u.value)||"",r=document.getElementById("cp-msg"),l=document.getElementById("cp-save");if(r.style.display="none",c.length<12){r.style.color="#ef4444",r.textContent="Mínimo 6 caracteres.",r.style.display="";return}if(c!==s){r.style.color="#ef4444",r.textContent="As senhas não coincidem.",r.style.display="";return}l.disabled=!0,l.textContent="Salvando…";const{error:d}=await b.auth.updateUser({password:c});if(l.disabled=!1,l.textContent="Salvar Senha",d){r.style.color="#ef4444",r.textContent="Erro: "+d.message,r.style.display="";return}r.style.color="#16a34a",r.textContent="✅ Senha alterada com sucesso!",r.style.display="",setTimeout(n,1500)})}function tn(){var i,c,s,r,l;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((i=document.getElementById("topnav-avatar-img"))==null?void 0:i.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(c=document.getElementById("cph-close"))==null||c.addEventListener("click",o),(s=document.getElementById("cph-cancel"))==null||s.addEventListener("click",o),t.addEventListener("click",d=>{d.target===t&&o()}),(r=document.getElementById("cph-file"))==null||r.addEventListener("change",d=>{const p=d.target.files[0];if(!p)return;const u=URL.createObjectURL(p),w=document.getElementById("cph-preview"),E=document.getElementById("cph-initial");w&&(w.src=u,w.style.display=""),E&&(E.style.display="none"),document.getElementById("cph-save").disabled=!1}),(l=document.getElementById("cph-save"))==null||l.addEventListener("click",async()=>{var w;const d=(w=document.getElementById("cph-file"))==null?void 0:w.files[0];if(!d)return;const p=document.getElementById("cph-save"),u=document.getElementById("cph-msg");p.disabled=!0,p.textContent="Salvando…";try{const E=await Ve(d,400,.85),I=`avatars/${y.id}-${Date.now()}.jpg`,{error:h}=await b.storage.from("imoveis").upload(I,E,{contentType:"image/jpeg",upsert:!0});if(h)throw h;const{data:{publicUrl:f}}=b.storage.from("imoveis").getPublicUrl(I);await b.from("profiles").update({avatar_url:f}).eq("id",y.id),y={...y,avatar_url:f},tt(y),o()}catch(E){u.style.color="#ef4444",u.textContent="Erro: "+E.message,u.style.display="",p.disabled=!1,p.textContent="Salvar Foto"}})}function pt(e,t){var i,c,s;const n=document.getElementById("add-corretor-modal-root");n&&n.remove();const a=document.createElement("div");a.id="add-corretor-modal-root",a.className="modal-backdrop",a.innerHTML=`
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
    </div>`,document.body.appendChild(a);const o=()=>a.remove();(i=document.getElementById("ac-close"))==null||i.addEventListener("click",o),(c=document.getElementById("ac-cancel"))==null||c.addEventListener("click",o),a.addEventListener("click",r=>{r.target===a&&o()}),(s=document.getElementById("ac-save"))==null||s.addEventListener("click",async()=>{var u,w,E;const r=(u=document.getElementById("ac-email"))==null?void 0:u.value.trim(),l=(w=document.getElementById("ac-password"))==null?void 0:w.value.trim(),d=document.getElementById("ac-save"),p=document.getElementById("ac-note");if(!r){alert("Informe o e-mail do corretor.");return}if(!l||l.length<12){alert("A senha precisa ter no mínimo 6 caracteres.");return}d.disabled=!0,d.textContent="Criando…",p.style.display="none";try{const I=e||(y==null?void 0:y.tenant_id)||null,h=((E=document.getElementById("ac-role"))==null?void 0:E.value)||"corretor",f=await he({email:r,password:l,role:h,tenant_id:I});d.disabled=!1,d.textContent="+ Criar Acesso",f.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",f.email_sent===!1?(p.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${g(r)}<br><strong>Senha:</strong> ${g(l)}`,p.style.color="#0f172a"):(p.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",p.style.color="#16a34a"),p.style.display="",typeof t=="function"&&setTimeout(t,1500)):alert("Erro: "+(f.error||"Falha desconhecida"))}catch(I){d.disabled=!1,d.textContent="+ Criar Acesso",alert("Erro: "+I.message)}})}function Nt(){var i,c,s,r,l,d,p,u,w,E,I;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",h=>{var $;h.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||($=document.getElementById("notif-dropdown"))==null||$.classList.add("hidden")}),(i=document.getElementById("avatar-dd-change-photo"))==null||i.addEventListener("click",h=>{h.stopPropagation(),ne(),tn()}),(c=document.getElementById("avatar-dd-change-pass"))==null||c.addEventListener("click",h=>{h.stopPropagation(),ne(),en()}),(s=document.getElementById("avatar-dd-add-corretor"))==null||s.addEventListener("click",h=>{h.stopPropagation(),ne(),pt()}),(r=document.getElementById("avatar-dd-settings"))==null||r.addEventListener("click",h=>{h.stopPropagation(),ne(),de("settings")}),(l=document.getElementById("avatar-dd-logout"))==null||l.addEventListener("click",async h=>{h.stopPropagation(),await b.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",h=>{var $;h.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||(($=document.getElementById("avatar-dropdown"))==null||$.classList.add("hidden"),dn())}),(d=document.getElementById("notif-mark-all"))==null||d.addEventListener("click",()=>{rn(),ne()}),(p=document.getElementById("btn-search-open"))==null||p.addEventListener("click",()=>{var h,f;(h=document.getElementById("search-overlay"))==null||h.classList.remove("hidden"),(f=document.getElementById("search-input"))==null||f.focus()}),(u=document.getElementById("search-overlay-close"))==null||u.addEventListener("click",()=>{var h;(h=document.getElementById("search-overlay"))==null||h.classList.add("hidden")}),(w=document.getElementById("search-overlay"))==null||w.addEventListener("click",h=>{h.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(E=document.getElementById("search-input"))==null||E.addEventListener("input",h=>{clearTimeout(o),o=setTimeout(()=>sn(h.target.value.trim()),280)}),(I=document.getElementById("search-input"))==null||I.addEventListener("keydown",h=>{var f;h.key==="Escape"&&((f=document.getElementById("search-overlay"))==null||f.classList.add("hidden"))}),document.addEventListener("click",ne)}let mt=!1,V=[],ue=[],G=[],ye={},la=[],O=null,De=null,Z={search:"",tags:new Set,status:""};async function an(){var t;if(setTimeout(()=>{typeof Ht=="function"&&Ht()},100),window._kanbanRefreshTimer&&clearInterval(window._kanbanRefreshTimer),window._kanbanRefreshTimer=setInterval(()=>{const n=document.querySelector('.section[data-section="funil"]');!n||n.offsetParent===null||H().catch(()=>{})},3e4),mt){await Rt();return}mt=!0,await Rt(),(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>gt()),Sn();const e=document.getElementById("funil-pipe-sel");e==null||e.addEventListener("change",async()=>{O=parseInt(e.value,10),await H()})}function ut(e){var i;const t=document.getElementById("kanban-filters");if(!t)return;t.style.display="block";const n=document.getElementById("kf-status");n&&(n.innerHTML='<option value="">Todos os status</option>'+la.map(c=>`<option value="${g(c.name)}">${g(c.name)}</option>`).join(""),n.value=Z.status,n.onchange=()=>{Z.status=n.value,ie()});const a=document.getElementById("kf-tags");if(a){if(!e.length){a.style.display="none";return}a.style.display="flex",a.innerHTML='<span class="kf-tags-label">Tags:</span>'+e.map(c=>`<button class="kf-tag-btn${Z.tags.has(c.name)?" active":""}" data-tag="${g(c.name)}"
          style="--kf-tc:${c.color}">
          ${g(c.name)}
        </button>`).join(""),a.querySelectorAll(".kf-tag-btn").forEach(c=>{c.addEventListener("click",()=>{const s=c.dataset.tag;Z.tags.has(s)?Z.tags.delete(s):Z.tags.add(s),ut(e),ie()})})}const o=document.getElementById("kf-search");o&&(o.value=Z.search,o.oninput=()=>{Z.search=o.value.toLowerCase(),ie()}),(i=document.getElementById("kf-clear"))==null||i.addEventListener("click",()=>{Z={search:"",tags:new Set,status:""},ut(e),ie()})}async function Rt(){const e=z(),[{data:t},{data:n},{data:a}]=await Promise.all([b.from("crm_pipelines").select("*").eq("tenant_id",e).order("sort_order"),b.from("crm_tags").select("*").eq("tenant_id",e).order("name"),b.from("crm_lead_statuses").select("*").eq("tenant_id",e).order("sort_order")]);V=t||[],la=a||[],ye={},(n||[]).forEach(s=>{ye[s.name]=s});const o=V.map(s=>s.id),{data:i}=o.length?await b.from("crm_stages").select("*").in("pipeline_id",o).order("sort_order"):{data:[]};ue=i||[],ut(n||[]);const c=document.getElementById("funil-pipe-sel");if(c){const s=O;c.innerHTML=V.length?V.map(l=>`<option value="${l.id}">${g(l.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const r=V.find(l=>l.id===s)||V.find(l=>l.is_default)||V[0];r?(c.value=r.id,O=r.id):O=null}await H()}async function H(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=b.from("leads").select("*").order("created_at",{ascending:!1}).is("converted_at",null).is("lost_at",null);(y==null?void 0:y.role)==="corretor"?t=t.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id)),O&&(t=t.eq("pipeline_id",O));const{data:n}=await t;G=n||[],ie()}function ie(){try{const i=document.getElementById("leads-list-view");i&&!i.classList.contains("hidden")&&Le()}catch{}const e=document.getElementById("kanban-board");if(!e)return;const t=ue.filter(i=>i.pipeline_id===O);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n=Z,a=G.filter(i=>{if(n.search&&!`${i.name||""} ${i.phone||""} ${i.email||""}`.toLowerCase().includes(n.search)||n.status&&i.status!==n.status)return!1;if(n.tags.size>0){const c=Array.isArray(i.tags)?i.tags:[];if(![...n.tags].every(s=>c.includes(s)))return!1}return!0}),o={};t.forEach(i=>{o[i.name]=[]}),a.forEach(i=>{var s,r,l,d;const c=i.stage||((s=t[0])==null?void 0:s.name);o[c]||(o[((r=t[0])==null?void 0:r.name)||""]=[]),(d=o[c]||o[(l=t[0])==null?void 0:l.name])==null||d.push(i)}),e.innerHTML=t.map(i=>{const c=o[i.name]||[],s=c.length?c.map(d=>{const p=(d.phone||"").replace(/\D/g,""),u=encodeURIComponent(`Olá ${d.name}! Aqui é da ${ee("company.name","nossa imobiliária")}. Vi seu interesse e gostaria de ajudar. Posso falar agora?`),w=d.status==="quente"?"Quente":d.status==="frio"?"Frio":d.status==="morno"?"Morno":"Em andamento";d.interest;const E=Array.isArray(d.tags)?d.tags.length:0;return`
        <div class="kanban-card" draggable="true" data-id="${d.id}" data-stage="${g(i.name)}" style="cursor:pointer;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
            <span class="rd-card-status">${g(w)}</span>
            <button class="rd-card-info-btn" data-lead="${d.id}" title="Ver resumo" onclick="event.stopPropagation();window.openLeadSidePanel('${d.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </button>
          </div>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;">
            <div class="kanban-card-name" style="flex:1;">${g(d.name||"—")}</div>
            ${p?`<a href="https://wa.me/${p}?text=${u}" target="_blank" rel="noopener"
              onclick="event.stopPropagation()"
              style="flex-shrink:0;width:28px;height:28px;background:#25d366;border-radius:6px;display:flex;align-items:center;justify-content:center;text-decoration:none;"
              title="Abrir WhatsApp" onclick="fbq('track', 'Contact')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>`:""}
          </div>
          ${d.phone?`<div class="kanban-card-info">📞 ${g(d.phone)}</div>`:""}
          ${d.email?`<div class="kanban-card-info" style="font-size:11px;color:#94a3b8;">✉ ${g(d.email)}</div>`:""}
          ${d.notes?`<div class="kanban-card-info" style="font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px;">📝 ${g(d.notes)}</div>`:""}
          ${E>0||d.source?`<div class="kanban-card-tags" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:2px;">
            ${d.source?`<span class="kanban-card-tag">${g(d.source)}</span>`:""}
            ${Array.isArray(d.tags)?d.tags.map(I=>{const h=ye[I],f=(h==null?void 0:h.color)||"#0369a1";return`<span class="kanban-card-tag" style="background:${f}18;color:${f};border:1px solid ${f}44;">${g(I)}</span>`}).join(""):""}
          </div>`:""}
          <div class="rd-card-icons">
            <span title="Avaliação (clique para mudar)" class="rd-card-stars" data-lead="${d.id}" onclick="event.stopPropagation();window.openRatingPicker?.('${d.id}', event)">
              ${[1,2,3,4,5].map(I=>`<svg viewBox="0 0 24 24" fill="${(d.rating||0)>=I?"#fbbf24":"#cbd5e1"}" stroke="none" width="13" height="13"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join("")}
            </span>
            <span title="Responsável">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
          </div>
          <button class="rd-card-task-btn" data-lead="${d.id}" onclick="event.stopPropagation();window.openTarefaModal?.(null,'${d.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Criar Tarefa
          </button>
        </div>`}).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>',r=c.reduce((d,p)=>d+(Number(p.budget_max)||0),0),l=r>0?"R$ "+r.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ 0,00";return`
      <div class="kanban-col" data-stage="${g(i.name)}">
        <div class="kanban-col-header">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${i.color||"#0ea5e9"}"></div>
            ${g(i.name.toUpperCase())} (${c.length})
          </div>
        </div>
        <div class="rd-col-value">${l}</div>
        <div class="rd-col-actions">
          <button class="rd-col-action" title="Atualizar coluna" data-stage="${g(i.name)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/></svg>
          </button>
          <button class="rd-col-action" title="Ver análises da etapa">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </button>
        </div>
        <div class="kanban-cards" data-stage="${g(i.name)}">${s}</div>
      </div>`}).join(""),nn(),window.lucide&&lucide.createIcons()}window.openLeadSidePanel=function(e){var c,s;const t=(typeof G<"u"?G:[]).find(r=>String(r.id)===String(e));if(!t){console.warn("[Sidepanel] lead não encontrado:",e);return}(c=document.getElementById("rd-lead-sidepanel"))==null||c.remove(),(s=document.getElementById("rd-lead-sidepanel-backdrop"))==null||s.remove();const n=document.createElement("div");n.id="rd-lead-sidepanel-backdrop",n.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,0.45);z-index:1400;opacity:0;transition:opacity .2s;",n.addEventListener("click",()=>window.closeLeadSidePanel());const a=document.createElement("div");a.id="rd-lead-sidepanel",a.className="rd-lead-sidepanel";const o=r=>{if(!r)return"—";try{const l=new Date(r),d=String(l.getDate()).padStart(2,"0"),p=String(l.getMonth()+1).padStart(2,"0");return`${d}/${p}/${l.getFullYear()} às ${String(l.getHours()).padStart(2,"0")}:${String(l.getMinutes()).padStart(2,"0")}`}catch{return r}},i=(t.notes?1:0)+(t.updated_at&&t.updated_at!==t.created_at?1:0);a.innerHTML=['<div class="rd-lead-sidepanel-header">','<div class="rd-lead-sidepanel-title">Sobre a Negociação</div>','<button class="rd-lead-sidepanel-close" onclick="window.closeLeadSidePanel()" title="Fechar">','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',"</button>","</div>",'<div class="rd-lead-sidepanel-body">','<div class="rd-lead-sidepanel-section-label">DADOS GERAIS</div>',`<div class="rd-lead-field"><div class="rd-lead-field-label">Nome</div><div class="rd-lead-field-value">${g(t.name||"—")}</div></div>`,t.phone?`<div class="rd-lead-field"><div class="rd-lead-field-label">Telefone</div><div class="rd-lead-field-value">📞 ${g(t.phone)}</div></div>`:"",t.email?`<div class="rd-lead-field"><div class="rd-lead-field-label">E-mail</div><div class="rd-lead-field-value">✉ ${g(t.email)}</div></div>`:"",`<div class="rd-lead-field"><div class="rd-lead-field-label">Fonte</div><div class="rd-lead-field-value">${g(t.source||"Não informado")}</div></div>`,t.utm_campaign?`<div class="rd-lead-field"><div class="rd-lead-field-label">Campanha</div><div class="rd-lead-field-value">${g(t.utm_campaign)}</div></div>`:"",t.utm_source?`<div class="rd-lead-field"><div class="rd-lead-field-label">UTM Source</div><div class="rd-lead-field-value">${g(t.utm_source)}</div></div>`:"",`<div class="rd-lead-field"><div class="rd-lead-field-label">Interações</div><div class="rd-lead-field-value">${i} interaç${i===1?"ão":"ões"}</div></div>`,t.notes?`<div class="rd-lead-field"><div class="rd-lead-field-label">Última anotação</div><div class="rd-lead-field-value" style="background:#f8fafc;padding:10px 12px;border-radius:6px;border-left:3px solid #06b6d4;">${g(t.notes)}</div></div>`:"",`<div class="rd-lead-field"><div class="rd-lead-field-label">Data de criação</div><div class="rd-lead-field-value">${o(t.created_at)}</div></div>`,t.updated_at&&t.updated_at!==t.created_at?`<div class="rd-lead-field"><div class="rd-lead-field-label">Último contato</div><div class="rd-lead-field-value">${o(t.updated_at)}</div></div>`:"",`<div class="rd-lead-field"><div class="rd-lead-field-label">Previsão de fechamento</div><div class="rd-lead-field-value" style="color:${t.next_contact?"#0f172a":"#94a3b8"}">${t.next_contact?o(t.next_contact):"Não preenchido"}</div></div>`,t.interest?`<div class="rd-lead-field"><div class="rd-lead-field-label">Qualificação / Interesse</div><div class="rd-lead-field-value">${g(t.interest)}</div></div>`:"",`<div class="rd-lead-field"><div class="rd-lead-field-label">⭐ Classificação</div><div class="rd-lead-field-value">${[1,2,3,4,5].map(r=>`<svg viewBox="0 0 24 24" fill="${(t.rating||0)>=r?"#fbbf24":"#cbd5e1"}" stroke="none" width="16" height="16" style="cursor:pointer" onclick="window.closeLeadSidePanel();setTimeout(()=>window.openRatingPicker('${t.id}',event),100)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join("")} ${t.rating?'<span style="margin-left:4px;font-size:11px;color:#92400e">'+t.rating+"/5</span>":""}</div></div>`,Array.isArray(t.tags)&&t.tags.length?`<div class="rd-lead-field"><div class="rd-lead-field-label">Tags</div><div class="rd-lead-field-value" style="display:flex;flex-wrap:wrap;gap:4px">${t.tags.map(r=>`<span style="background:#ecfeff;color:#0e7490;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600">${g(r)}</span>`).join("")}</div></div>`:"","</div>",'<div class="rd-lead-sidepanel-footer">',t.phone?`<button class="rd-btn-primary" style="background:#25d366;flex:1;" onclick="window.open('https://wa.me/${(t.phone||"").replace(/\D/g,"")}','_blank');if(typeof fbq==='function')fbq('track','Contact')">WhatsApp</button>`:"",`<button class="rd-btn-primary" style="flex:1;" onclick="window.closeLeadSidePanel();window.openLeadDetailPage('${t.id}')">Abrir Negociação</button>`,"</div>"].join(""),document.body.appendChild(n),document.body.appendChild(a),requestAnimationFrame(()=>{n.style.opacity="1",a.classList.add("open")})};window.openLeadDetailPage=async function(e){var w,E,I;const t=(typeof G<"u"?G:[]).find(h=>String(h.id)===String(e));if(!t){console.warn("[LeadPage] não encontrado:",e);return}document.querySelectorAll(".admin-section").forEach(h=>h.classList.add("hidden"));const n=document.getElementById("section-lead-detail");if(!n){console.warn("section-lead-detail não existe no HTML");return}n.classList.remove("hidden"),n.dataset.leadId=t.id,document.getElementById("rd-lp-name").textContent=t.name||"—";const a=(w=(typeof V<"u"?V:[]).find(h=>h.id===t.pipeline_id))==null?void 0:w.name,o=[];a&&o.push(`<span class="rd-lp-tag cyan">${g(a)}</span>`),t.source&&o.push(`<span class="rd-lp-tag">${g(t.source)}</span>`),document.getElementById("rd-lp-tags").innerHTML=o.join("");const i=(typeof ue<"u"?ue:[]).filter(h=>h.pipeline_id===t.pipeline_id),c=i.findIndex(h=>h.name===t.stage),s=document.getElementById("rd-lp-stages");i.length?(s.innerHTML=i.map((h,f)=>{const $=f===c?"active":f<c?"done":"",S=f===c&&t.updated_at?Math.max(1,Math.floor((Date.now()-new Date(t.updated_at).getTime())/864e5)):null;return`<div class="rd-leadpage-stage ${$}" data-stage="${g(h.name)}">
        ${g(h.name.toUpperCase())}
        ${S?`<span class="rd-leadpage-stage-days">(${S} dia${S>1?"s":""})</span>`:""}
      </div>`}).join(""),s.querySelectorAll(".rd-leadpage-stage").forEach(h=>{h.addEventListener("click",async()=>{const f=h.dataset.stage;if(f===t.stage)return;const $=t.stage;t.stage=f,window.openLeadDetailPage(t.id);const{error:S}=await b.from("leads").update({stage:f}).eq("id",t.id);S&&(t.stage=$,window.openLeadDetailPage(t.id),alert("Erro: "+S.message)),typeof H=="function"&&H().catch(()=>{})})})):s.innerHTML="";const r=h=>{if(!h)return null;try{const f=new Date(h);return`${String(f.getDate()).padStart(2,"0")}/${String(f.getMonth()+1).padStart(2,"0")}/${f.getFullYear()} ${String(f.getHours()).padStart(2,"0")}:${String(f.getMinutes()).padStart(2,"0")}`}catch{return h}},l=h=>h?"R$ "+Number(h).toLocaleString("pt-BR"):null,d=`<div class="rd-leadpage-field-row" style="background:#fffbeb;border-radius:6px;padding:10px 12px">
    <span class="rd-leadpage-field-label">⭐ Classificação</span>
    <span class="rd-leadpage-field-value">
      ${[1,2,3,4,5].map(h=>`<svg viewBox="0 0 24 24" fill="${(t.rating||0)>=h?"#fbbf24":"#cbd5e1"}" stroke="none" width="18" height="18" style="cursor:pointer;margin:0 1px" onclick="window.openRatingPicker?.('${t.id}', event)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join("")}
      <span style="margin-left:6px;font-size:12px;color:#92400e">${t.rating?t.rating+"/5":"Sem classificação"}</span>
    </span>
  </div>`,p=[["Nome",t.name],["Qualificação",t.interest||t.status],["Previsão de fechamento",r(t.next_contact)],["Fonte",t.source],["Campanha",t.utm_campaign],["Criada em",r(t.created_at)],["Valor total",l(t.budget_max)],["Orçamento mínimo",l(t.budget_min)],["Cidade de interesse",t.city_interest],["UTM Source",t.utm_source],["UTM Medium",t.utm_medium],["Última atualização",r(t.updated_at)]].filter(([h,f])=>f!=null&&f!=="");document.getElementById("rd-lp-negociacao-fields").innerHTML=d+(p.map(([h,f])=>`
    <div class="rd-leadpage-field-row">
      <span class="rd-leadpage-field-label">${g(h)}</span>
      <span class="rd-leadpage-field-value">${g(String(f))}</span>
    </div>
  `).join("")||'<p style="color:#94a3b8;font-size:13px;margin:0">Sem dados.</p>'),document.getElementById("rd-lp-contatos-fields").innerHTML=`
    <div style="margin-bottom:14px">
      <div style="font-weight:700;color:#0f172a;font-size:14px;margin-bottom:8px">${g(t.name||"—")}</div>
      ${t.phone?`<div style="font-size:13px;color:#0ea5e9;margin-bottom:6px">
        📞 <a href="tel:${g(t.phone)}" style="color:#0ea5e9;text-decoration:none">${g(t.phone)}</a>
        <button onclick="navigator.clipboard.writeText('${g(t.phone)}');this.textContent='✓'" style="margin-left:6px;background:none;border:none;cursor:pointer;color:#94a3b8;font-size:12px" title="Copiar">📋</button>
        <a href="https://wa.me/${(t.phone||"").replace(/\D/g,"")}" target="_blank" style="margin-left:6px;color:#25d366;text-decoration:none" title="WhatsApp">💬</a>
      </div>`:""}
      ${t.email?`<div style="font-size:13px;color:#0ea5e9">
        ✉ <a href="mailto:${g(t.email)}" style="color:#0ea5e9;text-decoration:none">${g(t.email)}</a>
        <button onclick="navigator.clipboard.writeText('${g(t.email)}');this.textContent='✓'" style="margin-left:6px;background:none;border:none;cursor:pointer;color:#94a3b8;font-size:12px" title="Copiar">📋</button>
      </div>`:""}
    </div>
    <button class="rd-leadpage-add-link">+ Adicionar contato</button>
  `,await((E=window._lpLoadTasks)==null?void 0:E.call(window,t.id));const u=typeof y<"u"&&(y==null?void 0:y.full_name)||"Não atribuído";document.getElementById("rd-lp-responsavel").textContent=u,n.querySelectorAll(".rd-leadpage-tab").forEach(h=>{h.onclick=()=>{var f;n.querySelectorAll(".rd-leadpage-tab").forEach($=>$.classList.remove("active")),h.classList.add("active"),n.querySelectorAll(".rd-leadpage-tab-panel").forEach($=>$.classList.remove("active")),(f=n.querySelector(`.rd-leadpage-tab-panel[data-panel="${h.dataset.tab}"]`))==null||f.classList.add("active")}}),await((I=window._lpLoadTimeline)==null?void 0:I.call(window,t.id)),document.getElementById("rd-lp-mark-lost").onclick=async()=>{const h=prompt("Motivo da perda (opcional):")||"",{error:f}=await b.from("leads").update({lost_at:new Date().toISOString(),lost_reason:h}).eq("id",t.id);if(f)return alert("Erro: "+f.message);typeof A=="function"?A("Lead marcado como perda","warn"):alert("Lead marcado como perda"),window.closeLeadDetailPage(),typeof H=="function"&&H().catch(()=>{})},document.getElementById("rd-lp-mark-won").onclick=async()=>{if(!confirm("Marcar como venda fechada?"))return;const{error:h}=await b.from("leads").update({converted_at:new Date().toISOString()}).eq("id",t.id);if(h)return alert("Erro: "+h.message);typeof A=="function"?A("🎉 Venda confirmada!","success"):alert("Venda confirmada!"),window.closeLeadDetailPage(),typeof H=="function"&&H().catch(()=>{})},document.getElementById("rd-lp-add-task").onclick=()=>{var h;return(h=window.openInlineTaskForm)==null?void 0:h.call(window,t.id)},document.getElementById("rd-lp-add-note").onclick=()=>{var h;return(h=window.openInlineNoteForm)==null?void 0:h.call(window,t.id)},window.scrollTo({top:0,behavior:"smooth"})};async function ca(){const e=document.getElementById("vendas-list"),t=document.getElementById("vendas-total");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';const n=typeof z=="function"?z():null;let a=b.from("leads").select("*").not("converted_at","is",null).order("converted_at",{ascending:!1});n&&(a=a.eq("tenant_id",n));const{data:o,error:i}=await a;if(i){e.innerHTML='<p style="color:#ef4444">Erro: '+g(i.message)+"</p>";return}const c=o||[];if(t&&(t.textContent=`${c.length} venda${c.length!==1?"s":""}`),!c.length){e.innerHTML=`<div class="rd-empty-card">
      <div style="font-size:48px">🎯</div>
      <div style="font-size:16px;font-weight:600;color:#0f172a;margin-top:10px">Nenhuma venda registrada ainda</div>
      <div style="color:#64748b;font-size:13px;margin-top:6px">Conforme você marcar leads como "venda" no funil, eles aparecem aqui.</div>
    </div>`;return}e.innerHTML=c.map(s=>{const r=s.converted_at?new Date(s.converted_at).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}):"—",l=s.budget_max?"R$ "+Number(s.budget_max).toLocaleString("pt-BR"):"—",d=(s.phone||"").replace(/\D/g,"");return`<div class="rd-result-card rd-result-won">
      <div class="rd-result-badge rd-badge-won">VENDA</div>
      <div class="rd-result-info">
        <div class="rd-result-name">${g(s.name||"—")}</div>
        <div class="rd-result-meta">
          ${s.phone?`<span>📞 ${g(s.phone)}</span>`:""}
          ${s.email?`<span>✉ ${g(s.email)}</span>`:""}
          ${s.source?`<span>🎯 ${g(s.source)}</span>`:""}
        </div>
      </div>
      <div class="rd-result-value">
        <div class="rd-result-value-label">Valor</div>
        <div class="rd-result-value-amount" style="color:#059669">${l}</div>
      </div>
      <div class="rd-result-date">
        <div class="rd-result-value-label">Fechada em</div>
        <div style="font-size:13px;font-weight:600">${r}</div>
      </div>
      <div class="rd-result-actions">
        ${d?`<a href="https://wa.me/${d}" target="_blank" class="rd-result-action rd-result-wa" title="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51"/></svg>
        </a>`:""}
        <button class="rd-result-action rd-result-reopen" data-id="${s.id}" title="Reabrir negociação">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
        </button>
      </div>
    </div>`}).join(""),e.querySelectorAll(".rd-result-reopen").forEach(s=>{s.addEventListener("click",async()=>{confirm("Reabrir esta negociação? O lead volta para o funil ativo.")&&(await b.from("leads").update({converted_at:null}).eq("id",s.dataset.id),typeof A=="function"&&A("Negociação reaberta","info"),await ca(),typeof H=="function"&&H().catch(()=>{}))})})}async function pa(){const e=document.getElementById("perdas-list"),t=document.getElementById("perdas-total");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';const n=typeof z=="function"?z():null;let a=b.from("leads").select("*").not("lost_at","is",null).order("lost_at",{ascending:!1});n&&(a=a.eq("tenant_id",n));const{data:o,error:i}=await a;if(i){e.innerHTML='<p style="color:#ef4444">Erro: '+g(i.message)+"</p>";return}const c=o||[];if(t&&(t.textContent=`${c.length} perda${c.length!==1?"s":""}`),!c.length){e.innerHTML=`<div class="rd-empty-card">
      <div style="font-size:48px">🛡️</div>
      <div style="font-size:16px;font-weight:600;color:#0f172a;margin-top:10px">Nenhum lead perdido ainda</div>
      <div style="color:#64748b;font-size:13px;margin-top:6px">Bons números! Quando algo der errado, você pode revisar aqui.</div>
    </div>`;return}e.innerHTML=c.map(s=>{const r=s.lost_at?new Date(s.lost_at).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}):"—",l=(s.phone||"").replace(/\D/g,"");return`<div class="rd-result-card rd-result-lost">
      <div class="rd-result-badge rd-badge-lost">PERDA</div>
      <div class="rd-result-info">
        <div class="rd-result-name">${g(s.name||"—")}</div>
        <div class="rd-result-meta">
          ${s.phone?`<span>📞 ${g(s.phone)}</span>`:""}
          ${s.email?`<span>✉ ${g(s.email)}</span>`:""}
          ${s.source?`<span>🎯 ${g(s.source)}</span>`:""}
        </div>
        ${s.lost_reason?`<div class="rd-result-reason">💬 ${g(s.lost_reason)}</div>`:""}
      </div>
      <div class="rd-result-date">
        <div class="rd-result-value-label">Marcado em</div>
        <div style="font-size:13px;font-weight:600">${r}</div>
      </div>
      <div class="rd-result-actions">
        ${l?`<a href="https://wa.me/${l}" target="_blank" class="rd-result-action rd-result-wa" title="Reativar via WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606z"/></svg>
        </a>`:""}
        <button class="rd-result-action rd-result-reopen" data-id="${s.id}" title="Reativar negociação">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
        </button>
      </div>
    </div>`}).join(""),e.querySelectorAll(".rd-result-reopen").forEach(s=>{s.addEventListener("click",async()=>{confirm("Reativar esta negociação? O lead volta para o funil ativo.")&&(await b.from("leads").update({lost_at:null,lost_reason:null}).eq("id",s.dataset.id),typeof A=="function"&&A("Lead reativado","info"),await pa(),typeof H=="function"&&H().catch(()=>{}))})})}window.openRatingPicker=function(e,t){var s,r;t&&t.stopPropagation&&t.stopPropagation();const n=(G||[]).find(l=>String(l.id)===String(e));if(!n)return;(s=document.getElementById("rd-rating-picker"))==null||s.remove(),(r=document.getElementById("rd-rating-backdrop"))==null||r.remove();const a=document.createElement("div");a.id="rd-rating-picker",a.className="rd-rating-picker",a.innerHTML=['<div class="rd-rating-picker-title">Classificação do lead</div>','<div class="rd-rating-picker-stars">',[1,2,3,4,5].map(l=>`<button class="rd-rating-star-btn ${(n.rating||0)>=l?"active":""}" data-value="${l}" title="${l} estrela${l>1?"s":""}"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></button>`).join(""),"</div>",'<div class="rd-rating-picker-labels"><span>Frio</span><span>Morno</span><span>Quente</span></div>','<button class="rd-rating-clear" data-value="0">✕ Sem classificação</button>'].join("");const o=t&&t.clientX?Math.min(t.clientX,window.innerWidth-260):100,i=t&&t.clientY?Math.min(t.clientY+8,window.innerHeight-200):100;a.style.left=o+"px",a.style.top=i+"px",document.body.appendChild(a);const c=document.createElement("div");c.id="rd-rating-backdrop",c.style.cssText="position:fixed;inset:0;z-index:1899;background:transparent",c.addEventListener("click",()=>{a.remove(),c.remove()}),document.body.appendChild(c),a.querySelectorAll(".rd-rating-star-btn").forEach(l=>{l.addEventListener("mouseenter",()=>{const d=parseInt(l.dataset.value,10);a.querySelectorAll(".rd-rating-star-btn").forEach(p=>{p.classList.toggle("hover",parseInt(p.dataset.value,10)<=d)})})}),a.addEventListener("mouseleave",()=>{a.querySelectorAll(".rd-rating-star-btn").forEach(l=>l.classList.remove("hover"))}),a.querySelectorAll("[data-value]").forEach(l=>{l.addEventListener("click",async()=>{const d=parseInt(l.dataset.value,10);n.rating=d,a.remove(),c.remove(),typeof ie=="function"&&ie();const p=document.getElementById("section-lead-detail");p&&!p.classList.contains("hidden")&&typeof openLeadDetailPage=="function"&&openLeadDetailPage(n.id);const{error:u}=await b.from("leads").update({rating:d}).eq("id",n.id);u?(console.warn("[Rating] erro:",u),typeof A=="function"&&A("Erro ao salvar","error")):typeof A=="function"&&A(d===0?"Classificação removida":`★ ${d} estrela${d>1?"s":""}`,"success")})})};let X={page:1,pageSize:10};function Le(){const e=document.getElementById("rd-leads-tbody");if(!e)return;const t=typeof G<"u"?G:[],n=typeof ue<"u"?ue:[],a=t.length,o=X.pageSize,i=Math.max(1,Math.ceil(a/o));X.page>i&&(X.page=i);const c=(X.page-1)*o,s=t.slice(c,c+o);if(document.getElementById("rd-list-total").textContent=`de ${a} negociaç${a===1?"ão":"ões"}`,document.getElementById("rd-list-page-info").textContent=`${X.page} / ${i}`,document.getElementById("rd-list-prev").disabled=X.page<=1,document.getElementById("rd-list-next").disabled=X.page>=i,!s.length){e.innerHTML='<tr><td colspan="8" style="text-align:center;padding:40px;color:#94a3b8">Nenhum lead ainda</td></tr>';return}const r=d=>{if(!d)return"—";try{const p=new Date(d);return`${String(p.getDate()).padStart(2,"0")}/${String(p.getMonth()+1).padStart(2,"0")}/${p.getFullYear()}`}catch{return"—"}};function l(d){const p=d.updated_at?Math.floor((Date.now()-new Date(d.updated_at).getTime())/864e5):999;return p<=1?{icon:"🏃",color:"#059669",title:"Ativo (atualizado recentemente)"}:p<=7?{icon:"🚶",color:"#0ea5e9",title:"Em andamento"}:p<=30?{icon:"😴",color:"#f59e0b",title:"Parado há mais de 1 semana"}:{icon:"🔴",color:"#dc2626",title:"Muito tempo sem contato"}}e.innerHTML=s.map(d=>{var $;const p=n.find(S=>S.name===d.stage),u=d.stage||"—",w=(p==null?void 0:p.color)||"#94a3b8",E=d.budget_max?"R$ "+Number(d.budget_max).toLocaleString("pt-BR"):null,I=d.rating||0,h=(($=(d.name||"?").trim()[0])==null?void 0:$.toUpperCase())||"?",f=l(d);return`
      <tr class="rd-leads-row" data-id="${d.id}">
        <td><input type="checkbox" class="rd-list-check" data-id="${d.id}"></td>
        <td class="rd-leads-name-cell">
          <a class="rd-leads-name" onclick="event.stopPropagation();window.openLeadDetailPage?.('${d.id}')">${g(d.name||"—")}</a>
          ${d.phone?`<div class="rd-leads-sub">${g(d.phone)}</div>`:""}
        </td>
        <td style="text-align:center">
          <span class="rd-leads-avatar" title="${g(typeof y<"u"&&(y==null?void 0:y.full_name)||"Você")}">${h}</span>
        </td>
        <td style="text-align:center">
          <span class="rd-leads-rating" onclick="event.stopPropagation();window.openRatingPicker?.('${d.id}', event)">
            ${[1,2,3,4,5].map(S=>`<span style="color:${I>=S?"#fbbf24":"#cbd5e1"};font-size:14px">★</span>`).join("")}
            <span style="margin-left:4px;font-size:12px;color:#64748b">${I||0}</span>
          </span>
        </td>
        <td>
          <span class="rd-leads-stage" style="background:${w}18;color:${w};border:1px solid ${w}55">${g(u.toUpperCase())}</span>
        </td>
        <td style="text-align:right">
          ${E?`<strong>${E}</strong>`:`<a class="rd-leads-add-value" onclick="event.stopPropagation();window.openLeadDetailPage?.('`+d.id+`')">Adicionar valor</a>`}
        </td>
        <td style="text-align:center;color:#64748b;font-size:13px">${r(d.created_at)}</td>
        <td style="text-align:center">
          <span title="${f.title}" style="font-size:18px;cursor:help">${f.icon}</span>
          <button class="rd-list-info-btn"  title="Ver resumo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </button>
        </td>
      </tr>`}).join(""),e.querySelectorAll(".rd-leads-row").forEach(d=>{d.addEventListener("click",p=>{var u;p.target.closest("a, button, input")||(u=window.openLeadSidePanel)==null||u.call(window,d.dataset.id)})})}function jt(e){const t=document.getElementById("kanban-board"),n=document.getElementById("leads-list-view");document.querySelectorAll(".rd-view-btn").forEach(o=>o.classList.toggle("active",o.dataset.view===e)),e==="list"?(t&&t.classList.add("hidden"),n&&n.classList.remove("hidden"),Le()):(t&&t.classList.remove("hidden"),n&&n.classList.add("hidden"));try{localStorage.setItem("imobi_funil_view",e)}catch{}}function Ht(){var e,t,n,a;document.querySelectorAll(".rd-view-btn").forEach(o=>{o._wired||(o._wired=!0,o.addEventListener("click",()=>jt(o.dataset.view)))}),(e=document.getElementById("rd-list-prev"))==null||e.addEventListener("click",()=>{X.page>1&&(X.page--,Le())}),(t=document.getElementById("rd-list-next"))==null||t.addEventListener("click",()=>{X.page++,Le()}),(n=document.getElementById("rd-list-pagesize"))==null||n.addEventListener("change",o=>{X.pageSize=parseInt(o.target.value,10)||10,X.page=1,Le()}),(a=document.getElementById("rd-list-check-all"))==null||a.addEventListener("change",o=>{document.querySelectorAll(".rd-list-check").forEach(i=>i.checked=o.target.checked)});try{localStorage.getItem("imobi_funil_view")==="list"&&jt("list")}catch{}}typeof window<"u"&&(window._rdRenderLeadsList=Le);window._lpLoadTasks=async function(e){const t=document.getElementById("rd-lp-tarefas");if(!t)return;t.innerHTML='<div style="text-align:center;padding:14px;color:#94a3b8;font-size:13px">Carregando tarefas…</div>';const{data:n,error:a}=await b.from("tasks").select("*").eq("lead_id",e).order("due_date",{ascending:!0,nullsFirst:!1});if(a){t.innerHTML='<div class="rd-leadpage-empty"><div class="rd-leadpage-empty-text">Erro: '+g(a.message)+"</div></div>";return}const i=(n||[]).filter(s=>s.status!=="concluida"&&s.status!=="done"),c=s=>{if(!s)return"";try{const r=new Date(s);return String(r.getDate()).padStart(2,"0")+"/"+String(r.getMonth()+1).padStart(2,"0")+"/"+r.getFullYear()+" "+String(r.getHours()).padStart(2,"0")+":"+String(r.getMinutes()).padStart(2,"0")}catch{return s}};if(!i.length){t.innerHTML=`<div class="rd-leadpage-empty"><div class="rd-leadpage-empty-text">Não existem tarefas pendentes para essa Negociação</div><button class="rd-leadpage-btn-add" onclick="window.openInlineTaskForm('`+e+`')">+ Criar tarefa</button></div>`;return}t.innerHTML=i.map(s=>{const r=s.due_date&&new Date(s.due_date)<new Date;return'<div class="rd-lp-task '+(r?"overdue":"")+'" data-id="'+s.id+'"><input type="checkbox" class="rd-lp-task-check" data-id="'+s.id+'" title="Marcar como concluída"><div class="rd-lp-task-body"><div class="rd-lp-task-title">'+g(s.title)+"</div>"+(s.description?'<div class="rd-lp-task-desc">'+g(s.description)+"</div>":"")+'<div class="rd-lp-task-meta">'+(s.due_date?'<span class="rd-lp-task-date '+(r?"overdue":"")+'">📅 '+c(s.due_date)+(r?" · ATRASADA":"")+"</span>":"")+'<span class="rd-lp-task-prio prio-'+(s.priority||"medium")+'">'+(s.priority||"medium").toUpperCase()+'</span></div></div><button class="rd-lp-task-del" data-id="'+s.id+'" title="Excluir">🗑️</button></div>'}).join(""),t.querySelectorAll(".rd-lp-task-check").forEach(s=>{s.addEventListener("change",async()=>{var l;s.disabled=!0;const{error:r}=await b.from("tasks").update({status:"done"}).eq("id",s.dataset.id);if(r){s.checked=!1,s.disabled=!1,alert("Erro: "+r.message);return}typeof A=="function"&&A("✓ Tarefa concluída","success"),window._lpLoadTasks(e),(l=window._lpLoadTimeline)==null||l.call(window,e)})}),t.querySelectorAll(".rd-lp-task-del").forEach(s=>{s.addEventListener("click",async()=>{confirm("Excluir esta tarefa?")&&(await b.from("tasks").delete().eq("id",s.dataset.id),window._lpLoadTasks(e))})})};window.openInlineTaskForm=function(e){var o;const t=document.getElementById("rd-lp-tarefas");if(!t)return;const n=new Date;n.setDate(n.getDate()+1),n.setHours(9,0,0,0);const a=n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0")+"T"+String(n.getHours()).padStart(2,"0")+":"+String(n.getMinutes()).padStart(2,"0");t.innerHTML='<form class="rd-lp-task-form" id="rd-lp-task-form"><div class="rd-lp-task-form-row"><input type="text" id="rd-lp-task-title" placeholder="O que precisa ser feito?" required></div><div class="rd-lp-task-form-row"><textarea id="rd-lp-task-desc" placeholder="Descrição (opcional)" rows="2"></textarea></div><div class="rd-lp-task-form-row rd-lp-task-form-grid"><label><span>Quando</span><input type="datetime-local" id="rd-lp-task-date" value="'+a+'"></label><label><span>Prioridade</span><select id="rd-lp-task-prio"><option value="low">Baixa</option><option value="medium" selected>Média</option><option value="high">Alta</option></select></label></div><div class="rd-lp-task-form-actions"><button type="button" class="rd-lp-task-cancel">Cancelar</button><button type="submit" class="rd-lp-task-save">Criar tarefa</button></div></form>',(o=document.getElementById("rd-lp-task-title"))==null||o.focus(),t.querySelector(".rd-lp-task-cancel").onclick=()=>window._lpLoadTasks(e),document.getElementById("rd-lp-task-form").addEventListener("submit",async i=>{var I;i.preventDefault();const c=i.target.querySelector(".rd-lp-task-save");c.disabled=!0,c.textContent="Salvando…";const s=document.getElementById("rd-lp-task-title").value.trim();if(!s){c.disabled=!1,c.textContent="Criar tarefa";return}const r=document.getElementById("rd-lp-task-desc").value.trim(),l=document.getElementById("rd-lp-task-date").value,d=document.getElementById("rd-lp-task-prio").value,p=typeof y<"u"&&(y==null?void 0:y.tenant_id)||null,u=typeof y<"u"&&(y==null?void 0:y.id)||null,w={lead_id:e,tenant_id:p,assigned_to:u,title:s,description:r||null,due_date:l?new Date(l).toISOString():null,priority:d,status:"pending"},{error:E}=await b.from("tasks").insert(w);if(E){c.disabled=!1,c.textContent="Criar tarefa",alert("Erro: "+E.message);return}typeof A=="function"&&A("✓ Tarefa criada","success"),window._lpLoadTasks(e),(I=window._lpLoadTimeline)==null||I.call(window,e)})};window.openInlineNoteForm=function(e){const t=document.getElementById("rd-lp-timeline");if(!t)return;const n=t.innerHTML;t.innerHTML='<form class="rd-lp-note-form" id="rd-lp-note-form"><textarea id="rd-lp-note-body" rows="3" placeholder="Escreva sua anotação…" required></textarea><div class="rd-lp-note-actions"><button type="button" class="rd-lp-note-cancel">Cancelar</button><button type="submit" class="rd-lp-note-save">Salvar anotação</button></div></form>'+n;const a=document.getElementById("rd-lp-note-body");a==null||a.focus(),t.querySelector(".rd-lp-note-cancel").onclick=()=>window._lpLoadTimeline(e),document.getElementById("rd-lp-note-form").addEventListener("submit",async o=>{o.preventDefault();const i=o.target.querySelector(".rd-lp-note-save");i.disabled=!0,i.textContent="Salvando…";const c=a.value.trim();if(!c){i.disabled=!1,i.textContent="Salvar anotação";return}const s=typeof y<"u"&&(y==null?void 0:y.tenant_id)||null,r=typeof y<"u"&&(y==null?void 0:y.id)||null,l=typeof y<"u"&&((y==null?void 0:y.full_name)||(y==null?void 0:y.email))||"Você",{error:d}=await b.from("lead_notes").insert({lead_id:e,tenant_id:s,author_id:r,author_name:l,body:c});if(d){i.disabled=!1,i.textContent="Salvar anotação",alert("Erro: "+d.message);return}typeof A=="function"&&A("✓ Anotação criada","success"),window._lpLoadTimeline(e)})};window._lpLoadTimeline=async function(e){const t=document.getElementById("rd-lp-timeline");if(!t)return;const n=(G||[]).find(l=>String(l.id)===String(e));if(!n)return;const[a,o]=await Promise.all([b.from("tasks").select("*").eq("lead_id",e).order("created_at",{ascending:!1}),b.from("lead_notes").select("*").eq("lead_id",e).order("created_at",{ascending:!1})]),i=a.data||[],c=o.data||[],s=[];c.forEach(l=>s.push({author:l.author_name||"Anotação",text:l.body,date:l.created_at,icon:"✍️",noteId:l.id})),i.filter(l=>l.status==="concluida"||l.status==="done").forEach(l=>{s.push({author:"Tarefa concluída",text:l.title+(l.description?`
`+l.description:""),date:l.updated_at||l.created_at,icon:"✅"})}),i.filter(l=>l.status!=="concluida"&&l.status!=="done").forEach(l=>{s.push({author:"Tarefa criada",text:l.title,date:l.created_at,icon:"📋"})}),n.notes&&s.push({author:"Anotação (antiga)",text:n.notes,date:n.updated_at||n.created_at,icon:"✍️"}),s.push({author:"Sistema",text:'Lead criado na etapa "'+(n.stage||"—")+'"',date:n.created_at,icon:"🌱"}),s.sort((l,d)=>new Date(d.date)-new Date(l.date));const r=l=>{if(!l)return"";try{const d=new Date(l);return String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0")+"/"+d.getFullYear()+" "+String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")}catch{return l}};t.innerHTML=s.length?s.map(l=>'<div class="rd-leadpage-timeline-item'+(l.noteId?" is-note":"")+'"><div class="rd-leadpage-timeline-author">'+(l.icon||"")+" "+g(l.author)+(l.noteId?'<button class="rd-lp-note-del" data-note="'+l.noteId+'" title="Excluir anotação">×</button>':"")+'</div><div class="rd-leadpage-timeline-text">'+g(l.text)+'</div><div class="rd-leadpage-timeline-date">'+r(l.date)+"</div></div>").join(""):'<p style="color:#94a3b8;font-size:13px">Sem histórico ainda. Clique em "+ Criar anotação" pra começar.</p>',t.querySelectorAll(".rd-lp-note-del").forEach(l=>{l.onclick=async()=>{if(!confirm("Excluir esta anotação?"))return;const{error:d}=await b.from("lead_notes").delete().eq("id",l.dataset.note);if(d)return alert("Erro: "+d.message);typeof A=="function"&&A("Anotação excluída","success"),window._lpLoadTimeline(e)}})};window.closeLeadDetailPage=function(){var t;const e=document.getElementById("section-lead-detail");e&&e.classList.add("hidden"),(t=document.getElementById("section-funil"))==null||t.classList.remove("hidden")};window.closeLeadSidePanel=function(){const e=document.getElementById("rd-lead-sidepanel"),t=document.getElementById("rd-lead-sidepanel-backdrop");e&&(e.classList.remove("open"),setTimeout(()=>e.remove(),250)),t&&(t.style.opacity="0",setTimeout(()=>t.remove(),250))};function nn(){const e=document.getElementById("kanban-board");e&&(e._kanbanListenersAttached||(e._kanbanListenersAttached=!0,e.addEventListener("click",t=>{var c;if(t.target.closest(".kanban-add-btn")){gt();return}const a=t.target.closest(".rd-card-task-btn");if(a){t.preventDefault();const s=a.dataset.lead;typeof qe=="function"?qe(null,s):console.warn("[Tarefa] openTarefaModal não disponível");return}const o=t.target.closest(".rd-card-info-btn");if(o){t.preventDefault();const s=(c=o.closest(".kanban-card"))==null?void 0:c.dataset.id;s&&typeof window.openLeadSidePanel=="function"&&window.openLeadSidePanel(s);return}if(t.target.closest("button, a, input, .rd-card-info-btn, .rd-card-task-btn, .rd-card-stars, .rd-card-status, [onclick]"))return;const i=t.target.closest(".kanban-card");if(i){const s=i.dataset.id;if(typeof window.openLeadSidePanel=="function")window.openLeadSidePanel(s);else{const r=G.find(l=>String(l.id)===String(s));r&&gt(r)}}}),e.addEventListener("dragstart",t=>{var a,o;const n=(o=(a=t.target).closest)==null?void 0:o.call(a,".kanban-card");if(n){De=n.dataset.id,n.classList.add("dragging");try{t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",De)}catch{}}}),e.addEventListener("dragend",t=>{var a,o;const n=(o=(a=t.target).closest)==null?void 0:o.call(a,".kanban-card");n&&n.classList.remove("dragging"),e.querySelectorAll(".kanban-col.drag-over").forEach(i=>i.classList.remove("drag-over"))}),e.addEventListener("dragover",t=>{var a,o;const n=(o=(a=t.target).closest)==null?void 0:o.call(a,".kanban-col");!n||!De||(t.preventDefault(),t.dataTransfer.dropEffect="move",e.querySelectorAll(".kanban-col.drag-over").forEach(i=>{i!==n&&i.classList.remove("drag-over")}),n.classList.add("drag-over"))}),e.addEventListener("dragleave",t=>{var a,o;const n=(o=(a=t.target).closest)==null?void 0:o.call(a,".kanban-col");n&&(n.contains(t.relatedTarget)||n.classList.remove("drag-over"))}),e.addEventListener("drop",async t=>{var r,l;const n=(l=(r=t.target).closest)==null?void 0:l.call(r,".kanban-col");if(!n)return;t.preventDefault(),n.classList.remove("drag-over");const a=n.dataset.stage,o=De;if(De=null,!o||!a)return;const i=G.find(d=>String(d.id)===String(o));if(!i||i.stage===a)return;const c=i.stage;i.stage=a,ie();const{error:s}=await b.from("leads").update({stage:a}).eq("id",o);s?(console.warn("[Kanban] erro ao mover:",s),i.stage=c,ie(),typeof A=="function"?A("Erro ao mover lead: "+s.message,"error"):alert("Erro ao mover lead. Tente de novo.")):typeof A=="function"&&A(`→ ${a}`,"success")})))}async function gt(e=null){var E,I,h;(E=document.getElementById("lead-detail-panel"))==null||E.remove();const t=!e,n=z(),{data:a}=await b.from("crm_tags").select("*").eq("tenant_id",n).order("name"),{data:o}=await b.from("crm_lead_statuses").select("*").eq("tenant_id",n).order("sort_order"),i=e!=null&&e.pipeline_id&&((I=V.find(f=>f.id===e.pipeline_id))==null?void 0:I.id)||O;function c(f){return ue.filter($=>$.pipeline_id===f).map($=>`<option value="${g($.name)}" ${(e==null?void 0:e.stage)===$.name?"selected":""}>${g($.name)}</option>`).join("")}const s=V.map(f=>`<option value="${f.id}" ${f.id===i?"selected":""}>${g(f.name)}</option>`).join(""),r=c(i),l=((e==null?void 0:e.phone)||"").replace(/\D/g,""),d=document.createElement("div");d.id="lead-detail-panel",d.style.cssText="position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:#fff;box-shadow:-4px 0 32px rgba(0,0,0,.15);z-index:1000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;",d.innerHTML=`
    <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0;">${t?"+ Novo Lead":"✏️ Editar Lead"}</h3>
      <button id="ldp-close" style="background:none;border:none;cursor:pointer;font-size:22px;color:#94a3b8;line-height:1;">✕</button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:20px 24px;display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">NOME *</label>
        <input id="ldp-name" class="form-input" type="text" value="${g((e==null?void 0:e.name)||"")}" placeholder="Nome do cliente">
      </div>
      <div style="display:flex;gap:10px;">
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">TELEFONE</label>
          <input id="ldp-phone" class="form-input" type="tel" value="${g((e==null?void 0:e.phone)||"")}" placeholder="(00) 00000-0000">
        </div>
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">E-MAIL</label>
          <input id="ldp-email" class="form-input" type="email" value="${g((e==null?void 0:e.email)||"")}" placeholder="email@...">
        </div>
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ORIGEM</label>
        <input id="ldp-source" class="form-input" type="text" value="${g((e==null?void 0:e.source)||"")}" placeholder="site, indicação, instagram…">
      </div>
      ${V.length>1?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">FUNIL</label>
        <select id="ldp-pipe" class="form-input">${s}</select>
      </div>`:""}
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ETAPA DO FUNIL</label>
        <select id="ldp-stage" class="form-input">${r}</select>
      </div>
      ${o!=null&&o.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">STATUS</label>
        <select id="ldp-status" class="form-input">
          <option value="">— Sem status —</option>
          ${o.map(f=>`<option value="${f.name}" ${(e==null?void 0:e.status)===f.name?"selected":""}>${g(f.name)}</option>`).join("")}
        </select>
      </div>`:""}
      <div id="ldp-tags-wrap" class="ldp-tags-section">
        <label class="ldp-field-label">TAGS</label>
        <div class="ldp-tag-badge-area" id="ldp-tag-badge-area">
          ${((e==null?void 0:e.tags)||[]).map(f=>{const S=(ye[f]||{}).color||"#6366F1";return`<span class="ldp-tag-badge" data-tag="${g(f)}" style="background:${S}18;color:${S};border-color:${S}55;">${g(f)}<span class="ldp-tag-rm" data-tag="${g(f)}">×</span></span>`}).join("")||'<span class="ldp-tag-empty">Nenhuma tag — clique em + para adicionar</span>'}
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
        <textarea id="ldp-notes" class="form-input" rows="4" placeholder="Observações, interesses, próximos passos…" style="resize:vertical;">${g((e==null?void 0:e.notes)||"")}</textarea>
      </div>
      ${l?(()=>{const f=encodeURIComponent(`Olá ${e!=null&&e.name?e.name.split(" ")[0]:""}! Aqui é da ${ee("company.name","nossa imobiliária")}. Vi seu interesse em imóveis e gostaria de ajudá-lo. Posso falar agora?`);return`<a href="https://wa.me/${l}?text=${f}" target="_blank" rel="noopener"
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
  `,document.body.appendChild(d),requestAnimationFrame(()=>{d.style.transform="translateX(0)"}),An(d,a||[],ye);const p=d.querySelector("#ldp-pipe"),u=d.querySelector("#ldp-stage");p&&u&&p.addEventListener("change",()=>{const f=p.value,$=ue.filter(S=>S.pipeline_id===f);u.innerHTML=$.map(S=>`<option value="${S.name}">${S.name}</option>`).join("")||'<option value="">— sem etapas —</option>'});const w=()=>{d.style.transform="translateX(100%)",setTimeout(()=>d.remove(),250)};document.getElementById("ldp-close").addEventListener("click",w),document.getElementById("ldp-save").addEventListener("click",async()=>{var B,C;const f=document.getElementById("ldp-save"),$=document.getElementById("ldp-msg"),S=document.getElementById("ldp-name").value.trim();if(!S){$.style.color="#ef4444",$.textContent="Nome é obrigatório.";return}f.disabled=!0,f.textContent="Salvando…";const k=[...d.querySelectorAll("#ldp-tag-badge-area .ldp-tag-badge[data-tag]")].map(T=>T.dataset.tag),_=document.getElementById("ldp-pipe"),m=_?_.value:i||O,v=t?typeof At=="function"?At():{}:{},x={name:S,phone:document.getElementById("ldp-phone").value.trim()||null,email:document.getElementById("ldp-email").value.trim()||null,source:document.getElementById("ldp-source").value.trim()||null,pipeline_id:m||null,stage:((B=document.getElementById("ldp-stage"))==null?void 0:B.value)||null,status:((C=document.getElementById("ldp-status"))==null?void 0:C.value)||null,notes:document.getElementById("ldp-notes").value.trim()||null,tags:k,tenant_id:z(),...t?{utm_source:v.utm_source||null,utm_medium:v.utm_medium||null,utm_campaign:v.utm_campaign||null,utm_content:v.utm_content||null,utm_term:v.utm_term||null,fbclid:v.fbclid||null,gclid:v.gclid||null,fbp:v.fbp||null,fbc:v.fbc||null,landing_url:v.landing_url||null,user_agent:navigator.userAgent||null}:{}};let L;if(t?{error:L}=await b.from("leads").insert(x):{error:L}=await b.from("leads").update(x).eq("id",e.id),f.disabled=!1,f.textContent="💾 Salvar",L){$.style.color="#ef4444",$.textContent="Erro: "+L.message;return}$.style.color="#22c55e",$.textContent="✅ Salvo!",w(),H().catch(T=>console.warn("[Kanban] reload falhou:",T)),t&&typeof sendLeadToCAPI=="function"&&sendLeadToCAPI({name:x.name,email:x.email,phone:x.phone,tracking:v}).then(async T=>{if(T!=null&&T.ok){console.log("[CAPI] Lead enviado ao Meta:",T.event_id);try{await b.from("leads").update({capi_event_id:T.event_id,capi_sent_at:new Date().toISOString()}).eq("name",x.name).eq("phone",x.phone||"").order("created_at",{ascending:!1}).limit(1)}catch(M){console.warn("[CAPI] falha ao salvar event_id:",M)}}else console.warn("[CAPI] não confirmado pelo Meta:",T)}).catch(T=>console.warn("[CAPI] erro:",T))}),(h=document.getElementById("ldp-delete"))==null||h.addEventListener("click",async()=>{confirm(`Excluir o lead "${e==null?void 0:e.name}"?`)&&(await b.from("leads").delete().eq("id",e.id),w(),H())})}let F=[],Ot=!1,$e="pending";async function on(){var e;window._tarefasRefreshTimer&&clearInterval(window._tarefasRefreshTimer),window._tarefasRefreshTimer=setInterval(()=>{const t=document.querySelector('.section[data-section="tarefas"]');!t||t.offsetParent===null||Pt().catch(()=>{})},3e4),!Ot&&(Ot=!0,await Pt(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>qe()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),$e=t.dataset.filter,Te()})}))}async function Pt(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=b.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(y==null?void 0:y.role)==="corretor"?t=t.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}F=n||[],Te()}function ma(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function Te(){const e=document.getElementById("tarefas-list");if(!e)return;let t=F;if($e==="pending"&&(t=F.filter(a=>a.status!=="done")),$e==="done"&&(t=F.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${$e==="done"?"✅":"📋"}</div>
      <p>${$e==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=ma(a.due_date),i=o?o.toLocaleDateString("pt-BR"):"",c=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${g(a.title)}</div>
          <div class="tarefa-meta">
            ${i?`<span style="${c?"color:#ef4444;":""}">📅 ${i}${c?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${g(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const i=a.dataset.id,c=a.checked?"done":"pending";await b.from("tasks").update({status:c}).eq("id",i);const s=F.find(r=>String(r.id)===i);s&&(s.status=c),Te()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await b.from("tasks").delete().eq("id",a.dataset.id),F=F.filter(i=>String(i.id)!==String(a.dataset.id)),Te())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const i=a.dataset.id,c=F.find(s=>String(s.id)===i);c&&qe(c)})})}function qe(e=null,t=null){var l,d,p,u;const n=document.getElementById("tarefa-modal-root");n&&n.remove();const a=!!e,o=(e==null?void 0:e.status)==="done",i=ma(e==null?void 0:e.due_date);i&&i.toLocaleDateString("pt-BR");const c=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",s=document.createElement("div");s.id="tarefa-modal-root",s.className="modal-backdrop",s.innerHTML=`
    <div class="modal" style="max-width:520px;">
      <div class="modal-header">
        <h3 style="display:flex;align-items:center;gap:10px;">
          ${o?'<span style="color:#22c55e;font-size:18px;">✅</span>':'<span style="font-size:18px;">📋</span>'}
          ${a?"Editar Tarefa":"Nova Tarefa"}
        </h3>
        <button class="modal-close" id="tm-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;">
        ${a&&o?'<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 14px;margin-bottom:16px;color:#15803d;font-size:13px;font-weight:600;">✅ Tarefa concluída</div>':""}
        <form id="tarefa-form" style="display:flex;flex-direction:column;gap:16px;">
          <div class="form-group">
            <label class="form-label">Título *</label>
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${g((e==null?void 0:e.title)||"")}">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prazo</label>
              <input name="due_date" type="date" class="form-control" value="${c}">
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
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${g((e==null?void 0:e.description)||"")}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer" style="display:flex;gap:8px;justify-content:space-between;align-items:center;">
        <div style="display:flex;gap:8px;">
          ${a?`<button id="tm-toggle-done" style="padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:2px solid ${o?"#94a3b8":"#22c55e"};background:${o?"#f8fafc":"#f0fdf4"};color:${o?"#64748b":"#15803d"};">
            ${o?"↩ Reabrir tarefa":"✅ Marcar como Concluída"}
          </button>`:""}
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="tm-cancel">Cancelar</button>
          <button class="btn-primary" id="tm-save" style="margin:0;">${a?"Salvar":"Criar Tarefa"}</button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(s);const r=()=>s.remove();(l=document.getElementById("tm-close"))==null||l.addEventListener("click",r),(d=document.getElementById("tm-cancel"))==null||d.addEventListener("click",r),s.addEventListener("click",w=>{w.target===s&&r()}),(p=document.getElementById("tm-toggle-done"))==null||p.addEventListener("click",async()=>{const w=o?"pending":"done";await b.from("tasks").update({status:w}).eq("id",e.id);const E=F.find(I=>String(I.id)===String(e.id));E&&(E.status=w),r(),w==="done"&&($e="done",document.querySelectorAll(".tarefa-filter-btn").forEach(I=>{I.classList.toggle("active",I.dataset.filter==="done")})),Te()}),(u=document.getElementById("tm-save"))==null||u.addEventListener("click",async()=>{var $,S;const w=document.getElementById("tarefa-form");if(!w.checkValidity()){w.reportValidity();return}const E=new FormData(w),I=document.getElementById("tm-save");I.disabled=!0,I.textContent="Salvando…";const h={title:($=E.get("title"))==null?void 0:$.trim(),description:((S=E.get("description"))==null?void 0:S.trim())||null,due_date:E.get("due_date")||null,priority:E.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null,lead_id:(e==null?void 0:e.lead_id)||t||null};let f;if(a){if({error:f}=await b.from("tasks").update(h).eq("id",e.id),!f){const k=F.findIndex(_=>String(_.id)===String(e.id));k>=0&&(F[k]={...F[k],...h})}}else{const{data:k,error:_}=await b.from("tasks").insert(h).select();f=_,!f&&(k!=null&&k[0])&&F.unshift(k[0])}if(I.disabled=!1,I.textContent=a?"Salvar":"Criar Tarefa",f){alert("Erro: "+f.message);return}r(),Te()})}async function sn(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;y==null||y.role,y==null||y.tenant_id;const[{data:a},{data:o}]=await Promise.all([b.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),b.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),i=[];a!=null&&a.length&&(i.push('<div class="search-group-label">Imóveis</div>'),i.push(...a.map(c=>`
      <div class="search-result-item" data-type="property" data-id="${c.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${g(c.title||"—")}</div>
          <div class="search-result-sub">${g(c.reference||"")} · ${g(c.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(i.push('<div class="search-group-label">Leads / Contatos</div>'),i.push(...o.map(c=>`
      <div class="search-result-item" data-type="lead" data-id="${c.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${g(c.name||"—")}</div>
          <div class="search-result-sub">${g(c.email||c.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=i.length?i.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(c=>{c.addEventListener("click",()=>{var s;(s=document.getElementById("search-overlay"))==null||s.classList.add("hidden"),c.dataset.type==="lead"?de("contatos"):de("properties")})})}let se=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function dn(){var c;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=b.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(s=>!se.includes(String(s.id))),i=document.getElementById("notif-badge");if(i&&(i.textContent=o.length,o.length>0?i.classList.remove("hidden"):i.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(s=>{const r=ln(s.created_at);return`
      <div class="notif-item${!se.includes(String(s.id))?" unread":""}" data-id="${s.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${g(s.name||"—")}</div>
          <div class="notif-item-sub">${g(s.phone||s.source||"")} · ${r}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(c=document.getElementById("notif-see-all"))==null||c.addEventListener("click",s=>{s.preventDefault(),ne(),de("contatos")}),e.querySelectorAll(".notif-item").forEach(s=>{s.addEventListener("click",()=>{se.push(s.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(se)),s.classList.remove("unread"),ne(),de("contatos")})})}function rn(){var e;document.querySelectorAll(".notif-item").forEach(t=>se.push(t.dataset.id)),se=[...new Set(se)],localStorage.setItem("crm_notifs_read",JSON.stringify(se)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function ln(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function cn(){let e=b.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);y!=null&&y.tenant_id&&(e=e.eq("tenant_id",y.tenant_id));const{data:t}=await e,a=(t||[]).filter(i=>!se.includes(String(i.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let te=[],U=1;const Ne=10;let Ut=!1;async function pn(){var t,n,a,o,i,c,s,r,l;window._contatosRefreshTimer&&clearInterval(window._contatosRefreshTimer),window._contatosRefreshTimer=setInterval(()=>{const d=document.querySelector('.section[data-section="contatos"]');!d||d.offsetParent===null||ft().catch(()=>{})},3e4),document.getElementById("section-contatos")&&(Ut||(Ut=!0,await ft(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{U=1,be()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",d=>{d.key==="Enter"&&(U=1,be())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>ua()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",gn),(i=document.getElementById("import-modal-close"))==null||i.addEventListener("click",vt),(c=document.getElementById("import-modal-cancel"))==null||c.addEventListener("click",vt),(s=document.getElementById("download-template"))==null||s.addEventListener("click",d=>{d.preventDefault();const p=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,u=new Blob([p],{type:"text/csv"}),w=document.createElement("a");w.href=URL.createObjectURL(u),w.download="modelo_contatos.csv",w.click()}),(r=document.getElementById("import-csv-file"))==null||r.addEventListener("change",mn),(l=document.getElementById("import-modal-confirm"))==null||l.addEventListener("click",un)))}async function ft(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=b.from("leads").select("*").order("created_at",{ascending:!1});(y==null?void 0:y.role)==="corretor"?t=t.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id));const{data:a}=await t;te=a||[],be()}function be(){var s,r,l;const e=(((s=document.getElementById("contato-search"))==null?void 0:s.value)||"").toLowerCase(),t=e?te.filter(d=>(d.name||"").toLowerCase().includes(e)||(d.email||"").toLowerCase().includes(e)||(d.phone||"").toLowerCase().includes(e)):te,n=t.length,a=Math.max(1,Math.ceil(n/Ne));U>a&&(U=a);const o=t.slice((U-1)*Ne,U*Ne),i=document.getElementById("contatos-tbody");if(!i)return;o.length?i.innerHTML=o.map(d=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${d.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${d.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${g(d.name||"—")}</a>
        </td>
        <td>${g(d.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${d.email?g(d.email):"—"}</td>
        <td style="font-size:13px;">${d.phone?g(d.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${g(d.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td style="display:flex;gap:6px;align-items:center;">
          ${(()=>{const p=(d.phone||"").replace(/\D/g,"");if(!p)return"";const u=encodeURIComponent(`Olá ${(d.name||"").split(" ")[0]}! Aqui é da ${ee("company.name","nossa imobiliária")}. Podemos conversar sobre seu interesse em imóveis?`);return`<a href="https://wa.me/${p}?text=${u}" target="_blank" rel="noopener" title="WhatsApp"
              style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;" onclick="fbq('track', 'Contact')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
            </a>`})()}
          <button class="icon-btn contato-edit-btn" data-id="${d.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):i.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const c=document.getElementById("contatos-pagination");if(c){const d=n===0?0:(U-1)*Ne+1,p=Math.min(U*Ne,n);c.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${d}–${p}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${U<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${U} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${U>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(r=c.querySelector("#pag-prev"))==null||r.addEventListener("click",()=>{U--,be()}),(l=c.querySelector("#pag-next"))==null||l.addEventListener("click",()=>{U++,be()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(d=>{d.addEventListener("click",p=>{p.preventDefault();const u=d.dataset.id,w=te.find(E=>String(E.id)===String(u));w&&ua(w)})})}async function ua(e=null){var f,$,S,k,_,m;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=z(),[{data:o},{data:i},{data:c}]=await Promise.all([b.from("crm_pipelines").select("*").eq("tenant_id",a).order("sort_order"),b.from("crm_tags").select("*").eq("tenant_id",a).order("name"),b.from("crm_lead_statuses").select("*").eq("tenant_id",a).order("sort_order")]),s=o||[],r=i||[],l=c||[],d=s.map(v=>v.id),{data:p}=d.length?await b.from("crm_stages").select("*").in("pipeline_id",d).order("sort_order"):{data:[]},u=p||[],w=(e==null?void 0:e.pipeline_id)||((f=s[0])==null?void 0:f.id)||"";function E(v){const x=u.filter(L=>L.pipeline_id===v);return x.length?'<option value="">— Selecionar etapa —</option>'+x.map(L=>`<option value="${g(L.name)}" ${(e==null?void 0:e.stage)===L.name?"selected":""}>${g(L.name)}</option>`).join(""):'<option value="">— Nenhuma etapa —</option>'}const I=document.createElement("div");I.id="contato-modal-root",I.className="modal-backdrop",I.innerHTML=`
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
              <input name="name" required class="form-control" placeholder="Nome completo" value="${g((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${g((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${g((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${g((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${g((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${g((e==null?void 0:e.city_interest)||"")}">
            </div>
          </div>

          ${s.length?`
          <div style="border-top:1px solid #f1f5f9;margin:8px 0 12px;padding-top:14px;">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;margin-bottom:10px;">FUNIL DE NEGOCIAÇÃO</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Funil</label>
                <select id="cm-pipe" name="pipeline_id" class="form-control">
                  <option value="">— Sem funil —</option>
                  ${s.map(v=>`<option value="${v.id}" ${String(e==null?void 0:e.pipeline_id)===String(v.id)?"selected":""}>${g(v.name)}</option>`).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Etapa</label>
                <select id="cm-stage" name="stage" class="form-control">
                  ${E(w)}
                </select>
              </div>
            </div>
          </div>`:""}

          ${l.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="">— Sem status —</option>
                ${l.map(v=>`<option value="${g(v.name)}" ${(e==null?void 0:e.status)===v.name?"selected":""}>${g(v.name)}</option>`).join("")}
              </select>
            </div>
          </div>`:""}

          ${r.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Tags</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                ${r.map(v=>`
                  <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:5px 12px;border-radius:20px;background:${v.color}18;border:1.5px solid ${v.color}55;font-size:12px;font-weight:600;color:${v.color};transition:opacity .15s;">
                    <input type="checkbox" name="tag" value="${g(v.name)}" style="margin:0;accent-color:${v.color};" ${((e==null?void 0:e.tags)||[]).includes(v.name)?"checked":""}>
                    ${g(v.name)}
                  </label>`).join("")}
              </div>
            </div>
          </div>`:""}

          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${g((e==null?void 0:e.notes)||"")}</textarea>
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
  `,document.body.appendChild(I);const h=()=>I.remove();($=document.getElementById("cm-close"))==null||$.addEventListener("click",h),(S=document.getElementById("cm-cancel"))==null||S.addEventListener("click",h),I.addEventListener("click",v=>{v.target===I&&h()}),(k=document.getElementById("cm-pipe"))==null||k.addEventListener("change",v=>{const x=document.getElementById("cm-stage");x&&(x.innerHTML=E(v.target.value))}),(_=document.getElementById("cm-delete"))==null||_.addEventListener("click",async()=>{if(!confirm(`Excluir o contato "${e==null?void 0:e.name}"?`))return;await b.from("leads").delete().eq("id",e.id);const v=te.findIndex(x=>String(x.id)===String(e.id));v>=0&&te.splice(v,1),h(),be()}),(m=document.getElementById("cm-save"))==null||m.addEventListener("click",async()=>{var D,P,W,re,ge,Ae,Me;const v=document.getElementById("contato-form");if(!v.checkValidity()){v.reportValidity();return}const x=new FormData(v),L=document.getElementById("cm-save");L.disabled=!0,L.textContent="Salvando…";const B=x.getAll("tag"),C=x.get("pipeline_id")||null,T={name:(D=x.get("name"))==null?void 0:D.trim(),company:((P=x.get("company"))==null?void 0:P.trim())||null,email:((W=x.get("email"))==null?void 0:W.trim())||null,phone:((re=x.get("phone"))==null?void 0:re.trim())||null,job_title:((ge=x.get("job_title"))==null?void 0:ge.trim())||null,city_interest:((Ae=x.get("city_interest"))==null?void 0:Ae.trim())||null,notes:((Me=x.get("notes"))==null?void 0:Me.trim())||null,pipeline_id:C,stage:x.get("stage")||null,status:x.get("status")||null,tags:B,assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null,source:(e==null?void 0:e.source)||"manual"};let M;if(n){if({error:M}=await b.from("leads").update(T).eq("id",e.id),!M){const J=te.findIndex(Ee=>String(Ee.id)===String(e.id));J>=0&&(te[J]={...te[J],...T})}}else{const{data:J,error:Ee}=await b.from("leads").insert(T).select();M=Ee,!M&&(J!=null&&J[0])&&te.unshift(J[0])}if(L.disabled=!1,L.textContent=n?"Salvar":"Criar Contato",M){alert("Erro: "+M.message);return}h(),be()})}let Be=[];function mn(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{Be=a.target.result.split(`
`).filter(s=>s.trim()).slice(1).map(s=>{const[r,l,d,p,u]=s.split(",").map(w=>w.trim().replace(/^"|"$/g,""));return{name:r,email:l,phone:d,company:p,job_title:u}}).filter(s=>s.name);const i=document.getElementById("import-preview");i&&(i.textContent=`${Be.length} contato(s) encontrados para importar.`);const c=document.getElementById("import-modal-confirm");c&&(c.disabled=Be.length===0)},n.readAsText(t)}async function un(){if(!Be.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=Be.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null})),{error:n}=await b.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}vt(),await ft(),alert(`${t.length} contato(s) importados com sucesso!`)}function gn(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),Be=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function vt(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const fn="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function he(e){return(await fetch(fn,{method:"POST",headers:{Authorization:`Bearer ${Ba}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function Ft(e){var r,l,d,p;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),i=document.getElementById("settings-avatar-input"),c=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:u}}=await b.auth.getUser();n.value=(u==null?void 0:u.email)||""}const s=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=s),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),i==null||i.addEventListener("change",u=>{const w=u.target.files[0];if(!w)return;const E=URL.createObjectURL(w);a&&(a.src=E,a.style.display=""),o&&(o.style.display="none")}),(r=document.getElementById("btn-change-password"))==null||r.addEventListener("click",async()=>{var f,$;const u=((f=document.getElementById("change-password-new"))==null?void 0:f.value)||"",w=(($=document.getElementById("change-password-confirm"))==null?void 0:$.value)||"",E=document.getElementById("change-password-msg"),I=document.getElementById("btn-change-password");if(E&&(E.style.display="none"),u.length<12){E&&(E.textContent="Mínimo 6 caracteres.",E.style.display="");return}if(u!==w){E&&(E.textContent="As senhas não coincidem.",E.style.display="");return}I&&(I.disabled=!0,I.textContent="Salvando…");const{error:h}=await b.auth.updateUser({password:u});I&&(I.disabled=!1,I.textContent="Salvar Nova Senha"),h?E&&(E.textContent="Erro: "+h.message,E.style.display=""):(E&&(E.style.color="#16a34a",E.textContent="Senha alterada com sucesso!",E.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),c==null||c.addEventListener("click",async()=>{var $;const u=t.value.trim();let w=(y==null?void 0:y.avatar_url)||"";const E=i==null?void 0:i.files[0],I=c.textContent;if(c.disabled=!0,c.textContent="Salvando…",E)try{const S=await Ve(E,400,.85),k=`avatars/${y.id}-${Date.now()}.jpg`,{error:_}=await b.storage.from("imoveis").upload(k,S,{contentType:"image/jpeg",upsert:!0});if(!_){const{data:{publicUrl:m}}=b.storage.from("imoveis").getPublicUrl(k);w=m}}catch(S){console.error("Avatar upload:",S)}const{error:h}=await b.from("profiles").update({name:u,avatar_url:w}).eq("id",y.id);if(c.disabled=!1,c.textContent=I,h){alert("Erro ao salvar perfil.");return}y={...y,name:u,avatar_url:w},tt(y);const f=document.getElementById("settings-avatar-initial");f&&(f.textContent=(($=u[0])==null?void 0:$.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const u=document.getElementById("settings-corretores-section");u&&(u.style.display=""),await at(),(l=document.getElementById("btn-invite-corretor"))==null||l.addEventListener("click",async()=>{var $,S;const E=($=document.getElementById("invite-email"))==null?void 0:$.value.trim(),I=(S=document.getElementById("invite-password"))==null?void 0:S.value.trim(),h=document.getElementById("btn-invite-corretor"),f=document.getElementById("invite-note");if(!E){alert("Informe o e-mail do corretor.");return}if(!I||I.length<12){alert("A senha precisa ter no mínimo 6 caracteres.");return}h&&(h.disabled=!0,h.textContent="Criando…"),f&&(f.style.display="none");try{const k=await he({email:E,password:I,tenant_id:(y==null?void 0:y.tenant_id)||null});if(k.success){const _=document.getElementById("invite-email"),m=document.getElementById("invite-password");_&&(_.value=""),m&&(m.value=""),await at(),f&&(k.email_sent===!1?(f.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${g(E)}<br>
                <strong>Senha:</strong> ${g(I)}`,f.style.color="#0f172a"):(f.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",f.style.color="#16a34a"),f.style.display="")}else alert("Erro: "+(k.error||"Falha desconhecida"))}catch(k){alert("Erro ao criar acesso: "+k.message)}finally{h&&(h.disabled=!1,h.textContent="+ Criar Acesso")}});const w=document.getElementById("settings-locations-section");w&&(w.style.display=""),await je(),(d=document.getElementById("loc-add-city-btn"))==null||d.addEventListener("click",async()=>{const E=document.getElementById("loc-new-city"),I=E==null?void 0:E.value.trim();if(!I)return;const{error:h}=await b.from("locations").insert({type:"cidade",name:I});if(h){alert("Erro ao adicionar cidade.");return}E&&(E.value=""),await je(),St()}),(p=document.getElementById("loc-add-neighborhood-btn"))==null||p.addEventListener("click",async()=>{var $;const E=parseInt(($=document.getElementById("loc-new-neighborhood-city"))==null?void 0:$.value,10),I=document.getElementById("loc-new-neighborhood"),h=I==null?void 0:I.value.trim();if(!E||!h){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:f}=await b.from("locations").insert({type:"bairro",name:h,parent_id:E});if(f){alert("Erro ao adicionar bairro.");return}I&&(I.value=""),await je()})}}async function at(){const e=document.getElementById("corretores-list");if(!e)return;let t=b.from("profiles").select("*").order("created_at");y!=null&&y.tenant_id&&(t=t.eq("tenant_id",y.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const i=(o.name||"?")[0].toUpperCase(),c=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${g(i)}</div>`,s=o.id===(y==null?void 0:y.id),r=o.active!==!1,l=r?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',d=s?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,p=s?"":r?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,u=s?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${c}
        <div>
          <div class="corretor-name">${g(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${l}
        ${d}
        ${p}
        ${u}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{var c;(c=o.options[o.selectedIndex])!=null&&c.text,o.disabled=!0;const{error:i}=await b.from("profiles").update({role:o.value}).eq("id",o.dataset.uid);o.disabled=!1,i&&(console.warn("[Profiles] erro ao trocar role:",i),alert("Erro ao salvar: "+i.message))})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.uid,c=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const s=await he({action:"toggle",userId:i,active:!c});s.success||alert("Erro: "+(s.error||"Falha desconhecida"))}catch(s){alert("Erro: "+s.message)}await at()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var s,r;const i=o.dataset.uid,c=((r=(s=o.closest(".corretor-item"))==null?void 0:s.querySelector(".corretor-name"))==null?void 0:r.textContent)||"este corretor";if(confirm(`Excluir "${c}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const l=await he({action:"delete",userId:i});l.success||alert("Erro ao excluir: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await at()}})})}async function ga(){const{data:e,error:t}=await b.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(Oe=e||[],Oe)}function xe(){return Oe.filter(e=>e.type==="cidade")}function $t(e){return Oe.filter(t=>t.type==="bairro"&&t.parent_id===e)}function St(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=xe();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${g(a.name)}</option>`).join(""),t&&(e.value=t)}async function je(){await ga();const e=xe(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(i=>`
        <div class="loc-item">
          <span class="loc-item-name">${g(i.name)}</span>
          <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=Oe.filter(i=>i.type==="bairro");n.innerHTML=o.length?o.map(i=>{const c=e.find(s=>s.id===i.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${g(i.name)}</div>
              ${c?`<div class="loc-item-sub">${g(c.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(i=>`<option value="${i.id}">${g(i.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{const c=i.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${c}" e todos os bairros vinculados?`))return;const{error:s}=await b.from("locations").delete().eq("id",i.dataset.id);if(s){alert("Erro ao excluir.");return}await je(),St()})}),n.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:c}=await b.from("locations").delete().eq("id",i.dataset.id);if(c){alert("Erro ao excluir.");return}await je()})})}function Vt(){var n,a,o,i,c,s,r,l,d,p,u,w,E,I,h,f,$,S,k,_;document.querySelectorAll(".filter-btn").forEach(m=>{m.addEventListener("click",()=>{const v=m.closest(".filter-btns"),x=m.classList.contains("active");v.querySelectorAll(".filter-btn").forEach(L=>L.classList.remove("active")),x||m.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var B;const m=(B=document.getElementById("f-city"))==null?void 0:B.value,v=xe().find(C=>C.name===m),x=v?$t(v.id):[],L=document.getElementById("f-neighborhood");L&&(L.innerHTML='<option value="">Todos</option>'+x.map(C=>`<option value="${C.name}">${g(C.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{Pe(kt(q))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{const m=document.querySelector(".admin-filter-panel");if(m){m.querySelectorAll('input[type="text"], input[type="number"]').forEach(x=>{x.value=""}),m.querySelectorAll("select").forEach(x=>{x.selectedIndex=0});const v=document.getElementById("f-neighborhood");v&&(v.innerHTML='<option value="">Todos</option>'),m.querySelectorAll(".filter-btn.active").forEach(x=>x.classList.remove("active"))}Pe(q)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(m=>{m.addEventListener("click",()=>{de(m.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(m=>{m.addEventListener("click",()=>{de(m.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(m=>{m.addEventListener("click",v=>{v.stopPropagation();const x=m.closest(".topnav-dropdown");x==null||x.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(L=>{L!==x&&L.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(m=>m.classList.remove("open"))}),(i=document.getElementById("modal-close"))==null||i.addEventListener("click",Ke),(c=document.getElementById("modal-cancel"))==null||c.addEventListener("click",Ke),(s=document.getElementById("property-modal"))==null||s.addEventListener("click",m=>{m.target.id==="property-modal"&&Ke()}),(r=document.getElementById("btn-new-property"))==null||r.addEventListener("click",()=>{K=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",oe="",Ue([]),ct("Novo Imóvel")}),(l=document.getElementById("logout-btn"))==null||l.addEventListener("click",async()=>{await b.auth.signOut(),location.reload()}),(d=document.getElementById("view-prev"))==null||d.addEventListener("click",()=>{ae=(ae-1+ce.length)%ce.length,et()}),(p=document.getElementById("view-next"))==null||p.addEventListener("click",()=>{ae=(ae+1)%ce.length,et()}),(u=document.getElementById("view-modal-close"))==null||u.addEventListener("click",Xe),(w=document.getElementById("view-modal-close2"))==null||w.addEventListener("click",Xe),(E=document.getElementById("view-modal"))==null||E.addEventListener("click",m=>{m.target.id==="view-modal"&&Xe()}),(I=document.getElementById("view-modal-share"))==null||I.addEventListener("click",()=>{const m=document.getElementById("share-panel");if(!m)return;const v=m.style.display!=="none";m.style.display=v?"none":"block"}),(h=document.getElementById("share-whatsapp"))==null||h.addEventListener("click",()=>{var P,W,re;const m=(P=document.getElementById("share-link-input"))==null?void 0:P.value;if(!m)return;const v=Number((W=document.getElementById("share-panel"))==null?void 0:W.dataset.pid),x=q.find(ge=>ge.id===v),L=(x==null?void 0:x.title)||((re=document.getElementById("view-modal-title"))==null?void 0:re.textContent)||"Imóvel",B=x!=null&&x.price?` — ${Fe(x.price,"pt")}`:"",C=x!=null&&x.reference?` | Ref: ${x.reference}`:"",T=[x==null?void 0:x.neighborhood,x==null?void 0:x.city].filter(Boolean).join(", "),M=T?`
📍 ${T}`:"",D=encodeURIComponent(`Olha esse imóvel que encontrei: *${L}*${B}${C}${M}

${m}`);window.open("https://wa.me/?text="+D,"_blank")}),(f=document.getElementById("share-instagram"))==null||f.addEventListener("click",()=>{var v,x;const m=(v=document.getElementById("share-link-input"))==null?void 0:v.value;m&&((x=navigator.clipboard)==null||x.writeText(m),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),($=document.getElementById("share-email"))==null||$.addEventListener("click",()=>{var B,C;const m=(B=document.getElementById("share-link-input"))==null?void 0:B.value;if(!m)return;const v=((C=document.getElementById("view-modal-title"))==null?void 0:C.textContent)||"Imóvel",x=encodeURIComponent("Imóvel: "+v),L=encodeURIComponent(`Olá! Segue o link do imóvel:

`+m);window.open("mailto:?subject="+x+"&body="+L,"_blank")}),(S=document.getElementById("share-copy"))==null||S.addEventListener("click",()=>{var v;const m=document.getElementById("share-link-input");m&&((v=navigator.clipboard)==null||v.writeText(m.value).then(()=>{const x=document.getElementById("share-copy"),L=x.textContent;x.textContent="✅ Copiado!",setTimeout(()=>{x.textContent=L},2e3)}))}),(k=document.getElementById("view-modal-edit"))==null||k.addEventListener("click",()=>{var T;if((y==null?void 0:y.role)!=="admin"&&(y==null?void 0:y.role)!=="super_admin")return;const m=Number(document.getElementById("view-modal-edit").dataset.pid),v=q.find(M=>M.id===m);if(!v)return;Xe(),K=v.id;const x=document.getElementById("property-form"),L=document.getElementById("form-submit-btn");L.textContent="Salvar Alterações",x.querySelector('[name="title"]').value=v.title||"",x.querySelector('[name="rua"]').value=v.rua||"",x.querySelector('[name="numero"]').value=v.numero||"",x.querySelector('[name="city"]').value=v.city||"",x.querySelector('[name="price"]').value=v.price||"",x.querySelector('[name="bedrooms"]').value=v.bedrooms||"",x.querySelector('[name="suites"]').value=v.suites||"",x.querySelector('[name="parking"]').value=v.parking||"",x.querySelector('[name="description"]').value=v.description||"",x.querySelector('[name="construction_status"]').value=v.construction_status||"",x.querySelector('[name="owner_name"]').value=v.owner_name||"",x.querySelector('[name="owner_phone"]').value=v.owner_phone||"",x.querySelector('[name="owner_email"]').value=v.owner_email||"",x.querySelector('[name="owner_notes"]').value=v.owner_notes||"",x.querySelector('[name="condominium"]').value=v.condominium||"";const B=document.getElementById("adminPublished");B&&(B.value=v.published===!0?"true":"false");const C=document.getElementById("adminCitySelect");C&&(C.value=v.city||"",C.dispatchEvent(new Event("change")),setTimeout(()=>{const M=document.getElementById("adminNeighborhood");M&&(M.value=v.neighborhood||"")},50)),oe=v.cover_image||((T=v.images)==null?void 0:T[0])||"",Ue(v.images||[]),ct("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(m=>{m.addEventListener("click",()=>{var v;document.querySelectorAll(".tab-btn").forEach(x=>x.classList.remove("active")),m.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(x=>x.classList.add("hidden")),(v=document.getElementById(`tab-${m.dataset.tab}`))==null||v.classList.remove("hidden")})}),(_=document.getElementById("admin-properties"))==null||_.addEventListener("click",m=>{if(m.target.closest(".action-btns"))return;const v=m.target.closest("tr");if(!v)return;const x=Number(v.dataset.id);if(!x)return;const L=q.find(B=>B.id===x);L&&Za(L)})}async function fa(){const e=document.getElementById("section-depoimentos");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("site_content").select("value_pt").eq("key","testimonials").eq("tenant_id",z()).maybeSingle();let n=[];try{n=JSON.parse((t==null?void 0:t.value_pt)||"[]")}catch{n=[]}function a(c){const s=["#0d2144","#1a3a5c","#0a1628","#164a3c","#2d1b3d","#3d1a1a","#1a2f4a"];let r=0;for(const l of c||"?")r=r*31+l.charCodeAt(0)&4294967295;return s[Math.abs(r)%s.length]}function o(){e.querySelector("#dep-save-msg"),e.innerHTML=`
      <div class="section-topbar">
        <div>
          <div class="section-title">Depoimentos</div>
          <div class="section-sub">Gerencie os depoimentos exibidos no site público</div>
        </div>
        <button class="btn-primary" id="dep-add-btn">+ Novo Depoimento</button>
      </div>

      <div id="dep-list" style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;max-width:800px">
        ${n.length===0?'<p style="color:#94a3b8;font-size:14px">Nenhum depoimento cadastrado ainda.</p>':n.map((r,l)=>`
            <div class="dep-admin-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px">
              <div style="width:40px;height:40px;border-radius:50%;background:${a(r.name)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0">${(r.name||"?")[0].toUpperCase()}</div>
              <div style="flex:1;min-width:0">
                <div style="color:#f59e0b;font-size:14px;margin-bottom:4px">${"★".repeat(r.stars||5)}</div>
                <p style="color:#374151;font-size:14px;line-height:1.5;margin:0 0 6px;font-style:italic">"${g(r.text||"")}"</p>
                <div style="font-weight:600;font-size:13px;color:#0f172a">${g(r.name||"")}</div>
                <div style="font-size:12px;color:#64748b">${g(r.role||"")}</div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0">
                <button class="btn-cancel" data-edit="${l}" style="padding:6px 12px;font-size:12px">Editar</button>
                <button class="icon-btn del-btn" data-del="${l}" style="background:#fee2e2;color:#dc2626;border:none" title="Remover"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>
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
    `,e.dataset.loaded="1";let c=-1;function s(r=-1){c=r;const l=e.querySelector("#dep-form-wrap");l.style.display="",e.querySelector("#dep-form-title").textContent=r>=0?"Editar Depoimento":"Novo Depoimento";const d=r>=0?n[r]:{};e.querySelector("#dep-stars").value=String(d.stars||5),e.querySelector("#dep-text").value=d.text||"",e.querySelector("#dep-name").value=d.name||"",e.querySelector("#dep-role").value=d.role||"",e.querySelector("#dep-text").focus()}e.querySelector("#dep-add-btn").addEventListener("click",()=>s(-1)),e.querySelector("#dep-form-cancel").addEventListener("click",()=>{e.querySelector("#dep-form-wrap").style.display="none",c=-1}),e.addEventListener("click",r=>{const l=r.target.closest("[data-edit]"),d=r.target.closest("[data-del]");if(l&&s(parseInt(l.dataset.edit)),d){const p=parseInt(d.dataset.del);confirm("Remover este depoimento?")&&(n.splice(p,1),i().then(()=>o()))}}),e.querySelector("#dep-form-save").addEventListener("click",async()=>{const r=e.querySelector("#dep-form-save"),l=e.querySelector("#dep-save-msg"),d=e.querySelector("#dep-text").value.trim(),p=e.querySelector("#dep-name").value.trim(),u=e.querySelector("#dep-role").value.trim(),w=parseInt(e.querySelector("#dep-stars").value);if(!d||!p){alert("Preencha o depoimento e o nome.");return}r.disabled=!0,r.textContent="Salvando…";const E={stars:w,text:d,name:p,role:u};c>=0?n[c]=E:n.push(E);const I=await i();r.disabled=!1,r.textContent="Salvar",Q(l,I),I&&(e.querySelector("#dep-form-wrap").style.display="none",c=-1,o())})}async function i(){const c=JSON.stringify(n);return await We("testimonials",{pt:c,en:c,es:c})}o()}document.addEventListener("DOMContentLoaded",async()=>{var s,r,l;const t=window.location.hostname.replace(/^www\./,"");if(t&&t!=="localhost"&&t!=="127.0.0.1"){const d=`imobi_tenant_${t}`,p=Je(d);if(p)Ie(p);else{let u=null;for(const w of[t,"www."+t]){const{data:E}=await b.from("tenants").select("id").eq("domain",w).maybeSingle();if(E!=null&&E.id){u=E;break}}u!=null&&u.id&&(Ie(u.id),rt(d,u.id,24*60*60*1e3))}}await Promise.all([La(),ga()]),Re=ee("company.whatsapp",Re),xt(),Ga(),Wa();const n=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");n&&a&&(St(),n.addEventListener("change",()=>{const d=xe().find(u=>u.name===n.value),p=d?$t(d.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+p.map(u=>`<option value="${u.name}">${g(u.name)}</option>`).join("")}));const o=document.getElementById("admin-login"),i=document.getElementById("admin-root");if(o){const d=new URLSearchParams(window.location.hash.replace("#","")),p=new URLSearchParams(window.location.search),u=d.get("type")||p.get("type")||"",w=Zt||u==="recovery"||u==="invite"||window.location.hash.includes("access_token")||p.has("code"),E=document.getElementById("password-reset-overlay");if(w){o.style.display="none",i&&i.classList.add("hidden"),E&&(E.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async h=>{var m,v;h.preventDefault();const f=((m=document.getElementById("new-password"))==null?void 0:m.value)||"",$=((v=document.getElementById("confirm-password"))==null?void 0:v.value)||"",S=document.getElementById("password-reset-msg"),k=h.target.querySelector('button[type="submit"]');if(S&&(S.style.display="none"),f!==$){S&&(S.textContent="As senhas não coincidem.",S.style.display="");return}k&&(k.disabled=!0,k.textContent="Salvando…");const{error:_}=await b.auth.updateUser({password:f});if(_){S&&(S.textContent="Erro: "+_.message,S.style.display=""),k&&(k.disabled=!1,k.textContent="Definir Senha");return}window.location.href=window.location.pathname}),p.has("code")&&await b.auth.exchangeCodeForSession(p.get("code")??"");return}const{data:{session:I}}=await b.auth.getSession();if(I){if(o.classList.add("hidden"),i&&i.classList.remove("hidden"),st(),Vt(),Nt(),window.lucide&&lucide.createIcons(),y=await Mt(I.user.id),!y){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden");return}if(y.active===!1){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(y.needs_password_reset){o.style.display="none",i&&i.classList.add("hidden");const h=document.getElementById("password-reset-overlay");h&&(h.style.display="flex"),(r=document.getElementById("password-reset-form"))==null||r.addEventListener("submit",async f=>{var v,x;f.preventDefault();const $=((v=document.getElementById("new-password"))==null?void 0:v.value)||"",S=((x=document.getElementById("confirm-password"))==null?void 0:x.value)||"",k=document.getElementById("password-reset-msg"),_=f.target.querySelector('button[type="submit"]');if(k&&(k.style.display="none"),$!==S){k&&(k.textContent="As senhas não coincidem.",k.style.display="");return}if($.length<12){k&&(k.textContent="Mínimo 6 caracteres.",k.style.display="");return}_&&(_.disabled=!0,_.textContent="Salvando…");const{error:m}=await b.auth.updateUser({password:$});if(m){k&&(k.textContent="Erro: "+m.message,k.style.display=""),_&&(_.disabled=!1,_.textContent="Definir Senha");return}await b.from("profiles").update({needs_password_reset:!1}).eq("id",y.id),window.location.href=window.location.pathname});return}Ie((y==null?void 0:y.tenant_id)||null),tt(y),zt(y),Dt(y.role),await Ze(),await Ft(y),window.lucide&&lucide.createIcons(),cn(),de("dashboard")}else{i&&i.classList.add("hidden"),o.classList.remove("hidden");const h=document.getElementById("login-form");h&&((l=document.getElementById("forgot-password-btn"))==null||l.addEventListener("click",async()=>{var S,k;const f=(k=(S=h.querySelector('input[name="email"]'))==null?void 0:S.value)==null?void 0:k.trim();if(!f){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:$}=await b.auth.resetPasswordForEmail(f,{redirectTo:"https://omarcorretor.com.br/ios.imobi.html"});alert($?"Erro: "+$.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),h.addEventListener("submit",async f=>{f.preventDefault();const $=h.querySelector('button[type="submit"]'),S=new FormData(h),k=S.get("email"),_=S.get("password");$&&($.disabled=!0,$.textContent="Entrando…");try{if(await Ha(k,_)){o.classList.add("hidden"),i&&i.classList.remove("hidden"),st(),Vt(),window.lucide&&lucide.createIcons();const{data:{session:v}}=await b.auth.getSession();if(y=v?await Mt(v.user.id):null,!y){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Perfil não encontrado. Entre em contato com o administrador.");return}if(y.active===!1){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}Nt(),Ie((y==null?void 0:y.tenant_id)||null),tt(y),zt(y),Dt(y.role),await Ze(),await Ft(y),window.lucide&&lucide.createIcons(),de("dashboard")}else alert("E-mail ou senha incorretos")}catch(m){alert("Erro ao fazer login: "+((m==null?void 0:m.message)||String(m)))}finally{$&&($.disabled=!1,$.textContent="Entrar")}}))}}else st();await ve();const c=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();Ct(c),Tt(Re),window._applyDynamicContent=Ct,window._applyWhatsAppLinks=Tt,document.querySelectorAll(".nav-dropdown-btn").forEach(d=>{var u;const p=(u=d.closest(".nav-dropdown"))==null?void 0:u.querySelector(".nav-dropdown-menu");p&&d.addEventListener("click",w=>{w.stopPropagation(),p.classList.toggle("js-open"),document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(E=>{E!==p&&E.classList.remove("js-open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(d=>d.classList.remove("js-open"))})});async function vn(){const e=q.filter(o=>!o.reference);if(!e.length)return;const t=q.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,i)=>o.id-i.id);for(const o of a){const i="IO-"+String(n).padStart(4,"0"),{error:c}=await b.from("properties").update({reference:i}).eq("id",o.id);if(!c){const s=q.findIndex(r=>r.id===o.id);s>=0&&(q[s].reference=i),n++}}Pe(kt(q))}async function yn(){const e=q.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(i=>!i.includes("/wm-")))continue;const a=[];let o=!1;for(const i of t.images)if(i.includes("/wm-"))a.push(i);else try{const c=await bn(i);a.push(c),o=!0}catch{a.push(i)}if(o){await b.from("properties").update({images:a}).eq("id",t.id);const i=q.findIndex(c=>c.id===t.id);i>=0&&(q[i].images=a)}}Pe(kt(q))}}async function bn(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),i=o.ok?await o.blob():null,c=i?URL.createObjectURL(i):null;return new Promise(s=>{const r=new Image;r.onload=()=>{URL.revokeObjectURL(a);const l=document.createElement("canvas"),d=1200;let p=r.width,u=r.height;p>d&&(u=Math.round(u*d/p),p=d),l.width=p,l.height=u;const w=l.getContext("2d");w.drawImage(r,0,0,p,u);const E=I=>{if(I){const h=Math.round(p*.18),f=Math.round(I.naturalHeight*h/I.naturalWidth),$=Math.round(p*.02);w.globalAlpha=.45,w.drawImage(I,p-h-$,u-f-$,h,f),w.globalAlpha=1}l.toBlob(async h=>{try{const f=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:$}=await b.storage.from("imoveis").upload(f,h,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if($){console.error("Upload watermark error:",$),s(e);return}const{data:{publicUrl:S}}=b.storage.from("imoveis").getPublicUrl(f);s(S)}catch(f){console.error("Watermark upload exception:",f),s(e)}},"image/jpeg",.82)};if(c){const I=new Image;I.onload=()=>{URL.revokeObjectURL(c),E(I)},I.onerror=()=>{URL.revokeObjectURL(c),E(null)},I.src=c}else E(null)},r.onerror=()=>{URL.revokeObjectURL(a),s(e)},r.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function Q(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function _t(e,t="assets"){const n=await Ve(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await b.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:i}}=b.storage.from("imoveis").getPublicUrl(a);return i}async function va(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("settings").select("key,value").eq("tenant_id",z()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>g(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const i=o.target.files[0];if(i)try{const c=await _t(i,"logos");document.getElementById("co-logo-url").value=c,document.getElementById("co-logo-preview").src=c}catch(c){alert("Erro no upload: "+c.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const i=await _e([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);i&&xt(),o.disabled=!1,o.textContent="Salvar Identidade",Q(document.getElementById("co-identity-msg"),i)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const i=document.getElementById("co-whatsapp").value.trim(),c=await _e([["company.whatsapp",i],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);c&&i&&(Re=i),o.disabled=!1,o.textContent="Salvar Contatos",Q(document.getElementById("co-contacts-msg"),c)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const i=await _e([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",Q(document.getElementById("co-social-msg"),i)})}async function ya(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("settings").select("key,value").eq("tenant_id",z()),n={};t==null||t.forEach(d=>{n[d.key]=d.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",i=n["visual.secondary_bg"]||"#1a2f4a",c=n["visual.hero_bg_url"]||"",s=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${g(c)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 <strong>Foto de fundo do banner</strong> no topo do site. Recomendado: 1920×1080 px.</p>
        <div id="vis-hero-preview" style="margin-top:10px;display:${c?"":"none"}">
          <img src="${g(c)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Preço Máximo do Slider de Busca</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="vis-price-max" type="number" class="form-control" value="${s}" min="100000" step="1000000" style="max-width:200px">
          <span style="font-size:13px;color:#9ca3af">R$</span>
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-images">Salvar Imagens</button>
        <span id="visual-images-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `;function r(d,p,u){const w=document.getElementById(d),E=document.getElementById(p);w==null||w.addEventListener("input",I=>{E.value=I.target.value,u()}),E==null||E.addEventListener("input",I=>{/^#[0-9a-fA-F]{6}$/.test(I.target.value)&&(w.value=I.target.value,u())})}function l(){var p,u,w,E;const d=((p=document.getElementById("col-accent-hex"))==null?void 0:p.value)||"#b8962e";(u=document.getElementById("vp-bar"))==null||u.style.setProperty("background",d),(w=document.getElementById("vp-dot"))==null||w.style.setProperty("background",d),(E=document.getElementById("vp-btn"))==null||E.style.setProperty("background",d),document.documentElement.style.setProperty("--accent",d)}r("col-accent","col-accent-hex",l),r("col-primary","col-primary-hex",()=>{}),r("col-secondary","col-secondary-hex",()=>{}),l(),document.getElementById("vis-hero-file").addEventListener("change",async d=>{const p=d.target.files[0];if(p)try{const u=await _t(p,"hero");document.getElementById("vis-hero-url").value=u;const w=document.getElementById("vis-hero-preview");w.innerHTML=`<img src="${u}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,w.style.display=""}catch(u){alert("Erro no upload: "+u.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const d=document.getElementById("visual-save-colors");d.disabled=!0,d.textContent="Salvando…";const p=await _e([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);p&&xt(),d.disabled=!1,d.textContent="Salvar Cores",Q(document.getElementById("visual-colors-msg"),p)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",l())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const d=document.getElementById("visual-save-images");d.disabled=!0,d.textContent="Salvando…";const p=await _e([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);d.disabled=!1,d.textContent="Salvar Imagens",Q(document.getElementById("visual-images-msg"),p)})}async function ba(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("site_content").select("*").eq("tenant_id",z()),n={};t==null||t.forEach(r=>{n[r.key]=r});const a=(r,l)=>{var d;return g(((d=n[r])==null?void 0:d[`value_${l}`])||"")},o=["pt","en","es"],i={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},c=r=>o.map(l=>`<button class="content-tab${l===r?" active":""}" data-lang="${l}">${i[l]}</button>`).join(""),s=r=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${r}" value="${a("hero.title",r)}">
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto principal em <strong>destaque no banner do site</strong> (frase de impacto).</p>
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${r}" rows="3">${a("hero.subtitle",r)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto menor abaixo do título, também no <strong>banner principal</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${r}" rows="4">${a("inst.bio_p1",r)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece na seção <strong>"Sobre"</strong> do site.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${r}" rows="3">${a("inst.bio_p2",r)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Segundo parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${r}" rows="3">${a("inst.bio_p3",r)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Terceiro parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${r}" value="${a("inst.stat1_num",r)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${r}" value="${a("inst.stat2_num",r)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${r}" value="${a("inst.stat3_num",r)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${r}" value="${a("inst.stat1_label",r)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${r}" value="${a("inst.stat2_label",r)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${r}" value="${a("inst.stat3_label",r)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${r}" value="${a("footer.text",r)}">
    </div>
  `;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${c("pt")}</div>
      <div id="sc-panels">
        ${o.map(r=>`<div class="content-panel${r==="pt"?" active":""}" data-panel="${r}">${s(r)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",r=>{var d;const l=r.target.closest(".content-tab");l&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(p=>p.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(p=>p.classList.remove("active")),l.classList.add("active"),(d=document.querySelector(`#sc-panels [data-panel="${l.dataset.lang}"]`))==null||d.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const r=document.getElementById("sc-save-btn");r.disabled=!0,r.textContent="Salvando…";const l={};document.querySelectorAll(".sc-field").forEach(p=>{const u=p.dataset.key,w=p.dataset.lang;l[u]||(l[u]={}),l[u][w]=p.value});let d=!0;for(const[p,u]of Object.entries(l))await We(p,{pt:u.pt,en:u.en,es:u.es})||(d=!1);r.disabled=!1,r.textContent="Salvar Conteúdo",Q(document.getElementById("sc-save-msg"),d)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const r=document.getElementById("seo-save-btn");r.disabled=!0,r.textContent="Salvando…";const l=document.getElementById("seo-title").value.trim(),d=document.getElementById("seo-desc").value.trim(),p=await We("seo.title_pt",{pt:l,en:l,es:l})&&await We("seo.description_pt",{pt:d,en:d,es:d});r.disabled=!1,r.textContent="Salvar SEO",Q(document.getElementById("seo-save-msg"),p)})}async function ha(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await j())}async function j(){var f,$,S,k,_;const e=document.getElementById("crm-body");if(!e)return;const t=z(),[{data:n},{data:a},{data:o},{data:i}]=await Promise.all([b.from("crm_pipelines").select("*").eq("tenant_id",t).order("sort_order"),b.from("crm_stages").select("*").eq("tenant_id",t).order("sort_order"),b.from("crm_tags").select("*").eq("tenant_id",t).order("name"),b.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("sort_order")]),c=n||[],r=(typeof O<"u"&&O?c.find(m=>m.id===O):null)||c.find(m=>m.is_default)||c[0],l=c.map(m=>`<option value="${m.id}"${m.id===(r==null?void 0:r.id)?" selected":""}>${g(m.name)}</option>`).join(""),d=(a||[]).filter(m=>m.pipeline_id===(r==null?void 0:r.id)).sort((m,v)=>(m.sort_order??0)-(v.sort_order??0)),p=d.map((m,v)=>`
    <div class="stage-item stage-draggable" data-id="${m.id}" data-idx="${v}" draggable="true">
      <span class="stage-drag-handle" title="Arrastar para reordenar">⋮⋮</span>
      <div class="stage-color-dot" style="background:${m.color}"></div>
      <input type="text" class="stage-name-input" value="${g(m.name)}" data-sid="${m.id}" data-orig="${g(m.name)}" placeholder="Nome da etapa">
      <input type="color" value="${m.color}" data-sid="${m.id}" class="stage-color-pick" title="Cor da etapa">
      <button class="icon-btn del-btn stage-del" data-id="${m.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>';(o||[]).map(m=>`<span class="tag-chip" style="background:${m.color}" data-id="${m.id}">
      ${g(m.name)}
      <button class="tag-chip-del" data-id="${m.id}" title="Remover">✕</button>
    </span>`).join("");const u=(i||[]).map(m=>`
    <div class="stage-item" data-id="${m.id}">
      <div class="stage-color-dot" style="background:${m.color}"></div>
      <span class="stage-name">${g(m.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${m.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${m.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>

      <!-- Seletor de Funil + ações sobre o funil inteiro -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:240px">
            <label style="font-size:13px;font-weight:600;color:#475569;white-space:nowrap">Funil ativo:</label>
            <select class="pipeline-select" id="crm-pipe-sel" style="flex:1;min-width:200px;font-size:14px;padding:8px 10px;border:1px solid var(--border);border-radius:6px">${l}</select>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn-secondary" id="crm-rename-pipeline" style="font-size:13px;padding:7px 14px" title="Renomear este funil">✏️ Renomear</button>
            <button class="btn-secondary" id="crm-set-default-pipeline" style="font-size:13px;padding:7px 14px" title="Marcar como padrão">⭐ Tornar padrão</button>
            <button class="btn-secondary" id="crm-delete-pipeline" style="font-size:13px;padding:7px 14px;color:#dc2626;border-color:#fecaca" title="Excluir este funil">🗑️ Excluir funil</button>
            <button class="btn-primary" id="crm-add-pipeline" style="font-size:13px;padding:7px 14px">➕ Novo Funil</button>
          </div>
        </div>
        ${r!=null&&r.is_default?'<div style="margin-top:8px;font-size:12px;color:#059669"><strong>⭐ Funil padrão</strong> · usado por novos leads</div>':""}
      </div>

      <!-- Banner explicativo -->
      <div style="background:linear-gradient(to right,#fffbeb,#fef3c7);border:1px solid #fde68a;border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <div style="display:flex;align-items:flex-start;gap:12px">
          <span style="font-size:24px;line-height:1">💡</span>
          <div style="font-size:13px;color:#78350f;line-height:1.6">
            <div style="font-weight:700;margin-bottom:4px;color:#92400e">Como editar as etapas do funil "${g((r==null?void 0:r.name)||"")}"</div>
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
          Etapas (${d.length})
        </div>
        <div style="font-size:11px;color:#94a3b8">A ordem aqui = ordem das colunas no Kanban</div>
      </div>

      <!-- Lista de etapas drag-and-drop -->
      <div class="stages-list" id="crm-stages-list">${p}</div>

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
        ${(o||[]).length?(o||[]).map(m=>`
        <div class="tm-row" data-id="${m.id}">
          <div class="tm-color-swatch" style="background:${m.color}" onclick="this.nextElementSibling.click()" title="Alterar cor"></div>
          <input type="color" class="tm-color-input" data-id="${m.id}" value="${m.color}" title="Cor da tag">
          <input class="tm-name-input form-control" type="text" value="${g(m.name)}" data-id="${m.id}" data-orig="${g(m.name)}" placeholder="Nome da tag">
          <button class="btn-primary tm-save-btn" data-id="${m.id}">Salvar</button>
          <button class="icon-btn del-btn tm-del-btn" data-id="${m.id}" title="Excluir tag">🗑️</button>
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
          ${[{name:"🔴 Quente",color:"#EF4444"},{name:"🟡 Morno",color:"#F59E0B"},{name:"🔵 Frio",color:"#3B82F6"},{name:"💰 Investidor",color:"#8B5CF6"},{name:"⭐ Alto Padrão",color:"#C9A227"},{name:"🏦 Financiamento",color:"#0EA5E9"},{name:"🔄 Permuta",color:"#374151"},{name:"🏠 Comprador",color:"#10B981"},{name:"📋 Proprietário",color:"#F97316"}].filter(m=>!(o||[]).some(v=>v.name===m.name)).map(m=>`<button class="tm-tpl-btn" data-name="${g(m.name)}" data-color="${m.color}" style="border-color:${m.color};color:${m.color};background:${m.color}15;">${g(m.name)}</button>`).join("")}
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
  `;const w=document.getElementById("crm-pipe-sel");w&&w.addEventListener("change",async()=>{const m=parseInt(w.value,10);if(!isNaN(m))try{O=m}catch{}await j()});const E=r==null?void 0:r.id;(f=document.getElementById("crm-rename-pipeline"))==null||f.addEventListener("click",async()=>{if(!E)return;const m=prompt("Novo nome do funil:",(r==null?void 0:r.name)||"");if(!m||m.trim()===(r==null?void 0:r.name))return;const{error:v}=await b.from("crm_pipelines").update({name:m.trim()}).eq("id",E);if(v){alert("Erro: "+v.message);return}await j()}),($=document.getElementById("crm-set-default-pipeline"))==null||$.addEventListener("click",async()=>{if(E){if(r!=null&&r.is_default){alert("Este funil já é o padrão.");return}try{const m=z();await b.from("crm_pipelines").update({is_default:!1}).eq("tenant_id",m),await b.from("crm_pipelines").update({is_default:!0}).eq("id",E),await j()}catch(m){alert("Erro: "+m.message)}}}),(S=document.getElementById("crm-delete-pipeline"))==null||S.addEventListener("click",async()=>{if(E){if(c.length===1){alert("Não pode excluir o único funil. Crie outro antes.");return}confirm(`Excluir o funil "${r==null?void 0:r.name}" e todas as suas etapas?

Leads associados ficarão sem funil — você pode movê-los depois.`)&&(await b.from("crm_stages").delete().eq("pipeline_id",E),await b.from("crm_pipelines").delete().eq("id",E),O=null,await j())}}),document.getElementById("crm-add-stage").addEventListener("click",async()=>{const m=document.getElementById("crm-new-stage").value.trim(),v=document.getElementById("crm-new-stage-color").value,x=parseInt(document.getElementById("crm-pipe-sel").value,10);m&&(await b.from("crm_stages").insert({pipeline_id:x,name:m,color:v,sort_order:99,tenant_id:z()}),document.getElementById("crm-new-stage").value="",await j())}),e.querySelectorAll(".stage-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await b.from("crm_stages").delete().eq("id",m.dataset.id),await j())})}),e.querySelectorAll(".stage-name-input").forEach(m=>{m.addEventListener("blur",async()=>{const v=m.value.trim(),x=m.dataset.orig;if(!v||v===x){m.value=x;return}m.disabled=!0;const{error:L}=await b.from("crm_stages").update({name:v}).eq("id",m.dataset.sid);if(m.disabled=!1,L){console.warn("[Etapas] erro ao renomear:",L),m.value=x,alert("Erro ao renomear: "+L.message);return}m.dataset.orig=v,m.style.background="#dcfce7",setTimeout(()=>{m.style.background=""},800)}),m.addEventListener("keydown",v=>{v.key==="Enter"&&(v.preventDefault(),m.blur()),v.key==="Escape"&&(m.value=m.dataset.orig,m.blur())})}),document.getElementById("crm-stages-list");let I=null;e.querySelectorAll(".stage-draggable").forEach(m=>{m.addEventListener("dragstart",v=>{I=m,m.classList.add("stage-dragging"),v.dataTransfer.effectAllowed="move";try{v.dataTransfer.setData("text/plain",m.dataset.id)}catch{}}),m.addEventListener("dragend",()=>{m.classList.remove("stage-dragging"),e.querySelectorAll(".stage-drop-over").forEach(v=>v.classList.remove("stage-drop-over"))}),m.addEventListener("dragover",v=>{v.preventDefault(),v.dataTransfer.dropEffect="move",m!==I&&(e.querySelectorAll(".stage-drop-over").forEach(x=>x.classList.remove("stage-drop-over")),m.classList.add("stage-drop-over"))}),m.addEventListener("dragleave",()=>{m.classList.remove("stage-drop-over")}),m.addEventListener("drop",async v=>{if(v.preventDefault(),!I||m===I)return;const x=I.dataset.id,L=m.dataset.id,B=d.findIndex(D=>String(D.id)===String(x)),C=d.findIndex(D=>String(D.id)===String(L));if(B<0||C<0)return;const T=d.splice(B,1)[0];d.splice(C,0,T);const M=d.map((D,P)=>b.from("crm_stages").update({sort_order:P}).eq("id",D.id));I=null,await Promise.all(M).catch(D=>console.warn("[stages] erro reordenar:",D)),await j()})}),e.querySelectorAll(".stage-color-pick").forEach(m=>{m.addEventListener("change",async v=>{await b.from("crm_stages").update({color:v.target.value}).eq("id",m.dataset.sid);const x=m.closest(".stage-item").querySelector(".stage-color-dot");x&&(x.style.background=v.target.value)})});const h=async()=>{const m=document.getElementById("crm-new-tag"),v=document.getElementById("crm-new-tag-color"),x=m==null?void 0:m.value.trim(),L=(v==null?void 0:v.value)||"#6366F1";if(!x){m==null||m.focus();return}await b.from("crm_tags").insert({name:x,color:L,tenant_id:z()}),m&&(m.value=""),await j()};(k=document.getElementById("crm-add-tag"))==null||k.addEventListener("click",h),(_=document.getElementById("crm-new-tag"))==null||_.addEventListener("keydown",m=>{m.key==="Enter"&&h()}),e.querySelectorAll(".tm-del-btn").forEach(m=>{m.addEventListener("click",async()=>{confirm("Excluir esta tag? Os leads que a possuem não serão afetados.")&&(await b.from("crm_tags").delete().eq("id",m.dataset.id),await j())})}),e.querySelectorAll(".tm-name-input").forEach(m=>{const v=m.closest(".tm-row"),x=v==null?void 0:v.querySelector(".tm-save-btn");x&&(x.style.display="none"),m.addEventListener("input",()=>{const L=m.value.trim()!==m.dataset.orig;x&&(x.style.display=L?"":"none")})}),e.querySelectorAll(".tm-color-input").forEach(m=>{const v=m.closest(".tm-row"),x=v==null?void 0:v.querySelector(".tm-color-swatch"),L=v==null?void 0:v.querySelector(".tm-save-btn");m.addEventListener("input",B=>{x&&(x.style.background=B.target.value),L&&(L.style.display="")})}),e.querySelectorAll(".tm-save-btn").forEach(m=>{m.style.display="none",m.addEventListener("click",async()=>{var B,C;const v=m.closest(".tm-row"),x=(B=v.querySelector(".tm-name-input"))==null?void 0:B.value.trim(),L=(C=v.querySelector(".tm-color-input"))==null?void 0:C.value;x&&(m.disabled=!0,m.textContent="✓ Salvando…",await b.from("crm_tags").update({name:x,color:L}).eq("id",m.dataset.id),await j())})}),e.querySelectorAll(".tm-tpl-btn").forEach(m=>{m.addEventListener("click",async()=>{const v=m.dataset.name,x=m.dataset.color;m.disabled=!0,m.innerHTML="✓",await b.from("crm_tags").insert({name:v,color:x,tenant_id:z()}),await j()})}),e.querySelectorAll(".tag-chip-del").forEach(m=>{m.addEventListener("click",async()=>{await b.from("crm_tags").delete().eq("id",m.dataset.id),await j()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const m=document.getElementById("crm-new-status").value.trim(),v=document.getElementById("crm-new-status-color").value,x=document.getElementById("crm-new-status-final").checked;m&&(await b.from("crm_lead_statuses").insert({name:m,color:v,is_final:x,sort_order:99,tenant_id:z()}),document.getElementById("crm-new-status").value="",await j())}),e.querySelectorAll(".status-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Remover este status?")&&(await b.from("crm_lead_statuses").delete().eq("id",m.dataset.id),await j())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var x;const m=(x=prompt("Nome do novo funil:"))==null?void 0:x.trim();if(!m)return;const{error:v}=await b.from("crm_pipelines").insert({name:m,sort_order:99,tenant_id:z()});if(v){alert("Erro ao criar funil: "+v.message);return}mt=!1,await j()})}async function xa(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("integrations").select("*"),n={};t==null||t.forEach(s=>{n[s.key]=s});const a=s=>{var r;return g(((r=n[s])==null?void 0:r.value)||"")},o=s=>{var r;return(r=n[s])!=null&&r.enabled?"checked":""},i=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],c=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${i.map(s=>`
        <div class="integration-row">
          <div class="integration-icon">${s.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${s.label}</div>
            <div class="integration-desc">${s.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${s.key}" ${o(s.key)}>
              <span class="toggle-slider"></span>
            </label>
            <input type="text" class="integration-value intg-val" data-key="${s.key}"
              value="${a(s.key)}" placeholder="${s.placeholder}">
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
      ${c.map(s=>`
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label">${s.label}</label>
          <input class="form-control smtp-field" data-key="${s.key}" value="${a(s.key)}" placeholder="${s.placeholder}">
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var p;const s=document.getElementById("intg-save-tracking");s.disabled=!0,s.textContent="Salvando…";let r=!0;const l=document.querySelectorAll(".intg-val"),d=document.querySelectorAll(".intg-toggle");for(let u=0;u<l.length;u++){const w=l[u].dataset.key,E=l[u].value.trim(),I=((p=d[u])==null?void 0:p.checked)??!1;await ot(w,E,I)||(r=!1)}s.disabled=!1,s.textContent="Salvar Integrações",Q(document.getElementById("intg-tracking-msg"),r)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const s=document.getElementById("intg-save-smtp");s.disabled=!0,s.textContent="Salvando…";const r=document.querySelectorAll(".smtp-field");let l=!0;for(const p of r)await ot(p.dataset.key,p.value.trim(),!0)||(l=!1);const d=document.getElementById("smtp-pass").value;d&&(await ot("smtp_pass",d,!0)||(l=!1)),s.disabled=!1,s.textContent="Salvar SMTP",Q(document.getElementById("intg-smtp-msg"),l)})}async function wa(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await yt(),document.getElementById("media-file-input").addEventListener("change",async n=>{var r,l;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),i=document.getElementById("media-progress-fill"),c=document.getElementById("media-progress-text");o.style.display="";let s=0;for(const d of a){c.textContent=`Enviando ${s+1}/${a.length}…`,i.style.width=`${Math.round(s/a.length*100)}%`;try{const p=await _t(d,"media"),u=d.name.replace(/\.[^.]+$/,"").slice(0,60);await b.from("media_library").insert({name:u,url:p,type:"image",size:d.size,created_by:(l=(r=(await b.auth.getUser()).data)==null?void 0:r.user)==null?void 0:l.id})}catch(p){console.error("Media upload error:",p)}s++}i.style.width="100%",c.textContent=`✓ ${s} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",i.style.width="0"},2e3),await yt(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function yt(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await b.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${g(a.url)}">
      <img src="${g(a.url)}" alt="${g(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${g(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${g(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation(),(i=navigator.clipboard)==null||i.writeText(a.dataset.url).then(()=>{const c=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=c},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await b.from("media_library").delete().eq("id",a.dataset.id),await yt())})})}async function hn(){var t,n,a,o,i;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(c=>{c.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(r=>r.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(r=>r.classList.add("hidden")),c.classList.add("active");const s=e.querySelector(`#sa-panel-${c.dataset.tab}`);s&&s.classList.remove("hidden"),c.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&me(),c.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&xn(),c.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&Xt(),c.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&Gt(),c.dataset.tab==="platform"&&Wt()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",Xt),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",me),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",Gt),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>kn()),(i=e.querySelector("#sa-plat-save"))==null||i.addEventListener("click",wn),me(),Wt())}async function me(){var s,r;const e=document.getElementById("sa-tenants-list"),t=((r=(s=document.getElementById("sa-tenant-search"))==null?void 0:s.value)==null?void 0:r.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=b.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const i=(a||[]).filter(l=>{var d,p;return!t||((d=l.name)==null?void 0:d.toLowerCase().includes(t))||((p=l.slug)==null?void 0:p.toLowerCase().includes(t))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const c=l=>l.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=i.map(l=>{var d;return`
    <div class="sa-list-row" data-action="open-panel" data-id="${l.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${l.logo_url?`<img class="sa-tenant-logo" src="${g(l.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${g(l.name||"—")}</div>
          <div class="sa-list-sub">${g(l.slug||"")} · ${g(((d=l.plans)==null?void 0:d.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${c(l)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${l.id}" data-active="${l.active}" title="${l.active?"Desativar":"Ativar"}">${l.active?"⏸️":"▶️"}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(l=>{l.addEventListener("click",async d=>{d.stopPropagation();const p=l.dataset.active==="true";await b.from("tenants").update({active:!p}).eq("id",l.dataset.id),me()})}),e.querySelectorAll('[data-action="open-panel"]').forEach(l=>{l.addEventListener("click",()=>{const d=(i||[]).find(p=>String(p.id)===String(l.dataset.id));d&&In(d)})})}async function xn(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await b.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${g(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function Xt(){var s;const e=document.getElementById("sa-subs-list"),t=((s=document.getElementById("sa-sub-filter"))==null?void 0:s.value)||"";if(!e)return;e.dataset.loaded="1";let n=b.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const i={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},c={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(r=>{var l,d,p;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${g(((l=r.tenants)==null?void 0:l.name)||"—")}</div>
          <div class="sa-list-sub">${g(((d=r.plans)==null?void 0:d.name)||"—")} · R$ ${Number(((p=r.plans)==null?void 0:p.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${i[r.status]||"gray"}">${c[r.status]||r.status}</span>
        <span class="sa-list-date">${r.current_period_end?new Date(r.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function Gt(){var c,s;const e=document.getElementById("sa-users-list"),t=((s=(c=document.getElementById("sa-user-search"))==null?void 0:c.value)==null?void 0:s.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await b.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(r=>{var l,d;return!t||((l=r.name)==null?void 0:l.toLowerCase().includes(t))||((d=r.email)==null?void 0:d.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const i={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(r=>{var l;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(r.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${g(r.name||"—")}</div>
          <div class="sa-list-sub">${g(((l=r.tenants)==null?void 0:l.name)||"Sem imobiliária")} · ${i[r.role]||r.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${r.active!==!1?"sa-badge-green":"sa-badge-red"}">${r.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function Wt(){const[e,t,n,a]=await Promise.all([b.from("tenants").select("id",{count:"exact",head:!0}),b.from("profiles").select("id",{count:"exact",head:!0}),b.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),b.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(i,c)=>{const s=document.getElementById(i);s&&(s.textContent=c??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function wn(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await _e([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),Q(t,!0)}function En(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function kn(){var a,o,i,c,s,r;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),b.from("plans").select("id, name").then(({data:l})=>{const d=document.getElementById("nt-plan");d&&l&&(d.innerHTML='<option value="">Sem plano</option>'+l.map(p=>`<option value="${p.id}">${g(p.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",l=>{const d=document.getElementById("nt-slug");d&&!d.dataset.manual&&(d.value=En(l.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",l=>{l.target.dataset.manual="1"}),(i=document.getElementById("nt-pwd-toggle"))==null||i.addEventListener("click",()=>{const l=document.getElementById("nt-admin-password");l.type=l.type==="password"?"text":"password"});const n=()=>t.remove();(c=document.getElementById("sa-modal-close-btn"))==null||c.addEventListener("click",n),(s=document.getElementById("nt-cancel"))==null||s.addEventListener("click",n),t.addEventListener("click",l=>{l.target===t&&n()}),(r=document.getElementById("nt-save"))==null||r.addEventListener("click",async()=>{var _,m,v,x,L,B,C,T,M,D,P,W;const l=(m=(_=document.getElementById("nt-name"))==null?void 0:_.value)==null?void 0:m.trim(),d=(x=(v=document.getElementById("nt-slug"))==null?void 0:v.value)==null?void 0:x.trim(),p=(B=(L=document.getElementById("nt-domain"))==null?void 0:L.value)==null?void 0:B.trim(),u=(C=document.getElementById("nt-plan"))==null?void 0:C.value,w=(M=(T=document.getElementById("nt-admin-email"))==null?void 0:T.value)==null?void 0:M.trim(),E=(P=(D=document.getElementById("nt-admin-password"))==null?void 0:D.value)==null?void 0:P.trim(),I=document.getElementById("nt-msg"),h=document.getElementById("nt-save");if(!l||!d){I.textContent="❌ Nome e slug são obrigatórios.",I.style.color="#ef4444";return}if(!w){I.textContent="❌ Informe o e-mail do admin.",I.style.color="#ef4444";return}if(!E||E.length<12){I.textContent="❌ A senha precisa ter mínimo 6 caracteres.",I.style.color="#ef4444";return}h.disabled=!0,h.textContent="Criando…",I.textContent="⏳ Criando imobiliária…",I.style.color="#64748b";const{data:f,error:$}=await b.from("tenants").insert({name:l,slug:d,domain:p||null,plan_id:u||null,active:!0}).select();if($){h.disabled=!1,h.textContent="Criar Imobiliária",I.textContent="❌ "+$.message,I.style.color="#ef4444";return}const S=(W=f==null?void 0:f[0])==null?void 0:W.id;I.textContent="⏳ Criando usuário admin…";const k=await he({email:w,password:E,role:"admin",tenant_id:S});if(!(k!=null&&k.success)){h.disabled=!1,h.textContent="Criar Imobiliária",I.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+g((k==null?void 0:k.error)||"Desconhecido"),I.style.color="#f59e0b",n(),me().catch(()=>{});return}S&&(k!=null&&k.user_id)&&!(k!=null&&k.linked)&&await b.from("profiles").update({tenant_id:S}).eq("id",k.user_id),h.disabled=!1,h.textContent="Criar Imobiliária",k.email_sent===!1?(I.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${g(k.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${g(w)}</strong><br>
          Senha: <strong>${g(E)}</strong>
        </div>`,I.style.color="#0f172a"):(I.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",I.style.color="#22c55e",n(),me().catch(()=>{}))})}function In(e){var a;(a=document.getElementById("tenant-panel"))==null||a.remove();const t=document.createElement("div");t.id="tenant-panel",t.style.cssText="position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;";const n=[{id:"properties",label:"🏠 Imóveis"},{id:"leads",label:"📋 Leads"},{id:"users",label:"👥 Corretores"},{id:"api",label:"🔗 Site & API"},{id:"config",label:"⚙️ Configurações"}];t.innerHTML=`
    <div style="background:#0a1628;padding:14px 24px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:10;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.3);">
      <button id="tp-back" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;padding:7px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">← Imobiliárias</button>
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
        ${e.logo_url?`<img src="${g(e.logo_url)}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0;">`:'<div style="width:36px;height:36px;background:rgba(255,255,255,.1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏢</div>'}
        <div style="min-width:0;">
          <div style="color:#fff;font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g(e.name)}</div>
          <div style="color:#94a3b8;font-size:12px;">${g(e.slug||"")} · ${e.active!==!1?'<span style="color:#4ade80;">● Ativo</span>':'<span style="color:#f87171;">● Inativo</span>'}</div>
        </div>
      </div>
      <button id="tp-edit-btn" style="background:#c9a84c;border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">✏️ Editar dados</button>
    </div>
    <div style="background:#fff;border-bottom:2px solid #e2e8f0;padding:0 24px;display:flex;gap:0;flex-shrink:0;overflow-x:auto;">
      ${n.map((o,i)=>`<button class="tp-tab" data-tab="${o.id}" style="padding:14px 20px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:${i===0?"700":"500"};color:${i===0?"#2563eb":"#64748b"};border-bottom:2px solid ${i===0?"#2563eb":"transparent"};margin-bottom:-2px;white-space:nowrap;transition:all .15s;">${o.label}</button>`).join("")}
    </div>
    <div id="tp-content" style="padding:24px;flex:1;max-width:1200px;margin:0 auto;width:100%;box-sizing:border-box;"></div>
  `,document.body.appendChild(t),document.getElementById("tp-back").addEventListener("click",()=>t.remove()),document.getElementById("tp-edit-btn").addEventListener("click",()=>Ea(e)),t.querySelectorAll(".tp-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".tp-tab").forEach(i=>{i.style.fontWeight="500",i.style.color="#64748b",i.style.borderBottomColor="transparent"}),o.style.fontWeight="700",o.style.color="#2563eb",o.style.borderBottomColor="#2563eb",bt(e,o.dataset.tab)})}),bt(e,"properties")}function $n(e,t){const n=document.getElementById("tp-prop-edit-modal");n&&n.remove();const a=document.createElement("div");a.id="tp-prop-edit-modal",a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;";const o=(s,r,l,d="text",p="")=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${r}</label>
      <input id="${s}" type="${d}" value="${g(String(l||""))}" ${p}
        style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;outline:none;">
    </div>`,i=(s,r,l,d)=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${r}</label>
      <select id="${s}" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;background:#fff;">
        ${l.map(([p,u])=>`<option value="${p}"${d===p?" selected":""}>${u}</option>`).join("")}
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
          <textarea id="tpe-description" rows="4" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;resize:vertical;font-family:inherit;">${g(e.description||"")}</textarea>
        </div>
        <div id="tpe-msg" style="grid-column:span 2;font-size:13px;min-height:16px;"></div>
      </div>
      <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;justify-content:flex-end;flex-shrink:0;">
        <button id="tpe-cancel" style="background:#f1f5f9;color:#475569;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">Cancelar</button>
        <button id="tpe-save" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 24px;cursor:pointer;font-size:14px;font-weight:700;">💾 Salvar</button>
      </div>
    </div>`,document.body.appendChild(a);const c=()=>a.remove();document.getElementById("tpe-close").addEventListener("click",c),document.getElementById("tpe-cancel").addEventListener("click",c),a.addEventListener("click",s=>{s.target===a&&c()}),document.getElementById("tpe-save").addEventListener("click",async()=>{const s=document.getElementById("tpe-save"),r=document.getElementById("tpe-msg"),l=document.getElementById("tpe-title").value.trim();if(!l){r.style.color="#ef4444",r.textContent="Título é obrigatório.";return}s.disabled=!0,s.textContent="Salvando…";const d={title:l,price:document.getElementById("tpe-price").value.trim()||null,area:document.getElementById("tpe-area").value.trim()||null,bedrooms:document.getElementById("tpe-bedrooms").value||null,suites:document.getElementById("tpe-suites").value||null,parking:document.getElementById("tpe-parking").value||null,reference:document.getElementById("tpe-reference").value.trim()||null,city:document.getElementById("tpe-city").value.trim()||null,neighborhood:document.getElementById("tpe-neighborhood").value.trim()||null,rua:document.getElementById("tpe-rua").value.trim()||null,numero:document.getElementById("tpe-numero").value.trim()||null,construction_status:document.getElementById("tpe-construction").value||null,published:document.getElementById("tpe-published").value==="true",description:document.getElementById("tpe-description").value.trim()||null},{error:p}=await b.from("properties").update(d).eq("id",e.id);if(p){r.style.color="#ef4444",r.textContent="Erro: "+p.message,s.disabled=!1,s.textContent="💾 Salvar";return}r.style.color="#16a34a",r.textContent="✅ Salvo!",setTimeout(()=>{c(),typeof t=="function"&&t()},800)})}async function bt(e,t){var i,c,s,r,l;const n=document.getElementById("tp-content");if(!n)return;n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>';const a=()=>bt(e,t),o=(d,p)=>`background:${d};color:${p};border:none;border-radius:6px;padding:5px 12px;cursor:pointer;font-size:12px;font-weight:600;white-space:nowrap;`;if(t==="properties"){const{data:d}=await b.from("properties").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1});if(!(d!=null&&d.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>';return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${d.length} imóvel(is)</h3>
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
          <tbody id="tp-prop-tbody">${d.map(p=>{var u;return`
            <tr data-pid="${p.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  ${(u=p.images)!=null&&u[0]?`<img src="${p.images[0]}" style="width:52px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;">`:'<div style="width:52px;height:38px;background:#e2e8f0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>'}
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${g(p.title||"")}</div><div style="font-size:11px;color:#94a3b8;">${g(p.reference||"")}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${g([p.neighborhood,p.city].filter(Boolean).join(", "))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">${g(Fe(p.price,"pt"))}</td>
              <td style="padding:12px 16px;text-align:center;">${p.published?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Publicado</span>':'<span style="background:#f1f5f9;color:#64748b;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Rascunho</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-prop-edit" data-pid="${p.id}" style="${o("#eff6ff","#1d4ed8")}">✏️ Editar</button>
                  <button class="tp-prop-toggle" data-pid="${p.id}" data-pub="${p.published?"1":"0"}" style="${o(p.published?"#fef3c7":"#dcfce7",p.published?"#92400e":"#15803d")}">${p.published?"Despublicar":"Publicar"}</button>
                  <button class="tp-prop-del" data-pid="${p.id}" style="${o("#fee2e2","#dc2626")}">Excluir</button>
                </div>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`,n.querySelectorAll(".tp-prop-edit").forEach(p=>{p.addEventListener("click",()=>{const u=Number(p.dataset.pid),w=d.find(E=>E.id===u);w&&$n(w,a)})}),n.querySelectorAll(".tp-prop-toggle").forEach(p=>{p.addEventListener("click",async()=>{const u=Number(p.dataset.pid),w=p.dataset.pub==="1";p.disabled=!0,p.textContent="…",await b.from("properties").update({published:!w}).eq("id",u),a()})}),n.querySelectorAll(".tp-prop-del").forEach(p=>{p.addEventListener("click",async()=>{confirm("Excluir este imóvel permanentemente?")&&(p.disabled=!0,p.textContent="…",await b.from("properties").delete().eq("id",Number(p.dataset.pid)),a())})})}if(t==="leads"){const{data:d}=await b.from("leads").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}).limit(200);if(!(d!=null&&d.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">📋</div><p style="font-size:14px;">Nenhum lead ainda.</p></div>';return}const p=u=>({novo:"#dbeafe,#1d4ed8",contato:"#fef3c7,#92400e",proposta:"#ede9fe,#6d28d9",fechado:"#dcfce7,#15803d"})[u]||"#f1f5f9,#64748b";n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${d.length} lead(s)</h3>
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
          <tbody>${d.map(u=>{const[w,E]=p(u.stage||u.status||"").split(","),I=(u.phone||"").replace(/\D/g,"");return`<tr data-lid="${u.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${g(u.name||"")}</td>
              <td style="padding:12px 16px;">
                <div style="font-size:13px;color:#475569;">${g(u.phone||"—")}</div>
                <div style="font-size:11px;color:#94a3b8;">${g(u.email||"")}</div>
              </td>
              <td style="padding:12px 16px;"><span style="background:${w};color:${E};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${g(u.stage||u.status||"Novo")}</span></td>
              <td style="padding:12px 16px;font-size:12px;color:#94a3b8;">${new Date(u.created_at).toLocaleDateString("pt-BR")}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;align-items:center;">
                  ${I?`<a href="https://wa.me/${I}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;" title="WhatsApp" onclick="fbq('track', 'Contact')"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg></a>`:""}
                  <button class="tp-lead-del" data-lid="${u.id}" style="${o("#fee2e2","#dc2626")}">Excluir</button>
                </div>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`,n.querySelectorAll(".tp-lead-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Excluir este lead permanentemente?")&&(u.disabled=!0,u.textContent="…",await b.from("leads").delete().eq("id",u.dataset.lid),a())})})}if(t==="users"){const{data:d}=await b.from("profiles").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}),p='<button id="tp-add-corretor" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;font-weight:600;">+ Adicionar Usuário</button>';if(!(d!=null&&d.length)){n.innerHTML=`<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">👥</div><p style="font-size:14px;margin-bottom:16px;">Nenhum corretor cadastrado ainda.</p>${p}</div>`,(i=n.querySelector("#tp-add-corretor"))==null||i.addEventListener("click",()=>pt(e.id,a));return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${d.length} usuário(s)</h3>
          ${p}
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:520px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">USUÁRIO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">FUNÇÃO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody>${d.map(u=>`
            <tr data-uid="${u.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${g(u.name||u.email||"—")}</div><div style="font-size:11px;color:#94a3b8;">${g(u.email||"")}</div></td>
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
      </div>`,(c=n.querySelector("#tp-add-corretor"))==null||c.addEventListener("click",()=>pt(e.id,a)),n.querySelectorAll(".tp-role-sel").forEach(u=>{u.addEventListener("change",async()=>{const w=u.dataset.uid;u.disabled=!0,await b.from("profiles").update({role:u.value}).eq("id",w),u.disabled=!1})}),n.querySelectorAll(".tp-user-toggle").forEach(u=>{u.addEventListener("click",async()=>{const w=u.dataset.uid,E=u.dataset.active==="1";u.disabled=!0,u.textContent="…",await b.from("profiles").update({active:!E}).eq("id",w),a()})}),n.querySelectorAll(".tp-user-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover este usuário da imobiliária? O acesso ao sistema será excluído permanentemente.")&&(u.disabled=!0,u.textContent="…",await he({action:"delete",userId:u.dataset.uid}),a())})})}if(t==="api"){const d="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api",p=(e.domain||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim(),u=p?`https://${p}`:`https://omarcorretor.com.br/demo.html?key=${e.id}`,w=p?"🌐 Site da Imobiliária":"🌐 Site Demonstração",E=p?"Site oficial da imobiliária integrado ao CRM.":"Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.",I=p?"Abrir site →":"Abrir site demo →";n.innerHTML=`
      <div style="display:grid;gap:20px;max-width:800px;">
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🔑 Chave de API</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Use para conectar qualquer site externo ao CRM desta imobiliária.</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <input type="text" value="${g(e.id)}" readonly style="flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:monospace;font-size:13px;background:#f8fafc;min-width:0;">
            <button id="tp-copy-key" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">${w}</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">${E}</p>
          <a href="${g(u)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">${I}</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${g(u)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${d}/properties?key=${g(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${d}/properties/{id}?key=${g(e.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${d}/leads?key=${g(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${d}/settings?key=${g(e.id)}</div>
          </div>
        </div>
      </div>`,(s=document.getElementById("tp-copy-key"))==null||s.addEventListener("click",()=>{var $;($=navigator.clipboard)==null||$.writeText(e.id);const h=document.getElementById("tp-copy-key"),f=h.textContent;h.textContent="✅ Copiada!",setTimeout(()=>{h.textContent=f},2e3)})}if(t==="config"){const{data:d}=await b.from("settings").select("key,value").eq("tenant_id",e.id),p={};d==null||d.forEach(w=>{p[w.key]=w.value});const u=(w,E)=>`
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${w}</div>
        <div style="font-size:14px;color:#0f172a;">${g(String(E||"—"))}</div>
      </div>`;n.innerHTML=`
      <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);max-width:560px;">
        <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 20px;">⚙️ Configurações da imobiliária</h3>
        ${u("NOME DA EMPRESA",p["company.name"]||e.name)}
        ${u("TELEFONE",p["company.phone"])}
        ${u("E-MAIL",p["company.email"])}
        ${u("WHATSAPP",p["company.whatsapp"])}
        ${u("CIDADE",p["company.city"])}
        ${u("DOMÍNIO DO SITE",e.domain)}
        ${u("PLANO",((r=e.plans)==null?void 0:r.name)||"Sem plano")}
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
          <button id="tp-open-edit" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">✏️ Editar dados completos</button>
        </div>
      </div>`,(l=document.getElementById("tp-open-edit"))==null||l.addEventListener("click",()=>Ea(e))}}function Ea(e){var l,d,p,u,w,E,I,h;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
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
            ${e.logo_url?`<img src="${g(e.logo_url)}" style="width:100%;height:100%;object-fit:cover;">`:'<span style="font-size:28px;">🏢</span>'}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · 256×256px</div>
          </div>
        </div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${g(e.name||"")}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${g(e.slug||"")}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${g(e.domain||"")}" placeholder="abc.imobipro.com.br"></div>
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
            <input id="et-api-key" class="form-input" type="text" value="${g(e.id||"")}" readonly
              style="font-family:monospace;font-size:11px;background:#fff;color:#1e3a5f;flex:1;letter-spacing:.02em;">
            <button id="et-copy-key" class="btn-secondary-sm" style="white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Endpoints disponíveis</div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([f,$,S])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${f==="GET"?"#dcfce7":"#fef9c3"};color:${f==="GET"?"#15803d":"#854d0e"};">${f}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${$}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${S}</div>
            </div>`).join("")}
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Exemplo rápido (JavaScript)</div>
        <pre style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;font-size:11px;overflow-x:auto;margin:0;line-height:1.6;"><code>const KEY = '${g(e.id)}'
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
  `,document.body.appendChild(n),b.from("plans").select("id, name").then(({data:f})=>{const $=document.getElementById("et-plan");$&&f&&($.innerHTML='<option value="">Sem plano</option>'+f.map(S=>`<option value="${S.id}"${String(S.id)===String(e.plan_id)?" selected":""}>${g(S.name)}</option>`).join(""))}),(l=document.getElementById("et-logo-input"))==null||l.addEventListener("change",f=>{const $=f.target.files[0];if(!$)return;const S=URL.createObjectURL($),k=document.getElementById("et-logo-preview");k&&(k.innerHTML=`<img src="${S}" style="width:100%;height:100%;object-fit:cover;">`)}),(d=document.getElementById("et-logo-preview"))==null||d.addEventListener("click",()=>{var f;(f=document.getElementById("et-logo-input"))==null||f.click()}),(p=document.getElementById("et-pwd-toggle"))==null||p.addEventListener("click",()=>{const f=document.getElementById("et-admin-password");f.type=f.type==="password"?"text":"password"}),(u=document.getElementById("et-copy-key"))==null||u.addEventListener("click",()=>{var k,_;const f=(k=document.getElementById("et-api-key"))==null?void 0:k.value;if(!f)return;(_=navigator.clipboard)==null||_.writeText(f);const $=document.getElementById("et-copy-key"),S=$.textContent;$.textContent="✅ Copiada!",setTimeout(()=>{$.textContent=S},2e3)});const o=["dados","config","api"];function i(f){o.forEach($=>{document.getElementById(`et-pane-${$}`).style.display=$===f?"":"none";const S=document.getElementById(`et-tab-${$}`);S.style.borderBottomColor=$===f?"#2563eb":"transparent",S.style.color=$===f?"#2563eb":"#64748b",S.style.fontWeight=$===f?"600":"500"}),f==="config"&&s()}o.forEach(f=>{var $;return($=document.getElementById(`et-tab-${f}`))==null?void 0:$.addEventListener("click",()=>i(f))});let c=!1;async function s(){var S;if(c)return;c=!0;const{data:f}=await b.from("settings").select("key,value").eq("tenant_id",e.id),$={};f==null||f.forEach(k=>{$[k.key]=k.value}),document.getElementById("et-pane-config").innerHTML=`
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${g($["company.whatsapp"]||"")}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${g($["company.phone"]||"")}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${g($["company.email"]||"")}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${g($["company.city"]||$["company.address"]||"")}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${g($["company.slogan"]||"")}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `,(S=document.getElementById("et-cfg-save"))==null||S.addEventListener("click",async()=>{const k=document.getElementById("et-cfg-save"),_=document.getElementById("et-cfg-msg");k.disabled=!0,k.textContent="Salvando…",_.textContent="",_.style.color="#64748b";const m=document.getElementById("et-cfg-wa").value.trim().replace(/\D/g,""),v=document.getElementById("et-cfg-phone").value.trim(),x=document.getElementById("et-cfg-email").value.trim(),L=document.getElementById("et-cfg-city").value.trim(),B=document.getElementById("et-cfg-slogan").value.trim(),{error:C}=await b.from("settings").upsert([{key:"company.whatsapp",value:m,tenant_id:e.id},{key:"company.phone",value:v,tenant_id:e.id},{key:"company.email",value:x,tenant_id:e.id},{key:"company.city",value:L,tenant_id:e.id},{key:"company.address",value:L,tenant_id:e.id},{key:"company.slogan",value:B,tenant_id:e.id}],{onConflict:"tenant_id,key"});k.disabled=!1,k.textContent="💾 Salvar configurações",C?(_.textContent="❌ "+C.message,_.style.color="#ef4444"):(_.textContent="✅ Configurações salvas!",_.style.color="#22c55e")})}const r=()=>n.remove();(w=document.getElementById("et-close"))==null||w.addEventListener("click",r),(E=document.getElementById("et-cancel"))==null||E.addEventListener("click",r),n.addEventListener("click",f=>{f.target===n&&r()}),(I=document.getElementById("et-delete"))==null||I.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const $=document.getElementById("et-delete");$.disabled=!0,$.textContent="Excluindo…";const{error:S}=await b.from("tenants").delete().eq("id",e.id);if(S){alert("Erro ao excluir: "+S.message),$.disabled=!1,$.textContent="🗑️ Excluir";return}r(),me()}),(h=document.getElementById("et-save"))==null||h.addEventListener("click",async()=>{var T,M,D,P,W,re,ge,Ae,Me,J,Ee,Lt;const f=(M=(T=document.getElementById("et-name"))==null?void 0:T.value)==null?void 0:M.trim(),$=(P=(D=document.getElementById("et-slug"))==null?void 0:D.value)==null?void 0:P.trim(),S=(re=(W=document.getElementById("et-domain"))==null?void 0:W.value)==null?void 0:re.trim(),k=(ge=document.getElementById("et-plan"))==null?void 0:ge.value,_=(Me=(Ae=document.getElementById("et-admin-email"))==null?void 0:Ae.value)==null?void 0:Me.trim(),m=(Ee=(J=document.getElementById("et-admin-password"))==null?void 0:J.value)==null?void 0:Ee.trim(),v=(Lt=document.getElementById("et-logo-input"))==null?void 0:Lt.files[0],x=document.getElementById("et-msg"),L=document.getElementById("et-save");if(!f){x.textContent="❌ Nome é obrigatório.",x.style.color="#ef4444";return}L.disabled=!0,L.textContent="Salvando…",x.textContent="⏳ Salvando…",x.style.color="#64748b";let B=e.logo_url;if(v)try{const N=await Ve(v,256,.85),Bt=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:Sa}=await b.storage.from("imoveis").upload(Bt,N,{contentType:"image/jpeg",upsert:!0});if(!Sa){const{data:{publicUrl:_a}}=b.storage.from("imoveis").getPublicUrl(Bt);B=_a}}catch(N){console.error("Logo upload:",N)}const{error:C}=await b.from("tenants").update({name:f,slug:$||e.slug,domain:S||null,plan_id:k||null,logo_url:B}).eq("id",e.id);if(C){L.disabled=!1,L.textContent="Salvar",x.textContent="❌ "+C.message,x.style.color="#ef4444";return}if(_&&m&&m.length>=6){x.textContent="⏳ Criando usuário admin…";const N=await he({email:_,password:m,role:"admin",tenant_id:e.id});N!=null&&N.success?(N!=null&&N.user_id&&!(N!=null&&N.linked)&&await b.from("profiles").update({tenant_id:e.id}).eq("id",N.user_id),x.textContent="✅ Salvo e admin criado!",x.style.color="#22c55e"):(x.textContent="⚠️ Salvo, mas erro ao criar admin: "+((N==null?void 0:N.error)||"Tente novamente"),x.style.color="#f59e0b")}else x.textContent="✅ Imobiliária atualizada!",x.style.color="#22c55e";L.disabled=!1,L.textContent="Salvar",setTimeout(()=>{r(),me()},1200)})}const Jt=[{key:"name",label:"Nome",required:!0},{key:"phone",label:"Telefone",required:!1},{key:"email",label:"E-mail",required:!1},{key:"notes",label:"Notas",required:!1}];let nt=[],we=[],Ye={};function Sn(){var e;(e=document.getElementById("btn-import-leads"))==null||e.addEventListener("click",_n)}function _n(){nt=[],we=[],Ye={};const e=document.createElement("div");e.id="import-leads-overlay",e.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9000;display:flex;align-items:center;justify-content:center;",e.innerHTML=`
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
    </div>`,document.body.appendChild(e),ka();const t=document.getElementById("import-drop-zone"),n=document.getElementById("import-file-input");function a(i){i.preventDefault()}document.addEventListener("dragover",a),document.addEventListener("drop",a),t.addEventListener("click",()=>n.click()),t.addEventListener("dragenter",i=>{i.preventDefault(),t.style.borderColor="#3b82f6",t.style.background="#eff6ff"}),t.addEventListener("dragover",i=>{i.preventDefault(),t.style.borderColor="#3b82f6",t.style.background="#eff6ff"}),t.addEventListener("dragleave",i=>{t.contains(i.relatedTarget)||(t.style.borderColor="#c7d2e0",t.style.background="")}),t.addEventListener("drop",i=>{var s,r;i.preventDefault(),t.style.borderColor="#c7d2e0",t.style.background="";const c=(r=(s=i.dataTransfer)==null?void 0:s.files)==null?void 0:r[0];c&&Kt(c)}),n.addEventListener("change",i=>{var s;const c=(s=i.target.files)==null?void 0:s[0];c&&Kt(c),i.target.value=""});const o=new MutationObserver(()=>{document.getElementById("import-leads-overlay")||(document.removeEventListener("dragover",a),document.removeEventListener("drop",a),o.disconnect())});o.observe(document.body,{childList:!0})}async function ka(){const e=document.getElementById("import-stage-sel");if(!e)return;const t=await getTenantId(),{data:n}=await b.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("position");n&&n.length?(e.innerHTML=n.map(a=>`<option value="${a.id}">${g(a.name)}</option>`).join(""),n[0].id,e.onchange=()=>{e.value}):e.innerHTML='<option value="">— sem etapas cadastradas —</option>'}function Kt(e){if(!e)return;const t=document.getElementById("import-file-status"),n=document.getElementById("import-upload-error");n.style.display="none";const a=e.name.toLowerCase();if(t.textContent=`📄 ${e.name} (${(e.size/1024).toFixed(1)} KB)`,a.endsWith(".csv")){const o=new FileReader;o.onload=i=>{const c=Ln(i.target.result);if(c.error){n.textContent=c.error,n.style.display="";return}we=c.headers,nt=c.rows,Ia()},o.readAsText(e,"UTF-8")}else if(a.endsWith(".xlsx")||a.endsWith(".xls")){const o=new FileReader;o.onload=i=>Bn(i.target.result),o.readAsArrayBuffer(e)}else n.textContent="Formato não suportado. Use CSV ou XLSX.",n.style.display=""}function Ln(e){const t=e.split(`
`)[0]||"",n=t.split(";").length>t.split(",").length?";":",",a=e.split(`
`).map(s=>s.trimEnd()).filter(s=>s.length);if(a.length<2)return{error:"Arquivo vazio ou sem dados."};function o(s){const r=[];let l="",d=!1;for(let p=0;p<s.length;p++){const u=s[p];u==='"'?d&&s[p+1]==='"'?(l+='"',p++):d=!d:u===n&&!d?(r.push(l.trim()),l=""):l+=u}return r.push(l.trim()),r}const i=o(a[0]).map(s=>s.replace(/^["']+|["']+$/g,"")),c=a.slice(1).map(o);return{headers:i,rows:c}}async function Bn(e){const t=document.getElementById("import-upload-error");try{window.XLSX||await new Promise((i,c)=>{const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",s.onload=i,s.onerror=c,document.head.appendChild(s)});const n=window.XLSX.read(e,{type:"array"}),a=n.Sheets[n.SheetNames[0]],o=window.XLSX.utils.sheet_to_json(a,{header:1,defval:""});if(!o||o.length<2){t.textContent="Planilha vazia.",t.style.display="";return}we=o[0].map(String),nt=o.slice(1),Ia()}catch(n){t.textContent="Erro ao ler o arquivo Excel: "+n.message,t.style.display=""}}function Cn(e,t){for(let n=0;n<e.length;n++){const a=e[n].toLowerCase();if(t.some(o=>a.includes(o)))return n}return""}function Ia(){document.getElementById("import-step-upload").style.display="none",document.getElementById("import-step-map").style.display="";const e=document.getElementById("import-field-rows"),t={name:["nome","name","contact","cliente","contato"],phone:["tel","fone","celular","whatsapp","phone","mobile"],email:["email","e-mail","mail"],notes:["obs","nota","note","comment","coment","descri"]},n='<option value="">— ignorar —</option>'+we.map((a,o)=>`<option value="${o}">${g(a)}</option>`).join("");e.innerHTML=Jt.map(a=>{const o=Cn(we,t[a.key]||[]);return Ye[a.key]=o!==""?parseInt(o):"",`
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;">
        <label style="font-size:.87rem;color:#374151;font-weight:500;">${a.label}${a.required?' <span style="color:#ef4444">*</span>':""}</label>
        <select id="import-map-${a.key}" onchange="importMapping['${a.key}']=this.value===''?'':parseInt(this.value)"
                style="padding:7px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:.87rem;">
          ${n}
        </select>
      </div>`}).join(""),Jt.forEach(a=>{const o=document.getElementById(`import-map-${a.key}`);o&&Ye[a.key]!==""&&(o.value=Ye[a.key])}),Tn(),ka()}function Tn(){const e=document.getElementById("import-preview-wrap");if(!e)return;const t=nt.slice(0,5);if(!t.length){e.innerHTML='<p style="padding:10px;color:#94a3b8;font-size:.8rem;">Sem dados</p>';return}const n=`<tr>${we.map(o=>`<th style="padding:6px 10px;background:#f1f5f9;font-size:.78rem;white-space:nowrap;border:1px solid #e2e8f0;">${g(o)}</th>`).join("")}</tr>`,a=t.map(o=>`<tr>${we.map((i,c)=>`<td style="padding:5px 10px;font-size:.78rem;border:1px solid #e2e8f0;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis;">${g(String(o[c]??""))}</td>`).join("")}</tr>`).join("");e.innerHTML=`<table style="border-collapse:collapse;min-width:100%;">${n}${a}</table>`}function qn(){return window.Chart?Promise.resolve():new Promise((e,t)=>{const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}function An(e,t,n){const a=e.querySelector("#ldp-tag-badge-area"),o=e.querySelector("#ldp-tag-add-btn"),i=e.querySelector("#ldp-tag-dropdown"),c=e.querySelector("#ldp-tag-search"),s=e.querySelector("#ldp-tag-opt-list"),r=e.querySelector("#ldp-tag-show-create"),l=e.querySelector("#ldp-tag-create-row"),d=e.querySelector("#ldp-tag-new-name"),p=e.querySelector("#ldp-tag-new-color"),u=e.querySelector("#ldp-tag-create-btn");if(!a||!o||!i)return;function w(){return[...a.querySelectorAll(".ldp-tag-badge[data-tag]")].map(S=>S.dataset.tag)}function E(S){if(!S.length){a.innerHTML='<span class="ldp-tag-empty">Nenhuma tag — clique em + para adicionar</span>';return}a.innerHTML=S.map(k=>{const m=(n[k]||{}).color||"#6366F1";return`<span class="ldp-tag-badge" data-tag="${g(k)}" style="background:${m}18;color:${m};border-color:${m}55;">
        ${g(k)}<span class="ldp-tag-rm" data-tag="${g(k)}">×</span>
      </span>`}).join("")}function I(S=""){const k=w(),_=S.toLowerCase().trim(),m=t.filter(v=>!_||v.name.toLowerCase().includes(_));if(!m.length){s.innerHTML='<div class="ldp-tag-opt-empty">Nenhuma tag encontrada</div>';return}s.innerHTML=m.map(v=>{const x=k.includes(v.name);return`<div class="ldp-tag-opt${x?" active":""}" data-tag="${g(v.name)}" style="--tc:${v.color}">
        <span class="ldp-tag-opt-dot" style="background:${v.color}"></span>
        <span class="ldp-tag-opt-name">${g(v.name)}</span>
        ${x?'<span class="ldp-tag-opt-check">✓</span>':""}
      </div>`}).join("")}function h(){i.classList.remove("hidden"),I(""),c.value="",l.classList.add("hidden"),c.focus()}function f(){i.classList.add("hidden")}o.addEventListener("click",S=>{S.stopPropagation(),i.classList.contains("hidden")?h():f()}),document.addEventListener("mousedown",function S(k){e.contains(k.target)||(f(),document.removeEventListener("mousedown",S))}),i.addEventListener("mousedown",S=>S.stopPropagation()),c.addEventListener("input",()=>I(c.value)),s.addEventListener("click",S=>{const k=S.target.closest(".ldp-tag-opt");if(!k)return;const _=k.dataset.tag,m=w();m.includes(_)?E(m.filter(v=>v!==_)):E([...m,_]),I(c.value)}),a.addEventListener("click",S=>{const k=S.target.closest(".ldp-tag-rm");if(!k)return;const _=k.dataset.tag;E(w().filter(m=>m!==_))}),r.addEventListener("click",()=>{l.classList.toggle("hidden"),l.classList.contains("hidden")||d.focus()});async function $(){const S=d.value.trim();if(!S){d.focus();return}const k=p.value||"#6366F1";if(t.some(_=>_.name.toLowerCase()===S.toLowerCase())){d.style.borderColor="#ef4444",setTimeout(()=>{d.style.borderColor=""},1500);return}u.disabled=!0,u.textContent="Criando…";try{const{data:_,error:m}=await b.from("crm_tags").insert({name:S,color:k,tenant_id:y==null?void 0:y.tenant_id}).select().single();if(m)throw m;const v={id:_.id,name:_.name,color:_.color};t.push(v),n[v.name]=v,typeof ye<"u"&&(ye[v.name]=v),E([...w(),v.name]),I(c.value),d.value="",p.value="#6366F1",l.classList.add("hidden")}catch(_){console.error("Error creating tag:",_),alert("Erro ao criar tag: "+(_.message||_))}finally{u.disabled=!1,u.textContent="Criar e adicionar"}}u.addEventListener("click",$),d.addEventListener("keydown",S=>{S.key==="Enter"&&$()})}async function Mn(){var h;const e=document.getElementById("section-dashboard");if(!e)return;if(e.dataset.dbInit==="1"){try{window._dbLeadsChartInstance&&(window._dbLeadsChartInstance.destroy(),window._dbLeadsChartInstance=null)}catch{}try{window._dbOriginChartInstance&&(window._dbOriginChartInstance.destroy(),window._dbOriginChartInstance=null)}catch{}}e.dataset.dbInit="1",e.innerHTML=`
<div class="db-wrap">

  <!-- Header -->
  <div class="db-header">
    <div>
      <h1 class="db-greeting">Carregando… <span class="db-greeting-name" id="db-greeting-name"></span></h1>
      <p class="db-subline" id="db-subline">Preparando seu painel…</p>
    </div>
    <div class="db-header-chips" id="db-header-chips"></div>
  </div>

  <!-- KPI Cards (6 - inclui VGV Total) -->
  <div class="db-kpis db-kpis-6">
    ${["db-kpi-indigo","db-kpi-vgv","db-kpi-emerald","db-kpi-amber","db-kpi-sky","db-kpi-pink"].map((f,$)=>`
    <div class="db-kpi ${f}" id="db-kpi-${$}">
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

  <!-- Funil visual + ações rápidas (estilo Jetimob "Oportunidades") -->
  <div class="db-row-funnel">
    <div class="db-card db-funnel-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Funil de Negociações</div>
          <div class="db-card-sub">Leads em cada etapa</div>
        </div>
        <button class="db-card-link" onclick="navigateToSection('funil')">Ver kanban →</button>
      </div>
      <div class="db-funnel-stages" id="db-funnel-stages">
        <div class="db-empty"><div class="db-empty-icon">⏳</div><div class="db-empty-text">Carregando…</div></div>
      </div>
    </div>
    <div class="db-card db-quick-actions-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Ações rápidas</div>
          <div class="db-card-sub">Atalhos pra acelerar</div>
        </div>
      </div>
      <div class="db-quick-actions">
        <button class="db-quick-action" onclick="navigateToSection('funil');setTimeout(()=>document.getElementById('btn-funil-add-lead')?.click(),200)">
          <span class="db-quick-icon" style="background:#dcfce7;color:#059669">+</span>
          <span class="db-quick-label">Novo lead</span>
        </button>
        <button class="db-quick-action" onclick="navigateToSection('properties');setTimeout(()=>document.querySelector('#section-properties .btn-primary')?.click(),200)">
          <span class="db-quick-icon" style="background:#dbeafe;color:#2563eb">🏠</span>
          <span class="db-quick-label">Novo imóvel</span>
        </button>
        <button class="db-quick-action" onclick="navigateToSection('tarefas')">
          <span class="db-quick-icon" style="background:#fef3c7;color:#d97706">✓</span>
          <span class="db-quick-label">Nova tarefa</span>
        </button>
        <button class="db-quick-action" onclick="navigateToSection('vendas')">
          <span class="db-quick-icon" style="background:#cffafe;color:#0e7490">💰</span>
          <span class="db-quick-label">Vendas</span>
        </button>
        <button class="db-quick-action" onclick="navigateToSection('contatos')">
          <span class="db-quick-icon" style="background:#fce7f3;color:#be185d">👥</span>
          <span class="db-quick-label">Contatos</span>
        </button>
        <button class="db-quick-action" onclick="navigateToSection('perdas')">
          <span class="db-quick-icon" style="background:#fee2e2;color:#dc2626">⚠</span>
          <span class="db-quick-label">Perdas</span>
        </button>
      </div>
    </div>
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

</div>`;const n=new Date,a=n.getHours(),o=a<12?"Bom dia":a<18?"Boa tarde":"Boa noite",i=["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],c=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],s=`${i[n.getDay()]}, ${n.getDate()} de ${c[n.getMonth()]} de ${n.getFullYear()}`,r=((h=y==null?void 0:y.name)==null?void 0:h.split(" ")[0])||"Corretor",l=e.querySelector(".db-greeting");l&&(l.innerHTML=`${o}, <span class="db-greeting-name">${R(r)}</span> 👋`);const d=document.getElementById("db-subline");d&&(d.textContent=`Aqui está o resumo do seu negócio — ${s}`);let p=[],u=[];try{const[f,$]=await Promise.all([ta(),zn()]);p=f||[],u=$||[]}catch(f){console.warn("[Dashboard] Erro ao carregar dados:",f)}Dn(p,u,n);const w=p.filter(f=>f.published).length,E=u.filter(f=>ht(f.created_at)===ht(n.toISOString())).length,I=document.getElementById("db-header-chips");I&&(I.innerHTML=`
    <span class="db-chip db-chip-green">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      ${w} publicados
    </span>
    <span class="db-chip db-chip-blue">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      ${E} lead${E!==1?"s":""} hoje
    </span>
    <span class="db-chip db-chip-gold">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      ${s.split(",")[0]}
    </span>`),jn(u,p),Hn(p),On(p,u,n),Pn(p,u);try{await qn(),Yt(u,7),Rn(u),document.querySelectorAll(".db-ptab").forEach(f=>{f.addEventListener("click",()=>{document.querySelectorAll(".db-ptab").forEach(S=>S.classList.remove("active")),f.classList.add("active");const $=parseInt(f.dataset.p);window._dbSelectedDays=$,Yt(u,$)})})}catch(f){console.warn("[Dashboard] Chart.js não carregou:",f)}window.lucide&&lucide.createIcons(),window._dbRefreshTimer&&clearInterval(window._dbRefreshTimer),window._dbRefreshTimer=setInterval(()=>{const f=document.getElementById("dashboard-content")||document.querySelector(".db-dashboard");!f||f.offsetParent===null||typeof renderDashboard=="function"&&renderDashboard(!0)},3e4)}function R(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ht(e){return(e||"").slice(0,10)}function $a(e,t){if(!e)return"—";const n=t-new Date(e),a=Math.floor(n/6e4);if(a<2)return"agora mesmo";if(a<60)return`há ${a}min`;const o=Math.floor(a/60);if(o<24)return`há ${o}h`;const i=Math.floor(o/24);return i===1?"ontem":i<7?`há ${i} dias`:new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}function ke(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(0)+"k":String(e)}async function zn(){let e=b.from("leads").select("*").order("created_at",{ascending:!1}).limit(500);(y==null?void 0:y.role)==="corretor"?e=e.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(e=e.eq("tenant_id",y.tenant_id));const{data:t,error:n}=await e;return n?(console.warn("[Dashboard] leads fetch error:",n.message),[]):t||[]}function Dn(e,t,n){const a=e.length,o=e.filter(k=>k.published).length,i=t.length,c=t.filter(k=>!k.converted_at&&!k.lost_at&&k.stage).length;function s(k){if(k==null)return 0;if(typeof k=="number")return k;let m=String(k).trim().replace(/[^\d,.]/g,"");m.includes(",")&&m.lastIndexOf(",")>m.lastIndexOf(".")?m=m.replace(/\./g,"").replace(",","."):m=m.replace(/\./g,"");const v=parseFloat(m);return isNaN(v)?0:v}const r=e.filter(k=>k.published).reduce((k,_)=>k+s(_.price),0),l=new Date(n);l.setDate(l.getDate()-30);const d=t.filter(k=>k.converted_at&&new Date(k.converted_at)>=l).length,p=new Date(n);p.setDate(p.getDate()-30);const u=new Date(n);u.setDate(u.getDate()-60);const w=e.filter(k=>k.created_at&&new Date(k.created_at)>=p).length,E=e.filter(k=>k.created_at&&new Date(k.created_at)>=u&&new Date(k.created_at)<p).length,I=t.filter(k=>k.created_at&&new Date(k.created_at)>=p).length,h=t.filter(k=>k.created_at&&new Date(k.created_at)>=u&&new Date(k.created_at)<p).length;function f(k,_,m){if(_===0&&k===0)return'<span class="db-kpi-trend db-trend-neu">Sem dados</span>';if(_===0)return'<span class="db-kpi-trend db-trend-up">▲ Novo</span>';const v=Math.round((k-_)/_*100);return v===0?'<span class="db-kpi-trend db-trend-neu">= Estável</span>':v>0?`<span class="db-kpi-trend db-trend-up">▲ +${v}% ${m}</span>`:`<span class="db-kpi-trend db-trend-down">▼ ${v}% ${m}</span>`}function $(k){return k>=1e6?"R$ "+(k/1e6).toFixed(k>=1e7?1:2).replace(".",",")+"M":k>=1e3?"R$ "+Math.round(k/1e3)+"K":"R$ "+Math.round(k).toLocaleString("pt-BR")}[{idx:0,val:ke(a),label:"Total de Imóveis",trend:f(w,E,"este mês"),icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'},{idx:1,val:$(r),label:"VGV Total",trend:r===0?'<span class="db-kpi-trend db-trend-neu">Sem imóveis publicados</span>':`<span class="db-kpi-trend db-trend-up">▲ ${o} imóveis</span>`,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>'},{idx:2,val:ke(o),label:"Publicados",trend:o===0?'<span class="db-kpi-trend db-trend-neu">Nenhum publicado</span>':`<span class="db-kpi-trend db-trend-up">${Math.round(o/Math.max(a,1)*100)}% do total</span>`,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'},{idx:3,val:ke(i),label:"Leads Recebidos",trend:f(I,h,"vs. mês ant."),icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'},{idx:4,val:ke(c),label:"Em Negociação",trend:c===0?'<span class="db-kpi-trend db-trend-neu">Nenhum ativo</span>':'<span class="db-kpi-trend db-trend-up">▲ Ativos no funil</span>',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>'},{idx:5,val:ke(d),label:"Vendas (30d)",trend:d===0?'<span class="db-kpi-trend db-trend-neu">Aguardando primeira venda</span>':'<span class="db-kpi-trend db-trend-up">🎯 Fechadas</span>',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>'}].forEach(({idx:k,val:_,label:m,trend:v,icon:x})=>{const L=document.getElementById(`db-kpi-${k}`);L&&(L.innerHTML=`
      <div class="db-kpi-icon">${x}</div>
      <div class="db-kpi-body">
        <div class="db-kpi-val">${_}</div>
        <div class="db-kpi-lbl">${R(m)}</div>
        ${v}
      </div>`)}),Nn(t)}function Nn(e){const t=document.getElementById("db-funnel-stages");if(!t)return;const n=e.filter(s=>!s.converted_at&&!s.lost_at),a={};n.forEach(s=>{const r=s.stage||"Sem etapa";a[r]=(a[r]||0)+1});const o=Object.entries(a).sort((s,r)=>r[1]-s[1]),i=n.length,c=Math.max(...o.map(s=>s[1]),1);if(!o.length){t.innerHTML='<div class="db-empty"><div class="db-empty-icon">💼</div><div class="db-empty-text">Nenhum lead em negociação ainda</div></div>';return}t.innerHTML=o.map(([s,r])=>{const l=Math.round(r/c*100);return`<div class="db-funnel-row" onclick="navigateToSection('funil')">
      <div class="db-funnel-label">${R(s)}</div>
      <div class="db-funnel-bar-wrap"><div class="db-funnel-bar" style="width:${l}%"></div></div>
      <div class="db-funnel-count">${r}</div>
    </div>`}).join("")+`<div class="db-funnel-total">Total ativo: <strong>${i}</strong> negociações</div>`}function Yt(e,t){const n=document.getElementById("db-leads-chart");if(!n||!window.Chart)return;if(window._dbLeadsChartInstance){try{window._dbLeadsChartInstance.destroy()}catch{}window._dbLeadsChartInstance=null}const a=[],o=[],i=new Date;for(let s=t-1;s>=0;s--){const r=new Date(i);r.setDate(r.getDate()-s);const l=r.toISOString().slice(0,10),d=t<=7?r.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".",""):t<=30?r.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}):r.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"});a.push(d),o.push(e.filter(p=>ht(p.created_at)===l).length)}const c=Math.max(...o,1);window._dbLeadsChartInstance=new Chart(n,{type:"bar",data:{labels:a,datasets:[{label:"Leads",data:o,backgroundColor:o.map(s=>s===c&&c>0?"rgba(201,162,39,0.90)":"rgba(201,162,39,0.35)"),borderColor:"#C9A227",borderWidth:1.5,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!0,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#0F172A",padding:10,callbacks:{label:s=>` ${s.parsed.y} lead${s.parsed.y!==1?"s":""}`}}},scales:{x:{grid:{display:!1},ticks:{color:"#94A3B8",font:{size:11}}},y:{beginAtZero:!0,grid:{color:"rgba(226,232,240,0.6)",drawBorder:!1},ticks:{color:"#94A3B8",font:{size:11},precision:0,stepSize:Math.max(1,Math.ceil(c/4))}}}}})}window._dbOriginChartInstance=null;function Rn(e){const t=document.getElementById("db-origin-chart"),n=document.getElementById("db-origin-legend");if(!t||!window.Chart)return;window._dbOriginChartInstance&&(window._dbOriginChartInstance.destroy(),_dbOriginChartInstance=null);const a={};e.forEach(l=>{const d=l.source||"Direto",p=d.charAt(0).toUpperCase()+d.slice(1);a[p]=(a[p]||0)+1}),Object.keys(a).length===0&&(a.Site=0,a.WhatsApp=0,a.Indicação=0);const o=Object.keys(a),i=Object.values(a),c=["#6366F1","#10B981","#F59E0B","#0EA5E9","#EC4899","#8B5CF6","#14B8A6","#94A3B8"],s=o.map((l,d)=>c[d%c.length]),r=i.reduce((l,d)=>l+d,0);window._dbOriginChartInstance=new Chart(t,{type:"doughnut",data:{labels:o,datasets:[{data:i,backgroundColor:s,borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!0,cutout:"68%",plugins:{legend:{display:!1},tooltip:{backgroundColor:"#0F172A",padding:10,callbacks:{label:l=>{const d=r>0?Math.round(l.parsed/r*100):0;return` ${l.label}: ${l.parsed} (${d}%)`}}}}}}),n&&(r===0?n.innerHTML='<div class="db-empty" style="padding:12px 0"><div class="db-empty-text">Nenhum lead ainda<br><span style="font-size:11px;color:#CBD5E1">Os canais aparecerão aqui quando houver leads</span></div></div>':n.innerHTML=o.map((l,d)=>`
        <div class="db-legend-item">
          <div class="db-legend-dot-row">
            <span class="db-legend-dot" style="background:${s[d]}"></span>
            <span>${R(l)}</span>
          </div>
          <span class="db-legend-val">${i[d]}</span>
        </div>`).join(""))}function jn(e,t){const n=document.getElementById("db-leads-tbody"),a=document.getElementById("db-leads-sub");if(!n)return;const o=e.slice(0,8),i=new Date;if(a&&(a.textContent=`${e.length} lead${e.length!==1?"s":""} no total`),o.length===0){n.innerHTML='<tr><td colspan="5"><div class="db-empty"><div class="db-empty-icon">💬</div><div class="db-empty-text">Nenhum lead recebido ainda</div></div></td></tr>';return}const c={novo:{cls:"db-status-novo",label:"Novo"},contatado:{cls:"db-status-contatado",label:"Contatado"},negociando:{cls:"db-status-negociando",label:"Negociando"},fechado:{cls:"db-status-fechado",label:"Fechado"},perdido:{cls:"db-status-perdido",label:"Perdido"}};n.innerHTML=o.map(s=>{const r=c[s.status]||{cls:"db-status-novo",label:s.status||"Novo"},l=s.property_id?t.find(p=>String(p.id)===String(s.property_id)):null,d=s.source?s.source.charAt(0).toUpperCase()+s.source.slice(1):"Direto";return`
    <tr>
      <td>
        <div class="db-lead-name">${R(s.name||"—")}</div>
        <div class="db-lead-phone">${R(s.phone||s.email||"—")}</div>
        ${l?`<div style="font-size:11px;color:#94A3B8;margin-top:1px;">${R(l.title||"")}</div>`:""}
      </td>
      <td><span class="db-lead-src">${R(d)}</span></td>
      <td><span class="db-status-badge ${r.cls}">${R(r.label)}</span></td>
      <td style="color:#64748B;font-size:12px;">${$a(s.created_at,i)}</td>
      <td><button class="db-btn-view" onclick="navigateToSection('funil')">Ver Lead</button></td>
    </tr>`}).join("")}function Hn(e){const t=document.getElementById("db-top-props");if(!t)return;const n=[...e].sort((a,o)=>new Date(o.created_at)-new Date(a.created_at)).slice(0,6);if(n.length===0){t.innerHTML='<div class="db-empty"><div class="db-empty-icon">🏠</div><div class="db-empty-text">Nenhum imóvel cadastrado ainda</div></div>';return}t.innerHTML=n.map((a,o)=>{const i=(()=>{try{return Array.isArray(a.images)?a.images:JSON.parse(a.images||"[]")}catch{return[]}})(),c=a.cover_image||i.find(u=>u&&u.startsWith("http"))||"",s=o===0?"rank-1":o===1?"rank-2":o===2?"rank-3":"",r=a.published?"pub":"rascunho",l=a.published?"Publicado":"Rascunho",d=[a.neighborhood,a.city].filter(Boolean).join(", ")||"—",p=a.price?`R$ ${String(a.price).replace(/[^0-9,.]/g,"")}`:"—";return`
    <div class="db-prop-item">
      <div class="db-prop-rank ${s}">${o+1}</div>
      ${c?`<img class="db-prop-thumb" src="${R(c)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
      <div class="db-prop-thumb-ph" ${c?'style="display:none"':""}>🏠</div>
      <div class="db-prop-info">
        <div class="db-prop-name" title="${R(a.title||"")}">${R(a.title||"Sem título")}</div>
        <div class="db-prop-city">${R(d)} · ${R(p)}</div>
      </div>
      <span class="db-prop-badge ${r}">${l}</span>
    </div>`}).join("")}function On(e,t,n){var i;const a=document.getElementById("db-timeline");if(!a)return;const o=[];o.push({icon:"👤",cls:"tl-login",title:"Você entrou no sistema",meta:`Bem-vindo de volta, ${((i=y==null?void 0:y.name)==null?void 0:i.split(" ")[0])||"Corretor"}`,time:n.toISOString()}),t.slice(0,3).forEach(c=>{o.push({icon:"💬",cls:"tl-lead",title:`Novo lead: ${c.name||"Sem nome"}`,meta:`Origem: ${c.source||"Direto"} · ${c.phone||c.email||""}`,time:c.created_at})}),e.slice(0,3).forEach(c=>{const s=c.published?"Imóvel publicado":"Imóvel cadastrado";o.push({icon:"🏠",cls:"tl-prop",title:`${s}: ${c.title||"Sem título"}`,meta:`${c.city||""} · ${c.reference||""}`,time:c.created_at})}),o.sort((c,s)=>new Date(s.time)-new Date(c.time)),a.innerHTML=o.slice(0,8).map(c=>`
    <div class="db-tl-item">
      <div class="db-tl-icon ${c.cls}">${c.icon}</div>
      <div class="db-tl-body">
        <div class="db-tl-title">${R(c.title)}</div>
        ${c.meta?`<div class="db-tl-meta">${R(c.meta)}</div>`:""}
      </div>
      <div class="db-tl-time">${$a(c.time,n)}</div>
    </div>`).join(""),o.length===0&&(a.innerHTML='<div class="db-empty"><div class="db-empty-icon">📋</div><div class="db-empty-text">Sem atividades recentes</div></div>')}function Pn(e,t){const n=document.getElementById("db-portfolio");if(!n)return;const a=e.length,o=e.filter(l=>l.published).length,i=a-o,c=t.filter(l=>l.stage&&l.stage!=="perdido"&&l.stage!=="fechado").length,s=e.filter(l=>{try{const d=Array.isArray(l.collection)?l.collection:JSON.parse(l.collection||"[]");return d.includes("alto-padrao")||d.includes("lancamentos")||d.includes("decorados")}catch{return!1}}).length,r=[{icon:"✅",val:o,lbl:"Imóveis Ativos"},{icon:"📝",val:i,lbl:"Em Rascunho"},{icon:"🤝",val:c,lbl:"Em Negociação"},{icon:"⭐",val:s,lbl:"Em Coleções"}];n.innerHTML=r.map(l=>`
    <div class="db-port-card">
      <div class="db-port-icon">${l.icon}</div>
      <div class="db-port-val">${ke(l.val)}</div>
      <div class="db-port-lbl">${R(l.lbl)}</div>
    </div>`).join("")}typeof qe=="function"&&(window.openTarefaModal=qe);
