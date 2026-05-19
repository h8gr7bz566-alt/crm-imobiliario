import{s as y}from"./supabase-BcuJ3xoD.js";const mt="00000000-0000-0000-0000-000000000000";let ue={},Se={},te=mt;function Ye(e){te=e||mt,ue={},Se={}}const Ne=()=>te;async function It(){const[e,t]=await Promise.all([y.from("settings").select("key,value").eq("tenant_id",te),y.from("site_content").select("*").eq("tenant_id",te)]);e.data&&e.data.forEach(n=>{ue[n.key]=n.value}),t.data&&t.data.forEach(n=>{Se[n.key]=n})}const G=(e,t=null)=>ue[e]!==void 0?ue[e]:t,_e=(e,t="pt")=>{const n=Se[e];return n?n[`value_${t}`]??n.value_pt??null:null};async function Z(e){const t=new Date().toISOString(),n=e.map(([o,i])=>({key:o,value:i,tenant_id:te,updated_at:t})),{error:a}=await y.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,i])=>{ue[o]=i}),!a}async function Ce(e,{pt:t,en:n,es:a}){const o={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:te,updated_at:new Date().toISOString()},{error:i}=await y.from("site_content").upsert(o,{onConflict:"key,tenant_id"});return i||(Se[e]=o),!i}async function Te(e,t,n){const{error:a}=await y.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function je(){const e=document.documentElement,t=G("visual.accent_color","#b8962e"),n=G("visual.primary_bg","#0f1c2e"),a=G("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=G("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(d=>{d.src=o});const i=G("company.favicon_url","/favicon.ico"),s=document.querySelector('link[rel="shortcut icon"]');s&&(s.href=i);const l=G("visual.hero_bg_url","");if(l){const d=document.querySelector(".hero");d&&(d.style.backgroundImage=`url('${l}')`)}}function Bt(e="pt"){const t=f=>_e(f,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const i=document.querySelector('[data-i18n="inst.p1"]'),s=document.querySelector('[data-i18n="inst.p2"]'),l=document.querySelector('[data-i18n="inst.p3"]');i&&t("inst.bio_p1")&&(i.innerHTML=t("inst.bio_p1")),s&&t("inst.bio_p2")&&(s.innerHTML=t("inst.bio_p2")),l&&t("inst.bio_p3")&&(l.innerHTML=t("inst.bio_p3"));const d=document.querySelector('[data-i18n-num="inst.stat2num"]'),r=document.querySelector('[data-i18n="inst.stat1"]'),c=document.querySelector('[data-i18n="inst.stat2"]'),g=document.querySelector('[data-i18n="inst.stat3"]');d&&t("inst.stat2_num")&&(d.innerHTML=t("inst.stat2_num")),r&&t("inst.stat1_label")&&(r.innerHTML=t("inst.stat1_label")),c&&t("inst.stat2_label")&&(c.innerHTML=t("inst.stat2_label")),g&&t("inst.stat3_label")&&(g.innerHTML=t("inst.stat3_label"));const m=_e("seo.title_pt",e);m&&document.title&&(document.title=m);const h=_e("seo.description_pt",e);if(h){const f=document.querySelector('meta[name="description"]');f&&(f.content=h)}}function Lt(e){if(!e)return;const t=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const kt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let K="5547999701743",pe=`https://wa.me/${K}`;const W=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],$t=5.7;function ge(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/$t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let C=[],p=null,ve=[],ut=!1;y.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(ut=!0)});async function St(){const e=window.location.hostname;let t=null;if(e&&e!=="localhost"&&e!=="127.0.0.1"){const{data:i}=await y.from("tenants").select("id").eq("domain",e).maybeSingle();i!=null&&i.id&&(t=i.id)}let n=y.from("properties").select("*").eq("published",!0);t&&(n=n.eq("tenant_id",t));const{data:a,error:o}=await n.order("created_at",{ascending:!1});return o?(console.error("Supabase select error:",o),[]):a||[]}async function _t(){let e=y.from("properties").select("*").order("created_at",{ascending:!1});(p==null?void 0:p.role)==="super_admin"||(p!=null&&p.tenant_id?e=e.eq("tenant_id",p.tenant_id):e=e.or("tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000"));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):(C=t||[],oa(),ia(),C)}async function Ct(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await y.from("properties").update(a).eq("id",t);if(o)throw o;const i=C.findIndex(s=>s.id===t);i>=0&&(C[i]={...C[i],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await y.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&C.unshift(t[0])}}async function Tt(e){const{error:t}=await y.from("properties").delete().eq("id",e);if(t)throw t;C=C.filter(n=>n.id!==e)}async function At(e,t){const{error:n}=await y.auth.signInWithPassword({email:e,password:t});return!n}function he(e,t=1200,n=.78){return new Promise((a,o)=>{const i=new Image,s=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(s);const l=document.createElement("canvas");let d=i.width,r=i.height;d>t&&(r=Math.round(r*t/d),d=t),l.width=d,l.height=r;const c=l.getContext("2d");c.drawImage(i,0,0,d,r);const g=new Image;g.crossOrigin="anonymous",g.onload=()=>{const m=Math.round(d*.18),h=Math.round(g.naturalHeight*m/g.naturalWidth),f=Math.round(d*.02),E=d-m-f,x=r-h-f;c.globalAlpha=.45,c.drawImage(g,E,x,m,h),c.globalAlpha=1,l.toBlob(u=>u?a(u):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},g.onerror=()=>{l.toBlob(m=>m?a(m):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},g.src="/logo.png"},i.onerror=o,i.src=s})}async function qt(e){const t=await he(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await y.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=y.storage.from("imoveis").getPublicUrl(n);return o}async function Mt(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await qt(n[o]));return a}async function fe(){var g,m,h,f,E,x;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await St();C=n,((g=document.getElementById("selecao-carousel"))==null?void 0:g.innerHTML)===""&&zt(n);const a=((m=document.getElementById("city-filter"))==null?void 0:m.value)||"",o=((h=document.getElementById("neighborhood-filter"))==null?void 0:h.value)||"",i=((f=document.getElementById("bedrooms-filter"))==null?void 0:f.value)||"",s=((E=document.getElementById("parking-filter"))==null?void 0:E.value)||"",l=((x=document.getElementById("construction-filter"))==null?void 0:x.value)||"",d=document.getElementById("price-slider"),r=d?parseInt(d.value,10):13e7,c=n.filter(u=>{if(a&&u.city!==a||o&&u.neighborhood!==o||i&&(i==="4+"&&Number(u.bedrooms)<4||i!=="4+"&&Number(u.bedrooms)!==Number(i))||s&&(s==="4+"&&Number(u.parking)<4||s!=="4+"&&Number(u.parking)!==Number(s))||l&&u.construction_status!==l)return!1;const b=String(u.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),I=parseInt(b,10)||0;return!(I<0||I>r)});if(e){if(!c.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=c.map(u=>{var w;const b=u.cover_image||((w=u.images)==null?void 0:w[0])||W[0],I=[u.neighborhood,u.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${b}" alt="${v(u.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${v(u.title)}</div>
            <div class="selecao-card-loc">${v(I)}</div>
            <div class="selecao-card-price">${v(ge(u.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${u.id}" class="btn-det">Ver Detalhes</a>
              <a href="${pe}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!c.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=c.map(u=>{var w;const b=(w=u.images)!=null&&w.length?u.images:W,I=b.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${I}" data-idx="0" data-pid="${u.id}">
          <img src="${u.cover_image||b[0]}" alt="${v(u.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${I>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${v(u.title)}</strong>
          <div class="muted">${v(u.neighborhood||"")}, ${v(u.city||"")}</div>
          <div><strong>${v(ge(u.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${u.bedrooms||"--"} | 🚗 ${u.parking||"--"} ${I>1?"| 📸 "+I:""}</div>
          <p class="muted">${v((u.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${u.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${pe}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(u=>{u.removeEventListener("click",Ke),u.addEventListener("click",Ke)})}function zt(e){var o,i,s;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(l=>{var c;const d=l.cover_image||((c=l.images)==null?void 0:c[0])||W[0],r=[l.neighborhood,l.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${d}" alt="${v(l.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${v(l.title)}</div>
          <div class="selecao-card-loc">${v(r)}</div>
          <div class="selecao-card-price">${v(ge(l.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${l.id}" class="btn-det">Ver Detalhes</a>
            <a href="${pe}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(i=a==null?void 0:a.querySelector(".selecao-prev"))==null||i.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(s=a==null?void 0:a.querySelector(".selecao-next"))==null||s.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),fe()};function Ke(e){var l;e.stopPropagation();const t=e.currentTarget.closest(".carousel-wrap");if(!t)return;const n=parseInt(t.dataset.total,10);if(!n)return;let a=parseInt(t.dataset.idx,10)||0;const o=e.currentTarget.classList.contains("carousel-next")?1:-1;a=(a+o+n)%n,t.dataset.idx=a;const i=parseInt(t.dataset.pid,10),s=C.find(d=>d.id===i);(l=s==null?void 0:s.images)!=null&&l.length&&(t.querySelector(".carousel-img").src=s.images[a])}function Nt(){const e=document.getElementById("price-slider"),t=document.getElementById("price-label");!e||!t||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",t.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);t.textContent="Até R$ "+n.toLocaleString("pt-BR"),fe()}))}function jt(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=Y();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${v(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=Y().find(i=>i.name===e.value),o=a?Re(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(i=>`<option value="${i.name}">${v(i.name)}</option>`).join(""),fe()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",fe)})}function ye(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var s;const a=n.cover_image||((s=n.images)==null?void 0:s[0])||W[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",i=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${v(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${v(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+v(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${v(o)}</td>
      <td class="cell-price">${v(ge(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${i}</td>
      <td>
        <div class="action-btns">
          ${(p==null?void 0:p.role)==="admin"||(p==null?void 0:p.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(p==null?void 0:p.role)==="admin"||(p==null?void 0:p.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function Ht(){const e=document.getElementById("f-city");if(!e)return;const t=Y(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${v(a.name)}</option>`).join(""),n&&(e.value=n)}function Rt(){var e,t,n,a,o,i,s,l,d,r,c,g,m,h,f;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((i=document.getElementById("f-condominium"))==null?void 0:i.value)||"").trim().toLowerCase(),priceMin:parseFloat((s=document.getElementById("f-price-min"))==null?void 0:s.value)||0,priceMax:parseFloat((l=document.getElementById("f-price-max"))==null?void 0:l.value)||1/0,areaMin:parseFloat((d=document.getElementById("f-area-min"))==null?void 0:d.value)||0,areaMax:parseFloat((r=document.getElementById("f-area-max"))==null?void 0:r.value)||1/0,construction:((c=document.getElementById("f-construction"))==null?void 0:c.value)||"",published:((g=document.getElementById("f-published"))==null?void 0:g.value)||"",bedrooms:((m=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:m.dataset.val)||"",suites:((h=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:h.dataset.val)||"",parking:((f=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:f.dataset.val)||""}}function He(e){const t=Rt();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const i=parseFloat(a.area)||0;return!(t.areaMin>0&&i<t.areaMin||t.areaMax<1/0&&i>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function we(){if(!document.getElementById("admin-properties"))return;const e=await _t(),t=e.length,n=e.filter(s=>s.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),i=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),i&&(i.textContent="—"),Ht(),ye(C)}let z=null,V="";function qe(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Ee(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function Ie(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===V?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{V=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function Ae(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{var d;n.preventDefault();const a=new FormData(e),o=a.getAll("images");let i=[];const s=o.filter(r=>r.size>0);if(s.length){t.disabled=!0,t.textContent=`Enviando 0/${s.length} foto…`;try{i=await Mt(s,(r,c)=>{t.textContent=`Enviando ${r}/${c} foto…`})}catch(r){console.error("Erro no upload:",r),t.disabled=!1,t.textContent=z?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(z){const r=C.find(c=>c.id===z);r!=null&&r.images&&(i=r.images)}i.length||(i=[...W]);const l={...z?{id:z}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:i,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:V||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",tenant_id:z?((d=C.find(r=>r.id===z))==null?void 0:d.tenant_id)??(p==null?void 0:p.tenant_id)??null:(p==null?void 0:p.tenant_id)??null};try{await Ct(l),z=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const r=document.getElementById("adminPublished");r&&(r.value="true");const c=document.getElementById("adminNeighborhood");c&&(c.innerHTML='<option value="">Selecione a cidade primeiro</option>');const g=document.getElementById("adminConstructionStatus");g&&(g.value=""),V="",Ie([]),Ee(),await we()}catch(r){console.error(r),t.disabled=!1,t.textContent=z?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((r==null?void 0:r.message)||JSON.stringify(r)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await Tt(o),await we()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((p==null?void 0:p.role)!=="admin"&&(p==null?void 0:p.role)!=="super_admin")return;const o=Number(n.target.dataset.id);if(!o)return;const i=C.find(d=>d.id===o);if(!i)return;z=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=i.title||"",e.querySelector('[name="rua"]').value=i.rua||"",e.querySelector('[name="numero"]').value=i.numero||"",e.querySelector('[name="city"]').value=i.city||"",e.querySelector('[name="price"]').value=i.price||"",e.querySelector('[name="bedrooms"]').value=i.bedrooms||"",e.querySelector('[name="suites"]').value=i.suites||"",e.querySelector('[name="area"]').value=i.area||"",e.querySelector('[name="parking"]').value=i.parking||"",e.querySelector('[name="description"]').value=i.description||"",e.querySelector('[name="construction_status"]').value=i.construction_status||"",e.querySelector('[name="owner_name"]').value=i.owner_name||"",e.querySelector('[name="owner_phone"]').value=i.owner_phone||"",e.querySelector('[name="owner_email"]').value=i.owner_email||"",e.querySelector('[name="owner_notes"]').value=i.owner_notes||"",e.querySelector('[name="condominium"]').value=i.condominium||"";const s=document.getElementById("adminPublished");s&&(s.value=i.published===!0?"true":"false");const l=document.getElementById("adminCitySelect");l&&(l.value=i.city||"",l.dispatchEvent(new Event("change")),setTimeout(()=>{const d=document.getElementById("adminNeighborhood");d&&(d.value=i.neighborhood||"")},50)),V=i.cover_image||((a=i.images)==null?void 0:a[0])||"",Ie(i.images||[]),qe("Editar Imóvel")}})}function v(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let P=[],j=0;function Ut(e){var c,g;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const t=document.getElementById("view-status-badge");e.published?(t.textContent="● Publicado",t.className="badge badge-green"):(t.textContent="○ Rascunho",t.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const a=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=a,document.getElementById("view-directions-link").href=a;const o=((c=e.images)==null?void 0:c[0])||W[0];document.getElementById("view-thumb-preview").src=o,P=(g=e.images)!=null&&g.length?e.images:W,j=0,Be(),document.getElementById("view-price").textContent=ge(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const i=document.getElementById("view-condominium-item"),s=document.getElementById("view-condominium");s&&(s.textContent=e.condominium||""),i&&(i.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(m=>m.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(m=>m.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const l="https://omarcorretor.com.br/property.html?id="+e.id,d=document.getElementById("share-link-input");d&&(d.value=l);const r=document.getElementById("share-panel");r&&(r.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function xe(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Be(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=P[j],e.alt=`Foto ${j+1}`;const i=P.length>1;n.style.display=i?"flex":"none",a.style.display=i?"flex":"none",t.textContent=i?`${j+1} / ${P.length}`:"",o.innerHTML=i?P.map((s,l)=>`<img src="${s}" class="view-thumb${l===j?" active":""}" data-i="${l}" alt="Foto ${l+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(s=>{s.addEventListener("click",()=>{j=+s.dataset.i,Be()})})}async function Qe(e){const{data:t}=await y.from("profiles").select("*").eq("id",e).maybeSingle();return t}function Le(e){var g,m;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const i=(e==null?void 0:e.name)||"Sem nome",s=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=i,o&&(o.textContent=s),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((g=i[0])==null?void 0:g.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const l=document.getElementById("avatar-dd-name"),d=document.getElementById("avatar-dd-role"),r=document.getElementById("avatar-dd-img"),c=document.getElementById("avatar-dd-initial");l&&(l.textContent=i),d&&(d.textContent=s),e!=null&&e.avatar_url&&r?(r.src=e.avatar_url,r.style.display="",c&&(c.style.display="none")):(c&&(c.textContent=((m=i[0])==null?void 0:m.toUpperCase())||"?",c.style.display=""),r&&(r.style.display="none"))}function J(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),R(),e==="contatos"&&Zt(),e==="funil"&&Ft(),e==="tarefas"&&Gt()}function Ze(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:da,visual:la,"site-config":ra,"crm-config":ca,integracoes:ma,midia:ua}).forEach(([a,o])=>{const i=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);i&&i.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>pa(),{once:!0}),window.lucide&&lucide.createIcons()}}function R(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function Dt(){var a,o,i;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",s=>{s.target===t&&n()}),(i=document.getElementById("cp-save"))==null||i.addEventListener("click",async()=>{var g,m;const s=((g=document.getElementById("cp-new"))==null?void 0:g.value)||"",l=((m=document.getElementById("cp-confirm"))==null?void 0:m.value)||"",d=document.getElementById("cp-msg"),r=document.getElementById("cp-save");if(d.style.display="none",s.length<6){d.style.color="#ef4444",d.textContent="Mínimo 6 caracteres.",d.style.display="";return}if(s!==l){d.style.color="#ef4444",d.textContent="As senhas não coincidem.",d.style.display="";return}r.disabled=!0,r.textContent="Salvando…";const{error:c}=await y.auth.updateUser({password:s});if(r.disabled=!1,r.textContent="Salvar Senha",c){d.style.color="#ef4444",d.textContent="Erro: "+c.message,d.style.display="";return}d.style.color="#16a34a",d.textContent="✅ Senha alterada com sucesso!",d.style.display="",setTimeout(n,1500)})}function Ot(){var i,s,l,d,r;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((i=document.getElementById("topnav-avatar-img"))==null?void 0:i.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
    <div class="modal" style="max-width:380px;">
      <div class="modal-header">
        <h3>Alterar Foto</h3>
        <button class="modal-close" id="cph-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;border:3px solid #e2e8f0;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
          <img id="cph-preview" src="${a?n:""}" alt="" style="width:100%;height:100%;object-fit:cover;display:${a?"":"none"};">
          <span id="cph-initial" style="font-size:32px;font-weight:700;color:#64748b;display:${a?"none":""};">${((p==null?void 0:p.name)||"?")[0].toUpperCase()}</span>
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(s=document.getElementById("cph-close"))==null||s.addEventListener("click",o),(l=document.getElementById("cph-cancel"))==null||l.addEventListener("click",o),t.addEventListener("click",c=>{c.target===t&&o()}),(d=document.getElementById("cph-file"))==null||d.addEventListener("change",c=>{const g=c.target.files[0];if(!g)return;const m=URL.createObjectURL(g),h=document.getElementById("cph-preview"),f=document.getElementById("cph-initial");h&&(h.src=m,h.style.display=""),f&&(f.style.display="none"),document.getElementById("cph-save").disabled=!1}),(r=document.getElementById("cph-save"))==null||r.addEventListener("click",async()=>{var h;const c=(h=document.getElementById("cph-file"))==null?void 0:h.files[0];if(!c)return;const g=document.getElementById("cph-save"),m=document.getElementById("cph-msg");g.disabled=!0,g.textContent="Salvando…";try{const f=await he(c,400,.85),E=`avatars/${p.id}-${Date.now()}.jpg`,{error:x}=await y.storage.from("imoveis").upload(E,f,{contentType:"image/jpeg",upsert:!0});if(x)throw x;const{data:{publicUrl:u}}=y.storage.from("imoveis").getPublicUrl(E);await y.from("profiles").update({avatar_url:u}).eq("id",p.id),p={...p,avatar_url:u},Le(p),o()}catch(f){m.style.color="#ef4444",m.textContent="Erro: "+f.message,m.style.display="",g.disabled=!1,g.textContent="Salvar Foto"}})}function Pt(){var a,o,i;const e=document.getElementById("add-corretor-modal-root");e&&e.remove();const t=document.createElement("div");t.id="add-corretor-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("ac-close"))==null||a.addEventListener("click",n),(o=document.getElementById("ac-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",s=>{s.target===t&&n()}),(i=document.getElementById("ac-save"))==null||i.addEventListener("click",async()=>{var c,g;const s=(c=document.getElementById("ac-email"))==null?void 0:c.value.trim(),l=(g=document.getElementById("ac-password"))==null?void 0:g.value.trim(),d=document.getElementById("ac-save"),r=document.getElementById("ac-note");if(!s){alert("Informe o e-mail do corretor.");return}if(!l||l.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}d.disabled=!0,d.textContent="Criando…",r.style.display="none";try{const m=await oe({email:s,password:l,tenant_id:(p==null?void 0:p.tenant_id)||null});d.disabled=!1,d.textContent="+ Criar Acesso",m.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",m.email_sent===!1?(r.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${v(s)}<br><strong>Senha:</strong> ${v(l)}`,r.style.color="#0f172a"):(r.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",r.style.color="#16a34a"),r.style.display=""):alert("Erro: "+(m.error||"Falha desconhecida"))}catch(m){d.disabled=!1,d.textContent="+ Criar Acesso",alert("Erro: "+m.message)}})}function et(){var i,s,l,d,r,c,g,m,h,f,E;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",x=>{var b;x.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(b=document.getElementById("notif-dropdown"))==null||b.classList.add("hidden")}),(i=document.getElementById("avatar-dd-change-photo"))==null||i.addEventListener("click",x=>{x.stopPropagation(),R(),Ot()}),(s=document.getElementById("avatar-dd-change-pass"))==null||s.addEventListener("click",x=>{x.stopPropagation(),R(),Dt()}),(l=document.getElementById("avatar-dd-add-corretor"))==null||l.addEventListener("click",x=>{x.stopPropagation(),R(),Pt()}),(d=document.getElementById("avatar-dd-settings"))==null||d.addEventListener("click",x=>{x.stopPropagation(),R(),J("settings")}),(r=document.getElementById("avatar-dd-logout"))==null||r.addEventListener("click",async x=>{x.stopPropagation(),await y.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",x=>{var b;x.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((b=document.getElementById("avatar-dropdown"))==null||b.classList.add("hidden"),Jt())}),(c=document.getElementById("notif-mark-all"))==null||c.addEventListener("click",()=>{Yt(),R()}),(g=document.getElementById("btn-search-open"))==null||g.addEventListener("click",()=>{var x,u;(x=document.getElementById("search-overlay"))==null||x.classList.remove("hidden"),(u=document.getElementById("search-input"))==null||u.focus()}),(m=document.getElementById("search-overlay-close"))==null||m.addEventListener("click",()=>{var x;(x=document.getElementById("search-overlay"))==null||x.classList.add("hidden")}),(h=document.getElementById("search-overlay"))==null||h.addEventListener("click",x=>{x.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(f=document.getElementById("search-input"))==null||f.addEventListener("input",x=>{clearTimeout(o),o=setTimeout(()=>Wt(x.target.value.trim()),280)}),(E=document.getElementById("search-input"))==null||E.addEventListener("keydown",x=>{var u;x.key==="Escape"&&((u=document.getElementById("search-overlay"))==null||u.classList.add("hidden"))}),document.addEventListener("click",R)}let tt=!1,le=[],pt=[],ke=[],be=null,re=null;async function Ft(){var a;if(tt)return;tt=!0;const[{data:e},{data:t}]=await Promise.all([y.from("crm_pipelines").select("*").order("sort_order"),y.from("crm_stages").select("*").order("sort_order")]);le=e||[],pt=t||[];const n=document.getElementById("funil-pipe-sel");if(n){n.innerHTML=le.length?le.map(i=>`<option value="${i.id}">${v(i.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const o=le.find(i=>i.is_default)||le[0];o&&(n.value=o.id,be=o.id),n.addEventListener("change",async()=>{be=parseInt(n.value,10),await at()})}(a=document.getElementById("btn-funil-add-lead"))==null||a.addEventListener("click",()=>openLeadModal()),await at()}async function at(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=y.from("leads").select("*").order("created_at",{ascending:!1});(p==null?void 0:p.role)==="corretor"?t=t.eq("assigned_to",p.id):p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id)),be&&(t=t.eq("pipeline_id",be));const{data:n}=await t;ke=n||[],gt()}function gt(){const e=document.getElementById("kanban-board");if(!e)return;const t=pt.filter(a=>a.pipeline_id===be);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n={};t.forEach(a=>{n[a.name]=[]}),ke.forEach(a=>{var i,s,l,d;const o=a.stage||((i=t[0])==null?void 0:i.name);n[o]||(n[((s=t[0])==null?void 0:s.name)||""]=[]),(d=n[o]||n[(l=t[0])==null?void 0:l.name])==null||d.push(a)}),e.innerHTML=t.map(a=>{const o=n[a.name]||[],i=o.length?o.map(s=>`
        <div class="kanban-card" draggable="true" data-id="${s.id}" data-stage="${v(a.name)}">
          <div class="kanban-card-name">${v(s.name||"—")}</div>
          ${s.phone?`<div class="kanban-card-info">📞 ${v(s.phone)}</div>`:""}
          ${s.interest?`<div class="kanban-card-info">🏠 ${v(s.interest)}</div>`:""}
          ${s.budget_max?`<div class="kanban-card-info">💰 R$ ${Number(s.budget_max).toLocaleString("pt-BR")}</div>`:""}
          <div class="kanban-card-tags">
            ${s.source?`<span class="kanban-card-tag">${v(s.source)}</span>`:""}
          </div>
        </div>`).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${v(a.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${a.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${a.color||"#2563eb"}"></div>
            ${v(a.name)}
          </div>
          <span class="kanban-col-count">${o.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${v(a.name)}">${i}</div>
        <button class="kanban-add-btn" data-stage="${v(a.name)}">+ Adicionar lead</button>
      </div>`}).join(""),Xt(),window.lucide&&lucide.createIcons()}function Xt(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>openLeadModal())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=ke.find(a=>String(a.id)===String(t.dataset.id));n&&openLeadModal(n)}),t.addEventListener("dragstart",n=>{re=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!re||!a)return;await y.from("leads").update({stage:a}).eq("id",re);const o=ke.find(i=>String(i.id)===String(re));o&&(o.stage=a),re=null,gt()})}))}let M=[],nt=!1,Q="pending";async function Gt(){var e;nt||(nt=!0,await Vt(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>ft()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),Q=t.dataset.filter,ae()})}))}async function Vt(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=y.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(p==null?void 0:p.role)==="corretor"?t=t.eq("assigned_to",p.id):p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}M=n||[],ae()}function vt(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function ae(){const e=document.getElementById("tarefas-list");if(!e)return;let t=M;if(Q==="pending"&&(t=M.filter(a=>a.status!=="done")),Q==="done"&&(t=M.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${Q==="done"?"✅":"📋"}</div>
      <p>${Q==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=vt(a.due_date),i=o?o.toLocaleDateString("pt-BR"):"",s=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${v(a.title)}</div>
          <div class="tarefa-meta">
            ${i?`<span style="${s?"color:#ef4444;":""}">📅 ${i}${s?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${v(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const i=a.dataset.id,s=a.checked?"done":"pending";await y.from("tasks").update({status:s}).eq("id",i);const l=M.find(d=>String(d.id)===i);l&&(l.status=s),ae()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await y.from("tasks").delete().eq("id",a.dataset.id),M=M.filter(i=>String(i.id)!==String(a.dataset.id)),ae())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const i=a.dataset.id,s=M.find(l=>String(l.id)===i);s&&ft(s)})})}function ft(e=null){var d,r,c,g;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=vt(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const i=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",s=document.createElement("div");s.id="tarefa-modal-root",s.className="modal-backdrop",s.innerHTML=`
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
  `,document.body.appendChild(s);const l=()=>s.remove();(d=document.getElementById("tm-close"))==null||d.addEventListener("click",l),(r=document.getElementById("tm-cancel"))==null||r.addEventListener("click",l),s.addEventListener("click",m=>{m.target===s&&l()}),(c=document.getElementById("tm-toggle-done"))==null||c.addEventListener("click",async()=>{const m=a?"pending":"done";await y.from("tasks").update({status:m}).eq("id",e.id);const h=M.find(f=>String(f.id)===String(e.id));h&&(h.status=m),l(),m==="done"&&(Q="done",document.querySelectorAll(".tarefa-filter-btn").forEach(f=>{f.classList.toggle("active",f.dataset.filter==="done")})),ae()}),(g=document.getElementById("tm-save"))==null||g.addEventListener("click",async()=>{var u,b;const m=document.getElementById("tarefa-form");if(!m.checkValidity()){m.reportValidity();return}const h=new FormData(m),f=document.getElementById("tm-save");f.disabled=!0,f.textContent="Salvando…";const E={title:(u=h.get("title"))==null?void 0:u.trim(),description:((b=h.get("description"))==null?void 0:b.trim())||null,due_date:h.get("due_date")||null,priority:h.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(p==null?void 0:p.id)||null,tenant_id:(p==null?void 0:p.tenant_id)||null};let x;if(n){if({error:x}=await y.from("tasks").update(E).eq("id",e.id),!x){const I=M.findIndex(w=>String(w.id)===String(e.id));I>=0&&(M[I]={...M[I],...E})}}else{const{data:I,error:w}=await y.from("tasks").insert(E).select();x=w,!x&&(I!=null&&I[0])&&M.unshift(I[0])}if(f.disabled=!1,f.textContent=n?"Salvar":"Criar Tarefa",x){alert("Erro: "+x.message);return}l(),ae()})}async function Wt(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;p==null||p.role,p==null||p.tenant_id;const[{data:a},{data:o}]=await Promise.all([y.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),y.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),i=[];a!=null&&a.length&&(i.push('<div class="search-group-label">Imóveis</div>'),i.push(...a.map(s=>`
      <div class="search-result-item" data-type="property" data-id="${s.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${v(s.title||"—")}</div>
          <div class="search-result-sub">${v(s.reference||"")} · ${v(s.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(i.push('<div class="search-group-label">Leads / Contatos</div>'),i.push(...o.map(s=>`
      <div class="search-result-item" data-type="lead" data-id="${s.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${v(s.name||"—")}</div>
          <div class="search-result-sub">${v(s.email||s.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=i.length?i.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(s=>{s.addEventListener("click",()=>{var l;(l=document.getElementById("search-overlay"))==null||l.classList.add("hidden"),s.dataset.type==="lead"?J("contatos"):J("properties")})})}let U=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function Jt(){var s;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=y.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(l=>!U.includes(String(l.id))),i=document.getElementById("notif-badge");if(i&&(i.textContent=o.length,o.length>0?i.classList.remove("hidden"):i.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(l=>{const d=Kt(l.created_at);return`
      <div class="notif-item${!U.includes(String(l.id))?" unread":""}" data-id="${l.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${v(l.name||"—")}</div>
          <div class="notif-item-sub">${v(l.phone||l.source||"")} · ${d}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(s=document.getElementById("notif-see-all"))==null||s.addEventListener("click",l=>{l.preventDefault(),R(),J("contatos")}),e.querySelectorAll(".notif-item").forEach(l=>{l.addEventListener("click",()=>{U.push(l.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(U)),l.classList.remove("unread"),R(),J("contatos")})})}function Yt(){var e;document.querySelectorAll(".notif-item").forEach(t=>U.push(t.dataset.id)),U=[...new Set(U)],localStorage.setItem("crm_notifs_read",JSON.stringify(U)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function Kt(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function Qt(){let e=y.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);p!=null&&p.tenant_id&&(e=e.eq("tenant_id",p.tenant_id));const{data:t}=await e,a=(t||[]).filter(i=>!U.includes(String(i.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let F=[],q=1;const ce=10;let ot=!1;async function Zt(){var t,n,a,o,i,s,l,d,r;document.getElementById("section-contatos")&&(ot||(ot=!0,await yt(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{q=1,ne()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",c=>{c.key==="Enter"&&(q=1,ne())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>bt()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",aa),(i=document.getElementById("import-modal-close"))==null||i.addEventListener("click",Me),(s=document.getElementById("import-modal-cancel"))==null||s.addEventListener("click",Me),(l=document.getElementById("download-template"))==null||l.addEventListener("click",c=>{c.preventDefault();const g=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,m=new Blob([g],{type:"text/csv"}),h=document.createElement("a");h.href=URL.createObjectURL(m),h.download="modelo_contatos.csv",h.click()}),(d=document.getElementById("import-csv-file"))==null||d.addEventListener("change",ea),(r=document.getElementById("import-modal-confirm"))==null||r.addEventListener("click",ta)))}async function yt(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=y.from("leads").select("*").order("created_at",{ascending:!1});(p==null?void 0:p.role)==="corretor"?t=t.eq("assigned_to",p.id):p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id));const{data:a}=await t;F=a||[],ne()}function ne(){var l,d,r;const e=(((l=document.getElementById("contato-search"))==null?void 0:l.value)||"").toLowerCase(),t=e?F.filter(c=>(c.name||"").toLowerCase().includes(e)||(c.email||"").toLowerCase().includes(e)||(c.phone||"").toLowerCase().includes(e)):F,n=t.length,a=Math.max(1,Math.ceil(n/ce));q>a&&(q=a);const o=t.slice((q-1)*ce,q*ce),i=document.getElementById("contatos-tbody");if(!i)return;o.length?i.innerHTML=o.map(c=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${c.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${c.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${v(c.name||"—")}</a>
        </td>
        <td>${v(c.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${c.email?v(c.email):"—"}</td>
        <td style="font-size:13px;">${c.phone?v(c.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${v(c.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${c.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):i.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const s=document.getElementById("contatos-pagination");if(s){const c=n===0?0:(q-1)*ce+1,g=Math.min(q*ce,n);s.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${c}–${g}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${q<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${q} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${q>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(d=s.querySelector("#pag-prev"))==null||d.addEventListener("click",()=>{q--,ne()}),(r=s.querySelector("#pag-next"))==null||r.addEventListener("click",()=>{q++,ne()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(c=>{c.addEventListener("click",g=>{g.preventDefault();const m=c.dataset.id,h=F.find(f=>String(f.id)===String(m));h&&bt(h)})})}function bt(e=null){var i,s,l;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=document.createElement("div");a.id="contato-modal-root",a.className="modal-backdrop",a.innerHTML=`
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
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${v((e==null?void 0:e.notes)||"")}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cm-cancel">Cancelar</button>
        <button class="btn-primary" id="cm-save" style="margin:0;">${n?"Salvar":"Criar Contato"}</button>
      </div>
    </div>
  `,document.body.appendChild(a);const o=()=>a.remove();(i=document.getElementById("cm-close"))==null||i.addEventListener("click",o),(s=document.getElementById("cm-cancel"))==null||s.addEventListener("click",o),a.addEventListener("click",d=>{d.target===a&&o()}),(l=document.getElementById("cm-save"))==null||l.addEventListener("click",async()=>{var h,f,E,x,u,b,I;const d=document.getElementById("contato-form");if(!d.checkValidity()){d.reportValidity();return}const r=new FormData(d),c=document.getElementById("cm-save");c.disabled=!0,c.textContent="Salvando…";const g={name:(h=r.get("name"))==null?void 0:h.trim(),company:((f=r.get("company"))==null?void 0:f.trim())||null,email:((E=r.get("email"))==null?void 0:E.trim())||null,phone:((x=r.get("phone"))==null?void 0:x.trim())||null,job_title:((u=r.get("job_title"))==null?void 0:u.trim())||null,city_interest:((b=r.get("city_interest"))==null?void 0:b.trim())||null,notes:((I=r.get("notes"))==null?void 0:I.trim())||null,stage:(e==null?void 0:e.stage)||"novo",assigned_to:(p==null?void 0:p.id)||null,tenant_id:(p==null?void 0:p.tenant_id)||null,source:"manual"};let m;if(n){if({error:m}=await y.from("leads").update(g).eq("id",e.id),!m){const w=F.findIndex(S=>String(S.id)===String(e.id));w>=0&&(F[w]={...F[w],...g})}}else{const{data:w,error:S}=await y.from("leads").insert(g).select();m=S,!m&&(w!=null&&w[0])&&F.unshift(w[0])}if(c.disabled=!1,c.textContent=n?"Salvar":"Criar Contato",m){alert("Erro: "+m.message);return}o(),ne()})}let ee=[];function ea(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{ee=a.target.result.split(`
`).filter(l=>l.trim()).slice(1).map(l=>{const[d,r,c,g,m]=l.split(",").map(h=>h.trim().replace(/^"|"$/g,""));return{name:d,email:r,phone:c,company:g,job_title:m}}).filter(l=>l.name);const i=document.getElementById("import-preview");i&&(i.textContent=`${ee.length} contato(s) encontrados para importar.`);const s=document.getElementById("import-modal-confirm");s&&(s.disabled=ee.length===0)},n.readAsText(t)}async function ta(){if(!ee.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=ee.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(p==null?void 0:p.id)||null,tenant_id:(p==null?void 0:p.tenant_id)||null})),{error:n}=await y.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Me(),await yt(),alert(`${t.length} contato(s) importados com sucesso!`)}function aa(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),ee=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Me(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const na="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function oe(e){return(await fetch(na,{method:"POST",headers:{Authorization:`Bearer ${kt}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function it(e){var d,r,c,g;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),i=document.getElementById("settings-avatar-input"),s=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:m}}=await y.auth.getUser();n.value=(m==null?void 0:m.email)||""}const l=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=l),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),i==null||i.addEventListener("change",m=>{const h=m.target.files[0];if(!h)return;const f=URL.createObjectURL(h);a&&(a.src=f,a.style.display=""),o&&(o.style.display="none")}),(d=document.getElementById("btn-change-password"))==null||d.addEventListener("click",async()=>{var u,b;const m=((u=document.getElementById("change-password-new"))==null?void 0:u.value)||"",h=((b=document.getElementById("change-password-confirm"))==null?void 0:b.value)||"",f=document.getElementById("change-password-msg"),E=document.getElementById("btn-change-password");if(f&&(f.style.display="none"),m.length<6){f&&(f.textContent="Mínimo 6 caracteres.",f.style.display="");return}if(m!==h){f&&(f.textContent="As senhas não coincidem.",f.style.display="");return}E&&(E.disabled=!0,E.textContent="Salvando…");const{error:x}=await y.auth.updateUser({password:m});E&&(E.disabled=!1,E.textContent="Salvar Nova Senha"),x?f&&(f.textContent="Erro: "+x.message,f.style.display=""):(f&&(f.style.color="#16a34a",f.textContent="Senha alterada com sucesso!",f.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),s==null||s.addEventListener("click",async()=>{var b;const m=t.value.trim();let h=(p==null?void 0:p.avatar_url)||"";const f=i==null?void 0:i.files[0],E=s.textContent;if(s.disabled=!0,s.textContent="Salvando…",f)try{const I=await he(f,400,.85),w=`avatars/${p.id}-${Date.now()}.jpg`,{error:S}=await y.storage.from("imoveis").upload(w,I,{contentType:"image/jpeg",upsert:!0});if(!S){const{data:{publicUrl:B}}=y.storage.from("imoveis").getPublicUrl(w);h=B}}catch(I){console.error("Avatar upload:",I)}const{error:x}=await y.from("profiles").update({name:m,avatar_url:h}).eq("id",p.id);if(s.disabled=!1,s.textContent=E,x){alert("Erro ao salvar perfil.");return}p={...p,name:m,avatar_url:h},Le(p);const u=document.getElementById("settings-avatar-initial");u&&(u.textContent=((b=m[0])==null?void 0:b.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const m=document.getElementById("settings-corretores-section");m&&(m.style.display=""),await $e(),(r=document.getElementById("btn-invite-corretor"))==null||r.addEventListener("click",async()=>{var b,I;const f=(b=document.getElementById("invite-email"))==null?void 0:b.value.trim(),E=(I=document.getElementById("invite-password"))==null?void 0:I.value.trim(),x=document.getElementById("btn-invite-corretor"),u=document.getElementById("invite-note");if(!f){alert("Informe o e-mail do corretor.");return}if(!E||E.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}x&&(x.disabled=!0,x.textContent="Criando…"),u&&(u.style.display="none");try{const w=await oe({email:f,password:E,tenant_id:(p==null?void 0:p.tenant_id)||null});if(w.success){const S=document.getElementById("invite-email"),B=document.getElementById("invite-password");S&&(S.value=""),B&&(B.value=""),await $e(),u&&(w.email_sent===!1?(u.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${v(f)}<br>
                <strong>Senha:</strong> ${v(E)}`,u.style.color="#0f172a"):(u.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",u.style.color="#16a34a"),u.style.display="")}else alert("Erro: "+(w.error||"Falha desconhecida"))}catch(w){alert("Erro ao criar acesso: "+w.message)}finally{x&&(x.disabled=!1,x.textContent="+ Criar Acesso")}});const h=document.getElementById("settings-locations-section");h&&(h.style.display=""),await me(),(c=document.getElementById("loc-add-city-btn"))==null||c.addEventListener("click",async()=>{const f=document.getElementById("loc-new-city"),E=f==null?void 0:f.value.trim();if(!E)return;const{error:x}=await y.from("locations").insert({type:"cidade",name:E});if(x){alert("Erro ao adicionar cidade.");return}f&&(f.value=""),await me(),Ue()}),(g=document.getElementById("loc-add-neighborhood-btn"))==null||g.addEventListener("click",async()=>{var b;const f=parseInt((b=document.getElementById("loc-new-neighborhood-city"))==null?void 0:b.value,10),E=document.getElementById("loc-new-neighborhood"),x=E==null?void 0:E.value.trim();if(!f||!x){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:u}=await y.from("locations").insert({type:"bairro",name:x,parent_id:f});if(u){alert("Erro ao adicionar bairro.");return}E&&(E.value=""),await me()})}}async function $e(){const e=document.getElementById("corretores-list");if(!e)return;let t=y.from("profiles").select("*").order("created_at");p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const i=(o.name||"?")[0].toUpperCase(),s=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${v(i)}</div>`,l=o.id===(p==null?void 0:p.id),d=o.active!==!1,r=d?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',c=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,g=l?"":d?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,m=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${s}
        <div>
          <div class="corretor-name">${v(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${r}
        ${c}
        ${g}
        ${m}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await y.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.uid,s=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const l=await oe({action:"toggle",userId:i,active:!s});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await $e()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var l,d;const i=o.dataset.uid,s=((d=(l=o.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:d.textContent)||"este corretor";if(confirm(`Excluir "${s}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const r=await oe({action:"delete",userId:i});r.success||alert("Erro ao excluir: "+(r.error||"Falha desconhecida"))}catch(r){alert("Erro: "+r.message)}await $e()}})})}async function ht(){const{data:e,error:t}=await y.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(ve=e||[],ve)}function Y(){return ve.filter(e=>e.type==="cidade")}function Re(e){return ve.filter(t=>t.type==="bairro"&&t.parent_id===e)}function Ue(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=Y();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${v(a.name)}</option>`).join(""),t&&(e.value=t)}async function me(){await ht();const e=Y(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(i=>`
        <div class="loc-item">
          <span class="loc-item-name">${v(i.name)}</span>
          <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=ve.filter(i=>i.type==="bairro");n.innerHTML=o.length?o.map(i=>{const s=e.find(l=>l.id===i.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${v(i.name)}</div>
              ${s?`<div class="loc-item-sub">${v(s.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(i=>`<option value="${i.id}">${v(i.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{const s=i.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${s}" e todos os bairros vinculados?`))return;const{error:l}=await y.from("locations").delete().eq("id",i.dataset.id);if(l){alert("Erro ao excluir.");return}await me(),Ue()})}),n.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:s}=await y.from("locations").delete().eq("id",i.dataset.id);if(s){alert("Erro ao excluir.");return}await me()})})}function st(){var n,a,o,i,s,l,d,r,c,g,m,h,f,E,x,u,b,I,w,S;document.querySelectorAll(".filter-btn").forEach(B=>{B.addEventListener("click",()=>{const k=B.closest(".filter-btns"),L=B.classList.contains("active");k.querySelectorAll(".filter-btn").forEach($=>$.classList.remove("active")),L||B.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var _;const B=(_=document.getElementById("f-city"))==null?void 0:_.value,k=Y().find(T=>T.name===B),L=k?Re(k.id):[],$=document.getElementById("f-neighborhood");$&&($.innerHTML='<option value="">Todos</option>'+L.map(T=>`<option value="${T.name}">${v(T.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{ye(He(C))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach($=>{const _=document.getElementById($);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach($=>{const _=document.getElementById($);_&&(_.value="")});const L=document.getElementById("f-neighborhood");L&&(L.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach($=>$.classList.remove("active")),ye(C)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(B=>{B.addEventListener("click",()=>{J(B.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(B=>{B.addEventListener("click",()=>{J(B.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(B=>{B.addEventListener("click",k=>{k.stopPropagation();const L=B.closest(".topnav-dropdown");L==null||L.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach($=>{$!==L&&$.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(B=>B.classList.remove("open"))}),(i=document.getElementById("modal-close"))==null||i.addEventListener("click",Ee),(s=document.getElementById("modal-cancel"))==null||s.addEventListener("click",Ee),(l=document.getElementById("property-modal"))==null||l.addEventListener("click",B=>{B.target.id==="property-modal"&&Ee()}),(d=document.getElementById("btn-new-property"))==null||d.addEventListener("click",()=>{z=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",V="",Ie([]),qe("Novo Imóvel")}),(r=document.getElementById("logout-btn"))==null||r.addEventListener("click",async()=>{await y.auth.signOut(),location.reload()}),(c=document.getElementById("view-prev"))==null||c.addEventListener("click",()=>{j=(j-1+P.length)%P.length,Be()}),(g=document.getElementById("view-next"))==null||g.addEventListener("click",()=>{j=(j+1)%P.length,Be()}),(m=document.getElementById("view-modal-close"))==null||m.addEventListener("click",xe),(h=document.getElementById("view-modal-close2"))==null||h.addEventListener("click",xe),(f=document.getElementById("view-modal"))==null||f.addEventListener("click",B=>{B.target.id==="view-modal"&&xe()}),(E=document.getElementById("view-modal-share"))==null||E.addEventListener("click",()=>{const B=document.getElementById("share-panel");if(!B)return;const k=B.style.display!=="none";B.style.display=k?"none":"block"}),(x=document.getElementById("share-whatsapp"))==null||x.addEventListener("click",()=>{var $,_;const B=($=document.getElementById("share-link-input"))==null?void 0:$.value;if(!B)return;const k=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",L=encodeURIComponent("Olha esse imóvel que encontrei: "+k+`
`+B);window.open("https://wa.me/?text="+L,"_blank")}),(u=document.getElementById("share-instagram"))==null||u.addEventListener("click",()=>{var k,L;const B=(k=document.getElementById("share-link-input"))==null?void 0:k.value;B&&((L=navigator.clipboard)==null||L.writeText(B),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(b=document.getElementById("share-email"))==null||b.addEventListener("click",()=>{var _,T;const B=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!B)return;const k=((T=document.getElementById("view-modal-title"))==null?void 0:T.textContent)||"Imóvel",L=encodeURIComponent("Imóvel: "+k),$=encodeURIComponent(`Olá! Segue o link do imóvel:

`+B);window.open("mailto:?subject="+L+"&body="+$,"_blank")}),(I=document.getElementById("share-copy"))==null||I.addEventListener("click",()=>{var k;const B=document.getElementById("share-link-input");B&&((k=navigator.clipboard)==null||k.writeText(B.value).then(()=>{const L=document.getElementById("share-copy"),$=L.textContent;L.textContent="✅ Copiado!",setTimeout(()=>{L.textContent=$},2e3)}))}),(w=document.getElementById("view-modal-edit"))==null||w.addEventListener("click",()=>{var D;if((p==null?void 0:p.role)!=="admin")return;const B=document.getElementById("view-modal-title").textContent,k=C.find(N=>N.title===B);if(!k)return;xe(),z=k.id;const L=document.getElementById("property-form"),$=document.getElementById("form-submit-btn");$.textContent="Salvar Alterações",L.querySelector('[name="title"]').value=k.title||"",L.querySelector('[name="rua"]').value=k.rua||"",L.querySelector('[name="numero"]').value=k.numero||"",L.querySelector('[name="city"]').value=k.city||"",L.querySelector('[name="price"]').value=k.price||"",L.querySelector('[name="bedrooms"]').value=k.bedrooms||"",L.querySelector('[name="suites"]').value=k.suites||"",L.querySelector('[name="parking"]').value=k.parking||"",L.querySelector('[name="description"]').value=k.description||"",L.querySelector('[name="construction_status"]').value=k.construction_status||"",L.querySelector('[name="owner_name"]').value=k.owner_name||"",L.querySelector('[name="owner_phone"]').value=k.owner_phone||"",L.querySelector('[name="owner_email"]').value=k.owner_email||"",L.querySelector('[name="owner_notes"]').value=k.owner_notes||"",L.querySelector('[name="condominium"]').value=k.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=k.published===!0?"true":"false");const T=document.getElementById("adminCitySelect");T&&(T.value=k.city||"",T.dispatchEvent(new Event("change")),setTimeout(()=>{const N=document.getElementById("adminNeighborhood");N&&(N.value=k.neighborhood||"")},50)),V=k.cover_image||((D=k.images)==null?void 0:D[0])||"",Ie(k.images||[]),qe("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(B=>{B.addEventListener("click",()=>{var k;document.querySelectorAll(".tab-btn").forEach(L=>L.classList.remove("active")),B.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(L=>L.classList.add("hidden")),(k=document.getElementById(`tab-${B.dataset.tab}`))==null||k.classList.remove("hidden")})}),(S=document.getElementById("admin-properties"))==null||S.addEventListener("click",B=>{if(B.target.closest(".action-btns"))return;const k=B.target.closest("tr");if(!k)return;const L=Number(k.dataset.id);if(!L)return;const $=C.find(_=>_.id===L);$&&Ut($)})}document.addEventListener("DOMContentLoaded",async()=>{var i,s,l;await Promise.all([It(),ht()]),K=G("company.whatsapp",K),pe=`https://wa.me/${K}`,je(),Nt(),jt();const e=document.getElementById("adminCitySelect"),t=document.getElementById("adminNeighborhood");e&&t&&(Ue(),e.addEventListener("change",()=>{const d=Y().find(c=>c.name===e.value),r=d?Re(d.id):[];t.innerHTML='<option value="">Selecione a cidade primeiro</option>'+r.map(c=>`<option value="${c.name}">${v(c.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),a=document.getElementById("admin-root");if(n){const d=new URLSearchParams(window.location.hash.replace("#","")),r=new URLSearchParams(window.location.search),c=d.get("type")||r.get("type")||"",g=ut||c==="recovery"||c==="invite"||window.location.hash.includes("access_token")||r.has("code"),m=document.getElementById("password-reset-overlay");if(g){n.style.display="none",a&&a.classList.add("hidden"),m&&(m.style.display="flex"),(i=document.getElementById("password-reset-form"))==null||i.addEventListener("submit",async f=>{var w,S;f.preventDefault();const E=((w=document.getElementById("new-password"))==null?void 0:w.value)||"",x=((S=document.getElementById("confirm-password"))==null?void 0:S.value)||"",u=document.getElementById("password-reset-msg"),b=f.target.querySelector('button[type="submit"]');if(u&&(u.style.display="none"),E!==x){u&&(u.textContent="As senhas não coincidem.",u.style.display="");return}b&&(b.disabled=!0,b.textContent="Salvando…");const{error:I}=await y.auth.updateUser({password:E});if(I){u&&(u.textContent="Erro: "+I.message,u.style.display=""),b&&(b.disabled=!1,b.textContent="Definir Senha");return}window.location.href=window.location.pathname}),r.has("code")&&await y.auth.exchangeCodeForSession(r.get("code")??"");return}const{data:{session:h}}=await y.auth.getSession();if(h){if(n.classList.add("hidden"),a&&a.classList.remove("hidden"),Ae(),st(),et(),window.lucide&&lucide.createIcons(),p=await Qe(h.user.id),!p){await y.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden");return}if(p.active===!1){await y.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(p.needs_password_reset){n.style.display="none",a&&a.classList.add("hidden");const f=document.getElementById("password-reset-overlay");f&&(f.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async E=>{var S,B;E.preventDefault();const x=((S=document.getElementById("new-password"))==null?void 0:S.value)||"",u=((B=document.getElementById("confirm-password"))==null?void 0:B.value)||"",b=document.getElementById("password-reset-msg"),I=E.target.querySelector('button[type="submit"]');if(b&&(b.style.display="none"),x!==u){b&&(b.textContent="As senhas não coincidem.",b.style.display="");return}if(x.length<6){b&&(b.textContent="Mínimo 6 caracteres.",b.style.display="");return}I&&(I.disabled=!0,I.textContent="Salvando…");const{error:w}=await y.auth.updateUser({password:x});if(w){b&&(b.textContent="Erro: "+w.message,b.style.display=""),I&&(I.disabled=!1,I.textContent="Definir Senha");return}await y.from("profiles").update({needs_password_reset:!1}).eq("id",p.id),window.location.href=window.location.pathname});return}Ye((p==null?void 0:p.tenant_id)||null),Le(p),Ze(p.role),await we(),await it(p),window.lucide&&lucide.createIcons(),Qt()}else{a&&a.classList.add("hidden"),n.classList.remove("hidden");const f=document.getElementById("login-form");f&&((l=document.getElementById("forgot-password-btn"))==null||l.addEventListener("click",async()=>{var u,b;const E=(b=(u=f.querySelector('input[name="email"]'))==null?void 0:u.value)==null?void 0:b.trim();if(!E){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:x}=await y.auth.resetPasswordForEmail(E,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(x?"Erro: "+x.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),f.addEventListener("submit",async E=>{E.preventDefault();const x=new FormData(f),u=x.get("email"),b=x.get("password");if(await At(u,b)){n.classList.add("hidden"),a&&a.classList.remove("hidden"),Ae(),st(),window.lucide&&lucide.createIcons();const{data:{session:w}}=await y.auth.getSession();if(p=w?await Qe(w.user.id):null,!p){await y.auth.signOut();return}if(p.active===!1){await y.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}et(),Ye((p==null?void 0:p.tenant_id)||null),Le(p),Ze(p.role),await we(),await it(p),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else Ae();await fe();const o=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();Bt(o),Lt(K)});async function oa(){const e=C.filter(o=>!o.reference);if(!e.length)return;const t=C.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,i)=>o.id-i.id);for(const o of a){const i="IO-"+String(n).padStart(4,"0"),{error:s}=await y.from("properties").update({reference:i}).eq("id",o.id);if(!s){const l=C.findIndex(d=>d.id===o.id);l>=0&&(C[l].reference=i),n++}}ye(He(C))}async function ia(){const e=C.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(i=>!i.includes("/wm-")))continue;const a=[];let o=!1;for(const i of t.images)if(i.includes("/wm-"))a.push(i);else try{const s=await sa(i);a.push(s),o=!0}catch{a.push(i)}if(o){await y.from("properties").update({images:a}).eq("id",t.id);const i=C.findIndex(s=>s.id===t.id);i>=0&&(C[i].images=a)}}ye(He(C))}}async function sa(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),i=o.ok?await o.blob():null,s=i?URL.createObjectURL(i):null;return new Promise(l=>{const d=new Image;d.onload=()=>{URL.revokeObjectURL(a);const r=document.createElement("canvas"),c=1200;let g=d.width,m=d.height;g>c&&(m=Math.round(m*c/g),g=c),r.width=g,r.height=m;const h=r.getContext("2d");h.drawImage(d,0,0,g,m);const f=E=>{if(E){const x=Math.round(g*.18),u=Math.round(E.naturalHeight*x/E.naturalWidth),b=Math.round(g*.02);h.globalAlpha=.45,h.drawImage(E,g-x-b,m-u-b,x,u),h.globalAlpha=1}r.toBlob(async x=>{try{const u=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:b}=await y.storage.from("imoveis").upload(u,x,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(b){console.error("Upload watermark error:",b),l(e);return}const{data:{publicUrl:I}}=y.storage.from("imoveis").getPublicUrl(u);l(I)}catch(u){console.error("Watermark upload exception:",u),l(e)}},"image/jpeg",.82)};if(s){const E=new Image;E.onload=()=>{URL.revokeObjectURL(s),f(E)},E.onerror=()=>{URL.revokeObjectURL(s),f(null)},E.src=s}else f(null)},d.onerror=()=>{URL.revokeObjectURL(a),l(e)},d.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function H(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function De(e,t="assets"){const n=await he(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await y.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:i}}=y.storage.from("imoveis").getPublicUrl(a);return i}async function da(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",Ne()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>v(String(n[o]||""));e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Empresa</div><div class="section-sub">Identidade, contatos e redes sociais</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏢</span> Identidade</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nome da Empresa</label>
          <input id="co-name" class="form-control" value="${a("company.name")}" placeholder="Nome completo">
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
        <div class="logo-preview-box" style="margin-top:10px">
          <img id="co-logo-preview" src="${a("company.logo_url")||"/logo.png"}" alt="Preview">
          <span style="font-size:12px;color:#9ca3af">Preview do logotipo</span>
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Favicon (URL)</label>
        <input id="co-favicon-url" class="form-control" value="${a("company.favicon_url")}" placeholder="/favicon.ico">
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const i=o.target.files[0];if(i)try{const s=await De(i,"logos");document.getElementById("co-logo-url").value=s,document.getElementById("co-logo-preview").src=s}catch(s){alert("Erro no upload: "+s.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const i=await Z([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);i&&je(),o.disabled=!1,o.textContent="Salvar Identidade",H(document.getElementById("co-identity-msg"),i)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const i=document.getElementById("co-whatsapp").value.trim(),s=await Z([["company.whatsapp",i],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);s&&i&&(K=i,pe=`https://wa.me/${i}`),o.disabled=!1,o.textContent="Salvar Contatos",H(document.getElementById("co-contacts-msg"),s)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const i=await Z([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",H(document.getElementById("co-social-msg"),i)})}async function la(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",Ne()),n={};t==null||t.forEach(c=>{n[c.key]=c.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",i=n["visual.secondary_bg"]||"#1a2f4a",s=n["visual.hero_bg_url"]||"",l=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
        <label class="form-label">Cor de Destaque (Dourado)</label>
        <div class="color-swatch">
          <input type="color" id="col-accent" value="${a}">
          <input type="text"  id="col-accent-hex" value="${a}" maxlength="7" placeholder="#b8962e">
        </div>
      </div>
      <div class="color-row">
        <label class="form-label">Fundo Principal (Site Público)</label>
        <div class="color-swatch">
          <input type="color" id="col-primary" value="${o}">
          <input type="text"  id="col-primary-hex" value="${o}" maxlength="7">
        </div>
      </div>
      <div class="color-row">
        <label class="form-label">Fundo Secundário (Seções)</label>
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
        <label class="form-label">Imagem de Fundo do Hero (URL)</label>
        <div style="display:flex;gap:8px">
          <input id="vis-hero-url" class="form-control" value="${v(s)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <div id="vis-hero-preview" style="margin-top:10px;display:${s?"":"none"}">
          <img src="${v(s)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function d(c,g,m){const h=document.getElementById(c),f=document.getElementById(g);h==null||h.addEventListener("input",E=>{f.value=E.target.value,m()}),f==null||f.addEventListener("input",E=>{/^#[0-9a-fA-F]{6}$/.test(E.target.value)&&(h.value=E.target.value,m())})}function r(){var g,m,h,f;const c=((g=document.getElementById("col-accent-hex"))==null?void 0:g.value)||"#b8962e";(m=document.getElementById("vp-bar"))==null||m.style.setProperty("background",c),(h=document.getElementById("vp-dot"))==null||h.style.setProperty("background",c),(f=document.getElementById("vp-btn"))==null||f.style.setProperty("background",c),document.documentElement.style.setProperty("--accent",c)}d("col-accent","col-accent-hex",r),d("col-primary","col-primary-hex",()=>{}),d("col-secondary","col-secondary-hex",()=>{}),r(),document.getElementById("vis-hero-file").addEventListener("change",async c=>{const g=c.target.files[0];if(g)try{const m=await De(g,"hero");document.getElementById("vis-hero-url").value=m;const h=document.getElementById("vis-hero-preview");h.innerHTML=`<img src="${m}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,h.style.display=""}catch(m){alert("Erro no upload: "+m.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const c=document.getElementById("visual-save-colors");c.disabled=!0,c.textContent="Salvando…";const g=await Z([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);g&&je(),c.disabled=!1,c.textContent="Salvar Cores",H(document.getElementById("visual-colors-msg"),g)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",r())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const c=document.getElementById("visual-save-images");c.disabled=!0,c.textContent="Salvando…";const g=await Z([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);c.disabled=!1,c.textContent="Salvar Imagens",H(document.getElementById("visual-images-msg"),g)})}async function ra(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("site_content").select("*").eq("tenant_id",Ne()),n={};t==null||t.forEach(d=>{n[d.key]=d});const a=(d,r)=>{var c;return v(((c=n[d])==null?void 0:c[`value_${r}`])||"")},o=["pt","en","es"],i={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},s=d=>o.map(r=>`<button class="content-tab${r===d?" active":""}" data-lang="${r}">${i[r]}</button>`).join(""),l=d=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${d}" value="${a("hero.title",d)}">
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${d}" rows="3">${a("hero.subtitle",d)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${d}" rows="4">${a("inst.bio_p1",d)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${d}" rows="3">${a("inst.bio_p2",d)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${d}" rows="3">${a("inst.bio_p3",d)}</textarea>
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
      <div class="content-tabs" id="sc-tabs">${s("pt")}</div>
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
  `,document.getElementById("sc-tabs").addEventListener("click",d=>{var c;const r=d.target.closest(".content-tab");r&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(g=>g.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(g=>g.classList.remove("active")),r.classList.add("active"),(c=document.querySelector(`#sc-panels [data-panel="${r.dataset.lang}"]`))==null||c.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const d=document.getElementById("sc-save-btn");d.disabled=!0,d.textContent="Salvando…";const r={};document.querySelectorAll(".sc-field").forEach(g=>{const m=g.dataset.key,h=g.dataset.lang;r[m]||(r[m]={}),r[m][h]=g.value});let c=!0;for(const[g,m]of Object.entries(r))await Ce(g,{pt:m.pt,en:m.en,es:m.es})||(c=!1);d.disabled=!1,d.textContent="Salvar Conteúdo",H(document.getElementById("sc-save-msg"),c)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const d=document.getElementById("seo-save-btn");d.disabled=!0,d.textContent="Salvando…";const r=document.getElementById("seo-title").value.trim(),c=document.getElementById("seo-desc").value.trim(),g=await Ce("seo.title_pt",{pt:r,en:r,es:r})&&await Ce("seo.description_pt",{pt:c,en:c,es:c});d.disabled=!1,d.textContent="Salvar SEO",H(document.getElementById("seo-save-msg"),g)})}async function ca(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await O())}async function O(){const e=document.getElementById("crm-body");if(!e)return;const[{data:t},{data:n},{data:a},{data:o}]=await Promise.all([y.from("crm_pipelines").select("*").order("sort_order"),y.from("crm_stages").select("*").order("sort_order"),y.from("crm_tags").select("*").order("name"),y.from("crm_lead_statuses").select("*").order("sort_order")]),i=t||[],s=i.find(m=>m.is_default)||i[0],l=i.map(m=>`<option value="${m.id}"${m.id===(s==null?void 0:s.id)?" selected":""}>${v(m.name)}</option>`).join(""),r=(n||[]).filter(m=>m.pipeline_id===(s==null?void 0:s.id)).map(m=>`
    <div class="stage-item" data-id="${m.id}">
      <div class="stage-color-dot" style="background:${m.color}"></div>
      <span class="stage-name">${v(m.name)}</span>
      <input type="color" value="${m.color}" data-sid="${m.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${m.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',c=(a||[]).map(m=>`<span class="tag-chip" style="background:${m.color}" data-id="${m.id}">
      ${v(m.name)}
      <button class="tag-chip-del" data-id="${m.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',g=(o||[]).map(m=>`
    <div class="stage-item" data-id="${m.id}">
      <div class="stage-color-dot" style="background:${m.color}"></div>
      <span class="stage-name">${v(m.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${m.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${m.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${l}</select>
        <button class="btn-secondary" id="crm-add-pipeline" style="font-size:13px;padding:7px 14px">+ Novo Funil</button>
      </div>
      <div class="stages-list" id="crm-stages-list">${r}</div>
      <div class="stage-add-row">
        <input id="crm-new-stage" type="text" class="form-control" placeholder="Nome da etapa…">
        <input type="color" id="crm-new-stage-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <button class="btn-primary" id="crm-add-stage">Adicionar Etapa</button>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏷️</span> Tags</div>
      <div class="tags-grid" id="crm-tags-grid">${c}</div>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const m=document.getElementById("crm-new-stage").value.trim(),h=document.getElementById("crm-new-stage-color").value,f=parseInt(document.getElementById("crm-pipe-sel").value,10);m&&(await y.from("crm_stages").insert({pipeline_id:f,name:m,color:h,sort_order:99}),document.getElementById("crm-new-stage").value="",await O())}),e.querySelectorAll(".stage-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await y.from("crm_stages").delete().eq("id",m.dataset.id),await O())})}),e.querySelectorAll(".stage-color-pick").forEach(m=>{m.addEventListener("change",async h=>{await y.from("crm_stages").update({color:h.target.value}).eq("id",m.dataset.sid);const f=m.closest(".stage-item").querySelector(".stage-color-dot");f&&(f.style.background=h.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const m=document.getElementById("crm-new-tag").value.trim(),h=document.getElementById("crm-new-tag-color").value;m&&(await y.from("crm_tags").insert({name:m,color:h}),document.getElementById("crm-new-tag").value="",await O())}),e.querySelectorAll(".tag-chip-del").forEach(m=>{m.addEventListener("click",async()=>{await y.from("crm_tags").delete().eq("id",m.dataset.id),await O()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const m=document.getElementById("crm-new-status").value.trim(),h=document.getElementById("crm-new-status-color").value,f=document.getElementById("crm-new-status-final").checked;m&&(await y.from("crm_lead_statuses").insert({name:m,color:h,is_final:f,sort_order:99}),document.getElementById("crm-new-status").value="",await O())}),e.querySelectorAll(".status-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Remover este status?")&&(await y.from("crm_lead_statuses").delete().eq("id",m.dataset.id),await O())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var h;const m=(h=prompt("Nome do novo funil:"))==null?void 0:h.trim();m&&(await y.from("crm_pipelines").insert({name:m,sort_order:99}),await O())})}async function ma(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("integrations").select("*"),n={};t==null||t.forEach(l=>{n[l.key]=l});const a=l=>{var d;return v(((d=n[l])==null?void 0:d.value)||"")},o=l=>{var d;return(d=n[l])!=null&&d.enabled?"checked":""},i=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],s=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
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
      ${s.map(l=>`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var g;const l=document.getElementById("intg-save-tracking");l.disabled=!0,l.textContent="Salvando…";let d=!0;const r=document.querySelectorAll(".intg-val"),c=document.querySelectorAll(".intg-toggle");for(let m=0;m<r.length;m++){const h=r[m].dataset.key,f=r[m].value.trim(),E=((g=c[m])==null?void 0:g.checked)??!1;await Te(h,f,E)||(d=!1)}l.disabled=!1,l.textContent="Salvar Integrações",H(document.getElementById("intg-tracking-msg"),d)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const l=document.getElementById("intg-save-smtp");l.disabled=!0,l.textContent="Salvando…";const d=document.querySelectorAll(".smtp-field");let r=!0;for(const g of d)await Te(g.dataset.key,g.value.trim(),!0)||(r=!1);const c=document.getElementById("smtp-pass").value;c&&(await Te("smtp_pass",c,!0)||(r=!1)),l.disabled=!1,l.textContent="Salvar SMTP",H(document.getElementById("intg-smtp-msg"),r)})}async function ua(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await ze(),document.getElementById("media-file-input").addEventListener("change",async n=>{var d,r;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),i=document.getElementById("media-progress-fill"),s=document.getElementById("media-progress-text");o.style.display="";let l=0;for(const c of a){s.textContent=`Enviando ${l+1}/${a.length}…`,i.style.width=`${Math.round(l/a.length*100)}%`;try{const g=await De(c,"media"),m=c.name.replace(/\.[^.]+$/,"").slice(0,60);await y.from("media_library").insert({name:m,url:g,type:"image",size:c.size,created_by:(r=(d=(await y.auth.getUser()).data)==null?void 0:d.user)==null?void 0:r.id})}catch(g){console.error("Media upload error:",g)}l++}i.style.width="100%",s.textContent=`✓ ${l} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",i.style.width="0"},2e3),await ze(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function ze(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await y.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${v(a.url)}">
      <img src="${v(a.url)}" alt="${v(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${v(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${v(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation(),(i=navigator.clipboard)==null||i.writeText(a.dataset.url).then(()=>{const s=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=s},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await y.from("media_library").delete().eq("id",a.dataset.id),await ze())})})}async function pa(){var t,n,a,o,i;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(s=>{s.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(d=>d.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(d=>d.classList.add("hidden")),s.classList.add("active");const l=e.querySelector(`#sa-panel-${s.dataset.tab}`);l&&l.classList.remove("hidden"),s.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&X(),s.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&ga(),s.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&dt(),s.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&lt(),s.dataset.tab==="platform"&&rt()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",dt),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",X),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",lt),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>ya()),(i=e.querySelector("#sa-plat-save"))==null||i.addEventListener("click",va),X(),rt())}async function X(){var l,d;const e=document.getElementById("sa-tenants-list"),t=((d=(l=document.getElementById("sa-tenant-search"))==null?void 0:l.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=y.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const i=(a||[]).filter(r=>{var c,g;return!t||((c=r.name)==null?void 0:c.toLowerCase().includes(t))||((g=r.slug)==null?void 0:g.toLowerCase().includes(t))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const s=r=>r.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=i.map(r=>{var c;return`
    <div class="sa-list-row" data-action="open-panel" data-id="${r.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${r.logo_url?`<img class="sa-tenant-logo" src="${v(r.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${v(r.name||"—")}</div>
          <div class="sa-list-sub">${v(r.slug||"")} · ${v(((c=r.plans)==null?void 0:c.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${s(r)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${r.id}" data-active="${r.active}" title="${r.active?"Desativar":"Ativar"}">${r.active?"⏸️":"▶️"}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(r=>{r.addEventListener("click",async c=>{c.stopPropagation();const g=r.dataset.active==="true";await y.from("tenants").update({active:!g}).eq("id",r.dataset.id),X()})}),e.querySelectorAll('[data-action="open-panel"]').forEach(r=>{r.addEventListener("click",()=>{const c=(i||[]).find(g=>String(g.id)===String(r.dataset.id));c&&ba(c)})})}async function ga(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await y.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${v(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function dt(){var l;const e=document.getElementById("sa-subs-list"),t=((l=document.getElementById("sa-sub-filter"))==null?void 0:l.value)||"";if(!e)return;e.dataset.loaded="1";let n=y.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const i={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},s={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(d=>{var r,c,g;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${v(((r=d.tenants)==null?void 0:r.name)||"—")}</div>
          <div class="sa-list-sub">${v(((c=d.plans)==null?void 0:c.name)||"—")} · R$ ${Number(((g=d.plans)==null?void 0:g.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${i[d.status]||"gray"}">${s[d.status]||d.status}</span>
        <span class="sa-list-date">${d.current_period_end?new Date(d.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function lt(){var s,l;const e=document.getElementById("sa-users-list"),t=((l=(s=document.getElementById("sa-user-search"))==null?void 0:s.value)==null?void 0:l.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await y.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(d=>{var r,c;return!t||((r=d.name)==null?void 0:r.toLowerCase().includes(t))||((c=d.email)==null?void 0:c.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const i={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(d=>{var r;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(d.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${v(d.name||"—")}</div>
          <div class="sa-list-sub">${v(((r=d.tenants)==null?void 0:r.name)||"Sem imobiliária")} · ${i[d.role]||d.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${d.active!==!1?"sa-badge-green":"sa-badge-red"}">${d.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function rt(){const[e,t,n,a]=await Promise.all([y.from("tenants").select("id",{count:"exact",head:!0}),y.from("profiles").select("id",{count:"exact",head:!0}),y.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),y.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(i,s)=>{const l=document.getElementById(i);l&&(l.textContent=s??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function va(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await Z([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),H(t,!0)}function fa(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ya(){var a,o,i,s,l,d;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),y.from("plans").select("id, name").then(({data:r})=>{const c=document.getElementById("nt-plan");c&&r&&(c.innerHTML='<option value="">Sem plano</option>'+r.map(g=>`<option value="${g.id}">${v(g.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",r=>{const c=document.getElementById("nt-slug");c&&!c.dataset.manual&&(c.value=fa(r.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",r=>{r.target.dataset.manual="1"}),(i=document.getElementById("nt-pwd-toggle"))==null||i.addEventListener("click",()=>{const r=document.getElementById("nt-admin-password");r.type=r.type==="password"?"text":"password"});const n=()=>t.remove();(s=document.getElementById("sa-modal-close-btn"))==null||s.addEventListener("click",n),(l=document.getElementById("nt-cancel"))==null||l.addEventListener("click",n),t.addEventListener("click",r=>{r.target===t&&n()}),(d=document.getElementById("nt-save"))==null||d.addEventListener("click",async()=>{var S,B,k,L,$,_,T,D,N,ie,se,de;const r=(B=(S=document.getElementById("nt-name"))==null?void 0:S.value)==null?void 0:B.trim(),c=(L=(k=document.getElementById("nt-slug"))==null?void 0:k.value)==null?void 0:L.trim(),g=(_=($=document.getElementById("nt-domain"))==null?void 0:$.value)==null?void 0:_.trim(),m=(T=document.getElementById("nt-plan"))==null?void 0:T.value,h=(N=(D=document.getElementById("nt-admin-email"))==null?void 0:D.value)==null?void 0:N.trim(),f=(se=(ie=document.getElementById("nt-admin-password"))==null?void 0:ie.value)==null?void 0:se.trim(),E=document.getElementById("nt-msg"),x=document.getElementById("nt-save");if(!r||!c){E.textContent="❌ Nome e slug são obrigatórios.",E.style.color="#ef4444";return}if(!h){E.textContent="❌ Informe o e-mail do admin.",E.style.color="#ef4444";return}if(!f||f.length<6){E.textContent="❌ A senha precisa ter mínimo 6 caracteres.",E.style.color="#ef4444";return}x.disabled=!0,x.textContent="Criando…",E.textContent="⏳ Criando imobiliária…",E.style.color="#64748b";const{data:u,error:b}=await y.from("tenants").insert({name:r,slug:c,domain:g||null,plan_id:m||null,active:!0}).select();if(b){x.disabled=!1,x.textContent="Criar Imobiliária",E.textContent="❌ "+b.message,E.style.color="#ef4444";return}const I=(de=u==null?void 0:u[0])==null?void 0:de.id;E.textContent="⏳ Criando usuário admin…";const w=await oe({email:h,password:f,role:"admin",tenant_id:I});if(!(w!=null&&w.success)){x.disabled=!1,x.textContent="Criar Imobiliária",E.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+v((w==null?void 0:w.error)||"Desconhecido"),E.style.color="#f59e0b",setTimeout(()=>{n(),X()},3e3);return}I&&(w!=null&&w.user_id)&&!(w!=null&&w.linked)&&await y.from("profiles").update({tenant_id:I}).eq("id",w.user_id),x.disabled=!1,x.textContent="Criar Imobiliária",w.email_sent===!1?(E.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${v(w.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${v(h)}</strong><br>
          Senha: <strong>${v(f)}</strong>
        </div>`,E.style.color="#0f172a"):(E.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",E.style.color="#22c55e",setTimeout(()=>{n(),X()},1500))})}function ba(e){var a;(a=document.getElementById("tenant-panel"))==null||a.remove();const t=document.createElement("div");t.id="tenant-panel",t.style.cssText="position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;";const n=[{id:"properties",label:"🏠 Imóveis"},{id:"leads",label:"📋 Leads"},{id:"users",label:"👥 Corretores"},{id:"api",label:"🔗 Site & API"},{id:"config",label:"⚙️ Configurações"}];t.innerHTML=`
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
  `,document.body.appendChild(t),document.getElementById("tp-back").addEventListener("click",()=>t.remove()),document.getElementById("tp-edit-btn").addEventListener("click",()=>xt(e)),t.querySelectorAll(".tp-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".tp-tab").forEach(i=>{i.style.fontWeight="500",i.style.color="#64748b",i.style.borderBottomColor="transparent"}),o.style.fontWeight="700",o.style.color="#2563eb",o.style.borderBottomColor="#2563eb",ct(e,o.dataset.tab)})}),ct(e,"properties")}async function ct(e,t){var a,o,i;const n=document.getElementById("tp-content");if(n){if(n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>',t==="properties"){const{data:s}=await y.from("properties").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1});if(!(s!=null&&s.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>';return}n.innerHTML=`
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
          <tbody>${s.map(l=>{var d;return`
            <tr style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  ${(d=l.images)!=null&&d[0]?`<img src="${l.images[0]}" style="width:52px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;">`:'<div style="width:52px;height:38px;background:#e2e8f0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>'}
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${v(l.title||"")}</div><div style="font-size:11px;color:#94a3b8;">${v(l.reference||"")}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${v([l.neighborhood,l.city].filter(Boolean).join(", "))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">R$ ${v(String(l.price||"—"))}</td>
              <td style="padding:12px 16px;text-align:center;">${l.published?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Publicado</span>':'<span style="background:#f1f5f9;color:#64748b;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Rascunho</span>'}</td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`}if(t==="leads"){const{data:s}=await y.from("leads").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}).limit(100);if(!(s!=null&&s.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">📋</div><p style="font-size:14px;">Nenhum lead ainda.</p></div>';return}const l=r=>({novo:"Novo",contato:"Contato",proposta:"Proposta",fechado:"Fechado"})[r]||r||"Novo",d=r=>({novo:"#dbeafe,#1d4ed8",contato:"#fef3c7,#92400e",proposta:"#ede9fe,#6d28d9",fechado:"#dcfce7,#15803d"})[r]||"#f1f5f9,#64748b";n.innerHTML=`
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
          <tbody>${s.map(r=>{const[c,g]=d(r.stage).split(",");return`<tr style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${v(r.name||"")}</td>
              <td style="padding:12px 16px;"><div style="font-size:13px;color:#475569;">${v(r.phone||"")}</div><div style="font-size:11px;color:#94a3b8;">${v(r.email||"")}</div></td>
              <td style="padding:12px 16px;"><span style="background:${c};color:${g};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${l(r.stage)}</span></td>
              <td style="padding:12px 16px;font-size:12px;color:#94a3b8;">${new Date(r.created_at).toLocaleDateString("pt-BR")}</td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`}if(t==="users"){const{data:s}=await y.from("profiles").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}),l=`<button onclick="window._tpTenantId='${e.id}';openAddCorretorModal('${e.id}')" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;font-weight:600;">+ Adicionar Corretor</button>`;if(!(s!=null&&s.length)){n.innerHTML=`<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">👥</div><p style="font-size:14px;margin-bottom:16px;">Nenhum corretor cadastrado ainda.</p>${l}</div>`;return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${s.length} usuário(s)</h3>
          ${l}
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:400px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">USUÁRIO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">FUNÇÃO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
          </tr></thead>
          <tbody>${s.map(d=>`
            <tr style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${v(d.name||d.email||"—")}</div><div style="font-size:11px;color:#94a3b8;">${v(d.email||"")}</div></td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${v(d.role||"corretor")}</td>
              <td style="padding:12px 16px;text-align:center;">${d.active!==!1?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Ativo</span>':'<span style="background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Pausado</span>'}</td>
            </tr>`).join("")}
          </tbody>
        </table></div>
      </div>`}if(t==="api"){const s="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api",l=`https://omarcorretor.com.br/demo.html?key=${e.id}`;n.innerHTML=`
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
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🌐 Site Demonstração</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.</p>
          <a href="${v(l)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">Abrir site demo →</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${v(l)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/properties?key=${v(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/properties/{id}?key=${v(e.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${s}/leads?key=${v(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${s}/settings?key=${v(e.id)}</div>
          </div>
        </div>
      </div>`,(a=document.getElementById("tp-copy-key"))==null||a.addEventListener("click",()=>{var c;(c=navigator.clipboard)==null||c.writeText(e.id);const d=document.getElementById("tp-copy-key"),r=d.textContent;d.textContent="✅ Copiada!",setTimeout(()=>{d.textContent=r},2e3)})}if(t==="config"){const{data:s}=await y.from("settings").select("key,value").eq("tenant_id",e.id),l={};s==null||s.forEach(r=>{l[r.key]=r.value});const d=(r,c)=>`
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${r}</div>
        <div style="font-size:14px;color:#0f172a;">${v(String(c||"—"))}</div>
      </div>`;n.innerHTML=`
      <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);max-width:560px;">
        <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 20px;">⚙️ Configurações da imobiliária</h3>
        ${d("NOME DA EMPRESA",l["company.name"]||e.name)}
        ${d("TELEFONE",l["company.phone"])}
        ${d("E-MAIL",l["company.email"])}
        ${d("WHATSAPP",l["company.whatsapp"])}
        ${d("CIDADE",l["company.city"])}
        ${d("DOMÍNIO DO SITE",e.domain)}
        ${d("PLANO",((o=e.plans)==null?void 0:o.name)||"Sem plano")}
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
          <button id="tp-open-edit" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">✏️ Editar dados completos</button>
        </div>
      </div>`,(i=document.getElementById("tp-open-edit"))==null||i.addEventListener("click",()=>xt(e))}}}function xt(e){var r,c,g,m,h,f,E,x;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
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
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([u,b,I])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${u==="GET"?"#dcfce7":"#fef9c3"};color:${u==="GET"?"#15803d":"#854d0e"};">${u}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${b}?key=CHAVE</code>
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
  `,document.body.appendChild(n),y.from("plans").select("id, name").then(({data:u})=>{const b=document.getElementById("et-plan");b&&u&&(b.innerHTML='<option value="">Sem plano</option>'+u.map(I=>`<option value="${I.id}"${String(I.id)===String(e.plan_id)?" selected":""}>${v(I.name)}</option>`).join(""))}),(r=document.getElementById("et-logo-input"))==null||r.addEventListener("change",u=>{const b=u.target.files[0];if(!b)return;const I=URL.createObjectURL(b),w=document.getElementById("et-logo-preview");w&&(w.innerHTML=`<img src="${I}" style="width:100%;height:100%;object-fit:cover;">`)}),(c=document.getElementById("et-logo-preview"))==null||c.addEventListener("click",()=>{var u;(u=document.getElementById("et-logo-input"))==null||u.click()}),(g=document.getElementById("et-pwd-toggle"))==null||g.addEventListener("click",()=>{const u=document.getElementById("et-admin-password");u.type=u.type==="password"?"text":"password"}),(m=document.getElementById("et-copy-key"))==null||m.addEventListener("click",()=>{var w,S;const u=(w=document.getElementById("et-api-key"))==null?void 0:w.value;if(!u)return;(S=navigator.clipboard)==null||S.writeText(u);const b=document.getElementById("et-copy-key"),I=b.textContent;b.textContent="✅ Copiada!",setTimeout(()=>{b.textContent=I},2e3)});const o=["dados","config","api"];function i(u){o.forEach(b=>{document.getElementById(`et-pane-${b}`).style.display=b===u?"":"none";const I=document.getElementById(`et-tab-${b}`);I.style.borderBottomColor=b===u?"#2563eb":"transparent",I.style.color=b===u?"#2563eb":"#64748b",I.style.fontWeight=b===u?"600":"500"}),u==="config"&&l()}o.forEach(u=>{var b;return(b=document.getElementById(`et-tab-${u}`))==null?void 0:b.addEventListener("click",()=>i(u))});let s=!1;async function l(){var I;if(s)return;s=!0;const{data:u}=await y.from("settings").select("key,value").eq("tenant_id",e.id),b={};u==null||u.forEach(w=>{b[w.key]=w.value}),document.getElementById("et-pane-config").innerHTML=`
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${v(b["company.whatsapp"]||"")}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${v(b["company.phone"]||"")}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${v(b["company.email"]||"")}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${v(b["company.city"]||b["company.address"]||"")}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${v(b["company.slogan"]||"")}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `,(I=document.getElementById("et-cfg-save"))==null||I.addEventListener("click",async()=>{const w=document.getElementById("et-cfg-save"),S=document.getElementById("et-cfg-msg");w.disabled=!0,w.textContent="Salvando…",S.textContent="",S.style.color="#64748b";const B=document.getElementById("et-cfg-wa").value.trim().replace(/\D/g,""),k=document.getElementById("et-cfg-phone").value.trim(),L=document.getElementById("et-cfg-email").value.trim(),$=document.getElementById("et-cfg-city").value.trim(),_=document.getElementById("et-cfg-slogan").value.trim(),{error:T}=await y.from("settings").upsert([{key:"company.whatsapp",value:B,tenant_id:e.id},{key:"company.phone",value:k,tenant_id:e.id},{key:"company.email",value:L,tenant_id:e.id},{key:"company.city",value:$,tenant_id:e.id},{key:"company.address",value:$,tenant_id:e.id},{key:"company.slogan",value:_,tenant_id:e.id}],{onConflict:"tenant_id,key"});w.disabled=!1,w.textContent="💾 Salvar configurações",T?(S.textContent="❌ "+T.message,S.style.color="#ef4444"):(S.textContent="✅ Configurações salvas!",S.style.color="#22c55e")})}const d=()=>n.remove();(h=document.getElementById("et-close"))==null||h.addEventListener("click",d),(f=document.getElementById("et-cancel"))==null||f.addEventListener("click",d),n.addEventListener("click",u=>{u.target===n&&d()}),(E=document.getElementById("et-delete"))==null||E.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const b=document.getElementById("et-delete");b.disabled=!0,b.textContent="Excluindo…";const{error:I}=await y.from("tenants").delete().eq("id",e.id);if(I){alert("Erro ao excluir: "+I.message),b.disabled=!1,b.textContent="🗑️ Excluir";return}d(),X()}),(x=document.getElementById("et-save"))==null||x.addEventListener("click",async()=>{var D,N,ie,se,de,Oe,Pe,Fe,Xe,Ge,Ve,We;const u=(N=(D=document.getElementById("et-name"))==null?void 0:D.value)==null?void 0:N.trim(),b=(se=(ie=document.getElementById("et-slug"))==null?void 0:ie.value)==null?void 0:se.trim(),I=(Oe=(de=document.getElementById("et-domain"))==null?void 0:de.value)==null?void 0:Oe.trim(),w=(Pe=document.getElementById("et-plan"))==null?void 0:Pe.value,S=(Xe=(Fe=document.getElementById("et-admin-email"))==null?void 0:Fe.value)==null?void 0:Xe.trim(),B=(Ve=(Ge=document.getElementById("et-admin-password"))==null?void 0:Ge.value)==null?void 0:Ve.trim(),k=(We=document.getElementById("et-logo-input"))==null?void 0:We.files[0],L=document.getElementById("et-msg"),$=document.getElementById("et-save");if(!u){L.textContent="❌ Nome é obrigatório.",L.style.color="#ef4444";return}$.disabled=!0,$.textContent="Salvando…",L.textContent="⏳ Salvando…",L.style.color="#64748b";let _=e.logo_url;if(k)try{const A=await he(k,256,.85),Je=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:Et}=await y.storage.from("imoveis").upload(Je,A,{contentType:"image/jpeg",upsert:!0});if(!Et){const{data:{publicUrl:wt}}=y.storage.from("imoveis").getPublicUrl(Je);_=wt}}catch(A){console.error("Logo upload:",A)}const{error:T}=await y.from("tenants").update({name:u,slug:b||e.slug,domain:I||null,plan_id:w||null,logo_url:_}).eq("id",e.id);if(T){$.disabled=!1,$.textContent="Salvar",L.textContent="❌ "+T.message,L.style.color="#ef4444";return}if(S&&B&&B.length>=6){L.textContent="⏳ Criando usuário admin…";const A=await oe({email:S,password:B,role:"admin",tenant_id:e.id});A!=null&&A.success?(A!=null&&A.user_id&&!(A!=null&&A.linked)&&await y.from("profiles").update({tenant_id:e.id}).eq("id",A.user_id),L.textContent="✅ Salvo e admin criado!",L.style.color="#22c55e"):(L.textContent="⚠️ Salvo, mas erro ao criar admin: "+((A==null?void 0:A.error)||"Tente novamente"),L.style.color="#f59e0b")}else L.textContent="✅ Imobiliária atualizada!",L.style.color="#22c55e";$.disabled=!1,$.textContent="Salvar",setTimeout(()=>{d(),X()},1200)})}
