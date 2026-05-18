import{s as p}from"./supabase-BcuJ3xoD.js";let Q={},ue={};async function ke(){const[e,a]=await Promise.all([p.from("settings").select("key,value"),p.from("site_content").select("*")]);e.data&&e.data.forEach(o=>{Q[o.key]=o.value}),a.data&&a.data.forEach(o=>{ue[o.key]=o})}const R=(e,a=null)=>Q[e]!==void 0?Q[e]:a,oe=(e,a="pt")=>{const o=ue[e];return o?o[`value_${a}`]??o.value_pt??null:null};async function D(e){const a=new Date().toISOString(),o=e.map(([s,n])=>({key:s,value:n,updated_at:a})),{error:t}=await p.from("settings").upsert(o,{onConflict:"key"});return t||e.forEach(([s,n])=>{Q[s]=n}),!t}async function se(e,{pt:a,en:o,es:t}){const s={key:e,value_pt:a,value_en:o,value_es:t,updated_at:new Date().toISOString()},{error:n}=await p.from("site_content").upsert(s,{onConflict:"key"});return n||(ue[e]=s),!n}async function ie(e,a,o){const{error:t}=await p.from("integrations").upsert({key:e,value:a,enabled:o,updated_at:new Date().toISOString()},{onConflict:"key"});return!t}function ve(){const e=document.documentElement,a=R("visual.accent_color","#b8962e"),o=R("visual.primary_bg","#0f1c2e"),t=R("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",a),e.style.setProperty("--primary-bg",o),e.style.setProperty("--secondary-bg",t);const s=R("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(i=>{i.src=s});const n=R("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=n);const c=R("visual.hero_bg_url","");if(c){const i=document.querySelector(".hero");i&&(i.style.backgroundImage=`url('${c}')`)}}function _e(e="pt"){const a=u=>oe(u,e)??"",o=document.querySelector('[data-i18n="hero.title"]');o&&a("hero.title")&&(o.innerHTML=a("hero.title"));const t=document.querySelector(".hero-content > p");t&&a("hero.subtitle")&&(t.innerHTML=a("hero.subtitle"));const s=document.querySelector(".footer small");s&&a("footer.text")&&(s.innerHTML=a("footer.text"));const n=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),c=document.querySelector('[data-i18n="inst.p3"]');n&&a("inst.bio_p1")&&(n.innerHTML=a("inst.bio_p1")),l&&a("inst.bio_p2")&&(l.innerHTML=a("inst.bio_p2")),c&&a("inst.bio_p3")&&(c.innerHTML=a("inst.bio_p3"));const i=document.querySelector('[data-i18n-num="inst.stat2num"]'),m=document.querySelector('[data-i18n="inst.stat1"]'),d=document.querySelector('[data-i18n="inst.stat2"]'),v=document.querySelector('[data-i18n="inst.stat3"]');i&&a("inst.stat2_num")&&(i.innerHTML=a("inst.stat2_num")),m&&a("inst.stat1_label")&&(m.innerHTML=a("inst.stat1_label")),d&&a("inst.stat2_label")&&(d.innerHTML=a("inst.stat2_label")),v&&a("inst.stat3_label")&&(v.innerHTML=a("inst.stat3_label"));const r=oe("seo.title_pt",e);r&&document.title&&(document.title=r);const f=oe("seo.description_pt",e);if(f){const u=document.querySelector('meta[name="description"]');u&&(u.content=f)}}function Ce(e){if(!e)return;const a=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(o=>{const t=o.getAttribute("href");if(t){const s=t.replace(/^https:\/\/wa\.me\/[^?]+/,"");o.href=a+s}})}const qe="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let F="5547999701743",z=`https://wa.me/${F}`;const H=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],Me=5.7;function V(e,a){if(!e)return"—";const o=String(e).trim();let t;return o.includes(",")&&o.lastIndexOf(",")>o.lastIndexOf(".")?t=parseFloat(o.replace(/\./g,"").replace(",",".")):t=parseFloat(o.replace(/[^\d.]/g,"")),isNaN(t)||t===0?o:a==="en"?"$ "+(t/Me).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+t.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let L=[],x=null,W=[],Le=!1;p.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(Le=!0)});async function Ae(){const{data:e,error:a}=await p.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):e||[]}async function Te(){const{data:e,error:a}=await p.from("properties").select("*").order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):(L=e||[],Ge(),Je(),L)}async function Pe(e){if(e.id){const{id:a,created_at:o,...t}=e,{error:s}=await p.from("properties").update(t).eq("id",a);if(s)throw s;const n=L.findIndex(l=>l.id===a);n>=0&&(L[n]={...L[n],...t})}else{if(!e.reference){const t=L.map(n=>n.reference||"").filter(n=>/^IO-\d+$/.test(n)).map(n=>parseInt(n.replace("IO-",""),10)),s=t.length?Math.max(...t)+1:1;e.reference="IO-"+String(s).padStart(4,"0")}const{data:a,error:o}=await p.from("properties").insert(e).select();if(o)throw o;a!=null&&a[0]&&L.unshift(a[0])}}async function Ne(e){const{error:a}=await p.from("properties").delete().eq("id",e);if(a)throw a;L=L.filter(o=>o.id!==e)}async function Ue(e,a){const{error:o}=await p.auth.signInWithPassword({email:e,password:a});return!o}function ge(e,a=1200,o=.78){return new Promise((t,s)=>{const n=new Image,l=URL.createObjectURL(e);n.onload=()=>{URL.revokeObjectURL(l);const c=document.createElement("canvas");let i=n.width,m=n.height;i>a&&(m=Math.round(m*a/i),i=a),c.width=i,c.height=m;const d=c.getContext("2d");d.drawImage(n,0,0,i,m);const v=new Image;v.crossOrigin="anonymous",v.onload=()=>{const r=Math.round(i*.18),f=Math.round(v.naturalHeight*r/v.naturalWidth),u=Math.round(i*.02),y=i-r-u,I=m-f-u;d.globalAlpha=.45,d.drawImage(v,y,I,r,f),d.globalAlpha=1,c.toBlob(g=>g?t(g):s(new Error("Canvas toBlob falhou")),"image/jpeg",o)},v.onerror=()=>{c.toBlob(r=>r?t(r):s(new Error("Canvas toBlob falhou")),"image/jpeg",o)},v.src="/logo.png"},n.onerror=s,n.src=l})}async function Re(e){const a=await ge(e),o=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:t}=await p.storage.from("imoveis").upload(o,a,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(t)throw t;const{data:{publicUrl:s}}=p.storage.from("imoveis").getPublicUrl(o);return s}async function je(e,a){const o=Array.from(e).filter(s=>s.size>0),t=[];for(let s=0;s<o.length;s++)a&&a(s+1,o.length),t.push(await Re(o[s]));return t}async function G(){var v,r,f,u,y,I;const e=document.getElementById("vendas-carousel"),a=document.getElementById("properties");if(!e&&!a)return;const o=await Ae();L=o,((v=document.getElementById("selecao-carousel"))==null?void 0:v.innerHTML)===""&&He(o);const t=((r=document.getElementById("city-filter"))==null?void 0:r.value)||"",s=((f=document.getElementById("neighborhood-filter"))==null?void 0:f.value)||"",n=((u=document.getElementById("bedrooms-filter"))==null?void 0:u.value)||"",l=((y=document.getElementById("parking-filter"))==null?void 0:y.value)||"",c=((I=document.getElementById("construction-filter"))==null?void 0:I.value)||"",i=document.getElementById("price-slider"),m=i?parseInt(i.value,10):13e7,d=o.filter(g=>{if(t&&g.city!==t||s&&g.neighborhood!==s||n&&(n==="4+"&&Number(g.bedrooms)<4||n!=="4+"&&Number(g.bedrooms)!==Number(n))||l&&(l==="4+"&&Number(g.parking)<4||l!=="4+"&&Number(g.parking)!==Number(l))||c&&g.construction_status!==c)return!1;const b=String(g.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),S=parseInt(b,10)||0;return!(S<0||S>m)});if(e){if(!d.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=d.map(g=>{var $;const b=g.cover_image||(($=g.images)==null?void 0:$[0])||H[0],S=[g.neighborhood,g.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${b}" alt="${E(g.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${E(g.title)}</div>
            <div class="selecao-card-loc">${E(S)}</div>
            <div class="selecao-card-price">${E(V(g.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${g.id}" class="btn-det">Ver Detalhes</a>
              <a href="${z}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!d.length){a.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}a.innerHTML=d.map(g=>{var $;const b=($=g.images)!=null&&$.length?g.images:H,S=b.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${S}" data-idx="0" data-pid="${g.id}">
          <img src="${g.cover_image||b[0]}" alt="${E(g.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${S>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${E(g.title)}</strong>
          <div class="muted">${E(g.neighborhood||"")}, ${E(g.city||"")}</div>
          <div><strong>${E(V(g.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${g.bedrooms||"--"} | 🚗 ${g.parking||"--"} ${S>1?"| 📸 "+S:""}</div>
          <p class="muted">${E((g.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${g.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${z}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(g=>{g.removeEventListener("click",we),g.addEventListener("click",we)})}function He(e){var s,n,l;const a=document.getElementById("selecao-carousel");if(!a)return;const o=e.slice(0,6);if(!o.length){(s=a.closest(".selecao-section"))==null||s.classList.add("hidden");return}a.innerHTML=o.map(c=>{var d;const i=c.cover_image||((d=c.images)==null?void 0:d[0])||H[0],m=[c.neighborhood,c.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${i}" alt="${E(c.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${E(c.title)}</div>
          <div class="selecao-card-loc">${E(m)}</div>
          <div class="selecao-card-price">${E(V(c.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${c.id}" class="btn-det">Ver Detalhes</a>
            <a href="${z}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const t=a.closest(".selecao-carousel-wrap");(n=t==null?void 0:t.querySelector(".selecao-prev"))==null||n.addEventListener("click",()=>{a.scrollBy({left:-340,behavior:"smooth"})}),(l=t==null?void 0:t.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{a.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var o;const a=document.getElementById("construction-filter");a&&(a.value=e),(o=document.getElementById("vendas-section"))==null||o.scrollIntoView({behavior:"smooth"}),G()};function we(e){var c;e.stopPropagation();const a=e.currentTarget.closest(".carousel-wrap");if(!a)return;const o=parseInt(a.dataset.total,10);if(!o)return;let t=parseInt(a.dataset.idx,10)||0;const s=e.currentTarget.classList.contains("carousel-next")?1:-1;t=(t+s+o)%o,a.dataset.idx=t;const n=parseInt(a.dataset.pid,10),l=L.find(i=>i.id===n);(c=l==null?void 0:l.images)!=null&&c.length&&(a.querySelector(".carousel-img").src=l.images[t])}function Oe(){const e=document.getElementById("price-slider"),a=document.getElementById("price-label");!e||!a||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",a.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const o=parseInt(e.value,10);a.textContent="Até R$ "+o.toLocaleString("pt-BR"),G()}))}function Fe(){const e=document.getElementById("city-filter"),a=document.getElementById("neighborhood-filter");if(e&&a){const o=O();e.innerHTML='<option value="">Todas as cidades</option>'+o.map(t=>`<option value="${t.name}">${E(t.name)}</option>`).join(""),e.addEventListener("change",()=>{const t=O().find(n=>n.name===e.value),s=t?fe(t.id):[];a.innerHTML='<option value="">Todos os bairros</option>'+s.map(n=>`<option value="${n.name}">${E(n.name)}</option>`).join(""),G()})}document.querySelectorAll('[id$="-filter"]').forEach(o=>{o.addEventListener("change",G)})}function J(e){const a=document.getElementById("admin-properties");if(a){if(!e.length){a.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}a.innerHTML=e.map(o=>{var l;const t=o.cover_image||((l=o.images)==null?void 0:l[0])||H[0],s=[o.rua,o.numero?`nº ${o.numero}`:"",o.neighborhood,o.city].filter(Boolean).join(", ")||"—",n=o.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${o.id}">
      <td style="position:relative;width:80px;">
        <img src="${t}" class="table-thumb" alt="">
        ${o.reference?`<span class="ref-badge">${E(o.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${E(o.title)}</div>
        <div class="cell-sub">#${o.id}${o.condominium?" · "+E(o.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${E(s)}</td>
      <td class="cell-price">${E(V(o.price,"pt"))}</td>
      <td>${o.bedrooms??"—"}</td>
      <td>${o.parking??"—"}</td>
      <td>${n}</td>
      <td>
        <div class="action-btns">
          ${(x==null?void 0:x.role)==="admin"?`<button data-id="${o.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(x==null?void 0:x.role)==="admin"?`<button data-id="${o.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function De(){const e=document.getElementById("f-city");if(!e)return;const a=O(),o=e.value;e.innerHTML='<option value="">Todas</option>'+a.map(t=>`<option value="${t.name}">${E(t.name)}</option>`).join(""),o&&(e.value=o)}function Xe(){var e,a,o,t,s,n,l,c,i,m,d,v,r,f,u;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((a=document.getElementById("f-title"))==null?void 0:a.value)||"").trim().toLowerCase(),type:((o=document.getElementById("f-type"))==null?void 0:o.value)||"",city:((t=document.getElementById("f-city"))==null?void 0:t.value)||"",neighborhood:((s=document.getElementById("f-neighborhood"))==null?void 0:s.value)||"",condominium:(((n=document.getElementById("f-condominium"))==null?void 0:n.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((c=document.getElementById("f-price-max"))==null?void 0:c.value)||1/0,areaMin:parseFloat((i=document.getElementById("f-area-min"))==null?void 0:i.value)||0,areaMax:parseFloat((m=document.getElementById("f-area-max"))==null?void 0:m.value)||1/0,construction:((d=document.getElementById("f-construction"))==null?void 0:d.value)||"",published:((v=document.getElementById("f-published"))==null?void 0:v.value)||"",bedrooms:((r=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:r.dataset.val)||"",suites:((f=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:f.dataset.val)||"",parking:((u=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:u.dataset.val)||""}}function pe(e){const a=Xe();return Object.values(a).some(t=>t!==""&&t!==0&&t!==1/0)?e.filter(t=>{if(a.ref&&!(t.reference||"").toLowerCase().includes(a.ref)||a.title&&!(t.title||"").toLowerCase().includes(a.title)||a.type&&!(t.title||"").toLowerCase().includes(a.type.toLowerCase())||a.city&&t.city!==a.city||a.neighborhood&&t.neighborhood!==a.neighborhood||a.condominium&&!(t.condominium||"").toLowerCase().includes(a.condominium))return!1;const s=parseInt(String(t.price||"").replace(/[^0-9]/g,""),10)||0;if(a.priceMin>0&&s<a.priceMin||a.priceMax<1/0&&s>a.priceMax)return!1;const n=parseFloat(t.area)||0;return!(a.areaMin>0&&n<a.areaMin||a.areaMax<1/0&&n>a.areaMax||a.construction&&t.construction_status!==a.construction||a.published!==""&&String(t.published)!==a.published||a.bedrooms&&(a.bedrooms==="5+"&&Number(t.bedrooms)<5||a.bedrooms!=="5+"&&Number(t.bedrooms)!==Number(a.bedrooms))||a.suites&&(a.suites==="5+"&&Number(t.suites)<5||a.suites!=="5+"&&Number(t.suites)!==Number(a.suites))||a.parking&&(a.parking==="5+"&&Number(t.parking)<5||a.parking!=="5+"&&Number(t.parking)!==Number(a.parking)))}):e}async function ee(){if(!document.getElementById("admin-properties"))return;const e=await Te(),a=e.length,o=e.filter(l=>l.published===!0).length,t=document.getElementById("stat-total"),s=document.getElementById("stat-published"),n=document.getElementById("stat-leads");t&&(t.textContent=a),s&&(s.textContent=o),n&&(n.textContent="—"),De(),J(L)}let M=null,j="";function le(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function Z(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function te(e){const a=document.getElementById("cover-picker"),o=document.getElementById("cover-strip");if(!(!a||!o)){if(!e.length){a.style.display="none";return}a.style.display="",o.innerHTML=e.map(t=>`
    <div class="cover-thumb-wrap${t===j?" selected":""}" data-url="${t}">
      <img src="${t}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),o.querySelectorAll(".cover-thumb-wrap").forEach(t=>{t.addEventListener("click",()=>{j=t.dataset.url,o.querySelectorAll(".cover-thumb-wrap").forEach(s=>s.classList.remove("selected")),t.classList.add("selected")})})}}function re(){const e=document.getElementById("property-form");if(!e)return;const a=document.getElementById("form-submit-btn");e.addEventListener("submit",async o=>{o.preventDefault();const t=new FormData(e),s=t.getAll("images");let n=[];const l=s.filter(i=>i.size>0);if(l.length){a.disabled=!0,a.textContent=`Enviando 0/${l.length} foto…`;try{n=await je(l,(i,m)=>{a.textContent=`Enviando ${i}/${m} foto…`})}catch(i){console.error("Erro no upload:",i),a.disabled=!1,a.textContent=M?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(M){const i=L.find(m=>m.id===M);i!=null&&i.images&&(n=i.images)}n.length||(n=[...H]);const c={...M?{id:M}:{},title:t.get("title"),rua:t.get("rua")||"",numero:t.get("numero")||"",city:t.get("city"),neighborhood:t.get("neighborhood"),price:t.get("price"),bedrooms:parseInt(t.get("bedrooms"),10)||0,suites:parseInt(t.get("suites"),10)||0,area:parseFloat(t.get("area"))||0,parking:parseInt(t.get("parking"),10)||0,published:t.get("published")==="true",images:n,description:t.get("description")||"",owner_name:t.get("owner_name")||"",owner_phone:t.get("owner_phone")||"",owner_email:t.get("owner_email")||"",owner_notes:t.get("owner_notes")||"",cover_image:j||"",construction_status:t.get("construction_status")||"",condominium:t.get("condominium")||""};try{await Pe(c),M=null,a.disabled=!1,a.textContent="Salvar Imóvel",e.reset();const i=document.getElementById("adminPublished");i&&(i.value="true");const m=document.getElementById("adminNeighborhood");m&&(m.innerHTML='<option value="">Selecione a cidade primeiro</option>');const d=document.getElementById("adminConstructionStatus");d&&(d.value=""),j="",te([]),Z(),await ee()}catch(i){console.error(i),a.disabled=!1,a.textContent=M?"Salvar Alterações":"Salvar Imóvel",alert("Erro ao salvar imóvel. Verifique o console.")}}),document.addEventListener("click",async o=>{var t;if(o.target.matches(".del-btn")){const s=Number(o.target.dataset.id);if(!s||!confirm("Remover este imóvel?"))return;try{await Ne(s),await ee()}catch{alert("Erro ao remover imóvel.")}}if(o.target.matches(".edit-btn")){if((x==null?void 0:x.role)!=="admin")return;const s=Number(o.target.dataset.id);if(!s)return;const n=L.find(i=>i.id===s);if(!n)return;M=s,a.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=n.title||"",e.querySelector('[name="rua"]').value=n.rua||"",e.querySelector('[name="numero"]').value=n.numero||"",e.querySelector('[name="city"]').value=n.city||"",e.querySelector('[name="price"]').value=n.price||"",e.querySelector('[name="bedrooms"]').value=n.bedrooms||"",e.querySelector('[name="suites"]').value=n.suites||"",e.querySelector('[name="area"]').value=n.area||"",e.querySelector('[name="parking"]').value=n.parking||"",e.querySelector('[name="description"]').value=n.description||"",e.querySelector('[name="construction_status"]').value=n.construction_status||"",e.querySelector('[name="owner_name"]').value=n.owner_name||"",e.querySelector('[name="owner_phone"]').value=n.owner_phone||"",e.querySelector('[name="owner_email"]').value=n.owner_email||"",e.querySelector('[name="owner_notes"]').value=n.owner_notes||"",e.querySelector('[name="condominium"]').value=n.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=n.published===!0?"true":"false");const c=document.getElementById("adminCitySelect");c&&(c.value=n.city||"",c.dispatchEvent(new Event("change")),setTimeout(()=>{const i=document.getElementById("adminNeighborhood");i&&(i.value=n.neighborhood||"")},50)),j=n.cover_image||((t=n.images)==null?void 0:t[0])||"",te(n.images||[]),le("Editar Imóvel")}})}function E(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let N=[],A=0;function ze(e){var d,v;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const a=document.getElementById("view-status-badge");e.published?(a.textContent="● Publicado",a.className="badge badge-green"):(a.textContent="○ Rascunho",a.className="badge badge-gray");const o=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=o.length?`📍 ${o.join(", ")}`:"";const t=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.join(" "))}`;document.getElementById("view-map-link").href=t,document.getElementById("view-directions-link").href=t;const s=((d=e.images)==null?void 0:d[0])||H[0];document.getElementById("view-thumb-preview").src=s,N=(v=e.images)!=null&&v.length?e.images:H,A=0,ae(),document.getElementById("view-price").textContent=V(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const n=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),n&&(n.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(r=>r.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(r=>r.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const c="https://omarcorretor.com.br/property.html?id="+e.id,i=document.getElementById("share-link-input");i&&(i.value=c);const m=document.getElementById("share-panel");m&&(m.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function K(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function ae(){const e=document.getElementById("view-main-img"),a=document.getElementById("view-counter"),o=document.getElementById("view-prev"),t=document.getElementById("view-next"),s=document.getElementById("view-thumbs");e.src=N[A],e.alt=`Foto ${A+1}`;const n=N.length>1;o.style.display=n?"flex":"none",t.style.display=n?"flex":"none",a.textContent=n?`${A+1} / ${N.length}`:"",s.innerHTML=n?N.map((l,c)=>`<img src="${l}" class="view-thumb${c===A?" active":""}" data-i="${c}" alt="Foto ${c+1}">`).join(""):"",s.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{A=+l.dataset.i,ae()})})}async function Ie(e){const{data:a}=await p.from("profiles").select("*").eq("id",e).maybeSingle();return a}function ce(e){var l;const a=document.getElementById("sidebar-avatar"),o=document.getElementById("sidebar-avatar-initial"),t=document.getElementById("sidebar-name"),s=document.getElementById("sidebar-role");if(!t)return;const n=(e==null?void 0:e.name)||"Sem nome";t.textContent=n,s.textContent=(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor",o&&(o.textContent=((l=n[0])==null?void 0:l.toUpperCase())||"?"),a&&(e!=null&&e.avatar_url)&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none"))}function Be(e){const a=document.getElementById("admin-root");a&&(a.dataset.role=e||"corretor"),e==="admin"&&(document.querySelectorAll(".admin-only").forEach(t=>{t.style.display=""}),Object.entries({empresa:Ke,visual:Ze,"site-config":Qe,"crm-config":et,integracoes:tt,midia:at}).forEach(([t,s])=>{const n=document.querySelector(`.nav-item[data-section="${t}"]`);n&&n.addEventListener("click",()=>s(),{once:!0})}))}function Ve(){const e=document.getElementById("sidebar-user");e&&e.addEventListener("click",()=>{var t,s;document.querySelectorAll(".nav-item").forEach(n=>n.classList.remove("active"));const a=document.querySelector('.nav-item[data-section="settings"]');a&&a.classList.add("active"),document.querySelectorAll(".admin-section").forEach(n=>n.classList.add("hidden"));const o=document.getElementById("section-settings");o&&o.classList.remove("hidden"),(t=document.getElementById("admin-sidebar"))==null||t.classList.remove("open"),(s=document.getElementById("sidebar-overlay"))==null||s.classList.remove("active")})}const We="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function de(e){return(await fetch(We,{method:"POST",headers:{Authorization:`Bearer ${qe}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function xe(e){var i,m,d,v;const a=document.getElementById("settings-name"),o=document.getElementById("settings-email"),t=document.getElementById("settings-avatar-preview"),s=document.getElementById("settings-avatar-initial"),n=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!a)return;if(a.value=(e==null?void 0:e.name)||"",o){const{data:{user:r}}=await p.auth.getUser();o.value=(r==null?void 0:r.email)||""}const c=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(s&&(s.textContent=c),e!=null&&e.avatar_url&&t&&(t.src=e.avatar_url,t.style.display="",s&&(s.style.display="none")),n==null||n.addEventListener("change",r=>{const f=r.target.files[0];if(!f)return;const u=URL.createObjectURL(f);t&&(t.src=u,t.style.display=""),s&&(s.style.display="none")}),(i=document.getElementById("btn-change-password"))==null||i.addEventListener("click",async()=>{var g,b;const r=((g=document.getElementById("change-password-new"))==null?void 0:g.value)||"",f=((b=document.getElementById("change-password-confirm"))==null?void 0:b.value)||"",u=document.getElementById("change-password-msg"),y=document.getElementById("btn-change-password");if(u&&(u.style.display="none"),r.length<6){u&&(u.textContent="Mínimo 6 caracteres.",u.style.display="");return}if(r!==f){u&&(u.textContent="As senhas não coincidem.",u.style.display="");return}y&&(y.disabled=!0,y.textContent="Salvando…");const{error:I}=await p.auth.updateUser({password:r});y&&(y.disabled=!1,y.textContent="Salvar Nova Senha"),I?u&&(u.textContent="Erro: "+I.message,u.style.display=""):(u&&(u.style.color="#16a34a",u.textContent="Senha alterada com sucesso!",u.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var b;const r=a.value.trim();let f=(x==null?void 0:x.avatar_url)||"";const u=n==null?void 0:n.files[0],y=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",u)try{const S=await ge(u,400,.85),$=`avatars/${x.id}-${Date.now()}.jpg`,{error:C}=await p.storage.from("imoveis").upload($,S,{contentType:"image/jpeg",upsert:!0});if(!C){const{data:{publicUrl:U}}=p.storage.from("imoveis").getPublicUrl($);f=U}}catch(S){console.error("Avatar upload:",S)}const{error:I}=await p.from("profiles").update({name:r,avatar_url:f}).eq("id",x.id);if(l.disabled=!1,l.textContent=y,I){alert("Erro ao salvar perfil.");return}x={...x,name:r,avatar_url:f},ce(x);const g=document.getElementById("settings-avatar-initial");g&&(g.textContent=((b=r[0])==null?void 0:b.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"){const r=document.getElementById("settings-corretores-section");r&&(r.style.display=""),await ne(),(m=document.getElementById("btn-invite-corretor"))==null||m.addEventListener("click",async()=>{var g,b;const u=(g=document.getElementById("invite-email"))==null?void 0:g.value.trim(),y=(b=document.getElementById("invite-password"))==null?void 0:b.value.trim(),I=document.getElementById("btn-invite-corretor");if(!u){alert("Informe o e-mail do corretor.");return}if(!y||y.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}I&&(I.disabled=!0,I.textContent="Criando…");try{const S=await de({email:u,password:y});if(S.success){alert("Acesso criado! O corretor receberá um e-mail com o login e a senha que você definiu.");const $=document.getElementById("invite-email"),C=document.getElementById("invite-password");$&&($.value=""),C&&(C.value=""),await ne()}else alert("Erro: "+(S.error||"Falha desconhecida"))}catch(S){alert("Erro ao criar acesso: "+S.message)}finally{I&&(I.disabled=!1,I.textContent="+ Criar Acesso")}});const f=document.getElementById("settings-locations-section");f&&(f.style.display=""),await X(),(d=document.getElementById("loc-add-city-btn"))==null||d.addEventListener("click",async()=>{const u=document.getElementById("loc-new-city"),y=u==null?void 0:u.value.trim();if(!y)return;const{error:I}=await p.from("locations").insert({type:"cidade",name:y});if(I){alert("Erro ao adicionar cidade.");return}u&&(u.value=""),await X(),ye()}),(v=document.getElementById("loc-add-neighborhood-btn"))==null||v.addEventListener("click",async()=>{var b;const u=parseInt((b=document.getElementById("loc-new-neighborhood-city"))==null?void 0:b.value,10),y=document.getElementById("loc-new-neighborhood"),I=y==null?void 0:y.value.trim();if(!u||!I){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:g}=await p.from("locations").insert({type:"bairro",name:I,parent_id:u});if(g){alert("Erro ao adicionar bairro.");return}y&&(y.value=""),await X()})}}async function ne(){const e=document.getElementById("corretores-list");if(!e)return;const{data:a,error:o}=await p.from("profiles").select("*").order("created_at");if(o||!a){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=a.map(t=>{const s=(t.name||"?")[0].toUpperCase(),n=t.avatar_url?`<img src="${t.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${E(s)}</div>`,l=t.id===(x==null?void 0:x.id),c=t.active!==!1,i=c?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',m=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${t.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${t.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${t.role==="admin"?" selected":""}>Admin</option>
         </select>`,d=l?"":c?`<button class="corretor-toggle-btn" data-uid="${t.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${t.id}" data-active="false">Liberar acesso</button>`,v=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${t.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${n}
        <div>
          <div class="corretor-name">${E(t.name||"—")}</div>
          <div class="corretor-role-badge">${t.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${i}
        ${m}
        ${d}
        ${v}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(t=>{t.addEventListener("change",async()=>{await p.from("profiles").update({role:t.value}).eq("id",t.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(t=>{t.addEventListener("click",async()=>{const s=t.dataset.uid,n=t.dataset.active==="true";t.disabled=!0,t.textContent="Aguarde…";try{const l=await de({action:"toggle",userId:s,active:!n});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await ne()})}),e.querySelectorAll(".corretor-del-btn").forEach(t=>{t.addEventListener("click",async()=>{var l,c;const s=t.dataset.uid,n=((c=(l=t.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:c.textContent)||"este corretor";if(confirm(`Excluir "${n}"? Esta ação não pode ser desfeita.`)){t.disabled=!0;try{const i=await de({action:"delete",userId:s});i.success||alert("Erro ao excluir: "+(i.error||"Falha desconhecida"))}catch(i){alert("Erro: "+i.message)}await ne()}})})}async function $e(){const{data:e,error:a}=await p.from("locations").select("*").order("name");return a?(console.error("loadLocations:",a),[]):(W=e||[],W)}function O(){return W.filter(e=>e.type==="cidade")}function fe(e){return W.filter(a=>a.type==="bairro"&&a.parent_id===e)}function ye(){const e=document.getElementById("adminCitySelect");if(!e)return;const a=e.value,o=O();e.innerHTML='<option value="">Selecione</option>'+o.map(t=>`<option value="${t.name}">${E(t.name)}</option>`).join(""),a&&(e.value=a)}async function X(){await $e();const e=O(),a=document.getElementById("loc-cities-list"),o=document.getElementById("loc-neighborhoods-list"),t=document.getElementById("loc-new-neighborhood-city");if(!a||!o)return;a.innerHTML=e.length?e.map(n=>`
        <div class="loc-item">
          <span class="loc-item-name">${E(n.name)}</span>
          <button class="loc-del-btn" data-id="${n.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const s=W.filter(n=>n.type==="bairro");o.innerHTML=s.length?s.map(n=>{const l=e.find(c=>c.id===n.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${E(n.name)}</div>
              ${l?`<div class="loc-item-sub">${E(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${n.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',t&&(t.innerHTML='<option value="">Cidade…</option>'+e.map(n=>`<option value="${n.id}">${E(n.name)}</option>`).join("")),a.querySelectorAll(".loc-del-btn").forEach(n=>{n.addEventListener("click",async()=>{const l=n.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:c}=await p.from("locations").delete().eq("id",n.dataset.id);if(c){alert("Erro ao excluir.");return}await X(),ye()})}),o.querySelectorAll(".loc-del-btn").forEach(n=>{n.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await p.from("locations").delete().eq("id",n.dataset.id);if(l){alert("Erro ao excluir.");return}await X()})})}function Se(){var s,n,l,c,i,m,d,v,r,f,u,y,I,g,b,S,$,C,U,he;document.querySelectorAll(".filter-btn").forEach(B=>{B.addEventListener("click",()=>{const h=B.closest(".filter-btns"),w=B.classList.contains("active");h.querySelectorAll(".filter-btn").forEach(k=>k.classList.remove("active")),w||B.classList.add("active")})}),(s=document.getElementById("f-city"))==null||s.addEventListener("change",()=>{var _;const B=(_=document.getElementById("f-city"))==null?void 0:_.value,h=O().find(q=>q.name===B),w=h?fe(h.id):[],k=document.getElementById("f-neighborhood");k&&(k.innerHTML='<option value="">Todos</option>'+w.map(q=>`<option value="${q.name}">${E(q.name)}</option>`).join(""))}),(n=document.getElementById("f-search-btn"))==null||n.addEventListener("click",()=>{J(pe(L))}),(l=document.getElementById("f-clear-btn"))==null||l.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach(k=>{const _=document.getElementById(k);_&&(_.value="")}),["f-type","f-city","f-construction","f-published"].forEach(k=>{const _=document.getElementById(k);_&&(_.value="")});const w=document.getElementById("f-neighborhood");w&&(w.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach(k=>k.classList.remove("active")),J(L)}),document.querySelectorAll(".nav-item[data-section]").forEach(B=>{B.addEventListener("click",()=>{var h;document.querySelectorAll(".nav-item").forEach(w=>w.classList.remove("active")),B.classList.add("active"),document.querySelectorAll(".admin-section").forEach(w=>w.classList.add("hidden")),(h=document.getElementById(`section-${B.dataset.section}`))==null||h.classList.remove("hidden")})});const e=document.getElementById("admin-sidebar"),a=document.getElementById("sidebar-overlay"),o=document.getElementById("sidebar-toggle"),t=()=>{e==null||e.classList.remove("open"),a==null||a.classList.remove("open")};o==null||o.addEventListener("click",()=>{e==null||e.classList.toggle("open"),a==null||a.classList.toggle("open")}),a==null||a.addEventListener("click",t),(c=document.getElementById("modal-close"))==null||c.addEventListener("click",Z),(i=document.getElementById("modal-cancel"))==null||i.addEventListener("click",Z),(m=document.getElementById("property-modal"))==null||m.addEventListener("click",B=>{B.target.id==="property-modal"&&Z()}),(d=document.getElementById("btn-new-property"))==null||d.addEventListener("click",()=>{M=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",j="",te([]),le("Novo Imóvel")}),(v=document.getElementById("logout-btn"))==null||v.addEventListener("click",async()=>{await p.auth.signOut(),location.reload()}),(r=document.getElementById("view-prev"))==null||r.addEventListener("click",()=>{A=(A-1+N.length)%N.length,ae()}),(f=document.getElementById("view-next"))==null||f.addEventListener("click",()=>{A=(A+1)%N.length,ae()}),(u=document.getElementById("view-modal-close"))==null||u.addEventListener("click",K),(y=document.getElementById("view-modal-close2"))==null||y.addEventListener("click",K),(I=document.getElementById("view-modal"))==null||I.addEventListener("click",B=>{B.target.id==="view-modal"&&K()}),(g=document.getElementById("view-modal-share"))==null||g.addEventListener("click",()=>{const B=document.getElementById("share-panel");if(!B)return;const h=B.style.display!=="none";B.style.display=h?"none":"block"}),(b=document.getElementById("share-whatsapp"))==null||b.addEventListener("click",()=>{var k,_;const B=(k=document.getElementById("share-link-input"))==null?void 0:k.value;if(!B)return;const h=((_=document.getElementById("view-modal-title"))==null?void 0:_.textContent)||"Imóvel",w=encodeURIComponent("Olha esse imóvel que encontrei: "+h+`
`+B);window.open("https://wa.me/?text="+w,"_blank")}),(S=document.getElementById("share-instagram"))==null||S.addEventListener("click",()=>{var h,w;const B=(h=document.getElementById("share-link-input"))==null?void 0:h.value;B&&((w=navigator.clipboard)==null||w.writeText(B),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),($=document.getElementById("share-email"))==null||$.addEventListener("click",()=>{var _,q;const B=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!B)return;const h=((q=document.getElementById("view-modal-title"))==null?void 0:q.textContent)||"Imóvel",w=encodeURIComponent("Imóvel: "+h),k=encodeURIComponent(`Olá! Segue o link do imóvel:

`+B);window.open("mailto:?subject="+w+"&body="+k,"_blank")}),(C=document.getElementById("share-copy"))==null||C.addEventListener("click",()=>{var h;const B=document.getElementById("share-link-input");B&&((h=navigator.clipboard)==null||h.writeText(B.value).then(()=>{const w=document.getElementById("share-copy"),k=w.textContent;w.textContent="✅ Copiado!",setTimeout(()=>{w.textContent=k},2e3)}))}),(U=document.getElementById("view-modal-edit"))==null||U.addEventListener("click",()=>{var Ee;if((x==null?void 0:x.role)!=="admin")return;const B=document.getElementById("view-modal-title").textContent,h=L.find(Y=>Y.title===B);if(!h)return;K(),M=h.id;const w=document.getElementById("property-form"),k=document.getElementById("form-submit-btn");k.textContent="Salvar Alterações",w.querySelector('[name="title"]').value=h.title||"",w.querySelector('[name="rua"]').value=h.rua||"",w.querySelector('[name="numero"]').value=h.numero||"",w.querySelector('[name="city"]').value=h.city||"",w.querySelector('[name="price"]').value=h.price||"",w.querySelector('[name="bedrooms"]').value=h.bedrooms||"",w.querySelector('[name="suites"]').value=h.suites||"",w.querySelector('[name="parking"]').value=h.parking||"",w.querySelector('[name="description"]').value=h.description||"",w.querySelector('[name="construction_status"]').value=h.construction_status||"",w.querySelector('[name="owner_name"]').value=h.owner_name||"",w.querySelector('[name="owner_phone"]').value=h.owner_phone||"",w.querySelector('[name="owner_email"]').value=h.owner_email||"",w.querySelector('[name="owner_notes"]').value=h.owner_notes||"",w.querySelector('[name="condominium"]').value=h.condominium||"";const _=document.getElementById("adminPublished");_&&(_.value=h.published===!0?"true":"false");const q=document.getElementById("adminCitySelect");q&&(q.value=h.city||"",q.dispatchEvent(new Event("change")),setTimeout(()=>{const Y=document.getElementById("adminNeighborhood");Y&&(Y.value=h.neighborhood||"")},50)),j=h.cover_image||((Ee=h.images)==null?void 0:Ee[0])||"",te(h.images||[]),le("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(B=>{B.addEventListener("click",()=>{var h;document.querySelectorAll(".tab-btn").forEach(w=>w.classList.remove("active")),B.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(w=>w.classList.add("hidden")),(h=document.getElementById(`tab-${B.dataset.tab}`))==null||h.classList.remove("hidden")})}),(he=document.getElementById("admin-properties"))==null||he.addEventListener("click",B=>{if(B.target.closest(".action-btns"))return;const h=B.target.closest("tr");if(!h)return;const w=Number(h.dataset.id);if(!w)return;const k=L.find(_=>_.id===w);k&&ze(k)})}document.addEventListener("DOMContentLoaded",async()=>{var n,l,c;await Promise.all([ke(),$e()]),F=R("company.whatsapp",F),z=`https://wa.me/${F}`,ve(),Oe(),Fe();const e=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");e&&a&&(ye(),e.addEventListener("change",()=>{const i=O().find(d=>d.name===e.value),m=i?fe(i.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+m.map(d=>`<option value="${d.name}">${E(d.name)}</option>`).join("")}));const o=document.getElementById("admin-login"),t=document.getElementById("admin-root");if(o){const i=new URLSearchParams(window.location.hash.replace("#","")),m=new URLSearchParams(window.location.search),d=i.get("type")||m.get("type")||"",v=Le||d==="recovery"||d==="invite"||window.location.hash.includes("access_token")||m.has("code"),r=document.getElementById("password-reset-overlay");if(v){o.style.display="none",t&&t.classList.add("hidden"),r&&(r.style.display="flex"),(n=document.getElementById("password-reset-form"))==null||n.addEventListener("submit",async u=>{var $,C;u.preventDefault();const y=(($=document.getElementById("new-password"))==null?void 0:$.value)||"",I=((C=document.getElementById("confirm-password"))==null?void 0:C.value)||"",g=document.getElementById("password-reset-msg"),b=u.target.querySelector('button[type="submit"]');if(g&&(g.style.display="none"),y!==I){g&&(g.textContent="As senhas não coincidem.",g.style.display="");return}b&&(b.disabled=!0,b.textContent="Salvando…");const{error:S}=await p.auth.updateUser({password:y});if(S){g&&(g.textContent="Erro: "+S.message,g.style.display=""),b&&(b.disabled=!1,b.textContent="Definir Senha");return}window.location.href=window.location.pathname}),m.has("code")&&await p.auth.exchangeCodeForSession(m.get("code")??"");return}const{data:{session:f}}=await p.auth.getSession();if(f){if(o.classList.add("hidden"),t&&t.classList.remove("hidden"),await ee(),re(),Se(),Ve(),x=await Ie(f.user.id),!x){await p.auth.signOut(),o.classList.remove("hidden"),t&&t.classList.add("hidden");return}if(x.active===!1){await p.auth.signOut(),o.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(x.needs_password_reset){o.style.display="none",t&&t.classList.add("hidden");const u=document.getElementById("password-reset-overlay");u&&(u.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async y=>{var C,U;y.preventDefault();const I=((C=document.getElementById("new-password"))==null?void 0:C.value)||"",g=((U=document.getElementById("confirm-password"))==null?void 0:U.value)||"",b=document.getElementById("password-reset-msg"),S=y.target.querySelector('button[type="submit"]');if(b&&(b.style.display="none"),I!==g){b&&(b.textContent="As senhas não coincidem.",b.style.display="");return}if(I.length<6){b&&(b.textContent="Mínimo 6 caracteres.",b.style.display="");return}S&&(S.disabled=!0,S.textContent="Salvando…");const{error:$}=await p.auth.updateUser({password:I});if($){b&&(b.textContent="Erro: "+$.message,b.style.display=""),S&&(S.disabled=!1,S.textContent="Definir Senha");return}await p.from("profiles").update({needs_password_reset:!1}).eq("id",x.id),window.location.href=window.location.pathname});return}ce(x),Be(x.role),await xe(x)}else{t&&t.classList.add("hidden"),o.classList.remove("hidden");const u=document.getElementById("login-form");u&&((c=document.getElementById("forgot-password-btn"))==null||c.addEventListener("click",async()=>{var g,b;const y=(b=(g=u.querySelector('input[name="email"]'))==null?void 0:g.value)==null?void 0:b.trim();if(!y){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:I}=await p.auth.resetPasswordForEmail(y,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(I?"Erro: "+I.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),u.addEventListener("submit",async y=>{y.preventDefault();const I=new FormData(u),g=I.get("email"),b=I.get("password");if(await Ue(g,b)){o.classList.add("hidden"),t&&t.classList.remove("hidden"),await ee(),re(),Se();const{data:{session:$}}=await p.auth.getSession();if(x=$?await Ie($.user.id):null,!x){await p.auth.signOut();return}if(x.active===!1){await p.auth.signOut(),o.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}ce(x),Be(x.role),await xe(x)}else alert("E-mail ou senha incorretos")}))}}else re();await G();const s=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();_e(s),Ce(F)});async function Ge(){const e=L.filter(s=>!s.reference);if(!e.length)return;const a=L.map(s=>s.reference||"").filter(s=>/^IO-\d+$/.test(s)).map(s=>parseInt(s.replace("IO-",""),10));let o=a.length?Math.max(...a)+1:1;const t=[...e].sort((s,n)=>s.id-n.id);for(const s of t){const n="IO-"+String(o).padStart(4,"0"),{error:l}=await p.from("properties").update({reference:n}).eq("id",s.id);if(!l){const c=L.findIndex(i=>i.id===s.id);c>=0&&(L[c].reference=n),o++}}J(pe(L))}async function Je(){const e=L.filter(a=>{var o;return(o=a.images)==null?void 0:o.some(t=>!t.includes("/wm-"))});if(e.length){for(const a of e){if(!a.images.some(n=>!n.includes("/wm-")))continue;const t=[];let s=!1;for(const n of a.images)if(n.includes("/wm-"))t.push(n);else try{const l=await Ye(n);t.push(l),s=!0}catch{t.push(n)}if(s){await p.from("properties").update({images:t}).eq("id",a.id);const n=L.findIndex(l=>l.id===a.id);n>=0&&(L[n].images=t)}}J(pe(L))}}async function Ye(e){try{const a=await fetch(e);if(!a.ok)return e;const o=await a.blob(),t=URL.createObjectURL(o),s=await fetch("/logo.png"),n=s.ok?await s.blob():null,l=n?URL.createObjectURL(n):null;return new Promise(c=>{const i=new Image;i.onload=()=>{URL.revokeObjectURL(t);const m=document.createElement("canvas"),d=1200;let v=i.width,r=i.height;v>d&&(r=Math.round(r*d/v),v=d),m.width=v,m.height=r;const f=m.getContext("2d");f.drawImage(i,0,0,v,r);const u=y=>{if(y){const I=Math.round(v*.18),g=Math.round(y.naturalHeight*I/y.naturalWidth),b=Math.round(v*.02);f.globalAlpha=.45,f.drawImage(y,v-I-b,r-g-b,I,g),f.globalAlpha=1}m.toBlob(async I=>{try{const g=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:b}=await p.storage.from("imoveis").upload(g,I,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(b){console.error("Upload watermark error:",b),c(e);return}const{data:{publicUrl:S}}=p.storage.from("imoveis").getPublicUrl(g);c(S)}catch(g){console.error("Watermark upload exception:",g),c(e)}},"image/jpeg",.82)};if(l){const y=new Image;y.onload=()=>{URL.revokeObjectURL(l),u(y)},y.onerror=()=>{URL.revokeObjectURL(l),u(null)},y.src=l}else u(null)},i.onerror=()=>{URL.revokeObjectURL(t),c(e)},i.src=t})}catch(a){return console.error("applyWatermarkToUrl error:",a),e}}function T(e,a){e&&(e.textContent=a?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(a?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function be(e,a="assets"){const o=await ge(e,1200,.85),t=`${a}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:s}=await p.storage.from("imoveis").upload(t,o,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(s)throw s;const{data:{publicUrl:n}}=p.storage.from("imoveis").getPublicUrl(t);return n}async function Ke(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await p.from("settings").select("key,value"),o={};a==null||a.forEach(s=>{o[s.key]=s.value||""});const t=s=>E(String(o[s]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",s=>{document.getElementById("co-logo-preview").src=s.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async s=>{const n=s.target.files[0];if(n)try{const l=await be(n,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const s=document.getElementById("co-save-identity");s.disabled=!0,s.textContent="Salvando…";const n=await D([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);n&&ve(),s.disabled=!1,s.textContent="Salvar Identidade",T(document.getElementById("co-identity-msg"),n)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const s=document.getElementById("co-save-contacts");s.disabled=!0,s.textContent="Salvando…";const n=document.getElementById("co-whatsapp").value.trim(),l=await D([["company.whatsapp",n],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&n&&(F=n,z=`https://wa.me/${n}`),s.disabled=!1,s.textContent="Salvar Contatos",T(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const s=document.getElementById("co-save-social");s.disabled=!0,s.textContent="Salvando…";const n=await D([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);s.disabled=!1,s.textContent="Salvar Redes Sociais",T(document.getElementById("co-social-msg"),n)})}async function Ze(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await p.from("settings").select("key,value"),o={};a==null||a.forEach(d=>{o[d.key]=d.value||""});const t=o["visual.accent_color"]||"#b8962e",s=o["visual.primary_bg"]||"#0f1c2e",n=o["visual.secondary_bg"]||"#1a2f4a",l=o["visual.hero_bg_url"]||"",c=o["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input type="color" id="col-primary" value="${s}">
          <input type="text"  id="col-primary-hex" value="${s}" maxlength="7">
        </div>
      </div>
      <div class="color-row">
        <label class="form-label">Fundo Secundário (Seções)</label>
        <div class="color-swatch">
          <input type="color" id="col-secondary" value="${n}">
          <input type="text"  id="col-secondary-hex" value="${n}" maxlength="7">
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
          <input id="vis-hero-url" class="form-control" value="${E(l)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <div id="vis-hero-preview" style="margin-top:10px;display:${l?"":"none"}">
          <img src="${E(l)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function i(d,v,r){const f=document.getElementById(d),u=document.getElementById(v);f==null||f.addEventListener("input",y=>{u.value=y.target.value,r()}),u==null||u.addEventListener("input",y=>{/^#[0-9a-fA-F]{6}$/.test(y.target.value)&&(f.value=y.target.value,r())})}function m(){var v,r,f,u;const d=((v=document.getElementById("col-accent-hex"))==null?void 0:v.value)||"#b8962e";(r=document.getElementById("vp-bar"))==null||r.style.setProperty("background",d),(f=document.getElementById("vp-dot"))==null||f.style.setProperty("background",d),(u=document.getElementById("vp-btn"))==null||u.style.setProperty("background",d),document.documentElement.style.setProperty("--accent",d)}i("col-accent","col-accent-hex",m),i("col-primary","col-primary-hex",()=>{}),i("col-secondary","col-secondary-hex",()=>{}),m(),document.getElementById("vis-hero-file").addEventListener("change",async d=>{const v=d.target.files[0];if(v)try{const r=await be(v,"hero");document.getElementById("vis-hero-url").value=r;const f=document.getElementById("vis-hero-preview");f.innerHTML=`<img src="${r}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,f.style.display=""}catch(r){alert("Erro no upload: "+r.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const d=document.getElementById("visual-save-colors");d.disabled=!0,d.textContent="Salvando…";const v=await D([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);v&&ve(),d.disabled=!1,d.textContent="Salvar Cores",T(document.getElementById("visual-colors-msg"),v)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",m())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const d=document.getElementById("visual-save-images");d.disabled=!0,d.textContent="Salvando…";const v=await D([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);d.disabled=!1,d.textContent="Salvar Imagens",T(document.getElementById("visual-images-msg"),v)})}async function Qe(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await p.from("site_content").select("*"),o={};a==null||a.forEach(i=>{o[i.key]=i});const t=(i,m)=>{var d;return E(((d=o[i])==null?void 0:d[`value_${m}`])||"")},s=["pt","en","es"],n={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=i=>s.map(m=>`<button class="content-tab${m===i?" active":""}" data-lang="${m}">${n[m]}</button>`).join(""),c=i=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${i}" value="${t("hero.title",i)}">
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${i}" rows="3">${t("hero.subtitle",i)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${i}" rows="4">${t("inst.bio_p1",i)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${i}" rows="3">${t("inst.bio_p2",i)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${i}" rows="3">${t("inst.bio_p3",i)}</textarea>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${i}" value="${t("inst.stat1_num",i)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${i}" value="${t("inst.stat2_num",i)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${i}" value="${t("inst.stat3_num",i)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${i}" value="${t("inst.stat1_label",i)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${i}" value="${t("inst.stat2_label",i)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${i}" value="${t("inst.stat3_label",i)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${i}" value="${t("footer.text",i)}">
    </div>
  `;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${l("pt")}</div>
      <div id="sc-panels">
        ${s.map(i=>`<div class="content-panel${i==="pt"?" active":""}" data-panel="${i}">${c(i)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",i=>{var d;const m=i.target.closest(".content-tab");m&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(v=>v.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(v=>v.classList.remove("active")),m.classList.add("active"),(d=document.querySelector(`#sc-panels [data-panel="${m.dataset.lang}"]`))==null||d.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const i=document.getElementById("sc-save-btn");i.disabled=!0,i.textContent="Salvando…";const m={};document.querySelectorAll(".sc-field").forEach(v=>{const r=v.dataset.key,f=v.dataset.lang;m[r]||(m[r]={}),m[r][f]=v.value});let d=!0;for(const[v,r]of Object.entries(m))await se(v,{pt:r.pt,en:r.en,es:r.es})||(d=!1);i.disabled=!1,i.textContent="Salvar Conteúdo",T(document.getElementById("sc-save-msg"),d)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const i=document.getElementById("seo-save-btn");i.disabled=!0,i.textContent="Salvando…";const m=document.getElementById("seo-title").value.trim(),d=document.getElementById("seo-desc").value.trim(),v=await se("seo.title_pt",{pt:m,en:m,es:m})&&await se("seo.description_pt",{pt:d,en:d,es:d});i.disabled=!1,i.textContent="Salvar SEO",T(document.getElementById("seo-save-msg"),v)})}async function et(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await P())}async function P(){const e=document.getElementById("crm-body");if(!e)return;const[{data:a},{data:o},{data:t},{data:s}]=await Promise.all([p.from("crm_pipelines").select("*").order("sort_order"),p.from("crm_stages").select("*").order("sort_order"),p.from("crm_tags").select("*").order("name"),p.from("crm_lead_statuses").select("*").order("sort_order")]),n=a||[],l=n.find(r=>r.is_default)||n[0],c=n.map(r=>`<option value="${r.id}"${r.id===(l==null?void 0:l.id)?" selected":""}>${E(r.name)}</option>`).join(""),m=(o||[]).filter(r=>r.pipeline_id===(l==null?void 0:l.id)).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${E(r.name)}</span>
      <input type="color" value="${r.color}" data-sid="${r.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${r.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',d=(t||[]).map(r=>`<span class="tag-chip" style="background:${r.color}" data-id="${r.id}">
      ${E(r.name)}
      <button class="tag-chip-del" data-id="${r.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',v=(s||[]).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${E(r.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${r.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${r.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${c}</select>
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
      <div class="tags-grid" id="crm-tags-grid">${d}</div>
      <div class="tag-add-row">
        <input id="crm-new-tag" type="text" class="form-control" placeholder="Nome da tag…">
        <input type="color" id="crm-new-tag-color" value="#b8962e">
        <button class="btn-primary" id="crm-add-tag">Adicionar</button>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📋</span> Status de Leads</div>
      <div class="stages-list" id="crm-status-list">${v}</div>
      <div class="stage-add-row">
        <input id="crm-new-status" type="text" class="form-control" placeholder="Nome do status…">
        <input type="color" id="crm-new-status-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text);white-space:nowrap">
          <input type="checkbox" id="crm-new-status-final"> Status final
        </label>
        <button class="btn-primary" id="crm-add-status">Adicionar</button>
      </div>
    </div>
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const r=document.getElementById("crm-new-stage").value.trim(),f=document.getElementById("crm-new-stage-color").value,u=parseInt(document.getElementById("crm-pipe-sel").value,10);r&&(await p.from("crm_stages").insert({pipeline_id:u,name:r,color:f,sort_order:99}),document.getElementById("crm-new-stage").value="",await P())}),e.querySelectorAll(".stage-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await p.from("crm_stages").delete().eq("id",r.dataset.id),await P())})}),e.querySelectorAll(".stage-color-pick").forEach(r=>{r.addEventListener("change",async f=>{await p.from("crm_stages").update({color:f.target.value}).eq("id",r.dataset.sid);const u=r.closest(".stage-item").querySelector(".stage-color-dot");u&&(u.style.background=f.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const r=document.getElementById("crm-new-tag").value.trim(),f=document.getElementById("crm-new-tag-color").value;r&&(await p.from("crm_tags").insert({name:r,color:f}),document.getElementById("crm-new-tag").value="",await P())}),e.querySelectorAll(".tag-chip-del").forEach(r=>{r.addEventListener("click",async()=>{await p.from("crm_tags").delete().eq("id",r.dataset.id),await P()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const r=document.getElementById("crm-new-status").value.trim(),f=document.getElementById("crm-new-status-color").value,u=document.getElementById("crm-new-status-final").checked;r&&(await p.from("crm_lead_statuses").insert({name:r,color:f,is_final:u,sort_order:99}),document.getElementById("crm-new-status").value="",await P())}),e.querySelectorAll(".status-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover este status?")&&(await p.from("crm_lead_statuses").delete().eq("id",r.dataset.id),await P())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var f;const r=(f=prompt("Nome do novo funil:"))==null?void 0:f.trim();r&&(await p.from("crm_pipelines").insert({name:r,sort_order:99}),await P())})}async function tt(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await p.from("integrations").select("*"),o={};a==null||a.forEach(c=>{o[c.key]=c});const t=c=>{var i;return E(((i=o[c])==null?void 0:i.value)||"")},s=c=>{var i;return(i=o[c])!=null&&i.enabled?"checked":""},n=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${n.map(c=>`
        <div class="integration-row">
          <div class="integration-icon">${c.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${c.label}</div>
            <div class="integration-desc">${c.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${c.key}" ${s(c.key)}>
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var v;const c=document.getElementById("intg-save-tracking");c.disabled=!0,c.textContent="Salvando…";let i=!0;const m=document.querySelectorAll(".intg-val"),d=document.querySelectorAll(".intg-toggle");for(let r=0;r<m.length;r++){const f=m[r].dataset.key,u=m[r].value.trim(),y=((v=d[r])==null?void 0:v.checked)??!1;await ie(f,u,y)||(i=!1)}c.disabled=!1,c.textContent="Salvar Integrações",T(document.getElementById("intg-tracking-msg"),i)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const c=document.getElementById("intg-save-smtp");c.disabled=!0,c.textContent="Salvando…";const i=document.querySelectorAll(".smtp-field");let m=!0;for(const v of i)await ie(v.dataset.key,v.value.trim(),!0)||(m=!1);const d=document.getElementById("smtp-pass").value;d&&(await ie("smtp_pass",d,!0)||(m=!1)),c.disabled=!1,c.textContent="Salvar SMTP",T(document.getElementById("intg-smtp-msg"),m)})}async function at(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await me(),document.getElementById("media-file-input").addEventListener("change",async o=>{var i,m;const t=Array.from(o.target.files);if(!t.length)return;const s=document.getElementById("media-upload-progress"),n=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");s.style.display="";let c=0;for(const d of t){l.textContent=`Enviando ${c+1}/${t.length}…`,n.style.width=`${Math.round(c/t.length*100)}%`;try{const v=await be(d,"media"),r=d.name.replace(/\.[^.]+$/,"").slice(0,60);await p.from("media_library").insert({name:r,url:v,type:"image",size:d.size,created_by:(m=(i=(await p.auth.getUser()).data)==null?void 0:i.user)==null?void 0:m.id})}catch(v){console.error("Media upload error:",v)}c++}n.style.width="100%",l.textContent=`✓ ${c} arquivo(s) enviado(s)`,setTimeout(()=>{s.style.display="none",n.style.width="0"},2e3),await me(),o.target.value=""});const a=document.getElementById("media-drop-area");a.addEventListener("dragover",o=>{o.preventDefault(),a.classList.add("drag-over")}),a.addEventListener("dragleave",()=>a.classList.remove("drag-over")),a.addEventListener("drop",o=>{o.preventDefault(),a.classList.remove("drag-over"),document.getElementById("media-file-input").files=o.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function me(){const e=document.getElementById("media-grid");if(!e)return;const{data:a,error:o}=await p.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(o||!(a!=null&&a.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=a.map(t=>`
    <div class="media-item" data-id="${t.id}" data-url="${E(t.url)}">
      <img src="${E(t.url)}" alt="${E(t.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${E(t.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${t.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${E(t.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(t=>{t.addEventListener("click",s=>{var n;s.stopPropagation(),(n=navigator.clipboard)==null||n.writeText(t.dataset.url).then(()=>{const l=t.textContent;t.textContent="✓ Copiado!",setTimeout(()=>{t.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(t=>{t.addEventListener("click",async s=>{s.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await p.from("media_library").delete().eq("id",t.dataset.id),await me())})})}
