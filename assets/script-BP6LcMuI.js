import{s as v}from"./supabase-BcuJ3xoD.js";let he={},Ae={};async function lt(){const[e,a]=await Promise.all([v.from("settings").select("key,value"),v.from("site_content").select("*")]);e.data&&e.data.forEach(n=>{he[n.key]=n.value}),a.data&&a.data.forEach(n=>{Ae[n.key]=n})}const X=(e,a=null)=>he[e]!==void 0?he[e]:a,Se=(e,a="pt")=>{const n=Ae[e];return n?n[`value_${a}`]??n.value_pt??null:null};async function Q(e){const a=new Date().toISOString(),n=e.map(([i,o])=>({key:i,value:o,updated_at:a})),{error:t}=await v.from("settings").upsert(n,{onConflict:"key"});return t||e.forEach(([i,o])=>{he[i]=o}),!t}async function $e(e,{pt:a,en:n,es:t}){const i={key:e,value_pt:a,value_en:n,value_es:t,updated_at:new Date().toISOString()},{error:o}=await v.from("site_content").upsert(i,{onConflict:"key"});return o||(Ae[e]=i),!o}async function ke(e,a,n){const{error:t}=await v.from("integrations").upsert({key:e,value:a,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!t}function Ne(){const e=document.documentElement,a=X("visual.accent_color","#b8962e"),n=X("visual.primary_bg","#0f1c2e"),t=X("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",a),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",t);const i=X("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(s=>{s.src=i});const o=X("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=o);const r=X("visual.hero_bg_url","");if(r){const s=document.querySelector(".hero");s&&(s.style.backgroundImage=`url('${r}')`)}}function dt(e="pt"){const a=p=>Se(p,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&a("hero.title")&&(n.innerHTML=a("hero.title"));const t=document.querySelector(".hero-content > p");t&&a("hero.subtitle")&&(t.innerHTML=a("hero.subtitle"));const i=document.querySelector(".footer small");i&&a("footer.text")&&(i.innerHTML=a("footer.text"));const o=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),r=document.querySelector('[data-i18n="inst.p3"]');o&&a("inst.bio_p1")&&(o.innerHTML=a("inst.bio_p1")),l&&a("inst.bio_p2")&&(l.innerHTML=a("inst.bio_p2")),r&&a("inst.bio_p3")&&(r.innerHTML=a("inst.bio_p3"));const s=document.querySelector('[data-i18n-num="inst.stat2num"]'),c=document.querySelector('[data-i18n="inst.stat1"]'),d=document.querySelector('[data-i18n="inst.stat2"]'),u=document.querySelector('[data-i18n="inst.stat3"]');s&&a("inst.stat2_num")&&(s.innerHTML=a("inst.stat2_num")),c&&a("inst.stat1_label")&&(c.innerHTML=a("inst.stat1_label")),d&&a("inst.stat2_label")&&(d.innerHTML=a("inst.stat2_label")),u&&a("inst.stat3_label")&&(u.innerHTML=a("inst.stat3_label"));const m=Se("seo.title_pt",e);m&&document.title&&(document.title=m);const h=Se("seo.description_pt",e);if(h){const p=document.querySelector('meta[name="description"]');p&&(p.content=h)}}function rt(e){if(!e)return;const a=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const t=n.getAttribute("href");if(t){const i=t.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=a+i}})}const ct="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let K="5547999701743",re=`https://wa.me/${K}`;const Y=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],mt=5.7;function ce(e,a){if(!e)return"—";const n=String(e).trim();let t;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?t=parseFloat(n.replace(/\./g,"").replace(",",".")):t=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(t)||t===0?n:a==="en"?"$ "+(t/mt).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+t.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let k=[],y=null,me=[],Ze=!1;v.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(Ze=!0)});async function ut(){const{data:e,error:a}=await v.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):e||[]}async function pt(){const{data:e,error:a}=await v.from("properties").select("*").order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):(k=e||[],Dt(),Ot(),k)}async function vt(e){if(e.id){const{id:a,created_at:n,...t}=e,{error:i}=await v.from("properties").update(t).eq("id",a);if(i)throw i;const o=k.findIndex(l=>l.id===a);o>=0&&(k[o]={...k[o],...t})}else{if(!e.reference){const t=k.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10)),i=t.length?Math.max(...t)+1:1;e.reference="IO-"+String(i).padStart(4,"0")}const{data:a,error:n}=await v.from("properties").insert(e).select();if(n)throw n;a!=null&&a[0]&&k.unshift(a[0])}}async function gt(e){const{error:a}=await v.from("properties").delete().eq("id",e);if(a)throw a;k=k.filter(n=>n.id!==e)}async function ft(e,a){const{error:n}=await v.auth.signInWithPassword({email:e,password:a});return!n}function Le(e,a=1200,n=.78){return new Promise((t,i)=>{const o=new Image,l=URL.createObjectURL(e);o.onload=()=>{URL.revokeObjectURL(l);const r=document.createElement("canvas");let s=o.width,c=o.height;s>a&&(c=Math.round(c*a/s),s=a),r.width=s,r.height=c;const d=r.getContext("2d");d.drawImage(o,0,0,s,c);const u=new Image;u.crossOrigin="anonymous",u.onload=()=>{const m=Math.round(s*.18),h=Math.round(u.naturalHeight*m/u.naturalWidth),p=Math.round(s*.02),g=s-m-p,E=c-h-p;d.globalAlpha=.45,d.drawImage(u,g,E,m,h),d.globalAlpha=1,r.toBlob(f=>f?t(f):i(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.onerror=()=>{r.toBlob(m=>m?t(m):i(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.src="/logo.png"},o.onerror=i,o.src=l})}async function yt(e){const a=await Le(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:t}=await v.storage.from("imoveis").upload(n,a,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(t)throw t;const{data:{publicUrl:i}}=v.storage.from("imoveis").getPublicUrl(n);return i}async function bt(e,a){const n=Array.from(e).filter(i=>i.size>0),t=[];for(let i=0;i<n.length;i++)a&&a(i+1,n.length),t.push(await yt(n[i]));return t}async function ue(){var u,m,h,p,g,E;const e=document.getElementById("vendas-carousel"),a=document.getElementById("properties");if(!e&&!a)return;const n=await ut();k=n,((u=document.getElementById("selecao-carousel"))==null?void 0:u.innerHTML)===""&&ht(n);const t=((m=document.getElementById("city-filter"))==null?void 0:m.value)||"",i=((h=document.getElementById("neighborhood-filter"))==null?void 0:h.value)||"",o=((p=document.getElementById("bedrooms-filter"))==null?void 0:p.value)||"",l=((g=document.getElementById("parking-filter"))==null?void 0:g.value)||"",r=((E=document.getElementById("construction-filter"))==null?void 0:E.value)||"",s=document.getElementById("price-slider"),c=s?parseInt(s.value,10):13e7,d=n.filter(f=>{if(t&&f.city!==t||i&&f.neighborhood!==i||o&&(o==="4+"&&Number(f.bedrooms)<4||o!=="4+"&&Number(f.bedrooms)!==Number(o))||l&&(l==="4+"&&Number(f.parking)<4||l!=="4+"&&Number(f.parking)!==Number(l))||r&&f.construction_status!==r)return!1;const w=String(f.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),S=parseInt(w,10)||0;return!(S<0||S>c)});if(e){if(!d.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=d.map(f=>{var B;const w=f.cover_image||((B=f.images)==null?void 0:B[0])||Y[0],S=[f.neighborhood,f.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${w}" alt="${b(f.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${b(f.title)}</div>
            <div class="selecao-card-loc">${b(S)}</div>
            <div class="selecao-card-price">${b(ce(f.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${f.id}" class="btn-det">Ver Detalhes</a>
              <a href="${re}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!d.length){a.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}a.innerHTML=d.map(f=>{var B;const w=(B=f.images)!=null&&B.length?f.images:Y,S=w.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${S}" data-idx="0" data-pid="${f.id}">
          <img src="${f.cover_image||w[0]}" alt="${b(f.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${S>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${b(f.title)}</strong>
          <div class="muted">${b(f.neighborhood||"")}, ${b(f.city||"")}</div>
          <div><strong>${b(ce(f.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${f.bedrooms||"--"} | 🚗 ${f.parking||"--"} ${S>1?"| 📸 "+S:""}</div>
          <p class="muted">${b((f.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${f.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${re}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(f=>{f.removeEventListener("click",De),f.addEventListener("click",De)})}function ht(e){var i,o,l;const a=document.getElementById("selecao-carousel");if(!a)return;const n=e.slice(0,6);if(!n.length){(i=a.closest(".selecao-section"))==null||i.classList.add("hidden");return}a.innerHTML=n.map(r=>{var d;const s=r.cover_image||((d=r.images)==null?void 0:d[0])||Y[0],c=[r.neighborhood,r.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${s}" alt="${b(r.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${b(r.title)}</div>
          <div class="selecao-card-loc">${b(c)}</div>
          <div class="selecao-card-price">${b(ce(r.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${r.id}" class="btn-det">Ver Detalhes</a>
            <a href="${re}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const t=a.closest(".selecao-carousel-wrap");(o=t==null?void 0:t.querySelector(".selecao-prev"))==null||o.addEventListener("click",()=>{a.scrollBy({left:-340,behavior:"smooth"})}),(l=t==null?void 0:t.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{a.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const a=document.getElementById("construction-filter");a&&(a.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),ue()};function De(e){var r;e.stopPropagation();const a=e.currentTarget.closest(".carousel-wrap");if(!a)return;const n=parseInt(a.dataset.total,10);if(!n)return;let t=parseInt(a.dataset.idx,10)||0;const i=e.currentTarget.classList.contains("carousel-next")?1:-1;t=(t+i+n)%n,a.dataset.idx=t;const o=parseInt(a.dataset.pid,10),l=k.find(s=>s.id===o);(r=l==null?void 0:l.images)!=null&&r.length&&(a.querySelector(".carousel-img").src=l.images[t])}function Et(){const e=document.getElementById("price-slider"),a=document.getElementById("price-label");!e||!a||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",a.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);a.textContent="Até R$ "+n.toLocaleString("pt-BR"),ue()}))}function wt(){const e=document.getElementById("city-filter"),a=document.getElementById("neighborhood-filter");if(e&&a){const n=J();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),e.addEventListener("change",()=>{const t=J().find(o=>o.name===e.value),i=t?He(t.id):[];a.innerHTML='<option value="">Todos os bairros</option>'+i.map(o=>`<option value="${o.name}">${b(o.name)}</option>`).join(""),ue()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",ue)})}function pe(e){const a=document.getElementById("admin-properties");if(a){if(!e.length){a.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}a.innerHTML=e.map(n=>{var l;const t=n.cover_image||((l=n.images)==null?void 0:l[0])||Y[0],i=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",o=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
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
    </tr>`}).join("")}}function It(){const e=document.getElementById("f-city");if(!e)return;const a=J(),n=e.value;e.innerHTML='<option value="">Todas</option>'+a.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),n&&(e.value=n)}function xt(){var e,a,n,t,i,o,l,r,s,c,d,u,m,h,p;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((a=document.getElementById("f-title"))==null?void 0:a.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((t=document.getElementById("f-city"))==null?void 0:t.value)||"",neighborhood:((i=document.getElementById("f-neighborhood"))==null?void 0:i.value)||"",condominium:(((o=document.getElementById("f-condominium"))==null?void 0:o.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((r=document.getElementById("f-price-max"))==null?void 0:r.value)||1/0,areaMin:parseFloat((s=document.getElementById("f-area-min"))==null?void 0:s.value)||0,areaMax:parseFloat((c=document.getElementById("f-area-max"))==null?void 0:c.value)||1/0,construction:((d=document.getElementById("f-construction"))==null?void 0:d.value)||"",published:((u=document.getElementById("f-published"))==null?void 0:u.value)||"",bedrooms:((m=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:m.dataset.val)||"",suites:((h=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:h.dataset.val)||"",parking:((p=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:p.dataset.val)||""}}function Re(e){const a=xt();return Object.values(a).some(t=>t!==""&&t!==0&&t!==1/0)?e.filter(t=>{if(a.ref&&!(t.reference||"").toLowerCase().includes(a.ref)||a.title&&!(t.title||"").toLowerCase().includes(a.title)||a.type&&!(t.title||"").toLowerCase().includes(a.type.toLowerCase())||a.city&&t.city!==a.city||a.neighborhood&&t.neighborhood!==a.neighborhood||a.condominium&&!(t.condominium||"").toLowerCase().includes(a.condominium))return!1;const i=parseInt(String(t.price||"").replace(/[^0-9]/g,""),10)||0;if(a.priceMin>0&&i<a.priceMin||a.priceMax<1/0&&i>a.priceMax)return!1;const o=parseFloat(t.area)||0;return!(a.areaMin>0&&o<a.areaMin||a.areaMax<1/0&&o>a.areaMax||a.construction&&t.construction_status!==a.construction||a.published!==""&&String(t.published)!==a.published||a.bedrooms&&(a.bedrooms==="5+"&&Number(t.bedrooms)<5||a.bedrooms!=="5+"&&Number(t.bedrooms)!==Number(a.bedrooms))||a.suites&&(a.suites==="5+"&&Number(t.suites)<5||a.suites!=="5+"&&Number(t.suites)!==Number(a.suites))||a.parking&&(a.parking==="5+"&&Number(t.parking)<5||a.parking!=="5+"&&Number(t.parking)!==Number(a.parking)))}):e}async function Ee(){if(!document.getElementById("admin-properties"))return;const e=await pt(),a=e.length,n=e.filter(l=>l.published===!0).length,t=document.getElementById("stat-total"),i=document.getElementById("stat-published"),o=document.getElementById("stat-leads");t&&(t.textContent=a),i&&(i.textContent=n),o&&(o.textContent="—"),It(),pe(k)}let R=null,G="";function Ce(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function be(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function we(e){const a=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!a||!n)){if(!e.length){a.style.display="none";return}a.style.display="",n.innerHTML=e.map(t=>`
    <div class="cover-thumb-wrap${t===G?" selected":""}" data-url="${t}">
      <img src="${t}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(t=>{t.addEventListener("click",()=>{G=t.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(i=>i.classList.remove("selected")),t.classList.add("selected")})})}}function _e(){const e=document.getElementById("property-form");if(!e)return;const a=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{n.preventDefault();const t=new FormData(e),i=t.getAll("images");let o=[];const l=i.filter(s=>s.size>0);if(l.length){a.disabled=!0,a.textContent=`Enviando 0/${l.length} foto…`;try{o=await bt(l,(s,c)=>{a.textContent=`Enviando ${s}/${c} foto…`})}catch(s){console.error("Erro no upload:",s),a.disabled=!1,a.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(R){const s=k.find(c=>c.id===R);s!=null&&s.images&&(o=s.images)}o.length||(o=[...Y]);const r={...R?{id:R}:{},title:t.get("title"),rua:t.get("rua")||"",numero:t.get("numero")||"",city:t.get("city"),neighborhood:t.get("neighborhood"),price:t.get("price"),bedrooms:parseInt(t.get("bedrooms"),10)||0,suites:parseInt(t.get("suites"),10)||0,area:parseFloat(t.get("area"))||0,parking:parseInt(t.get("parking"),10)||0,published:t.get("published")==="true",images:o,description:t.get("description")||"",owner_name:t.get("owner_name")||"",owner_phone:t.get("owner_phone")||"",owner_email:t.get("owner_email")||"",owner_notes:t.get("owner_notes")||"",cover_image:G||"",construction_status:t.get("construction_status")||"",condominium:t.get("condominium")||""};try{await vt(r),R=null,a.disabled=!1,a.textContent="Salvar Imóvel",e.reset();const s=document.getElementById("adminPublished");s&&(s.value="true");const c=document.getElementById("adminNeighborhood");c&&(c.innerHTML='<option value="">Selecione a cidade primeiro</option>');const d=document.getElementById("adminConstructionStatus");d&&(d.value=""),G="",we([]),be(),await Ee()}catch(s){console.error(s),a.disabled=!1,a.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert("Erro ao salvar imóvel. Verifique o console.")}}),document.addEventListener("click",async n=>{var t;if(n.target.matches(".del-btn")){const i=Number(n.target.dataset.id);if(!i||!confirm("Remover este imóvel?"))return;try{await gt(i),await Ee()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((y==null?void 0:y.role)!=="admin")return;const i=Number(n.target.dataset.id);if(!i)return;const o=k.find(s=>s.id===i);if(!o)return;R=i,a.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=o.title||"",e.querySelector('[name="rua"]').value=o.rua||"",e.querySelector('[name="numero"]').value=o.numero||"",e.querySelector('[name="city"]').value=o.city||"",e.querySelector('[name="price"]').value=o.price||"",e.querySelector('[name="bedrooms"]').value=o.bedrooms||"",e.querySelector('[name="suites"]').value=o.suites||"",e.querySelector('[name="area"]').value=o.area||"",e.querySelector('[name="parking"]').value=o.parking||"",e.querySelector('[name="description"]').value=o.description||"",e.querySelector('[name="construction_status"]').value=o.construction_status||"",e.querySelector('[name="owner_name"]').value=o.owner_name||"",e.querySelector('[name="owner_phone"]').value=o.owner_phone||"",e.querySelector('[name="owner_email"]').value=o.owner_email||"",e.querySelector('[name="owner_notes"]').value=o.owner_notes||"",e.querySelector('[name="condominium"]').value=o.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=o.published===!0?"true":"false");const r=document.getElementById("adminCitySelect");r&&(r.value=o.city||"",r.dispatchEvent(new Event("change")),setTimeout(()=>{const s=document.getElementById("adminNeighborhood");s&&(s.value=o.neighborhood||"")},50)),G=o.cover_image||((t=o.images)==null?void 0:t[0])||"",we(o.images||[]),Ce("Editar Imóvel")}})}function b(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let O=[],H=0;function Bt(e){var d,u;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const a=document.getElementById("view-status-badge");e.published?(a.textContent="● Publicado",a.className="badge badge-green"):(a.textContent="○ Rascunho",a.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const t=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=t,document.getElementById("view-directions-link").href=t;const i=((d=e.images)==null?void 0:d[0])||Y[0];document.getElementById("view-thumb-preview").src=i,O=(u=e.images)!=null&&u.length?e.images:Y,H=0,Ie(),document.getElementById("view-price").textContent=ce(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const o=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),o&&(o.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(m=>m.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(m=>m.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const r="https://omarcorretor.com.br/property.html?id="+e.id,s=document.getElementById("share-link-input");s&&(s.value=r);const c=document.getElementById("share-panel");c&&(c.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ye(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Ie(){const e=document.getElementById("view-main-img"),a=document.getElementById("view-counter"),n=document.getElementById("view-prev"),t=document.getElementById("view-next"),i=document.getElementById("view-thumbs");e.src=O[H],e.alt=`Foto ${H+1}`;const o=O.length>1;n.style.display=o?"flex":"none",t.style.display=o?"flex":"none",a.textContent=o?`${H+1} / ${O.length}`:"",i.innerHTML=o?O.map((l,r)=>`<img src="${l}" class="view-thumb${r===H?" active":""}" data-i="${r}" alt="Foto ${r+1}">`).join(""):"",i.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{H=+l.dataset.i,Ie()})})}async function Oe(e){const{data:a}=await v.from("profiles").select("*").eq("id",e).maybeSingle();return a}function qe(e){var u,m;const a=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),t=document.getElementById("topnav-name"),i=document.getElementById("topnav-role");if(!t)return;const o=(e==null?void 0:e.name)||"Sem nome",l=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";t.textContent=o,i&&(i.textContent=l),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",a&&(a.style.display="none")):(a&&(a.textContent=((u=o[0])==null?void 0:u.toUpperCase())||"?",a.style.display=""),n&&(n.style.display="none"));const r=document.getElementById("avatar-dd-name"),s=document.getElementById("avatar-dd-role"),c=document.getElementById("avatar-dd-img"),d=document.getElementById("avatar-dd-initial");r&&(r.textContent=o),s&&(s.textContent=l),e!=null&&e.avatar_url&&c?(c.src=e.avatar_url,c.style.display="",d&&(d.style.display="none")):(d&&(d.textContent=((m=o[0])==null?void 0:m.toUpperCase())||"?",d.style.display=""),c&&(c.style.display="none"))}function z(e){var n,t;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(i=>i.classList.remove("active"));const a=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);a&&a.classList.add("active"),document.querySelectorAll(".admin-section").forEach(i=>i.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(t=document.getElementById("topnav-links"))==null||t.classList.remove("open"),V(),e==="contatos"&&Rt(),e==="funil"&&St(),e==="tarefas"&&kt()}function Fe(e){const a=document.getElementById("admin-root");if(a&&(a.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(t=>{t.style.display=""}),Object.entries({empresa:zt,visual:Xt,"site-config":Vt,"crm-config":Gt,integracoes:Wt,midia:Yt}).forEach(([t,i])=>{const o=document.querySelector(`.topnav-dropdown-item[data-section="${t}"]`)||document.querySelector(`.nav-item[data-section="${t}"]`);o&&o.addEventListener("click",()=>i(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(t=>{t.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>Jt(),{once:!0}),window.lucide&&lucide.createIcons()}}function V(){var e,a;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(a=document.getElementById("notif-dropdown"))==null||a.classList.add("hidden")}function Lt(){var o,l,r,s,c,d,u,m,h;const e=document.getElementById("topnav-avatar-wrap"),a=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",p=>{var E;p.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||(E=document.getElementById("notif-dropdown"))==null||E.classList.add("hidden")}),(o=document.getElementById("avatar-dd-profile"))==null||o.addEventListener("click",()=>{V(),z("settings")}),(l=document.getElementById("avatar-dd-settings"))==null||l.addEventListener("click",()=>{V(),z("settings")}),(r=document.getElementById("avatar-dd-logout"))==null||r.addEventListener("click",async()=>{await v.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),t=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",p=>{var E;p.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||((E=document.getElementById("avatar-dropdown"))==null||E.classList.add("hidden"),Tt())}),(s=document.getElementById("notif-mark-all"))==null||s.addEventListener("click",()=>{Mt(),V()}),(c=document.getElementById("btn-search-open"))==null||c.addEventListener("click",()=>{var p,g;(p=document.getElementById("search-overlay"))==null||p.classList.remove("hidden"),(g=document.getElementById("search-input"))==null||g.focus()}),(d=document.getElementById("search-overlay-close"))==null||d.addEventListener("click",()=>{var p;(p=document.getElementById("search-overlay"))==null||p.classList.add("hidden")}),(u=document.getElementById("search-overlay"))==null||u.addEventListener("click",p=>{p.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let i;(m=document.getElementById("search-input"))==null||m.addEventListener("input",p=>{clearTimeout(i),i=setTimeout(()=>qt(p.target.value.trim()),280)}),(h=document.getElementById("search-input"))==null||h.addEventListener("keydown",p=>{var g;p.key==="Escape"&&((g=document.getElementById("search-overlay"))==null||g.classList.add("hidden"))}),document.addEventListener("click",V)}let ze=!1,oe=[],et=[],xe=[],ve=null,ie=null;async function St(){var t;if(ze)return;ze=!0;const[{data:e},{data:a}]=await Promise.all([v.from("crm_pipelines").select("*").order("sort_order"),v.from("crm_stages").select("*").order("sort_order")]);oe=e||[],et=a||[];const n=document.getElementById("funil-pipe-sel");if(n){n.innerHTML=oe.length?oe.map(o=>`<option value="${o.id}">${b(o.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const i=oe.find(o=>o.is_default)||oe[0];i&&(n.value=i.id,ve=i.id),n.addEventListener("change",async()=>{ve=parseInt(n.value,10),await Xe()})}(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>openLeadModal()),await Xe()}async function Xe(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let a=v.from("leads").select("*").order("created_at",{ascending:!1});(y==null?void 0:y.role)==="corretor"?a=a.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(a=a.eq("tenant_id",y.tenant_id)),ve&&(a=a.eq("pipeline_id",ve));const{data:n}=await a;xe=n||[],tt()}function tt(){const e=document.getElementById("kanban-board");if(!e)return;const a=et.filter(t=>t.pipeline_id===ve);if(!a.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n={};a.forEach(t=>{n[t.name]=[]}),xe.forEach(t=>{var o,l,r,s;const i=t.stage||((o=a[0])==null?void 0:o.name);n[i]||(n[((l=a[0])==null?void 0:l.name)||""]=[]),(s=n[i]||n[(r=a[0])==null?void 0:r.name])==null||s.push(t)}),e.innerHTML=a.map(t=>{const i=n[t.name]||[],o=i.length?i.map(l=>`
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
      </div>`}).join(""),$t(),window.lucide&&lucide.createIcons()}function $t(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(a=>{a.addEventListener("click",()=>openLeadModal())}),e.querySelectorAll(".kanban-card").forEach(a=>{a.addEventListener("click",()=>{const n=xe.find(t=>String(t.id)===String(a.dataset.id));n&&openLeadModal(n)}),a.addEventListener("dragstart",n=>{ie=a.dataset.id,a.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),a.addEventListener("dragend",()=>a.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(a=>{a.addEventListener("dragover",n=>{n.preventDefault(),a.closest(".kanban-col").classList.add("drag-over")}),a.addEventListener("dragleave",n=>{a.contains(n.relatedTarget)||a.closest(".kanban-col").classList.remove("drag-over")}),a.addEventListener("drop",async n=>{n.preventDefault(),a.closest(".kanban-col").classList.remove("drag-over");const t=a.dataset.stage;if(!ie||!t)return;await v.from("leads").update({stage:t}).eq("id",ie);const i=xe.find(o=>String(o.id)===String(ie));i&&(i.stage=t),ie=null,tt()})}))}let A=[],Ve=!1,le="pending";async function kt(){var e;Ve||(Ve=!0,await _t(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>Ct()),document.querySelectorAll(".tarefa-filter-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),a.classList.add("active"),le=a.dataset.filter,ge()})}))}async function _t(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let a=v.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(y==null?void 0:y.role)==="corretor"?a=a.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(a=a.eq("tenant_id",y.tenant_id));const{data:n,error:t}=await a;if(t){const i=document.getElementById("tarefas-list");i&&(i.innerHTML=`
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
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(n=>{n.addEventListener("change",async()=>{const t=n.dataset.id,i=n.checked?"done":"pending";await v.from("tasks").update({status:i}).eq("id",t);const o=A.find(l=>String(l.id)===t);o&&(o.status=i),ge()})}),e.querySelectorAll(".tarefa-del-btn").forEach(n=>{n.addEventListener("click",async()=>{confirm("Excluir esta tarefa?")&&(await v.from("tasks").delete().eq("id",n.dataset.id),A=A.filter(t=>String(t.id)!==String(n.dataset.id)),ge())})})}function Ct(e=null){var o,l,r;const a=document.getElementById("tarefa-modal-root");a&&a.remove();const n=!!e,t=document.createElement("div");t.id="tarefa-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t);const i=()=>t.remove();(o=document.getElementById("tm-close"))==null||o.addEventListener("click",i),(l=document.getElementById("tm-cancel"))==null||l.addEventListener("click",i),t.addEventListener("click",s=>{s.target===t&&i()}),(r=document.getElementById("tm-save"))==null||r.addEventListener("click",async()=>{var h,p;const s=document.getElementById("tarefa-form");if(!s.checkValidity()){s.reportValidity();return}const c=new FormData(s),d=document.getElementById("tm-save");d.disabled=!0,d.textContent="Salvando…";const u={title:(h=c.get("title"))==null?void 0:h.trim(),description:((p=c.get("description"))==null?void 0:p.trim())||null,due_date:c.get("due_date")||null,priority:c.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null};let m;if(n){if({error:m}=await v.from("tasks").update(u).eq("id",e.id),!m){const g=A.findIndex(E=>String(E.id)===String(e.id));g>=0&&(A[g]={...A[g],...u})}}else{const{data:g,error:E}=await v.from("tasks").insert(u).select();m=E,!m&&(g!=null&&g[0])&&A.unshift(g[0])}if(d.disabled=!1,d.textContent=n?"Salvar":"Criar Tarefa",m){alert("Erro: "+m.message);return}i(),ge()})}async function qt(e){const a=document.getElementById("search-results");if(!a)return;if(!e||e.length<2){a.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}a.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;y==null||y.role,y==null||y.tenant_id;const[{data:t},{data:i}]=await Promise.all([v.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),v.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),o=[];t!=null&&t.length&&(o.push('<div class="search-group-label">Imóveis</div>'),o.push(...t.map(l=>`
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
      </div>`))),a.innerHTML=o.length?o.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',a.querySelectorAll(".search-result-item").forEach(l=>{l.addEventListener("click",()=>{var r;(r=document.getElementById("search-overlay"))==null||r.classList.add("hidden"),l.dataset.type==="lead"?z("contatos"):z("properties")})})}let U=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function Tt(){var l;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let a=v.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);y!=null&&y.tenant_id&&(a=a.eq("tenant_id",y.tenant_id));const{data:n}=await a,t=n||[],i=t.filter(r=>!U.includes(String(r.id))),o=document.getElementById("notif-badge");if(o&&(o.textContent=i.length,i.length>0?o.classList.remove("hidden"):o.classList.add("hidden")),!t.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=t.map(r=>{const s=At(r.created_at);return`
      <div class="notif-item${!U.includes(String(r.id))?" unread":""}" data-id="${r.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${b(r.name||"—")}</div>
          <div class="notif-item-sub">${b(r.phone||r.source||"")} · ${s}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(l=document.getElementById("notif-see-all"))==null||l.addEventListener("click",r=>{r.preventDefault(),V(),z("contatos")}),e.querySelectorAll(".notif-item").forEach(r=>{r.addEventListener("click",()=>{U.push(r.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(U)),r.classList.remove("unread"),V(),z("contatos")})})}function Mt(){var e;document.querySelectorAll(".notif-item").forEach(a=>U.push(a.dataset.id)),U=[...new Set(U)],localStorage.setItem("crm_notifs_read",JSON.stringify(U)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(a=>a.classList.remove("unread"))}function At(e){if(!e)return"";const a=(Date.now()-new Date(e).getTime())/1e3;return a<60?"agora":a<3600?`${Math.floor(a/60)}min atrás`:a<86400?`${Math.floor(a/3600)}h atrás`:`${Math.floor(a/86400)}d atrás`}async function Nt(){let e=v.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);y!=null&&y.tenant_id&&(e=e.eq("tenant_id",y.tenant_id));const{data:a}=await e,t=(a||[]).filter(o=>!U.includes(String(o.id))),i=document.getElementById("notif-badge");i&&(i.textContent=t.length,t.length>0?i.classList.remove("hidden"):i.classList.add("hidden"))}let F=[],M=1;const se=10;let Ge=!1;async function Rt(){var a,n,t,i,o,l,r,s,c;document.getElementById("section-contatos")&&(Ge||(Ge=!0,await at(),(a=document.getElementById("btn-contato-search"))==null||a.addEventListener("click",()=>{M=1,ee()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",d=>{d.key==="Enter"&&(M=1,ee())}),(t=document.getElementById("btn-novo-contato"))==null||t.addEventListener("click",()=>nt()),(i=document.getElementById("btn-import-contato"))==null||i.addEventListener("click",Ut),(o=document.getElementById("import-modal-close"))==null||o.addEventListener("click",Te),(l=document.getElementById("import-modal-cancel"))==null||l.addEventListener("click",Te),(r=document.getElementById("download-template"))==null||r.addEventListener("click",d=>{d.preventDefault();const u=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,m=new Blob([u],{type:"text/csv"}),h=document.createElement("a");h.href=URL.createObjectURL(m),h.download="modelo_contatos.csv",h.click()}),(s=document.getElementById("import-csv-file"))==null||s.addEventListener("change",Ht),(c=document.getElementById("import-modal-confirm"))==null||c.addEventListener("click",jt)))}async function at(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let a=v.from("leads").select("*").order("created_at",{ascending:!1});(y==null?void 0:y.role)==="corretor"?a=a.eq("assigned_to",y.id):y!=null&&y.tenant_id&&(a=a.eq("tenant_id",y.tenant_id));const{data:t}=await a;F=t||[],ee()}function ee(){var r,s,c;const e=(((r=document.getElementById("contato-search"))==null?void 0:r.value)||"").toLowerCase(),a=e?F.filter(d=>(d.name||"").toLowerCase().includes(e)||(d.email||"").toLowerCase().includes(e)||(d.phone||"").toLowerCase().includes(e)):F,n=a.length,t=Math.max(1,Math.ceil(n/se));M>t&&(M=t);const i=a.slice((M-1)*se,M*se),o=document.getElementById("contatos-tbody");if(!o)return;i.length?o.innerHTML=i.map(d=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${d.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${d.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${b(d.name||"—")}</a>
        </td>
        <td>${b(d.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${d.email?b(d.email):"—"}</td>
        <td style="font-size:13px;">${d.phone?b(d.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${b(d.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${d.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):o.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const l=document.getElementById("contatos-pagination");if(l){const d=n===0?0:(M-1)*se+1,u=Math.min(M*se,n);l.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${d}–${u}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${M<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${M} / ${t}</span>
          <button class="btn-cancel" id="pag-next" ${M>=t?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(s=l.querySelector("#pag-prev"))==null||s.addEventListener("click",()=>{M--,ee()}),(c=l.querySelector("#pag-next"))==null||c.addEventListener("click",()=>{M++,ee()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(d=>{d.addEventListener("click",u=>{u.preventDefault();const m=d.dataset.id,h=F.find(p=>String(p.id)===String(m));h&&nt(h)})})}function nt(e=null){var o,l,r;const a=document.getElementById("contato-modal-root");a&&a.remove();const n=!!e,t=document.createElement("div");t.id="contato-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t);const i=()=>t.remove();(o=document.getElementById("cm-close"))==null||o.addEventListener("click",i),(l=document.getElementById("cm-cancel"))==null||l.addEventListener("click",i),t.addEventListener("click",s=>{s.target===t&&i()}),(r=document.getElementById("cm-save"))==null||r.addEventListener("click",async()=>{var h,p,g,E,f,w,S;const s=document.getElementById("contato-form");if(!s.checkValidity()){s.reportValidity();return}const c=new FormData(s),d=document.getElementById("cm-save");d.disabled=!0,d.textContent="Salvando…";const u={name:(h=c.get("name"))==null?void 0:h.trim(),company:((p=c.get("company"))==null?void 0:p.trim())||null,email:((g=c.get("email"))==null?void 0:g.trim())||null,phone:((E=c.get("phone"))==null?void 0:E.trim())||null,job_title:((f=c.get("job_title"))==null?void 0:f.trim())||null,city_interest:((w=c.get("city_interest"))==null?void 0:w.trim())||null,notes:((S=c.get("notes"))==null?void 0:S.trim())||null,stage:(e==null?void 0:e.stage)||"novo",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null,source:"manual"};let m;if(n){if({error:m}=await v.from("leads").update(u).eq("id",e.id),!m){const B=F.findIndex(C=>String(C.id)===String(e.id));B>=0&&(F[B]={...F[B],...u})}}else{const{data:B,error:C}=await v.from("leads").insert(u).select();m=C,!m&&(B!=null&&B[0])&&F.unshift(B[0])}if(d.disabled=!1,d.textContent=n?"Salvar":"Criar Contato",m){alert("Erro: "+m.message);return}i(),ee()})}let Z=[];function Ht(e){const a=e.target.files[0];if(!a)return;const n=new FileReader;n.onload=t=>{Z=t.target.result.split(`
`).filter(r=>r.trim()).slice(1).map(r=>{const[s,c,d,u,m]=r.split(",").map(h=>h.trim().replace(/^"|"$/g,""));return{name:s,email:c,phone:d,company:u,job_title:m}}).filter(r=>r.name);const o=document.getElementById("import-preview");o&&(o.textContent=`${Z.length} contato(s) encontrados para importar.`);const l=document.getElementById("import-modal-confirm");l&&(l.disabled=Z.length===0)},n.readAsText(a)}async function jt(){if(!Z.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const a=Z.map(t=>({...t,stage:"novo",source:"importado",assigned_to:(y==null?void 0:y.id)||null,tenant_id:(y==null?void 0:y.tenant_id)||null})),{error:n}=await v.from("leads").insert(a);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Te(),await at(),alert(`${a.length} contato(s) importados com sucesso!`)}function Ut(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),Z=[];const a=document.getElementById("import-preview");a&&(a.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const t=document.getElementById("import-csv-file");t&&(t.value="")}function Te(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const Pt="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function fe(e){return(await fetch(Pt,{method:"POST",headers:{Authorization:`Bearer ${ct}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function We(e){var s,c,d,u;const a=document.getElementById("settings-name"),n=document.getElementById("settings-email"),t=document.getElementById("settings-avatar-preview"),i=document.getElementById("settings-avatar-initial"),o=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!a)return;if(a.value=(e==null?void 0:e.name)||"",n){const{data:{user:m}}=await v.auth.getUser();n.value=(m==null?void 0:m.email)||""}const r=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(i&&(i.textContent=r),e!=null&&e.avatar_url&&t&&(t.src=e.avatar_url,t.style.display="",i&&(i.style.display="none")),o==null||o.addEventListener("change",m=>{const h=m.target.files[0];if(!h)return;const p=URL.createObjectURL(h);t&&(t.src=p,t.style.display=""),i&&(i.style.display="none")}),(s=document.getElementById("btn-change-password"))==null||s.addEventListener("click",async()=>{var f,w;const m=((f=document.getElementById("change-password-new"))==null?void 0:f.value)||"",h=((w=document.getElementById("change-password-confirm"))==null?void 0:w.value)||"",p=document.getElementById("change-password-msg"),g=document.getElementById("btn-change-password");if(p&&(p.style.display="none"),m.length<6){p&&(p.textContent="Mínimo 6 caracteres.",p.style.display="");return}if(m!==h){p&&(p.textContent="As senhas não coincidem.",p.style.display="");return}g&&(g.disabled=!0,g.textContent="Salvando…");const{error:E}=await v.auth.updateUser({password:m});g&&(g.disabled=!1,g.textContent="Salvar Nova Senha"),E?p&&(p.textContent="Erro: "+E.message,p.style.display=""):(p&&(p.style.color="#16a34a",p.textContent="Senha alterada com sucesso!",p.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var w;const m=a.value.trim();let h=(y==null?void 0:y.avatar_url)||"";const p=o==null?void 0:o.files[0],g=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",p)try{const S=await Le(p,400,.85),B=`avatars/${y.id}-${Date.now()}.jpg`,{error:C}=await v.storage.from("imoveis").upload(B,S,{contentType:"image/jpeg",upsert:!0});if(!C){const{data:{publicUrl:I}}=v.storage.from("imoveis").getPublicUrl(B);h=I}}catch(S){console.error("Avatar upload:",S)}const{error:E}=await v.from("profiles").update({name:m,avatar_url:h}).eq("id",y.id);if(l.disabled=!1,l.textContent=g,E){alert("Erro ao salvar perfil.");return}y={...y,name:m,avatar_url:h},qe(y);const f=document.getElementById("settings-avatar-initial");f&&(f.textContent=((w=m[0])==null?void 0:w.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"){const m=document.getElementById("settings-corretores-section");m&&(m.style.display=""),await Be(),(c=document.getElementById("btn-invite-corretor"))==null||c.addEventListener("click",async()=>{var f,w;const p=(f=document.getElementById("invite-email"))==null?void 0:f.value.trim(),g=(w=document.getElementById("invite-password"))==null?void 0:w.value.trim(),E=document.getElementById("btn-invite-corretor");if(!p){alert("Informe o e-mail do corretor.");return}if(!g||g.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}E&&(E.disabled=!0,E.textContent="Criando…");try{const S=await fe({email:p,password:g});if(S.success){alert("Acesso criado! O corretor receberá um e-mail com o login e a senha que você definiu.");const B=document.getElementById("invite-email"),C=document.getElementById("invite-password");B&&(B.value=""),C&&(C.value=""),await Be()}else alert("Erro: "+(S.error||"Falha desconhecida"))}catch(S){alert("Erro ao criar acesso: "+S.message)}finally{E&&(E.disabled=!1,E.textContent="+ Criar Acesso")}});const h=document.getElementById("settings-locations-section");h&&(h.style.display=""),await de(),(d=document.getElementById("loc-add-city-btn"))==null||d.addEventListener("click",async()=>{const p=document.getElementById("loc-new-city"),g=p==null?void 0:p.value.trim();if(!g)return;const{error:E}=await v.from("locations").insert({type:"cidade",name:g});if(E){alert("Erro ao adicionar cidade.");return}p&&(p.value=""),await de(),je()}),(u=document.getElementById("loc-add-neighborhood-btn"))==null||u.addEventListener("click",async()=>{var w;const p=parseInt((w=document.getElementById("loc-new-neighborhood-city"))==null?void 0:w.value,10),g=document.getElementById("loc-new-neighborhood"),E=g==null?void 0:g.value.trim();if(!p||!E){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:f}=await v.from("locations").insert({type:"bairro",name:E,parent_id:p});if(f){alert("Erro ao adicionar bairro.");return}g&&(g.value=""),await de()})}}async function Be(){const e=document.getElementById("corretores-list");if(!e)return;const{data:a,error:n}=await v.from("profiles").select("*").order("created_at");if(n||!a){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=a.map(t=>{const i=(t.name||"?")[0].toUpperCase(),o=t.avatar_url?`<img src="${t.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${b(i)}</div>`,l=t.id===(y==null?void 0:y.id),r=t.active!==!1,s=r?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',c=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${t.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${t.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${t.role==="admin"?" selected":""}>Admin</option>
         </select>`,d=l?"":r?`<button class="corretor-toggle-btn" data-uid="${t.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${t.id}" data-active="false">Liberar acesso</button>`,u=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${t.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${o}
        <div>
          <div class="corretor-name">${b(t.name||"—")}</div>
          <div class="corretor-role-badge">${t.role==="super_admin"?"⚡ Super Admin":t.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${s}
        ${c}
        ${d}
        ${u}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(t=>{t.addEventListener("change",async()=>{await v.from("profiles").update({role:t.value}).eq("id",t.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(t=>{t.addEventListener("click",async()=>{const i=t.dataset.uid,o=t.dataset.active==="true";t.disabled=!0,t.textContent="Aguarde…";try{const l=await fe({action:"toggle",userId:i,active:!o});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await Be()})}),e.querySelectorAll(".corretor-del-btn").forEach(t=>{t.addEventListener("click",async()=>{var l,r;const i=t.dataset.uid,o=((r=(l=t.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:r.textContent)||"este corretor";if(confirm(`Excluir "${o}"? Esta ação não pode ser desfeita.`)){t.disabled=!0;try{const s=await fe({action:"delete",userId:i});s.success||alert("Erro ao excluir: "+(s.error||"Falha desconhecida"))}catch(s){alert("Erro: "+s.message)}await Be()}})})}async function ot(){const{data:e,error:a}=await v.from("locations").select("*").order("name");return a?(console.error("loadLocations:",a),[]):(me=e||[],me)}function J(){return me.filter(e=>e.type==="cidade")}function He(e){return me.filter(a=>a.type==="bairro"&&a.parent_id===e)}function je(){const e=document.getElementById("adminCitySelect");if(!e)return;const a=e.value,n=J();e.innerHTML='<option value="">Selecione</option>'+n.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),a&&(e.value=a)}async function de(){await ot();const e=J(),a=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),t=document.getElementById("loc-new-neighborhood-city");if(!a||!n)return;a.innerHTML=e.length?e.map(o=>`
        <div class="loc-item">
          <span class="loc-item-name">${b(o.name)}</span>
          <button class="loc-del-btn" data-id="${o.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const i=me.filter(o=>o.type==="bairro");n.innerHTML=i.length?i.map(o=>{const l=e.find(r=>r.id===o.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${b(o.name)}</div>
              ${l?`<div class="loc-item-sub">${b(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${o.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',t&&(t.innerHTML='<option value="">Cidade…</option>'+e.map(o=>`<option value="${o.id}">${b(o.name)}</option>`).join("")),a.querySelectorAll(".loc-del-btn").forEach(o=>{o.addEventListener("click",async()=>{const l=o.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:r}=await v.from("locations").delete().eq("id",o.dataset.id);if(r){alert("Erro ao excluir.");return}await de(),je()})}),n.querySelectorAll(".loc-del-btn").forEach(o=>{o.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await v.from("locations").delete().eq("id",o.dataset.id);if(l){alert("Erro ao excluir.");return}await de()})})}function Ye(){var n,t,i,o,l,r,s,c,d,u,m,h,p,g,E,f,w,S,B,C;document.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{const x=I.closest(".filter-btns"),L=I.classList.contains("active");x.querySelectorAll(".filter-btn").forEach($=>$.classList.remove("active")),L||I.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var _;const I=(_=document.getElementById("f-city"))==null?void 0:_.value,x=J().find(q=>q.name===I),L=x?He(x.id):[],$=document.getElementById("f-neighborhood");$&&($.innerHTML='<option value="">Todos</option>'+L.map(q=>`<option value="${q.name}">${b(q.name)}</option>`).join(""))}),(t=document.getElementById("f-search-btn"))==null||t.addEventListener("click",()=>{pe(Re(k))}),(i=document.getElementById("f-clear-btn"))==null||i.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach($=>{const _=document.getElementById($);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach($=>{const _=document.getElementById($);_&&(_.value="")});const L=document.getElementById("f-neighborhood");L&&(L.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach($=>$.classList.remove("active")),pe(k)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{z(I.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{z(I.dataset.section)})});const e=document.getElementById("topnav-links"),a=document.getElementById("topnav-hamburger");a==null||a.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),(o=document.getElementById("modal-close"))==null||o.addEventListener("click",be),(l=document.getElementById("modal-cancel"))==null||l.addEventListener("click",be),(r=document.getElementById("property-modal"))==null||r.addEventListener("click",I=>{I.target.id==="property-modal"&&be()}),(s=document.getElementById("btn-new-property"))==null||s.addEventListener("click",()=>{R=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",G="",we([]),Ce("Novo Imóvel")}),(c=document.getElementById("logout-btn"))==null||c.addEventListener("click",async()=>{await v.auth.signOut(),location.reload()}),(d=document.getElementById("view-prev"))==null||d.addEventListener("click",()=>{H=(H-1+O.length)%O.length,Ie()}),(u=document.getElementById("view-next"))==null||u.addEventListener("click",()=>{H=(H+1)%O.length,Ie()}),(m=document.getElementById("view-modal-close"))==null||m.addEventListener("click",ye),(h=document.getElementById("view-modal-close2"))==null||h.addEventListener("click",ye),(p=document.getElementById("view-modal"))==null||p.addEventListener("click",I=>{I.target.id==="view-modal"&&ye()}),(g=document.getElementById("view-modal-share"))==null||g.addEventListener("click",()=>{const I=document.getElementById("share-panel");if(!I)return;const x=I.style.display!=="none";I.style.display=x?"none":"block"}),(E=document.getElementById("share-whatsapp"))==null||E.addEventListener("click",()=>{var $,_;const I=($=document.getElementById("share-link-input"))==null?void 0:$.value;if(!I)return;const x=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",L=encodeURIComponent("Olha esse imóvel que encontrei: "+x+`
`+I);window.open("https://wa.me/?text="+L,"_blank")}),(f=document.getElementById("share-instagram"))==null||f.addEventListener("click",()=>{var x,L;const I=(x=document.getElementById("share-link-input"))==null?void 0:x.value;I&&((L=navigator.clipboard)==null||L.writeText(I),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(w=document.getElementById("share-email"))==null||w.addEventListener("click",()=>{var _,q;const I=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!I)return;const x=((q=document.getElementById("view-modal-title"))==null?void 0:q.textContent)||"Imóvel",L=encodeURIComponent("Imóvel: "+x),$=encodeURIComponent(`Olá! Segue o link do imóvel:

`+I);window.open("mailto:?subject="+L+"&body="+$,"_blank")}),(S=document.getElementById("share-copy"))==null||S.addEventListener("click",()=>{var x;const I=document.getElementById("share-link-input");I&&((x=navigator.clipboard)==null||x.writeText(I.value).then(()=>{const L=document.getElementById("share-copy"),$=L.textContent;L.textContent="✅ Copiado!",setTimeout(()=>{L.textContent=$},2e3)}))}),(B=document.getElementById("view-modal-edit"))==null||B.addEventListener("click",()=>{var P;if((y==null?void 0:y.role)!=="admin")return;const I=document.getElementById("view-modal-title").textContent,x=k.find(N=>N.title===I);if(!x)return;ye(),R=x.id;const L=document.getElementById("property-form"),$=document.getElementById("form-submit-btn");$.textContent="Salvar Alterações",L.querySelector('[name="title"]').value=x.title||"",L.querySelector('[name="rua"]').value=x.rua||"",L.querySelector('[name="numero"]').value=x.numero||"",L.querySelector('[name="city"]').value=x.city||"",L.querySelector('[name="price"]').value=x.price||"",L.querySelector('[name="bedrooms"]').value=x.bedrooms||"",L.querySelector('[name="suites"]').value=x.suites||"",L.querySelector('[name="parking"]').value=x.parking||"",L.querySelector('[name="description"]').value=x.description||"",L.querySelector('[name="construction_status"]').value=x.construction_status||"",L.querySelector('[name="owner_name"]').value=x.owner_name||"",L.querySelector('[name="owner_phone"]').value=x.owner_phone||"",L.querySelector('[name="owner_email"]').value=x.owner_email||"",L.querySelector('[name="owner_notes"]').value=x.owner_notes||"",L.querySelector('[name="condominium"]').value=x.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=x.published===!0?"true":"false");const q=document.getElementById("adminCitySelect");q&&(q.value=x.city||"",q.dispatchEvent(new Event("change")),setTimeout(()=>{const N=document.getElementById("adminNeighborhood");N&&(N.value=x.neighborhood||"")},50)),G=x.cover_image||((P=x.images)==null?void 0:P[0])||"",we(x.images||[]),Ce("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(I=>{I.addEventListener("click",()=>{var x;document.querySelectorAll(".tab-btn").forEach(L=>L.classList.remove("active")),I.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(L=>L.classList.add("hidden")),(x=document.getElementById(`tab-${I.dataset.tab}`))==null||x.classList.remove("hidden")})}),(C=document.getElementById("admin-properties"))==null||C.addEventListener("click",I=>{if(I.target.closest(".action-btns"))return;const x=I.target.closest("tr");if(!x)return;const L=Number(x.dataset.id);if(!L)return;const $=k.find(_=>_.id===L);$&&Bt($)})}document.addEventListener("DOMContentLoaded",async()=>{var o,l,r;await Promise.all([lt(),ot()]),K=X("company.whatsapp",K),re=`https://wa.me/${K}`,Ne(),Et(),wt();const e=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");e&&a&&(je(),e.addEventListener("change",()=>{const s=J().find(d=>d.name===e.value),c=s?He(s.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+c.map(d=>`<option value="${d.name}">${b(d.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),t=document.getElementById("admin-root");if(n){const s=new URLSearchParams(window.location.hash.replace("#","")),c=new URLSearchParams(window.location.search),d=s.get("type")||c.get("type")||"",u=Ze||d==="recovery"||d==="invite"||window.location.hash.includes("access_token")||c.has("code"),m=document.getElementById("password-reset-overlay");if(u){n.style.display="none",t&&t.classList.add("hidden"),m&&(m.style.display="flex"),(o=document.getElementById("password-reset-form"))==null||o.addEventListener("submit",async p=>{var B,C;p.preventDefault();const g=((B=document.getElementById("new-password"))==null?void 0:B.value)||"",E=((C=document.getElementById("confirm-password"))==null?void 0:C.value)||"",f=document.getElementById("password-reset-msg"),w=p.target.querySelector('button[type="submit"]');if(f&&(f.style.display="none"),g!==E){f&&(f.textContent="As senhas não coincidem.",f.style.display="");return}w&&(w.disabled=!0,w.textContent="Salvando…");const{error:S}=await v.auth.updateUser({password:g});if(S){f&&(f.textContent="Erro: "+S.message,f.style.display=""),w&&(w.disabled=!1,w.textContent="Definir Senha");return}window.location.href=window.location.pathname}),c.has("code")&&await v.auth.exchangeCodeForSession(c.get("code")??"");return}const{data:{session:h}}=await v.auth.getSession();if(h){if(n.classList.add("hidden"),t&&t.classList.remove("hidden"),await Ee(),_e(),Ye(),Lt(),window.lucide&&lucide.createIcons(),y=await Oe(h.user.id),!y){await v.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden");return}if(y.active===!1){await v.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(y.needs_password_reset){n.style.display="none",t&&t.classList.add("hidden");const p=document.getElementById("password-reset-overlay");p&&(p.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async g=>{var C,I;g.preventDefault();const E=((C=document.getElementById("new-password"))==null?void 0:C.value)||"",f=((I=document.getElementById("confirm-password"))==null?void 0:I.value)||"",w=document.getElementById("password-reset-msg"),S=g.target.querySelector('button[type="submit"]');if(w&&(w.style.display="none"),E!==f){w&&(w.textContent="As senhas não coincidem.",w.style.display="");return}if(E.length<6){w&&(w.textContent="Mínimo 6 caracteres.",w.style.display="");return}S&&(S.disabled=!0,S.textContent="Salvando…");const{error:B}=await v.auth.updateUser({password:E});if(B){w&&(w.textContent="Erro: "+B.message,w.style.display=""),S&&(S.disabled=!1,S.textContent="Definir Senha");return}await v.from("profiles").update({needs_password_reset:!1}).eq("id",y.id),window.location.href=window.location.pathname});return}qe(y),Fe(y.role),await We(y),window.lucide&&lucide.createIcons(),Nt()}else{t&&t.classList.add("hidden"),n.classList.remove("hidden");const p=document.getElementById("login-form");p&&((r=document.getElementById("forgot-password-btn"))==null||r.addEventListener("click",async()=>{var f,w;const g=(w=(f=p.querySelector('input[name="email"]'))==null?void 0:f.value)==null?void 0:w.trim();if(!g){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:E}=await v.auth.resetPasswordForEmail(g,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(E?"Erro: "+E.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),p.addEventListener("submit",async g=>{g.preventDefault();const E=new FormData(p),f=E.get("email"),w=E.get("password");if(await ft(f,w)){n.classList.add("hidden"),t&&t.classList.remove("hidden"),await Ee(),_e(),Ye(),window.lucide&&lucide.createIcons();const{data:{session:B}}=await v.auth.getSession();if(y=B?await Oe(B.user.id):null,!y){await v.auth.signOut();return}if(y.active===!1){await v.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}qe(y),Fe(y.role),await We(y),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else _e();await ue();const i=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();dt(i),rt(K)});async function Dt(){const e=k.filter(i=>!i.reference);if(!e.length)return;const a=k.map(i=>i.reference||"").filter(i=>/^IO-\d+$/.test(i)).map(i=>parseInt(i.replace("IO-",""),10));let n=a.length?Math.max(...a)+1:1;const t=[...e].sort((i,o)=>i.id-o.id);for(const i of t){const o="IO-"+String(n).padStart(4,"0"),{error:l}=await v.from("properties").update({reference:o}).eq("id",i.id);if(!l){const r=k.findIndex(s=>s.id===i.id);r>=0&&(k[r].reference=o),n++}}pe(Re(k))}async function Ot(){const e=k.filter(a=>{var n;return(n=a.images)==null?void 0:n.some(t=>!t.includes("/wm-"))});if(e.length){for(const a of e){if(!a.images.some(o=>!o.includes("/wm-")))continue;const t=[];let i=!1;for(const o of a.images)if(o.includes("/wm-"))t.push(o);else try{const l=await Ft(o);t.push(l),i=!0}catch{t.push(o)}if(i){await v.from("properties").update({images:t}).eq("id",a.id);const o=k.findIndex(l=>l.id===a.id);o>=0&&(k[o].images=t)}}pe(Re(k))}}async function Ft(e){try{const a=await fetch(e);if(!a.ok)return e;const n=await a.blob(),t=URL.createObjectURL(n),i=await fetch("/logo.png"),o=i.ok?await i.blob():null,l=o?URL.createObjectURL(o):null;return new Promise(r=>{const s=new Image;s.onload=()=>{URL.revokeObjectURL(t);const c=document.createElement("canvas"),d=1200;let u=s.width,m=s.height;u>d&&(m=Math.round(m*d/u),u=d),c.width=u,c.height=m;const h=c.getContext("2d");h.drawImage(s,0,0,u,m);const p=g=>{if(g){const E=Math.round(u*.18),f=Math.round(g.naturalHeight*E/g.naturalWidth),w=Math.round(u*.02);h.globalAlpha=.45,h.drawImage(g,u-E-w,m-f-w,E,f),h.globalAlpha=1}c.toBlob(async E=>{try{const f=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:w}=await v.storage.from("imoveis").upload(f,E,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(w){console.error("Upload watermark error:",w),r(e);return}const{data:{publicUrl:S}}=v.storage.from("imoveis").getPublicUrl(f);r(S)}catch(f){console.error("Watermark upload exception:",f),r(e)}},"image/jpeg",.82)};if(l){const g=new Image;g.onload=()=>{URL.revokeObjectURL(l),p(g)},g.onerror=()=>{URL.revokeObjectURL(l),p(null)},g.src=l}else p(null)},s.onerror=()=>{URL.revokeObjectURL(t),r(e)},s.src=t})}catch(a){return console.error("applyWatermarkToUrl error:",a),e}}function j(e,a){e&&(e.textContent=a?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(a?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function Ue(e,a="assets"){const n=await Le(e,1200,.85),t=`${a}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:i}=await v.storage.from("imoveis").upload(t,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(i)throw i;const{data:{publicUrl:o}}=v.storage.from("imoveis").getPublicUrl(t);return o}async function zt(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("settings").select("key,value"),n={};a==null||a.forEach(i=>{n[i.key]=i.value||""});const t=i=>b(String(n[i]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",i=>{document.getElementById("co-logo-preview").src=i.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async i=>{const o=i.target.files[0];if(o)try{const l=await Ue(o,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const i=document.getElementById("co-save-identity");i.disabled=!0,i.textContent="Salvando…";const o=await Q([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);o&&Ne(),i.disabled=!1,i.textContent="Salvar Identidade",j(document.getElementById("co-identity-msg"),o)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const i=document.getElementById("co-save-contacts");i.disabled=!0,i.textContent="Salvando…";const o=document.getElementById("co-whatsapp").value.trim(),l=await Q([["company.whatsapp",o],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&o&&(K=o,re=`https://wa.me/${o}`),i.disabled=!1,i.textContent="Salvar Contatos",j(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const i=document.getElementById("co-save-social");i.disabled=!0,i.textContent="Salvando…";const o=await Q([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);i.disabled=!1,i.textContent="Salvar Redes Sociais",j(document.getElementById("co-social-msg"),o)})}async function Xt(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("settings").select("key,value"),n={};a==null||a.forEach(d=>{n[d.key]=d.value||""});const t=n["visual.accent_color"]||"#b8962e",i=n["visual.primary_bg"]||"#0f1c2e",o=n["visual.secondary_bg"]||"#1a2f4a",l=n["visual.hero_bg_url"]||"",r=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-price-max" type="number" class="form-control" value="${r}" min="100000" step="1000000" style="max-width:200px">
          <span style="font-size:13px;color:#9ca3af">R$</span>
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-images">Salvar Imagens</button>
        <span id="visual-images-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `;function s(d,u,m){const h=document.getElementById(d),p=document.getElementById(u);h==null||h.addEventListener("input",g=>{p.value=g.target.value,m()}),p==null||p.addEventListener("input",g=>{/^#[0-9a-fA-F]{6}$/.test(g.target.value)&&(h.value=g.target.value,m())})}function c(){var u,m,h,p;const d=((u=document.getElementById("col-accent-hex"))==null?void 0:u.value)||"#b8962e";(m=document.getElementById("vp-bar"))==null||m.style.setProperty("background",d),(h=document.getElementById("vp-dot"))==null||h.style.setProperty("background",d),(p=document.getElementById("vp-btn"))==null||p.style.setProperty("background",d),document.documentElement.style.setProperty("--accent",d)}s("col-accent","col-accent-hex",c),s("col-primary","col-primary-hex",()=>{}),s("col-secondary","col-secondary-hex",()=>{}),c(),document.getElementById("vis-hero-file").addEventListener("change",async d=>{const u=d.target.files[0];if(u)try{const m=await Ue(u,"hero");document.getElementById("vis-hero-url").value=m;const h=document.getElementById("vis-hero-preview");h.innerHTML=`<img src="${m}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,h.style.display=""}catch(m){alert("Erro no upload: "+m.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const d=document.getElementById("visual-save-colors");d.disabled=!0,d.textContent="Salvando…";const u=await Q([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);u&&Ne(),d.disabled=!1,d.textContent="Salvar Cores",j(document.getElementById("visual-colors-msg"),u)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",c())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const d=document.getElementById("visual-save-images");d.disabled=!0,d.textContent="Salvando…";const u=await Q([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);d.disabled=!1,d.textContent="Salvar Imagens",j(document.getElementById("visual-images-msg"),u)})}async function Vt(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("site_content").select("*"),n={};a==null||a.forEach(s=>{n[s.key]=s});const t=(s,c)=>{var d;return b(((d=n[s])==null?void 0:d[`value_${c}`])||"")},i=["pt","en","es"],o={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=s=>i.map(c=>`<button class="content-tab${c===s?" active":""}" data-lang="${c}">${o[c]}</button>`).join(""),r=s=>`
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
        ${i.map(s=>`<div class="content-panel${s==="pt"?" active":""}" data-panel="${s}">${r(s)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",s=>{var d;const c=s.target.closest(".content-tab");c&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(u=>u.classList.remove("active")),c.classList.add("active"),(d=document.querySelector(`#sc-panels [data-panel="${c.dataset.lang}"]`))==null||d.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const s=document.getElementById("sc-save-btn");s.disabled=!0,s.textContent="Salvando…";const c={};document.querySelectorAll(".sc-field").forEach(u=>{const m=u.dataset.key,h=u.dataset.lang;c[m]||(c[m]={}),c[m][h]=u.value});let d=!0;for(const[u,m]of Object.entries(c))await $e(u,{pt:m.pt,en:m.en,es:m.es})||(d=!1);s.disabled=!1,s.textContent="Salvar Conteúdo",j(document.getElementById("sc-save-msg"),d)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const s=document.getElementById("seo-save-btn");s.disabled=!0,s.textContent="Salvando…";const c=document.getElementById("seo-title").value.trim(),d=document.getElementById("seo-desc").value.trim(),u=await $e("seo.title_pt",{pt:c,en:c,es:c})&&await $e("seo.description_pt",{pt:d,en:d,es:d});s.disabled=!1,s.textContent="Salvar SEO",j(document.getElementById("seo-save-msg"),u)})}async function Gt(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await D())}async function D(){const e=document.getElementById("crm-body");if(!e)return;const[{data:a},{data:n},{data:t},{data:i}]=await Promise.all([v.from("crm_pipelines").select("*").order("sort_order"),v.from("crm_stages").select("*").order("sort_order"),v.from("crm_tags").select("*").order("name"),v.from("crm_lead_statuses").select("*").order("sort_order")]),o=a||[],l=o.find(m=>m.is_default)||o[0],r=o.map(m=>`<option value="${m.id}"${m.id===(l==null?void 0:l.id)?" selected":""}>${b(m.name)}</option>`).join(""),c=(n||[]).filter(m=>m.pipeline_id===(l==null?void 0:l.id)).map(m=>`
    <div class="stage-item" data-id="${m.id}">
      <div class="stage-color-dot" style="background:${m.color}"></div>
      <span class="stage-name">${b(m.name)}</span>
      <input type="color" value="${m.color}" data-sid="${m.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${m.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',d=(t||[]).map(m=>`<span class="tag-chip" style="background:${m.color}" data-id="${m.id}">
      ${b(m.name)}
      <button class="tag-chip-del" data-id="${m.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',u=(i||[]).map(m=>`
    <div class="stage-item" data-id="${m.id}">
      <div class="stage-color-dot" style="background:${m.color}"></div>
      <span class="stage-name">${b(m.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${m.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${m.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${r}</select>
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
      <div class="tags-grid" id="crm-tags-grid">${d}</div>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const m=document.getElementById("crm-new-stage").value.trim(),h=document.getElementById("crm-new-stage-color").value,p=parseInt(document.getElementById("crm-pipe-sel").value,10);m&&(await v.from("crm_stages").insert({pipeline_id:p,name:m,color:h,sort_order:99}),document.getElementById("crm-new-stage").value="",await D())}),e.querySelectorAll(".stage-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await v.from("crm_stages").delete().eq("id",m.dataset.id),await D())})}),e.querySelectorAll(".stage-color-pick").forEach(m=>{m.addEventListener("change",async h=>{await v.from("crm_stages").update({color:h.target.value}).eq("id",m.dataset.sid);const p=m.closest(".stage-item").querySelector(".stage-color-dot");p&&(p.style.background=h.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const m=document.getElementById("crm-new-tag").value.trim(),h=document.getElementById("crm-new-tag-color").value;m&&(await v.from("crm_tags").insert({name:m,color:h}),document.getElementById("crm-new-tag").value="",await D())}),e.querySelectorAll(".tag-chip-del").forEach(m=>{m.addEventListener("click",async()=>{await v.from("crm_tags").delete().eq("id",m.dataset.id),await D()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const m=document.getElementById("crm-new-status").value.trim(),h=document.getElementById("crm-new-status-color").value,p=document.getElementById("crm-new-status-final").checked;m&&(await v.from("crm_lead_statuses").insert({name:m,color:h,is_final:p,sort_order:99}),document.getElementById("crm-new-status").value="",await D())}),e.querySelectorAll(".status-del").forEach(m=>{m.addEventListener("click",async()=>{confirm("Remover este status?")&&(await v.from("crm_lead_statuses").delete().eq("id",m.dataset.id),await D())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var h;const m=(h=prompt("Nome do novo funil:"))==null?void 0:h.trim();m&&(await v.from("crm_pipelines").insert({name:m,sort_order:99}),await D())})}async function Wt(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("integrations").select("*"),n={};a==null||a.forEach(r=>{n[r.key]=r});const t=r=>{var s;return b(((s=n[r])==null?void 0:s.value)||"")},i=r=>{var s;return(s=n[r])!=null&&s.enabled?"checked":""},o=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${o.map(r=>`
        <div class="integration-row">
          <div class="integration-icon">${r.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${r.label}</div>
            <div class="integration-desc">${r.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${r.key}" ${i(r.key)}>
              <span class="toggle-slider"></span>
            </label>
            <input type="text" class="integration-value intg-val" data-key="${r.key}"
              value="${t(r.key)}" placeholder="${r.placeholder}">
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
      ${l.map(r=>`
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label">${r.label}</label>
          <input class="form-control smtp-field" data-key="${r.key}" value="${t(r.key)}" placeholder="${r.placeholder}">
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var u;const r=document.getElementById("intg-save-tracking");r.disabled=!0,r.textContent="Salvando…";let s=!0;const c=document.querySelectorAll(".intg-val"),d=document.querySelectorAll(".intg-toggle");for(let m=0;m<c.length;m++){const h=c[m].dataset.key,p=c[m].value.trim(),g=((u=d[m])==null?void 0:u.checked)??!1;await ke(h,p,g)||(s=!1)}r.disabled=!1,r.textContent="Salvar Integrações",j(document.getElementById("intg-tracking-msg"),s)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const r=document.getElementById("intg-save-smtp");r.disabled=!0,r.textContent="Salvando…";const s=document.querySelectorAll(".smtp-field");let c=!0;for(const u of s)await ke(u.dataset.key,u.value.trim(),!0)||(c=!1);const d=document.getElementById("smtp-pass").value;d&&(await ke("smtp_pass",d,!0)||(c=!1)),r.disabled=!1,r.textContent="Salvar SMTP",j(document.getElementById("intg-smtp-msg"),c)})}async function Yt(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Me(),document.getElementById("media-file-input").addEventListener("change",async n=>{var s,c;const t=Array.from(n.target.files);if(!t.length)return;const i=document.getElementById("media-upload-progress"),o=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");i.style.display="";let r=0;for(const d of t){l.textContent=`Enviando ${r+1}/${t.length}…`,o.style.width=`${Math.round(r/t.length*100)}%`;try{const u=await Ue(d,"media"),m=d.name.replace(/\.[^.]+$/,"").slice(0,60);await v.from("media_library").insert({name:m,url:u,type:"image",size:d.size,created_by:(c=(s=(await v.auth.getUser()).data)==null?void 0:s.user)==null?void 0:c.id})}catch(u){console.error("Media upload error:",u)}r++}o.style.width="100%",l.textContent=`✓ ${r} arquivo(s) enviado(s)`,setTimeout(()=>{i.style.display="none",o.style.width="0"},2e3),await Me(),n.target.value=""});const a=document.getElementById("media-drop-area");a.addEventListener("dragover",n=>{n.preventDefault(),a.classList.add("drag-over")}),a.addEventListener("dragleave",()=>a.classList.remove("drag-over")),a.addEventListener("drop",n=>{n.preventDefault(),a.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Me(){const e=document.getElementById("media-grid");if(!e)return;const{data:a,error:n}=await v.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(a!=null&&a.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=a.map(t=>`
    <div class="media-item" data-id="${t.id}" data-url="${b(t.url)}">
      <img src="${b(t.url)}" alt="${b(t.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${b(t.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${t.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${b(t.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(t=>{t.addEventListener("click",i=>{var o;i.stopPropagation(),(o=navigator.clipboard)==null||o.writeText(t.dataset.url).then(()=>{const l=t.textContent;t.textContent="✓ Copiado!",setTimeout(()=>{t.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(t=>{t.addEventListener("click",async i=>{i.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await v.from("media_library").delete().eq("id",t.dataset.id),await Me())})})}async function Jt(){var a,n,t,i,o;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(s=>s.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(s=>s.classList.add("hidden")),l.classList.add("active");const r=e.querySelector(`#sa-panel-${l.dataset.tab}`);r&&r.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&W(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&Kt(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&Je(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&Ke(),l.dataset.tab==="platform"&&Qe()})}),(a=e.querySelector("#sa-sub-filter"))==null||a.addEventListener("change",Je),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",W),(t=e.querySelector("#sa-user-search"))==null||t.addEventListener("input",Ke),(i=e.querySelector("#sa-tenant-new"))==null||i.addEventListener("click",()=>ea()),(o=e.querySelector("#sa-plat-save"))==null||o.addEventListener("click",Qt),W(),Qe())}async function W(){var r,s;const e=document.getElementById("sa-tenants-list"),a=((s=(r=document.getElementById("sa-tenant-search"))==null?void 0:r.value)==null?void 0:s.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=v.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:t,error:i}=await n;if(i){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${i.message}</div>`;return}const o=(t||[]).filter(c=>{var d,u;return!a||((d=c.name)==null?void 0:d.toLowerCase().includes(a))||((u=c.slug)==null?void 0:u.toLowerCase().includes(a))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const l=c=>c.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=o.map(c=>{var d;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        ${c.logo_url?`<img class="sa-tenant-logo" src="${b(c.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${b(c.name||"—")}</div>
          <div class="sa-list-sub">${b(c.slug||"")} · ${b(((d=c.plans)==null?void 0:d.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${l(c)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${c.id}" data-active="${c.active}" title="${c.active?"Desativar":"Ativar"}">${c.active?"⏸️":"▶️"}</button>
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${c.id}" title="Editar">✏️</button>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(c=>{c.addEventListener("click",async()=>{const d=c.dataset.active==="true";await v.from("tenants").update({active:!d}).eq("id",c.dataset.id),W()})}),e.querySelectorAll('[data-action="edit-tenant"]').forEach(c=>{c.addEventListener("click",()=>{const d=(o||[]).find(u=>String(u.id)===String(c.dataset.id));d&&ta(d)})})}async function Kt(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:a,error:n}=await v.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(a||[]).map(t=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${b(t.name)}</div>
      <div class="sa-plan-price">${t.price_brl===0?"Gratuito":"R$ "+Number(t.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${t.max_users===999?"Ilimitado":t.max_users} usuários</span>
        <span>🏠 ${t.max_properties===9999?"Ilimitado":t.max_properties} imóveis</span>
        <span>📋 ${t.max_leads===99999?"Ilimitado":t.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function Je(){var r;const e=document.getElementById("sa-subs-list"),a=((r=document.getElementById("sa-sub-filter"))==null?void 0:r.value)||"";if(!e)return;e.dataset.loaded="1";let n=v.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});a&&(n=n.eq("status",a));const{data:t,error:i}=await n;if(i){e.innerHTML=`<div class="sa-error">Erro: ${i.message}</div>`;return}if(!(t!=null&&t.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const o={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},l={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=t.map(s=>{var c,d,u;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${b(((c=s.tenants)==null?void 0:c.name)||"—")}</div>
          <div class="sa-list-sub">${b(((d=s.plans)==null?void 0:d.name)||"—")} · R$ ${Number(((u=s.plans)==null?void 0:u.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${o[s.status]||"gray"}">${l[s.status]||s.status}</span>
        <span class="sa-list-date">${s.current_period_end?new Date(s.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function Ke(){var l,r;const e=document.getElementById("sa-users-list"),a=((r=(l=document.getElementById("sa-user-search"))==null?void 0:l.value)==null?void 0:r.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:t}=await v.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(t){e.innerHTML=`<div class="sa-error">Erro: ${t.message}</div>`;return}const i=(n||[]).filter(s=>{var c,d;return!a||((c=s.name)==null?void 0:c.toLowerCase().includes(a))||((d=s.email)==null?void 0:d.toLowerCase().includes(a))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const o={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=i.map(s=>{var c;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(s.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${b(s.name||"—")}</div>
          <div class="sa-list-sub">${b(((c=s.tenants)==null?void 0:c.name)||"Sem imobiliária")} · ${o[s.role]||s.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${s.active!==!1?"sa-badge-green":"sa-badge-red"}">${s.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function Qe(){const[e,a,n,t]=await Promise.all([v.from("tenants").select("id",{count:"exact",head:!0}),v.from("profiles").select("id",{count:"exact",head:!0}),v.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),v.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),i=(o,l)=>{const r=document.getElementById(o);r&&(r.textContent=l??"—")};i("sa-stat-tenants",e.count),i("sa-stat-users",a.count),i("sa-stat-subs",n.count),i("sa-stat-props",t.count)}async function Qt(){var n,t,i;const e=document.getElementById("sa-plat-save"),a=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await Q([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((t=document.getElementById("sa-plat-email"))==null?void 0:t.value)||""},{key:"platform.trial_days",value:((i=document.getElementById("sa-plat-trial"))==null?void 0:i.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),j(a,!0)}function Zt(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ea(){var t,i,o,l,r,s;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const a=document.createElement("div");a.id="sa-new-tenant-modal",a.className="sa-modal-backdrop",a.innerHTML=`
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
  `,document.body.appendChild(a),v.from("plans").select("id, name").then(({data:c})=>{const d=document.getElementById("nt-plan");d&&c&&(d.innerHTML='<option value="">Sem plano</option>'+c.map(u=>`<option value="${u.id}">${b(u.name)}</option>`).join(""))}),(t=document.getElementById("nt-name"))==null||t.addEventListener("input",c=>{const d=document.getElementById("nt-slug");d&&!d.dataset.manual&&(d.value=Zt(c.target.value))}),(i=document.getElementById("nt-slug"))==null||i.addEventListener("input",c=>{c.target.dataset.manual="1"}),(o=document.getElementById("nt-pwd-toggle"))==null||o.addEventListener("click",()=>{const c=document.getElementById("nt-admin-password");c.type=c.type==="password"?"text":"password"});const n=()=>a.remove();(l=document.getElementById("sa-modal-close-btn"))==null||l.addEventListener("click",n),(r=document.getElementById("nt-cancel"))==null||r.addEventListener("click",n),a.addEventListener("click",c=>{c.target===a&&n()}),(s=document.getElementById("nt-save"))==null||s.addEventListener("click",async()=>{var C,I,x,L,$,_,q,P,N,te,ae,ne;const c=(I=(C=document.getElementById("nt-name"))==null?void 0:C.value)==null?void 0:I.trim(),d=(L=(x=document.getElementById("nt-slug"))==null?void 0:x.value)==null?void 0:L.trim(),u=(_=($=document.getElementById("nt-domain"))==null?void 0:$.value)==null?void 0:_.trim(),m=(q=document.getElementById("nt-plan"))==null?void 0:q.value,h=(N=(P=document.getElementById("nt-admin-email"))==null?void 0:P.value)==null?void 0:N.trim(),p=(ae=(te=document.getElementById("nt-admin-password"))==null?void 0:te.value)==null?void 0:ae.trim(),g=document.getElementById("nt-msg"),E=document.getElementById("nt-save");if(!c||!d){g.textContent="❌ Nome e slug são obrigatórios.",g.style.color="#ef4444";return}if(!h){g.textContent="❌ Informe o e-mail do admin.",g.style.color="#ef4444";return}if(!p||p.length<6){g.textContent="❌ A senha precisa ter mínimo 6 caracteres.",g.style.color="#ef4444";return}E.disabled=!0,E.textContent="Criando…",g.textContent="⏳ Criando imobiliária…",g.style.color="#64748b";const{data:f,error:w}=await v.from("tenants").insert({name:c,slug:d,domain:u||null,plan_id:m||null,active:!0}).select();if(w){E.disabled=!1,E.textContent="Criar Imobiliária",g.textContent="❌ "+w.message,g.style.color="#ef4444";return}const S=(ne=f==null?void 0:f[0])==null?void 0:ne.id;g.textContent="⏳ Criando usuário admin…";const B=await fe({email:h,password:p,role:"admin",tenant_id:S});if(!(B!=null&&B.success)){E.disabled=!1,E.textContent="Criar Imobiliária",g.textContent="⚠️ Imobiliária criada, mas erro ao criar usuário: "+((B==null?void 0:B.error)||"Desconhecido"),g.style.color="#f59e0b",setTimeout(()=>{n(),W()},2500);return}S&&(B!=null&&B.user_id)&&await v.from("profiles").update({role:"admin",tenant_id:S}).eq("id",B.user_id),E.disabled=!1,E.textContent="Criar Imobiliária",g.textContent="✅ Imobiliária e admin criados com sucesso!",g.style.color="#22c55e",setTimeout(()=>{n(),W()},1200)})}function ta(e){var i,o,l,r,s,c;const a=document.getElementById("sa-edit-tenant-modal");a&&a.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop",n.innerHTML=`
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
        <button id="et-cancel" class="btn-secondary-sm">Cancelar</button>
        <button id="et-save" class="btn-primary-sm">Salvar</button>
      </div>
    </div>
  `,document.body.appendChild(n),v.from("plans").select("id, name").then(({data:d})=>{const u=document.getElementById("et-plan");u&&d&&(u.innerHTML='<option value="">Sem plano</option>'+d.map(m=>`<option value="${m.id}"${String(m.id)===String(e.plan_id)?" selected":""}>${b(m.name)}</option>`).join(""))}),(i=document.getElementById("et-logo-input"))==null||i.addEventListener("change",d=>{const u=d.target.files[0];if(!u)return;const m=URL.createObjectURL(u),h=document.getElementById("et-logo-preview");h&&(h.innerHTML=`<img src="${m}" style="width:100%;height:100%;object-fit:cover;">`)}),(o=document.getElementById("et-logo-preview"))==null||o.addEventListener("click",()=>{var d;(d=document.getElementById("et-logo-input"))==null||d.click()}),(l=document.getElementById("et-pwd-toggle"))==null||l.addEventListener("click",()=>{const d=document.getElementById("et-admin-password");d.type=d.type==="password"?"text":"password"});const t=()=>n.remove();(r=document.getElementById("et-close"))==null||r.addEventListener("click",t),(s=document.getElementById("et-cancel"))==null||s.addEventListener("click",t),n.addEventListener("click",d=>{d.target===n&&t()}),(c=document.getElementById("et-save"))==null||c.addEventListener("click",async()=>{var C,I,x,L,$,_,q,P,N,te,ae,ne;const d=(I=(C=document.getElementById("et-name"))==null?void 0:C.value)==null?void 0:I.trim(),u=(L=(x=document.getElementById("et-slug"))==null?void 0:x.value)==null?void 0:L.trim(),m=(_=($=document.getElementById("et-domain"))==null?void 0:$.value)==null?void 0:_.trim(),h=(q=document.getElementById("et-plan"))==null?void 0:q.value,p=(N=(P=document.getElementById("et-admin-email"))==null?void 0:P.value)==null?void 0:N.trim(),g=(ae=(te=document.getElementById("et-admin-password"))==null?void 0:te.value)==null?void 0:ae.trim(),E=(ne=document.getElementById("et-logo-input"))==null?void 0:ne.files[0],f=document.getElementById("et-msg"),w=document.getElementById("et-save");if(!d){f.textContent="❌ Nome é obrigatório.",f.style.color="#ef4444";return}w.disabled=!0,w.textContent="Salvando…",f.textContent="⏳ Salvando…",f.style.color="#64748b";let S=e.logo_url;if(E)try{const T=await Le(E,256,.85),Pe=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:it}=await v.storage.from("imoveis").upload(Pe,T,{contentType:"image/jpeg",upsert:!0});if(!it){const{data:{publicUrl:st}}=v.storage.from("imoveis").getPublicUrl(Pe);S=st}}catch(T){console.error("Logo upload:",T)}const{error:B}=await v.from("tenants").update({name:d,slug:u||e.slug,domain:m||null,plan_id:h||null,logo_url:S}).eq("id",e.id);if(B){w.disabled=!1,w.textContent="Salvar",f.textContent="❌ "+B.message,f.style.color="#ef4444";return}if(p&&g&&g.length>=6){f.textContent="⏳ Criando usuário admin…";const T=await fe({email:p,password:g,role:"admin",tenant_id:e.id});T!=null&&T.success?(T!=null&&T.user_id&&await v.from("profiles").update({role:"admin",tenant_id:e.id}).eq("id",T.user_id),f.textContent="✅ Salvo e admin criado!",f.style.color="#22c55e"):(f.textContent="⚠️ Salvo, mas erro ao criar admin: "+((T==null?void 0:T.error)||"Tente novamente"),f.style.color="#f59e0b")}else f.textContent="✅ Imobiliária atualizada!",f.style.color="#22c55e";w.disabled=!1,w.textContent="Salvar",setTimeout(()=>{t(),W()},1200)})}
