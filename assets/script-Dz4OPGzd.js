import{s as f}from"./supabase-BcuJ3xoD.js";const nt="00000000-0000-0000-0000-000000000000";let ue={},$e={},te=nt;function ze(e){te=e||nt,ue={},$e={}}const Re=()=>te;async function vt(){const[e,t]=await Promise.all([f.from("settings").select("key,value").eq("tenant_id",te),f.from("site_content").select("*").eq("tenant_id",te)]);e.data&&e.data.forEach(n=>{ue[n.key]=n.value}),t.data&&t.data.forEach(n=>{$e[n.key]=n})}const V=(e,t=null)=>ue[e]!==void 0?ue[e]:t,_e=(e,t="pt")=>{const n=$e[e];return n?n[`value_${t}`]??n.value_pt??null:null};async function Z(e){const t=new Date().toISOString(),n=e.map(([o,s])=>({key:o,value:s,tenant_id:te,updated_at:t})),{error:a}=await f.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,s])=>{ue[o]=s}),!a}async function Ce(e,{pt:t,en:n,es:a}){const o={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:te,updated_at:new Date().toISOString()},{error:s}=await f.from("site_content").upsert(o,{onConflict:"key,tenant_id"});return s||($e[e]=o),!s}async function Te(e,t,n){const{error:a}=await f.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function He(){const e=document.documentElement,t=V("visual.accent_color","#b8962e"),n=V("visual.primary_bg","#0f1c2e"),a=V("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=V("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(i=>{i.src=o});const s=V("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=s);const d=V("visual.hero_bg_url","");if(d){const i=document.querySelector(".hero");i&&(i.style.backgroundImage=`url('${d}')`)}}function gt(e="pt"){const t=v=>_e(v,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const s=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),d=document.querySelector('[data-i18n="inst.p3"]');s&&t("inst.bio_p1")&&(s.innerHTML=t("inst.bio_p1")),l&&t("inst.bio_p2")&&(l.innerHTML=t("inst.bio_p2")),d&&t("inst.bio_p3")&&(d.innerHTML=t("inst.bio_p3"));const i=document.querySelector('[data-i18n-num="inst.stat2num"]'),c=document.querySelector('[data-i18n="inst.stat1"]'),m=document.querySelector('[data-i18n="inst.stat2"]'),u=document.querySelector('[data-i18n="inst.stat3"]');i&&t("inst.stat2_num")&&(i.innerHTML=t("inst.stat2_num")),c&&t("inst.stat1_label")&&(c.innerHTML=t("inst.stat1_label")),m&&t("inst.stat2_label")&&(m.innerHTML=t("inst.stat2_label")),u&&t("inst.stat3_label")&&(u.innerHTML=t("inst.stat3_label"));const r=_e("seo.title_pt",e);r&&document.title&&(document.title=r);const g=_e("seo.description_pt",e);if(g){const v=document.querySelector('meta[name="description"]');v&&(v.content=g)}}function ft(e){if(!e)return;const t=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const yt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let K="5547999701743",pe=`https://wa.me/${K}`;const W=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],bt=5.7;function ve(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/bt).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let $=[],p=null,ge=[],ot=!1;f.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(ot=!0)});async function ht(){const{data:e,error:t}=await f.from("properties").select("*").eq("published",!0).is("tenant_id",null).order("created_at",{ascending:!1});return t?(console.error("Supabase select error:",t),[]):e||[]}async function Et(){let e=f.from("properties").select("*").order("created_at",{ascending:!1});(p==null?void 0:p.role)==="super_admin"?e=e.is("tenant_id",null):p!=null&&p.tenant_id?e=e.eq("tenant_id",p.tenant_id):p!=null&&p.id&&(e=e.is("tenant_id",null));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):($=t||[],Jt(),Kt(),$)}async function wt(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await f.from("properties").update(a).eq("id",t);if(o)throw o;const s=$.findIndex(l=>l.id===t);s>=0&&($[s]={...$[s],...a})}else{if(!e.reference){const a=$.map(s=>s.reference||"").filter(s=>/^IO-\d+$/.test(s)).map(s=>parseInt(s.replace("IO-",""),10)),o=a.length?Math.max(...a)+1:1;e.reference="IO-"+String(o).padStart(4,"0")}const{data:t,error:n}=await f.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&$.unshift(t[0])}}async function It(e){const{error:t}=await f.from("properties").delete().eq("id",e);if(t)throw t;$=$.filter(n=>n.id!==e)}async function xt(e,t){const{error:n}=await f.auth.signInWithPassword({email:e,password:t});return!n}function he(e,t=1200,n=.78){return new Promise((a,o)=>{const s=new Image,l=URL.createObjectURL(e);s.onload=()=>{URL.revokeObjectURL(l);const d=document.createElement("canvas");let i=s.width,c=s.height;i>t&&(c=Math.round(c*t/i),i=t),d.width=i,d.height=c;const m=d.getContext("2d");m.drawImage(s,0,0,i,c);const u=new Image;u.crossOrigin="anonymous",u.onload=()=>{const r=Math.round(i*.18),g=Math.round(u.naturalHeight*r/u.naturalWidth),v=Math.round(i*.02),E=i-r-v,h=c-g-v;m.globalAlpha=.45,m.drawImage(u,E,h,r,g),m.globalAlpha=1,d.toBlob(y=>y?a(y):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.onerror=()=>{d.toBlob(r=>r?a(r):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.src="/logo.png"},s.onerror=o,s.src=l})}async function Bt(e){const t=await he(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await f.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=f.storage.from("imoveis").getPublicUrl(n);return o}async function Lt(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await Bt(n[o]));return a}async function fe(){var u,r,g,v,E,h;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await ht();$=n,((u=document.getElementById("selecao-carousel"))==null?void 0:u.innerHTML)===""&&St(n);const a=((r=document.getElementById("city-filter"))==null?void 0:r.value)||"",o=((g=document.getElementById("neighborhood-filter"))==null?void 0:g.value)||"",s=((v=document.getElementById("bedrooms-filter"))==null?void 0:v.value)||"",l=((E=document.getElementById("parking-filter"))==null?void 0:E.value)||"",d=((h=document.getElementById("construction-filter"))==null?void 0:h.value)||"",i=document.getElementById("price-slider"),c=i?parseInt(i.value,10):13e7,m=n.filter(y=>{if(a&&y.city!==a||o&&y.neighborhood!==o||s&&(s==="4+"&&Number(y.bedrooms)<4||s!=="4+"&&Number(y.bedrooms)!==Number(s))||l&&(l==="4+"&&Number(y.parking)<4||l!=="4+"&&Number(y.parking)!==Number(l))||d&&y.construction_status!==d)return!1;const w=String(y.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),B=parseInt(w,10)||0;return!(B<0||B>c)});if(e){if(!m.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=m.map(y=>{var x;const w=y.cover_image||((x=y.images)==null?void 0:x[0])||W[0],B=[y.neighborhood,y.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${w}" alt="${b(y.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${b(y.title)}</div>
            <div class="selecao-card-loc">${b(B)}</div>
            <div class="selecao-card-price">${b(ve(y.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${y.id}" class="btn-det">Ver Detalhes</a>
              <a href="${pe}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!m.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=m.map(y=>{var x;const w=(x=y.images)!=null&&x.length?y.images:W,B=w.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${B}" data-idx="0" data-pid="${y.id}">
          <img src="${y.cover_image||w[0]}" alt="${b(y.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${B>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${b(y.title)}</strong>
          <div class="muted">${b(y.neighborhood||"")}, ${b(y.city||"")}</div>
          <div><strong>${b(ve(y.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${y.bedrooms||"--"} | 🚗 ${y.parking||"--"} ${B>1?"| 📸 "+B:""}</div>
          <p class="muted">${b((y.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${y.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${pe}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(y=>{y.removeEventListener("click",Xe),y.addEventListener("click",Xe)})}function St(e){var o,s,l;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(d=>{var m;const i=d.cover_image||((m=d.images)==null?void 0:m[0])||W[0],c=[d.neighborhood,d.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${i}" alt="${b(d.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${b(d.title)}</div>
          <div class="selecao-card-loc">${b(c)}</div>
          <div class="selecao-card-price">${b(ve(d.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${d.id}" class="btn-det">Ver Detalhes</a>
            <a href="${pe}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(s=a==null?void 0:a.querySelector(".selecao-prev"))==null||s.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(l=a==null?void 0:a.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),fe()};function Xe(e){var d;e.stopPropagation();const t=e.currentTarget.closest(".carousel-wrap");if(!t)return;const n=parseInt(t.dataset.total,10);if(!n)return;let a=parseInt(t.dataset.idx,10)||0;const o=e.currentTarget.classList.contains("carousel-next")?1:-1;a=(a+o+n)%n,t.dataset.idx=a;const s=parseInt(t.dataset.pid,10),l=$.find(i=>i.id===s);(d=l==null?void 0:l.images)!=null&&d.length&&(t.querySelector(".carousel-img").src=l.images[a])}function kt(){const e=document.getElementById("price-slider"),t=document.getElementById("price-label");!e||!t||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",t.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);t.textContent="Até R$ "+n.toLocaleString("pt-BR"),fe()}))}function $t(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=J();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${b(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=J().find(s=>s.name===e.value),o=a?Ue(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(s=>`<option value="${s.name}">${b(s.name)}</option>`).join(""),fe()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",fe)})}function ye(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var l;const a=n.cover_image||((l=n.images)==null?void 0:l[0])||W[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",s=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${b(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${b(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+b(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${b(o)}</td>
      <td class="cell-price">${b(ve(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${s}</td>
      <td>
        <div class="action-btns">
          ${(p==null?void 0:p.role)==="admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(p==null?void 0:p.role)==="admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function _t(){const e=document.getElementById("f-city");if(!e)return;const t=J(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${b(a.name)}</option>`).join(""),n&&(e.value=n)}function Ct(){var e,t,n,a,o,s,l,d,i,c,m,u,r,g,v;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((s=document.getElementById("f-condominium"))==null?void 0:s.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((d=document.getElementById("f-price-max"))==null?void 0:d.value)||1/0,areaMin:parseFloat((i=document.getElementById("f-area-min"))==null?void 0:i.value)||0,areaMax:parseFloat((c=document.getElementById("f-area-max"))==null?void 0:c.value)||1/0,construction:((m=document.getElementById("f-construction"))==null?void 0:m.value)||"",published:((u=document.getElementById("f-published"))==null?void 0:u.value)||"",bedrooms:((r=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:r.dataset.val)||"",suites:((g=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:g.dataset.val)||"",parking:((v=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:v.dataset.val)||""}}function je(e){const t=Ct();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const s=parseFloat(a.area)||0;return!(t.areaMin>0&&s<t.areaMin||t.areaMax<1/0&&s>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Ie(){if(!document.getElementById("admin-properties"))return;const e=await Et(),t=e.length,n=e.filter(l=>l.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),s=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),s&&(s.textContent="—"),_t(),ye($)}let R=null,G="";function Ae(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function we(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function xe(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===G?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{G=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function qe(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{n.preventDefault();const a=new FormData(e),o=a.getAll("images");let s=[];const l=o.filter(i=>i.size>0);if(l.length){t.disabled=!0,t.textContent=`Enviando 0/${l.length} foto…`;try{s=await Lt(l,(i,c)=>{t.textContent=`Enviando ${i}/${c} foto…`})}catch(i){console.error("Erro no upload:",i),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(R){const i=$.find(c=>c.id===R);i!=null&&i.images&&(s=i.images)}s.length||(s=[...W]);const d={...R?{id:R}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:s,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:G||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||""};try{await wt(d),R=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const i=document.getElementById("adminPublished");i&&(i.value="true");const c=document.getElementById("adminNeighborhood");c&&(c.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),G="",xe([]),we(),await Ie()}catch(i){console.error(i),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert("Erro ao salvar imóvel. Verifique o console.")}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await It(o),await Ie()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((p==null?void 0:p.role)!=="admin")return;const o=Number(n.target.dataset.id);if(!o)return;const s=$.find(i=>i.id===o);if(!s)return;R=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=s.title||"",e.querySelector('[name="rua"]').value=s.rua||"",e.querySelector('[name="numero"]').value=s.numero||"",e.querySelector('[name="city"]').value=s.city||"",e.querySelector('[name="price"]').value=s.price||"",e.querySelector('[name="bedrooms"]').value=s.bedrooms||"",e.querySelector('[name="suites"]').value=s.suites||"",e.querySelector('[name="area"]').value=s.area||"",e.querySelector('[name="parking"]').value=s.parking||"",e.querySelector('[name="description"]').value=s.description||"",e.querySelector('[name="construction_status"]').value=s.construction_status||"",e.querySelector('[name="owner_name"]').value=s.owner_name||"",e.querySelector('[name="owner_phone"]').value=s.owner_phone||"",e.querySelector('[name="owner_email"]').value=s.owner_email||"",e.querySelector('[name="owner_notes"]').value=s.owner_notes||"",e.querySelector('[name="condominium"]').value=s.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=s.published===!0?"true":"false");const d=document.getElementById("adminCitySelect");d&&(d.value=s.city||"",d.dispatchEvent(new Event("change")),setTimeout(()=>{const i=document.getElementById("adminNeighborhood");i&&(i.value=s.neighborhood||"")},50)),G=s.cover_image||((a=s.images)==null?void 0:a[0])||"",xe(s.images||[]),Ae("Editar Imóvel")}})}function b(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let F=[],H=0;function Tt(e){var m,u;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const t=document.getElementById("view-status-badge");e.published?(t.textContent="● Publicado",t.className="badge badge-green"):(t.textContent="○ Rascunho",t.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const a=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=a,document.getElementById("view-directions-link").href=a;const o=((m=e.images)==null?void 0:m[0])||W[0];document.getElementById("view-thumb-preview").src=o,F=(u=e.images)!=null&&u.length?e.images:W,H=0,Be(),document.getElementById("view-price").textContent=ve(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const s=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),s&&(s.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(r=>r.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(r=>r.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const d="https://omarcorretor.com.br/property.html?id="+e.id,i=document.getElementById("share-link-input");i&&(i.value=d);const c=document.getElementById("share-panel");c&&(c.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Ee(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Be(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=F[H],e.alt=`Foto ${H+1}`;const s=F.length>1;n.style.display=s?"flex":"none",a.style.display=s?"flex":"none",t.textContent=s?`${H+1} / ${F.length}`:"",o.innerHTML=s?F.map((l,d)=>`<img src="${l}" class="view-thumb${d===H?" active":""}" data-i="${d}" alt="Foto ${d+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{H=+l.dataset.i,Be()})})}async function Ve(e){const{data:t}=await f.from("profiles").select("*").eq("id",e).maybeSingle();return t}function Le(e){var u,r;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const s=(e==null?void 0:e.name)||"Sem nome",l=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=s,o&&(o.textContent=l),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((u=s[0])==null?void 0:u.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const d=document.getElementById("avatar-dd-name"),i=document.getElementById("avatar-dd-role"),c=document.getElementById("avatar-dd-img"),m=document.getElementById("avatar-dd-initial");d&&(d.textContent=s),i&&(i.textContent=l),e!=null&&e.avatar_url&&c?(c.src=e.avatar_url,c.style.display="",m&&(m.style.display="none")):(m&&(m.textContent=((r=s[0])==null?void 0:r.toUpperCase())||"?",m.style.display=""),c&&(c.style.display="none"))}function Y(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),U(),e==="contatos"&&Xt(),e==="funil"&&Rt(),e==="tarefas"&&jt()}function Ge(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:Zt,visual:ea,"site-config":ta,"crm-config":aa,integracoes:na,midia:oa}).forEach(([a,o])=>{const s=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);s&&s.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>sa(),{once:!0}),window.lucide&&lucide.createIcons()}}function U(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function qt(){var a,o,s;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",l=>{l.target===t&&n()}),(s=document.getElementById("cp-save"))==null||s.addEventListener("click",async()=>{var u,r;const l=((u=document.getElementById("cp-new"))==null?void 0:u.value)||"",d=((r=document.getElementById("cp-confirm"))==null?void 0:r.value)||"",i=document.getElementById("cp-msg"),c=document.getElementById("cp-save");if(i.style.display="none",l.length<6){i.style.color="#ef4444",i.textContent="Mínimo 6 caracteres.",i.style.display="";return}if(l!==d){i.style.color="#ef4444",i.textContent="As senhas não coincidem.",i.style.display="";return}c.disabled=!0,c.textContent="Salvando…";const{error:m}=await f.auth.updateUser({password:l});if(c.disabled=!1,c.textContent="Salvar Senha",m){i.style.color="#ef4444",i.textContent="Erro: "+m.message,i.style.display="";return}i.style.color="#16a34a",i.textContent="✅ Senha alterada com sucesso!",i.style.display="",setTimeout(n,1500)})}function At(){var s,l,d,i,c;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((s=document.getElementById("topnav-avatar-img"))==null?void 0:s.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(l=document.getElementById("cph-close"))==null||l.addEventListener("click",o),(d=document.getElementById("cph-cancel"))==null||d.addEventListener("click",o),t.addEventListener("click",m=>{m.target===t&&o()}),(i=document.getElementById("cph-file"))==null||i.addEventListener("change",m=>{const u=m.target.files[0];if(!u)return;const r=URL.createObjectURL(u),g=document.getElementById("cph-preview"),v=document.getElementById("cph-initial");g&&(g.src=r,g.style.display=""),v&&(v.style.display="none"),document.getElementById("cph-save").disabled=!1}),(c=document.getElementById("cph-save"))==null||c.addEventListener("click",async()=>{var g;const m=(g=document.getElementById("cph-file"))==null?void 0:g.files[0];if(!m)return;const u=document.getElementById("cph-save"),r=document.getElementById("cph-msg");u.disabled=!0,u.textContent="Salvando…";try{const v=await he(m,400,.85),E=`avatars/${p.id}-${Date.now()}.jpg`,{error:h}=await f.storage.from("imoveis").upload(E,v,{contentType:"image/jpeg",upsert:!0});if(h)throw h;const{data:{publicUrl:y}}=f.storage.from("imoveis").getPublicUrl(E);await f.from("profiles").update({avatar_url:y}).eq("id",p.id),p={...p,avatar_url:y},Le(p),o()}catch(v){r.style.color="#ef4444",r.textContent="Erro: "+v.message,r.style.display="",u.disabled=!1,u.textContent="Salvar Foto"}})}function Mt(){var a,o,s;const e=document.getElementById("add-corretor-modal-root");e&&e.remove();const t=document.createElement("div");t.id="add-corretor-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("ac-close"))==null||a.addEventListener("click",n),(o=document.getElementById("ac-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",l=>{l.target===t&&n()}),(s=document.getElementById("ac-save"))==null||s.addEventListener("click",async()=>{var m,u;const l=(m=document.getElementById("ac-email"))==null?void 0:m.value.trim(),d=(u=document.getElementById("ac-password"))==null?void 0:u.value.trim(),i=document.getElementById("ac-save"),c=document.getElementById("ac-note");if(!l){alert("Informe o e-mail do corretor.");return}if(!d||d.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}i.disabled=!0,i.textContent="Criando…",c.style.display="none";try{const r=await oe({email:l,password:d,tenant_id:(p==null?void 0:p.tenant_id)||null});i.disabled=!1,i.textContent="+ Criar Acesso",r.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",r.email_sent===!1?(c.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${b(l)}<br><strong>Senha:</strong> ${b(d)}`,c.style.color="#0f172a"):(c.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",c.style.color="#16a34a"),c.style.display=""):alert("Erro: "+(r.error||"Falha desconhecida"))}catch(r){i.disabled=!1,i.textContent="+ Criar Acesso",alert("Erro: "+r.message)}})}function Nt(){var s,l,d,i,c,m,u,r,g,v,E;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",h=>{var w;h.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(w=document.getElementById("notif-dropdown"))==null||w.classList.add("hidden")}),(s=document.getElementById("avatar-dd-change-photo"))==null||s.addEventListener("click",h=>{h.stopPropagation(),U(),At()}),(l=document.getElementById("avatar-dd-change-pass"))==null||l.addEventListener("click",h=>{h.stopPropagation(),U(),qt()}),(d=document.getElementById("avatar-dd-add-corretor"))==null||d.addEventListener("click",h=>{h.stopPropagation(),U(),Mt()}),(i=document.getElementById("avatar-dd-settings"))==null||i.addEventListener("click",h=>{h.stopPropagation(),U(),Y("settings")}),(c=document.getElementById("avatar-dd-logout"))==null||c.addEventListener("click",async h=>{h.stopPropagation(),await f.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",h=>{var w;h.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((w=document.getElementById("avatar-dropdown"))==null||w.classList.add("hidden"),Ot())}),(m=document.getElementById("notif-mark-all"))==null||m.addEventListener("click",()=>{Pt(),U()}),(u=document.getElementById("btn-search-open"))==null||u.addEventListener("click",()=>{var h,y;(h=document.getElementById("search-overlay"))==null||h.classList.remove("hidden"),(y=document.getElementById("search-input"))==null||y.focus()}),(r=document.getElementById("search-overlay-close"))==null||r.addEventListener("click",()=>{var h;(h=document.getElementById("search-overlay"))==null||h.classList.add("hidden")}),(g=document.getElementById("search-overlay"))==null||g.addEventListener("click",h=>{h.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(v=document.getElementById("search-input"))==null||v.addEventListener("input",h=>{clearTimeout(o),o=setTimeout(()=>Dt(h.target.value.trim()),280)}),(E=document.getElementById("search-input"))==null||E.addEventListener("keydown",h=>{var y;h.key==="Escape"&&((y=document.getElementById("search-overlay"))==null||y.classList.add("hidden"))}),document.addEventListener("click",U)}let We=!1,de=[],st=[],Se=[],be=null,re=null;async function Rt(){var a;if(We)return;We=!0;const[{data:e},{data:t}]=await Promise.all([f.from("crm_pipelines").select("*").order("sort_order"),f.from("crm_stages").select("*").order("sort_order")]);de=e||[],st=t||[];const n=document.getElementById("funil-pipe-sel");if(n){n.innerHTML=de.length?de.map(s=>`<option value="${s.id}">${b(s.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const o=de.find(s=>s.is_default)||de[0];o&&(n.value=o.id,be=o.id),n.addEventListener("change",async()=>{be=parseInt(n.value,10),await Ye()})}(a=document.getElementById("btn-funil-add-lead"))==null||a.addEventListener("click",()=>openLeadModal()),await Ye()}async function Ye(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=f.from("leads").select("*").order("created_at",{ascending:!1});(p==null?void 0:p.role)==="corretor"?t=t.eq("assigned_to",p.id):p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id)),be&&(t=t.eq("pipeline_id",be));const{data:n}=await t;Se=n||[],it()}function it(){const e=document.getElementById("kanban-board");if(!e)return;const t=st.filter(a=>a.pipeline_id===be);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n={};t.forEach(a=>{n[a.name]=[]}),Se.forEach(a=>{var s,l,d,i;const o=a.stage||((s=t[0])==null?void 0:s.name);n[o]||(n[((l=t[0])==null?void 0:l.name)||""]=[]),(i=n[o]||n[(d=t[0])==null?void 0:d.name])==null||i.push(a)}),e.innerHTML=t.map(a=>{const o=n[a.name]||[],s=o.length?o.map(l=>`
        <div class="kanban-card" draggable="true" data-id="${l.id}" data-stage="${b(a.name)}">
          <div class="kanban-card-name">${b(l.name||"—")}</div>
          ${l.phone?`<div class="kanban-card-info">📞 ${b(l.phone)}</div>`:""}
          ${l.interest?`<div class="kanban-card-info">🏠 ${b(l.interest)}</div>`:""}
          ${l.budget_max?`<div class="kanban-card-info">💰 R$ ${Number(l.budget_max).toLocaleString("pt-BR")}</div>`:""}
          <div class="kanban-card-tags">
            ${l.source?`<span class="kanban-card-tag">${b(l.source)}</span>`:""}
          </div>
        </div>`).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${b(a.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${a.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${a.color||"#2563eb"}"></div>
            ${b(a.name)}
          </div>
          <span class="kanban-col-count">${o.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${b(a.name)}">${s}</div>
        <button class="kanban-add-btn" data-stage="${b(a.name)}">+ Adicionar lead</button>
      </div>`}).join(""),Ht(),window.lucide&&lucide.createIcons()}function Ht(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>openLeadModal())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=Se.find(a=>String(a.id)===String(t.dataset.id));n&&openLeadModal(n)}),t.addEventListener("dragstart",n=>{re=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!re||!a)return;await f.from("leads").update({stage:a}).eq("id",re);const o=Se.find(s=>String(s.id)===String(re));o&&(o.stage=a),re=null,it()})}))}let M=[],Je=!1,Q="pending";async function jt(){var e;Je||(Je=!0,await Ut(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>dt()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),Q=t.dataset.filter,ae()})}))}async function Ut(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=f.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(p==null?void 0:p.role)==="corretor"?t=t.eq("assigned_to",p.id):p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}M=n||[],ae()}function lt(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function ae(){const e=document.getElementById("tarefas-list");if(!e)return;let t=M;if(Q==="pending"&&(t=M.filter(a=>a.status!=="done")),Q==="done"&&(t=M.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${Q==="done"?"✅":"📋"}</div>
      <p>${Q==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=lt(a.due_date),s=o?o.toLocaleDateString("pt-BR"):"",l=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${b(a.title)}</div>
          <div class="tarefa-meta">
            ${s?`<span style="${l?"color:#ef4444;":""}">📅 ${s}${l?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${b(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const s=a.dataset.id,l=a.checked?"done":"pending";await f.from("tasks").update({status:l}).eq("id",s);const d=M.find(i=>String(i.id)===s);d&&(d.status=l),ae()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await f.from("tasks").delete().eq("id",a.dataset.id),M=M.filter(s=>String(s.id)!==String(a.dataset.id)),ae())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const s=a.dataset.id,l=M.find(d=>String(d.id)===s);l&&dt(l)})})}function dt(e=null){var i,c,m,u;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=lt(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const s=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",l=document.createElement("div");l.id="tarefa-modal-root",l.className="modal-backdrop",l.innerHTML=`
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
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${b((e==null?void 0:e.title)||"")}">
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
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${b((e==null?void 0:e.description)||"")}</textarea>
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
  `,document.body.appendChild(l);const d=()=>l.remove();(i=document.getElementById("tm-close"))==null||i.addEventListener("click",d),(c=document.getElementById("tm-cancel"))==null||c.addEventListener("click",d),l.addEventListener("click",r=>{r.target===l&&d()}),(m=document.getElementById("tm-toggle-done"))==null||m.addEventListener("click",async()=>{const r=a?"pending":"done";await f.from("tasks").update({status:r}).eq("id",e.id);const g=M.find(v=>String(v.id)===String(e.id));g&&(g.status=r),d(),r==="done"&&(Q="done",document.querySelectorAll(".tarefa-filter-btn").forEach(v=>{v.classList.toggle("active",v.dataset.filter==="done")})),ae()}),(u=document.getElementById("tm-save"))==null||u.addEventListener("click",async()=>{var y,w;const r=document.getElementById("tarefa-form");if(!r.checkValidity()){r.reportValidity();return}const g=new FormData(r),v=document.getElementById("tm-save");v.disabled=!0,v.textContent="Salvando…";const E={title:(y=g.get("title"))==null?void 0:y.trim(),description:((w=g.get("description"))==null?void 0:w.trim())||null,due_date:g.get("due_date")||null,priority:g.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(p==null?void 0:p.id)||null,tenant_id:(p==null?void 0:p.tenant_id)||null};let h;if(n){if({error:h}=await f.from("tasks").update(E).eq("id",e.id),!h){const B=M.findIndex(x=>String(x.id)===String(e.id));B>=0&&(M[B]={...M[B],...E})}}else{const{data:B,error:x}=await f.from("tasks").insert(E).select();h=x,!h&&(B!=null&&B[0])&&M.unshift(B[0])}if(v.disabled=!1,v.textContent=n?"Salvar":"Criar Tarefa",h){alert("Erro: "+h.message);return}d(),ae()})}async function Dt(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;p==null||p.role,p==null||p.tenant_id;const[{data:a},{data:o}]=await Promise.all([f.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),f.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),s=[];a!=null&&a.length&&(s.push('<div class="search-group-label">Imóveis</div>'),s.push(...a.map(l=>`
      <div class="search-result-item" data-type="property" data-id="${l.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${b(l.title||"—")}</div>
          <div class="search-result-sub">${b(l.reference||"")} · ${b(l.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(s.push('<div class="search-group-label">Leads / Contatos</div>'),s.push(...o.map(l=>`
      <div class="search-result-item" data-type="lead" data-id="${l.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${b(l.name||"—")}</div>
          <div class="search-result-sub">${b(l.email||l.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=s.length?s.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(l=>{l.addEventListener("click",()=>{var d;(d=document.getElementById("search-overlay"))==null||d.classList.add("hidden"),l.dataset.type==="lead"?Y("contatos"):Y("properties")})})}let D=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function Ot(){var l;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=f.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(d=>!D.includes(String(d.id))),s=document.getElementById("notif-badge");if(s&&(s.textContent=o.length,o.length>0?s.classList.remove("hidden"):s.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(d=>{const i=Ft(d.created_at);return`
      <div class="notif-item${!D.includes(String(d.id))?" unread":""}" data-id="${d.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${b(d.name||"—")}</div>
          <div class="notif-item-sub">${b(d.phone||d.source||"")} · ${i}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(l=document.getElementById("notif-see-all"))==null||l.addEventListener("click",d=>{d.preventDefault(),U(),Y("contatos")}),e.querySelectorAll(".notif-item").forEach(d=>{d.addEventListener("click",()=>{D.push(d.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(D)),d.classList.remove("unread"),U(),Y("contatos")})})}function Pt(){var e;document.querySelectorAll(".notif-item").forEach(t=>D.push(t.dataset.id)),D=[...new Set(D)],localStorage.setItem("crm_notifs_read",JSON.stringify(D)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function Ft(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function zt(){let e=f.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);p!=null&&p.tenant_id&&(e=e.eq("tenant_id",p.tenant_id));const{data:t}=await e,a=(t||[]).filter(s=>!D.includes(String(s.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let z=[],A=1;const ce=10;let Ke=!1;async function Xt(){var t,n,a,o,s,l,d,i,c;document.getElementById("section-contatos")&&(Ke||(Ke=!0,await rt(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{A=1,ne()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",m=>{m.key==="Enter"&&(A=1,ne())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>ct()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",Wt),(s=document.getElementById("import-modal-close"))==null||s.addEventListener("click",Me),(l=document.getElementById("import-modal-cancel"))==null||l.addEventListener("click",Me),(d=document.getElementById("download-template"))==null||d.addEventListener("click",m=>{m.preventDefault();const u=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,r=new Blob([u],{type:"text/csv"}),g=document.createElement("a");g.href=URL.createObjectURL(r),g.download="modelo_contatos.csv",g.click()}),(i=document.getElementById("import-csv-file"))==null||i.addEventListener("change",Vt),(c=document.getElementById("import-modal-confirm"))==null||c.addEventListener("click",Gt)))}async function rt(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=f.from("leads").select("*").order("created_at",{ascending:!1});(p==null?void 0:p.role)==="corretor"?t=t.eq("assigned_to",p.id):p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id));const{data:a}=await t;z=a||[],ne()}function ne(){var d,i,c;const e=(((d=document.getElementById("contato-search"))==null?void 0:d.value)||"").toLowerCase(),t=e?z.filter(m=>(m.name||"").toLowerCase().includes(e)||(m.email||"").toLowerCase().includes(e)||(m.phone||"").toLowerCase().includes(e)):z,n=t.length,a=Math.max(1,Math.ceil(n/ce));A>a&&(A=a);const o=t.slice((A-1)*ce,A*ce),s=document.getElementById("contatos-tbody");if(!s)return;o.length?s.innerHTML=o.map(m=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${m.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${m.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${b(m.name||"—")}</a>
        </td>
        <td>${b(m.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${m.email?b(m.email):"—"}</td>
        <td style="font-size:13px;">${m.phone?b(m.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${b(m.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${m.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):s.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const l=document.getElementById("contatos-pagination");if(l){const m=n===0?0:(A-1)*ce+1,u=Math.min(A*ce,n);l.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${m}–${u}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${A<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${A} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${A>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(i=l.querySelector("#pag-prev"))==null||i.addEventListener("click",()=>{A--,ne()}),(c=l.querySelector("#pag-next"))==null||c.addEventListener("click",()=>{A++,ne()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(m=>{m.addEventListener("click",u=>{u.preventDefault();const r=m.dataset.id,g=z.find(v=>String(v.id)===String(r));g&&ct(g)})})}function ct(e=null){var s,l,d;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=document.createElement("div");a.id="contato-modal-root",a.className="modal-backdrop",a.innerHTML=`
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
              <input name="name" required class="form-control" placeholder="Nome completo" value="${b((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${b((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${b((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${b((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${b((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${b((e==null?void 0:e.city_interest)||"")}">
            </div>
          </div>
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${b((e==null?void 0:e.notes)||"")}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cm-cancel">Cancelar</button>
        <button class="btn-primary" id="cm-save" style="margin:0;">${n?"Salvar":"Criar Contato"}</button>
      </div>
    </div>
  `,document.body.appendChild(a);const o=()=>a.remove();(s=document.getElementById("cm-close"))==null||s.addEventListener("click",o),(l=document.getElementById("cm-cancel"))==null||l.addEventListener("click",o),a.addEventListener("click",i=>{i.target===a&&o()}),(d=document.getElementById("cm-save"))==null||d.addEventListener("click",async()=>{var g,v,E,h,y,w,B;const i=document.getElementById("contato-form");if(!i.checkValidity()){i.reportValidity();return}const c=new FormData(i),m=document.getElementById("cm-save");m.disabled=!0,m.textContent="Salvando…";const u={name:(g=c.get("name"))==null?void 0:g.trim(),company:((v=c.get("company"))==null?void 0:v.trim())||null,email:((E=c.get("email"))==null?void 0:E.trim())||null,phone:((h=c.get("phone"))==null?void 0:h.trim())||null,job_title:((y=c.get("job_title"))==null?void 0:y.trim())||null,city_interest:((w=c.get("city_interest"))==null?void 0:w.trim())||null,notes:((B=c.get("notes"))==null?void 0:B.trim())||null,stage:(e==null?void 0:e.stage)||"novo",assigned_to:(p==null?void 0:p.id)||null,tenant_id:(p==null?void 0:p.tenant_id)||null,source:"manual"};let r;if(n){if({error:r}=await f.from("leads").update(u).eq("id",e.id),!r){const x=z.findIndex(C=>String(C.id)===String(e.id));x>=0&&(z[x]={...z[x],...u})}}else{const{data:x,error:C}=await f.from("leads").insert(u).select();r=C,!r&&(x!=null&&x[0])&&z.unshift(x[0])}if(m.disabled=!1,m.textContent=n?"Salvar":"Criar Contato",r){alert("Erro: "+r.message);return}o(),ne()})}let ee=[];function Vt(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{ee=a.target.result.split(`
`).filter(d=>d.trim()).slice(1).map(d=>{const[i,c,m,u,r]=d.split(",").map(g=>g.trim().replace(/^"|"$/g,""));return{name:i,email:c,phone:m,company:u,job_title:r}}).filter(d=>d.name);const s=document.getElementById("import-preview");s&&(s.textContent=`${ee.length} contato(s) encontrados para importar.`);const l=document.getElementById("import-modal-confirm");l&&(l.disabled=ee.length===0)},n.readAsText(t)}async function Gt(){if(!ee.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=ee.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(p==null?void 0:p.id)||null,tenant_id:(p==null?void 0:p.tenant_id)||null})),{error:n}=await f.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Me(),await rt(),alert(`${t.length} contato(s) importados com sucesso!`)}function Wt(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),ee=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Me(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const Yt="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function oe(e){return(await fetch(Yt,{method:"POST",headers:{Authorization:`Bearer ${yt}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function Qe(e){var i,c,m,u;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),s=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:r}}=await f.auth.getUser();n.value=(r==null?void 0:r.email)||""}const d=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=d),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),s==null||s.addEventListener("change",r=>{const g=r.target.files[0];if(!g)return;const v=URL.createObjectURL(g);a&&(a.src=v,a.style.display=""),o&&(o.style.display="none")}),(i=document.getElementById("btn-change-password"))==null||i.addEventListener("click",async()=>{var y,w;const r=((y=document.getElementById("change-password-new"))==null?void 0:y.value)||"",g=((w=document.getElementById("change-password-confirm"))==null?void 0:w.value)||"",v=document.getElementById("change-password-msg"),E=document.getElementById("btn-change-password");if(v&&(v.style.display="none"),r.length<6){v&&(v.textContent="Mínimo 6 caracteres.",v.style.display="");return}if(r!==g){v&&(v.textContent="As senhas não coincidem.",v.style.display="");return}E&&(E.disabled=!0,E.textContent="Salvando…");const{error:h}=await f.auth.updateUser({password:r});E&&(E.disabled=!1,E.textContent="Salvar Nova Senha"),h?v&&(v.textContent="Erro: "+h.message,v.style.display=""):(v&&(v.style.color="#16a34a",v.textContent="Senha alterada com sucesso!",v.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var w;const r=t.value.trim();let g=(p==null?void 0:p.avatar_url)||"";const v=s==null?void 0:s.files[0],E=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",v)try{const B=await he(v,400,.85),x=`avatars/${p.id}-${Date.now()}.jpg`,{error:C}=await f.storage.from("imoveis").upload(x,B,{contentType:"image/jpeg",upsert:!0});if(!C){const{data:{publicUrl:I}}=f.storage.from("imoveis").getPublicUrl(x);g=I}}catch(B){console.error("Avatar upload:",B)}const{error:h}=await f.from("profiles").update({name:r,avatar_url:g}).eq("id",p.id);if(l.disabled=!1,l.textContent=E,h){alert("Erro ao salvar perfil.");return}p={...p,name:r,avatar_url:g},Le(p);const y=document.getElementById("settings-avatar-initial");y&&(y.textContent=((w=r[0])==null?void 0:w.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const r=document.getElementById("settings-corretores-section");r&&(r.style.display=""),await ke(),(c=document.getElementById("btn-invite-corretor"))==null||c.addEventListener("click",async()=>{var w,B;const v=(w=document.getElementById("invite-email"))==null?void 0:w.value.trim(),E=(B=document.getElementById("invite-password"))==null?void 0:B.value.trim(),h=document.getElementById("btn-invite-corretor"),y=document.getElementById("invite-note");if(!v){alert("Informe o e-mail do corretor.");return}if(!E||E.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}h&&(h.disabled=!0,h.textContent="Criando…"),y&&(y.style.display="none");try{const x=await oe({email:v,password:E,tenant_id:(p==null?void 0:p.tenant_id)||null});if(x.success){const C=document.getElementById("invite-email"),I=document.getElementById("invite-password");C&&(C.value=""),I&&(I.value=""),await ke(),y&&(x.email_sent===!1?(y.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${b(v)}<br>
                <strong>Senha:</strong> ${b(E)}`,y.style.color="#0f172a"):(y.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",y.style.color="#16a34a"),y.style.display="")}else alert("Erro: "+(x.error||"Falha desconhecida"))}catch(x){alert("Erro ao criar acesso: "+x.message)}finally{h&&(h.disabled=!1,h.textContent="+ Criar Acesso")}});const g=document.getElementById("settings-locations-section");g&&(g.style.display=""),await me(),(m=document.getElementById("loc-add-city-btn"))==null||m.addEventListener("click",async()=>{const v=document.getElementById("loc-new-city"),E=v==null?void 0:v.value.trim();if(!E)return;const{error:h}=await f.from("locations").insert({type:"cidade",name:E});if(h){alert("Erro ao adicionar cidade.");return}v&&(v.value=""),await me(),De()}),(u=document.getElementById("loc-add-neighborhood-btn"))==null||u.addEventListener("click",async()=>{var w;const v=parseInt((w=document.getElementById("loc-new-neighborhood-city"))==null?void 0:w.value,10),E=document.getElementById("loc-new-neighborhood"),h=E==null?void 0:E.value.trim();if(!v||!h){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:y}=await f.from("locations").insert({type:"bairro",name:h,parent_id:v});if(y){alert("Erro ao adicionar bairro.");return}E&&(E.value=""),await me()})}}async function ke(){const e=document.getElementById("corretores-list");if(!e)return;let t=f.from("profiles").select("*").order("created_at");p!=null&&p.tenant_id&&(t=t.eq("tenant_id",p.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const s=(o.name||"?")[0].toUpperCase(),l=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${b(s)}</div>`,d=o.id===(p==null?void 0:p.id),i=o.active!==!1,c=i?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',m=d?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,u=d?"":i?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,r=d?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${l}
        <div>
          <div class="corretor-name">${b(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${c}
        ${m}
        ${u}
        ${r}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await f.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const s=o.dataset.uid,l=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const d=await oe({action:"toggle",userId:s,active:!l});d.success||alert("Erro: "+(d.error||"Falha desconhecida"))}catch(d){alert("Erro: "+d.message)}await ke()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var d,i;const s=o.dataset.uid,l=((i=(d=o.closest(".corretor-item"))==null?void 0:d.querySelector(".corretor-name"))==null?void 0:i.textContent)||"este corretor";if(confirm(`Excluir "${l}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const c=await oe({action:"delete",userId:s});c.success||alert("Erro ao excluir: "+(c.error||"Falha desconhecida"))}catch(c){alert("Erro: "+c.message)}await ke()}})})}async function mt(){const{data:e,error:t}=await f.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(ge=e||[],ge)}function J(){return ge.filter(e=>e.type==="cidade")}function Ue(e){return ge.filter(t=>t.type==="bairro"&&t.parent_id===e)}function De(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=J();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${b(a.name)}</option>`).join(""),t&&(e.value=t)}async function me(){await mt();const e=J(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(s=>`
        <div class="loc-item">
          <span class="loc-item-name">${b(s.name)}</span>
          <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=ge.filter(s=>s.type==="bairro");n.innerHTML=o.length?o.map(s=>{const l=e.find(d=>d.id===s.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${b(s.name)}</div>
              ${l?`<div class="loc-item-sub">${b(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(s=>`<option value="${s.id}">${b(s.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{const l=s.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:d}=await f.from("locations").delete().eq("id",s.dataset.id);if(d){alert("Erro ao excluir.");return}await me(),De()})}),n.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await f.from("locations").delete().eq("id",s.dataset.id);if(l){alert("Erro ao excluir.");return}await me()})})}function Ze(){var n,a,o,s,l,d,i,c,m,u,r,g,v,E,h,y,w,B,x,C;document.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{const L=I.closest(".filter-btns"),S=I.classList.contains("active");L.querySelectorAll(".filter-btn").forEach(k=>k.classList.remove("active")),S||I.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var _;const I=(_=document.getElementById("f-city"))==null?void 0:_.value,L=J().find(T=>T.name===I),S=L?Ue(L.id):[],k=document.getElementById("f-neighborhood");k&&(k.innerHTML='<option value="">Todos</option>'+S.map(T=>`<option value="${T.name}">${b(T.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{ye(je($))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach(k=>{const _=document.getElementById(k);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach(k=>{const _=document.getElementById(k);_&&(_.value="")});const S=document.getElementById("f-neighborhood");S&&(S.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach(k=>k.classList.remove("active")),ye($)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{Y(I.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{Y(I.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach(I=>{I.addEventListener("click",L=>{L.stopPropagation();const S=I.closest(".topnav-dropdown");S==null||S.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(k=>{k!==S&&k.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach(I=>I.classList.remove("open"))}),(s=document.getElementById("modal-close"))==null||s.addEventListener("click",we),(l=document.getElementById("modal-cancel"))==null||l.addEventListener("click",we),(d=document.getElementById("property-modal"))==null||d.addEventListener("click",I=>{I.target.id==="property-modal"&&we()}),(i=document.getElementById("btn-new-property"))==null||i.addEventListener("click",()=>{R=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",G="",xe([]),Ae("Novo Imóvel")}),(c=document.getElementById("logout-btn"))==null||c.addEventListener("click",async()=>{await f.auth.signOut(),location.reload()}),(m=document.getElementById("view-prev"))==null||m.addEventListener("click",()=>{H=(H-1+F.length)%F.length,Be()}),(u=document.getElementById("view-next"))==null||u.addEventListener("click",()=>{H=(H+1)%F.length,Be()}),(r=document.getElementById("view-modal-close"))==null||r.addEventListener("click",Ee),(g=document.getElementById("view-modal-close2"))==null||g.addEventListener("click",Ee),(v=document.getElementById("view-modal"))==null||v.addEventListener("click",I=>{I.target.id==="view-modal"&&Ee()}),(E=document.getElementById("view-modal-share"))==null||E.addEventListener("click",()=>{const I=document.getElementById("share-panel");if(!I)return;const L=I.style.display!=="none";I.style.display=L?"none":"block"}),(h=document.getElementById("share-whatsapp"))==null||h.addEventListener("click",()=>{var k,_;const I=(k=document.getElementById("share-link-input"))==null?void 0:k.value;if(!I)return;const L=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",S=encodeURIComponent("Olha esse imóvel que encontrei: "+L+`
`+I);window.open("https://wa.me/?text="+S,"_blank")}),(y=document.getElementById("share-instagram"))==null||y.addEventListener("click",()=>{var L,S;const I=(L=document.getElementById("share-link-input"))==null?void 0:L.value;I&&((S=navigator.clipboard)==null||S.writeText(I),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(w=document.getElementById("share-email"))==null||w.addEventListener("click",()=>{var _,T;const I=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!I)return;const L=((T=document.getElementById("view-modal-title"))==null?void 0:T.textContent)||"Imóvel",S=encodeURIComponent("Imóvel: "+L),k=encodeURIComponent(`Olá! Segue o link do imóvel:

`+I);window.open("mailto:?subject="+S+"&body="+k,"_blank")}),(B=document.getElementById("share-copy"))==null||B.addEventListener("click",()=>{var L;const I=document.getElementById("share-link-input");I&&((L=navigator.clipboard)==null||L.writeText(I.value).then(()=>{const S=document.getElementById("share-copy"),k=S.textContent;S.textContent="✅ Copiado!",setTimeout(()=>{S.textContent=k},2e3)}))}),(x=document.getElementById("view-modal-edit"))==null||x.addEventListener("click",()=>{var O;if((p==null?void 0:p.role)!=="admin")return;const I=document.getElementById("view-modal-title").textContent,L=$.find(N=>N.title===I);if(!L)return;Ee(),R=L.id;const S=document.getElementById("property-form"),k=document.getElementById("form-submit-btn");k.textContent="Salvar Alterações",S.querySelector('[name="title"]').value=L.title||"",S.querySelector('[name="rua"]').value=L.rua||"",S.querySelector('[name="numero"]').value=L.numero||"",S.querySelector('[name="city"]').value=L.city||"",S.querySelector('[name="price"]').value=L.price||"",S.querySelector('[name="bedrooms"]').value=L.bedrooms||"",S.querySelector('[name="suites"]').value=L.suites||"",S.querySelector('[name="parking"]').value=L.parking||"",S.querySelector('[name="description"]').value=L.description||"",S.querySelector('[name="construction_status"]').value=L.construction_status||"",S.querySelector('[name="owner_name"]').value=L.owner_name||"",S.querySelector('[name="owner_phone"]').value=L.owner_phone||"",S.querySelector('[name="owner_email"]').value=L.owner_email||"",S.querySelector('[name="owner_notes"]').value=L.owner_notes||"",S.querySelector('[name="condominium"]').value=L.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=L.published===!0?"true":"false");const T=document.getElementById("adminCitySelect");T&&(T.value=L.city||"",T.dispatchEvent(new Event("change")),setTimeout(()=>{const N=document.getElementById("adminNeighborhood");N&&(N.value=L.neighborhood||"")},50)),G=L.cover_image||((O=L.images)==null?void 0:O[0])||"",xe(L.images||[]),Ae("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(I=>{I.addEventListener("click",()=>{var L;document.querySelectorAll(".tab-btn").forEach(S=>S.classList.remove("active")),I.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(S=>S.classList.add("hidden")),(L=document.getElementById(`tab-${I.dataset.tab}`))==null||L.classList.remove("hidden")})}),(C=document.getElementById("admin-properties"))==null||C.addEventListener("click",I=>{if(I.target.closest(".action-btns"))return;const L=I.target.closest("tr");if(!L)return;const S=Number(L.dataset.id);if(!S)return;const k=$.find(_=>_.id===S);k&&Tt(k)})}document.addEventListener("DOMContentLoaded",async()=>{var s,l,d;await Promise.all([vt(),mt()]),K=V("company.whatsapp",K),pe=`https://wa.me/${K}`,He(),kt(),$t();const e=document.getElementById("adminCitySelect"),t=document.getElementById("adminNeighborhood");e&&t&&(De(),e.addEventListener("change",()=>{const i=J().find(m=>m.name===e.value),c=i?Ue(i.id):[];t.innerHTML='<option value="">Selecione a cidade primeiro</option>'+c.map(m=>`<option value="${m.name}">${b(m.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),a=document.getElementById("admin-root");if(n){const i=new URLSearchParams(window.location.hash.replace("#","")),c=new URLSearchParams(window.location.search),m=i.get("type")||c.get("type")||"",u=ot||m==="recovery"||m==="invite"||window.location.hash.includes("access_token")||c.has("code"),r=document.getElementById("password-reset-overlay");if(u){n.style.display="none",a&&a.classList.add("hidden"),r&&(r.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async v=>{var x,C;v.preventDefault();const E=((x=document.getElementById("new-password"))==null?void 0:x.value)||"",h=((C=document.getElementById("confirm-password"))==null?void 0:C.value)||"",y=document.getElementById("password-reset-msg"),w=v.target.querySelector('button[type="submit"]');if(y&&(y.style.display="none"),E!==h){y&&(y.textContent="As senhas não coincidem.",y.style.display="");return}w&&(w.disabled=!0,w.textContent="Salvando…");const{error:B}=await f.auth.updateUser({password:E});if(B){y&&(y.textContent="Erro: "+B.message,y.style.display=""),w&&(w.disabled=!1,w.textContent="Definir Senha");return}window.location.href=window.location.pathname}),c.has("code")&&await f.auth.exchangeCodeForSession(c.get("code")??"");return}const{data:{session:g}}=await f.auth.getSession();if(g){if(n.classList.add("hidden"),a&&a.classList.remove("hidden"),qe(),Ze(),Nt(),window.lucide&&lucide.createIcons(),p=await Ve(g.user.id),!p){await f.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden");return}if(p.active===!1){await f.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(p.needs_password_reset){n.style.display="none",a&&a.classList.add("hidden");const v=document.getElementById("password-reset-overlay");v&&(v.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async E=>{var C,I;E.preventDefault();const h=((C=document.getElementById("new-password"))==null?void 0:C.value)||"",y=((I=document.getElementById("confirm-password"))==null?void 0:I.value)||"",w=document.getElementById("password-reset-msg"),B=E.target.querySelector('button[type="submit"]');if(w&&(w.style.display="none"),h!==y){w&&(w.textContent="As senhas não coincidem.",w.style.display="");return}if(h.length<6){w&&(w.textContent="Mínimo 6 caracteres.",w.style.display="");return}B&&(B.disabled=!0,B.textContent="Salvando…");const{error:x}=await f.auth.updateUser({password:h});if(x){w&&(w.textContent="Erro: "+x.message,w.style.display=""),B&&(B.disabled=!1,B.textContent="Definir Senha");return}await f.from("profiles").update({needs_password_reset:!1}).eq("id",p.id),window.location.href=window.location.pathname});return}ze((p==null?void 0:p.tenant_id)||null),Le(p),Ge(p.role),await Ie(),await Qe(p),window.lucide&&lucide.createIcons(),zt()}else{a&&a.classList.add("hidden"),n.classList.remove("hidden");const v=document.getElementById("login-form");v&&((d=document.getElementById("forgot-password-btn"))==null||d.addEventListener("click",async()=>{var y,w;const E=(w=(y=v.querySelector('input[name="email"]'))==null?void 0:y.value)==null?void 0:w.trim();if(!E){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:h}=await f.auth.resetPasswordForEmail(E,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(h?"Erro: "+h.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),v.addEventListener("submit",async E=>{E.preventDefault();const h=new FormData(v),y=h.get("email"),w=h.get("password");if(await xt(y,w)){n.classList.add("hidden"),a&&a.classList.remove("hidden"),qe(),Ze(),window.lucide&&lucide.createIcons();const{data:{session:x}}=await f.auth.getSession();if(p=x?await Ve(x.user.id):null,!p){await f.auth.signOut();return}if(p.active===!1){await f.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}ze((p==null?void 0:p.tenant_id)||null),Le(p),Ge(p.role),await Ie(),await Qe(p),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else qe();await fe();const o=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();gt(o),ft(K)});async function Jt(){const e=$.filter(o=>!o.reference);if(!e.length)return;const t=$.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,s)=>o.id-s.id);for(const o of a){const s="IO-"+String(n).padStart(4,"0"),{error:l}=await f.from("properties").update({reference:s}).eq("id",o.id);if(!l){const d=$.findIndex(i=>i.id===o.id);d>=0&&($[d].reference=s),n++}}ye(je($))}async function Kt(){const e=$.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(s=>!s.includes("/wm-")))continue;const a=[];let o=!1;for(const s of t.images)if(s.includes("/wm-"))a.push(s);else try{const l=await Qt(s);a.push(l),o=!0}catch{a.push(s)}if(o){await f.from("properties").update({images:a}).eq("id",t.id);const s=$.findIndex(l=>l.id===t.id);s>=0&&($[s].images=a)}}ye(je($))}}async function Qt(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),s=o.ok?await o.blob():null,l=s?URL.createObjectURL(s):null;return new Promise(d=>{const i=new Image;i.onload=()=>{URL.revokeObjectURL(a);const c=document.createElement("canvas"),m=1200;let u=i.width,r=i.height;u>m&&(r=Math.round(r*m/u),u=m),c.width=u,c.height=r;const g=c.getContext("2d");g.drawImage(i,0,0,u,r);const v=E=>{if(E){const h=Math.round(u*.18),y=Math.round(E.naturalHeight*h/E.naturalWidth),w=Math.round(u*.02);g.globalAlpha=.45,g.drawImage(E,u-h-w,r-y-w,h,y),g.globalAlpha=1}c.toBlob(async h=>{try{const y=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:w}=await f.storage.from("imoveis").upload(y,h,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(w){console.error("Upload watermark error:",w),d(e);return}const{data:{publicUrl:B}}=f.storage.from("imoveis").getPublicUrl(y);d(B)}catch(y){console.error("Watermark upload exception:",y),d(e)}},"image/jpeg",.82)};if(l){const E=new Image;E.onload=()=>{URL.revokeObjectURL(l),v(E)},E.onerror=()=>{URL.revokeObjectURL(l),v(null)},E.src=l}else v(null)},i.onerror=()=>{URL.revokeObjectURL(a),d(e)},i.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function j(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function Oe(e,t="assets"){const n=await he(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await f.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:s}}=f.storage.from("imoveis").getPublicUrl(a);return s}async function Zt(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await f.from("settings").select("key,value").eq("tenant_id",Re()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>b(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const s=o.target.files[0];if(s)try{const l=await Oe(s,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const s=await Z([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);s&&He(),o.disabled=!1,o.textContent="Salvar Identidade",j(document.getElementById("co-identity-msg"),s)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const s=document.getElementById("co-whatsapp").value.trim(),l=await Z([["company.whatsapp",s],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&s&&(K=s,pe=`https://wa.me/${s}`),o.disabled=!1,o.textContent="Salvar Contatos",j(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const s=await Z([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",j(document.getElementById("co-social-msg"),s)})}async function ea(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await f.from("settings").select("key,value").eq("tenant_id",Re()),n={};t==null||t.forEach(m=>{n[m.key]=m.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",s=n["visual.secondary_bg"]||"#1a2f4a",l=n["visual.hero_bg_url"]||"",d=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${b(l)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <div id="vis-hero-preview" style="margin-top:10px;display:${l?"":"none"}">
          <img src="${b(l)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function i(m,u,r){const g=document.getElementById(m),v=document.getElementById(u);g==null||g.addEventListener("input",E=>{v.value=E.target.value,r()}),v==null||v.addEventListener("input",E=>{/^#[0-9a-fA-F]{6}$/.test(E.target.value)&&(g.value=E.target.value,r())})}function c(){var u,r,g,v;const m=((u=document.getElementById("col-accent-hex"))==null?void 0:u.value)||"#b8962e";(r=document.getElementById("vp-bar"))==null||r.style.setProperty("background",m),(g=document.getElementById("vp-dot"))==null||g.style.setProperty("background",m),(v=document.getElementById("vp-btn"))==null||v.style.setProperty("background",m),document.documentElement.style.setProperty("--accent",m)}i("col-accent","col-accent-hex",c),i("col-primary","col-primary-hex",()=>{}),i("col-secondary","col-secondary-hex",()=>{}),c(),document.getElementById("vis-hero-file").addEventListener("change",async m=>{const u=m.target.files[0];if(u)try{const r=await Oe(u,"hero");document.getElementById("vis-hero-url").value=r;const g=document.getElementById("vis-hero-preview");g.innerHTML=`<img src="${r}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,g.style.display=""}catch(r){alert("Erro no upload: "+r.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const m=document.getElementById("visual-save-colors");m.disabled=!0,m.textContent="Salvando…";const u=await Z([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);u&&He(),m.disabled=!1,m.textContent="Salvar Cores",j(document.getElementById("visual-colors-msg"),u)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",c())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const m=document.getElementById("visual-save-images");m.disabled=!0,m.textContent="Salvando…";const u=await Z([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);m.disabled=!1,m.textContent="Salvar Imagens",j(document.getElementById("visual-images-msg"),u)})}async function ta(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await f.from("site_content").select("*").eq("tenant_id",Re()),n={};t==null||t.forEach(i=>{n[i.key]=i});const a=(i,c)=>{var m;return b(((m=n[i])==null?void 0:m[`value_${c}`])||"")},o=["pt","en","es"],s={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=i=>o.map(c=>`<button class="content-tab${c===i?" active":""}" data-lang="${c}">${s[c]}</button>`).join(""),d=i=>`
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
  `,document.getElementById("sc-tabs").addEventListener("click",i=>{var m;const c=i.target.closest(".content-tab");c&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(u=>u.classList.remove("active")),c.classList.add("active"),(m=document.querySelector(`#sc-panels [data-panel="${c.dataset.lang}"]`))==null||m.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const i=document.getElementById("sc-save-btn");i.disabled=!0,i.textContent="Salvando…";const c={};document.querySelectorAll(".sc-field").forEach(u=>{const r=u.dataset.key,g=u.dataset.lang;c[r]||(c[r]={}),c[r][g]=u.value});let m=!0;for(const[u,r]of Object.entries(c))await Ce(u,{pt:r.pt,en:r.en,es:r.es})||(m=!1);i.disabled=!1,i.textContent="Salvar Conteúdo",j(document.getElementById("sc-save-msg"),m)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const i=document.getElementById("seo-save-btn");i.disabled=!0,i.textContent="Salvando…";const c=document.getElementById("seo-title").value.trim(),m=document.getElementById("seo-desc").value.trim(),u=await Ce("seo.title_pt",{pt:c,en:c,es:c})&&await Ce("seo.description_pt",{pt:m,en:m,es:m});i.disabled=!1,i.textContent="Salvar SEO",j(document.getElementById("seo-save-msg"),u)})}async function aa(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await P())}async function P(){const e=document.getElementById("crm-body");if(!e)return;const[{data:t},{data:n},{data:a},{data:o}]=await Promise.all([f.from("crm_pipelines").select("*").order("sort_order"),f.from("crm_stages").select("*").order("sort_order"),f.from("crm_tags").select("*").order("name"),f.from("crm_lead_statuses").select("*").order("sort_order")]),s=t||[],l=s.find(r=>r.is_default)||s[0],d=s.map(r=>`<option value="${r.id}"${r.id===(l==null?void 0:l.id)?" selected":""}>${b(r.name)}</option>`).join(""),c=(n||[]).filter(r=>r.pipeline_id===(l==null?void 0:l.id)).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${b(r.name)}</span>
      <input type="color" value="${r.color}" data-sid="${r.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${r.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',m=(a||[]).map(r=>`<span class="tag-chip" style="background:${r.color}" data-id="${r.id}">
      ${b(r.name)}
      <button class="tag-chip-del" data-id="${r.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',u=(o||[]).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${b(r.name)}</span>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const r=document.getElementById("crm-new-stage").value.trim(),g=document.getElementById("crm-new-stage-color").value,v=parseInt(document.getElementById("crm-pipe-sel").value,10);r&&(await f.from("crm_stages").insert({pipeline_id:v,name:r,color:g,sort_order:99}),document.getElementById("crm-new-stage").value="",await P())}),e.querySelectorAll(".stage-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await f.from("crm_stages").delete().eq("id",r.dataset.id),await P())})}),e.querySelectorAll(".stage-color-pick").forEach(r=>{r.addEventListener("change",async g=>{await f.from("crm_stages").update({color:g.target.value}).eq("id",r.dataset.sid);const v=r.closest(".stage-item").querySelector(".stage-color-dot");v&&(v.style.background=g.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const r=document.getElementById("crm-new-tag").value.trim(),g=document.getElementById("crm-new-tag-color").value;r&&(await f.from("crm_tags").insert({name:r,color:g}),document.getElementById("crm-new-tag").value="",await P())}),e.querySelectorAll(".tag-chip-del").forEach(r=>{r.addEventListener("click",async()=>{await f.from("crm_tags").delete().eq("id",r.dataset.id),await P()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const r=document.getElementById("crm-new-status").value.trim(),g=document.getElementById("crm-new-status-color").value,v=document.getElementById("crm-new-status-final").checked;r&&(await f.from("crm_lead_statuses").insert({name:r,color:g,is_final:v,sort_order:99}),document.getElementById("crm-new-status").value="",await P())}),e.querySelectorAll(".status-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover este status?")&&(await f.from("crm_lead_statuses").delete().eq("id",r.dataset.id),await P())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var g;const r=(g=prompt("Nome do novo funil:"))==null?void 0:g.trim();r&&(await f.from("crm_pipelines").insert({name:r,sort_order:99}),await P())})}async function na(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await f.from("integrations").select("*"),n={};t==null||t.forEach(d=>{n[d.key]=d});const a=d=>{var i;return b(((i=n[d])==null?void 0:i.value)||"")},o=d=>{var i;return(i=n[d])!=null&&i.enabled?"checked":""},s=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var u;const d=document.getElementById("intg-save-tracking");d.disabled=!0,d.textContent="Salvando…";let i=!0;const c=document.querySelectorAll(".intg-val"),m=document.querySelectorAll(".intg-toggle");for(let r=0;r<c.length;r++){const g=c[r].dataset.key,v=c[r].value.trim(),E=((u=m[r])==null?void 0:u.checked)??!1;await Te(g,v,E)||(i=!1)}d.disabled=!1,d.textContent="Salvar Integrações",j(document.getElementById("intg-tracking-msg"),i)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const d=document.getElementById("intg-save-smtp");d.disabled=!0,d.textContent="Salvando…";const i=document.querySelectorAll(".smtp-field");let c=!0;for(const u of i)await Te(u.dataset.key,u.value.trim(),!0)||(c=!1);const m=document.getElementById("smtp-pass").value;m&&(await Te("smtp_pass",m,!0)||(c=!1)),d.disabled=!1,d.textContent="Salvar SMTP",j(document.getElementById("intg-smtp-msg"),c)})}async function oa(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Ne(),document.getElementById("media-file-input").addEventListener("change",async n=>{var i,c;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),s=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");o.style.display="";let d=0;for(const m of a){l.textContent=`Enviando ${d+1}/${a.length}…`,s.style.width=`${Math.round(d/a.length*100)}%`;try{const u=await Oe(m,"media"),r=m.name.replace(/\.[^.]+$/,"").slice(0,60);await f.from("media_library").insert({name:r,url:u,type:"image",size:m.size,created_by:(c=(i=(await f.auth.getUser()).data)==null?void 0:i.user)==null?void 0:c.id})}catch(u){console.error("Media upload error:",u)}d++}s.style.width="100%",l.textContent=`✓ ${d} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",s.style.width="0"},2e3),await Ne(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Ne(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await f.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${b(a.url)}">
      <img src="${b(a.url)}" alt="${b(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${b(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${b(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var s;o.stopPropagation(),(s=navigator.clipboard)==null||s.writeText(a.dataset.url).then(()=>{const l=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await f.from("media_library").delete().eq("id",a.dataset.id),await Ne())})})}async function sa(){var t,n,a,o,s;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(i=>i.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(i=>i.classList.add("hidden")),l.classList.add("active");const d=e.querySelector(`#sa-panel-${l.dataset.tab}`);d&&d.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&X(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&ia(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&et(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&tt(),l.dataset.tab==="platform"&&at()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",et),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",X),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",tt),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>ra()),(s=e.querySelector("#sa-plat-save"))==null||s.addEventListener("click",la),X(),at())}async function X(){var d,i;const e=document.getElementById("sa-tenants-list"),t=((i=(d=document.getElementById("sa-tenant-search"))==null?void 0:d.value)==null?void 0:i.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=f.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const s=(a||[]).filter(c=>{var m,u;return!t||((m=c.name)==null?void 0:m.toLowerCase().includes(t))||((u=c.slug)==null?void 0:u.toLowerCase().includes(t))});if(!s.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const l=c=>c.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=s.map(c=>{var m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        ${c.logo_url?`<img class="sa-tenant-logo" src="${b(c.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${b(c.name||"—")}</div>
          <div class="sa-list-sub">${b(c.slug||"")} · ${b(((m=c.plans)==null?void 0:m.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${l(c)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${c.id}" data-active="${c.active}" title="${c.active?"Desativar":"Ativar"}">${c.active?"⏸️":"▶️"}</button>
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${c.id}" title="Editar">✏️</button>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(c=>{c.addEventListener("click",async()=>{const m=c.dataset.active==="true";await f.from("tenants").update({active:!m}).eq("id",c.dataset.id),X()})}),e.querySelectorAll('[data-action="edit-tenant"]').forEach(c=>{c.addEventListener("click",()=>{const m=(s||[]).find(u=>String(u.id)===String(c.dataset.id));m&&ca(m)})})}async function ia(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await f.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${b(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function et(){var d;const e=document.getElementById("sa-subs-list"),t=((d=document.getElementById("sa-sub-filter"))==null?void 0:d.value)||"";if(!e)return;e.dataset.loaded="1";let n=f.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const s={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},l={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(i=>{var c,m,u;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${b(((c=i.tenants)==null?void 0:c.name)||"—")}</div>
          <div class="sa-list-sub">${b(((m=i.plans)==null?void 0:m.name)||"—")} · R$ ${Number(((u=i.plans)==null?void 0:u.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${s[i.status]||"gray"}">${l[i.status]||i.status}</span>
        <span class="sa-list-date">${i.current_period_end?new Date(i.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function tt(){var l,d;const e=document.getElementById("sa-users-list"),t=((d=(l=document.getElementById("sa-user-search"))==null?void 0:l.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await f.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(i=>{var c,m;return!t||((c=i.name)==null?void 0:c.toLowerCase().includes(t))||((m=i.email)==null?void 0:m.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const s={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(i=>{var c;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(i.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${b(i.name||"—")}</div>
          <div class="sa-list-sub">${b(((c=i.tenants)==null?void 0:c.name)||"Sem imobiliária")} · ${s[i.role]||i.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${i.active!==!1?"sa-badge-green":"sa-badge-red"}">${i.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function at(){const[e,t,n,a]=await Promise.all([f.from("tenants").select("id",{count:"exact",head:!0}),f.from("profiles").select("id",{count:"exact",head:!0}),f.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),f.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(s,l)=>{const d=document.getElementById(s);d&&(d.textContent=l??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function la(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await Z([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),j(t,!0)}function da(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ra(){var a,o,s,l,d,i;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),f.from("plans").select("id, name").then(({data:c})=>{const m=document.getElementById("nt-plan");m&&c&&(m.innerHTML='<option value="">Sem plano</option>'+c.map(u=>`<option value="${u.id}">${b(u.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",c=>{const m=document.getElementById("nt-slug");m&&!m.dataset.manual&&(m.value=da(c.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",c=>{c.target.dataset.manual="1"}),(s=document.getElementById("nt-pwd-toggle"))==null||s.addEventListener("click",()=>{const c=document.getElementById("nt-admin-password");c.type=c.type==="password"?"text":"password"});const n=()=>t.remove();(l=document.getElementById("sa-modal-close-btn"))==null||l.addEventListener("click",n),(d=document.getElementById("nt-cancel"))==null||d.addEventListener("click",n),t.addEventListener("click",c=>{c.target===t&&n()}),(i=document.getElementById("nt-save"))==null||i.addEventListener("click",async()=>{var C,I,L,S,k,_,T,O,N,se,ie,le;const c=(I=(C=document.getElementById("nt-name"))==null?void 0:C.value)==null?void 0:I.trim(),m=(S=(L=document.getElementById("nt-slug"))==null?void 0:L.value)==null?void 0:S.trim(),u=(_=(k=document.getElementById("nt-domain"))==null?void 0:k.value)==null?void 0:_.trim(),r=(T=document.getElementById("nt-plan"))==null?void 0:T.value,g=(N=(O=document.getElementById("nt-admin-email"))==null?void 0:O.value)==null?void 0:N.trim(),v=(ie=(se=document.getElementById("nt-admin-password"))==null?void 0:se.value)==null?void 0:ie.trim(),E=document.getElementById("nt-msg"),h=document.getElementById("nt-save");if(!c||!m){E.textContent="❌ Nome e slug são obrigatórios.",E.style.color="#ef4444";return}if(!g){E.textContent="❌ Informe o e-mail do admin.",E.style.color="#ef4444";return}if(!v||v.length<6){E.textContent="❌ A senha precisa ter mínimo 6 caracteres.",E.style.color="#ef4444";return}h.disabled=!0,h.textContent="Criando…",E.textContent="⏳ Criando imobiliária…",E.style.color="#64748b";const{data:y,error:w}=await f.from("tenants").insert({name:c,slug:m,domain:u||null,plan_id:r||null,active:!0}).select();if(w){h.disabled=!1,h.textContent="Criar Imobiliária",E.textContent="❌ "+w.message,E.style.color="#ef4444";return}const B=(le=y==null?void 0:y[0])==null?void 0:le.id;E.textContent="⏳ Criando usuário admin…";const x=await oe({email:g,password:v,role:"admin",tenant_id:B});if(!(x!=null&&x.success)){h.disabled=!1,h.textContent="Criar Imobiliária",E.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+b((x==null?void 0:x.error)||"Desconhecido"),E.style.color="#f59e0b",setTimeout(()=>{n(),X()},3e3);return}B&&(x!=null&&x.user_id)&&!(x!=null&&x.linked)&&await f.from("profiles").update({tenant_id:B}).eq("id",x.user_id),h.disabled=!1,h.textContent="Criar Imobiliária",x.email_sent===!1?(E.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${b(x.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${b(g)}</strong><br>
          Senha: <strong>${b(v)}</strong>
        </div>`,E.style.color="#0f172a"):(E.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",E.style.color="#22c55e",setTimeout(()=>{n(),X()},1500))})}function ca(e){var o,s,l,d,i,c,m;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop",n.innerHTML=`
    <div class="sa-modal" style="max-width:560px;">
      <div class="sa-modal-header">
        <h3>Editar Imobiliária</h3>
        <button class="sa-modal-close" id="et-close">✕</button>
      </div>
      <div class="sa-modal-body">

        <!-- Logo upload -->
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
          <div id="et-logo-preview" style="width:72px;height:72px;border-radius:12px;border:2px dashed #e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#f8fafc;flex-shrink:0;cursor:pointer;" title="Clique para alterar a logo">
            ${e.logo_url?`<img src="${b(e.logo_url)}" style="width:100%;height:100%;object-fit:cover;" id="et-logo-img">`:'<span style="font-size:28px;">🏢</span>'}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · recomendado 256×256px</div>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:10px;">Dados da Imobiliária</div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${b(e.name||"")}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${b(e.slug||"")}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${b(e.domain||"")}" placeholder="abc.imobipro.com.br"></div>
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
  `,document.body.appendChild(n),f.from("plans").select("id, name").then(({data:u})=>{const r=document.getElementById("et-plan");r&&u&&(r.innerHTML='<option value="">Sem plano</option>'+u.map(g=>`<option value="${g.id}"${String(g.id)===String(e.plan_id)?" selected":""}>${b(g.name)}</option>`).join(""))}),(o=document.getElementById("et-logo-input"))==null||o.addEventListener("change",u=>{const r=u.target.files[0];if(!r)return;const g=URL.createObjectURL(r),v=document.getElementById("et-logo-preview");v&&(v.innerHTML=`<img src="${g}" style="width:100%;height:100%;object-fit:cover;">`)}),(s=document.getElementById("et-logo-preview"))==null||s.addEventListener("click",()=>{var u;(u=document.getElementById("et-logo-input"))==null||u.click()}),(l=document.getElementById("et-pwd-toggle"))==null||l.addEventListener("click",()=>{const u=document.getElementById("et-admin-password");u.type=u.type==="password"?"text":"password"});const a=()=>n.remove();(d=document.getElementById("et-close"))==null||d.addEventListener("click",a),(i=document.getElementById("et-cancel"))==null||i.addEventListener("click",a),n.addEventListener("click",u=>{u.target===n&&a()}),(c=document.getElementById("et-delete"))==null||c.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const r=document.getElementById("et-delete");r.disabled=!0,r.textContent="Excluindo…";const{error:g}=await f.from("tenants").delete().eq("id",e.id);if(g){alert("Erro ao excluir: "+g.message),r.disabled=!1,r.textContent="🗑️ Excluir";return}a(),X()}),(m=document.getElementById("et-save"))==null||m.addEventListener("click",async()=>{var I,L,S,k,_,T,O,N,se,ie,le,Pe;const u=(L=(I=document.getElementById("et-name"))==null?void 0:I.value)==null?void 0:L.trim(),r=(k=(S=document.getElementById("et-slug"))==null?void 0:S.value)==null?void 0:k.trim(),g=(T=(_=document.getElementById("et-domain"))==null?void 0:_.value)==null?void 0:T.trim(),v=(O=document.getElementById("et-plan"))==null?void 0:O.value,E=(se=(N=document.getElementById("et-admin-email"))==null?void 0:N.value)==null?void 0:se.trim(),h=(le=(ie=document.getElementById("et-admin-password"))==null?void 0:ie.value)==null?void 0:le.trim(),y=(Pe=document.getElementById("et-logo-input"))==null?void 0:Pe.files[0],w=document.getElementById("et-msg"),B=document.getElementById("et-save");if(!u){w.textContent="❌ Nome é obrigatório.",w.style.color="#ef4444";return}B.disabled=!0,B.textContent="Salvando…",w.textContent="⏳ Salvando…",w.style.color="#64748b";let x=e.logo_url;if(y)try{const q=await he(y,256,.85),Fe=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:ut}=await f.storage.from("imoveis").upload(Fe,q,{contentType:"image/jpeg",upsert:!0});if(!ut){const{data:{publicUrl:pt}}=f.storage.from("imoveis").getPublicUrl(Fe);x=pt}}catch(q){console.error("Logo upload:",q)}const{error:C}=await f.from("tenants").update({name:u,slug:r||e.slug,domain:g||null,plan_id:v||null,logo_url:x}).eq("id",e.id);if(C){B.disabled=!1,B.textContent="Salvar",w.textContent="❌ "+C.message,w.style.color="#ef4444";return}if(E&&h&&h.length>=6){w.textContent="⏳ Criando usuário admin…";const q=await oe({email:E,password:h,role:"admin",tenant_id:e.id});q!=null&&q.success?(q!=null&&q.user_id&&!(q!=null&&q.linked)&&await f.from("profiles").update({tenant_id:e.id}).eq("id",q.user_id),w.textContent="✅ Salvo e admin criado!",w.style.color="#22c55e"):(w.textContent="⚠️ Salvo, mas erro ao criar admin: "+((q==null?void 0:q.error)||"Tente novamente"),w.style.color="#f59e0b")}else w.textContent="✅ Imobiliária atualizada!",w.style.color="#22c55e";B.disabled=!1,B.textContent="Salvar",setTimeout(()=>{a(),X()},1200)})}
