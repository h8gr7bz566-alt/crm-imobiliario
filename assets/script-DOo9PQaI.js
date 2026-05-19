import{s as y}from"./supabase-BcuJ3xoD.js";const Te="00000000-0000-0000-0000-000000000000";let Ie={},Re={},ge=Te;function _e(e){ge=e||Te,Ie={},Re={}}const j=()=>ge;async function St(){const[e,t]=await Promise.all([y.from("settings").select("key,value").eq("tenant_id",ge),y.from("site_content").select("*").eq("tenant_id",ge)]);e.data&&e.data.forEach(n=>{Ie[n.key]=n.value}),t.data&&t.data.forEach(n=>{Re[n.key]=n})}const F=(e,t=null)=>Ie[e]!==void 0?Ie[e]:t,Ue=(e,t="pt")=>{const n=Re[e];return n?n[`value_${t}`]??n.value_pt??null:null};async function pe(e){const t=new Date().toISOString(),n=e.map(([o,i])=>({key:o,value:i,tenant_id:ge,updated_at:t})),{error:a}=await y.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,i])=>{Ie[o]=i}),!a}async function Oe(e,{pt:t,en:n,es:a}){const o={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:ge,updated_at:new Date().toISOString()},{error:i}=await y.from("site_content").upsert(o,{onConflict:"key,tenant_id"});return i||(Re[e]=o),!i}async function De(e,t,n){const{error:a}=await y.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function Ke(){const e=document.documentElement,t=F("visual.accent_color","#b8962e"),n=F("visual.primary_bg","#0f1c2e"),a=F("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=F("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(d=>{d.src=o});const i=F("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=i);const s=F("visual.hero_bg_url","");if(s){const d=document.querySelector(".hero");d&&(d.style.backgroundImage=`url('${s}')`)}}function _t(e="pt"){const t=b=>Ue(b,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const i=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),s=document.querySelector('[data-i18n="inst.p3"]');i&&t("inst.bio_p1")&&(i.innerHTML=t("inst.bio_p1")),l&&t("inst.bio_p2")&&(l.innerHTML=t("inst.bio_p2")),s&&t("inst.bio_p3")&&(s.innerHTML=t("inst.bio_p3"));const d=document.querySelector('[data-i18n-num="inst.stat2num"]'),r=document.querySelector('[data-i18n="inst.stat1"]'),c=document.querySelector('[data-i18n="inst.stat2"]'),m=document.querySelector('[data-i18n="inst.stat3"]');d&&t("inst.stat2_num")&&(d.innerHTML=t("inst.stat2_num")),r&&t("inst.stat1_label")&&(r.innerHTML=t("inst.stat1_label")),c&&t("inst.stat2_label")&&(c.innerHTML=t("inst.stat2_label")),m&&t("inst.stat3_label")&&(m.innerHTML=t("inst.stat3_label"));const g=Ue("seo.title_pt",e);g&&document.title&&(document.title=g);const u=Ue("seo.description_pt",e);if(u){const b=document.querySelector('meta[name="description"]');b&&(b.content=u)}}function Ct(e){if(!e)return;const t=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const Tt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let ne="5547999701743";const ie=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],At=5.7;function ve(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/At).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let _=[],f=null,$e=[],bt=!1;y.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(bt=!0)});async function qt(){const e=window.location.hostname;if(e==="localhost"||e==="127.0.0.1"){const{data:i,error:l}=await y.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return l&&console.error("Supabase select error:",l),i||[]}let n=j();if(!n||n===Te){const i=e.replace(/^www\./,"");for(const l of[i,"www."+i]){const{data:s}=await y.from("tenants").select("id").eq("domain",l).maybeSingle();if(s!=null&&s.id){n=s.id,_e(n);break}}}if(!n||n===Te)return console.warn("[ImobiCRM] Tenant não encontrado para domínio:",e),[];const{data:a,error:o}=await y.from("properties").select("*").eq("published",!0).eq("tenant_id",n).order("created_at",{ascending:!1});return o?(console.error("Supabase select error:",o),[]):a||[]}async function Mt(){let e=y.from("properties").select("*").order("created_at",{ascending:!1});(f==null?void 0:f.role)==="super_admin"||(f!=null&&f.tenant_id?e=e.eq("tenant_id",f.tenant_id):e=e.or("tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000"));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):(_=t||[],ca(),ma(),_)}async function zt(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await y.from("properties").update(a).eq("id",t);if(o)throw o;const i=_.findIndex(l=>l.id===t);i>=0&&(_[i]={..._[i],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await y.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&_.unshift(t[0])}}async function Nt(e){const{error:t}=await y.from("properties").delete().eq("id",e);if(t)throw t;_=_.filter(n=>n.id!==e)}async function jt(e,t){const{error:n}=await y.auth.signInWithPassword({email:e,password:t});return!n}function Le(e,t=1200,n=.78){return new Promise((a,o)=>{const i=new Image,l=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(l);const s=document.createElement("canvas");let d=i.width,r=i.height;d>t&&(r=Math.round(r*t/d),d=t),s.width=d,s.height=r;const c=s.getContext("2d");c.drawImage(i,0,0,d,r);const m=new Image;m.crossOrigin="anonymous",m.onload=()=>{const g=Math.round(d*.18),u=Math.round(m.naturalHeight*g/m.naturalWidth),b=Math.round(d*.02),x=d-g-b,E=r-u-b;c.globalAlpha=.45,c.drawImage(m,x,E,g,u),c.globalAlpha=1,s.toBlob(v=>v?a(v):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.onerror=()=>{s.toBlob(g=>g?a(g):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.src="/logo.png"},i.onerror=o,i.src=l})}async function Ht(e){const t=await Le(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await y.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=y.storage.from("imoveis").getPublicUrl(n);return o}async function Rt(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await Ht(n[o]));return a}async function Be(){var m,g,u,b,x,E;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await qt();_=n,((m=document.getElementById("selecao-carousel"))==null?void 0:m.innerHTML)===""&&Ut(n);const a=((g=document.getElementById("city-filter"))==null?void 0:g.value)||"",o=((u=document.getElementById("neighborhood-filter"))==null?void 0:u.value)||"",i=((b=document.getElementById("bedrooms-filter"))==null?void 0:b.value)||"",l=((x=document.getElementById("parking-filter"))==null?void 0:x.value)||"",s=((E=document.getElementById("construction-filter"))==null?void 0:E.value)||"",{min:d,max:r}=Ot(),c=n.filter(v=>{if(a&&v.city!==a||o&&v.neighborhood!==o||i&&(i==="4+"&&Number(v.bedrooms)<4||i!=="4+"&&Number(v.bedrooms)!==Number(i))||l&&(l==="4+"&&Number(v.parking)<4||l!=="4+"&&Number(v.parking)!==Number(l))||s&&v.construction_status!==s)return!1;const I=String(v.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),B=parseInt(I,10)||0;return!(B<d||r!==1/0&&B>r)});if(e){if(!c.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=c.map(v=>{var L;const I=v.cover_image||((L=v.images)==null?void 0:L[0])||ie[0],B=[v.neighborhood,v.city].filter(Boolean).join(", "),$=encodeURIComponent(`Olá! Tenho interesse no imóvel *${v.title}*${v.reference?` (Ref: ${v.reference})`:""}. Poderia me dar mais informações?`);return`
        <div class="selecao-card">
          <img src="${I}" alt="${p(v.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${p(v.title)}</div>
            <div class="selecao-card-loc">${p(B)}</div>
            <div class="selecao-card-price">${p(ve(v.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${v.id}" class="btn-det">Ver Detalhes</a>
              <a href="https://wa.me/${ne}?text=${$}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!c.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=c.map(v=>{var L;const I=(L=v.images)!=null&&L.length?v.images:ie,B=I.length,$=encodeURIComponent(`Olá! Tenho interesse no imóvel *${v.title}*${v.reference?` (Ref: ${v.reference})`:""}. Poderia me dar mais informações?`);return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${B}" data-idx="0" data-pid="${v.id}">
          <img src="${v.cover_image||I[0]}" alt="${p(v.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${B>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${p(v.title)}</strong>
          <div class="muted">${p(v.neighborhood||"")}, ${p(v.city||"")}</div>
          <div><strong>${p(ve(v.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${v.bedrooms||"--"} | 🚗 ${v.parking||"--"} ${B>1?"| 📸 "+B:""}</div>
          <p class="muted">${p((v.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${v.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="https://wa.me/${ne}?text=${$}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(v=>{v.removeEventListener("click",it),v.addEventListener("click",it)})}function Ut(e){var o,i,l;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(s=>{var m;const d=s.cover_image||((m=s.images)==null?void 0:m[0])||ie[0],r=[s.neighborhood,s.city].filter(Boolean).join(", "),c=encodeURIComponent(`Olá! Tenho interesse no imóvel *${s.title}*${s.reference?` (Ref: ${s.reference})`:""}. Poderia me dar mais informações?`);return`
      <div class="selecao-card">
        <img src="${d}" alt="${p(s.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${p(s.title)}</div>
          <div class="selecao-card-loc">${p(r)}</div>
          <div class="selecao-card-price">${p(ve(s.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${s.id}" class="btn-det">Ver Detalhes</a>
            <a href="https://wa.me/${ne}?text=${c}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(i=a==null?void 0:a.querySelector(".selecao-prev"))==null||i.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(l=a==null?void 0:a.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),Be()};function it(e){var s;e.stopPropagation();const t=e.currentTarget.closest(".carousel-wrap");if(!t)return;const n=parseInt(t.dataset.total,10);if(!n)return;let a=parseInt(t.dataset.idx,10)||0;const o=e.currentTarget.classList.contains("carousel-next")?1:-1;a=(a+o+n)%n,t.dataset.idx=a;const i=parseInt(t.dataset.pid,10),l=_.find(d=>d.id===i);(s=l==null?void 0:l.images)!=null&&s.length&&(t.querySelector(".carousel-img").src=l.images[a])}function Ot(){var a;const e=((a=document.getElementById("price-range"))==null?void 0:a.value)||"";if(!e)return{min:0,max:1/0};const[t,n]=e.split("-");return{min:parseInt(t,10)||0,max:n?parseInt(n,10):1/0}}function Dt(){const e=document.getElementById("price-range");e&&e.addEventListener("change",()=>Be())}function Pt(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=de();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${p(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=de().find(i=>i.name===e.value),o=a?et(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(i=>`<option value="${i.name}">${p(i.name)}</option>`).join(""),Be()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",Be)})}function ke(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var l;const a=n.cover_image||((l=n.images)==null?void 0:l[0])||ie[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",i=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${p(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${p(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+p(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${p(o)}</td>
      <td class="cell-price">${p(ve(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${i}</td>
      <td>
        <div class="action-btns">
          ${(f==null?void 0:f.role)==="admin"||(f==null?void 0:f.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(f==null?void 0:f.role)==="admin"||(f==null?void 0:f.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function Ft(){const e=document.getElementById("f-city");if(!e)return;const t=de(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${p(a.name)}</option>`).join(""),n&&(e.value=n)}function Xt(){var e,t,n,a,o,i,l,s,d,r,c,m,g,u,b;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((i=document.getElementById("f-condominium"))==null?void 0:i.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((s=document.getElementById("f-price-max"))==null?void 0:s.value)||1/0,areaMin:parseFloat((d=document.getElementById("f-area-min"))==null?void 0:d.value)||0,areaMax:parseFloat((r=document.getElementById("f-area-max"))==null?void 0:r.value)||1/0,construction:((c=document.getElementById("f-construction"))==null?void 0:c.value)||"",published:((m=document.getElementById("f-published"))==null?void 0:m.value)||"",bedrooms:((g=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:g.dataset.val)||"",suites:((u=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:u.dataset.val)||"",parking:((b=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:b.dataset.val)||""}}function Qe(e){const t=Xt();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const i=parseFloat(a.area)||0;return!(t.areaMin>0&&i<t.areaMin||t.areaMax<1/0&&i>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Ae(){if(!document.getElementById("admin-properties"))return;const e=await Mt(),t=e.length,n=e.filter(l=>l.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),i=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),i&&(i.textContent="—"),Ft(),ke(_)}let H=null,oe="";function Fe(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Ce(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function qe(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===oe?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{oe=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function Pe(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{var d;n.preventDefault();const a=new FormData(e),o=a.getAll("images");let i=[];const l=o.filter(r=>r.size>0);if(l.length){t.disabled=!0,t.textContent=`Enviando 0/${l.length} foto…`;try{i=await Rt(l,(r,c)=>{t.textContent=`Enviando ${r}/${c} foto…`})}catch(r){console.error("Erro no upload:",r),t.disabled=!1,t.textContent=H?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(H){const r=_.find(c=>c.id===H);r!=null&&r.images&&(i=r.images)}i.length||(i=[...ie]);const s={...H?{id:H}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:i,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:oe||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",tenant_id:H?((d=_.find(r=>r.id===H))==null?void 0:d.tenant_id)??(f==null?void 0:f.tenant_id)??null:(f==null?void 0:f.tenant_id)??null};try{await zt(s),H=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const r=document.getElementById("adminPublished");r&&(r.value="true");const c=document.getElementById("adminNeighborhood");c&&(c.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),oe="",qe([]),Ce(),await Ae()}catch(r){console.error(r),t.disabled=!1,t.textContent=H?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((r==null?void 0:r.message)||JSON.stringify(r)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await Nt(o),await Ae()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((f==null?void 0:f.role)!=="admin"&&(f==null?void 0:f.role)!=="super_admin")return;const o=Number(n.target.dataset.id);if(!o)return;const i=_.find(d=>d.id===o);if(!i)return;H=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=i.title||"",e.querySelector('[name="rua"]').value=i.rua||"",e.querySelector('[name="numero"]').value=i.numero||"",e.querySelector('[name="city"]').value=i.city||"",e.querySelector('[name="price"]').value=i.price||"",e.querySelector('[name="bedrooms"]').value=i.bedrooms||"",e.querySelector('[name="suites"]').value=i.suites||"",e.querySelector('[name="area"]').value=i.area||"",e.querySelector('[name="parking"]').value=i.parking||"",e.querySelector('[name="description"]').value=i.description||"",e.querySelector('[name="construction_status"]').value=i.construction_status||"",e.querySelector('[name="owner_name"]').value=i.owner_name||"",e.querySelector('[name="owner_phone"]').value=i.owner_phone||"",e.querySelector('[name="owner_email"]').value=i.owner_email||"",e.querySelector('[name="owner_notes"]').value=i.owner_notes||"",e.querySelector('[name="condominium"]').value=i.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=i.published===!0?"true":"false");const s=document.getElementById("adminCitySelect");s&&(s.value=i.city||"",s.dispatchEvent(new Event("change")),setTimeout(()=>{const d=document.getElementById("adminNeighborhood");d&&(d.value=i.neighborhood||"")},50)),oe=i.cover_image||((a=i.images)==null?void 0:a[0])||"",qe(i.images||[]),Fe("Editar Imóvel")}})}function p(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let Q=[],G=0;function Gt(e){var m,g;const t=document.getElementById("view-modal-edit");t&&(t.dataset.pid=e.id),document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const n=document.getElementById("view-status-badge");e.published?(n.textContent="● Publicado",n.className="badge badge-green"):(n.textContent="○ Rascunho",n.className="badge badge-gray");const a=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=a.length?`📍 ${a.join(", ")}`:"";const o=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.join(" "))}`;document.getElementById("view-map-link").href=o,document.getElementById("view-directions-link").href=o;const i=((m=e.images)==null?void 0:m[0])||ie[0];document.getElementById("view-thumb-preview").src=i,Q=(g=e.images)!=null&&g.length?e.images:ie,G=0,Me(),document.getElementById("view-price").textContent=ve(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const l=document.getElementById("view-condominium-item"),s=document.getElementById("view-condominium");s&&(s.textContent=e.condominium||""),l&&(l.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(u=>u.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const d="https://omarcorretor.com.br/property.html?id="+e.id,r=document.getElementById("share-link-input");r&&(r.value=d);const c=document.getElementById("share-panel");c&&(c.style.display="none",c.dataset.pid=e.id),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Se(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Me(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=Q[G],e.alt=`Foto ${G+1}`;const i=Q.length>1;n.style.display=i?"flex":"none",a.style.display=i?"flex":"none",t.textContent=i?`${G+1} / ${Q.length}`:"",o.innerHTML=i?Q.map((l,s)=>`<img src="${l}" class="view-thumb${s===G?" active":""}" data-i="${s}" alt="Foto ${s+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{G=+l.dataset.i,Me()})})}async function st(e){const{data:t}=await y.from("profiles").select("*").eq("id",e).maybeSingle();return t}function ze(e){var m,g;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const i=(e==null?void 0:e.name)||"Sem nome",l=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=i,o&&(o.textContent=l),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((m=i[0])==null?void 0:m.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const s=document.getElementById("avatar-dd-name"),d=document.getElementById("avatar-dd-role"),r=document.getElementById("avatar-dd-img"),c=document.getElementById("avatar-dd-initial");s&&(s.textContent=i),d&&(d.textContent=l),e!=null&&e.avatar_url&&r?(r.src=e.avatar_url,r.style.display="",c&&(c.style.display="none")):(c&&(c.textContent=((g=i[0])==null?void 0:g.toUpperCase())||"?",c.style.display=""),r&&(r.style.display="none"))}function se(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),W(),e==="contatos"&&ia(),e==="funil"&&Yt(),e==="tarefas"&&Qt()}function lt(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:ua,visual:ga,"site-config":va,"crm-config":fa,integracoes:ya,midia:ba}).forEach(([a,o])=>{const i=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);i&&i.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>ha(),{once:!0}),window.lucide&&lucide.createIcons()}}function W(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function Vt(){var a,o,i;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",l=>{l.target===t&&n()}),(i=document.getElementById("cp-save"))==null||i.addEventListener("click",async()=>{var m,g;const l=((m=document.getElementById("cp-new"))==null?void 0:m.value)||"",s=((g=document.getElementById("cp-confirm"))==null?void 0:g.value)||"",d=document.getElementById("cp-msg"),r=document.getElementById("cp-save");if(d.style.display="none",l.length<6){d.style.color="#ef4444",d.textContent="Mínimo 6 caracteres.",d.style.display="";return}if(l!==s){d.style.color="#ef4444",d.textContent="As senhas não coincidem.",d.style.display="";return}r.disabled=!0,r.textContent="Salvando…";const{error:c}=await y.auth.updateUser({password:l});if(r.disabled=!1,r.textContent="Salvar Senha",c){d.style.color="#ef4444",d.textContent="Erro: "+c.message,d.style.display="";return}d.style.color="#16a34a",d.textContent="✅ Senha alterada com sucesso!",d.style.display="",setTimeout(n,1500)})}function Wt(){var i,l,s,d,r;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((i=document.getElementById("topnav-avatar-img"))==null?void 0:i.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(l=document.getElementById("cph-close"))==null||l.addEventListener("click",o),(s=document.getElementById("cph-cancel"))==null||s.addEventListener("click",o),t.addEventListener("click",c=>{c.target===t&&o()}),(d=document.getElementById("cph-file"))==null||d.addEventListener("change",c=>{const m=c.target.files[0];if(!m)return;const g=URL.createObjectURL(m),u=document.getElementById("cph-preview"),b=document.getElementById("cph-initial");u&&(u.src=g,u.style.display=""),b&&(b.style.display="none"),document.getElementById("cph-save").disabled=!1}),(r=document.getElementById("cph-save"))==null||r.addEventListener("click",async()=>{var u;const c=(u=document.getElementById("cph-file"))==null?void 0:u.files[0];if(!c)return;const m=document.getElementById("cph-save"),g=document.getElementById("cph-msg");m.disabled=!0,m.textContent="Salvando…";try{const b=await Le(c,400,.85),x=`avatars/${f.id}-${Date.now()}.jpg`,{error:E}=await y.storage.from("imoveis").upload(x,b,{contentType:"image/jpeg",upsert:!0});if(E)throw E;const{data:{publicUrl:v}}=y.storage.from("imoveis").getPublicUrl(x);await y.from("profiles").update({avatar_url:v}).eq("id",f.id),f={...f,avatar_url:v},ze(f),o()}catch(b){g.style.color="#ef4444",g.textContent="Erro: "+b.message,g.style.display="",m.disabled=!1,m.textContent="Salvar Foto"}})}function Jt(){var a,o,i;const e=document.getElementById("add-corretor-modal-root");e&&e.remove();const t=document.createElement("div");t.id="add-corretor-modal-root",t.className="modal-backdrop",t.innerHTML=`
    <div class="modal" style="max-width:440px;">
      <div class="modal-header">
        <h3>Adicionar Corretor</h3>
        <button class="modal-close" id="ac-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
          <label class="form-label">E-mail do corretor *</label>
          <input id="ac-email" type="email" class="form-control" placeholder="corretor@email.com">
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("ac-close"))==null||a.addEventListener("click",n),(o=document.getElementById("ac-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",l=>{l.target===t&&n()}),(i=document.getElementById("ac-save"))==null||i.addEventListener("click",async()=>{var c,m;const l=(c=document.getElementById("ac-email"))==null?void 0:c.value.trim(),s=(m=document.getElementById("ac-password"))==null?void 0:m.value.trim(),d=document.getElementById("ac-save"),r=document.getElementById("ac-note");if(!l){alert("Informe o e-mail do corretor.");return}if(!s||s.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}d.disabled=!0,d.textContent="Criando…",r.style.display="none";try{const g=await ye({email:l,password:s,tenant_id:(f==null?void 0:f.tenant_id)||null});d.disabled=!1,d.textContent="+ Criar Acesso",g.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",g.email_sent===!1?(r.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${p(l)}<br><strong>Senha:</strong> ${p(s)}`,r.style.color="#0f172a"):(r.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",r.style.color="#16a34a"),r.style.display=""):alert("Erro: "+(g.error||"Falha desconhecida"))}catch(g){d.disabled=!1,d.textContent="+ Criar Acesso",alert("Erro: "+g.message)}})}function dt(){var i,l,s,d,r,c,m,g,u,b,x;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",E=>{var I;E.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(I=document.getElementById("notif-dropdown"))==null||I.classList.add("hidden")}),(i=document.getElementById("avatar-dd-change-photo"))==null||i.addEventListener("click",E=>{E.stopPropagation(),W(),Wt()}),(l=document.getElementById("avatar-dd-change-pass"))==null||l.addEventListener("click",E=>{E.stopPropagation(),W(),Vt()}),(s=document.getElementById("avatar-dd-add-corretor"))==null||s.addEventListener("click",E=>{E.stopPropagation(),W(),Jt()}),(d=document.getElementById("avatar-dd-settings"))==null||d.addEventListener("click",E=>{E.stopPropagation(),W(),se("settings")}),(r=document.getElementById("avatar-dd-logout"))==null||r.addEventListener("click",async E=>{E.stopPropagation(),await y.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",E=>{var I;E.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((I=document.getElementById("avatar-dropdown"))==null||I.classList.add("hidden"),ta())}),(c=document.getElementById("notif-mark-all"))==null||c.addEventListener("click",()=>{aa(),W()}),(m=document.getElementById("btn-search-open"))==null||m.addEventListener("click",()=>{var E,v;(E=document.getElementById("search-overlay"))==null||E.classList.remove("hidden"),(v=document.getElementById("search-input"))==null||v.focus()}),(g=document.getElementById("search-overlay-close"))==null||g.addEventListener("click",()=>{var E;(E=document.getElementById("search-overlay"))==null||E.classList.add("hidden")}),(u=document.getElementById("search-overlay"))==null||u.addEventListener("click",E=>{E.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(b=document.getElementById("search-input"))==null||b.addEventListener("input",E=>{clearTimeout(o),o=setTimeout(()=>ea(E.target.value.trim()),280)}),(x=document.getElementById("search-input"))==null||x.addEventListener("keydown",E=>{var v;E.key==="Escape"&&((v=document.getElementById("search-overlay"))==null||v.classList.add("hidden"))}),document.addEventListener("click",W)}let Xe=!1,ae=[],Ze=[],Ne=[],Ge={},ht=[],Z=null,xe=null,P={search:"",tags:new Set,status:""};async function Yt(){var t;if(Xe){await rt();return}Xe=!0,await rt(),(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>We());const e=document.getElementById("funil-pipe-sel");e==null||e.addEventListener("change",async()=>{Z=parseInt(e.value,10),await je()})}function Ve(e){var i;const t=document.getElementById("kanban-filters");if(!t)return;t.style.display="block";const n=document.getElementById("kf-status");n&&(n.innerHTML='<option value="">Todos os status</option>'+ht.map(l=>`<option value="${p(l.name)}">${p(l.name)}</option>`).join(""),n.value=P.status,n.onchange=()=>{P.status=n.value,ce()});const a=document.getElementById("kf-tags");if(a){if(!e.length){a.style.display="none";return}a.style.display="flex",a.innerHTML=e.map(l=>{const s=P.tags.has(l.name);return`<button class="kf-tag-btn" data-tag="${p(l.name)}"
        style="padding:4px 12px;border-radius:20px;border:1.5px solid ${l.color};
               background:${s?l.color:l.color+"18"};
               color:${s?"#fff":l.color};
               font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;">
        ${p(l.name)}
      </button>`}).join(""),a.querySelectorAll(".kf-tag-btn").forEach(l=>{l.addEventListener("click",()=>{const s=l.dataset.tag;P.tags.has(s)?P.tags.delete(s):P.tags.add(s),Ve(e),ce()})})}const o=document.getElementById("kf-search");o&&(o.value=P.search,o.oninput=()=>{P.search=o.value.toLowerCase(),ce()}),(i=document.getElementById("kf-clear"))==null||i.addEventListener("click",()=>{P={search:"",tags:new Set,status:""},Ve(e),ce()})}async function rt(){const e=j(),[{data:t},{data:n},{data:a}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",e).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",e).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",e).order("sort_order")]);ae=t||[],ht=a||[],Ge={},(n||[]).forEach(s=>{Ge[s.name]=s});const o=ae.map(s=>s.id),{data:i}=o.length?await y.from("crm_stages").select("*").in("pipeline_id",o).order("sort_order"):{data:[]};Ze=i||[],Ve(n||[]);const l=document.getElementById("funil-pipe-sel");if(l){const s=Z;l.innerHTML=ae.length?ae.map(r=>`<option value="${r.id}">${p(r.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const d=ae.find(r=>r.id===s)||ae.find(r=>r.is_default)||ae[0];d?(l.value=d.id,Z=d.id):Z=null}await je()}async function je(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=y.from("leads").select("*").order("created_at",{ascending:!1});(f==null?void 0:f.role)==="corretor"?t=t.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id)),Z&&(t=t.eq("pipeline_id",Z));const{data:n}=await t;Ne=n||[],ce()}function ce(){const e=document.getElementById("kanban-board");if(!e)return;const t=Ze.filter(i=>i.pipeline_id===Z);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n=P,a=Ne.filter(i=>{if(n.search&&!`${i.name||""} ${i.phone||""} ${i.email||""}`.toLowerCase().includes(n.search)||n.status&&i.status!==n.status)return!1;if(n.tags.size>0){const l=Array.isArray(i.tags)?i.tags:[];if(![...n.tags].every(s=>l.includes(s)))return!1}return!0}),o={};t.forEach(i=>{o[i.name]=[]}),a.forEach(i=>{var s,d,r,c;const l=i.stage||((s=t[0])==null?void 0:s.name);o[l]||(o[((d=t[0])==null?void 0:d.name)||""]=[]),(c=o[l]||o[(r=t[0])==null?void 0:r.name])==null||c.push(i)}),e.innerHTML=t.map(i=>{const l=o[i.name]||[],s=l.length?l.map(d=>{const r=(d.phone||"").replace(/\D/g,""),c=encodeURIComponent(`Olá ${d.name}! Aqui é da ${F("company.name","nossa imobiliária")}. Vi seu interesse e gostaria de ajudar. Posso falar agora?`);return`
        <div class="kanban-card" draggable="true" data-id="${d.id}" data-stage="${p(i.name)}" style="cursor:pointer;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;">
            <div class="kanban-card-name" style="flex:1;">${p(d.name||"—")}</div>
            ${r?`<a href="https://wa.me/${r}?text=${c}" target="_blank" rel="noopener"
              onclick="event.stopPropagation()"
              style="flex-shrink:0;width:28px;height:28px;background:#25d366;border-radius:6px;display:flex;align-items:center;justify-content:center;text-decoration:none;"
              title="Abrir WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>`:""}
          </div>
          ${d.phone?`<div class="kanban-card-info">📞 ${p(d.phone)}</div>`:""}
          ${d.email?`<div class="kanban-card-info" style="font-size:11px;color:#94a3b8;">✉ ${p(d.email)}</div>`:""}
          ${d.notes?`<div class="kanban-card-info" style="font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">📝 ${p(d.notes)}</div>`:""}
          <div class="kanban-card-tags" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">
            ${d.source?`<span class="kanban-card-tag">${p(d.source)}</span>`:""}
            ${Array.isArray(d.tags)?d.tags.map(m=>{const g=Ge[m],u=(g==null?void 0:g.color)||"#0369a1";return`<span class="kanban-card-tag" style="background:${u}18;color:${u};border:1px solid ${u}44;">${p(m)}</span>`}).join(""):""}
          </div>
        </div>`}).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${p(i.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${i.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${i.color||"#2563eb"}"></div>
            ${p(i.name)}
          </div>
          <span class="kanban-col-count">${l.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${p(i.name)}">${s}</div>
        <button class="kanban-add-btn" data-stage="${p(i.name)}">+ Adicionar lead</button>
      </div>`}).join(""),Kt(),window.lucide&&lucide.createIcons()}function Kt(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>We())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=Ne.find(a=>String(a.id)===String(t.dataset.id));n&&We(n)}),t.addEventListener("dragstart",n=>{xe=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!xe||!a)return;await y.from("leads").update({stage:a}).eq("id",xe);const o=Ne.find(i=>String(i.id)===String(xe));o&&(o.stage=a),xe=null,ce()})}))}async function We(e=null){var r,c;(r=document.getElementById("lead-detail-panel"))==null||r.remove();const t=!e,n=j(),{data:a}=await y.from("crm_tags").select("*").eq("tenant_id",n).order("name"),{data:o}=await y.from("crm_lead_statuses").select("*").eq("tenant_id",n).order("sort_order"),i=Ze.filter(m=>m.pipeline_id===Z).map(m=>`<option value="${p(m.name)}" ${(e==null?void 0:e.stage)===m.name?"selected":""}>${p(m.name)}</option>`).join(""),l=((e==null?void 0:e.phone)||"").replace(/\D/g,""),s=document.createElement("div");s.id="lead-detail-panel",s.style.cssText="position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:#fff;box-shadow:-4px 0 32px rgba(0,0,0,.15);z-index:1000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;",s.innerHTML=`
    <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0;">${t?"+ Novo Lead":"✏️ Editar Lead"}</h3>
      <button id="ldp-close" style="background:none;border:none;cursor:pointer;font-size:22px;color:#94a3b8;line-height:1;">✕</button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:20px 24px;display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">NOME *</label>
        <input id="ldp-name" class="form-input" type="text" value="${p((e==null?void 0:e.name)||"")}" placeholder="Nome do cliente">
      </div>
      <div style="display:flex;gap:10px;">
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">TELEFONE</label>
          <input id="ldp-phone" class="form-input" type="tel" value="${p((e==null?void 0:e.phone)||"")}" placeholder="(00) 00000-0000">
        </div>
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">E-MAIL</label>
          <input id="ldp-email" class="form-input" type="email" value="${p((e==null?void 0:e.email)||"")}" placeholder="email@...">
        </div>
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ORIGEM</label>
        <input id="ldp-source" class="form-input" type="text" value="${p((e==null?void 0:e.source)||"")}" placeholder="site, indicação, instagram…">
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ETAPA DO FUNIL</label>
        <select id="ldp-stage" class="form-input">${i}</select>
      </div>
      ${o!=null&&o.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">STATUS</label>
        <select id="ldp-status" class="form-input">
          <option value="">— Sem status —</option>
          ${o.map(m=>`<option value="${m.name}" ${(e==null?void 0:e.status)===m.name?"selected":""}>${p(m.name)}</option>`).join("")}
        </select>
      </div>`:""}
      ${a!=null&&a.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:6px;">TAGS</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${a.map(m=>`
            <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:4px 10px;border-radius:20px;background:${m.color}18;border:1px solid ${m.color}44;font-size:12px;font-weight:600;color:${m.color};">
              <input type="checkbox" value="${m.name}" style="margin:0;" ${((e==null?void 0:e.tags)||[]).includes(m.name)?"checked":""}>
              ${p(m.name)}
            </label>`).join("")}
        </div>
      </div>`:""}
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ANOTAÇÕES</label>
        <textarea id="ldp-notes" class="form-input" rows="4" placeholder="Observações, interesses, próximos passos…" style="resize:vertical;">${p((e==null?void 0:e.notes)||"")}</textarea>
      </div>
      ${l?(()=>{const m=encodeURIComponent(`Olá ${e!=null&&e.name?e.name.split(" ")[0]:""}! Aqui é da ${F("company.name","nossa imobiliária")}. Vi seu interesse em imóveis e gostaria de ajudá-lo. Posso falar agora?`);return`<a href="https://wa.me/${l}?text=${m}" target="_blank" rel="noopener"
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
  `,document.body.appendChild(s),requestAnimationFrame(()=>{s.style.transform="translateX(0)"});const d=()=>{s.style.transform="translateX(100%)",setTimeout(()=>s.remove(),250)};document.getElementById("ldp-close").addEventListener("click",d),document.getElementById("ldp-save").addEventListener("click",async()=>{var v,I;const m=document.getElementById("ldp-save"),g=document.getElementById("ldp-msg"),u=document.getElementById("ldp-name").value.trim();if(!u){g.style.color="#ef4444",g.textContent="Nome é obrigatório.";return}m.disabled=!0,m.textContent="Salvando…";const b=[...s.querySelectorAll("input[type=checkbox]:checked")].map(B=>B.value),x={name:u,phone:document.getElementById("ldp-phone").value.trim()||null,email:document.getElementById("ldp-email").value.trim()||null,source:document.getElementById("ldp-source").value.trim()||null,stage:((v=document.getElementById("ldp-stage"))==null?void 0:v.value)||null,status:((I=document.getElementById("ldp-status"))==null?void 0:I.value)||null,notes:document.getElementById("ldp-notes").value.trim()||null,tags:b,tenant_id:j()};let E;if(t?{error:E}=await y.from("leads").insert(x):{error:E}=await y.from("leads").update(x).eq("id",e.id),m.disabled=!1,m.textContent="💾 Salvar",E){g.style.color="#ef4444",g.textContent="Erro: "+E.message;return}g.style.color="#22c55e",g.textContent="✅ Salvo!",setTimeout(()=>{d(),je()},700)}),(c=document.getElementById("ldp-delete"))==null||c.addEventListener("click",async()=>{confirm(`Excluir o lead "${e==null?void 0:e.name}"?`)&&(await y.from("leads").delete().eq("id",e.id),d(),je())})}let N=[],ct=!1,me="pending";async function Qt(){var e;ct||(ct=!0,await Zt(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>Et()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),me=t.dataset.filter,fe()})}))}async function Zt(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=y.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(f==null?void 0:f.role)==="corretor"?t=t.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}N=n||[],fe()}function xt(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function fe(){const e=document.getElementById("tarefas-list");if(!e)return;let t=N;if(me==="pending"&&(t=N.filter(a=>a.status!=="done")),me==="done"&&(t=N.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${me==="done"?"✅":"📋"}</div>
      <p>${me==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=xt(a.due_date),i=o?o.toLocaleDateString("pt-BR"):"",l=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${p(a.title)}</div>
          <div class="tarefa-meta">
            ${i?`<span style="${l?"color:#ef4444;":""}">📅 ${i}${l?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${p(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const i=a.dataset.id,l=a.checked?"done":"pending";await y.from("tasks").update({status:l}).eq("id",i);const s=N.find(d=>String(d.id)===i);s&&(s.status=l),fe()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await y.from("tasks").delete().eq("id",a.dataset.id),N=N.filter(i=>String(i.id)!==String(a.dataset.id)),fe())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const i=a.dataset.id,l=N.find(s=>String(s.id)===i);l&&Et(l)})})}function Et(e=null){var d,r,c,m;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=xt(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const i=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",l=document.createElement("div");l.id="tarefa-modal-root",l.className="modal-backdrop",l.innerHTML=`
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
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${p((e==null?void 0:e.title)||"")}">
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
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${p((e==null?void 0:e.description)||"")}</textarea>
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
  `,document.body.appendChild(l);const s=()=>l.remove();(d=document.getElementById("tm-close"))==null||d.addEventListener("click",s),(r=document.getElementById("tm-cancel"))==null||r.addEventListener("click",s),l.addEventListener("click",g=>{g.target===l&&s()}),(c=document.getElementById("tm-toggle-done"))==null||c.addEventListener("click",async()=>{const g=a?"pending":"done";await y.from("tasks").update({status:g}).eq("id",e.id);const u=N.find(b=>String(b.id)===String(e.id));u&&(u.status=g),s(),g==="done"&&(me="done",document.querySelectorAll(".tarefa-filter-btn").forEach(b=>{b.classList.toggle("active",b.dataset.filter==="done")})),fe()}),(m=document.getElementById("tm-save"))==null||m.addEventListener("click",async()=>{var v,I;const g=document.getElementById("tarefa-form");if(!g.checkValidity()){g.reportValidity();return}const u=new FormData(g),b=document.getElementById("tm-save");b.disabled=!0,b.textContent="Salvando…";const x={title:(v=u.get("title"))==null?void 0:v.trim(),description:((I=u.get("description"))==null?void 0:I.trim())||null,due_date:u.get("due_date")||null,priority:u.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(f==null?void 0:f.id)||null,tenant_id:(f==null?void 0:f.tenant_id)||null};let E;if(n){if({error:E}=await y.from("tasks").update(x).eq("id",e.id),!E){const B=N.findIndex($=>String($.id)===String(e.id));B>=0&&(N[B]={...N[B],...x})}}else{const{data:B,error:$}=await y.from("tasks").insert(x).select();E=$,!E&&(B!=null&&B[0])&&N.unshift(B[0])}if(b.disabled=!1,b.textContent=n?"Salvar":"Criar Tarefa",E){alert("Erro: "+E.message);return}s(),fe()})}async function ea(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;f==null||f.role,f==null||f.tenant_id;const[{data:a},{data:o}]=await Promise.all([y.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),y.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),i=[];a!=null&&a.length&&(i.push('<div class="search-group-label">Imóveis</div>'),i.push(...a.map(l=>`
      <div class="search-result-item" data-type="property" data-id="${l.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${p(l.title||"—")}</div>
          <div class="search-result-sub">${p(l.reference||"")} · ${p(l.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(i.push('<div class="search-group-label">Leads / Contatos</div>'),i.push(...o.map(l=>`
      <div class="search-result-item" data-type="lead" data-id="${l.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${p(l.name||"—")}</div>
          <div class="search-result-sub">${p(l.email||l.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=i.length?i.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(l=>{l.addEventListener("click",()=>{var s;(s=document.getElementById("search-overlay"))==null||s.classList.add("hidden"),l.dataset.type==="lead"?se("contatos"):se("properties")})})}let J=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function ta(){var l;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=y.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(s=>!J.includes(String(s.id))),i=document.getElementById("notif-badge");if(i&&(i.textContent=o.length,o.length>0?i.classList.remove("hidden"):i.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(s=>{const d=na(s.created_at);return`
      <div class="notif-item${!J.includes(String(s.id))?" unread":""}" data-id="${s.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${p(s.name||"—")}</div>
          <div class="notif-item-sub">${p(s.phone||s.source||"")} · ${d}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(l=document.getElementById("notif-see-all"))==null||l.addEventListener("click",s=>{s.preventDefault(),W(),se("contatos")}),e.querySelectorAll(".notif-item").forEach(s=>{s.addEventListener("click",()=>{J.push(s.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(J)),s.classList.remove("unread"),W(),se("contatos")})})}function aa(){var e;document.querySelectorAll(".notif-item").forEach(t=>J.push(t.dataset.id)),J=[...new Set(J)],localStorage.setItem("crm_notifs_read",JSON.stringify(J)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function na(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function oa(){let e=y.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);f!=null&&f.tenant_id&&(e=e.eq("tenant_id",f.tenant_id));const{data:t}=await e,a=(t||[]).filter(i=>!J.includes(String(i.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let X=[],z=1;const Ee=10;let mt=!1;async function ia(){var t,n,a,o,i,l,s,d,r;document.getElementById("section-contatos")&&(mt||(mt=!0,await wt(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{z=1,le()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",c=>{c.key==="Enter"&&(z=1,le())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>It()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",da),(i=document.getElementById("import-modal-close"))==null||i.addEventListener("click",Je),(l=document.getElementById("import-modal-cancel"))==null||l.addEventListener("click",Je),(s=document.getElementById("download-template"))==null||s.addEventListener("click",c=>{c.preventDefault();const m=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,g=new Blob([m],{type:"text/csv"}),u=document.createElement("a");u.href=URL.createObjectURL(g),u.download="modelo_contatos.csv",u.click()}),(d=document.getElementById("import-csv-file"))==null||d.addEventListener("change",sa),(r=document.getElementById("import-modal-confirm"))==null||r.addEventListener("click",la)))}async function wt(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=y.from("leads").select("*").order("created_at",{ascending:!1});(f==null?void 0:f.role)==="corretor"?t=t.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:a}=await t;X=a||[],le()}function le(){var s,d,r;const e=(((s=document.getElementById("contato-search"))==null?void 0:s.value)||"").toLowerCase(),t=e?X.filter(c=>(c.name||"").toLowerCase().includes(e)||(c.email||"").toLowerCase().includes(e)||(c.phone||"").toLowerCase().includes(e)):X,n=t.length,a=Math.max(1,Math.ceil(n/Ee));z>a&&(z=a);const o=t.slice((z-1)*Ee,z*Ee),i=document.getElementById("contatos-tbody");if(!i)return;o.length?i.innerHTML=o.map(c=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${c.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${c.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${p(c.name||"—")}</a>
        </td>
        <td>${p(c.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${c.email?p(c.email):"—"}</td>
        <td style="font-size:13px;">${c.phone?p(c.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${p(c.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td style="display:flex;gap:6px;align-items:center;">
          ${(()=>{const m=(c.phone||"").replace(/\D/g,"");if(!m)return"";const g=encodeURIComponent(`Olá ${(c.name||"").split(" ")[0]}! Aqui é da ${F("company.name","nossa imobiliária")}. Podemos conversar sobre seu interesse em imóveis?`);return`<a href="https://wa.me/${m}?text=${g}" target="_blank" rel="noopener" title="WhatsApp"
              style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
            </a>`})()}
          <button class="icon-btn contato-edit-btn" data-id="${c.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):i.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const l=document.getElementById("contatos-pagination");if(l){const c=n===0?0:(z-1)*Ee+1,m=Math.min(z*Ee,n);l.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${c}–${m}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${z<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${z} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${z>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(d=l.querySelector("#pag-prev"))==null||d.addEventListener("click",()=>{z--,le()}),(r=l.querySelector("#pag-next"))==null||r.addEventListener("click",()=>{z++,le()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(c=>{c.addEventListener("click",m=>{m.preventDefault();const g=c.dataset.id,u=X.find(b=>String(b.id)===String(g));u&&It(u)})})}async function It(e=null){var v,I,B,$,L,k;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=j(),[{data:o},{data:i},{data:l}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",a).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",a).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",a).order("sort_order")]),s=o||[],d=i||[],r=l||[],c=s.map(w=>w.id),{data:m}=c.length?await y.from("crm_stages").select("*").in("pipeline_id",c).order("sort_order"):{data:[]},g=m||[],u=(e==null?void 0:e.pipeline_id)||((v=s[0])==null?void 0:v.id)||"";function b(w){const h=g.filter(S=>S.pipeline_id===w);return h.length?'<option value="">— Selecionar etapa —</option>'+h.map(S=>`<option value="${p(S.name)}" ${(e==null?void 0:e.stage)===S.name?"selected":""}>${p(S.name)}</option>`).join(""):'<option value="">— Nenhuma etapa —</option>'}const x=document.createElement("div");x.id="contato-modal-root",x.className="modal-backdrop",x.innerHTML=`
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
              <input name="name" required class="form-control" placeholder="Nome completo" value="${p((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${p((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${p((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${p((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${p((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${p((e==null?void 0:e.city_interest)||"")}">
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
                  ${s.map(w=>`<option value="${w.id}" ${String(e==null?void 0:e.pipeline_id)===String(w.id)?"selected":""}>${p(w.name)}</option>`).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Etapa</label>
                <select id="cm-stage" name="stage" class="form-control">
                  ${b(u)}
                </select>
              </div>
            </div>
          </div>`:""}

          ${r.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="">— Sem status —</option>
                ${r.map(w=>`<option value="${p(w.name)}" ${(e==null?void 0:e.status)===w.name?"selected":""}>${p(w.name)}</option>`).join("")}
              </select>
            </div>
          </div>`:""}

          ${d.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Tags</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                ${d.map(w=>`
                  <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:5px 12px;border-radius:20px;background:${w.color}18;border:1.5px solid ${w.color}55;font-size:12px;font-weight:600;color:${w.color};transition:opacity .15s;">
                    <input type="checkbox" name="tag" value="${p(w.name)}" style="margin:0;accent-color:${w.color};" ${((e==null?void 0:e.tags)||[]).includes(w.name)?"checked":""}>
                    ${p(w.name)}
                  </label>`).join("")}
              </div>
            </div>
          </div>`:""}

          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${p((e==null?void 0:e.notes)||"")}</textarea>
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
  `,document.body.appendChild(x);const E=()=>x.remove();(I=document.getElementById("cm-close"))==null||I.addEventListener("click",E),(B=document.getElementById("cm-cancel"))==null||B.addEventListener("click",E),x.addEventListener("click",w=>{w.target===x&&E()}),($=document.getElementById("cm-pipe"))==null||$.addEventListener("change",w=>{const h=document.getElementById("cm-stage");h&&(h.innerHTML=b(w.target.value))}),(L=document.getElementById("cm-delete"))==null||L.addEventListener("click",async()=>{if(!confirm(`Excluir o contato "${e==null?void 0:e.name}"?`))return;await y.from("leads").delete().eq("id",e.id);const w=X.findIndex(h=>String(h.id)===String(e.id));w>=0&&X.splice(w,1),E(),le()}),(k=document.getElementById("cm-save"))==null||k.addEventListener("click",async()=>{var D,R,U,Y,te,be,he;const w=document.getElementById("contato-form");if(!w.checkValidity()){w.reportValidity();return}const h=new FormData(w),S=document.getElementById("cm-save");S.disabled=!0,S.textContent="Salvando…";const T=h.getAll("tag"),C=h.get("pipeline_id")||null,M={name:(D=h.get("name"))==null?void 0:D.trim(),company:((R=h.get("company"))==null?void 0:R.trim())||null,email:((U=h.get("email"))==null?void 0:U.trim())||null,phone:((Y=h.get("phone"))==null?void 0:Y.trim())||null,job_title:((te=h.get("job_title"))==null?void 0:te.trim())||null,city_interest:((be=h.get("city_interest"))==null?void 0:be.trim())||null,notes:((he=h.get("notes"))==null?void 0:he.trim())||null,pipeline_id:C,stage:h.get("stage")||null,status:h.get("status")||null,tags:T,assigned_to:(f==null?void 0:f.id)||null,tenant_id:(f==null?void 0:f.tenant_id)||null,source:(e==null?void 0:e.source)||"manual"};let A;if(n){if({error:A}=await y.from("leads").update(M).eq("id",e.id),!A){const O=X.findIndex(re=>String(re.id)===String(e.id));O>=0&&(X[O]={...X[O],...M})}}else{const{data:O,error:re}=await y.from("leads").insert(M).select();A=re,!A&&(O!=null&&O[0])&&X.unshift(O[0])}if(S.disabled=!1,S.textContent=n?"Salvar":"Criar Contato",A){alert("Erro: "+A.message);return}E(),le()})}let ue=[];function sa(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{ue=a.target.result.split(`
`).filter(s=>s.trim()).slice(1).map(s=>{const[d,r,c,m,g]=s.split(",").map(u=>u.trim().replace(/^"|"$/g,""));return{name:d,email:r,phone:c,company:m,job_title:g}}).filter(s=>s.name);const i=document.getElementById("import-preview");i&&(i.textContent=`${ue.length} contato(s) encontrados para importar.`);const l=document.getElementById("import-modal-confirm");l&&(l.disabled=ue.length===0)},n.readAsText(t)}async function la(){if(!ue.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=ue.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(f==null?void 0:f.id)||null,tenant_id:(f==null?void 0:f.tenant_id)||null})),{error:n}=await y.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Je(),await wt(),alert(`${t.length} contato(s) importados com sucesso!`)}function da(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),ue=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Je(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const ra="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function ye(e){return(await fetch(ra,{method:"POST",headers:{Authorization:`Bearer ${Tt}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function pt(e){var d,r,c,m;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),i=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:g}}=await y.auth.getUser();n.value=(g==null?void 0:g.email)||""}const s=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=s),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),i==null||i.addEventListener("change",g=>{const u=g.target.files[0];if(!u)return;const b=URL.createObjectURL(u);a&&(a.src=b,a.style.display=""),o&&(o.style.display="none")}),(d=document.getElementById("btn-change-password"))==null||d.addEventListener("click",async()=>{var v,I;const g=((v=document.getElementById("change-password-new"))==null?void 0:v.value)||"",u=((I=document.getElementById("change-password-confirm"))==null?void 0:I.value)||"",b=document.getElementById("change-password-msg"),x=document.getElementById("btn-change-password");if(b&&(b.style.display="none"),g.length<6){b&&(b.textContent="Mínimo 6 caracteres.",b.style.display="");return}if(g!==u){b&&(b.textContent="As senhas não coincidem.",b.style.display="");return}x&&(x.disabled=!0,x.textContent="Salvando…");const{error:E}=await y.auth.updateUser({password:g});x&&(x.disabled=!1,x.textContent="Salvar Nova Senha"),E?b&&(b.textContent="Erro: "+E.message,b.style.display=""):(b&&(b.style.color="#16a34a",b.textContent="Senha alterada com sucesso!",b.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var I;const g=t.value.trim();let u=(f==null?void 0:f.avatar_url)||"";const b=i==null?void 0:i.files[0],x=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",b)try{const B=await Le(b,400,.85),$=`avatars/${f.id}-${Date.now()}.jpg`,{error:L}=await y.storage.from("imoveis").upload($,B,{contentType:"image/jpeg",upsert:!0});if(!L){const{data:{publicUrl:k}}=y.storage.from("imoveis").getPublicUrl($);u=k}}catch(B){console.error("Avatar upload:",B)}const{error:E}=await y.from("profiles").update({name:g,avatar_url:u}).eq("id",f.id);if(l.disabled=!1,l.textContent=x,E){alert("Erro ao salvar perfil.");return}f={...f,name:g,avatar_url:u},ze(f);const v=document.getElementById("settings-avatar-initial");v&&(v.textContent=((I=g[0])==null?void 0:I.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const g=document.getElementById("settings-corretores-section");g&&(g.style.display=""),await He(),(r=document.getElementById("btn-invite-corretor"))==null||r.addEventListener("click",async()=>{var I,B;const b=(I=document.getElementById("invite-email"))==null?void 0:I.value.trim(),x=(B=document.getElementById("invite-password"))==null?void 0:B.value.trim(),E=document.getElementById("btn-invite-corretor"),v=document.getElementById("invite-note");if(!b){alert("Informe o e-mail do corretor.");return}if(!x||x.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}E&&(E.disabled=!0,E.textContent="Criando…"),v&&(v.style.display="none");try{const $=await ye({email:b,password:x,tenant_id:(f==null?void 0:f.tenant_id)||null});if($.success){const L=document.getElementById("invite-email"),k=document.getElementById("invite-password");L&&(L.value=""),k&&(k.value=""),await He(),v&&($.email_sent===!1?(v.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${p(b)}<br>
                <strong>Senha:</strong> ${p(x)}`,v.style.color="#0f172a"):(v.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",v.style.color="#16a34a"),v.style.display="")}else alert("Erro: "+($.error||"Falha desconhecida"))}catch($){alert("Erro ao criar acesso: "+$.message)}finally{E&&(E.disabled=!1,E.textContent="+ Criar Acesso")}});const u=document.getElementById("settings-locations-section");u&&(u.style.display=""),await we(),(c=document.getElementById("loc-add-city-btn"))==null||c.addEventListener("click",async()=>{const b=document.getElementById("loc-new-city"),x=b==null?void 0:b.value.trim();if(!x)return;const{error:E}=await y.from("locations").insert({type:"cidade",name:x});if(E){alert("Erro ao adicionar cidade.");return}b&&(b.value=""),await we(),tt()}),(m=document.getElementById("loc-add-neighborhood-btn"))==null||m.addEventListener("click",async()=>{var I;const b=parseInt((I=document.getElementById("loc-new-neighborhood-city"))==null?void 0:I.value,10),x=document.getElementById("loc-new-neighborhood"),E=x==null?void 0:x.value.trim();if(!b||!E){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:v}=await y.from("locations").insert({type:"bairro",name:E,parent_id:b});if(v){alert("Erro ao adicionar bairro.");return}x&&(x.value=""),await we()})}}async function He(){const e=document.getElementById("corretores-list");if(!e)return;let t=y.from("profiles").select("*").order("created_at");f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const i=(o.name||"?")[0].toUpperCase(),l=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${p(i)}</div>`,s=o.id===(f==null?void 0:f.id),d=o.active!==!1,r=d?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',c=s?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,m=s?"":d?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,g=s?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${l}
        <div>
          <div class="corretor-name">${p(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${r}
        ${c}
        ${m}
        ${g}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await y.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.uid,l=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const s=await ye({action:"toggle",userId:i,active:!l});s.success||alert("Erro: "+(s.error||"Falha desconhecida"))}catch(s){alert("Erro: "+s.message)}await He()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var s,d;const i=o.dataset.uid,l=((d=(s=o.closest(".corretor-item"))==null?void 0:s.querySelector(".corretor-name"))==null?void 0:d.textContent)||"este corretor";if(confirm(`Excluir "${l}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const r=await ye({action:"delete",userId:i});r.success||alert("Erro ao excluir: "+(r.error||"Falha desconhecida"))}catch(r){alert("Erro: "+r.message)}await He()}})})}async function $t(){const{data:e,error:t}=await y.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):($e=e||[],$e)}function de(){return $e.filter(e=>e.type==="cidade")}function et(e){return $e.filter(t=>t.type==="bairro"&&t.parent_id===e)}function tt(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=de();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${p(a.name)}</option>`).join(""),t&&(e.value=t)}async function we(){await $t();const e=de(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(i=>`
        <div class="loc-item">
          <span class="loc-item-name">${p(i.name)}</span>
          <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=$e.filter(i=>i.type==="bairro");n.innerHTML=o.length?o.map(i=>{const l=e.find(s=>s.id===i.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${p(i.name)}</div>
              ${l?`<div class="loc-item-sub">${p(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(i=>`<option value="${i.id}">${p(i.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{const l=i.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:s}=await y.from("locations").delete().eq("id",i.dataset.id);if(s){alert("Erro ao excluir.");return}await we(),tt()})}),n.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await y.from("locations").delete().eq("id",i.dataset.id);if(l){alert("Erro ao excluir.");return}await we()})})}function ut(){var n,a,o,i,l,s,d,r,c,m,g,u,b,x,E,v,I,B,$,L;document.querySelectorAll(".filter-btn").forEach(k=>{k.addEventListener("click",()=>{const w=k.closest(".filter-btns"),h=k.classList.contains("active");w.querySelectorAll(".filter-btn").forEach(S=>S.classList.remove("active")),h||k.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var T;const k=(T=document.getElementById("f-city"))==null?void 0:T.value,w=de().find(C=>C.name===k),h=w?et(w.id):[],S=document.getElementById("f-neighborhood");S&&(S.innerHTML='<option value="">Todos</option>'+h.map(C=>`<option value="${C.name}">${p(C.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{ke(Qe(_))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{const k=document.querySelector(".admin-filter-panel");if(k){k.querySelectorAll('input[type="text"], input[type="number"]').forEach(h=>{h.value=""}),k.querySelectorAll("select").forEach(h=>{h.selectedIndex=0});const w=document.getElementById("f-neighborhood");w&&(w.innerHTML='<option value="">Todos</option>'),k.querySelectorAll(".filter-btn.active").forEach(h=>h.classList.remove("active"))}ke(_)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(k=>{k.addEventListener("click",()=>{se(k.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(k=>{k.addEventListener("click",()=>{se(k.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(k=>{k.addEventListener("click",w=>{w.stopPropagation();const h=k.closest(".topnav-dropdown");h==null||h.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(S=>{S!==h&&S.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(k=>k.classList.remove("open"))}),(i=document.getElementById("modal-close"))==null||i.addEventListener("click",Ce),(l=document.getElementById("modal-cancel"))==null||l.addEventListener("click",Ce),(s=document.getElementById("property-modal"))==null||s.addEventListener("click",k=>{k.target.id==="property-modal"&&Ce()}),(d=document.getElementById("btn-new-property"))==null||d.addEventListener("click",()=>{H=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",oe="",qe([]),Fe("Novo Imóvel")}),(r=document.getElementById("logout-btn"))==null||r.addEventListener("click",async()=>{await y.auth.signOut(),location.reload()}),(c=document.getElementById("view-prev"))==null||c.addEventListener("click",()=>{G=(G-1+Q.length)%Q.length,Me()}),(m=document.getElementById("view-next"))==null||m.addEventListener("click",()=>{G=(G+1)%Q.length,Me()}),(g=document.getElementById("view-modal-close"))==null||g.addEventListener("click",Se),(u=document.getElementById("view-modal-close2"))==null||u.addEventListener("click",Se),(b=document.getElementById("view-modal"))==null||b.addEventListener("click",k=>{k.target.id==="view-modal"&&Se()}),(x=document.getElementById("view-modal-share"))==null||x.addEventListener("click",()=>{const k=document.getElementById("share-panel");if(!k)return;const w=k.style.display!=="none";k.style.display=w?"none":"block"}),(E=document.getElementById("share-whatsapp"))==null||E.addEventListener("click",()=>{var R,U,Y;const k=(R=document.getElementById("share-link-input"))==null?void 0:R.value;if(!k)return;const w=Number((U=document.getElementById("share-panel"))==null?void 0:U.dataset.pid),h=_.find(te=>te.id===w),S=(h==null?void 0:h.title)||((Y=document.getElementById("view-modal-title"))==null?void 0:Y.textContent)||"Imóvel",T=h!=null&&h.price?` — ${ve(h.price,"pt")}`:"",C=h!=null&&h.reference?` | Ref: ${h.reference}`:"",M=[h==null?void 0:h.neighborhood,h==null?void 0:h.city].filter(Boolean).join(", "),A=M?`
📍 ${M}`:"",D=encodeURIComponent(`Olha esse imóvel que encontrei: *${S}*${T}${C}${A}

${k}`);window.open("https://wa.me/?text="+D,"_blank")}),(v=document.getElementById("share-instagram"))==null||v.addEventListener("click",()=>{var w,h;const k=(w=document.getElementById("share-link-input"))==null?void 0:w.value;k&&((h=navigator.clipboard)==null||h.writeText(k),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(I=document.getElementById("share-email"))==null||I.addEventListener("click",()=>{var T,C;const k=(T=document.getElementById("share-link-input"))==null?void 0:T.value;if(!k)return;const w=((C=document.getElementById("view-modal-title"))==null?void 0:C.textContent)||"Imóvel",h=encodeURIComponent("Imóvel: "+w),S=encodeURIComponent(`Olá! Segue o link do imóvel:

`+k);window.open("mailto:?subject="+h+"&body="+S,"_blank")}),(B=document.getElementById("share-copy"))==null||B.addEventListener("click",()=>{var w;const k=document.getElementById("share-link-input");k&&((w=navigator.clipboard)==null||w.writeText(k.value).then(()=>{const h=document.getElementById("share-copy"),S=h.textContent;h.textContent="✅ Copiado!",setTimeout(()=>{h.textContent=S},2e3)}))}),($=document.getElementById("view-modal-edit"))==null||$.addEventListener("click",()=>{var M;if((f==null?void 0:f.role)!=="admin"&&(f==null?void 0:f.role)!=="super_admin")return;const k=Number(document.getElementById("view-modal-edit").dataset.pid),w=_.find(A=>A.id===k);if(!w)return;Se(),H=w.id;const h=document.getElementById("property-form"),S=document.getElementById("form-submit-btn");S.textContent="Salvar Alterações",h.querySelector('[name="title"]').value=w.title||"",h.querySelector('[name="rua"]').value=w.rua||"",h.querySelector('[name="numero"]').value=w.numero||"",h.querySelector('[name="city"]').value=w.city||"",h.querySelector('[name="price"]').value=w.price||"",h.querySelector('[name="bedrooms"]').value=w.bedrooms||"",h.querySelector('[name="suites"]').value=w.suites||"",h.querySelector('[name="parking"]').value=w.parking||"",h.querySelector('[name="description"]').value=w.description||"",h.querySelector('[name="construction_status"]').value=w.construction_status||"",h.querySelector('[name="owner_name"]').value=w.owner_name||"",h.querySelector('[name="owner_phone"]').value=w.owner_phone||"",h.querySelector('[name="owner_email"]').value=w.owner_email||"",h.querySelector('[name="owner_notes"]').value=w.owner_notes||"",h.querySelector('[name="condominium"]').value=w.condominium||"";const T=document.getElementById("adminPublished");T&&(T.value=w.published===!0?"true":"false");const C=document.getElementById("adminCitySelect");C&&(C.value=w.city||"",C.dispatchEvent(new Event("change")),setTimeout(()=>{const A=document.getElementById("adminNeighborhood");A&&(A.value=w.neighborhood||"")},50)),oe=w.cover_image||((M=w.images)==null?void 0:M[0])||"",qe(w.images||[]),Fe("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(k=>{k.addEventListener("click",()=>{var w;document.querySelectorAll(".tab-btn").forEach(h=>h.classList.remove("active")),k.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(h=>h.classList.add("hidden")),(w=document.getElementById(`tab-${k.dataset.tab}`))==null||w.classList.remove("hidden")})}),(L=document.getElementById("admin-properties"))==null||L.addEventListener("click",k=>{if(k.target.closest(".action-btns"))return;const w=k.target.closest("tr");if(!w)return;const h=Number(w.dataset.id);if(!h)return;const S=_.find(T=>T.id===h);S&&Gt(S)})}document.addEventListener("DOMContentLoaded",async()=>{var s,d,r;const t=window.location.hostname.replace(/^www\./,"");if(t&&t!=="localhost"&&t!=="127.0.0.1"){let c=null;for(const m of[t,"www."+t]){const{data:g}=await y.from("tenants").select("id").eq("domain",m).maybeSingle();if(g!=null&&g.id){c=g;break}}c!=null&&c.id&&_e(c.id)}await Promise.all([St(),$t()]),ne=F("company.whatsapp",ne),Ke(),Dt(),Pt();const n=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");n&&a&&(tt(),n.addEventListener("change",()=>{const c=de().find(g=>g.name===n.value),m=c?et(c.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+m.map(g=>`<option value="${g.name}">${p(g.name)}</option>`).join("")}));const o=document.getElementById("admin-login"),i=document.getElementById("admin-root");if(o){const c=new URLSearchParams(window.location.hash.replace("#","")),m=new URLSearchParams(window.location.search),g=c.get("type")||m.get("type")||"",u=bt||g==="recovery"||g==="invite"||window.location.hash.includes("access_token")||m.has("code"),b=document.getElementById("password-reset-overlay");if(u){o.style.display="none",i&&i.classList.add("hidden"),b&&(b.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async E=>{var k,w;E.preventDefault();const v=((k=document.getElementById("new-password"))==null?void 0:k.value)||"",I=((w=document.getElementById("confirm-password"))==null?void 0:w.value)||"",B=document.getElementById("password-reset-msg"),$=E.target.querySelector('button[type="submit"]');if(B&&(B.style.display="none"),v!==I){B&&(B.textContent="As senhas não coincidem.",B.style.display="");return}$&&($.disabled=!0,$.textContent="Salvando…");const{error:L}=await y.auth.updateUser({password:v});if(L){B&&(B.textContent="Erro: "+L.message,B.style.display=""),$&&($.disabled=!1,$.textContent="Definir Senha");return}window.location.href=window.location.pathname}),m.has("code")&&await y.auth.exchangeCodeForSession(m.get("code")??"");return}const{data:{session:x}}=await y.auth.getSession();if(x){if(o.classList.add("hidden"),i&&i.classList.remove("hidden"),Pe(),ut(),dt(),window.lucide&&lucide.createIcons(),f=await st(x.user.id),!f){await y.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden");return}if(f.active===!1){await y.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(f.needs_password_reset){o.style.display="none",i&&i.classList.add("hidden");const E=document.getElementById("password-reset-overlay");E&&(E.style.display="flex"),(d=document.getElementById("password-reset-form"))==null||d.addEventListener("submit",async v=>{var w,h;v.preventDefault();const I=((w=document.getElementById("new-password"))==null?void 0:w.value)||"",B=((h=document.getElementById("confirm-password"))==null?void 0:h.value)||"",$=document.getElementById("password-reset-msg"),L=v.target.querySelector('button[type="submit"]');if($&&($.style.display="none"),I!==B){$&&($.textContent="As senhas não coincidem.",$.style.display="");return}if(I.length<6){$&&($.textContent="Mínimo 6 caracteres.",$.style.display="");return}L&&(L.disabled=!0,L.textContent="Salvando…");const{error:k}=await y.auth.updateUser({password:I});if(k){$&&($.textContent="Erro: "+k.message,$.style.display=""),L&&(L.disabled=!1,L.textContent="Definir Senha");return}await y.from("profiles").update({needs_password_reset:!1}).eq("id",f.id),window.location.href=window.location.pathname});return}_e((f==null?void 0:f.tenant_id)||null),ze(f),lt(f.role),await Ae(),await pt(f),window.lucide&&lucide.createIcons(),oa()}else{i&&i.classList.add("hidden"),o.classList.remove("hidden");const E=document.getElementById("login-form");E&&((r=document.getElementById("forgot-password-btn"))==null||r.addEventListener("click",async()=>{var B,$;const v=($=(B=E.querySelector('input[name="email"]'))==null?void 0:B.value)==null?void 0:$.trim();if(!v){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:I}=await y.auth.resetPasswordForEmail(v,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(I?"Erro: "+I.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),E.addEventListener("submit",async v=>{v.preventDefault();const I=new FormData(E),B=I.get("email"),$=I.get("password");if(await jt(B,$)){o.classList.add("hidden"),i&&i.classList.remove("hidden"),Pe(),ut(),window.lucide&&lucide.createIcons();const{data:{session:k}}=await y.auth.getSession();if(f=k?await st(k.user.id):null,!f){await y.auth.signOut();return}if(f.active===!1){await y.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}dt(),_e((f==null?void 0:f.tenant_id)||null),ze(f),lt(f.role),await Ae(),await pt(f),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else Pe();await Be();const l=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();_t(l),Ct(ne)});async function ca(){const e=_.filter(o=>!o.reference);if(!e.length)return;const t=_.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,i)=>o.id-i.id);for(const o of a){const i="IO-"+String(n).padStart(4,"0"),{error:l}=await y.from("properties").update({reference:i}).eq("id",o.id);if(!l){const s=_.findIndex(d=>d.id===o.id);s>=0&&(_[s].reference=i),n++}}ke(Qe(_))}async function ma(){const e=_.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(i=>!i.includes("/wm-")))continue;const a=[];let o=!1;for(const i of t.images)if(i.includes("/wm-"))a.push(i);else try{const l=await pa(i);a.push(l),o=!0}catch{a.push(i)}if(o){await y.from("properties").update({images:a}).eq("id",t.id);const i=_.findIndex(l=>l.id===t.id);i>=0&&(_[i].images=a)}}ke(Qe(_))}}async function pa(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),i=o.ok?await o.blob():null,l=i?URL.createObjectURL(i):null;return new Promise(s=>{const d=new Image;d.onload=()=>{URL.revokeObjectURL(a);const r=document.createElement("canvas"),c=1200;let m=d.width,g=d.height;m>c&&(g=Math.round(g*c/m),m=c),r.width=m,r.height=g;const u=r.getContext("2d");u.drawImage(d,0,0,m,g);const b=x=>{if(x){const E=Math.round(m*.18),v=Math.round(x.naturalHeight*E/x.naturalWidth),I=Math.round(m*.02);u.globalAlpha=.45,u.drawImage(x,m-E-I,g-v-I,E,v),u.globalAlpha=1}r.toBlob(async E=>{try{const v=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:I}=await y.storage.from("imoveis").upload(v,E,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(I){console.error("Upload watermark error:",I),s(e);return}const{data:{publicUrl:B}}=y.storage.from("imoveis").getPublicUrl(v);s(B)}catch(v){console.error("Watermark upload exception:",v),s(e)}},"image/jpeg",.82)};if(l){const x=new Image;x.onload=()=>{URL.revokeObjectURL(l),b(x)},x.onerror=()=>{URL.revokeObjectURL(l),b(null)},x.src=l}else b(null)},d.onerror=()=>{URL.revokeObjectURL(a),s(e)},d.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function V(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function at(e,t="assets"){const n=await Le(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await y.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:i}}=y.storage.from("imoveis").getPublicUrl(a);return i}async function ua(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",j()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>p(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const i=o.target.files[0];if(i)try{const l=await at(i,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const i=await pe([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);i&&Ke(),o.disabled=!1,o.textContent="Salvar Identidade",V(document.getElementById("co-identity-msg"),i)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const i=document.getElementById("co-whatsapp").value.trim(),l=await pe([["company.whatsapp",i],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&i&&(ne=i),o.disabled=!1,o.textContent="Salvar Contatos",V(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const i=await pe([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",V(document.getElementById("co-social-msg"),i)})}async function ga(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",j()),n={};t==null||t.forEach(c=>{n[c.key]=c.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",i=n["visual.secondary_bg"]||"#1a2f4a",l=n["visual.hero_bg_url"]||"",s=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${p(l)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 <strong>Foto de fundo do banner</strong> no topo do site. Recomendado: 1920×1080 px.</p>
        <div id="vis-hero-preview" style="margin-top:10px;display:${l?"":"none"}">
          <img src="${p(l)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function d(c,m,g){const u=document.getElementById(c),b=document.getElementById(m);u==null||u.addEventListener("input",x=>{b.value=x.target.value,g()}),b==null||b.addEventListener("input",x=>{/^#[0-9a-fA-F]{6}$/.test(x.target.value)&&(u.value=x.target.value,g())})}function r(){var m,g,u,b;const c=((m=document.getElementById("col-accent-hex"))==null?void 0:m.value)||"#b8962e";(g=document.getElementById("vp-bar"))==null||g.style.setProperty("background",c),(u=document.getElementById("vp-dot"))==null||u.style.setProperty("background",c),(b=document.getElementById("vp-btn"))==null||b.style.setProperty("background",c),document.documentElement.style.setProperty("--accent",c)}d("col-accent","col-accent-hex",r),d("col-primary","col-primary-hex",()=>{}),d("col-secondary","col-secondary-hex",()=>{}),r(),document.getElementById("vis-hero-file").addEventListener("change",async c=>{const m=c.target.files[0];if(m)try{const g=await at(m,"hero");document.getElementById("vis-hero-url").value=g;const u=document.getElementById("vis-hero-preview");u.innerHTML=`<img src="${g}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,u.style.display=""}catch(g){alert("Erro no upload: "+g.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const c=document.getElementById("visual-save-colors");c.disabled=!0,c.textContent="Salvando…";const m=await pe([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);m&&Ke(),c.disabled=!1,c.textContent="Salvar Cores",V(document.getElementById("visual-colors-msg"),m)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",r())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const c=document.getElementById("visual-save-images");c.disabled=!0,c.textContent="Salvando…";const m=await pe([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);c.disabled=!1,c.textContent="Salvar Imagens",V(document.getElementById("visual-images-msg"),m)})}async function va(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("site_content").select("*").eq("tenant_id",j()),n={};t==null||t.forEach(d=>{n[d.key]=d});const a=(d,r)=>{var c;return p(((c=n[d])==null?void 0:c[`value_${r}`])||"")},o=["pt","en","es"],i={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=d=>o.map(r=>`<button class="content-tab${r===d?" active":""}" data-lang="${r}">${i[r]}</button>`).join(""),s=d=>`
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
      <div class="content-tabs" id="sc-tabs">${l("pt")}</div>
      <div id="sc-panels">
        ${o.map(d=>`<div class="content-panel${d==="pt"?" active":""}" data-panel="${d}">${s(d)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",d=>{var c;const r=d.target.closest(".content-tab");r&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(m=>m.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(m=>m.classList.remove("active")),r.classList.add("active"),(c=document.querySelector(`#sc-panels [data-panel="${r.dataset.lang}"]`))==null||c.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const d=document.getElementById("sc-save-btn");d.disabled=!0,d.textContent="Salvando…";const r={};document.querySelectorAll(".sc-field").forEach(m=>{const g=m.dataset.key,u=m.dataset.lang;r[g]||(r[g]={}),r[g][u]=m.value});let c=!0;for(const[m,g]of Object.entries(r))await Oe(m,{pt:g.pt,en:g.en,es:g.es})||(c=!1);d.disabled=!1,d.textContent="Salvar Conteúdo",V(document.getElementById("sc-save-msg"),c)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const d=document.getElementById("seo-save-btn");d.disabled=!0,d.textContent="Salvando…";const r=document.getElementById("seo-title").value.trim(),c=document.getElementById("seo-desc").value.trim(),m=await Oe("seo.title_pt",{pt:r,en:r,es:r})&&await Oe("seo.description_pt",{pt:c,en:c,es:c});d.disabled=!1,d.textContent="Salvar SEO",V(document.getElementById("seo-save-msg"),m)})}async function fa(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await K())}async function K(){const e=document.getElementById("crm-body");if(!e)return;const t=j(),[{data:n},{data:a},{data:o},{data:i}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",t).order("sort_order"),y.from("crm_stages").select("*").eq("tenant_id",t).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",t).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("sort_order")]),l=n||[],s=l.find(u=>u.is_default)||l[0],d=l.map(u=>`<option value="${u.id}"${u.id===(s==null?void 0:s.id)?" selected":""}>${p(u.name)}</option>`).join(""),c=(a||[]).filter(u=>u.pipeline_id===(s==null?void 0:s.id)).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${p(u.name)}</span>
      <input type="color" value="${u.color}" data-sid="${u.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${u.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',m=(o||[]).map(u=>`<span class="tag-chip" style="background:${u.color}" data-id="${u.id}">
      ${p(u.name)}
      <button class="tag-chip-del" data-id="${u.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',g=(i||[]).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${p(u.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${u.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${u.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${d}</select>
        <button class="btn-secondary" id="crm-add-pipeline" style="font-size:13px;padding:7px 14px">+ Novo Funil</button>
      </div>
      <div class="stages-list" id="crm-stages-list">${c}</div>
      <div class="stage-add-row">
        <input id="crm-new-stage" type="text" class="form-control" placeholder="Nome da etapa…">
        <input type="color" id="crm-new-stage-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <button class="btn-primary" id="crm-add-stage">Adicionar Etapa</button>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏷️</span> Tags</div>
      <div class="tags-grid" id="crm-tags-grid">${m}</div>
      <div class="tag-add-row">
        <input id="crm-new-tag" type="text" class="form-control" placeholder="Nome da tag…">
        <input type="color" id="crm-new-tag-color" value="#b8962e">
        <button class="btn-primary" id="crm-add-tag">Adicionar</button>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📋</span> Status de Leads</div>
      <div class="stages-list" id="crm-status-list">${g}</div>
      <div class="stage-add-row">
        <input id="crm-new-status" type="text" class="form-control" placeholder="Nome do status…">
        <input type="color" id="crm-new-status-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text);white-space:nowrap">
          <input type="checkbox" id="crm-new-status-final"> Status final
        </label>
        <button class="btn-primary" id="crm-add-status">Adicionar</button>
      </div>
    </div>
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const u=document.getElementById("crm-new-stage").value.trim(),b=document.getElementById("crm-new-stage-color").value,x=parseInt(document.getElementById("crm-pipe-sel").value,10);u&&(await y.from("crm_stages").insert({pipeline_id:x,name:u,color:b,sort_order:99,tenant_id:j()}),document.getElementById("crm-new-stage").value="",await K())}),e.querySelectorAll(".stage-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await y.from("crm_stages").delete().eq("id",u.dataset.id),await K())})}),e.querySelectorAll(".stage-color-pick").forEach(u=>{u.addEventListener("change",async b=>{await y.from("crm_stages").update({color:b.target.value}).eq("id",u.dataset.sid);const x=u.closest(".stage-item").querySelector(".stage-color-dot");x&&(x.style.background=b.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const u=document.getElementById("crm-new-tag").value.trim(),b=document.getElementById("crm-new-tag-color").value;u&&(await y.from("crm_tags").insert({name:u,color:b,tenant_id:j()}),document.getElementById("crm-new-tag").value="",await K())}),e.querySelectorAll(".tag-chip-del").forEach(u=>{u.addEventListener("click",async()=>{await y.from("crm_tags").delete().eq("id",u.dataset.id),await K()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const u=document.getElementById("crm-new-status").value.trim(),b=document.getElementById("crm-new-status-color").value,x=document.getElementById("crm-new-status-final").checked;u&&(await y.from("crm_lead_statuses").insert({name:u,color:b,is_final:x,sort_order:99,tenant_id:j()}),document.getElementById("crm-new-status").value="",await K())}),e.querySelectorAll(".status-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover este status?")&&(await y.from("crm_lead_statuses").delete().eq("id",u.dataset.id),await K())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var x;const u=(x=prompt("Nome do novo funil:"))==null?void 0:x.trim();if(!u)return;const{error:b}=await y.from("crm_pipelines").insert({name:u,sort_order:99,tenant_id:j()});if(b){alert("Erro ao criar funil: "+b.message);return}Xe=!1,await K()})}async function ya(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("integrations").select("*"),n={};t==null||t.forEach(s=>{n[s.key]=s});const a=s=>{var d;return p(((d=n[s])==null?void 0:d.value)||"")},o=s=>{var d;return(d=n[s])!=null&&d.enabled?"checked":""},i=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
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
      ${l.map(s=>`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var m;const s=document.getElementById("intg-save-tracking");s.disabled=!0,s.textContent="Salvando…";let d=!0;const r=document.querySelectorAll(".intg-val"),c=document.querySelectorAll(".intg-toggle");for(let g=0;g<r.length;g++){const u=r[g].dataset.key,b=r[g].value.trim(),x=((m=c[g])==null?void 0:m.checked)??!1;await De(u,b,x)||(d=!1)}s.disabled=!1,s.textContent="Salvar Integrações",V(document.getElementById("intg-tracking-msg"),d)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const s=document.getElementById("intg-save-smtp");s.disabled=!0,s.textContent="Salvando…";const d=document.querySelectorAll(".smtp-field");let r=!0;for(const m of d)await De(m.dataset.key,m.value.trim(),!0)||(r=!1);const c=document.getElementById("smtp-pass").value;c&&(await De("smtp_pass",c,!0)||(r=!1)),s.disabled=!1,s.textContent="Salvar SMTP",V(document.getElementById("intg-smtp-msg"),r)})}async function ba(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Ye(),document.getElementById("media-file-input").addEventListener("change",async n=>{var d,r;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),i=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");o.style.display="";let s=0;for(const c of a){l.textContent=`Enviando ${s+1}/${a.length}…`,i.style.width=`${Math.round(s/a.length*100)}%`;try{const m=await at(c,"media"),g=c.name.replace(/\.[^.]+$/,"").slice(0,60);await y.from("media_library").insert({name:g,url:m,type:"image",size:c.size,created_by:(r=(d=(await y.auth.getUser()).data)==null?void 0:d.user)==null?void 0:r.id})}catch(m){console.error("Media upload error:",m)}s++}i.style.width="100%",l.textContent=`✓ ${s} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",i.style.width="0"},2e3),await Ye(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Ye(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await y.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${p(a.url)}">
      <img src="${p(a.url)}" alt="${p(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${p(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${p(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation(),(i=navigator.clipboard)==null||i.writeText(a.dataset.url).then(()=>{const l=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await y.from("media_library").delete().eq("id",a.dataset.id),await Ye())})})}async function ha(){var t,n,a,o,i;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(d=>d.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(d=>d.classList.add("hidden")),l.classList.add("active");const s=e.querySelector(`#sa-panel-${l.dataset.tab}`);s&&s.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&ee(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&xa(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&gt(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&vt(),l.dataset.tab==="platform"&&ft()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",gt),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",ee),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",vt),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>Ia()),(i=e.querySelector("#sa-plat-save"))==null||i.addEventListener("click",Ea),ee(),ft())}async function ee(){var s,d;const e=document.getElementById("sa-tenants-list"),t=((d=(s=document.getElementById("sa-tenant-search"))==null?void 0:s.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=y.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const i=(a||[]).filter(r=>{var c,m;return!t||((c=r.name)==null?void 0:c.toLowerCase().includes(t))||((m=r.slug)==null?void 0:m.toLowerCase().includes(t))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const l=r=>r.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=i.map(r=>{var c;return`
    <div class="sa-list-row" data-action="open-panel" data-id="${r.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${r.logo_url?`<img class="sa-tenant-logo" src="${p(r.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${p(r.name||"—")}</div>
          <div class="sa-list-sub">${p(r.slug||"")} · ${p(((c=r.plans)==null?void 0:c.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${l(r)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${r.id}" data-active="${r.active}" title="${r.active?"Desativar":"Ativar"}">${r.active?"⏸️":"▶️"}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(r=>{r.addEventListener("click",async c=>{c.stopPropagation();const m=r.dataset.active==="true";await y.from("tenants").update({active:!m}).eq("id",r.dataset.id),ee()})}),e.querySelectorAll('[data-action="open-panel"]').forEach(r=>{r.addEventListener("click",()=>{const c=(i||[]).find(m=>String(m.id)===String(r.dataset.id));c&&$a(c)})})}async function xa(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await y.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${p(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function gt(){var s;const e=document.getElementById("sa-subs-list"),t=((s=document.getElementById("sa-sub-filter"))==null?void 0:s.value)||"";if(!e)return;e.dataset.loaded="1";let n=y.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const i={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},l={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(d=>{var r,c,m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${p(((r=d.tenants)==null?void 0:r.name)||"—")}</div>
          <div class="sa-list-sub">${p(((c=d.plans)==null?void 0:c.name)||"—")} · R$ ${Number(((m=d.plans)==null?void 0:m.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${i[d.status]||"gray"}">${l[d.status]||d.status}</span>
        <span class="sa-list-date">${d.current_period_end?new Date(d.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function vt(){var l,s;const e=document.getElementById("sa-users-list"),t=((s=(l=document.getElementById("sa-user-search"))==null?void 0:l.value)==null?void 0:s.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await y.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(d=>{var r,c;return!t||((r=d.name)==null?void 0:r.toLowerCase().includes(t))||((c=d.email)==null?void 0:c.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const i={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(d=>{var r;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(d.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${p(d.name||"—")}</div>
          <div class="sa-list-sub">${p(((r=d.tenants)==null?void 0:r.name)||"Sem imobiliária")} · ${i[d.role]||d.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${d.active!==!1?"sa-badge-green":"sa-badge-red"}">${d.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function ft(){const[e,t,n,a]=await Promise.all([y.from("tenants").select("id",{count:"exact",head:!0}),y.from("profiles").select("id",{count:"exact",head:!0}),y.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),y.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(i,l)=>{const s=document.getElementById(i);s&&(s.textContent=l??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function Ea(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await pe([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),V(t,!0)}function wa(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Ia(){var a,o,i,l,s,d;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),y.from("plans").select("id, name").then(({data:r})=>{const c=document.getElementById("nt-plan");c&&r&&(c.innerHTML='<option value="">Sem plano</option>'+r.map(m=>`<option value="${m.id}">${p(m.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",r=>{const c=document.getElementById("nt-slug");c&&!c.dataset.manual&&(c.value=wa(r.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",r=>{r.target.dataset.manual="1"}),(i=document.getElementById("nt-pwd-toggle"))==null||i.addEventListener("click",()=>{const r=document.getElementById("nt-admin-password");r.type=r.type==="password"?"text":"password"});const n=()=>t.remove();(l=document.getElementById("sa-modal-close-btn"))==null||l.addEventListener("click",n),(s=document.getElementById("nt-cancel"))==null||s.addEventListener("click",n),t.addEventListener("click",r=>{r.target===t&&n()}),(d=document.getElementById("nt-save"))==null||d.addEventListener("click",async()=>{var L,k,w,h,S,T,C,M,A,D,R,U;const r=(k=(L=document.getElementById("nt-name"))==null?void 0:L.value)==null?void 0:k.trim(),c=(h=(w=document.getElementById("nt-slug"))==null?void 0:w.value)==null?void 0:h.trim(),m=(T=(S=document.getElementById("nt-domain"))==null?void 0:S.value)==null?void 0:T.trim(),g=(C=document.getElementById("nt-plan"))==null?void 0:C.value,u=(A=(M=document.getElementById("nt-admin-email"))==null?void 0:M.value)==null?void 0:A.trim(),b=(R=(D=document.getElementById("nt-admin-password"))==null?void 0:D.value)==null?void 0:R.trim(),x=document.getElementById("nt-msg"),E=document.getElementById("nt-save");if(!r||!c){x.textContent="❌ Nome e slug são obrigatórios.",x.style.color="#ef4444";return}if(!u){x.textContent="❌ Informe o e-mail do admin.",x.style.color="#ef4444";return}if(!b||b.length<6){x.textContent="❌ A senha precisa ter mínimo 6 caracteres.",x.style.color="#ef4444";return}E.disabled=!0,E.textContent="Criando…",x.textContent="⏳ Criando imobiliária…",x.style.color="#64748b";const{data:v,error:I}=await y.from("tenants").insert({name:r,slug:c,domain:m||null,plan_id:g||null,active:!0}).select();if(I){E.disabled=!1,E.textContent="Criar Imobiliária",x.textContent="❌ "+I.message,x.style.color="#ef4444";return}const B=(U=v==null?void 0:v[0])==null?void 0:U.id;x.textContent="⏳ Criando usuário admin…";const $=await ye({email:u,password:b,role:"admin",tenant_id:B});if(!($!=null&&$.success)){E.disabled=!1,E.textContent="Criar Imobiliária",x.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+p(($==null?void 0:$.error)||"Desconhecido"),x.style.color="#f59e0b",setTimeout(()=>{n(),ee()},3e3);return}B&&($!=null&&$.user_id)&&!($!=null&&$.linked)&&await y.from("profiles").update({tenant_id:B}).eq("id",$.user_id),E.disabled=!1,E.textContent="Criar Imobiliária",$.email_sent===!1?(x.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${p($.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${p(u)}</strong><br>
          Senha: <strong>${p(b)}</strong>
        </div>`,x.style.color="#0f172a"):(x.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",x.style.color="#22c55e",setTimeout(()=>{n(),ee()},1500))})}function $a(e){var a;(a=document.getElementById("tenant-panel"))==null||a.remove();const t=document.createElement("div");t.id="tenant-panel",t.style.cssText="position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;";const n=[{id:"properties",label:"🏠 Imóveis"},{id:"leads",label:"📋 Leads"},{id:"users",label:"👥 Corretores"},{id:"api",label:"🔗 Site & API"},{id:"config",label:"⚙️ Configurações"}];t.innerHTML=`
    <div style="background:#0a1628;padding:14px 24px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:10;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.3);">
      <button id="tp-back" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;padding:7px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">← Imobiliárias</button>
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
        ${e.logo_url?`<img src="${p(e.logo_url)}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0;">`:'<div style="width:36px;height:36px;background:rgba(255,255,255,.1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏢</div>'}
        <div style="min-width:0;">
          <div style="color:#fff;font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p(e.name)}</div>
          <div style="color:#94a3b8;font-size:12px;">${p(e.slug||"")} · ${e.active!==!1?'<span style="color:#4ade80;">● Ativo</span>':'<span style="color:#f87171;">● Inativo</span>'}</div>
        </div>
      </div>
      <button id="tp-edit-btn" style="background:#c9a84c;border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">✏️ Editar dados</button>
    </div>
    <div style="background:#fff;border-bottom:2px solid #e2e8f0;padding:0 24px;display:flex;gap:0;flex-shrink:0;overflow-x:auto;">
      ${n.map((o,i)=>`<button class="tp-tab" data-tab="${o.id}" style="padding:14px 20px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:${i===0?"700":"500"};color:${i===0?"#2563eb":"#64748b"};border-bottom:2px solid ${i===0?"#2563eb":"transparent"};margin-bottom:-2px;white-space:nowrap;transition:all .15s;">${o.label}</button>`).join("")}
    </div>
    <div id="tp-content" style="padding:24px;flex:1;max-width:1200px;margin:0 auto;width:100%;box-sizing:border-box;"></div>
  `,document.body.appendChild(t),document.getElementById("tp-back").addEventListener("click",()=>t.remove()),document.getElementById("tp-edit-btn").addEventListener("click",()=>Bt(e)),t.querySelectorAll(".tp-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".tp-tab").forEach(i=>{i.style.fontWeight="500",i.style.color="#64748b",i.style.borderBottomColor="transparent"}),o.style.fontWeight="700",o.style.color="#2563eb",o.style.borderBottomColor="#2563eb",yt(e,o.dataset.tab)})}),yt(e,"properties")}async function yt(e,t){var a,o,i;const n=document.getElementById("tp-content");if(n){if(n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>',t==="properties"){const{data:l}=await y.from("properties").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1});if(!(l!=null&&l.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>';return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${l.length} imóvel(is)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:500px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;letter-spacing:.04em;">IMÓVEL</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;letter-spacing:.04em;">CIDADE</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;letter-spacing:.04em;">PREÇO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;letter-spacing:.04em;">STATUS</th>
          </tr></thead>
          <tbody>${l.map(s=>{var d;return`
            <tr style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  ${(d=s.images)!=null&&d[0]?`<img src="${s.images[0]}" style="width:52px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;">`:'<div style="width:52px;height:38px;background:#e2e8f0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>'}
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${p(s.title||"")}</div><div style="font-size:11px;color:#94a3b8;">${p(s.reference||"")}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${p([s.neighborhood,s.city].filter(Boolean).join(", "))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">R$ ${p(String(s.price||"—"))}</td>
              <td style="padding:12px 16px;text-align:center;">${s.published?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Publicado</span>':'<span style="background:#f1f5f9;color:#64748b;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Rascunho</span>'}</td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`}if(t==="leads"){const{data:l}=await y.from("leads").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}).limit(100);if(!(l!=null&&l.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">📋</div><p style="font-size:14px;">Nenhum lead ainda.</p></div>';return}const s=r=>({novo:"Novo",contato:"Contato",proposta:"Proposta",fechado:"Fechado"})[r]||r||"Novo",d=r=>({novo:"#dbeafe,#1d4ed8",contato:"#fef3c7,#92400e",proposta:"#ede9fe,#6d28d9",fechado:"#dcfce7,#15803d"})[r]||"#f1f5f9,#64748b";n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${l.length} lead(s)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:500px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">NOME</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">CONTATO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">ETAPA</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">DATA</th>
          </tr></thead>
          <tbody>${l.map(r=>{const[c,m]=d(r.stage).split(",");return`<tr style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${p(r.name||"")}</td>
              <td style="padding:12px 16px;"><div style="font-size:13px;color:#475569;">${p(r.phone||"")}</div><div style="font-size:11px;color:#94a3b8;">${p(r.email||"")}</div></td>
              <td style="padding:12px 16px;"><span style="background:${c};color:${m};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${s(r.stage)}</span></td>
              <td style="padding:12px 16px;font-size:12px;color:#94a3b8;">${new Date(r.created_at).toLocaleDateString("pt-BR")}</td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`}if(t==="users"){const{data:l}=await y.from("profiles").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}),s=`<button onclick="window._tpTenantId='${e.id}';openAddCorretorModal('${e.id}')" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;font-weight:600;">+ Adicionar Corretor</button>`;if(!(l!=null&&l.length)){n.innerHTML=`<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">👥</div><p style="font-size:14px;margin-bottom:16px;">Nenhum corretor cadastrado ainda.</p>${s}</div>`;return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${l.length} usuário(s)</h3>
          ${s}
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:400px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">USUÁRIO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">FUNÇÃO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
          </tr></thead>
          <tbody>${l.map(d=>`
            <tr style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${p(d.name||d.email||"—")}</div><div style="font-size:11px;color:#94a3b8;">${p(d.email||"")}</div></td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${p(d.role||"corretor")}</td>
              <td style="padding:12px 16px;text-align:center;">${d.active!==!1?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Ativo</span>':'<span style="background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Pausado</span>'}</td>
            </tr>`).join("")}
          </tbody>
        </table></div>
      </div>`}if(t==="api"){const l="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api",s=`https://omarcorretor.com.br/demo.html?key=${e.id}`;n.innerHTML=`
      <div style="display:grid;gap:20px;max-width:800px;">
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🔑 Chave de API</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Use para conectar qualquer site externo ao CRM desta imobiliária.</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <input type="text" value="${p(e.id)}" readonly style="flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:monospace;font-size:13px;background:#f8fafc;min-width:0;">
            <button id="tp-copy-key" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🌐 Site Demonstração</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.</p>
          <a href="${p(s)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">Abrir site demo →</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${p(s)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${l}/properties?key=${p(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${l}/properties/{id}?key=${p(e.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${l}/leads?key=${p(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${l}/settings?key=${p(e.id)}</div>
          </div>
        </div>
      </div>`,(a=document.getElementById("tp-copy-key"))==null||a.addEventListener("click",()=>{var c;(c=navigator.clipboard)==null||c.writeText(e.id);const d=document.getElementById("tp-copy-key"),r=d.textContent;d.textContent="✅ Copiada!",setTimeout(()=>{d.textContent=r},2e3)})}if(t==="config"){const{data:l}=await y.from("settings").select("key,value").eq("tenant_id",e.id),s={};l==null||l.forEach(r=>{s[r.key]=r.value});const d=(r,c)=>`
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${r}</div>
        <div style="font-size:14px;color:#0f172a;">${p(String(c||"—"))}</div>
      </div>`;n.innerHTML=`
      <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);max-width:560px;">
        <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 20px;">⚙️ Configurações da imobiliária</h3>
        ${d("NOME DA EMPRESA",s["company.name"]||e.name)}
        ${d("TELEFONE",s["company.phone"])}
        ${d("E-MAIL",s["company.email"])}
        ${d("WHATSAPP",s["company.whatsapp"])}
        ${d("CIDADE",s["company.city"])}
        ${d("DOMÍNIO DO SITE",e.domain)}
        ${d("PLANO",((o=e.plans)==null?void 0:o.name)||"Sem plano")}
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
          <button id="tp-open-edit" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">✏️ Editar dados completos</button>
        </div>
      </div>`,(i=document.getElementById("tp-open-edit"))==null||i.addEventListener("click",()=>Bt(e))}}}function Bt(e){var r,c,m,g,u,b,x,E;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
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
            ${e.logo_url?`<img src="${p(e.logo_url)}" style="width:100%;height:100%;object-fit:cover;">`:'<span style="font-size:28px;">🏢</span>'}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · 256×256px</div>
          </div>
        </div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${p(e.name||"")}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${p(e.slug||"")}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${p(e.domain||"")}" placeholder="abc.imobipro.com.br"></div>
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
            <input id="et-api-key" class="form-input" type="text" value="${p(e.id||"")}" readonly
              style="font-family:monospace;font-size:11px;background:#fff;color:#1e3a5f;flex:1;letter-spacing:.02em;">
            <button id="et-copy-key" class="btn-secondary-sm" style="white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Endpoints disponíveis</div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([v,I,B])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${v==="GET"?"#dcfce7":"#fef9c3"};color:${v==="GET"?"#15803d":"#854d0e"};">${v}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${I}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${B}</div>
            </div>`).join("")}
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Exemplo rápido (JavaScript)</div>
        <pre style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;font-size:11px;overflow-x:auto;margin:0;line-height:1.6;"><code>const KEY = '${p(e.id)}'
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
  `,document.body.appendChild(n),y.from("plans").select("id, name").then(({data:v})=>{const I=document.getElementById("et-plan");I&&v&&(I.innerHTML='<option value="">Sem plano</option>'+v.map(B=>`<option value="${B.id}"${String(B.id)===String(e.plan_id)?" selected":""}>${p(B.name)}</option>`).join(""))}),(r=document.getElementById("et-logo-input"))==null||r.addEventListener("change",v=>{const I=v.target.files[0];if(!I)return;const B=URL.createObjectURL(I),$=document.getElementById("et-logo-preview");$&&($.innerHTML=`<img src="${B}" style="width:100%;height:100%;object-fit:cover;">`)}),(c=document.getElementById("et-logo-preview"))==null||c.addEventListener("click",()=>{var v;(v=document.getElementById("et-logo-input"))==null||v.click()}),(m=document.getElementById("et-pwd-toggle"))==null||m.addEventListener("click",()=>{const v=document.getElementById("et-admin-password");v.type=v.type==="password"?"text":"password"}),(g=document.getElementById("et-copy-key"))==null||g.addEventListener("click",()=>{var $,L;const v=($=document.getElementById("et-api-key"))==null?void 0:$.value;if(!v)return;(L=navigator.clipboard)==null||L.writeText(v);const I=document.getElementById("et-copy-key"),B=I.textContent;I.textContent="✅ Copiada!",setTimeout(()=>{I.textContent=B},2e3)});const o=["dados","config","api"];function i(v){o.forEach(I=>{document.getElementById(`et-pane-${I}`).style.display=I===v?"":"none";const B=document.getElementById(`et-tab-${I}`);B.style.borderBottomColor=I===v?"#2563eb":"transparent",B.style.color=I===v?"#2563eb":"#64748b",B.style.fontWeight=I===v?"600":"500"}),v==="config"&&s()}o.forEach(v=>{var I;return(I=document.getElementById(`et-tab-${v}`))==null?void 0:I.addEventListener("click",()=>i(v))});let l=!1;async function s(){var B;if(l)return;l=!0;const{data:v}=await y.from("settings").select("key,value").eq("tenant_id",e.id),I={};v==null||v.forEach($=>{I[$.key]=$.value}),document.getElementById("et-pane-config").innerHTML=`
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${p(I["company.whatsapp"]||"")}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${p(I["company.phone"]||"")}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${p(I["company.email"]||"")}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${p(I["company.city"]||I["company.address"]||"")}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${p(I["company.slogan"]||"")}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `,(B=document.getElementById("et-cfg-save"))==null||B.addEventListener("click",async()=>{const $=document.getElementById("et-cfg-save"),L=document.getElementById("et-cfg-msg");$.disabled=!0,$.textContent="Salvando…",L.textContent="",L.style.color="#64748b";const k=document.getElementById("et-cfg-wa").value.trim().replace(/\D/g,""),w=document.getElementById("et-cfg-phone").value.trim(),h=document.getElementById("et-cfg-email").value.trim(),S=document.getElementById("et-cfg-city").value.trim(),T=document.getElementById("et-cfg-slogan").value.trim(),{error:C}=await y.from("settings").upsert([{key:"company.whatsapp",value:k,tenant_id:e.id},{key:"company.phone",value:w,tenant_id:e.id},{key:"company.email",value:h,tenant_id:e.id},{key:"company.city",value:S,tenant_id:e.id},{key:"company.address",value:S,tenant_id:e.id},{key:"company.slogan",value:T,tenant_id:e.id}],{onConflict:"tenant_id,key"});$.disabled=!1,$.textContent="💾 Salvar configurações",C?(L.textContent="❌ "+C.message,L.style.color="#ef4444"):(L.textContent="✅ Configurações salvas!",L.style.color="#22c55e")})}const d=()=>n.remove();(u=document.getElementById("et-close"))==null||u.addEventListener("click",d),(b=document.getElementById("et-cancel"))==null||b.addEventListener("click",d),n.addEventListener("click",v=>{v.target===n&&d()}),(x=document.getElementById("et-delete"))==null||x.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const I=document.getElementById("et-delete");I.disabled=!0,I.textContent="Excluindo…";const{error:B}=await y.from("tenants").delete().eq("id",e.id);if(B){alert("Erro ao excluir: "+B.message),I.disabled=!1,I.textContent="🗑️ Excluir";return}d(),ee()}),(E=document.getElementById("et-save"))==null||E.addEventListener("click",async()=>{var M,A,D,R,U,Y,te,be,he,O,re,nt;const v=(A=(M=document.getElementById("et-name"))==null?void 0:M.value)==null?void 0:A.trim(),I=(R=(D=document.getElementById("et-slug"))==null?void 0:D.value)==null?void 0:R.trim(),B=(Y=(U=document.getElementById("et-domain"))==null?void 0:U.value)==null?void 0:Y.trim(),$=(te=document.getElementById("et-plan"))==null?void 0:te.value,L=(he=(be=document.getElementById("et-admin-email"))==null?void 0:be.value)==null?void 0:he.trim(),k=(re=(O=document.getElementById("et-admin-password"))==null?void 0:O.value)==null?void 0:re.trim(),w=(nt=document.getElementById("et-logo-input"))==null?void 0:nt.files[0],h=document.getElementById("et-msg"),S=document.getElementById("et-save");if(!v){h.textContent="❌ Nome é obrigatório.",h.style.color="#ef4444";return}S.disabled=!0,S.textContent="Salvando…",h.textContent="⏳ Salvando…",h.style.color="#64748b";let T=e.logo_url;if(w)try{const q=await Le(w,256,.85),ot=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:kt}=await y.storage.from("imoveis").upload(ot,q,{contentType:"image/jpeg",upsert:!0});if(!kt){const{data:{publicUrl:Lt}}=y.storage.from("imoveis").getPublicUrl(ot);T=Lt}}catch(q){console.error("Logo upload:",q)}const{error:C}=await y.from("tenants").update({name:v,slug:I||e.slug,domain:B||null,plan_id:$||null,logo_url:T}).eq("id",e.id);if(C){S.disabled=!1,S.textContent="Salvar",h.textContent="❌ "+C.message,h.style.color="#ef4444";return}if(L&&k&&k.length>=6){h.textContent="⏳ Criando usuário admin…";const q=await ye({email:L,password:k,role:"admin",tenant_id:e.id});q!=null&&q.success?(q!=null&&q.user_id&&!(q!=null&&q.linked)&&await y.from("profiles").update({tenant_id:e.id}).eq("id",q.user_id),h.textContent="✅ Salvo e admin criado!",h.style.color="#22c55e"):(h.textContent="⚠️ Salvo, mas erro ao criar admin: "+((q==null?void 0:q.error)||"Tente novamente"),h.style.color="#f59e0b")}else h.textContent="✅ Imobiliária atualizada!",h.style.color="#22c55e";S.disabled=!1,S.textContent="Salvar",setTimeout(()=>{d(),ee()},1200)})}
