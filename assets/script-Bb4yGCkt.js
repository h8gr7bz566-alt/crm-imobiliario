import{s as f}from"./supabase-BcuJ3xoD.js";let oe={},he={};async function He(){const[e,a]=await Promise.all([f.from("settings").select("key,value"),f.from("site_content").select("*")]);e.data&&e.data.forEach(n=>{oe[n.key]=n.value}),a.data&&a.data.forEach(n=>{he[n.key]=n})}const U=(e,a=null)=>oe[e]!==void 0?oe[e]:a,ce=(e,a="pt")=>{const n=he[e];return n?n[`value_${a}`]??n.value_pt??null:null};async function z(e){const a=new Date().toISOString(),n=e.map(([i,o])=>({key:i,value:o,updated_at:a})),{error:t}=await f.from("settings").upsert(n,{onConflict:"key"});return t||e.forEach(([i,o])=>{oe[i]=o}),!t}async function de(e,{pt:a,en:n,es:t}){const i={key:e,value_pt:a,value_en:n,value_es:t,updated_at:new Date().toISOString()},{error:o}=await f.from("site_content").upsert(i,{onConflict:"key"});return o||(he[e]=i),!o}async function me(e,a,n){const{error:t}=await f.from("integrations").upsert({key:e,value:a,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!t}function Ee(){const e=document.documentElement,a=U("visual.accent_color","#b8962e"),n=U("visual.primary_bg","#0f1c2e"),t=U("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",a),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",t);const i=U("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(s=>{s.src=i});const o=U("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=o);const c=U("visual.hero_bg_url","");if(c){const s=document.querySelector(".hero");s&&(s.style.backgroundImage=`url('${c}')`)}}function Oe(e="pt"){const a=v=>ce(v,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&a("hero.title")&&(n.innerHTML=a("hero.title"));const t=document.querySelector(".hero-content > p");t&&a("hero.subtitle")&&(t.innerHTML=a("hero.subtitle"));const i=document.querySelector(".footer small");i&&a("footer.text")&&(i.innerHTML=a("footer.text"));const o=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),c=document.querySelector('[data-i18n="inst.p3"]');o&&a("inst.bio_p1")&&(o.innerHTML=a("inst.bio_p1")),l&&a("inst.bio_p2")&&(l.innerHTML=a("inst.bio_p2")),c&&a("inst.bio_p3")&&(c.innerHTML=a("inst.bio_p3"));const s=document.querySelector('[data-i18n-num="inst.stat2num"]'),m=document.querySelector('[data-i18n="inst.stat1"]'),d=document.querySelector('[data-i18n="inst.stat2"]'),u=document.querySelector('[data-i18n="inst.stat3"]');s&&a("inst.stat2_num")&&(s.innerHTML=a("inst.stat2_num")),m&&a("inst.stat1_label")&&(m.innerHTML=a("inst.stat1_label")),d&&a("inst.stat2_label")&&(d.innerHTML=a("inst.stat2_label")),u&&a("inst.stat3_label")&&(u.innerHTML=a("inst.stat3_label"));const r=ce("seo.title_pt",e);r&&document.title&&(document.title=r);const p=ce("seo.description_pt",e);if(p){const v=document.querySelector('meta[name="description"]');v&&(v.content=p)}}function Fe(e){if(!e)return;const a=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const t=n.getAttribute("href");if(t){const i=t.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=a+i}})}const De="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let D="5547999701743",Y=`https://wa.me/${D}`;const O=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],ze=5.7;function K(e,a){if(!e)return"—";const n=String(e).trim();let t;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?t=parseFloat(n.replace(/\./g,"").replace(",",".")):t=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(t)||t===0?n:a==="en"?"$ "+(t/ze).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+t.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let $=[],E=null,Z=[],Re=!1;f.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(Re=!0)});async function Xe(){const{data:e,error:a}=await f.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):e||[]}async function Ve(){const{data:e,error:a}=await f.from("properties").select("*").order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):($=e||[],dt(),mt(),$)}async function Ge(e){if(e.id){const{id:a,created_at:n,...t}=e,{error:i}=await f.from("properties").update(t).eq("id",a);if(i)throw i;const o=$.findIndex(l=>l.id===a);o>=0&&($[o]={...$[o],...t})}else{if(!e.reference){const t=$.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10)),i=t.length?Math.max(...t)+1:1;e.reference="IO-"+String(i).padStart(4,"0")}const{data:a,error:n}=await f.from("properties").insert(e).select();if(n)throw n;a!=null&&a[0]&&$.unshift(a[0])}}async function We(e){const{error:a}=await f.from("properties").delete().eq("id",e);if(a)throw a;$=$.filter(n=>n.id!==e)}async function Je(e,a){const{error:n}=await f.auth.signInWithPassword({email:e,password:a});return!n}function we(e,a=1200,n=.78){return new Promise((t,i)=>{const o=new Image,l=URL.createObjectURL(e);o.onload=()=>{URL.revokeObjectURL(l);const c=document.createElement("canvas");let s=o.width,m=o.height;s>a&&(m=Math.round(m*a/s),s=a),c.width=s,c.height=m;const d=c.getContext("2d");d.drawImage(o,0,0,s,m);const u=new Image;u.crossOrigin="anonymous",u.onload=()=>{const r=Math.round(s*.18),p=Math.round(u.naturalHeight*r/u.naturalWidth),v=Math.round(s*.02),b=s-r-v,w=m-p-v;d.globalAlpha=.45,d.drawImage(u,b,w,r,p),d.globalAlpha=1,c.toBlob(g=>g?t(g):i(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.onerror=()=>{c.toBlob(r=>r?t(r):i(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.src="/logo.png"},o.onerror=i,o.src=l})}async function Ye(e){const a=await we(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:t}=await f.storage.from("imoveis").upload(n,a,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(t)throw t;const{data:{publicUrl:i}}=f.storage.from("imoveis").getPublicUrl(n);return i}async function Ke(e,a){const n=Array.from(e).filter(i=>i.size>0),t=[];for(let i=0;i<n.length;i++)a&&a(i+1,n.length),t.push(await Ye(n[i]));return t}async function Q(){var u,r,p,v,b,w;const e=document.getElementById("vendas-carousel"),a=document.getElementById("properties");if(!e&&!a)return;const n=await Xe();$=n,((u=document.getElementById("selecao-carousel"))==null?void 0:u.innerHTML)===""&&Ze(n);const t=((r=document.getElementById("city-filter"))==null?void 0:r.value)||"",i=((p=document.getElementById("neighborhood-filter"))==null?void 0:p.value)||"",o=((v=document.getElementById("bedrooms-filter"))==null?void 0:v.value)||"",l=((b=document.getElementById("parking-filter"))==null?void 0:b.value)||"",c=((w=document.getElementById("construction-filter"))==null?void 0:w.value)||"",s=document.getElementById("price-slider"),m=s?parseInt(s.value,10):13e7,d=n.filter(g=>{if(t&&g.city!==t||i&&g.neighborhood!==i||o&&(o==="4+"&&Number(g.bedrooms)<4||o!=="4+"&&Number(g.bedrooms)!==Number(o))||l&&(l==="4+"&&Number(g.parking)<4||l!=="4+"&&Number(g.parking)!==Number(l))||c&&g.construction_status!==c)return!1;const h=String(g.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),x=parseInt(h,10)||0;return!(x<0||x>m)});if(e){if(!d.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=d.map(g=>{var L;const h=g.cover_image||((L=g.images)==null?void 0:L[0])||O[0],x=[g.neighborhood,g.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${h}" alt="${y(g.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${y(g.title)}</div>
            <div class="selecao-card-loc">${y(x)}</div>
            <div class="selecao-card-price">${y(K(g.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${g.id}" class="btn-det">Ver Detalhes</a>
              <a href="${Y}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!d.length){a.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}a.innerHTML=d.map(g=>{var L;const h=(L=g.images)!=null&&L.length?g.images:O,x=h.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${x}" data-idx="0" data-pid="${g.id}">
          <img src="${g.cover_image||h[0]}" alt="${y(g.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${x>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${y(g.title)}</strong>
          <div class="muted">${y(g.neighborhood||"")}, ${y(g.city||"")}</div>
          <div><strong>${y(K(g.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${g.bedrooms||"--"} | 🚗 ${g.parking||"--"} ${x>1?"| 📸 "+x:""}</div>
          <p class="muted">${y((g.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${g.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${Y}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(g=>{g.removeEventListener("click",$e),g.addEventListener("click",$e)})}function Ze(e){var i,o,l;const a=document.getElementById("selecao-carousel");if(!a)return;const n=e.slice(0,6);if(!n.length){(i=a.closest(".selecao-section"))==null||i.classList.add("hidden");return}a.innerHTML=n.map(c=>{var d;const s=c.cover_image||((d=c.images)==null?void 0:d[0])||O[0],m=[c.neighborhood,c.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${s}" alt="${y(c.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${y(c.title)}</div>
          <div class="selecao-card-loc">${y(m)}</div>
          <div class="selecao-card-price">${y(K(c.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${c.id}" class="btn-det">Ver Detalhes</a>
            <a href="${Y}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const t=a.closest(".selecao-carousel-wrap");(o=t==null?void 0:t.querySelector(".selecao-prev"))==null||o.addEventListener("click",()=>{a.scrollBy({left:-340,behavior:"smooth"})}),(l=t==null?void 0:t.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{a.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const a=document.getElementById("construction-filter");a&&(a.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),Q()};function $e(e){var c;e.stopPropagation();const a=e.currentTarget.closest(".carousel-wrap");if(!a)return;const n=parseInt(a.dataset.total,10);if(!n)return;let t=parseInt(a.dataset.idx,10)||0;const i=e.currentTarget.classList.contains("carousel-next")?1:-1;t=(t+i+n)%n,a.dataset.idx=t;const o=parseInt(a.dataset.pid,10),l=$.find(s=>s.id===o);(c=l==null?void 0:l.images)!=null&&c.length&&(a.querySelector(".carousel-img").src=l.images[t])}function Qe(){const e=document.getElementById("price-slider"),a=document.getElementById("price-label");!e||!a||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",a.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);a.textContent="Até R$ "+n.toLocaleString("pt-BR"),Q()}))}function et(){const e=document.getElementById("city-filter"),a=document.getElementById("neighborhood-filter");if(e&&a){const n=F();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(t=>`<option value="${t.name}">${y(t.name)}</option>`).join(""),e.addEventListener("change",()=>{const t=F().find(o=>o.name===e.value),i=t?Be(t.id):[];a.innerHTML='<option value="">Todos os bairros</option>'+i.map(o=>`<option value="${o.name}">${y(o.name)}</option>`).join(""),Q()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",Q)})}function ee(e){const a=document.getElementById("admin-properties");if(a){if(!e.length){a.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}a.innerHTML=e.map(n=>{var l;const t=n.cover_image||((l=n.images)==null?void 0:l[0])||O[0],i=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",o=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${t}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${y(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${y(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+y(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${y(i)}</td>
      <td class="cell-price">${y(K(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${o}</td>
      <td>
        <div class="action-btns">
          ${(E==null?void 0:E.role)==="admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(E==null?void 0:E.role)==="admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function tt(){const e=document.getElementById("f-city");if(!e)return;const a=F(),n=e.value;e.innerHTML='<option value="">Todas</option>'+a.map(t=>`<option value="${t.name}">${y(t.name)}</option>`).join(""),n&&(e.value=n)}function at(){var e,a,n,t,i,o,l,c,s,m,d,u,r,p,v;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((a=document.getElementById("f-title"))==null?void 0:a.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((t=document.getElementById("f-city"))==null?void 0:t.value)||"",neighborhood:((i=document.getElementById("f-neighborhood"))==null?void 0:i.value)||"",condominium:(((o=document.getElementById("f-condominium"))==null?void 0:o.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((c=document.getElementById("f-price-max"))==null?void 0:c.value)||1/0,areaMin:parseFloat((s=document.getElementById("f-area-min"))==null?void 0:s.value)||0,areaMax:parseFloat((m=document.getElementById("f-area-max"))==null?void 0:m.value)||1/0,construction:((d=document.getElementById("f-construction"))==null?void 0:d.value)||"",published:((u=document.getElementById("f-published"))==null?void 0:u.value)||"",bedrooms:((r=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:r.dataset.val)||"",suites:((p=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:p.dataset.val)||"",parking:((v=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:v.dataset.val)||""}}function Ie(e){const a=at();return Object.values(a).some(t=>t!==""&&t!==0&&t!==1/0)?e.filter(t=>{if(a.ref&&!(t.reference||"").toLowerCase().includes(a.ref)||a.title&&!(t.title||"").toLowerCase().includes(a.title)||a.type&&!(t.title||"").toLowerCase().includes(a.type.toLowerCase())||a.city&&t.city!==a.city||a.neighborhood&&t.neighborhood!==a.neighborhood||a.condominium&&!(t.condominium||"").toLowerCase().includes(a.condominium))return!1;const i=parseInt(String(t.price||"").replace(/[^0-9]/g,""),10)||0;if(a.priceMin>0&&i<a.priceMin||a.priceMax<1/0&&i>a.priceMax)return!1;const o=parseFloat(t.area)||0;return!(a.areaMin>0&&o<a.areaMin||a.areaMax<1/0&&o>a.areaMax||a.construction&&t.construction_status!==a.construction||a.published!==""&&String(t.published)!==a.published||a.bedrooms&&(a.bedrooms==="5+"&&Number(t.bedrooms)<5||a.bedrooms!=="5+"&&Number(t.bedrooms)!==Number(a.bedrooms))||a.suites&&(a.suites==="5+"&&Number(t.suites)<5||a.suites!=="5+"&&Number(t.suites)!==Number(a.suites))||a.parking&&(a.parking==="5+"&&Number(t.parking)<5||a.parking!=="5+"&&Number(t.parking)!==Number(a.parking)))}):e}async function se(){if(!document.getElementById("admin-properties"))return;const e=await Ve(),a=e.length,n=e.filter(l=>l.published===!0).length,t=document.getElementById("stat-total"),i=document.getElementById("stat-published"),o=document.getElementById("stat-leads");t&&(t.textContent=a),i&&(i.textContent=n),o&&(o.textContent="—"),tt(),ee($)}let T=null,H="";function ve(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ne(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function ie(e){const a=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!a||!n)){if(!e.length){a.style.display="none";return}a.style.display="",n.innerHTML=e.map(t=>`
    <div class="cover-thumb-wrap${t===H?" selected":""}" data-url="${t}">
      <img src="${t}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(t=>{t.addEventListener("click",()=>{H=t.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(i=>i.classList.remove("selected")),t.classList.add("selected")})})}}function ue(){const e=document.getElementById("property-form");if(!e)return;const a=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{n.preventDefault();const t=new FormData(e),i=t.getAll("images");let o=[];const l=i.filter(s=>s.size>0);if(l.length){a.disabled=!0,a.textContent=`Enviando 0/${l.length} foto…`;try{o=await Ke(l,(s,m)=>{a.textContent=`Enviando ${s}/${m} foto…`})}catch(s){console.error("Erro no upload:",s),a.disabled=!1,a.textContent=T?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(T){const s=$.find(m=>m.id===T);s!=null&&s.images&&(o=s.images)}o.length||(o=[...O]);const c={...T?{id:T}:{},title:t.get("title"),rua:t.get("rua")||"",numero:t.get("numero")||"",city:t.get("city"),neighborhood:t.get("neighborhood"),price:t.get("price"),bedrooms:parseInt(t.get("bedrooms"),10)||0,suites:parseInt(t.get("suites"),10)||0,area:parseFloat(t.get("area"))||0,parking:parseInt(t.get("parking"),10)||0,published:t.get("published")==="true",images:o,description:t.get("description")||"",owner_name:t.get("owner_name")||"",owner_phone:t.get("owner_phone")||"",owner_email:t.get("owner_email")||"",owner_notes:t.get("owner_notes")||"",cover_image:H||"",construction_status:t.get("construction_status")||"",condominium:t.get("condominium")||""};try{await Ge(c),T=null,a.disabled=!1,a.textContent="Salvar Imóvel",e.reset();const s=document.getElementById("adminPublished");s&&(s.value="true");const m=document.getElementById("adminNeighborhood");m&&(m.innerHTML='<option value="">Selecione a cidade primeiro</option>');const d=document.getElementById("adminConstructionStatus");d&&(d.value=""),H="",ie([]),ne(),await se()}catch(s){console.error(s),a.disabled=!1,a.textContent=T?"Salvar Alterações":"Salvar Imóvel",alert("Erro ao salvar imóvel. Verifique o console.")}}),document.addEventListener("click",async n=>{var t;if(n.target.matches(".del-btn")){const i=Number(n.target.dataset.id);if(!i||!confirm("Remover este imóvel?"))return;try{await We(i),await se()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((E==null?void 0:E.role)!=="admin")return;const i=Number(n.target.dataset.id);if(!i)return;const o=$.find(s=>s.id===i);if(!o)return;T=i,a.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=o.title||"",e.querySelector('[name="rua"]').value=o.rua||"",e.querySelector('[name="numero"]').value=o.numero||"",e.querySelector('[name="city"]').value=o.city||"",e.querySelector('[name="price"]').value=o.price||"",e.querySelector('[name="bedrooms"]').value=o.bedrooms||"",e.querySelector('[name="suites"]').value=o.suites||"",e.querySelector('[name="area"]').value=o.area||"",e.querySelector('[name="parking"]').value=o.parking||"",e.querySelector('[name="description"]').value=o.description||"",e.querySelector('[name="construction_status"]').value=o.construction_status||"",e.querySelector('[name="owner_name"]').value=o.owner_name||"",e.querySelector('[name="owner_phone"]').value=o.owner_phone||"",e.querySelector('[name="owner_email"]').value=o.owner_email||"",e.querySelector('[name="owner_notes"]').value=o.owner_notes||"",e.querySelector('[name="condominium"]').value=o.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=o.published===!0?"true":"false");const c=document.getElementById("adminCitySelect");c&&(c.value=o.city||"",c.dispatchEvent(new Event("change")),setTimeout(()=>{const s=document.getElementById("adminNeighborhood");s&&(s.value=o.neighborhood||"")},50)),H=o.cover_image||((t=o.images)==null?void 0:t[0])||"",ie(o.images||[]),ve("Editar Imóvel")}})}function y(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let j=[],N=0;function nt(e){var d,u;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const a=document.getElementById("view-status-badge");e.published?(a.textContent="● Publicado",a.className="badge badge-green"):(a.textContent="○ Rascunho",a.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const t=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=t,document.getElementById("view-directions-link").href=t;const i=((d=e.images)==null?void 0:d[0])||O[0];document.getElementById("view-thumb-preview").src=i,j=(u=e.images)!=null&&u.length?e.images:O,N=0,le(),document.getElementById("view-price").textContent=K(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const o=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),o&&(o.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(r=>r.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(r=>r.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const c="https://omarcorretor.com.br/property.html?id="+e.id,s=document.getElementById("share-link-input");s&&(s.value=c);const m=document.getElementById("share-panel");m&&(m.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ae(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function le(){const e=document.getElementById("view-main-img"),a=document.getElementById("view-counter"),n=document.getElementById("view-prev"),t=document.getElementById("view-next"),i=document.getElementById("view-thumbs");e.src=j[N],e.alt=`Foto ${N+1}`;const o=j.length>1;n.style.display=o?"flex":"none",t.style.display=o?"flex":"none",a.textContent=o?`${N+1} / ${j.length}`:"",i.innerHTML=o?j.map((l,c)=>`<img src="${l}" class="view-thumb${c===N?" active":""}" data-i="${c}" alt="Foto ${c+1}">`).join(""):"",i.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{N=+l.dataset.i,le()})})}async function ke(e){const{data:a}=await f.from("profiles").select("*").eq("id",e).maybeSingle();return a}function pe(e){var o;const a=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-name"),t=document.getElementById("topnav-role");if(!n)return;const i=(e==null?void 0:e.name)||"Sem nome";n.textContent=i,t&&(t.textContent=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor"),a&&(a.textContent=((o=i[0])==null?void 0:o.toUpperCase())||"?")}function ge(e){var n,t;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(i=>i.classList.remove("active"));const a=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);a&&a.classList.add("active"),document.querySelectorAll(".admin-section").forEach(i=>i.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(t=document.getElementById("topnav-links"))==null||t.classList.remove("open"),e==="contatos"&&st()}function _e(e){const a=document.getElementById("admin-root");if(a&&(a.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(t=>{t.style.display=""}),Object.entries({empresa:vt,visual:pt,"site-config":gt,"crm-config":ft,integracoes:yt,midia:bt}).forEach(([t,i])=>{const o=document.querySelector(`.topnav-dropdown-item[data-section="${t}"]`)||document.querySelector(`.nav-item[data-section="${t}"]`);o&&o.addEventListener("click",()=>i(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(t=>{t.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>ht(),{once:!0}),window.lucide&&lucide.createIcons()}}function ot(){const e=document.getElementById("topnav-user");e&&e.addEventListener("click",()=>ge("settings"))}let P=[],q=1;const G=10;let Ce=!1;async function st(){var a,n,t,i,o,l,c,s,m;document.getElementById("section-contatos")&&(Ce||(Ce=!0,await je(),(a=document.getElementById("btn-contato-search"))==null||a.addEventListener("click",()=>{q=1,V()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",d=>{d.key==="Enter"&&(q=1,V())}),(t=document.getElementById("btn-novo-contato"))==null||t.addEventListener("click",()=>Pe()),(i=document.getElementById("btn-import-contato"))==null||i.addEventListener("click",rt),(o=document.getElementById("import-modal-close"))==null||o.addEventListener("click",fe),(l=document.getElementById("import-modal-cancel"))==null||l.addEventListener("click",fe),(c=document.getElementById("download-template"))==null||c.addEventListener("click",d=>{d.preventDefault();const u=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,r=new Blob([u],{type:"text/csv"}),p=document.createElement("a");p.href=URL.createObjectURL(r),p.download="modelo_contatos.csv",p.click()}),(s=document.getElementById("import-csv-file"))==null||s.addEventListener("change",it),(m=document.getElementById("import-modal-confirm"))==null||m.addEventListener("click",lt)))}async function je(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let a=f.from("leads").select("*").order("created_at",{ascending:!1});(E==null?void 0:E.role)==="corretor"?a=a.eq("assigned_to",E.id):E!=null&&E.tenant_id&&(a=a.eq("tenant_id",E.tenant_id));const{data:t}=await a;P=t||[],V()}function V(){var c,s,m;const e=(((c=document.getElementById("contato-search"))==null?void 0:c.value)||"").toLowerCase(),a=e?P.filter(d=>(d.name||"").toLowerCase().includes(e)||(d.email||"").toLowerCase().includes(e)||(d.phone||"").toLowerCase().includes(e)):P,n=a.length,t=Math.max(1,Math.ceil(n/G));q>t&&(q=t);const i=a.slice((q-1)*G,q*G),o=document.getElementById("contatos-tbody");if(!o)return;i.length?o.innerHTML=i.map(d=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${d.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${d.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${y(d.name||"—")}</a>
        </td>
        <td>${y(d.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${d.email?y(d.email):"—"}</td>
        <td style="font-size:13px;">${d.phone?y(d.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${y(d.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${d.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):o.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const l=document.getElementById("contatos-pagination");if(l){const d=n===0?0:(q-1)*G+1,u=Math.min(q*G,n);l.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${d}–${u}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${q<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${q} / ${t}</span>
          <button class="btn-cancel" id="pag-next" ${q>=t?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(s=l.querySelector("#pag-prev"))==null||s.addEventListener("click",()=>{q--,V()}),(m=l.querySelector("#pag-next"))==null||m.addEventListener("click",()=>{q++,V()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(d=>{d.addEventListener("click",u=>{u.preventDefault();const r=d.dataset.id,p=P.find(v=>String(v.id)===String(r));p&&Pe(p)})})}function Pe(e=null){var o,l,c;const a=document.getElementById("contato-modal-root");a&&a.remove();const n=!!e,t=document.createElement("div");t.id="contato-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t);const i=()=>t.remove();(o=document.getElementById("cm-close"))==null||o.addEventListener("click",i),(l=document.getElementById("cm-cancel"))==null||l.addEventListener("click",i),t.addEventListener("click",s=>{s.target===t&&i()}),(c=document.getElementById("cm-save"))==null||c.addEventListener("click",async()=>{var p,v,b,w,g,h,x;const s=document.getElementById("contato-form");if(!s.checkValidity()){s.reportValidity();return}const m=new FormData(s),d=document.getElementById("cm-save");d.disabled=!0,d.textContent="Salvando…";const u={name:(p=m.get("name"))==null?void 0:p.trim(),company:((v=m.get("company"))==null?void 0:v.trim())||null,email:((b=m.get("email"))==null?void 0:b.trim())||null,phone:((w=m.get("phone"))==null?void 0:w.trim())||null,job_title:((g=m.get("job_title"))==null?void 0:g.trim())||null,city_interest:((h=m.get("city_interest"))==null?void 0:h.trim())||null,notes:((x=m.get("notes"))==null?void 0:x.trim())||null,stage:(e==null?void 0:e.stage)||"novo",assigned_to:(E==null?void 0:E.id)||null,tenant_id:(E==null?void 0:E.tenant_id)||null,source:"manual"};let r;if(n){if({error:r}=await f.from("leads").update(u).eq("id",e.id),!r){const L=P.findIndex(_=>String(_.id)===String(e.id));L>=0&&(P[L]={...P[L],...u})}}else{const{data:L,error:_}=await f.from("leads").insert(u).select();r=_,!r&&(L!=null&&L[0])&&P.unshift(L[0])}if(d.disabled=!1,d.textContent=n?"Salvar":"Criar Contato",r){alert("Erro: "+r.message);return}i(),V()})}let X=[];function it(e){const a=e.target.files[0];if(!a)return;const n=new FileReader;n.onload=t=>{X=t.target.result.split(`
`).filter(c=>c.trim()).slice(1).map(c=>{const[s,m,d,u,r]=c.split(",").map(p=>p.trim().replace(/^"|"$/g,""));return{name:s,email:m,phone:d,company:u,job_title:r}}).filter(c=>c.name);const o=document.getElementById("import-preview");o&&(o.textContent=`${X.length} contato(s) encontrados para importar.`);const l=document.getElementById("import-modal-confirm");l&&(l.disabled=X.length===0)},n.readAsText(a)}async function lt(){if(!X.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const a=X.map(t=>({...t,stage:"novo",source:"importado",assigned_to:(E==null?void 0:E.id)||null,tenant_id:(E==null?void 0:E.tenant_id)||null})),{error:n}=await f.from("leads").insert(a);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}fe(),await je(),alert(`${a.length} contato(s) importados com sucesso!`)}function rt(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),X=[];const a=document.getElementById("import-preview");a&&(a.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const t=document.getElementById("import-csv-file");t&&(t.value="")}function fe(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const ct="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function ye(e){return(await fetch(ct,{method:"POST",headers:{Authorization:`Bearer ${De}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function qe(e){var s,m,d,u;const a=document.getElementById("settings-name"),n=document.getElementById("settings-email"),t=document.getElementById("settings-avatar-preview"),i=document.getElementById("settings-avatar-initial"),o=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!a)return;if(a.value=(e==null?void 0:e.name)||"",n){const{data:{user:r}}=await f.auth.getUser();n.value=(r==null?void 0:r.email)||""}const c=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(i&&(i.textContent=c),e!=null&&e.avatar_url&&t&&(t.src=e.avatar_url,t.style.display="",i&&(i.style.display="none")),o==null||o.addEventListener("change",r=>{const p=r.target.files[0];if(!p)return;const v=URL.createObjectURL(p);t&&(t.src=v,t.style.display=""),i&&(i.style.display="none")}),(s=document.getElementById("btn-change-password"))==null||s.addEventListener("click",async()=>{var g,h;const r=((g=document.getElementById("change-password-new"))==null?void 0:g.value)||"",p=((h=document.getElementById("change-password-confirm"))==null?void 0:h.value)||"",v=document.getElementById("change-password-msg"),b=document.getElementById("btn-change-password");if(v&&(v.style.display="none"),r.length<6){v&&(v.textContent="Mínimo 6 caracteres.",v.style.display="");return}if(r!==p){v&&(v.textContent="As senhas não coincidem.",v.style.display="");return}b&&(b.disabled=!0,b.textContent="Salvando…");const{error:w}=await f.auth.updateUser({password:r});b&&(b.disabled=!1,b.textContent="Salvar Nova Senha"),w?v&&(v.textContent="Erro: "+w.message,v.style.display=""):(v&&(v.style.color="#16a34a",v.textContent="Senha alterada com sucesso!",v.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var h;const r=a.value.trim();let p=(E==null?void 0:E.avatar_url)||"";const v=o==null?void 0:o.files[0],b=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",v)try{const x=await we(v,400,.85),L=`avatars/${E.id}-${Date.now()}.jpg`,{error:_}=await f.storage.from("imoveis").upload(L,x,{contentType:"image/jpeg",upsert:!0});if(!_){const{data:{publicUrl:I}}=f.storage.from("imoveis").getPublicUrl(L);p=I}}catch(x){console.error("Avatar upload:",x)}const{error:w}=await f.from("profiles").update({name:r,avatar_url:p}).eq("id",E.id);if(l.disabled=!1,l.textContent=b,w){alert("Erro ao salvar perfil.");return}E={...E,name:r,avatar_url:p},pe(E);const g=document.getElementById("settings-avatar-initial");g&&(g.textContent=((h=r[0])==null?void 0:h.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"){const r=document.getElementById("settings-corretores-section");r&&(r.style.display=""),await re(),(m=document.getElementById("btn-invite-corretor"))==null||m.addEventListener("click",async()=>{var g,h;const v=(g=document.getElementById("invite-email"))==null?void 0:g.value.trim(),b=(h=document.getElementById("invite-password"))==null?void 0:h.value.trim(),w=document.getElementById("btn-invite-corretor");if(!v){alert("Informe o e-mail do corretor.");return}if(!b||b.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}w&&(w.disabled=!0,w.textContent="Criando…");try{const x=await ye({email:v,password:b});if(x.success){alert("Acesso criado! O corretor receberá um e-mail com o login e a senha que você definiu.");const L=document.getElementById("invite-email"),_=document.getElementById("invite-password");L&&(L.value=""),_&&(_.value=""),await re()}else alert("Erro: "+(x.error||"Falha desconhecida"))}catch(x){alert("Erro ao criar acesso: "+x.message)}finally{w&&(w.disabled=!1,w.textContent="+ Criar Acesso")}});const p=document.getElementById("settings-locations-section");p&&(p.style.display=""),await W(),(d=document.getElementById("loc-add-city-btn"))==null||d.addEventListener("click",async()=>{const v=document.getElementById("loc-new-city"),b=v==null?void 0:v.value.trim();if(!b)return;const{error:w}=await f.from("locations").insert({type:"cidade",name:b});if(w){alert("Erro ao adicionar cidade.");return}v&&(v.value=""),await W(),xe()}),(u=document.getElementById("loc-add-neighborhood-btn"))==null||u.addEventListener("click",async()=>{var h;const v=parseInt((h=document.getElementById("loc-new-neighborhood-city"))==null?void 0:h.value,10),b=document.getElementById("loc-new-neighborhood"),w=b==null?void 0:b.value.trim();if(!v||!w){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:g}=await f.from("locations").insert({type:"bairro",name:w,parent_id:v});if(g){alert("Erro ao adicionar bairro.");return}b&&(b.value=""),await W()})}}async function re(){const e=document.getElementById("corretores-list");if(!e)return;const{data:a,error:n}=await f.from("profiles").select("*").order("created_at");if(n||!a){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=a.map(t=>{const i=(t.name||"?")[0].toUpperCase(),o=t.avatar_url?`<img src="${t.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${y(i)}</div>`,l=t.id===(E==null?void 0:E.id),c=t.active!==!1,s=c?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',m=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${t.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${t.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${t.role==="admin"?" selected":""}>Admin</option>
         </select>`,d=l?"":c?`<button class="corretor-toggle-btn" data-uid="${t.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${t.id}" data-active="false">Liberar acesso</button>`,u=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${t.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${o}
        <div>
          <div class="corretor-name">${y(t.name||"—")}</div>
          <div class="corretor-role-badge">${t.role==="super_admin"?"⚡ Super Admin":t.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${s}
        ${m}
        ${d}
        ${u}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(t=>{t.addEventListener("change",async()=>{await f.from("profiles").update({role:t.value}).eq("id",t.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(t=>{t.addEventListener("click",async()=>{const i=t.dataset.uid,o=t.dataset.active==="true";t.disabled=!0,t.textContent="Aguarde…";try{const l=await ye({action:"toggle",userId:i,active:!o});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await re()})}),e.querySelectorAll(".corretor-del-btn").forEach(t=>{t.addEventListener("click",async()=>{var l,c;const i=t.dataset.uid,o=((c=(l=t.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:c.textContent)||"este corretor";if(confirm(`Excluir "${o}"? Esta ação não pode ser desfeita.`)){t.disabled=!0;try{const s=await ye({action:"delete",userId:i});s.success||alert("Erro ao excluir: "+(s.error||"Falha desconhecida"))}catch(s){alert("Erro: "+s.message)}await re()}})})}async function Ue(){const{data:e,error:a}=await f.from("locations").select("*").order("name");return a?(console.error("loadLocations:",a),[]):(Z=e||[],Z)}function F(){return Z.filter(e=>e.type==="cidade")}function Be(e){return Z.filter(a=>a.type==="bairro"&&a.parent_id===e)}function xe(){const e=document.getElementById("adminCitySelect");if(!e)return;const a=e.value,n=F();e.innerHTML='<option value="">Selecione</option>'+n.map(t=>`<option value="${t.name}">${y(t.name)}</option>`).join(""),a&&(e.value=a)}async function W(){await Ue();const e=F(),a=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),t=document.getElementById("loc-new-neighborhood-city");if(!a||!n)return;a.innerHTML=e.length?e.map(o=>`
        <div class="loc-item">
          <span class="loc-item-name">${y(o.name)}</span>
          <button class="loc-del-btn" data-id="${o.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const i=Z.filter(o=>o.type==="bairro");n.innerHTML=i.length?i.map(o=>{const l=e.find(c=>c.id===o.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${y(o.name)}</div>
              ${l?`<div class="loc-item-sub">${y(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${o.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',t&&(t.innerHTML='<option value="">Cidade…</option>'+e.map(o=>`<option value="${o.id}">${y(o.name)}</option>`).join("")),a.querySelectorAll(".loc-del-btn").forEach(o=>{o.addEventListener("click",async()=>{const l=o.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:c}=await f.from("locations").delete().eq("id",o.dataset.id);if(c){alert("Erro ao excluir.");return}await W(),xe()})}),n.querySelectorAll(".loc-del-btn").forEach(o=>{o.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await f.from("locations").delete().eq("id",o.dataset.id);if(l){alert("Erro ao excluir.");return}await W()})})}function Me(){var n,t,i,o,l,c,s,m,d,u,r,p,v,b,w,g,h,x,L,_;document.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{const B=I.closest(".filter-btns"),S=I.classList.contains("active");B.querySelectorAll(".filter-btn").forEach(k=>k.classList.remove("active")),S||I.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var C;const I=(C=document.getElementById("f-city"))==null?void 0:C.value,B=F().find(A=>A.name===I),S=B?Be(B.id):[],k=document.getElementById("f-neighborhood");k&&(k.innerHTML='<option value="">Todos</option>'+S.map(A=>`<option value="${A.name}">${y(A.name)}</option>`).join(""))}),(t=document.getElementById("f-search-btn"))==null||t.addEventListener("click",()=>{ee(Ie($))}),(i=document.getElementById("f-clear-btn"))==null||i.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach(k=>{const C=document.getElementById(k);C&&(C.value="")}),["f-type","f-city","f-construction","f-published"].forEach(k=>{const C=document.getElementById(k);C&&(C.value="")});const S=document.getElementById("f-neighborhood");S&&(S.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach(k=>k.classList.remove("active")),ee($)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{ge(I.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{ge(I.dataset.section)})});const e=document.getElementById("topnav-links"),a=document.getElementById("topnav-hamburger");a==null||a.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),(o=document.getElementById("modal-close"))==null||o.addEventListener("click",ne),(l=document.getElementById("modal-cancel"))==null||l.addEventListener("click",ne),(c=document.getElementById("property-modal"))==null||c.addEventListener("click",I=>{I.target.id==="property-modal"&&ne()}),(s=document.getElementById("btn-new-property"))==null||s.addEventListener("click",()=>{T=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",H="",ie([]),ve("Novo Imóvel")}),(m=document.getElementById("logout-btn"))==null||m.addEventListener("click",async()=>{await f.auth.signOut(),location.reload()}),(d=document.getElementById("view-prev"))==null||d.addEventListener("click",()=>{N=(N-1+j.length)%j.length,le()}),(u=document.getElementById("view-next"))==null||u.addEventListener("click",()=>{N=(N+1)%j.length,le()}),(r=document.getElementById("view-modal-close"))==null||r.addEventListener("click",ae),(p=document.getElementById("view-modal-close2"))==null||p.addEventListener("click",ae),(v=document.getElementById("view-modal"))==null||v.addEventListener("click",I=>{I.target.id==="view-modal"&&ae()}),(b=document.getElementById("view-modal-share"))==null||b.addEventListener("click",()=>{const I=document.getElementById("share-panel");if(!I)return;const B=I.style.display!=="none";I.style.display=B?"none":"block"}),(w=document.getElementById("share-whatsapp"))==null||w.addEventListener("click",()=>{var k,C;const I=(k=document.getElementById("share-link-input"))==null?void 0:k.value;if(!I)return;const B=((C=document.getElementById("view-modal-title"))==null?void 0:C.textContent)||"Imóvel",S=encodeURIComponent("Olha esse imóvel que encontrei: "+B+`
`+I);window.open("https://wa.me/?text="+S,"_blank")}),(g=document.getElementById("share-instagram"))==null||g.addEventListener("click",()=>{var B,S;const I=(B=document.getElementById("share-link-input"))==null?void 0:B.value;I&&((S=navigator.clipboard)==null||S.writeText(I),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(h=document.getElementById("share-email"))==null||h.addEventListener("click",()=>{var C,A;const I=(C=document.getElementById("share-link-input"))==null?void 0:C.value;if(!I)return;const B=((A=document.getElementById("view-modal-title"))==null?void 0:A.textContent)||"Imóvel",S=encodeURIComponent("Imóvel: "+B),k=encodeURIComponent(`Olá! Segue o link do imóvel:

`+I);window.open("mailto:?subject="+S+"&body="+k,"_blank")}),(x=document.getElementById("share-copy"))==null||x.addEventListener("click",()=>{var B;const I=document.getElementById("share-link-input");I&&((B=navigator.clipboard)==null||B.writeText(I.value).then(()=>{const S=document.getElementById("share-copy"),k=S.textContent;S.textContent="✅ Copiado!",setTimeout(()=>{S.textContent=k},2e3)}))}),(L=document.getElementById("view-modal-edit"))==null||L.addEventListener("click",()=>{var Le;if((E==null?void 0:E.role)!=="admin")return;const I=document.getElementById("view-modal-title").textContent,B=$.find(te=>te.title===I);if(!B)return;ae(),T=B.id;const S=document.getElementById("property-form"),k=document.getElementById("form-submit-btn");k.textContent="Salvar Alterações",S.querySelector('[name="title"]').value=B.title||"",S.querySelector('[name="rua"]').value=B.rua||"",S.querySelector('[name="numero"]').value=B.numero||"",S.querySelector('[name="city"]').value=B.city||"",S.querySelector('[name="price"]').value=B.price||"",S.querySelector('[name="bedrooms"]').value=B.bedrooms||"",S.querySelector('[name="suites"]').value=B.suites||"",S.querySelector('[name="parking"]').value=B.parking||"",S.querySelector('[name="description"]').value=B.description||"",S.querySelector('[name="construction_status"]').value=B.construction_status||"",S.querySelector('[name="owner_name"]').value=B.owner_name||"",S.querySelector('[name="owner_phone"]').value=B.owner_phone||"",S.querySelector('[name="owner_email"]').value=B.owner_email||"",S.querySelector('[name="owner_notes"]').value=B.owner_notes||"",S.querySelector('[name="condominium"]').value=B.condominium||"";const C=document.getElementById("adminPublished");C&&(C.value=B.published===!0?"true":"false");const A=document.getElementById("adminCitySelect");A&&(A.value=B.city||"",A.dispatchEvent(new Event("change")),setTimeout(()=>{const te=document.getElementById("adminNeighborhood");te&&(te.value=B.neighborhood||"")},50)),H=B.cover_image||((Le=B.images)==null?void 0:Le[0])||"",ie(B.images||[]),ve("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(I=>{I.addEventListener("click",()=>{var B;document.querySelectorAll(".tab-btn").forEach(S=>S.classList.remove("active")),I.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(S=>S.classList.add("hidden")),(B=document.getElementById(`tab-${I.dataset.tab}`))==null||B.classList.remove("hidden")})}),(_=document.getElementById("admin-properties"))==null||_.addEventListener("click",I=>{if(I.target.closest(".action-btns"))return;const B=I.target.closest("tr");if(!B)return;const S=Number(B.dataset.id);if(!S)return;const k=$.find(C=>C.id===S);k&&nt(k)})}document.addEventListener("DOMContentLoaded",async()=>{var o,l,c;await Promise.all([He(),Ue()]),D=U("company.whatsapp",D),Y=`https://wa.me/${D}`,Ee(),Qe(),et();const e=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");e&&a&&(xe(),e.addEventListener("change",()=>{const s=F().find(d=>d.name===e.value),m=s?Be(s.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+m.map(d=>`<option value="${d.name}">${y(d.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),t=document.getElementById("admin-root");if(n){const s=new URLSearchParams(window.location.hash.replace("#","")),m=new URLSearchParams(window.location.search),d=s.get("type")||m.get("type")||"",u=Re||d==="recovery"||d==="invite"||window.location.hash.includes("access_token")||m.has("code"),r=document.getElementById("password-reset-overlay");if(u){n.style.display="none",t&&t.classList.add("hidden"),r&&(r.style.display="flex"),(o=document.getElementById("password-reset-form"))==null||o.addEventListener("submit",async v=>{var L,_;v.preventDefault();const b=((L=document.getElementById("new-password"))==null?void 0:L.value)||"",w=((_=document.getElementById("confirm-password"))==null?void 0:_.value)||"",g=document.getElementById("password-reset-msg"),h=v.target.querySelector('button[type="submit"]');if(g&&(g.style.display="none"),b!==w){g&&(g.textContent="As senhas não coincidem.",g.style.display="");return}h&&(h.disabled=!0,h.textContent="Salvando…");const{error:x}=await f.auth.updateUser({password:b});if(x){g&&(g.textContent="Erro: "+x.message,g.style.display=""),h&&(h.disabled=!1,h.textContent="Definir Senha");return}window.location.href=window.location.pathname}),m.has("code")&&await f.auth.exchangeCodeForSession(m.get("code")??"");return}const{data:{session:p}}=await f.auth.getSession();if(p){if(n.classList.add("hidden"),t&&t.classList.remove("hidden"),await se(),ue(),Me(),ot(),window.lucide&&lucide.createIcons(),E=await ke(p.user.id),!E){await f.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden");return}if(E.active===!1){await f.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(E.needs_password_reset){n.style.display="none",t&&t.classList.add("hidden");const v=document.getElementById("password-reset-overlay");v&&(v.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async b=>{var _,I;b.preventDefault();const w=((_=document.getElementById("new-password"))==null?void 0:_.value)||"",g=((I=document.getElementById("confirm-password"))==null?void 0:I.value)||"",h=document.getElementById("password-reset-msg"),x=b.target.querySelector('button[type="submit"]');if(h&&(h.style.display="none"),w!==g){h&&(h.textContent="As senhas não coincidem.",h.style.display="");return}if(w.length<6){h&&(h.textContent="Mínimo 6 caracteres.",h.style.display="");return}x&&(x.disabled=!0,x.textContent="Salvando…");const{error:L}=await f.auth.updateUser({password:w});if(L){h&&(h.textContent="Erro: "+L.message,h.style.display=""),x&&(x.disabled=!1,x.textContent="Definir Senha");return}await f.from("profiles").update({needs_password_reset:!1}).eq("id",E.id),window.location.href=window.location.pathname});return}pe(E),_e(E.role),await qe(E),window.lucide&&lucide.createIcons()}else{t&&t.classList.add("hidden"),n.classList.remove("hidden");const v=document.getElementById("login-form");v&&((c=document.getElementById("forgot-password-btn"))==null||c.addEventListener("click",async()=>{var g,h;const b=(h=(g=v.querySelector('input[name="email"]'))==null?void 0:g.value)==null?void 0:h.trim();if(!b){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:w}=await f.auth.resetPasswordForEmail(b,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(w?"Erro: "+w.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),v.addEventListener("submit",async b=>{b.preventDefault();const w=new FormData(v),g=w.get("email"),h=w.get("password");if(await Je(g,h)){n.classList.add("hidden"),t&&t.classList.remove("hidden"),await se(),ue(),Me(),window.lucide&&lucide.createIcons();const{data:{session:L}}=await f.auth.getSession();if(E=L?await ke(L.user.id):null,!E){await f.auth.signOut();return}if(E.active===!1){await f.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}pe(E),_e(E.role),await qe(E),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else ue();await Q();const i=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();Oe(i),Fe(D)});async function dt(){const e=$.filter(i=>!i.reference);if(!e.length)return;const a=$.map(i=>i.reference||"").filter(i=>/^IO-\d+$/.test(i)).map(i=>parseInt(i.replace("IO-",""),10));let n=a.length?Math.max(...a)+1:1;const t=[...e].sort((i,o)=>i.id-o.id);for(const i of t){const o="IO-"+String(n).padStart(4,"0"),{error:l}=await f.from("properties").update({reference:o}).eq("id",i.id);if(!l){const c=$.findIndex(s=>s.id===i.id);c>=0&&($[c].reference=o),n++}}ee(Ie($))}async function mt(){const e=$.filter(a=>{var n;return(n=a.images)==null?void 0:n.some(t=>!t.includes("/wm-"))});if(e.length){for(const a of e){if(!a.images.some(o=>!o.includes("/wm-")))continue;const t=[];let i=!1;for(const o of a.images)if(o.includes("/wm-"))t.push(o);else try{const l=await ut(o);t.push(l),i=!0}catch{t.push(o)}if(i){await f.from("properties").update({images:t}).eq("id",a.id);const o=$.findIndex(l=>l.id===a.id);o>=0&&($[o].images=t)}}ee(Ie($))}}async function ut(e){try{const a=await fetch(e);if(!a.ok)return e;const n=await a.blob(),t=URL.createObjectURL(n),i=await fetch("/logo.png"),o=i.ok?await i.blob():null,l=o?URL.createObjectURL(o):null;return new Promise(c=>{const s=new Image;s.onload=()=>{URL.revokeObjectURL(t);const m=document.createElement("canvas"),d=1200;let u=s.width,r=s.height;u>d&&(r=Math.round(r*d/u),u=d),m.width=u,m.height=r;const p=m.getContext("2d");p.drawImage(s,0,0,u,r);const v=b=>{if(b){const w=Math.round(u*.18),g=Math.round(b.naturalHeight*w/b.naturalWidth),h=Math.round(u*.02);p.globalAlpha=.45,p.drawImage(b,u-w-h,r-g-h,w,g),p.globalAlpha=1}m.toBlob(async w=>{try{const g=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:h}=await f.storage.from("imoveis").upload(g,w,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(h){console.error("Upload watermark error:",h),c(e);return}const{data:{publicUrl:x}}=f.storage.from("imoveis").getPublicUrl(g);c(x)}catch(g){console.error("Watermark upload exception:",g),c(e)}},"image/jpeg",.82)};if(l){const b=new Image;b.onload=()=>{URL.revokeObjectURL(l),v(b)},b.onerror=()=>{URL.revokeObjectURL(l),v(null)},b.src=l}else v(null)},s.onerror=()=>{URL.revokeObjectURL(t),c(e)},s.src=t})}catch(a){return console.error("applyWatermarkToUrl error:",a),e}}function M(e,a){e&&(e.textContent=a?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(a?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function Se(e,a="assets"){const n=await we(e,1200,.85),t=`${a}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:i}=await f.storage.from("imoveis").upload(t,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(i)throw i;const{data:{publicUrl:o}}=f.storage.from("imoveis").getPublicUrl(t);return o}async function vt(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await f.from("settings").select("key,value"),n={};a==null||a.forEach(i=>{n[i.key]=i.value||""});const t=i=>y(String(n[i]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",i=>{document.getElementById("co-logo-preview").src=i.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async i=>{const o=i.target.files[0];if(o)try{const l=await Se(o,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const i=document.getElementById("co-save-identity");i.disabled=!0,i.textContent="Salvando…";const o=await z([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);o&&Ee(),i.disabled=!1,i.textContent="Salvar Identidade",M(document.getElementById("co-identity-msg"),o)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const i=document.getElementById("co-save-contacts");i.disabled=!0,i.textContent="Salvando…";const o=document.getElementById("co-whatsapp").value.trim(),l=await z([["company.whatsapp",o],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&o&&(D=o,Y=`https://wa.me/${o}`),i.disabled=!1,i.textContent="Salvar Contatos",M(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const i=document.getElementById("co-save-social");i.disabled=!0,i.textContent="Salvando…";const o=await z([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);i.disabled=!1,i.textContent="Salvar Redes Sociais",M(document.getElementById("co-social-msg"),o)})}async function pt(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await f.from("settings").select("key,value"),n={};a==null||a.forEach(d=>{n[d.key]=d.value||""});const t=n["visual.accent_color"]||"#b8962e",i=n["visual.primary_bg"]||"#0f1c2e",o=n["visual.secondary_bg"]||"#1a2f4a",l=n["visual.hero_bg_url"]||"",c=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-price-max" type="number" class="form-control" value="${c}" min="100000" step="1000000" style="max-width:200px">
          <span style="font-size:13px;color:#9ca3af">R$</span>
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-images">Salvar Imagens</button>
        <span id="visual-images-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `;function s(d,u,r){const p=document.getElementById(d),v=document.getElementById(u);p==null||p.addEventListener("input",b=>{v.value=b.target.value,r()}),v==null||v.addEventListener("input",b=>{/^#[0-9a-fA-F]{6}$/.test(b.target.value)&&(p.value=b.target.value,r())})}function m(){var u,r,p,v;const d=((u=document.getElementById("col-accent-hex"))==null?void 0:u.value)||"#b8962e";(r=document.getElementById("vp-bar"))==null||r.style.setProperty("background",d),(p=document.getElementById("vp-dot"))==null||p.style.setProperty("background",d),(v=document.getElementById("vp-btn"))==null||v.style.setProperty("background",d),document.documentElement.style.setProperty("--accent",d)}s("col-accent","col-accent-hex",m),s("col-primary","col-primary-hex",()=>{}),s("col-secondary","col-secondary-hex",()=>{}),m(),document.getElementById("vis-hero-file").addEventListener("change",async d=>{const u=d.target.files[0];if(u)try{const r=await Se(u,"hero");document.getElementById("vis-hero-url").value=r;const p=document.getElementById("vis-hero-preview");p.innerHTML=`<img src="${r}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,p.style.display=""}catch(r){alert("Erro no upload: "+r.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const d=document.getElementById("visual-save-colors");d.disabled=!0,d.textContent="Salvando…";const u=await z([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);u&&Ee(),d.disabled=!1,d.textContent="Salvar Cores",M(document.getElementById("visual-colors-msg"),u)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",m())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const d=document.getElementById("visual-save-images");d.disabled=!0,d.textContent="Salvando…";const u=await z([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);d.disabled=!1,d.textContent="Salvar Imagens",M(document.getElementById("visual-images-msg"),u)})}async function gt(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await f.from("site_content").select("*"),n={};a==null||a.forEach(s=>{n[s.key]=s});const t=(s,m)=>{var d;return y(((d=n[s])==null?void 0:d[`value_${m}`])||"")},i=["pt","en","es"],o={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=s=>i.map(m=>`<button class="content-tab${m===s?" active":""}" data-lang="${m}">${o[m]}</button>`).join(""),c=s=>`
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
        ${i.map(s=>`<div class="content-panel${s==="pt"?" active":""}" data-panel="${s}">${c(s)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",s=>{var d;const m=s.target.closest(".content-tab");m&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(u=>u.classList.remove("active")),m.classList.add("active"),(d=document.querySelector(`#sc-panels [data-panel="${m.dataset.lang}"]`))==null||d.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const s=document.getElementById("sc-save-btn");s.disabled=!0,s.textContent="Salvando…";const m={};document.querySelectorAll(".sc-field").forEach(u=>{const r=u.dataset.key,p=u.dataset.lang;m[r]||(m[r]={}),m[r][p]=u.value});let d=!0;for(const[u,r]of Object.entries(m))await de(u,{pt:r.pt,en:r.en,es:r.es})||(d=!1);s.disabled=!1,s.textContent="Salvar Conteúdo",M(document.getElementById("sc-save-msg"),d)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const s=document.getElementById("seo-save-btn");s.disabled=!0,s.textContent="Salvando…";const m=document.getElementById("seo-title").value.trim(),d=document.getElementById("seo-desc").value.trim(),u=await de("seo.title_pt",{pt:m,en:m,es:m})&&await de("seo.description_pt",{pt:d,en:d,es:d});s.disabled=!1,s.textContent="Salvar SEO",M(document.getElementById("seo-save-msg"),u)})}async function ft(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await R())}async function R(){const e=document.getElementById("crm-body");if(!e)return;const[{data:a},{data:n},{data:t},{data:i}]=await Promise.all([f.from("crm_pipelines").select("*").order("sort_order"),f.from("crm_stages").select("*").order("sort_order"),f.from("crm_tags").select("*").order("name"),f.from("crm_lead_statuses").select("*").order("sort_order")]),o=a||[],l=o.find(r=>r.is_default)||o[0],c=o.map(r=>`<option value="${r.id}"${r.id===(l==null?void 0:l.id)?" selected":""}>${y(r.name)}</option>`).join(""),m=(n||[]).filter(r=>r.pipeline_id===(l==null?void 0:l.id)).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${y(r.name)}</span>
      <input type="color" value="${r.color}" data-sid="${r.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${r.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',d=(t||[]).map(r=>`<span class="tag-chip" style="background:${r.color}" data-id="${r.id}">
      ${y(r.name)}
      <button class="tag-chip-del" data-id="${r.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',u=(i||[]).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${y(r.name)}</span>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const r=document.getElementById("crm-new-stage").value.trim(),p=document.getElementById("crm-new-stage-color").value,v=parseInt(document.getElementById("crm-pipe-sel").value,10);r&&(await f.from("crm_stages").insert({pipeline_id:v,name:r,color:p,sort_order:99}),document.getElementById("crm-new-stage").value="",await R())}),e.querySelectorAll(".stage-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await f.from("crm_stages").delete().eq("id",r.dataset.id),await R())})}),e.querySelectorAll(".stage-color-pick").forEach(r=>{r.addEventListener("change",async p=>{await f.from("crm_stages").update({color:p.target.value}).eq("id",r.dataset.sid);const v=r.closest(".stage-item").querySelector(".stage-color-dot");v&&(v.style.background=p.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const r=document.getElementById("crm-new-tag").value.trim(),p=document.getElementById("crm-new-tag-color").value;r&&(await f.from("crm_tags").insert({name:r,color:p}),document.getElementById("crm-new-tag").value="",await R())}),e.querySelectorAll(".tag-chip-del").forEach(r=>{r.addEventListener("click",async()=>{await f.from("crm_tags").delete().eq("id",r.dataset.id),await R()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const r=document.getElementById("crm-new-status").value.trim(),p=document.getElementById("crm-new-status-color").value,v=document.getElementById("crm-new-status-final").checked;r&&(await f.from("crm_lead_statuses").insert({name:r,color:p,is_final:v,sort_order:99}),document.getElementById("crm-new-status").value="",await R())}),e.querySelectorAll(".status-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover este status?")&&(await f.from("crm_lead_statuses").delete().eq("id",r.dataset.id),await R())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var p;const r=(p=prompt("Nome do novo funil:"))==null?void 0:p.trim();r&&(await f.from("crm_pipelines").insert({name:r,sort_order:99}),await R())})}async function yt(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await f.from("integrations").select("*"),n={};a==null||a.forEach(c=>{n[c.key]=c});const t=c=>{var s;return y(((s=n[c])==null?void 0:s.value)||"")},i=c=>{var s;return(s=n[c])!=null&&s.enabled?"checked":""},o=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${o.map(c=>`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var u;const c=document.getElementById("intg-save-tracking");c.disabled=!0,c.textContent="Salvando…";let s=!0;const m=document.querySelectorAll(".intg-val"),d=document.querySelectorAll(".intg-toggle");for(let r=0;r<m.length;r++){const p=m[r].dataset.key,v=m[r].value.trim(),b=((u=d[r])==null?void 0:u.checked)??!1;await me(p,v,b)||(s=!1)}c.disabled=!1,c.textContent="Salvar Integrações",M(document.getElementById("intg-tracking-msg"),s)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const c=document.getElementById("intg-save-smtp");c.disabled=!0,c.textContent="Salvando…";const s=document.querySelectorAll(".smtp-field");let m=!0;for(const u of s)await me(u.dataset.key,u.value.trim(),!0)||(m=!1);const d=document.getElementById("smtp-pass").value;d&&(await me("smtp_pass",d,!0)||(m=!1)),c.disabled=!1,c.textContent="Salvar SMTP",M(document.getElementById("intg-smtp-msg"),m)})}async function bt(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await be(),document.getElementById("media-file-input").addEventListener("change",async n=>{var s,m;const t=Array.from(n.target.files);if(!t.length)return;const i=document.getElementById("media-upload-progress"),o=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");i.style.display="";let c=0;for(const d of t){l.textContent=`Enviando ${c+1}/${t.length}…`,o.style.width=`${Math.round(c/t.length*100)}%`;try{const u=await Se(d,"media"),r=d.name.replace(/\.[^.]+$/,"").slice(0,60);await f.from("media_library").insert({name:r,url:u,type:"image",size:d.size,created_by:(m=(s=(await f.auth.getUser()).data)==null?void 0:s.user)==null?void 0:m.id})}catch(u){console.error("Media upload error:",u)}c++}o.style.width="100%",l.textContent=`✓ ${c} arquivo(s) enviado(s)`,setTimeout(()=>{i.style.display="none",o.style.width="0"},2e3),await be(),n.target.value=""});const a=document.getElementById("media-drop-area");a.addEventListener("dragover",n=>{n.preventDefault(),a.classList.add("drag-over")}),a.addEventListener("dragleave",()=>a.classList.remove("drag-over")),a.addEventListener("drop",n=>{n.preventDefault(),a.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function be(){const e=document.getElementById("media-grid");if(!e)return;const{data:a,error:n}=await f.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(a!=null&&a.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=a.map(t=>`
    <div class="media-item" data-id="${t.id}" data-url="${y(t.url)}">
      <img src="${y(t.url)}" alt="${y(t.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${y(t.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${t.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${y(t.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(t=>{t.addEventListener("click",i=>{var o;i.stopPropagation(),(o=navigator.clipboard)==null||o.writeText(t.dataset.url).then(()=>{const l=t.textContent;t.textContent="✓ Copiado!",setTimeout(()=>{t.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(t=>{t.addEventListener("click",async i=>{i.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await f.from("media_library").delete().eq("id",t.dataset.id),await be())})})}async function ht(){var a,n,t,i,o;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(s=>s.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(s=>s.classList.add("hidden")),l.classList.add("active");const c=e.querySelector(`#sa-panel-${l.dataset.tab}`);c&&c.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&J(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&Et(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&Ae(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&Te(),l.dataset.tab==="platform"&&Ne()})}),(a=e.querySelector("#sa-sub-filter"))==null||a.addEventListener("change",Ae),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",J),(t=e.querySelector("#sa-user-search"))==null||t.addEventListener("input",Te),(i=e.querySelector("#sa-tenant-new"))==null||i.addEventListener("click",()=>It()),(o=e.querySelector("#sa-plat-save"))==null||o.addEventListener("click",wt),J(),Ne())}async function J(){var c,s;const e=document.getElementById("sa-tenants-list"),a=((s=(c=document.getElementById("sa-tenant-search"))==null?void 0:c.value)==null?void 0:s.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=f.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:t,error:i}=await n;if(i){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${i.message}</div>`;return}const o=(t||[]).filter(m=>{var d,u;return!a||((d=m.name)==null?void 0:d.toLowerCase().includes(a))||((u=m.slug)==null?void 0:u.toLowerCase().includes(a))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const l=m=>m.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=o.map(m=>{var d;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        ${m.logo_url?`<img class="sa-tenant-logo" src="${y(m.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${y(m.name||"—")}</div>
          <div class="sa-list-sub">${y(m.slug||"")} · ${y(((d=m.plans)==null?void 0:d.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${l(m)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${m.id}" data-active="${m.active}" title="${m.active?"Desativar":"Ativar"}">${m.active?"⏸️":"▶️"}</button>
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${m.id}" title="Editar">✏️</button>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(m=>{m.addEventListener("click",async()=>{const d=m.dataset.active==="true";await f.from("tenants").update({active:!d}).eq("id",m.dataset.id),J()})})}async function Et(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:a,error:n}=await f.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(a||[]).map(t=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${y(t.name)}</div>
      <div class="sa-plan-price">${t.price_brl===0?"Gratuito":"R$ "+Number(t.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${t.max_users===999?"Ilimitado":t.max_users} usuários</span>
        <span>🏠 ${t.max_properties===9999?"Ilimitado":t.max_properties} imóveis</span>
        <span>📋 ${t.max_leads===99999?"Ilimitado":t.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function Ae(){var c;const e=document.getElementById("sa-subs-list"),a=((c=document.getElementById("sa-sub-filter"))==null?void 0:c.value)||"";if(!e)return;e.dataset.loaded="1";let n=f.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});a&&(n=n.eq("status",a));const{data:t,error:i}=await n;if(i){e.innerHTML=`<div class="sa-error">Erro: ${i.message}</div>`;return}if(!(t!=null&&t.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const o={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},l={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=t.map(s=>{var m,d,u;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${y(((m=s.tenants)==null?void 0:m.name)||"—")}</div>
          <div class="sa-list-sub">${y(((d=s.plans)==null?void 0:d.name)||"—")} · R$ ${Number(((u=s.plans)==null?void 0:u.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${o[s.status]||"gray"}">${l[s.status]||s.status}</span>
        <span class="sa-list-date">${s.current_period_end?new Date(s.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function Te(){var l,c;const e=document.getElementById("sa-users-list"),a=((c=(l=document.getElementById("sa-user-search"))==null?void 0:l.value)==null?void 0:c.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:t}=await f.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(t){e.innerHTML=`<div class="sa-error">Erro: ${t.message}</div>`;return}const i=(n||[]).filter(s=>{var m,d;return!a||((m=s.name)==null?void 0:m.toLowerCase().includes(a))||((d=s.email)==null?void 0:d.toLowerCase().includes(a))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const o={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=i.map(s=>{var m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(s.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${y(s.name||"—")}</div>
          <div class="sa-list-sub">${y(((m=s.tenants)==null?void 0:m.name)||"Sem imobiliária")} · ${o[s.role]||s.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${s.active!==!1?"sa-badge-green":"sa-badge-red"}">${s.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function Ne(){const[e,a,n,t]=await Promise.all([f.from("tenants").select("id",{count:"exact",head:!0}),f.from("profiles").select("id",{count:"exact",head:!0}),f.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),f.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),i=(o,l)=>{const c=document.getElementById(o);c&&(c.textContent=l??"—")};i("sa-stat-tenants",e.count),i("sa-stat-users",a.count),i("sa-stat-subs",n.count),i("sa-stat-props",t.count)}async function wt(){var n,t,i;const e=document.getElementById("sa-plat-save"),a=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await z([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((t=document.getElementById("sa-plat-email"))==null?void 0:t.value)||""},{key:"platform.trial_days",value:((i=document.getElementById("sa-plat-trial"))==null?void 0:i.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),M(a,!0)}function It(){var t,i,o,l,c;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const a=document.createElement("div");a.id="sa-new-tenant-modal",a.className="sa-modal-backdrop",a.innerHTML=`
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
  `,document.body.appendChild(a),f.from("plans").select("id, name").then(({data:s})=>{const m=document.getElementById("nt-plan");m&&s&&(m.innerHTML=s.map(d=>`<option value="${d.id}">${y(d.name)}</option>`).join(""))}),(t=document.getElementById("nt-name"))==null||t.addEventListener("input",s=>{const m=document.getElementById("nt-slug");m&&!m.dataset.manual&&(m.value=s.target.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""))}),(i=document.getElementById("nt-slug"))==null||i.addEventListener("input",s=>{s.target.dataset.manual="1"});const n=()=>a.remove();(o=document.getElementById("sa-modal-close-btn"))==null||o.addEventListener("click",n),(l=document.getElementById("nt-cancel"))==null||l.addEventListener("click",n),a.addEventListener("click",s=>{s.target===a&&n()}),(c=document.getElementById("nt-save"))==null||c.addEventListener("click",async()=>{var b,w,g,h,x,L,_;const s=(w=(b=document.getElementById("nt-name"))==null?void 0:b.value)==null?void 0:w.trim(),m=(h=(g=document.getElementById("nt-slug"))==null?void 0:g.value)==null?void 0:h.trim(),d=(L=(x=document.getElementById("nt-domain"))==null?void 0:x.value)==null?void 0:L.trim(),u=(_=document.getElementById("nt-plan"))==null?void 0:_.value,r=document.getElementById("nt-msg"),p=document.getElementById("nt-save");if(!s||!m){M(r,!1),r.textContent="Nome e slug são obrigatórios.";return}p&&(p.disabled=!0,p.textContent="Criando…");const{error:v}=await f.from("tenants").insert({name:s,slug:m,domain:d||null,plan_id:u||null,active:!0});if(p&&(p.disabled=!1,p.textContent="Criar Imobiliária"),v){M(r,!1),r.textContent=v.message;return}M(r,!0),setTimeout(()=>{n(),J()},800)})}
