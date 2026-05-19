import{s as y}from"./supabase-BcuJ3xoD.js";const bt="00000000-0000-0000-0000-000000000000";let we={},He={},pe=bt;function Re(e){pe=e||bt,we={},He={}}const H=()=>pe;async function _t(){const[e,t]=await Promise.all([y.from("settings").select("key,value").eq("tenant_id",pe),y.from("site_content").select("*").eq("tenant_id",pe)]);e.data&&e.data.forEach(n=>{we[n.key]=n.value}),t.data&&t.data.forEach(n=>{He[n.key]=n})}const ee=(e,t=null)=>we[e]!==void 0?we[e]:t,Ue=(e,t="pt")=>{const n=He[e];return n?n[`value_${t}`]??n.value_pt??null:null};async function ce(e){const t=new Date().toISOString(),n=e.map(([o,i])=>({key:o,value:i,tenant_id:pe,updated_at:t})),{error:a}=await y.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,i])=>{we[o]=i}),!a}async function De(e,{pt:t,en:n,es:a}){const o={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:pe,updated_at:new Date().toISOString()},{error:i}=await y.from("site_content").upsert(o,{onConflict:"key,tenant_id"});return i||(He[e]=o),!i}async function Oe(e,t,n){const{error:a}=await y.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function Ke(){const e=document.documentElement,t=ee("visual.accent_color","#b8962e"),n=ee("visual.primary_bg","#0f1c2e"),a=ee("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=ee("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(l=>{l.src=o});const i=ee("company.favicon_url","/favicon.ico"),s=document.querySelector('link[rel="shortcut icon"]');s&&(s.href=i);const d=ee("visual.hero_bg_url","");if(d){const l=document.querySelector(".hero");l&&(l.style.backgroundImage=`url('${d}')`)}}function Ct(e="pt"){const t=b=>Ue(b,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const i=document.querySelector('[data-i18n="inst.p1"]'),s=document.querySelector('[data-i18n="inst.p2"]'),d=document.querySelector('[data-i18n="inst.p3"]');i&&t("inst.bio_p1")&&(i.innerHTML=t("inst.bio_p1")),s&&t("inst.bio_p2")&&(s.innerHTML=t("inst.bio_p2")),d&&t("inst.bio_p3")&&(d.innerHTML=t("inst.bio_p3"));const l=document.querySelector('[data-i18n-num="inst.stat2num"]'),r=document.querySelector('[data-i18n="inst.stat1"]'),c=document.querySelector('[data-i18n="inst.stat2"]'),m=document.querySelector('[data-i18n="inst.stat3"]');l&&t("inst.stat2_num")&&(l.innerHTML=t("inst.stat2_num")),r&&t("inst.stat1_label")&&(r.innerHTML=t("inst.stat1_label")),c&&t("inst.stat2_label")&&(c.innerHTML=t("inst.stat2_label")),m&&t("inst.stat3_label")&&(m.innerHTML=t("inst.stat3_label"));const f=Ue("seo.title_pt",e);f&&document.title&&(document.title=f);const u=Ue("seo.description_pt",e);if(u){const b=document.querySelector('meta[name="description"]');b&&(b.content=u)}}function Tt(e){if(!e)return;const t=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const At="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let le="5547999701743",Ie=`https://wa.me/${le}`;const ae=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],qt=5.7;function Be(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/qt).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let C=[],g=null,$e=[],ht=!1;y.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(ht=!0)});async function Mt(){const e=window.location.hostname;let t=null;if(e&&e!=="localhost"&&e!=="127.0.0.1"){const{data:i}=await y.from("tenants").select("id").eq("domain",e).maybeSingle();i!=null&&i.id&&(t=i.id)}let n=y.from("properties").select("*").eq("published",!0);t&&(n=n.eq("tenant_id",t));const{data:a,error:o}=await n.order("created_at",{ascending:!1});return o?(console.error("Supabase select error:",o),[]):a||[]}async function zt(){let e=y.from("properties").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="super_admin"||(g!=null&&g.tenant_id?e=e.eq("tenant_id",g.tenant_id):e=e.or("tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000"));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):(C=t||[],ca(),ma(),C)}async function Nt(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await y.from("properties").update(a).eq("id",t);if(o)throw o;const i=C.findIndex(s=>s.id===t);i>=0&&(C[i]={...C[i],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await y.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&C.unshift(t[0])}}async function jt(e){const{error:t}=await y.from("properties").delete().eq("id",e);if(t)throw t;C=C.filter(n=>n.id!==e)}async function Ht(e,t){const{error:n}=await y.auth.signInWithPassword({email:e,password:t});return!n}function Se(e,t=1200,n=.78){return new Promise((a,o)=>{const i=new Image,s=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(s);const d=document.createElement("canvas");let l=i.width,r=i.height;l>t&&(r=Math.round(r*t/l),l=t),d.width=l,d.height=r;const c=d.getContext("2d");c.drawImage(i,0,0,l,r);const m=new Image;m.crossOrigin="anonymous",m.onload=()=>{const f=Math.round(l*.18),u=Math.round(m.naturalHeight*f/m.naturalWidth),b=Math.round(l*.02),h=l-f-b,x=r-u-b;c.globalAlpha=.45,c.drawImage(m,h,x,f,u),c.globalAlpha=1,d.toBlob(v=>v?a(v):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.onerror=()=>{d.toBlob(f=>f?a(f):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},m.src="/logo.png"},i.onerror=o,i.src=s})}async function Rt(e){const t=await Se(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await y.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=y.storage.from("imoveis").getPublicUrl(n);return o}async function Ut(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await Rt(n[o]));return a}async function ke(){var m,f,u,b,h,x;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await Mt();C=n,((m=document.getElementById("selecao-carousel"))==null?void 0:m.innerHTML)===""&&Dt(n);const a=((f=document.getElementById("city-filter"))==null?void 0:f.value)||"",o=((u=document.getElementById("neighborhood-filter"))==null?void 0:u.value)||"",i=((b=document.getElementById("bedrooms-filter"))==null?void 0:b.value)||"",s=((h=document.getElementById("parking-filter"))==null?void 0:h.value)||"",d=((x=document.getElementById("construction-filter"))==null?void 0:x.value)||"",l=document.getElementById("price-slider"),r=l?parseInt(l.value,10):13e7,c=n.filter(v=>{if(a&&v.city!==a||o&&v.neighborhood!==o||i&&(i==="4+"&&Number(v.bedrooms)<4||i!=="4+"&&Number(v.bedrooms)!==Number(i))||s&&(s==="4+"&&Number(v.parking)<4||s!=="4+"&&Number(v.parking)!==Number(s))||d&&v.construction_status!==d)return!1;const E=String(v.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),I=parseInt(E,10)||0;return!(I<0||I>r)});if(e){if(!c.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=c.map(v=>{var k;const E=v.cover_image||((k=v.images)==null?void 0:k[0])||ae[0],I=[v.neighborhood,v.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${E}" alt="${p(v.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${p(v.title)}</div>
            <div class="selecao-card-loc">${p(I)}</div>
            <div class="selecao-card-price">${p(Be(v.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${v.id}" class="btn-det">Ver Detalhes</a>
              <a href="${Ie}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!c.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=c.map(v=>{var k;const E=(k=v.images)!=null&&k.length?v.images:ae,I=E.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${I}" data-idx="0" data-pid="${v.id}">
          <img src="${v.cover_image||E[0]}" alt="${p(v.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${I>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${p(v.title)}</strong>
          <div class="muted">${p(v.neighborhood||"")}, ${p(v.city||"")}</div>
          <div><strong>${p(Be(v.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${v.bedrooms||"--"} | 🚗 ${v.parking||"--"} ${I>1?"| 📸 "+I:""}</div>
          <p class="muted">${p((v.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${v.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${Ie}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(v=>{v.removeEventListener("click",it),v.addEventListener("click",it)})}function Dt(e){var o,i,s;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(d=>{var c;const l=d.cover_image||((c=d.images)==null?void 0:c[0])||ae[0],r=[d.neighborhood,d.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${l}" alt="${p(d.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${p(d.title)}</div>
          <div class="selecao-card-loc">${p(r)}</div>
          <div class="selecao-card-price">${p(Be(d.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${d.id}" class="btn-det">Ver Detalhes</a>
            <a href="${Ie}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(i=a==null?void 0:a.querySelector(".selecao-prev"))==null||i.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(s=a==null?void 0:a.querySelector(".selecao-next"))==null||s.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),ke()};function it(e){var d;e.stopPropagation();const t=e.currentTarget.closest(".carousel-wrap");if(!t)return;const n=parseInt(t.dataset.total,10);if(!n)return;let a=parseInt(t.dataset.idx,10)||0;const o=e.currentTarget.classList.contains("carousel-next")?1:-1;a=(a+o+n)%n,t.dataset.idx=a;const i=parseInt(t.dataset.pid,10),s=C.find(l=>l.id===i);(d=s==null?void 0:s.images)!=null&&d.length&&(t.querySelector(".carousel-img").src=s.images[a])}function Ot(){const e=document.getElementById("price-slider"),t=document.getElementById("price-label");!e||!t||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",t.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);t.textContent="Até R$ "+n.toLocaleString("pt-BR"),ke()}))}function Pt(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=ie();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${p(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=ie().find(i=>i.name===e.value),o=a?et(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(i=>`<option value="${i.name}">${p(i.name)}</option>`).join(""),ke()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",ke)})}function Le(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var s;const a=n.cover_image||((s=n.images)==null?void 0:s[0])||ae[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",i=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${p(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${p(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+p(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${p(o)}</td>
      <td class="cell-price">${p(Be(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${i}</td>
      <td>
        <div class="action-btns">
          ${(g==null?void 0:g.role)==="admin"||(g==null?void 0:g.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(g==null?void 0:g.role)==="admin"||(g==null?void 0:g.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function Ft(){const e=document.getElementById("f-city");if(!e)return;const t=ie(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${p(a.name)}</option>`).join(""),n&&(e.value=n)}function Xt(){var e,t,n,a,o,i,s,d,l,r,c,m,f,u,b;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((i=document.getElementById("f-condominium"))==null?void 0:i.value)||"").trim().toLowerCase(),priceMin:parseFloat((s=document.getElementById("f-price-min"))==null?void 0:s.value)||0,priceMax:parseFloat((d=document.getElementById("f-price-max"))==null?void 0:d.value)||1/0,areaMin:parseFloat((l=document.getElementById("f-area-min"))==null?void 0:l.value)||0,areaMax:parseFloat((r=document.getElementById("f-area-max"))==null?void 0:r.value)||1/0,construction:((c=document.getElementById("f-construction"))==null?void 0:c.value)||"",published:((m=document.getElementById("f-published"))==null?void 0:m.value)||"",bedrooms:((f=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:f.dataset.val)||"",suites:((u=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:u.dataset.val)||"",parking:((b=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:b.dataset.val)||""}}function Qe(e){const t=Xt();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const i=parseFloat(a.area)||0;return!(t.areaMin>0&&i<t.areaMin||t.areaMax<1/0&&i>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Te(){if(!document.getElementById("admin-properties"))return;const e=await zt(),t=e.length,n=e.filter(s=>s.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),i=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),i&&(i.textContent="—"),Ft(),Le(C)}let j=null,te="";function Fe(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Ce(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function Ae(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===te?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{te=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function Pe(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{var l;n.preventDefault();const a=new FormData(e),o=a.getAll("images");let i=[];const s=o.filter(r=>r.size>0);if(s.length){t.disabled=!0,t.textContent=`Enviando 0/${s.length} foto…`;try{i=await Ut(s,(r,c)=>{t.textContent=`Enviando ${r}/${c} foto…`})}catch(r){console.error("Erro no upload:",r),t.disabled=!1,t.textContent=j?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(j){const r=C.find(c=>c.id===j);r!=null&&r.images&&(i=r.images)}i.length||(i=[...ae]);const d={...j?{id:j}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:i,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:te||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",tenant_id:j?((l=C.find(r=>r.id===j))==null?void 0:l.tenant_id)??(g==null?void 0:g.tenant_id)??null:(g==null?void 0:g.tenant_id)??null};try{await Nt(d),j=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const r=document.getElementById("adminPublished");r&&(r.value="true");const c=document.getElementById("adminNeighborhood");c&&(c.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),te="",Ae([]),Ce(),await Te()}catch(r){console.error(r),t.disabled=!1,t.textContent=j?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((r==null?void 0:r.message)||JSON.stringify(r)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await jt(o),await Te()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((g==null?void 0:g.role)!=="admin"&&(g==null?void 0:g.role)!=="super_admin")return;const o=Number(n.target.dataset.id);if(!o)return;const i=C.find(l=>l.id===o);if(!i)return;j=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=i.title||"",e.querySelector('[name="rua"]').value=i.rua||"",e.querySelector('[name="numero"]').value=i.numero||"",e.querySelector('[name="city"]').value=i.city||"",e.querySelector('[name="price"]').value=i.price||"",e.querySelector('[name="bedrooms"]').value=i.bedrooms||"",e.querySelector('[name="suites"]').value=i.suites||"",e.querySelector('[name="area"]').value=i.area||"",e.querySelector('[name="parking"]').value=i.parking||"",e.querySelector('[name="description"]').value=i.description||"",e.querySelector('[name="construction_status"]').value=i.construction_status||"",e.querySelector('[name="owner_name"]').value=i.owner_name||"",e.querySelector('[name="owner_phone"]').value=i.owner_phone||"",e.querySelector('[name="owner_email"]').value=i.owner_email||"",e.querySelector('[name="owner_notes"]').value=i.owner_notes||"",e.querySelector('[name="condominium"]').value=i.condominium||"";const s=document.getElementById("adminPublished");s&&(s.value=i.published===!0?"true":"false");const d=document.getElementById("adminCitySelect");d&&(d.value=i.city||"",d.dispatchEvent(new Event("change")),setTimeout(()=>{const l=document.getElementById("adminNeighborhood");l&&(l.value=i.neighborhood||"")},50)),te=i.cover_image||((a=i.images)==null?void 0:a[0])||"",Ae(i.images||[]),Fe("Editar Imóvel")}})}function p(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let Y=[],O=0;function Gt(e){var m,f;const t=document.getElementById("view-modal-edit");t&&(t.dataset.pid=e.id),document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const n=document.getElementById("view-status-badge");e.published?(n.textContent="● Publicado",n.className="badge badge-green"):(n.textContent="○ Rascunho",n.className="badge badge-gray");const a=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=a.length?`📍 ${a.join(", ")}`:"";const o=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.join(" "))}`;document.getElementById("view-map-link").href=o,document.getElementById("view-directions-link").href=o;const i=((m=e.images)==null?void 0:m[0])||ae[0];document.getElementById("view-thumb-preview").src=i,Y=(f=e.images)!=null&&f.length?e.images:ae,O=0,qe(),document.getElementById("view-price").textContent=Be(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const s=document.getElementById("view-condominium-item"),d=document.getElementById("view-condominium");d&&(d.textContent=e.condominium||""),s&&(s.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(u=>u.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const l="https://omarcorretor.com.br/property.html?id="+e.id,r=document.getElementById("share-link-input");r&&(r.value=l);const c=document.getElementById("share-panel");c&&(c.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function _e(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function qe(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=Y[O],e.alt=`Foto ${O+1}`;const i=Y.length>1;n.style.display=i?"flex":"none",a.style.display=i?"flex":"none",t.textContent=i?`${O+1} / ${Y.length}`:"",o.innerHTML=i?Y.map((s,d)=>`<img src="${s}" class="view-thumb${d===O?" active":""}" data-i="${d}" alt="Foto ${d+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(s=>{s.addEventListener("click",()=>{O=+s.dataset.i,qe()})})}async function st(e){const{data:t}=await y.from("profiles").select("*").eq("id",e).maybeSingle();return t}function Me(e){var m,f;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const i=(e==null?void 0:e.name)||"Sem nome",s=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=i,o&&(o.textContent=s),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((m=i[0])==null?void 0:m.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const d=document.getElementById("avatar-dd-name"),l=document.getElementById("avatar-dd-role"),r=document.getElementById("avatar-dd-img"),c=document.getElementById("avatar-dd-initial");d&&(d.textContent=i),l&&(l.textContent=s),e!=null&&e.avatar_url&&r?(r.src=e.avatar_url,r.style.display="",c&&(c.style.display="none")):(c&&(c.textContent=((f=i[0])==null?void 0:f.toUpperCase())||"?",c.style.display=""),r&&(r.style.display="none"))}function ne(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),F(),e==="contatos"&&ia(),e==="funil"&&Yt(),e==="tarefas"&&Qt()}function lt(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:ua,visual:ga,"site-config":va,"crm-config":fa,integracoes:ya,midia:ba}).forEach(([a,o])=>{const i=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);i&&i.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>ha(),{once:!0}),window.lucide&&lucide.createIcons()}}function F(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function Vt(){var a,o,i;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",s=>{s.target===t&&n()}),(i=document.getElementById("cp-save"))==null||i.addEventListener("click",async()=>{var m,f;const s=((m=document.getElementById("cp-new"))==null?void 0:m.value)||"",d=((f=document.getElementById("cp-confirm"))==null?void 0:f.value)||"",l=document.getElementById("cp-msg"),r=document.getElementById("cp-save");if(l.style.display="none",s.length<6){l.style.color="#ef4444",l.textContent="Mínimo 6 caracteres.",l.style.display="";return}if(s!==d){l.style.color="#ef4444",l.textContent="As senhas não coincidem.",l.style.display="";return}r.disabled=!0,r.textContent="Salvando…";const{error:c}=await y.auth.updateUser({password:s});if(r.disabled=!1,r.textContent="Salvar Senha",c){l.style.color="#ef4444",l.textContent="Erro: "+c.message,l.style.display="";return}l.style.color="#16a34a",l.textContent="✅ Senha alterada com sucesso!",l.style.display="",setTimeout(n,1500)})}function Wt(){var i,s,d,l,r;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((i=document.getElementById("topnav-avatar-img"))==null?void 0:i.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(s=document.getElementById("cph-close"))==null||s.addEventListener("click",o),(d=document.getElementById("cph-cancel"))==null||d.addEventListener("click",o),t.addEventListener("click",c=>{c.target===t&&o()}),(l=document.getElementById("cph-file"))==null||l.addEventListener("change",c=>{const m=c.target.files[0];if(!m)return;const f=URL.createObjectURL(m),u=document.getElementById("cph-preview"),b=document.getElementById("cph-initial");u&&(u.src=f,u.style.display=""),b&&(b.style.display="none"),document.getElementById("cph-save").disabled=!1}),(r=document.getElementById("cph-save"))==null||r.addEventListener("click",async()=>{var u;const c=(u=document.getElementById("cph-file"))==null?void 0:u.files[0];if(!c)return;const m=document.getElementById("cph-save"),f=document.getElementById("cph-msg");m.disabled=!0,m.textContent="Salvando…";try{const b=await Se(c,400,.85),h=`avatars/${g.id}-${Date.now()}.jpg`,{error:x}=await y.storage.from("imoveis").upload(h,b,{contentType:"image/jpeg",upsert:!0});if(x)throw x;const{data:{publicUrl:v}}=y.storage.from("imoveis").getPublicUrl(h);await y.from("profiles").update({avatar_url:v}).eq("id",g.id),g={...g,avatar_url:v},Me(g),o()}catch(b){f.style.color="#ef4444",f.textContent="Erro: "+b.message,f.style.display="",m.disabled=!1,m.textContent="Salvar Foto"}})}function Jt(){var a,o,i;const e=document.getElementById("add-corretor-modal-root");e&&e.remove();const t=document.createElement("div");t.id="add-corretor-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("ac-close"))==null||a.addEventListener("click",n),(o=document.getElementById("ac-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",s=>{s.target===t&&n()}),(i=document.getElementById("ac-save"))==null||i.addEventListener("click",async()=>{var c,m;const s=(c=document.getElementById("ac-email"))==null?void 0:c.value.trim(),d=(m=document.getElementById("ac-password"))==null?void 0:m.value.trim(),l=document.getElementById("ac-save"),r=document.getElementById("ac-note");if(!s){alert("Informe o e-mail do corretor.");return}if(!d||d.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}l.disabled=!0,l.textContent="Criando…",r.style.display="none";try{const f=await ge({email:s,password:d,tenant_id:(g==null?void 0:g.tenant_id)||null});l.disabled=!1,l.textContent="+ Criar Acesso",f.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",f.email_sent===!1?(r.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${p(s)}<br><strong>Senha:</strong> ${p(d)}`,r.style.color="#0f172a"):(r.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",r.style.color="#16a34a"),r.style.display=""):alert("Erro: "+(f.error||"Falha desconhecida"))}catch(f){l.disabled=!1,l.textContent="+ Criar Acesso",alert("Erro: "+f.message)}})}function dt(){var i,s,d,l,r,c,m,f,u,b,h;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",x=>{var E;x.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(E=document.getElementById("notif-dropdown"))==null||E.classList.add("hidden")}),(i=document.getElementById("avatar-dd-change-photo"))==null||i.addEventListener("click",x=>{x.stopPropagation(),F(),Wt()}),(s=document.getElementById("avatar-dd-change-pass"))==null||s.addEventListener("click",x=>{x.stopPropagation(),F(),Vt()}),(d=document.getElementById("avatar-dd-add-corretor"))==null||d.addEventListener("click",x=>{x.stopPropagation(),F(),Jt()}),(l=document.getElementById("avatar-dd-settings"))==null||l.addEventListener("click",x=>{x.stopPropagation(),F(),ne("settings")}),(r=document.getElementById("avatar-dd-logout"))==null||r.addEventListener("click",async x=>{x.stopPropagation(),await y.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",x=>{var E;x.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((E=document.getElementById("avatar-dropdown"))==null||E.classList.add("hidden"),ta())}),(c=document.getElementById("notif-mark-all"))==null||c.addEventListener("click",()=>{aa(),F()}),(m=document.getElementById("btn-search-open"))==null||m.addEventListener("click",()=>{var x,v;(x=document.getElementById("search-overlay"))==null||x.classList.remove("hidden"),(v=document.getElementById("search-input"))==null||v.focus()}),(f=document.getElementById("search-overlay-close"))==null||f.addEventListener("click",()=>{var x;(x=document.getElementById("search-overlay"))==null||x.classList.add("hidden")}),(u=document.getElementById("search-overlay"))==null||u.addEventListener("click",x=>{x.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(b=document.getElementById("search-input"))==null||b.addEventListener("input",x=>{clearTimeout(o),o=setTimeout(()=>ea(x.target.value.trim()),280)}),(h=document.getElementById("search-input"))==null||h.addEventListener("keydown",x=>{var v;x.key==="Escape"&&((v=document.getElementById("search-overlay"))==null||v.classList.add("hidden"))}),document.addEventListener("click",F)}let Xe=!1,Z=[],Ze=[],ze=[],Ge={},xt=[],K=null,he=null,U={search:"",tags:new Set,status:""};async function Yt(){var t;if(Xe){await rt();return}Xe=!0,await rt(),(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>We());const e=document.getElementById("funil-pipe-sel");e==null||e.addEventListener("change",async()=>{K=parseInt(e.value,10),await Ne()})}function Ve(e){var i;const t=document.getElementById("kanban-filters");if(!t)return;t.style.display="block";const n=document.getElementById("kf-status");n&&(n.innerHTML='<option value="">Todos os status</option>'+xt.map(s=>`<option value="${p(s.name)}">${p(s.name)}</option>`).join(""),n.value=U.status,n.onchange=()=>{U.status=n.value,de()});const a=document.getElementById("kf-tags");if(a){if(!e.length){a.style.display="none";return}a.style.display="flex",a.innerHTML=e.map(s=>{const d=U.tags.has(s.name);return`<button class="kf-tag-btn" data-tag="${p(s.name)}"
        style="padding:4px 12px;border-radius:20px;border:1.5px solid ${s.color};
               background:${d?s.color:s.color+"18"};
               color:${d?"#fff":s.color};
               font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;">
        ${p(s.name)}
      </button>`}).join(""),a.querySelectorAll(".kf-tag-btn").forEach(s=>{s.addEventListener("click",()=>{const d=s.dataset.tag;U.tags.has(d)?U.tags.delete(d):U.tags.add(d),Ve(e),de()})})}const o=document.getElementById("kf-search");o&&(o.value=U.search,o.oninput=()=>{U.search=o.value.toLowerCase(),de()}),(i=document.getElementById("kf-clear"))==null||i.addEventListener("click",()=>{U={search:"",tags:new Set,status:""},Ve(e),de()})}async function rt(){const e=H(),[{data:t},{data:n},{data:a}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",e).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",e).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",e).order("sort_order")]);Z=t||[],xt=a||[],Ge={},(n||[]).forEach(d=>{Ge[d.name]=d});const o=Z.map(d=>d.id),{data:i}=o.length?await y.from("crm_stages").select("*").in("pipeline_id",o).order("sort_order"):{data:[]};Ze=i||[],Ve(n||[]);const s=document.getElementById("funil-pipe-sel");if(s){const d=K;s.innerHTML=Z.length?Z.map(r=>`<option value="${r.id}">${p(r.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const l=Z.find(r=>r.id===d)||Z.find(r=>r.is_default)||Z[0];l?(s.value=l.id,K=l.id):K=null}await Ne()}async function Ne(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=y.from("leads").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id)),K&&(t=t.eq("pipeline_id",K));const{data:n}=await t;ze=n||[],de()}function de(){const e=document.getElementById("kanban-board");if(!e)return;const t=Ze.filter(i=>i.pipeline_id===K);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n=U,a=ze.filter(i=>{if(n.search&&!`${i.name||""} ${i.phone||""} ${i.email||""}`.toLowerCase().includes(n.search)||n.status&&i.status!==n.status)return!1;if(n.tags.size>0){const s=Array.isArray(i.tags)?i.tags:[];if(![...n.tags].every(d=>s.includes(d)))return!1}return!0}),o={};t.forEach(i=>{o[i.name]=[]}),a.forEach(i=>{var d,l,r,c;const s=i.stage||((d=t[0])==null?void 0:d.name);o[s]||(o[((l=t[0])==null?void 0:l.name)||""]=[]),(c=o[s]||o[(r=t[0])==null?void 0:r.name])==null||c.push(i)}),e.innerHTML=t.map(i=>{const s=o[i.name]||[],d=s.length?s.map(l=>`
        <div class="kanban-card" draggable="true" data-id="${l.id}" data-stage="${p(i.name)}" style="cursor:pointer;">
          <div class="kanban-card-name">${p(l.name||"—")}</div>
          ${l.phone?`<div class="kanban-card-info">📞 ${p(l.phone)}</div>`:""}
          ${l.email?`<div class="kanban-card-info" style="font-size:11px;color:#94a3b8;">✉ ${p(l.email)}</div>`:""}
          ${l.notes?`<div class="kanban-card-info" style="font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">📝 ${p(l.notes)}</div>`:""}
          <div class="kanban-card-tags" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">
            ${l.source?`<span class="kanban-card-tag">${p(l.source)}</span>`:""}
            ${Array.isArray(l.tags)?l.tags.map(r=>{const c=Ge[r],m=(c==null?void 0:c.color)||"#0369a1";return`<span class="kanban-card-tag" style="background:${m}18;color:${m};border:1px solid ${m}44;">${p(r)}</span>`}).join(""):""}
          </div>
        </div>`).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${p(i.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${i.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${i.color||"#2563eb"}"></div>
            ${p(i.name)}
          </div>
          <span class="kanban-col-count">${s.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${p(i.name)}">${d}</div>
        <button class="kanban-add-btn" data-stage="${p(i.name)}">+ Adicionar lead</button>
      </div>`}).join(""),Kt(),window.lucide&&lucide.createIcons()}function Kt(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>We())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=ze.find(a=>String(a.id)===String(t.dataset.id));n&&We(n)}),t.addEventListener("dragstart",n=>{he=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!he||!a)return;await y.from("leads").update({stage:a}).eq("id",he);const o=ze.find(i=>String(i.id)===String(he));o&&(o.stage=a),he=null,de()})}))}async function We(e=null){var r,c;(r=document.getElementById("lead-detail-panel"))==null||r.remove();const t=!e,n=H(),{data:a}=await y.from("crm_tags").select("*").eq("tenant_id",n).order("name"),{data:o}=await y.from("crm_lead_statuses").select("*").eq("tenant_id",n).order("sort_order"),i=Ze.filter(m=>m.pipeline_id===K).map(m=>`<option value="${p(m.name)}" ${(e==null?void 0:e.stage)===m.name?"selected":""}>${p(m.name)}</option>`).join(""),s=((e==null?void 0:e.phone)||"").replace(/\D/g,""),d=document.createElement("div");d.id="lead-detail-panel",d.style.cssText="position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:#fff;box-shadow:-4px 0 32px rgba(0,0,0,.15);z-index:1000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;",d.innerHTML=`
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
  `,document.body.appendChild(d),requestAnimationFrame(()=>{d.style.transform="translateX(0)"});const l=()=>{d.style.transform="translateX(100%)",setTimeout(()=>d.remove(),250)};document.getElementById("ldp-close").addEventListener("click",l),document.getElementById("ldp-save").addEventListener("click",async()=>{var v,E;const m=document.getElementById("ldp-save"),f=document.getElementById("ldp-msg"),u=document.getElementById("ldp-name").value.trim();if(!u){f.style.color="#ef4444",f.textContent="Nome é obrigatório.";return}m.disabled=!0,m.textContent="Salvando…";const b=[...d.querySelectorAll("input[type=checkbox]:checked")].map(I=>I.value),h={name:u,phone:document.getElementById("ldp-phone").value.trim()||null,email:document.getElementById("ldp-email").value.trim()||null,source:document.getElementById("ldp-source").value.trim()||null,stage:((v=document.getElementById("ldp-stage"))==null?void 0:v.value)||null,status:((E=document.getElementById("ldp-status"))==null?void 0:E.value)||null,notes:document.getElementById("ldp-notes").value.trim()||null,tags:b,tenant_id:H()};let x;if(t?{error:x}=await y.from("leads").insert(h):{error:x}=await y.from("leads").update(h).eq("id",e.id),m.disabled=!1,m.textContent="💾 Salvar",x){f.style.color="#ef4444",f.textContent="Erro: "+x.message;return}f.style.color="#22c55e",f.textContent="✅ Salvo!",setTimeout(()=>{l(),Ne()},700)}),(c=document.getElementById("ldp-delete"))==null||c.addEventListener("click",async()=>{confirm(`Excluir o lead "${e==null?void 0:e.name}"?`)&&(await y.from("leads").delete().eq("id",e.id),l(),Ne())})}let z=[],ct=!1,re="pending";async function Qt(){var e;ct||(ct=!0,await Zt(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>wt()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),re=t.dataset.filter,ue()})}))}async function Zt(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=y.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}z=n||[],ue()}function Et(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function ue(){const e=document.getElementById("tarefas-list");if(!e)return;let t=z;if(re==="pending"&&(t=z.filter(a=>a.status!=="done")),re==="done"&&(t=z.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${re==="done"?"✅":"📋"}</div>
      <p>${re==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=Et(a.due_date),i=o?o.toLocaleDateString("pt-BR"):"",s=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${p(a.title)}</div>
          <div class="tarefa-meta">
            ${i?`<span style="${s?"color:#ef4444;":""}">📅 ${i}${s?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${p(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const i=a.dataset.id,s=a.checked?"done":"pending";await y.from("tasks").update({status:s}).eq("id",i);const d=z.find(l=>String(l.id)===i);d&&(d.status=s),ue()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await y.from("tasks").delete().eq("id",a.dataset.id),z=z.filter(i=>String(i.id)!==String(a.dataset.id)),ue())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const i=a.dataset.id,s=z.find(d=>String(d.id)===i);s&&wt(s)})})}function wt(e=null){var l,r,c,m;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=Et(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const i=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",s=document.createElement("div");s.id="tarefa-modal-root",s.className="modal-backdrop",s.innerHTML=`
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
  `,document.body.appendChild(s);const d=()=>s.remove();(l=document.getElementById("tm-close"))==null||l.addEventListener("click",d),(r=document.getElementById("tm-cancel"))==null||r.addEventListener("click",d),s.addEventListener("click",f=>{f.target===s&&d()}),(c=document.getElementById("tm-toggle-done"))==null||c.addEventListener("click",async()=>{const f=a?"pending":"done";await y.from("tasks").update({status:f}).eq("id",e.id);const u=z.find(b=>String(b.id)===String(e.id));u&&(u.status=f),d(),f==="done"&&(re="done",document.querySelectorAll(".tarefa-filter-btn").forEach(b=>{b.classList.toggle("active",b.dataset.filter==="done")})),ue()}),(m=document.getElementById("tm-save"))==null||m.addEventListener("click",async()=>{var v,E;const f=document.getElementById("tarefa-form");if(!f.checkValidity()){f.reportValidity();return}const u=new FormData(f),b=document.getElementById("tm-save");b.disabled=!0,b.textContent="Salvando…";const h={title:(v=u.get("title"))==null?void 0:v.trim(),description:((E=u.get("description"))==null?void 0:E.trim())||null,due_date:u.get("due_date")||null,priority:u.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null};let x;if(n){if({error:x}=await y.from("tasks").update(h).eq("id",e.id),!x){const I=z.findIndex(k=>String(k.id)===String(e.id));I>=0&&(z[I]={...z[I],...h})}}else{const{data:I,error:k}=await y.from("tasks").insert(h).select();x=k,!x&&(I!=null&&I[0])&&z.unshift(I[0])}if(b.disabled=!1,b.textContent=n?"Salvar":"Criar Tarefa",x){alert("Erro: "+x.message);return}d(),ue()})}async function ea(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;g==null||g.role,g==null||g.tenant_id;const[{data:a},{data:o}]=await Promise.all([y.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),y.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),i=[];a!=null&&a.length&&(i.push('<div class="search-group-label">Imóveis</div>'),i.push(...a.map(s=>`
      <div class="search-result-item" data-type="property" data-id="${s.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${p(s.title||"—")}</div>
          <div class="search-result-sub">${p(s.reference||"")} · ${p(s.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(i.push('<div class="search-group-label">Leads / Contatos</div>'),i.push(...o.map(s=>`
      <div class="search-result-item" data-type="lead" data-id="${s.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${p(s.name||"—")}</div>
          <div class="search-result-sub">${p(s.email||s.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=i.length?i.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(s=>{s.addEventListener("click",()=>{var d;(d=document.getElementById("search-overlay"))==null||d.classList.add("hidden"),s.dataset.type==="lead"?ne("contatos"):ne("properties")})})}let X=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function ta(){var s;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=y.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(d=>!X.includes(String(d.id))),i=document.getElementById("notif-badge");if(i&&(i.textContent=o.length,o.length>0?i.classList.remove("hidden"):i.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(d=>{const l=na(d.created_at);return`
      <div class="notif-item${!X.includes(String(d.id))?" unread":""}" data-id="${d.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${p(d.name||"—")}</div>
          <div class="notif-item-sub">${p(d.phone||d.source||"")} · ${l}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(s=document.getElementById("notif-see-all"))==null||s.addEventListener("click",d=>{d.preventDefault(),F(),ne("contatos")}),e.querySelectorAll(".notif-item").forEach(d=>{d.addEventListener("click",()=>{X.push(d.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(X)),d.classList.remove("unread"),F(),ne("contatos")})})}function aa(){var e;document.querySelectorAll(".notif-item").forEach(t=>X.push(t.dataset.id)),X=[...new Set(X)],localStorage.setItem("crm_notifs_read",JSON.stringify(X)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function na(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function oa(){let e=y.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);g!=null&&g.tenant_id&&(e=e.eq("tenant_id",g.tenant_id));const{data:t}=await e,a=(t||[]).filter(i=>!X.includes(String(i.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let D=[],M=1;const xe=10;let mt=!1;async function ia(){var t,n,a,o,i,s,d,l,r;document.getElementById("section-contatos")&&(mt||(mt=!0,await It(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{M=1,oe()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",c=>{c.key==="Enter"&&(M=1,oe())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>Bt()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",da),(i=document.getElementById("import-modal-close"))==null||i.addEventListener("click",Je),(s=document.getElementById("import-modal-cancel"))==null||s.addEventListener("click",Je),(d=document.getElementById("download-template"))==null||d.addEventListener("click",c=>{c.preventDefault();const m=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,f=new Blob([m],{type:"text/csv"}),u=document.createElement("a");u.href=URL.createObjectURL(f),u.download="modelo_contatos.csv",u.click()}),(l=document.getElementById("import-csv-file"))==null||l.addEventListener("change",sa),(r=document.getElementById("import-modal-confirm"))==null||r.addEventListener("click",la)))}async function It(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=y.from("leads").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:a}=await t;D=a||[],oe()}function oe(){var d,l,r;const e=(((d=document.getElementById("contato-search"))==null?void 0:d.value)||"").toLowerCase(),t=e?D.filter(c=>(c.name||"").toLowerCase().includes(e)||(c.email||"").toLowerCase().includes(e)||(c.phone||"").toLowerCase().includes(e)):D,n=t.length,a=Math.max(1,Math.ceil(n/xe));M>a&&(M=a);const o=t.slice((M-1)*xe,M*xe),i=document.getElementById("contatos-tbody");if(!i)return;o.length?i.innerHTML=o.map(c=>`
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
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${c.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):i.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const s=document.getElementById("contatos-pagination");if(s){const c=n===0?0:(M-1)*xe+1,m=Math.min(M*xe,n);s.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${c}–${m}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${M<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${M} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${M>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(l=s.querySelector("#pag-prev"))==null||l.addEventListener("click",()=>{M--,oe()}),(r=s.querySelector("#pag-next"))==null||r.addEventListener("click",()=>{M++,oe()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(c=>{c.addEventListener("click",m=>{m.preventDefault();const f=c.dataset.id,u=D.find(b=>String(b.id)===String(f));u&&Bt(u)})})}async function Bt(e=null){var v,E,I,k,S,$;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=H(),[{data:o},{data:i},{data:s}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",a).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",a).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",a).order("sort_order")]),d=o||[],l=i||[],r=s||[],c=d.map(w=>w.id),{data:m}=c.length?await y.from("crm_stages").select("*").in("pipeline_id",c).order("sort_order"):{data:[]},f=m||[],u=(e==null?void 0:e.pipeline_id)||((v=d[0])==null?void 0:v.id)||"";function b(w){const B=f.filter(L=>L.pipeline_id===w);return B.length?'<option value="">— Selecionar etapa —</option>'+B.map(L=>`<option value="${p(L.name)}" ${(e==null?void 0:e.stage)===L.name?"selected":""}>${p(L.name)}</option>`).join(""):'<option value="">— Nenhuma etapa —</option>'}const h=document.createElement("div");h.id="contato-modal-root",h.className="modal-backdrop",h.innerHTML=`
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

          ${d.length?`
          <div style="border-top:1px solid #f1f5f9;margin:8px 0 12px;padding-top:14px;">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;margin-bottom:10px;">FUNIL DE NEGOCIAÇÃO</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Funil</label>
                <select id="cm-pipe" name="pipeline_id" class="form-control">
                  <option value="">— Sem funil —</option>
                  ${d.map(w=>`<option value="${w.id}" ${String(e==null?void 0:e.pipeline_id)===String(w.id)?"selected":""}>${p(w.name)}</option>`).join("")}
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

          ${l.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Tags</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                ${l.map(w=>`
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
  `,document.body.appendChild(h);const x=()=>h.remove();(E=document.getElementById("cm-close"))==null||E.addEventListener("click",x),(I=document.getElementById("cm-cancel"))==null||I.addEventListener("click",x),h.addEventListener("click",w=>{w.target===h&&x()}),(k=document.getElementById("cm-pipe"))==null||k.addEventListener("change",w=>{const B=document.getElementById("cm-stage");B&&(B.innerHTML=b(w.target.value))}),(S=document.getElementById("cm-delete"))==null||S.addEventListener("click",async()=>{if(!confirm(`Excluir o contato "${e==null?void 0:e.name}"?`))return;await y.from("leads").delete().eq("id",e.id);const w=D.findIndex(B=>String(B.id)===String(e.id));w>=0&&D.splice(w,1),x(),oe()}),($=document.getElementById("cm-save"))==null||$.addEventListener("click",async()=>{var G,V,W,ve,fe,ye,be;const w=document.getElementById("contato-form");if(!w.checkValidity()){w.reportValidity();return}const B=new FormData(w),L=document.getElementById("cm-save");L.disabled=!0,L.textContent="Salvando…";const _=B.getAll("tag"),T=B.get("pipeline_id")||null,N={name:(G=B.get("name"))==null?void 0:G.trim(),company:((V=B.get("company"))==null?void 0:V.trim())||null,email:((W=B.get("email"))==null?void 0:W.trim())||null,phone:((ve=B.get("phone"))==null?void 0:ve.trim())||null,job_title:((fe=B.get("job_title"))==null?void 0:fe.trim())||null,city_interest:((ye=B.get("city_interest"))==null?void 0:ye.trim())||null,notes:((be=B.get("notes"))==null?void 0:be.trim())||null,pipeline_id:T,stage:B.get("stage")||null,status:B.get("status")||null,tags:_,assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null,source:(e==null?void 0:e.source)||"manual"};let A;if(n){if({error:A}=await y.from("leads").update(N).eq("id",e.id),!A){const R=D.findIndex(se=>String(se.id)===String(e.id));R>=0&&(D[R]={...D[R],...N})}}else{const{data:R,error:se}=await y.from("leads").insert(N).select();A=se,!A&&(R!=null&&R[0])&&D.unshift(R[0])}if(L.disabled=!1,L.textContent=n?"Salvar":"Criar Contato",A){alert("Erro: "+A.message);return}x(),oe()})}let me=[];function sa(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{me=a.target.result.split(`
`).filter(d=>d.trim()).slice(1).map(d=>{const[l,r,c,m,f]=d.split(",").map(u=>u.trim().replace(/^"|"$/g,""));return{name:l,email:r,phone:c,company:m,job_title:f}}).filter(d=>d.name);const i=document.getElementById("import-preview");i&&(i.textContent=`${me.length} contato(s) encontrados para importar.`);const s=document.getElementById("import-modal-confirm");s&&(s.disabled=me.length===0)},n.readAsText(t)}async function la(){if(!me.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=me.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null})),{error:n}=await y.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Je(),await It(),alert(`${t.length} contato(s) importados com sucesso!`)}function da(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),me=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Je(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const ra="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function ge(e){return(await fetch(ra,{method:"POST",headers:{Authorization:`Bearer ${At}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function pt(e){var l,r,c,m;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),i=document.getElementById("settings-avatar-input"),s=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:f}}=await y.auth.getUser();n.value=(f==null?void 0:f.email)||""}const d=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=d),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),i==null||i.addEventListener("change",f=>{const u=f.target.files[0];if(!u)return;const b=URL.createObjectURL(u);a&&(a.src=b,a.style.display=""),o&&(o.style.display="none")}),(l=document.getElementById("btn-change-password"))==null||l.addEventListener("click",async()=>{var v,E;const f=((v=document.getElementById("change-password-new"))==null?void 0:v.value)||"",u=((E=document.getElementById("change-password-confirm"))==null?void 0:E.value)||"",b=document.getElementById("change-password-msg"),h=document.getElementById("btn-change-password");if(b&&(b.style.display="none"),f.length<6){b&&(b.textContent="Mínimo 6 caracteres.",b.style.display="");return}if(f!==u){b&&(b.textContent="As senhas não coincidem.",b.style.display="");return}h&&(h.disabled=!0,h.textContent="Salvando…");const{error:x}=await y.auth.updateUser({password:f});h&&(h.disabled=!1,h.textContent="Salvar Nova Senha"),x?b&&(b.textContent="Erro: "+x.message,b.style.display=""):(b&&(b.style.color="#16a34a",b.textContent="Senha alterada com sucesso!",b.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),s==null||s.addEventListener("click",async()=>{var E;const f=t.value.trim();let u=(g==null?void 0:g.avatar_url)||"";const b=i==null?void 0:i.files[0],h=s.textContent;if(s.disabled=!0,s.textContent="Salvando…",b)try{const I=await Se(b,400,.85),k=`avatars/${g.id}-${Date.now()}.jpg`,{error:S}=await y.storage.from("imoveis").upload(k,I,{contentType:"image/jpeg",upsert:!0});if(!S){const{data:{publicUrl:$}}=y.storage.from("imoveis").getPublicUrl(k);u=$}}catch(I){console.error("Avatar upload:",I)}const{error:x}=await y.from("profiles").update({name:f,avatar_url:u}).eq("id",g.id);if(s.disabled=!1,s.textContent=h,x){alert("Erro ao salvar perfil.");return}g={...g,name:f,avatar_url:u},Me(g);const v=document.getElementById("settings-avatar-initial");v&&(v.textContent=((E=f[0])==null?void 0:E.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const f=document.getElementById("settings-corretores-section");f&&(f.style.display=""),await je(),(r=document.getElementById("btn-invite-corretor"))==null||r.addEventListener("click",async()=>{var E,I;const b=(E=document.getElementById("invite-email"))==null?void 0:E.value.trim(),h=(I=document.getElementById("invite-password"))==null?void 0:I.value.trim(),x=document.getElementById("btn-invite-corretor"),v=document.getElementById("invite-note");if(!b){alert("Informe o e-mail do corretor.");return}if(!h||h.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}x&&(x.disabled=!0,x.textContent="Criando…"),v&&(v.style.display="none");try{const k=await ge({email:b,password:h,tenant_id:(g==null?void 0:g.tenant_id)||null});if(k.success){const S=document.getElementById("invite-email"),$=document.getElementById("invite-password");S&&(S.value=""),$&&($.value=""),await je(),v&&(k.email_sent===!1?(v.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${p(b)}<br>
                <strong>Senha:</strong> ${p(h)}`,v.style.color="#0f172a"):(v.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",v.style.color="#16a34a"),v.style.display="")}else alert("Erro: "+(k.error||"Falha desconhecida"))}catch(k){alert("Erro ao criar acesso: "+k.message)}finally{x&&(x.disabled=!1,x.textContent="+ Criar Acesso")}});const u=document.getElementById("settings-locations-section");u&&(u.style.display=""),await Ee(),(c=document.getElementById("loc-add-city-btn"))==null||c.addEventListener("click",async()=>{const b=document.getElementById("loc-new-city"),h=b==null?void 0:b.value.trim();if(!h)return;const{error:x}=await y.from("locations").insert({type:"cidade",name:h});if(x){alert("Erro ao adicionar cidade.");return}b&&(b.value=""),await Ee(),tt()}),(m=document.getElementById("loc-add-neighborhood-btn"))==null||m.addEventListener("click",async()=>{var E;const b=parseInt((E=document.getElementById("loc-new-neighborhood-city"))==null?void 0:E.value,10),h=document.getElementById("loc-new-neighborhood"),x=h==null?void 0:h.value.trim();if(!b||!x){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:v}=await y.from("locations").insert({type:"bairro",name:x,parent_id:b});if(v){alert("Erro ao adicionar bairro.");return}h&&(h.value=""),await Ee()})}}async function je(){const e=document.getElementById("corretores-list");if(!e)return;let t=y.from("profiles").select("*").order("created_at");g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const i=(o.name||"?")[0].toUpperCase(),s=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${p(i)}</div>`,d=o.id===(g==null?void 0:g.id),l=o.active!==!1,r=l?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',c=d?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,m=d?"":l?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,f=d?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${s}
        <div>
          <div class="corretor-name">${p(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${r}
        ${c}
        ${m}
        ${f}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await y.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.uid,s=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const d=await ge({action:"toggle",userId:i,active:!s});d.success||alert("Erro: "+(d.error||"Falha desconhecida"))}catch(d){alert("Erro: "+d.message)}await je()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var d,l;const i=o.dataset.uid,s=((l=(d=o.closest(".corretor-item"))==null?void 0:d.querySelector(".corretor-name"))==null?void 0:l.textContent)||"este corretor";if(confirm(`Excluir "${s}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const r=await ge({action:"delete",userId:i});r.success||alert("Erro ao excluir: "+(r.error||"Falha desconhecida"))}catch(r){alert("Erro: "+r.message)}await je()}})})}async function $t(){const{data:e,error:t}=await y.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):($e=e||[],$e)}function ie(){return $e.filter(e=>e.type==="cidade")}function et(e){return $e.filter(t=>t.type==="bairro"&&t.parent_id===e)}function tt(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=ie();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${p(a.name)}</option>`).join(""),t&&(e.value=t)}async function Ee(){await $t();const e=ie(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(i=>`
        <div class="loc-item">
          <span class="loc-item-name">${p(i.name)}</span>
          <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=$e.filter(i=>i.type==="bairro");n.innerHTML=o.length?o.map(i=>{const s=e.find(d=>d.id===i.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${p(i.name)}</div>
              ${s?`<div class="loc-item-sub">${p(s.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(i=>`<option value="${i.id}">${p(i.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{const s=i.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${s}" e todos os bairros vinculados?`))return;const{error:d}=await y.from("locations").delete().eq("id",i.dataset.id);if(d){alert("Erro ao excluir.");return}await Ee(),tt()})}),n.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:s}=await y.from("locations").delete().eq("id",i.dataset.id);if(s){alert("Erro ao excluir.");return}await Ee()})})}function ut(){var n,a,o,i,s,d,l,r,c,m,f,u,b,h,x,v,E,I,k,S;document.querySelectorAll(".filter-btn").forEach($=>{$.addEventListener("click",()=>{const w=$.closest(".filter-btns"),B=$.classList.contains("active");w.querySelectorAll(".filter-btn").forEach(L=>L.classList.remove("active")),B||$.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var _;const $=(_=document.getElementById("f-city"))==null?void 0:_.value,w=ie().find(T=>T.name===$),B=w?et(w.id):[],L=document.getElementById("f-neighborhood");L&&(L.innerHTML='<option value="">Todos</option>'+B.map(T=>`<option value="${T.name}">${p(T.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{Le(Qe(C))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach(L=>{const _=document.getElementById(L);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach(L=>{const _=document.getElementById(L);_&&(_.value="")});const B=document.getElementById("f-neighborhood");B&&(B.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach(L=>L.classList.remove("active")),Le(C)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach($=>{$.addEventListener("click",()=>{ne($.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach($=>{$.addEventListener("click",()=>{ne($.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach($=>{$.addEventListener("click",w=>{w.stopPropagation();const B=$.closest(".topnav-dropdown");B==null||B.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(L=>{L!==B&&L.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach($=>$.classList.remove("open"))}),(i=document.getElementById("modal-close"))==null||i.addEventListener("click",Ce),(s=document.getElementById("modal-cancel"))==null||s.addEventListener("click",Ce),(d=document.getElementById("property-modal"))==null||d.addEventListener("click",$=>{$.target.id==="property-modal"&&Ce()}),(l=document.getElementById("btn-new-property"))==null||l.addEventListener("click",()=>{j=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",te="",Ae([]),Fe("Novo Imóvel")}),(r=document.getElementById("logout-btn"))==null||r.addEventListener("click",async()=>{await y.auth.signOut(),location.reload()}),(c=document.getElementById("view-prev"))==null||c.addEventListener("click",()=>{O=(O-1+Y.length)%Y.length,qe()}),(m=document.getElementById("view-next"))==null||m.addEventListener("click",()=>{O=(O+1)%Y.length,qe()}),(f=document.getElementById("view-modal-close"))==null||f.addEventListener("click",_e),(u=document.getElementById("view-modal-close2"))==null||u.addEventListener("click",_e),(b=document.getElementById("view-modal"))==null||b.addEventListener("click",$=>{$.target.id==="view-modal"&&_e()}),(h=document.getElementById("view-modal-share"))==null||h.addEventListener("click",()=>{const $=document.getElementById("share-panel");if(!$)return;const w=$.style.display!=="none";$.style.display=w?"none":"block"}),(x=document.getElementById("share-whatsapp"))==null||x.addEventListener("click",()=>{var L,_;const $=(L=document.getElementById("share-link-input"))==null?void 0:L.value;if(!$)return;const w=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",B=encodeURIComponent("Olha esse imóvel que encontrei: "+w+`
`+$);window.open("https://wa.me/?text="+B,"_blank")}),(v=document.getElementById("share-instagram"))==null||v.addEventListener("click",()=>{var w,B;const $=(w=document.getElementById("share-link-input"))==null?void 0:w.value;$&&((B=navigator.clipboard)==null||B.writeText($),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(E=document.getElementById("share-email"))==null||E.addEventListener("click",()=>{var _,T;const $=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!$)return;const w=((T=document.getElementById("view-modal-title"))==null?void 0:T.textContent)||"Imóvel",B=encodeURIComponent("Imóvel: "+w),L=encodeURIComponent(`Olá! Segue o link do imóvel:

`+$);window.open("mailto:?subject="+B+"&body="+L,"_blank")}),(I=document.getElementById("share-copy"))==null||I.addEventListener("click",()=>{var w;const $=document.getElementById("share-link-input");$&&((w=navigator.clipboard)==null||w.writeText($.value).then(()=>{const B=document.getElementById("share-copy"),L=B.textContent;B.textContent="✅ Copiado!",setTimeout(()=>{B.textContent=L},2e3)}))}),(k=document.getElementById("view-modal-edit"))==null||k.addEventListener("click",()=>{var N;if((g==null?void 0:g.role)!=="admin"&&(g==null?void 0:g.role)!=="super_admin")return;const $=Number(document.getElementById("view-modal-edit").dataset.pid),w=C.find(A=>A.id===$);if(!w)return;_e(),j=w.id;const B=document.getElementById("property-form"),L=document.getElementById("form-submit-btn");L.textContent="Salvar Alterações",B.querySelector('[name="title"]').value=w.title||"",B.querySelector('[name="rua"]').value=w.rua||"",B.querySelector('[name="numero"]').value=w.numero||"",B.querySelector('[name="city"]').value=w.city||"",B.querySelector('[name="price"]').value=w.price||"",B.querySelector('[name="bedrooms"]').value=w.bedrooms||"",B.querySelector('[name="suites"]').value=w.suites||"",B.querySelector('[name="parking"]').value=w.parking||"",B.querySelector('[name="description"]').value=w.description||"",B.querySelector('[name="construction_status"]').value=w.construction_status||"",B.querySelector('[name="owner_name"]').value=w.owner_name||"",B.querySelector('[name="owner_phone"]').value=w.owner_phone||"",B.querySelector('[name="owner_email"]').value=w.owner_email||"",B.querySelector('[name="owner_notes"]').value=w.owner_notes||"",B.querySelector('[name="condominium"]').value=w.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=w.published===!0?"true":"false");const T=document.getElementById("adminCitySelect");T&&(T.value=w.city||"",T.dispatchEvent(new Event("change")),setTimeout(()=>{const A=document.getElementById("adminNeighborhood");A&&(A.value=w.neighborhood||"")},50)),te=w.cover_image||((N=w.images)==null?void 0:N[0])||"",Ae(w.images||[]),Fe("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach($=>{$.addEventListener("click",()=>{var w;document.querySelectorAll(".tab-btn").forEach(B=>B.classList.remove("active")),$.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(B=>B.classList.add("hidden")),(w=document.getElementById(`tab-${$.dataset.tab}`))==null||w.classList.remove("hidden")})}),(S=document.getElementById("admin-properties"))==null||S.addEventListener("click",$=>{if($.target.closest(".action-btns"))return;const w=$.target.closest("tr");if(!w)return;const B=Number(w.dataset.id);if(!B)return;const L=C.find(_=>_.id===B);L&&Gt(L)})}document.addEventListener("DOMContentLoaded",async()=>{var s,d,l;const e=window.location.hostname;if(e&&e!=="localhost"&&e!=="127.0.0.1"){const{data:r}=await y.from("tenants").select("id").eq("domain",e).maybeSingle();r!=null&&r.id&&Re(r.id)}await Promise.all([_t(),$t()]),le=ee("company.whatsapp",le),Ie=`https://wa.me/${le}`,Ke(),Ot(),Pt();const t=document.getElementById("adminCitySelect"),n=document.getElementById("adminNeighborhood");t&&n&&(tt(),t.addEventListener("change",()=>{const r=ie().find(m=>m.name===t.value),c=r?et(r.id):[];n.innerHTML='<option value="">Selecione a cidade primeiro</option>'+c.map(m=>`<option value="${m.name}">${p(m.name)}</option>`).join("")}));const a=document.getElementById("admin-login"),o=document.getElementById("admin-root");if(a){const r=new URLSearchParams(window.location.hash.replace("#","")),c=new URLSearchParams(window.location.search),m=r.get("type")||c.get("type")||"",f=ht||m==="recovery"||m==="invite"||window.location.hash.includes("access_token")||c.has("code"),u=document.getElementById("password-reset-overlay");if(f){a.style.display="none",o&&o.classList.add("hidden"),u&&(u.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async h=>{var S,$;h.preventDefault();const x=((S=document.getElementById("new-password"))==null?void 0:S.value)||"",v=(($=document.getElementById("confirm-password"))==null?void 0:$.value)||"",E=document.getElementById("password-reset-msg"),I=h.target.querySelector('button[type="submit"]');if(E&&(E.style.display="none"),x!==v){E&&(E.textContent="As senhas não coincidem.",E.style.display="");return}I&&(I.disabled=!0,I.textContent="Salvando…");const{error:k}=await y.auth.updateUser({password:x});if(k){E&&(E.textContent="Erro: "+k.message,E.style.display=""),I&&(I.disabled=!1,I.textContent="Definir Senha");return}window.location.href=window.location.pathname}),c.has("code")&&await y.auth.exchangeCodeForSession(c.get("code")??"");return}const{data:{session:b}}=await y.auth.getSession();if(b){if(a.classList.add("hidden"),o&&o.classList.remove("hidden"),Pe(),ut(),dt(),window.lucide&&lucide.createIcons(),g=await st(b.user.id),!g){await y.auth.signOut(),a.classList.remove("hidden"),o&&o.classList.add("hidden");return}if(g.active===!1){await y.auth.signOut(),a.classList.remove("hidden"),o&&o.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(g.needs_password_reset){a.style.display="none",o&&o.classList.add("hidden");const h=document.getElementById("password-reset-overlay");h&&(h.style.display="flex"),(d=document.getElementById("password-reset-form"))==null||d.addEventListener("submit",async x=>{var $,w;x.preventDefault();const v=(($=document.getElementById("new-password"))==null?void 0:$.value)||"",E=((w=document.getElementById("confirm-password"))==null?void 0:w.value)||"",I=document.getElementById("password-reset-msg"),k=x.target.querySelector('button[type="submit"]');if(I&&(I.style.display="none"),v!==E){I&&(I.textContent="As senhas não coincidem.",I.style.display="");return}if(v.length<6){I&&(I.textContent="Mínimo 6 caracteres.",I.style.display="");return}k&&(k.disabled=!0,k.textContent="Salvando…");const{error:S}=await y.auth.updateUser({password:v});if(S){I&&(I.textContent="Erro: "+S.message,I.style.display=""),k&&(k.disabled=!1,k.textContent="Definir Senha");return}await y.from("profiles").update({needs_password_reset:!1}).eq("id",g.id),window.location.href=window.location.pathname});return}Re((g==null?void 0:g.tenant_id)||null),Me(g),lt(g.role),await Te(),await pt(g),window.lucide&&lucide.createIcons(),oa()}else{o&&o.classList.add("hidden"),a.classList.remove("hidden");const h=document.getElementById("login-form");h&&((l=document.getElementById("forgot-password-btn"))==null||l.addEventListener("click",async()=>{var E,I;const x=(I=(E=h.querySelector('input[name="email"]'))==null?void 0:E.value)==null?void 0:I.trim();if(!x){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:v}=await y.auth.resetPasswordForEmail(x,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(v?"Erro: "+v.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),h.addEventListener("submit",async x=>{x.preventDefault();const v=new FormData(h),E=v.get("email"),I=v.get("password");if(await Ht(E,I)){a.classList.add("hidden"),o&&o.classList.remove("hidden"),Pe(),ut(),window.lucide&&lucide.createIcons();const{data:{session:S}}=await y.auth.getSession();if(g=S?await st(S.user.id):null,!g){await y.auth.signOut();return}if(g.active===!1){await y.auth.signOut(),a.classList.remove("hidden"),o&&o.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}dt(),Re((g==null?void 0:g.tenant_id)||null),Me(g),lt(g.role),await Te(),await pt(g),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else Pe();await ke();const i=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();Ct(i),Tt(le)});async function ca(){const e=C.filter(o=>!o.reference);if(!e.length)return;const t=C.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,i)=>o.id-i.id);for(const o of a){const i="IO-"+String(n).padStart(4,"0"),{error:s}=await y.from("properties").update({reference:i}).eq("id",o.id);if(!s){const d=C.findIndex(l=>l.id===o.id);d>=0&&(C[d].reference=i),n++}}Le(Qe(C))}async function ma(){const e=C.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(i=>!i.includes("/wm-")))continue;const a=[];let o=!1;for(const i of t.images)if(i.includes("/wm-"))a.push(i);else try{const s=await pa(i);a.push(s),o=!0}catch{a.push(i)}if(o){await y.from("properties").update({images:a}).eq("id",t.id);const i=C.findIndex(s=>s.id===t.id);i>=0&&(C[i].images=a)}}Le(Qe(C))}}async function pa(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),i=o.ok?await o.blob():null,s=i?URL.createObjectURL(i):null;return new Promise(d=>{const l=new Image;l.onload=()=>{URL.revokeObjectURL(a);const r=document.createElement("canvas"),c=1200;let m=l.width,f=l.height;m>c&&(f=Math.round(f*c/m),m=c),r.width=m,r.height=f;const u=r.getContext("2d");u.drawImage(l,0,0,m,f);const b=h=>{if(h){const x=Math.round(m*.18),v=Math.round(h.naturalHeight*x/h.naturalWidth),E=Math.round(m*.02);u.globalAlpha=.45,u.drawImage(h,m-x-E,f-v-E,x,v),u.globalAlpha=1}r.toBlob(async x=>{try{const v=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:E}=await y.storage.from("imoveis").upload(v,x,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(E){console.error("Upload watermark error:",E),d(e);return}const{data:{publicUrl:I}}=y.storage.from("imoveis").getPublicUrl(v);d(I)}catch(v){console.error("Watermark upload exception:",v),d(e)}},"image/jpeg",.82)};if(s){const h=new Image;h.onload=()=>{URL.revokeObjectURL(s),b(h)},h.onerror=()=>{URL.revokeObjectURL(s),b(null)},h.src=s}else b(null)},l.onerror=()=>{URL.revokeObjectURL(a),d(e)},l.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function P(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function at(e,t="assets"){const n=await Se(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await y.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:i}}=y.storage.from("imoveis").getPublicUrl(a);return i}async function ua(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",H()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>p(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const i=o.target.files[0];if(i)try{const s=await at(i,"logos");document.getElementById("co-logo-url").value=s,document.getElementById("co-logo-preview").src=s}catch(s){alert("Erro no upload: "+s.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const i=await ce([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);i&&Ke(),o.disabled=!1,o.textContent="Salvar Identidade",P(document.getElementById("co-identity-msg"),i)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const i=document.getElementById("co-whatsapp").value.trim(),s=await ce([["company.whatsapp",i],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);s&&i&&(le=i,Ie=`https://wa.me/${i}`),o.disabled=!1,o.textContent="Salvar Contatos",P(document.getElementById("co-contacts-msg"),s)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const i=await ce([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",P(document.getElementById("co-social-msg"),i)})}async function ga(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",H()),n={};t==null||t.forEach(c=>{n[c.key]=c.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",i=n["visual.secondary_bg"]||"#1a2f4a",s=n["visual.hero_bg_url"]||"",d=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${p(s)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 <strong>Foto de fundo do banner</strong> no topo do site. Recomendado: 1920×1080 px.</p>
        <div id="vis-hero-preview" style="margin-top:10px;display:${s?"":"none"}">
          <img src="${p(s)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function l(c,m,f){const u=document.getElementById(c),b=document.getElementById(m);u==null||u.addEventListener("input",h=>{b.value=h.target.value,f()}),b==null||b.addEventListener("input",h=>{/^#[0-9a-fA-F]{6}$/.test(h.target.value)&&(u.value=h.target.value,f())})}function r(){var m,f,u,b;const c=((m=document.getElementById("col-accent-hex"))==null?void 0:m.value)||"#b8962e";(f=document.getElementById("vp-bar"))==null||f.style.setProperty("background",c),(u=document.getElementById("vp-dot"))==null||u.style.setProperty("background",c),(b=document.getElementById("vp-btn"))==null||b.style.setProperty("background",c),document.documentElement.style.setProperty("--accent",c)}l("col-accent","col-accent-hex",r),l("col-primary","col-primary-hex",()=>{}),l("col-secondary","col-secondary-hex",()=>{}),r(),document.getElementById("vis-hero-file").addEventListener("change",async c=>{const m=c.target.files[0];if(m)try{const f=await at(m,"hero");document.getElementById("vis-hero-url").value=f;const u=document.getElementById("vis-hero-preview");u.innerHTML=`<img src="${f}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,u.style.display=""}catch(f){alert("Erro no upload: "+f.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const c=document.getElementById("visual-save-colors");c.disabled=!0,c.textContent="Salvando…";const m=await ce([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);m&&Ke(),c.disabled=!1,c.textContent="Salvar Cores",P(document.getElementById("visual-colors-msg"),m)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",r())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const c=document.getElementById("visual-save-images");c.disabled=!0,c.textContent="Salvando…";const m=await ce([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);c.disabled=!1,c.textContent="Salvar Imagens",P(document.getElementById("visual-images-msg"),m)})}async function va(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("site_content").select("*").eq("tenant_id",H()),n={};t==null||t.forEach(l=>{n[l.key]=l});const a=(l,r)=>{var c;return p(((c=n[l])==null?void 0:c[`value_${r}`])||"")},o=["pt","en","es"],i={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},s=l=>o.map(r=>`<button class="content-tab${r===l?" active":""}" data-lang="${r}">${i[r]}</button>`).join(""),d=l=>`
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
  `,document.getElementById("sc-tabs").addEventListener("click",l=>{var c;const r=l.target.closest(".content-tab");r&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(m=>m.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(m=>m.classList.remove("active")),r.classList.add("active"),(c=document.querySelector(`#sc-panels [data-panel="${r.dataset.lang}"]`))==null||c.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const l=document.getElementById("sc-save-btn");l.disabled=!0,l.textContent="Salvando…";const r={};document.querySelectorAll(".sc-field").forEach(m=>{const f=m.dataset.key,u=m.dataset.lang;r[f]||(r[f]={}),r[f][u]=m.value});let c=!0;for(const[m,f]of Object.entries(r))await De(m,{pt:f.pt,en:f.en,es:f.es})||(c=!1);l.disabled=!1,l.textContent="Salvar Conteúdo",P(document.getElementById("sc-save-msg"),c)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const l=document.getElementById("seo-save-btn");l.disabled=!0,l.textContent="Salvando…";const r=document.getElementById("seo-title").value.trim(),c=document.getElementById("seo-desc").value.trim(),m=await De("seo.title_pt",{pt:r,en:r,es:r})&&await De("seo.description_pt",{pt:c,en:c,es:c});l.disabled=!1,l.textContent="Salvar SEO",P(document.getElementById("seo-save-msg"),m)})}async function fa(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await J())}async function J(){const e=document.getElementById("crm-body");if(!e)return;const t=H(),[{data:n},{data:a},{data:o},{data:i}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",t).order("sort_order"),y.from("crm_stages").select("*").eq("tenant_id",t).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",t).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("sort_order")]),s=n||[],d=s.find(u=>u.is_default)||s[0],l=s.map(u=>`<option value="${u.id}"${u.id===(d==null?void 0:d.id)?" selected":""}>${p(u.name)}</option>`).join(""),c=(a||[]).filter(u=>u.pipeline_id===(d==null?void 0:d.id)).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${p(u.name)}</span>
      <input type="color" value="${u.color}" data-sid="${u.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${u.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',m=(o||[]).map(u=>`<span class="tag-chip" style="background:${u.color}" data-id="${u.id}">
      ${p(u.name)}
      <button class="tag-chip-del" data-id="${u.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',f=(i||[]).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${p(u.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${u.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${u.id}" title="Remover">🗑️</button>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const u=document.getElementById("crm-new-stage").value.trim(),b=document.getElementById("crm-new-stage-color").value,h=parseInt(document.getElementById("crm-pipe-sel").value,10);u&&(await y.from("crm_stages").insert({pipeline_id:h,name:u,color:b,sort_order:99,tenant_id:H()}),document.getElementById("crm-new-stage").value="",await J())}),e.querySelectorAll(".stage-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await y.from("crm_stages").delete().eq("id",u.dataset.id),await J())})}),e.querySelectorAll(".stage-color-pick").forEach(u=>{u.addEventListener("change",async b=>{await y.from("crm_stages").update({color:b.target.value}).eq("id",u.dataset.sid);const h=u.closest(".stage-item").querySelector(".stage-color-dot");h&&(h.style.background=b.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const u=document.getElementById("crm-new-tag").value.trim(),b=document.getElementById("crm-new-tag-color").value;u&&(await y.from("crm_tags").insert({name:u,color:b,tenant_id:H()}),document.getElementById("crm-new-tag").value="",await J())}),e.querySelectorAll(".tag-chip-del").forEach(u=>{u.addEventListener("click",async()=>{await y.from("crm_tags").delete().eq("id",u.dataset.id),await J()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const u=document.getElementById("crm-new-status").value.trim(),b=document.getElementById("crm-new-status-color").value,h=document.getElementById("crm-new-status-final").checked;u&&(await y.from("crm_lead_statuses").insert({name:u,color:b,is_final:h,sort_order:99,tenant_id:H()}),document.getElementById("crm-new-status").value="",await J())}),e.querySelectorAll(".status-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover este status?")&&(await y.from("crm_lead_statuses").delete().eq("id",u.dataset.id),await J())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var h;const u=(h=prompt("Nome do novo funil:"))==null?void 0:h.trim();if(!u)return;const{error:b}=await y.from("crm_pipelines").insert({name:u,sort_order:99,tenant_id:H()});if(b){alert("Erro ao criar funil: "+b.message);return}Xe=!1,await J()})}async function ya(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("integrations").select("*"),n={};t==null||t.forEach(d=>{n[d.key]=d});const a=d=>{var l;return p(((l=n[d])==null?void 0:l.value)||"")},o=d=>{var l;return(l=n[d])!=null&&l.enabled?"checked":""},i=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],s=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var m;const d=document.getElementById("intg-save-tracking");d.disabled=!0,d.textContent="Salvando…";let l=!0;const r=document.querySelectorAll(".intg-val"),c=document.querySelectorAll(".intg-toggle");for(let f=0;f<r.length;f++){const u=r[f].dataset.key,b=r[f].value.trim(),h=((m=c[f])==null?void 0:m.checked)??!1;await Oe(u,b,h)||(l=!1)}d.disabled=!1,d.textContent="Salvar Integrações",P(document.getElementById("intg-tracking-msg"),l)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const d=document.getElementById("intg-save-smtp");d.disabled=!0,d.textContent="Salvando…";const l=document.querySelectorAll(".smtp-field");let r=!0;for(const m of l)await Oe(m.dataset.key,m.value.trim(),!0)||(r=!1);const c=document.getElementById("smtp-pass").value;c&&(await Oe("smtp_pass",c,!0)||(r=!1)),d.disabled=!1,d.textContent="Salvar SMTP",P(document.getElementById("intg-smtp-msg"),r)})}async function ba(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Ye(),document.getElementById("media-file-input").addEventListener("change",async n=>{var l,r;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),i=document.getElementById("media-progress-fill"),s=document.getElementById("media-progress-text");o.style.display="";let d=0;for(const c of a){s.textContent=`Enviando ${d+1}/${a.length}…`,i.style.width=`${Math.round(d/a.length*100)}%`;try{const m=await at(c,"media"),f=c.name.replace(/\.[^.]+$/,"").slice(0,60);await y.from("media_library").insert({name:f,url:m,type:"image",size:c.size,created_by:(r=(l=(await y.auth.getUser()).data)==null?void 0:l.user)==null?void 0:r.id})}catch(m){console.error("Media upload error:",m)}d++}i.style.width="100%",s.textContent=`✓ ${d} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",i.style.width="0"},2e3),await Ye(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Ye(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await y.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${p(a.url)}">
      <img src="${p(a.url)}" alt="${p(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${p(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${p(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation(),(i=navigator.clipboard)==null||i.writeText(a.dataset.url).then(()=>{const s=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=s},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await y.from("media_library").delete().eq("id",a.dataset.id),await Ye())})})}async function ha(){var t,n,a,o,i;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(s=>{s.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(l=>l.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(l=>l.classList.add("hidden")),s.classList.add("active");const d=e.querySelector(`#sa-panel-${s.dataset.tab}`);d&&d.classList.remove("hidden"),s.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&Q(),s.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&xa(),s.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&gt(),s.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&vt(),s.dataset.tab==="platform"&&ft()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",gt),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",Q),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",vt),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>Ia()),(i=e.querySelector("#sa-plat-save"))==null||i.addEventListener("click",Ea),Q(),ft())}async function Q(){var d,l;const e=document.getElementById("sa-tenants-list"),t=((l=(d=document.getElementById("sa-tenant-search"))==null?void 0:d.value)==null?void 0:l.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=y.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const i=(a||[]).filter(r=>{var c,m;return!t||((c=r.name)==null?void 0:c.toLowerCase().includes(t))||((m=r.slug)==null?void 0:m.toLowerCase().includes(t))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const s=r=>r.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=i.map(r=>{var c;return`
    <div class="sa-list-row" data-action="open-panel" data-id="${r.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${r.logo_url?`<img class="sa-tenant-logo" src="${p(r.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${p(r.name||"—")}</div>
          <div class="sa-list-sub">${p(r.slug||"")} · ${p(((c=r.plans)==null?void 0:c.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${s(r)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${r.id}" data-active="${r.active}" title="${r.active?"Desativar":"Ativar"}">${r.active?"⏸️":"▶️"}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(r=>{r.addEventListener("click",async c=>{c.stopPropagation();const m=r.dataset.active==="true";await y.from("tenants").update({active:!m}).eq("id",r.dataset.id),Q()})}),e.querySelectorAll('[data-action="open-panel"]').forEach(r=>{r.addEventListener("click",()=>{const c=(i||[]).find(m=>String(m.id)===String(r.dataset.id));c&&Ba(c)})})}async function xa(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await y.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${p(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function gt(){var d;const e=document.getElementById("sa-subs-list"),t=((d=document.getElementById("sa-sub-filter"))==null?void 0:d.value)||"";if(!e)return;e.dataset.loaded="1";let n=y.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const i={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},s={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(l=>{var r,c,m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${p(((r=l.tenants)==null?void 0:r.name)||"—")}</div>
          <div class="sa-list-sub">${p(((c=l.plans)==null?void 0:c.name)||"—")} · R$ ${Number(((m=l.plans)==null?void 0:m.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${i[l.status]||"gray"}">${s[l.status]||l.status}</span>
        <span class="sa-list-date">${l.current_period_end?new Date(l.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function vt(){var s,d;const e=document.getElementById("sa-users-list"),t=((d=(s=document.getElementById("sa-user-search"))==null?void 0:s.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await y.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(l=>{var r,c;return!t||((r=l.name)==null?void 0:r.toLowerCase().includes(t))||((c=l.email)==null?void 0:c.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const i={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(l=>{var r;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(l.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${p(l.name||"—")}</div>
          <div class="sa-list-sub">${p(((r=l.tenants)==null?void 0:r.name)||"Sem imobiliária")} · ${i[l.role]||l.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${l.active!==!1?"sa-badge-green":"sa-badge-red"}">${l.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function ft(){const[e,t,n,a]=await Promise.all([y.from("tenants").select("id",{count:"exact",head:!0}),y.from("profiles").select("id",{count:"exact",head:!0}),y.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),y.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(i,s)=>{const d=document.getElementById(i);d&&(d.textContent=s??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function Ea(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await ce([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),P(t,!0)}function wa(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Ia(){var a,o,i,s,d,l;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),y.from("plans").select("id, name").then(({data:r})=>{const c=document.getElementById("nt-plan");c&&r&&(c.innerHTML='<option value="">Sem plano</option>'+r.map(m=>`<option value="${m.id}">${p(m.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",r=>{const c=document.getElementById("nt-slug");c&&!c.dataset.manual&&(c.value=wa(r.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",r=>{r.target.dataset.manual="1"}),(i=document.getElementById("nt-pwd-toggle"))==null||i.addEventListener("click",()=>{const r=document.getElementById("nt-admin-password");r.type=r.type==="password"?"text":"password"});const n=()=>t.remove();(s=document.getElementById("sa-modal-close-btn"))==null||s.addEventListener("click",n),(d=document.getElementById("nt-cancel"))==null||d.addEventListener("click",n),t.addEventListener("click",r=>{r.target===t&&n()}),(l=document.getElementById("nt-save"))==null||l.addEventListener("click",async()=>{var S,$,w,B,L,_,T,N,A,G,V,W;const r=($=(S=document.getElementById("nt-name"))==null?void 0:S.value)==null?void 0:$.trim(),c=(B=(w=document.getElementById("nt-slug"))==null?void 0:w.value)==null?void 0:B.trim(),m=(_=(L=document.getElementById("nt-domain"))==null?void 0:L.value)==null?void 0:_.trim(),f=(T=document.getElementById("nt-plan"))==null?void 0:T.value,u=(A=(N=document.getElementById("nt-admin-email"))==null?void 0:N.value)==null?void 0:A.trim(),b=(V=(G=document.getElementById("nt-admin-password"))==null?void 0:G.value)==null?void 0:V.trim(),h=document.getElementById("nt-msg"),x=document.getElementById("nt-save");if(!r||!c){h.textContent="❌ Nome e slug são obrigatórios.",h.style.color="#ef4444";return}if(!u){h.textContent="❌ Informe o e-mail do admin.",h.style.color="#ef4444";return}if(!b||b.length<6){h.textContent="❌ A senha precisa ter mínimo 6 caracteres.",h.style.color="#ef4444";return}x.disabled=!0,x.textContent="Criando…",h.textContent="⏳ Criando imobiliária…",h.style.color="#64748b";const{data:v,error:E}=await y.from("tenants").insert({name:r,slug:c,domain:m||null,plan_id:f||null,active:!0}).select();if(E){x.disabled=!1,x.textContent="Criar Imobiliária",h.textContent="❌ "+E.message,h.style.color="#ef4444";return}const I=(W=v==null?void 0:v[0])==null?void 0:W.id;h.textContent="⏳ Criando usuário admin…";const k=await ge({email:u,password:b,role:"admin",tenant_id:I});if(!(k!=null&&k.success)){x.disabled=!1,x.textContent="Criar Imobiliária",h.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+p((k==null?void 0:k.error)||"Desconhecido"),h.style.color="#f59e0b",setTimeout(()=>{n(),Q()},3e3);return}I&&(k!=null&&k.user_id)&&!(k!=null&&k.linked)&&await y.from("profiles").update({tenant_id:I}).eq("id",k.user_id),x.disabled=!1,x.textContent="Criar Imobiliária",k.email_sent===!1?(h.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${p(k.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${p(u)}</strong><br>
          Senha: <strong>${p(b)}</strong>
        </div>`,h.style.color="#0f172a"):(h.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",h.style.color="#22c55e",setTimeout(()=>{n(),Q()},1500))})}function Ba(e){var a;(a=document.getElementById("tenant-panel"))==null||a.remove();const t=document.createElement("div");t.id="tenant-panel",t.style.cssText="position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;";const n=[{id:"properties",label:"🏠 Imóveis"},{id:"leads",label:"📋 Leads"},{id:"users",label:"👥 Corretores"},{id:"api",label:"🔗 Site & API"},{id:"config",label:"⚙️ Configurações"}];t.innerHTML=`
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
  `,document.body.appendChild(t),document.getElementById("tp-back").addEventListener("click",()=>t.remove()),document.getElementById("tp-edit-btn").addEventListener("click",()=>kt(e)),t.querySelectorAll(".tp-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".tp-tab").forEach(i=>{i.style.fontWeight="500",i.style.color="#64748b",i.style.borderBottomColor="transparent"}),o.style.fontWeight="700",o.style.color="#2563eb",o.style.borderBottomColor="#2563eb",yt(e,o.dataset.tab)})}),yt(e,"properties")}async function yt(e,t){var a,o,i;const n=document.getElementById("tp-content");if(n){if(n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>',t==="properties"){const{data:s}=await y.from("properties").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1});if(!(s!=null&&s.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>';return}n.innerHTML=`
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
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${p(d.title||"")}</div><div style="font-size:11px;color:#94a3b8;">${p(d.reference||"")}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${p([d.neighborhood,d.city].filter(Boolean).join(", "))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">R$ ${p(String(d.price||"—"))}</td>
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
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${p(r.name||"")}</td>
              <td style="padding:12px 16px;"><div style="font-size:13px;color:#475569;">${p(r.phone||"")}</div><div style="font-size:11px;color:#94a3b8;">${p(r.email||"")}</div></td>
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
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${p(l.name||l.email||"—")}</div><div style="font-size:11px;color:#94a3b8;">${p(l.email||"")}</div></td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${p(l.role||"corretor")}</td>
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
            <input type="text" value="${p(e.id)}" readonly style="flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:monospace;font-size:13px;background:#f8fafc;min-width:0;">
            <button id="tp-copy-key" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🌐 Site Demonstração</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.</p>
          <a href="${p(d)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">Abrir site demo →</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${p(d)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/properties?key=${p(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/properties/{id}?key=${p(e.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${s}/leads?key=${p(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/settings?key=${p(e.id)}</div>
          </div>
        </div>
      </div>`,(a=document.getElementById("tp-copy-key"))==null||a.addEventListener("click",()=>{var c;(c=navigator.clipboard)==null||c.writeText(e.id);const l=document.getElementById("tp-copy-key"),r=l.textContent;l.textContent="✅ Copiada!",setTimeout(()=>{l.textContent=r},2e3)})}if(t==="config"){const{data:s}=await y.from("settings").select("key,value").eq("tenant_id",e.id),d={};s==null||s.forEach(r=>{d[r.key]=r.value});const l=(r,c)=>`
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${r}</div>
        <div style="font-size:14px;color:#0f172a;">${p(String(c||"—"))}</div>
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
      </div>`,(i=document.getElementById("tp-open-edit"))==null||i.addEventListener("click",()=>kt(e))}}}function kt(e){var r,c,m,f,u,b,h,x;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
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
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([v,E,I])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${v==="GET"?"#dcfce7":"#fef9c3"};color:${v==="GET"?"#15803d":"#854d0e"};">${v}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${E}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${I}</div>
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
  `,document.body.appendChild(n),y.from("plans").select("id, name").then(({data:v})=>{const E=document.getElementById("et-plan");E&&v&&(E.innerHTML='<option value="">Sem plano</option>'+v.map(I=>`<option value="${I.id}"${String(I.id)===String(e.plan_id)?" selected":""}>${p(I.name)}</option>`).join(""))}),(r=document.getElementById("et-logo-input"))==null||r.addEventListener("change",v=>{const E=v.target.files[0];if(!E)return;const I=URL.createObjectURL(E),k=document.getElementById("et-logo-preview");k&&(k.innerHTML=`<img src="${I}" style="width:100%;height:100%;object-fit:cover;">`)}),(c=document.getElementById("et-logo-preview"))==null||c.addEventListener("click",()=>{var v;(v=document.getElementById("et-logo-input"))==null||v.click()}),(m=document.getElementById("et-pwd-toggle"))==null||m.addEventListener("click",()=>{const v=document.getElementById("et-admin-password");v.type=v.type==="password"?"text":"password"}),(f=document.getElementById("et-copy-key"))==null||f.addEventListener("click",()=>{var k,S;const v=(k=document.getElementById("et-api-key"))==null?void 0:k.value;if(!v)return;(S=navigator.clipboard)==null||S.writeText(v);const E=document.getElementById("et-copy-key"),I=E.textContent;E.textContent="✅ Copiada!",setTimeout(()=>{E.textContent=I},2e3)});const o=["dados","config","api"];function i(v){o.forEach(E=>{document.getElementById(`et-pane-${E}`).style.display=E===v?"":"none";const I=document.getElementById(`et-tab-${E}`);I.style.borderBottomColor=E===v?"#2563eb":"transparent",I.style.color=E===v?"#2563eb":"#64748b",I.style.fontWeight=E===v?"600":"500"}),v==="config"&&d()}o.forEach(v=>{var E;return(E=document.getElementById(`et-tab-${v}`))==null?void 0:E.addEventListener("click",()=>i(v))});let s=!1;async function d(){var I;if(s)return;s=!0;const{data:v}=await y.from("settings").select("key,value").eq("tenant_id",e.id),E={};v==null||v.forEach(k=>{E[k.key]=k.value}),document.getElementById("et-pane-config").innerHTML=`
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${p(E["company.whatsapp"]||"")}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${p(E["company.phone"]||"")}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${p(E["company.email"]||"")}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${p(E["company.city"]||E["company.address"]||"")}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${p(E["company.slogan"]||"")}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `,(I=document.getElementById("et-cfg-save"))==null||I.addEventListener("click",async()=>{const k=document.getElementById("et-cfg-save"),S=document.getElementById("et-cfg-msg");k.disabled=!0,k.textContent="Salvando…",S.textContent="",S.style.color="#64748b";const $=document.getElementById("et-cfg-wa").value.trim().replace(/\D/g,""),w=document.getElementById("et-cfg-phone").value.trim(),B=document.getElementById("et-cfg-email").value.trim(),L=document.getElementById("et-cfg-city").value.trim(),_=document.getElementById("et-cfg-slogan").value.trim(),{error:T}=await y.from("settings").upsert([{key:"company.whatsapp",value:$,tenant_id:e.id},{key:"company.phone",value:w,tenant_id:e.id},{key:"company.email",value:B,tenant_id:e.id},{key:"company.city",value:L,tenant_id:e.id},{key:"company.address",value:L,tenant_id:e.id},{key:"company.slogan",value:_,tenant_id:e.id}],{onConflict:"tenant_id,key"});k.disabled=!1,k.textContent="💾 Salvar configurações",T?(S.textContent="❌ "+T.message,S.style.color="#ef4444"):(S.textContent="✅ Configurações salvas!",S.style.color="#22c55e")})}const l=()=>n.remove();(u=document.getElementById("et-close"))==null||u.addEventListener("click",l),(b=document.getElementById("et-cancel"))==null||b.addEventListener("click",l),n.addEventListener("click",v=>{v.target===n&&l()}),(h=document.getElementById("et-delete"))==null||h.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const E=document.getElementById("et-delete");E.disabled=!0,E.textContent="Excluindo…";const{error:I}=await y.from("tenants").delete().eq("id",e.id);if(I){alert("Erro ao excluir: "+I.message),E.disabled=!1,E.textContent="🗑️ Excluir";return}l(),Q()}),(x=document.getElementById("et-save"))==null||x.addEventListener("click",async()=>{var N,A,G,V,W,ve,fe,ye,be,R,se,nt;const v=(A=(N=document.getElementById("et-name"))==null?void 0:N.value)==null?void 0:A.trim(),E=(V=(G=document.getElementById("et-slug"))==null?void 0:G.value)==null?void 0:V.trim(),I=(ve=(W=document.getElementById("et-domain"))==null?void 0:W.value)==null?void 0:ve.trim(),k=(fe=document.getElementById("et-plan"))==null?void 0:fe.value,S=(be=(ye=document.getElementById("et-admin-email"))==null?void 0:ye.value)==null?void 0:be.trim(),$=(se=(R=document.getElementById("et-admin-password"))==null?void 0:R.value)==null?void 0:se.trim(),w=(nt=document.getElementById("et-logo-input"))==null?void 0:nt.files[0],B=document.getElementById("et-msg"),L=document.getElementById("et-save");if(!v){B.textContent="❌ Nome é obrigatório.",B.style.color="#ef4444";return}L.disabled=!0,L.textContent="Salvando…",B.textContent="⏳ Salvando…",B.style.color="#64748b";let _=e.logo_url;if(w)try{const q=await Se(w,256,.85),ot=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:Lt}=await y.storage.from("imoveis").upload(ot,q,{contentType:"image/jpeg",upsert:!0});if(!Lt){const{data:{publicUrl:St}}=y.storage.from("imoveis").getPublicUrl(ot);_=St}}catch(q){console.error("Logo upload:",q)}const{error:T}=await y.from("tenants").update({name:v,slug:E||e.slug,domain:I||null,plan_id:k||null,logo_url:_}).eq("id",e.id);if(T){L.disabled=!1,L.textContent="Salvar",B.textContent="❌ "+T.message,B.style.color="#ef4444";return}if(S&&$&&$.length>=6){B.textContent="⏳ Criando usuário admin…";const q=await ge({email:S,password:$,role:"admin",tenant_id:e.id});q!=null&&q.success?(q!=null&&q.user_id&&!(q!=null&&q.linked)&&await y.from("profiles").update({tenant_id:e.id}).eq("id",q.user_id),B.textContent="✅ Salvo e admin criado!",B.style.color="#22c55e"):(B.textContent="⚠️ Salvo, mas erro ao criar admin: "+((q==null?void 0:q.error)||"Tente novamente"),B.style.color="#f59e0b")}else B.textContent="✅ Imobiliária atualizada!",B.style.color="#22c55e";L.disabled=!1,L.textContent="Salvar",setTimeout(()=>{l(),Q()},1200)})}
