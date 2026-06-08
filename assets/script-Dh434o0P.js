import{s as h}from"./supabase-BcuJ3xoD.js";const F="00000000-0000-0000-0000-000000000000";let de={},he={},oe=F;function fe(e){oe=e||F,de={},he={}}const M=()=>oe;async function ia(){const[e,t]=await Promise.all([h.from("settings").select("key,value").eq("tenant_id",oe),h.from("site_content").select("*").eq("tenant_id",oe)]);if(e.data&&e.data.forEach(n=>{de[n.key]=n.value}),t.data&&t.data.forEach(n=>{he[n.key]=n}),(!t.data||t.data.length===0)&&oe!==F){const[n,a]=await Promise.all([h.from("settings").select("key,value").eq("tenant_id",F),h.from("site_content").select("*").eq("tenant_id",F)]);n.data&&n.data.forEach(o=>{de[o.key]===void 0&&(de[o.key]=o.value)}),a.data&&a.data.forEach(o=>{he[o.key]||(he[o.key]=o)})}}const J=(e,t=null)=>de[e]!==void 0?de[e]:t,Se=(e,t="pt")=>{const n=he[e];return n&&(n["value_"+t]||n.value_pt)||null};async function xe(e){const t=new Date().toISOString(),n=e.map(([o,i])=>({key:o,value:i,tenant_id:oe,updated_at:t})),{error:a}=await h.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,i])=>{de[o]=i}),!a}async function je(e,{pt:t,en:n,es:a}){const o=new Date().toISOString(),i={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:oe,updated_at:o},{error:d}=await h.from("site_content").upsert(i,{onConflict:"key,tenant_id"});return d||(he[e]=i),oe!==F&&await h.from("site_content").upsert({key:e,value_pt:t,value_en:n,value_es:a,tenant_id:F,updated_at:o},{onConflict:"key,tenant_id"}),!d}async function Ye(e,t,n){const{error:a}=await h.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function lt(){const e=document.documentElement,t=J("visual.accent_color","#b8962e"),n=J("visual.primary_bg","#0f1c2e"),a=J("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=J("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(s=>{s.src=o});const i=J("company.favicon_url","/favicon.ico"),d=document.querySelector('link[rel="shortcut icon"]');d&&(d.href=i);const r=J("visual.hero_bg_url","");if(r){const s=document.querySelector(".hero, .hero-v2");s&&(s.style.backgroundImage="url('"+r+"')")}}function yt(e){e=e||"pt";const t=g=>Se(g,e)||"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector('[data-i18n="hero.subtitle"]')||document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small, footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const i=document.querySelector('[data-i18n="inst.p1"]'),d=document.querySelector('[data-i18n="inst.p2"]'),r=document.querySelector('[data-i18n="inst.p3"]');i&&t("inst.bio_p1")&&(i.innerHTML=t("inst.bio_p1")),d&&t("inst.bio_p2")&&(d.innerHTML=t("inst.bio_p2")),r&&t("inst.bio_p3")&&(r.innerHTML=t("inst.bio_p3"));const s=document.querySelector('[data-i18n="inst.stat1_num"]'),c=document.querySelector('[data-i18n="inst.stat2_num"]')||document.querySelector('[data-i18n-num="inst.stat2num"]'),l=document.querySelector('[data-i18n="inst.stat3_num"]'),m=document.querySelector('[data-i18n="inst.stat1_label"]')||document.querySelector('[data-i18n="inst.stat1"]'),p=document.querySelector('[data-i18n="inst.stat2_label"]')||document.querySelector('[data-i18n="inst.stat2"]'),b=document.querySelector('[data-i18n="inst.stat3_label"]')||document.querySelector('[data-i18n="inst.stat3"]');s&&t("inst.stat1_num")&&(s.innerHTML=t("inst.stat1_num")),c&&t("inst.stat2_num")&&(c.innerHTML=t("inst.stat2_num")),l&&t("inst.stat3_num")&&(l.innerHTML=t("inst.stat3_num")),m&&t("inst.stat1_label")&&(m.innerHTML=t("inst.stat1_label")),p&&t("inst.stat2_label")&&(p.innerHTML=t("inst.stat2_label")),b&&t("inst.stat3_label")&&(b.innerHTML=t("inst.stat3_label"));const x=document.getElementById("dep-grid");if(x){const g=Se("testimonials",e)||Se("testimonials","pt");if(g)try{const E=JSON.parse(g);if(Array.isArray(E)&&E.length>0){let S=function(k){return String(k||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},L=function(k){let w=0;for(const $ of k||"?")w=w*31+$.charCodeAt(0)&4294967295;return I[Math.abs(w)%I.length]};const I=["#0d2144","#1a3a5c","#0a1628","#164a3c","#2d1b3d","#3d1a1a","#1a2f4a"];x.innerHTML=E.map(k=>`
            <div class="dep-card-v2">
              <div class="dep-stars-v2">${"★".repeat(k.stars||5)}</div>
              <p class="dep-text-v2">"${S(k.text)}"</p>
              <div class="dep-author-v2">
                <div class="dep-avatar-v2" style="background:${L(k.name)}">${(k.name||"?")[0].toUpperCase()}</div>
                <div>
                  <div class="dep-name-v2">${S(k.name)}</div>
                  <div class="dep-role-v2">${S(k.role)}</div>
                </div>
              </div>
            </div>`).join("")}}catch{}}const u=Se("seo.title_pt",e);u&&(document.title=u);const y=Se("seo.description_pt",e);if(y){const g=document.querySelector('meta[name="description"]');g&&(g.content=y)}}function bt(e){if(!e)return;const t="https://wa.me/"+e;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const sa="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let _e="5547999701743";const we=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],da=5.7;function Ae(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/da).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let _=[],f=null,qe=[],Mt=!1;h.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(Mt=!0)});function Qe(e,t,n){try{localStorage.setItem(e,JSON.stringify({v:t,exp:Date.now()+n}))}catch{}}function De(e){try{const t=localStorage.getItem(e);if(!t)return null;const n=JSON.parse(t);return Date.now()>n.exp?(localStorage.removeItem(e),null):n.v}catch{return null}}async function zt({background:e=!1}={}){const t=window.location.hostname;if(t==="localhost"||t==="127.0.0.1"){const{data:l,error:m}=await h.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return m&&console.error("Supabase select error:",m),l||[]}const a=`imobi_tenant_${t.replace(/^www\./,"")}`;let o=M();if(!o||o===F){const l=De(a);if(l)o=l,fe(o);else{const m=t.replace(/^www\./,"");for(const p of[m,"www."+m]){const{data:b}=await h.from("tenants").select("id").eq("domain",p).maybeSingle();if(b!=null&&b.id){o=b.id,fe(o);break}}o&&o!==F&&Qe(a,o,24*60*60*1e3)}}if(!o||o===F)return console.warn("[ImobiCRM] Tenant não encontrado para domínio:",t),[];const i=`imobi_props_${o}`,d=5*60*1e3;if(!e){const l=De(i);if(l)return setTimeout(()=>zt({background:!0}),100),l}const{data:r,error:s}=await h.from("properties").select("*").eq("published",!0).eq("tenant_id",o).order("created_at",{ascending:!1});if(s)return console.error("Supabase select error:",s),De(i)||[];const c=r||[];return Qe(i,c,d),e&&typeof re=="function"&&re().catch(()=>{}),c}async function Nt(){let e=h.from("properties").select("*").order("created_at",{ascending:!1});(f==null?void 0:f.role)==="super_admin"||(f!=null&&f.tenant_id?e=e.eq("tenant_id",f.tenant_id):e=e.or("tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000"));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):(_=t||[],Da(),Ra(),_)}async function la(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await h.from("properties").update(a).eq("id",t);if(o)throw o;const i=_.findIndex(d=>d.id===t);i>=0&&(_[i]={..._[i],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await h.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&_.unshift(t[0])}}async function ra(e){const{error:t}=await h.from("properties").delete().eq("id",e);if(t)throw t;_=_.filter(n=>n.id!==e)}async function ca(e,t){const{error:n}=await h.auth.signInWithPassword({email:e,password:t});return!n}function Me(e,t=1200,n=.78){return new Promise((a,o)=>{const i=new Image,d=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(d);const r=document.createElement("canvas");let s=i.width,c=i.height;s>t&&(c=Math.round(c*t/s),s=t),r.width=s,r.height=c;const l=r.getContext("2d");l.drawImage(i,0,0,s,c);const m=new Image;m.crossOrigin="anonymous",m.onload=()=>{const p=Math.round(s*.18),b=Math.round(m.naturalHeight*p/m.naturalWidth),x=Math.round(s*.02),u=s-p-x,y=c-b-x;l.globalAlpha=.45,l.drawImage(m,u,y,p,b),l.globalAlpha=1,r.toBlob(g=>g?a(g):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.onerror=()=>{r.toBlob(p=>p?a(p):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.src="/logo.png"},i.onerror=o,i.src=d})}async function ma(e){const t=await Me(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await h.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=h.storage.from("imoveis").getPublicUrl(n);return o}async function pa(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await ma(n[o]));return a}function jt(e){if(!e)return{};const t={};return e.querySelectorAll(".icard-img-wrap").forEach(n=>{const a=n.dataset.pid,o=n.dataset.idx;a&&o&&o!=="0"&&(t[a]=parseInt(o,10))}),t}function Dt(e,t){!e||!t||Object.entries(t).forEach(([n,a])=>{const o=e.querySelector('.icard-img-wrap[data-pid="'+n+'"]');if(!o)return;const i=parseInt(o.dataset.total,10);if(!i||i<2)return;const d=a%i;o.dataset.idx=d;try{const s=JSON.parse(decodeURIComponent(o.dataset.images||"[]"));if(s[d]){const c=o.querySelector(".carousel-img"),l=o.querySelector(".carousel-img-bg");c&&(c.src=s[d]),l&&(l.src=s[d])}}catch{}const r=o.querySelectorAll(".icard-dot");if(r.length){const s=d%r.length;r.forEach((c,l)=>c.classList.toggle("active",l===s))}})}function ua(e){const t=document.getElementById("collections-wrap");if(!t)return;const n=s=>e.filter(c=>{if(c.collection){try{const m=JSON.parse(c.collection);if(Array.isArray(m))return m.includes(s)}catch{}if(c.collection===s)return!0}const l=((c.title||"")+" "+(c.description||"")).toLowerCase();return s==="frente-mar"?l.includes("frente mar")||l.includes("frente ao mar"):s==="decorados"?l.includes("decorad")||l.includes("mobiliado"):s==="casas-condominio"?(c.condominium||"").length>2:!1});function a(s,c,l,m){if(!l.length)return"";const p=l.slice(0,8).map(b=>mt(b)).join("");return`
      <div class="colecao-section">
        <div class="colecao-header">
          <h2 class="colecao-title" style="color:${c}">${v(s)}</h2>
          <a href="${v(m)}" class="colecao-ver-todos">Ver todos</a>
        </div>
        <div class="imoveis-grid colecao-grid" data-collection="${s}">${p}</div>
      </div>`}const o=n("frente-mar"),i=n("decorados"),d=n("casas-condominio"),r=jt(t);t.innerHTML=[a("Imóveis Disponíveis","var(--navy, #0d2144)",e,"imoveis.html"),o.length?a("Coleção FRENTE MAR","var(--navy, #0d2144)",o,"imoveis.html?collection=frente-mar"):"",i.length?a("Coleção DECORADOS","var(--navy, #0d2144)",i,"imoveis.html?collection=decorados"):"",d.length?a("Coleção CASAS EM CONDOMÍNIO","var(--navy, #0d2144)",d,"imoveis.html?collection=casas-condominio"):""].join(""),Dt(t,r),t._carouselDelegated||(t._carouselDelegated=!0,t.addEventListener("click",rt))}async function re(){var b,x,u,y,g,E;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await zt();_=n,((b=document.getElementById("selecao-carousel"))==null?void 0:b.innerHTML)===""&&ga(n);const a=((x=document.getElementById("city-filter"))==null?void 0:x.value)||"",o=((u=document.getElementById("neighborhood-filter"))==null?void 0:u.value)||"",i=((y=document.getElementById("bedrooms-filter"))==null?void 0:y.value)||"",d=((g=document.getElementById("parking-filter"))==null?void 0:g.value)||"",r=((E=document.getElementById("construction-filter"))==null?void 0:E.value)||"",{min:s,max:c}=va(),l=n.filter(I=>{if(a&&I.city!==a||o&&I.neighborhood!==o||i&&(i==="4+"&&Number(I.bedrooms)<4||i!=="4+"&&Number(I.bedrooms)!==Number(i))||d&&(d==="4+"&&Number(I.parking)<4||d!=="4+"&&Number(I.parking)!==Number(d))||r&&I.construction_status!==r)return!1;const S=String(I.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),L=parseInt(S,10)||0;return!(L<s||c!==1/0&&L>c)});if(e){ua(n);return}if(!l.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}const m=jt(t);t.innerHTML=l.map(I=>mt(I)).join(""),Dt(t,m);const p=document.getElementById("properties");p&&!p._carouselDelegated&&(p._carouselDelegated=!0,p.addEventListener("click",rt))}function ga(e){var o,i,d;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(r=>mt(r)).join(""),t._carouselDelegated||(t._carouselDelegated=!0,t.addEventListener("click",rt));const a=t.closest(".selecao-carousel-wrap");(i=a==null?void 0:a.querySelector(".selecao-prev"))==null||i.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(d=a==null?void 0:a.querySelector(".selecao-next"))==null||d.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),re()};function rt(e){var r;const t=e.target.closest(".carousel-btn");if(!t)return;e.preventDefault(),e.stopPropagation();const n=t.closest(".icard-img-wrap");if(!n)return;const a=parseInt(n.dataset.total,10);if(!a||a<2)return;let o=parseInt(n.dataset.idx,10)||0;const i=t.classList.contains("carousel-next")?1:-1;o=(o+i+a)%a,n.dataset.idx=o;try{const s=JSON.parse(decodeURIComponent(n.dataset.images||"[]"));if(s.length&&s[o]){const c=s[o],l=n.querySelector(".carousel-img"),m=n.querySelector(".carousel-img-bg");l&&(l.src=c),m&&(m.src=c)}}catch{const c=_.find(m=>String(m.id)===String(n.dataset.pid)),l=(r=c==null?void 0:c.images)!=null&&r.length?c.images:we;if(l[o]){const m=n.querySelector(".carousel-img"),p=n.querySelector(".carousel-img-bg");m&&(m.src=l[o]),p&&(p.src=l[o])}}const d=n.querySelectorAll(".icard-dot");if(d.length){const s=o%d.length;d.forEach((c,l)=>c.classList.toggle("active",l===s))}}function va(){var a;const e=((a=document.getElementById("price-range"))==null?void 0:a.value)||"";if(!e)return{min:0,max:1/0};const[t,n]=e.split("-");return{min:parseInt(t,10)||0,max:n?parseInt(n,10):1/0}}function fa(){const e=document.getElementById("price-range");e&&e.addEventListener("change",()=>re())}function ya(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=ue();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${v(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=ue().find(i=>i.name===e.value),o=a?pt(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(i=>`<option value="${i.name}">${v(i.name)}</option>`).join(""),re()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",re)})}function Te(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var d;const a=n.cover_image||((d=n.images)==null?void 0:d[0])||we[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",i=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${v(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${v(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+v(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${v(o)}</td>
      <td class="cell-price">${v(Ae(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${i}</td>
      <td>
        <div class="action-btns">
          ${(f==null?void 0:f.role)==="admin"||(f==null?void 0:f.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(f==null?void 0:f.role)==="admin"||(f==null?void 0:f.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function ba(){const e=document.getElementById("f-city");if(!e)return;const t=ue(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${v(a.name)}</option>`).join(""),n&&(e.value=n)}function ha(){var e,t,n,a,o,i,d,r,s,c,l,m,p,b,x;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((i=document.getElementById("f-condominium"))==null?void 0:i.value)||"").trim().toLowerCase(),priceMin:parseFloat((d=document.getElementById("f-price-min"))==null?void 0:d.value)||0,priceMax:parseFloat((r=document.getElementById("f-price-max"))==null?void 0:r.value)||1/0,areaMin:parseFloat((s=document.getElementById("f-area-min"))==null?void 0:s.value)||0,areaMax:parseFloat((c=document.getElementById("f-area-max"))==null?void 0:c.value)||1/0,construction:((l=document.getElementById("f-construction"))==null?void 0:l.value)||"",published:((m=document.getElementById("f-published"))==null?void 0:m.value)||"",bedrooms:((p=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:p.dataset.val)||"",suites:((b=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:b.dataset.val)||"",parking:((x=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:x.dataset.val)||""}}function ct(e){const t=ha();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const i=parseFloat(a.area)||0;return!(t.areaMin>0&&i<t.areaMin||t.areaMax<1/0&&i>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Oe(){if(!document.getElementById("admin-properties"))return;const e=await Nt(),t=e.length,n=e.filter(d=>d.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),i=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),i&&(i.textContent="—"),ba(),Te(_)}let R=null,le="";function Ze(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Re(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function Ue(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===le?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{le=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function Ke(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{var s;n.preventDefault();const a=new FormData(e),o=a.getAll("images");let i=[];const d=o.filter(c=>c.size>0);if(d.length){t.disabled=!0,t.textContent=`Enviando 0/${d.length} foto…`;try{i=await pa(d,(c,l)=>{t.textContent=`Enviando ${c}/${l} foto…`})}catch(c){console.error("Erro no upload:",c),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(R){const c=_.find(l=>l.id===R);c!=null&&c.images&&(i=c.images)}i.length||(i=[...we]);const r={...R?{id:R}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:i,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:le||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",furnished:a.get("furnished")==="true",collection:JSON.stringify(["col_frente_mar","col_decorados","col_casas","col_alto_padrao","col_lancamentos"].filter(c=>a.get(c)).map(c=>a.get(c))),tenant_id:R?((s=_.find(c=>c.id===R))==null?void 0:s.tenant_id)??(f==null?void 0:f.tenant_id)??null:(f==null?void 0:f.tenant_id)??null};try{await la(r),R=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const c=document.getElementById("adminPublished");c&&(c.value="true");const l=document.getElementById("adminNeighborhood");l&&(l.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),le="",Ue([]),Re(),await Oe()}catch(c){console.error(c),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((c==null?void 0:c.message)||JSON.stringify(c)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await ra(o),await Oe()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((f==null?void 0:f.role)!=="admin"&&(f==null?void 0:f.role)!=="super_admin")return;const o=Number(n.target.dataset.id);if(!o)return;const i=_.find(c=>c.id===o);if(!i)return;R=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=i.title||"",e.querySelector('[name="rua"]').value=i.rua||"",e.querySelector('[name="numero"]').value=i.numero||"",e.querySelector('[name="city"]').value=i.city||"",e.querySelector('[name="price"]').value=i.price||"",e.querySelector('[name="bedrooms"]').value=i.bedrooms||"",e.querySelector('[name="suites"]').value=i.suites||"",e.querySelector('[name="area"]').value=i.area||"",e.querySelector('[name="parking"]').value=i.parking||"",e.querySelector('[name="description"]').value=i.description||"",e.querySelector('[name="construction_status"]').value=i.construction_status||"",e.querySelector('[name="owner_name"]').value=i.owner_name||"",e.querySelector('[name="owner_phone"]').value=i.owner_phone||"",e.querySelector('[name="owner_email"]').value=i.owner_email||"",e.querySelector('[name="owner_notes"]').value=i.owner_notes||"",e.querySelector('[name="condominium"]').value=i.condominium||"";const d=e.querySelector('[name="furnished"]');d&&(d.checked=i.furnished===!0);try{const c=JSON.parse(i.collection||"[]");["col_frente_mar","col_decorados","col_casas","col_alto_padrao","col_lancamentos"].forEach(l=>{const m=e.querySelector('[name="'+l+'"]');m&&(m.checked=c.includes(m.value))})}catch{}const r=document.getElementById("adminPublished");r&&(r.value=i.published===!0?"true":"false");const s=document.getElementById("adminCitySelect");s&&(s.value=i.city||"",s.dispatchEvent(new Event("change")),setTimeout(()=>{const c=document.getElementById("adminNeighborhood");c&&(c.value=i.neighborhood||"")},50)),le=i.cover_image||((a=i.images)==null?void 0:a[0])||"",Ue(i.images||[]),Ze("Editar Imóvel")}})}function v(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function xa(e,t,n,a,o){const i=[];return e&&i.push(e),n&&i.push(n),a&&i.push(a+(" - "+o)),i.join(", ")}function mt(e){var x;const t=(x=e.images)!=null&&x.length?e.images:we,n=t.length,a=e.cover_image||t[0],o=xa(e.rua,e.numero,e.neighborhood,e.city,"SC"),i=Ae(e.price,window.currentLang||"pt"),d=`https://omarcorretor.com.br/og/${e.id}`,r=encodeURIComponent(`Olá! Tenho interesse no imóvel *${e.title}*${e.reference?` (Ref: ${e.reference})`:""}. Poderia me dar mais informações?
${d}`),s=e.area?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>${e.area}m²</span>`:"",c=e.bedrooms?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20v-6a2 2 0 012-2h16a2 2 0 012 2v6"/><path d="M2 14V8a2 2 0 012-2h4l2 3h8a2 2 0 012 2v3"/></svg>${e.bedrooms} quarto${e.bedrooms!=1?"s":""}</span>`:"",l=e.bathrooms?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 000-2.12L6 1.5a1.5 1.5 0 00-2.12 0L2 3.38a1.5 1.5 0 000 2.12L5.5 9"/><path d="M2 20h20M20 12H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2z"/></svg>${e.bathrooms} banheiro${e.bathrooms!=1?"s":""}</span>`:"",m=e.parking?`<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>${e.parking} vaga${e.parking!=1?"s":""}</span>`:"",p=Math.max(1,Math.min(n,6)),b=`<div class="icard-dots">${Array.from({length:p},(u,y)=>`<span class="icard-dot${y===0?" active":""}"></span>`).join("")}</div>`;return`
    <div class="imovel-card" data-pid="${e.id}">
      <div class="icard-img-wrap" data-total="${n}" data-idx="0" data-pid="${e.id}" data-images="${encodeURIComponent(JSON.stringify(t))}">
        <img src="${v(a)}" alt="" class="icard-img-bg carousel-img-bg" aria-hidden="true">
        <a href="property.html?id=${e.id}" class="icard-img-link">
          <img src="${v(a)}" alt="${v(e.title)}" class="icard-img carousel-img">
        </a>
        ${n>1?`
          <button type="button" class="carousel-btn carousel-prev icard-prev" aria-label="Anterior">&#8249;</button>
          <button type="button" class="carousel-btn carousel-next icard-next" aria-label="Próximo">&#8250;</button>
        `:""}
        ${b}
      </div>
      <div class="icard-body">
        ${e.furnished===!0?'<span class="icard-badge">🛋️ Mobiliado</span>':""}
        <div class="icard-neighborhood">${v(e.neighborhood||e.title)}</div>
        <div class="icard-address">${v(o)}</div>
        ${s||c||l||m?`<div class="icard-specs">${s}${c}${l}${m}</div>`:""}
        <div class="icard-price-row">
          <div>
            <div class="icard-price-label">Comprar</div>
            <div class="icard-price">${v(i)}</div>
          </div>
        </div>
        <div class="icard-footer">
          <span class="icard-code">Cód. ${v(String(e.reference||e.id))}</span>
          <a href="https://wa.me/${_e}?text=${r}" target="_blank" rel="noopener" class="icard-wa" title="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 24l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          </a>
          <a href="property.html?id=${e.id}" class="icard-heart" title="Ver detalhes">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `}let ne=[],K=0;function Ea(e){var m,p;const t=document.getElementById("view-modal-edit");t&&(t.dataset.pid=e.id),document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const n=document.getElementById("view-status-badge");e.published?(n.textContent="● Publicado",n.className="badge badge-green"):(n.textContent="○ Rascunho",n.className="badge badge-gray");const a=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=a.length?`📍 ${a.join(", ")}`:"";const o=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.join(" "))}`;document.getElementById("view-map-link").href=o,document.getElementById("view-directions-link").href=o;const i=((m=e.images)==null?void 0:m[0])||we[0];document.getElementById("view-thumb-preview").src=i,ne=(p=e.images)!=null&&p.length?e.images:we,K=0,Pe(),document.getElementById("view-price").textContent=Ae(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const d=document.getElementById("view-condominium-item"),r=document.getElementById("view-condominium");r&&(r.textContent=e.condominium||""),d&&(d.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(b=>b.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(b=>b.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const s="https://omarcorretor.com.br/og/"+e.id,c=document.getElementById("share-link-input");c&&(c.value=s);const l=document.getElementById("share-panel");l&&(l.style.display="none",l.dataset.pid=e.id),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ze(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Pe(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=ne[K],e.alt=`Foto ${K+1}`;const i=ne.length>1;n.style.display=i?"flex":"none",a.style.display=i?"flex":"none",t.textContent=i?`${K+1} / ${ne.length}`:"",o.innerHTML=i?ne.map((d,r)=>`<img src="${d}" class="view-thumb${r===K?" active":""}" data-i="${r}" alt="Foto ${r+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(d=>{d.addEventListener("click",()=>{K=+d.dataset.i,Pe()})})}async function ht(e){const{data:t}=await h.from("profiles").select("*").eq("id",e).maybeSingle();return t}function Fe(e){var m,p;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const i=(e==null?void 0:e.name)||"Sem nome",d=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=i,o&&(o.textContent=d),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((m=i[0])==null?void 0:m.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const r=document.getElementById("avatar-dd-name"),s=document.getElementById("avatar-dd-role"),c=document.getElementById("avatar-dd-img"),l=document.getElementById("avatar-dd-initial");r&&(r.textContent=i),s&&(s.textContent=d),e!=null&&e.avatar_url&&c?(c.src=e.avatar_url,c.style.display="",l&&(l.style.display="none")):(l&&(l.textContent=((p=i[0])==null?void 0:p.toUpperCase())||"?",l.style.display=""),c&&(c.style.display="none"))}async function xt(e){const t=document.getElementById("avatar-dd-ver-site");if(!t)return;const n=(e==null?void 0:e.tenant_id)||M(),a=n&&n!==F,o=window.location.origin,i=a?`${o}/demo.html?key=${n}`:`${o}/index.html`;if(t.href=i,!!a)try{const{data:d}=await h.from("tenants").select("domain").eq("id",n).maybeSingle(),r=window.location.hostname.replace(/^www\./,""),s=((d==null?void 0:d.domain)||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim();s&&s!==r&&(t.href=`https://${s}`)}catch{}}const Ne={dashboard:()=>an(),empresa:()=>Vt(),visual:()=>Gt(),"site-config":()=>Wt(),"crm-config":()=>Jt(),integracoes:()=>Yt(),midia:()=>Kt(),depoimentos:()=>Xt()};function te(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);if(t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),typeof Ne<"u"&&Ne[e]){const o=Ne[e];Ne[e]=null,setTimeout(o,0)}(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),Z(),e==="contatos"&&Aa(),e==="funil"&&$a(),e==="tarefas"&&Sa()}function Et(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:Vt,visual:Gt,"site-config":Wt,"crm-config":Jt,integracoes:Yt,midia:Kt,depoimentos:Xt}).forEach(([a,o])=>{const i=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);i&&i.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>Oa(),{once:!0}),window.lucide&&lucide.createIcons()}}function Z(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function wa(){var a,o,i;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
    <div class="modal" style="max-width:400px;">
      <div class="modal-header">
        <h3>Alterar Senha</h3>
        <button class="modal-close" id="cp-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
          <label class="form-label">Nova senha</label>
          <input id="cp-new" type="password" class="form-control" placeholder="Mínimo 6 caracteres">
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",d=>{d.target===t&&n()}),(i=document.getElementById("cp-save"))==null||i.addEventListener("click",async()=>{var m,p;const d=((m=document.getElementById("cp-new"))==null?void 0:m.value)||"",r=((p=document.getElementById("cp-confirm"))==null?void 0:p.value)||"",s=document.getElementById("cp-msg"),c=document.getElementById("cp-save");if(s.style.display="none",d.length<6){s.style.color="#ef4444",s.textContent="Mínimo 6 caracteres.",s.style.display="";return}if(d!==r){s.style.color="#ef4444",s.textContent="As senhas não coincidem.",s.style.display="";return}c.disabled=!0,c.textContent="Salvando…";const{error:l}=await h.auth.updateUser({password:d});if(c.disabled=!1,c.textContent="Salvar Senha",l){s.style.color="#ef4444",s.textContent="Erro: "+l.message,s.style.display="";return}s.style.color="#16a34a",s.textContent="✅ Senha alterada com sucesso!",s.style.display="",setTimeout(n,1500)})}function Ia(){var i,d,r,s,c;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((i=document.getElementById("topnav-avatar-img"))==null?void 0:i.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
    <div class="modal" style="max-width:380px;">
      <div class="modal-header">
        <h3>Alterar Foto</h3>
        <button class="modal-close" id="cph-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;border:3px solid #e2e8f0;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
          <img id="cph-preview" src="${a?n:""}" alt="" style="width:100%;height:100%;object-fit:cover;display:${a?"":"none"};">
          <span id="cph-initial" style="font-size:32px;font-weight:700;color:#64748b;display:${a?"none":""};">${((f==null?void 0:f.name)||"?")[0].toUpperCase()}</span>
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(d=document.getElementById("cph-close"))==null||d.addEventListener("click",o),(r=document.getElementById("cph-cancel"))==null||r.addEventListener("click",o),t.addEventListener("click",l=>{l.target===t&&o()}),(s=document.getElementById("cph-file"))==null||s.addEventListener("change",l=>{const m=l.target.files[0];if(!m)return;const p=URL.createObjectURL(m),b=document.getElementById("cph-preview"),x=document.getElementById("cph-initial");b&&(b.src=p,b.style.display=""),x&&(x.style.display="none"),document.getElementById("cph-save").disabled=!1}),(c=document.getElementById("cph-save"))==null||c.addEventListener("click",async()=>{var b;const l=(b=document.getElementById("cph-file"))==null?void 0:b.files[0];if(!l)return;const m=document.getElementById("cph-save"),p=document.getElementById("cph-msg");m.disabled=!0,m.textContent="Salvando…";try{const x=await Me(l,400,.85),u=`avatars/${f.id}-${Date.now()}.jpg`,{error:y}=await h.storage.from("imoveis").upload(u,x,{contentType:"image/jpeg",upsert:!0});if(y)throw y;const{data:{publicUrl:g}}=h.storage.from("imoveis").getPublicUrl(u);await h.from("profiles").update({avatar_url:g}).eq("id",f.id),f={...f,avatar_url:g},Fe(f),o()}catch(x){p.style.color="#ef4444",p.textContent="Erro: "+x.message,p.style.display="",m.disabled=!1,m.textContent="Salvar Foto"}})}function et(e,t){var i,d,r;const n=document.getElementById("add-corretor-modal-root");n&&n.remove();const a=document.createElement("div");a.id="add-corretor-modal-root",a.className="modal-backdrop",a.innerHTML=`
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
          <input id="ac-password" type="text" class="form-control" placeholder="Mínimo 6 caracteres">
        </div>
        <p id="ac-note" style="display:none;font-size:13px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:0;line-height:1.6;"></p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="ac-cancel">Cancelar</button>
        <button class="btn-primary" id="ac-save" style="margin:0;">+ Criar Acesso</button>
      </div>
    </div>`,document.body.appendChild(a);const o=()=>a.remove();(i=document.getElementById("ac-close"))==null||i.addEventListener("click",o),(d=document.getElementById("ac-cancel"))==null||d.addEventListener("click",o),a.addEventListener("click",s=>{s.target===a&&o()}),(r=document.getElementById("ac-save"))==null||r.addEventListener("click",async()=>{var p,b,x;const s=(p=document.getElementById("ac-email"))==null?void 0:p.value.trim(),c=(b=document.getElementById("ac-password"))==null?void 0:b.value.trim(),l=document.getElementById("ac-save"),m=document.getElementById("ac-note");if(!s){alert("Informe o e-mail do corretor.");return}if(!c||c.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}l.disabled=!0,l.textContent="Criando…",m.style.display="none";try{const u=e||(f==null?void 0:f.tenant_id)||null,y=((x=document.getElementById("ac-role"))==null?void 0:x.value)||"corretor",g=await pe({email:s,password:c,role:y,tenant_id:u});l.disabled=!1,l.textContent="+ Criar Acesso",g.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",g.email_sent===!1?(m.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${v(s)}<br><strong>Senha:</strong> ${v(c)}`,m.style.color="#0f172a"):(m.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",m.style.color="#16a34a"),m.style.display="",typeof t=="function"&&setTimeout(t,1500)):alert("Erro: "+(g.error||"Falha desconhecida"))}catch(u){l.disabled=!1,l.textContent="+ Criar Acesso",alert("Erro: "+u.message)}})}function wt(){var i,d,r,s,c,l,m,p,b,x,u;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",y=>{var E;y.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(E=document.getElementById("notif-dropdown"))==null||E.classList.add("hidden")}),(i=document.getElementById("avatar-dd-change-photo"))==null||i.addEventListener("click",y=>{y.stopPropagation(),Z(),Ia()}),(d=document.getElementById("avatar-dd-change-pass"))==null||d.addEventListener("click",y=>{y.stopPropagation(),Z(),wa()}),(r=document.getElementById("avatar-dd-add-corretor"))==null||r.addEventListener("click",y=>{y.stopPropagation(),Z(),et()}),(s=document.getElementById("avatar-dd-settings"))==null||s.addEventListener("click",y=>{y.stopPropagation(),Z(),te("settings")}),(c=document.getElementById("avatar-dd-logout"))==null||c.addEventListener("click",async y=>{y.stopPropagation(),await h.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",y=>{var E;y.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((E=document.getElementById("avatar-dropdown"))==null||E.classList.add("hidden"),_a())}),(l=document.getElementById("notif-mark-all"))==null||l.addEventListener("click",()=>{Ca(),Z()}),(m=document.getElementById("btn-search-open"))==null||m.addEventListener("click",()=>{var y,g;(y=document.getElementById("search-overlay"))==null||y.classList.remove("hidden"),(g=document.getElementById("search-input"))==null||g.focus()}),(p=document.getElementById("search-overlay-close"))==null||p.addEventListener("click",()=>{var y;(y=document.getElementById("search-overlay"))==null||y.classList.add("hidden")}),(b=document.getElementById("search-overlay"))==null||b.addEventListener("click",y=>{y.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(x=document.getElementById("search-input"))==null||x.addEventListener("input",y=>{clearTimeout(o),o=setTimeout(()=>Ba(y.target.value.trim()),280)}),(u=document.getElementById("search-input"))==null||u.addEventListener("keydown",y=>{var g;y.key==="Escape"&&((g=document.getElementById("search-overlay"))==null||g.classList.add("hidden"))}),document.addEventListener("click",Z)}let tt=!1,W=[],Xe=[],Ve=[],ce={},Rt=[],Q=null,Le=null,G={search:"",tags:new Set,status:""};async function $a(){var t;if(tt){await It();return}tt=!0,await It(),(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>nt()),Wa();const e=document.getElementById("funil-pipe-sel");e==null||e.addEventListener("change",async()=>{Q=parseInt(e.value,10),await Ge()})}function at(e){var i;const t=document.getElementById("kanban-filters");if(!t)return;t.style.display="block";const n=document.getElementById("kf-status");n&&(n.innerHTML='<option value="">Todos os status</option>'+Rt.map(d=>`<option value="${v(d.name)}">${v(d.name)}</option>`).join(""),n.value=G.status,n.onchange=()=>{G.status=n.value,ye()});const a=document.getElementById("kf-tags");if(a){if(!e.length){a.style.display="none";return}a.style.display="flex",a.innerHTML='<span class="kf-tags-label">Tags:</span>'+e.map(d=>`<button class="kf-tag-btn${G.tags.has(d.name)?" active":""}" data-tag="${v(d.name)}"
          style="--kf-tc:${d.color}">
          ${v(d.name)}
        </button>`).join(""),a.querySelectorAll(".kf-tag-btn").forEach(d=>{d.addEventListener("click",()=>{const r=d.dataset.tag;G.tags.has(r)?G.tags.delete(r):G.tags.add(r),at(e),ye()})})}const o=document.getElementById("kf-search");o&&(o.value=G.search,o.oninput=()=>{G.search=o.value.toLowerCase(),ye()}),(i=document.getElementById("kf-clear"))==null||i.addEventListener("click",()=>{G={search:"",tags:new Set,status:""},at(e),ye()})}async function It(){const e=M(),[{data:t},{data:n},{data:a}]=await Promise.all([h.from("crm_pipelines").select("*").eq("tenant_id",e).order("sort_order"),h.from("crm_tags").select("*").eq("tenant_id",e).order("name"),h.from("crm_lead_statuses").select("*").eq("tenant_id",e).order("sort_order")]);W=t||[],Rt=a||[],ce={},(n||[]).forEach(r=>{ce[r.name]=r});const o=W.map(r=>r.id),{data:i}=o.length?await h.from("crm_stages").select("*").in("pipeline_id",o).order("sort_order"):{data:[]};Xe=i||[],at(n||[]);const d=document.getElementById("funil-pipe-sel");if(d){const r=Q;d.innerHTML=W.length?W.map(c=>`<option value="${c.id}">${v(c.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const s=W.find(c=>c.id===r)||W.find(c=>c.is_default)||W[0];s?(d.value=s.id,Q=s.id):Q=null}await Ge()}async function Ge(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=h.from("leads").select("*").order("created_at",{ascending:!1});(f==null?void 0:f.role)==="corretor"?t=t.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id)),Q&&(t=t.eq("pipeline_id",Q));const{data:n}=await t;Ve=n||[],ye()}function ye(){const e=document.getElementById("kanban-board");if(!e)return;const t=Xe.filter(i=>i.pipeline_id===Q);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n=G,a=Ve.filter(i=>{if(n.search&&!`${i.name||""} ${i.phone||""} ${i.email||""}`.toLowerCase().includes(n.search)||n.status&&i.status!==n.status)return!1;if(n.tags.size>0){const d=Array.isArray(i.tags)?i.tags:[];if(![...n.tags].every(r=>d.includes(r)))return!1}return!0}),o={};t.forEach(i=>{o[i.name]=[]}),a.forEach(i=>{var r,s,c,l;const d=i.stage||((r=t[0])==null?void 0:r.name);o[d]||(o[((s=t[0])==null?void 0:s.name)||""]=[]),(l=o[d]||o[(c=t[0])==null?void 0:c.name])==null||l.push(i)}),e.innerHTML=t.map(i=>{const d=o[i.name]||[],r=d.length?d.map(s=>{const c=(s.phone||"").replace(/\D/g,""),l=encodeURIComponent(`Olá ${s.name}! Aqui é da ${J("company.name","nossa imobiliária")}. Vi seu interesse e gostaria de ajudar. Posso falar agora?`);return`
        <div class="kanban-card" draggable="true" data-id="${s.id}" data-stage="${v(i.name)}" style="cursor:pointer;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;">
            <div class="kanban-card-name" style="flex:1;">${v(s.name||"—")}</div>
            ${c?`<a href="https://wa.me/${c}?text=${l}" target="_blank" rel="noopener"
              onclick="event.stopPropagation()"
              style="flex-shrink:0;width:28px;height:28px;background:#25d366;border-radius:6px;display:flex;align-items:center;justify-content:center;text-decoration:none;"
              title="Abrir WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>`:""}
          </div>
          ${s.phone?`<div class="kanban-card-info">📞 ${v(s.phone)}</div>`:""}
          ${s.email?`<div class="kanban-card-info" style="font-size:11px;color:#94a3b8;">✉ ${v(s.email)}</div>`:""}
          ${s.notes?`<div class="kanban-card-info" style="font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">📝 ${v(s.notes)}</div>`:""}
          <div class="kanban-card-tags" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">
            ${s.source?`<span class="kanban-card-tag">${v(s.source)}</span>`:""}
            ${Array.isArray(s.tags)?s.tags.map(m=>{const p=ce[m],b=(p==null?void 0:p.color)||"#0369a1";return`<span class="kanban-card-tag" style="background:${b}18;color:${b};border:1px solid ${b}44;">${v(m)}</span>`}).join(""):""}
          </div>
        </div>`}).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${v(i.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${i.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${i.color||"#2563eb"}"></div>
            ${v(i.name)}
          </div>
          <span class="kanban-col-count">${d.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${v(i.name)}">${r}</div>
        <button class="kanban-add-btn" data-stage="${v(i.name)}">+ Adicionar lead</button>
      </div>`}).join(""),ka(),window.lucide&&lucide.createIcons()}function ka(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>nt())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=Ve.find(a=>String(a.id)===String(t.dataset.id));n&&nt(n)}),t.addEventListener("dragstart",n=>{Le=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!Le||!a)return;await h.from("leads").update({stage:a}).eq("id",Le);const o=Ve.find(i=>String(i.id)===String(Le));o&&(o.stage=a),Le=null,ye()})}))}async function nt(e=null){var x,u,y;(x=document.getElementById("lead-detail-panel"))==null||x.remove();const t=!e,n=M(),{data:a}=await h.from("crm_tags").select("*").eq("tenant_id",n).order("name"),{data:o}=await h.from("crm_lead_statuses").select("*").eq("tenant_id",n).order("sort_order"),i=e!=null&&e.pipeline_id&&((u=W.find(g=>g.id===e.pipeline_id))==null?void 0:u.id)||Q;function d(g){return Xe.filter(E=>E.pipeline_id===g).map(E=>`<option value="${v(E.name)}" ${(e==null?void 0:e.stage)===E.name?"selected":""}>${v(E.name)}</option>`).join("")}const r=W.map(g=>`<option value="${g.id}" ${g.id===i?"selected":""}>${v(g.name)}</option>`).join(""),s=d(i),c=((e==null?void 0:e.phone)||"").replace(/\D/g,""),l=document.createElement("div");l.id="lead-detail-panel",l.style.cssText="position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:#fff;box-shadow:-4px 0 32px rgba(0,0,0,.15);z-index:1000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;",l.innerHTML=`
    <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0;">${t?"+ Novo Lead":"✏️ Editar Lead"}</h3>
      <button id="ldp-close" style="background:none;border:none;cursor:pointer;font-size:22px;color:#94a3b8;line-height:1;">✕</button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:20px 24px;display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">NOME *</label>
        <input id="ldp-name" class="form-input" type="text" value="${v((e==null?void 0:e.name)||"")}" placeholder="Nome do cliente">
      </div>
      <div style="display:flex;gap:10px;">
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">TELEFONE</label>
          <input id="ldp-phone" class="form-input" type="tel" value="${v((e==null?void 0:e.phone)||"")}" placeholder="(00) 00000-0000">
        </div>
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">E-MAIL</label>
          <input id="ldp-email" class="form-input" type="email" value="${v((e==null?void 0:e.email)||"")}" placeholder="email@...">
        </div>
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ORIGEM</label>
        <input id="ldp-source" class="form-input" type="text" value="${v((e==null?void 0:e.source)||"")}" placeholder="site, indicação, instagram…">
      </div>
      ${W.length>1?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">FUNIL</label>
        <select id="ldp-pipe" class="form-input">${r}</select>
      </div>`:""}
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ETAPA DO FUNIL</label>
        <select id="ldp-stage" class="form-input">${s}</select>
      </div>
      ${o!=null&&o.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">STATUS</label>
        <select id="ldp-status" class="form-input">
          <option value="">— Sem status —</option>
          ${o.map(g=>`<option value="${g.name}" ${(e==null?void 0:e.status)===g.name?"selected":""}>${v(g.name)}</option>`).join("")}
        </select>
      </div>`:""}
      <div id="ldp-tags-wrap" class="ldp-tags-section">
        <label class="ldp-field-label">TAGS</label>
        <div class="ldp-tag-badge-area" id="ldp-tag-badge-area">
          ${((e==null?void 0:e.tags)||[]).map(g=>{const I=(ce[g]||{}).color||"#6366F1";return`<span class="ldp-tag-badge" data-tag="${v(g)}" style="background:${I}18;color:${I};border-color:${I}55;">${v(g)}<span class="ldp-tag-rm" data-tag="${v(g)}">×</span></span>`}).join("")||'<span class="ldp-tag-empty">Nenhuma tag — clique em + para adicionar</span>'}
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
        <textarea id="ldp-notes" class="form-input" rows="4" placeholder="Observações, interesses, próximos passos…" style="resize:vertical;">${v((e==null?void 0:e.notes)||"")}</textarea>
      </div>
      ${c?(()=>{const g=encodeURIComponent(`Olá ${e!=null&&e.name?e.name.split(" ")[0]:""}! Aqui é da ${J("company.name","nossa imobiliária")}. Vi seu interesse em imóveis e gostaria de ajudá-lo. Posso falar agora?`);return`<a href="https://wa.me/${c}?text=${g}" target="_blank" rel="noopener"
          style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25d366;color:#fff;text-decoration:none;border-radius:8px;padding:10px;font-size:13px;font-weight:700;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          Iniciar conversa no WhatsApp
        </a>`})():""}
      <div id="ldp-msg" style="font-size:13px;min-height:18px;"></div>
    </div>
    <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;flex-shrink:0;">
      ${t?"":'<button id="ldp-delete" style="background:#fee2e2;color:#dc2626;border:none;border-radius:8px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;">🗑️ Excluir</button>'}
      <button id="ldp-save" style="flex:1;background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 16px;font-size:14px;font-weight:700;cursor:pointer;">💾 Salvar</button>
    </div>
  `,document.body.appendChild(l),requestAnimationFrame(()=>{l.style.transform="translateX(0)"}),tn(l,a||[],ce);const m=l.querySelector("#ldp-pipe"),p=l.querySelector("#ldp-stage");m&&p&&m.addEventListener("change",()=>{const g=m.value,E=Xe.filter(I=>I.pipeline_id===g);p.innerHTML=E.map(I=>`<option value="${I.name}">${I.name}</option>`).join("")||'<option value="">— sem etapas —</option>'});const b=()=>{l.style.transform="translateX(100%)",setTimeout(()=>l.remove(),250)};document.getElementById("ldp-close").addEventListener("click",b),document.getElementById("ldp-save").addEventListener("click",async()=>{var B,q;const g=document.getElementById("ldp-save"),E=document.getElementById("ldp-msg"),I=document.getElementById("ldp-name").value.trim();if(!I){E.style.color="#ef4444",E.textContent="Nome é obrigatório.";return}g.disabled=!0,g.textContent="Salvando…";const S=[...l.querySelectorAll("#ldp-tag-badge-area .ldp-tag-badge[data-tag]")].map(C=>C.dataset.tag),L=document.getElementById("ldp-pipe"),k=L?L.value:i||Q,w={name:I,phone:document.getElementById("ldp-phone").value.trim()||null,email:document.getElementById("ldp-email").value.trim()||null,source:document.getElementById("ldp-source").value.trim()||null,pipeline_id:k||null,stage:((B=document.getElementById("ldp-stage"))==null?void 0:B.value)||null,status:((q=document.getElementById("ldp-status"))==null?void 0:q.value)||null,notes:document.getElementById("ldp-notes").value.trim()||null,tags:S,tenant_id:M()};let $;if(t?{error:$}=await h.from("leads").insert(w):{error:$}=await h.from("leads").update(w).eq("id",e.id),g.disabled=!1,g.textContent="💾 Salvar",$){E.style.color="#ef4444",E.textContent="Erro: "+$.message;return}E.style.color="#22c55e",E.textContent="✅ Salvo!",setTimeout(()=>{b(),Ge()},700)}),(y=document.getElementById("ldp-delete"))==null||y.addEventListener("click",async()=>{confirm(`Excluir o lead "${e==null?void 0:e.name}"?`)&&(await h.from("leads").delete().eq("id",e.id),b(),Ge())})}let D=[],$t=!1,be="pending";async function Sa(){var e;$t||($t=!0,await La(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>Ot()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),be=t.dataset.filter,Ie()})}))}async function La(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=h.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(f==null?void 0:f.role)==="corretor"?t=t.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}D=n||[],Ie()}function Ht(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function Ie(){const e=document.getElementById("tarefas-list");if(!e)return;let t=D;if(be==="pending"&&(t=D.filter(a=>a.status!=="done")),be==="done"&&(t=D.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${be==="done"?"✅":"📋"}</div>
      <p>${be==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=Ht(a.due_date),i=o?o.toLocaleDateString("pt-BR"):"",d=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${v(a.title)}</div>
          <div class="tarefa-meta">
            ${i?`<span style="${d?"color:#ef4444;":""}">📅 ${i}${d?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${v(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const i=a.dataset.id,d=a.checked?"done":"pending";await h.from("tasks").update({status:d}).eq("id",i);const r=D.find(s=>String(s.id)===i);r&&(r.status=d),Ie()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await h.from("tasks").delete().eq("id",a.dataset.id),D=D.filter(i=>String(i.id)!==String(a.dataset.id)),Ie())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const i=a.dataset.id,d=D.find(r=>String(r.id)===i);d&&Ot(d)})})}function Ot(e=null){var s,c,l,m;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=Ht(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const i=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",d=document.createElement("div");d.id="tarefa-modal-root",d.className="modal-backdrop",d.innerHTML=`
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
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${v((e==null?void 0:e.title)||"")}">
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
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${v((e==null?void 0:e.description)||"")}</textarea>
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
  `,document.body.appendChild(d);const r=()=>d.remove();(s=document.getElementById("tm-close"))==null||s.addEventListener("click",r),(c=document.getElementById("tm-cancel"))==null||c.addEventListener("click",r),d.addEventListener("click",p=>{p.target===d&&r()}),(l=document.getElementById("tm-toggle-done"))==null||l.addEventListener("click",async()=>{const p=a?"pending":"done";await h.from("tasks").update({status:p}).eq("id",e.id);const b=D.find(x=>String(x.id)===String(e.id));b&&(b.status=p),r(),p==="done"&&(be="done",document.querySelectorAll(".tarefa-filter-btn").forEach(x=>{x.classList.toggle("active",x.dataset.filter==="done")})),Ie()}),(m=document.getElementById("tm-save"))==null||m.addEventListener("click",async()=>{var g,E;const p=document.getElementById("tarefa-form");if(!p.checkValidity()){p.reportValidity();return}const b=new FormData(p),x=document.getElementById("tm-save");x.disabled=!0,x.textContent="Salvando…";const u={title:(g=b.get("title"))==null?void 0:g.trim(),description:((E=b.get("description"))==null?void 0:E.trim())||null,due_date:b.get("due_date")||null,priority:b.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(f==null?void 0:f.id)||null,tenant_id:(f==null?void 0:f.tenant_id)||null};let y;if(n){if({error:y}=await h.from("tasks").update(u).eq("id",e.id),!y){const I=D.findIndex(S=>String(S.id)===String(e.id));I>=0&&(D[I]={...D[I],...u})}}else{const{data:I,error:S}=await h.from("tasks").insert(u).select();y=S,!y&&(I!=null&&I[0])&&D.unshift(I[0])}if(x.disabled=!1,x.textContent=n?"Salvar":"Criar Tarefa",y){alert("Erro: "+y.message);return}r(),Ie()})}async function Ba(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;f==null||f.role,f==null||f.tenant_id;const[{data:a},{data:o}]=await Promise.all([h.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),h.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),i=[];a!=null&&a.length&&(i.push('<div class="search-group-label">Imóveis</div>'),i.push(...a.map(d=>`
      <div class="search-result-item" data-type="property" data-id="${d.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${v(d.title||"—")}</div>
          <div class="search-result-sub">${v(d.reference||"")} · ${v(d.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(i.push('<div class="search-group-label">Leads / Contatos</div>'),i.push(...o.map(d=>`
      <div class="search-result-item" data-type="lead" data-id="${d.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${v(d.name||"—")}</div>
          <div class="search-result-sub">${v(d.email||d.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=i.length?i.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(d=>{d.addEventListener("click",()=>{var r;(r=document.getElementById("search-overlay"))==null||r.classList.add("hidden"),d.dataset.type==="lead"?te("contatos"):te("properties")})})}let ee=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function _a(){var d;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=h.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(r=>!ee.includes(String(r.id))),i=document.getElementById("notif-badge");if(i&&(i.textContent=o.length,o.length>0?i.classList.remove("hidden"):i.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(r=>{const s=qa(r.created_at);return`
      <div class="notif-item${!ee.includes(String(r.id))?" unread":""}" data-id="${r.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${v(r.name||"—")}</div>
          <div class="notif-item-sub">${v(r.phone||r.source||"")} · ${s}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(d=document.getElementById("notif-see-all"))==null||d.addEventListener("click",r=>{r.preventDefault(),Z(),te("contatos")}),e.querySelectorAll(".notif-item").forEach(r=>{r.addEventListener("click",()=>{ee.push(r.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(ee)),r.classList.remove("unread"),Z(),te("contatos")})})}function Ca(){var e;document.querySelectorAll(".notif-item").forEach(t=>ee.push(t.dataset.id)),ee=[...new Set(ee)],localStorage.setItem("crm_notifs_read",JSON.stringify(ee)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function qa(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function Ta(){let e=h.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);f!=null&&f.tenant_id&&(e=e.eq("tenant_id",f.tenant_id));const{data:t}=await e,a=(t||[]).filter(i=>!ee.includes(String(i.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let Y=[],j=1;const Be=10;let kt=!1;async function Aa(){var t,n,a,o,i,d,r,s,c;document.getElementById("section-contatos")&&(kt||(kt=!0,await Ut(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{j=1,me()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",l=>{l.key==="Enter"&&(j=1,me())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>Pt()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",Na),(i=document.getElementById("import-modal-close"))==null||i.addEventListener("click",ot),(d=document.getElementById("import-modal-cancel"))==null||d.addEventListener("click",ot),(r=document.getElementById("download-template"))==null||r.addEventListener("click",l=>{l.preventDefault();const m=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,p=new Blob([m],{type:"text/csv"}),b=document.createElement("a");b.href=URL.createObjectURL(p),b.download="modelo_contatos.csv",b.click()}),(s=document.getElementById("import-csv-file"))==null||s.addEventListener("change",Ma),(c=document.getElementById("import-modal-confirm"))==null||c.addEventListener("click",za)))}async function Ut(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=h.from("leads").select("*").order("created_at",{ascending:!1});(f==null?void 0:f.role)==="corretor"?t=t.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:a}=await t;Y=a||[],me()}function me(){var r,s,c;const e=(((r=document.getElementById("contato-search"))==null?void 0:r.value)||"").toLowerCase(),t=e?Y.filter(l=>(l.name||"").toLowerCase().includes(e)||(l.email||"").toLowerCase().includes(e)||(l.phone||"").toLowerCase().includes(e)):Y,n=t.length,a=Math.max(1,Math.ceil(n/Be));j>a&&(j=a);const o=t.slice((j-1)*Be,j*Be),i=document.getElementById("contatos-tbody");if(!i)return;o.length?i.innerHTML=o.map(l=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${l.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${l.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${v(l.name||"—")}</a>
        </td>
        <td>${v(l.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${l.email?v(l.email):"—"}</td>
        <td style="font-size:13px;">${l.phone?v(l.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${v(l.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td style="display:flex;gap:6px;align-items:center;">
          ${(()=>{const m=(l.phone||"").replace(/\D/g,"");if(!m)return"";const p=encodeURIComponent(`Olá ${(l.name||"").split(" ")[0]}! Aqui é da ${J("company.name","nossa imobiliária")}. Podemos conversar sobre seu interesse em imóveis?`);return`<a href="https://wa.me/${m}?text=${p}" target="_blank" rel="noopener" title="WhatsApp"
              style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
            </a>`})()}
          <button class="icon-btn contato-edit-btn" data-id="${l.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):i.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const d=document.getElementById("contatos-pagination");if(d){const l=n===0?0:(j-1)*Be+1,m=Math.min(j*Be,n);d.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${l}–${m}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${j<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${j} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${j>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(s=d.querySelector("#pag-prev"))==null||s.addEventListener("click",()=>{j--,me()}),(c=d.querySelector("#pag-next"))==null||c.addEventListener("click",()=>{j++,me()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(l=>{l.addEventListener("click",m=>{m.preventDefault();const p=l.dataset.id,b=Y.find(x=>String(x.id)===String(p));b&&Pt(b)})})}async function Pt(e=null){var g,E,I,S,L,k;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=M(),[{data:o},{data:i},{data:d}]=await Promise.all([h.from("crm_pipelines").select("*").eq("tenant_id",a).order("sort_order"),h.from("crm_tags").select("*").eq("tenant_id",a).order("name"),h.from("crm_lead_statuses").select("*").eq("tenant_id",a).order("sort_order")]),r=o||[],s=i||[],c=d||[],l=r.map(w=>w.id),{data:m}=l.length?await h.from("crm_stages").select("*").in("pipeline_id",l).order("sort_order"):{data:[]},p=m||[],b=(e==null?void 0:e.pipeline_id)||((g=r[0])==null?void 0:g.id)||"";function x(w){const $=p.filter(B=>B.pipeline_id===w);return $.length?'<option value="">— Selecionar etapa —</option>'+$.map(B=>`<option value="${v(B.name)}" ${(e==null?void 0:e.stage)===B.name?"selected":""}>${v(B.name)}</option>`).join(""):'<option value="">— Nenhuma etapa —</option>'}const u=document.createElement("div");u.id="contato-modal-root",u.className="modal-backdrop",u.innerHTML=`
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
              <input name="name" required class="form-control" placeholder="Nome completo" value="${v((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${v((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${v((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${v((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${v((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${v((e==null?void 0:e.city_interest)||"")}">
            </div>
          </div>

          ${r.length?`
          <div style="border-top:1px solid #f1f5f9;margin:8px 0 12px;padding-top:14px;">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;margin-bottom:10px;">FUNIL DE NEGOCIAÇÃO</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Funil</label>
                <select id="cm-pipe" name="pipeline_id" class="form-control">
                  <option value="">— Sem funil —</option>
                  ${r.map(w=>`<option value="${w.id}" ${String(e==null?void 0:e.pipeline_id)===String(w.id)?"selected":""}>${v(w.name)}</option>`).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Etapa</label>
                <select id="cm-stage" name="stage" class="form-control">
                  ${x(b)}
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
                ${c.map(w=>`<option value="${v(w.name)}" ${(e==null?void 0:e.status)===w.name?"selected":""}>${v(w.name)}</option>`).join("")}
              </select>
            </div>
          </div>`:""}

          ${s.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Tags</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                ${s.map(w=>`
                  <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:5px 12px;border-radius:20px;background:${w.color}18;border:1.5px solid ${w.color}55;font-size:12px;font-weight:600;color:${w.color};transition:opacity .15s;">
                    <input type="checkbox" name="tag" value="${v(w.name)}" style="margin:0;accent-color:${w.color};" ${((e==null?void 0:e.tags)||[]).includes(w.name)?"checked":""}>
                    ${v(w.name)}
                  </label>`).join("")}
              </div>
            </div>
          </div>`:""}

          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${v((e==null?void 0:e.notes)||"")}</textarea>
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
  `,document.body.appendChild(u);const y=()=>u.remove();(E=document.getElementById("cm-close"))==null||E.addEventListener("click",y),(I=document.getElementById("cm-cancel"))==null||I.addEventListener("click",y),u.addEventListener("click",w=>{w.target===u&&y()}),(S=document.getElementById("cm-pipe"))==null||S.addEventListener("change",w=>{const $=document.getElementById("cm-stage");$&&($.innerHTML=x(w.target.value))}),(L=document.getElementById("cm-delete"))==null||L.addEventListener("click",async()=>{if(!confirm(`Excluir o contato "${e==null?void 0:e.name}"?`))return;await h.from("leads").delete().eq("id",e.id);const w=Y.findIndex($=>String($.id)===String(e.id));w>=0&&Y.splice(w,1),y(),me()}),(k=document.getElementById("cm-save"))==null||k.addEventListener("click",async()=>{var V,H,O,ae,se,$e,ke;const w=document.getElementById("contato-form");if(!w.checkValidity()){w.reportValidity();return}const $=new FormData(w),B=document.getElementById("cm-save");B.disabled=!0,B.textContent="Salvando…";const q=$.getAll("tag"),C=$.get("pipeline_id")||null,N={name:(V=$.get("name"))==null?void 0:V.trim(),company:((H=$.get("company"))==null?void 0:H.trim())||null,email:((O=$.get("email"))==null?void 0:O.trim())||null,phone:((ae=$.get("phone"))==null?void 0:ae.trim())||null,job_title:((se=$.get("job_title"))==null?void 0:se.trim())||null,city_interest:(($e=$.get("city_interest"))==null?void 0:$e.trim())||null,notes:((ke=$.get("notes"))==null?void 0:ke.trim())||null,pipeline_id:C,stage:$.get("stage")||null,status:$.get("status")||null,tags:q,assigned_to:(f==null?void 0:f.id)||null,tenant_id:(f==null?void 0:f.tenant_id)||null,source:(e==null?void 0:e.source)||"manual"};let T;if(n){if({error:T}=await h.from("leads").update(N).eq("id",e.id),!T){const U=Y.findIndex(ve=>String(ve.id)===String(e.id));U>=0&&(Y[U]={...Y[U],...N})}}else{const{data:U,error:ve}=await h.from("leads").insert(N).select();T=ve,!T&&(U!=null&&U[0])&&Y.unshift(U[0])}if(B.disabled=!1,B.textContent=n?"Salvar":"Criar Contato",T){alert("Erro: "+T.message);return}y(),me()})}let Ee=[];function Ma(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{Ee=a.target.result.split(`
`).filter(r=>r.trim()).slice(1).map(r=>{const[s,c,l,m,p]=r.split(",").map(b=>b.trim().replace(/^"|"$/g,""));return{name:s,email:c,phone:l,company:m,job_title:p}}).filter(r=>r.name);const i=document.getElementById("import-preview");i&&(i.textContent=`${Ee.length} contato(s) encontrados para importar.`);const d=document.getElementById("import-modal-confirm");d&&(d.disabled=Ee.length===0)},n.readAsText(t)}async function za(){if(!Ee.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=Ee.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(f==null?void 0:f.id)||null,tenant_id:(f==null?void 0:f.tenant_id)||null})),{error:n}=await h.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}ot(),await Ut(),alert(`${t.length} contato(s) importados com sucesso!`)}function Na(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),Ee=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function ot(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const ja="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function pe(e){return(await fetch(ja,{method:"POST",headers:{Authorization:`Bearer ${sa}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function St(e){var s,c,l,m;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),i=document.getElementById("settings-avatar-input"),d=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:p}}=await h.auth.getUser();n.value=(p==null?void 0:p.email)||""}const r=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=r),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),i==null||i.addEventListener("change",p=>{const b=p.target.files[0];if(!b)return;const x=URL.createObjectURL(b);a&&(a.src=x,a.style.display=""),o&&(o.style.display="none")}),(s=document.getElementById("btn-change-password"))==null||s.addEventListener("click",async()=>{var g,E;const p=((g=document.getElementById("change-password-new"))==null?void 0:g.value)||"",b=((E=document.getElementById("change-password-confirm"))==null?void 0:E.value)||"",x=document.getElementById("change-password-msg"),u=document.getElementById("btn-change-password");if(x&&(x.style.display="none"),p.length<6){x&&(x.textContent="Mínimo 6 caracteres.",x.style.display="");return}if(p!==b){x&&(x.textContent="As senhas não coincidem.",x.style.display="");return}u&&(u.disabled=!0,u.textContent="Salvando…");const{error:y}=await h.auth.updateUser({password:p});u&&(u.disabled=!1,u.textContent="Salvar Nova Senha"),y?x&&(x.textContent="Erro: "+y.message,x.style.display=""):(x&&(x.style.color="#16a34a",x.textContent="Senha alterada com sucesso!",x.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),d==null||d.addEventListener("click",async()=>{var E;const p=t.value.trim();let b=(f==null?void 0:f.avatar_url)||"";const x=i==null?void 0:i.files[0],u=d.textContent;if(d.disabled=!0,d.textContent="Salvando…",x)try{const I=await Me(x,400,.85),S=`avatars/${f.id}-${Date.now()}.jpg`,{error:L}=await h.storage.from("imoveis").upload(S,I,{contentType:"image/jpeg",upsert:!0});if(!L){const{data:{publicUrl:k}}=h.storage.from("imoveis").getPublicUrl(S);b=k}}catch(I){console.error("Avatar upload:",I)}const{error:y}=await h.from("profiles").update({name:p,avatar_url:b}).eq("id",f.id);if(d.disabled=!1,d.textContent=u,y){alert("Erro ao salvar perfil.");return}f={...f,name:p,avatar_url:b},Fe(f);const g=document.getElementById("settings-avatar-initial");g&&(g.textContent=((E=p[0])==null?void 0:E.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const p=document.getElementById("settings-corretores-section");p&&(p.style.display=""),await We(),(c=document.getElementById("btn-invite-corretor"))==null||c.addEventListener("click",async()=>{var E,I;const x=(E=document.getElementById("invite-email"))==null?void 0:E.value.trim(),u=(I=document.getElementById("invite-password"))==null?void 0:I.value.trim(),y=document.getElementById("btn-invite-corretor"),g=document.getElementById("invite-note");if(!x){alert("Informe o e-mail do corretor.");return}if(!u||u.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}y&&(y.disabled=!0,y.textContent="Criando…"),g&&(g.style.display="none");try{const S=await pe({email:x,password:u,tenant_id:(f==null?void 0:f.tenant_id)||null});if(S.success){const L=document.getElementById("invite-email"),k=document.getElementById("invite-password");L&&(L.value=""),k&&(k.value=""),await We(),g&&(S.email_sent===!1?(g.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${v(x)}<br>
                <strong>Senha:</strong> ${v(u)}`,g.style.color="#0f172a"):(g.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",g.style.color="#16a34a"),g.style.display="")}else alert("Erro: "+(S.error||"Falha desconhecida"))}catch(S){alert("Erro ao criar acesso: "+S.message)}finally{y&&(y.disabled=!1,y.textContent="+ Criar Acesso")}});const b=document.getElementById("settings-locations-section");b&&(b.style.display=""),await Ce(),(l=document.getElementById("loc-add-city-btn"))==null||l.addEventListener("click",async()=>{const x=document.getElementById("loc-new-city"),u=x==null?void 0:x.value.trim();if(!u)return;const{error:y}=await h.from("locations").insert({type:"cidade",name:u});if(y){alert("Erro ao adicionar cidade.");return}x&&(x.value=""),await Ce(),ut()}),(m=document.getElementById("loc-add-neighborhood-btn"))==null||m.addEventListener("click",async()=>{var E;const x=parseInt((E=document.getElementById("loc-new-neighborhood-city"))==null?void 0:E.value,10),u=document.getElementById("loc-new-neighborhood"),y=u==null?void 0:u.value.trim();if(!x||!y){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:g}=await h.from("locations").insert({type:"bairro",name:y,parent_id:x});if(g){alert("Erro ao adicionar bairro.");return}u&&(u.value=""),await Ce()})}}async function We(){const e=document.getElementById("corretores-list");if(!e)return;let t=h.from("profiles").select("*").order("created_at");f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const i=(o.name||"?")[0].toUpperCase(),d=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${v(i)}</div>`,r=o.id===(f==null?void 0:f.id),s=o.active!==!1,c=s?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',l=r?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,m=r?"":s?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,p=r?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${d}
        <div>
          <div class="corretor-name">${v(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${c}
        ${l}
        ${m}
        ${p}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await h.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.uid,d=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const r=await pe({action:"toggle",userId:i,active:!d});r.success||alert("Erro: "+(r.error||"Falha desconhecida"))}catch(r){alert("Erro: "+r.message)}await We()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var r,s;const i=o.dataset.uid,d=((s=(r=o.closest(".corretor-item"))==null?void 0:r.querySelector(".corretor-name"))==null?void 0:s.textContent)||"este corretor";if(confirm(`Excluir "${d}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const c=await pe({action:"delete",userId:i});c.success||alert("Erro ao excluir: "+(c.error||"Falha desconhecida"))}catch(c){alert("Erro: "+c.message)}await We()}})})}async function Ft(){const{data:e,error:t}=await h.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(qe=e||[],qe)}function ue(){return qe.filter(e=>e.type==="cidade")}function pt(e){return qe.filter(t=>t.type==="bairro"&&t.parent_id===e)}function ut(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=ue();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${v(a.name)}</option>`).join(""),t&&(e.value=t)}async function Ce(){await Ft();const e=ue(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(i=>`
        <div class="loc-item">
          <span class="loc-item-name">${v(i.name)}</span>
          <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=qe.filter(i=>i.type==="bairro");n.innerHTML=o.length?o.map(i=>{const d=e.find(r=>r.id===i.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${v(i.name)}</div>
              ${d?`<div class="loc-item-sub">${v(d.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(i=>`<option value="${i.id}">${v(i.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{const d=i.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${d}" e todos os bairros vinculados?`))return;const{error:r}=await h.from("locations").delete().eq("id",i.dataset.id);if(r){alert("Erro ao excluir.");return}await Ce(),ut()})}),n.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:d}=await h.from("locations").delete().eq("id",i.dataset.id);if(d){alert("Erro ao excluir.");return}await Ce()})})}function Lt(){var n,a,o,i,d,r,s,c,l,m,p,b,x,u,y,g,E,I,S,L;document.querySelectorAll(".filter-btn").forEach(k=>{k.addEventListener("click",()=>{const w=k.closest(".filter-btns"),$=k.classList.contains("active");w.querySelectorAll(".filter-btn").forEach(B=>B.classList.remove("active")),$||k.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var q;const k=(q=document.getElementById("f-city"))==null?void 0:q.value,w=ue().find(C=>C.name===k),$=w?pt(w.id):[],B=document.getElementById("f-neighborhood");B&&(B.innerHTML='<option value="">Todos</option>'+$.map(C=>`<option value="${C.name}">${v(C.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{Te(ct(_))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{const k=document.querySelector(".admin-filter-panel");if(k){k.querySelectorAll('input[type="text"], input[type="number"]').forEach($=>{$.value=""}),k.querySelectorAll("select").forEach($=>{$.selectedIndex=0});const w=document.getElementById("f-neighborhood");w&&(w.innerHTML='<option value="">Todos</option>'),k.querySelectorAll(".filter-btn.active").forEach($=>$.classList.remove("active"))}Te(_)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(k=>{k.addEventListener("click",()=>{te(k.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(k=>{k.addEventListener("click",()=>{te(k.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(k=>{k.addEventListener("click",w=>{w.stopPropagation();const $=k.closest(".topnav-dropdown");$==null||$.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(B=>{B!==$&&B.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(k=>k.classList.remove("open"))}),(i=document.getElementById("modal-close"))==null||i.addEventListener("click",Re),(d=document.getElementById("modal-cancel"))==null||d.addEventListener("click",Re),(r=document.getElementById("property-modal"))==null||r.addEventListener("click",k=>{k.target.id==="property-modal"&&Re()}),(s=document.getElementById("btn-new-property"))==null||s.addEventListener("click",()=>{R=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",le="",Ue([]),Ze("Novo Imóvel")}),(c=document.getElementById("logout-btn"))==null||c.addEventListener("click",async()=>{await h.auth.signOut(),location.reload()}),(l=document.getElementById("view-prev"))==null||l.addEventListener("click",()=>{K=(K-1+ne.length)%ne.length,Pe()}),(m=document.getElementById("view-next"))==null||m.addEventListener("click",()=>{K=(K+1)%ne.length,Pe()}),(p=document.getElementById("view-modal-close"))==null||p.addEventListener("click",ze),(b=document.getElementById("view-modal-close2"))==null||b.addEventListener("click",ze),(x=document.getElementById("view-modal"))==null||x.addEventListener("click",k=>{k.target.id==="view-modal"&&ze()}),(u=document.getElementById("view-modal-share"))==null||u.addEventListener("click",()=>{const k=document.getElementById("share-panel");if(!k)return;const w=k.style.display!=="none";k.style.display=w?"none":"block"}),(y=document.getElementById("share-whatsapp"))==null||y.addEventListener("click",()=>{var H,O,ae;const k=(H=document.getElementById("share-link-input"))==null?void 0:H.value;if(!k)return;const w=Number((O=document.getElementById("share-panel"))==null?void 0:O.dataset.pid),$=_.find(se=>se.id===w),B=($==null?void 0:$.title)||((ae=document.getElementById("view-modal-title"))==null?void 0:ae.textContent)||"Imóvel",q=$!=null&&$.price?` — ${Ae($.price,"pt")}`:"",C=$!=null&&$.reference?` | Ref: ${$.reference}`:"",N=[$==null?void 0:$.neighborhood,$==null?void 0:$.city].filter(Boolean).join(", "),T=N?`
📍 ${N}`:"",V=encodeURIComponent(`Olha esse imóvel que encontrei: *${B}*${q}${C}${T}

${k}`);window.open("https://wa.me/?text="+V,"_blank")}),(g=document.getElementById("share-instagram"))==null||g.addEventListener("click",()=>{var w,$;const k=(w=document.getElementById("share-link-input"))==null?void 0:w.value;k&&(($=navigator.clipboard)==null||$.writeText(k),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(E=document.getElementById("share-email"))==null||E.addEventListener("click",()=>{var q,C;const k=(q=document.getElementById("share-link-input"))==null?void 0:q.value;if(!k)return;const w=((C=document.getElementById("view-modal-title"))==null?void 0:C.textContent)||"Imóvel",$=encodeURIComponent("Imóvel: "+w),B=encodeURIComponent(`Olá! Segue o link do imóvel:

`+k);window.open("mailto:?subject="+$+"&body="+B,"_blank")}),(I=document.getElementById("share-copy"))==null||I.addEventListener("click",()=>{var w;const k=document.getElementById("share-link-input");k&&((w=navigator.clipboard)==null||w.writeText(k.value).then(()=>{const $=document.getElementById("share-copy"),B=$.textContent;$.textContent="✅ Copiado!",setTimeout(()=>{$.textContent=B},2e3)}))}),(S=document.getElementById("view-modal-edit"))==null||S.addEventListener("click",()=>{var N;if((f==null?void 0:f.role)!=="admin"&&(f==null?void 0:f.role)!=="super_admin")return;const k=Number(document.getElementById("view-modal-edit").dataset.pid),w=_.find(T=>T.id===k);if(!w)return;ze(),R=w.id;const $=document.getElementById("property-form"),B=document.getElementById("form-submit-btn");B.textContent="Salvar Alterações",$.querySelector('[name="title"]').value=w.title||"",$.querySelector('[name="rua"]').value=w.rua||"",$.querySelector('[name="numero"]').value=w.numero||"",$.querySelector('[name="city"]').value=w.city||"",$.querySelector('[name="price"]').value=w.price||"",$.querySelector('[name="bedrooms"]').value=w.bedrooms||"",$.querySelector('[name="suites"]').value=w.suites||"",$.querySelector('[name="parking"]').value=w.parking||"",$.querySelector('[name="description"]').value=w.description||"",$.querySelector('[name="construction_status"]').value=w.construction_status||"",$.querySelector('[name="owner_name"]').value=w.owner_name||"",$.querySelector('[name="owner_phone"]').value=w.owner_phone||"",$.querySelector('[name="owner_email"]').value=w.owner_email||"",$.querySelector('[name="owner_notes"]').value=w.owner_notes||"",$.querySelector('[name="condominium"]').value=w.condominium||"";const q=document.getElementById("adminPublished");q&&(q.value=w.published===!0?"true":"false");const C=document.getElementById("adminCitySelect");C&&(C.value=w.city||"",C.dispatchEvent(new Event("change")),setTimeout(()=>{const T=document.getElementById("adminNeighborhood");T&&(T.value=w.neighborhood||"")},50)),le=w.cover_image||((N=w.images)==null?void 0:N[0])||"",Ue(w.images||[]),Ze("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(k=>{k.addEventListener("click",()=>{var w;document.querySelectorAll(".tab-btn").forEach($=>$.classList.remove("active")),k.classList.add("active"),document.querySelectorAll(".tab-panel").forEach($=>$.classList.add("hidden")),(w=document.getElementById(`tab-${k.dataset.tab}`))==null||w.classList.remove("hidden")})}),(L=document.getElementById("admin-properties"))==null||L.addEventListener("click",k=>{if(k.target.closest(".action-btns"))return;const w=k.target.closest("tr");if(!w)return;const $=Number(w.dataset.id);if(!$)return;const B=_.find(q=>q.id===$);B&&Ea(B)})}async function Xt(){const e=document.getElementById("section-depoimentos");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await h.from("site_content").select("value_pt").eq("key","testimonials").eq("tenant_id",M()).maybeSingle();let n=[];try{n=JSON.parse((t==null?void 0:t.value_pt)||"[]")}catch{n=[]}function a(d){const r=["#0d2144","#1a3a5c","#0a1628","#164a3c","#2d1b3d","#3d1a1a","#1a2f4a"];let s=0;for(const c of d||"?")s=s*31+c.charCodeAt(0)&4294967295;return r[Math.abs(s)%r.length]}function o(){e.querySelector("#dep-save-msg"),e.innerHTML=`
      <div class="section-topbar">
        <div>
          <div class="section-title">Depoimentos</div>
          <div class="section-sub">Gerencie os depoimentos exibidos no site público</div>
        </div>
        <button class="btn-primary" id="dep-add-btn">+ Novo Depoimento</button>
      </div>

      <div id="dep-list" style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;max-width:800px">
        ${n.length===0?'<p style="color:#94a3b8;font-size:14px">Nenhum depoimento cadastrado ainda.</p>':n.map((s,c)=>`
            <div class="dep-admin-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px">
              <div style="width:40px;height:40px;border-radius:50%;background:${a(s.name)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0">${(s.name||"?")[0].toUpperCase()}</div>
              <div style="flex:1;min-width:0">
                <div style="color:#f59e0b;font-size:14px;margin-bottom:4px">${"★".repeat(s.stars||5)}</div>
                <p style="color:#374151;font-size:14px;line-height:1.5;margin:0 0 6px;font-style:italic">"${v(s.text||"")}"</p>
                <div style="font-weight:600;font-size:13px;color:#0f172a">${v(s.name||"")}</div>
                <div style="font-size:12px;color:#64748b">${v(s.role||"")}</div>
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
    `,e.dataset.loaded="1";let d=-1;function r(s=-1){d=s;const c=e.querySelector("#dep-form-wrap");c.style.display="",e.querySelector("#dep-form-title").textContent=s>=0?"Editar Depoimento":"Novo Depoimento";const l=s>=0?n[s]:{};e.querySelector("#dep-stars").value=String(l.stars||5),e.querySelector("#dep-text").value=l.text||"",e.querySelector("#dep-name").value=l.name||"",e.querySelector("#dep-role").value=l.role||"",e.querySelector("#dep-text").focus()}e.querySelector("#dep-add-btn").addEventListener("click",()=>r(-1)),e.querySelector("#dep-form-cancel").addEventListener("click",()=>{e.querySelector("#dep-form-wrap").style.display="none",d=-1}),e.addEventListener("click",s=>{const c=s.target.closest("[data-edit]"),l=s.target.closest("[data-del]");if(c&&r(parseInt(c.dataset.edit)),l){const m=parseInt(l.dataset.del);confirm("Remover este depoimento?")&&(n.splice(m,1),i().then(()=>o()))}}),e.querySelector("#dep-form-save").addEventListener("click",async()=>{const s=e.querySelector("#dep-form-save"),c=e.querySelector("#dep-save-msg"),l=e.querySelector("#dep-text").value.trim(),m=e.querySelector("#dep-name").value.trim(),p=e.querySelector("#dep-role").value.trim(),b=parseInt(e.querySelector("#dep-stars").value);if(!l||!m){alert("Preencha o depoimento e o nome.");return}s.disabled=!0,s.textContent="Salvando…";const x={stars:b,text:l,name:m,role:p};d>=0?n[d]=x:n.push(x);const u=await i();s.disabled=!1,s.textContent="Salvar",X(c,u),u&&(e.querySelector("#dep-form-wrap").style.display="none",d=-1,o())})}async function i(){const d=JSON.stringify(n);return await je("testimonials",{pt:d,en:d,es:d})}o()}document.addEventListener("DOMContentLoaded",async()=>{var r,s,c;const t=window.location.hostname.replace(/^www\./,"");if(t&&t!=="localhost"&&t!=="127.0.0.1"){const l=`imobi_tenant_${t}`,m=De(l);if(m)fe(m);else{let p=null;for(const b of[t,"www."+t]){const{data:x}=await h.from("tenants").select("id").eq("domain",b).maybeSingle();if(x!=null&&x.id){p=x;break}}p!=null&&p.id&&(fe(p.id),Qe(l,p.id,24*60*60*1e3))}}await Promise.all([ia(),Ft()]),_e=J("company.whatsapp",_e),lt(),fa(),ya();const n=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");n&&a&&(ut(),n.addEventListener("change",()=>{const l=ue().find(p=>p.name===n.value),m=l?pt(l.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+m.map(p=>`<option value="${p.name}">${v(p.name)}</option>`).join("")}));const o=document.getElementById("admin-login"),i=document.getElementById("admin-root");if(o){const l=new URLSearchParams(window.location.hash.replace("#","")),m=new URLSearchParams(window.location.search),p=l.get("type")||m.get("type")||"",b=Mt||p==="recovery"||p==="invite"||window.location.hash.includes("access_token")||m.has("code"),x=document.getElementById("password-reset-overlay");if(b){o.style.display="none",i&&i.classList.add("hidden"),x&&(x.style.display="flex"),(r=document.getElementById("password-reset-form"))==null||r.addEventListener("submit",async y=>{var k,w;y.preventDefault();const g=((k=document.getElementById("new-password"))==null?void 0:k.value)||"",E=((w=document.getElementById("confirm-password"))==null?void 0:w.value)||"",I=document.getElementById("password-reset-msg"),S=y.target.querySelector('button[type="submit"]');if(I&&(I.style.display="none"),g!==E){I&&(I.textContent="As senhas não coincidem.",I.style.display="");return}S&&(S.disabled=!0,S.textContent="Salvando…");const{error:L}=await h.auth.updateUser({password:g});if(L){I&&(I.textContent="Erro: "+L.message,I.style.display=""),S&&(S.disabled=!1,S.textContent="Definir Senha");return}window.location.href=window.location.pathname}),m.has("code")&&await h.auth.exchangeCodeForSession(m.get("code")??"");return}const{data:{session:u}}=await h.auth.getSession();if(u){if(o.classList.add("hidden"),i&&i.classList.remove("hidden"),Ke(),Lt(),wt(),window.lucide&&lucide.createIcons(),f=await ht(u.user.id),!f){await h.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden");return}if(f.active===!1){await h.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(f.needs_password_reset){o.style.display="none",i&&i.classList.add("hidden");const y=document.getElementById("password-reset-overlay");y&&(y.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async g=>{var w,$;g.preventDefault();const E=((w=document.getElementById("new-password"))==null?void 0:w.value)||"",I=(($=document.getElementById("confirm-password"))==null?void 0:$.value)||"",S=document.getElementById("password-reset-msg"),L=g.target.querySelector('button[type="submit"]');if(S&&(S.style.display="none"),E!==I){S&&(S.textContent="As senhas não coincidem.",S.style.display="");return}if(E.length<6){S&&(S.textContent="Mínimo 6 caracteres.",S.style.display="");return}L&&(L.disabled=!0,L.textContent="Salvando…");const{error:k}=await h.auth.updateUser({password:E});if(k){S&&(S.textContent="Erro: "+k.message,S.style.display=""),L&&(L.disabled=!1,L.textContent="Definir Senha");return}await h.from("profiles").update({needs_password_reset:!1}).eq("id",f.id),window.location.href=window.location.pathname});return}fe((f==null?void 0:f.tenant_id)||null),Fe(f),xt(f),Et(f.role),await Oe(),await St(f),window.lucide&&lucide.createIcons(),Ta(),te("dashboard")}else{i&&i.classList.add("hidden"),o.classList.remove("hidden");const y=document.getElementById("login-form");y&&((c=document.getElementById("forgot-password-btn"))==null||c.addEventListener("click",async()=>{var I,S;const g=(S=(I=y.querySelector('input[name="email"]'))==null?void 0:I.value)==null?void 0:S.trim();if(!g){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:E}=await h.auth.resetPasswordForEmail(g,{redirectTo:"https://omarcorretor.com.br/ios.imobi.html"});alert(E?"Erro: "+E.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),y.addEventListener("submit",async g=>{g.preventDefault();const E=y.querySelector('button[type="submit"]'),I=new FormData(y),S=I.get("email"),L=I.get("password");E&&(E.disabled=!0,E.textContent="Entrando…");try{if(await ca(S,L)){o.classList.add("hidden"),i&&i.classList.remove("hidden"),Ke(),Lt(),window.lucide&&lucide.createIcons();const{data:{session:w}}=await h.auth.getSession();if(f=w?await ht(w.user.id):null,!f){await h.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Perfil não encontrado. Entre em contato com o administrador.");return}if(f.active===!1){await h.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}wt(),fe((f==null?void 0:f.tenant_id)||null),Fe(f),xt(f),Et(f.role),await Oe(),await St(f),window.lucide&&lucide.createIcons(),te("dashboard")}else alert("E-mail ou senha incorretos")}catch(k){alert("Erro ao fazer login: "+((k==null?void 0:k.message)||String(k)))}finally{E&&(E.disabled=!1,E.textContent="Entrar")}}))}}else Ke();await re();const d=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();yt(d),bt(_e),window._applyDynamicContent=yt,window._applyWhatsAppLinks=bt,document.querySelectorAll(".nav-dropdown-btn").forEach(l=>{var p;const m=(p=l.closest(".nav-dropdown"))==null?void 0:p.querySelector(".nav-dropdown-menu");m&&l.addEventListener("click",b=>{b.stopPropagation(),m.classList.toggle("js-open"),document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(x=>{x!==m&&x.classList.remove("js-open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(l=>l.classList.remove("js-open"))})});async function Da(){const e=_.filter(o=>!o.reference);if(!e.length)return;const t=_.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,i)=>o.id-i.id);for(const o of a){const i="IO-"+String(n).padStart(4,"0"),{error:d}=await h.from("properties").update({reference:i}).eq("id",o.id);if(!d){const r=_.findIndex(s=>s.id===o.id);r>=0&&(_[r].reference=i),n++}}Te(ct(_))}async function Ra(){const e=_.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(i=>!i.includes("/wm-")))continue;const a=[];let o=!1;for(const i of t.images)if(i.includes("/wm-"))a.push(i);else try{const d=await Ha(i);a.push(d),o=!0}catch{a.push(i)}if(o){await h.from("properties").update({images:a}).eq("id",t.id);const i=_.findIndex(d=>d.id===t.id);i>=0&&(_[i].images=a)}}Te(ct(_))}}async function Ha(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),i=o.ok?await o.blob():null,d=i?URL.createObjectURL(i):null;return new Promise(r=>{const s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const c=document.createElement("canvas"),l=1200;let m=s.width,p=s.height;m>l&&(p=Math.round(p*l/m),m=l),c.width=m,c.height=p;const b=c.getContext("2d");b.drawImage(s,0,0,m,p);const x=u=>{if(u){const y=Math.round(m*.18),g=Math.round(u.naturalHeight*y/u.naturalWidth),E=Math.round(m*.02);b.globalAlpha=.45,b.drawImage(u,m-y-E,p-g-E,y,g),b.globalAlpha=1}c.toBlob(async y=>{try{const g=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:E}=await h.storage.from("imoveis").upload(g,y,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(E){console.error("Upload watermark error:",E),r(e);return}const{data:{publicUrl:I}}=h.storage.from("imoveis").getPublicUrl(g);r(I)}catch(g){console.error("Watermark upload exception:",g),r(e)}},"image/jpeg",.82)};if(d){const u=new Image;u.onload=()=>{URL.revokeObjectURL(d),x(u)},u.onerror=()=>{URL.revokeObjectURL(d),x(null)},u.src=d}else x(null)},s.onerror=()=>{URL.revokeObjectURL(a),r(e)},s.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function X(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function gt(e,t="assets"){const n=await Me(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await h.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:i}}=h.storage.from("imoveis").getPublicUrl(a);return i}async function Vt(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await h.from("settings").select("key,value").eq("tenant_id",M()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>v(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const i=o.target.files[0];if(i)try{const d=await gt(i,"logos");document.getElementById("co-logo-url").value=d,document.getElementById("co-logo-preview").src=d}catch(d){alert("Erro no upload: "+d.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const i=await xe([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);i&&lt(),o.disabled=!1,o.textContent="Salvar Identidade",X(document.getElementById("co-identity-msg"),i)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const i=document.getElementById("co-whatsapp").value.trim(),d=await xe([["company.whatsapp",i],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);d&&i&&(_e=i),o.disabled=!1,o.textContent="Salvar Contatos",X(document.getElementById("co-contacts-msg"),d)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const i=await xe([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",X(document.getElementById("co-social-msg"),i)})}async function Gt(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await h.from("settings").select("key,value").eq("tenant_id",M()),n={};t==null||t.forEach(l=>{n[l.key]=l.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",i=n["visual.secondary_bg"]||"#1a2f4a",d=n["visual.hero_bg_url"]||"",r=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${v(d)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 <strong>Foto de fundo do banner</strong> no topo do site. Recomendado: 1920×1080 px.</p>
        <div id="vis-hero-preview" style="margin-top:10px;display:${d?"":"none"}">
          <img src="${v(d)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Preço Máximo do Slider de Busca</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="vis-price-max" type="number" class="form-control" value="${r}" min="100000" step="1000000" style="max-width:200px">
          <span style="font-size:13px;color:#9ca3af">R$</span>
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-images">Salvar Imagens</button>
        <span id="visual-images-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `;function s(l,m,p){const b=document.getElementById(l),x=document.getElementById(m);b==null||b.addEventListener("input",u=>{x.value=u.target.value,p()}),x==null||x.addEventListener("input",u=>{/^#[0-9a-fA-F]{6}$/.test(u.target.value)&&(b.value=u.target.value,p())})}function c(){var m,p,b,x;const l=((m=document.getElementById("col-accent-hex"))==null?void 0:m.value)||"#b8962e";(p=document.getElementById("vp-bar"))==null||p.style.setProperty("background",l),(b=document.getElementById("vp-dot"))==null||b.style.setProperty("background",l),(x=document.getElementById("vp-btn"))==null||x.style.setProperty("background",l),document.documentElement.style.setProperty("--accent",l)}s("col-accent","col-accent-hex",c),s("col-primary","col-primary-hex",()=>{}),s("col-secondary","col-secondary-hex",()=>{}),c(),document.getElementById("vis-hero-file").addEventListener("change",async l=>{const m=l.target.files[0];if(m)try{const p=await gt(m,"hero");document.getElementById("vis-hero-url").value=p;const b=document.getElementById("vis-hero-preview");b.innerHTML=`<img src="${p}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,b.style.display=""}catch(p){alert("Erro no upload: "+p.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const l=document.getElementById("visual-save-colors");l.disabled=!0,l.textContent="Salvando…";const m=await xe([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);m&&lt(),l.disabled=!1,l.textContent="Salvar Cores",X(document.getElementById("visual-colors-msg"),m)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",c())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const l=document.getElementById("visual-save-images");l.disabled=!0,l.textContent="Salvando…";const m=await xe([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);l.disabled=!1,l.textContent="Salvar Imagens",X(document.getElementById("visual-images-msg"),m)})}async function Wt(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await h.from("site_content").select("*").eq("tenant_id",M()),n={};t==null||t.forEach(s=>{n[s.key]=s});const a=(s,c)=>{var l;return v(((l=n[s])==null?void 0:l[`value_${c}`])||"")},o=["pt","en","es"],i={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},d=s=>o.map(c=>`<button class="content-tab${c===s?" active":""}" data-lang="${c}">${i[c]}</button>`).join(""),r=s=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${s}" value="${a("hero.title",s)}">
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto principal em <strong>destaque no banner do site</strong> (frase de impacto).</p>
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${s}" rows="3">${a("hero.subtitle",s)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto menor abaixo do título, também no <strong>banner principal</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${s}" rows="4">${a("inst.bio_p1",s)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece na seção <strong>"Sobre"</strong> do site.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${s}" rows="3">${a("inst.bio_p2",s)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Segundo parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${s}" rows="3">${a("inst.bio_p3",s)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Terceiro parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${s}" value="${a("inst.stat1_num",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${s}" value="${a("inst.stat2_num",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${s}" value="${a("inst.stat3_num",s)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${s}" value="${a("inst.stat1_label",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${s}" value="${a("inst.stat2_label",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${s}" value="${a("inst.stat3_label",s)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${s}" value="${a("footer.text",s)}">
    </div>
  `;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${d("pt")}</div>
      <div id="sc-panels">
        ${o.map(s=>`<div class="content-panel${s==="pt"?" active":""}" data-panel="${s}">${r(s)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",s=>{var l;const c=s.target.closest(".content-tab");c&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(m=>m.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(m=>m.classList.remove("active")),c.classList.add("active"),(l=document.querySelector(`#sc-panels [data-panel="${c.dataset.lang}"]`))==null||l.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const s=document.getElementById("sc-save-btn");s.disabled=!0,s.textContent="Salvando…";const c={};document.querySelectorAll(".sc-field").forEach(m=>{const p=m.dataset.key,b=m.dataset.lang;c[p]||(c[p]={}),c[p][b]=m.value});let l=!0;for(const[m,p]of Object.entries(c))await je(m,{pt:p.pt,en:p.en,es:p.es})||(l=!1);s.disabled=!1,s.textContent="Salvar Conteúdo",X(document.getElementById("sc-save-msg"),l)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const s=document.getElementById("seo-save-btn");s.disabled=!0,s.textContent="Salvando…";const c=document.getElementById("seo-title").value.trim(),l=document.getElementById("seo-desc").value.trim(),m=await je("seo.title_pt",{pt:c,en:c,es:c})&&await je("seo.description_pt",{pt:l,en:l,es:l});s.disabled=!1,s.textContent="Salvar SEO",X(document.getElementById("seo-save-msg"),m)})}async function Jt(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await P())}async function P(){var b,x;const e=document.getElementById("crm-body");if(!e)return;const t=M(),[{data:n},{data:a},{data:o},{data:i}]=await Promise.all([h.from("crm_pipelines").select("*").eq("tenant_id",t).order("sort_order"),h.from("crm_stages").select("*").eq("tenant_id",t).order("sort_order"),h.from("crm_tags").select("*").eq("tenant_id",t).order("name"),h.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("sort_order")]),d=n||[],r=d.find(u=>u.is_default)||d[0],s=d.map(u=>`<option value="${u.id}"${u.id===(r==null?void 0:r.id)?" selected":""}>${v(u.name)}</option>`).join(""),l=(a||[]).filter(u=>u.pipeline_id===(r==null?void 0:r.id)).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${v(u.name)}</span>
      <input type="color" value="${u.color}" data-sid="${u.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${u.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>';(o||[]).map(u=>`<span class="tag-chip" style="background:${u.color}" data-id="${u.id}">
      ${v(u.name)}
      <button class="tag-chip-del" data-id="${u.id}" title="Remover">✕</button>
    </span>`).join("");const m=(i||[]).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${v(u.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${u.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${u.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${s}</select>
        <button class="btn-secondary" id="crm-add-pipeline" style="font-size:13px;padding:7px 14px">+ Novo Funil</button>
      </div>
      <div class="stages-list" id="crm-stages-list">${l}</div>
      <div class="stage-add-row">
        <input id="crm-new-stage" type="text" class="form-control" placeholder="Nome da etapa…">
        <input type="color" id="crm-new-stage-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <button class="btn-primary" id="crm-add-stage">Adicionar Etapa</button>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏷️</span> Tags de Classificação</div>
      <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Classifique seus leads com tags coloridas personalizadas. Use emojis no nome para identificar visualmente.</p>
      <div class="tm-list" id="crm-tags-list">
        ${(o||[]).length?(o||[]).map(u=>`
        <div class="tm-row" data-id="${u.id}">
          <div class="tm-color-swatch" style="background:${u.color}" onclick="this.nextElementSibling.click()" title="Alterar cor"></div>
          <input type="color" class="tm-color-input" data-id="${u.id}" value="${u.color}" title="Cor da tag">
          <input class="tm-name-input form-control" type="text" value="${v(u.name)}" data-id="${u.id}" data-orig="${v(u.name)}" placeholder="Nome da tag">
          <button class="btn-primary tm-save-btn" data-id="${u.id}">Salvar</button>
          <button class="icon-btn del-btn tm-del-btn" data-id="${u.id}" title="Excluir tag">🗑️</button>
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
          ${[{name:"🔴 Quente",color:"#EF4444"},{name:"🟡 Morno",color:"#F59E0B"},{name:"🔵 Frio",color:"#3B82F6"},{name:"💰 Investidor",color:"#8B5CF6"},{name:"⭐ Alto Padrão",color:"#C9A227"},{name:"🏦 Financiamento",color:"#0EA5E9"},{name:"🔄 Permuta",color:"#374151"},{name:"🏠 Comprador",color:"#10B981"},{name:"📋 Proprietário",color:"#F97316"}].filter(u=>!(o||[]).some(y=>y.name===u.name)).map(u=>`<button class="tm-tpl-btn" data-name="${v(u.name)}" data-color="${u.color}" style="border-color:${u.color};color:${u.color};background:${u.color}15;">${v(u.name)}</button>`).join("")}
        </div>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📋</span> Status de Leads</div>
      <div class="stages-list" id="crm-status-list">${m}</div>
      <div class="stage-add-row">
        <input id="crm-new-status" type="text" class="form-control" placeholder="Nome do status…">
        <input type="color" id="crm-new-status-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text);white-space:nowrap">
          <input type="checkbox" id="crm-new-status-final"> Status final
        </label>
        <button class="btn-primary" id="crm-add-status">Adicionar</button>
      </div>
    </div>
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const u=document.getElementById("crm-new-stage").value.trim(),y=document.getElementById("crm-new-stage-color").value,g=parseInt(document.getElementById("crm-pipe-sel").value,10);u&&(await h.from("crm_stages").insert({pipeline_id:g,name:u,color:y,sort_order:99,tenant_id:M()}),document.getElementById("crm-new-stage").value="",await P())}),e.querySelectorAll(".stage-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await h.from("crm_stages").delete().eq("id",u.dataset.id),await P())})}),e.querySelectorAll(".stage-color-pick").forEach(u=>{u.addEventListener("change",async y=>{await h.from("crm_stages").update({color:y.target.value}).eq("id",u.dataset.sid);const g=u.closest(".stage-item").querySelector(".stage-color-dot");g&&(g.style.background=y.target.value)})});const p=async()=>{const u=document.getElementById("crm-new-tag"),y=document.getElementById("crm-new-tag-color"),g=u==null?void 0:u.value.trim(),E=(y==null?void 0:y.value)||"#6366F1";if(!g){u==null||u.focus();return}await h.from("crm_tags").insert({name:g,color:E,tenant_id:M()}),u&&(u.value=""),await P()};(b=document.getElementById("crm-add-tag"))==null||b.addEventListener("click",p),(x=document.getElementById("crm-new-tag"))==null||x.addEventListener("keydown",u=>{u.key==="Enter"&&p()}),e.querySelectorAll(".tm-del-btn").forEach(u=>{u.addEventListener("click",async()=>{confirm("Excluir esta tag? Os leads que a possuem não serão afetados.")&&(await h.from("crm_tags").delete().eq("id",u.dataset.id),await P())})}),e.querySelectorAll(".tm-name-input").forEach(u=>{const y=u.closest(".tm-row"),g=y==null?void 0:y.querySelector(".tm-save-btn");g&&(g.style.display="none"),u.addEventListener("input",()=>{const E=u.value.trim()!==u.dataset.orig;g&&(g.style.display=E?"":"none")})}),e.querySelectorAll(".tm-color-input").forEach(u=>{const y=u.closest(".tm-row"),g=y==null?void 0:y.querySelector(".tm-color-swatch"),E=y==null?void 0:y.querySelector(".tm-save-btn");u.addEventListener("input",I=>{g&&(g.style.background=I.target.value),E&&(E.style.display="")})}),e.querySelectorAll(".tm-save-btn").forEach(u=>{u.style.display="none",u.addEventListener("click",async()=>{var I,S;const y=u.closest(".tm-row"),g=(I=y.querySelector(".tm-name-input"))==null?void 0:I.value.trim(),E=(S=y.querySelector(".tm-color-input"))==null?void 0:S.value;g&&(u.disabled=!0,u.textContent="✓ Salvando…",await h.from("crm_tags").update({name:g,color:E}).eq("id",u.dataset.id),await P())})}),e.querySelectorAll(".tm-tpl-btn").forEach(u=>{u.addEventListener("click",async()=>{const y=u.dataset.name,g=u.dataset.color;u.disabled=!0,u.innerHTML="✓",await h.from("crm_tags").insert({name:y,color:g,tenant_id:M()}),await P()})}),e.querySelectorAll(".tag-chip-del").forEach(u=>{u.addEventListener("click",async()=>{await h.from("crm_tags").delete().eq("id",u.dataset.id),await P()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const u=document.getElementById("crm-new-status").value.trim(),y=document.getElementById("crm-new-status-color").value,g=document.getElementById("crm-new-status-final").checked;u&&(await h.from("crm_lead_statuses").insert({name:u,color:y,is_final:g,sort_order:99,tenant_id:M()}),document.getElementById("crm-new-status").value="",await P())}),e.querySelectorAll(".status-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover este status?")&&(await h.from("crm_lead_statuses").delete().eq("id",u.dataset.id),await P())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var g;const u=(g=prompt("Nome do novo funil:"))==null?void 0:g.trim();if(!u)return;const{error:y}=await h.from("crm_pipelines").insert({name:u,sort_order:99,tenant_id:M()});if(y){alert("Erro ao criar funil: "+y.message);return}tt=!1,await P()})}async function Yt(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await h.from("integrations").select("*"),n={};t==null||t.forEach(r=>{n[r.key]=r});const a=r=>{var s;return v(((s=n[r])==null?void 0:s.value)||"")},o=r=>{var s;return(s=n[r])!=null&&s.enabled?"checked":""},i=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],d=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${i.map(r=>`
        <div class="integration-row">
          <div class="integration-icon">${r.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${r.label}</div>
            <div class="integration-desc">${r.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${r.key}" ${o(r.key)}>
              <span class="toggle-slider"></span>
            </label>
            <input type="text" class="integration-value intg-val" data-key="${r.key}"
              value="${a(r.key)}" placeholder="${r.placeholder}">
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
      ${d.map(r=>`
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label">${r.label}</label>
          <input class="form-control smtp-field" data-key="${r.key}" value="${a(r.key)}" placeholder="${r.placeholder}">
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var m;const r=document.getElementById("intg-save-tracking");r.disabled=!0,r.textContent="Salvando…";let s=!0;const c=document.querySelectorAll(".intg-val"),l=document.querySelectorAll(".intg-toggle");for(let p=0;p<c.length;p++){const b=c[p].dataset.key,x=c[p].value.trim(),u=((m=l[p])==null?void 0:m.checked)??!1;await Ye(b,x,u)||(s=!1)}r.disabled=!1,r.textContent="Salvar Integrações",X(document.getElementById("intg-tracking-msg"),s)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const r=document.getElementById("intg-save-smtp");r.disabled=!0,r.textContent="Salvando…";const s=document.querySelectorAll(".smtp-field");let c=!0;for(const m of s)await Ye(m.dataset.key,m.value.trim(),!0)||(c=!1);const l=document.getElementById("smtp-pass").value;l&&(await Ye("smtp_pass",l,!0)||(c=!1)),r.disabled=!1,r.textContent="Salvar SMTP",X(document.getElementById("intg-smtp-msg"),c)})}async function Kt(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await it(),document.getElementById("media-file-input").addEventListener("change",async n=>{var s,c;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),i=document.getElementById("media-progress-fill"),d=document.getElementById("media-progress-text");o.style.display="";let r=0;for(const l of a){d.textContent=`Enviando ${r+1}/${a.length}…`,i.style.width=`${Math.round(r/a.length*100)}%`;try{const m=await gt(l,"media"),p=l.name.replace(/\.[^.]+$/,"").slice(0,60);await h.from("media_library").insert({name:p,url:m,type:"image",size:l.size,created_by:(c=(s=(await h.auth.getUser()).data)==null?void 0:s.user)==null?void 0:c.id})}catch(m){console.error("Media upload error:",m)}r++}i.style.width="100%",d.textContent=`✓ ${r} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",i.style.width="0"},2e3),await it(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function it(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await h.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${v(a.url)}">
      <img src="${v(a.url)}" alt="${v(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${v(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${v(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation(),(i=navigator.clipboard)==null||i.writeText(a.dataset.url).then(()=>{const d=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=d},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await h.from("media_library").delete().eq("id",a.dataset.id),await it())})})}async function Oa(){var t,n,a,o,i;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(s=>s.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(s=>s.classList.add("hidden")),d.classList.add("active");const r=e.querySelector(`#sa-panel-${d.dataset.tab}`);r&&r.classList.remove("hidden"),d.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&ie(),d.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&Ua(),d.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&Bt(),d.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&_t(),d.dataset.tab==="platform"&&Ct()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",Bt),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",ie),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",_t),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>Xa()),(i=e.querySelector("#sa-plat-save"))==null||i.addEventListener("click",Pa),ie(),Ct())}async function ie(){var r,s;const e=document.getElementById("sa-tenants-list"),t=((s=(r=document.getElementById("sa-tenant-search"))==null?void 0:r.value)==null?void 0:s.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=h.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const i=(a||[]).filter(c=>{var l,m;return!t||((l=c.name)==null?void 0:l.toLowerCase().includes(t))||((m=c.slug)==null?void 0:m.toLowerCase().includes(t))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const d=c=>c.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=i.map(c=>{var l;return`
    <div class="sa-list-row" data-action="open-panel" data-id="${c.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${c.logo_url?`<img class="sa-tenant-logo" src="${v(c.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${v(c.name||"—")}</div>
          <div class="sa-list-sub">${v(c.slug||"")} · ${v(((l=c.plans)==null?void 0:l.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${d(c)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${c.id}" data-active="${c.active}" title="${c.active?"Desativar":"Ativar"}">${c.active?"⏸️":"▶️"}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(c=>{c.addEventListener("click",async l=>{l.stopPropagation();const m=c.dataset.active==="true";await h.from("tenants").update({active:!m}).eq("id",c.dataset.id),ie()})}),e.querySelectorAll('[data-action="open-panel"]').forEach(c=>{c.addEventListener("click",()=>{const l=(i||[]).find(m=>String(m.id)===String(c.dataset.id));l&&Va(l)})})}async function Ua(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await h.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${v(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function Bt(){var r;const e=document.getElementById("sa-subs-list"),t=((r=document.getElementById("sa-sub-filter"))==null?void 0:r.value)||"";if(!e)return;e.dataset.loaded="1";let n=h.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const i={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},d={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(s=>{var c,l,m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${v(((c=s.tenants)==null?void 0:c.name)||"—")}</div>
          <div class="sa-list-sub">${v(((l=s.plans)==null?void 0:l.name)||"—")} · R$ ${Number(((m=s.plans)==null?void 0:m.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${i[s.status]||"gray"}">${d[s.status]||s.status}</span>
        <span class="sa-list-date">${s.current_period_end?new Date(s.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function _t(){var d,r;const e=document.getElementById("sa-users-list"),t=((r=(d=document.getElementById("sa-user-search"))==null?void 0:d.value)==null?void 0:r.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await h.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(s=>{var c,l;return!t||((c=s.name)==null?void 0:c.toLowerCase().includes(t))||((l=s.email)==null?void 0:l.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const i={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(s=>{var c;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(s.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${v(s.name||"—")}</div>
          <div class="sa-list-sub">${v(((c=s.tenants)==null?void 0:c.name)||"Sem imobiliária")} · ${i[s.role]||s.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${s.active!==!1?"sa-badge-green":"sa-badge-red"}">${s.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function Ct(){const[e,t,n,a]=await Promise.all([h.from("tenants").select("id",{count:"exact",head:!0}),h.from("profiles").select("id",{count:"exact",head:!0}),h.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),h.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(i,d)=>{const r=document.getElementById(i);r&&(r.textContent=d??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function Pa(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await xe([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),X(t,!0)}function Fa(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Xa(){var a,o,i,d,r,s;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
            <input id="nt-admin-password" class="form-input" type="password" placeholder="Mínimo 6 caracteres" style="padding-right:38px;">
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
  `,document.body.appendChild(t),h.from("plans").select("id, name").then(({data:c})=>{const l=document.getElementById("nt-plan");l&&c&&(l.innerHTML='<option value="">Sem plano</option>'+c.map(m=>`<option value="${m.id}">${v(m.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",c=>{const l=document.getElementById("nt-slug");l&&!l.dataset.manual&&(l.value=Fa(c.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",c=>{c.target.dataset.manual="1"}),(i=document.getElementById("nt-pwd-toggle"))==null||i.addEventListener("click",()=>{const c=document.getElementById("nt-admin-password");c.type=c.type==="password"?"text":"password"});const n=()=>t.remove();(d=document.getElementById("sa-modal-close-btn"))==null||d.addEventListener("click",n),(r=document.getElementById("nt-cancel"))==null||r.addEventListener("click",n),t.addEventListener("click",c=>{c.target===t&&n()}),(s=document.getElementById("nt-save"))==null||s.addEventListener("click",async()=>{var L,k,w,$,B,q,C,N,T,V,H,O;const c=(k=(L=document.getElementById("nt-name"))==null?void 0:L.value)==null?void 0:k.trim(),l=($=(w=document.getElementById("nt-slug"))==null?void 0:w.value)==null?void 0:$.trim(),m=(q=(B=document.getElementById("nt-domain"))==null?void 0:B.value)==null?void 0:q.trim(),p=(C=document.getElementById("nt-plan"))==null?void 0:C.value,b=(T=(N=document.getElementById("nt-admin-email"))==null?void 0:N.value)==null?void 0:T.trim(),x=(H=(V=document.getElementById("nt-admin-password"))==null?void 0:V.value)==null?void 0:H.trim(),u=document.getElementById("nt-msg"),y=document.getElementById("nt-save");if(!c||!l){u.textContent="❌ Nome e slug são obrigatórios.",u.style.color="#ef4444";return}if(!b){u.textContent="❌ Informe o e-mail do admin.",u.style.color="#ef4444";return}if(!x||x.length<6){u.textContent="❌ A senha precisa ter mínimo 6 caracteres.",u.style.color="#ef4444";return}y.disabled=!0,y.textContent="Criando…",u.textContent="⏳ Criando imobiliária…",u.style.color="#64748b";const{data:g,error:E}=await h.from("tenants").insert({name:c,slug:l,domain:m||null,plan_id:p||null,active:!0}).select();if(E){y.disabled=!1,y.textContent="Criar Imobiliária",u.textContent="❌ "+E.message,u.style.color="#ef4444";return}const I=(O=g==null?void 0:g[0])==null?void 0:O.id;u.textContent="⏳ Criando usuário admin…";const S=await pe({email:b,password:x,role:"admin",tenant_id:I});if(!(S!=null&&S.success)){y.disabled=!1,y.textContent="Criar Imobiliária",u.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+v((S==null?void 0:S.error)||"Desconhecido"),u.style.color="#f59e0b",setTimeout(()=>{n(),ie()},3e3);return}I&&(S!=null&&S.user_id)&&!(S!=null&&S.linked)&&await h.from("profiles").update({tenant_id:I}).eq("id",S.user_id),y.disabled=!1,y.textContent="Criar Imobiliária",S.email_sent===!1?(u.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${v(S.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${v(b)}</strong><br>
          Senha: <strong>${v(x)}</strong>
        </div>`,u.style.color="#0f172a"):(u.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",u.style.color="#22c55e",setTimeout(()=>{n(),ie()},1500))})}function Va(e){var a;(a=document.getElementById("tenant-panel"))==null||a.remove();const t=document.createElement("div");t.id="tenant-panel",t.style.cssText="position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;";const n=[{id:"properties",label:"🏠 Imóveis"},{id:"leads",label:"📋 Leads"},{id:"users",label:"👥 Corretores"},{id:"api",label:"🔗 Site & API"},{id:"config",label:"⚙️ Configurações"}];t.innerHTML=`
    <div style="background:#0a1628;padding:14px 24px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:10;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.3);">
      <button id="tp-back" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;padding:7px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">← Imobiliárias</button>
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
        ${e.logo_url?`<img src="${v(e.logo_url)}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0;">`:'<div style="width:36px;height:36px;background:rgba(255,255,255,.1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏢</div>'}
        <div style="min-width:0;">
          <div style="color:#fff;font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${v(e.name)}</div>
          <div style="color:#94a3b8;font-size:12px;">${v(e.slug||"")} · ${e.active!==!1?'<span style="color:#4ade80;">● Ativo</span>':'<span style="color:#f87171;">● Inativo</span>'}</div>
        </div>
      </div>
      <button id="tp-edit-btn" style="background:#c9a84c;border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">✏️ Editar dados</button>
    </div>
    <div style="background:#fff;border-bottom:2px solid #e2e8f0;padding:0 24px;display:flex;gap:0;flex-shrink:0;overflow-x:auto;">
      ${n.map((o,i)=>`<button class="tp-tab" data-tab="${o.id}" style="padding:14px 20px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:${i===0?"700":"500"};color:${i===0?"#2563eb":"#64748b"};border-bottom:2px solid ${i===0?"#2563eb":"transparent"};margin-bottom:-2px;white-space:nowrap;transition:all .15s;">${o.label}</button>`).join("")}
    </div>
    <div id="tp-content" style="padding:24px;flex:1;max-width:1200px;margin:0 auto;width:100%;box-sizing:border-box;"></div>
  `,document.body.appendChild(t),document.getElementById("tp-back").addEventListener("click",()=>t.remove()),document.getElementById("tp-edit-btn").addEventListener("click",()=>Qt(e)),t.querySelectorAll(".tp-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".tp-tab").forEach(i=>{i.style.fontWeight="500",i.style.color="#64748b",i.style.borderBottomColor="transparent"}),o.style.fontWeight="700",o.style.color="#2563eb",o.style.borderBottomColor="#2563eb",st(e,o.dataset.tab)})}),st(e,"properties")}function Ga(e,t){const n=document.getElementById("tp-prop-edit-modal");n&&n.remove();const a=document.createElement("div");a.id="tp-prop-edit-modal",a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;";const o=(r,s,c,l="text",m="")=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${s}</label>
      <input id="${r}" type="${l}" value="${v(String(c||""))}" ${m}
        style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;outline:none;">
    </div>`,i=(r,s,c,l)=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${s}</label>
      <select id="${r}" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;background:#fff;">
        ${c.map(([m,p])=>`<option value="${m}"${l===m?" selected":""}>${p}</option>`).join("")}
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
          <textarea id="tpe-description" rows="4" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;resize:vertical;font-family:inherit;">${v(e.description||"")}</textarea>
        </div>
        <div id="tpe-msg" style="grid-column:span 2;font-size:13px;min-height:16px;"></div>
      </div>
      <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;justify-content:flex-end;flex-shrink:0;">
        <button id="tpe-cancel" style="background:#f1f5f9;color:#475569;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">Cancelar</button>
        <button id="tpe-save" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 24px;cursor:pointer;font-size:14px;font-weight:700;">💾 Salvar</button>
      </div>
    </div>`,document.body.appendChild(a);const d=()=>a.remove();document.getElementById("tpe-close").addEventListener("click",d),document.getElementById("tpe-cancel").addEventListener("click",d),a.addEventListener("click",r=>{r.target===a&&d()}),document.getElementById("tpe-save").addEventListener("click",async()=>{const r=document.getElementById("tpe-save"),s=document.getElementById("tpe-msg"),c=document.getElementById("tpe-title").value.trim();if(!c){s.style.color="#ef4444",s.textContent="Título é obrigatório.";return}r.disabled=!0,r.textContent="Salvando…";const l={title:c,price:document.getElementById("tpe-price").value.trim()||null,area:document.getElementById("tpe-area").value.trim()||null,bedrooms:document.getElementById("tpe-bedrooms").value||null,suites:document.getElementById("tpe-suites").value||null,parking:document.getElementById("tpe-parking").value||null,reference:document.getElementById("tpe-reference").value.trim()||null,city:document.getElementById("tpe-city").value.trim()||null,neighborhood:document.getElementById("tpe-neighborhood").value.trim()||null,rua:document.getElementById("tpe-rua").value.trim()||null,numero:document.getElementById("tpe-numero").value.trim()||null,construction_status:document.getElementById("tpe-construction").value||null,published:document.getElementById("tpe-published").value==="true",description:document.getElementById("tpe-description").value.trim()||null},{error:m}=await h.from("properties").update(l).eq("id",e.id);if(m){s.style.color="#ef4444",s.textContent="Erro: "+m.message,r.disabled=!1,r.textContent="💾 Salvar";return}s.style.color="#16a34a",s.textContent="✅ Salvo!",setTimeout(()=>{d(),typeof t=="function"&&t()},800)})}async function st(e,t){var i,d,r,s,c;const n=document.getElementById("tp-content");if(!n)return;n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>';const a=()=>st(e,t),o=(l,m)=>`background:${l};color:${m};border:none;border-radius:6px;padding:5px 12px;cursor:pointer;font-size:12px;font-weight:600;white-space:nowrap;`;if(t==="properties"){const{data:l}=await h.from("properties").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1});if(!(l!=null&&l.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>';return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${l.length} imóvel(is)</h3>
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
          <tbody id="tp-prop-tbody">${l.map(m=>{var p;return`
            <tr data-pid="${m.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  ${(p=m.images)!=null&&p[0]?`<img src="${m.images[0]}" style="width:52px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;">`:'<div style="width:52px;height:38px;background:#e2e8f0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>'}
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${v(m.title||"")}</div><div style="font-size:11px;color:#94a3b8;">${v(m.reference||"")}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${v([m.neighborhood,m.city].filter(Boolean).join(", "))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">${v(Ae(m.price,"pt"))}</td>
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
      </div>`,n.querySelectorAll(".tp-prop-edit").forEach(m=>{m.addEventListener("click",()=>{const p=Number(m.dataset.pid),b=l.find(x=>x.id===p);b&&Ga(b,a)})}),n.querySelectorAll(".tp-prop-toggle").forEach(m=>{m.addEventListener("click",async()=>{const p=Number(m.dataset.pid),b=m.dataset.pub==="1";m.disabled=!0,m.textContent="…",await h.from("properties").update({published:!b}).eq("id",p),a()})}),n.querySelectorAll(".tp-prop-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Excluir este imóvel permanentemente?")&&(m.disabled=!0,m.textContent="…",await h.from("properties").delete().eq("id",Number(m.dataset.pid)),a())})})}if(t==="leads"){const{data:l}=await h.from("leads").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}).limit(200);if(!(l!=null&&l.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">📋</div><p style="font-size:14px;">Nenhum lead ainda.</p></div>';return}const m=p=>({novo:"#dbeafe,#1d4ed8",contato:"#fef3c7,#92400e",proposta:"#ede9fe,#6d28d9",fechado:"#dcfce7,#15803d"})[p]||"#f1f5f9,#64748b";n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${l.length} lead(s)</h3>
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
          <tbody>${l.map(p=>{const[b,x]=m(p.stage||p.status||"").split(","),u=(p.phone||"").replace(/\D/g,"");return`<tr data-lid="${p.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${v(p.name||"")}</td>
              <td style="padding:12px 16px;">
                <div style="font-size:13px;color:#475569;">${v(p.phone||"—")}</div>
                <div style="font-size:11px;color:#94a3b8;">${v(p.email||"")}</div>
              </td>
              <td style="padding:12px 16px;"><span style="background:${b};color:${x};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${v(p.stage||p.status||"Novo")}</span></td>
              <td style="padding:12px 16px;font-size:12px;color:#94a3b8;">${new Date(p.created_at).toLocaleDateString("pt-BR")}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;align-items:center;">
                  ${u?`<a href="https://wa.me/${u}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;" title="WhatsApp"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg></a>`:""}
                  <button class="tp-lead-del" data-lid="${p.id}" style="${o("#fee2e2","#dc2626")}">Excluir</button>
                </div>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`,n.querySelectorAll(".tp-lead-del").forEach(p=>{p.addEventListener("click",async()=>{confirm("Excluir este lead permanentemente?")&&(p.disabled=!0,p.textContent="…",await h.from("leads").delete().eq("id",p.dataset.lid),a())})})}if(t==="users"){const{data:l}=await h.from("profiles").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}),m='<button id="tp-add-corretor" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;font-weight:600;">+ Adicionar Usuário</button>';if(!(l!=null&&l.length)){n.innerHTML=`<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">👥</div><p style="font-size:14px;margin-bottom:16px;">Nenhum corretor cadastrado ainda.</p>${m}</div>`,(i=n.querySelector("#tp-add-corretor"))==null||i.addEventListener("click",()=>et(e.id,a));return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${l.length} usuário(s)</h3>
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
          <tbody>${l.map(p=>`
            <tr data-uid="${p.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${v(p.name||p.email||"—")}</div><div style="font-size:11px;color:#94a3b8;">${v(p.email||"")}</div></td>
              <td style="padding:12px 16px;">
                <select class="tp-role-sel" data-uid="${p.id}" style="border:1px solid #e2e8f0;border-radius:6px;padding:4px 8px;font-size:13px;color:#0f172a;background:#fff;cursor:pointer;">
                  <option value="admin" ${p.role==="admin"?"selected":""}>Admin</option>
                  <option value="corretor" ${p.role==="corretor"?"selected":""}>Corretor</option>
                </select>
              </td>
              <td style="padding:12px 16px;text-align:center;">${p.active!==!1?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Ativo</span>':'<span style="background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Pausado</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-user-toggle" data-uid="${p.id}" data-active="${p.active!==!1?"1":"0"}" style="${o(p.active!==!1?"#fef3c7":"#dcfce7",p.active!==!1?"#92400e":"#15803d")}">${p.active!==!1?"Pausar":"Ativar"}</button>
                  <button class="tp-user-del" data-uid="${p.id}" style="${o("#fee2e2","#dc2626")}">Remover</button>
                </div>
              </td>
            </tr>`).join("")}
          </tbody>
        </table></div>
      </div>`,(d=n.querySelector("#tp-add-corretor"))==null||d.addEventListener("click",()=>et(e.id,a)),n.querySelectorAll(".tp-role-sel").forEach(p=>{p.addEventListener("change",async()=>{const b=p.dataset.uid;p.disabled=!0,await h.from("profiles").update({role:p.value}).eq("id",b),p.disabled=!1})}),n.querySelectorAll(".tp-user-toggle").forEach(p=>{p.addEventListener("click",async()=>{const b=p.dataset.uid,x=p.dataset.active==="1";p.disabled=!0,p.textContent="…",await h.from("profiles").update({active:!x}).eq("id",b),a()})}),n.querySelectorAll(".tp-user-del").forEach(p=>{p.addEventListener("click",async()=>{confirm("Remover este usuário da imobiliária? O acesso ao sistema será excluído permanentemente.")&&(p.disabled=!0,p.textContent="…",await pe({action:"delete",userId:p.dataset.uid}),a())})})}if(t==="api"){const l="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api",m=(e.domain||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim(),p=m?`https://${m}`:`https://omarcorretor.com.br/demo.html?key=${e.id}`,b=m?"🌐 Site da Imobiliária":"🌐 Site Demonstração",x=m?"Site oficial da imobiliária integrado ao CRM.":"Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.",u=m?"Abrir site →":"Abrir site demo →";n.innerHTML=`
      <div style="display:grid;gap:20px;max-width:800px;">
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🔑 Chave de API</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Use para conectar qualquer site externo ao CRM desta imobiliária.</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <input type="text" value="${v(e.id)}" readonly style="flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:monospace;font-size:13px;background:#f8fafc;min-width:0;">
            <button id="tp-copy-key" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">${b}</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">${x}</p>
          <a href="${v(p)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">${u}</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${v(p)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${l}/properties?key=${v(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${l}/properties/{id}?key=${v(e.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${l}/leads?key=${v(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${l}/settings?key=${v(e.id)}</div>
          </div>
        </div>
      </div>`,(r=document.getElementById("tp-copy-key"))==null||r.addEventListener("click",()=>{var E;(E=navigator.clipboard)==null||E.writeText(e.id);const y=document.getElementById("tp-copy-key"),g=y.textContent;y.textContent="✅ Copiada!",setTimeout(()=>{y.textContent=g},2e3)})}if(t==="config"){const{data:l}=await h.from("settings").select("key,value").eq("tenant_id",e.id),m={};l==null||l.forEach(b=>{m[b.key]=b.value});const p=(b,x)=>`
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${b}</div>
        <div style="font-size:14px;color:#0f172a;">${v(String(x||"—"))}</div>
      </div>`;n.innerHTML=`
      <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);max-width:560px;">
        <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 20px;">⚙️ Configurações da imobiliária</h3>
        ${p("NOME DA EMPRESA",m["company.name"]||e.name)}
        ${p("TELEFONE",m["company.phone"])}
        ${p("E-MAIL",m["company.email"])}
        ${p("WHATSAPP",m["company.whatsapp"])}
        ${p("CIDADE",m["company.city"])}
        ${p("DOMÍNIO DO SITE",e.domain)}
        ${p("PLANO",((s=e.plans)==null?void 0:s.name)||"Sem plano")}
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
          <button id="tp-open-edit" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">✏️ Editar dados completos</button>
        </div>
      </div>`,(c=document.getElementById("tp-open-edit"))==null||c.addEventListener("click",()=>Qt(e))}}function Qt(e){var c,l,m,p,b,x,u,y;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
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
            ${e.logo_url?`<img src="${v(e.logo_url)}" style="width:100%;height:100%;object-fit:cover;">`:'<span style="font-size:28px;">🏢</span>'}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · 256×256px</div>
          </div>
        </div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${v(e.name||"")}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${v(e.slug||"")}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${v(e.domain||"")}" placeholder="abc.imobipro.com.br"></div>
        <div class="form-group"><label>Plano</label>
          <select id="et-plan" class="form-input"><option value="">Sem plano</option></select>
        </div>
        <div style="height:1px;background:#e2e8f0;"></div>
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;">Criar / Trocar Admin</div>
        <p style="font-size:12px;color:#64748b;margin:0;">Opcional: cria um novo acesso de administrador.</p>
        <div class="form-group"><label>E-mail do Admin</label><input id="et-admin-email" class="form-input" type="email" placeholder="admin@imobiliaria.com.br"></div>
        <div class="form-group"><label>Senha</label>
          <div style="position:relative;">
            <input id="et-admin-password" class="form-input" type="password" placeholder="Mínimo 6 caracteres" style="padding-right:38px;">
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
            <input id="et-api-key" class="form-input" type="text" value="${v(e.id||"")}" readonly
              style="font-family:monospace;font-size:11px;background:#fff;color:#1e3a5f;flex:1;letter-spacing:.02em;">
            <button id="et-copy-key" class="btn-secondary-sm" style="white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Endpoints disponíveis</div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([g,E,I])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${g==="GET"?"#dcfce7":"#fef9c3"};color:${g==="GET"?"#15803d":"#854d0e"};">${g}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${E}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${I}</div>
            </div>`).join("")}
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Exemplo rápido (JavaScript)</div>
        <pre style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;font-size:11px;overflow-x:auto;margin:0;line-height:1.6;"><code>const KEY = '${v(e.id)}'
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
  `,document.body.appendChild(n),h.from("plans").select("id, name").then(({data:g})=>{const E=document.getElementById("et-plan");E&&g&&(E.innerHTML='<option value="">Sem plano</option>'+g.map(I=>`<option value="${I.id}"${String(I.id)===String(e.plan_id)?" selected":""}>${v(I.name)}</option>`).join(""))}),(c=document.getElementById("et-logo-input"))==null||c.addEventListener("change",g=>{const E=g.target.files[0];if(!E)return;const I=URL.createObjectURL(E),S=document.getElementById("et-logo-preview");S&&(S.innerHTML=`<img src="${I}" style="width:100%;height:100%;object-fit:cover;">`)}),(l=document.getElementById("et-logo-preview"))==null||l.addEventListener("click",()=>{var g;(g=document.getElementById("et-logo-input"))==null||g.click()}),(m=document.getElementById("et-pwd-toggle"))==null||m.addEventListener("click",()=>{const g=document.getElementById("et-admin-password");g.type=g.type==="password"?"text":"password"}),(p=document.getElementById("et-copy-key"))==null||p.addEventListener("click",()=>{var S,L;const g=(S=document.getElementById("et-api-key"))==null?void 0:S.value;if(!g)return;(L=navigator.clipboard)==null||L.writeText(g);const E=document.getElementById("et-copy-key"),I=E.textContent;E.textContent="✅ Copiada!",setTimeout(()=>{E.textContent=I},2e3)});const o=["dados","config","api"];function i(g){o.forEach(E=>{document.getElementById(`et-pane-${E}`).style.display=E===g?"":"none";const I=document.getElementById(`et-tab-${E}`);I.style.borderBottomColor=E===g?"#2563eb":"transparent",I.style.color=E===g?"#2563eb":"#64748b",I.style.fontWeight=E===g?"600":"500"}),g==="config"&&r()}o.forEach(g=>{var E;return(E=document.getElementById(`et-tab-${g}`))==null?void 0:E.addEventListener("click",()=>i(g))});let d=!1;async function r(){var I;if(d)return;d=!0;const{data:g}=await h.from("settings").select("key,value").eq("tenant_id",e.id),E={};g==null||g.forEach(S=>{E[S.key]=S.value}),document.getElementById("et-pane-config").innerHTML=`
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${v(E["company.whatsapp"]||"")}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${v(E["company.phone"]||"")}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${v(E["company.email"]||"")}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${v(E["company.city"]||E["company.address"]||"")}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${v(E["company.slogan"]||"")}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `,(I=document.getElementById("et-cfg-save"))==null||I.addEventListener("click",async()=>{const S=document.getElementById("et-cfg-save"),L=document.getElementById("et-cfg-msg");S.disabled=!0,S.textContent="Salvando…",L.textContent="",L.style.color="#64748b";const k=document.getElementById("et-cfg-wa").value.trim().replace(/\D/g,""),w=document.getElementById("et-cfg-phone").value.trim(),$=document.getElementById("et-cfg-email").value.trim(),B=document.getElementById("et-cfg-city").value.trim(),q=document.getElementById("et-cfg-slogan").value.trim(),{error:C}=await h.from("settings").upsert([{key:"company.whatsapp",value:k,tenant_id:e.id},{key:"company.phone",value:w,tenant_id:e.id},{key:"company.email",value:$,tenant_id:e.id},{key:"company.city",value:B,tenant_id:e.id},{key:"company.address",value:B,tenant_id:e.id},{key:"company.slogan",value:q,tenant_id:e.id}],{onConflict:"tenant_id,key"});S.disabled=!1,S.textContent="💾 Salvar configurações",C?(L.textContent="❌ "+C.message,L.style.color="#ef4444"):(L.textContent="✅ Configurações salvas!",L.style.color="#22c55e")})}const s=()=>n.remove();(b=document.getElementById("et-close"))==null||b.addEventListener("click",s),(x=document.getElementById("et-cancel"))==null||x.addEventListener("click",s),n.addEventListener("click",g=>{g.target===n&&s()}),(u=document.getElementById("et-delete"))==null||u.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const E=document.getElementById("et-delete");E.disabled=!0,E.textContent="Excluindo…";const{error:I}=await h.from("tenants").delete().eq("id",e.id);if(I){alert("Erro ao excluir: "+I.message),E.disabled=!1,E.textContent="🗑️ Excluir";return}s(),ie()}),(y=document.getElementById("et-save"))==null||y.addEventListener("click",async()=>{var N,T,V,H,O,ae,se,$e,ke,U,ve,vt;const g=(T=(N=document.getElementById("et-name"))==null?void 0:N.value)==null?void 0:T.trim(),E=(H=(V=document.getElementById("et-slug"))==null?void 0:V.value)==null?void 0:H.trim(),I=(ae=(O=document.getElementById("et-domain"))==null?void 0:O.value)==null?void 0:ae.trim(),S=(se=document.getElementById("et-plan"))==null?void 0:se.value,L=(ke=($e=document.getElementById("et-admin-email"))==null?void 0:$e.value)==null?void 0:ke.trim(),k=(ve=(U=document.getElementById("et-admin-password"))==null?void 0:U.value)==null?void 0:ve.trim(),w=(vt=document.getElementById("et-logo-input"))==null?void 0:vt.files[0],$=document.getElementById("et-msg"),B=document.getElementById("et-save");if(!g){$.textContent="❌ Nome é obrigatório.",$.style.color="#ef4444";return}B.disabled=!0,B.textContent="Salvando…",$.textContent="⏳ Salvando…",$.style.color="#64748b";let q=e.logo_url;if(w)try{const A=await Me(w,256,.85),ft=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:na}=await h.storage.from("imoveis").upload(ft,A,{contentType:"image/jpeg",upsert:!0});if(!na){const{data:{publicUrl:oa}}=h.storage.from("imoveis").getPublicUrl(ft);q=oa}}catch(A){console.error("Logo upload:",A)}const{error:C}=await h.from("tenants").update({name:g,slug:E||e.slug,domain:I||null,plan_id:S||null,logo_url:q}).eq("id",e.id);if(C){B.disabled=!1,B.textContent="Salvar",$.textContent="❌ "+C.message,$.style.color="#ef4444";return}if(L&&k&&k.length>=6){$.textContent="⏳ Criando usuário admin…";const A=await pe({email:L,password:k,role:"admin",tenant_id:e.id});A!=null&&A.success?(A!=null&&A.user_id&&!(A!=null&&A.linked)&&await h.from("profiles").update({tenant_id:e.id}).eq("id",A.user_id),$.textContent="✅ Salvo e admin criado!",$.style.color="#22c55e"):($.textContent="⚠️ Salvo, mas erro ao criar admin: "+((A==null?void 0:A.error)||"Tente novamente"),$.style.color="#f59e0b")}else $.textContent="✅ Imobiliária atualizada!",$.style.color="#22c55e";B.disabled=!1,B.textContent="Salvar",setTimeout(()=>{s(),ie()},1200)})}const qt=[{key:"name",label:"Nome",required:!0},{key:"phone",label:"Telefone",required:!1},{key:"email",label:"E-mail",required:!1},{key:"notes",label:"Notas",required:!1}];let Je=[],ge=[],He={};function Wa(){var e;(e=document.getElementById("btn-import-leads"))==null||e.addEventListener("click",Ja)}function Ja(){Je=[],ge=[],He={};const e=document.createElement("div");e.id="import-leads-overlay",e.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9000;display:flex;align-items:center;justify-content:center;",e.innerHTML=`
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
    </div>`,document.body.appendChild(e),Zt();const t=document.getElementById("import-drop-zone"),n=document.getElementById("import-file-input");function a(i){i.preventDefault()}document.addEventListener("dragover",a),document.addEventListener("drop",a),t.addEventListener("click",()=>n.click()),t.addEventListener("dragenter",i=>{i.preventDefault(),t.style.borderColor="#3b82f6",t.style.background="#eff6ff"}),t.addEventListener("dragover",i=>{i.preventDefault(),t.style.borderColor="#3b82f6",t.style.background="#eff6ff"}),t.addEventListener("dragleave",i=>{t.contains(i.relatedTarget)||(t.style.borderColor="#c7d2e0",t.style.background="")}),t.addEventListener("drop",i=>{var r,s;i.preventDefault(),t.style.borderColor="#c7d2e0",t.style.background="";const d=(s=(r=i.dataTransfer)==null?void 0:r.files)==null?void 0:s[0];d&&Tt(d)}),n.addEventListener("change",i=>{var r;const d=(r=i.target.files)==null?void 0:r[0];d&&Tt(d),i.target.value=""});const o=new MutationObserver(()=>{document.getElementById("import-leads-overlay")||(document.removeEventListener("dragover",a),document.removeEventListener("drop",a),o.disconnect())});o.observe(document.body,{childList:!0})}async function Zt(){const e=document.getElementById("import-stage-sel");if(!e)return;const t=await getTenantId(),{data:n}=await h.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("position");n&&n.length?(e.innerHTML=n.map(a=>`<option value="${a.id}">${v(a.name)}</option>`).join(""),n[0].id,e.onchange=()=>{e.value}):e.innerHTML='<option value="">— sem etapas cadastradas —</option>'}function Tt(e){if(!e)return;const t=document.getElementById("import-file-status"),n=document.getElementById("import-upload-error");n.style.display="none";const a=e.name.toLowerCase();if(t.textContent=`📄 ${e.name} (${(e.size/1024).toFixed(1)} KB)`,a.endsWith(".csv")){const o=new FileReader;o.onload=i=>{const d=Ya(i.target.result);if(d.error){n.textContent=d.error,n.style.display="";return}ge=d.headers,Je=d.rows,ea()},o.readAsText(e,"UTF-8")}else if(a.endsWith(".xlsx")||a.endsWith(".xls")){const o=new FileReader;o.onload=i=>Ka(i.target.result),o.readAsArrayBuffer(e)}else n.textContent="Formato não suportado. Use CSV ou XLSX.",n.style.display=""}function Ya(e){const t=e.split(`
`)[0]||"",n=t.split(";").length>t.split(",").length?";":",",a=e.split(`
`).map(r=>r.trimEnd()).filter(r=>r.length);if(a.length<2)return{error:"Arquivo vazio ou sem dados."};function o(r){const s=[];let c="",l=!1;for(let m=0;m<r.length;m++){const p=r[m];p==='"'?l&&r[m+1]==='"'?(c+='"',m++):l=!l:p===n&&!l?(s.push(c.trim()),c=""):c+=p}return s.push(c.trim()),s}const i=o(a[0]).map(r=>r.replace(/^["']+|["']+$/g,"")),d=a.slice(1).map(o);return{headers:i,rows:d}}async function Ka(e){const t=document.getElementById("import-upload-error");try{window.XLSX||await new Promise((i,d)=>{const r=document.createElement("script");r.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",r.onload=i,r.onerror=d,document.head.appendChild(r)});const n=window.XLSX.read(e,{type:"array"}),a=n.Sheets[n.SheetNames[0]],o=window.XLSX.utils.sheet_to_json(a,{header:1,defval:""});if(!o||o.length<2){t.textContent="Planilha vazia.",t.style.display="";return}ge=o[0].map(String),Je=o.slice(1),ea()}catch(n){t.textContent="Erro ao ler o arquivo Excel: "+n.message,t.style.display=""}}function Qa(e,t){for(let n=0;n<e.length;n++){const a=e[n].toLowerCase();if(t.some(o=>a.includes(o)))return n}return""}function ea(){document.getElementById("import-step-upload").style.display="none",document.getElementById("import-step-map").style.display="";const e=document.getElementById("import-field-rows"),t={name:["nome","name","contact","cliente","contato"],phone:["tel","fone","celular","whatsapp","phone","mobile"],email:["email","e-mail","mail"],notes:["obs","nota","note","comment","coment","descri"]},n='<option value="">— ignorar —</option>'+ge.map((a,o)=>`<option value="${o}">${v(a)}</option>`).join("");e.innerHTML=qt.map(a=>{const o=Qa(ge,t[a.key]||[]);return He[a.key]=o!==""?parseInt(o):"",`
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;">
        <label style="font-size:.87rem;color:#374151;font-weight:500;">${a.label}${a.required?' <span style="color:#ef4444">*</span>':""}</label>
        <select id="import-map-${a.key}" onchange="importMapping['${a.key}']=this.value===''?'':parseInt(this.value)"
                style="padding:7px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:.87rem;">
          ${n}
        </select>
      </div>`}).join(""),qt.forEach(a=>{const o=document.getElementById(`import-map-${a.key}`);o&&He[a.key]!==""&&(o.value=He[a.key])}),Za(),Zt()}function Za(){const e=document.getElementById("import-preview-wrap");if(!e)return;const t=Je.slice(0,5);if(!t.length){e.innerHTML='<p style="padding:10px;color:#94a3b8;font-size:.8rem;">Sem dados</p>';return}const n=`<tr>${ge.map(o=>`<th style="padding:6px 10px;background:#f1f5f9;font-size:.78rem;white-space:nowrap;border:1px solid #e2e8f0;">${v(o)}</th>`).join("")}</tr>`,a=t.map(o=>`<tr>${ge.map((i,d)=>`<td style="padding:5px 10px;font-size:.78rem;border:1px solid #e2e8f0;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis;">${v(String(o[d]??""))}</td>`).join("")}</tr>`).join("");e.innerHTML=`<table style="border-collapse:collapse;min-width:100%;">${n}${a}</table>`}function en(){return window.Chart?Promise.resolve():new Promise((e,t)=>{const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}function tn(e,t,n){const a=e.querySelector("#ldp-tag-badge-area"),o=e.querySelector("#ldp-tag-add-btn"),i=e.querySelector("#ldp-tag-dropdown"),d=e.querySelector("#ldp-tag-search"),r=e.querySelector("#ldp-tag-opt-list"),s=e.querySelector("#ldp-tag-show-create"),c=e.querySelector("#ldp-tag-create-row"),l=e.querySelector("#ldp-tag-new-name"),m=e.querySelector("#ldp-tag-new-color"),p=e.querySelector("#ldp-tag-create-btn");if(!a||!o||!i)return;function b(){return[...a.querySelectorAll(".ldp-tag-badge[data-tag]")].map(I=>I.dataset.tag)}function x(I){if(!I.length){a.innerHTML='<span class="ldp-tag-empty">Nenhuma tag — clique em + para adicionar</span>';return}a.innerHTML=I.map(S=>{const k=(n[S]||{}).color||"#6366F1";return`<span class="ldp-tag-badge" data-tag="${v(S)}" style="background:${k}18;color:${k};border-color:${k}55;">
        ${v(S)}<span class="ldp-tag-rm" data-tag="${v(S)}">×</span>
      </span>`}).join("")}function u(I=""){const S=b(),L=I.toLowerCase().trim(),k=t.filter(w=>!L||w.name.toLowerCase().includes(L));if(!k.length){r.innerHTML='<div class="ldp-tag-opt-empty">Nenhuma tag encontrada</div>';return}r.innerHTML=k.map(w=>{const $=S.includes(w.name);return`<div class="ldp-tag-opt${$?" active":""}" data-tag="${v(w.name)}" style="--tc:${w.color}">
        <span class="ldp-tag-opt-dot" style="background:${w.color}"></span>
        <span class="ldp-tag-opt-name">${v(w.name)}</span>
        ${$?'<span class="ldp-tag-opt-check">✓</span>':""}
      </div>`}).join("")}function y(){i.classList.remove("hidden"),u(""),d.value="",c.classList.add("hidden"),d.focus()}function g(){i.classList.add("hidden")}o.addEventListener("click",I=>{I.stopPropagation(),i.classList.contains("hidden")?y():g()}),document.addEventListener("mousedown",function I(S){e.contains(S.target)||(g(),document.removeEventListener("mousedown",I))}),i.addEventListener("mousedown",I=>I.stopPropagation()),d.addEventListener("input",()=>u(d.value)),r.addEventListener("click",I=>{const S=I.target.closest(".ldp-tag-opt");if(!S)return;const L=S.dataset.tag,k=b();k.includes(L)?x(k.filter(w=>w!==L)):x([...k,L]),u(d.value)}),a.addEventListener("click",I=>{const S=I.target.closest(".ldp-tag-rm");if(!S)return;const L=S.dataset.tag;x(b().filter(k=>k!==L))}),s.addEventListener("click",()=>{c.classList.toggle("hidden"),c.classList.contains("hidden")||l.focus()});async function E(){const I=l.value.trim();if(!I){l.focus();return}const S=m.value||"#6366F1";if(t.some(L=>L.name.toLowerCase()===I.toLowerCase())){l.style.borderColor="#ef4444",setTimeout(()=>{l.style.borderColor=""},1500);return}p.disabled=!0,p.textContent="Criando…";try{const{data:L,error:k}=await h.from("crm_tags").insert({name:I,color:S,tenant_id:f==null?void 0:f.tenant_id}).select().single();if(k)throw k;const w={id:L.id,name:L.name,color:L.color};t.push(w),n[w.name]=w,typeof ce<"u"&&(ce[w.name]=w),x([...b(),w.name]),u(d.value),l.value="",m.value="#6366F1",c.classList.add("hidden")}catch(L){console.error("Error creating tag:",L),alert("Erro ao criar tag: "+(L.message||L))}finally{p.disabled=!1,p.textContent="Criar e adicionar"}}p.addEventListener("click",E),l.addEventListener("keydown",I=>{I.key==="Enter"&&E()})}async function an(){var y;const e=document.getElementById("section-dashboard");if(!e)return;e.dataset.dbInit==="1"&&(window._dbLeadsChartInstance&&(window.window._dbLeadsChartInstance.destroy(),window._dbLeadsChartInstance=null),window._dbOriginChartInstance&&(window.window._dbOriginChartInstance.destroy(),window._dbOriginChartInstance=null)),e.dataset.dbInit="1",e.innerHTML=`
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
    ${["db-kpi-indigo","db-kpi-emerald","db-kpi-amber","db-kpi-sky"].map((g,E)=>`
    <div class="db-kpi ${g}" id="db-kpi-${E}">
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

</div>`;const n=new Date,a=n.getHours(),o=a<12?"Bom dia":a<18?"Boa tarde":"Boa noite",i=["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],d=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],r=`${i[n.getDay()]}, ${n.getDate()} de ${d[n.getMonth()]} de ${n.getFullYear()}`,s=((y=f==null?void 0:f.name)==null?void 0:y.split(" ")[0])||"Corretor",c=e.querySelector(".db-greeting");c&&(c.innerHTML=`${o}, <span class="db-greeting-name">${z(s)}</span> 👋`);const l=document.getElementById("db-subline");l&&(l.textContent=`Aqui está o resumo do seu negócio — ${r}`);let m=[],p=[];try{const[g,E]=await Promise.all([Nt(),nn()]);m=g||[],p=E||[]}catch(g){console.warn("[Dashboard] Erro ao carregar dados:",g)}on(m,p,n);const b=m.filter(g=>g.published).length,x=p.filter(g=>dt(g.created_at)===dt(n.toISOString())).length,u=document.getElementById("db-header-chips");u&&(u.innerHTML=`
    <span class="db-chip db-chip-green">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      ${b} publicados
    </span>
    <span class="db-chip db-chip-blue">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      ${x} lead${x!==1?"s":""} hoje
    </span>
    <span class="db-chip db-chip-gold">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      ${r.split(",")[0]}
    </span>`),dn(p,m),ln(m),rn(m,p,n),cn(m,p);try{await en(),At(p,7),sn(p),document.querySelectorAll(".db-ptab").forEach(g=>{g.addEventListener("click",()=>{document.querySelectorAll(".db-ptab").forEach(E=>E.classList.remove("active")),g.classList.add("active"),At(p,parseInt(g.dataset.p))})})}catch(g){console.warn("[Dashboard] Chart.js não carregou:",g)}window.lucide&&lucide.createIcons()}function z(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function dt(e){return(e||"").slice(0,10)}function ta(e,t){if(!e)return"—";const n=t-new Date(e),a=Math.floor(n/6e4);if(a<2)return"agora mesmo";if(a<60)return`há ${a}min`;const o=Math.floor(a/60);if(o<24)return`há ${o}h`;const i=Math.floor(o/24);return i===1?"ontem":i<7?`há ${i} dias`:new Date(e).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}function aa(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(0)+"k":String(e)}async function nn(){let e=h.from("leads").select("*").order("created_at",{ascending:!1}).limit(500);(f==null?void 0:f.role)==="corretor"?e=e.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(e=e.eq("tenant_id",f.tenant_id));const{data:t,error:n}=await e;return n?(console.warn("[Dashboard] leads fetch error:",n.message),[]):t||[]}function on(e,t,n){const a=e.length,o=e.filter(u=>u.published).length,i=t.length,d=t.filter(u=>u.stage&&u.stage!=="perdido"&&u.stage!=="fechado").length,r=new Date(n);r.setDate(r.getDate()-30);const s=new Date(n);s.setDate(s.getDate()-60);const c=e.filter(u=>u.created_at&&new Date(u.created_at)>=r).length,l=e.filter(u=>u.created_at&&new Date(u.created_at)>=s&&new Date(u.created_at)<r).length,m=t.filter(u=>u.created_at&&new Date(u.created_at)>=r).length,p=t.filter(u=>u.created_at&&new Date(u.created_at)>=s&&new Date(u.created_at)<r).length;function b(u,y,g){if(y===0&&u===0)return'<span class="db-kpi-trend db-trend-neu">Sem dados</span>';if(y===0)return'<span class="db-kpi-trend db-trend-up">▲ Novo</span>';const E=Math.round((u-y)/y*100);return E===0?'<span class="db-kpi-trend db-trend-neu">= Estável</span>':E>0?`<span class="db-kpi-trend db-trend-up">▲ +${E}% ${g}</span>`:`<span class="db-kpi-trend db-trend-down">▼ ${E}% ${g}</span>`}[{idx:0,val:a,label:"Total de Imóveis",trend:b(c,l,"este mês"),icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'},{idx:1,val:o,label:"Publicados no Site",trend:o===0?'<span class="db-kpi-trend db-trend-neu">Nenhum publicado</span>':`<span class="db-kpi-trend db-trend-up">${Math.round(o/Math.max(a,1)*100)}% do total</span>`,icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'},{idx:2,val:i,label:"Leads Recebidos",trend:b(m,p,"vs. mês ant."),icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'},{idx:3,val:d,label:"Em Negociação",trend:d===0?'<span class="db-kpi-trend db-trend-neu">Nenhum ativo</span>':'<span class="db-kpi-trend db-trend-up">▲ Ativos</span>',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>'}].forEach(({idx:u,val:y,label:g,trend:E,icon:I})=>{const S=document.getElementById(`db-kpi-${u}`);S&&(S.innerHTML=`
      <div class="db-kpi-icon">${I}</div>
      <div class="db-kpi-body">
        <div class="db-kpi-val">${aa(y)}</div>
        <div class="db-kpi-lbl">${z(g)}</div>
        ${E}
      </div>`)})}function At(e,t){const n=document.getElementById("db-leads-chart");if(!n||!window.Chart)return;window._dbLeadsChartInstance&&window._dbLeadsChartInstance.destroy();const a=[],o=[],i=new Date;for(let r=t-1;r>=0;r--){const s=new Date(i);s.setDate(s.getDate()-r);const c=s.toISOString().slice(0,10),l=t<=7?s.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".",""):t<=30?s.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"}):s.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"});a.push(l),o.push(e.filter(m=>dt(m.created_at)===c).length)}const d=Math.max(...o,1);new Chart(n,{type:"bar",data:{labels:a,datasets:[{label:"Leads",data:o,backgroundColor:o.map(r=>r===d&&d>0?"rgba(201,162,39,0.90)":"rgba(201,162,39,0.35)"),borderColor:"#C9A227",borderWidth:1.5,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!0,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#0F172A",padding:10,callbacks:{label:r=>` ${r.parsed.y} lead${r.parsed.y!==1?"s":""}`}}},scales:{x:{grid:{display:!1},ticks:{color:"#94A3B8",font:{size:11}}},y:{beginAtZero:!0,grid:{color:"rgba(226,232,240,0.6)",drawBorder:!1},ticks:{color:"#94A3B8",font:{size:11},precision:0,stepSize:Math.max(1,Math.ceil(d/4))}}}}})}window._dbOriginChartInstance=null;function sn(e){const t=document.getElementById("db-origin-chart"),n=document.getElementById("db-origin-legend");if(!t||!window.Chart)return;window._dbOriginChartInstance&&(window._dbOriginChartInstance.destroy(),_dbOriginChartInstance=null);const a={};e.forEach(c=>{const l=c.source||"Direto",m=l.charAt(0).toUpperCase()+l.slice(1);a[m]=(a[m]||0)+1}),Object.keys(a).length===0&&(a.Site=0,a.WhatsApp=0,a.Indicação=0);const o=Object.keys(a),i=Object.values(a),d=["#6366F1","#10B981","#F59E0B","#0EA5E9","#EC4899","#8B5CF6","#14B8A6","#94A3B8"],r=o.map((c,l)=>d[l%d.length]),s=i.reduce((c,l)=>c+l,0);window._dbOriginChartInstance=new Chart(t,{type:"doughnut",data:{labels:o,datasets:[{data:i,backgroundColor:r,borderWidth:2,borderColor:"#fff",hoverOffset:4}]},options:{responsive:!0,cutout:"68%",plugins:{legend:{display:!1},tooltip:{backgroundColor:"#0F172A",padding:10,callbacks:{label:c=>{const l=s>0?Math.round(c.parsed/s*100):0;return` ${c.label}: ${c.parsed} (${l}%)`}}}}}}),n&&(s===0?n.innerHTML='<div class="db-empty" style="padding:12px 0"><div class="db-empty-text">Nenhum lead ainda<br><span style="font-size:11px;color:#CBD5E1">Os canais aparecerão aqui quando houver leads</span></div></div>':n.innerHTML=o.map((c,l)=>`
        <div class="db-legend-item">
          <div class="db-legend-dot-row">
            <span class="db-legend-dot" style="background:${r[l]}"></span>
            <span>${z(c)}</span>
          </div>
          <span class="db-legend-val">${i[l]}</span>
        </div>`).join(""))}function dn(e,t){const n=document.getElementById("db-leads-tbody"),a=document.getElementById("db-leads-sub");if(!n)return;const o=e.slice(0,8),i=new Date;if(a&&(a.textContent=`${e.length} lead${e.length!==1?"s":""} no total`),o.length===0){n.innerHTML='<tr><td colspan="5"><div class="db-empty"><div class="db-empty-icon">💬</div><div class="db-empty-text">Nenhum lead recebido ainda</div></div></td></tr>';return}const d={novo:{cls:"db-status-novo",label:"Novo"},contatado:{cls:"db-status-contatado",label:"Contatado"},negociando:{cls:"db-status-negociando",label:"Negociando"},fechado:{cls:"db-status-fechado",label:"Fechado"},perdido:{cls:"db-status-perdido",label:"Perdido"}};n.innerHTML=o.map(r=>{const s=d[r.status]||{cls:"db-status-novo",label:r.status||"Novo"},c=r.property_id?t.find(m=>String(m.id)===String(r.property_id)):null,l=r.source?r.source.charAt(0).toUpperCase()+r.source.slice(1):"Direto";return`
    <tr>
      <td>
        <div class="db-lead-name">${z(r.name||"—")}</div>
        <div class="db-lead-phone">${z(r.phone||r.email||"—")}</div>
        ${c?`<div style="font-size:11px;color:#94A3B8;margin-top:1px;">${z(c.title||"")}</div>`:""}
      </td>
      <td><span class="db-lead-src">${z(l)}</span></td>
      <td><span class="db-status-badge ${s.cls}">${z(s.label)}</span></td>
      <td style="color:#64748B;font-size:12px;">${ta(r.created_at,i)}</td>
      <td><button class="db-btn-view" onclick="navigateToSection('funil')">Ver Lead</button></td>
    </tr>`}).join("")}function ln(e){const t=document.getElementById("db-top-props");if(!t)return;const n=[...e].sort((a,o)=>new Date(o.created_at)-new Date(a.created_at)).slice(0,6);if(n.length===0){t.innerHTML='<div class="db-empty"><div class="db-empty-icon">🏠</div><div class="db-empty-text">Nenhum imóvel cadastrado ainda</div></div>';return}t.innerHTML=n.map((a,o)=>{const i=(()=>{try{return Array.isArray(a.images)?a.images:JSON.parse(a.images||"[]")}catch{return[]}})(),d=a.cover_image||i.find(p=>p&&p.startsWith("http"))||"",r=o===0?"rank-1":o===1?"rank-2":o===2?"rank-3":"",s=a.published?"pub":"rascunho",c=a.published?"Publicado":"Rascunho",l=[a.neighborhood,a.city].filter(Boolean).join(", ")||"—",m=a.price?`R$ ${String(a.price).replace(/[^0-9,.]/g,"")}`:"—";return`
    <div class="db-prop-item">
      <div class="db-prop-rank ${r}">${o+1}</div>
      ${d?`<img class="db-prop-thumb" src="${z(d)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`:""}
      <div class="db-prop-thumb-ph" ${d?'style="display:none"':""}>🏠</div>
      <div class="db-prop-info">
        <div class="db-prop-name" title="${z(a.title||"")}">${z(a.title||"Sem título")}</div>
        <div class="db-prop-city">${z(l)} · ${z(m)}</div>
      </div>
      <span class="db-prop-badge ${s}">${c}</span>
    </div>`}).join("")}function rn(e,t,n){var i;const a=document.getElementById("db-timeline");if(!a)return;const o=[];o.push({icon:"👤",cls:"tl-login",title:"Você entrou no sistema",meta:`Bem-vindo de volta, ${((i=f==null?void 0:f.name)==null?void 0:i.split(" ")[0])||"Corretor"}`,time:n.toISOString()}),t.slice(0,3).forEach(d=>{o.push({icon:"💬",cls:"tl-lead",title:`Novo lead: ${d.name||"Sem nome"}`,meta:`Origem: ${d.source||"Direto"} · ${d.phone||d.email||""}`,time:d.created_at})}),e.slice(0,3).forEach(d=>{const r=d.published?"Imóvel publicado":"Imóvel cadastrado";o.push({icon:"🏠",cls:"tl-prop",title:`${r}: ${d.title||"Sem título"}`,meta:`${d.city||""} · ${d.reference||""}`,time:d.created_at})}),o.sort((d,r)=>new Date(r.time)-new Date(d.time)),a.innerHTML=o.slice(0,8).map(d=>`
    <div class="db-tl-item">
      <div class="db-tl-icon ${d.cls}">${d.icon}</div>
      <div class="db-tl-body">
        <div class="db-tl-title">${z(d.title)}</div>
        ${d.meta?`<div class="db-tl-meta">${z(d.meta)}</div>`:""}
      </div>
      <div class="db-tl-time">${ta(d.time,n)}</div>
    </div>`).join(""),o.length===0&&(a.innerHTML='<div class="db-empty"><div class="db-empty-icon">📋</div><div class="db-empty-text">Sem atividades recentes</div></div>')}function cn(e,t){const n=document.getElementById("db-portfolio");if(!n)return;const a=e.length,o=e.filter(c=>c.published).length,i=a-o,d=t.filter(c=>c.stage&&c.stage!=="perdido"&&c.stage!=="fechado").length,r=e.filter(c=>{try{const l=Array.isArray(c.collection)?c.collection:JSON.parse(c.collection||"[]");return l.includes("alto-padrao")||l.includes("lancamentos")||l.includes("decorados")}catch{return!1}}).length,s=[{icon:"✅",val:o,lbl:"Imóveis Ativos"},{icon:"📝",val:i,lbl:"Em Rascunho"},{icon:"🤝",val:d,lbl:"Em Negociação"},{icon:"⭐",val:r,lbl:"Em Coleções"}];n.innerHTML=s.map(c=>`
    <div class="db-port-card">
      <div class="db-port-icon">${c.icon}</div>
      <div class="db-port-val">${aa(c.val)}</div>
      <div class="db-port-lbl">${z(c.lbl)}</div>
    </div>`).join("")}
