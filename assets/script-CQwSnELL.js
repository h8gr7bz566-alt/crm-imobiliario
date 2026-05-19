import{s as v}from"./supabase-BcuJ3xoD.js";let he={},Ae={};async function dt(){const[e,a]=await Promise.all([v.from("settings").select("key,value"),v.from("site_content").select("*")]);e.data&&e.data.forEach(n=>{he[n.key]=n.value}),a.data&&a.data.forEach(n=>{Ae[n.key]=n})}const V=(e,a=null)=>he[e]!==void 0?he[e]:a,Se=(e,a="pt")=>{const n=Ae[e];return n?n[`value_${a}`]??n.value_pt??null:null};async function Q(e){const a=new Date().toISOString(),n=e.map(([i,o])=>({key:i,value:o,updated_at:a})),{error:t}=await v.from("settings").upsert(n,{onConflict:"key"});return t||e.forEach(([i,o])=>{he[i]=o}),!t}async function $e(e,{pt:a,en:n,es:t}){const i={key:e,value_pt:a,value_en:n,value_es:t,updated_at:new Date().toISOString()},{error:o}=await v.from("site_content").upsert(i,{onConflict:"key"});return o||(Ae[e]=i),!o}async function ke(e,a,n){const{error:t}=await v.from("integrations").upsert({key:e,value:a,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!t}function Ne(){const e=document.documentElement,a=V("visual.accent_color","#b8962e"),n=V("visual.primary_bg","#0f1c2e"),t=V("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",a),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",t);const i=V("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(s=>{s.src=i});const o=V("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=o);const d=V("visual.hero_bg_url","");if(d){const s=document.querySelector(".hero");s&&(s.style.backgroundImage=`url('${d}')`)}}function rt(e="pt"){const a=p=>Se(p,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&a("hero.title")&&(n.innerHTML=a("hero.title"));const t=document.querySelector(".hero-content > p");t&&a("hero.subtitle")&&(t.innerHTML=a("hero.subtitle"));const i=document.querySelector(".footer small");i&&a("footer.text")&&(i.innerHTML=a("footer.text"));const o=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),d=document.querySelector('[data-i18n="inst.p3"]');o&&a("inst.bio_p1")&&(o.innerHTML=a("inst.bio_p1")),l&&a("inst.bio_p2")&&(l.innerHTML=a("inst.bio_p2")),d&&a("inst.bio_p3")&&(d.innerHTML=a("inst.bio_p3"));const s=document.querySelector('[data-i18n-num="inst.stat2num"]'),m=document.querySelector('[data-i18n="inst.stat1"]'),c=document.querySelector('[data-i18n="inst.stat2"]'),u=document.querySelector('[data-i18n="inst.stat3"]');s&&a("inst.stat2_num")&&(s.innerHTML=a("inst.stat2_num")),m&&a("inst.stat1_label")&&(m.innerHTML=a("inst.stat1_label")),c&&a("inst.stat2_label")&&(c.innerHTML=a("inst.stat2_label")),u&&a("inst.stat3_label")&&(u.innerHTML=a("inst.stat3_label"));const r=Se("seo.title_pt",e);r&&document.title&&(document.title=r);const f=Se("seo.description_pt",e);if(f){const p=document.querySelector('meta[name="description"]');p&&(p.content=f)}}function ct(e){if(!e)return;const a=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const t=n.getAttribute("href");if(t){const i=t.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=a+i}})}const mt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let K="5547999701743",re=`https://wa.me/${K}`;const Y=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],ut=5.7;function ce(e,a){if(!e)return"—";const n=String(e).trim();let t;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?t=parseFloat(n.replace(/\./g,"").replace(",",".")):t=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(t)||t===0?n:a==="en"?"$ "+(t/ut).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+t.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let k=[],y=null,me=[],et=!1;v.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(et=!0)});async function pt(){const{data:e,error:a}=await v.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):e||[]}async function vt(){const{data:e,error:a}=await v.from("properties").select("*").order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):(k=e||[],Ot(),Ft(),k)}async function gt(e){if(e.id){const{id:a,created_at:n,...t}=e,{error:i}=await v.from("properties").update(t).eq("id",a);if(i)throw i;const o=k.findIndex(l=>l.id===a);o>=0&&(k[o]={...k[o],...t})}else{if(!e.reference){const t=k.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10)),i=t.length?Math.max(...t)+1:1;e.reference="IO-"+String(i).padStart(4,"0")}const{data:a,error:n}=await v.from("properties").insert(e).select();if(n)throw n;a!=null&&a[0]&&k.unshift(a[0])}}async function ft(e){const{error:a}=await v.from("properties").delete().eq("id",e);if(a)throw a;k=k.filter(n=>n.id!==e)}async function yt(e,a){const{error:n}=await v.auth.signInWithPassword({email:e,password:a});return!n}function Le(e,a=1200,n=.78){return new Promise((t,i)=>{const o=new Image,l=URL.createObjectURL(e);o.onload=()=>{URL.revokeObjectURL(l);const d=document.createElement("canvas");let s=o.width,m=o.height;s>a&&(m=Math.round(m*a/s),s=a),d.width=s,d.height=m;const c=d.getContext("2d");c.drawImage(o,0,0,s,m);const u=new Image;u.crossOrigin="anonymous",u.onload=()=>{const r=Math.round(s*.18),f=Math.round(u.naturalHeight*r/u.naturalWidth),p=Math.round(s*.02),g=s-r-p,w=m-f-p;c.globalAlpha=.45,c.drawImage(u,g,w,r,f),c.globalAlpha=1,d.toBlob(h=>h?t(h):i(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.onerror=()=>{d.toBlob(r=>r?t(r):i(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.src="/logo.png"},o.onerror=i,o.src=l})}async function bt(e){const a=await Le(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:t}=await v.storage.from("imoveis").upload(n,a,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(t)throw t;const{data:{publicUrl:i}}=v.storage.from("imoveis").getPublicUrl(n);return i}async function ht(e,a){const n=Array.from(e).filter(i=>i.size>0),t=[];for(let i=0;i<n.length;i++)a&&a(i+1,n.length),t.push(await bt(n[i]));return t}async function ue(){var u,r,f,p,g,w;const e=document.getElementById("vendas-carousel"),a=document.getElementById("properties");if(!e&&!a)return;const n=await pt();k=n,((u=document.getElementById("selecao-carousel"))==null?void 0:u.innerHTML)===""&&Et(n);const t=((r=document.getElementById("city-filter"))==null?void 0:r.value)||"",i=((f=document.getElementById("neighborhood-filter"))==null?void 0:f.value)||"",o=((p=document.getElementById("bedrooms-filter"))==null?void 0:p.value)||"",l=((g=document.getElementById("parking-filter"))==null?void 0:g.value)||"",d=((w=document.getElementById("construction-filter"))==null?void 0:w.value)||"",s=document.getElementById("price-slider"),m=s?parseInt(s.value,10):13e7,c=n.filter(h=>{if(t&&h.city!==t||i&&h.neighborhood!==i||o&&(o==="4+"&&Number(h.bedrooms)<4||o!=="4+"&&Number(h.bedrooms)!==Number(o))||l&&(l==="4+"&&Number(h.parking)<4||l!=="4+"&&Number(h.parking)!==Number(l))||d&&h.construction_status!==d)return!1;const E=String(h.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),B=parseInt(E,10)||0;return!(B<0||B>m)});if(e){if(!c.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=c.map(h=>{var L;const E=h.cover_image||((L=h.images)==null?void 0:L[0])||Y[0],B=[h.neighborhood,h.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${E}" alt="${b(h.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${b(h.title)}</div>
            <div class="selecao-card-loc">${b(B)}</div>
            <div class="selecao-card-price">${b(ce(h.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${h.id}" class="btn-det">Ver Detalhes</a>
              <a href="${re}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!c.length){a.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}a.innerHTML=c.map(h=>{var L;const E=(L=h.images)!=null&&L.length?h.images:Y,B=E.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${B}" data-idx="0" data-pid="${h.id}">
          <img src="${h.cover_image||E[0]}" alt="${b(h.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${B>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${b(h.title)}</strong>
          <div class="muted">${b(h.neighborhood||"")}, ${b(h.city||"")}</div>
          <div><strong>${b(ce(h.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${h.bedrooms||"--"} | 🚗 ${h.parking||"--"} ${B>1?"| 📸 "+B:""}</div>
          <p class="muted">${b((h.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${h.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${re}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(h=>{h.removeEventListener("click",Oe),h.addEventListener("click",Oe)})}function Et(e){var i,o,l;const a=document.getElementById("selecao-carousel");if(!a)return;const n=e.slice(0,6);if(!n.length){(i=a.closest(".selecao-section"))==null||i.classList.add("hidden");return}a.innerHTML=n.map(d=>{var c;const s=d.cover_image||((c=d.images)==null?void 0:c[0])||Y[0],m=[d.neighborhood,d.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${s}" alt="${b(d.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${b(d.title)}</div>
          <div class="selecao-card-loc">${b(m)}</div>
          <div class="selecao-card-price">${b(ce(d.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${d.id}" class="btn-det">Ver Detalhes</a>
            <a href="${re}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const t=a.closest(".selecao-carousel-wrap");(o=t==null?void 0:t.querySelector(".selecao-prev"))==null||o.addEventListener("click",()=>{a.scrollBy({left:-340,behavior:"smooth"})}),(l=t==null?void 0:t.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{a.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const a=document.getElementById("construction-filter");a&&(a.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),ue()};function Oe(e){var d;e.stopPropagation();const a=e.currentTarget.closest(".carousel-wrap");if(!a)return;const n=parseInt(a.dataset.total,10);if(!n)return;let t=parseInt(a.dataset.idx,10)||0;const i=e.currentTarget.classList.contains("carousel-next")?1:-1;t=(t+i+n)%n,a.dataset.idx=t;const o=parseInt(a.dataset.pid,10),l=k.find(s=>s.id===o);(d=l==null?void 0:l.images)!=null&&d.length&&(a.querySelector(".carousel-img").src=l.images[t])}function wt(){const e=document.getElementById("price-slider"),a=document.getElementById("price-label");!e||!a||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",a.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);a.textContent="Até R$ "+n.toLocaleString("pt-BR"),ue()}))}function It(){const e=document.getElementById("city-filter"),a=document.getElementById("neighborhood-filter");if(e&&a){const n=J();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),e.addEventListener("change",()=>{const t=J().find(o=>o.name===e.value),i=t?He(t.id):[];a.innerHTML='<option value="">Todos os bairros</option>'+i.map(o=>`<option value="${o.name}">${b(o.name)}</option>`).join(""),ue()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",ue)})}function pe(e){const a=document.getElementById("admin-properties");if(a){if(!e.length){a.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}a.innerHTML=e.map(n=>{var l;const t=n.cover_image||((l=n.images)==null?void 0:l[0])||Y[0],i=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",o=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${t}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${b(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${b(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+b(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${b(i)}</td>
      <td class="cell-price">${b(ce(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${o}</td>
      <td>
        <div class="action-btns">
          ${(y==null?void 0:y.role)==="admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(y==null?void 0:y.role)==="admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function xt(){const e=document.getElementById("f-city");if(!e)return;const a=J(),n=e.value;e.innerHTML='<option value="">Todas</option>'+a.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),n&&(e.value=n)}function Bt(){var e,a,n,t,i,o,l,d,s,m,c,u,r,f,p;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((a=document.getElementById("f-title"))==null?void 0:a.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((t=document.getElementById("f-city"))==null?void 0:t.value)||"",neighborhood:((i=document.getElementById("f-neighborhood"))==null?void 0:i.value)||"",condominium:(((o=document.getElementById("f-condominium"))==null?void 0:o.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((d=document.getElementById("f-price-max"))==null?void 0:d.value)||1/0,areaMin:parseFloat((s=document.getElementById("f-area-min"))==null?void 0:s.value)||0,areaMax:parseFloat((m=document.getElementById("f-area-max"))==null?void 0:m.value)||1/0,construction:((c=document.getElementById("f-construction"))==null?void 0:c.value)||"",published:((u=document.getElementById("f-published"))==null?void 0:u.value)||"",bedrooms:((r=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:r.dataset.val)||"",suites:((f=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:f.dataset.val)||"",parking:((p=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:p.dataset.val)||""}}function Re(e){const a=Bt();return Object.values(a).some(t=>t!==""&&t!==0&&t!==1/0)?e.filter(t=>{if(a.ref&&!(t.reference||"").toLowerCase().includes(a.ref)||a.title&&!(t.title||"").toLowerCase().includes(a.title)||a.type&&!(t.title||"").toLowerCase().includes(a.type.toLowerCase())||a.city&&t.city!==a.city||a.neighborhood&&t.neighborhood!==a.neighborhood||a.condominium&&!(t.condominium||"").toLowerCase().includes(a.condominium))return!1;const i=parseInt(String(t.price||"").replace(/[^0-9]/g,""),10)||0;if(a.priceMin>0&&i<a.priceMin||a.priceMax<1/0&&i>a.priceMax)return!1;const o=parseFloat(t.area)||0;return!(a.areaMin>0&&o<a.areaMin||a.areaMax<1/0&&o>a.areaMax||a.construction&&t.construction_status!==a.construction||a.published!==""&&String(t.published)!==a.published||a.bedrooms&&(a.bedrooms==="5+"&&Number(t.bedrooms)<5||a.bedrooms!=="5+"&&Number(t.bedrooms)!==Number(a.bedrooms))||a.suites&&(a.suites==="5+"&&Number(t.suites)<5||a.suites!=="5+"&&Number(t.suites)!==Number(a.suites))||a.parking&&(a.parking==="5+"&&Number(t.parking)<5||a.parking!=="5+"&&Number(t.parking)!==Number(a.parking)))}):e}async function Ee(){if(!document.getElementById("admin-properties"))return;const e=await vt(),a=e.length,n=e.filter(l=>l.published===!0).length,t=document.getElementById("stat-total"),i=document.getElementById("stat-published"),o=document.getElementById("stat-leads");t&&(t.textContent=a),i&&(i.textContent=n),o&&(o.textContent="—"),xt(),pe(k)}let R=null,W="";function Ce(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function be(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function we(e){const a=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!a||!n)){if(!e.length){a.style.display="none";return}a.style.display="",n.innerHTML=e.map(t=>`
    <div class="cover-thumb-wrap${t===W?" selected":""}" data-url="${t}">
      <img src="${t}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(t=>{t.addEventListener("click",()=>{W=t.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(i=>i.classList.remove("selected")),t.classList.add("selected")})})}}function _e(){const e=document.getElementById("property-form");if(!e)return;const a=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{n.preventDefault();const t=new FormData(e),i=t.getAll("images");let o=[];const l=i.filter(s=>s.size>0);if(l.length){a.disabled=!0,a.textContent=`Enviando 0/${l.length} foto…`;try{o=await ht(l,(s,m)=>{a.textContent=`Enviando ${s}/${m} foto…`})}catch(s){console.error("Erro no upload:",s),a.disabled=!1,a.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(R){const s=k.find(m=>m.id===R);s!=null&&s.images&&(o=s.images)}o.length||(o=[...Y]);const d={...R?{id:R}:{},title:t.get("title"),rua:t.get("rua")||"",numero:t.get("numero")||"",city:t.get("city"),neighborhood:t.get("neighborhood"),price:t.get("price"),bedrooms:parseInt(t.get("bedrooms"),10)||0,suites:parseInt(t.get("suites"),10)||0,area:parseFloat(t.get("area"))||0,parking:parseInt(t.get("parking"),10)||0,published:t.get("published")==="true",images:o,description:t.get("description")||"",owner_name:t.get("owner_name")||"",owner_phone:t.get("owner_phone")||"",owner_email:t.get("owner_email")||"",owner_notes:t.get("owner_notes")||"",cover_image:W||"",construction_status:t.get("construction_status")||"",condominium:t.get("condominium")||""};try{await gt(d),R=null,a.disabled=!1,a.textContent="Salvar Imóvel",e.reset();const s=document.getElementById("adminPublished");s&&(s.value="true");const m=document.getElementById("adminNeighborhood");m&&(m.innerHTML='<option value="">Selecione a cidade primeiro</option>');const c=document.getElementById("adminConstructionStatus");c&&(c.value=""),W="",we([]),be(),await Ee()}catch(s){console.error(s),a.disabled=!1,a.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert("Erro ao salvar imóvel. Verifique o console.")}}),document.addEventListener("click",async n=>{var t;if(n.target.matches(".del-btn")){const i=Number(n.target.dataset.id);if(!i||!confirm("Remover este imóvel?"))return;try{await ft(i),await Ee()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((y==null?void 0:y.role)!=="admin")return;const i=Number(n.target.dataset.id);if(!i)return;const o=k.find(s=>s.id===i);if(!o)return;R=i,a.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=o.title||"",e.querySelector('[name="rua"]').value=o.rua||"",e.querySelector('[name="numero"]').value=o.numero||"",e.querySelector('[name="city"]').value=o.city||"",e.querySelector('[name="price"]').value=o.price||"",e.querySelector('[name="bedrooms"]').value=o.bedrooms||"",e.querySelector('[name="suites"]').value=o.suites||"",e.querySelector('[name="area"]').value=o.area||"",e.querySelector('[name="parking"]').value=o.parking||"",e.querySelector('[name="description"]').value=o.description||"",e.querySelector('[name="construction_status"]').value=o.construction_status||"",e.querySelector('[name="owner_name"]').value=o.owner_name||"",e.querySelector('[name="owner_phone"]').value=o.owner_phone||"",e.querySelector('[name="owner_email"]').value=o.owner_email||"",e.querySelector('[name="owner_notes"]').value=o.owner_notes||"",e.querySelector('[name="condominium"]').value=o.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=o.published===!0?"true":"false");const d=document.getElementById("adminCitySelect");d&&(d.value=o.city||"",d.dispatchEvent(new Event("change")),setTimeout(()=>{const s=document.getElementById("adminNeighborhood");s&&(s.value=o.neighborhood||"")},50)),W=o.cover_image||((t=o.images)==null?void 0:t[0])||"",we(o.images||[]),Ce("Editar Imóvel")}})}function b(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let O=[],H=0;function Lt(e){var c,u;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const a=document.getElementById("view-status-badge");e.published?(a.textContent="● Publicado",a.className="badge badge-green"):(a.textContent="○ Rascunho",a.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const t=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=t,document.getElementById("view-directions-link").href=t;const i=((c=e.images)==null?void 0:c[0])||Y[0];document.getElementById("view-thumb-preview").src=i,O=(u=e.images)!=null&&u.length?e.images:Y,H=0,Ie(),document.getElementById("view-price").textContent=ce(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const o=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),o&&(o.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(r=>r.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(r=>r.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const d="https://omarcorretor.com.br/property.html?id="+e.id,s=document.getElementById("share-link-input");s&&(s.value=d);const m=document.getElementById("share-panel");m&&(m.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ye(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Ie(){const e=document.getElementById("view-main-img"),a=document.getElementById("view-counter"),n=document.getElementById("view-prev"),t=document.getElementById("view-next"),i=document.getElementById("view-thumbs");e.src=O[H],e.alt=`Foto ${H+1}`;const o=O.length>1;n.style.display=o?"flex":"none",t.style.display=o?"flex":"none",a.textContent=o?`${H+1} / ${O.length}`:"",i.innerHTML=o?O.map((l,d)=>`<img src="${l}" class="view-thumb${d===H?" active":""}" data-i="${d}" alt="Foto ${d+1}">`).join(""):"",i.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{H=+l.dataset.i,Ie()})})}async function Fe(e){const{data:a}=await v.from("profiles").select("*").eq("id",e).maybeSingle();return a}function qe(e){var u,r;const a=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),t=document.getElementById("topnav-name"),i=document.getElementById("topnav-role");if(!t)return;const o=(e==null?void 0:e.name)||"Sem nome",l=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";t.textContent=o,i&&(i.textContent=l),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",a&&(a.style.display="none")):(a&&(a.textContent=((u=o[0])==null?void 0:u.toUpperCase())||"?",a.style.display=""),n&&(n.style.display="none"));const d=document.getElementById("avatar-dd-name"),s=document.getElementById("avatar-dd-role"),m=document.getElementById("avatar-dd-img"),c=document.getElementById("avatar-dd-initial");d&&(d.textContent=o),s&&(s.textContent=l),e!=null&&e.avatar_url&&m?(m.src=e.avatar_url,m.style.display="",c&&(c.style.display="none")):(c&&(c.textContent=((r=o[0])==null?void 0:r.toUpperCase())||"?",c.style.display=""),m&&(m.style.display="none"))}function X(e){var n,t;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(i=>i.classList.remove("active"));const a=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);a&&a.classList.add("active"),document.querySelectorAll(".admin-section").forEach(i=>i.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(t=document.getElementById("topnav-links"))==null||t.classList.remove("open"),G(),e==="contatos"&&Ht(),e==="funil"&&$t(),e==="tarefas"&&_t()}function ze(e){const a=document.getElementById("admin-root");if(a&&(a.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(t=>{t.style.display=""}),Object.entries({empresa:Xt,visual:Vt,"site-config":Gt,"crm-config":Wt,integracoes:Yt,midia:Jt}).forEach(([t,i])=>{const o=document.querySelector(`.topnav-dropdown-item[data-section="${t}"]`)||document.querySelector(`.nav-item[data-section="${t}"]`);o&&o.addEventListener("click",()=>i(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(t=>{t.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>Kt(),{once:!0}),window.lucide&&lucide.createIcons()}}function G(){var e,a;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(a=document.getElementById("notif-dropdown"))==null||a.classList.add("hidden")}function St(){var o,l,d,s,m,c,u,r,f;const e=document.getElementById("topnav-avatar-wrap"),a=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",p=>{var w;p.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||(w=document.getElementById("notif-dropdown"))==null||w.classList.add("hidden")}),(o=document.getElementById("avatar-dd-profile"))==null||o.addEventListener("click",()=>{G(),X("settings")}),(l=document.getElementById("avatar-dd-settings"))==null||l.addEventListener("click",()=>{G(),X("settings")}),(d=document.getElementById("avatar-dd-logout"))==null||d.addEventListener("click",async()=>{await v.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),t=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",p=>{var w;p.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||((w=document.getElementById("avatar-dropdown"))==null||w.classList.add("hidden"),Mt())}),(s=document.getElementById("notif-mark-all"))==null||s.addEventListener("click",()=>{At(),G()}),(m=document.getElementById("btn-search-open"))==null||m.addEventListener("click",()=>{var p,g;(p=document.getElementById("search-overlay"))==null||p.classList.remove("hidden"),(g=document.getElementById("search-input"))==null||g.focus()}),(c=document.getElementById("search-overlay-close"))==null||c.addEventListener("click",()=>{var p;(p=document.getElementById("search-overlay"))==null||p.classList.add("hidden")}),(u=document.getElementById("search-overlay"))==null||u.addEventListener("click",p=>{p.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let i;(r=document.getElementById("search-input"))==null||r.addEventListener("input",p=>{clearTimeout(i),i=setTimeout(()=>Tt(p.target.value.trim()),280)}),(f=document.getElementById("search-input"))==null||f.addEventListener("keydown",p=>{var g;p.key==="Escape"&&((g=document.getElementById("search-overlay"))==null||g.classList.add("hidden"))}),document.addEventListener("click",G)}let Xe=!1,oe=[],tt=[],xe=[],ve=null,ie=null;async function $t(){var t;if(Xe)return;Xe=!0;const[{data:e},{data:a}]=await Promise.all([v.from("crm_pipelines").select("*").order("sort_order"),v.from("crm_stages").select("*").order("sort_order")]);oe=e||[],tt=a||[];const n=document.getElementById("funil-pipe-sel");if(n){n.innerHTML=oe.length?oe.map(o=>`<option value="${o.id}">${b(o.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const i=oe.find(o=>o.is_default)||oe[0];i&&(n.value=i.id,ve=i.id),n.addEventListener("change",async()=>{ve=parseInt(n.value,10),await Ve()})}(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>openLeadModal()),await Ve()}async function Ve(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let a=v.from("leads").select("*").order("created_at",{ascending:!1});(y==null?void 0:y.role)==="corretor"?a=a.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(a=a.eq("tenant_id",y.tenant_id)),ve&&(a=a.eq("pipeline_id",ve));const{data:n}=await a;xe=n||[],at()}function at(){const e=document.getElementById("kanban-board");if(!e)return;const a=tt.filter(t=>t.pipeline_id===ve);if(!a.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n={};a.forEach(t=>{n[t.name]=[]}),xe.forEach(t=>{var o,l,d,s;const i=t.stage||((o=a[0])==null?void 0:o.name);n[i]||(n[((l=a[0])==null?void 0:l.name)||""]=[]),(s=n[i]||n[(d=a[0])==null?void 0:d.name])==null||s.push(t)}),e.innerHTML=a.map(t=>{const i=n[t.name]||[],o=i.length?i.map(l=>`
        <div class="kanban-card" draggable="true" data-id="${l.id}" data-stage="${b(t.name)}">
          <div class="kanban-card-name">${b(l.name||"—")}</div>
          ${l.phone?`<div class="kanban-card-info">📞 ${b(l.phone)}</div>`:""}
          ${l.interest?`<div class="kanban-card-info">🏠 ${b(l.interest)}</div>`:""}
          ${l.budget_max?`<div class="kanban-card-info">💰 R$ ${Number(l.budget_max).toLocaleString("pt-BR")}</div>`:""}
          <div class="kanban-card-tags">
            ${l.source?`<span class="kanban-card-tag">${b(l.source)}</span>`:""}
          </div>
        </div>`).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${b(t.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${t.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${t.color||"#2563eb"}"></div>
            ${b(t.name)}
          </div>
          <span class="kanban-col-count">${i.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${b(t.name)}">${o}</div>
        <button class="kanban-add-btn" data-stage="${b(t.name)}">+ Adicionar lead</button>
      </div>`}).join(""),kt(),window.lucide&&lucide.createIcons()}function kt(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(a=>{a.addEventListener("click",()=>openLeadModal())}),e.querySelectorAll(".kanban-card").forEach(a=>{a.addEventListener("click",()=>{const n=xe.find(t=>String(t.id)===String(a.dataset.id));n&&openLeadModal(n)}),a.addEventListener("dragstart",n=>{ie=a.dataset.id,a.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),a.addEventListener("dragend",()=>a.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(a=>{a.addEventListener("dragover",n=>{n.preventDefault(),a.closest(".kanban-col").classList.add("drag-over")}),a.addEventListener("dragleave",n=>{a.contains(n.relatedTarget)||a.closest(".kanban-col").classList.remove("drag-over")}),a.addEventListener("drop",async n=>{n.preventDefault(),a.closest(".kanban-col").classList.remove("drag-over");const t=a.dataset.stage;if(!ie||!t)return;await v.from("leads").update({stage:t}).eq("id",ie);const i=xe.find(o=>String(o.id)===String(ie));i&&(i.stage=t),ie=null,at()})}))}let A=[],Ge=!1,le="pending";async function _t(){var e;Ge||(Ge=!0,await Ct(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>qt()),document.querySelectorAll(".tarefa-filter-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),a.classList.add("active"),le=a.dataset.filter,ge()})}))}async function Ct(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let a=v.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(y==null?void 0:y.role)==="corretor"?a=a.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(a=a.eq("tenant_id",y.tenant_id));const{data:n,error:t}=await a;if(t){const i=document.getElementById("tarefas-list");i&&(i.innerHTML=`
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
      </div>`);return}A=n||[],ge()}function ge(){const e=document.getElementById("tarefas-list");if(!e)return;let a=A;if(le==="pending"&&(a=A.filter(n=>n.status!=="done")),le==="done"&&(a=A.filter(n=>n.status==="done")),!a.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${le==="done"?"✅":"📋"}</div>
      <p>${le==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}e.innerHTML=a.map(n=>{const t=n.due_date?new Date(n.due_date+"T00:00:00").toLocaleDateString("pt-BR"):"",i=n.due_date&&n.status!=="done"&&new Date(n.due_date)<new Date;return`
      <div class="tarefa-item${n.status==="done"?" done":""}" data-id="${n.id}">
        <input type="checkbox" class="tarefa-check" data-id="${n.id}" ${n.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${b(n.title)}</div>
          <div class="tarefa-meta">
            ${t?`<span style="${i?"color:#ef4444;":""}">📅 ${t}${i?" (atrasada)":""}</span>`:""}
            ${n.description?`<span>${b(n.description.substring(0,60))}${n.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${n.priority||"medium"}">${n.priority==="high"?"Alta":n.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${n.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(n=>{n.addEventListener("change",async()=>{const t=n.dataset.id,i=n.checked?"done":"pending";await v.from("tasks").update({status:i}).eq("id",t);const o=A.find(l=>String(l.id)===t);o&&(o.status=i),ge()})}),e.querySelectorAll(".tarefa-del-btn").forEach(n=>{n.addEventListener("click",async()=>{confirm("Excluir esta tarefa?")&&(await v.from("tasks").delete().eq("id",n.dataset.id),A=A.filter(t=>String(t.id)!==String(n.dataset.id)),ge())})})}function qt(e=null){var o,l,d;const a=document.getElementById("tarefa-modal-root");a&&a.remove();const n=!!e,t=document.createElement("div");t.id="tarefa-modal-root",t.className="modal-backdrop",t.innerHTML=`
    <div class="modal" style="max-width:480px;">
      <div class="modal-header">
        <h3>${n?"Editar Tarefa":"Nova Tarefa"}</h3>
        <button class="modal-close" id="tm-close">✕</button>
      </div>
      <div class="modal-body">
        <form id="tarefa-form" style="display:flex;flex-direction:column;gap:14px;">
          <div class="form-group">
            <label class="form-label">Título *</label>
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${b((e==null?void 0:e.title)||"")}">
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
            <textarea name="description" class="form-control" rows="2" placeholder="Detalhes…">${b((e==null?void 0:e.description)||"")}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="tm-cancel">Cancelar</button>
        <button class="btn-primary" id="tm-save" style="margin:0;">${n?"Salvar":"Criar Tarefa"}</button>
      </div>
    </div>
  `,document.body.appendChild(t);const i=()=>t.remove();(o=document.getElementById("tm-close"))==null||o.addEventListener("click",i),(l=document.getElementById("tm-cancel"))==null||l.addEventListener("click",i),t.addEventListener("click",s=>{s.target===t&&i()}),(d=document.getElementById("tm-save"))==null||d.addEventListener("click",async()=>{var f,p;const s=document.getElementById("tarefa-form");if(!s.checkValidity()){s.reportValidity();return}const m=new FormData(s),c=document.getElementById("tm-save");c.disabled=!0,c.textContent="Salvando…";const u={title:(f=m.get("title"))==null?void 0:f.trim(),description:((p=m.get("description"))==null?void 0:p.trim())||null,due_date:m.get("due_date")||null,priority:m.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null};let r;if(n){if({error:r}=await v.from("tasks").update(u).eq("id",e.id),!r){const g=A.findIndex(w=>String(w.id)===String(e.id));g>=0&&(A[g]={...A[g],...u})}}else{const{data:g,error:w}=await v.from("tasks").insert(u).select();r=w,!r&&(g!=null&&g[0])&&A.unshift(g[0])}if(c.disabled=!1,c.textContent=n?"Salvar":"Criar Tarefa",r){alert("Erro: "+r.message);return}i(),ge()})}async function Tt(e){const a=document.getElementById("search-results");if(!a)return;if(!e||e.length<2){a.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}a.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;y==null||y.role,y==null||y.tenant_id;const[{data:t},{data:i}]=await Promise.all([v.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),v.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),o=[];t!=null&&t.length&&(o.push('<div class="search-group-label">Imóveis</div>'),o.push(...t.map(l=>`
      <div class="search-result-item" data-type="property" data-id="${l.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${b(l.title||"—")}</div>
          <div class="search-result-sub">${b(l.reference||"")} · ${b(l.city||"")}</div>
        </div>
      </div>`))),i!=null&&i.length&&(o.push('<div class="search-group-label">Leads / Contatos</div>'),o.push(...i.map(l=>`
      <div class="search-result-item" data-type="lead" data-id="${l.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${b(l.name||"—")}</div>
          <div class="search-result-sub">${b(l.email||l.phone||"")}</div>
        </div>
      </div>`))),a.innerHTML=o.length?o.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',a.querySelectorAll(".search-result-item").forEach(l=>{l.addEventListener("click",()=>{var d;(d=document.getElementById("search-overlay"))==null||d.classList.add("hidden"),l.dataset.type==="lead"?X("contatos"):X("properties")})})}let U=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function Mt(){var l;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let a=v.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);y!=null&&y.tenant_id&&(a=a.eq("tenant_id",y.tenant_id));const{data:n}=await a,t=n||[],i=t.filter(d=>!U.includes(String(d.id))),o=document.getElementById("notif-badge");if(o&&(o.textContent=i.length,i.length>0?o.classList.remove("hidden"):o.classList.add("hidden")),!t.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=t.map(d=>{const s=Nt(d.created_at);return`
      <div class="notif-item${!U.includes(String(d.id))?" unread":""}" data-id="${d.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${b(d.name||"—")}</div>
          <div class="notif-item-sub">${b(d.phone||d.source||"")} · ${s}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(l=document.getElementById("notif-see-all"))==null||l.addEventListener("click",d=>{d.preventDefault(),G(),X("contatos")}),e.querySelectorAll(".notif-item").forEach(d=>{d.addEventListener("click",()=>{U.push(d.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(U)),d.classList.remove("unread"),G(),X("contatos")})})}function At(){var e;document.querySelectorAll(".notif-item").forEach(a=>U.push(a.dataset.id)),U=[...new Set(U)],localStorage.setItem("crm_notifs_read",JSON.stringify(U)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(a=>a.classList.remove("unread"))}function Nt(e){if(!e)return"";const a=(Date.now()-new Date(e).getTime())/1e3;return a<60?"agora":a<3600?`${Math.floor(a/60)}min atrás`:a<86400?`${Math.floor(a/3600)}h atrás`:`${Math.floor(a/86400)}d atrás`}async function Rt(){let e=v.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);y!=null&&y.tenant_id&&(e=e.eq("tenant_id",y.tenant_id));const{data:a}=await e,t=(a||[]).filter(o=>!U.includes(String(o.id))),i=document.getElementById("notif-badge");i&&(i.textContent=t.length,t.length>0?i.classList.remove("hidden"):i.classList.add("hidden"))}let F=[],M=1;const se=10;let We=!1;async function Ht(){var a,n,t,i,o,l,d,s,m;document.getElementById("section-contatos")&&(We||(We=!0,await nt(),(a=document.getElementById("btn-contato-search"))==null||a.addEventListener("click",()=>{M=1,ee()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",c=>{c.key==="Enter"&&(M=1,ee())}),(t=document.getElementById("btn-novo-contato"))==null||t.addEventListener("click",()=>ot()),(i=document.getElementById("btn-import-contato"))==null||i.addEventListener("click",Pt),(o=document.getElementById("import-modal-close"))==null||o.addEventListener("click",Te),(l=document.getElementById("import-modal-cancel"))==null||l.addEventListener("click",Te),(d=document.getElementById("download-template"))==null||d.addEventListener("click",c=>{c.preventDefault();const u=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,r=new Blob([u],{type:"text/csv"}),f=document.createElement("a");f.href=URL.createObjectURL(r),f.download="modelo_contatos.csv",f.click()}),(s=document.getElementById("import-csv-file"))==null||s.addEventListener("change",jt),(m=document.getElementById("import-modal-confirm"))==null||m.addEventListener("click",Ut)))}async function nt(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let a=v.from("leads").select("*").order("created_at",{ascending:!1});(y==null?void 0:y.role)==="corretor"?a=a.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(a=a.eq("tenant_id",y.tenant_id));const{data:t}=await a;F=t||[],ee()}function ee(){var d,s,m;const e=(((d=document.getElementById("contato-search"))==null?void 0:d.value)||"").toLowerCase(),a=e?F.filter(c=>(c.name||"").toLowerCase().includes(e)||(c.email||"").toLowerCase().includes(e)||(c.phone||"").toLowerCase().includes(e)):F,n=a.length,t=Math.max(1,Math.ceil(n/se));M>t&&(M=t);const i=a.slice((M-1)*se,M*se),o=document.getElementById("contatos-tbody");if(!o)return;i.length?o.innerHTML=i.map(c=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${c.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${c.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${b(c.name||"—")}</a>
        </td>
        <td>${b(c.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${c.email?b(c.email):"—"}</td>
        <td style="font-size:13px;">${c.phone?b(c.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${b(c.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${c.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):o.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const l=document.getElementById("contatos-pagination");if(l){const c=n===0?0:(M-1)*se+1,u=Math.min(M*se,n);l.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${c}–${u}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${M<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${M} / ${t}</span>
          <button class="btn-cancel" id="pag-next" ${M>=t?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(s=l.querySelector("#pag-prev"))==null||s.addEventListener("click",()=>{M--,ee()}),(m=l.querySelector("#pag-next"))==null||m.addEventListener("click",()=>{M++,ee()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(c=>{c.addEventListener("click",u=>{u.preventDefault();const r=c.dataset.id,f=F.find(p=>String(p.id)===String(r));f&&ot(f)})})}function ot(e=null){var o,l,d;const a=document.getElementById("contato-modal-root");a&&a.remove();const n=!!e,t=document.createElement("div");t.id="contato-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t);const i=()=>t.remove();(o=document.getElementById("cm-close"))==null||o.addEventListener("click",i),(l=document.getElementById("cm-cancel"))==null||l.addEventListener("click",i),t.addEventListener("click",s=>{s.target===t&&i()}),(d=document.getElementById("cm-save"))==null||d.addEventListener("click",async()=>{var f,p,g,w,h,E,B;const s=document.getElementById("contato-form");if(!s.checkValidity()){s.reportValidity();return}const m=new FormData(s),c=document.getElementById("cm-save");c.disabled=!0,c.textContent="Salvando…";const u={name:(f=m.get("name"))==null?void 0:f.trim(),company:((p=m.get("company"))==null?void 0:p.trim())||null,email:((g=m.get("email"))==null?void 0:g.trim())||null,phone:((w=m.get("phone"))==null?void 0:w.trim())||null,job_title:((h=m.get("job_title"))==null?void 0:h.trim())||null,city_interest:((E=m.get("city_interest"))==null?void 0:E.trim())||null,notes:((B=m.get("notes"))==null?void 0:B.trim())||null,stage:(e==null?void 0:e.stage)||"novo",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null,source:"manual"};let r;if(n){if({error:r}=await v.from("leads").update(u).eq("id",e.id),!r){const L=F.findIndex(C=>String(C.id)===String(e.id));L>=0&&(F[L]={...F[L],...u})}}else{const{data:L,error:C}=await v.from("leads").insert(u).select();r=C,!r&&(L!=null&&L[0])&&F.unshift(L[0])}if(c.disabled=!1,c.textContent=n?"Salvar":"Criar Contato",r){alert("Erro: "+r.message);return}i(),ee()})}let Z=[];function jt(e){const a=e.target.files[0];if(!a)return;const n=new FileReader;n.onload=t=>{Z=t.target.result.split(`
`).filter(d=>d.trim()).slice(1).map(d=>{const[s,m,c,u,r]=d.split(",").map(f=>f.trim().replace(/^"|"$/g,""));return{name:s,email:m,phone:c,company:u,job_title:r}}).filter(d=>d.name);const o=document.getElementById("import-preview");o&&(o.textContent=`${Z.length} contato(s) encontrados para importar.`);const l=document.getElementById("import-modal-confirm");l&&(l.disabled=Z.length===0)},n.readAsText(a)}async function Ut(){if(!Z.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const a=Z.map(t=>({...t,stage:"novo",source:"importado",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null})),{error:n}=await v.from("leads").insert(a);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Te(),await nt(),alert(`${a.length} contato(s) importados com sucesso!`)}function Pt(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),Z=[];const a=document.getElementById("import-preview");a&&(a.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const t=document.getElementById("import-csv-file");t&&(t.value="")}function Te(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const Dt="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function fe(e){return(await fetch(Dt,{method:"POST",headers:{Authorization:`Bearer ${mt}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function Ye(e){var s,m,c,u;const a=document.getElementById("settings-name"),n=document.getElementById("settings-email"),t=document.getElementById("settings-avatar-preview"),i=document.getElementById("settings-avatar-initial"),o=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!a)return;if(a.value=(e==null?void 0:e.name)||"",n){const{data:{user:r}}=await v.auth.getUser();n.value=(r==null?void 0:r.email)||""}const d=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(i&&(i.textContent=d),e!=null&&e.avatar_url&&t&&(t.src=e.avatar_url,t.style.display="",i&&(i.style.display="none")),o==null||o.addEventListener("change",r=>{const f=r.target.files[0];if(!f)return;const p=URL.createObjectURL(f);t&&(t.src=p,t.style.display=""),i&&(i.style.display="none")}),(s=document.getElementById("btn-change-password"))==null||s.addEventListener("click",async()=>{var h,E;const r=((h=document.getElementById("change-password-new"))==null?void 0:h.value)||"",f=((E=document.getElementById("change-password-confirm"))==null?void 0:E.value)||"",p=document.getElementById("change-password-msg"),g=document.getElementById("btn-change-password");if(p&&(p.style.display="none"),r.length<6){p&&(p.textContent="Mínimo 6 caracteres.",p.style.display="");return}if(r!==f){p&&(p.textContent="As senhas não coincidem.",p.style.display="");return}g&&(g.disabled=!0,g.textContent="Salvando…");const{error:w}=await v.auth.updateUser({password:r});g&&(g.disabled=!1,g.textContent="Salvar Nova Senha"),w?p&&(p.textContent="Erro: "+w.message,p.style.display=""):(p&&(p.style.color="#16a34a",p.textContent="Senha alterada com sucesso!",p.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var E;const r=a.value.trim();let f=(y==null?void 0:y.avatar_url)||"";const p=o==null?void 0:o.files[0],g=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",p)try{const B=await Le(p,400,.85),L=`avatars/${y.id}-${Date.now()}.jpg`,{error:C}=await v.storage.from("imoveis").upload(L,B,{contentType:"image/jpeg",upsert:!0});if(!C){const{data:{publicUrl:I}}=v.storage.from("imoveis").getPublicUrl(L);f=I}}catch(B){console.error("Avatar upload:",B)}const{error:w}=await v.from("profiles").update({name:r,avatar_url:f}).eq("id",y.id);if(l.disabled=!1,l.textContent=g,w){alert("Erro ao salvar perfil.");return}y={...y,name:r,avatar_url:f},qe(y);const h=document.getElementById("settings-avatar-initial");h&&(h.textContent=((E=r[0])==null?void 0:E.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"){const r=document.getElementById("settings-corretores-section");r&&(r.style.display=""),await Be(),(m=document.getElementById("btn-invite-corretor"))==null||m.addEventListener("click",async()=>{var h,E;const p=(h=document.getElementById("invite-email"))==null?void 0:h.value.trim(),g=(E=document.getElementById("invite-password"))==null?void 0:E.value.trim(),w=document.getElementById("btn-invite-corretor");if(!p){alert("Informe o e-mail do corretor.");return}if(!g||g.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}w&&(w.disabled=!0,w.textContent="Criando…");try{const B=await fe({email:p,password:g});if(B.success){alert("Acesso criado! O corretor receberá um e-mail com o login e a senha que você definiu.");const L=document.getElementById("invite-email"),C=document.getElementById("invite-password");L&&(L.value=""),C&&(C.value=""),await Be()}else alert("Erro: "+(B.error||"Falha desconhecida"))}catch(B){alert("Erro ao criar acesso: "+B.message)}finally{w&&(w.disabled=!1,w.textContent="+ Criar Acesso")}});const f=document.getElementById("settings-locations-section");f&&(f.style.display=""),await de(),(c=document.getElementById("loc-add-city-btn"))==null||c.addEventListener("click",async()=>{const p=document.getElementById("loc-new-city"),g=p==null?void 0:p.value.trim();if(!g)return;const{error:w}=await v.from("locations").insert({type:"cidade",name:g});if(w){alert("Erro ao adicionar cidade.");return}p&&(p.value=""),await de(),je()}),(u=document.getElementById("loc-add-neighborhood-btn"))==null||u.addEventListener("click",async()=>{var E;const p=parseInt((E=document.getElementById("loc-new-neighborhood-city"))==null?void 0:E.value,10),g=document.getElementById("loc-new-neighborhood"),w=g==null?void 0:g.value.trim();if(!p||!w){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:h}=await v.from("locations").insert({type:"bairro",name:w,parent_id:p});if(h){alert("Erro ao adicionar bairro.");return}g&&(g.value=""),await de()})}}async function Be(){const e=document.getElementById("corretores-list");if(!e)return;const{data:a,error:n}=await v.from("profiles").select("*").order("created_at");if(n||!a){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=a.map(t=>{const i=(t.name||"?")[0].toUpperCase(),o=t.avatar_url?`<img src="${t.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${b(i)}</div>`,l=t.id===(y==null?void 0:y.id),d=t.active!==!1,s=d?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',m=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${t.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${t.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${t.role==="admin"?" selected":""}>Admin</option>
         </select>`,c=l?"":d?`<button class="corretor-toggle-btn" data-uid="${t.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${t.id}" data-active="false">Liberar acesso</button>`,u=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${t.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${o}
        <div>
          <div class="corretor-name">${b(t.name||"—")}</div>
          <div class="corretor-role-badge">${t.role==="super_admin"?"⚡ Super Admin":t.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${s}
        ${m}
        ${c}
        ${u}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(t=>{t.addEventListener("change",async()=>{await v.from("profiles").update({role:t.value}).eq("id",t.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(t=>{t.addEventListener("click",async()=>{const i=t.dataset.uid,o=t.dataset.active==="true";t.disabled=!0,t.textContent="Aguarde…";try{const l=await fe({action:"toggle",userId:i,active:!o});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await Be()})}),e.querySelectorAll(".corretor-del-btn").forEach(t=>{t.addEventListener("click",async()=>{var l,d;const i=t.dataset.uid,o=((d=(l=t.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:d.textContent)||"este corretor";if(confirm(`Excluir "${o}"? Esta ação não pode ser desfeita.`)){t.disabled=!0;try{const s=await fe({action:"delete",userId:i});s.success||alert("Erro ao excluir: "+(s.error||"Falha desconhecida"))}catch(s){alert("Erro: "+s.message)}await Be()}})})}async function it(){const{data:e,error:a}=await v.from("locations").select("*").order("name");return a?(console.error("loadLocations:",a),[]):(me=e||[],me)}function J(){return me.filter(e=>e.type==="cidade")}function He(e){return me.filter(a=>a.type==="bairro"&&a.parent_id===e)}function je(){const e=document.getElementById("adminCitySelect");if(!e)return;const a=e.value,n=J();e.innerHTML='<option value="">Selecione</option>'+n.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),a&&(e.value=a)}async function de(){await it();const e=J(),a=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),t=document.getElementById("loc-new-neighborhood-city");if(!a||!n)return;a.innerHTML=e.length?e.map(o=>`
        <div class="loc-item">
          <span class="loc-item-name">${b(o.name)}</span>
          <button class="loc-del-btn" data-id="${o.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const i=me.filter(o=>o.type==="bairro");n.innerHTML=i.length?i.map(o=>{const l=e.find(d=>d.id===o.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${b(o.name)}</div>
              ${l?`<div class="loc-item-sub">${b(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${o.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',t&&(t.innerHTML='<option value="">Cidade…</option>'+e.map(o=>`<option value="${o.id}">${b(o.name)}</option>`).join("")),a.querySelectorAll(".loc-del-btn").forEach(o=>{o.addEventListener("click",async()=>{const l=o.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:d}=await v.from("locations").delete().eq("id",o.dataset.id);if(d){alert("Erro ao excluir.");return}await de(),je()})}),n.querySelectorAll(".loc-del-btn").forEach(o=>{o.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await v.from("locations").delete().eq("id",o.dataset.id);if(l){alert("Erro ao excluir.");return}await de()})})}function Je(){var n,t,i,o,l,d,s,m,c,u,r,f,p,g,w,h,E,B,L,C;document.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{const x=I.closest(".filter-btns"),S=I.classList.contains("active");x.querySelectorAll(".filter-btn").forEach($=>$.classList.remove("active")),S||I.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var _;const I=(_=document.getElementById("f-city"))==null?void 0:_.value,x=J().find(q=>q.name===I),S=x?He(x.id):[],$=document.getElementById("f-neighborhood");$&&($.innerHTML='<option value="">Todos</option>'+S.map(q=>`<option value="${q.name}">${b(q.name)}</option>`).join(""))}),(t=document.getElementById("f-search-btn"))==null||t.addEventListener("click",()=>{pe(Re(k))}),(i=document.getElementById("f-clear-btn"))==null||i.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach($=>{const _=document.getElementById($);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach($=>{const _=document.getElementById($);_&&(_.value="")});const S=document.getElementById("f-neighborhood");S&&(S.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach($=>$.classList.remove("active")),pe(k)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{X(I.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{X(I.dataset.section)})});const e=document.getElementById("topnav-links"),a=document.getElementById("topnav-hamburger");a==null||a.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),(o=document.getElementById("modal-close"))==null||o.addEventListener("click",be),(l=document.getElementById("modal-cancel"))==null||l.addEventListener("click",be),(d=document.getElementById("property-modal"))==null||d.addEventListener("click",I=>{I.target.id==="property-modal"&&be()}),(s=document.getElementById("btn-new-property"))==null||s.addEventListener("click",()=>{R=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",W="",we([]),Ce("Novo Imóvel")}),(m=document.getElementById("logout-btn"))==null||m.addEventListener("click",async()=>{await v.auth.signOut(),location.reload()}),(c=document.getElementById("view-prev"))==null||c.addEventListener("click",()=>{H=(H-1+O.length)%O.length,Ie()}),(u=document.getElementById("view-next"))==null||u.addEventListener("click",()=>{H=(H+1)%O.length,Ie()}),(r=document.getElementById("view-modal-close"))==null||r.addEventListener("click",ye),(f=document.getElementById("view-modal-close2"))==null||f.addEventListener("click",ye),(p=document.getElementById("view-modal"))==null||p.addEventListener("click",I=>{I.target.id==="view-modal"&&ye()}),(g=document.getElementById("view-modal-share"))==null||g.addEventListener("click",()=>{const I=document.getElementById("share-panel");if(!I)return;const x=I.style.display!=="none";I.style.display=x?"none":"block"}),(w=document.getElementById("share-whatsapp"))==null||w.addEventListener("click",()=>{var $,_;const I=($=document.getElementById("share-link-input"))==null?void 0:$.value;if(!I)return;const x=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",S=encodeURIComponent("Olha esse imóvel que encontrei: "+x+`
`+I);window.open("https://wa.me/?text="+S,"_blank")}),(h=document.getElementById("share-instagram"))==null||h.addEventListener("click",()=>{var x,S;const I=(x=document.getElementById("share-link-input"))==null?void 0:x.value;I&&((S=navigator.clipboard)==null||S.writeText(I),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(E=document.getElementById("share-email"))==null||E.addEventListener("click",()=>{var _,q;const I=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!I)return;const x=((q=document.getElementById("view-modal-title"))==null?void 0:q.textContent)||"Imóvel",S=encodeURIComponent("Imóvel: "+x),$=encodeURIComponent(`Olá! Segue o link do imóvel:

`+I);window.open("mailto:?subject="+S+"&body="+$,"_blank")}),(B=document.getElementById("share-copy"))==null||B.addEventListener("click",()=>{var x;const I=document.getElementById("share-link-input");I&&((x=navigator.clipboard)==null||x.writeText(I.value).then(()=>{const S=document.getElementById("share-copy"),$=S.textContent;S.textContent="✅ Copiado!",setTimeout(()=>{S.textContent=$},2e3)}))}),(L=document.getElementById("view-modal-edit"))==null||L.addEventListener("click",()=>{var P;if((y==null?void 0:y.role)!=="admin")return;const I=document.getElementById("view-modal-title").textContent,x=k.find(N=>N.title===I);if(!x)return;ye(),R=x.id;const S=document.getElementById("property-form"),$=document.getElementById("form-submit-btn");$.textContent="Salvar Alterações",S.querySelector('[name="title"]').value=x.title||"",S.querySelector('[name="rua"]').value=x.rua||"",S.querySelector('[name="numero"]').value=x.numero||"",S.querySelector('[name="city"]').value=x.city||"",S.querySelector('[name="price"]').value=x.price||"",S.querySelector('[name="bedrooms"]').value=x.bedrooms||"",S.querySelector('[name="suites"]').value=x.suites||"",S.querySelector('[name="parking"]').value=x.parking||"",S.querySelector('[name="description"]').value=x.description||"",S.querySelector('[name="construction_status"]').value=x.construction_status||"",S.querySelector('[name="owner_name"]').value=x.owner_name||"",S.querySelector('[name="owner_phone"]').value=x.owner_phone||"",S.querySelector('[name="owner_email"]').value=x.owner_email||"",S.querySelector('[name="owner_notes"]').value=x.owner_notes||"",S.querySelector('[name="condominium"]').value=x.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=x.published===!0?"true":"false");const q=document.getElementById("adminCitySelect");q&&(q.value=x.city||"",q.dispatchEvent(new Event("change")),setTimeout(()=>{const N=document.getElementById("adminNeighborhood");N&&(N.value=x.neighborhood||"")},50)),W=x.cover_image||((P=x.images)==null?void 0:P[0])||"",we(x.images||[]),Ce("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(I=>{I.addEventListener("click",()=>{var x;document.querySelectorAll(".tab-btn").forEach(S=>S.classList.remove("active")),I.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(S=>S.classList.add("hidden")),(x=document.getElementById(`tab-${I.dataset.tab}`))==null||x.classList.remove("hidden")})}),(C=document.getElementById("admin-properties"))==null||C.addEventListener("click",I=>{if(I.target.closest(".action-btns"))return;const x=I.target.closest("tr");if(!x)return;const S=Number(x.dataset.id);if(!S)return;const $=k.find(_=>_.id===S);$&&Lt($)})}document.addEventListener("DOMContentLoaded",async()=>{var o,l,d;await Promise.all([dt(),it()]),K=V("company.whatsapp",K),re=`https://wa.me/${K}`,Ne(),wt(),It();const e=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");e&&a&&(je(),e.addEventListener("change",()=>{const s=J().find(c=>c.name===e.value),m=s?He(s.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+m.map(c=>`<option value="${c.name}">${b(c.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),t=document.getElementById("admin-root");if(n){const s=new URLSearchParams(window.location.hash.replace("#","")),m=new URLSearchParams(window.location.search),c=s.get("type")||m.get("type")||"",u=et||c==="recovery"||c==="invite"||window.location.hash.includes("access_token")||m.has("code"),r=document.getElementById("password-reset-overlay");if(u){n.style.display="none",t&&t.classList.add("hidden"),r&&(r.style.display="flex"),(o=document.getElementById("password-reset-form"))==null||o.addEventListener("submit",async p=>{var L,C;p.preventDefault();const g=((L=document.getElementById("new-password"))==null?void 0:L.value)||"",w=((C=document.getElementById("confirm-password"))==null?void 0:C.value)||"",h=document.getElementById("password-reset-msg"),E=p.target.querySelector('button[type="submit"]');if(h&&(h.style.display="none"),g!==w){h&&(h.textContent="As senhas não coincidem.",h.style.display="");return}E&&(E.disabled=!0,E.textContent="Salvando…");const{error:B}=await v.auth.updateUser({password:g});if(B){h&&(h.textContent="Erro: "+B.message,h.style.display=""),E&&(E.disabled=!1,E.textContent="Definir Senha");return}window.location.href=window.location.pathname}),m.has("code")&&await v.auth.exchangeCodeForSession(m.get("code")??"");return}const{data:{session:f}}=await v.auth.getSession();if(f){if(n.classList.add("hidden"),t&&t.classList.remove("hidden"),await Ee(),_e(),Je(),St(),window.lucide&&lucide.createIcons(),y=await Fe(f.user.id),!y){await v.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden");return}if(y.active===!1){await v.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(y.needs_password_reset){n.style.display="none",t&&t.classList.add("hidden");const p=document.getElementById("password-reset-overlay");p&&(p.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async g=>{var C,I;g.preventDefault();const w=((C=document.getElementById("new-password"))==null?void 0:C.value)||"",h=((I=document.getElementById("confirm-password"))==null?void 0:I.value)||"",E=document.getElementById("password-reset-msg"),B=g.target.querySelector('button[type="submit"]');if(E&&(E.style.display="none"),w!==h){E&&(E.textContent="As senhas não coincidem.",E.style.display="");return}if(w.length<6){E&&(E.textContent="Mínimo 6 caracteres.",E.style.display="");return}B&&(B.disabled=!0,B.textContent="Salvando…");const{error:L}=await v.auth.updateUser({password:w});if(L){E&&(E.textContent="Erro: "+L.message,E.style.display=""),B&&(B.disabled=!1,B.textContent="Definir Senha");return}await v.from("profiles").update({needs_password_reset:!1}).eq("id",y.id),window.location.href=window.location.pathname});return}qe(y),ze(y.role),await Ye(y),window.lucide&&lucide.createIcons(),Rt()}else{t&&t.classList.add("hidden"),n.classList.remove("hidden");const p=document.getElementById("login-form");p&&((d=document.getElementById("forgot-password-btn"))==null||d.addEventListener("click",async()=>{var h,E;const g=(E=(h=p.querySelector('input[name="email"]'))==null?void 0:h.value)==null?void 0:E.trim();if(!g){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:w}=await v.auth.resetPasswordForEmail(g,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(w?"Erro: "+w.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),p.addEventListener("submit",async g=>{g.preventDefault();const w=new FormData(p),h=w.get("email"),E=w.get("password");if(await yt(h,E)){n.classList.add("hidden"),t&&t.classList.remove("hidden"),await Ee(),_e(),Je(),window.lucide&&lucide.createIcons();const{data:{session:L}}=await v.auth.getSession();if(y=L?await Fe(L.user.id):null,!y){await v.auth.signOut();return}if(y.active===!1){await v.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}qe(y),ze(y.role),await Ye(y),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else _e();await ue();const i=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();rt(i),ct(K)});async function Ot(){const e=k.filter(i=>!i.reference);if(!e.length)return;const a=k.map(i=>i.reference||"").filter(i=>/^IO-\d+$/.test(i)).map(i=>parseInt(i.replace("IO-",""),10));let n=a.length?Math.max(...a)+1:1;const t=[...e].sort((i,o)=>i.id-o.id);for(const i of t){const o="IO-"+String(n).padStart(4,"0"),{error:l}=await v.from("properties").update({reference:o}).eq("id",i.id);if(!l){const d=k.findIndex(s=>s.id===i.id);d>=0&&(k[d].reference=o),n++}}pe(Re(k))}async function Ft(){const e=k.filter(a=>{var n;return(n=a.images)==null?void 0:n.some(t=>!t.includes("/wm-"))});if(e.length){for(const a of e){if(!a.images.some(o=>!o.includes("/wm-")))continue;const t=[];let i=!1;for(const o of a.images)if(o.includes("/wm-"))t.push(o);else try{const l=await zt(o);t.push(l),i=!0}catch{t.push(o)}if(i){await v.from("properties").update({images:t}).eq("id",a.id);const o=k.findIndex(l=>l.id===a.id);o>=0&&(k[o].images=t)}}pe(Re(k))}}async function zt(e){try{const a=await fetch(e);if(!a.ok)return e;const n=await a.blob(),t=URL.createObjectURL(n),i=await fetch("/logo.png"),o=i.ok?await i.blob():null,l=o?URL.createObjectURL(o):null;return new Promise(d=>{const s=new Image;s.onload=()=>{URL.revokeObjectURL(t);const m=document.createElement("canvas"),c=1200;let u=s.width,r=s.height;u>c&&(r=Math.round(r*c/u),u=c),m.width=u,m.height=r;const f=m.getContext("2d");f.drawImage(s,0,0,u,r);const p=g=>{if(g){const w=Math.round(u*.18),h=Math.round(g.naturalHeight*w/g.naturalWidth),E=Math.round(u*.02);f.globalAlpha=.45,f.drawImage(g,u-w-E,r-h-E,w,h),f.globalAlpha=1}m.toBlob(async w=>{try{const h=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:E}=await v.storage.from("imoveis").upload(h,w,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(E){console.error("Upload watermark error:",E),d(e);return}const{data:{publicUrl:B}}=v.storage.from("imoveis").getPublicUrl(h);d(B)}catch(h){console.error("Watermark upload exception:",h),d(e)}},"image/jpeg",.82)};if(l){const g=new Image;g.onload=()=>{URL.revokeObjectURL(l),p(g)},g.onerror=()=>{URL.revokeObjectURL(l),p(null)},g.src=l}else p(null)},s.onerror=()=>{URL.revokeObjectURL(t),d(e)},s.src=t})}catch(a){return console.error("applyWatermarkToUrl error:",a),e}}function j(e,a){e&&(e.textContent=a?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(a?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function Ue(e,a="assets"){const n=await Le(e,1200,.85),t=`${a}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:i}=await v.storage.from("imoveis").upload(t,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(i)throw i;const{data:{publicUrl:o}}=v.storage.from("imoveis").getPublicUrl(t);return o}async function Xt(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("settings").select("key,value"),n={};a==null||a.forEach(i=>{n[i.key]=i.value||""});const t=i=>b(String(n[i]||""));e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Empresa</div><div class="section-sub">Identidade, contatos e redes sociais</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏢</span> Identidade</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nome da Empresa</label>
          <input id="co-name" class="form-control" value="${t("company.name")}" placeholder="Nome completo">
        </div>
        <div class="form-group">
          <label class="form-label">CRECI</label>
          <input id="co-creci" class="form-control" value="${t("company.creci")}" placeholder="Ex: 69965F">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:12px">
        <label class="form-label">Logo</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="co-logo-url" class="form-control" value="${t("company.logo_url")}" placeholder="/logo.png ou https://...">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="co-logo-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <div class="logo-preview-box" style="margin-top:10px">
          <img id="co-logo-preview" src="${t("company.logo_url")||"/logo.png"}" alt="Preview">
          <span style="font-size:12px;color:#9ca3af">Preview do logotipo</span>
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Favicon (URL)</label>
        <input id="co-favicon-url" class="form-control" value="${t("company.favicon_url")}" placeholder="/favicon.ico">
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
          <input id="co-whatsapp" class="form-control" value="${t("company.whatsapp")}" placeholder="5547999701743">
        </div>
        <div class="form-group">
          <label class="form-label">Telefone (exibição)</label>
          <input id="co-phone" class="form-control" value="${t("company.phone")}" placeholder="(47) 99970-1743">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">E-mail</label>
          <input id="co-email" type="email" class="form-control" value="${t("company.email")}" placeholder="contato@empresa.com">
        </div>
        <div class="form-group">
          <label class="form-label">Endereço (resumido)</label>
          <input id="co-address" class="form-control" value="${t("company.address")}" placeholder="Cidade, UF">
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
          <input id="co-instagram" class="form-control" value="${t("company.instagram_url")}" placeholder="https://instagram.com/...">
        </div>
        <div class="form-group">
          <label class="form-label">Facebook</label>
          <input id="co-facebook" class="form-control" value="${t("company.facebook_url")}" placeholder="https://facebook.com/...">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">YouTube</label>
          <input id="co-youtube" class="form-control" value="${t("company.youtube_url")}" placeholder="https://youtube.com/...">
        </div>
        <div class="form-group">
          <label class="form-label">TikTok</label>
          <input id="co-tiktok" class="form-control" value="${t("company.tiktok_url")}" placeholder="https://tiktok.com/@...">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">LinkedIn</label>
        <input id="co-linkedin" class="form-control" value="${t("company.linkedin_url")}" placeholder="https://linkedin.com/in/...">
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="co-save-social">Salvar Redes Sociais</button>
        <span id="co-social-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `,document.getElementById("co-logo-url").addEventListener("input",i=>{document.getElementById("co-logo-preview").src=i.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async i=>{const o=i.target.files[0];if(o)try{const l=await Ue(o,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const i=document.getElementById("co-save-identity");i.disabled=!0,i.textContent="Salvando…";const o=await Q([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);o&&Ne(),i.disabled=!1,i.textContent="Salvar Identidade",j(document.getElementById("co-identity-msg"),o)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const i=document.getElementById("co-save-contacts");i.disabled=!0,i.textContent="Salvando…";const o=document.getElementById("co-whatsapp").value.trim(),l=await Q([["company.whatsapp",o],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&o&&(K=o,re=`https://wa.me/${o}`),i.disabled=!1,i.textContent="Salvar Contatos",j(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const i=document.getElementById("co-save-social");i.disabled=!0,i.textContent="Salvando…";const o=await Q([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);i.disabled=!1,i.textContent="Salvar Redes Sociais",j(document.getElementById("co-social-msg"),o)})}async function Vt(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("settings").select("key,value"),n={};a==null||a.forEach(c=>{n[c.key]=c.value||""});const t=n["visual.accent_color"]||"#b8962e",i=n["visual.primary_bg"]||"#0f1c2e",o=n["visual.secondary_bg"]||"#1a2f4a",l=n["visual.hero_bg_url"]||"",d=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input type="color" id="col-accent" value="${t}">
          <input type="text"  id="col-accent-hex" value="${t}" maxlength="7" placeholder="#b8962e">
        </div>
      </div>
      <div class="color-row">
        <label class="form-label">Fundo Principal (Site Público)</label>
        <div class="color-swatch">
          <input type="color" id="col-primary" value="${i}">
          <input type="text"  id="col-primary-hex" value="${i}" maxlength="7">
        </div>
      </div>
      <div class="color-row">
        <label class="form-label">Fundo Secundário (Seções)</label>
        <div class="color-swatch">
          <input type="color" id="col-secondary" value="${o}">
          <input type="text"  id="col-secondary-hex" value="${o}" maxlength="7">
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
  `;function s(c,u,r){const f=document.getElementById(c),p=document.getElementById(u);f==null||f.addEventListener("input",g=>{p.value=g.target.value,r()}),p==null||p.addEventListener("input",g=>{/^#[0-9a-fA-F]{6}$/.test(g.target.value)&&(f.value=g.target.value,r())})}function m(){var u,r,f,p;const c=((u=document.getElementById("col-accent-hex"))==null?void 0:u.value)||"#b8962e";(r=document.getElementById("vp-bar"))==null||r.style.setProperty("background",c),(f=document.getElementById("vp-dot"))==null||f.style.setProperty("background",c),(p=document.getElementById("vp-btn"))==null||p.style.setProperty("background",c),document.documentElement.style.setProperty("--accent",c)}s("col-accent","col-accent-hex",m),s("col-primary","col-primary-hex",()=>{}),s("col-secondary","col-secondary-hex",()=>{}),m(),document.getElementById("vis-hero-file").addEventListener("change",async c=>{const u=c.target.files[0];if(u)try{const r=await Ue(u,"hero");document.getElementById("vis-hero-url").value=r;const f=document.getElementById("vis-hero-preview");f.innerHTML=`<img src="${r}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,f.style.display=""}catch(r){alert("Erro no upload: "+r.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const c=document.getElementById("visual-save-colors");c.disabled=!0,c.textContent="Salvando…";const u=await Q([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);u&&Ne(),c.disabled=!1,c.textContent="Salvar Cores",j(document.getElementById("visual-colors-msg"),u)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",m())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const c=document.getElementById("visual-save-images");c.disabled=!0,c.textContent="Salvando…";const u=await Q([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);c.disabled=!1,c.textContent="Salvar Imagens",j(document.getElementById("visual-images-msg"),u)})}async function Gt(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("site_content").select("*"),n={};a==null||a.forEach(s=>{n[s.key]=s});const t=(s,m)=>{var c;return b(((c=n[s])==null?void 0:c[`value_${m}`])||"")},i=["pt","en","es"],o={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=s=>i.map(m=>`<button class="content-tab${m===s?" active":""}" data-lang="${m}">${o[m]}</button>`).join(""),d=s=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${s}" value="${t("hero.title",s)}">
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${s}" rows="3">${t("hero.subtitle",s)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${s}" rows="4">${t("inst.bio_p1",s)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${s}" rows="3">${t("inst.bio_p2",s)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${s}" rows="3">${t("inst.bio_p3",s)}</textarea>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${s}" value="${t("inst.stat1_num",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${s}" value="${t("inst.stat2_num",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${s}" value="${t("inst.stat3_num",s)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${s}" value="${t("inst.stat1_label",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${s}" value="${t("inst.stat2_label",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${s}" value="${t("inst.stat3_label",s)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${s}" value="${t("footer.text",s)}">
    </div>
  `;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${l("pt")}</div>
      <div id="sc-panels">
        ${i.map(s=>`<div class="content-panel${s==="pt"?" active":""}" data-panel="${s}">${d(s)}</div>`).join("")}
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
        <input id="seo-title" class="form-control" value="${t("seo.title_pt","pt")}" placeholder="Nome — Cargo">
      </div>
      <div class="content-field">
        <label class="form-label">Meta Description (PT)</label>
        <textarea id="seo-desc" class="form-control" rows="2" placeholder="Descrição curta para o Google…">${t("seo.description_pt","pt")}</textarea>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="seo-save-btn">Salvar SEO</button>
        <span id="seo-save-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `,document.getElementById("sc-tabs").addEventListener("click",s=>{var c;const m=s.target.closest(".content-tab");m&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(u=>u.classList.remove("active")),m.classList.add("active"),(c=document.querySelector(`#sc-panels [data-panel="${m.dataset.lang}"]`))==null||c.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const s=document.getElementById("sc-save-btn");s.disabled=!0,s.textContent="Salvando…";const m={};document.querySelectorAll(".sc-field").forEach(u=>{const r=u.dataset.key,f=u.dataset.lang;m[r]||(m[r]={}),m[r][f]=u.value});let c=!0;for(const[u,r]of Object.entries(m))await $e(u,{pt:r.pt,en:r.en,es:r.es})||(c=!1);s.disabled=!1,s.textContent="Salvar Conteúdo",j(document.getElementById("sc-save-msg"),c)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const s=document.getElementById("seo-save-btn");s.disabled=!0,s.textContent="Salvando…";const m=document.getElementById("seo-title").value.trim(),c=document.getElementById("seo-desc").value.trim(),u=await $e("seo.title_pt",{pt:m,en:m,es:m})&&await $e("seo.description_pt",{pt:c,en:c,es:c});s.disabled=!1,s.textContent="Salvar SEO",j(document.getElementById("seo-save-msg"),u)})}async function Wt(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await D())}async function D(){const e=document.getElementById("crm-body");if(!e)return;const[{data:a},{data:n},{data:t},{data:i}]=await Promise.all([v.from("crm_pipelines").select("*").order("sort_order"),v.from("crm_stages").select("*").order("sort_order"),v.from("crm_tags").select("*").order("name"),v.from("crm_lead_statuses").select("*").order("sort_order")]),o=a||[],l=o.find(r=>r.is_default)||o[0],d=o.map(r=>`<option value="${r.id}"${r.id===(l==null?void 0:l.id)?" selected":""}>${b(r.name)}</option>`).join(""),m=(n||[]).filter(r=>r.pipeline_id===(l==null?void 0:l.id)).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${b(r.name)}</span>
      <input type="color" value="${r.color}" data-sid="${r.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${r.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',c=(t||[]).map(r=>`<span class="tag-chip" style="background:${r.color}" data-id="${r.id}">
      ${b(r.name)}
      <button class="tag-chip-del" data-id="${r.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',u=(i||[]).map(r=>`
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
      <div class="stages-list" id="crm-stages-list">${m}</div>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const r=document.getElementById("crm-new-stage").value.trim(),f=document.getElementById("crm-new-stage-color").value,p=parseInt(document.getElementById("crm-pipe-sel").value,10);r&&(await v.from("crm_stages").insert({pipeline_id:p,name:r,color:f,sort_order:99}),document.getElementById("crm-new-stage").value="",await D())}),e.querySelectorAll(".stage-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await v.from("crm_stages").delete().eq("id",r.dataset.id),await D())})}),e.querySelectorAll(".stage-color-pick").forEach(r=>{r.addEventListener("change",async f=>{await v.from("crm_stages").update({color:f.target.value}).eq("id",r.dataset.sid);const p=r.closest(".stage-item").querySelector(".stage-color-dot");p&&(p.style.background=f.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const r=document.getElementById("crm-new-tag").value.trim(),f=document.getElementById("crm-new-tag-color").value;r&&(await v.from("crm_tags").insert({name:r,color:f}),document.getElementById("crm-new-tag").value="",await D())}),e.querySelectorAll(".tag-chip-del").forEach(r=>{r.addEventListener("click",async()=>{await v.from("crm_tags").delete().eq("id",r.dataset.id),await D()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const r=document.getElementById("crm-new-status").value.trim(),f=document.getElementById("crm-new-status-color").value,p=document.getElementById("crm-new-status-final").checked;r&&(await v.from("crm_lead_statuses").insert({name:r,color:f,is_final:p,sort_order:99}),document.getElementById("crm-new-status").value="",await D())}),e.querySelectorAll(".status-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover este status?")&&(await v.from("crm_lead_statuses").delete().eq("id",r.dataset.id),await D())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var f;const r=(f=prompt("Nome do novo funil:"))==null?void 0:f.trim();r&&(await v.from("crm_pipelines").insert({name:r,sort_order:99}),await D())})}async function Yt(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("integrations").select("*"),n={};a==null||a.forEach(d=>{n[d.key]=d});const t=d=>{var s;return b(((s=n[d])==null?void 0:s.value)||"")},i=d=>{var s;return(s=n[d])!=null&&s.enabled?"checked":""},o=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${o.map(d=>`
        <div class="integration-row">
          <div class="integration-icon">${d.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${d.label}</div>
            <div class="integration-desc">${d.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${d.key}" ${i(d.key)}>
              <span class="toggle-slider"></span>
            </label>
            <input type="text" class="integration-value intg-val" data-key="${d.key}"
              value="${t(d.key)}" placeholder="${d.placeholder}">
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
          <input class="form-control smtp-field" data-key="${d.key}" value="${t(d.key)}" placeholder="${d.placeholder}">
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var u;const d=document.getElementById("intg-save-tracking");d.disabled=!0,d.textContent="Salvando…";let s=!0;const m=document.querySelectorAll(".intg-val"),c=document.querySelectorAll(".intg-toggle");for(let r=0;r<m.length;r++){const f=m[r].dataset.key,p=m[r].value.trim(),g=((u=c[r])==null?void 0:u.checked)??!1;await ke(f,p,g)||(s=!1)}d.disabled=!1,d.textContent="Salvar Integrações",j(document.getElementById("intg-tracking-msg"),s)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const d=document.getElementById("intg-save-smtp");d.disabled=!0,d.textContent="Salvando…";const s=document.querySelectorAll(".smtp-field");let m=!0;for(const u of s)await ke(u.dataset.key,u.value.trim(),!0)||(m=!1);const c=document.getElementById("smtp-pass").value;c&&(await ke("smtp_pass",c,!0)||(m=!1)),d.disabled=!1,d.textContent="Salvar SMTP",j(document.getElementById("intg-smtp-msg"),m)})}async function Jt(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Me(),document.getElementById("media-file-input").addEventListener("change",async n=>{var s,m;const t=Array.from(n.target.files);if(!t.length)return;const i=document.getElementById("media-upload-progress"),o=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");i.style.display="";let d=0;for(const c of t){l.textContent=`Enviando ${d+1}/${t.length}…`,o.style.width=`${Math.round(d/t.length*100)}%`;try{const u=await Ue(c,"media"),r=c.name.replace(/\.[^.]+$/,"").slice(0,60);await v.from("media_library").insert({name:r,url:u,type:"image",size:c.size,created_by:(m=(s=(await v.auth.getUser()).data)==null?void 0:s.user)==null?void 0:m.id})}catch(u){console.error("Media upload error:",u)}d++}o.style.width="100%",l.textContent=`✓ ${d} arquivo(s) enviado(s)`,setTimeout(()=>{i.style.display="none",o.style.width="0"},2e3),await Me(),n.target.value=""});const a=document.getElementById("media-drop-area");a.addEventListener("dragover",n=>{n.preventDefault(),a.classList.add("drag-over")}),a.addEventListener("dragleave",()=>a.classList.remove("drag-over")),a.addEventListener("drop",n=>{n.preventDefault(),a.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Me(){const e=document.getElementById("media-grid");if(!e)return;const{data:a,error:n}=await v.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(a!=null&&a.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=a.map(t=>`
    <div class="media-item" data-id="${t.id}" data-url="${b(t.url)}">
      <img src="${b(t.url)}" alt="${b(t.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${b(t.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${t.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${b(t.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(t=>{t.addEventListener("click",i=>{var o;i.stopPropagation(),(o=navigator.clipboard)==null||o.writeText(t.dataset.url).then(()=>{const l=t.textContent;t.textContent="✓ Copiado!",setTimeout(()=>{t.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(t=>{t.addEventListener("click",async i=>{i.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await v.from("media_library").delete().eq("id",t.dataset.id),await Me())})})}async function Kt(){var a,n,t,i,o;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(s=>s.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(s=>s.classList.add("hidden")),l.classList.add("active");const d=e.querySelector(`#sa-panel-${l.dataset.tab}`);d&&d.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&z(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&Qt(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&Ke(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&Qe(),l.dataset.tab==="platform"&&Ze()})}),(a=e.querySelector("#sa-sub-filter"))==null||a.addEventListener("change",Ke),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",z),(t=e.querySelector("#sa-user-search"))==null||t.addEventListener("input",Qe),(i=e.querySelector("#sa-tenant-new"))==null||i.addEventListener("click",()=>ta()),(o=e.querySelector("#sa-plat-save"))==null||o.addEventListener("click",Zt),z(),Ze())}async function z(){var d,s;const e=document.getElementById("sa-tenants-list"),a=((s=(d=document.getElementById("sa-tenant-search"))==null?void 0:d.value)==null?void 0:s.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=v.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:t,error:i}=await n;if(i){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${i.message}</div>`;return}const o=(t||[]).filter(m=>{var c,u;return!a||((c=m.name)==null?void 0:c.toLowerCase().includes(a))||((u=m.slug)==null?void 0:u.toLowerCase().includes(a))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const l=m=>m.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=o.map(m=>{var c;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        ${m.logo_url?`<img class="sa-tenant-logo" src="${b(m.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${b(m.name||"—")}</div>
          <div class="sa-list-sub">${b(m.slug||"")} · ${b(((c=m.plans)==null?void 0:c.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${l(m)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${m.id}" data-active="${m.active}" title="${m.active?"Desativar":"Ativar"}">${m.active?"⏸️":"▶️"}</button>
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${m.id}" title="Editar">✏️</button>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(m=>{m.addEventListener("click",async()=>{const c=m.dataset.active==="true";await v.from("tenants").update({active:!c}).eq("id",m.dataset.id),z()})}),e.querySelectorAll('[data-action="edit-tenant"]').forEach(m=>{m.addEventListener("click",()=>{const c=(o||[]).find(u=>String(u.id)===String(m.dataset.id));c&&aa(c)})})}async function Qt(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:a,error:n}=await v.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(a||[]).map(t=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${b(t.name)}</div>
      <div class="sa-plan-price">${t.price_brl===0?"Gratuito":"R$ "+Number(t.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${t.max_users===999?"Ilimitado":t.max_users} usuários</span>
        <span>🏠 ${t.max_properties===9999?"Ilimitado":t.max_properties} imóveis</span>
        <span>📋 ${t.max_leads===99999?"Ilimitado":t.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function Ke(){var d;const e=document.getElementById("sa-subs-list"),a=((d=document.getElementById("sa-sub-filter"))==null?void 0:d.value)||"";if(!e)return;e.dataset.loaded="1";let n=v.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});a&&(n=n.eq("status",a));const{data:t,error:i}=await n;if(i){e.innerHTML=`<div class="sa-error">Erro: ${i.message}</div>`;return}if(!(t!=null&&t.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const o={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},l={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=t.map(s=>{var m,c,u;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${b(((m=s.tenants)==null?void 0:m.name)||"—")}</div>
          <div class="sa-list-sub">${b(((c=s.plans)==null?void 0:c.name)||"—")} · R$ ${Number(((u=s.plans)==null?void 0:u.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${o[s.status]||"gray"}">${l[s.status]||s.status}</span>
        <span class="sa-list-date">${s.current_period_end?new Date(s.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function Qe(){var l,d;const e=document.getElementById("sa-users-list"),a=((d=(l=document.getElementById("sa-user-search"))==null?void 0:l.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:t}=await v.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(t){e.innerHTML=`<div class="sa-error">Erro: ${t.message}</div>`;return}const i=(n||[]).filter(s=>{var m,c;return!a||((m=s.name)==null?void 0:m.toLowerCase().includes(a))||((c=s.email)==null?void 0:c.toLowerCase().includes(a))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const o={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=i.map(s=>{var m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(s.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${b(s.name||"—")}</div>
          <div class="sa-list-sub">${b(((m=s.tenants)==null?void 0:m.name)||"Sem imobiliária")} · ${o[s.role]||s.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${s.active!==!1?"sa-badge-green":"sa-badge-red"}">${s.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function Ze(){const[e,a,n,t]=await Promise.all([v.from("tenants").select("id",{count:"exact",head:!0}),v.from("profiles").select("id",{count:"exact",head:!0}),v.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),v.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),i=(o,l)=>{const d=document.getElementById(o);d&&(d.textContent=l??"—")};i("sa-stat-tenants",e.count),i("sa-stat-users",a.count),i("sa-stat-subs",n.count),i("sa-stat-props",t.count)}async function Zt(){var n,t,i;const e=document.getElementById("sa-plat-save"),a=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await Q([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((t=document.getElementById("sa-plat-email"))==null?void 0:t.value)||""},{key:"platform.trial_days",value:((i=document.getElementById("sa-plat-trial"))==null?void 0:i.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),j(a,!0)}function ea(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ta(){var t,i,o,l,d,s;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const a=document.createElement("div");a.id="sa-new-tenant-modal",a.className="sa-modal-backdrop",a.innerHTML=`
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
  `,document.body.appendChild(a),v.from("plans").select("id, name").then(({data:m})=>{const c=document.getElementById("nt-plan");c&&m&&(c.innerHTML='<option value="">Sem plano</option>'+m.map(u=>`<option value="${u.id}">${b(u.name)}</option>`).join(""))}),(t=document.getElementById("nt-name"))==null||t.addEventListener("input",m=>{const c=document.getElementById("nt-slug");c&&!c.dataset.manual&&(c.value=ea(m.target.value))}),(i=document.getElementById("nt-slug"))==null||i.addEventListener("input",m=>{m.target.dataset.manual="1"}),(o=document.getElementById("nt-pwd-toggle"))==null||o.addEventListener("click",()=>{const m=document.getElementById("nt-admin-password");m.type=m.type==="password"?"text":"password"});const n=()=>a.remove();(l=document.getElementById("sa-modal-close-btn"))==null||l.addEventListener("click",n),(d=document.getElementById("nt-cancel"))==null||d.addEventListener("click",n),a.addEventListener("click",m=>{m.target===a&&n()}),(s=document.getElementById("nt-save"))==null||s.addEventListener("click",async()=>{var C,I,x,S,$,_,q,P,N,te,ae,ne;const m=(I=(C=document.getElementById("nt-name"))==null?void 0:C.value)==null?void 0:I.trim(),c=(S=(x=document.getElementById("nt-slug"))==null?void 0:x.value)==null?void 0:S.trim(),u=(_=($=document.getElementById("nt-domain"))==null?void 0:$.value)==null?void 0:_.trim(),r=(q=document.getElementById("nt-plan"))==null?void 0:q.value,f=(N=(P=document.getElementById("nt-admin-email"))==null?void 0:P.value)==null?void 0:N.trim(),p=(ae=(te=document.getElementById("nt-admin-password"))==null?void 0:te.value)==null?void 0:ae.trim(),g=document.getElementById("nt-msg"),w=document.getElementById("nt-save");if(!m||!c){g.textContent="❌ Nome e slug são obrigatórios.",g.style.color="#ef4444";return}if(!f){g.textContent="❌ Informe o e-mail do admin.",g.style.color="#ef4444";return}if(!p||p.length<6){g.textContent="❌ A senha precisa ter mínimo 6 caracteres.",g.style.color="#ef4444";return}w.disabled=!0,w.textContent="Criando…",g.textContent="⏳ Criando imobiliária…",g.style.color="#64748b";const{data:h,error:E}=await v.from("tenants").insert({name:m,slug:c,domain:u||null,plan_id:r||null,active:!0}).select();if(E){w.disabled=!1,w.textContent="Criar Imobiliária",g.textContent="❌ "+E.message,g.style.color="#ef4444";return}const B=(ne=h==null?void 0:h[0])==null?void 0:ne.id;g.textContent="⏳ Criando usuário admin…";const L=await fe({email:f,password:p,role:"admin",tenant_id:B});if(!(L!=null&&L.success)){w.disabled=!1,w.textContent="Criar Imobiliária",g.textContent="⚠️ Imobiliária criada, mas erro ao criar usuário: "+((L==null?void 0:L.error)||"Desconhecido"),g.style.color="#f59e0b",setTimeout(()=>{n(),z()},2500);return}B&&(L!=null&&L.user_id)&&await v.from("profiles").update({role:"admin",tenant_id:B}).eq("id",L.user_id),w.disabled=!1,w.textContent="Criar Imobiliária",g.textContent="✅ Imobiliária e admin criados com sucesso!",g.style.color="#22c55e",setTimeout(()=>{n(),z()},1200)})}function aa(e){var i,o,l,d,s,m,c;const a=document.getElementById("sa-edit-tenant-modal");a&&a.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop",n.innerHTML=`
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
  `,document.body.appendChild(n),v.from("plans").select("id, name").then(({data:u})=>{const r=document.getElementById("et-plan");r&&u&&(r.innerHTML='<option value="">Sem plano</option>'+u.map(f=>`<option value="${f.id}"${String(f.id)===String(e.plan_id)?" selected":""}>${b(f.name)}</option>`).join(""))}),(i=document.getElementById("et-logo-input"))==null||i.addEventListener("change",u=>{const r=u.target.files[0];if(!r)return;const f=URL.createObjectURL(r),p=document.getElementById("et-logo-preview");p&&(p.innerHTML=`<img src="${f}" style="width:100%;height:100%;object-fit:cover;">`)}),(o=document.getElementById("et-logo-preview"))==null||o.addEventListener("click",()=>{var u;(u=document.getElementById("et-logo-input"))==null||u.click()}),(l=document.getElementById("et-pwd-toggle"))==null||l.addEventListener("click",()=>{const u=document.getElementById("et-admin-password");u.type=u.type==="password"?"text":"password"});const t=()=>n.remove();(d=document.getElementById("et-close"))==null||d.addEventListener("click",t),(s=document.getElementById("et-cancel"))==null||s.addEventListener("click",t),n.addEventListener("click",u=>{u.target===n&&t()}),(m=document.getElementById("et-delete"))==null||m.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const r=document.getElementById("et-delete");r.disabled=!0,r.textContent="Excluindo…";const{error:f}=await v.from("tenants").delete().eq("id",e.id);if(f){alert("Erro ao excluir: "+f.message),r.disabled=!1,r.textContent="🗑️ Excluir";return}t(),z()}),(c=document.getElementById("et-save"))==null||c.addEventListener("click",async()=>{var I,x,S,$,_,q,P,N,te,ae,ne,Pe;const u=(x=(I=document.getElementById("et-name"))==null?void 0:I.value)==null?void 0:x.trim(),r=($=(S=document.getElementById("et-slug"))==null?void 0:S.value)==null?void 0:$.trim(),f=(q=(_=document.getElementById("et-domain"))==null?void 0:_.value)==null?void 0:q.trim(),p=(P=document.getElementById("et-plan"))==null?void 0:P.value,g=(te=(N=document.getElementById("et-admin-email"))==null?void 0:N.value)==null?void 0:te.trim(),w=(ne=(ae=document.getElementById("et-admin-password"))==null?void 0:ae.value)==null?void 0:ne.trim(),h=(Pe=document.getElementById("et-logo-input"))==null?void 0:Pe.files[0],E=document.getElementById("et-msg"),B=document.getElementById("et-save");if(!u){E.textContent="❌ Nome é obrigatório.",E.style.color="#ef4444";return}B.disabled=!0,B.textContent="Salvando…",E.textContent="⏳ Salvando…",E.style.color="#64748b";let L=e.logo_url;if(h)try{const T=await Le(h,256,.85),De=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:st}=await v.storage.from("imoveis").upload(De,T,{contentType:"image/jpeg",upsert:!0});if(!st){const{data:{publicUrl:lt}}=v.storage.from("imoveis").getPublicUrl(De);L=lt}}catch(T){console.error("Logo upload:",T)}const{error:C}=await v.from("tenants").update({name:u,slug:r||e.slug,domain:f||null,plan_id:p||null,logo_url:L}).eq("id",e.id);if(C){B.disabled=!1,B.textContent="Salvar",E.textContent="❌ "+C.message,E.style.color="#ef4444";return}if(g&&w&&w.length>=6){E.textContent="⏳ Criando usuário admin…";const T=await fe({email:g,password:w,role:"admin",tenant_id:e.id});T!=null&&T.success?(T!=null&&T.user_id&&await v.from("profiles").update({role:"admin",tenant_id:e.id}).eq("id",T.user_id),E.textContent="✅ Salvo e admin criado!",E.style.color="#22c55e"):(E.textContent="⚠️ Salvo, mas erro ao criar admin: "+((T==null?void 0:T.error)||"Tente novamente"),E.style.color="#f59e0b")}else E.textContent="✅ Imobiliária atualizada!",E.style.color="#22c55e";B.disabled=!1,B.textContent="Salvar",setTimeout(()=>{t(),z()},1200)})}
