import{s as b}from"./supabase-BcuJ3xoD.js";const ve="00000000-0000-0000-0000-000000000000";let ke={},Ue={},he=ve;function ue(e){he=e||ve,ke={},Ue={}}const z=()=>he;async function At(){const[e,t]=await Promise.all([b.from("settings").select("key,value").eq("tenant_id",he),b.from("site_content").select("*").eq("tenant_id",he)]);e.data&&e.data.forEach(n=>{ke[n.key]=n.value}),t.data&&t.data.forEach(n=>{Ue[n.key]=n})}const F=(e,t=null)=>ke[e]!==void 0?ke[e]:t,Oe=(e,t="pt")=>{const n=Ue[e];return n?n[`value_${t}`]??n.value_pt??null:null};async function ye(e){const t=new Date().toISOString(),n=e.map(([o,i])=>({key:o,value:i,tenant_id:he,updated_at:t})),{error:a}=await b.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,i])=>{ke[o]=i}),!a}async function De(e,{pt:t,en:n,es:a}){const o={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:he,updated_at:new Date().toISOString()},{error:i}=await b.from("site_content").upsert(o,{onConflict:"key,tenant_id"});return i||(Ue[e]=o),!i}async function Pe(e,t,n){const{error:a}=await b.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function tt(){const e=document.documentElement,t=F("visual.accent_color","#b8962e"),n=F("visual.primary_bg","#0f1c2e"),a=F("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=F("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(s=>{s.src=o});const i=F("company.favicon_url","/favicon.ico"),d=document.querySelector('link[rel="shortcut icon"]');d&&(d.href=i);const l=F("visual.hero_bg_url","");if(l){const s=document.querySelector(".hero");s&&(s.style.backgroundImage=`url('${l}')`)}}function qt(e="pt"){const t=y=>Oe(y,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const i=document.querySelector('[data-i18n="inst.p1"]'),d=document.querySelector('[data-i18n="inst.p2"]'),l=document.querySelector('[data-i18n="inst.p3"]');i&&t("inst.bio_p1")&&(i.innerHTML=t("inst.bio_p1")),d&&t("inst.bio_p2")&&(d.innerHTML=t("inst.bio_p2")),l&&t("inst.bio_p3")&&(l.innerHTML=t("inst.bio_p3"));const s=document.querySelector('[data-i18n-num="inst.stat2num"]'),p=document.querySelector('[data-i18n="inst.stat1"]'),c=document.querySelector('[data-i18n="inst.stat2"]'),r=document.querySelector('[data-i18n="inst.stat3"]');s&&t("inst.stat2_num")&&(s.innerHTML=t("inst.stat2_num")),p&&t("inst.stat1_label")&&(p.innerHTML=t("inst.stat1_label")),c&&t("inst.stat2_label")&&(c.innerHTML=t("inst.stat2_label")),r&&t("inst.stat3_label")&&(r.innerHTML=t("inst.stat3_label"));const m=Oe("seo.title_pt",e);m&&document.title&&(document.title=m);const u=Oe("seo.description_pt",e);if(u){const y=document.querySelector('meta[name="description"]');y&&(y.content=u)}}function Mt(e){if(!e)return;const t=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const zt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let ne="5547999701743";const ie=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],Nt=5.7;function se(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/Nt).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let _=[],v=null,Le=[],Et=!1;b.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(Et=!0)});function Xe(e,t,n){try{localStorage.setItem(e,JSON.stringify({v:t,exp:Date.now()+n}))}catch{}}function Te(e){try{const t=localStorage.getItem(e);if(!t)return null;const n=JSON.parse(t);return Date.now()>n.exp?(localStorage.removeItem(e),null):n.v}catch{return null}}async function wt({background:e=!1}={}){const t=window.location.hostname;if(t==="localhost"||t==="127.0.0.1"){const{data:c,error:r}=await b.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return r&&console.error("Supabase select error:",r),c||[]}const a=`imobi_tenant_${t.replace(/^www\./,"")}`;let o=z();if(!o||o===ve){const c=Te(a);if(c)o=c,ue(o);else{const r=t.replace(/^www\./,"");for(const m of[r,"www."+r]){const{data:u}=await b.from("tenants").select("id").eq("domain",m).maybeSingle();if(u!=null&&u.id){o=u.id,ue(o);break}}o&&o!==ve&&Xe(a,o,24*60*60*1e3)}}if(!o||o===ve)return console.warn("[ImobiCRM] Tenant não encontrado para domínio:",t),[];const i=`imobi_props_${o}`,d=5*60*1e3;if(!e){const c=Te(i);if(c)return setTimeout(()=>wt({background:!0}),100),c}const{data:l,error:s}=await b.from("properties").select("*").eq("published",!0).eq("tenant_id",o).order("created_at",{ascending:!1});if(s)return console.error("Supabase select error:",s),Te(i)||[];const p=l||[];return Xe(i,p,d),e&&typeof le=="function"&&le().catch(()=>{}),p}async function jt(){let e=b.from("properties").select("*").order("created_at",{ascending:!1});(v==null?void 0:v.role)==="super_admin"||(v!=null&&v.tenant_id?e=e.eq("tenant_id",v.tenant_id):e=e.or("tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000"));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):(_=t||[],ua(),ga(),_)}async function Rt(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await b.from("properties").update(a).eq("id",t);if(o)throw o;const i=_.findIndex(d=>d.id===t);i>=0&&(_[i]={..._[i],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await b.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&_.unshift(t[0])}}async function Ht(e){const{error:t}=await b.from("properties").delete().eq("id",e);if(t)throw t;_=_.filter(n=>n.id!==e)}async function Ut(e,t){const{error:n}=await b.auth.signInWithPassword({email:e,password:t});return!n}function _e(e,t=1200,n=.78){return new Promise((a,o)=>{const i=new Image,d=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(d);const l=document.createElement("canvas");let s=i.width,p=i.height;s>t&&(p=Math.round(p*t/s),s=t),l.width=s,l.height=p;const c=l.getContext("2d");c.drawImage(i,0,0,s,p);const r=new Image;r.crossOrigin="anonymous",r.onload=()=>{const m=Math.round(s*.18),u=Math.round(r.naturalHeight*m/r.naturalWidth),y=Math.round(s*.02),h=s-m-y,x=p-u-y;c.globalAlpha=.45,c.drawImage(r,h,x,m,u),c.globalAlpha=1,l.toBlob(f=>f?a(f):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},r.onerror=()=>{l.toBlob(m=>m?a(m):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},r.src="/logo.png"},i.onerror=o,i.src=d})}async function Ot(e){const t=await _e(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await b.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=b.storage.from("imoveis").getPublicUrl(n);return o}async function Dt(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await Ot(n[o]));return a}async function le(){var r,m,u,y,h,x;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await wt();_=n,((r=document.getElementById("selecao-carousel"))==null?void 0:r.innerHTML)===""&&Pt(n);const a=((m=document.getElementById("city-filter"))==null?void 0:m.value)||"",o=((u=document.getElementById("neighborhood-filter"))==null?void 0:u.value)||"",i=((y=document.getElementById("bedrooms-filter"))==null?void 0:y.value)||"",d=((h=document.getElementById("parking-filter"))==null?void 0:h.value)||"",l=((x=document.getElementById("construction-filter"))==null?void 0:x.value)||"",{min:s,max:p}=Ft(),c=n.filter(f=>{if(a&&f.city!==a||o&&f.neighborhood!==o||i&&(i==="4+"&&Number(f.bedrooms)<4||i!=="4+"&&Number(f.bedrooms)!==Number(i))||d&&(d==="4+"&&Number(f.parking)<4||d!=="4+"&&Number(f.parking)!==Number(d))||l&&f.construction_status!==l)return!1;const w=String(f.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),B=parseInt(w,10)||0;return!(B<s||p!==1/0&&B>p)});if(e){if(!c.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=c.map(f=>{var L;const w=f.cover_image||((L=f.images)==null?void 0:L[0])||ie[0],B=[f.neighborhood,f.city].filter(Boolean).join(", "),$=encodeURIComponent(`Olá! Tenho interesse no imóvel *${f.title}*${f.reference?` (Ref: ${f.reference})`:""}. Poderia me dar mais informações?`);return`
        <div class="selecao-card">
          <img src="${w}" alt="${g(f.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${g(f.title)}</div>
            <div class="selecao-card-loc">${g(B)}</div>
            <div class="selecao-card-price">${g(se(f.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${f.id}" class="btn-det">Ver Detalhes</a>
              <a href="https://wa.me/${ne}?text=${$}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!c.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=c.map(f=>{var L;const w=(L=f.images)!=null&&L.length?f.images:ie,B=w.length,$=encodeURIComponent(`Olá! Tenho interesse no imóvel *${f.title}*${f.reference?` (Ref: ${f.reference})`:""}. Poderia me dar mais informações?`);return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${B}" data-idx="0" data-pid="${f.id}">
          <img src="${f.cover_image||w[0]}" alt="${g(f.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${B>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${g(f.title)}</strong>
          <div class="muted">${g(f.neighborhood||"")}, ${g(f.city||"")}</div>
          <div><strong>${g(se(f.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${f.bedrooms||"--"} | 🚗 ${f.parking||"--"} ${B>1?"| 📸 "+B:""}</div>
          <p class="muted">${g((f.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${f.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="https://wa.me/${ne}?text=${$}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(f=>{f.removeEventListener("click",rt),f.addEventListener("click",rt)})}function Pt(e){var o,i,d;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(l=>{var r;const s=l.cover_image||((r=l.images)==null?void 0:r[0])||ie[0],p=[l.neighborhood,l.city].filter(Boolean).join(", "),c=encodeURIComponent(`Olá! Tenho interesse no imóvel *${l.title}*${l.reference?` (Ref: ${l.reference})`:""}. Poderia me dar mais informações?`);return`
      <div class="selecao-card">
        <img src="${s}" alt="${g(l.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${g(l.title)}</div>
          <div class="selecao-card-loc">${g(p)}</div>
          <div class="selecao-card-price">${g(se(l.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${l.id}" class="btn-det">Ver Detalhes</a>
            <a href="https://wa.me/${ne}?text=${c}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(i=a==null?void 0:a.querySelector(".selecao-prev"))==null||i.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(d=a==null?void 0:a.querySelector(".selecao-next"))==null||d.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),le()};function rt(e){var l;e.stopPropagation();const t=e.currentTarget.closest(".carousel-wrap");if(!t)return;const n=parseInt(t.dataset.total,10);if(!n)return;let a=parseInt(t.dataset.idx,10)||0;const o=e.currentTarget.classList.contains("carousel-next")?1:-1;a=(a+o+n)%n,t.dataset.idx=a;const i=parseInt(t.dataset.pid,10),d=_.find(s=>s.id===i);(l=d==null?void 0:d.images)!=null&&l.length&&(t.querySelector(".carousel-img").src=d.images[a])}function Ft(){var a;const e=((a=document.getElementById("price-range"))==null?void 0:a.value)||"";if(!e)return{min:0,max:1/0};const[t,n]=e.split("-");return{min:parseInt(t,10)||0,max:n?parseInt(n,10):1/0}}function Xt(){const e=document.getElementById("price-range");e&&e.addEventListener("change",()=>le())}function Gt(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=me();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${g(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=me().find(i=>i.name===e.value),o=a?ot(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(i=>`<option value="${i.name}">${g(i.name)}</option>`).join(""),le()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",le)})}function Se(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var d;const a=n.cover_image||((d=n.images)==null?void 0:d[0])||ie[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",i=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${g(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${g(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+g(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${g(o)}</td>
      <td class="cell-price">${g(se(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${i}</td>
      <td>
        <div class="action-btns">
          ${(v==null?void 0:v.role)==="admin"||(v==null?void 0:v.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(v==null?void 0:v.role)==="admin"||(v==null?void 0:v.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function Vt(){const e=document.getElementById("f-city");if(!e)return;const t=me(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${g(a.name)}</option>`).join(""),n&&(e.value=n)}function Wt(){var e,t,n,a,o,i,d,l,s,p,c,r,m,u,y;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((i=document.getElementById("f-condominium"))==null?void 0:i.value)||"").trim().toLowerCase(),priceMin:parseFloat((d=document.getElementById("f-price-min"))==null?void 0:d.value)||0,priceMax:parseFloat((l=document.getElementById("f-price-max"))==null?void 0:l.value)||1/0,areaMin:parseFloat((s=document.getElementById("f-area-min"))==null?void 0:s.value)||0,areaMax:parseFloat((p=document.getElementById("f-area-max"))==null?void 0:p.value)||1/0,construction:((c=document.getElementById("f-construction"))==null?void 0:c.value)||"",published:((r=document.getElementById("f-published"))==null?void 0:r.value)||"",bedrooms:((m=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:m.dataset.val)||"",suites:((u=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:u.dataset.val)||"",parking:((y=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:y.dataset.val)||""}}function at(e){const t=Wt();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const i=parseFloat(a.area)||0;return!(t.areaMin>0&&i<t.areaMin||t.areaMax<1/0&&i>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function qe(){if(!document.getElementById("admin-properties"))return;const e=await jt(),t=e.length,n=e.filter(d=>d.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),i=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),i&&(i.textContent="—"),Vt(),Se(_)}let R=null,oe="";function Ge(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Ae(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function Me(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===oe?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{oe=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function Fe(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{var s;n.preventDefault();const a=new FormData(e),o=a.getAll("images");let i=[];const d=o.filter(p=>p.size>0);if(d.length){t.disabled=!0,t.textContent=`Enviando 0/${d.length} foto…`;try{i=await Dt(d,(p,c)=>{t.textContent=`Enviando ${p}/${c} foto…`})}catch(p){console.error("Erro no upload:",p),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(R){const p=_.find(c=>c.id===R);p!=null&&p.images&&(i=p.images)}i.length||(i=[...ie]);const l={...R?{id:R}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:i,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:oe||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",tenant_id:R?((s=_.find(p=>p.id===R))==null?void 0:s.tenant_id)??(v==null?void 0:v.tenant_id)??null:(v==null?void 0:v.tenant_id)??null};try{await Rt(l),R=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const p=document.getElementById("adminPublished");p&&(p.value="true");const c=document.getElementById("adminNeighborhood");c&&(c.innerHTML='<option value="">Selecione a cidade primeiro</option>');const r=document.getElementById("adminConstructionStatus");r&&(r.value=""),oe="",Me([]),Ae(),await qe()}catch(p){console.error(p),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((p==null?void 0:p.message)||JSON.stringify(p)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await Ht(o),await qe()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((v==null?void 0:v.role)!=="admin"&&(v==null?void 0:v.role)!=="super_admin")return;const o=Number(n.target.dataset.id);if(!o)return;const i=_.find(s=>s.id===o);if(!i)return;R=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=i.title||"",e.querySelector('[name="rua"]').value=i.rua||"",e.querySelector('[name="numero"]').value=i.numero||"",e.querySelector('[name="city"]').value=i.city||"",e.querySelector('[name="price"]').value=i.price||"",e.querySelector('[name="bedrooms"]').value=i.bedrooms||"",e.querySelector('[name="suites"]').value=i.suites||"",e.querySelector('[name="area"]').value=i.area||"",e.querySelector('[name="parking"]').value=i.parking||"",e.querySelector('[name="description"]').value=i.description||"",e.querySelector('[name="construction_status"]').value=i.construction_status||"",e.querySelector('[name="owner_name"]').value=i.owner_name||"",e.querySelector('[name="owner_phone"]').value=i.owner_phone||"",e.querySelector('[name="owner_email"]').value=i.owner_email||"",e.querySelector('[name="owner_notes"]').value=i.owner_notes||"",e.querySelector('[name="condominium"]').value=i.condominium||"";const d=document.getElementById("adminPublished");d&&(d.value=i.published===!0?"true":"false");const l=document.getElementById("adminCitySelect");l&&(l.value=i.city||"",l.dispatchEvent(new Event("change")),setTimeout(()=>{const s=document.getElementById("adminNeighborhood");s&&(s.value=i.neighborhood||"")},50)),oe=i.cover_image||((a=i.images)==null?void 0:a[0])||"",Me(i.images||[]),Ge("Editar Imóvel")}})}function g(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let Q=[],G=0;function Jt(e){var r,m;const t=document.getElementById("view-modal-edit");t&&(t.dataset.pid=e.id),document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const n=document.getElementById("view-status-badge");e.published?(n.textContent="● Publicado",n.className="badge badge-green"):(n.textContent="○ Rascunho",n.className="badge badge-gray");const a=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=a.length?`📍 ${a.join(", ")}`:"";const o=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.join(" "))}`;document.getElementById("view-map-link").href=o,document.getElementById("view-directions-link").href=o;const i=((r=e.images)==null?void 0:r[0])||ie[0];document.getElementById("view-thumb-preview").src=i,Q=(m=e.images)!=null&&m.length?e.images:ie,G=0,ze(),document.getElementById("view-price").textContent=se(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const d=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),d&&(d.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(u=>u.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const s="https://omarcorretor.com.br/property.html?id="+e.id,p=document.getElementById("share-link-input");p&&(p.value=s);const c=document.getElementById("share-panel");c&&(c.style.display="none",c.dataset.pid=e.id),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Ce(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function ze(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=Q[G],e.alt=`Foto ${G+1}`;const i=Q.length>1;n.style.display=i?"flex":"none",a.style.display=i?"flex":"none",t.textContent=i?`${G+1} / ${Q.length}`:"",o.innerHTML=i?Q.map((d,l)=>`<img src="${d}" class="view-thumb${l===G?" active":""}" data-i="${l}" alt="Foto ${l+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(d=>{d.addEventListener("click",()=>{G=+d.dataset.i,ze()})})}async function ct(e){const{data:t}=await b.from("profiles").select("*").eq("id",e).maybeSingle();return t}function Ne(e){var r,m;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const i=(e==null?void 0:e.name)||"Sem nome",d=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=i,o&&(o.textContent=d),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((r=i[0])==null?void 0:r.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const l=document.getElementById("avatar-dd-name"),s=document.getElementById("avatar-dd-role"),p=document.getElementById("avatar-dd-img"),c=document.getElementById("avatar-dd-initial");l&&(l.textContent=i),s&&(s.textContent=d),e!=null&&e.avatar_url&&p?(p.src=e.avatar_url,p.style.display="",c&&(c.style.display="none")):(c&&(c.textContent=((m=i[0])==null?void 0:m.toUpperCase())||"?",c.style.display=""),p&&(p.style.display="none"))}async function Yt(e){const t=document.getElementById("avatar-dd-ver-site");if(!t)return;const n=(e==null?void 0:e.tenant_id)||z(),a=n&&n!==ve,o=window.location.origin,i=a?`${o}/demo.html?key=${n}`:`${o}/index.html`;if(t.href=i,!!a)try{const{data:d}=await b.from("tenants").select("domain").eq("id",n).maybeSingle(),l=window.location.hostname.replace(/^www\./,""),s=((d==null?void 0:d.domain)||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim();s&&s!==l&&(t.href=`https://${s}`)}catch{}}function de(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),W(),e==="contatos"&&da(),e==="funil"&&Zt(),e==="tarefas"&&ta()}function mt(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:va,visual:ya,"site-config":ba,"crm-config":ha,integracoes:xa,midia:Ea}).forEach(([a,o])=>{const i=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);i&&i.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>wa(),{once:!0}),window.lucide&&lucide.createIcons()}}function W(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function Kt(){var a,o,i;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",d=>{d.target===t&&n()}),(i=document.getElementById("cp-save"))==null||i.addEventListener("click",async()=>{var r,m;const d=((r=document.getElementById("cp-new"))==null?void 0:r.value)||"",l=((m=document.getElementById("cp-confirm"))==null?void 0:m.value)||"",s=document.getElementById("cp-msg"),p=document.getElementById("cp-save");if(s.style.display="none",d.length<6){s.style.color="#ef4444",s.textContent="Mínimo 6 caracteres.",s.style.display="";return}if(d!==l){s.style.color="#ef4444",s.textContent="As senhas não coincidem.",s.style.display="";return}p.disabled=!0,p.textContent="Salvando…";const{error:c}=await b.auth.updateUser({password:d});if(p.disabled=!1,p.textContent="Salvar Senha",c){s.style.color="#ef4444",s.textContent="Erro: "+c.message,s.style.display="";return}s.style.color="#16a34a",s.textContent="✅ Senha alterada com sucesso!",s.style.display="",setTimeout(n,1500)})}function Qt(){var i,d,l,s,p;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((i=document.getElementById("topnav-avatar-img"))==null?void 0:i.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
    <div class="modal" style="max-width:380px;">
      <div class="modal-header">
        <h3>Alterar Foto</h3>
        <button class="modal-close" id="cph-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;border:3px solid #e2e8f0;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
          <img id="cph-preview" src="${a?n:""}" alt="" style="width:100%;height:100%;object-fit:cover;display:${a?"":"none"};">
          <span id="cph-initial" style="font-size:32px;font-weight:700;color:#64748b;display:${a?"none":""};">${((v==null?void 0:v.name)||"?")[0].toUpperCase()}</span>
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(d=document.getElementById("cph-close"))==null||d.addEventListener("click",o),(l=document.getElementById("cph-cancel"))==null||l.addEventListener("click",o),t.addEventListener("click",c=>{c.target===t&&o()}),(s=document.getElementById("cph-file"))==null||s.addEventListener("change",c=>{const r=c.target.files[0];if(!r)return;const m=URL.createObjectURL(r),u=document.getElementById("cph-preview"),y=document.getElementById("cph-initial");u&&(u.src=m,u.style.display=""),y&&(y.style.display="none"),document.getElementById("cph-save").disabled=!1}),(p=document.getElementById("cph-save"))==null||p.addEventListener("click",async()=>{var u;const c=(u=document.getElementById("cph-file"))==null?void 0:u.files[0];if(!c)return;const r=document.getElementById("cph-save"),m=document.getElementById("cph-msg");r.disabled=!0,r.textContent="Salvando…";try{const y=await _e(c,400,.85),h=`avatars/${v.id}-${Date.now()}.jpg`,{error:x}=await b.storage.from("imoveis").upload(h,y,{contentType:"image/jpeg",upsert:!0});if(x)throw x;const{data:{publicUrl:f}}=b.storage.from("imoveis").getPublicUrl(h);await b.from("profiles").update({avatar_url:f}).eq("id",v.id),v={...v,avatar_url:f},Ne(v),o()}catch(y){m.style.color="#ef4444",m.textContent="Erro: "+y.message,m.style.display="",r.disabled=!1,r.textContent="Salvar Foto"}})}function Ve(e,t){var i,d,l;const n=document.getElementById("add-corretor-modal-root");n&&n.remove();const a=document.createElement("div");a.id="add-corretor-modal-root",a.className="modal-backdrop",a.innerHTML=`
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
    </div>`,document.body.appendChild(a);const o=()=>a.remove();(i=document.getElementById("ac-close"))==null||i.addEventListener("click",o),(d=document.getElementById("ac-cancel"))==null||d.addEventListener("click",o),a.addEventListener("click",s=>{s.target===a&&o()}),(l=document.getElementById("ac-save"))==null||l.addEventListener("click",async()=>{var m,u,y;const s=(m=document.getElementById("ac-email"))==null?void 0:m.value.trim(),p=(u=document.getElementById("ac-password"))==null?void 0:u.value.trim(),c=document.getElementById("ac-save"),r=document.getElementById("ac-note");if(!s){alert("Informe o e-mail do corretor.");return}if(!p||p.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}c.disabled=!0,c.textContent="Criando…",r.style.display="none";try{const h=e||(v==null?void 0:v.tenant_id)||null,x=((y=document.getElementById("ac-role"))==null?void 0:y.value)||"corretor",f=await ce({email:s,password:p,role:x,tenant_id:h});c.disabled=!1,c.textContent="+ Criar Acesso",f.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",f.email_sent===!1?(r.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${g(s)}<br><strong>Senha:</strong> ${g(p)}`,r.style.color="#0f172a"):(r.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",r.style.color="#16a34a"),r.style.display="",typeof t=="function"&&setTimeout(t,1500)):alert("Erro: "+(f.error||"Falha desconhecida"))}catch(h){c.disabled=!1,c.textContent="+ Criar Acesso",alert("Erro: "+h.message)}})}function pt(){var i,d,l,s,p,c,r,m,u,y,h;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",x=>{var w;x.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(w=document.getElementById("notif-dropdown"))==null||w.classList.add("hidden")}),(i=document.getElementById("avatar-dd-change-photo"))==null||i.addEventListener("click",x=>{x.stopPropagation(),W(),Qt()}),(d=document.getElementById("avatar-dd-change-pass"))==null||d.addEventListener("click",x=>{x.stopPropagation(),W(),Kt()}),(l=document.getElementById("avatar-dd-add-corretor"))==null||l.addEventListener("click",x=>{x.stopPropagation(),W(),Ve()}),(s=document.getElementById("avatar-dd-settings"))==null||s.addEventListener("click",x=>{x.stopPropagation(),W(),de("settings")}),(p=document.getElementById("avatar-dd-logout"))==null||p.addEventListener("click",async x=>{x.stopPropagation(),await b.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",x=>{var w;x.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((w=document.getElementById("avatar-dropdown"))==null||w.classList.add("hidden"),oa())}),(c=document.getElementById("notif-mark-all"))==null||c.addEventListener("click",()=>{ia(),W()}),(r=document.getElementById("btn-search-open"))==null||r.addEventListener("click",()=>{var x,f;(x=document.getElementById("search-overlay"))==null||x.classList.remove("hidden"),(f=document.getElementById("search-input"))==null||f.focus()}),(m=document.getElementById("search-overlay-close"))==null||m.addEventListener("click",()=>{var x;(x=document.getElementById("search-overlay"))==null||x.classList.add("hidden")}),(u=document.getElementById("search-overlay"))==null||u.addEventListener("click",x=>{x.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(y=document.getElementById("search-input"))==null||y.addEventListener("input",x=>{clearTimeout(o),o=setTimeout(()=>na(x.target.value.trim()),280)}),(h=document.getElementById("search-input"))==null||h.addEventListener("keydown",x=>{var f;x.key==="Escape"&&((f=document.getElementById("search-overlay"))==null||f.classList.add("hidden"))}),document.addEventListener("click",W)}let We=!1,ae=[],nt=[],je=[],Je={},It=[],Z=null,Ie=null,P={search:"",tags:new Set,status:""};async function Zt(){var t;if(We){await ut();return}We=!0,await ut(),(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>Ke());const e=document.getElementById("funil-pipe-sel");e==null||e.addEventListener("change",async()=>{Z=parseInt(e.value,10),await Re()})}function Ye(e){var i;const t=document.getElementById("kanban-filters");if(!t)return;t.style.display="block";const n=document.getElementById("kf-status");n&&(n.innerHTML='<option value="">Todos os status</option>'+It.map(d=>`<option value="${g(d.name)}">${g(d.name)}</option>`).join(""),n.value=P.status,n.onchange=()=>{P.status=n.value,ge()});const a=document.getElementById("kf-tags");if(a){if(!e.length){a.style.display="none";return}a.style.display="flex",a.innerHTML=e.map(d=>{const l=P.tags.has(d.name);return`<button class="kf-tag-btn" data-tag="${g(d.name)}"
        style="padding:4px 12px;border-radius:20px;border:1.5px solid ${d.color};
               background:${l?d.color:d.color+"18"};
               color:${l?"#fff":d.color};
               font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;">
        ${g(d.name)}
      </button>`}).join(""),a.querySelectorAll(".kf-tag-btn").forEach(d=>{d.addEventListener("click",()=>{const l=d.dataset.tag;P.tags.has(l)?P.tags.delete(l):P.tags.add(l),Ye(e),ge()})})}const o=document.getElementById("kf-search");o&&(o.value=P.search,o.oninput=()=>{P.search=o.value.toLowerCase(),ge()}),(i=document.getElementById("kf-clear"))==null||i.addEventListener("click",()=>{P={search:"",tags:new Set,status:""},Ye(e),ge()})}async function ut(){const e=z(),[{data:t},{data:n},{data:a}]=await Promise.all([b.from("crm_pipelines").select("*").eq("tenant_id",e).order("sort_order"),b.from("crm_tags").select("*").eq("tenant_id",e).order("name"),b.from("crm_lead_statuses").select("*").eq("tenant_id",e).order("sort_order")]);ae=t||[],It=a||[],Je={},(n||[]).forEach(l=>{Je[l.name]=l});const o=ae.map(l=>l.id),{data:i}=o.length?await b.from("crm_stages").select("*").in("pipeline_id",o).order("sort_order"):{data:[]};nt=i||[],Ye(n||[]);const d=document.getElementById("funil-pipe-sel");if(d){const l=Z;d.innerHTML=ae.length?ae.map(p=>`<option value="${p.id}">${g(p.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const s=ae.find(p=>p.id===l)||ae.find(p=>p.is_default)||ae[0];s?(d.value=s.id,Z=s.id):Z=null}await Re()}async function Re(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=b.from("leads").select("*").order("created_at",{ascending:!1});(v==null?void 0:v.role)==="corretor"?t=t.eq("assigned_to",v.id):v!=null&&v.tenant_id&&(t=t.eq("tenant_id",v.tenant_id)),Z&&(t=t.eq("pipeline_id",Z));const{data:n}=await t;je=n||[],ge()}function ge(){const e=document.getElementById("kanban-board");if(!e)return;const t=nt.filter(i=>i.pipeline_id===Z);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n=P,a=je.filter(i=>{if(n.search&&!`${i.name||""} ${i.phone||""} ${i.email||""}`.toLowerCase().includes(n.search)||n.status&&i.status!==n.status)return!1;if(n.tags.size>0){const d=Array.isArray(i.tags)?i.tags:[];if(![...n.tags].every(l=>d.includes(l)))return!1}return!0}),o={};t.forEach(i=>{o[i.name]=[]}),a.forEach(i=>{var l,s,p,c;const d=i.stage||((l=t[0])==null?void 0:l.name);o[d]||(o[((s=t[0])==null?void 0:s.name)||""]=[]),(c=o[d]||o[(p=t[0])==null?void 0:p.name])==null||c.push(i)}),e.innerHTML=t.map(i=>{const d=o[i.name]||[],l=d.length?d.map(s=>{const p=(s.phone||"").replace(/\D/g,""),c=encodeURIComponent(`Olá ${s.name}! Aqui é da ${F("company.name","nossa imobiliária")}. Vi seu interesse e gostaria de ajudar. Posso falar agora?`);return`
        <div class="kanban-card" draggable="true" data-id="${s.id}" data-stage="${g(i.name)}" style="cursor:pointer;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;">
            <div class="kanban-card-name" style="flex:1;">${g(s.name||"—")}</div>
            ${p?`<a href="https://wa.me/${p}?text=${c}" target="_blank" rel="noopener"
              onclick="event.stopPropagation()"
              style="flex-shrink:0;width:28px;height:28px;background:#25d366;border-radius:6px;display:flex;align-items:center;justify-content:center;text-decoration:none;"
              title="Abrir WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>`:""}
          </div>
          ${s.phone?`<div class="kanban-card-info">📞 ${g(s.phone)}</div>`:""}
          ${s.email?`<div class="kanban-card-info" style="font-size:11px;color:#94a3b8;">✉ ${g(s.email)}</div>`:""}
          ${s.notes?`<div class="kanban-card-info" style="font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">📝 ${g(s.notes)}</div>`:""}
          <div class="kanban-card-tags" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">
            ${s.source?`<span class="kanban-card-tag">${g(s.source)}</span>`:""}
            ${Array.isArray(s.tags)?s.tags.map(r=>{const m=Je[r],u=(m==null?void 0:m.color)||"#0369a1";return`<span class="kanban-card-tag" style="background:${u}18;color:${u};border:1px solid ${u}44;">${g(r)}</span>`}).join(""):""}
          </div>
        </div>`}).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${g(i.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${i.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${i.color||"#2563eb"}"></div>
            ${g(i.name)}
          </div>
          <span class="kanban-col-count">${d.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${g(i.name)}">${l}</div>
        <button class="kanban-add-btn" data-stage="${g(i.name)}">+ Adicionar lead</button>
      </div>`}).join(""),ea(),window.lucide&&lucide.createIcons()}function ea(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>Ke())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=je.find(a=>String(a.id)===String(t.dataset.id));n&&Ke(n)}),t.addEventListener("dragstart",n=>{Ie=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!Ie||!a)return;await b.from("leads").update({stage:a}).eq("id",Ie);const o=je.find(i=>String(i.id)===String(Ie));o&&(o.stage=a),Ie=null,ge()})}))}async function Ke(e=null){var p,c;(p=document.getElementById("lead-detail-panel"))==null||p.remove();const t=!e,n=z(),{data:a}=await b.from("crm_tags").select("*").eq("tenant_id",n).order("name"),{data:o}=await b.from("crm_lead_statuses").select("*").eq("tenant_id",n).order("sort_order"),i=nt.filter(r=>r.pipeline_id===Z).map(r=>`<option value="${g(r.name)}" ${(e==null?void 0:e.stage)===r.name?"selected":""}>${g(r.name)}</option>`).join(""),d=((e==null?void 0:e.phone)||"").replace(/\D/g,""),l=document.createElement("div");l.id="lead-detail-panel",l.style.cssText="position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:#fff;box-shadow:-4px 0 32px rgba(0,0,0,.15);z-index:1000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;",l.innerHTML=`
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
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ETAPA DO FUNIL</label>
        <select id="ldp-stage" class="form-input">${i}</select>
      </div>
      ${o!=null&&o.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">STATUS</label>
        <select id="ldp-status" class="form-input">
          <option value="">— Sem status —</option>
          ${o.map(r=>`<option value="${r.name}" ${(e==null?void 0:e.status)===r.name?"selected":""}>${g(r.name)}</option>`).join("")}
        </select>
      </div>`:""}
      ${a!=null&&a.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:6px;">TAGS</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${a.map(r=>`
            <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:4px 10px;border-radius:20px;background:${r.color}18;border:1px solid ${r.color}44;font-size:12px;font-weight:600;color:${r.color};">
              <input type="checkbox" value="${r.name}" style="margin:0;" ${((e==null?void 0:e.tags)||[]).includes(r.name)?"checked":""}>
              ${g(r.name)}
            </label>`).join("")}
        </div>
      </div>`:""}
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ANOTAÇÕES</label>
        <textarea id="ldp-notes" class="form-input" rows="4" placeholder="Observações, interesses, próximos passos…" style="resize:vertical;">${g((e==null?void 0:e.notes)||"")}</textarea>
      </div>
      ${d?(()=>{const r=encodeURIComponent(`Olá ${e!=null&&e.name?e.name.split(" ")[0]:""}! Aqui é da ${F("company.name","nossa imobiliária")}. Vi seu interesse em imóveis e gostaria de ajudá-lo. Posso falar agora?`);return`<a href="https://wa.me/${d}?text=${r}" target="_blank" rel="noopener"
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
  `,document.body.appendChild(l),requestAnimationFrame(()=>{l.style.transform="translateX(0)"});const s=()=>{l.style.transform="translateX(100%)",setTimeout(()=>l.remove(),250)};document.getElementById("ldp-close").addEventListener("click",s),document.getElementById("ldp-save").addEventListener("click",async()=>{var f,w;const r=document.getElementById("ldp-save"),m=document.getElementById("ldp-msg"),u=document.getElementById("ldp-name").value.trim();if(!u){m.style.color="#ef4444",m.textContent="Nome é obrigatório.";return}r.disabled=!0,r.textContent="Salvando…";const y=[...l.querySelectorAll("input[type=checkbox]:checked")].map(B=>B.value),h={name:u,phone:document.getElementById("ldp-phone").value.trim()||null,email:document.getElementById("ldp-email").value.trim()||null,source:document.getElementById("ldp-source").value.trim()||null,stage:((f=document.getElementById("ldp-stage"))==null?void 0:f.value)||null,status:((w=document.getElementById("ldp-status"))==null?void 0:w.value)||null,notes:document.getElementById("ldp-notes").value.trim()||null,tags:y,tenant_id:z()};let x;if(t?{error:x}=await b.from("leads").insert(h):{error:x}=await b.from("leads").update(h).eq("id",e.id),r.disabled=!1,r.textContent="💾 Salvar",x){m.style.color="#ef4444",m.textContent="Erro: "+x.message;return}m.style.color="#22c55e",m.textContent="✅ Salvo!",setTimeout(()=>{s(),Re()},700)}),(c=document.getElementById("ldp-delete"))==null||c.addEventListener("click",async()=>{confirm(`Excluir o lead "${e==null?void 0:e.name}"?`)&&(await b.from("leads").delete().eq("id",e.id),s(),Re())})}let j=[],gt=!1,fe="pending";async function ta(){var e;gt||(gt=!0,await aa(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>Bt()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),fe=t.dataset.filter,xe()})}))}async function aa(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=b.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(v==null?void 0:v.role)==="corretor"?t=t.eq("assigned_to",v.id):v!=null&&v.tenant_id&&(t=t.eq("tenant_id",v.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}j=n||[],xe()}function $t(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function xe(){const e=document.getElementById("tarefas-list");if(!e)return;let t=j;if(fe==="pending"&&(t=j.filter(a=>a.status!=="done")),fe==="done"&&(t=j.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${fe==="done"?"✅":"📋"}</div>
      <p>${fe==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=$t(a.due_date),i=o?o.toLocaleDateString("pt-BR"):"",d=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${g(a.title)}</div>
          <div class="tarefa-meta">
            ${i?`<span style="${d?"color:#ef4444;":""}">📅 ${i}${d?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${g(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const i=a.dataset.id,d=a.checked?"done":"pending";await b.from("tasks").update({status:d}).eq("id",i);const l=j.find(s=>String(s.id)===i);l&&(l.status=d),xe()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await b.from("tasks").delete().eq("id",a.dataset.id),j=j.filter(i=>String(i.id)!==String(a.dataset.id)),xe())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const i=a.dataset.id,d=j.find(l=>String(l.id)===i);d&&Bt(d)})})}function Bt(e=null){var s,p,c,r;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=$t(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const i=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",d=document.createElement("div");d.id="tarefa-modal-root",d.className="modal-backdrop",d.innerHTML=`
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
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${g((e==null?void 0:e.title)||"")}">
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
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${g((e==null?void 0:e.description)||"")}</textarea>
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
  `,document.body.appendChild(d);const l=()=>d.remove();(s=document.getElementById("tm-close"))==null||s.addEventListener("click",l),(p=document.getElementById("tm-cancel"))==null||p.addEventListener("click",l),d.addEventListener("click",m=>{m.target===d&&l()}),(c=document.getElementById("tm-toggle-done"))==null||c.addEventListener("click",async()=>{const m=a?"pending":"done";await b.from("tasks").update({status:m}).eq("id",e.id);const u=j.find(y=>String(y.id)===String(e.id));u&&(u.status=m),l(),m==="done"&&(fe="done",document.querySelectorAll(".tarefa-filter-btn").forEach(y=>{y.classList.toggle("active",y.dataset.filter==="done")})),xe()}),(r=document.getElementById("tm-save"))==null||r.addEventListener("click",async()=>{var f,w;const m=document.getElementById("tarefa-form");if(!m.checkValidity()){m.reportValidity();return}const u=new FormData(m),y=document.getElementById("tm-save");y.disabled=!0,y.textContent="Salvando…";const h={title:(f=u.get("title"))==null?void 0:f.trim(),description:((w=u.get("description"))==null?void 0:w.trim())||null,due_date:u.get("due_date")||null,priority:u.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(v==null?void 0:v.id)||null,tenant_id:(v==null?void 0:v.tenant_id)||null};let x;if(n){if({error:x}=await b.from("tasks").update(h).eq("id",e.id),!x){const B=j.findIndex($=>String($.id)===String(e.id));B>=0&&(j[B]={...j[B],...h})}}else{const{data:B,error:$}=await b.from("tasks").insert(h).select();x=$,!x&&(B!=null&&B[0])&&j.unshift(B[0])}if(y.disabled=!1,y.textContent=n?"Salvar":"Criar Tarefa",x){alert("Erro: "+x.message);return}l(),xe()})}async function na(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;v==null||v.role,v==null||v.tenant_id;const[{data:a},{data:o}]=await Promise.all([b.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),b.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),i=[];a!=null&&a.length&&(i.push('<div class="search-group-label">Imóveis</div>'),i.push(...a.map(d=>`
      <div class="search-result-item" data-type="property" data-id="${d.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${g(d.title||"—")}</div>
          <div class="search-result-sub">${g(d.reference||"")} · ${g(d.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(i.push('<div class="search-group-label">Leads / Contatos</div>'),i.push(...o.map(d=>`
      <div class="search-result-item" data-type="lead" data-id="${d.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${g(d.name||"—")}</div>
          <div class="search-result-sub">${g(d.email||d.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=i.length?i.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(d=>{d.addEventListener("click",()=>{var l;(l=document.getElementById("search-overlay"))==null||l.classList.add("hidden"),d.dataset.type==="lead"?de("contatos"):de("properties")})})}let J=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function oa(){var d;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=b.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);v!=null&&v.tenant_id&&(t=t.eq("tenant_id",v.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(l=>!J.includes(String(l.id))),i=document.getElementById("notif-badge");if(i&&(i.textContent=o.length,o.length>0?i.classList.remove("hidden"):i.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(l=>{const s=sa(l.created_at);return`
      <div class="notif-item${!J.includes(String(l.id))?" unread":""}" data-id="${l.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${g(l.name||"—")}</div>
          <div class="notif-item-sub">${g(l.phone||l.source||"")} · ${s}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(d=document.getElementById("notif-see-all"))==null||d.addEventListener("click",l=>{l.preventDefault(),W(),de("contatos")}),e.querySelectorAll(".notif-item").forEach(l=>{l.addEventListener("click",()=>{J.push(l.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(J)),l.classList.remove("unread"),W(),de("contatos")})})}function ia(){var e;document.querySelectorAll(".notif-item").forEach(t=>J.push(t.dataset.id)),J=[...new Set(J)],localStorage.setItem("crm_notifs_read",JSON.stringify(J)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function sa(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function la(){let e=b.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);v!=null&&v.tenant_id&&(e=e.eq("tenant_id",v.tenant_id));const{data:t}=await e,a=(t||[]).filter(i=>!J.includes(String(i.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let X=[],N=1;const $e=10;let ft=!1;async function da(){var t,n,a,o,i,d,l,s,p;document.getElementById("section-contatos")&&(ft||(ft=!0,await kt(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{N=1,re()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",c=>{c.key==="Enter"&&(N=1,re())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>Lt()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",ma),(i=document.getElementById("import-modal-close"))==null||i.addEventListener("click",Qe),(d=document.getElementById("import-modal-cancel"))==null||d.addEventListener("click",Qe),(l=document.getElementById("download-template"))==null||l.addEventListener("click",c=>{c.preventDefault();const r=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,m=new Blob([r],{type:"text/csv"}),u=document.createElement("a");u.href=URL.createObjectURL(m),u.download="modelo_contatos.csv",u.click()}),(s=document.getElementById("import-csv-file"))==null||s.addEventListener("change",ra),(p=document.getElementById("import-modal-confirm"))==null||p.addEventListener("click",ca)))}async function kt(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=b.from("leads").select("*").order("created_at",{ascending:!1});(v==null?void 0:v.role)==="corretor"?t=t.eq("assigned_to",v.id):v!=null&&v.tenant_id&&(t=t.eq("tenant_id",v.tenant_id));const{data:a}=await t;X=a||[],re()}function re(){var l,s,p;const e=(((l=document.getElementById("contato-search"))==null?void 0:l.value)||"").toLowerCase(),t=e?X.filter(c=>(c.name||"").toLowerCase().includes(e)||(c.email||"").toLowerCase().includes(e)||(c.phone||"").toLowerCase().includes(e)):X,n=t.length,a=Math.max(1,Math.ceil(n/$e));N>a&&(N=a);const o=t.slice((N-1)*$e,N*$e),i=document.getElementById("contatos-tbody");if(!i)return;o.length?i.innerHTML=o.map(c=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${c.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${c.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${g(c.name||"—")}</a>
        </td>
        <td>${g(c.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${c.email?g(c.email):"—"}</td>
        <td style="font-size:13px;">${c.phone?g(c.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${g(c.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td style="display:flex;gap:6px;align-items:center;">
          ${(()=>{const r=(c.phone||"").replace(/\D/g,"");if(!r)return"";const m=encodeURIComponent(`Olá ${(c.name||"").split(" ")[0]}! Aqui é da ${F("company.name","nossa imobiliária")}. Podemos conversar sobre seu interesse em imóveis?`);return`<a href="https://wa.me/${r}?text=${m}" target="_blank" rel="noopener" title="WhatsApp"
              style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
            </a>`})()}
          <button class="icon-btn contato-edit-btn" data-id="${c.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):i.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const d=document.getElementById("contatos-pagination");if(d){const c=n===0?0:(N-1)*$e+1,r=Math.min(N*$e,n);d.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${c}–${r}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${N<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${N} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${N>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(s=d.querySelector("#pag-prev"))==null||s.addEventListener("click",()=>{N--,re()}),(p=d.querySelector("#pag-next"))==null||p.addEventListener("click",()=>{N++,re()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(c=>{c.addEventListener("click",r=>{r.preventDefault();const m=c.dataset.id,u=X.find(y=>String(y.id)===String(m));u&&Lt(u)})})}async function Lt(e=null){var f,w,B,$,L,k;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=z(),[{data:o},{data:i},{data:d}]=await Promise.all([b.from("crm_pipelines").select("*").eq("tenant_id",a).order("sort_order"),b.from("crm_tags").select("*").eq("tenant_id",a).order("name"),b.from("crm_lead_statuses").select("*").eq("tenant_id",a).order("sort_order")]),l=o||[],s=i||[],p=d||[],c=l.map(I=>I.id),{data:r}=c.length?await b.from("crm_stages").select("*").in("pipeline_id",c).order("sort_order"):{data:[]},m=r||[],u=(e==null?void 0:e.pipeline_id)||((f=l[0])==null?void 0:f.id)||"";function y(I){const E=m.filter(S=>S.pipeline_id===I);return E.length?'<option value="">— Selecionar etapa —</option>'+E.map(S=>`<option value="${g(S.name)}" ${(e==null?void 0:e.stage)===S.name?"selected":""}>${g(S.name)}</option>`).join(""):'<option value="">— Nenhuma etapa —</option>'}const h=document.createElement("div");h.id="contato-modal-root",h.className="modal-backdrop",h.innerHTML=`
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

          ${l.length?`
          <div style="border-top:1px solid #f1f5f9;margin:8px 0 12px;padding-top:14px;">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;margin-bottom:10px;">FUNIL DE NEGOCIAÇÃO</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Funil</label>
                <select id="cm-pipe" name="pipeline_id" class="form-control">
                  <option value="">— Sem funil —</option>
                  ${l.map(I=>`<option value="${I.id}" ${String(e==null?void 0:e.pipeline_id)===String(I.id)?"selected":""}>${g(I.name)}</option>`).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Etapa</label>
                <select id="cm-stage" name="stage" class="form-control">
                  ${y(u)}
                </select>
              </div>
            </div>
          </div>`:""}

          ${p.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="">— Sem status —</option>
                ${p.map(I=>`<option value="${g(I.name)}" ${(e==null?void 0:e.status)===I.name?"selected":""}>${g(I.name)}</option>`).join("")}
              </select>
            </div>
          </div>`:""}

          ${s.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Tags</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                ${s.map(I=>`
                  <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:5px 12px;border-radius:20px;background:${I.color}18;border:1.5px solid ${I.color}55;font-size:12px;font-weight:600;color:${I.color};transition:opacity .15s;">
                    <input type="checkbox" name="tag" value="${g(I.name)}" style="margin:0;accent-color:${I.color};" ${((e==null?void 0:e.tags)||[]).includes(I.name)?"checked":""}>
                    ${g(I.name)}
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
  `,document.body.appendChild(h);const x=()=>h.remove();(w=document.getElementById("cm-close"))==null||w.addEventListener("click",x),(B=document.getElementById("cm-cancel"))==null||B.addEventListener("click",x),h.addEventListener("click",I=>{I.target===h&&x()}),($=document.getElementById("cm-pipe"))==null||$.addEventListener("change",I=>{const E=document.getElementById("cm-stage");E&&(E.innerHTML=y(I.target.value))}),(L=document.getElementById("cm-delete"))==null||L.addEventListener("click",async()=>{if(!confirm(`Excluir o contato "${e==null?void 0:e.name}"?`))return;await b.from("leads").delete().eq("id",e.id);const I=X.findIndex(E=>String(E.id)===String(e.id));I>=0&&X.splice(I,1),x(),re()}),(k=document.getElementById("cm-save"))==null||k.addEventListener("click",async()=>{var D,H,U,Y,te,Ee,we;const I=document.getElementById("contato-form");if(!I.checkValidity()){I.reportValidity();return}const E=new FormData(I),S=document.getElementById("cm-save");S.disabled=!0,S.textContent="Salvando…";const T=E.getAll("tag"),C=E.get("pipeline_id")||null,M={name:(D=E.get("name"))==null?void 0:D.trim(),company:((H=E.get("company"))==null?void 0:H.trim())||null,email:((U=E.get("email"))==null?void 0:U.trim())||null,phone:((Y=E.get("phone"))==null?void 0:Y.trim())||null,job_title:((te=E.get("job_title"))==null?void 0:te.trim())||null,city_interest:((Ee=E.get("city_interest"))==null?void 0:Ee.trim())||null,notes:((we=E.get("notes"))==null?void 0:we.trim())||null,pipeline_id:C,stage:E.get("stage")||null,status:E.get("status")||null,tags:T,assigned_to:(v==null?void 0:v.id)||null,tenant_id:(v==null?void 0:v.tenant_id)||null,source:(e==null?void 0:e.source)||"manual"};let A;if(n){if({error:A}=await b.from("leads").update(M).eq("id",e.id),!A){const O=X.findIndex(pe=>String(pe.id)===String(e.id));O>=0&&(X[O]={...X[O],...M})}}else{const{data:O,error:pe}=await b.from("leads").insert(M).select();A=pe,!A&&(O!=null&&O[0])&&X.unshift(O[0])}if(S.disabled=!1,S.textContent=n?"Salvar":"Criar Contato",A){alert("Erro: "+A.message);return}x(),re()})}let be=[];function ra(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{be=a.target.result.split(`
`).filter(l=>l.trim()).slice(1).map(l=>{const[s,p,c,r,m]=l.split(",").map(u=>u.trim().replace(/^"|"$/g,""));return{name:s,email:p,phone:c,company:r,job_title:m}}).filter(l=>l.name);const i=document.getElementById("import-preview");i&&(i.textContent=`${be.length} contato(s) encontrados para importar.`);const d=document.getElementById("import-modal-confirm");d&&(d.disabled=be.length===0)},n.readAsText(t)}async function ca(){if(!be.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=be.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(v==null?void 0:v.id)||null,tenant_id:(v==null?void 0:v.tenant_id)||null})),{error:n}=await b.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Qe(),await kt(),alert(`${t.length} contato(s) importados com sucesso!`)}function ma(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),be=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Qe(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const pa="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function ce(e){return(await fetch(pa,{method:"POST",headers:{Authorization:`Bearer ${zt}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function vt(e){var s,p,c,r;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),i=document.getElementById("settings-avatar-input"),d=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:m}}=await b.auth.getUser();n.value=(m==null?void 0:m.email)||""}const l=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=l),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),i==null||i.addEventListener("change",m=>{const u=m.target.files[0];if(!u)return;const y=URL.createObjectURL(u);a&&(a.src=y,a.style.display=""),o&&(o.style.display="none")}),(s=document.getElementById("btn-change-password"))==null||s.addEventListener("click",async()=>{var f,w;const m=((f=document.getElementById("change-password-new"))==null?void 0:f.value)||"",u=((w=document.getElementById("change-password-confirm"))==null?void 0:w.value)||"",y=document.getElementById("change-password-msg"),h=document.getElementById("btn-change-password");if(y&&(y.style.display="none"),m.length<6){y&&(y.textContent="Mínimo 6 caracteres.",y.style.display="");return}if(m!==u){y&&(y.textContent="As senhas não coincidem.",y.style.display="");return}h&&(h.disabled=!0,h.textContent="Salvando…");const{error:x}=await b.auth.updateUser({password:m});h&&(h.disabled=!1,h.textContent="Salvar Nova Senha"),x?y&&(y.textContent="Erro: "+x.message,y.style.display=""):(y&&(y.style.color="#16a34a",y.textContent="Senha alterada com sucesso!",y.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),d==null||d.addEventListener("click",async()=>{var w;const m=t.value.trim();let u=(v==null?void 0:v.avatar_url)||"";const y=i==null?void 0:i.files[0],h=d.textContent;if(d.disabled=!0,d.textContent="Salvando…",y)try{const B=await _e(y,400,.85),$=`avatars/${v.id}-${Date.now()}.jpg`,{error:L}=await b.storage.from("imoveis").upload($,B,{contentType:"image/jpeg",upsert:!0});if(!L){const{data:{publicUrl:k}}=b.storage.from("imoveis").getPublicUrl($);u=k}}catch(B){console.error("Avatar upload:",B)}const{error:x}=await b.from("profiles").update({name:m,avatar_url:u}).eq("id",v.id);if(d.disabled=!1,d.textContent=h,x){alert("Erro ao salvar perfil.");return}v={...v,name:m,avatar_url:u},Ne(v);const f=document.getElementById("settings-avatar-initial");f&&(f.textContent=((w=m[0])==null?void 0:w.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const m=document.getElementById("settings-corretores-section");m&&(m.style.display=""),await He(),(p=document.getElementById("btn-invite-corretor"))==null||p.addEventListener("click",async()=>{var w,B;const y=(w=document.getElementById("invite-email"))==null?void 0:w.value.trim(),h=(B=document.getElementById("invite-password"))==null?void 0:B.value.trim(),x=document.getElementById("btn-invite-corretor"),f=document.getElementById("invite-note");if(!y){alert("Informe o e-mail do corretor.");return}if(!h||h.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}x&&(x.disabled=!0,x.textContent="Criando…"),f&&(f.style.display="none");try{const $=await ce({email:y,password:h,tenant_id:(v==null?void 0:v.tenant_id)||null});if($.success){const L=document.getElementById("invite-email"),k=document.getElementById("invite-password");L&&(L.value=""),k&&(k.value=""),await He(),f&&($.email_sent===!1?(f.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${g(y)}<br>
                <strong>Senha:</strong> ${g(h)}`,f.style.color="#0f172a"):(f.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",f.style.color="#16a34a"),f.style.display="")}else alert("Erro: "+($.error||"Falha desconhecida"))}catch($){alert("Erro ao criar acesso: "+$.message)}finally{x&&(x.disabled=!1,x.textContent="+ Criar Acesso")}});const u=document.getElementById("settings-locations-section");u&&(u.style.display=""),await Be(),(c=document.getElementById("loc-add-city-btn"))==null||c.addEventListener("click",async()=>{const y=document.getElementById("loc-new-city"),h=y==null?void 0:y.value.trim();if(!h)return;const{error:x}=await b.from("locations").insert({type:"cidade",name:h});if(x){alert("Erro ao adicionar cidade.");return}y&&(y.value=""),await Be(),it()}),(r=document.getElementById("loc-add-neighborhood-btn"))==null||r.addEventListener("click",async()=>{var w;const y=parseInt((w=document.getElementById("loc-new-neighborhood-city"))==null?void 0:w.value,10),h=document.getElementById("loc-new-neighborhood"),x=h==null?void 0:h.value.trim();if(!y||!x){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:f}=await b.from("locations").insert({type:"bairro",name:x,parent_id:y});if(f){alert("Erro ao adicionar bairro.");return}h&&(h.value=""),await Be()})}}async function He(){const e=document.getElementById("corretores-list");if(!e)return;let t=b.from("profiles").select("*").order("created_at");v!=null&&v.tenant_id&&(t=t.eq("tenant_id",v.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const i=(o.name||"?")[0].toUpperCase(),d=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${g(i)}</div>`,l=o.id===(v==null?void 0:v.id),s=o.active!==!1,p=s?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',c=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,r=l?"":s?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,m=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${d}
        <div>
          <div class="corretor-name">${g(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${p}
        ${c}
        ${r}
        ${m}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await b.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.uid,d=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const l=await ce({action:"toggle",userId:i,active:!d});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await He()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var l,s;const i=o.dataset.uid,d=((s=(l=o.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:s.textContent)||"este corretor";if(confirm(`Excluir "${d}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const p=await ce({action:"delete",userId:i});p.success||alert("Erro ao excluir: "+(p.error||"Falha desconhecida"))}catch(p){alert("Erro: "+p.message)}await He()}})})}async function St(){const{data:e,error:t}=await b.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(Le=e||[],Le)}function me(){return Le.filter(e=>e.type==="cidade")}function ot(e){return Le.filter(t=>t.type==="bairro"&&t.parent_id===e)}function it(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=me();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${g(a.name)}</option>`).join(""),t&&(e.value=t)}async function Be(){await St();const e=me(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(i=>`
        <div class="loc-item">
          <span class="loc-item-name">${g(i.name)}</span>
          <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=Le.filter(i=>i.type==="bairro");n.innerHTML=o.length?o.map(i=>{const d=e.find(l=>l.id===i.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${g(i.name)}</div>
              ${d?`<div class="loc-item-sub">${g(d.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(i=>`<option value="${i.id}">${g(i.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{const d=i.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${d}" e todos os bairros vinculados?`))return;const{error:l}=await b.from("locations").delete().eq("id",i.dataset.id);if(l){alert("Erro ao excluir.");return}await Be(),it()})}),n.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:d}=await b.from("locations").delete().eq("id",i.dataset.id);if(d){alert("Erro ao excluir.");return}await Be()})})}function yt(){var n,a,o,i,d,l,s,p,c,r,m,u,y,h,x,f,w,B,$,L;document.querySelectorAll(".filter-btn").forEach(k=>{k.addEventListener("click",()=>{const I=k.closest(".filter-btns"),E=k.classList.contains("active");I.querySelectorAll(".filter-btn").forEach(S=>S.classList.remove("active")),E||k.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var T;const k=(T=document.getElementById("f-city"))==null?void 0:T.value,I=me().find(C=>C.name===k),E=I?ot(I.id):[],S=document.getElementById("f-neighborhood");S&&(S.innerHTML='<option value="">Todos</option>'+E.map(C=>`<option value="${C.name}">${g(C.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{Se(at(_))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{const k=document.querySelector(".admin-filter-panel");if(k){k.querySelectorAll('input[type="text"], input[type="number"]').forEach(E=>{E.value=""}),k.querySelectorAll("select").forEach(E=>{E.selectedIndex=0});const I=document.getElementById("f-neighborhood");I&&(I.innerHTML='<option value="">Todos</option>'),k.querySelectorAll(".filter-btn.active").forEach(E=>E.classList.remove("active"))}Se(_)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(k=>{k.addEventListener("click",()=>{de(k.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(k=>{k.addEventListener("click",()=>{de(k.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(k=>{k.addEventListener("click",I=>{I.stopPropagation();const E=k.closest(".topnav-dropdown");E==null||E.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(S=>{S!==E&&S.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(k=>k.classList.remove("open"))}),(i=document.getElementById("modal-close"))==null||i.addEventListener("click",Ae),(d=document.getElementById("modal-cancel"))==null||d.addEventListener("click",Ae),(l=document.getElementById("property-modal"))==null||l.addEventListener("click",k=>{k.target.id==="property-modal"&&Ae()}),(s=document.getElementById("btn-new-property"))==null||s.addEventListener("click",()=>{R=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",oe="",Me([]),Ge("Novo Imóvel")}),(p=document.getElementById("logout-btn"))==null||p.addEventListener("click",async()=>{await b.auth.signOut(),location.reload()}),(c=document.getElementById("view-prev"))==null||c.addEventListener("click",()=>{G=(G-1+Q.length)%Q.length,ze()}),(r=document.getElementById("view-next"))==null||r.addEventListener("click",()=>{G=(G+1)%Q.length,ze()}),(m=document.getElementById("view-modal-close"))==null||m.addEventListener("click",Ce),(u=document.getElementById("view-modal-close2"))==null||u.addEventListener("click",Ce),(y=document.getElementById("view-modal"))==null||y.addEventListener("click",k=>{k.target.id==="view-modal"&&Ce()}),(h=document.getElementById("view-modal-share"))==null||h.addEventListener("click",()=>{const k=document.getElementById("share-panel");if(!k)return;const I=k.style.display!=="none";k.style.display=I?"none":"block"}),(x=document.getElementById("share-whatsapp"))==null||x.addEventListener("click",()=>{var H,U,Y;const k=(H=document.getElementById("share-link-input"))==null?void 0:H.value;if(!k)return;const I=Number((U=document.getElementById("share-panel"))==null?void 0:U.dataset.pid),E=_.find(te=>te.id===I),S=(E==null?void 0:E.title)||((Y=document.getElementById("view-modal-title"))==null?void 0:Y.textContent)||"Imóvel",T=E!=null&&E.price?` — ${se(E.price,"pt")}`:"",C=E!=null&&E.reference?` | Ref: ${E.reference}`:"",M=[E==null?void 0:E.neighborhood,E==null?void 0:E.city].filter(Boolean).join(", "),A=M?`
📍 ${M}`:"",D=encodeURIComponent(`Olha esse imóvel que encontrei: *${S}*${T}${C}${A}

${k}`);window.open("https://wa.me/?text="+D,"_blank")}),(f=document.getElementById("share-instagram"))==null||f.addEventListener("click",()=>{var I,E;const k=(I=document.getElementById("share-link-input"))==null?void 0:I.value;k&&((E=navigator.clipboard)==null||E.writeText(k),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(w=document.getElementById("share-email"))==null||w.addEventListener("click",()=>{var T,C;const k=(T=document.getElementById("share-link-input"))==null?void 0:T.value;if(!k)return;const I=((C=document.getElementById("view-modal-title"))==null?void 0:C.textContent)||"Imóvel",E=encodeURIComponent("Imóvel: "+I),S=encodeURIComponent(`Olá! Segue o link do imóvel:

`+k);window.open("mailto:?subject="+E+"&body="+S,"_blank")}),(B=document.getElementById("share-copy"))==null||B.addEventListener("click",()=>{var I;const k=document.getElementById("share-link-input");k&&((I=navigator.clipboard)==null||I.writeText(k.value).then(()=>{const E=document.getElementById("share-copy"),S=E.textContent;E.textContent="✅ Copiado!",setTimeout(()=>{E.textContent=S},2e3)}))}),($=document.getElementById("view-modal-edit"))==null||$.addEventListener("click",()=>{var M;if((v==null?void 0:v.role)!=="admin"&&(v==null?void 0:v.role)!=="super_admin")return;const k=Number(document.getElementById("view-modal-edit").dataset.pid),I=_.find(A=>A.id===k);if(!I)return;Ce(),R=I.id;const E=document.getElementById("property-form"),S=document.getElementById("form-submit-btn");S.textContent="Salvar Alterações",E.querySelector('[name="title"]').value=I.title||"",E.querySelector('[name="rua"]').value=I.rua||"",E.querySelector('[name="numero"]').value=I.numero||"",E.querySelector('[name="city"]').value=I.city||"",E.querySelector('[name="price"]').value=I.price||"",E.querySelector('[name="bedrooms"]').value=I.bedrooms||"",E.querySelector('[name="suites"]').value=I.suites||"",E.querySelector('[name="parking"]').value=I.parking||"",E.querySelector('[name="description"]').value=I.description||"",E.querySelector('[name="construction_status"]').value=I.construction_status||"",E.querySelector('[name="owner_name"]').value=I.owner_name||"",E.querySelector('[name="owner_phone"]').value=I.owner_phone||"",E.querySelector('[name="owner_email"]').value=I.owner_email||"",E.querySelector('[name="owner_notes"]').value=I.owner_notes||"",E.querySelector('[name="condominium"]').value=I.condominium||"";const T=document.getElementById("adminPublished");T&&(T.value=I.published===!0?"true":"false");const C=document.getElementById("adminCitySelect");C&&(C.value=I.city||"",C.dispatchEvent(new Event("change")),setTimeout(()=>{const A=document.getElementById("adminNeighborhood");A&&(A.value=I.neighborhood||"")},50)),oe=I.cover_image||((M=I.images)==null?void 0:M[0])||"",Me(I.images||[]),Ge("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(k=>{k.addEventListener("click",()=>{var I;document.querySelectorAll(".tab-btn").forEach(E=>E.classList.remove("active")),k.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(E=>E.classList.add("hidden")),(I=document.getElementById(`tab-${k.dataset.tab}`))==null||I.classList.remove("hidden")})}),(L=document.getElementById("admin-properties"))==null||L.addEventListener("click",k=>{if(k.target.closest(".action-btns"))return;const I=k.target.closest("tr");if(!I)return;const E=Number(I.dataset.id);if(!E)return;const S=_.find(T=>T.id===E);S&&Jt(S)})}document.addEventListener("DOMContentLoaded",async()=>{var l,s,p;const t=window.location.hostname.replace(/^www\./,"");if(t&&t!=="localhost"&&t!=="127.0.0.1"){const c=`imobi_tenant_${t}`,r=Te(c);if(r)ue(r);else{let m=null;for(const u of[t,"www."+t]){const{data:y}=await b.from("tenants").select("id").eq("domain",u).maybeSingle();if(y!=null&&y.id){m=y;break}}m!=null&&m.id&&(ue(m.id),Xe(c,m.id,24*60*60*1e3))}}await Promise.all([At(),St()]),ne=F("company.whatsapp",ne),tt(),Xt(),Gt();const n=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");n&&a&&(it(),n.addEventListener("change",()=>{const c=me().find(m=>m.name===n.value),r=c?ot(c.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+r.map(m=>`<option value="${m.name}">${g(m.name)}</option>`).join("")}));const o=document.getElementById("admin-login"),i=document.getElementById("admin-root");if(o){const c=new URLSearchParams(window.location.hash.replace("#","")),r=new URLSearchParams(window.location.search),m=c.get("type")||r.get("type")||"",u=Et||m==="recovery"||m==="invite"||window.location.hash.includes("access_token")||r.has("code"),y=document.getElementById("password-reset-overlay");if(u){o.style.display="none",i&&i.classList.add("hidden"),y&&(y.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async x=>{var k,I;x.preventDefault();const f=((k=document.getElementById("new-password"))==null?void 0:k.value)||"",w=((I=document.getElementById("confirm-password"))==null?void 0:I.value)||"",B=document.getElementById("password-reset-msg"),$=x.target.querySelector('button[type="submit"]');if(B&&(B.style.display="none"),f!==w){B&&(B.textContent="As senhas não coincidem.",B.style.display="");return}$&&($.disabled=!0,$.textContent="Salvando…");const{error:L}=await b.auth.updateUser({password:f});if(L){B&&(B.textContent="Erro: "+L.message,B.style.display=""),$&&($.disabled=!1,$.textContent="Definir Senha");return}window.location.href=window.location.pathname}),r.has("code")&&await b.auth.exchangeCodeForSession(r.get("code")??"");return}const{data:{session:h}}=await b.auth.getSession();if(h){if(o.classList.add("hidden"),i&&i.classList.remove("hidden"),Fe(),yt(),pt(),window.lucide&&lucide.createIcons(),v=await ct(h.user.id),!v){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden");return}if(v.active===!1){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(v.needs_password_reset){o.style.display="none",i&&i.classList.add("hidden");const x=document.getElementById("password-reset-overlay");x&&(x.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async f=>{var I,E;f.preventDefault();const w=((I=document.getElementById("new-password"))==null?void 0:I.value)||"",B=((E=document.getElementById("confirm-password"))==null?void 0:E.value)||"",$=document.getElementById("password-reset-msg"),L=f.target.querySelector('button[type="submit"]');if($&&($.style.display="none"),w!==B){$&&($.textContent="As senhas não coincidem.",$.style.display="");return}if(w.length<6){$&&($.textContent="Mínimo 6 caracteres.",$.style.display="");return}L&&(L.disabled=!0,L.textContent="Salvando…");const{error:k}=await b.auth.updateUser({password:w});if(k){$&&($.textContent="Erro: "+k.message,$.style.display=""),L&&(L.disabled=!1,L.textContent="Definir Senha");return}await b.from("profiles").update({needs_password_reset:!1}).eq("id",v.id),window.location.href=window.location.pathname});return}ue((v==null?void 0:v.tenant_id)||null),Ne(v),Yt(v),mt(v.role),await qe(),await vt(v),window.lucide&&lucide.createIcons(),la()}else{i&&i.classList.add("hidden"),o.classList.remove("hidden");const x=document.getElementById("login-form");x&&((p=document.getElementById("forgot-password-btn"))==null||p.addEventListener("click",async()=>{var B,$;const f=($=(B=x.querySelector('input[name="email"]'))==null?void 0:B.value)==null?void 0:$.trim();if(!f){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:w}=await b.auth.resetPasswordForEmail(f,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(w?"Erro: "+w.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),x.addEventListener("submit",async f=>{f.preventDefault();const w=new FormData(x),B=w.get("email"),$=w.get("password");if(await Ut(B,$)){o.classList.add("hidden"),i&&i.classList.remove("hidden"),Fe(),yt(),window.lucide&&lucide.createIcons();const{data:{session:k}}=await b.auth.getSession();if(v=k?await ct(k.user.id):null,!v){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Perfil não encontrado. Entre em contato com o administrador.");return}if(v.active===!1){await b.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}pt(),ue((v==null?void 0:v.tenant_id)||null),Ne(v),mt(v.role),await qe(),await vt(v),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else Fe();await le();const d=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();qt(d),Mt(ne),document.querySelectorAll(".nav-dropdown-btn").forEach(c=>{var m;const r=(m=c.closest(".nav-dropdown"))==null?void 0:m.querySelector(".nav-dropdown-menu");r&&c.addEventListener("click",u=>{u.stopPropagation(),r.classList.toggle("js-open"),document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(y=>{y!==r&&y.classList.remove("js-open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(c=>c.classList.remove("js-open"))})});async function ua(){const e=_.filter(o=>!o.reference);if(!e.length)return;const t=_.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,i)=>o.id-i.id);for(const o of a){const i="IO-"+String(n).padStart(4,"0"),{error:d}=await b.from("properties").update({reference:i}).eq("id",o.id);if(!d){const l=_.findIndex(s=>s.id===o.id);l>=0&&(_[l].reference=i),n++}}Se(at(_))}async function ga(){const e=_.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(i=>!i.includes("/wm-")))continue;const a=[];let o=!1;for(const i of t.images)if(i.includes("/wm-"))a.push(i);else try{const d=await fa(i);a.push(d),o=!0}catch{a.push(i)}if(o){await b.from("properties").update({images:a}).eq("id",t.id);const i=_.findIndex(d=>d.id===t.id);i>=0&&(_[i].images=a)}}Se(at(_))}}async function fa(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),i=o.ok?await o.blob():null,d=i?URL.createObjectURL(i):null;return new Promise(l=>{const s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const p=document.createElement("canvas"),c=1200;let r=s.width,m=s.height;r>c&&(m=Math.round(m*c/r),r=c),p.width=r,p.height=m;const u=p.getContext("2d");u.drawImage(s,0,0,r,m);const y=h=>{if(h){const x=Math.round(r*.18),f=Math.round(h.naturalHeight*x/h.naturalWidth),w=Math.round(r*.02);u.globalAlpha=.45,u.drawImage(h,r-x-w,m-f-w,x,f),u.globalAlpha=1}p.toBlob(async x=>{try{const f=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:w}=await b.storage.from("imoveis").upload(f,x,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(w){console.error("Upload watermark error:",w),l(e);return}const{data:{publicUrl:B}}=b.storage.from("imoveis").getPublicUrl(f);l(B)}catch(f){console.error("Watermark upload exception:",f),l(e)}},"image/jpeg",.82)};if(d){const h=new Image;h.onload=()=>{URL.revokeObjectURL(d),y(h)},h.onerror=()=>{URL.revokeObjectURL(d),y(null)},h.src=d}else y(null)},s.onerror=()=>{URL.revokeObjectURL(a),l(e)},s.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function V(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function st(e,t="assets"){const n=await _e(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await b.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:i}}=b.storage.from("imoveis").getPublicUrl(a);return i}async function va(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("settings").select("key,value").eq("tenant_id",z()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>g(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const i=o.target.files[0];if(i)try{const d=await st(i,"logos");document.getElementById("co-logo-url").value=d,document.getElementById("co-logo-preview").src=d}catch(d){alert("Erro no upload: "+d.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const i=await ye([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);i&&tt(),o.disabled=!1,o.textContent="Salvar Identidade",V(document.getElementById("co-identity-msg"),i)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const i=document.getElementById("co-whatsapp").value.trim(),d=await ye([["company.whatsapp",i],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);d&&i&&(ne=i),o.disabled=!1,o.textContent="Salvar Contatos",V(document.getElementById("co-contacts-msg"),d)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const i=await ye([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",V(document.getElementById("co-social-msg"),i)})}async function ya(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("settings").select("key,value").eq("tenant_id",z()),n={};t==null||t.forEach(c=>{n[c.key]=c.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",i=n["visual.secondary_bg"]||"#1a2f4a",d=n["visual.hero_bg_url"]||"",l=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${g(d)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 <strong>Foto de fundo do banner</strong> no topo do site. Recomendado: 1920×1080 px.</p>
        <div id="vis-hero-preview" style="margin-top:10px;display:${d?"":"none"}">
          <img src="${g(d)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function s(c,r,m){const u=document.getElementById(c),y=document.getElementById(r);u==null||u.addEventListener("input",h=>{y.value=h.target.value,m()}),y==null||y.addEventListener("input",h=>{/^#[0-9a-fA-F]{6}$/.test(h.target.value)&&(u.value=h.target.value,m())})}function p(){var r,m,u,y;const c=((r=document.getElementById("col-accent-hex"))==null?void 0:r.value)||"#b8962e";(m=document.getElementById("vp-bar"))==null||m.style.setProperty("background",c),(u=document.getElementById("vp-dot"))==null||u.style.setProperty("background",c),(y=document.getElementById("vp-btn"))==null||y.style.setProperty("background",c),document.documentElement.style.setProperty("--accent",c)}s("col-accent","col-accent-hex",p),s("col-primary","col-primary-hex",()=>{}),s("col-secondary","col-secondary-hex",()=>{}),p(),document.getElementById("vis-hero-file").addEventListener("change",async c=>{const r=c.target.files[0];if(r)try{const m=await st(r,"hero");document.getElementById("vis-hero-url").value=m;const u=document.getElementById("vis-hero-preview");u.innerHTML=`<img src="${m}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,u.style.display=""}catch(m){alert("Erro no upload: "+m.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const c=document.getElementById("visual-save-colors");c.disabled=!0,c.textContent="Salvando…";const r=await ye([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);r&&tt(),c.disabled=!1,c.textContent="Salvar Cores",V(document.getElementById("visual-colors-msg"),r)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",p())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const c=document.getElementById("visual-save-images");c.disabled=!0,c.textContent="Salvando…";const r=await ye([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);c.disabled=!1,c.textContent="Salvar Imagens",V(document.getElementById("visual-images-msg"),r)})}async function ba(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("site_content").select("*").eq("tenant_id",z()),n={};t==null||t.forEach(s=>{n[s.key]=s});const a=(s,p)=>{var c;return g(((c=n[s])==null?void 0:c[`value_${p}`])||"")},o=["pt","en","es"],i={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},d=s=>o.map(p=>`<button class="content-tab${p===s?" active":""}" data-lang="${p}">${i[p]}</button>`).join(""),l=s=>`
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
        ${o.map(s=>`<div class="content-panel${s==="pt"?" active":""}" data-panel="${s}">${l(s)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",s=>{var c;const p=s.target.closest(".content-tab");p&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(r=>r.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(r=>r.classList.remove("active")),p.classList.add("active"),(c=document.querySelector(`#sc-panels [data-panel="${p.dataset.lang}"]`))==null||c.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const s=document.getElementById("sc-save-btn");s.disabled=!0,s.textContent="Salvando…";const p={};document.querySelectorAll(".sc-field").forEach(r=>{const m=r.dataset.key,u=r.dataset.lang;p[m]||(p[m]={}),p[m][u]=r.value});let c=!0;for(const[r,m]of Object.entries(p))await De(r,{pt:m.pt,en:m.en,es:m.es})||(c=!1);s.disabled=!1,s.textContent="Salvar Conteúdo",V(document.getElementById("sc-save-msg"),c)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const s=document.getElementById("seo-save-btn");s.disabled=!0,s.textContent="Salvando…";const p=document.getElementById("seo-title").value.trim(),c=document.getElementById("seo-desc").value.trim(),r=await De("seo.title_pt",{pt:p,en:p,es:p})&&await De("seo.description_pt",{pt:c,en:c,es:c});s.disabled=!1,s.textContent="Salvar SEO",V(document.getElementById("seo-save-msg"),r)})}async function ha(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await K())}async function K(){const e=document.getElementById("crm-body");if(!e)return;const t=z(),[{data:n},{data:a},{data:o},{data:i}]=await Promise.all([b.from("crm_pipelines").select("*").eq("tenant_id",t).order("sort_order"),b.from("crm_stages").select("*").eq("tenant_id",t).order("sort_order"),b.from("crm_tags").select("*").eq("tenant_id",t).order("name"),b.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("sort_order")]),d=n||[],l=d.find(u=>u.is_default)||d[0],s=d.map(u=>`<option value="${u.id}"${u.id===(l==null?void 0:l.id)?" selected":""}>${g(u.name)}</option>`).join(""),c=(a||[]).filter(u=>u.pipeline_id===(l==null?void 0:l.id)).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${g(u.name)}</span>
      <input type="color" value="${u.color}" data-sid="${u.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${u.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',r=(o||[]).map(u=>`<span class="tag-chip" style="background:${u.color}" data-id="${u.id}">
      ${g(u.name)}
      <button class="tag-chip-del" data-id="${u.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',m=(i||[]).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${g(u.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${u.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${u.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${s}</select>
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
      <div class="tags-grid" id="crm-tags-grid">${r}</div>
      <div class="tag-add-row">
        <input id="crm-new-tag" type="text" class="form-control" placeholder="Nome da tag…">
        <input type="color" id="crm-new-tag-color" value="#b8962e">
        <button class="btn-primary" id="crm-add-tag">Adicionar</button>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const u=document.getElementById("crm-new-stage").value.trim(),y=document.getElementById("crm-new-stage-color").value,h=parseInt(document.getElementById("crm-pipe-sel").value,10);u&&(await b.from("crm_stages").insert({pipeline_id:h,name:u,color:y,sort_order:99,tenant_id:z()}),document.getElementById("crm-new-stage").value="",await K())}),e.querySelectorAll(".stage-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await b.from("crm_stages").delete().eq("id",u.dataset.id),await K())})}),e.querySelectorAll(".stage-color-pick").forEach(u=>{u.addEventListener("change",async y=>{await b.from("crm_stages").update({color:y.target.value}).eq("id",u.dataset.sid);const h=u.closest(".stage-item").querySelector(".stage-color-dot");h&&(h.style.background=y.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const u=document.getElementById("crm-new-tag").value.trim(),y=document.getElementById("crm-new-tag-color").value;u&&(await b.from("crm_tags").insert({name:u,color:y,tenant_id:z()}),document.getElementById("crm-new-tag").value="",await K())}),e.querySelectorAll(".tag-chip-del").forEach(u=>{u.addEventListener("click",async()=>{await b.from("crm_tags").delete().eq("id",u.dataset.id),await K()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const u=document.getElementById("crm-new-status").value.trim(),y=document.getElementById("crm-new-status-color").value,h=document.getElementById("crm-new-status-final").checked;u&&(await b.from("crm_lead_statuses").insert({name:u,color:y,is_final:h,sort_order:99,tenant_id:z()}),document.getElementById("crm-new-status").value="",await K())}),e.querySelectorAll(".status-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover este status?")&&(await b.from("crm_lead_statuses").delete().eq("id",u.dataset.id),await K())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var h;const u=(h=prompt("Nome do novo funil:"))==null?void 0:h.trim();if(!u)return;const{error:y}=await b.from("crm_pipelines").insert({name:u,sort_order:99,tenant_id:z()});if(y){alert("Erro ao criar funil: "+y.message);return}We=!1,await K()})}async function xa(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("integrations").select("*"),n={};t==null||t.forEach(l=>{n[l.key]=l});const a=l=>{var s;return g(((s=n[l])==null?void 0:s.value)||"")},o=l=>{var s;return(s=n[l])!=null&&s.enabled?"checked":""},i=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],d=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
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
      ${d.map(l=>`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var r;const l=document.getElementById("intg-save-tracking");l.disabled=!0,l.textContent="Salvando…";let s=!0;const p=document.querySelectorAll(".intg-val"),c=document.querySelectorAll(".intg-toggle");for(let m=0;m<p.length;m++){const u=p[m].dataset.key,y=p[m].value.trim(),h=((r=c[m])==null?void 0:r.checked)??!1;await Pe(u,y,h)||(s=!1)}l.disabled=!1,l.textContent="Salvar Integrações",V(document.getElementById("intg-tracking-msg"),s)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const l=document.getElementById("intg-save-smtp");l.disabled=!0,l.textContent="Salvando…";const s=document.querySelectorAll(".smtp-field");let p=!0;for(const r of s)await Pe(r.dataset.key,r.value.trim(),!0)||(p=!1);const c=document.getElementById("smtp-pass").value;c&&(await Pe("smtp_pass",c,!0)||(p=!1)),l.disabled=!1,l.textContent="Salvar SMTP",V(document.getElementById("intg-smtp-msg"),p)})}async function Ea(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Ze(),document.getElementById("media-file-input").addEventListener("change",async n=>{var s,p;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),i=document.getElementById("media-progress-fill"),d=document.getElementById("media-progress-text");o.style.display="";let l=0;for(const c of a){d.textContent=`Enviando ${l+1}/${a.length}…`,i.style.width=`${Math.round(l/a.length*100)}%`;try{const r=await st(c,"media"),m=c.name.replace(/\.[^.]+$/,"").slice(0,60);await b.from("media_library").insert({name:m,url:r,type:"image",size:c.size,created_by:(p=(s=(await b.auth.getUser()).data)==null?void 0:s.user)==null?void 0:p.id})}catch(r){console.error("Media upload error:",r)}l++}i.style.width="100%",d.textContent=`✓ ${l} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",i.style.width="0"},2e3),await Ze(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Ze(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await b.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${g(a.url)}">
      <img src="${g(a.url)}" alt="${g(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${g(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${g(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation(),(i=navigator.clipboard)==null||i.writeText(a.dataset.url).then(()=>{const d=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=d},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await b.from("media_library").delete().eq("id",a.dataset.id),await Ze())})})}async function wa(){var t,n,a,o,i;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(s=>s.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(s=>s.classList.add("hidden")),d.classList.add("active");const l=e.querySelector(`#sa-panel-${d.dataset.tab}`);l&&l.classList.remove("hidden"),d.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&ee(),d.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&Ia(),d.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&bt(),d.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&ht(),d.dataset.tab==="platform"&&xt()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",bt),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",ee),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",ht),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>ka()),(i=e.querySelector("#sa-plat-save"))==null||i.addEventListener("click",$a),ee(),xt())}async function ee(){var l,s;const e=document.getElementById("sa-tenants-list"),t=((s=(l=document.getElementById("sa-tenant-search"))==null?void 0:l.value)==null?void 0:s.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=b.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const i=(a||[]).filter(p=>{var c,r;return!t||((c=p.name)==null?void 0:c.toLowerCase().includes(t))||((r=p.slug)==null?void 0:r.toLowerCase().includes(t))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const d=p=>p.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=i.map(p=>{var c;return`
    <div class="sa-list-row" data-action="open-panel" data-id="${p.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${p.logo_url?`<img class="sa-tenant-logo" src="${g(p.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${g(p.name||"—")}</div>
          <div class="sa-list-sub">${g(p.slug||"")} · ${g(((c=p.plans)==null?void 0:c.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${d(p)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${p.id}" data-active="${p.active}" title="${p.active?"Desativar":"Ativar"}">${p.active?"⏸️":"▶️"}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(p=>{p.addEventListener("click",async c=>{c.stopPropagation();const r=p.dataset.active==="true";await b.from("tenants").update({active:!r}).eq("id",p.dataset.id),ee()})}),e.querySelectorAll('[data-action="open-panel"]').forEach(p=>{p.addEventListener("click",()=>{const c=(i||[]).find(r=>String(r.id)===String(p.dataset.id));c&&La(c)})})}async function Ia(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await b.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${g(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function bt(){var l;const e=document.getElementById("sa-subs-list"),t=((l=document.getElementById("sa-sub-filter"))==null?void 0:l.value)||"";if(!e)return;e.dataset.loaded="1";let n=b.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const i={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},d={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(s=>{var p,c,r;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${g(((p=s.tenants)==null?void 0:p.name)||"—")}</div>
          <div class="sa-list-sub">${g(((c=s.plans)==null?void 0:c.name)||"—")} · R$ ${Number(((r=s.plans)==null?void 0:r.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${i[s.status]||"gray"}">${d[s.status]||s.status}</span>
        <span class="sa-list-date">${s.current_period_end?new Date(s.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function ht(){var d,l;const e=document.getElementById("sa-users-list"),t=((l=(d=document.getElementById("sa-user-search"))==null?void 0:d.value)==null?void 0:l.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await b.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(s=>{var p,c;return!t||((p=s.name)==null?void 0:p.toLowerCase().includes(t))||((c=s.email)==null?void 0:c.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const i={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(s=>{var p;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(s.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${g(s.name||"—")}</div>
          <div class="sa-list-sub">${g(((p=s.tenants)==null?void 0:p.name)||"Sem imobiliária")} · ${i[s.role]||s.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${s.active!==!1?"sa-badge-green":"sa-badge-red"}">${s.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function xt(){const[e,t,n,a]=await Promise.all([b.from("tenants").select("id",{count:"exact",head:!0}),b.from("profiles").select("id",{count:"exact",head:!0}),b.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),b.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(i,d)=>{const l=document.getElementById(i);l&&(l.textContent=d??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function $a(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await ye([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),V(t,!0)}function Ba(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ka(){var a,o,i,d,l,s;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),b.from("plans").select("id, name").then(({data:p})=>{const c=document.getElementById("nt-plan");c&&p&&(c.innerHTML='<option value="">Sem plano</option>'+p.map(r=>`<option value="${r.id}">${g(r.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",p=>{const c=document.getElementById("nt-slug");c&&!c.dataset.manual&&(c.value=Ba(p.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",p=>{p.target.dataset.manual="1"}),(i=document.getElementById("nt-pwd-toggle"))==null||i.addEventListener("click",()=>{const p=document.getElementById("nt-admin-password");p.type=p.type==="password"?"text":"password"});const n=()=>t.remove();(d=document.getElementById("sa-modal-close-btn"))==null||d.addEventListener("click",n),(l=document.getElementById("nt-cancel"))==null||l.addEventListener("click",n),t.addEventListener("click",p=>{p.target===t&&n()}),(s=document.getElementById("nt-save"))==null||s.addEventListener("click",async()=>{var L,k,I,E,S,T,C,M,A,D,H,U;const p=(k=(L=document.getElementById("nt-name"))==null?void 0:L.value)==null?void 0:k.trim(),c=(E=(I=document.getElementById("nt-slug"))==null?void 0:I.value)==null?void 0:E.trim(),r=(T=(S=document.getElementById("nt-domain"))==null?void 0:S.value)==null?void 0:T.trim(),m=(C=document.getElementById("nt-plan"))==null?void 0:C.value,u=(A=(M=document.getElementById("nt-admin-email"))==null?void 0:M.value)==null?void 0:A.trim(),y=(H=(D=document.getElementById("nt-admin-password"))==null?void 0:D.value)==null?void 0:H.trim(),h=document.getElementById("nt-msg"),x=document.getElementById("nt-save");if(!p||!c){h.textContent="❌ Nome e slug são obrigatórios.",h.style.color="#ef4444";return}if(!u){h.textContent="❌ Informe o e-mail do admin.",h.style.color="#ef4444";return}if(!y||y.length<6){h.textContent="❌ A senha precisa ter mínimo 6 caracteres.",h.style.color="#ef4444";return}x.disabled=!0,x.textContent="Criando…",h.textContent="⏳ Criando imobiliária…",h.style.color="#64748b";const{data:f,error:w}=await b.from("tenants").insert({name:p,slug:c,domain:r||null,plan_id:m||null,active:!0}).select();if(w){x.disabled=!1,x.textContent="Criar Imobiliária",h.textContent="❌ "+w.message,h.style.color="#ef4444";return}const B=(U=f==null?void 0:f[0])==null?void 0:U.id;h.textContent="⏳ Criando usuário admin…";const $=await ce({email:u,password:y,role:"admin",tenant_id:B});if(!($!=null&&$.success)){x.disabled=!1,x.textContent="Criar Imobiliária",h.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+g(($==null?void 0:$.error)||"Desconhecido"),h.style.color="#f59e0b",setTimeout(()=>{n(),ee()},3e3);return}B&&($!=null&&$.user_id)&&!($!=null&&$.linked)&&await b.from("profiles").update({tenant_id:B}).eq("id",$.user_id),x.disabled=!1,x.textContent="Criar Imobiliária",$.email_sent===!1?(h.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${g($.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${g(u)}</strong><br>
          Senha: <strong>${g(y)}</strong>
        </div>`,h.style.color="#0f172a"):(h.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",h.style.color="#22c55e",setTimeout(()=>{n(),ee()},1500))})}function La(e){var a;(a=document.getElementById("tenant-panel"))==null||a.remove();const t=document.createElement("div");t.id="tenant-panel",t.style.cssText="position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;";const n=[{id:"properties",label:"🏠 Imóveis"},{id:"leads",label:"📋 Leads"},{id:"users",label:"👥 Corretores"},{id:"api",label:"🔗 Site & API"},{id:"config",label:"⚙️ Configurações"}];t.innerHTML=`
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
  `,document.body.appendChild(t),document.getElementById("tp-back").addEventListener("click",()=>t.remove()),document.getElementById("tp-edit-btn").addEventListener("click",()=>_t(e)),t.querySelectorAll(".tp-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".tp-tab").forEach(i=>{i.style.fontWeight="500",i.style.color="#64748b",i.style.borderBottomColor="transparent"}),o.style.fontWeight="700",o.style.color="#2563eb",o.style.borderBottomColor="#2563eb",et(e,o.dataset.tab)})}),et(e,"properties")}function Sa(e,t){const n=document.getElementById("tp-prop-edit-modal");n&&n.remove();const a=document.createElement("div");a.id="tp-prop-edit-modal",a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;";const o=(l,s,p,c="text",r="")=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${s}</label>
      <input id="${l}" type="${c}" value="${g(String(p||""))}" ${r}
        style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;outline:none;">
    </div>`,i=(l,s,p,c)=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${s}</label>
      <select id="${l}" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;background:#fff;">
        ${p.map(([r,m])=>`<option value="${r}"${c===r?" selected":""}>${m}</option>`).join("")}
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
    </div>`,document.body.appendChild(a);const d=()=>a.remove();document.getElementById("tpe-close").addEventListener("click",d),document.getElementById("tpe-cancel").addEventListener("click",d),a.addEventListener("click",l=>{l.target===a&&d()}),document.getElementById("tpe-save").addEventListener("click",async()=>{const l=document.getElementById("tpe-save"),s=document.getElementById("tpe-msg"),p=document.getElementById("tpe-title").value.trim();if(!p){s.style.color="#ef4444",s.textContent="Título é obrigatório.";return}l.disabled=!0,l.textContent="Salvando…";const c={title:p,price:document.getElementById("tpe-price").value.trim()||null,area:document.getElementById("tpe-area").value.trim()||null,bedrooms:document.getElementById("tpe-bedrooms").value||null,suites:document.getElementById("tpe-suites").value||null,parking:document.getElementById("tpe-parking").value||null,reference:document.getElementById("tpe-reference").value.trim()||null,city:document.getElementById("tpe-city").value.trim()||null,neighborhood:document.getElementById("tpe-neighborhood").value.trim()||null,rua:document.getElementById("tpe-rua").value.trim()||null,numero:document.getElementById("tpe-numero").value.trim()||null,construction_status:document.getElementById("tpe-construction").value||null,published:document.getElementById("tpe-published").value==="true",description:document.getElementById("tpe-description").value.trim()||null},{error:r}=await b.from("properties").update(c).eq("id",e.id);if(r){s.style.color="#ef4444",s.textContent="Erro: "+r.message,l.disabled=!1,l.textContent="💾 Salvar";return}s.style.color="#16a34a",s.textContent="✅ Salvo!",setTimeout(()=>{d(),typeof t=="function"&&t()},800)})}async function et(e,t){var i,d,l,s,p;const n=document.getElementById("tp-content");if(!n)return;n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>';const a=()=>et(e,t),o=(c,r)=>`background:${c};color:${r};border:none;border-radius:6px;padding:5px 12px;cursor:pointer;font-size:12px;font-weight:600;white-space:nowrap;`;if(t==="properties"){const{data:c}=await b.from("properties").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1});if(!(c!=null&&c.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>';return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${c.length} imóvel(is)</h3>
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
          <tbody id="tp-prop-tbody">${c.map(r=>{var m;return`
            <tr data-pid="${r.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  ${(m=r.images)!=null&&m[0]?`<img src="${r.images[0]}" style="width:52px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;">`:'<div style="width:52px;height:38px;background:#e2e8f0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>'}
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${g(r.title||"")}</div><div style="font-size:11px;color:#94a3b8;">${g(r.reference||"")}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${g([r.neighborhood,r.city].filter(Boolean).join(", "))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">${g(se(r.price,"pt"))}</td>
              <td style="padding:12px 16px;text-align:center;">${r.published?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Publicado</span>':'<span style="background:#f1f5f9;color:#64748b;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Rascunho</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-prop-edit" data-pid="${r.id}" style="${o("#eff6ff","#1d4ed8")}">✏️ Editar</button>
                  <button class="tp-prop-toggle" data-pid="${r.id}" data-pub="${r.published?"1":"0"}" style="${o(r.published?"#fef3c7":"#dcfce7",r.published?"#92400e":"#15803d")}">${r.published?"Despublicar":"Publicar"}</button>
                  <button class="tp-prop-del" data-pid="${r.id}" style="${o("#fee2e2","#dc2626")}">Excluir</button>
                </div>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`,n.querySelectorAll(".tp-prop-edit").forEach(r=>{r.addEventListener("click",()=>{const m=Number(r.dataset.pid),u=c.find(y=>y.id===m);u&&Sa(u,a)})}),n.querySelectorAll(".tp-prop-toggle").forEach(r=>{r.addEventListener("click",async()=>{const m=Number(r.dataset.pid),u=r.dataset.pub==="1";r.disabled=!0,r.textContent="…",await b.from("properties").update({published:!u}).eq("id",m),a()})}),n.querySelectorAll(".tp-prop-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Excluir este imóvel permanentemente?")&&(r.disabled=!0,r.textContent="…",await b.from("properties").delete().eq("id",Number(r.dataset.pid)),a())})})}if(t==="leads"){const{data:c}=await b.from("leads").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}).limit(200);if(!(c!=null&&c.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">📋</div><p style="font-size:14px;">Nenhum lead ainda.</p></div>';return}const r=m=>({novo:"#dbeafe,#1d4ed8",contato:"#fef3c7,#92400e",proposta:"#ede9fe,#6d28d9",fechado:"#dcfce7,#15803d"})[m]||"#f1f5f9,#64748b";n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${c.length} lead(s)</h3>
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
          <tbody>${c.map(m=>{const[u,y]=r(m.stage||m.status||"").split(","),h=(m.phone||"").replace(/\D/g,"");return`<tr data-lid="${m.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${g(m.name||"")}</td>
              <td style="padding:12px 16px;">
                <div style="font-size:13px;color:#475569;">${g(m.phone||"—")}</div>
                <div style="font-size:11px;color:#94a3b8;">${g(m.email||"")}</div>
              </td>
              <td style="padding:12px 16px;"><span style="background:${u};color:${y};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${g(m.stage||m.status||"Novo")}</span></td>
              <td style="padding:12px 16px;font-size:12px;color:#94a3b8;">${new Date(m.created_at).toLocaleDateString("pt-BR")}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;align-items:center;">
                  ${h?`<a href="https://wa.me/${h}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;" title="WhatsApp"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg></a>`:""}
                  <button class="tp-lead-del" data-lid="${m.id}" style="${o("#fee2e2","#dc2626")}">Excluir</button>
                </div>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`,n.querySelectorAll(".tp-lead-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Excluir este lead permanentemente?")&&(m.disabled=!0,m.textContent="…",await b.from("leads").delete().eq("id",m.dataset.lid),a())})})}if(t==="users"){const{data:c}=await b.from("profiles").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}),r='<button id="tp-add-corretor" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;font-weight:600;">+ Adicionar Usuário</button>';if(!(c!=null&&c.length)){n.innerHTML=`<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">👥</div><p style="font-size:14px;margin-bottom:16px;">Nenhum corretor cadastrado ainda.</p>${r}</div>`,(i=n.querySelector("#tp-add-corretor"))==null||i.addEventListener("click",()=>Ve(e.id,a));return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${c.length} usuário(s)</h3>
          ${r}
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:520px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">USUÁRIO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">FUNÇÃO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody>${c.map(m=>`
            <tr data-uid="${m.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${g(m.name||m.email||"—")}</div><div style="font-size:11px;color:#94a3b8;">${g(m.email||"")}</div></td>
              <td style="padding:12px 16px;">
                <select class="tp-role-sel" data-uid="${m.id}" style="border:1px solid #e2e8f0;border-radius:6px;padding:4px 8px;font-size:13px;color:#0f172a;background:#fff;cursor:pointer;">
                  <option value="admin" ${m.role==="admin"?"selected":""}>Admin</option>
                  <option value="corretor" ${m.role==="corretor"?"selected":""}>Corretor</option>
                </select>
              </td>
              <td style="padding:12px 16px;text-align:center;">${m.active!==!1?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Ativo</span>':'<span style="background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Pausado</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-user-toggle" data-uid="${m.id}" data-active="${m.active!==!1?"1":"0"}" style="${o(m.active!==!1?"#fef3c7":"#dcfce7",m.active!==!1?"#92400e":"#15803d")}">${m.active!==!1?"Pausar":"Ativar"}</button>
                  <button class="tp-user-del" data-uid="${m.id}" style="${o("#fee2e2","#dc2626")}">Remover</button>
                </div>
              </td>
            </tr>`).join("")}
          </tbody>
        </table></div>
      </div>`,(d=n.querySelector("#tp-add-corretor"))==null||d.addEventListener("click",()=>Ve(e.id,a)),n.querySelectorAll(".tp-role-sel").forEach(m=>{m.addEventListener("change",async()=>{const u=m.dataset.uid;m.disabled=!0,await b.from("profiles").update({role:m.value}).eq("id",u),m.disabled=!1})}),n.querySelectorAll(".tp-user-toggle").forEach(m=>{m.addEventListener("click",async()=>{const u=m.dataset.uid,y=m.dataset.active==="1";m.disabled=!0,m.textContent="…",await b.from("profiles").update({active:!y}).eq("id",u),a()})}),n.querySelectorAll(".tp-user-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Remover este usuário da imobiliária? O acesso ao sistema será excluído permanentemente.")&&(m.disabled=!0,m.textContent="…",await ce({action:"delete",userId:m.dataset.uid}),a())})})}if(t==="api"){const c="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api",r=(e.domain||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim(),m=r?`https://${r}`:`https://omarcorretor.com.br/demo.html?key=${e.id}`,u=r?"🌐 Site da Imobiliária":"🌐 Site Demonstração",y=r?"Site oficial da imobiliária integrado ao CRM.":"Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.",h=r?"Abrir site →":"Abrir site demo →";n.innerHTML=`
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
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">${u}</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">${y}</p>
          <a href="${g(m)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">${h}</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${g(m)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${c}/properties?key=${g(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${c}/properties/{id}?key=${g(e.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${c}/leads?key=${g(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${c}/settings?key=${g(e.id)}</div>
          </div>
        </div>
      </div>`,(l=document.getElementById("tp-copy-key"))==null||l.addEventListener("click",()=>{var w;(w=navigator.clipboard)==null||w.writeText(e.id);const x=document.getElementById("tp-copy-key"),f=x.textContent;x.textContent="✅ Copiada!",setTimeout(()=>{x.textContent=f},2e3)})}if(t==="config"){const{data:c}=await b.from("settings").select("key,value").eq("tenant_id",e.id),r={};c==null||c.forEach(u=>{r[u.key]=u.value});const m=(u,y)=>`
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${u}</div>
        <div style="font-size:14px;color:#0f172a;">${g(String(y||"—"))}</div>
      </div>`;n.innerHTML=`
      <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);max-width:560px;">
        <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 20px;">⚙️ Configurações da imobiliária</h3>
        ${m("NOME DA EMPRESA",r["company.name"]||e.name)}
        ${m("TELEFONE",r["company.phone"])}
        ${m("E-MAIL",r["company.email"])}
        ${m("WHATSAPP",r["company.whatsapp"])}
        ${m("CIDADE",r["company.city"])}
        ${m("DOMÍNIO DO SITE",e.domain)}
        ${m("PLANO",((s=e.plans)==null?void 0:s.name)||"Sem plano")}
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
          <button id="tp-open-edit" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">✏️ Editar dados completos</button>
        </div>
      </div>`,(p=document.getElementById("tp-open-edit"))==null||p.addEventListener("click",()=>_t(e))}}function _t(e){var p,c,r,m,u,y,h,x;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
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
            <input id="et-api-key" class="form-input" type="text" value="${g(e.id||"")}" readonly
              style="font-family:monospace;font-size:11px;background:#fff;color:#1e3a5f;flex:1;letter-spacing:.02em;">
            <button id="et-copy-key" class="btn-secondary-sm" style="white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Endpoints disponíveis</div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([f,w,B])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${f==="GET"?"#dcfce7":"#fef9c3"};color:${f==="GET"?"#15803d":"#854d0e"};">${f}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${w}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${B}</div>
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
  `,document.body.appendChild(n),b.from("plans").select("id, name").then(({data:f})=>{const w=document.getElementById("et-plan");w&&f&&(w.innerHTML='<option value="">Sem plano</option>'+f.map(B=>`<option value="${B.id}"${String(B.id)===String(e.plan_id)?" selected":""}>${g(B.name)}</option>`).join(""))}),(p=document.getElementById("et-logo-input"))==null||p.addEventListener("change",f=>{const w=f.target.files[0];if(!w)return;const B=URL.createObjectURL(w),$=document.getElementById("et-logo-preview");$&&($.innerHTML=`<img src="${B}" style="width:100%;height:100%;object-fit:cover;">`)}),(c=document.getElementById("et-logo-preview"))==null||c.addEventListener("click",()=>{var f;(f=document.getElementById("et-logo-input"))==null||f.click()}),(r=document.getElementById("et-pwd-toggle"))==null||r.addEventListener("click",()=>{const f=document.getElementById("et-admin-password");f.type=f.type==="password"?"text":"password"}),(m=document.getElementById("et-copy-key"))==null||m.addEventListener("click",()=>{var $,L;const f=($=document.getElementById("et-api-key"))==null?void 0:$.value;if(!f)return;(L=navigator.clipboard)==null||L.writeText(f);const w=document.getElementById("et-copy-key"),B=w.textContent;w.textContent="✅ Copiada!",setTimeout(()=>{w.textContent=B},2e3)});const o=["dados","config","api"];function i(f){o.forEach(w=>{document.getElementById(`et-pane-${w}`).style.display=w===f?"":"none";const B=document.getElementById(`et-tab-${w}`);B.style.borderBottomColor=w===f?"#2563eb":"transparent",B.style.color=w===f?"#2563eb":"#64748b",B.style.fontWeight=w===f?"600":"500"}),f==="config"&&l()}o.forEach(f=>{var w;return(w=document.getElementById(`et-tab-${f}`))==null?void 0:w.addEventListener("click",()=>i(f))});let d=!1;async function l(){var B;if(d)return;d=!0;const{data:f}=await b.from("settings").select("key,value").eq("tenant_id",e.id),w={};f==null||f.forEach($=>{w[$.key]=$.value}),document.getElementById("et-pane-config").innerHTML=`
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${g(w["company.whatsapp"]||"")}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${g(w["company.phone"]||"")}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${g(w["company.email"]||"")}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${g(w["company.city"]||w["company.address"]||"")}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${g(w["company.slogan"]||"")}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `,(B=document.getElementById("et-cfg-save"))==null||B.addEventListener("click",async()=>{const $=document.getElementById("et-cfg-save"),L=document.getElementById("et-cfg-msg");$.disabled=!0,$.textContent="Salvando…",L.textContent="",L.style.color="#64748b";const k=document.getElementById("et-cfg-wa").value.trim().replace(/\D/g,""),I=document.getElementById("et-cfg-phone").value.trim(),E=document.getElementById("et-cfg-email").value.trim(),S=document.getElementById("et-cfg-city").value.trim(),T=document.getElementById("et-cfg-slogan").value.trim(),{error:C}=await b.from("settings").upsert([{key:"company.whatsapp",value:k,tenant_id:e.id},{key:"company.phone",value:I,tenant_id:e.id},{key:"company.email",value:E,tenant_id:e.id},{key:"company.city",value:S,tenant_id:e.id},{key:"company.address",value:S,tenant_id:e.id},{key:"company.slogan",value:T,tenant_id:e.id}],{onConflict:"tenant_id,key"});$.disabled=!1,$.textContent="💾 Salvar configurações",C?(L.textContent="❌ "+C.message,L.style.color="#ef4444"):(L.textContent="✅ Configurações salvas!",L.style.color="#22c55e")})}const s=()=>n.remove();(u=document.getElementById("et-close"))==null||u.addEventListener("click",s),(y=document.getElementById("et-cancel"))==null||y.addEventListener("click",s),n.addEventListener("click",f=>{f.target===n&&s()}),(h=document.getElementById("et-delete"))==null||h.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const w=document.getElementById("et-delete");w.disabled=!0,w.textContent="Excluindo…";const{error:B}=await b.from("tenants").delete().eq("id",e.id);if(B){alert("Erro ao excluir: "+B.message),w.disabled=!1,w.textContent="🗑️ Excluir";return}s(),ee()}),(x=document.getElementById("et-save"))==null||x.addEventListener("click",async()=>{var M,A,D,H,U,Y,te,Ee,we,O,pe,lt;const f=(A=(M=document.getElementById("et-name"))==null?void 0:M.value)==null?void 0:A.trim(),w=(H=(D=document.getElementById("et-slug"))==null?void 0:D.value)==null?void 0:H.trim(),B=(Y=(U=document.getElementById("et-domain"))==null?void 0:U.value)==null?void 0:Y.trim(),$=(te=document.getElementById("et-plan"))==null?void 0:te.value,L=(we=(Ee=document.getElementById("et-admin-email"))==null?void 0:Ee.value)==null?void 0:we.trim(),k=(pe=(O=document.getElementById("et-admin-password"))==null?void 0:O.value)==null?void 0:pe.trim(),I=(lt=document.getElementById("et-logo-input"))==null?void 0:lt.files[0],E=document.getElementById("et-msg"),S=document.getElementById("et-save");if(!f){E.textContent="❌ Nome é obrigatório.",E.style.color="#ef4444";return}S.disabled=!0,S.textContent="Salvando…",E.textContent="⏳ Salvando…",E.style.color="#64748b";let T=e.logo_url;if(I)try{const q=await _e(I,256,.85),dt=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:Ct}=await b.storage.from("imoveis").upload(dt,q,{contentType:"image/jpeg",upsert:!0});if(!Ct){const{data:{publicUrl:Tt}}=b.storage.from("imoveis").getPublicUrl(dt);T=Tt}}catch(q){console.error("Logo upload:",q)}const{error:C}=await b.from("tenants").update({name:f,slug:w||e.slug,domain:B||null,plan_id:$||null,logo_url:T}).eq("id",e.id);if(C){S.disabled=!1,S.textContent="Salvar",E.textContent="❌ "+C.message,E.style.color="#ef4444";return}if(L&&k&&k.length>=6){E.textContent="⏳ Criando usuário admin…";const q=await ce({email:L,password:k,role:"admin",tenant_id:e.id});q!=null&&q.success?(q!=null&&q.user_id&&!(q!=null&&q.linked)&&await b.from("profiles").update({tenant_id:e.id}).eq("id",q.user_id),E.textContent="✅ Salvo e admin criado!",E.style.color="#22c55e"):(E.textContent="⚠️ Salvo, mas erro ao criar admin: "+((q==null?void 0:q.error)||"Tente novamente"),E.style.color="#f59e0b")}else E.textContent="✅ Imobiliária atualizada!",E.style.color="#22c55e";S.disabled=!1,S.textContent="Salvar",setTimeout(()=>{s(),ee()},1200)})}
