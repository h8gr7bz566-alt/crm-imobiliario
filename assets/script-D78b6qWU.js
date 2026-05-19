import{s as y}from"./supabase-BcuJ3xoD.js";const gt="00000000-0000-0000-0000-000000000000";let ge={},Ce={},oe=gt;function Te(e){oe=e||gt,ge={},Ce={}}const N=()=>oe;async function kt(){const[e,t]=await Promise.all([y.from("settings").select("key,value").eq("tenant_id",oe),y.from("site_content").select("*").eq("tenant_id",oe)]);e.data&&e.data.forEach(n=>{ge[n.key]=n.value}),t.data&&t.data.forEach(n=>{Ce[n.key]=n})}const W=(e,t=null)=>ge[e]!==void 0?ge[e]:t,Ae=(e,t="pt")=>{const n=Ce[e];return n?n[`value_${t}`]??n.value_pt??null:null};async function ae(e){const t=new Date().toISOString(),n=e.map(([o,i])=>({key:o,value:i,tenant_id:oe,updated_at:t})),{error:a}=await y.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,i])=>{ge[o]=i}),!a}async function qe(e,{pt:t,en:n,es:a}){const o={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:oe,updated_at:new Date().toISOString()},{error:i}=await y.from("site_content").upsert(o,{onConflict:"key,tenant_id"});return i||(Ce[e]=o),!i}async function Me(e,t,n){const{error:a}=await y.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function De(){const e=document.documentElement,t=W("visual.accent_color","#b8962e"),n=W("visual.primary_bg","#0f1c2e"),a=W("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=W("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(l=>{l.src=o});const i=W("company.favicon_url","/favicon.ico"),s=document.querySelector('link[rel="shortcut icon"]');s&&(s.href=i);const d=W("visual.hero_bg_url","");if(d){const l=document.querySelector(".hero");l&&(l.style.backgroundImage=`url('${d}')`)}}function $t(e="pt"){const t=b=>Ae(b,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const i=document.querySelector('[data-i18n="inst.p1"]'),s=document.querySelector('[data-i18n="inst.p2"]'),d=document.querySelector('[data-i18n="inst.p3"]');i&&t("inst.bio_p1")&&(i.innerHTML=t("inst.bio_p1")),s&&t("inst.bio_p2")&&(s.innerHTML=t("inst.bio_p2")),d&&t("inst.bio_p3")&&(d.innerHTML=t("inst.bio_p3"));const l=document.querySelector('[data-i18n-num="inst.stat2num"]'),r=document.querySelector('[data-i18n="inst.stat1"]'),c=document.querySelector('[data-i18n="inst.stat2"]'),m=document.querySelector('[data-i18n="inst.stat3"]');l&&t("inst.stat2_num")&&(l.innerHTML=t("inst.stat2_num")),r&&t("inst.stat1_label")&&(r.innerHTML=t("inst.stat1_label")),c&&t("inst.stat2_label")&&(c.innerHTML=t("inst.stat2_label")),m&&t("inst.stat3_label")&&(m.innerHTML=t("inst.stat3_label"));const f=Ae("seo.title_pt",e);f&&document.title&&(document.title=f);const p=Ae("seo.description_pt",e);if(p){const b=document.querySelector('meta[name="description"]');b&&(b.content=p)}}function Lt(e){if(!e)return;const t=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const St="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let ee="5547999701743",ve=`https://wa.me/${ee}`;const Y=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],_t=5.7;function fe(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/_t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let C=[],g=null,ye=[],vt=!1;y.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(vt=!0)});async function Ct(){const e=window.location.hostname;let t=null;if(e&&e!=="localhost"&&e!=="127.0.0.1"){const{data:i}=await y.from("tenants").select("id").eq("domain",e).maybeSingle();i!=null&&i.id&&(t=i.id)}let n=y.from("properties").select("*").eq("published",!0);t&&(n=n.eq("tenant_id",t));const{data:a,error:o}=await n.order("created_at",{ascending:!1});return o?(console.error("Supabase select error:",o),[]):a||[]}async function Tt(){let e=y.from("properties").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="super_admin"||(g!=null&&g.tenant_id?e=e.eq("tenant_id",g.tenant_id):e=e.or("tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000"));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):(C=t||[],sa(),la(),C)}async function At(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await y.from("properties").update(a).eq("id",t);if(o)throw o;const i=C.findIndex(s=>s.id===t);i>=0&&(C[i]={...C[i],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await y.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&C.unshift(t[0])}}async function qt(e){const{error:t}=await y.from("properties").delete().eq("id",e);if(t)throw t;C=C.filter(n=>n.id!==e)}async function Mt(e,t){const{error:n}=await y.auth.signInWithPassword({email:e,password:t});return!n}function xe(e,t=1200,n=.78){return new Promise((a,o)=>{const i=new Image,s=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(s);const d=document.createElement("canvas");let l=i.width,r=i.height;l>t&&(r=Math.round(r*t/l),l=t),d.width=l,d.height=r;const c=d.getContext("2d");c.drawImage(i,0,0,l,r);const m=new Image;m.crossOrigin="anonymous",m.onload=()=>{const f=Math.round(l*.18),p=Math.round(m.naturalHeight*f/m.naturalWidth),b=Math.round(l*.02),h=l-f-b,x=r-p-b;c.globalAlpha=.45,c.drawImage(m,h,x,f,p),c.globalAlpha=1,d.toBlob(v=>v?a(v):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.onerror=()=>{d.toBlob(f=>f?a(f):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.src="/logo.png"},i.onerror=o,i.src=s})}async function zt(e){const t=await xe(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await y.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=y.storage.from("imoveis").getPublicUrl(n);return o}async function Nt(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await zt(n[o]));return a}async function be(){var m,f,p,b,h,x;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await Ct();C=n,((m=document.getElementById("selecao-carousel"))==null?void 0:m.innerHTML)===""&&jt(n);const a=((f=document.getElementById("city-filter"))==null?void 0:f.value)||"",o=((p=document.getElementById("neighborhood-filter"))==null?void 0:p.value)||"",i=((b=document.getElementById("bedrooms-filter"))==null?void 0:b.value)||"",s=((h=document.getElementById("parking-filter"))==null?void 0:h.value)||"",d=((x=document.getElementById("construction-filter"))==null?void 0:x.value)||"",l=document.getElementById("price-slider"),r=l?parseInt(l.value,10):13e7,c=n.filter(v=>{if(a&&v.city!==a||o&&v.neighborhood!==o||i&&(i==="4+"&&Number(v.bedrooms)<4||i!=="4+"&&Number(v.bedrooms)!==Number(i))||s&&(s==="4+"&&Number(v.parking)<4||s!=="4+"&&Number(v.parking)!==Number(s))||d&&v.construction_status!==d)return!1;const E=String(v.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),w=parseInt(E,10)||0;return!(w<0||w>r)});if(e){if(!c.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=c.map(v=>{var I;const E=v.cover_image||((I=v.images)==null?void 0:I[0])||Y[0],w=[v.neighborhood,v.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${E}" alt="${u(v.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${u(v.title)}</div>
            <div class="selecao-card-loc">${u(w)}</div>
            <div class="selecao-card-price">${u(fe(v.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${v.id}" class="btn-det">Ver Detalhes</a>
              <a href="${ve}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!c.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=c.map(v=>{var I;const E=(I=v.images)!=null&&I.length?v.images:Y,w=E.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${w}" data-idx="0" data-pid="${v.id}">
          <img src="${v.cover_image||E[0]}" alt="${u(v.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${w>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${u(v.title)}</strong>
          <div class="muted">${u(v.neighborhood||"")}, ${u(v.city||"")}</div>
          <div><strong>${u(fe(v.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${v.bedrooms||"--"} | 🚗 ${v.parking||"--"} ${w>1?"| 📸 "+w:""}</div>
          <p class="muted">${u((v.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${v.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${ve}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(v=>{v.removeEventListener("click",tt),v.addEventListener("click",tt)})}function jt(e){var o,i,s;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(d=>{var c;const l=d.cover_image||((c=d.images)==null?void 0:c[0])||Y[0],r=[d.neighborhood,d.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${l}" alt="${u(d.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${u(d.title)}</div>
          <div class="selecao-card-loc">${u(r)}</div>
          <div class="selecao-card-price">${u(fe(d.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${d.id}" class="btn-det">Ver Detalhes</a>
            <a href="${ve}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(i=a==null?void 0:a.querySelector(".selecao-prev"))==null||i.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(s=a==null?void 0:a.querySelector(".selecao-next"))==null||s.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),be()};function tt(e){var d;e.stopPropagation();const t=e.currentTarget.closest(".carousel-wrap");if(!t)return;const n=parseInt(t.dataset.total,10);if(!n)return;let a=parseInt(t.dataset.idx,10)||0;const o=e.currentTarget.classList.contains("carousel-next")?1:-1;a=(a+o+n)%n,t.dataset.idx=a;const i=parseInt(t.dataset.pid,10),s=C.find(l=>l.id===i);(d=s==null?void 0:s.images)!=null&&d.length&&(t.querySelector(".carousel-img").src=s.images[a])}function Ht(){const e=document.getElementById("price-slider"),t=document.getElementById("price-label");!e||!t||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",t.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);t.textContent="Até R$ "+n.toLocaleString("pt-BR"),be()}))}function Rt(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=Q();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${u(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=Q().find(i=>i.name===e.value),o=a?Fe(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(i=>`<option value="${i.name}">${u(i.name)}</option>`).join(""),be()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",be)})}function he(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var s;const a=n.cover_image||((s=n.images)==null?void 0:s[0])||Y[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",i=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${u(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${u(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+u(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${u(o)}</td>
      <td class="cell-price">${u(fe(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${i}</td>
      <td>
        <div class="action-btns">
          ${(g==null?void 0:g.role)==="admin"||(g==null?void 0:g.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(g==null?void 0:g.role)==="admin"||(g==null?void 0:g.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function Ut(){const e=document.getElementById("f-city");if(!e)return;const t=Q(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${u(a.name)}</option>`).join(""),n&&(e.value=n)}function Dt(){var e,t,n,a,o,i,s,d,l,r,c,m,f,p,b;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((i=document.getElementById("f-condominium"))==null?void 0:i.value)||"").trim().toLowerCase(),priceMin:parseFloat((s=document.getElementById("f-price-min"))==null?void 0:s.value)||0,priceMax:parseFloat((d=document.getElementById("f-price-max"))==null?void 0:d.value)||1/0,areaMin:parseFloat((l=document.getElementById("f-area-min"))==null?void 0:l.value)||0,areaMax:parseFloat((r=document.getElementById("f-area-max"))==null?void 0:r.value)||1/0,construction:((c=document.getElementById("f-construction"))==null?void 0:c.value)||"",published:((m=document.getElementById("f-published"))==null?void 0:m.value)||"",bedrooms:((f=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:f.dataset.val)||"",suites:((p=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:p.dataset.val)||"",parking:((b=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:b.dataset.val)||""}}function Oe(e){const t=Dt();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const i=parseFloat(a.area)||0;return!(t.areaMin>0&&i<t.areaMin||t.areaMax<1/0&&i>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Ie(){if(!document.getElementById("admin-properties"))return;const e=await Tt(),t=e.length,n=e.filter(s=>s.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),i=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),i&&(i.textContent="—"),Ut(),he(C)}let z=null,J="";function Ne(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function we(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function Be(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===J?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{J=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function ze(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{var l;n.preventDefault();const a=new FormData(e),o=a.getAll("images");let i=[];const s=o.filter(r=>r.size>0);if(s.length){t.disabled=!0,t.textContent=`Enviando 0/${s.length} foto…`;try{i=await Nt(s,(r,c)=>{t.textContent=`Enviando ${r}/${c} foto…`})}catch(r){console.error("Erro no upload:",r),t.disabled=!1,t.textContent=z?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(z){const r=C.find(c=>c.id===z);r!=null&&r.images&&(i=r.images)}i.length||(i=[...Y]);const d={...z?{id:z}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:i,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:J||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",tenant_id:z?((l=C.find(r=>r.id===z))==null?void 0:l.tenant_id)??(g==null?void 0:g.tenant_id)??null:(g==null?void 0:g.tenant_id)??null};try{await At(d),z=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const r=document.getElementById("adminPublished");r&&(r.value="true");const c=document.getElementById("adminNeighborhood");c&&(c.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),J="",Be([]),we(),await Ie()}catch(r){console.error(r),t.disabled=!1,t.textContent=z?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((r==null?void 0:r.message)||JSON.stringify(r)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await qt(o),await Ie()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((g==null?void 0:g.role)!=="admin"&&(g==null?void 0:g.role)!=="super_admin")return;const o=Number(n.target.dataset.id);if(!o)return;const i=C.find(l=>l.id===o);if(!i)return;z=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=i.title||"",e.querySelector('[name="rua"]').value=i.rua||"",e.querySelector('[name="numero"]').value=i.numero||"",e.querySelector('[name="city"]').value=i.city||"",e.querySelector('[name="price"]').value=i.price||"",e.querySelector('[name="bedrooms"]').value=i.bedrooms||"",e.querySelector('[name="suites"]').value=i.suites||"",e.querySelector('[name="area"]').value=i.area||"",e.querySelector('[name="parking"]').value=i.parking||"",e.querySelector('[name="description"]').value=i.description||"",e.querySelector('[name="construction_status"]').value=i.construction_status||"",e.querySelector('[name="owner_name"]').value=i.owner_name||"",e.querySelector('[name="owner_phone"]').value=i.owner_phone||"",e.querySelector('[name="owner_email"]').value=i.owner_email||"",e.querySelector('[name="owner_notes"]').value=i.owner_notes||"",e.querySelector('[name="condominium"]').value=i.condominium||"";const s=document.getElementById("adminPublished");s&&(s.value=i.published===!0?"true":"false");const d=document.getElementById("adminCitySelect");d&&(d.value=i.city||"",d.dispatchEvent(new Event("change")),setTimeout(()=>{const l=document.getElementById("adminNeighborhood");l&&(l.value=i.neighborhood||"")},50)),J=i.cover_image||((a=i.images)==null?void 0:a[0])||"",Be(i.images||[]),Ne("Editar Imóvel")}})}function u(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let F=[],H=0;function Ot(e){var c,m;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const t=document.getElementById("view-status-badge");e.published?(t.textContent="● Publicado",t.className="badge badge-green"):(t.textContent="○ Rascunho",t.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const a=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=a,document.getElementById("view-directions-link").href=a;const o=((c=e.images)==null?void 0:c[0])||Y[0];document.getElementById("view-thumb-preview").src=o,F=(m=e.images)!=null&&m.length?e.images:Y,H=0,ke(),document.getElementById("view-price").textContent=fe(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const i=document.getElementById("view-condominium-item"),s=document.getElementById("view-condominium");s&&(s.textContent=e.condominium||""),i&&(i.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(f=>f.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(f=>f.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const d="https://omarcorretor.com.br/property.html?id="+e.id,l=document.getElementById("share-link-input");l&&(l.value=d);const r=document.getElementById("share-panel");r&&(r.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Ee(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function ke(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=F[H],e.alt=`Foto ${H+1}`;const i=F.length>1;n.style.display=i?"flex":"none",a.style.display=i?"flex":"none",t.textContent=i?`${H+1} / ${F.length}`:"",o.innerHTML=i?F.map((s,d)=>`<img src="${s}" class="view-thumb${d===H?" active":""}" data-i="${d}" alt="Foto ${d+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(s=>{s.addEventListener("click",()=>{H=+s.dataset.i,ke()})})}async function at(e){const{data:t}=await y.from("profiles").select("*").eq("id",e).maybeSingle();return t}function $e(e){var m,f;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const i=(e==null?void 0:e.name)||"Sem nome",s=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=i,o&&(o.textContent=s),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((m=i[0])==null?void 0:m.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const d=document.getElementById("avatar-dd-name"),l=document.getElementById("avatar-dd-role"),r=document.getElementById("avatar-dd-img"),c=document.getElementById("avatar-dd-initial");d&&(d.textContent=i),l&&(l.textContent=s),e!=null&&e.avatar_url&&r?(r.src=e.avatar_url,r.style.display="",c&&(c.style.display="none")):(c&&(c.textContent=((f=i[0])==null?void 0:f.toUpperCase())||"?",c.style.display=""),r&&(r.style.display="none"))}function K(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),U(),e==="contatos"&&ta(),e==="funil"&&Gt(),e==="tarefas"&&Wt()}function nt(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:ra,visual:ca,"site-config":ma,"crm-config":pa,integracoes:ua,midia:ga}).forEach(([a,o])=>{const i=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);i&&i.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>va(),{once:!0}),window.lucide&&lucide.createIcons()}}function U(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function Pt(){var a,o,i;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",s=>{s.target===t&&n()}),(i=document.getElementById("cp-save"))==null||i.addEventListener("click",async()=>{var m,f;const s=((m=document.getElementById("cp-new"))==null?void 0:m.value)||"",d=((f=document.getElementById("cp-confirm"))==null?void 0:f.value)||"",l=document.getElementById("cp-msg"),r=document.getElementById("cp-save");if(l.style.display="none",s.length<6){l.style.color="#ef4444",l.textContent="Mínimo 6 caracteres.",l.style.display="";return}if(s!==d){l.style.color="#ef4444",l.textContent="As senhas não coincidem.",l.style.display="";return}r.disabled=!0,r.textContent="Salvando…";const{error:c}=await y.auth.updateUser({password:s});if(r.disabled=!1,r.textContent="Salvar Senha",c){l.style.color="#ef4444",l.textContent="Erro: "+c.message,l.style.display="";return}l.style.color="#16a34a",l.textContent="✅ Senha alterada com sucesso!",l.style.display="",setTimeout(n,1500)})}function Ft(){var i,s,d,l,r;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((i=document.getElementById("topnav-avatar-img"))==null?void 0:i.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
    <div class="modal" style="max-width:380px;">
      <div class="modal-header">
        <h3>Alterar Foto</h3>
        <button class="modal-close" id="cph-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;border:3px solid #e2e8f0;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
          <img id="cph-preview" src="${a?n:""}" alt="" style="width:100%;height:100%;object-fit:cover;display:${a?"":"none"};">
          <span id="cph-initial" style="font-size:32px;font-weight:700;color:#64748b;display:${a?"none":""};">${((g==null?void 0:g.name)||"?")[0].toUpperCase()}</span>
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(s=document.getElementById("cph-close"))==null||s.addEventListener("click",o),(d=document.getElementById("cph-cancel"))==null||d.addEventListener("click",o),t.addEventListener("click",c=>{c.target===t&&o()}),(l=document.getElementById("cph-file"))==null||l.addEventListener("change",c=>{const m=c.target.files[0];if(!m)return;const f=URL.createObjectURL(m),p=document.getElementById("cph-preview"),b=document.getElementById("cph-initial");p&&(p.src=f,p.style.display=""),b&&(b.style.display="none"),document.getElementById("cph-save").disabled=!1}),(r=document.getElementById("cph-save"))==null||r.addEventListener("click",async()=>{var p;const c=(p=document.getElementById("cph-file"))==null?void 0:p.files[0];if(!c)return;const m=document.getElementById("cph-save"),f=document.getElementById("cph-msg");m.disabled=!0,m.textContent="Salvando…";try{const b=await xe(c,400,.85),h=`avatars/${g.id}-${Date.now()}.jpg`,{error:x}=await y.storage.from("imoveis").upload(h,b,{contentType:"image/jpeg",upsert:!0});if(x)throw x;const{data:{publicUrl:v}}=y.storage.from("imoveis").getPublicUrl(h);await y.from("profiles").update({avatar_url:v}).eq("id",g.id),g={...g,avatar_url:v},$e(g),o()}catch(b){f.style.color="#ef4444",f.textContent="Erro: "+b.message,f.style.display="",m.disabled=!1,m.textContent="Salvar Foto"}})}function Xt(){var a,o,i;const e=document.getElementById("add-corretor-modal-root");e&&e.remove();const t=document.createElement("div");t.id="add-corretor-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("ac-close"))==null||a.addEventListener("click",n),(o=document.getElementById("ac-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",s=>{s.target===t&&n()}),(i=document.getElementById("ac-save"))==null||i.addEventListener("click",async()=>{var c,m;const s=(c=document.getElementById("ac-email"))==null?void 0:c.value.trim(),d=(m=document.getElementById("ac-password"))==null?void 0:m.value.trim(),l=document.getElementById("ac-save"),r=document.getElementById("ac-note");if(!s){alert("Informe o e-mail do corretor.");return}if(!d||d.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}l.disabled=!0,l.textContent="Criando…",r.style.display="none";try{const f=await le({email:s,password:d,tenant_id:(g==null?void 0:g.tenant_id)||null});l.disabled=!1,l.textContent="+ Criar Acesso",f.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",f.email_sent===!1?(r.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${u(s)}<br><strong>Senha:</strong> ${u(d)}`,r.style.color="#0f172a"):(r.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",r.style.color="#16a34a"),r.style.display=""):alert("Erro: "+(f.error||"Falha desconhecida"))}catch(f){l.disabled=!1,l.textContent="+ Criar Acesso",alert("Erro: "+f.message)}})}function ot(){var i,s,d,l,r,c,m,f,p,b,h;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",x=>{var E;x.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(E=document.getElementById("notif-dropdown"))==null||E.classList.add("hidden")}),(i=document.getElementById("avatar-dd-change-photo"))==null||i.addEventListener("click",x=>{x.stopPropagation(),U(),Ft()}),(s=document.getElementById("avatar-dd-change-pass"))==null||s.addEventListener("click",x=>{x.stopPropagation(),U(),Pt()}),(d=document.getElementById("avatar-dd-add-corretor"))==null||d.addEventListener("click",x=>{x.stopPropagation(),U(),Xt()}),(l=document.getElementById("avatar-dd-settings"))==null||l.addEventListener("click",x=>{x.stopPropagation(),U(),K("settings")}),(r=document.getElementById("avatar-dd-logout"))==null||r.addEventListener("click",async x=>{x.stopPropagation(),await y.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",x=>{var E;x.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((E=document.getElementById("avatar-dropdown"))==null||E.classList.add("hidden"),Kt())}),(c=document.getElementById("notif-mark-all"))==null||c.addEventListener("click",()=>{Qt(),U()}),(m=document.getElementById("btn-search-open"))==null||m.addEventListener("click",()=>{var x,v;(x=document.getElementById("search-overlay"))==null||x.classList.remove("hidden"),(v=document.getElementById("search-input"))==null||v.focus()}),(f=document.getElementById("search-overlay-close"))==null||f.addEventListener("click",()=>{var x;(x=document.getElementById("search-overlay"))==null||x.classList.add("hidden")}),(p=document.getElementById("search-overlay"))==null||p.addEventListener("click",x=>{x.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(b=document.getElementById("search-input"))==null||b.addEventListener("input",x=>{clearTimeout(o),o=setTimeout(()=>Yt(x.target.value.trim()),280)}),(h=document.getElementById("search-input"))==null||h.addEventListener("keydown",x=>{var v;x.key==="Escape"&&((v=document.getElementById("search-overlay"))==null||v.classList.add("hidden"))}),document.addEventListener("click",U)}let je=!1,Z=[],Pe=[],Le=[],G=null,me=null;async function Gt(){var t;if(je){await it();return}je=!0,await it(),(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>He());const e=document.getElementById("funil-pipe-sel");e==null||e.addEventListener("change",async()=>{G=parseInt(e.value,10),await Se()})}async function it(){const e=N(),[{data:t},{data:n}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",e).order("sort_order"),y.from("crm_stages").select("*").eq("tenant_id",e).order("sort_order")]);Z=t||[],Pe=n||[];const a=document.getElementById("funil-pipe-sel");if(a){const o=G;a.innerHTML=Z.length?Z.map(s=>`<option value="${s.id}">${u(s.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const i=Z.find(s=>s.id===o)||Z.find(s=>s.is_default)||Z[0];i?(a.value=i.id,G=i.id):G=null}await Se()}async function Se(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=y.from("leads").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id)),G&&(t=t.eq("pipeline_id",G));const{data:n}=await t;Le=n||[],ft()}function ft(){const e=document.getElementById("kanban-board");if(!e)return;const t=Pe.filter(a=>a.pipeline_id===G);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n={};t.forEach(a=>{n[a.name]=[]}),Le.forEach(a=>{var i,s,d,l;const o=a.stage||((i=t[0])==null?void 0:i.name);n[o]||(n[((s=t[0])==null?void 0:s.name)||""]=[]),(l=n[o]||n[(d=t[0])==null?void 0:d.name])==null||l.push(a)}),e.innerHTML=t.map(a=>{const o=n[a.name]||[],i=o.length?o.map(s=>`
        <div class="kanban-card" draggable="true" data-id="${s.id}" data-stage="${u(a.name)}" style="cursor:pointer;">
          <div class="kanban-card-name">${u(s.name||"—")}</div>
          ${s.phone?`<div class="kanban-card-info">📞 ${u(s.phone)}</div>`:""}
          ${s.email?`<div class="kanban-card-info" style="font-size:11px;color:#94a3b8;">✉ ${u(s.email)}</div>`:""}
          ${s.notes?`<div class="kanban-card-info" style="font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">📝 ${u(s.notes)}</div>`:""}
          <div class="kanban-card-tags" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">
            ${s.source?`<span class="kanban-card-tag">${u(s.source)}</span>`:""}
            ${Array.isArray(s.tags)?s.tags.map(d=>`<span class="kanban-card-tag" style="background:#f0f9ff;color:#0369a1;border:1px solid #bae6fd;">${u(d)}</span>`).join(""):""}
          </div>
        </div>`).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${u(a.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${a.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${a.color||"#2563eb"}"></div>
            ${u(a.name)}
          </div>
          <span class="kanban-col-count">${o.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${u(a.name)}">${i}</div>
        <button class="kanban-add-btn" data-stage="${u(a.name)}">+ Adicionar lead</button>
      </div>`}).join(""),Vt(),window.lucide&&lucide.createIcons()}function Vt(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>He())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=Le.find(a=>String(a.id)===String(t.dataset.id));n&&He(n)}),t.addEventListener("dragstart",n=>{me=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!me||!a)return;await y.from("leads").update({stage:a}).eq("id",me);const o=Le.find(i=>String(i.id)===String(me));o&&(o.stage=a),me=null,ft()})}))}async function He(e=null){var r,c;(r=document.getElementById("lead-detail-panel"))==null||r.remove();const t=!e,n=N(),{data:a}=await y.from("crm_tags").select("*").eq("tenant_id",n).order("name"),{data:o}=await y.from("crm_lead_statuses").select("*").eq("tenant_id",n).order("sort_order"),i=Pe.filter(m=>m.pipeline_id===G).map(m=>`<option value="${u(m.name)}" ${(e==null?void 0:e.stage)===m.name?"selected":""}>${u(m.name)}</option>`).join(""),s=((e==null?void 0:e.phone)||"").replace(/\D/g,""),d=document.createElement("div");d.id="lead-detail-panel",d.style.cssText="position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:#fff;box-shadow:-4px 0 32px rgba(0,0,0,.15);z-index:1000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;",d.innerHTML=`
    <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0;">${t?"+ Novo Lead":"✏️ Editar Lead"}</h3>
      <button id="ldp-close" style="background:none;border:none;cursor:pointer;font-size:22px;color:#94a3b8;line-height:1;">✕</button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:20px 24px;display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">NOME *</label>
        <input id="ldp-name" class="form-input" type="text" value="${u((e==null?void 0:e.name)||"")}" placeholder="Nome do cliente">
      </div>
      <div style="display:flex;gap:10px;">
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">TELEFONE</label>
          <input id="ldp-phone" class="form-input" type="tel" value="${u((e==null?void 0:e.phone)||"")}" placeholder="(00) 00000-0000">
        </div>
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">E-MAIL</label>
          <input id="ldp-email" class="form-input" type="email" value="${u((e==null?void 0:e.email)||"")}" placeholder="email@...">
        </div>
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ORIGEM</label>
        <input id="ldp-source" class="form-input" type="text" value="${u((e==null?void 0:e.source)||"")}" placeholder="site, indicação, instagram…">
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
          ${o.map(m=>`<option value="${m.name}" ${(e==null?void 0:e.status)===m.name?"selected":""}>${u(m.name)}</option>`).join("")}
        </select>
      </div>`:""}
      ${a!=null&&a.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:6px;">TAGS</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${a.map(m=>`
            <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:4px 10px;border-radius:20px;background:${m.color}18;border:1px solid ${m.color}44;font-size:12px;font-weight:600;color:${m.color};">
              <input type="checkbox" value="${m.name}" style="margin:0;" ${((e==null?void 0:e.tags)||[]).includes(m.name)?"checked":""}>
              ${u(m.name)}
            </label>`).join("")}
        </div>
      </div>`:""}
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ANOTAÇÕES</label>
        <textarea id="ldp-notes" class="form-input" rows="4" placeholder="Observações, interesses, próximos passos…" style="resize:vertical;">${u((e==null?void 0:e.notes)||"")}</textarea>
      </div>
      ${s?`
      <a href="https://wa.me/${s}" target="_blank" rel="noopener"
        style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25d366;color:#fff;text-decoration:none;border-radius:8px;padding:10px;font-size:13px;font-weight:700;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
        Chamar no WhatsApp
      </a>`:""}
      <div id="ldp-msg" style="font-size:13px;min-height:18px;"></div>
    </div>
    <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;flex-shrink:0;">
      ${t?"":'<button id="ldp-delete" style="background:#fee2e2;color:#dc2626;border:none;border-radius:8px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;">🗑️ Excluir</button>'}
      <button id="ldp-save" style="flex:1;background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 16px;font-size:14px;font-weight:700;cursor:pointer;">💾 Salvar</button>
    </div>
  `,document.body.appendChild(d),requestAnimationFrame(()=>{d.style.transform="translateX(0)"});const l=()=>{d.style.transform="translateX(100%)",setTimeout(()=>d.remove(),250)};document.getElementById("ldp-close").addEventListener("click",l),document.getElementById("ldp-save").addEventListener("click",async()=>{var v,E;const m=document.getElementById("ldp-save"),f=document.getElementById("ldp-msg"),p=document.getElementById("ldp-name").value.trim();if(!p){f.style.color="#ef4444",f.textContent="Nome é obrigatório.";return}m.disabled=!0,m.textContent="Salvando…";const b=[...d.querySelectorAll("input[type=checkbox]:checked")].map(w=>w.value),h={name:p,phone:document.getElementById("ldp-phone").value.trim()||null,email:document.getElementById("ldp-email").value.trim()||null,source:document.getElementById("ldp-source").value.trim()||null,stage:((v=document.getElementById("ldp-stage"))==null?void 0:v.value)||null,status:((E=document.getElementById("ldp-status"))==null?void 0:E.value)||null,notes:document.getElementById("ldp-notes").value.trim()||null,tags:b,tenant_id:N()};let x;if(t?{error:x}=await y.from("leads").insert(h):{error:x}=await y.from("leads").update(h).eq("id",e.id),m.disabled=!1,m.textContent="💾 Salvar",x){f.style.color="#ef4444",f.textContent="Erro: "+x.message;return}f.style.color="#22c55e",f.textContent="✅ Salvo!",setTimeout(()=>{l(),Se()},700)}),(c=document.getElementById("ldp-delete"))==null||c.addEventListener("click",async()=>{confirm(`Excluir o lead "${e==null?void 0:e.name}"?`)&&(await y.from("leads").delete().eq("id",e.id),l(),Se())})}let M=[],st=!1,te="pending";async function Wt(){var e;st||(st=!0,await Jt(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>bt()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),te=t.dataset.filter,ie()})}))}async function Jt(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=y.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}M=n||[],ie()}function yt(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function ie(){const e=document.getElementById("tarefas-list");if(!e)return;let t=M;if(te==="pending"&&(t=M.filter(a=>a.status!=="done")),te==="done"&&(t=M.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${te==="done"?"✅":"📋"}</div>
      <p>${te==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=yt(a.due_date),i=o?o.toLocaleDateString("pt-BR"):"",s=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${u(a.title)}</div>
          <div class="tarefa-meta">
            ${i?`<span style="${s?"color:#ef4444;":""}">📅 ${i}${s?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${u(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const i=a.dataset.id,s=a.checked?"done":"pending";await y.from("tasks").update({status:s}).eq("id",i);const d=M.find(l=>String(l.id)===i);d&&(d.status=s),ie()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await y.from("tasks").delete().eq("id",a.dataset.id),M=M.filter(i=>String(i.id)!==String(a.dataset.id)),ie())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const i=a.dataset.id,s=M.find(d=>String(d.id)===i);s&&bt(s)})})}function bt(e=null){var l,r,c,m;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=yt(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const i=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",s=document.createElement("div");s.id="tarefa-modal-root",s.className="modal-backdrop",s.innerHTML=`
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
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${u((e==null?void 0:e.title)||"")}">
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
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${u((e==null?void 0:e.description)||"")}</textarea>
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
  `,document.body.appendChild(s);const d=()=>s.remove();(l=document.getElementById("tm-close"))==null||l.addEventListener("click",d),(r=document.getElementById("tm-cancel"))==null||r.addEventListener("click",d),s.addEventListener("click",f=>{f.target===s&&d()}),(c=document.getElementById("tm-toggle-done"))==null||c.addEventListener("click",async()=>{const f=a?"pending":"done";await y.from("tasks").update({status:f}).eq("id",e.id);const p=M.find(b=>String(b.id)===String(e.id));p&&(p.status=f),d(),f==="done"&&(te="done",document.querySelectorAll(".tarefa-filter-btn").forEach(b=>{b.classList.toggle("active",b.dataset.filter==="done")})),ie()}),(m=document.getElementById("tm-save"))==null||m.addEventListener("click",async()=>{var v,E;const f=document.getElementById("tarefa-form");if(!f.checkValidity()){f.reportValidity();return}const p=new FormData(f),b=document.getElementById("tm-save");b.disabled=!0,b.textContent="Salvando…";const h={title:(v=p.get("title"))==null?void 0:v.trim(),description:((E=p.get("description"))==null?void 0:E.trim())||null,due_date:p.get("due_date")||null,priority:p.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null};let x;if(n){if({error:x}=await y.from("tasks").update(h).eq("id",e.id),!x){const w=M.findIndex(I=>String(I.id)===String(e.id));w>=0&&(M[w]={...M[w],...h})}}else{const{data:w,error:I}=await y.from("tasks").insert(h).select();x=I,!x&&(w!=null&&w[0])&&M.unshift(w[0])}if(b.disabled=!1,b.textContent=n?"Salvar":"Criar Tarefa",x){alert("Erro: "+x.message);return}d(),ie()})}async function Yt(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;g==null||g.role,g==null||g.tenant_id;const[{data:a},{data:o}]=await Promise.all([y.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),y.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),i=[];a!=null&&a.length&&(i.push('<div class="search-group-label">Imóveis</div>'),i.push(...a.map(s=>`
      <div class="search-result-item" data-type="property" data-id="${s.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${u(s.title||"—")}</div>
          <div class="search-result-sub">${u(s.reference||"")} · ${u(s.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(i.push('<div class="search-group-label">Leads / Contatos</div>'),i.push(...o.map(s=>`
      <div class="search-result-item" data-type="lead" data-id="${s.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${u(s.name||"—")}</div>
          <div class="search-result-sub">${u(s.email||s.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=i.length?i.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(s=>{s.addEventListener("click",()=>{var d;(d=document.getElementById("search-overlay"))==null||d.classList.add("hidden"),s.dataset.type==="lead"?K("contatos"):K("properties")})})}let D=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function Kt(){var s;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=y.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(d=>!D.includes(String(d.id))),i=document.getElementById("notif-badge");if(i&&(i.textContent=o.length,o.length>0?i.classList.remove("hidden"):i.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(d=>{const l=Zt(d.created_at);return`
      <div class="notif-item${!D.includes(String(d.id))?" unread":""}" data-id="${d.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${u(d.name||"—")}</div>
          <div class="notif-item-sub">${u(d.phone||d.source||"")} · ${l}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(s=document.getElementById("notif-see-all"))==null||s.addEventListener("click",d=>{d.preventDefault(),U(),K("contatos")}),e.querySelectorAll(".notif-item").forEach(d=>{d.addEventListener("click",()=>{D.push(d.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(D)),d.classList.remove("unread"),U(),K("contatos")})})}function Qt(){var e;document.querySelectorAll(".notif-item").forEach(t=>D.push(t.dataset.id)),D=[...new Set(D)],localStorage.setItem("crm_notifs_read",JSON.stringify(D)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function Zt(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function ea(){let e=y.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);g!=null&&g.tenant_id&&(e=e.eq("tenant_id",g.tenant_id));const{data:t}=await e,a=(t||[]).filter(i=>!D.includes(String(i.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let X=[],q=1;const pe=10;let lt=!1;async function ta(){var t,n,a,o,i,s,d,l,r;document.getElementById("section-contatos")&&(lt||(lt=!0,await ht(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{q=1,se()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",c=>{c.key==="Enter"&&(q=1,se())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>xt()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",oa),(i=document.getElementById("import-modal-close"))==null||i.addEventListener("click",Re),(s=document.getElementById("import-modal-cancel"))==null||s.addEventListener("click",Re),(d=document.getElementById("download-template"))==null||d.addEventListener("click",c=>{c.preventDefault();const m=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,f=new Blob([m],{type:"text/csv"}),p=document.createElement("a");p.href=URL.createObjectURL(f),p.download="modelo_contatos.csv",p.click()}),(l=document.getElementById("import-csv-file"))==null||l.addEventListener("change",aa),(r=document.getElementById("import-modal-confirm"))==null||r.addEventListener("click",na)))}async function ht(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=y.from("leads").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:a}=await t;X=a||[],se()}function se(){var d,l,r;const e=(((d=document.getElementById("contato-search"))==null?void 0:d.value)||"").toLowerCase(),t=e?X.filter(c=>(c.name||"").toLowerCase().includes(e)||(c.email||"").toLowerCase().includes(e)||(c.phone||"").toLowerCase().includes(e)):X,n=t.length,a=Math.max(1,Math.ceil(n/pe));q>a&&(q=a);const o=t.slice((q-1)*pe,q*pe),i=document.getElementById("contatos-tbody");if(!i)return;o.length?i.innerHTML=o.map(c=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${c.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${c.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${u(c.name||"—")}</a>
        </td>
        <td>${u(c.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${c.email?u(c.email):"—"}</td>
        <td style="font-size:13px;">${c.phone?u(c.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${u(c.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${c.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):i.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const s=document.getElementById("contatos-pagination");if(s){const c=n===0?0:(q-1)*pe+1,m=Math.min(q*pe,n);s.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${c}–${m}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${q<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${q} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${q>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(l=s.querySelector("#pag-prev"))==null||l.addEventListener("click",()=>{q--,se()}),(r=s.querySelector("#pag-next"))==null||r.addEventListener("click",()=>{q++,se()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(c=>{c.addEventListener("click",m=>{m.preventDefault();const f=c.dataset.id,p=X.find(b=>String(b.id)===String(f));p&&xt(p)})})}function xt(e=null){var i,s,d;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=document.createElement("div");a.id="contato-modal-root",a.className="modal-backdrop",a.innerHTML=`
    <div class="modal" style="max-width:560px;">
      <div class="modal-header">
        <h3>${n?"Editar Contato":"Novo Contato"}</h3>
        <button class="modal-close" id="cm-close">✕</button>
      </div>
      <div class="modal-body">
        <form id="contato-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nome *</label>
              <input name="name" required class="form-control" placeholder="Nome completo" value="${u((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${u((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${u((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${u((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${u((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${u((e==null?void 0:e.city_interest)||"")}">
            </div>
          </div>
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${u((e==null?void 0:e.notes)||"")}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cm-cancel">Cancelar</button>
        <button class="btn-primary" id="cm-save" style="margin:0;">${n?"Salvar":"Criar Contato"}</button>
      </div>
    </div>
  `,document.body.appendChild(a);const o=()=>a.remove();(i=document.getElementById("cm-close"))==null||i.addEventListener("click",o),(s=document.getElementById("cm-cancel"))==null||s.addEventListener("click",o),a.addEventListener("click",l=>{l.target===a&&o()}),(d=document.getElementById("cm-save"))==null||d.addEventListener("click",async()=>{var p,b,h,x,v,E,w;const l=document.getElementById("contato-form");if(!l.checkValidity()){l.reportValidity();return}const r=new FormData(l),c=document.getElementById("cm-save");c.disabled=!0,c.textContent="Salvando…";const m={name:(p=r.get("name"))==null?void 0:p.trim(),company:((b=r.get("company"))==null?void 0:b.trim())||null,email:((h=r.get("email"))==null?void 0:h.trim())||null,phone:((x=r.get("phone"))==null?void 0:x.trim())||null,job_title:((v=r.get("job_title"))==null?void 0:v.trim())||null,city_interest:((E=r.get("city_interest"))==null?void 0:E.trim())||null,notes:((w=r.get("notes"))==null?void 0:w.trim())||null,stage:(e==null?void 0:e.stage)||"novo",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null,source:"manual"};let f;if(n){if({error:f}=await y.from("leads").update(m).eq("id",e.id),!f){const I=X.findIndex(S=>String(S.id)===String(e.id));I>=0&&(X[I]={...X[I],...m})}}else{const{data:I,error:S}=await y.from("leads").insert(m).select();f=S,!f&&(I!=null&&I[0])&&X.unshift(I[0])}if(c.disabled=!1,c.textContent=n?"Salvar":"Criar Contato",f){alert("Erro: "+f.message);return}o(),se()})}let ne=[];function aa(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{ne=a.target.result.split(`
`).filter(d=>d.trim()).slice(1).map(d=>{const[l,r,c,m,f]=d.split(",").map(p=>p.trim().replace(/^"|"$/g,""));return{name:l,email:r,phone:c,company:m,job_title:f}}).filter(d=>d.name);const i=document.getElementById("import-preview");i&&(i.textContent=`${ne.length} contato(s) encontrados para importar.`);const s=document.getElementById("import-modal-confirm");s&&(s.disabled=ne.length===0)},n.readAsText(t)}async function na(){if(!ne.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=ne.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null})),{error:n}=await y.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Re(),await ht(),alert(`${t.length} contato(s) importados com sucesso!`)}function oa(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),ne=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Re(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const ia="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function le(e){return(await fetch(ia,{method:"POST",headers:{Authorization:`Bearer ${St}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function dt(e){var l,r,c,m;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),i=document.getElementById("settings-avatar-input"),s=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:f}}=await y.auth.getUser();n.value=(f==null?void 0:f.email)||""}const d=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=d),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),i==null||i.addEventListener("change",f=>{const p=f.target.files[0];if(!p)return;const b=URL.createObjectURL(p);a&&(a.src=b,a.style.display=""),o&&(o.style.display="none")}),(l=document.getElementById("btn-change-password"))==null||l.addEventListener("click",async()=>{var v,E;const f=((v=document.getElementById("change-password-new"))==null?void 0:v.value)||"",p=((E=document.getElementById("change-password-confirm"))==null?void 0:E.value)||"",b=document.getElementById("change-password-msg"),h=document.getElementById("btn-change-password");if(b&&(b.style.display="none"),f.length<6){b&&(b.textContent="Mínimo 6 caracteres.",b.style.display="");return}if(f!==p){b&&(b.textContent="As senhas não coincidem.",b.style.display="");return}h&&(h.disabled=!0,h.textContent="Salvando…");const{error:x}=await y.auth.updateUser({password:f});h&&(h.disabled=!1,h.textContent="Salvar Nova Senha"),x?b&&(b.textContent="Erro: "+x.message,b.style.display=""):(b&&(b.style.color="#16a34a",b.textContent="Senha alterada com sucesso!",b.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),s==null||s.addEventListener("click",async()=>{var E;const f=t.value.trim();let p=(g==null?void 0:g.avatar_url)||"";const b=i==null?void 0:i.files[0],h=s.textContent;if(s.disabled=!0,s.textContent="Salvando…",b)try{const w=await xe(b,400,.85),I=`avatars/${g.id}-${Date.now()}.jpg`,{error:S}=await y.storage.from("imoveis").upload(I,w,{contentType:"image/jpeg",upsert:!0});if(!S){const{data:{publicUrl:B}}=y.storage.from("imoveis").getPublicUrl(I);p=B}}catch(w){console.error("Avatar upload:",w)}const{error:x}=await y.from("profiles").update({name:f,avatar_url:p}).eq("id",g.id);if(s.disabled=!1,s.textContent=h,x){alert("Erro ao salvar perfil.");return}g={...g,name:f,avatar_url:p},$e(g);const v=document.getElementById("settings-avatar-initial");v&&(v.textContent=((E=f[0])==null?void 0:E.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const f=document.getElementById("settings-corretores-section");f&&(f.style.display=""),await _e(),(r=document.getElementById("btn-invite-corretor"))==null||r.addEventListener("click",async()=>{var E,w;const b=(E=document.getElementById("invite-email"))==null?void 0:E.value.trim(),h=(w=document.getElementById("invite-password"))==null?void 0:w.value.trim(),x=document.getElementById("btn-invite-corretor"),v=document.getElementById("invite-note");if(!b){alert("Informe o e-mail do corretor.");return}if(!h||h.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}x&&(x.disabled=!0,x.textContent="Criando…"),v&&(v.style.display="none");try{const I=await le({email:b,password:h,tenant_id:(g==null?void 0:g.tenant_id)||null});if(I.success){const S=document.getElementById("invite-email"),B=document.getElementById("invite-password");S&&(S.value=""),B&&(B.value=""),await _e(),v&&(I.email_sent===!1?(v.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${u(b)}<br>
                <strong>Senha:</strong> ${u(h)}`,v.style.color="#0f172a"):(v.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",v.style.color="#16a34a"),v.style.display="")}else alert("Erro: "+(I.error||"Falha desconhecida"))}catch(I){alert("Erro ao criar acesso: "+I.message)}finally{x&&(x.disabled=!1,x.textContent="+ Criar Acesso")}});const p=document.getElementById("settings-locations-section");p&&(p.style.display=""),await ue(),(c=document.getElementById("loc-add-city-btn"))==null||c.addEventListener("click",async()=>{const b=document.getElementById("loc-new-city"),h=b==null?void 0:b.value.trim();if(!h)return;const{error:x}=await y.from("locations").insert({type:"cidade",name:h});if(x){alert("Erro ao adicionar cidade.");return}b&&(b.value=""),await ue(),Xe()}),(m=document.getElementById("loc-add-neighborhood-btn"))==null||m.addEventListener("click",async()=>{var E;const b=parseInt((E=document.getElementById("loc-new-neighborhood-city"))==null?void 0:E.value,10),h=document.getElementById("loc-new-neighborhood"),x=h==null?void 0:h.value.trim();if(!b||!x){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:v}=await y.from("locations").insert({type:"bairro",name:x,parent_id:b});if(v){alert("Erro ao adicionar bairro.");return}h&&(h.value=""),await ue()})}}async function _e(){const e=document.getElementById("corretores-list");if(!e)return;let t=y.from("profiles").select("*").order("created_at");g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const i=(o.name||"?")[0].toUpperCase(),s=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${u(i)}</div>`,d=o.id===(g==null?void 0:g.id),l=o.active!==!1,r=l?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',c=d?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,m=d?"":l?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,f=d?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${s}
        <div>
          <div class="corretor-name">${u(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${r}
        ${c}
        ${m}
        ${f}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await y.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.uid,s=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const d=await le({action:"toggle",userId:i,active:!s});d.success||alert("Erro: "+(d.error||"Falha desconhecida"))}catch(d){alert("Erro: "+d.message)}await _e()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var d,l;const i=o.dataset.uid,s=((l=(d=o.closest(".corretor-item"))==null?void 0:d.querySelector(".corretor-name"))==null?void 0:l.textContent)||"este corretor";if(confirm(`Excluir "${s}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const r=await le({action:"delete",userId:i});r.success||alert("Erro ao excluir: "+(r.error||"Falha desconhecida"))}catch(r){alert("Erro: "+r.message)}await _e()}})})}async function Et(){const{data:e,error:t}=await y.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(ye=e||[],ye)}function Q(){return ye.filter(e=>e.type==="cidade")}function Fe(e){return ye.filter(t=>t.type==="bairro"&&t.parent_id===e)}function Xe(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=Q();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${u(a.name)}</option>`).join(""),t&&(e.value=t)}async function ue(){await Et();const e=Q(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(i=>`
        <div class="loc-item">
          <span class="loc-item-name">${u(i.name)}</span>
          <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=ye.filter(i=>i.type==="bairro");n.innerHTML=o.length?o.map(i=>{const s=e.find(d=>d.id===i.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${u(i.name)}</div>
              ${s?`<div class="loc-item-sub">${u(s.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(i=>`<option value="${i.id}">${u(i.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{const s=i.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${s}" e todos os bairros vinculados?`))return;const{error:d}=await y.from("locations").delete().eq("id",i.dataset.id);if(d){alert("Erro ao excluir.");return}await ue(),Xe()})}),n.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:s}=await y.from("locations").delete().eq("id",i.dataset.id);if(s){alert("Erro ao excluir.");return}await ue()})})}function rt(){var n,a,o,i,s,d,l,r,c,m,f,p,b,h,x,v,E,w,I,S;document.querySelectorAll(".filter-btn").forEach(B=>{B.addEventListener("click",()=>{const $=B.closest(".filter-btns"),k=B.classList.contains("active");$.querySelectorAll(".filter-btn").forEach(L=>L.classList.remove("active")),k||B.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var _;const B=(_=document.getElementById("f-city"))==null?void 0:_.value,$=Q().find(T=>T.name===B),k=$?Fe($.id):[],L=document.getElementById("f-neighborhood");L&&(L.innerHTML='<option value="">Todos</option>'+k.map(T=>`<option value="${T.name}">${u(T.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{he(Oe(C))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach(L=>{const _=document.getElementById(L);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach(L=>{const _=document.getElementById(L);_&&(_.value="")});const k=document.getElementById("f-neighborhood");k&&(k.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach(L=>L.classList.remove("active")),he(C)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(B=>{B.addEventListener("click",()=>{K(B.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(B=>{B.addEventListener("click",()=>{K(B.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(B=>{B.addEventListener("click",$=>{$.stopPropagation();const k=B.closest(".topnav-dropdown");k==null||k.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(L=>{L!==k&&L.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(B=>B.classList.remove("open"))}),(i=document.getElementById("modal-close"))==null||i.addEventListener("click",we),(s=document.getElementById("modal-cancel"))==null||s.addEventListener("click",we),(d=document.getElementById("property-modal"))==null||d.addEventListener("click",B=>{B.target.id==="property-modal"&&we()}),(l=document.getElementById("btn-new-property"))==null||l.addEventListener("click",()=>{z=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",J="",Be([]),Ne("Novo Imóvel")}),(r=document.getElementById("logout-btn"))==null||r.addEventListener("click",async()=>{await y.auth.signOut(),location.reload()}),(c=document.getElementById("view-prev"))==null||c.addEventListener("click",()=>{H=(H-1+F.length)%F.length,ke()}),(m=document.getElementById("view-next"))==null||m.addEventListener("click",()=>{H=(H+1)%F.length,ke()}),(f=document.getElementById("view-modal-close"))==null||f.addEventListener("click",Ee),(p=document.getElementById("view-modal-close2"))==null||p.addEventListener("click",Ee),(b=document.getElementById("view-modal"))==null||b.addEventListener("click",B=>{B.target.id==="view-modal"&&Ee()}),(h=document.getElementById("view-modal-share"))==null||h.addEventListener("click",()=>{const B=document.getElementById("share-panel");if(!B)return;const $=B.style.display!=="none";B.style.display=$?"none":"block"}),(x=document.getElementById("share-whatsapp"))==null||x.addEventListener("click",()=>{var L,_;const B=(L=document.getElementById("share-link-input"))==null?void 0:L.value;if(!B)return;const $=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",k=encodeURIComponent("Olha esse imóvel que encontrei: "+$+`
`+B);window.open("https://wa.me/?text="+k,"_blank")}),(v=document.getElementById("share-instagram"))==null||v.addEventListener("click",()=>{var $,k;const B=($=document.getElementById("share-link-input"))==null?void 0:$.value;B&&((k=navigator.clipboard)==null||k.writeText(B),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(E=document.getElementById("share-email"))==null||E.addEventListener("click",()=>{var _,T;const B=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!B)return;const $=((T=document.getElementById("view-modal-title"))==null?void 0:T.textContent)||"Imóvel",k=encodeURIComponent("Imóvel: "+$),L=encodeURIComponent(`Olá! Segue o link do imóvel:

`+B);window.open("mailto:?subject="+k+"&body="+L,"_blank")}),(w=document.getElementById("share-copy"))==null||w.addEventListener("click",()=>{var $;const B=document.getElementById("share-link-input");B&&(($=navigator.clipboard)==null||$.writeText(B.value).then(()=>{const k=document.getElementById("share-copy"),L=k.textContent;k.textContent="✅ Copiado!",setTimeout(()=>{k.textContent=L},2e3)}))}),(I=document.getElementById("view-modal-edit"))==null||I.addEventListener("click",()=>{var O;if((g==null?void 0:g.role)!=="admin")return;const B=document.getElementById("view-modal-title").textContent,$=C.find(j=>j.title===B);if(!$)return;Ee(),z=$.id;const k=document.getElementById("property-form"),L=document.getElementById("form-submit-btn");L.textContent="Salvar Alterações",k.querySelector('[name="title"]').value=$.title||"",k.querySelector('[name="rua"]').value=$.rua||"",k.querySelector('[name="numero"]').value=$.numero||"",k.querySelector('[name="city"]').value=$.city||"",k.querySelector('[name="price"]').value=$.price||"",k.querySelector('[name="bedrooms"]').value=$.bedrooms||"",k.querySelector('[name="suites"]').value=$.suites||"",k.querySelector('[name="parking"]').value=$.parking||"",k.querySelector('[name="description"]').value=$.description||"",k.querySelector('[name="construction_status"]').value=$.construction_status||"",k.querySelector('[name="owner_name"]').value=$.owner_name||"",k.querySelector('[name="owner_phone"]').value=$.owner_phone||"",k.querySelector('[name="owner_email"]').value=$.owner_email||"",k.querySelector('[name="owner_notes"]').value=$.owner_notes||"",k.querySelector('[name="condominium"]').value=$.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=$.published===!0?"true":"false");const T=document.getElementById("adminCitySelect");T&&(T.value=$.city||"",T.dispatchEvent(new Event("change")),setTimeout(()=>{const j=document.getElementById("adminNeighborhood");j&&(j.value=$.neighborhood||"")},50)),J=$.cover_image||((O=$.images)==null?void 0:O[0])||"",Be($.images||[]),Ne("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(B=>{B.addEventListener("click",()=>{var $;document.querySelectorAll(".tab-btn").forEach(k=>k.classList.remove("active")),B.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(k=>k.classList.add("hidden")),($=document.getElementById(`tab-${B.dataset.tab}`))==null||$.classList.remove("hidden")})}),(S=document.getElementById("admin-properties"))==null||S.addEventListener("click",B=>{if(B.target.closest(".action-btns"))return;const $=B.target.closest("tr");if(!$)return;const k=Number($.dataset.id);if(!k)return;const L=C.find(_=>_.id===k);L&&Ot(L)})}document.addEventListener("DOMContentLoaded",async()=>{var s,d,l;const e=window.location.hostname;if(e&&e!=="localhost"&&e!=="127.0.0.1"){const{data:r}=await y.from("tenants").select("id").eq("domain",e).maybeSingle();r!=null&&r.id&&Te(r.id)}await Promise.all([kt(),Et()]),ee=W("company.whatsapp",ee),ve=`https://wa.me/${ee}`,De(),Ht(),Rt();const t=document.getElementById("adminCitySelect"),n=document.getElementById("adminNeighborhood");t&&n&&(Xe(),t.addEventListener("change",()=>{const r=Q().find(m=>m.name===t.value),c=r?Fe(r.id):[];n.innerHTML='<option value="">Selecione a cidade primeiro</option>'+c.map(m=>`<option value="${m.name}">${u(m.name)}</option>`).join("")}));const a=document.getElementById("admin-login"),o=document.getElementById("admin-root");if(a){const r=new URLSearchParams(window.location.hash.replace("#","")),c=new URLSearchParams(window.location.search),m=r.get("type")||c.get("type")||"",f=vt||m==="recovery"||m==="invite"||window.location.hash.includes("access_token")||c.has("code"),p=document.getElementById("password-reset-overlay");if(f){a.style.display="none",o&&o.classList.add("hidden"),p&&(p.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async h=>{var S,B;h.preventDefault();const x=((S=document.getElementById("new-password"))==null?void 0:S.value)||"",v=((B=document.getElementById("confirm-password"))==null?void 0:B.value)||"",E=document.getElementById("password-reset-msg"),w=h.target.querySelector('button[type="submit"]');if(E&&(E.style.display="none"),x!==v){E&&(E.textContent="As senhas não coincidem.",E.style.display="");return}w&&(w.disabled=!0,w.textContent="Salvando…");const{error:I}=await y.auth.updateUser({password:x});if(I){E&&(E.textContent="Erro: "+I.message,E.style.display=""),w&&(w.disabled=!1,w.textContent="Definir Senha");return}window.location.href=window.location.pathname}),c.has("code")&&await y.auth.exchangeCodeForSession(c.get("code")??"");return}const{data:{session:b}}=await y.auth.getSession();if(b){if(a.classList.add("hidden"),o&&o.classList.remove("hidden"),ze(),rt(),ot(),window.lucide&&lucide.createIcons(),g=await at(b.user.id),!g){await y.auth.signOut(),a.classList.remove("hidden"),o&&o.classList.add("hidden");return}if(g.active===!1){await y.auth.signOut(),a.classList.remove("hidden"),o&&o.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(g.needs_password_reset){a.style.display="none",o&&o.classList.add("hidden");const h=document.getElementById("password-reset-overlay");h&&(h.style.display="flex"),(d=document.getElementById("password-reset-form"))==null||d.addEventListener("submit",async x=>{var B,$;x.preventDefault();const v=((B=document.getElementById("new-password"))==null?void 0:B.value)||"",E=(($=document.getElementById("confirm-password"))==null?void 0:$.value)||"",w=document.getElementById("password-reset-msg"),I=x.target.querySelector('button[type="submit"]');if(w&&(w.style.display="none"),v!==E){w&&(w.textContent="As senhas não coincidem.",w.style.display="");return}if(v.length<6){w&&(w.textContent="Mínimo 6 caracteres.",w.style.display="");return}I&&(I.disabled=!0,I.textContent="Salvando…");const{error:S}=await y.auth.updateUser({password:v});if(S){w&&(w.textContent="Erro: "+S.message,w.style.display=""),I&&(I.disabled=!1,I.textContent="Definir Senha");return}await y.from("profiles").update({needs_password_reset:!1}).eq("id",g.id),window.location.href=window.location.pathname});return}Te((g==null?void 0:g.tenant_id)||null),$e(g),nt(g.role),await Ie(),await dt(g),window.lucide&&lucide.createIcons(),ea()}else{o&&o.classList.add("hidden"),a.classList.remove("hidden");const h=document.getElementById("login-form");h&&((l=document.getElementById("forgot-password-btn"))==null||l.addEventListener("click",async()=>{var E,w;const x=(w=(E=h.querySelector('input[name="email"]'))==null?void 0:E.value)==null?void 0:w.trim();if(!x){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:v}=await y.auth.resetPasswordForEmail(x,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(v?"Erro: "+v.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),h.addEventListener("submit",async x=>{x.preventDefault();const v=new FormData(h),E=v.get("email"),w=v.get("password");if(await Mt(E,w)){a.classList.add("hidden"),o&&o.classList.remove("hidden"),ze(),rt(),window.lucide&&lucide.createIcons();const{data:{session:S}}=await y.auth.getSession();if(g=S?await at(S.user.id):null,!g){await y.auth.signOut();return}if(g.active===!1){await y.auth.signOut(),a.classList.remove("hidden"),o&&o.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}ot(),Te((g==null?void 0:g.tenant_id)||null),$e(g),nt(g.role),await Ie(),await dt(g),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else ze();await be();const i=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();$t(i),Lt(ee)});async function sa(){const e=C.filter(o=>!o.reference);if(!e.length)return;const t=C.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,i)=>o.id-i.id);for(const o of a){const i="IO-"+String(n).padStart(4,"0"),{error:s}=await y.from("properties").update({reference:i}).eq("id",o.id);if(!s){const d=C.findIndex(l=>l.id===o.id);d>=0&&(C[d].reference=i),n++}}he(Oe(C))}async function la(){const e=C.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(i=>!i.includes("/wm-")))continue;const a=[];let o=!1;for(const i of t.images)if(i.includes("/wm-"))a.push(i);else try{const s=await da(i);a.push(s),o=!0}catch{a.push(i)}if(o){await y.from("properties").update({images:a}).eq("id",t.id);const i=C.findIndex(s=>s.id===t.id);i>=0&&(C[i].images=a)}}he(Oe(C))}}async function da(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),i=o.ok?await o.blob():null,s=i?URL.createObjectURL(i):null;return new Promise(d=>{const l=new Image;l.onload=()=>{URL.revokeObjectURL(a);const r=document.createElement("canvas"),c=1200;let m=l.width,f=l.height;m>c&&(f=Math.round(f*c/m),m=c),r.width=m,r.height=f;const p=r.getContext("2d");p.drawImage(l,0,0,m,f);const b=h=>{if(h){const x=Math.round(m*.18),v=Math.round(h.naturalHeight*x/h.naturalWidth),E=Math.round(m*.02);p.globalAlpha=.45,p.drawImage(h,m-x-E,f-v-E,x,v),p.globalAlpha=1}r.toBlob(async x=>{try{const v=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:E}=await y.storage.from("imoveis").upload(v,x,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(E){console.error("Upload watermark error:",E),d(e);return}const{data:{publicUrl:w}}=y.storage.from("imoveis").getPublicUrl(v);d(w)}catch(v){console.error("Watermark upload exception:",v),d(e)}},"image/jpeg",.82)};if(s){const h=new Image;h.onload=()=>{URL.revokeObjectURL(s),b(h)},h.onerror=()=>{URL.revokeObjectURL(s),b(null)},h.src=s}else b(null)},l.onerror=()=>{URL.revokeObjectURL(a),d(e)},l.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function R(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function Ge(e,t="assets"){const n=await xe(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await y.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:i}}=y.storage.from("imoveis").getPublicUrl(a);return i}async function ra(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",N()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>u(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const i=o.target.files[0];if(i)try{const s=await Ge(i,"logos");document.getElementById("co-logo-url").value=s,document.getElementById("co-logo-preview").src=s}catch(s){alert("Erro no upload: "+s.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const i=await ae([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);i&&De(),o.disabled=!1,o.textContent="Salvar Identidade",R(document.getElementById("co-identity-msg"),i)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const i=document.getElementById("co-whatsapp").value.trim(),s=await ae([["company.whatsapp",i],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);s&&i&&(ee=i,ve=`https://wa.me/${i}`),o.disabled=!1,o.textContent="Salvar Contatos",R(document.getElementById("co-contacts-msg"),s)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const i=await ae([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",R(document.getElementById("co-social-msg"),i)})}async function ca(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",N()),n={};t==null||t.forEach(c=>{n[c.key]=c.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",i=n["visual.secondary_bg"]||"#1a2f4a",s=n["visual.hero_bg_url"]||"",d=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${u(s)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 <strong>Foto de fundo do banner</strong> no topo do site. Recomendado: 1920×1080 px.</p>
        <div id="vis-hero-preview" style="margin-top:10px;display:${s?"":"none"}">
          <img src="${u(s)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Preço Máximo do Slider de Busca</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="vis-price-max" type="number" class="form-control" value="${d}" min="100000" step="1000000" style="max-width:200px">
          <span style="font-size:13px;color:#9ca3af">R$</span>
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-images">Salvar Imagens</button>
        <span id="visual-images-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `;function l(c,m,f){const p=document.getElementById(c),b=document.getElementById(m);p==null||p.addEventListener("input",h=>{b.value=h.target.value,f()}),b==null||b.addEventListener("input",h=>{/^#[0-9a-fA-F]{6}$/.test(h.target.value)&&(p.value=h.target.value,f())})}function r(){var m,f,p,b;const c=((m=document.getElementById("col-accent-hex"))==null?void 0:m.value)||"#b8962e";(f=document.getElementById("vp-bar"))==null||f.style.setProperty("background",c),(p=document.getElementById("vp-dot"))==null||p.style.setProperty("background",c),(b=document.getElementById("vp-btn"))==null||b.style.setProperty("background",c),document.documentElement.style.setProperty("--accent",c)}l("col-accent","col-accent-hex",r),l("col-primary","col-primary-hex",()=>{}),l("col-secondary","col-secondary-hex",()=>{}),r(),document.getElementById("vis-hero-file").addEventListener("change",async c=>{const m=c.target.files[0];if(m)try{const f=await Ge(m,"hero");document.getElementById("vis-hero-url").value=f;const p=document.getElementById("vis-hero-preview");p.innerHTML=`<img src="${f}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,p.style.display=""}catch(f){alert("Erro no upload: "+f.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const c=document.getElementById("visual-save-colors");c.disabled=!0,c.textContent="Salvando…";const m=await ae([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);m&&De(),c.disabled=!1,c.textContent="Salvar Cores",R(document.getElementById("visual-colors-msg"),m)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",r())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const c=document.getElementById("visual-save-images");c.disabled=!0,c.textContent="Salvando…";const m=await ae([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);c.disabled=!1,c.textContent="Salvar Imagens",R(document.getElementById("visual-images-msg"),m)})}async function ma(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("site_content").select("*").eq("tenant_id",N()),n={};t==null||t.forEach(l=>{n[l.key]=l});const a=(l,r)=>{var c;return u(((c=n[l])==null?void 0:c[`value_${r}`])||"")},o=["pt","en","es"],i={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},s=l=>o.map(r=>`<button class="content-tab${r===l?" active":""}" data-lang="${r}">${i[r]}</button>`).join(""),d=l=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${l}" value="${a("hero.title",l)}">
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto principal em <strong>destaque no banner do site</strong> (frase de impacto).</p>
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${l}" rows="3">${a("hero.subtitle",l)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto menor abaixo do título, também no <strong>banner principal</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${l}" rows="4">${a("inst.bio_p1",l)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece na seção <strong>"Sobre"</strong> do site.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${l}" rows="3">${a("inst.bio_p2",l)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Segundo parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${l}" rows="3">${a("inst.bio_p3",l)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Terceiro parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${l}" value="${a("inst.stat1_num",l)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${l}" value="${a("inst.stat2_num",l)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${l}" value="${a("inst.stat3_num",l)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${l}" value="${a("inst.stat1_label",l)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${l}" value="${a("inst.stat2_label",l)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${l}" value="${a("inst.stat3_label",l)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${l}" value="${a("footer.text",l)}">
    </div>
  `;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${s("pt")}</div>
      <div id="sc-panels">
        ${o.map(l=>`<div class="content-panel${l==="pt"?" active":""}" data-panel="${l}">${d(l)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",l=>{var c;const r=l.target.closest(".content-tab");r&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(m=>m.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(m=>m.classList.remove("active")),r.classList.add("active"),(c=document.querySelector(`#sc-panels [data-panel="${r.dataset.lang}"]`))==null||c.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const l=document.getElementById("sc-save-btn");l.disabled=!0,l.textContent="Salvando…";const r={};document.querySelectorAll(".sc-field").forEach(m=>{const f=m.dataset.key,p=m.dataset.lang;r[f]||(r[f]={}),r[f][p]=m.value});let c=!0;for(const[m,f]of Object.entries(r))await qe(m,{pt:f.pt,en:f.en,es:f.es})||(c=!1);l.disabled=!1,l.textContent="Salvar Conteúdo",R(document.getElementById("sc-save-msg"),c)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const l=document.getElementById("seo-save-btn");l.disabled=!0,l.textContent="Salvando…";const r=document.getElementById("seo-title").value.trim(),c=document.getElementById("seo-desc").value.trim(),m=await qe("seo.title_pt",{pt:r,en:r,es:r})&&await qe("seo.description_pt",{pt:c,en:c,es:c});l.disabled=!1,l.textContent="Salvar SEO",R(document.getElementById("seo-save-msg"),m)})}async function pa(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await P())}async function P(){const e=document.getElementById("crm-body");if(!e)return;const t=N(),[{data:n},{data:a},{data:o},{data:i}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",t).order("sort_order"),y.from("crm_stages").select("*").eq("tenant_id",t).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",t).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("sort_order")]),s=n||[],d=s.find(p=>p.is_default)||s[0],l=s.map(p=>`<option value="${p.id}"${p.id===(d==null?void 0:d.id)?" selected":""}>${u(p.name)}</option>`).join(""),c=(a||[]).filter(p=>p.pipeline_id===(d==null?void 0:d.id)).map(p=>`
    <div class="stage-item" data-id="${p.id}">
      <div class="stage-color-dot" style="background:${p.color}"></div>
      <span class="stage-name">${u(p.name)}</span>
      <input type="color" value="${p.color}" data-sid="${p.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${p.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',m=(o||[]).map(p=>`<span class="tag-chip" style="background:${p.color}" data-id="${p.id}">
      ${u(p.name)}
      <button class="tag-chip-del" data-id="${p.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',f=(i||[]).map(p=>`
    <div class="stage-item" data-id="${p.id}">
      <div class="stage-color-dot" style="background:${p.color}"></div>
      <span class="stage-name">${u(p.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${p.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${p.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${l}</select>
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
      <div class="stages-list" id="crm-status-list">${f}</div>
      <div class="stage-add-row">
        <input id="crm-new-status" type="text" class="form-control" placeholder="Nome do status…">
        <input type="color" id="crm-new-status-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text);white-space:nowrap">
          <input type="checkbox" id="crm-new-status-final"> Status final
        </label>
        <button class="btn-primary" id="crm-add-status">Adicionar</button>
      </div>
    </div>
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const p=document.getElementById("crm-new-stage").value.trim(),b=document.getElementById("crm-new-stage-color").value,h=parseInt(document.getElementById("crm-pipe-sel").value,10);p&&(await y.from("crm_stages").insert({pipeline_id:h,name:p,color:b,sort_order:99,tenant_id:N()}),document.getElementById("crm-new-stage").value="",await P())}),e.querySelectorAll(".stage-del").forEach(p=>{p.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await y.from("crm_stages").delete().eq("id",p.dataset.id),await P())})}),e.querySelectorAll(".stage-color-pick").forEach(p=>{p.addEventListener("change",async b=>{await y.from("crm_stages").update({color:b.target.value}).eq("id",p.dataset.sid);const h=p.closest(".stage-item").querySelector(".stage-color-dot");h&&(h.style.background=b.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const p=document.getElementById("crm-new-tag").value.trim(),b=document.getElementById("crm-new-tag-color").value;p&&(await y.from("crm_tags").insert({name:p,color:b,tenant_id:N()}),document.getElementById("crm-new-tag").value="",await P())}),e.querySelectorAll(".tag-chip-del").forEach(p=>{p.addEventListener("click",async()=>{await y.from("crm_tags").delete().eq("id",p.dataset.id),await P()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const p=document.getElementById("crm-new-status").value.trim(),b=document.getElementById("crm-new-status-color").value,h=document.getElementById("crm-new-status-final").checked;p&&(await y.from("crm_lead_statuses").insert({name:p,color:b,is_final:h,sort_order:99,tenant_id:N()}),document.getElementById("crm-new-status").value="",await P())}),e.querySelectorAll(".status-del").forEach(p=>{p.addEventListener("click",async()=>{confirm("Remover este status?")&&(await y.from("crm_lead_statuses").delete().eq("id",p.dataset.id),await P())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var h;const p=(h=prompt("Nome do novo funil:"))==null?void 0:h.trim();if(!p)return;const{error:b}=await y.from("crm_pipelines").insert({name:p,sort_order:99,tenant_id:N()});if(b){alert("Erro ao criar funil: "+b.message);return}je=!1,await P()})}async function ua(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("integrations").select("*"),n={};t==null||t.forEach(d=>{n[d.key]=d});const a=d=>{var l;return u(((l=n[d])==null?void 0:l.value)||"")},o=d=>{var l;return(l=n[d])!=null&&l.enabled?"checked":""},i=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],s=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${i.map(d=>`
        <div class="integration-row">
          <div class="integration-icon">${d.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${d.label}</div>
            <div class="integration-desc">${d.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${d.key}" ${o(d.key)}>
              <span class="toggle-slider"></span>
            </label>
            <input type="text" class="integration-value intg-val" data-key="${d.key}"
              value="${a(d.key)}" placeholder="${d.placeholder}">
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
      ${s.map(d=>`
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label">${d.label}</label>
          <input class="form-control smtp-field" data-key="${d.key}" value="${a(d.key)}" placeholder="${d.placeholder}">
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var m;const d=document.getElementById("intg-save-tracking");d.disabled=!0,d.textContent="Salvando…";let l=!0;const r=document.querySelectorAll(".intg-val"),c=document.querySelectorAll(".intg-toggle");for(let f=0;f<r.length;f++){const p=r[f].dataset.key,b=r[f].value.trim(),h=((m=c[f])==null?void 0:m.checked)??!1;await Me(p,b,h)||(l=!1)}d.disabled=!1,d.textContent="Salvar Integrações",R(document.getElementById("intg-tracking-msg"),l)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const d=document.getElementById("intg-save-smtp");d.disabled=!0,d.textContent="Salvando…";const l=document.querySelectorAll(".smtp-field");let r=!0;for(const m of l)await Me(m.dataset.key,m.value.trim(),!0)||(r=!1);const c=document.getElementById("smtp-pass").value;c&&(await Me("smtp_pass",c,!0)||(r=!1)),d.disabled=!1,d.textContent="Salvar SMTP",R(document.getElementById("intg-smtp-msg"),r)})}async function ga(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Ue(),document.getElementById("media-file-input").addEventListener("change",async n=>{var l,r;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),i=document.getElementById("media-progress-fill"),s=document.getElementById("media-progress-text");o.style.display="";let d=0;for(const c of a){s.textContent=`Enviando ${d+1}/${a.length}…`,i.style.width=`${Math.round(d/a.length*100)}%`;try{const m=await Ge(c,"media"),f=c.name.replace(/\.[^.]+$/,"").slice(0,60);await y.from("media_library").insert({name:f,url:m,type:"image",size:c.size,created_by:(r=(l=(await y.auth.getUser()).data)==null?void 0:l.user)==null?void 0:r.id})}catch(m){console.error("Media upload error:",m)}d++}i.style.width="100%",s.textContent=`✓ ${d} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",i.style.width="0"},2e3),await Ue(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Ue(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await y.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${u(a.url)}">
      <img src="${u(a.url)}" alt="${u(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${u(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${u(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation(),(i=navigator.clipboard)==null||i.writeText(a.dataset.url).then(()=>{const s=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=s},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await y.from("media_library").delete().eq("id",a.dataset.id),await Ue())})})}async function va(){var t,n,a,o,i;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(s=>{s.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(l=>l.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(l=>l.classList.add("hidden")),s.classList.add("active");const d=e.querySelector(`#sa-panel-${s.dataset.tab}`);d&&d.classList.remove("hidden"),s.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&V(),s.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&fa(),s.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&ct(),s.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&mt(),s.dataset.tab==="platform"&&pt()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",ct),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",V),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",mt),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>ha()),(i=e.querySelector("#sa-plat-save"))==null||i.addEventListener("click",ya),V(),pt())}async function V(){var d,l;const e=document.getElementById("sa-tenants-list"),t=((l=(d=document.getElementById("sa-tenant-search"))==null?void 0:d.value)==null?void 0:l.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=y.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const i=(a||[]).filter(r=>{var c,m;return!t||((c=r.name)==null?void 0:c.toLowerCase().includes(t))||((m=r.slug)==null?void 0:m.toLowerCase().includes(t))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const s=r=>r.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=i.map(r=>{var c;return`
    <div class="sa-list-row" data-action="open-panel" data-id="${r.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${r.logo_url?`<img class="sa-tenant-logo" src="${u(r.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${u(r.name||"—")}</div>
          <div class="sa-list-sub">${u(r.slug||"")} · ${u(((c=r.plans)==null?void 0:c.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${s(r)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${r.id}" data-active="${r.active}" title="${r.active?"Desativar":"Ativar"}">${r.active?"⏸️":"▶️"}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(r=>{r.addEventListener("click",async c=>{c.stopPropagation();const m=r.dataset.active==="true";await y.from("tenants").update({active:!m}).eq("id",r.dataset.id),V()})}),e.querySelectorAll('[data-action="open-panel"]').forEach(r=>{r.addEventListener("click",()=>{const c=(i||[]).find(m=>String(m.id)===String(r.dataset.id));c&&xa(c)})})}async function fa(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await y.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${u(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function ct(){var d;const e=document.getElementById("sa-subs-list"),t=((d=document.getElementById("sa-sub-filter"))==null?void 0:d.value)||"";if(!e)return;e.dataset.loaded="1";let n=y.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const i={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},s={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(l=>{var r,c,m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${u(((r=l.tenants)==null?void 0:r.name)||"—")}</div>
          <div class="sa-list-sub">${u(((c=l.plans)==null?void 0:c.name)||"—")} · R$ ${Number(((m=l.plans)==null?void 0:m.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${i[l.status]||"gray"}">${s[l.status]||l.status}</span>
        <span class="sa-list-date">${l.current_period_end?new Date(l.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function mt(){var s,d;const e=document.getElementById("sa-users-list"),t=((d=(s=document.getElementById("sa-user-search"))==null?void 0:s.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await y.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(l=>{var r,c;return!t||((r=l.name)==null?void 0:r.toLowerCase().includes(t))||((c=l.email)==null?void 0:c.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const i={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(l=>{var r;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(l.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${u(l.name||"—")}</div>
          <div class="sa-list-sub">${u(((r=l.tenants)==null?void 0:r.name)||"Sem imobiliária")} · ${i[l.role]||l.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${l.active!==!1?"sa-badge-green":"sa-badge-red"}">${l.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function pt(){const[e,t,n,a]=await Promise.all([y.from("tenants").select("id",{count:"exact",head:!0}),y.from("profiles").select("id",{count:"exact",head:!0}),y.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),y.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(i,s)=>{const d=document.getElementById(i);d&&(d.textContent=s??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function ya(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await ae([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),R(t,!0)}function ba(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ha(){var a,o,i,s,d,l;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),y.from("plans").select("id, name").then(({data:r})=>{const c=document.getElementById("nt-plan");c&&r&&(c.innerHTML='<option value="">Sem plano</option>'+r.map(m=>`<option value="${m.id}">${u(m.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",r=>{const c=document.getElementById("nt-slug");c&&!c.dataset.manual&&(c.value=ba(r.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",r=>{r.target.dataset.manual="1"}),(i=document.getElementById("nt-pwd-toggle"))==null||i.addEventListener("click",()=>{const r=document.getElementById("nt-admin-password");r.type=r.type==="password"?"text":"password"});const n=()=>t.remove();(s=document.getElementById("sa-modal-close-btn"))==null||s.addEventListener("click",n),(d=document.getElementById("nt-cancel"))==null||d.addEventListener("click",n),t.addEventListener("click",r=>{r.target===t&&n()}),(l=document.getElementById("nt-save"))==null||l.addEventListener("click",async()=>{var S,B,$,k,L,_,T,O,j,de,re,ce;const r=(B=(S=document.getElementById("nt-name"))==null?void 0:S.value)==null?void 0:B.trim(),c=(k=($=document.getElementById("nt-slug"))==null?void 0:$.value)==null?void 0:k.trim(),m=(_=(L=document.getElementById("nt-domain"))==null?void 0:L.value)==null?void 0:_.trim(),f=(T=document.getElementById("nt-plan"))==null?void 0:T.value,p=(j=(O=document.getElementById("nt-admin-email"))==null?void 0:O.value)==null?void 0:j.trim(),b=(re=(de=document.getElementById("nt-admin-password"))==null?void 0:de.value)==null?void 0:re.trim(),h=document.getElementById("nt-msg"),x=document.getElementById("nt-save");if(!r||!c){h.textContent="❌ Nome e slug são obrigatórios.",h.style.color="#ef4444";return}if(!p){h.textContent="❌ Informe o e-mail do admin.",h.style.color="#ef4444";return}if(!b||b.length<6){h.textContent="❌ A senha precisa ter mínimo 6 caracteres.",h.style.color="#ef4444";return}x.disabled=!0,x.textContent="Criando…",h.textContent="⏳ Criando imobiliária…",h.style.color="#64748b";const{data:v,error:E}=await y.from("tenants").insert({name:r,slug:c,domain:m||null,plan_id:f||null,active:!0}).select();if(E){x.disabled=!1,x.textContent="Criar Imobiliária",h.textContent="❌ "+E.message,h.style.color="#ef4444";return}const w=(ce=v==null?void 0:v[0])==null?void 0:ce.id;h.textContent="⏳ Criando usuário admin…";const I=await le({email:p,password:b,role:"admin",tenant_id:w});if(!(I!=null&&I.success)){x.disabled=!1,x.textContent="Criar Imobiliária",h.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+u((I==null?void 0:I.error)||"Desconhecido"),h.style.color="#f59e0b",setTimeout(()=>{n(),V()},3e3);return}w&&(I!=null&&I.user_id)&&!(I!=null&&I.linked)&&await y.from("profiles").update({tenant_id:w}).eq("id",I.user_id),x.disabled=!1,x.textContent="Criar Imobiliária",I.email_sent===!1?(h.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${u(I.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${u(p)}</strong><br>
          Senha: <strong>${u(b)}</strong>
        </div>`,h.style.color="#0f172a"):(h.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",h.style.color="#22c55e",setTimeout(()=>{n(),V()},1500))})}function xa(e){var a;(a=document.getElementById("tenant-panel"))==null||a.remove();const t=document.createElement("div");t.id="tenant-panel",t.style.cssText="position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;";const n=[{id:"properties",label:"🏠 Imóveis"},{id:"leads",label:"📋 Leads"},{id:"users",label:"👥 Corretores"},{id:"api",label:"🔗 Site & API"},{id:"config",label:"⚙️ Configurações"}];t.innerHTML=`
    <div style="background:#0a1628;padding:14px 24px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:10;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.3);">
      <button id="tp-back" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;padding:7px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">← Imobiliárias</button>
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
        ${e.logo_url?`<img src="${u(e.logo_url)}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0;">`:'<div style="width:36px;height:36px;background:rgba(255,255,255,.1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏢</div>'}
        <div style="min-width:0;">
          <div style="color:#fff;font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${u(e.name)}</div>
          <div style="color:#94a3b8;font-size:12px;">${u(e.slug||"")} · ${e.active!==!1?'<span style="color:#4ade80;">● Ativo</span>':'<span style="color:#f87171;">● Inativo</span>'}</div>
        </div>
      </div>
      <button id="tp-edit-btn" style="background:#c9a84c;border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">✏️ Editar dados</button>
    </div>
    <div style="background:#fff;border-bottom:2px solid #e2e8f0;padding:0 24px;display:flex;gap:0;flex-shrink:0;overflow-x:auto;">
      ${n.map((o,i)=>`<button class="tp-tab" data-tab="${o.id}" style="padding:14px 20px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:${i===0?"700":"500"};color:${i===0?"#2563eb":"#64748b"};border-bottom:2px solid ${i===0?"#2563eb":"transparent"};margin-bottom:-2px;white-space:nowrap;transition:all .15s;">${o.label}</button>`).join("")}
    </div>
    <div id="tp-content" style="padding:24px;flex:1;max-width:1200px;margin:0 auto;width:100%;box-sizing:border-box;"></div>
  `,document.body.appendChild(t),document.getElementById("tp-back").addEventListener("click",()=>t.remove()),document.getElementById("tp-edit-btn").addEventListener("click",()=>wt(e)),t.querySelectorAll(".tp-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".tp-tab").forEach(i=>{i.style.fontWeight="500",i.style.color="#64748b",i.style.borderBottomColor="transparent"}),o.style.fontWeight="700",o.style.color="#2563eb",o.style.borderBottomColor="#2563eb",ut(e,o.dataset.tab)})}),ut(e,"properties")}async function ut(e,t){var a,o,i;const n=document.getElementById("tp-content");if(n){if(n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>',t==="properties"){const{data:s}=await y.from("properties").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1});if(!(s!=null&&s.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>';return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${s.length} imóvel(is)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:500px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;letter-spacing:.04em;">IMÓVEL</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;letter-spacing:.04em;">CIDADE</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;letter-spacing:.04em;">PREÇO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;letter-spacing:.04em;">STATUS</th>
          </tr></thead>
          <tbody>${s.map(d=>{var l;return`
            <tr style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  ${(l=d.images)!=null&&l[0]?`<img src="${d.images[0]}" style="width:52px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;">`:'<div style="width:52px;height:38px;background:#e2e8f0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>'}
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${u(d.title||"")}</div><div style="font-size:11px;color:#94a3b8;">${u(d.reference||"")}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${u([d.neighborhood,d.city].filter(Boolean).join(", "))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">R$ ${u(String(d.price||"—"))}</td>
              <td style="padding:12px 16px;text-align:center;">${d.published?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Publicado</span>':'<span style="background:#f1f5f9;color:#64748b;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Rascunho</span>'}</td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`}if(t==="leads"){const{data:s}=await y.from("leads").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}).limit(100);if(!(s!=null&&s.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">📋</div><p style="font-size:14px;">Nenhum lead ainda.</p></div>';return}const d=r=>({novo:"Novo",contato:"Contato",proposta:"Proposta",fechado:"Fechado"})[r]||r||"Novo",l=r=>({novo:"#dbeafe,#1d4ed8",contato:"#fef3c7,#92400e",proposta:"#ede9fe,#6d28d9",fechado:"#dcfce7,#15803d"})[r]||"#f1f5f9,#64748b";n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${s.length} lead(s)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:500px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">NOME</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">CONTATO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">ETAPA</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">DATA</th>
          </tr></thead>
          <tbody>${s.map(r=>{const[c,m]=l(r.stage).split(",");return`<tr style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${u(r.name||"")}</td>
              <td style="padding:12px 16px;"><div style="font-size:13px;color:#475569;">${u(r.phone||"")}</div><div style="font-size:11px;color:#94a3b8;">${u(r.email||"")}</div></td>
              <td style="padding:12px 16px;"><span style="background:${c};color:${m};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${d(r.stage)}</span></td>
              <td style="padding:12px 16px;font-size:12px;color:#94a3b8;">${new Date(r.created_at).toLocaleDateString("pt-BR")}</td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`}if(t==="users"){const{data:s}=await y.from("profiles").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}),d=`<button onclick="window._tpTenantId='${e.id}';openAddCorretorModal('${e.id}')" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;font-weight:600;">+ Adicionar Corretor</button>`;if(!(s!=null&&s.length)){n.innerHTML=`<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">👥</div><p style="font-size:14px;margin-bottom:16px;">Nenhum corretor cadastrado ainda.</p>${d}</div>`;return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${s.length} usuário(s)</h3>
          ${d}
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:400px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">USUÁRIO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">FUNÇÃO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
          </tr></thead>
          <tbody>${s.map(l=>`
            <tr style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${u(l.name||l.email||"—")}</div><div style="font-size:11px;color:#94a3b8;">${u(l.email||"")}</div></td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${u(l.role||"corretor")}</td>
              <td style="padding:12px 16px;text-align:center;">${l.active!==!1?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Ativo</span>':'<span style="background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Pausado</span>'}</td>
            </tr>`).join("")}
          </tbody>
        </table></div>
      </div>`}if(t==="api"){const s="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api",d=`https://omarcorretor.com.br/demo.html?key=${e.id}`;n.innerHTML=`
      <div style="display:grid;gap:20px;max-width:800px;">
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🔑 Chave de API</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Use para conectar qualquer site externo ao CRM desta imobiliária.</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <input type="text" value="${u(e.id)}" readonly style="flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:monospace;font-size:13px;background:#f8fafc;min-width:0;">
            <button id="tp-copy-key" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🌐 Site Demonstração</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.</p>
          <a href="${u(d)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">Abrir site demo →</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${u(d)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/properties?key=${u(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/properties/{id}?key=${u(e.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${s}/leads?key=${u(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/settings?key=${u(e.id)}</div>
          </div>
        </div>
      </div>`,(a=document.getElementById("tp-copy-key"))==null||a.addEventListener("click",()=>{var c;(c=navigator.clipboard)==null||c.writeText(e.id);const l=document.getElementById("tp-copy-key"),r=l.textContent;l.textContent="✅ Copiada!",setTimeout(()=>{l.textContent=r},2e3)})}if(t==="config"){const{data:s}=await y.from("settings").select("key,value").eq("tenant_id",e.id),d={};s==null||s.forEach(r=>{d[r.key]=r.value});const l=(r,c)=>`
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${r}</div>
        <div style="font-size:14px;color:#0f172a;">${u(String(c||"—"))}</div>
      </div>`;n.innerHTML=`
      <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);max-width:560px;">
        <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 20px;">⚙️ Configurações da imobiliária</h3>
        ${l("NOME DA EMPRESA",d["company.name"]||e.name)}
        ${l("TELEFONE",d["company.phone"])}
        ${l("E-MAIL",d["company.email"])}
        ${l("WHATSAPP",d["company.whatsapp"])}
        ${l("CIDADE",d["company.city"])}
        ${l("DOMÍNIO DO SITE",e.domain)}
        ${l("PLANO",((o=e.plans)==null?void 0:o.name)||"Sem plano")}
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
          <button id="tp-open-edit" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">✏️ Editar dados completos</button>
        </div>
      </div>`,(i=document.getElementById("tp-open-edit"))==null||i.addEventListener("click",()=>wt(e))}}}function wt(e){var r,c,m,f,p,b,h,x;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
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
            ${e.logo_url?`<img src="${u(e.logo_url)}" style="width:100%;height:100%;object-fit:cover;">`:'<span style="font-size:28px;">🏢</span>'}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · 256×256px</div>
          </div>
        </div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${u(e.name||"")}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${u(e.slug||"")}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${u(e.domain||"")}" placeholder="abc.imobipro.com.br"></div>
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
            <input id="et-api-key" class="form-input" type="text" value="${u(e.id||"")}" readonly
              style="font-family:monospace;font-size:11px;background:#fff;color:#1e3a5f;flex:1;letter-spacing:.02em;">
            <button id="et-copy-key" class="btn-secondary-sm" style="white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Endpoints disponíveis</div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([v,E,w])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${v==="GET"?"#dcfce7":"#fef9c3"};color:${v==="GET"?"#15803d":"#854d0e"};">${v}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${E}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${w}</div>
            </div>`).join("")}
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Exemplo rápido (JavaScript)</div>
        <pre style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;font-size:11px;overflow-x:auto;margin:0;line-height:1.6;"><code>const KEY = '${u(e.id)}'
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
  `,document.body.appendChild(n),y.from("plans").select("id, name").then(({data:v})=>{const E=document.getElementById("et-plan");E&&v&&(E.innerHTML='<option value="">Sem plano</option>'+v.map(w=>`<option value="${w.id}"${String(w.id)===String(e.plan_id)?" selected":""}>${u(w.name)}</option>`).join(""))}),(r=document.getElementById("et-logo-input"))==null||r.addEventListener("change",v=>{const E=v.target.files[0];if(!E)return;const w=URL.createObjectURL(E),I=document.getElementById("et-logo-preview");I&&(I.innerHTML=`<img src="${w}" style="width:100%;height:100%;object-fit:cover;">`)}),(c=document.getElementById("et-logo-preview"))==null||c.addEventListener("click",()=>{var v;(v=document.getElementById("et-logo-input"))==null||v.click()}),(m=document.getElementById("et-pwd-toggle"))==null||m.addEventListener("click",()=>{const v=document.getElementById("et-admin-password");v.type=v.type==="password"?"text":"password"}),(f=document.getElementById("et-copy-key"))==null||f.addEventListener("click",()=>{var I,S;const v=(I=document.getElementById("et-api-key"))==null?void 0:I.value;if(!v)return;(S=navigator.clipboard)==null||S.writeText(v);const E=document.getElementById("et-copy-key"),w=E.textContent;E.textContent="✅ Copiada!",setTimeout(()=>{E.textContent=w},2e3)});const o=["dados","config","api"];function i(v){o.forEach(E=>{document.getElementById(`et-pane-${E}`).style.display=E===v?"":"none";const w=document.getElementById(`et-tab-${E}`);w.style.borderBottomColor=E===v?"#2563eb":"transparent",w.style.color=E===v?"#2563eb":"#64748b",w.style.fontWeight=E===v?"600":"500"}),v==="config"&&d()}o.forEach(v=>{var E;return(E=document.getElementById(`et-tab-${v}`))==null?void 0:E.addEventListener("click",()=>i(v))});let s=!1;async function d(){var w;if(s)return;s=!0;const{data:v}=await y.from("settings").select("key,value").eq("tenant_id",e.id),E={};v==null||v.forEach(I=>{E[I.key]=I.value}),document.getElementById("et-pane-config").innerHTML=`
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${u(E["company.whatsapp"]||"")}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${u(E["company.phone"]||"")}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${u(E["company.email"]||"")}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${u(E["company.city"]||E["company.address"]||"")}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${u(E["company.slogan"]||"")}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `,(w=document.getElementById("et-cfg-save"))==null||w.addEventListener("click",async()=>{const I=document.getElementById("et-cfg-save"),S=document.getElementById("et-cfg-msg");I.disabled=!0,I.textContent="Salvando…",S.textContent="",S.style.color="#64748b";const B=document.getElementById("et-cfg-wa").value.trim().replace(/\D/g,""),$=document.getElementById("et-cfg-phone").value.trim(),k=document.getElementById("et-cfg-email").value.trim(),L=document.getElementById("et-cfg-city").value.trim(),_=document.getElementById("et-cfg-slogan").value.trim(),{error:T}=await y.from("settings").upsert([{key:"company.whatsapp",value:B,tenant_id:e.id},{key:"company.phone",value:$,tenant_id:e.id},{key:"company.email",value:k,tenant_id:e.id},{key:"company.city",value:L,tenant_id:e.id},{key:"company.address",value:L,tenant_id:e.id},{key:"company.slogan",value:_,tenant_id:e.id}],{onConflict:"tenant_id,key"});I.disabled=!1,I.textContent="💾 Salvar configurações",T?(S.textContent="❌ "+T.message,S.style.color="#ef4444"):(S.textContent="✅ Configurações salvas!",S.style.color="#22c55e")})}const l=()=>n.remove();(p=document.getElementById("et-close"))==null||p.addEventListener("click",l),(b=document.getElementById("et-cancel"))==null||b.addEventListener("click",l),n.addEventListener("click",v=>{v.target===n&&l()}),(h=document.getElementById("et-delete"))==null||h.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const E=document.getElementById("et-delete");E.disabled=!0,E.textContent="Excluindo…";const{error:w}=await y.from("tenants").delete().eq("id",e.id);if(w){alert("Erro ao excluir: "+w.message),E.disabled=!1,E.textContent="🗑️ Excluir";return}l(),V()}),(x=document.getElementById("et-save"))==null||x.addEventListener("click",async()=>{var O,j,de,re,ce,Ve,We,Je,Ye,Ke,Qe,Ze;const v=(j=(O=document.getElementById("et-name"))==null?void 0:O.value)==null?void 0:j.trim(),E=(re=(de=document.getElementById("et-slug"))==null?void 0:de.value)==null?void 0:re.trim(),w=(Ve=(ce=document.getElementById("et-domain"))==null?void 0:ce.value)==null?void 0:Ve.trim(),I=(We=document.getElementById("et-plan"))==null?void 0:We.value,S=(Ye=(Je=document.getElementById("et-admin-email"))==null?void 0:Je.value)==null?void 0:Ye.trim(),B=(Qe=(Ke=document.getElementById("et-admin-password"))==null?void 0:Ke.value)==null?void 0:Qe.trim(),$=(Ze=document.getElementById("et-logo-input"))==null?void 0:Ze.files[0],k=document.getElementById("et-msg"),L=document.getElementById("et-save");if(!v){k.textContent="❌ Nome é obrigatório.",k.style.color="#ef4444";return}L.disabled=!0,L.textContent="Salvando…",k.textContent="⏳ Salvando…",k.style.color="#64748b";let _=e.logo_url;if($)try{const A=await xe($,256,.85),et=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:It}=await y.storage.from("imoveis").upload(et,A,{contentType:"image/jpeg",upsert:!0});if(!It){const{data:{publicUrl:Bt}}=y.storage.from("imoveis").getPublicUrl(et);_=Bt}}catch(A){console.error("Logo upload:",A)}const{error:T}=await y.from("tenants").update({name:v,slug:E||e.slug,domain:w||null,plan_id:I||null,logo_url:_}).eq("id",e.id);if(T){L.disabled=!1,L.textContent="Salvar",k.textContent="❌ "+T.message,k.style.color="#ef4444";return}if(S&&B&&B.length>=6){k.textContent="⏳ Criando usuário admin…";const A=await le({email:S,password:B,role:"admin",tenant_id:e.id});A!=null&&A.success?(A!=null&&A.user_id&&!(A!=null&&A.linked)&&await y.from("profiles").update({tenant_id:e.id}).eq("id",A.user_id),k.textContent="✅ Salvo e admin criado!",k.style.color="#22c55e"):(k.textContent="⚠️ Salvo, mas erro ao criar admin: "+((A==null?void 0:A.error)||"Tente novamente"),k.style.color="#f59e0b")}else k.textContent="✅ Imobiliária atualizada!",k.style.color="#22c55e";L.disabled=!1,L.textContent="Salvar",setTimeout(()=>{l(),V()},1200)})}
