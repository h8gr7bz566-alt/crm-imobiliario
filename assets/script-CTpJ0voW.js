import{s as v}from"./supabase-BcuJ3xoD.js";let he={},Me={};async function dt(){const[e,t]=await Promise.all([v.from("settings").select("key,value"),v.from("site_content").select("*")]);e.data&&e.data.forEach(n=>{he[n.key]=n.value}),t.data&&t.data.forEach(n=>{Me[n.key]=n})}const V=(e,t=null)=>he[e]!==void 0?he[e]:t,Se=(e,t="pt")=>{const n=Me[e];return n?n[`value_${t}`]??n.value_pt??null:null};async function Q(e){const t=new Date().toISOString(),n=e.map(([o,s])=>({key:o,value:s,updated_at:t})),{error:a}=await v.from("settings").upsert(n,{onConflict:"key"});return a||e.forEach(([o,s])=>{he[o]=s}),!a}async function $e(e,{pt:t,en:n,es:a}){const o={key:e,value_pt:t,value_en:n,value_es:a,updated_at:new Date().toISOString()},{error:s}=await v.from("site_content").upsert(o,{onConflict:"key"});return s||(Me[e]=o),!s}async function ke(e,t,n){const{error:a}=await v.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function Ne(){const e=document.documentElement,t=V("visual.accent_color","#b8962e"),n=V("visual.primary_bg","#0f1c2e"),a=V("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=V("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(i=>{i.src=o});const s=V("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=s);const d=V("visual.hero_bg_url","");if(d){const i=document.querySelector(".hero");i&&(i.style.backgroundImage=`url('${d}')`)}}function rt(e="pt"){const t=p=>Se(p,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const s=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),d=document.querySelector('[data-i18n="inst.p3"]');s&&t("inst.bio_p1")&&(s.innerHTML=t("inst.bio_p1")),l&&t("inst.bio_p2")&&(l.innerHTML=t("inst.bio_p2")),d&&t("inst.bio_p3")&&(d.innerHTML=t("inst.bio_p3"));const i=document.querySelector('[data-i18n-num="inst.stat2num"]'),c=document.querySelector('[data-i18n="inst.stat1"]'),m=document.querySelector('[data-i18n="inst.stat2"]'),u=document.querySelector('[data-i18n="inst.stat3"]');i&&t("inst.stat2_num")&&(i.innerHTML=t("inst.stat2_num")),c&&t("inst.stat1_label")&&(c.innerHTML=t("inst.stat1_label")),m&&t("inst.stat2_label")&&(m.innerHTML=t("inst.stat2_label")),u&&t("inst.stat3_label")&&(u.innerHTML=t("inst.stat3_label"));const r=Se("seo.title_pt",e);r&&document.title&&(document.title=r);const b=Se("seo.description_pt",e);if(b){const p=document.querySelector('meta[name="description"]');p&&(p.content=b)}}function ct(e){if(!e)return;const t=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const mt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let K="5547999701743",re=`https://wa.me/${K}`;const Y=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],ut=5.7;function ce(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/ut).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let k=[],g=null,me=[],et=!1;v.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(et=!0)});async function pt(){const{data:e,error:t}=await v.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return t?(console.error("Supabase select error:",t),[]):e||[]}async function vt(){const{data:e,error:t}=await v.from("properties").select("*").order("created_at",{ascending:!1});return t?(console.error("Supabase select error:",t),[]):(k=e||[],Ot(),Ft(),k)}async function gt(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await v.from("properties").update(a).eq("id",t);if(o)throw o;const s=k.findIndex(l=>l.id===t);s>=0&&(k[s]={...k[s],...a})}else{if(!e.reference){const a=k.map(s=>s.reference||"").filter(s=>/^IO-\d+$/.test(s)).map(s=>parseInt(s.replace("IO-",""),10)),o=a.length?Math.max(...a)+1:1;e.reference="IO-"+String(o).padStart(4,"0")}const{data:t,error:n}=await v.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&k.unshift(t[0])}}async function ft(e){const{error:t}=await v.from("properties").delete().eq("id",e);if(t)throw t;k=k.filter(n=>n.id!==e)}async function yt(e,t){const{error:n}=await v.auth.signInWithPassword({email:e,password:t});return!n}function Le(e,t=1200,n=.78){return new Promise((a,o)=>{const s=new Image,l=URL.createObjectURL(e);s.onload=()=>{URL.revokeObjectURL(l);const d=document.createElement("canvas");let i=s.width,c=s.height;i>t&&(c=Math.round(c*t/i),i=t),d.width=i,d.height=c;const m=d.getContext("2d");m.drawImage(s,0,0,i,c);const u=new Image;u.crossOrigin="anonymous",u.onload=()=>{const r=Math.round(i*.18),b=Math.round(u.naturalHeight*r/u.naturalWidth),p=Math.round(i*.02),f=i-r-p,w=c-b-p;m.globalAlpha=.45,m.drawImage(u,f,w,r,b),m.globalAlpha=1,d.toBlob(h=>h?a(h):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.onerror=()=>{d.toBlob(r=>r?a(r):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.src="/logo.png"},s.onerror=o,s.src=l})}async function bt(e){const t=await Le(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await v.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=v.storage.from("imoveis").getPublicUrl(n);return o}async function ht(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await bt(n[o]));return a}async function ue(){var u,r,b,p,f,w;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await pt();k=n,((u=document.getElementById("selecao-carousel"))==null?void 0:u.innerHTML)===""&&Et(n);const a=((r=document.getElementById("city-filter"))==null?void 0:r.value)||"",o=((b=document.getElementById("neighborhood-filter"))==null?void 0:b.value)||"",s=((p=document.getElementById("bedrooms-filter"))==null?void 0:p.value)||"",l=((f=document.getElementById("parking-filter"))==null?void 0:f.value)||"",d=((w=document.getElementById("construction-filter"))==null?void 0:w.value)||"",i=document.getElementById("price-slider"),c=i?parseInt(i.value,10):13e7,m=n.filter(h=>{if(a&&h.city!==a||o&&h.neighborhood!==o||s&&(s==="4+"&&Number(h.bedrooms)<4||s!=="4+"&&Number(h.bedrooms)!==Number(s))||l&&(l==="4+"&&Number(h.parking)<4||l!=="4+"&&Number(h.parking)!==Number(l))||d&&h.construction_status!==d)return!1;const E=String(h.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),S=parseInt(E,10)||0;return!(S<0||S>c)});if(e){if(!m.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=m.map(h=>{var B;const E=h.cover_image||((B=h.images)==null?void 0:B[0])||Y[0],S=[h.neighborhood,h.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${E}" alt="${y(h.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${y(h.title)}</div>
            <div class="selecao-card-loc">${y(S)}</div>
            <div class="selecao-card-price">${y(ce(h.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${h.id}" class="btn-det">Ver Detalhes</a>
              <a href="${re}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!m.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=m.map(h=>{var B;const E=(B=h.images)!=null&&B.length?h.images:Y,S=E.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${S}" data-idx="0" data-pid="${h.id}">
          <img src="${h.cover_image||E[0]}" alt="${y(h.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${S>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${y(h.title)}</strong>
          <div class="muted">${y(h.neighborhood||"")}, ${y(h.city||"")}</div>
          <div><strong>${y(ce(h.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${h.bedrooms||"--"} | 🚗 ${h.parking||"--"} ${S>1?"| 📸 "+S:""}</div>
          <p class="muted">${y((h.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${h.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${re}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(h=>{h.removeEventListener("click",Oe),h.addEventListener("click",Oe)})}function Et(e){var o,s,l;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(d=>{var m;const i=d.cover_image||((m=d.images)==null?void 0:m[0])||Y[0],c=[d.neighborhood,d.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${i}" alt="${y(d.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${y(d.title)}</div>
          <div class="selecao-card-loc">${y(c)}</div>
          <div class="selecao-card-price">${y(ce(d.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${d.id}" class="btn-det">Ver Detalhes</a>
            <a href="${re}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(s=a==null?void 0:a.querySelector(".selecao-prev"))==null||s.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(l=a==null?void 0:a.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),ue()};function Oe(e){var d;e.stopPropagation();const t=e.currentTarget.closest(".carousel-wrap");if(!t)return;const n=parseInt(t.dataset.total,10);if(!n)return;let a=parseInt(t.dataset.idx,10)||0;const o=e.currentTarget.classList.contains("carousel-next")?1:-1;a=(a+o+n)%n,t.dataset.idx=a;const s=parseInt(t.dataset.pid,10),l=k.find(i=>i.id===s);(d=l==null?void 0:l.images)!=null&&d.length&&(t.querySelector(".carousel-img").src=l.images[a])}function wt(){const e=document.getElementById("price-slider"),t=document.getElementById("price-label");!e||!t||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",t.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);t.textContent="Até R$ "+n.toLocaleString("pt-BR"),ue()}))}function It(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=J();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${y(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=J().find(s=>s.name===e.value),o=a?He(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(s=>`<option value="${s.name}">${y(s.name)}</option>`).join(""),ue()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",ue)})}function pe(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var l;const a=n.cover_image||((l=n.images)==null?void 0:l[0])||Y[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",s=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${y(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${y(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+y(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${y(o)}</td>
      <td class="cell-price">${y(ce(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${s}</td>
      <td>
        <div class="action-btns">
          ${(g==null?void 0:g.role)==="admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(g==null?void 0:g.role)==="admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function xt(){const e=document.getElementById("f-city");if(!e)return;const t=J(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${y(a.name)}</option>`).join(""),n&&(e.value=n)}function Bt(){var e,t,n,a,o,s,l,d,i,c,m,u,r,b,p;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((s=document.getElementById("f-condominium"))==null?void 0:s.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((d=document.getElementById("f-price-max"))==null?void 0:d.value)||1/0,areaMin:parseFloat((i=document.getElementById("f-area-min"))==null?void 0:i.value)||0,areaMax:parseFloat((c=document.getElementById("f-area-max"))==null?void 0:c.value)||1/0,construction:((m=document.getElementById("f-construction"))==null?void 0:m.value)||"",published:((u=document.getElementById("f-published"))==null?void 0:u.value)||"",bedrooms:((r=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:r.dataset.val)||"",suites:((b=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:b.dataset.val)||"",parking:((p=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:p.dataset.val)||""}}function Re(e){const t=Bt();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const s=parseFloat(a.area)||0;return!(t.areaMin>0&&s<t.areaMin||t.areaMax<1/0&&s>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Ee(){if(!document.getElementById("admin-properties"))return;const e=await vt(),t=e.length,n=e.filter(l=>l.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),s=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),s&&(s.textContent="—"),xt(),pe(k)}let R=null,W="";function Ce(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function be(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function we(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===W?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{W=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function _e(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{n.preventDefault();const a=new FormData(e),o=a.getAll("images");let s=[];const l=o.filter(i=>i.size>0);if(l.length){t.disabled=!0,t.textContent=`Enviando 0/${l.length} foto…`;try{s=await ht(l,(i,c)=>{t.textContent=`Enviando ${i}/${c} foto…`})}catch(i){console.error("Erro no upload:",i),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(R){const i=k.find(c=>c.id===R);i!=null&&i.images&&(s=i.images)}s.length||(s=[...Y]);const d={...R?{id:R}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:s,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:W||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||""};try{await gt(d),R=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const i=document.getElementById("adminPublished");i&&(i.value="true");const c=document.getElementById("adminNeighborhood");c&&(c.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),W="",we([]),be(),await Ee()}catch(i){console.error(i),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert("Erro ao salvar imóvel. Verifique o console.")}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await ft(o),await Ee()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((g==null?void 0:g.role)!=="admin")return;const o=Number(n.target.dataset.id);if(!o)return;const s=k.find(i=>i.id===o);if(!s)return;R=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=s.title||"",e.querySelector('[name="rua"]').value=s.rua||"",e.querySelector('[name="numero"]').value=s.numero||"",e.querySelector('[name="city"]').value=s.city||"",e.querySelector('[name="price"]').value=s.price||"",e.querySelector('[name="bedrooms"]').value=s.bedrooms||"",e.querySelector('[name="suites"]').value=s.suites||"",e.querySelector('[name="area"]').value=s.area||"",e.querySelector('[name="parking"]').value=s.parking||"",e.querySelector('[name="description"]').value=s.description||"",e.querySelector('[name="construction_status"]').value=s.construction_status||"",e.querySelector('[name="owner_name"]').value=s.owner_name||"",e.querySelector('[name="owner_phone"]').value=s.owner_phone||"",e.querySelector('[name="owner_email"]').value=s.owner_email||"",e.querySelector('[name="owner_notes"]').value=s.owner_notes||"",e.querySelector('[name="condominium"]').value=s.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=s.published===!0?"true":"false");const d=document.getElementById("adminCitySelect");d&&(d.value=s.city||"",d.dispatchEvent(new Event("change")),setTimeout(()=>{const i=document.getElementById("adminNeighborhood");i&&(i.value=s.neighborhood||"")},50)),W=s.cover_image||((a=s.images)==null?void 0:a[0])||"",we(s.images||[]),Ce("Editar Imóvel")}})}function y(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let O=[],H=0;function Lt(e){var m,u;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const t=document.getElementById("view-status-badge");e.published?(t.textContent="● Publicado",t.className="badge badge-green"):(t.textContent="○ Rascunho",t.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const a=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=a,document.getElementById("view-directions-link").href=a;const o=((m=e.images)==null?void 0:m[0])||Y[0];document.getElementById("view-thumb-preview").src=o,O=(u=e.images)!=null&&u.length?e.images:Y,H=0,Ie(),document.getElementById("view-price").textContent=ce(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const s=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),s&&(s.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(r=>r.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(r=>r.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const d="https://omarcorretor.com.br/property.html?id="+e.id,i=document.getElementById("share-link-input");i&&(i.value=d);const c=document.getElementById("share-panel");c&&(c.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ye(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Ie(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=O[H],e.alt=`Foto ${H+1}`;const s=O.length>1;n.style.display=s?"flex":"none",a.style.display=s?"flex":"none",t.textContent=s?`${H+1} / ${O.length}`:"",o.innerHTML=s?O.map((l,d)=>`<img src="${l}" class="view-thumb${d===H?" active":""}" data-i="${d}" alt="Foto ${d+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{H=+l.dataset.i,Ie()})})}async function Fe(e){const{data:t}=await v.from("profiles").select("*").eq("id",e).maybeSingle();return t}function qe(e){var u,r;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const s=(e==null?void 0:e.name)||"Sem nome",l=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=s,o&&(o.textContent=l),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((u=s[0])==null?void 0:u.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const d=document.getElementById("avatar-dd-name"),i=document.getElementById("avatar-dd-role"),c=document.getElementById("avatar-dd-img"),m=document.getElementById("avatar-dd-initial");d&&(d.textContent=s),i&&(i.textContent=l),e!=null&&e.avatar_url&&c?(c.src=e.avatar_url,c.style.display="",m&&(m.style.display="none")):(m&&(m.textContent=((r=s[0])==null?void 0:r.toUpperCase())||"?",m.style.display=""),c&&(c.style.display="none"))}function X(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),G(),e==="contatos"&&Ht(),e==="funil"&&$t(),e==="tarefas"&&_t()}function ze(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:Xt,visual:Vt,"site-config":Gt,"crm-config":Wt,integracoes:Yt,midia:Jt}).forEach(([a,o])=>{const s=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);s&&s.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>Kt(),{once:!0}),window.lucide&&lucide.createIcons()}}function G(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function St(){var s,l,d,i,c,m,u,r,b;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",p=>{var w;p.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(w=document.getElementById("notif-dropdown"))==null||w.classList.add("hidden")}),(s=document.getElementById("avatar-dd-profile"))==null||s.addEventListener("click",()=>{G(),X("settings")}),(l=document.getElementById("avatar-dd-settings"))==null||l.addEventListener("click",()=>{G(),X("settings")}),(d=document.getElementById("avatar-dd-logout"))==null||d.addEventListener("click",async()=>{await v.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",p=>{var w;p.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((w=document.getElementById("avatar-dropdown"))==null||w.classList.add("hidden"),At())}),(i=document.getElementById("notif-mark-all"))==null||i.addEventListener("click",()=>{Mt(),G()}),(c=document.getElementById("btn-search-open"))==null||c.addEventListener("click",()=>{var p,f;(p=document.getElementById("search-overlay"))==null||p.classList.remove("hidden"),(f=document.getElementById("search-input"))==null||f.focus()}),(m=document.getElementById("search-overlay-close"))==null||m.addEventListener("click",()=>{var p;(p=document.getElementById("search-overlay"))==null||p.classList.add("hidden")}),(u=document.getElementById("search-overlay"))==null||u.addEventListener("click",p=>{p.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(r=document.getElementById("search-input"))==null||r.addEventListener("input",p=>{clearTimeout(o),o=setTimeout(()=>Tt(p.target.value.trim()),280)}),(b=document.getElementById("search-input"))==null||b.addEventListener("keydown",p=>{var f;p.key==="Escape"&&((f=document.getElementById("search-overlay"))==null||f.classList.add("hidden"))}),document.addEventListener("click",G)}let Xe=!1,oe=[],tt=[],xe=[],ve=null,se=null;async function $t(){var a;if(Xe)return;Xe=!0;const[{data:e},{data:t}]=await Promise.all([v.from("crm_pipelines").select("*").order("sort_order"),v.from("crm_stages").select("*").order("sort_order")]);oe=e||[],tt=t||[];const n=document.getElementById("funil-pipe-sel");if(n){n.innerHTML=oe.length?oe.map(s=>`<option value="${s.id}">${y(s.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const o=oe.find(s=>s.is_default)||oe[0];o&&(n.value=o.id,ve=o.id),n.addEventListener("change",async()=>{ve=parseInt(n.value,10),await Ve()})}(a=document.getElementById("btn-funil-add-lead"))==null||a.addEventListener("click",()=>openLeadModal()),await Ve()}async function Ve(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=v.from("leads").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id)),ve&&(t=t.eq("pipeline_id",ve));const{data:n}=await t;xe=n||[],at()}function at(){const e=document.getElementById("kanban-board");if(!e)return;const t=tt.filter(a=>a.pipeline_id===ve);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n={};t.forEach(a=>{n[a.name]=[]}),xe.forEach(a=>{var s,l,d,i;const o=a.stage||((s=t[0])==null?void 0:s.name);n[o]||(n[((l=t[0])==null?void 0:l.name)||""]=[]),(i=n[o]||n[(d=t[0])==null?void 0:d.name])==null||i.push(a)}),e.innerHTML=t.map(a=>{const o=n[a.name]||[],s=o.length?o.map(l=>`
        <div class="kanban-card" draggable="true" data-id="${l.id}" data-stage="${y(a.name)}">
          <div class="kanban-card-name">${y(l.name||"—")}</div>
          ${l.phone?`<div class="kanban-card-info">📞 ${y(l.phone)}</div>`:""}
          ${l.interest?`<div class="kanban-card-info">🏠 ${y(l.interest)}</div>`:""}
          ${l.budget_max?`<div class="kanban-card-info">💰 R$ ${Number(l.budget_max).toLocaleString("pt-BR")}</div>`:""}
          <div class="kanban-card-tags">
            ${l.source?`<span class="kanban-card-tag">${y(l.source)}</span>`:""}
          </div>
        </div>`).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${y(a.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${a.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${a.color||"#2563eb"}"></div>
            ${y(a.name)}
          </div>
          <span class="kanban-col-count">${o.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${y(a.name)}">${s}</div>
        <button class="kanban-add-btn" data-stage="${y(a.name)}">+ Adicionar lead</button>
      </div>`}).join(""),kt(),window.lucide&&lucide.createIcons()}function kt(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>openLeadModal())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=xe.find(a=>String(a.id)===String(t.dataset.id));n&&openLeadModal(n)}),t.addEventListener("dragstart",n=>{se=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!se||!a)return;await v.from("leads").update({stage:a}).eq("id",se);const o=xe.find(s=>String(s.id)===String(se));o&&(o.stage=a),se=null,at()})}))}let M=[],Ge=!1,le="pending";async function _t(){var e;Ge||(Ge=!0,await Ct(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>qt()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),le=t.dataset.filter,ge()})}))}async function Ct(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=v.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}M=n||[],ge()}function ge(){const e=document.getElementById("tarefas-list");if(!e)return;let t=M;if(le==="pending"&&(t=M.filter(n=>n.status!=="done")),le==="done"&&(t=M.filter(n=>n.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${le==="done"?"✅":"📋"}</div>
      <p>${le==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}e.innerHTML=t.map(n=>{const a=n.due_date?new Date(n.due_date+"T00:00:00").toLocaleDateString("pt-BR"):"",o=n.due_date&&n.status!=="done"&&new Date(n.due_date)<new Date;return`
      <div class="tarefa-item${n.status==="done"?" done":""}" data-id="${n.id}">
        <input type="checkbox" class="tarefa-check" data-id="${n.id}" ${n.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${y(n.title)}</div>
          <div class="tarefa-meta">
            ${a?`<span style="${o?"color:#ef4444;":""}">📅 ${a}${o?" (atrasada)":""}</span>`:""}
            ${n.description?`<span>${y(n.description.substring(0,60))}${n.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${n.priority||"medium"}">${n.priority==="high"?"Alta":n.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${n.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(n=>{n.addEventListener("change",async()=>{const a=n.dataset.id,o=n.checked?"done":"pending";await v.from("tasks").update({status:o}).eq("id",a);const s=M.find(l=>String(l.id)===a);s&&(s.status=o),ge()})}),e.querySelectorAll(".tarefa-del-btn").forEach(n=>{n.addEventListener("click",async()=>{confirm("Excluir esta tarefa?")&&(await v.from("tasks").delete().eq("id",n.dataset.id),M=M.filter(a=>String(a.id)!==String(n.dataset.id)),ge())})})}function qt(e=null){var s,l,d;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=document.createElement("div");a.id="tarefa-modal-root",a.className="modal-backdrop",a.innerHTML=`
    <div class="modal" style="max-width:480px;">
      <div class="modal-header">
        <h3>${n?"Editar Tarefa":"Nova Tarefa"}</h3>
        <button class="modal-close" id="tm-close">✕</button>
      </div>
      <div class="modal-body">
        <form id="tarefa-form" style="display:flex;flex-direction:column;gap:14px;">
          <div class="form-group">
            <label class="form-label">Título *</label>
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${y((e==null?void 0:e.title)||"")}">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prazo</label>
              <input name="due_date" type="date" class="form-control" value="${(e==null?void 0:e.due_date)||""}">
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
            <textarea name="description" class="form-control" rows="2" placeholder="Detalhes…">${y((e==null?void 0:e.description)||"")}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="tm-cancel">Cancelar</button>
        <button class="btn-primary" id="tm-save" style="margin:0;">${n?"Salvar":"Criar Tarefa"}</button>
      </div>
    </div>
  `,document.body.appendChild(a);const o=()=>a.remove();(s=document.getElementById("tm-close"))==null||s.addEventListener("click",o),(l=document.getElementById("tm-cancel"))==null||l.addEventListener("click",o),a.addEventListener("click",i=>{i.target===a&&o()}),(d=document.getElementById("tm-save"))==null||d.addEventListener("click",async()=>{var b,p;const i=document.getElementById("tarefa-form");if(!i.checkValidity()){i.reportValidity();return}const c=new FormData(i),m=document.getElementById("tm-save");m.disabled=!0,m.textContent="Salvando…";const u={title:(b=c.get("title"))==null?void 0:b.trim(),description:((p=c.get("description"))==null?void 0:p.trim())||null,due_date:c.get("due_date")||null,priority:c.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null};let r;if(n){if({error:r}=await v.from("tasks").update(u).eq("id",e.id),!r){const f=M.findIndex(w=>String(w.id)===String(e.id));f>=0&&(M[f]={...M[f],...u})}}else{const{data:f,error:w}=await v.from("tasks").insert(u).select();r=w,!r&&(f!=null&&f[0])&&M.unshift(f[0])}if(m.disabled=!1,m.textContent=n?"Salvar":"Criar Tarefa",r){alert("Erro: "+r.message);return}o(),ge()})}async function Tt(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;g==null||g.role,g==null||g.tenant_id;const[{data:a},{data:o}]=await Promise.all([v.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),v.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),s=[];a!=null&&a.length&&(s.push('<div class="search-group-label">Imóveis</div>'),s.push(...a.map(l=>`
      <div class="search-result-item" data-type="property" data-id="${l.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${y(l.title||"—")}</div>
          <div class="search-result-sub">${y(l.reference||"")} · ${y(l.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(s.push('<div class="search-group-label">Leads / Contatos</div>'),s.push(...o.map(l=>`
      <div class="search-result-item" data-type="lead" data-id="${l.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${y(l.name||"—")}</div>
          <div class="search-result-sub">${y(l.email||l.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=s.length?s.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(l=>{l.addEventListener("click",()=>{var d;(d=document.getElementById("search-overlay"))==null||d.classList.add("hidden"),l.dataset.type==="lead"?X("contatos"):X("properties")})})}let U=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function At(){var l;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=v.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(d=>!U.includes(String(d.id))),s=document.getElementById("notif-badge");if(s&&(s.textContent=o.length,o.length>0?s.classList.remove("hidden"):s.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(d=>{const i=Nt(d.created_at);return`
      <div class="notif-item${!U.includes(String(d.id))?" unread":""}" data-id="${d.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${y(d.name||"—")}</div>
          <div class="notif-item-sub">${y(d.phone||d.source||"")} · ${i}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(l=document.getElementById("notif-see-all"))==null||l.addEventListener("click",d=>{d.preventDefault(),G(),X("contatos")}),e.querySelectorAll(".notif-item").forEach(d=>{d.addEventListener("click",()=>{U.push(d.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(U)),d.classList.remove("unread"),G(),X("contatos")})})}function Mt(){var e;document.querySelectorAll(".notif-item").forEach(t=>U.push(t.dataset.id)),U=[...new Set(U)],localStorage.setItem("crm_notifs_read",JSON.stringify(U)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function Nt(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function Rt(){let e=v.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);g!=null&&g.tenant_id&&(e=e.eq("tenant_id",g.tenant_id));const{data:t}=await e,a=(t||[]).filter(s=>!U.includes(String(s.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let F=[],A=1;const ie=10;let We=!1;async function Ht(){var t,n,a,o,s,l,d,i,c;document.getElementById("section-contatos")&&(We||(We=!0,await nt(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{A=1,ee()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",m=>{m.key==="Enter"&&(A=1,ee())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>ot()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",Pt),(s=document.getElementById("import-modal-close"))==null||s.addEventListener("click",Te),(l=document.getElementById("import-modal-cancel"))==null||l.addEventListener("click",Te),(d=document.getElementById("download-template"))==null||d.addEventListener("click",m=>{m.preventDefault();const u=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,r=new Blob([u],{type:"text/csv"}),b=document.createElement("a");b.href=URL.createObjectURL(r),b.download="modelo_contatos.csv",b.click()}),(i=document.getElementById("import-csv-file"))==null||i.addEventListener("change",jt),(c=document.getElementById("import-modal-confirm"))==null||c.addEventListener("click",Ut)))}async function nt(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=v.from("leads").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:a}=await t;F=a||[],ee()}function ee(){var d,i,c;const e=(((d=document.getElementById("contato-search"))==null?void 0:d.value)||"").toLowerCase(),t=e?F.filter(m=>(m.name||"").toLowerCase().includes(e)||(m.email||"").toLowerCase().includes(e)||(m.phone||"").toLowerCase().includes(e)):F,n=t.length,a=Math.max(1,Math.ceil(n/ie));A>a&&(A=a);const o=t.slice((A-1)*ie,A*ie),s=document.getElementById("contatos-tbody");if(!s)return;o.length?s.innerHTML=o.map(m=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${m.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${m.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${y(m.name||"—")}</a>
        </td>
        <td>${y(m.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${m.email?y(m.email):"—"}</td>
        <td style="font-size:13px;">${m.phone?y(m.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${y(m.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${m.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):s.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const l=document.getElementById("contatos-pagination");if(l){const m=n===0?0:(A-1)*ie+1,u=Math.min(A*ie,n);l.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${m}–${u}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${A<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${A} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${A>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(i=l.querySelector("#pag-prev"))==null||i.addEventListener("click",()=>{A--,ee()}),(c=l.querySelector("#pag-next"))==null||c.addEventListener("click",()=>{A++,ee()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(m=>{m.addEventListener("click",u=>{u.preventDefault();const r=m.dataset.id,b=F.find(p=>String(p.id)===String(r));b&&ot(b)})})}function ot(e=null){var s,l,d;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=document.createElement("div");a.id="contato-modal-root",a.className="modal-backdrop",a.innerHTML=`
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
              <input name="name" required class="form-control" placeholder="Nome completo" value="${y((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${y((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${y((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${y((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${y((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${y((e==null?void 0:e.city_interest)||"")}">
            </div>
          </div>
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${y((e==null?void 0:e.notes)||"")}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cm-cancel">Cancelar</button>
        <button class="btn-primary" id="cm-save" style="margin:0;">${n?"Salvar":"Criar Contato"}</button>
      </div>
    </div>
  `,document.body.appendChild(a);const o=()=>a.remove();(s=document.getElementById("cm-close"))==null||s.addEventListener("click",o),(l=document.getElementById("cm-cancel"))==null||l.addEventListener("click",o),a.addEventListener("click",i=>{i.target===a&&o()}),(d=document.getElementById("cm-save"))==null||d.addEventListener("click",async()=>{var b,p,f,w,h,E,S;const i=document.getElementById("contato-form");if(!i.checkValidity()){i.reportValidity();return}const c=new FormData(i),m=document.getElementById("cm-save");m.disabled=!0,m.textContent="Salvando…";const u={name:(b=c.get("name"))==null?void 0:b.trim(),company:((p=c.get("company"))==null?void 0:p.trim())||null,email:((f=c.get("email"))==null?void 0:f.trim())||null,phone:((w=c.get("phone"))==null?void 0:w.trim())||null,job_title:((h=c.get("job_title"))==null?void 0:h.trim())||null,city_interest:((E=c.get("city_interest"))==null?void 0:E.trim())||null,notes:((S=c.get("notes"))==null?void 0:S.trim())||null,stage:(e==null?void 0:e.stage)||"novo",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null,source:"manual"};let r;if(n){if({error:r}=await v.from("leads").update(u).eq("id",e.id),!r){const B=F.findIndex(C=>String(C.id)===String(e.id));B>=0&&(F[B]={...F[B],...u})}}else{const{data:B,error:C}=await v.from("leads").insert(u).select();r=C,!r&&(B!=null&&B[0])&&F.unshift(B[0])}if(m.disabled=!1,m.textContent=n?"Salvar":"Criar Contato",r){alert("Erro: "+r.message);return}o(),ee()})}let Z=[];function jt(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{Z=a.target.result.split(`
`).filter(d=>d.trim()).slice(1).map(d=>{const[i,c,m,u,r]=d.split(",").map(b=>b.trim().replace(/^"|"$/g,""));return{name:i,email:c,phone:m,company:u,job_title:r}}).filter(d=>d.name);const s=document.getElementById("import-preview");s&&(s.textContent=`${Z.length} contato(s) encontrados para importar.`);const l=document.getElementById("import-modal-confirm");l&&(l.disabled=Z.length===0)},n.readAsText(t)}async function Ut(){if(!Z.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=Z.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null})),{error:n}=await v.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Te(),await nt(),alert(`${t.length} contato(s) importados com sucesso!`)}function Pt(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),Z=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Te(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const Dt="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function fe(e){return(await fetch(Dt,{method:"POST",headers:{Authorization:`Bearer ${mt}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function Ye(e){var i,c,m,u;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),s=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:r}}=await v.auth.getUser();n.value=(r==null?void 0:r.email)||""}const d=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=d),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),s==null||s.addEventListener("change",r=>{const b=r.target.files[0];if(!b)return;const p=URL.createObjectURL(b);a&&(a.src=p,a.style.display=""),o&&(o.style.display="none")}),(i=document.getElementById("btn-change-password"))==null||i.addEventListener("click",async()=>{var h,E;const r=((h=document.getElementById("change-password-new"))==null?void 0:h.value)||"",b=((E=document.getElementById("change-password-confirm"))==null?void 0:E.value)||"",p=document.getElementById("change-password-msg"),f=document.getElementById("btn-change-password");if(p&&(p.style.display="none"),r.length<6){p&&(p.textContent="Mínimo 6 caracteres.",p.style.display="");return}if(r!==b){p&&(p.textContent="As senhas não coincidem.",p.style.display="");return}f&&(f.disabled=!0,f.textContent="Salvando…");const{error:w}=await v.auth.updateUser({password:r});f&&(f.disabled=!1,f.textContent="Salvar Nova Senha"),w?p&&(p.textContent="Erro: "+w.message,p.style.display=""):(p&&(p.style.color="#16a34a",p.textContent="Senha alterada com sucesso!",p.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var E;const r=t.value.trim();let b=(g==null?void 0:g.avatar_url)||"";const p=s==null?void 0:s.files[0],f=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",p)try{const S=await Le(p,400,.85),B=`avatars/${g.id}-${Date.now()}.jpg`,{error:C}=await v.storage.from("imoveis").upload(B,S,{contentType:"image/jpeg",upsert:!0});if(!C){const{data:{publicUrl:I}}=v.storage.from("imoveis").getPublicUrl(B);b=I}}catch(S){console.error("Avatar upload:",S)}const{error:w}=await v.from("profiles").update({name:r,avatar_url:b}).eq("id",g.id);if(l.disabled=!1,l.textContent=f,w){alert("Erro ao salvar perfil.");return}g={...g,name:r,avatar_url:b},qe(g);const h=document.getElementById("settings-avatar-initial");h&&(h.textContent=((E=r[0])==null?void 0:E.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const r=document.getElementById("settings-corretores-section");r&&(r.style.display=""),await Be(),(c=document.getElementById("btn-invite-corretor"))==null||c.addEventListener("click",async()=>{var E,S;const p=(E=document.getElementById("invite-email"))==null?void 0:E.value.trim(),f=(S=document.getElementById("invite-password"))==null?void 0:S.value.trim(),w=document.getElementById("btn-invite-corretor"),h=document.getElementById("invite-note");if(!p){alert("Informe o e-mail do corretor.");return}if(!f||f.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}w&&(w.disabled=!0,w.textContent="Criando…"),h&&(h.style.display="none");try{const B=await fe({email:p,password:f,tenant_id:(g==null?void 0:g.tenant_id)||null});if(B.success){const C=document.getElementById("invite-email"),I=document.getElementById("invite-password");C&&(C.value=""),I&&(I.value=""),await Be(),h&&(B.email_sent===!1?(h.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${y(p)}<br>
                <strong>Senha:</strong> ${y(f)}`,h.style.color="#0f172a"):(h.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",h.style.color="#16a34a"),h.style.display="")}else alert("Erro: "+(B.error||"Falha desconhecida"))}catch(B){alert("Erro ao criar acesso: "+B.message)}finally{w&&(w.disabled=!1,w.textContent="+ Criar Acesso")}});const b=document.getElementById("settings-locations-section");b&&(b.style.display=""),await de(),(m=document.getElementById("loc-add-city-btn"))==null||m.addEventListener("click",async()=>{const p=document.getElementById("loc-new-city"),f=p==null?void 0:p.value.trim();if(!f)return;const{error:w}=await v.from("locations").insert({type:"cidade",name:f});if(w){alert("Erro ao adicionar cidade.");return}p&&(p.value=""),await de(),je()}),(u=document.getElementById("loc-add-neighborhood-btn"))==null||u.addEventListener("click",async()=>{var E;const p=parseInt((E=document.getElementById("loc-new-neighborhood-city"))==null?void 0:E.value,10),f=document.getElementById("loc-new-neighborhood"),w=f==null?void 0:f.value.trim();if(!p||!w){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:h}=await v.from("locations").insert({type:"bairro",name:w,parent_id:p});if(h){alert("Erro ao adicionar bairro.");return}f&&(f.value=""),await de()})}}async function Be(){const e=document.getElementById("corretores-list");if(!e)return;let t=v.from("profiles").select("*").order("created_at");g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const s=(o.name||"?")[0].toUpperCase(),l=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${y(s)}</div>`,d=o.id===(g==null?void 0:g.id),i=o.active!==!1,c=i?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',m=d?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,u=d?"":i?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,r=d?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${l}
        <div>
          <div class="corretor-name">${y(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${c}
        ${m}
        ${u}
        ${r}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await v.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const s=o.dataset.uid,l=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const d=await fe({action:"toggle",userId:s,active:!l});d.success||alert("Erro: "+(d.error||"Falha desconhecida"))}catch(d){alert("Erro: "+d.message)}await Be()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var d,i;const s=o.dataset.uid,l=((i=(d=o.closest(".corretor-item"))==null?void 0:d.querySelector(".corretor-name"))==null?void 0:i.textContent)||"este corretor";if(confirm(`Excluir "${l}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const c=await fe({action:"delete",userId:s});c.success||alert("Erro ao excluir: "+(c.error||"Falha desconhecida"))}catch(c){alert("Erro: "+c.message)}await Be()}})})}async function st(){const{data:e,error:t}=await v.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(me=e||[],me)}function J(){return me.filter(e=>e.type==="cidade")}function He(e){return me.filter(t=>t.type==="bairro"&&t.parent_id===e)}function je(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=J();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${y(a.name)}</option>`).join(""),t&&(e.value=t)}async function de(){await st();const e=J(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(s=>`
        <div class="loc-item">
          <span class="loc-item-name">${y(s.name)}</span>
          <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=me.filter(s=>s.type==="bairro");n.innerHTML=o.length?o.map(s=>{const l=e.find(d=>d.id===s.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${y(s.name)}</div>
              ${l?`<div class="loc-item-sub">${y(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(s=>`<option value="${s.id}">${y(s.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{const l=s.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:d}=await v.from("locations").delete().eq("id",s.dataset.id);if(d){alert("Erro ao excluir.");return}await de(),je()})}),n.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await v.from("locations").delete().eq("id",s.dataset.id);if(l){alert("Erro ao excluir.");return}await de()})})}function Je(){var n,a,o,s,l,d,i,c,m,u,r,b,p,f,w,h,E,S,B,C;document.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{const x=I.closest(".filter-btns"),L=I.classList.contains("active");x.querySelectorAll(".filter-btn").forEach($=>$.classList.remove("active")),L||I.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var _;const I=(_=document.getElementById("f-city"))==null?void 0:_.value,x=J().find(q=>q.name===I),L=x?He(x.id):[],$=document.getElementById("f-neighborhood");$&&($.innerHTML='<option value="">Todos</option>'+L.map(q=>`<option value="${q.name}">${y(q.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{pe(Re(k))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach($=>{const _=document.getElementById($);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach($=>{const _=document.getElementById($);_&&(_.value="")});const L=document.getElementById("f-neighborhood");L&&(L.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach($=>$.classList.remove("active")),pe(k)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{X(I.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{X(I.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(I=>{I.addEventListener("click",x=>{x.stopPropagation();const L=I.closest(".topnav-dropdown");L==null||L.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach($=>{$!==L&&$.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(I=>I.classList.remove("open"))}),(s=document.getElementById("modal-close"))==null||s.addEventListener("click",be),(l=document.getElementById("modal-cancel"))==null||l.addEventListener("click",be),(d=document.getElementById("property-modal"))==null||d.addEventListener("click",I=>{I.target.id==="property-modal"&&be()}),(i=document.getElementById("btn-new-property"))==null||i.addEventListener("click",()=>{R=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",W="",we([]),Ce("Novo Imóvel")}),(c=document.getElementById("logout-btn"))==null||c.addEventListener("click",async()=>{await v.auth.signOut(),location.reload()}),(m=document.getElementById("view-prev"))==null||m.addEventListener("click",()=>{H=(H-1+O.length)%O.length,Ie()}),(u=document.getElementById("view-next"))==null||u.addEventListener("click",()=>{H=(H+1)%O.length,Ie()}),(r=document.getElementById("view-modal-close"))==null||r.addEventListener("click",ye),(b=document.getElementById("view-modal-close2"))==null||b.addEventListener("click",ye),(p=document.getElementById("view-modal"))==null||p.addEventListener("click",I=>{I.target.id==="view-modal"&&ye()}),(f=document.getElementById("view-modal-share"))==null||f.addEventListener("click",()=>{const I=document.getElementById("share-panel");if(!I)return;const x=I.style.display!=="none";I.style.display=x?"none":"block"}),(w=document.getElementById("share-whatsapp"))==null||w.addEventListener("click",()=>{var $,_;const I=($=document.getElementById("share-link-input"))==null?void 0:$.value;if(!I)return;const x=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",L=encodeURIComponent("Olha esse imóvel que encontrei: "+x+`
`+I);window.open("https://wa.me/?text="+L,"_blank")}),(h=document.getElementById("share-instagram"))==null||h.addEventListener("click",()=>{var x,L;const I=(x=document.getElementById("share-link-input"))==null?void 0:x.value;I&&((L=navigator.clipboard)==null||L.writeText(I),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(E=document.getElementById("share-email"))==null||E.addEventListener("click",()=>{var _,q;const I=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!I)return;const x=((q=document.getElementById("view-modal-title"))==null?void 0:q.textContent)||"Imóvel",L=encodeURIComponent("Imóvel: "+x),$=encodeURIComponent(`Olá! Segue o link do imóvel:

`+I);window.open("mailto:?subject="+L+"&body="+$,"_blank")}),(S=document.getElementById("share-copy"))==null||S.addEventListener("click",()=>{var x;const I=document.getElementById("share-link-input");I&&((x=navigator.clipboard)==null||x.writeText(I.value).then(()=>{const L=document.getElementById("share-copy"),$=L.textContent;L.textContent="✅ Copiado!",setTimeout(()=>{L.textContent=$},2e3)}))}),(B=document.getElementById("view-modal-edit"))==null||B.addEventListener("click",()=>{var P;if((g==null?void 0:g.role)!=="admin")return;const I=document.getElementById("view-modal-title").textContent,x=k.find(N=>N.title===I);if(!x)return;ye(),R=x.id;const L=document.getElementById("property-form"),$=document.getElementById("form-submit-btn");$.textContent="Salvar Alterações",L.querySelector('[name="title"]').value=x.title||"",L.querySelector('[name="rua"]').value=x.rua||"",L.querySelector('[name="numero"]').value=x.numero||"",L.querySelector('[name="city"]').value=x.city||"",L.querySelector('[name="price"]').value=x.price||"",L.querySelector('[name="bedrooms"]').value=x.bedrooms||"",L.querySelector('[name="suites"]').value=x.suites||"",L.querySelector('[name="parking"]').value=x.parking||"",L.querySelector('[name="description"]').value=x.description||"",L.querySelector('[name="construction_status"]').value=x.construction_status||"",L.querySelector('[name="owner_name"]').value=x.owner_name||"",L.querySelector('[name="owner_phone"]').value=x.owner_phone||"",L.querySelector('[name="owner_email"]').value=x.owner_email||"",L.querySelector('[name="owner_notes"]').value=x.owner_notes||"",L.querySelector('[name="condominium"]').value=x.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=x.published===!0?"true":"false");const q=document.getElementById("adminCitySelect");q&&(q.value=x.city||"",q.dispatchEvent(new Event("change")),setTimeout(()=>{const N=document.getElementById("adminNeighborhood");N&&(N.value=x.neighborhood||"")},50)),W=x.cover_image||((P=x.images)==null?void 0:P[0])||"",we(x.images||[]),Ce("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(I=>{I.addEventListener("click",()=>{var x;document.querySelectorAll(".tab-btn").forEach(L=>L.classList.remove("active")),I.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(L=>L.classList.add("hidden")),(x=document.getElementById(`tab-${I.dataset.tab}`))==null||x.classList.remove("hidden")})}),(C=document.getElementById("admin-properties"))==null||C.addEventListener("click",I=>{if(I.target.closest(".action-btns"))return;const x=I.target.closest("tr");if(!x)return;const L=Number(x.dataset.id);if(!L)return;const $=k.find(_=>_.id===L);$&&Lt($)})}document.addEventListener("DOMContentLoaded",async()=>{var s,l,d;await Promise.all([dt(),st()]),K=V("company.whatsapp",K),re=`https://wa.me/${K}`,Ne(),wt(),It();const e=document.getElementById("adminCitySelect"),t=document.getElementById("adminNeighborhood");e&&t&&(je(),e.addEventListener("change",()=>{const i=J().find(m=>m.name===e.value),c=i?He(i.id):[];t.innerHTML='<option value="">Selecione a cidade primeiro</option>'+c.map(m=>`<option value="${m.name}">${y(m.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),a=document.getElementById("admin-root");if(n){const i=new URLSearchParams(window.location.hash.replace("#","")),c=new URLSearchParams(window.location.search),m=i.get("type")||c.get("type")||"",u=et||m==="recovery"||m==="invite"||window.location.hash.includes("access_token")||c.has("code"),r=document.getElementById("password-reset-overlay");if(u){n.style.display="none",a&&a.classList.add("hidden"),r&&(r.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async p=>{var B,C;p.preventDefault();const f=((B=document.getElementById("new-password"))==null?void 0:B.value)||"",w=((C=document.getElementById("confirm-password"))==null?void 0:C.value)||"",h=document.getElementById("password-reset-msg"),E=p.target.querySelector('button[type="submit"]');if(h&&(h.style.display="none"),f!==w){h&&(h.textContent="As senhas não coincidem.",h.style.display="");return}E&&(E.disabled=!0,E.textContent="Salvando…");const{error:S}=await v.auth.updateUser({password:f});if(S){h&&(h.textContent="Erro: "+S.message,h.style.display=""),E&&(E.disabled=!1,E.textContent="Definir Senha");return}window.location.href=window.location.pathname}),c.has("code")&&await v.auth.exchangeCodeForSession(c.get("code")??"");return}const{data:{session:b}}=await v.auth.getSession();if(b){if(n.classList.add("hidden"),a&&a.classList.remove("hidden"),await Ee(),_e(),Je(),St(),window.lucide&&lucide.createIcons(),g=await Fe(b.user.id),!g){await v.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden");return}if(g.active===!1){await v.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(g.needs_password_reset){n.style.display="none",a&&a.classList.add("hidden");const p=document.getElementById("password-reset-overlay");p&&(p.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async f=>{var C,I;f.preventDefault();const w=((C=document.getElementById("new-password"))==null?void 0:C.value)||"",h=((I=document.getElementById("confirm-password"))==null?void 0:I.value)||"",E=document.getElementById("password-reset-msg"),S=f.target.querySelector('button[type="submit"]');if(E&&(E.style.display="none"),w!==h){E&&(E.textContent="As senhas não coincidem.",E.style.display="");return}if(w.length<6){E&&(E.textContent="Mínimo 6 caracteres.",E.style.display="");return}S&&(S.disabled=!0,S.textContent="Salvando…");const{error:B}=await v.auth.updateUser({password:w});if(B){E&&(E.textContent="Erro: "+B.message,E.style.display=""),S&&(S.disabled=!1,S.textContent="Definir Senha");return}await v.from("profiles").update({needs_password_reset:!1}).eq("id",g.id),window.location.href=window.location.pathname});return}qe(g),ze(g.role),await Ye(g),window.lucide&&lucide.createIcons(),Rt()}else{a&&a.classList.add("hidden"),n.classList.remove("hidden");const p=document.getElementById("login-form");p&&((d=document.getElementById("forgot-password-btn"))==null||d.addEventListener("click",async()=>{var h,E;const f=(E=(h=p.querySelector('input[name="email"]'))==null?void 0:h.value)==null?void 0:E.trim();if(!f){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:w}=await v.auth.resetPasswordForEmail(f,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(w?"Erro: "+w.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),p.addEventListener("submit",async f=>{f.preventDefault();const w=new FormData(p),h=w.get("email"),E=w.get("password");if(await yt(h,E)){n.classList.add("hidden"),a&&a.classList.remove("hidden"),await Ee(),_e(),Je(),window.lucide&&lucide.createIcons();const{data:{session:B}}=await v.auth.getSession();if(g=B?await Fe(B.user.id):null,!g){await v.auth.signOut();return}if(g.active===!1){await v.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}qe(g),ze(g.role),await Ye(g),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else _e();await ue();const o=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();rt(o),ct(K)});async function Ot(){const e=k.filter(o=>!o.reference);if(!e.length)return;const t=k.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,s)=>o.id-s.id);for(const o of a){const s="IO-"+String(n).padStart(4,"0"),{error:l}=await v.from("properties").update({reference:s}).eq("id",o.id);if(!l){const d=k.findIndex(i=>i.id===o.id);d>=0&&(k[d].reference=s),n++}}pe(Re(k))}async function Ft(){const e=k.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(s=>!s.includes("/wm-")))continue;const a=[];let o=!1;for(const s of t.images)if(s.includes("/wm-"))a.push(s);else try{const l=await zt(s);a.push(l),o=!0}catch{a.push(s)}if(o){await v.from("properties").update({images:a}).eq("id",t.id);const s=k.findIndex(l=>l.id===t.id);s>=0&&(k[s].images=a)}}pe(Re(k))}}async function zt(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),s=o.ok?await o.blob():null,l=s?URL.createObjectURL(s):null;return new Promise(d=>{const i=new Image;i.onload=()=>{URL.revokeObjectURL(a);const c=document.createElement("canvas"),m=1200;let u=i.width,r=i.height;u>m&&(r=Math.round(r*m/u),u=m),c.width=u,c.height=r;const b=c.getContext("2d");b.drawImage(i,0,0,u,r);const p=f=>{if(f){const w=Math.round(u*.18),h=Math.round(f.naturalHeight*w/f.naturalWidth),E=Math.round(u*.02);b.globalAlpha=.45,b.drawImage(f,u-w-E,r-h-E,w,h),b.globalAlpha=1}c.toBlob(async w=>{try{const h=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:E}=await v.storage.from("imoveis").upload(h,w,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(E){console.error("Upload watermark error:",E),d(e);return}const{data:{publicUrl:S}}=v.storage.from("imoveis").getPublicUrl(h);d(S)}catch(h){console.error("Watermark upload exception:",h),d(e)}},"image/jpeg",.82)};if(l){const f=new Image;f.onload=()=>{URL.revokeObjectURL(l),p(f)},f.onerror=()=>{URL.revokeObjectURL(l),p(null)},f.src=l}else p(null)},i.onerror=()=>{URL.revokeObjectURL(a),d(e)},i.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function j(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function Ue(e,t="assets"){const n=await Le(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await v.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:s}}=v.storage.from("imoveis").getPublicUrl(a);return s}async function Xt(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await v.from("settings").select("key,value"),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>y(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const s=o.target.files[0];if(s)try{const l=await Ue(s,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const s=await Q([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);s&&Ne(),o.disabled=!1,o.textContent="Salvar Identidade",j(document.getElementById("co-identity-msg"),s)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const s=document.getElementById("co-whatsapp").value.trim(),l=await Q([["company.whatsapp",s],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&s&&(K=s,re=`https://wa.me/${s}`),o.disabled=!1,o.textContent="Salvar Contatos",j(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const s=await Q([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",j(document.getElementById("co-social-msg"),s)})}async function Vt(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await v.from("settings").select("key,value"),n={};t==null||t.forEach(m=>{n[m.key]=m.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",s=n["visual.secondary_bg"]||"#1a2f4a",l=n["visual.hero_bg_url"]||"",d=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${y(l)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <div id="vis-hero-preview" style="margin-top:10px;display:${l?"":"none"}">
          <img src="${y(l)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function i(m,u,r){const b=document.getElementById(m),p=document.getElementById(u);b==null||b.addEventListener("input",f=>{p.value=f.target.value,r()}),p==null||p.addEventListener("input",f=>{/^#[0-9a-fA-F]{6}$/.test(f.target.value)&&(b.value=f.target.value,r())})}function c(){var u,r,b,p;const m=((u=document.getElementById("col-accent-hex"))==null?void 0:u.value)||"#b8962e";(r=document.getElementById("vp-bar"))==null||r.style.setProperty("background",m),(b=document.getElementById("vp-dot"))==null||b.style.setProperty("background",m),(p=document.getElementById("vp-btn"))==null||p.style.setProperty("background",m),document.documentElement.style.setProperty("--accent",m)}i("col-accent","col-accent-hex",c),i("col-primary","col-primary-hex",()=>{}),i("col-secondary","col-secondary-hex",()=>{}),c(),document.getElementById("vis-hero-file").addEventListener("change",async m=>{const u=m.target.files[0];if(u)try{const r=await Ue(u,"hero");document.getElementById("vis-hero-url").value=r;const b=document.getElementById("vis-hero-preview");b.innerHTML=`<img src="${r}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,b.style.display=""}catch(r){alert("Erro no upload: "+r.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const m=document.getElementById("visual-save-colors");m.disabled=!0,m.textContent="Salvando…";const u=await Q([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);u&&Ne(),m.disabled=!1,m.textContent="Salvar Cores",j(document.getElementById("visual-colors-msg"),u)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",c())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const m=document.getElementById("visual-save-images");m.disabled=!0,m.textContent="Salvando…";const u=await Q([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);m.disabled=!1,m.textContent="Salvar Imagens",j(document.getElementById("visual-images-msg"),u)})}async function Gt(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await v.from("site_content").select("*"),n={};t==null||t.forEach(i=>{n[i.key]=i});const a=(i,c)=>{var m;return y(((m=n[i])==null?void 0:m[`value_${c}`])||"")},o=["pt","en","es"],s={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=i=>o.map(c=>`<button class="content-tab${c===i?" active":""}" data-lang="${c}">${s[c]}</button>`).join(""),d=i=>`
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
  `,document.getElementById("sc-tabs").addEventListener("click",i=>{var m;const c=i.target.closest(".content-tab");c&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(u=>u.classList.remove("active")),c.classList.add("active"),(m=document.querySelector(`#sc-panels [data-panel="${c.dataset.lang}"]`))==null||m.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const i=document.getElementById("sc-save-btn");i.disabled=!0,i.textContent="Salvando…";const c={};document.querySelectorAll(".sc-field").forEach(u=>{const r=u.dataset.key,b=u.dataset.lang;c[r]||(c[r]={}),c[r][b]=u.value});let m=!0;for(const[u,r]of Object.entries(c))await $e(u,{pt:r.pt,en:r.en,es:r.es})||(m=!1);i.disabled=!1,i.textContent="Salvar Conteúdo",j(document.getElementById("sc-save-msg"),m)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const i=document.getElementById("seo-save-btn");i.disabled=!0,i.textContent="Salvando…";const c=document.getElementById("seo-title").value.trim(),m=document.getElementById("seo-desc").value.trim(),u=await $e("seo.title_pt",{pt:c,en:c,es:c})&&await $e("seo.description_pt",{pt:m,en:m,es:m});i.disabled=!1,i.textContent="Salvar SEO",j(document.getElementById("seo-save-msg"),u)})}async function Wt(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await D())}async function D(){const e=document.getElementById("crm-body");if(!e)return;const[{data:t},{data:n},{data:a},{data:o}]=await Promise.all([v.from("crm_pipelines").select("*").order("sort_order"),v.from("crm_stages").select("*").order("sort_order"),v.from("crm_tags").select("*").order("name"),v.from("crm_lead_statuses").select("*").order("sort_order")]),s=t||[],l=s.find(r=>r.is_default)||s[0],d=s.map(r=>`<option value="${r.id}"${r.id===(l==null?void 0:l.id)?" selected":""}>${y(r.name)}</option>`).join(""),c=(n||[]).filter(r=>r.pipeline_id===(l==null?void 0:l.id)).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${y(r.name)}</span>
      <input type="color" value="${r.color}" data-sid="${r.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${r.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',m=(a||[]).map(r=>`<span class="tag-chip" style="background:${r.color}" data-id="${r.id}">
      ${y(r.name)}
      <button class="tag-chip-del" data-id="${r.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',u=(o||[]).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${y(r.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${r.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${r.id}" title="Remover">🗑️</button>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const r=document.getElementById("crm-new-stage").value.trim(),b=document.getElementById("crm-new-stage-color").value,p=parseInt(document.getElementById("crm-pipe-sel").value,10);r&&(await v.from("crm_stages").insert({pipeline_id:p,name:r,color:b,sort_order:99}),document.getElementById("crm-new-stage").value="",await D())}),e.querySelectorAll(".stage-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await v.from("crm_stages").delete().eq("id",r.dataset.id),await D())})}),e.querySelectorAll(".stage-color-pick").forEach(r=>{r.addEventListener("change",async b=>{await v.from("crm_stages").update({color:b.target.value}).eq("id",r.dataset.sid);const p=r.closest(".stage-item").querySelector(".stage-color-dot");p&&(p.style.background=b.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const r=document.getElementById("crm-new-tag").value.trim(),b=document.getElementById("crm-new-tag-color").value;r&&(await v.from("crm_tags").insert({name:r,color:b}),document.getElementById("crm-new-tag").value="",await D())}),e.querySelectorAll(".tag-chip-del").forEach(r=>{r.addEventListener("click",async()=>{await v.from("crm_tags").delete().eq("id",r.dataset.id),await D()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const r=document.getElementById("crm-new-status").value.trim(),b=document.getElementById("crm-new-status-color").value,p=document.getElementById("crm-new-status-final").checked;r&&(await v.from("crm_lead_statuses").insert({name:r,color:b,is_final:p,sort_order:99}),document.getElementById("crm-new-status").value="",await D())}),e.querySelectorAll(".status-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover este status?")&&(await v.from("crm_lead_statuses").delete().eq("id",r.dataset.id),await D())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var b;const r=(b=prompt("Nome do novo funil:"))==null?void 0:b.trim();r&&(await v.from("crm_pipelines").insert({name:r,sort_order:99}),await D())})}async function Yt(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await v.from("integrations").select("*"),n={};t==null||t.forEach(d=>{n[d.key]=d});const a=d=>{var i;return y(((i=n[d])==null?void 0:i.value)||"")},o=d=>{var i;return(i=n[d])!=null&&i.enabled?"checked":""},s=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var u;const d=document.getElementById("intg-save-tracking");d.disabled=!0,d.textContent="Salvando…";let i=!0;const c=document.querySelectorAll(".intg-val"),m=document.querySelectorAll(".intg-toggle");for(let r=0;r<c.length;r++){const b=c[r].dataset.key,p=c[r].value.trim(),f=((u=m[r])==null?void 0:u.checked)??!1;await ke(b,p,f)||(i=!1)}d.disabled=!1,d.textContent="Salvar Integrações",j(document.getElementById("intg-tracking-msg"),i)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const d=document.getElementById("intg-save-smtp");d.disabled=!0,d.textContent="Salvando…";const i=document.querySelectorAll(".smtp-field");let c=!0;for(const u of i)await ke(u.dataset.key,u.value.trim(),!0)||(c=!1);const m=document.getElementById("smtp-pass").value;m&&(await ke("smtp_pass",m,!0)||(c=!1)),d.disabled=!1,d.textContent="Salvar SMTP",j(document.getElementById("intg-smtp-msg"),c)})}async function Jt(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Ae(),document.getElementById("media-file-input").addEventListener("change",async n=>{var i,c;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),s=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");o.style.display="";let d=0;for(const m of a){l.textContent=`Enviando ${d+1}/${a.length}…`,s.style.width=`${Math.round(d/a.length*100)}%`;try{const u=await Ue(m,"media"),r=m.name.replace(/\.[^.]+$/,"").slice(0,60);await v.from("media_library").insert({name:r,url:u,type:"image",size:m.size,created_by:(c=(i=(await v.auth.getUser()).data)==null?void 0:i.user)==null?void 0:c.id})}catch(u){console.error("Media upload error:",u)}d++}s.style.width="100%",l.textContent=`✓ ${d} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",s.style.width="0"},2e3),await Ae(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Ae(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await v.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${y(a.url)}">
      <img src="${y(a.url)}" alt="${y(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${y(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${y(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var s;o.stopPropagation(),(s=navigator.clipboard)==null||s.writeText(a.dataset.url).then(()=>{const l=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await v.from("media_library").delete().eq("id",a.dataset.id),await Ae())})})}async function Kt(){var t,n,a,o,s;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(i=>i.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(i=>i.classList.add("hidden")),l.classList.add("active");const d=e.querySelector(`#sa-panel-${l.dataset.tab}`);d&&d.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&z(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&Qt(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&Ke(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&Qe(),l.dataset.tab==="platform"&&Ze()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",Ke),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",z),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",Qe),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>ta()),(s=e.querySelector("#sa-plat-save"))==null||s.addEventListener("click",Zt),z(),Ze())}async function z(){var d,i;const e=document.getElementById("sa-tenants-list"),t=((i=(d=document.getElementById("sa-tenant-search"))==null?void 0:d.value)==null?void 0:i.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=v.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const s=(a||[]).filter(c=>{var m,u;return!t||((m=c.name)==null?void 0:m.toLowerCase().includes(t))||((u=c.slug)==null?void 0:u.toLowerCase().includes(t))});if(!s.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const l=c=>c.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=s.map(c=>{var m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        ${c.logo_url?`<img class="sa-tenant-logo" src="${y(c.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${y(c.name||"—")}</div>
          <div class="sa-list-sub">${y(c.slug||"")} · ${y(((m=c.plans)==null?void 0:m.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${l(c)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${c.id}" data-active="${c.active}" title="${c.active?"Desativar":"Ativar"}">${c.active?"⏸️":"▶️"}</button>
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${c.id}" title="Editar">✏️</button>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(c=>{c.addEventListener("click",async()=>{const m=c.dataset.active==="true";await v.from("tenants").update({active:!m}).eq("id",c.dataset.id),z()})}),e.querySelectorAll('[data-action="edit-tenant"]').forEach(c=>{c.addEventListener("click",()=>{const m=(s||[]).find(u=>String(u.id)===String(c.dataset.id));m&&aa(m)})})}async function Qt(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await v.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${y(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function Ke(){var d;const e=document.getElementById("sa-subs-list"),t=((d=document.getElementById("sa-sub-filter"))==null?void 0:d.value)||"";if(!e)return;e.dataset.loaded="1";let n=v.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const s={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},l={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(i=>{var c,m,u;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${y(((c=i.tenants)==null?void 0:c.name)||"—")}</div>
          <div class="sa-list-sub">${y(((m=i.plans)==null?void 0:m.name)||"—")} · R$ ${Number(((u=i.plans)==null?void 0:u.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${s[i.status]||"gray"}">${l[i.status]||i.status}</span>
        <span class="sa-list-date">${i.current_period_end?new Date(i.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function Qe(){var l,d;const e=document.getElementById("sa-users-list"),t=((d=(l=document.getElementById("sa-user-search"))==null?void 0:l.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await v.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(i=>{var c,m;return!t||((c=i.name)==null?void 0:c.toLowerCase().includes(t))||((m=i.email)==null?void 0:m.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const s={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(i=>{var c;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(i.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${y(i.name||"—")}</div>
          <div class="sa-list-sub">${y(((c=i.tenants)==null?void 0:c.name)||"Sem imobiliária")} · ${s[i.role]||i.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${i.active!==!1?"sa-badge-green":"sa-badge-red"}">${i.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function Ze(){const[e,t,n,a]=await Promise.all([v.from("tenants").select("id",{count:"exact",head:!0}),v.from("profiles").select("id",{count:"exact",head:!0}),v.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),v.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(s,l)=>{const d=document.getElementById(s);d&&(d.textContent=l??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function Zt(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await Q([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),j(t,!0)}function ea(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ta(){var a,o,s,l,d,i;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),v.from("plans").select("id, name").then(({data:c})=>{const m=document.getElementById("nt-plan");m&&c&&(m.innerHTML='<option value="">Sem plano</option>'+c.map(u=>`<option value="${u.id}">${y(u.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",c=>{const m=document.getElementById("nt-slug");m&&!m.dataset.manual&&(m.value=ea(c.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",c=>{c.target.dataset.manual="1"}),(s=document.getElementById("nt-pwd-toggle"))==null||s.addEventListener("click",()=>{const c=document.getElementById("nt-admin-password");c.type=c.type==="password"?"text":"password"});const n=()=>t.remove();(l=document.getElementById("sa-modal-close-btn"))==null||l.addEventListener("click",n),(d=document.getElementById("nt-cancel"))==null||d.addEventListener("click",n),t.addEventListener("click",c=>{c.target===t&&n()}),(i=document.getElementById("nt-save"))==null||i.addEventListener("click",async()=>{var C,I,x,L,$,_,q,P,N,te,ae,ne;const c=(I=(C=document.getElementById("nt-name"))==null?void 0:C.value)==null?void 0:I.trim(),m=(L=(x=document.getElementById("nt-slug"))==null?void 0:x.value)==null?void 0:L.trim(),u=(_=($=document.getElementById("nt-domain"))==null?void 0:$.value)==null?void 0:_.trim(),r=(q=document.getElementById("nt-plan"))==null?void 0:q.value,b=(N=(P=document.getElementById("nt-admin-email"))==null?void 0:P.value)==null?void 0:N.trim(),p=(ae=(te=document.getElementById("nt-admin-password"))==null?void 0:te.value)==null?void 0:ae.trim(),f=document.getElementById("nt-msg"),w=document.getElementById("nt-save");if(!c||!m){f.textContent="❌ Nome e slug são obrigatórios.",f.style.color="#ef4444";return}if(!b){f.textContent="❌ Informe o e-mail do admin.",f.style.color="#ef4444";return}if(!p||p.length<6){f.textContent="❌ A senha precisa ter mínimo 6 caracteres.",f.style.color="#ef4444";return}w.disabled=!0,w.textContent="Criando…",f.textContent="⏳ Criando imobiliária…",f.style.color="#64748b";const{data:h,error:E}=await v.from("tenants").insert({name:c,slug:m,domain:u||null,plan_id:r||null,active:!0}).select();if(E){w.disabled=!1,w.textContent="Criar Imobiliária",f.textContent="❌ "+E.message,f.style.color="#ef4444";return}const S=(ne=h==null?void 0:h[0])==null?void 0:ne.id;f.textContent="⏳ Criando usuário admin…";const B=await fe({email:b,password:p,role:"admin",tenant_id:S});if(!(B!=null&&B.success)){w.disabled=!1,w.textContent="Criar Imobiliária",f.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+y((B==null?void 0:B.error)||"Desconhecido"),f.style.color="#f59e0b",setTimeout(()=>{n(),z()},3e3);return}S&&(B!=null&&B.user_id)&&await v.from("profiles").update({role:"admin",tenant_id:S}).eq("id",B.user_id),w.disabled=!1,w.textContent="Criar Imobiliária",B.email_sent===!1?(f.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${y(B.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${y(b)}</strong><br>
          Senha: <strong>${y(p)}</strong>
        </div>`,f.style.color="#0f172a"):(f.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",f.style.color="#22c55e",setTimeout(()=>{n(),z()},1500))})}function aa(e){var o,s,l,d,i,c,m;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop",n.innerHTML=`
    <div class="sa-modal" style="max-width:560px;">
      <div class="sa-modal-header">
        <h3>Editar Imobiliária</h3>
        <button class="sa-modal-close" id="et-close">✕</button>
      </div>
      <div class="sa-modal-body">

        <!-- Logo upload -->
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
          <div id="et-logo-preview" style="width:72px;height:72px;border-radius:12px;border:2px dashed #e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#f8fafc;flex-shrink:0;cursor:pointer;" title="Clique para alterar a logo">
            ${e.logo_url?`<img src="${y(e.logo_url)}" style="width:100%;height:100%;object-fit:cover;" id="et-logo-img">`:'<span style="font-size:28px;">🏢</span>'}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · recomendado 256×256px</div>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:10px;">Dados da Imobiliária</div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${y(e.name||"")}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${y(e.slug||"")}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${y(e.domain||"")}" placeholder="abc.imobipro.com.br"></div>
        <div class="form-group"><label>Plano</label>
          <select id="et-plan" class="form-input">
            <option value="">Sem plano</option>
          </select>
        </div>

        <div style="height:1px;background:#e2e8f0;margin:16px 0;"></div>
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:10px;">Criar Novo Admin</div>
        <p style="font-size:12px;color:#64748b;margin-bottom:12px;">Opcional: crie um acesso de administrador para esta imobiliária.</p>
        <div class="form-group"><label>E-mail do novo Admin</label><input id="et-admin-email" class="form-input" type="email" placeholder="admin@imobiliaria.com.br"></div>
        <div class="form-group"><label>Senha</label>
          <div style="position:relative;">
            <input id="et-admin-password" class="form-input" type="password" placeholder="Mínimo 6 caracteres" style="padding-right:38px;">
            <button type="button" id="et-pwd-toggle" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#94a3b8;font-size:16px;">👁</button>
          </div>
        </div>

        <div id="et-msg" style="font-size:13px;margin-top:4px;"></div>
      </div>
      <div class="sa-modal-footer">
        <button id="et-delete" class="btn-danger-sm">🗑️ Excluir</button>
        <button id="et-cancel" class="btn-secondary-sm">Cancelar</button>
        <button id="et-save" class="btn-primary-sm">Salvar</button>
      </div>
    </div>
  `,document.body.appendChild(n),v.from("plans").select("id, name").then(({data:u})=>{const r=document.getElementById("et-plan");r&&u&&(r.innerHTML='<option value="">Sem plano</option>'+u.map(b=>`<option value="${b.id}"${String(b.id)===String(e.plan_id)?" selected":""}>${y(b.name)}</option>`).join(""))}),(o=document.getElementById("et-logo-input"))==null||o.addEventListener("change",u=>{const r=u.target.files[0];if(!r)return;const b=URL.createObjectURL(r),p=document.getElementById("et-logo-preview");p&&(p.innerHTML=`<img src="${b}" style="width:100%;height:100%;object-fit:cover;">`)}),(s=document.getElementById("et-logo-preview"))==null||s.addEventListener("click",()=>{var u;(u=document.getElementById("et-logo-input"))==null||u.click()}),(l=document.getElementById("et-pwd-toggle"))==null||l.addEventListener("click",()=>{const u=document.getElementById("et-admin-password");u.type=u.type==="password"?"text":"password"});const a=()=>n.remove();(d=document.getElementById("et-close"))==null||d.addEventListener("click",a),(i=document.getElementById("et-cancel"))==null||i.addEventListener("click",a),n.addEventListener("click",u=>{u.target===n&&a()}),(c=document.getElementById("et-delete"))==null||c.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const r=document.getElementById("et-delete");r.disabled=!0,r.textContent="Excluindo…";const{error:b}=await v.from("tenants").delete().eq("id",e.id);if(b){alert("Erro ao excluir: "+b.message),r.disabled=!1,r.textContent="🗑️ Excluir";return}a(),z()}),(m=document.getElementById("et-save"))==null||m.addEventListener("click",async()=>{var I,x,L,$,_,q,P,N,te,ae,ne,Pe;const u=(x=(I=document.getElementById("et-name"))==null?void 0:I.value)==null?void 0:x.trim(),r=($=(L=document.getElementById("et-slug"))==null?void 0:L.value)==null?void 0:$.trim(),b=(q=(_=document.getElementById("et-domain"))==null?void 0:_.value)==null?void 0:q.trim(),p=(P=document.getElementById("et-plan"))==null?void 0:P.value,f=(te=(N=document.getElementById("et-admin-email"))==null?void 0:N.value)==null?void 0:te.trim(),w=(ne=(ae=document.getElementById("et-admin-password"))==null?void 0:ae.value)==null?void 0:ne.trim(),h=(Pe=document.getElementById("et-logo-input"))==null?void 0:Pe.files[0],E=document.getElementById("et-msg"),S=document.getElementById("et-save");if(!u){E.textContent="❌ Nome é obrigatório.",E.style.color="#ef4444";return}S.disabled=!0,S.textContent="Salvando…",E.textContent="⏳ Salvando…",E.style.color="#64748b";let B=e.logo_url;if(h)try{const T=await Le(h,256,.85),De=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:it}=await v.storage.from("imoveis").upload(De,T,{contentType:"image/jpeg",upsert:!0});if(!it){const{data:{publicUrl:lt}}=v.storage.from("imoveis").getPublicUrl(De);B=lt}}catch(T){console.error("Logo upload:",T)}const{error:C}=await v.from("tenants").update({name:u,slug:r||e.slug,domain:b||null,plan_id:p||null,logo_url:B}).eq("id",e.id);if(C){S.disabled=!1,S.textContent="Salvar",E.textContent="❌ "+C.message,E.style.color="#ef4444";return}if(f&&w&&w.length>=6){E.textContent="⏳ Criando usuário admin…";const T=await fe({email:f,password:w,role:"admin",tenant_id:e.id});T!=null&&T.success?(T!=null&&T.user_id&&await v.from("profiles").update({role:"admin",tenant_id:e.id}).eq("id",T.user_id),E.textContent="✅ Salvo e admin criado!",E.style.color="#22c55e"):(E.textContent="⚠️ Salvo, mas erro ao criar admin: "+((T==null?void 0:T.error)||"Tente novamente"),E.style.color="#f59e0b")}else E.textContent="✅ Imobiliária atualizada!",E.style.color="#22c55e";S.disabled=!1,S.textContent="Salvar",setTimeout(()=>{a(),z()},1200)})}
