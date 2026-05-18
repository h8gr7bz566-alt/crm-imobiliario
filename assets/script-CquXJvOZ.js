import{s as g}from"./supabase-BcuJ3xoD.js";let ee={},ve={};async function Ae(){const[e,a]=await Promise.all([g.from("settings").select("key,value"),g.from("site_content").select("*")]);e.data&&e.data.forEach(n=>{ee[n.key]=n.value}),a.data&&a.data.forEach(n=>{ve[n.key]=n})}const U=(e,a=null)=>ee[e]!==void 0?ee[e]:a,oe=(e,a="pt")=>{const n=ve[e];return n?n[`value_${a}`]??n.value_pt??null:null};async function D(e){const a=new Date().toISOString(),n=e.map(([i,s])=>({key:i,value:s,updated_at:a})),{error:t}=await g.from("settings").upsert(n,{onConflict:"key"});return t||e.forEach(([i,s])=>{ee[i]=s}),!t}async function ie(e,{pt:a,en:n,es:t}){const i={key:e,value_pt:a,value_en:n,value_es:t,updated_at:new Date().toISOString()},{error:s}=await g.from("site_content").upsert(i,{onConflict:"key"});return s||(ve[e]=i),!s}async function le(e,a,n){const{error:t}=await g.from("integrations").upsert({key:e,value:a,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!t}function pe(){const e=document.documentElement,a=U("visual.accent_color","#b8962e"),n=U("visual.primary_bg","#0f1c2e"),t=U("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",a),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",t);const i=U("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(o=>{o.src=i});const s=U("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=s);const c=U("visual.hero_bg_url","");if(c){const o=document.querySelector(".hero");o&&(o.style.backgroundImage=`url('${c}')`)}}function Me(e="pt"){const a=v=>oe(v,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&a("hero.title")&&(n.innerHTML=a("hero.title"));const t=document.querySelector(".hero-content > p");t&&a("hero.subtitle")&&(t.innerHTML=a("hero.subtitle"));const i=document.querySelector(".footer small");i&&a("footer.text")&&(i.innerHTML=a("footer.text"));const s=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),c=document.querySelector('[data-i18n="inst.p3"]');s&&a("inst.bio_p1")&&(s.innerHTML=a("inst.bio_p1")),l&&a("inst.bio_p2")&&(l.innerHTML=a("inst.bio_p2")),c&&a("inst.bio_p3")&&(c.innerHTML=a("inst.bio_p3"));const o=document.querySelector('[data-i18n-num="inst.stat2num"]'),d=document.querySelector('[data-i18n="inst.stat1"]'),m=document.querySelector('[data-i18n="inst.stat2"]'),u=document.querySelector('[data-i18n="inst.stat3"]');o&&a("inst.stat2_num")&&(o.innerHTML=a("inst.stat2_num")),d&&a("inst.stat1_label")&&(d.innerHTML=a("inst.stat1_label")),m&&a("inst.stat2_label")&&(m.innerHTML=a("inst.stat2_label")),u&&a("inst.stat3_label")&&(u.innerHTML=a("inst.stat3_label"));const r=oe("seo.title_pt",e);r&&document.title&&(document.title=r);const f=oe("seo.description_pt",e);if(f){const v=document.querySelector('meta[name="description"]');v&&(v.content=f)}}function Te(e){if(!e)return;const a=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const t=n.getAttribute("href");if(t){const i=t.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=a+i}})}const Pe="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let F="5547999701743",V=`https://wa.me/${F}`;const H=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],Ne=5.7;function W(e,a){if(!e)return"—";const n=String(e).trim();let t;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?t=parseFloat(n.replace(/\./g,"").replace(",",".")):t=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(t)||t===0?n:a==="en"?"$ "+(t/Ne).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+t.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let L=[],S=null,G=[],Ce=!1;g.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(Ce=!0)});async function Re(){const{data:e,error:a}=await g.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):e||[]}async function Ue(){const{data:e,error:a}=await g.from("properties").select("*").order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):(L=e||[],Ze(),Qe(),L)}async function je(e){if(e.id){const{id:a,created_at:n,...t}=e,{error:i}=await g.from("properties").update(t).eq("id",a);if(i)throw i;const s=L.findIndex(l=>l.id===a);s>=0&&(L[s]={...L[s],...t})}else{if(!e.reference){const t=L.map(s=>s.reference||"").filter(s=>/^IO-\d+$/.test(s)).map(s=>parseInt(s.replace("IO-",""),10)),i=t.length?Math.max(...t)+1:1;e.reference="IO-"+String(i).padStart(4,"0")}const{data:a,error:n}=await g.from("properties").insert(e).select();if(n)throw n;a!=null&&a[0]&&L.unshift(a[0])}}async function He(e){const{error:a}=await g.from("properties").delete().eq("id",e);if(a)throw a;L=L.filter(n=>n.id!==e)}async function Oe(e,a){const{error:n}=await g.auth.signInWithPassword({email:e,password:a});return!n}function ge(e,a=1200,n=.78){return new Promise((t,i)=>{const s=new Image,l=URL.createObjectURL(e);s.onload=()=>{URL.revokeObjectURL(l);const c=document.createElement("canvas");let o=s.width,d=s.height;o>a&&(d=Math.round(d*a/o),o=a),c.width=o,c.height=d;const m=c.getContext("2d");m.drawImage(s,0,0,o,d);const u=new Image;u.crossOrigin="anonymous",u.onload=()=>{const r=Math.round(o*.18),f=Math.round(u.naturalHeight*r/u.naturalWidth),v=Math.round(o*.02),y=o-r-v,w=d-f-v;m.globalAlpha=.45,m.drawImage(u,y,w,r,f),m.globalAlpha=1,c.toBlob(p=>p?t(p):i(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.onerror=()=>{c.toBlob(r=>r?t(r):i(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.src="/logo.png"},s.onerror=i,s.src=l})}async function Fe(e){const a=await ge(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:t}=await g.storage.from("imoveis").upload(n,a,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(t)throw t;const{data:{publicUrl:i}}=g.storage.from("imoveis").getPublicUrl(n);return i}async function De(e,a){const n=Array.from(e).filter(i=>i.size>0),t=[];for(let i=0;i<n.length;i++)a&&a(i+1,n.length),t.push(await Fe(n[i]));return t}async function J(){var u,r,f,v,y,w;const e=document.getElementById("vendas-carousel"),a=document.getElementById("properties");if(!e&&!a)return;const n=await Re();L=n,((u=document.getElementById("selecao-carousel"))==null?void 0:u.innerHTML)===""&&Xe(n);const t=((r=document.getElementById("city-filter"))==null?void 0:r.value)||"",i=((f=document.getElementById("neighborhood-filter"))==null?void 0:f.value)||"",s=((v=document.getElementById("bedrooms-filter"))==null?void 0:v.value)||"",l=((y=document.getElementById("parking-filter"))==null?void 0:y.value)||"",c=((w=document.getElementById("construction-filter"))==null?void 0:w.value)||"",o=document.getElementById("price-slider"),d=o?parseInt(o.value,10):13e7,m=n.filter(p=>{if(t&&p.city!==t||i&&p.neighborhood!==i||s&&(s==="4+"&&Number(p.bedrooms)<4||s!=="4+"&&Number(p.bedrooms)!==Number(s))||l&&(l==="4+"&&Number(p.parking)<4||l!=="4+"&&Number(p.parking)!==Number(l))||c&&p.construction_status!==c)return!1;const h=String(p.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),x=parseInt(h,10)||0;return!(x<0||x>d)});if(e){if(!m.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=m.map(p=>{var $;const h=p.cover_image||(($=p.images)==null?void 0:$[0])||H[0],x=[p.neighborhood,p.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${h}" alt="${b(p.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${b(p.title)}</div>
            <div class="selecao-card-loc">${b(x)}</div>
            <div class="selecao-card-price">${b(W(p.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${p.id}" class="btn-det">Ver Detalhes</a>
              <a href="${V}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!m.length){a.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}a.innerHTML=m.map(p=>{var $;const h=($=p.images)!=null&&$.length?p.images:H,x=h.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${x}" data-idx="0" data-pid="${p.id}">
          <img src="${p.cover_image||h[0]}" alt="${b(p.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${x>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${b(p.title)}</strong>
          <div class="muted">${b(p.neighborhood||"")}, ${b(p.city||"")}</div>
          <div><strong>${b(W(p.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${p.bedrooms||"--"} | 🚗 ${p.parking||"--"} ${x>1?"| 📸 "+x:""}</div>
          <p class="muted">${b((p.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${p.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${V}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(p=>{p.removeEventListener("click",Ie),p.addEventListener("click",Ie)})}function Xe(e){var i,s,l;const a=document.getElementById("selecao-carousel");if(!a)return;const n=e.slice(0,6);if(!n.length){(i=a.closest(".selecao-section"))==null||i.classList.add("hidden");return}a.innerHTML=n.map(c=>{var m;const o=c.cover_image||((m=c.images)==null?void 0:m[0])||H[0],d=[c.neighborhood,c.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${o}" alt="${b(c.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${b(c.title)}</div>
          <div class="selecao-card-loc">${b(d)}</div>
          <div class="selecao-card-price">${b(W(c.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${c.id}" class="btn-det">Ver Detalhes</a>
            <a href="${V}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const t=a.closest(".selecao-carousel-wrap");(s=t==null?void 0:t.querySelector(".selecao-prev"))==null||s.addEventListener("click",()=>{a.scrollBy({left:-340,behavior:"smooth"})}),(l=t==null?void 0:t.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{a.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const a=document.getElementById("construction-filter");a&&(a.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),J()};function Ie(e){var c;e.stopPropagation();const a=e.currentTarget.closest(".carousel-wrap");if(!a)return;const n=parseInt(a.dataset.total,10);if(!n)return;let t=parseInt(a.dataset.idx,10)||0;const i=e.currentTarget.classList.contains("carousel-next")?1:-1;t=(t+i+n)%n,a.dataset.idx=t;const s=parseInt(a.dataset.pid,10),l=L.find(o=>o.id===s);(c=l==null?void 0:l.images)!=null&&c.length&&(a.querySelector(".carousel-img").src=l.images[t])}function ze(){const e=document.getElementById("price-slider"),a=document.getElementById("price-label");!e||!a||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",a.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);a.textContent="Até R$ "+n.toLocaleString("pt-BR"),J()}))}function Ve(){const e=document.getElementById("city-filter"),a=document.getElementById("neighborhood-filter");if(e&&a){const n=O();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),e.addEventListener("change",()=>{const t=O().find(s=>s.name===e.value),i=t?ye(t.id):[];a.innerHTML='<option value="">Todos os bairros</option>'+i.map(s=>`<option value="${s.name}">${b(s.name)}</option>`).join(""),J()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",J)})}function Y(e){const a=document.getElementById("admin-properties");if(a){if(!e.length){a.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}a.innerHTML=e.map(n=>{var l;const t=n.cover_image||((l=n.images)==null?void 0:l[0])||H[0],i=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",s=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${t}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${b(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${b(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+b(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${b(i)}</td>
      <td class="cell-price">${b(W(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${s}</td>
      <td>
        <div class="action-btns">
          ${(S==null?void 0:S.role)==="admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(S==null?void 0:S.role)==="admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function We(){const e=document.getElementById("f-city");if(!e)return;const a=O(),n=e.value;e.innerHTML='<option value="">Todas</option>'+a.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),n&&(e.value=n)}function Ge(){var e,a,n,t,i,s,l,c,o,d,m,u,r,f,v;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((a=document.getElementById("f-title"))==null?void 0:a.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((t=document.getElementById("f-city"))==null?void 0:t.value)||"",neighborhood:((i=document.getElementById("f-neighborhood"))==null?void 0:i.value)||"",condominium:(((s=document.getElementById("f-condominium"))==null?void 0:s.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((c=document.getElementById("f-price-max"))==null?void 0:c.value)||1/0,areaMin:parseFloat((o=document.getElementById("f-area-min"))==null?void 0:o.value)||0,areaMax:parseFloat((d=document.getElementById("f-area-max"))==null?void 0:d.value)||1/0,construction:((m=document.getElementById("f-construction"))==null?void 0:m.value)||"",published:((u=document.getElementById("f-published"))==null?void 0:u.value)||"",bedrooms:((r=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:r.dataset.val)||"",suites:((f=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:f.dataset.val)||"",parking:((v=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:v.dataset.val)||""}}function fe(e){const a=Ge();return Object.values(a).some(t=>t!==""&&t!==0&&t!==1/0)?e.filter(t=>{if(a.ref&&!(t.reference||"").toLowerCase().includes(a.ref)||a.title&&!(t.title||"").toLowerCase().includes(a.title)||a.type&&!(t.title||"").toLowerCase().includes(a.type.toLowerCase())||a.city&&t.city!==a.city||a.neighborhood&&t.neighborhood!==a.neighborhood||a.condominium&&!(t.condominium||"").toLowerCase().includes(a.condominium))return!1;const i=parseInt(String(t.price||"").replace(/[^0-9]/g,""),10)||0;if(a.priceMin>0&&i<a.priceMin||a.priceMax<1/0&&i>a.priceMax)return!1;const s=parseFloat(t.area)||0;return!(a.areaMin>0&&s<a.areaMin||a.areaMax<1/0&&s>a.areaMax||a.construction&&t.construction_status!==a.construction||a.published!==""&&String(t.published)!==a.published||a.bedrooms&&(a.bedrooms==="5+"&&Number(t.bedrooms)<5||a.bedrooms!=="5+"&&Number(t.bedrooms)!==Number(a.bedrooms))||a.suites&&(a.suites==="5+"&&Number(t.suites)<5||a.suites!=="5+"&&Number(t.suites)!==Number(a.suites))||a.parking&&(a.parking==="5+"&&Number(t.parking)<5||a.parking!=="5+"&&Number(t.parking)!==Number(a.parking)))}):e}async function te(){if(!document.getElementById("admin-properties"))return;const e=await Ue(),a=e.length,n=e.filter(l=>l.published===!0).length,t=document.getElementById("stat-total"),i=document.getElementById("stat-published"),s=document.getElementById("stat-leads");t&&(t.textContent=a),i&&(i.textContent=n),s&&(s.textContent="—"),We(),Y(L)}let M=null,j="";function ce(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Q(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function ae(e){const a=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!a||!n)){if(!e.length){a.style.display="none";return}a.style.display="",n.innerHTML=e.map(t=>`
    <div class="cover-thumb-wrap${t===j?" selected":""}" data-url="${t}">
      <img src="${t}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(t=>{t.addEventListener("click",()=>{j=t.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(i=>i.classList.remove("selected")),t.classList.add("selected")})})}}function re(){const e=document.getElementById("property-form");if(!e)return;const a=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{n.preventDefault();const t=new FormData(e),i=t.getAll("images");let s=[];const l=i.filter(o=>o.size>0);if(l.length){a.disabled=!0,a.textContent=`Enviando 0/${l.length} foto…`;try{s=await De(l,(o,d)=>{a.textContent=`Enviando ${o}/${d} foto…`})}catch(o){console.error("Erro no upload:",o),a.disabled=!1,a.textContent=M?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(M){const o=L.find(d=>d.id===M);o!=null&&o.images&&(s=o.images)}s.length||(s=[...H]);const c={...M?{id:M}:{},title:t.get("title"),rua:t.get("rua")||"",numero:t.get("numero")||"",city:t.get("city"),neighborhood:t.get("neighborhood"),price:t.get("price"),bedrooms:parseInt(t.get("bedrooms"),10)||0,suites:parseInt(t.get("suites"),10)||0,area:parseFloat(t.get("area"))||0,parking:parseInt(t.get("parking"),10)||0,published:t.get("published")==="true",images:s,description:t.get("description")||"",owner_name:t.get("owner_name")||"",owner_phone:t.get("owner_phone")||"",owner_email:t.get("owner_email")||"",owner_notes:t.get("owner_notes")||"",cover_image:j||"",construction_status:t.get("construction_status")||"",condominium:t.get("condominium")||""};try{await je(c),M=null,a.disabled=!1,a.textContent="Salvar Imóvel",e.reset();const o=document.getElementById("adminPublished");o&&(o.value="true");const d=document.getElementById("adminNeighborhood");d&&(d.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),j="",ae([]),Q(),await te()}catch(o){console.error(o),a.disabled=!1,a.textContent=M?"Salvar Alterações":"Salvar Imóvel",alert("Erro ao salvar imóvel. Verifique o console.")}}),document.addEventListener("click",async n=>{var t;if(n.target.matches(".del-btn")){const i=Number(n.target.dataset.id);if(!i||!confirm("Remover este imóvel?"))return;try{await He(i),await te()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((S==null?void 0:S.role)!=="admin")return;const i=Number(n.target.dataset.id);if(!i)return;const s=L.find(o=>o.id===i);if(!s)return;M=i,a.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=s.title||"",e.querySelector('[name="rua"]').value=s.rua||"",e.querySelector('[name="numero"]').value=s.numero||"",e.querySelector('[name="city"]').value=s.city||"",e.querySelector('[name="price"]').value=s.price||"",e.querySelector('[name="bedrooms"]').value=s.bedrooms||"",e.querySelector('[name="suites"]').value=s.suites||"",e.querySelector('[name="area"]').value=s.area||"",e.querySelector('[name="parking"]').value=s.parking||"",e.querySelector('[name="description"]').value=s.description||"",e.querySelector('[name="construction_status"]').value=s.construction_status||"",e.querySelector('[name="owner_name"]').value=s.owner_name||"",e.querySelector('[name="owner_phone"]').value=s.owner_phone||"",e.querySelector('[name="owner_email"]').value=s.owner_email||"",e.querySelector('[name="owner_notes"]').value=s.owner_notes||"",e.querySelector('[name="condominium"]').value=s.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=s.published===!0?"true":"false");const c=document.getElementById("adminCitySelect");c&&(c.value=s.city||"",c.dispatchEvent(new Event("change")),setTimeout(()=>{const o=document.getElementById("adminNeighborhood");o&&(o.value=s.neighborhood||"")},50)),j=s.cover_image||((t=s.images)==null?void 0:t[0])||"",ae(s.images||[]),ce("Editar Imóvel")}})}function b(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let N=[],T=0;function Je(e){var m,u;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const a=document.getElementById("view-status-badge");e.published?(a.textContent="● Publicado",a.className="badge badge-green"):(a.textContent="○ Rascunho",a.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const t=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=t,document.getElementById("view-directions-link").href=t;const i=((m=e.images)==null?void 0:m[0])||H[0];document.getElementById("view-thumb-preview").src=i,N=(u=e.images)!=null&&u.length?e.images:H,T=0,ne(),document.getElementById("view-price").textContent=W(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const s=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),s&&(s.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(r=>r.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(r=>r.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const c="https://omarcorretor.com.br/property.html?id="+e.id,o=document.getElementById("share-link-input");o&&(o.value=c);const d=document.getElementById("share-panel");d&&(d.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Z(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function ne(){const e=document.getElementById("view-main-img"),a=document.getElementById("view-counter"),n=document.getElementById("view-prev"),t=document.getElementById("view-next"),i=document.getElementById("view-thumbs");e.src=N[T],e.alt=`Foto ${T+1}`;const s=N.length>1;n.style.display=s?"flex":"none",t.style.display=s?"flex":"none",a.textContent=s?`${T+1} / ${N.length}`:"",i.innerHTML=s?N.map((l,c)=>`<img src="${l}" class="view-thumb${c===T?" active":""}" data-i="${c}" alt="Foto ${c+1}">`).join(""):"",i.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{T=+l.dataset.i,ne()})})}async function Be(e){const{data:a}=await g.from("profiles").select("*").eq("id",e).maybeSingle();return a}function de(e){var l;const a=document.getElementById("sidebar-avatar"),n=document.getElementById("sidebar-avatar-initial"),t=document.getElementById("sidebar-name"),i=document.getElementById("sidebar-role");if(!t)return;const s=(e==null?void 0:e.name)||"Sem nome";t.textContent=s,i.textContent=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor",n&&(n.textContent=((l=s[0])==null?void 0:l.toUpperCase())||"?"),a&&(e!=null&&e.avatar_url)&&(a.src=e.avatar_url,a.style.display="",n&&(n.style.display="none"))}function xe(e){const a=document.getElementById("admin-root");if(a&&(a.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(t=>{t.style.display=""}),Object.entries({empresa:tt,visual:at,"site-config":nt,"crm-config":st,integracoes:ot,midia:it}).forEach(([t,i])=>{const s=document.querySelector(`.nav-item[data-section="${t}"]`);s&&s.addEventListener("click",()=>i(),{once:!0})})),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(t=>{t.style.display=""});const n=document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>lt(),{once:!0})}}function Ye(){const e=document.getElementById("sidebar-user");e&&e.addEventListener("click",()=>{var t,i;document.querySelectorAll(".nav-item").forEach(s=>s.classList.remove("active"));const a=document.querySelector('.nav-item[data-section="settings"]');a&&a.classList.add("active"),document.querySelectorAll(".admin-section").forEach(s=>s.classList.add("hidden"));const n=document.getElementById("section-settings");n&&n.classList.remove("hidden"),(t=document.getElementById("admin-sidebar"))==null||t.classList.remove("open"),(i=document.getElementById("sidebar-overlay"))==null||i.classList.remove("active")})}const Ke="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function me(e){return(await fetch(Ke,{method:"POST",headers:{Authorization:`Bearer ${Pe}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function Se(e){var o,d,m,u;const a=document.getElementById("settings-name"),n=document.getElementById("settings-email"),t=document.getElementById("settings-avatar-preview"),i=document.getElementById("settings-avatar-initial"),s=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!a)return;if(a.value=(e==null?void 0:e.name)||"",n){const{data:{user:r}}=await g.auth.getUser();n.value=(r==null?void 0:r.email)||""}const c=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(i&&(i.textContent=c),e!=null&&e.avatar_url&&t&&(t.src=e.avatar_url,t.style.display="",i&&(i.style.display="none")),s==null||s.addEventListener("change",r=>{const f=r.target.files[0];if(!f)return;const v=URL.createObjectURL(f);t&&(t.src=v,t.style.display=""),i&&(i.style.display="none")}),(o=document.getElementById("btn-change-password"))==null||o.addEventListener("click",async()=>{var p,h;const r=((p=document.getElementById("change-password-new"))==null?void 0:p.value)||"",f=((h=document.getElementById("change-password-confirm"))==null?void 0:h.value)||"",v=document.getElementById("change-password-msg"),y=document.getElementById("btn-change-password");if(v&&(v.style.display="none"),r.length<6){v&&(v.textContent="Mínimo 6 caracteres.",v.style.display="");return}if(r!==f){v&&(v.textContent="As senhas não coincidem.",v.style.display="");return}y&&(y.disabled=!0,y.textContent="Salvando…");const{error:w}=await g.auth.updateUser({password:r});y&&(y.disabled=!1,y.textContent="Salvar Nova Senha"),w?v&&(v.textContent="Erro: "+w.message,v.style.display=""):(v&&(v.style.color="#16a34a",v.textContent="Senha alterada com sucesso!",v.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var h;const r=a.value.trim();let f=(S==null?void 0:S.avatar_url)||"";const v=s==null?void 0:s.files[0],y=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",v)try{const x=await ge(v,400,.85),$=`avatars/${S.id}-${Date.now()}.jpg`,{error:C}=await g.storage.from("imoveis").upload($,x,{contentType:"image/jpeg",upsert:!0});if(!C){const{data:{publicUrl:R}}=g.storage.from("imoveis").getPublicUrl($);f=R}}catch(x){console.error("Avatar upload:",x)}const{error:w}=await g.from("profiles").update({name:r,avatar_url:f}).eq("id",S.id);if(l.disabled=!1,l.textContent=y,w){alert("Erro ao salvar perfil.");return}S={...S,name:r,avatar_url:f},de(S);const p=document.getElementById("settings-avatar-initial");p&&(p.textContent=((h=r[0])==null?void 0:h.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"){const r=document.getElementById("settings-corretores-section");r&&(r.style.display=""),await se(),(d=document.getElementById("btn-invite-corretor"))==null||d.addEventListener("click",async()=>{var p,h;const v=(p=document.getElementById("invite-email"))==null?void 0:p.value.trim(),y=(h=document.getElementById("invite-password"))==null?void 0:h.value.trim(),w=document.getElementById("btn-invite-corretor");if(!v){alert("Informe o e-mail do corretor.");return}if(!y||y.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}w&&(w.disabled=!0,w.textContent="Criando…");try{const x=await me({email:v,password:y});if(x.success){alert("Acesso criado! O corretor receberá um e-mail com o login e a senha que você definiu.");const $=document.getElementById("invite-email"),C=document.getElementById("invite-password");$&&($.value=""),C&&(C.value=""),await se()}else alert("Erro: "+(x.error||"Falha desconhecida"))}catch(x){alert("Erro ao criar acesso: "+x.message)}finally{w&&(w.disabled=!1,w.textContent="+ Criar Acesso")}});const f=document.getElementById("settings-locations-section");f&&(f.style.display=""),await X(),(m=document.getElementById("loc-add-city-btn"))==null||m.addEventListener("click",async()=>{const v=document.getElementById("loc-new-city"),y=v==null?void 0:v.value.trim();if(!y)return;const{error:w}=await g.from("locations").insert({type:"cidade",name:y});if(w){alert("Erro ao adicionar cidade.");return}v&&(v.value=""),await X(),be()}),(u=document.getElementById("loc-add-neighborhood-btn"))==null||u.addEventListener("click",async()=>{var h;const v=parseInt((h=document.getElementById("loc-new-neighborhood-city"))==null?void 0:h.value,10),y=document.getElementById("loc-new-neighborhood"),w=y==null?void 0:y.value.trim();if(!v||!w){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:p}=await g.from("locations").insert({type:"bairro",name:w,parent_id:v});if(p){alert("Erro ao adicionar bairro.");return}y&&(y.value=""),await X()})}}async function se(){const e=document.getElementById("corretores-list");if(!e)return;const{data:a,error:n}=await g.from("profiles").select("*").order("created_at");if(n||!a){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=a.map(t=>{const i=(t.name||"?")[0].toUpperCase(),s=t.avatar_url?`<img src="${t.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${b(i)}</div>`,l=t.id===(S==null?void 0:S.id),c=t.active!==!1,o=c?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',d=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${t.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${t.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${t.role==="admin"?" selected":""}>Admin</option>
         </select>`,m=l?"":c?`<button class="corretor-toggle-btn" data-uid="${t.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${t.id}" data-active="false">Liberar acesso</button>`,u=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${t.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${s}
        <div>
          <div class="corretor-name">${b(t.name||"—")}</div>
          <div class="corretor-role-badge">${t.role==="super_admin"?"⚡ Super Admin":t.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${o}
        ${d}
        ${m}
        ${u}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(t=>{t.addEventListener("change",async()=>{await g.from("profiles").update({role:t.value}).eq("id",t.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(t=>{t.addEventListener("click",async()=>{const i=t.dataset.uid,s=t.dataset.active==="true";t.disabled=!0,t.textContent="Aguarde…";try{const l=await me({action:"toggle",userId:i,active:!s});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await se()})}),e.querySelectorAll(".corretor-del-btn").forEach(t=>{t.addEventListener("click",async()=>{var l,c;const i=t.dataset.uid,s=((c=(l=t.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:c.textContent)||"este corretor";if(confirm(`Excluir "${s}"? Esta ação não pode ser desfeita.`)){t.disabled=!0;try{const o=await me({action:"delete",userId:i});o.success||alert("Erro ao excluir: "+(o.error||"Falha desconhecida"))}catch(o){alert("Erro: "+o.message)}await se()}})})}async function qe(){const{data:e,error:a}=await g.from("locations").select("*").order("name");return a?(console.error("loadLocations:",a),[]):(G=e||[],G)}function O(){return G.filter(e=>e.type==="cidade")}function ye(e){return G.filter(a=>a.type==="bairro"&&a.parent_id===e)}function be(){const e=document.getElementById("adminCitySelect");if(!e)return;const a=e.value,n=O();e.innerHTML='<option value="">Selecione</option>'+n.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),a&&(e.value=a)}async function X(){await qe();const e=O(),a=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),t=document.getElementById("loc-new-neighborhood-city");if(!a||!n)return;a.innerHTML=e.length?e.map(s=>`
        <div class="loc-item">
          <span class="loc-item-name">${b(s.name)}</span>
          <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const i=G.filter(s=>s.type==="bairro");n.innerHTML=i.length?i.map(s=>{const l=e.find(c=>c.id===s.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${b(s.name)}</div>
              ${l?`<div class="loc-item-sub">${b(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',t&&(t.innerHTML='<option value="">Cidade…</option>'+e.map(s=>`<option value="${s.id}">${b(s.name)}</option>`).join("")),a.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{const l=s.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:c}=await g.from("locations").delete().eq("id",s.dataset.id);if(c){alert("Erro ao excluir.");return}await X(),be()})}),n.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await g.from("locations").delete().eq("id",s.dataset.id);if(l){alert("Erro ao excluir.");return}await X()})})}function Le(){var i,s,l,c,o,d,m,u,r,f,v,y,w,p,h,x,$,C,R,Ee;document.querySelectorAll(".filter-btn").forEach(B=>{B.addEventListener("click",()=>{const E=B.closest(".filter-btns"),I=B.classList.contains("active");E.querySelectorAll(".filter-btn").forEach(k=>k.classList.remove("active")),I||B.classList.add("active")})}),(i=document.getElementById("f-city"))==null||i.addEventListener("change",()=>{var _;const B=(_=document.getElementById("f-city"))==null?void 0:_.value,E=O().find(A=>A.name===B),I=E?ye(E.id):[],k=document.getElementById("f-neighborhood");k&&(k.innerHTML='<option value="">Todos</option>'+I.map(A=>`<option value="${A.name}">${b(A.name)}</option>`).join(""))}),(s=document.getElementById("f-search-btn"))==null||s.addEventListener("click",()=>{Y(fe(L))}),(l=document.getElementById("f-clear-btn"))==null||l.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach(k=>{const _=document.getElementById(k);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach(k=>{const _=document.getElementById(k);_&&(_.value="")});const I=document.getElementById("f-neighborhood");I&&(I.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach(k=>k.classList.remove("active")),Y(L)}),document.querySelectorAll(".nav-item[data-section]").forEach(B=>{B.addEventListener("click",()=>{var E;document.querySelectorAll(".nav-item").forEach(I=>I.classList.remove("active")),B.classList.add("active"),document.querySelectorAll(".admin-section").forEach(I=>I.classList.add("hidden")),(E=document.getElementById(`section-${B.dataset.section}`))==null||E.classList.remove("hidden")})});const e=document.getElementById("admin-sidebar"),a=document.getElementById("sidebar-overlay"),n=document.getElementById("sidebar-toggle"),t=()=>{e==null||e.classList.remove("open"),a==null||a.classList.remove("open")};n==null||n.addEventListener("click",()=>{e==null||e.classList.toggle("open"),a==null||a.classList.toggle("open")}),a==null||a.addEventListener("click",t),(c=document.getElementById("modal-close"))==null||c.addEventListener("click",Q),(o=document.getElementById("modal-cancel"))==null||o.addEventListener("click",Q),(d=document.getElementById("property-modal"))==null||d.addEventListener("click",B=>{B.target.id==="property-modal"&&Q()}),(m=document.getElementById("btn-new-property"))==null||m.addEventListener("click",()=>{M=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",j="",ae([]),ce("Novo Imóvel")}),(u=document.getElementById("logout-btn"))==null||u.addEventListener("click",async()=>{await g.auth.signOut(),location.reload()}),(r=document.getElementById("view-prev"))==null||r.addEventListener("click",()=>{T=(T-1+N.length)%N.length,ne()}),(f=document.getElementById("view-next"))==null||f.addEventListener("click",()=>{T=(T+1)%N.length,ne()}),(v=document.getElementById("view-modal-close"))==null||v.addEventListener("click",Z),(y=document.getElementById("view-modal-close2"))==null||y.addEventListener("click",Z),(w=document.getElementById("view-modal"))==null||w.addEventListener("click",B=>{B.target.id==="view-modal"&&Z()}),(p=document.getElementById("view-modal-share"))==null||p.addEventListener("click",()=>{const B=document.getElementById("share-panel");if(!B)return;const E=B.style.display!=="none";B.style.display=E?"none":"block"}),(h=document.getElementById("share-whatsapp"))==null||h.addEventListener("click",()=>{var k,_;const B=(k=document.getElementById("share-link-input"))==null?void 0:k.value;if(!B)return;const E=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",I=encodeURIComponent("Olha esse imóvel que encontrei: "+E+`
`+B);window.open("https://wa.me/?text="+I,"_blank")}),(x=document.getElementById("share-instagram"))==null||x.addEventListener("click",()=>{var E,I;const B=(E=document.getElementById("share-link-input"))==null?void 0:E.value;B&&((I=navigator.clipboard)==null||I.writeText(B),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),($=document.getElementById("share-email"))==null||$.addEventListener("click",()=>{var _,A;const B=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!B)return;const E=((A=document.getElementById("view-modal-title"))==null?void 0:A.textContent)||"Imóvel",I=encodeURIComponent("Imóvel: "+E),k=encodeURIComponent(`Olá! Segue o link do imóvel:

`+B);window.open("mailto:?subject="+I+"&body="+k,"_blank")}),(C=document.getElementById("share-copy"))==null||C.addEventListener("click",()=>{var E;const B=document.getElementById("share-link-input");B&&((E=navigator.clipboard)==null||E.writeText(B.value).then(()=>{const I=document.getElementById("share-copy"),k=I.textContent;I.textContent="✅ Copiado!",setTimeout(()=>{I.textContent=k},2e3)}))}),(R=document.getElementById("view-modal-edit"))==null||R.addEventListener("click",()=>{var we;if((S==null?void 0:S.role)!=="admin")return;const B=document.getElementById("view-modal-title").textContent,E=L.find(K=>K.title===B);if(!E)return;Z(),M=E.id;const I=document.getElementById("property-form"),k=document.getElementById("form-submit-btn");k.textContent="Salvar Alterações",I.querySelector('[name="title"]').value=E.title||"",I.querySelector('[name="rua"]').value=E.rua||"",I.querySelector('[name="numero"]').value=E.numero||"",I.querySelector('[name="city"]').value=E.city||"",I.querySelector('[name="price"]').value=E.price||"",I.querySelector('[name="bedrooms"]').value=E.bedrooms||"",I.querySelector('[name="suites"]').value=E.suites||"",I.querySelector('[name="parking"]').value=E.parking||"",I.querySelector('[name="description"]').value=E.description||"",I.querySelector('[name="construction_status"]').value=E.construction_status||"",I.querySelector('[name="owner_name"]').value=E.owner_name||"",I.querySelector('[name="owner_phone"]').value=E.owner_phone||"",I.querySelector('[name="owner_email"]').value=E.owner_email||"",I.querySelector('[name="owner_notes"]').value=E.owner_notes||"",I.querySelector('[name="condominium"]').value=E.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=E.published===!0?"true":"false");const A=document.getElementById("adminCitySelect");A&&(A.value=E.city||"",A.dispatchEvent(new Event("change")),setTimeout(()=>{const K=document.getElementById("adminNeighborhood");K&&(K.value=E.neighborhood||"")},50)),j=E.cover_image||((we=E.images)==null?void 0:we[0])||"",ae(E.images||[]),ce("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(B=>{B.addEventListener("click",()=>{var E;document.querySelectorAll(".tab-btn").forEach(I=>I.classList.remove("active")),B.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(I=>I.classList.add("hidden")),(E=document.getElementById(`tab-${B.dataset.tab}`))==null||E.classList.remove("hidden")})}),(Ee=document.getElementById("admin-properties"))==null||Ee.addEventListener("click",B=>{if(B.target.closest(".action-btns"))return;const E=B.target.closest("tr");if(!E)return;const I=Number(E.dataset.id);if(!I)return;const k=L.find(_=>_.id===I);k&&Je(k)})}document.addEventListener("DOMContentLoaded",async()=>{var s,l,c;await Promise.all([Ae(),qe()]),F=U("company.whatsapp",F),V=`https://wa.me/${F}`,pe(),ze(),Ve();const e=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");e&&a&&(be(),e.addEventListener("change",()=>{const o=O().find(m=>m.name===e.value),d=o?ye(o.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+d.map(m=>`<option value="${m.name}">${b(m.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),t=document.getElementById("admin-root");if(n){const o=new URLSearchParams(window.location.hash.replace("#","")),d=new URLSearchParams(window.location.search),m=o.get("type")||d.get("type")||"",u=Ce||m==="recovery"||m==="invite"||window.location.hash.includes("access_token")||d.has("code"),r=document.getElementById("password-reset-overlay");if(u){n.style.display="none",t&&t.classList.add("hidden"),r&&(r.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async v=>{var $,C;v.preventDefault();const y=(($=document.getElementById("new-password"))==null?void 0:$.value)||"",w=((C=document.getElementById("confirm-password"))==null?void 0:C.value)||"",p=document.getElementById("password-reset-msg"),h=v.target.querySelector('button[type="submit"]');if(p&&(p.style.display="none"),y!==w){p&&(p.textContent="As senhas não coincidem.",p.style.display="");return}h&&(h.disabled=!0,h.textContent="Salvando…");const{error:x}=await g.auth.updateUser({password:y});if(x){p&&(p.textContent="Erro: "+x.message,p.style.display=""),h&&(h.disabled=!1,h.textContent="Definir Senha");return}window.location.href=window.location.pathname}),d.has("code")&&await g.auth.exchangeCodeForSession(d.get("code")??"");return}const{data:{session:f}}=await g.auth.getSession();if(f){if(n.classList.add("hidden"),t&&t.classList.remove("hidden"),await te(),re(),Le(),Ye(),S=await Be(f.user.id),!S){await g.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden");return}if(S.active===!1){await g.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(S.needs_password_reset){n.style.display="none",t&&t.classList.add("hidden");const v=document.getElementById("password-reset-overlay");v&&(v.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async y=>{var C,R;y.preventDefault();const w=((C=document.getElementById("new-password"))==null?void 0:C.value)||"",p=((R=document.getElementById("confirm-password"))==null?void 0:R.value)||"",h=document.getElementById("password-reset-msg"),x=y.target.querySelector('button[type="submit"]');if(h&&(h.style.display="none"),w!==p){h&&(h.textContent="As senhas não coincidem.",h.style.display="");return}if(w.length<6){h&&(h.textContent="Mínimo 6 caracteres.",h.style.display="");return}x&&(x.disabled=!0,x.textContent="Salvando…");const{error:$}=await g.auth.updateUser({password:w});if($){h&&(h.textContent="Erro: "+$.message,h.style.display=""),x&&(x.disabled=!1,x.textContent="Definir Senha");return}await g.from("profiles").update({needs_password_reset:!1}).eq("id",S.id),window.location.href=window.location.pathname});return}de(S),xe(S.role),await Se(S)}else{t&&t.classList.add("hidden"),n.classList.remove("hidden");const v=document.getElementById("login-form");v&&((c=document.getElementById("forgot-password-btn"))==null||c.addEventListener("click",async()=>{var p,h;const y=(h=(p=v.querySelector('input[name="email"]'))==null?void 0:p.value)==null?void 0:h.trim();if(!y){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:w}=await g.auth.resetPasswordForEmail(y,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(w?"Erro: "+w.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),v.addEventListener("submit",async y=>{y.preventDefault();const w=new FormData(v),p=w.get("email"),h=w.get("password");if(await Oe(p,h)){n.classList.add("hidden"),t&&t.classList.remove("hidden"),await te(),re(),Le();const{data:{session:$}}=await g.auth.getSession();if(S=$?await Be($.user.id):null,!S){await g.auth.signOut();return}if(S.active===!1){await g.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}de(S),xe(S.role),await Se(S)}else alert("E-mail ou senha incorretos")}))}}else re();await J();const i=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();Me(i),Te(F)});async function Ze(){const e=L.filter(i=>!i.reference);if(!e.length)return;const a=L.map(i=>i.reference||"").filter(i=>/^IO-\d+$/.test(i)).map(i=>parseInt(i.replace("IO-",""),10));let n=a.length?Math.max(...a)+1:1;const t=[...e].sort((i,s)=>i.id-s.id);for(const i of t){const s="IO-"+String(n).padStart(4,"0"),{error:l}=await g.from("properties").update({reference:s}).eq("id",i.id);if(!l){const c=L.findIndex(o=>o.id===i.id);c>=0&&(L[c].reference=s),n++}}Y(fe(L))}async function Qe(){const e=L.filter(a=>{var n;return(n=a.images)==null?void 0:n.some(t=>!t.includes("/wm-"))});if(e.length){for(const a of e){if(!a.images.some(s=>!s.includes("/wm-")))continue;const t=[];let i=!1;for(const s of a.images)if(s.includes("/wm-"))t.push(s);else try{const l=await et(s);t.push(l),i=!0}catch{t.push(s)}if(i){await g.from("properties").update({images:t}).eq("id",a.id);const s=L.findIndex(l=>l.id===a.id);s>=0&&(L[s].images=t)}}Y(fe(L))}}async function et(e){try{const a=await fetch(e);if(!a.ok)return e;const n=await a.blob(),t=URL.createObjectURL(n),i=await fetch("/logo.png"),s=i.ok?await i.blob():null,l=s?URL.createObjectURL(s):null;return new Promise(c=>{const o=new Image;o.onload=()=>{URL.revokeObjectURL(t);const d=document.createElement("canvas"),m=1200;let u=o.width,r=o.height;u>m&&(r=Math.round(r*m/u),u=m),d.width=u,d.height=r;const f=d.getContext("2d");f.drawImage(o,0,0,u,r);const v=y=>{if(y){const w=Math.round(u*.18),p=Math.round(y.naturalHeight*w/y.naturalWidth),h=Math.round(u*.02);f.globalAlpha=.45,f.drawImage(y,u-w-h,r-p-h,w,p),f.globalAlpha=1}d.toBlob(async w=>{try{const p=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:h}=await g.storage.from("imoveis").upload(p,w,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(h){console.error("Upload watermark error:",h),c(e);return}const{data:{publicUrl:x}}=g.storage.from("imoveis").getPublicUrl(p);c(x)}catch(p){console.error("Watermark upload exception:",p),c(e)}},"image/jpeg",.82)};if(l){const y=new Image;y.onload=()=>{URL.revokeObjectURL(l),v(y)},y.onerror=()=>{URL.revokeObjectURL(l),v(null)},y.src=l}else v(null)},o.onerror=()=>{URL.revokeObjectURL(t),c(e)},o.src=t})}catch(a){return console.error("applyWatermarkToUrl error:",a),e}}function q(e,a){e&&(e.textContent=a?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(a?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function he(e,a="assets"){const n=await ge(e,1200,.85),t=`${a}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:i}=await g.storage.from("imoveis").upload(t,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(i)throw i;const{data:{publicUrl:s}}=g.storage.from("imoveis").getPublicUrl(t);return s}async function tt(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await g.from("settings").select("key,value"),n={};a==null||a.forEach(i=>{n[i.key]=i.value||""});const t=i=>b(String(n[i]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",i=>{document.getElementById("co-logo-preview").src=i.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async i=>{const s=i.target.files[0];if(s)try{const l=await he(s,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const i=document.getElementById("co-save-identity");i.disabled=!0,i.textContent="Salvando…";const s=await D([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);s&&pe(),i.disabled=!1,i.textContent="Salvar Identidade",q(document.getElementById("co-identity-msg"),s)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const i=document.getElementById("co-save-contacts");i.disabled=!0,i.textContent="Salvando…";const s=document.getElementById("co-whatsapp").value.trim(),l=await D([["company.whatsapp",s],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&s&&(F=s,V=`https://wa.me/${s}`),i.disabled=!1,i.textContent="Salvar Contatos",q(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const i=document.getElementById("co-save-social");i.disabled=!0,i.textContent="Salvando…";const s=await D([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);i.disabled=!1,i.textContent="Salvar Redes Sociais",q(document.getElementById("co-social-msg"),s)})}async function at(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await g.from("settings").select("key,value"),n={};a==null||a.forEach(m=>{n[m.key]=m.value||""});const t=n["visual.accent_color"]||"#b8962e",i=n["visual.primary_bg"]||"#0f1c2e",s=n["visual.secondary_bg"]||"#1a2f4a",l=n["visual.hero_bg_url"]||"",c=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-price-max" type="number" class="form-control" value="${c}" min="100000" step="1000000" style="max-width:200px">
          <span style="font-size:13px;color:#9ca3af">R$</span>
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-images">Salvar Imagens</button>
        <span id="visual-images-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `;function o(m,u,r){const f=document.getElementById(m),v=document.getElementById(u);f==null||f.addEventListener("input",y=>{v.value=y.target.value,r()}),v==null||v.addEventListener("input",y=>{/^#[0-9a-fA-F]{6}$/.test(y.target.value)&&(f.value=y.target.value,r())})}function d(){var u,r,f,v;const m=((u=document.getElementById("col-accent-hex"))==null?void 0:u.value)||"#b8962e";(r=document.getElementById("vp-bar"))==null||r.style.setProperty("background",m),(f=document.getElementById("vp-dot"))==null||f.style.setProperty("background",m),(v=document.getElementById("vp-btn"))==null||v.style.setProperty("background",m),document.documentElement.style.setProperty("--accent",m)}o("col-accent","col-accent-hex",d),o("col-primary","col-primary-hex",()=>{}),o("col-secondary","col-secondary-hex",()=>{}),d(),document.getElementById("vis-hero-file").addEventListener("change",async m=>{const u=m.target.files[0];if(u)try{const r=await he(u,"hero");document.getElementById("vis-hero-url").value=r;const f=document.getElementById("vis-hero-preview");f.innerHTML=`<img src="${r}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,f.style.display=""}catch(r){alert("Erro no upload: "+r.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const m=document.getElementById("visual-save-colors");m.disabled=!0,m.textContent="Salvando…";const u=await D([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);u&&pe(),m.disabled=!1,m.textContent="Salvar Cores",q(document.getElementById("visual-colors-msg"),u)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",d())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const m=document.getElementById("visual-save-images");m.disabled=!0,m.textContent="Salvando…";const u=await D([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);m.disabled=!1,m.textContent="Salvar Imagens",q(document.getElementById("visual-images-msg"),u)})}async function nt(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await g.from("site_content").select("*"),n={};a==null||a.forEach(o=>{n[o.key]=o});const t=(o,d)=>{var m;return b(((m=n[o])==null?void 0:m[`value_${d}`])||"")},i=["pt","en","es"],s={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=o=>i.map(d=>`<button class="content-tab${d===o?" active":""}" data-lang="${d}">${s[d]}</button>`).join(""),c=o=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${o}" value="${t("hero.title",o)}">
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${o}" rows="3">${t("hero.subtitle",o)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${o}" rows="4">${t("inst.bio_p1",o)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${o}" rows="3">${t("inst.bio_p2",o)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${o}" rows="3">${t("inst.bio_p3",o)}</textarea>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${o}" value="${t("inst.stat1_num",o)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${o}" value="${t("inst.stat2_num",o)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${o}" value="${t("inst.stat3_num",o)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${o}" value="${t("inst.stat1_label",o)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${o}" value="${t("inst.stat2_label",o)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${o}" value="${t("inst.stat3_label",o)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${o}" value="${t("footer.text",o)}">
    </div>
  `;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${l("pt")}</div>
      <div id="sc-panels">
        ${i.map(o=>`<div class="content-panel${o==="pt"?" active":""}" data-panel="${o}">${c(o)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",o=>{var m;const d=o.target.closest(".content-tab");d&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(u=>u.classList.remove("active")),d.classList.add("active"),(m=document.querySelector(`#sc-panels [data-panel="${d.dataset.lang}"]`))==null||m.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const o=document.getElementById("sc-save-btn");o.disabled=!0,o.textContent="Salvando…";const d={};document.querySelectorAll(".sc-field").forEach(u=>{const r=u.dataset.key,f=u.dataset.lang;d[r]||(d[r]={}),d[r][f]=u.value});let m=!0;for(const[u,r]of Object.entries(d))await ie(u,{pt:r.pt,en:r.en,es:r.es})||(m=!1);o.disabled=!1,o.textContent="Salvar Conteúdo",q(document.getElementById("sc-save-msg"),m)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const o=document.getElementById("seo-save-btn");o.disabled=!0,o.textContent="Salvando…";const d=document.getElementById("seo-title").value.trim(),m=document.getElementById("seo-desc").value.trim(),u=await ie("seo.title_pt",{pt:d,en:d,es:d})&&await ie("seo.description_pt",{pt:m,en:m,es:m});o.disabled=!1,o.textContent="Salvar SEO",q(document.getElementById("seo-save-msg"),u)})}async function st(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await P())}async function P(){const e=document.getElementById("crm-body");if(!e)return;const[{data:a},{data:n},{data:t},{data:i}]=await Promise.all([g.from("crm_pipelines").select("*").order("sort_order"),g.from("crm_stages").select("*").order("sort_order"),g.from("crm_tags").select("*").order("name"),g.from("crm_lead_statuses").select("*").order("sort_order")]),s=a||[],l=s.find(r=>r.is_default)||s[0],c=s.map(r=>`<option value="${r.id}"${r.id===(l==null?void 0:l.id)?" selected":""}>${b(r.name)}</option>`).join(""),d=(n||[]).filter(r=>r.pipeline_id===(l==null?void 0:l.id)).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${b(r.name)}</span>
      <input type="color" value="${r.color}" data-sid="${r.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${r.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',m=(t||[]).map(r=>`<span class="tag-chip" style="background:${r.color}" data-id="${r.id}">
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
        <select class="pipeline-select" id="crm-pipe-sel">${c}</select>
        <button class="btn-secondary" id="crm-add-pipeline" style="font-size:13px;padding:7px 14px">+ Novo Funil</button>
      </div>
      <div class="stages-list" id="crm-stages-list">${d}</div>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const r=document.getElementById("crm-new-stage").value.trim(),f=document.getElementById("crm-new-stage-color").value,v=parseInt(document.getElementById("crm-pipe-sel").value,10);r&&(await g.from("crm_stages").insert({pipeline_id:v,name:r,color:f,sort_order:99}),document.getElementById("crm-new-stage").value="",await P())}),e.querySelectorAll(".stage-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await g.from("crm_stages").delete().eq("id",r.dataset.id),await P())})}),e.querySelectorAll(".stage-color-pick").forEach(r=>{r.addEventListener("change",async f=>{await g.from("crm_stages").update({color:f.target.value}).eq("id",r.dataset.sid);const v=r.closest(".stage-item").querySelector(".stage-color-dot");v&&(v.style.background=f.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const r=document.getElementById("crm-new-tag").value.trim(),f=document.getElementById("crm-new-tag-color").value;r&&(await g.from("crm_tags").insert({name:r,color:f}),document.getElementById("crm-new-tag").value="",await P())}),e.querySelectorAll(".tag-chip-del").forEach(r=>{r.addEventListener("click",async()=>{await g.from("crm_tags").delete().eq("id",r.dataset.id),await P()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const r=document.getElementById("crm-new-status").value.trim(),f=document.getElementById("crm-new-status-color").value,v=document.getElementById("crm-new-status-final").checked;r&&(await g.from("crm_lead_statuses").insert({name:r,color:f,is_final:v,sort_order:99}),document.getElementById("crm-new-status").value="",await P())}),e.querySelectorAll(".status-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover este status?")&&(await g.from("crm_lead_statuses").delete().eq("id",r.dataset.id),await P())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var f;const r=(f=prompt("Nome do novo funil:"))==null?void 0:f.trim();r&&(await g.from("crm_pipelines").insert({name:r,sort_order:99}),await P())})}async function ot(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await g.from("integrations").select("*"),n={};a==null||a.forEach(c=>{n[c.key]=c});const t=c=>{var o;return b(((o=n[c])==null?void 0:o.value)||"")},i=c=>{var o;return(o=n[c])!=null&&o.enabled?"checked":""},s=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${s.map(c=>`
        <div class="integration-row">
          <div class="integration-icon">${c.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${c.label}</div>
            <div class="integration-desc">${c.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${c.key}" ${i(c.key)}>
              <span class="toggle-slider"></span>
            </label>
            <input type="text" class="integration-value intg-val" data-key="${c.key}"
              value="${t(c.key)}" placeholder="${c.placeholder}">
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
      ${l.map(c=>`
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label">${c.label}</label>
          <input class="form-control smtp-field" data-key="${c.key}" value="${t(c.key)}" placeholder="${c.placeholder}">
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var u;const c=document.getElementById("intg-save-tracking");c.disabled=!0,c.textContent="Salvando…";let o=!0;const d=document.querySelectorAll(".intg-val"),m=document.querySelectorAll(".intg-toggle");for(let r=0;r<d.length;r++){const f=d[r].dataset.key,v=d[r].value.trim(),y=((u=m[r])==null?void 0:u.checked)??!1;await le(f,v,y)||(o=!1)}c.disabled=!1,c.textContent="Salvar Integrações",q(document.getElementById("intg-tracking-msg"),o)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const c=document.getElementById("intg-save-smtp");c.disabled=!0,c.textContent="Salvando…";const o=document.querySelectorAll(".smtp-field");let d=!0;for(const u of o)await le(u.dataset.key,u.value.trim(),!0)||(d=!1);const m=document.getElementById("smtp-pass").value;m&&(await le("smtp_pass",m,!0)||(d=!1)),c.disabled=!1,c.textContent="Salvar SMTP",q(document.getElementById("intg-smtp-msg"),d)})}async function it(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await ue(),document.getElementById("media-file-input").addEventListener("change",async n=>{var o,d;const t=Array.from(n.target.files);if(!t.length)return;const i=document.getElementById("media-upload-progress"),s=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");i.style.display="";let c=0;for(const m of t){l.textContent=`Enviando ${c+1}/${t.length}…`,s.style.width=`${Math.round(c/t.length*100)}%`;try{const u=await he(m,"media"),r=m.name.replace(/\.[^.]+$/,"").slice(0,60);await g.from("media_library").insert({name:r,url:u,type:"image",size:m.size,created_by:(d=(o=(await g.auth.getUser()).data)==null?void 0:o.user)==null?void 0:d.id})}catch(u){console.error("Media upload error:",u)}c++}s.style.width="100%",l.textContent=`✓ ${c} arquivo(s) enviado(s)`,setTimeout(()=>{i.style.display="none",s.style.width="0"},2e3),await ue(),n.target.value=""});const a=document.getElementById("media-drop-area");a.addEventListener("dragover",n=>{n.preventDefault(),a.classList.add("drag-over")}),a.addEventListener("dragleave",()=>a.classList.remove("drag-over")),a.addEventListener("drop",n=>{n.preventDefault(),a.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function ue(){const e=document.getElementById("media-grid");if(!e)return;const{data:a,error:n}=await g.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(a!=null&&a.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=a.map(t=>`
    <div class="media-item" data-id="${t.id}" data-url="${b(t.url)}">
      <img src="${b(t.url)}" alt="${b(t.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${b(t.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${t.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${b(t.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(t=>{t.addEventListener("click",i=>{var s;i.stopPropagation(),(s=navigator.clipboard)==null||s.writeText(t.dataset.url).then(()=>{const l=t.textContent;t.textContent="✓ Copiado!",setTimeout(()=>{t.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(t=>{t.addEventListener("click",async i=>{i.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await g.from("media_library").delete().eq("id",t.dataset.id),await ue())})})}async function lt(){var a,n,t,i,s;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(o=>o.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(o=>o.classList.add("hidden")),l.classList.add("active");const c=e.querySelector(`#sa-panel-${l.dataset.tab}`);c&&c.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&z(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&rt(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&$e(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&ke(),l.dataset.tab==="platform"&&_e()})}),(a=e.querySelector("#sa-sub-filter"))==null||a.addEventListener("change",$e),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",z),(t=e.querySelector("#sa-user-search"))==null||t.addEventListener("input",ke),(i=e.querySelector("#sa-tenant-new"))==null||i.addEventListener("click",()=>dt()),(s=e.querySelector("#sa-plat-save"))==null||s.addEventListener("click",ct),z(),_e())}async function z(){var c,o;const e=document.getElementById("sa-tenants-list"),a=((o=(c=document.getElementById("sa-tenant-search"))==null?void 0:c.value)==null?void 0:o.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=g.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:t,error:i}=await n;if(i){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${i.message}</div>`;return}const s=(t||[]).filter(d=>{var m,u;return!a||((m=d.name)==null?void 0:m.toLowerCase().includes(a))||((u=d.slug)==null?void 0:u.toLowerCase().includes(a))});if(!s.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const l=d=>d.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=s.map(d=>{var m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        ${d.logo_url?`<img class="sa-tenant-logo" src="${b(d.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${b(d.name||"—")}</div>
          <div class="sa-list-sub">${b(d.slug||"")} · ${b(((m=d.plans)==null?void 0:m.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${l(d)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${d.id}" data-active="${d.active}" title="${d.active?"Desativar":"Ativar"}">${d.active?"⏸️":"▶️"}</button>
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${d.id}" title="Editar">✏️</button>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(d=>{d.addEventListener("click",async()=>{const m=d.dataset.active==="true";await g.from("tenants").update({active:!m}).eq("id",d.dataset.id),z()})})}async function rt(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:a,error:n}=await g.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(a||[]).map(t=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${b(t.name)}</div>
      <div class="sa-plan-price">${t.price_brl===0?"Gratuito":"R$ "+Number(t.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${t.max_users===999?"Ilimitado":t.max_users} usuários</span>
        <span>🏠 ${t.max_properties===9999?"Ilimitado":t.max_properties} imóveis</span>
        <span>📋 ${t.max_leads===99999?"Ilimitado":t.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function $e(){var c;const e=document.getElementById("sa-subs-list"),a=((c=document.getElementById("sa-sub-filter"))==null?void 0:c.value)||"";if(!e)return;e.dataset.loaded="1";let n=g.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});a&&(n=n.eq("status",a));const{data:t,error:i}=await n;if(i){e.innerHTML=`<div class="sa-error">Erro: ${i.message}</div>`;return}if(!(t!=null&&t.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const s={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},l={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=t.map(o=>{var d,m,u;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${b(((d=o.tenants)==null?void 0:d.name)||"—")}</div>
          <div class="sa-list-sub">${b(((m=o.plans)==null?void 0:m.name)||"—")} · R$ ${Number(((u=o.plans)==null?void 0:u.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${s[o.status]||"gray"}">${l[o.status]||o.status}</span>
        <span class="sa-list-date">${o.current_period_end?new Date(o.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function ke(){var l,c;const e=document.getElementById("sa-users-list"),a=((c=(l=document.getElementById("sa-user-search"))==null?void 0:l.value)==null?void 0:c.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:t}=await g.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(t){e.innerHTML=`<div class="sa-error">Erro: ${t.message}</div>`;return}const i=(n||[]).filter(o=>{var d,m;return!a||((d=o.name)==null?void 0:d.toLowerCase().includes(a))||((m=o.email)==null?void 0:m.toLowerCase().includes(a))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const s={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=i.map(o=>{var d;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(o.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${b(o.name||"—")}</div>
          <div class="sa-list-sub">${b(((d=o.tenants)==null?void 0:d.name)||"Sem imobiliária")} · ${s[o.role]||o.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${o.active!==!1?"sa-badge-green":"sa-badge-red"}">${o.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function _e(){const[e,a,n,t]=await Promise.all([g.from("tenants").select("id",{count:"exact",head:!0}),g.from("profiles").select("id",{count:"exact",head:!0}),g.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),g.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),i=(s,l)=>{const c=document.getElementById(s);c&&(c.textContent=l??"—")};i("sa-stat-tenants",e.count),i("sa-stat-users",a.count),i("sa-stat-subs",n.count),i("sa-stat-props",t.count)}async function ct(){var n,t,i;const e=document.getElementById("sa-plat-save"),a=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await D([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((t=document.getElementById("sa-plat-email"))==null?void 0:t.value)||""},{key:"platform.trial_days",value:((i=document.getElementById("sa-plat-trial"))==null?void 0:i.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),q(a,!0)}function dt(){var t,i,s,l,c;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const a=document.createElement("div");a.id="sa-new-tenant-modal",a.className="sa-modal-backdrop",a.innerHTML=`
    <div class="sa-modal">
      <div class="sa-modal-header">
        <h3>Nova Imobiliária</h3>
        <button class="sa-modal-close" id="sa-modal-close-btn">✕</button>
      </div>
      <div class="sa-modal-body">
        <div class="form-group"><label>Nome da Imobiliária *</label><input id="nt-name" class="form-input" type="text" placeholder="Ex: Imobiliária ABC"></div>
        <div class="form-group"><label>Slug (URL única) *</label><input id="nt-slug" class="form-input" type="text" placeholder="imobiliaria-abc"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="nt-domain" class="form-input" type="text" placeholder="abc.imobipro.com.br"></div>
        <div class="form-group"><label>Plano</label>
          <select id="nt-plan" class="form-input">
            <option value="">Carregando planos…</option>
          </select>
        </div>
      </div>
      <div class="sa-modal-footer">
        <button id="nt-cancel" class="btn-secondary-sm">Cancelar</button>
        <button id="nt-save" class="btn-primary-sm">Criar Imobiliária</button>
        <span id="nt-msg" class="cfg-save-msg"></span>
      </div>
    </div>
  `,document.body.appendChild(a),g.from("plans").select("id, name").then(({data:o})=>{const d=document.getElementById("nt-plan");d&&o&&(d.innerHTML=o.map(m=>`<option value="${m.id}">${b(m.name)}</option>`).join(""))}),(t=document.getElementById("nt-name"))==null||t.addEventListener("input",o=>{const d=document.getElementById("nt-slug");d&&!d.dataset.manual&&(d.value=o.target.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""))}),(i=document.getElementById("nt-slug"))==null||i.addEventListener("input",o=>{o.target.dataset.manual="1"});const n=()=>a.remove();(s=document.getElementById("sa-modal-close-btn"))==null||s.addEventListener("click",n),(l=document.getElementById("nt-cancel"))==null||l.addEventListener("click",n),a.addEventListener("click",o=>{o.target===a&&n()}),(c=document.getElementById("nt-save"))==null||c.addEventListener("click",async()=>{var y,w,p,h,x,$,C;const o=(w=(y=document.getElementById("nt-name"))==null?void 0:y.value)==null?void 0:w.trim(),d=(h=(p=document.getElementById("nt-slug"))==null?void 0:p.value)==null?void 0:h.trim(),m=($=(x=document.getElementById("nt-domain"))==null?void 0:x.value)==null?void 0:$.trim(),u=(C=document.getElementById("nt-plan"))==null?void 0:C.value,r=document.getElementById("nt-msg"),f=document.getElementById("nt-save");if(!o||!d){q(r,!1),r.textContent="Nome e slug são obrigatórios.";return}f&&(f.disabled=!0,f.textContent="Criando…");const{error:v}=await g.from("tenants").insert({name:o,slug:d,domain:m||null,plan_id:u||null,active:!0});if(f&&(f.disabled=!1,f.textContent="Criar Imobiliária"),v){q(r,!1),r.textContent=v.message;return}q(r,!0),setTimeout(()=>{n(),z()},800)})}
