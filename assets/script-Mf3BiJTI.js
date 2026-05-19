import{s as b}from"./supabase-BcuJ3xoD.js";const dt="00000000-0000-0000-0000-000000000000";let ue={},$e={},te=dt;function We(e){te=e||dt,ue={},$e={}}const Re=()=>te;async function ht(){const[e,t]=await Promise.all([b.from("settings").select("key,value").eq("tenant_id",te),b.from("site_content").select("*").eq("tenant_id",te)]);e.data&&e.data.forEach(n=>{ue[n.key]=n.value}),t.data&&t.data.forEach(n=>{$e[n.key]=n})}const G=(e,t=null)=>ue[e]!==void 0?ue[e]:t,_e=(e,t="pt")=>{const n=$e[e];return n?n[`value_${t}`]??n.value_pt??null:null};async function Z(e){const t=new Date().toISOString(),n=e.map(([o,s])=>({key:o,value:s,tenant_id:te,updated_at:t})),{error:a}=await b.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,s])=>{ue[o]=s}),!a}async function Ce(e,{pt:t,en:n,es:a}){const o={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:te,updated_at:new Date().toISOString()},{error:s}=await b.from("site_content").upsert(o,{onConflict:"key,tenant_id"});return s||($e[e]=o),!s}async function Te(e,t,n){const{error:a}=await b.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function je(){const e=document.documentElement,t=G("visual.accent_color","#b8962e"),n=G("visual.primary_bg","#0f1c2e"),a=G("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=G("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(i=>{i.src=o});const s=G("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=s);const d=G("visual.hero_bg_url","");if(d){const i=document.querySelector(".hero");i&&(i.style.backgroundImage=`url('${d}')`)}}function Et(e="pt"){const t=g=>_e(g,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const s=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),d=document.querySelector('[data-i18n="inst.p3"]');s&&t("inst.bio_p1")&&(s.innerHTML=t("inst.bio_p1")),l&&t("inst.bio_p2")&&(l.innerHTML=t("inst.bio_p2")),d&&t("inst.bio_p3")&&(d.innerHTML=t("inst.bio_p3"));const i=document.querySelector('[data-i18n-num="inst.stat2num"]'),r=document.querySelector('[data-i18n="inst.stat1"]'),m=document.querySelector('[data-i18n="inst.stat2"]'),p=document.querySelector('[data-i18n="inst.stat3"]');i&&t("inst.stat2_num")&&(i.innerHTML=t("inst.stat2_num")),r&&t("inst.stat1_label")&&(r.innerHTML=t("inst.stat1_label")),m&&t("inst.stat2_label")&&(m.innerHTML=t("inst.stat2_label")),p&&t("inst.stat3_label")&&(p.innerHTML=t("inst.stat3_label"));const c=_e("seo.title_pt",e);c&&document.title&&(document.title=c);const E=_e("seo.description_pt",e);if(E){const g=document.querySelector('meta[name="description"]');g&&(g.content=E)}}function wt(e){if(!e)return;const t=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const It="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let K="5547999701743",pe=`https://wa.me/${K}`;const W=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],xt=5.7;function ve(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/xt).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let $=[],u=null,ge=[],rt=!1;b.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(rt=!0)});async function Bt(){const{data:e,error:t}=await b.from("properties").select("*").eq("published",!0).is("tenant_id",null).order("created_at",{ascending:!1});return t?(console.error("Supabase select error:",t),[]):e||[]}async function Lt(){let e=b.from("properties").select("*").order("created_at",{ascending:!1});(u==null?void 0:u.role)==="super_admin"?e=e.is("tenant_id",null):u!=null&&u.tenant_id?e=e.eq("tenant_id",u.tenant_id):u!=null&&u.id&&(e=e.is("tenant_id",null));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):($=t||[],ea(),ta(),$)}async function St(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await b.from("properties").update(a).eq("id",t);if(o)throw o;const s=$.findIndex(l=>l.id===t);s>=0&&($[s]={...$[s],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await b.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&$.unshift(t[0])}}async function kt(e){const{error:t}=await b.from("properties").delete().eq("id",e);if(t)throw t;$=$.filter(n=>n.id!==e)}async function $t(e,t){const{error:n}=await b.auth.signInWithPassword({email:e,password:t});return!n}function he(e,t=1200,n=.78){return new Promise((a,o)=>{const s=new Image,l=URL.createObjectURL(e);s.onload=()=>{URL.revokeObjectURL(l);const d=document.createElement("canvas");let i=s.width,r=s.height;i>t&&(r=Math.round(r*t/i),i=t),d.width=i,d.height=r;const m=d.getContext("2d");m.drawImage(s,0,0,i,r);const p=new Image;p.crossOrigin="anonymous",p.onload=()=>{const c=Math.round(i*.18),E=Math.round(p.naturalHeight*c/p.naturalWidth),g=Math.round(i*.02),f=i-c-g,y=r-E-g;m.globalAlpha=.45,m.drawImage(p,f,y,c,E),m.globalAlpha=1,d.toBlob(v=>v?a(v):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},p.onerror=()=>{d.toBlob(c=>c?a(c):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},p.src="/logo.png"},s.onerror=o,s.src=l})}async function _t(e){const t=await he(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await b.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=b.storage.from("imoveis").getPublicUrl(n);return o}async function Ct(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await _t(n[o]));return a}async function fe(){var p,c,E,g,f,y;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await Bt();$=n,((p=document.getElementById("selecao-carousel"))==null?void 0:p.innerHTML)===""&&Tt(n);const a=((c=document.getElementById("city-filter"))==null?void 0:c.value)||"",o=((E=document.getElementById("neighborhood-filter"))==null?void 0:E.value)||"",s=((g=document.getElementById("bedrooms-filter"))==null?void 0:g.value)||"",l=((f=document.getElementById("parking-filter"))==null?void 0:f.value)||"",d=((y=document.getElementById("construction-filter"))==null?void 0:y.value)||"",i=document.getElementById("price-slider"),r=i?parseInt(i.value,10):13e7,m=n.filter(v=>{if(a&&v.city!==a||o&&v.neighborhood!==o||s&&(s==="4+"&&Number(v.bedrooms)<4||s!=="4+"&&Number(v.bedrooms)!==Number(s))||l&&(l==="4+"&&Number(v.parking)<4||l!=="4+"&&Number(v.parking)!==Number(l))||d&&v.construction_status!==d)return!1;const w=String(v.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),L=parseInt(w,10)||0;return!(L<0||L>r)});if(e){if(!m.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=m.map(v=>{var x;const w=v.cover_image||((x=v.images)==null?void 0:x[0])||W[0],L=[v.neighborhood,v.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${w}" alt="${h(v.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${h(v.title)}</div>
            <div class="selecao-card-loc">${h(L)}</div>
            <div class="selecao-card-price">${h(ve(v.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${v.id}" class="btn-det">Ver Detalhes</a>
              <a href="${pe}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!m.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=m.map(v=>{var x;const w=(x=v.images)!=null&&x.length?v.images:W,L=w.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${L}" data-idx="0" data-pid="${v.id}">
          <img src="${v.cover_image||w[0]}" alt="${h(v.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${L>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${h(v.title)}</strong>
          <div class="muted">${h(v.neighborhood||"")}, ${h(v.city||"")}</div>
          <div><strong>${h(ve(v.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${v.bedrooms||"--"} | 🚗 ${v.parking||"--"} ${L>1?"| 📸 "+L:""}</div>
          <p class="muted">${h((v.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${v.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${pe}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(v=>{v.removeEventListener("click",Je),v.addEventListener("click",Je)})}function Tt(e){var o,s,l;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(d=>{var m;const i=d.cover_image||((m=d.images)==null?void 0:m[0])||W[0],r=[d.neighborhood,d.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${i}" alt="${h(d.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${h(d.title)}</div>
          <div class="selecao-card-loc">${h(r)}</div>
          <div class="selecao-card-price">${h(ve(d.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${d.id}" class="btn-det">Ver Detalhes</a>
            <a href="${pe}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(s=a==null?void 0:a.querySelector(".selecao-prev"))==null||s.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(l=a==null?void 0:a.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),fe()};function Je(e){var d;e.stopPropagation();const t=e.currentTarget.closest(".carousel-wrap");if(!t)return;const n=parseInt(t.dataset.total,10);if(!n)return;let a=parseInt(t.dataset.idx,10)||0;const o=e.currentTarget.classList.contains("carousel-next")?1:-1;a=(a+o+n)%n,t.dataset.idx=a;const s=parseInt(t.dataset.pid,10),l=$.find(i=>i.id===s);(d=l==null?void 0:l.images)!=null&&d.length&&(t.querySelector(".carousel-img").src=l.images[a])}function qt(){const e=document.getElementById("price-slider"),t=document.getElementById("price-label");!e||!t||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",t.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);t.textContent="Até R$ "+n.toLocaleString("pt-BR"),fe()}))}function At(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=Y();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${h(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=Y().find(s=>s.name===e.value),o=a?Ue(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(s=>`<option value="${s.name}">${h(s.name)}</option>`).join(""),fe()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",fe)})}function ye(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var l;const a=n.cover_image||((l=n.images)==null?void 0:l[0])||W[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",s=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${h(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${h(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+h(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${h(o)}</td>
      <td class="cell-price">${h(ve(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${s}</td>
      <td>
        <div class="action-btns">
          ${(u==null?void 0:u.role)==="admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(u==null?void 0:u.role)==="admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function Mt(){const e=document.getElementById("f-city");if(!e)return;const t=Y(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${h(a.name)}</option>`).join(""),n&&(e.value=n)}function Nt(){var e,t,n,a,o,s,l,d,i,r,m,p,c,E,g;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((s=document.getElementById("f-condominium"))==null?void 0:s.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((d=document.getElementById("f-price-max"))==null?void 0:d.value)||1/0,areaMin:parseFloat((i=document.getElementById("f-area-min"))==null?void 0:i.value)||0,areaMax:parseFloat((r=document.getElementById("f-area-max"))==null?void 0:r.value)||1/0,construction:((m=document.getElementById("f-construction"))==null?void 0:m.value)||"",published:((p=document.getElementById("f-published"))==null?void 0:p.value)||"",bedrooms:((c=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:c.dataset.val)||"",suites:((E=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:E.dataset.val)||"",parking:((g=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:g.dataset.val)||""}}function He(e){const t=Nt();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const s=parseFloat(a.area)||0;return!(t.areaMin>0&&s<t.areaMin||t.areaMax<1/0&&s>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Ie(){if(!document.getElementById("admin-properties"))return;const e=await Lt(),t=e.length,n=e.filter(l=>l.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),s=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),s&&(s.textContent="—"),Mt(),ye($)}let R=null,V="";function Ae(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function we(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function xe(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===V?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{V=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function qe(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{n.preventDefault();const a=new FormData(e),o=a.getAll("images");let s=[];const l=o.filter(i=>i.size>0);if(l.length){t.disabled=!0,t.textContent=`Enviando 0/${l.length} foto…`;try{s=await Ct(l,(i,r)=>{t.textContent=`Enviando ${i}/${r} foto…`})}catch(i){console.error("Erro no upload:",i),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(R){const i=$.find(r=>r.id===R);i!=null&&i.images&&(s=i.images)}s.length||(s=[...W]);const d={...R?{id:R}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:s,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:V||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",tenant_id:(u==null?void 0:u.tenant_id)||null};try{await St(d),R=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const i=document.getElementById("adminPublished");i&&(i.value="true");const r=document.getElementById("adminNeighborhood");r&&(r.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),V="",xe([]),we(),await Ie()}catch(i){console.error(i),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((i==null?void 0:i.message)||JSON.stringify(i)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await kt(o),await Ie()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((u==null?void 0:u.role)!=="admin")return;const o=Number(n.target.dataset.id);if(!o)return;const s=$.find(i=>i.id===o);if(!s)return;R=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=s.title||"",e.querySelector('[name="rua"]').value=s.rua||"",e.querySelector('[name="numero"]').value=s.numero||"",e.querySelector('[name="city"]').value=s.city||"",e.querySelector('[name="price"]').value=s.price||"",e.querySelector('[name="bedrooms"]').value=s.bedrooms||"",e.querySelector('[name="suites"]').value=s.suites||"",e.querySelector('[name="area"]').value=s.area||"",e.querySelector('[name="parking"]').value=s.parking||"",e.querySelector('[name="description"]').value=s.description||"",e.querySelector('[name="construction_status"]').value=s.construction_status||"",e.querySelector('[name="owner_name"]').value=s.owner_name||"",e.querySelector('[name="owner_phone"]').value=s.owner_phone||"",e.querySelector('[name="owner_email"]').value=s.owner_email||"",e.querySelector('[name="owner_notes"]').value=s.owner_notes||"",e.querySelector('[name="condominium"]').value=s.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=s.published===!0?"true":"false");const d=document.getElementById("adminCitySelect");d&&(d.value=s.city||"",d.dispatchEvent(new Event("change")),setTimeout(()=>{const i=document.getElementById("adminNeighborhood");i&&(i.value=s.neighborhood||"")},50)),V=s.cover_image||((a=s.images)==null?void 0:a[0])||"",xe(s.images||[]),Ae("Editar Imóvel")}})}function h(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let O=[],j=0;function Rt(e){var m,p;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const t=document.getElementById("view-status-badge");e.published?(t.textContent="● Publicado",t.className="badge badge-green"):(t.textContent="○ Rascunho",t.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const a=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=a,document.getElementById("view-directions-link").href=a;const o=((m=e.images)==null?void 0:m[0])||W[0];document.getElementById("view-thumb-preview").src=o,O=(p=e.images)!=null&&p.length?e.images:W,j=0,Be(),document.getElementById("view-price").textContent=ve(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const s=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),s&&(s.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(c=>c.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(c=>c.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const d="https://omarcorretor.com.br/property.html?id="+e.id,i=document.getElementById("share-link-input");i&&(i.value=d);const r=document.getElementById("share-panel");r&&(r.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Ee(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Be(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=O[j],e.alt=`Foto ${j+1}`;const s=O.length>1;n.style.display=s?"flex":"none",a.style.display=s?"flex":"none",t.textContent=s?`${j+1} / ${O.length}`:"",o.innerHTML=s?O.map((l,d)=>`<img src="${l}" class="view-thumb${d===j?" active":""}" data-i="${d}" alt="Foto ${d+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{j=+l.dataset.i,Be()})})}async function Ye(e){const{data:t}=await b.from("profiles").select("*").eq("id",e).maybeSingle();return t}function Le(e){var p,c;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const s=(e==null?void 0:e.name)||"Sem nome",l=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=s,o&&(o.textContent=l),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((p=s[0])==null?void 0:p.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const d=document.getElementById("avatar-dd-name"),i=document.getElementById("avatar-dd-role"),r=document.getElementById("avatar-dd-img"),m=document.getElementById("avatar-dd-initial");d&&(d.textContent=s),i&&(i.textContent=l),e!=null&&e.avatar_url&&r?(r.src=e.avatar_url,r.style.display="",m&&(m.style.display="none")):(m&&(m.textContent=((c=s[0])==null?void 0:c.toUpperCase())||"?",m.style.display=""),r&&(r.style.display="none"))}function J(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),U(),e==="contatos"&&Jt(),e==="funil"&&Dt(),e==="tarefas"&&Pt()}function Ke(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:na,visual:oa,"site-config":sa,"crm-config":ia,integracoes:la,midia:da}).forEach(([a,o])=>{const s=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);s&&s.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>ra(),{once:!0}),window.lucide&&lucide.createIcons()}}function U(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function jt(){var a,o,s;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",l=>{l.target===t&&n()}),(s=document.getElementById("cp-save"))==null||s.addEventListener("click",async()=>{var p,c;const l=((p=document.getElementById("cp-new"))==null?void 0:p.value)||"",d=((c=document.getElementById("cp-confirm"))==null?void 0:c.value)||"",i=document.getElementById("cp-msg"),r=document.getElementById("cp-save");if(i.style.display="none",l.length<6){i.style.color="#ef4444",i.textContent="Mínimo 6 caracteres.",i.style.display="";return}if(l!==d){i.style.color="#ef4444",i.textContent="As senhas não coincidem.",i.style.display="";return}r.disabled=!0,r.textContent="Salvando…";const{error:m}=await b.auth.updateUser({password:l});if(r.disabled=!1,r.textContent="Salvar Senha",m){i.style.color="#ef4444",i.textContent="Erro: "+m.message,i.style.display="";return}i.style.color="#16a34a",i.textContent="✅ Senha alterada com sucesso!",i.style.display="",setTimeout(n,1500)})}function Ht(){var s,l,d,i,r;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((s=document.getElementById("topnav-avatar-img"))==null?void 0:s.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
    <div class="modal" style="max-width:380px;">
      <div class="modal-header">
        <h3>Alterar Foto</h3>
        <button class="modal-close" id="cph-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;border:3px solid #e2e8f0;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
          <img id="cph-preview" src="${a?n:""}" alt="" style="width:100%;height:100%;object-fit:cover;display:${a?"":"none"};">
          <span id="cph-initial" style="font-size:32px;font-weight:700;color:#64748b;display:${a?"none":""};">${((u==null?void 0:u.name)||"?")[0].toUpperCase()}</span>
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(l=document.getElementById("cph-close"))==null||l.addEventListener("click",o),(d=document.getElementById("cph-cancel"))==null||d.addEventListener("click",o),t.addEventListener("click",m=>{m.target===t&&o()}),(i=document.getElementById("cph-file"))==null||i.addEventListener("change",m=>{const p=m.target.files[0];if(!p)return;const c=URL.createObjectURL(p),E=document.getElementById("cph-preview"),g=document.getElementById("cph-initial");E&&(E.src=c,E.style.display=""),g&&(g.style.display="none"),document.getElementById("cph-save").disabled=!1}),(r=document.getElementById("cph-save"))==null||r.addEventListener("click",async()=>{var E;const m=(E=document.getElementById("cph-file"))==null?void 0:E.files[0];if(!m)return;const p=document.getElementById("cph-save"),c=document.getElementById("cph-msg");p.disabled=!0,p.textContent="Salvando…";try{const g=await he(m,400,.85),f=`avatars/${u.id}-${Date.now()}.jpg`,{error:y}=await b.storage.from("imoveis").upload(f,g,{contentType:"image/jpeg",upsert:!0});if(y)throw y;const{data:{publicUrl:v}}=b.storage.from("imoveis").getPublicUrl(f);await b.from("profiles").update({avatar_url:v}).eq("id",u.id),u={...u,avatar_url:v},Le(u),o()}catch(g){c.style.color="#ef4444",c.textContent="Erro: "+g.message,c.style.display="",p.disabled=!1,p.textContent="Salvar Foto"}})}function Ut(){var a,o,s;const e=document.getElementById("add-corretor-modal-root");e&&e.remove();const t=document.createElement("div");t.id="add-corretor-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("ac-close"))==null||a.addEventListener("click",n),(o=document.getElementById("ac-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",l=>{l.target===t&&n()}),(s=document.getElementById("ac-save"))==null||s.addEventListener("click",async()=>{var m,p;const l=(m=document.getElementById("ac-email"))==null?void 0:m.value.trim(),d=(p=document.getElementById("ac-password"))==null?void 0:p.value.trim(),i=document.getElementById("ac-save"),r=document.getElementById("ac-note");if(!l){alert("Informe o e-mail do corretor.");return}if(!d||d.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}i.disabled=!0,i.textContent="Criando…",r.style.display="none";try{const c=await oe({email:l,password:d,tenant_id:(u==null?void 0:u.tenant_id)||null});i.disabled=!1,i.textContent="+ Criar Acesso",c.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",c.email_sent===!1?(r.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${h(l)}<br><strong>Senha:</strong> ${h(d)}`,r.style.color="#0f172a"):(r.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",r.style.color="#16a34a"),r.style.display=""):alert("Erro: "+(c.error||"Falha desconhecida"))}catch(c){i.disabled=!1,i.textContent="+ Criar Acesso",alert("Erro: "+c.message)}})}function Qe(){var s,l,d,i,r,m,p,c,E,g,f;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",y=>{var w;y.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(w=document.getElementById("notif-dropdown"))==null||w.classList.add("hidden")}),(s=document.getElementById("avatar-dd-change-photo"))==null||s.addEventListener("click",y=>{y.stopPropagation(),U(),Ht()}),(l=document.getElementById("avatar-dd-change-pass"))==null||l.addEventListener("click",y=>{y.stopPropagation(),U(),jt()}),(d=document.getElementById("avatar-dd-add-corretor"))==null||d.addEventListener("click",y=>{y.stopPropagation(),U(),Ut()}),(i=document.getElementById("avatar-dd-settings"))==null||i.addEventListener("click",y=>{y.stopPropagation(),U(),J("settings")}),(r=document.getElementById("avatar-dd-logout"))==null||r.addEventListener("click",async y=>{y.stopPropagation(),await b.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",y=>{var w;y.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((w=document.getElementById("avatar-dropdown"))==null||w.classList.add("hidden"),Xt())}),(m=document.getElementById("notif-mark-all"))==null||m.addEventListener("click",()=>{Gt(),U()}),(p=document.getElementById("btn-search-open"))==null||p.addEventListener("click",()=>{var y,v;(y=document.getElementById("search-overlay"))==null||y.classList.remove("hidden"),(v=document.getElementById("search-input"))==null||v.focus()}),(c=document.getElementById("search-overlay-close"))==null||c.addEventListener("click",()=>{var y;(y=document.getElementById("search-overlay"))==null||y.classList.add("hidden")}),(E=document.getElementById("search-overlay"))==null||E.addEventListener("click",y=>{y.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(g=document.getElementById("search-input"))==null||g.addEventListener("input",y=>{clearTimeout(o),o=setTimeout(()=>Ft(y.target.value.trim()),280)}),(f=document.getElementById("search-input"))==null||f.addEventListener("keydown",y=>{var v;y.key==="Escape"&&((v=document.getElementById("search-overlay"))==null||v.classList.add("hidden"))}),document.addEventListener("click",U)}let Ze=!1,de=[],ct=[],Se=[],be=null,re=null;async function Dt(){var a;if(Ze)return;Ze=!0;const[{data:e},{data:t}]=await Promise.all([b.from("crm_pipelines").select("*").order("sort_order"),b.from("crm_stages").select("*").order("sort_order")]);de=e||[],ct=t||[];const n=document.getElementById("funil-pipe-sel");if(n){n.innerHTML=de.length?de.map(s=>`<option value="${s.id}">${h(s.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const o=de.find(s=>s.is_default)||de[0];o&&(n.value=o.id,be=o.id),n.addEventListener("change",async()=>{be=parseInt(n.value,10),await et()})}(a=document.getElementById("btn-funil-add-lead"))==null||a.addEventListener("click",()=>openLeadModal()),await et()}async function et(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=b.from("leads").select("*").order("created_at",{ascending:!1});(u==null?void 0:u.role)==="corretor"?t=t.eq("assigned_to",u.id):u!=null&&u.tenant_id&&(t=t.eq("tenant_id",u.tenant_id)),be&&(t=t.eq("pipeline_id",be));const{data:n}=await t;Se=n||[],mt()}function mt(){const e=document.getElementById("kanban-board");if(!e)return;const t=ct.filter(a=>a.pipeline_id===be);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n={};t.forEach(a=>{n[a.name]=[]}),Se.forEach(a=>{var s,l,d,i;const o=a.stage||((s=t[0])==null?void 0:s.name);n[o]||(n[((l=t[0])==null?void 0:l.name)||""]=[]),(i=n[o]||n[(d=t[0])==null?void 0:d.name])==null||i.push(a)}),e.innerHTML=t.map(a=>{const o=n[a.name]||[],s=o.length?o.map(l=>`
        <div class="kanban-card" draggable="true" data-id="${l.id}" data-stage="${h(a.name)}">
          <div class="kanban-card-name">${h(l.name||"—")}</div>
          ${l.phone?`<div class="kanban-card-info">📞 ${h(l.phone)}</div>`:""}
          ${l.interest?`<div class="kanban-card-info">🏠 ${h(l.interest)}</div>`:""}
          ${l.budget_max?`<div class="kanban-card-info">💰 R$ ${Number(l.budget_max).toLocaleString("pt-BR")}</div>`:""}
          <div class="kanban-card-tags">
            ${l.source?`<span class="kanban-card-tag">${h(l.source)}</span>`:""}
          </div>
        </div>`).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${h(a.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${a.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${a.color||"#2563eb"}"></div>
            ${h(a.name)}
          </div>
          <span class="kanban-col-count">${o.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${h(a.name)}">${s}</div>
        <button class="kanban-add-btn" data-stage="${h(a.name)}">+ Adicionar lead</button>
      </div>`}).join(""),zt(),window.lucide&&lucide.createIcons()}function zt(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>openLeadModal())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=Se.find(a=>String(a.id)===String(t.dataset.id));n&&openLeadModal(n)}),t.addEventListener("dragstart",n=>{re=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!re||!a)return;await b.from("leads").update({stage:a}).eq("id",re);const o=Se.find(s=>String(s.id)===String(re));o&&(o.stage=a),re=null,mt()})}))}let M=[],tt=!1,Q="pending";async function Pt(){var e;tt||(tt=!0,await Ot(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>pt()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),Q=t.dataset.filter,ae()})}))}async function Ot(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=b.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(u==null?void 0:u.role)==="corretor"?t=t.eq("assigned_to",u.id):u!=null&&u.tenant_id&&(t=t.eq("tenant_id",u.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}M=n||[],ae()}function ut(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function ae(){const e=document.getElementById("tarefas-list");if(!e)return;let t=M;if(Q==="pending"&&(t=M.filter(a=>a.status!=="done")),Q==="done"&&(t=M.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${Q==="done"?"✅":"📋"}</div>
      <p>${Q==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=ut(a.due_date),s=o?o.toLocaleDateString("pt-BR"):"",l=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${h(a.title)}</div>
          <div class="tarefa-meta">
            ${s?`<span style="${l?"color:#ef4444;":""}">📅 ${s}${l?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${h(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const s=a.dataset.id,l=a.checked?"done":"pending";await b.from("tasks").update({status:l}).eq("id",s);const d=M.find(i=>String(i.id)===s);d&&(d.status=l),ae()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await b.from("tasks").delete().eq("id",a.dataset.id),M=M.filter(s=>String(s.id)!==String(a.dataset.id)),ae())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const s=a.dataset.id,l=M.find(d=>String(d.id)===s);l&&pt(l)})})}function pt(e=null){var i,r,m,p;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=ut(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const s=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",l=document.createElement("div");l.id="tarefa-modal-root",l.className="modal-backdrop",l.innerHTML=`
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
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${h((e==null?void 0:e.title)||"")}">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prazo</label>
              <input name="due_date" type="date" class="form-control" value="${s}">
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
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${h((e==null?void 0:e.description)||"")}</textarea>
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
  `,document.body.appendChild(l);const d=()=>l.remove();(i=document.getElementById("tm-close"))==null||i.addEventListener("click",d),(r=document.getElementById("tm-cancel"))==null||r.addEventListener("click",d),l.addEventListener("click",c=>{c.target===l&&d()}),(m=document.getElementById("tm-toggle-done"))==null||m.addEventListener("click",async()=>{const c=a?"pending":"done";await b.from("tasks").update({status:c}).eq("id",e.id);const E=M.find(g=>String(g.id)===String(e.id));E&&(E.status=c),d(),c==="done"&&(Q="done",document.querySelectorAll(".tarefa-filter-btn").forEach(g=>{g.classList.toggle("active",g.dataset.filter==="done")})),ae()}),(p=document.getElementById("tm-save"))==null||p.addEventListener("click",async()=>{var v,w;const c=document.getElementById("tarefa-form");if(!c.checkValidity()){c.reportValidity();return}const E=new FormData(c),g=document.getElementById("tm-save");g.disabled=!0,g.textContent="Salvando…";const f={title:(v=E.get("title"))==null?void 0:v.trim(),description:((w=E.get("description"))==null?void 0:w.trim())||null,due_date:E.get("due_date")||null,priority:E.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(u==null?void 0:u.id)||null,tenant_id:(u==null?void 0:u.tenant_id)||null};let y;if(n){if({error:y}=await b.from("tasks").update(f).eq("id",e.id),!y){const L=M.findIndex(x=>String(x.id)===String(e.id));L>=0&&(M[L]={...M[L],...f})}}else{const{data:L,error:x}=await b.from("tasks").insert(f).select();y=x,!y&&(L!=null&&L[0])&&M.unshift(L[0])}if(g.disabled=!1,g.textContent=n?"Salvar":"Criar Tarefa",y){alert("Erro: "+y.message);return}d(),ae()})}async function Ft(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;u==null||u.role,u==null||u.tenant_id;const[{data:a},{data:o}]=await Promise.all([b.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),b.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),s=[];a!=null&&a.length&&(s.push('<div class="search-group-label">Imóveis</div>'),s.push(...a.map(l=>`
      <div class="search-result-item" data-type="property" data-id="${l.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${h(l.title||"—")}</div>
          <div class="search-result-sub">${h(l.reference||"")} · ${h(l.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(s.push('<div class="search-group-label">Leads / Contatos</div>'),s.push(...o.map(l=>`
      <div class="search-result-item" data-type="lead" data-id="${l.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${h(l.name||"—")}</div>
          <div class="search-result-sub">${h(l.email||l.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=s.length?s.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(l=>{l.addEventListener("click",()=>{var d;(d=document.getElementById("search-overlay"))==null||d.classList.add("hidden"),l.dataset.type==="lead"?J("contatos"):J("properties")})})}let D=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function Xt(){var l;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=b.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);u!=null&&u.tenant_id&&(t=t.eq("tenant_id",u.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(d=>!D.includes(String(d.id))),s=document.getElementById("notif-badge");if(s&&(s.textContent=o.length,o.length>0?s.classList.remove("hidden"):s.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(d=>{const i=Vt(d.created_at);return`
      <div class="notif-item${!D.includes(String(d.id))?" unread":""}" data-id="${d.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${h(d.name||"—")}</div>
          <div class="notif-item-sub">${h(d.phone||d.source||"")} · ${i}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(l=document.getElementById("notif-see-all"))==null||l.addEventListener("click",d=>{d.preventDefault(),U(),J("contatos")}),e.querySelectorAll(".notif-item").forEach(d=>{d.addEventListener("click",()=>{D.push(d.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(D)),d.classList.remove("unread"),U(),J("contatos")})})}function Gt(){var e;document.querySelectorAll(".notif-item").forEach(t=>D.push(t.dataset.id)),D=[...new Set(D)],localStorage.setItem("crm_notifs_read",JSON.stringify(D)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function Vt(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function Wt(){let e=b.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);u!=null&&u.tenant_id&&(e=e.eq("tenant_id",u.tenant_id));const{data:t}=await e,a=(t||[]).filter(s=>!D.includes(String(s.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let F=[],A=1;const ce=10;let at=!1;async function Jt(){var t,n,a,o,s,l,d,i,r;document.getElementById("section-contatos")&&(at||(at=!0,await vt(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{A=1,ne()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",m=>{m.key==="Enter"&&(A=1,ne())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>gt()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",Qt),(s=document.getElementById("import-modal-close"))==null||s.addEventListener("click",Me),(l=document.getElementById("import-modal-cancel"))==null||l.addEventListener("click",Me),(d=document.getElementById("download-template"))==null||d.addEventListener("click",m=>{m.preventDefault();const p=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,c=new Blob([p],{type:"text/csv"}),E=document.createElement("a");E.href=URL.createObjectURL(c),E.download="modelo_contatos.csv",E.click()}),(i=document.getElementById("import-csv-file"))==null||i.addEventListener("change",Yt),(r=document.getElementById("import-modal-confirm"))==null||r.addEventListener("click",Kt)))}async function vt(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=b.from("leads").select("*").order("created_at",{ascending:!1});(u==null?void 0:u.role)==="corretor"?t=t.eq("assigned_to",u.id):u!=null&&u.tenant_id&&(t=t.eq("tenant_id",u.tenant_id));const{data:a}=await t;F=a||[],ne()}function ne(){var d,i,r;const e=(((d=document.getElementById("contato-search"))==null?void 0:d.value)||"").toLowerCase(),t=e?F.filter(m=>(m.name||"").toLowerCase().includes(e)||(m.email||"").toLowerCase().includes(e)||(m.phone||"").toLowerCase().includes(e)):F,n=t.length,a=Math.max(1,Math.ceil(n/ce));A>a&&(A=a);const o=t.slice((A-1)*ce,A*ce),s=document.getElementById("contatos-tbody");if(!s)return;o.length?s.innerHTML=o.map(m=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${m.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${m.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${h(m.name||"—")}</a>
        </td>
        <td>${h(m.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${m.email?h(m.email):"—"}</td>
        <td style="font-size:13px;">${m.phone?h(m.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${h(m.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${m.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):s.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const l=document.getElementById("contatos-pagination");if(l){const m=n===0?0:(A-1)*ce+1,p=Math.min(A*ce,n);l.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${m}–${p}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${A<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${A} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${A>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(i=l.querySelector("#pag-prev"))==null||i.addEventListener("click",()=>{A--,ne()}),(r=l.querySelector("#pag-next"))==null||r.addEventListener("click",()=>{A++,ne()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(m=>{m.addEventListener("click",p=>{p.preventDefault();const c=m.dataset.id,E=F.find(g=>String(g.id)===String(c));E&&gt(E)})})}function gt(e=null){var s,l,d;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=document.createElement("div");a.id="contato-modal-root",a.className="modal-backdrop",a.innerHTML=`
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
              <input name="name" required class="form-control" placeholder="Nome completo" value="${h((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${h((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${h((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${h((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${h((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${h((e==null?void 0:e.city_interest)||"")}">
            </div>
          </div>
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${h((e==null?void 0:e.notes)||"")}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cm-cancel">Cancelar</button>
        <button class="btn-primary" id="cm-save" style="margin:0;">${n?"Salvar":"Criar Contato"}</button>
      </div>
    </div>
  `,document.body.appendChild(a);const o=()=>a.remove();(s=document.getElementById("cm-close"))==null||s.addEventListener("click",o),(l=document.getElementById("cm-cancel"))==null||l.addEventListener("click",o),a.addEventListener("click",i=>{i.target===a&&o()}),(d=document.getElementById("cm-save"))==null||d.addEventListener("click",async()=>{var E,g,f,y,v,w,L;const i=document.getElementById("contato-form");if(!i.checkValidity()){i.reportValidity();return}const r=new FormData(i),m=document.getElementById("cm-save");m.disabled=!0,m.textContent="Salvando…";const p={name:(E=r.get("name"))==null?void 0:E.trim(),company:((g=r.get("company"))==null?void 0:g.trim())||null,email:((f=r.get("email"))==null?void 0:f.trim())||null,phone:((y=r.get("phone"))==null?void 0:y.trim())||null,job_title:((v=r.get("job_title"))==null?void 0:v.trim())||null,city_interest:((w=r.get("city_interest"))==null?void 0:w.trim())||null,notes:((L=r.get("notes"))==null?void 0:L.trim())||null,stage:(e==null?void 0:e.stage)||"novo",assigned_to:(u==null?void 0:u.id)||null,tenant_id:(u==null?void 0:u.tenant_id)||null,source:"manual"};let c;if(n){if({error:c}=await b.from("leads").update(p).eq("id",e.id),!c){const x=F.findIndex(C=>String(C.id)===String(e.id));x>=0&&(F[x]={...F[x],...p})}}else{const{data:x,error:C}=await b.from("leads").insert(p).select();c=C,!c&&(x!=null&&x[0])&&F.unshift(x[0])}if(m.disabled=!1,m.textContent=n?"Salvar":"Criar Contato",c){alert("Erro: "+c.message);return}o(),ne()})}let ee=[];function Yt(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{ee=a.target.result.split(`
`).filter(d=>d.trim()).slice(1).map(d=>{const[i,r,m,p,c]=d.split(",").map(E=>E.trim().replace(/^"|"$/g,""));return{name:i,email:r,phone:m,company:p,job_title:c}}).filter(d=>d.name);const s=document.getElementById("import-preview");s&&(s.textContent=`${ee.length} contato(s) encontrados para importar.`);const l=document.getElementById("import-modal-confirm");l&&(l.disabled=ee.length===0)},n.readAsText(t)}async function Kt(){if(!ee.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=ee.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(u==null?void 0:u.id)||null,tenant_id:(u==null?void 0:u.tenant_id)||null})),{error:n}=await b.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Me(),await vt(),alert(`${t.length} contato(s) importados com sucesso!`)}function Qt(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),ee=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Me(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const Zt="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function oe(e){return(await fetch(Zt,{method:"POST",headers:{Authorization:`Bearer ${It}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function nt(e){var i,r,m,p;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),s=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:c}}=await b.auth.getUser();n.value=(c==null?void 0:c.email)||""}const d=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=d),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),s==null||s.addEventListener("change",c=>{const E=c.target.files[0];if(!E)return;const g=URL.createObjectURL(E);a&&(a.src=g,a.style.display=""),o&&(o.style.display="none")}),(i=document.getElementById("btn-change-password"))==null||i.addEventListener("click",async()=>{var v,w;const c=((v=document.getElementById("change-password-new"))==null?void 0:v.value)||"",E=((w=document.getElementById("change-password-confirm"))==null?void 0:w.value)||"",g=document.getElementById("change-password-msg"),f=document.getElementById("btn-change-password");if(g&&(g.style.display="none"),c.length<6){g&&(g.textContent="Mínimo 6 caracteres.",g.style.display="");return}if(c!==E){g&&(g.textContent="As senhas não coincidem.",g.style.display="");return}f&&(f.disabled=!0,f.textContent="Salvando…");const{error:y}=await b.auth.updateUser({password:c});f&&(f.disabled=!1,f.textContent="Salvar Nova Senha"),y?g&&(g.textContent="Erro: "+y.message,g.style.display=""):(g&&(g.style.color="#16a34a",g.textContent="Senha alterada com sucesso!",g.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var w;const c=t.value.trim();let E=(u==null?void 0:u.avatar_url)||"";const g=s==null?void 0:s.files[0],f=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",g)try{const L=await he(g,400,.85),x=`avatars/${u.id}-${Date.now()}.jpg`,{error:C}=await b.storage.from("imoveis").upload(x,L,{contentType:"image/jpeg",upsert:!0});if(!C){const{data:{publicUrl:I}}=b.storage.from("imoveis").getPublicUrl(x);E=I}}catch(L){console.error("Avatar upload:",L)}const{error:y}=await b.from("profiles").update({name:c,avatar_url:E}).eq("id",u.id);if(l.disabled=!1,l.textContent=f,y){alert("Erro ao salvar perfil.");return}u={...u,name:c,avatar_url:E},Le(u);const v=document.getElementById("settings-avatar-initial");v&&(v.textContent=((w=c[0])==null?void 0:w.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const c=document.getElementById("settings-corretores-section");c&&(c.style.display=""),await ke(),(r=document.getElementById("btn-invite-corretor"))==null||r.addEventListener("click",async()=>{var w,L;const g=(w=document.getElementById("invite-email"))==null?void 0:w.value.trim(),f=(L=document.getElementById("invite-password"))==null?void 0:L.value.trim(),y=document.getElementById("btn-invite-corretor"),v=document.getElementById("invite-note");if(!g){alert("Informe o e-mail do corretor.");return}if(!f||f.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}y&&(y.disabled=!0,y.textContent="Criando…"),v&&(v.style.display="none");try{const x=await oe({email:g,password:f,tenant_id:(u==null?void 0:u.tenant_id)||null});if(x.success){const C=document.getElementById("invite-email"),I=document.getElementById("invite-password");C&&(C.value=""),I&&(I.value=""),await ke(),v&&(x.email_sent===!1?(v.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${h(g)}<br>
                <strong>Senha:</strong> ${h(f)}`,v.style.color="#0f172a"):(v.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",v.style.color="#16a34a"),v.style.display="")}else alert("Erro: "+(x.error||"Falha desconhecida"))}catch(x){alert("Erro ao criar acesso: "+x.message)}finally{y&&(y.disabled=!1,y.textContent="+ Criar Acesso")}});const E=document.getElementById("settings-locations-section");E&&(E.style.display=""),await me(),(m=document.getElementById("loc-add-city-btn"))==null||m.addEventListener("click",async()=>{const g=document.getElementById("loc-new-city"),f=g==null?void 0:g.value.trim();if(!f)return;const{error:y}=await b.from("locations").insert({type:"cidade",name:f});if(y){alert("Erro ao adicionar cidade.");return}g&&(g.value=""),await me(),De()}),(p=document.getElementById("loc-add-neighborhood-btn"))==null||p.addEventListener("click",async()=>{var w;const g=parseInt((w=document.getElementById("loc-new-neighborhood-city"))==null?void 0:w.value,10),f=document.getElementById("loc-new-neighborhood"),y=f==null?void 0:f.value.trim();if(!g||!y){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:v}=await b.from("locations").insert({type:"bairro",name:y,parent_id:g});if(v){alert("Erro ao adicionar bairro.");return}f&&(f.value=""),await me()})}}async function ke(){const e=document.getElementById("corretores-list");if(!e)return;let t=b.from("profiles").select("*").order("created_at");u!=null&&u.tenant_id&&(t=t.eq("tenant_id",u.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const s=(o.name||"?")[0].toUpperCase(),l=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${h(s)}</div>`,d=o.id===(u==null?void 0:u.id),i=o.active!==!1,r=i?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',m=d?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,p=d?"":i?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,c=d?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${l}
        <div>
          <div class="corretor-name">${h(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${r}
        ${m}
        ${p}
        ${c}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await b.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const s=o.dataset.uid,l=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const d=await oe({action:"toggle",userId:s,active:!l});d.success||alert("Erro: "+(d.error||"Falha desconhecida"))}catch(d){alert("Erro: "+d.message)}await ke()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var d,i;const s=o.dataset.uid,l=((i=(d=o.closest(".corretor-item"))==null?void 0:d.querySelector(".corretor-name"))==null?void 0:i.textContent)||"este corretor";if(confirm(`Excluir "${l}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const r=await oe({action:"delete",userId:s});r.success||alert("Erro ao excluir: "+(r.error||"Falha desconhecida"))}catch(r){alert("Erro: "+r.message)}await ke()}})})}async function ft(){const{data:e,error:t}=await b.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(ge=e||[],ge)}function Y(){return ge.filter(e=>e.type==="cidade")}function Ue(e){return ge.filter(t=>t.type==="bairro"&&t.parent_id===e)}function De(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=Y();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${h(a.name)}</option>`).join(""),t&&(e.value=t)}async function me(){await ft();const e=Y(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(s=>`
        <div class="loc-item">
          <span class="loc-item-name">${h(s.name)}</span>
          <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=ge.filter(s=>s.type==="bairro");n.innerHTML=o.length?o.map(s=>{const l=e.find(d=>d.id===s.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${h(s.name)}</div>
              ${l?`<div class="loc-item-sub">${h(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(s=>`<option value="${s.id}">${h(s.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{const l=s.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:d}=await b.from("locations").delete().eq("id",s.dataset.id);if(d){alert("Erro ao excluir.");return}await me(),De()})}),n.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await b.from("locations").delete().eq("id",s.dataset.id);if(l){alert("Erro ao excluir.");return}await me()})})}function ot(){var n,a,o,s,l,d,i,r,m,p,c,E,g,f,y,v,w,L,x,C;document.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{const B=I.closest(".filter-btns"),S=I.classList.contains("active");B.querySelectorAll(".filter-btn").forEach(k=>k.classList.remove("active")),S||I.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var _;const I=(_=document.getElementById("f-city"))==null?void 0:_.value,B=Y().find(T=>T.name===I),S=B?Ue(B.id):[],k=document.getElementById("f-neighborhood");k&&(k.innerHTML='<option value="">Todos</option>'+S.map(T=>`<option value="${T.name}">${h(T.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{ye(He($))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach(k=>{const _=document.getElementById(k);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach(k=>{const _=document.getElementById(k);_&&(_.value="")});const S=document.getElementById("f-neighborhood");S&&(S.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach(k=>k.classList.remove("active")),ye($)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{J(I.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{J(I.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(I=>{I.addEventListener("click",B=>{B.stopPropagation();const S=I.closest(".topnav-dropdown");S==null||S.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(k=>{k!==S&&k.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(I=>I.classList.remove("open"))}),(s=document.getElementById("modal-close"))==null||s.addEventListener("click",we),(l=document.getElementById("modal-cancel"))==null||l.addEventListener("click",we),(d=document.getElementById("property-modal"))==null||d.addEventListener("click",I=>{I.target.id==="property-modal"&&we()}),(i=document.getElementById("btn-new-property"))==null||i.addEventListener("click",()=>{R=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",V="",xe([]),Ae("Novo Imóvel")}),(r=document.getElementById("logout-btn"))==null||r.addEventListener("click",async()=>{await b.auth.signOut(),location.reload()}),(m=document.getElementById("view-prev"))==null||m.addEventListener("click",()=>{j=(j-1+O.length)%O.length,Be()}),(p=document.getElementById("view-next"))==null||p.addEventListener("click",()=>{j=(j+1)%O.length,Be()}),(c=document.getElementById("view-modal-close"))==null||c.addEventListener("click",Ee),(E=document.getElementById("view-modal-close2"))==null||E.addEventListener("click",Ee),(g=document.getElementById("view-modal"))==null||g.addEventListener("click",I=>{I.target.id==="view-modal"&&Ee()}),(f=document.getElementById("view-modal-share"))==null||f.addEventListener("click",()=>{const I=document.getElementById("share-panel");if(!I)return;const B=I.style.display!=="none";I.style.display=B?"none":"block"}),(y=document.getElementById("share-whatsapp"))==null||y.addEventListener("click",()=>{var k,_;const I=(k=document.getElementById("share-link-input"))==null?void 0:k.value;if(!I)return;const B=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",S=encodeURIComponent("Olha esse imóvel que encontrei: "+B+`
`+I);window.open("https://wa.me/?text="+S,"_blank")}),(v=document.getElementById("share-instagram"))==null||v.addEventListener("click",()=>{var B,S;const I=(B=document.getElementById("share-link-input"))==null?void 0:B.value;I&&((S=navigator.clipboard)==null||S.writeText(I),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(w=document.getElementById("share-email"))==null||w.addEventListener("click",()=>{var _,T;const I=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!I)return;const B=((T=document.getElementById("view-modal-title"))==null?void 0:T.textContent)||"Imóvel",S=encodeURIComponent("Imóvel: "+B),k=encodeURIComponent(`Olá! Segue o link do imóvel:

`+I);window.open("mailto:?subject="+S+"&body="+k,"_blank")}),(L=document.getElementById("share-copy"))==null||L.addEventListener("click",()=>{var B;const I=document.getElementById("share-link-input");I&&((B=navigator.clipboard)==null||B.writeText(I.value).then(()=>{const S=document.getElementById("share-copy"),k=S.textContent;S.textContent="✅ Copiado!",setTimeout(()=>{S.textContent=k},2e3)}))}),(x=document.getElementById("view-modal-edit"))==null||x.addEventListener("click",()=>{var z;if((u==null?void 0:u.role)!=="admin")return;const I=document.getElementById("view-modal-title").textContent,B=$.find(N=>N.title===I);if(!B)return;Ee(),R=B.id;const S=document.getElementById("property-form"),k=document.getElementById("form-submit-btn");k.textContent="Salvar Alterações",S.querySelector('[name="title"]').value=B.title||"",S.querySelector('[name="rua"]').value=B.rua||"",S.querySelector('[name="numero"]').value=B.numero||"",S.querySelector('[name="city"]').value=B.city||"",S.querySelector('[name="price"]').value=B.price||"",S.querySelector('[name="bedrooms"]').value=B.bedrooms||"",S.querySelector('[name="suites"]').value=B.suites||"",S.querySelector('[name="parking"]').value=B.parking||"",S.querySelector('[name="description"]').value=B.description||"",S.querySelector('[name="construction_status"]').value=B.construction_status||"",S.querySelector('[name="owner_name"]').value=B.owner_name||"",S.querySelector('[name="owner_phone"]').value=B.owner_phone||"",S.querySelector('[name="owner_email"]').value=B.owner_email||"",S.querySelector('[name="owner_notes"]').value=B.owner_notes||"",S.querySelector('[name="condominium"]').value=B.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=B.published===!0?"true":"false");const T=document.getElementById("adminCitySelect");T&&(T.value=B.city||"",T.dispatchEvent(new Event("change")),setTimeout(()=>{const N=document.getElementById("adminNeighborhood");N&&(N.value=B.neighborhood||"")},50)),V=B.cover_image||((z=B.images)==null?void 0:z[0])||"",xe(B.images||[]),Ae("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(I=>{I.addEventListener("click",()=>{var B;document.querySelectorAll(".tab-btn").forEach(S=>S.classList.remove("active")),I.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(S=>S.classList.add("hidden")),(B=document.getElementById(`tab-${I.dataset.tab}`))==null||B.classList.remove("hidden")})}),(C=document.getElementById("admin-properties"))==null||C.addEventListener("click",I=>{if(I.target.closest(".action-btns"))return;const B=I.target.closest("tr");if(!B)return;const S=Number(B.dataset.id);if(!S)return;const k=$.find(_=>_.id===S);k&&Rt(k)})}document.addEventListener("DOMContentLoaded",async()=>{var s,l,d;await Promise.all([ht(),ft()]),K=G("company.whatsapp",K),pe=`https://wa.me/${K}`,je(),qt(),At();const e=document.getElementById("adminCitySelect"),t=document.getElementById("adminNeighborhood");e&&t&&(De(),e.addEventListener("change",()=>{const i=Y().find(m=>m.name===e.value),r=i?Ue(i.id):[];t.innerHTML='<option value="">Selecione a cidade primeiro</option>'+r.map(m=>`<option value="${m.name}">${h(m.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),a=document.getElementById("admin-root");if(n){const i=new URLSearchParams(window.location.hash.replace("#","")),r=new URLSearchParams(window.location.search),m=i.get("type")||r.get("type")||"",p=rt||m==="recovery"||m==="invite"||window.location.hash.includes("access_token")||r.has("code"),c=document.getElementById("password-reset-overlay");if(p){n.style.display="none",a&&a.classList.add("hidden"),c&&(c.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async g=>{var x,C;g.preventDefault();const f=((x=document.getElementById("new-password"))==null?void 0:x.value)||"",y=((C=document.getElementById("confirm-password"))==null?void 0:C.value)||"",v=document.getElementById("password-reset-msg"),w=g.target.querySelector('button[type="submit"]');if(v&&(v.style.display="none"),f!==y){v&&(v.textContent="As senhas não coincidem.",v.style.display="");return}w&&(w.disabled=!0,w.textContent="Salvando…");const{error:L}=await b.auth.updateUser({password:f});if(L){v&&(v.textContent="Erro: "+L.message,v.style.display=""),w&&(w.disabled=!1,w.textContent="Definir Senha");return}window.location.href=window.location.pathname}),r.has("code")&&await b.auth.exchangeCodeForSession(r.get("code")??"");return}const{data:{session:E}}=await b.auth.getSession();if(E){if(n.classList.add("hidden"),a&&a.classList.remove("hidden"),qe(),ot(),Qe(),window.lucide&&lucide.createIcons(),u=await Ye(E.user.id),!u){await b.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden");return}if(u.active===!1){await b.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(u.needs_password_reset){n.style.display="none",a&&a.classList.add("hidden");const g=document.getElementById("password-reset-overlay");g&&(g.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async f=>{var C,I;f.preventDefault();const y=((C=document.getElementById("new-password"))==null?void 0:C.value)||"",v=((I=document.getElementById("confirm-password"))==null?void 0:I.value)||"",w=document.getElementById("password-reset-msg"),L=f.target.querySelector('button[type="submit"]');if(w&&(w.style.display="none"),y!==v){w&&(w.textContent="As senhas não coincidem.",w.style.display="");return}if(y.length<6){w&&(w.textContent="Mínimo 6 caracteres.",w.style.display="");return}L&&(L.disabled=!0,L.textContent="Salvando…");const{error:x}=await b.auth.updateUser({password:y});if(x){w&&(w.textContent="Erro: "+x.message,w.style.display=""),L&&(L.disabled=!1,L.textContent="Definir Senha");return}await b.from("profiles").update({needs_password_reset:!1}).eq("id",u.id),window.location.href=window.location.pathname});return}We((u==null?void 0:u.tenant_id)||null),Le(u),Ke(u.role),await Ie(),await nt(u),window.lucide&&lucide.createIcons(),Wt()}else{a&&a.classList.add("hidden"),n.classList.remove("hidden");const g=document.getElementById("login-form");g&&((d=document.getElementById("forgot-password-btn"))==null||d.addEventListener("click",async()=>{var v,w;const f=(w=(v=g.querySelector('input[name="email"]'))==null?void 0:v.value)==null?void 0:w.trim();if(!f){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:y}=await b.auth.resetPasswordForEmail(f,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(y?"Erro: "+y.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),g.addEventListener("submit",async f=>{f.preventDefault();const y=new FormData(g),v=y.get("email"),w=y.get("password");if(await $t(v,w)){n.classList.add("hidden"),a&&a.classList.remove("hidden"),qe(),ot(),window.lucide&&lucide.createIcons();const{data:{session:x}}=await b.auth.getSession();if(u=x?await Ye(x.user.id):null,!u){await b.auth.signOut();return}if(u.active===!1){await b.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}Qe(),We((u==null?void 0:u.tenant_id)||null),Le(u),Ke(u.role),await Ie(),await nt(u),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else qe();await fe();const o=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();Et(o),wt(K)});async function ea(){const e=$.filter(o=>!o.reference);if(!e.length)return;const t=$.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,s)=>o.id-s.id);for(const o of a){const s="IO-"+String(n).padStart(4,"0"),{error:l}=await b.from("properties").update({reference:s}).eq("id",o.id);if(!l){const d=$.findIndex(i=>i.id===o.id);d>=0&&($[d].reference=s),n++}}ye(He($))}async function ta(){const e=$.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(s=>!s.includes("/wm-")))continue;const a=[];let o=!1;for(const s of t.images)if(s.includes("/wm-"))a.push(s);else try{const l=await aa(s);a.push(l),o=!0}catch{a.push(s)}if(o){await b.from("properties").update({images:a}).eq("id",t.id);const s=$.findIndex(l=>l.id===t.id);s>=0&&($[s].images=a)}}ye(He($))}}async function aa(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),s=o.ok?await o.blob():null,l=s?URL.createObjectURL(s):null;return new Promise(d=>{const i=new Image;i.onload=()=>{URL.revokeObjectURL(a);const r=document.createElement("canvas"),m=1200;let p=i.width,c=i.height;p>m&&(c=Math.round(c*m/p),p=m),r.width=p,r.height=c;const E=r.getContext("2d");E.drawImage(i,0,0,p,c);const g=f=>{if(f){const y=Math.round(p*.18),v=Math.round(f.naturalHeight*y/f.naturalWidth),w=Math.round(p*.02);E.globalAlpha=.45,E.drawImage(f,p-y-w,c-v-w,y,v),E.globalAlpha=1}r.toBlob(async y=>{try{const v=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:w}=await b.storage.from("imoveis").upload(v,y,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(w){console.error("Upload watermark error:",w),d(e);return}const{data:{publicUrl:L}}=b.storage.from("imoveis").getPublicUrl(v);d(L)}catch(v){console.error("Watermark upload exception:",v),d(e)}},"image/jpeg",.82)};if(l){const f=new Image;f.onload=()=>{URL.revokeObjectURL(l),g(f)},f.onerror=()=>{URL.revokeObjectURL(l),g(null)},f.src=l}else g(null)},i.onerror=()=>{URL.revokeObjectURL(a),d(e)},i.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function H(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function ze(e,t="assets"){const n=await he(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await b.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:s}}=b.storage.from("imoveis").getPublicUrl(a);return s}async function na(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("settings").select("key,value").eq("tenant_id",Re()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>h(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const s=o.target.files[0];if(s)try{const l=await ze(s,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const s=await Z([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);s&&je(),o.disabled=!1,o.textContent="Salvar Identidade",H(document.getElementById("co-identity-msg"),s)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const s=document.getElementById("co-whatsapp").value.trim(),l=await Z([["company.whatsapp",s],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&s&&(K=s,pe=`https://wa.me/${s}`),o.disabled=!1,o.textContent="Salvar Contatos",H(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const s=await Z([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",H(document.getElementById("co-social-msg"),s)})}async function oa(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("settings").select("key,value").eq("tenant_id",Re()),n={};t==null||t.forEach(m=>{n[m.key]=m.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",s=n["visual.secondary_bg"]||"#1a2f4a",l=n["visual.hero_bg_url"]||"",d=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input type="color" id="col-secondary" value="${s}">
          <input type="text"  id="col-secondary-hex" value="${s}" maxlength="7">
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
          <input id="vis-hero-url" class="form-control" value="${h(l)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <div id="vis-hero-preview" style="margin-top:10px;display:${l?"":"none"}">
          <img src="${h(l)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function i(m,p,c){const E=document.getElementById(m),g=document.getElementById(p);E==null||E.addEventListener("input",f=>{g.value=f.target.value,c()}),g==null||g.addEventListener("input",f=>{/^#[0-9a-fA-F]{6}$/.test(f.target.value)&&(E.value=f.target.value,c())})}function r(){var p,c,E,g;const m=((p=document.getElementById("col-accent-hex"))==null?void 0:p.value)||"#b8962e";(c=document.getElementById("vp-bar"))==null||c.style.setProperty("background",m),(E=document.getElementById("vp-dot"))==null||E.style.setProperty("background",m),(g=document.getElementById("vp-btn"))==null||g.style.setProperty("background",m),document.documentElement.style.setProperty("--accent",m)}i("col-accent","col-accent-hex",r),i("col-primary","col-primary-hex",()=>{}),i("col-secondary","col-secondary-hex",()=>{}),r(),document.getElementById("vis-hero-file").addEventListener("change",async m=>{const p=m.target.files[0];if(p)try{const c=await ze(p,"hero");document.getElementById("vis-hero-url").value=c;const E=document.getElementById("vis-hero-preview");E.innerHTML=`<img src="${c}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,E.style.display=""}catch(c){alert("Erro no upload: "+c.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const m=document.getElementById("visual-save-colors");m.disabled=!0,m.textContent="Salvando…";const p=await Z([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);p&&je(),m.disabled=!1,m.textContent="Salvar Cores",H(document.getElementById("visual-colors-msg"),p)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",r())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const m=document.getElementById("visual-save-images");m.disabled=!0,m.textContent="Salvando…";const p=await Z([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);m.disabled=!1,m.textContent="Salvar Imagens",H(document.getElementById("visual-images-msg"),p)})}async function sa(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("site_content").select("*").eq("tenant_id",Re()),n={};t==null||t.forEach(i=>{n[i.key]=i});const a=(i,r)=>{var m;return h(((m=n[i])==null?void 0:m[`value_${r}`])||"")},o=["pt","en","es"],s={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=i=>o.map(r=>`<button class="content-tab${r===i?" active":""}" data-lang="${r}">${s[r]}</button>`).join(""),d=i=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${i}" value="${a("hero.title",i)}">
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${i}" rows="3">${a("hero.subtitle",i)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${i}" rows="4">${a("inst.bio_p1",i)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${i}" rows="3">${a("inst.bio_p2",i)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${i}" rows="3">${a("inst.bio_p3",i)}</textarea>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${i}" value="${a("inst.stat1_num",i)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${i}" value="${a("inst.stat2_num",i)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${i}" value="${a("inst.stat3_num",i)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${i}" value="${a("inst.stat1_label",i)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${i}" value="${a("inst.stat2_label",i)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${i}" value="${a("inst.stat3_label",i)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${i}" value="${a("footer.text",i)}">
    </div>
  `;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${l("pt")}</div>
      <div id="sc-panels">
        ${o.map(i=>`<div class="content-panel${i==="pt"?" active":""}" data-panel="${i}">${d(i)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",i=>{var m;const r=i.target.closest(".content-tab");r&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(p=>p.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(p=>p.classList.remove("active")),r.classList.add("active"),(m=document.querySelector(`#sc-panels [data-panel="${r.dataset.lang}"]`))==null||m.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const i=document.getElementById("sc-save-btn");i.disabled=!0,i.textContent="Salvando…";const r={};document.querySelectorAll(".sc-field").forEach(p=>{const c=p.dataset.key,E=p.dataset.lang;r[c]||(r[c]={}),r[c][E]=p.value});let m=!0;for(const[p,c]of Object.entries(r))await Ce(p,{pt:c.pt,en:c.en,es:c.es})||(m=!1);i.disabled=!1,i.textContent="Salvar Conteúdo",H(document.getElementById("sc-save-msg"),m)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const i=document.getElementById("seo-save-btn");i.disabled=!0,i.textContent="Salvando…";const r=document.getElementById("seo-title").value.trim(),m=document.getElementById("seo-desc").value.trim(),p=await Ce("seo.title_pt",{pt:r,en:r,es:r})&&await Ce("seo.description_pt",{pt:m,en:m,es:m});i.disabled=!1,i.textContent="Salvar SEO",H(document.getElementById("seo-save-msg"),p)})}async function ia(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await P())}async function P(){const e=document.getElementById("crm-body");if(!e)return;const[{data:t},{data:n},{data:a},{data:o}]=await Promise.all([b.from("crm_pipelines").select("*").order("sort_order"),b.from("crm_stages").select("*").order("sort_order"),b.from("crm_tags").select("*").order("name"),b.from("crm_lead_statuses").select("*").order("sort_order")]),s=t||[],l=s.find(c=>c.is_default)||s[0],d=s.map(c=>`<option value="${c.id}"${c.id===(l==null?void 0:l.id)?" selected":""}>${h(c.name)}</option>`).join(""),r=(n||[]).filter(c=>c.pipeline_id===(l==null?void 0:l.id)).map(c=>`
    <div class="stage-item" data-id="${c.id}">
      <div class="stage-color-dot" style="background:${c.color}"></div>
      <span class="stage-name">${h(c.name)}</span>
      <input type="color" value="${c.color}" data-sid="${c.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${c.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',m=(a||[]).map(c=>`<span class="tag-chip" style="background:${c.color}" data-id="${c.id}">
      ${h(c.name)}
      <button class="tag-chip-del" data-id="${c.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',p=(o||[]).map(c=>`
    <div class="stage-item" data-id="${c.id}">
      <div class="stage-color-dot" style="background:${c.color}"></div>
      <span class="stage-name">${h(c.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${c.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${c.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${d}</select>
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
      <div class="tags-grid" id="crm-tags-grid">${m}</div>
      <div class="tag-add-row">
        <input id="crm-new-tag" type="text" class="form-control" placeholder="Nome da tag…">
        <input type="color" id="crm-new-tag-color" value="#b8962e">
        <button class="btn-primary" id="crm-add-tag">Adicionar</button>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📋</span> Status de Leads</div>
      <div class="stages-list" id="crm-status-list">${p}</div>
      <div class="stage-add-row">
        <input id="crm-new-status" type="text" class="form-control" placeholder="Nome do status…">
        <input type="color" id="crm-new-status-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text);white-space:nowrap">
          <input type="checkbox" id="crm-new-status-final"> Status final
        </label>
        <button class="btn-primary" id="crm-add-status">Adicionar</button>
      </div>
    </div>
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const c=document.getElementById("crm-new-stage").value.trim(),E=document.getElementById("crm-new-stage-color").value,g=parseInt(document.getElementById("crm-pipe-sel").value,10);c&&(await b.from("crm_stages").insert({pipeline_id:g,name:c,color:E,sort_order:99}),document.getElementById("crm-new-stage").value="",await P())}),e.querySelectorAll(".stage-del").forEach(c=>{c.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await b.from("crm_stages").delete().eq("id",c.dataset.id),await P())})}),e.querySelectorAll(".stage-color-pick").forEach(c=>{c.addEventListener("change",async E=>{await b.from("crm_stages").update({color:E.target.value}).eq("id",c.dataset.sid);const g=c.closest(".stage-item").querySelector(".stage-color-dot");g&&(g.style.background=E.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const c=document.getElementById("crm-new-tag").value.trim(),E=document.getElementById("crm-new-tag-color").value;c&&(await b.from("crm_tags").insert({name:c,color:E}),document.getElementById("crm-new-tag").value="",await P())}),e.querySelectorAll(".tag-chip-del").forEach(c=>{c.addEventListener("click",async()=>{await b.from("crm_tags").delete().eq("id",c.dataset.id),await P()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const c=document.getElementById("crm-new-status").value.trim(),E=document.getElementById("crm-new-status-color").value,g=document.getElementById("crm-new-status-final").checked;c&&(await b.from("crm_lead_statuses").insert({name:c,color:E,is_final:g,sort_order:99}),document.getElementById("crm-new-status").value="",await P())}),e.querySelectorAll(".status-del").forEach(c=>{c.addEventListener("click",async()=>{confirm("Remover este status?")&&(await b.from("crm_lead_statuses").delete().eq("id",c.dataset.id),await P())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var E;const c=(E=prompt("Nome do novo funil:"))==null?void 0:E.trim();c&&(await b.from("crm_pipelines").insert({name:c,sort_order:99}),await P())})}async function la(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await b.from("integrations").select("*"),n={};t==null||t.forEach(d=>{n[d.key]=d});const a=d=>{var i;return h(((i=n[d])==null?void 0:i.value)||"")},o=d=>{var i;return(i=n[d])!=null&&i.enabled?"checked":""},s=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${s.map(d=>`
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
      ${l.map(d=>`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var p;const d=document.getElementById("intg-save-tracking");d.disabled=!0,d.textContent="Salvando…";let i=!0;const r=document.querySelectorAll(".intg-val"),m=document.querySelectorAll(".intg-toggle");for(let c=0;c<r.length;c++){const E=r[c].dataset.key,g=r[c].value.trim(),f=((p=m[c])==null?void 0:p.checked)??!1;await Te(E,g,f)||(i=!1)}d.disabled=!1,d.textContent="Salvar Integrações",H(document.getElementById("intg-tracking-msg"),i)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const d=document.getElementById("intg-save-smtp");d.disabled=!0,d.textContent="Salvando…";const i=document.querySelectorAll(".smtp-field");let r=!0;for(const p of i)await Te(p.dataset.key,p.value.trim(),!0)||(r=!1);const m=document.getElementById("smtp-pass").value;m&&(await Te("smtp_pass",m,!0)||(r=!1)),d.disabled=!1,d.textContent="Salvar SMTP",H(document.getElementById("intg-smtp-msg"),r)})}async function da(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Ne(),document.getElementById("media-file-input").addEventListener("change",async n=>{var i,r;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),s=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");o.style.display="";let d=0;for(const m of a){l.textContent=`Enviando ${d+1}/${a.length}…`,s.style.width=`${Math.round(d/a.length*100)}%`;try{const p=await ze(m,"media"),c=m.name.replace(/\.[^.]+$/,"").slice(0,60);await b.from("media_library").insert({name:c,url:p,type:"image",size:m.size,created_by:(r=(i=(await b.auth.getUser()).data)==null?void 0:i.user)==null?void 0:r.id})}catch(p){console.error("Media upload error:",p)}d++}s.style.width="100%",l.textContent=`✓ ${d} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",s.style.width="0"},2e3),await Ne(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Ne(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await b.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${h(a.url)}">
      <img src="${h(a.url)}" alt="${h(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${h(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${h(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var s;o.stopPropagation(),(s=navigator.clipboard)==null||s.writeText(a.dataset.url).then(()=>{const l=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await b.from("media_library").delete().eq("id",a.dataset.id),await Ne())})})}async function ra(){var t,n,a,o,s;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(i=>i.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(i=>i.classList.add("hidden")),l.classList.add("active");const d=e.querySelector(`#sa-panel-${l.dataset.tab}`);d&&d.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&X(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&ca(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&st(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&it(),l.dataset.tab==="platform"&&lt()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",st),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",X),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",it),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>pa()),(s=e.querySelector("#sa-plat-save"))==null||s.addEventListener("click",ma),X(),lt())}async function X(){var d,i;const e=document.getElementById("sa-tenants-list"),t=((i=(d=document.getElementById("sa-tenant-search"))==null?void 0:d.value)==null?void 0:i.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=b.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const s=(a||[]).filter(r=>{var m,p;return!t||((m=r.name)==null?void 0:m.toLowerCase().includes(t))||((p=r.slug)==null?void 0:p.toLowerCase().includes(t))});if(!s.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const l=r=>r.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=s.map(r=>{var m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        ${r.logo_url?`<img class="sa-tenant-logo" src="${h(r.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${h(r.name||"—")}</div>
          <div class="sa-list-sub">${h(r.slug||"")} · ${h(((m=r.plans)==null?void 0:m.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${l(r)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${r.id}" data-active="${r.active}" title="${r.active?"Desativar":"Ativar"}">${r.active?"⏸️":"▶️"}</button>
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${r.id}" title="Editar">✏️</button>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(r=>{r.addEventListener("click",async()=>{const m=r.dataset.active==="true";await b.from("tenants").update({active:!m}).eq("id",r.dataset.id),X()})}),e.querySelectorAll('[data-action="edit-tenant"]').forEach(r=>{r.addEventListener("click",()=>{const m=(s||[]).find(p=>String(p.id)===String(r.dataset.id));m&&va(m)})})}async function ca(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await b.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${h(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function st(){var d;const e=document.getElementById("sa-subs-list"),t=((d=document.getElementById("sa-sub-filter"))==null?void 0:d.value)||"";if(!e)return;e.dataset.loaded="1";let n=b.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const s={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},l={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(i=>{var r,m,p;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${h(((r=i.tenants)==null?void 0:r.name)||"—")}</div>
          <div class="sa-list-sub">${h(((m=i.plans)==null?void 0:m.name)||"—")} · R$ ${Number(((p=i.plans)==null?void 0:p.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${s[i.status]||"gray"}">${l[i.status]||i.status}</span>
        <span class="sa-list-date">${i.current_period_end?new Date(i.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function it(){var l,d;const e=document.getElementById("sa-users-list"),t=((d=(l=document.getElementById("sa-user-search"))==null?void 0:l.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await b.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(i=>{var r,m;return!t||((r=i.name)==null?void 0:r.toLowerCase().includes(t))||((m=i.email)==null?void 0:m.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const s={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(i=>{var r;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(i.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${h(i.name||"—")}</div>
          <div class="sa-list-sub">${h(((r=i.tenants)==null?void 0:r.name)||"Sem imobiliária")} · ${s[i.role]||i.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${i.active!==!1?"sa-badge-green":"sa-badge-red"}">${i.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function lt(){const[e,t,n,a]=await Promise.all([b.from("tenants").select("id",{count:"exact",head:!0}),b.from("profiles").select("id",{count:"exact",head:!0}),b.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),b.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(s,l)=>{const d=document.getElementById(s);d&&(d.textContent=l??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function ma(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await Z([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),H(t,!0)}function ua(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function pa(){var a,o,s,l,d,i;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),b.from("plans").select("id, name").then(({data:r})=>{const m=document.getElementById("nt-plan");m&&r&&(m.innerHTML='<option value="">Sem plano</option>'+r.map(p=>`<option value="${p.id}">${h(p.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",r=>{const m=document.getElementById("nt-slug");m&&!m.dataset.manual&&(m.value=ua(r.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",r=>{r.target.dataset.manual="1"}),(s=document.getElementById("nt-pwd-toggle"))==null||s.addEventListener("click",()=>{const r=document.getElementById("nt-admin-password");r.type=r.type==="password"?"text":"password"});const n=()=>t.remove();(l=document.getElementById("sa-modal-close-btn"))==null||l.addEventListener("click",n),(d=document.getElementById("nt-cancel"))==null||d.addEventListener("click",n),t.addEventListener("click",r=>{r.target===t&&n()}),(i=document.getElementById("nt-save"))==null||i.addEventListener("click",async()=>{var C,I,B,S,k,_,T,z,N,se,ie,le;const r=(I=(C=document.getElementById("nt-name"))==null?void 0:C.value)==null?void 0:I.trim(),m=(S=(B=document.getElementById("nt-slug"))==null?void 0:B.value)==null?void 0:S.trim(),p=(_=(k=document.getElementById("nt-domain"))==null?void 0:k.value)==null?void 0:_.trim(),c=(T=document.getElementById("nt-plan"))==null?void 0:T.value,E=(N=(z=document.getElementById("nt-admin-email"))==null?void 0:z.value)==null?void 0:N.trim(),g=(ie=(se=document.getElementById("nt-admin-password"))==null?void 0:se.value)==null?void 0:ie.trim(),f=document.getElementById("nt-msg"),y=document.getElementById("nt-save");if(!r||!m){f.textContent="❌ Nome e slug são obrigatórios.",f.style.color="#ef4444";return}if(!E){f.textContent="❌ Informe o e-mail do admin.",f.style.color="#ef4444";return}if(!g||g.length<6){f.textContent="❌ A senha precisa ter mínimo 6 caracteres.",f.style.color="#ef4444";return}y.disabled=!0,y.textContent="Criando…",f.textContent="⏳ Criando imobiliária…",f.style.color="#64748b";const{data:v,error:w}=await b.from("tenants").insert({name:r,slug:m,domain:p||null,plan_id:c||null,active:!0}).select();if(w){y.disabled=!1,y.textContent="Criar Imobiliária",f.textContent="❌ "+w.message,f.style.color="#ef4444";return}const L=(le=v==null?void 0:v[0])==null?void 0:le.id;f.textContent="⏳ Criando usuário admin…";const x=await oe({email:E,password:g,role:"admin",tenant_id:L});if(!(x!=null&&x.success)){y.disabled=!1,y.textContent="Criar Imobiliária",f.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+h((x==null?void 0:x.error)||"Desconhecido"),f.style.color="#f59e0b",setTimeout(()=>{n(),X()},3e3);return}L&&(x!=null&&x.user_id)&&!(x!=null&&x.linked)&&await b.from("profiles").update({tenant_id:L}).eq("id",x.user_id),y.disabled=!1,y.textContent="Criar Imobiliária",x.email_sent===!1?(f.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${h(x.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${h(E)}</strong><br>
          Senha: <strong>${h(g)}</strong>
        </div>`,f.style.color="#0f172a"):(f.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",f.style.color="#22c55e",setTimeout(()=>{n(),X()},1500))})}function va(e){var s,l,d,i,r,m,p,c,E,g;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
    <div class="sa-modal" style="max-width:560px;">
      <div class="sa-modal-header">
        <h3>Editar Imobiliária</h3>
        <button class="sa-modal-close" id="et-close">✕</button>
      </div>

      <!-- Abas -->
      <div style="display:flex;border-bottom:1px solid #e2e8f0;padding:0 20px;gap:4px;flex-shrink:0;">
        <button id="et-tab-dados" style="padding:10px 16px;font-size:13px;font-weight:600;border:none;background:none;cursor:pointer;border-bottom:2px solid #2563eb;color:#2563eb;">Dados</button>
        <button id="et-tab-api" style="padding:10px 16px;font-size:13px;font-weight:500;border:none;background:none;cursor:pointer;border-bottom:2px solid transparent;color:#64748b;">🔑 API</button>
      </div>

      <!-- Aba: Dados -->
      <div id="et-pane-dados" class="sa-modal-body">
        <div style="display:flex;align-items:center;gap:16px;">
          <div id="et-logo-preview" style="width:72px;height:72px;border-radius:12px;border:2px dashed #e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#f8fafc;flex-shrink:0;cursor:pointer;" title="Clique para alterar a logo">
            ${e.logo_url?`<img src="${h(e.logo_url)}" style="width:100%;height:100%;object-fit:cover;">`:'<span style="font-size:28px;">🏢</span>'}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · 256×256px</div>
          </div>
        </div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${h(e.name||"")}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${h(e.slug||"")}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${h(e.domain||"")}" placeholder="abc.imobipro.com.br"></div>
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

      <!-- Aba: API -->
      <div id="et-pane-api" class="sa-modal-body" style="display:none;">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px;">
          <div style="font-size:12px;font-weight:700;color:#1d4ed8;margin-bottom:6px;">🔑 Chave de API desta Imobiliária</div>
          <p style="font-size:12px;color:#1e40af;margin:0 0 10px;">Use esta chave para conectar qualquer site ao CRM.</p>
          <div style="display:flex;gap:8px;align-items:center;">
            <input id="et-api-key" class="form-input" type="text" value="${h(e.id||"")}" readonly
              style="font-family:monospace;font-size:11px;background:#fff;color:#1e3a5f;flex:1;letter-spacing:.02em;">
            <button id="et-copy-key" class="btn-secondary-sm" style="white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Endpoints disponíveis</div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([f,y,v])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${f==="GET"?"#dcfce7":"#fef9c3"};color:${f==="GET"?"#15803d":"#854d0e"};">${f}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${y}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${v}</div>
            </div>`).join("")}
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Exemplo rápido (JavaScript)</div>
        <pre style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;font-size:11px;overflow-x:auto;margin:0;line-height:1.6;"><code>const KEY = '${h(e.id)}'
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
  `,document.body.appendChild(n),b.from("plans").select("id, name").then(({data:f})=>{const y=document.getElementById("et-plan");y&&f&&(y.innerHTML='<option value="">Sem plano</option>'+f.map(v=>`<option value="${v.id}"${String(v.id)===String(e.plan_id)?" selected":""}>${h(v.name)}</option>`).join(""))}),(s=document.getElementById("et-logo-input"))==null||s.addEventListener("change",f=>{const y=f.target.files[0];if(!y)return;const v=URL.createObjectURL(y),w=document.getElementById("et-logo-preview");w&&(w.innerHTML=`<img src="${v}" style="width:100%;height:100%;object-fit:cover;">`)}),(l=document.getElementById("et-logo-preview"))==null||l.addEventListener("click",()=>{var f;(f=document.getElementById("et-logo-input"))==null||f.click()}),(d=document.getElementById("et-pwd-toggle"))==null||d.addEventListener("click",()=>{const f=document.getElementById("et-admin-password");f.type=f.type==="password"?"text":"password"}),(i=document.getElementById("et-copy-key"))==null||i.addEventListener("click",()=>{var w,L;const f=(w=document.getElementById("et-api-key"))==null?void 0:w.value;if(!f)return;(L=navigator.clipboard)==null||L.writeText(f);const y=document.getElementById("et-copy-key"),v=y.textContent;y.textContent="✅ Copiada!",setTimeout(()=>{y.textContent=v},2e3)}),(r=document.getElementById("et-tab-api"))==null||r.addEventListener("click",()=>{document.getElementById("et-pane-dados").style.display="none",document.getElementById("et-pane-api").style.display="",document.getElementById("et-tab-dados").style.borderBottomColor="transparent",document.getElementById("et-tab-dados").style.color="#64748b",document.getElementById("et-tab-api").style.borderBottomColor="#2563eb",document.getElementById("et-tab-api").style.color="#2563eb"}),(m=document.getElementById("et-tab-dados"))==null||m.addEventListener("click",()=>{document.getElementById("et-pane-api").style.display="none",document.getElementById("et-pane-dados").style.display="",document.getElementById("et-tab-api").style.borderBottomColor="transparent",document.getElementById("et-tab-api").style.color="#64748b",document.getElementById("et-tab-dados").style.borderBottomColor="#2563eb",document.getElementById("et-tab-dados").style.color="#2563eb"});const o=()=>n.remove();(p=document.getElementById("et-close"))==null||p.addEventListener("click",o),(c=document.getElementById("et-cancel"))==null||c.addEventListener("click",o),n.addEventListener("click",f=>{f.target===n&&o()}),(E=document.getElementById("et-delete"))==null||E.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const y=document.getElementById("et-delete");y.disabled=!0,y.textContent="Excluindo…";const{error:v}=await b.from("tenants").delete().eq("id",e.id);if(v){alert("Erro ao excluir: "+v.message),y.disabled=!1,y.textContent="🗑️ Excluir";return}o(),X()}),(g=document.getElementById("et-save"))==null||g.addEventListener("click",async()=>{var _,T,z,N,se,ie,le,Pe,Oe,Fe,Xe,Ge;const f=(T=(_=document.getElementById("et-name"))==null?void 0:_.value)==null?void 0:T.trim(),y=(N=(z=document.getElementById("et-slug"))==null?void 0:z.value)==null?void 0:N.trim(),v=(ie=(se=document.getElementById("et-domain"))==null?void 0:se.value)==null?void 0:ie.trim(),w=(le=document.getElementById("et-plan"))==null?void 0:le.value,L=(Oe=(Pe=document.getElementById("et-admin-email"))==null?void 0:Pe.value)==null?void 0:Oe.trim(),x=(Xe=(Fe=document.getElementById("et-admin-password"))==null?void 0:Fe.value)==null?void 0:Xe.trim(),C=(Ge=document.getElementById("et-logo-input"))==null?void 0:Ge.files[0],I=document.getElementById("et-msg"),B=document.getElementById("et-save");if(!f){I.textContent="❌ Nome é obrigatório.",I.style.color="#ef4444";return}B.disabled=!0,B.textContent="Salvando…",I.textContent="⏳ Salvando…",I.style.color="#64748b";let S=e.logo_url;if(C)try{const q=await he(C,256,.85),Ve=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:yt}=await b.storage.from("imoveis").upload(Ve,q,{contentType:"image/jpeg",upsert:!0});if(!yt){const{data:{publicUrl:bt}}=b.storage.from("imoveis").getPublicUrl(Ve);S=bt}}catch(q){console.error("Logo upload:",q)}const{error:k}=await b.from("tenants").update({name:f,slug:y||e.slug,domain:v||null,plan_id:w||null,logo_url:S}).eq("id",e.id);if(k){B.disabled=!1,B.textContent="Salvar",I.textContent="❌ "+k.message,I.style.color="#ef4444";return}if(L&&x&&x.length>=6){I.textContent="⏳ Criando usuário admin…";const q=await oe({email:L,password:x,role:"admin",tenant_id:e.id});q!=null&&q.success?(q!=null&&q.user_id&&!(q!=null&&q.linked)&&await b.from("profiles").update({tenant_id:e.id}).eq("id",q.user_id),I.textContent="✅ Salvo e admin criado!",I.style.color="#22c55e"):(I.textContent="⚠️ Salvo, mas erro ao criar admin: "+((q==null?void 0:q.error)||"Tente novamente"),I.style.color="#f59e0b")}else I.textContent="✅ Imobiliária atualizada!",I.style.color="#22c55e";B.disabled=!1,B.textContent="Salvar",setTimeout(()=>{o(),X()},1200)})}
