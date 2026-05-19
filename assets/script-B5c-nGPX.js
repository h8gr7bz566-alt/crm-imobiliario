import{s as p}from"./supabase-BcuJ3xoD.js";let ve={},ke={};async function et(){const[e,t]=await Promise.all([p.from("settings").select("key,value"),p.from("site_content").select("*")]);e.data&&e.data.forEach(n=>{ve[n.key]=n.value}),t.data&&t.data.forEach(n=>{ke[n.key]=n})}const D=(e,t=null)=>ve[e]!==void 0?ve[e]:t,he=(e,t="pt")=>{const n=ke[e];return n?n[`value_${t}`]??n.value_pt??null:null};async function W(e){const t=new Date().toISOString(),n=e.map(([o,s])=>({key:o,value:s,updated_at:t})),{error:a}=await p.from("settings").upsert(n,{onConflict:"key"});return a||e.forEach(([o,s])=>{ve[o]=s}),!a}async function Ee(e,{pt:t,en:n,es:a}){const o={key:e,value_pt:t,value_en:n,value_es:a,updated_at:new Date().toISOString()},{error:s}=await p.from("site_content").upsert(o,{onConflict:"key"});return s||(ke[e]=o),!s}async function we(e,t,n){const{error:a}=await p.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function _e(){const e=document.documentElement,t=D("visual.accent_color","#b8962e"),n=D("visual.primary_bg","#0f1c2e"),a=D("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=D("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(i=>{i.src=o});const s=D("company.favicon_url","/favicon.ico"),l=document.querySelector('link[rel="shortcut icon"]');l&&(l.href=s);const d=D("visual.hero_bg_url","");if(d){const i=document.querySelector(".hero");i&&(i.style.backgroundImage=`url('${d}')`)}}function tt(e="pt"){const t=u=>he(u,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const s=document.querySelector('[data-i18n="inst.p1"]'),l=document.querySelector('[data-i18n="inst.p2"]'),d=document.querySelector('[data-i18n="inst.p3"]');s&&t("inst.bio_p1")&&(s.innerHTML=t("inst.bio_p1")),l&&t("inst.bio_p2")&&(l.innerHTML=t("inst.bio_p2")),d&&t("inst.bio_p3")&&(d.innerHTML=t("inst.bio_p3"));const i=document.querySelector('[data-i18n-num="inst.stat2num"]'),m=document.querySelector('[data-i18n="inst.stat1"]'),c=document.querySelector('[data-i18n="inst.stat2"]'),v=document.querySelector('[data-i18n="inst.stat3"]');i&&t("inst.stat2_num")&&(i.innerHTML=t("inst.stat2_num")),m&&t("inst.stat1_label")&&(m.innerHTML=t("inst.stat1_label")),c&&t("inst.stat2_label")&&(c.innerHTML=t("inst.stat2_label")),v&&t("inst.stat3_label")&&(v.innerHTML=t("inst.stat3_label"));const r=he("seo.title_pt",e);r&&document.title&&(document.title=r);const y=he("seo.description_pt",e);if(y){const u=document.querySelector('meta[name="description"]');u&&(u.content=y)}}function at(e){if(!e)return;const t=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const nt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let G="5547999701743",ne=`https://wa.me/${G}`;const X=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],st=5.7;function se(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/st).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let $=[],g=null,oe=[],We=!1;p.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(We=!0)});async function ot(){const{data:e,error:t}=await p.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return t?(console.error("Supabase select error:",t),[]):e||[]}async function it(){const{data:e,error:t}=await p.from("properties").select("*").order("created_at",{ascending:!1});return t?(console.error("Supabase select error:",t),[]):($=e||[],At(),Nt(),$)}async function lt(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await p.from("properties").update(a).eq("id",t);if(o)throw o;const s=$.findIndex(l=>l.id===t);s>=0&&($[s]={...$[s],...a})}else{if(!e.reference){const a=$.map(s=>s.reference||"").filter(s=>/^IO-\d+$/.test(s)).map(s=>parseInt(s.replace("IO-",""),10)),o=a.length?Math.max(...a)+1:1;e.reference="IO-"+String(o).padStart(4,"0")}const{data:t,error:n}=await p.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&$.unshift(t[0])}}async function dt(e){const{error:t}=await p.from("properties").delete().eq("id",e);if(t)throw t;$=$.filter(n=>n.id!==e)}async function rt(e,t){const{error:n}=await p.auth.signInWithPassword({email:e,password:t});return!n}function Ce(e,t=1200,n=.78){return new Promise((a,o)=>{const s=new Image,l=URL.createObjectURL(e);s.onload=()=>{URL.revokeObjectURL(l);const d=document.createElement("canvas");let i=s.width,m=s.height;i>t&&(m=Math.round(m*t/i),i=t),d.width=i,d.height=m;const c=d.getContext("2d");c.drawImage(s,0,0,i,m);const v=new Image;v.crossOrigin="anonymous",v.onload=()=>{const r=Math.round(i*.18),y=Math.round(v.naturalHeight*r/v.naturalWidth),u=Math.round(i*.02),h=i-r-u,E=m-y-u;c.globalAlpha=.45,c.drawImage(v,h,E,r,y),c.globalAlpha=1,d.toBlob(b=>b?a(b):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},v.onerror=()=>{d.toBlob(r=>r?a(r):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},v.src="/logo.png"},s.onerror=o,s.src=l})}async function ct(e){const t=await Ce(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await p.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=p.storage.from("imoveis").getPublicUrl(n);return o}async function mt(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await ct(n[o]));return a}async function ie(){var v,r,y,u,h,E;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await ot();$=n,((v=document.getElementById("selecao-carousel"))==null?void 0:v.innerHTML)===""&&ut(n);const a=((r=document.getElementById("city-filter"))==null?void 0:r.value)||"",o=((y=document.getElementById("neighborhood-filter"))==null?void 0:y.value)||"",s=((u=document.getElementById("bedrooms-filter"))==null?void 0:u.value)||"",l=((h=document.getElementById("parking-filter"))==null?void 0:h.value)||"",d=((E=document.getElementById("construction-filter"))==null?void 0:E.value)||"",i=document.getElementById("price-slider"),m=i?parseInt(i.value,10):13e7,c=n.filter(b=>{if(a&&b.city!==a||o&&b.neighborhood!==o||s&&(s==="4+"&&Number(b.bedrooms)<4||s!=="4+"&&Number(b.bedrooms)!==Number(s))||l&&(l==="4+"&&Number(b.parking)<4||l!=="4+"&&Number(b.parking)!==Number(l))||d&&b.construction_status!==d)return!1;const w=String(b.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),x=parseInt(w,10)||0;return!(x<0||x>m)});if(e){if(!c.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=c.map(b=>{var S;const w=b.cover_image||((S=b.images)==null?void 0:S[0])||X[0],x=[b.neighborhood,b.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${w}" alt="${f(b.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${f(b.title)}</div>
            <div class="selecao-card-loc">${f(x)}</div>
            <div class="selecao-card-price">${f(se(b.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${b.id}" class="btn-det">Ver Detalhes</a>
              <a href="${ne}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!c.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=c.map(b=>{var S;const w=(S=b.images)!=null&&S.length?b.images:X,x=w.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${x}" data-idx="0" data-pid="${b.id}">
          <img src="${b.cover_image||w[0]}" alt="${f(b.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${x>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${f(b.title)}</strong>
          <div class="muted">${f(b.neighborhood||"")}, ${f(b.city||"")}</div>
          <div><strong>${f(se(b.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${b.bedrooms||"--"} | 🚗 ${b.parking||"--"} ${x>1?"| 📸 "+x:""}</div>
          <p class="muted">${f((b.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${b.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${ne}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(b=>{b.removeEventListener("click",Re),b.addEventListener("click",Re)})}function ut(e){var o,s,l;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(d=>{var c;const i=d.cover_image||((c=d.images)==null?void 0:c[0])||X[0],m=[d.neighborhood,d.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${i}" alt="${f(d.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${f(d.title)}</div>
          <div class="selecao-card-loc">${f(m)}</div>
          <div class="selecao-card-price">${f(se(d.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${d.id}" class="btn-det">Ver Detalhes</a>
            <a href="${ne}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(s=a==null?void 0:a.querySelector(".selecao-prev"))==null||s.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(l=a==null?void 0:a.querySelector(".selecao-next"))==null||l.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),ie()};function Re(e){var d;e.stopPropagation();const t=e.currentTarget.closest(".carousel-wrap");if(!t)return;const n=parseInt(t.dataset.total,10);if(!n)return;let a=parseInt(t.dataset.idx,10)||0;const o=e.currentTarget.classList.contains("carousel-next")?1:-1;a=(a+o+n)%n,t.dataset.idx=a;const s=parseInt(t.dataset.pid,10),l=$.find(i=>i.id===s);(d=l==null?void 0:l.images)!=null&&d.length&&(t.querySelector(".carousel-img").src=l.images[a])}function vt(){const e=document.getElementById("price-slider"),t=document.getElementById("price-label");!e||!t||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",t.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);t.textContent="Até R$ "+n.toLocaleString("pt-BR"),ie()}))}function pt(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=V();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${f(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=V().find(s=>s.name===e.value),o=a?Te(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(s=>`<option value="${s.name}">${f(s.name)}</option>`).join(""),ie()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",ie)})}function le(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var l;const a=n.cover_image||((l=n.images)==null?void 0:l[0])||X[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",s=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${f(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${f(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+f(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${f(o)}</td>
      <td class="cell-price">${f(se(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${s}</td>
      <td>
        <div class="action-btns">
          ${(g==null?void 0:g.role)==="admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(g==null?void 0:g.role)==="admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function gt(){const e=document.getElementById("f-city");if(!e)return;const t=V(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${f(a.name)}</option>`).join(""),n&&(e.value=n)}function ft(){var e,t,n,a,o,s,l,d,i,m,c,v,r,y,u;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((s=document.getElementById("f-condominium"))==null?void 0:s.value)||"").trim().toLowerCase(),priceMin:parseFloat((l=document.getElementById("f-price-min"))==null?void 0:l.value)||0,priceMax:parseFloat((d=document.getElementById("f-price-max"))==null?void 0:d.value)||1/0,areaMin:parseFloat((i=document.getElementById("f-area-min"))==null?void 0:i.value)||0,areaMax:parseFloat((m=document.getElementById("f-area-max"))==null?void 0:m.value)||1/0,construction:((c=document.getElementById("f-construction"))==null?void 0:c.value)||"",published:((v=document.getElementById("f-published"))==null?void 0:v.value)||"",bedrooms:((r=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:r.dataset.val)||"",suites:((y=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:y.dataset.val)||"",parking:((u=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:u.dataset.val)||""}}function qe(e){const t=ft();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const s=parseFloat(a.area)||0;return!(t.areaMin>0&&s<t.areaMin||t.areaMax<1/0&&s>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function pe(){if(!document.getElementById("admin-properties"))return;const e=await it(),t=e.length,n=e.filter(l=>l.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),s=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),s&&(s.textContent="—"),gt(),le($)}let N=null,z="";function Be(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ue(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function ge(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===z?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{z=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function Ie(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{n.preventDefault();const a=new FormData(e),o=a.getAll("images");let s=[];const l=o.filter(i=>i.size>0);if(l.length){t.disabled=!0,t.textContent=`Enviando 0/${l.length} foto…`;try{s=await mt(l,(i,m)=>{t.textContent=`Enviando ${i}/${m} foto…`})}catch(i){console.error("Erro no upload:",i),t.disabled=!1,t.textContent=N?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(N){const i=$.find(m=>m.id===N);i!=null&&i.images&&(s=i.images)}s.length||(s=[...X]);const d={...N?{id:N}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:s,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:z||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||""};try{await lt(d),N=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const i=document.getElementById("adminPublished");i&&(i.value="true");const m=document.getElementById("adminNeighborhood");m&&(m.innerHTML='<option value="">Selecione a cidade primeiro</option>');const c=document.getElementById("adminConstructionStatus");c&&(c.value=""),z="",ge([]),ue(),await pe()}catch(i){console.error(i),t.disabled=!1,t.textContent=N?"Salvar Alterações":"Salvar Imóvel",alert("Erro ao salvar imóvel. Verifique o console.")}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await dt(o),await pe()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((g==null?void 0:g.role)!=="admin")return;const o=Number(n.target.dataset.id);if(!o)return;const s=$.find(i=>i.id===o);if(!s)return;N=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=s.title||"",e.querySelector('[name="rua"]').value=s.rua||"",e.querySelector('[name="numero"]').value=s.numero||"",e.querySelector('[name="city"]').value=s.city||"",e.querySelector('[name="price"]').value=s.price||"",e.querySelector('[name="bedrooms"]').value=s.bedrooms||"",e.querySelector('[name="suites"]').value=s.suites||"",e.querySelector('[name="area"]').value=s.area||"",e.querySelector('[name="parking"]').value=s.parking||"",e.querySelector('[name="description"]').value=s.description||"",e.querySelector('[name="construction_status"]').value=s.construction_status||"",e.querySelector('[name="owner_name"]').value=s.owner_name||"",e.querySelector('[name="owner_phone"]').value=s.owner_phone||"",e.querySelector('[name="owner_email"]').value=s.owner_email||"",e.querySelector('[name="owner_notes"]').value=s.owner_notes||"",e.querySelector('[name="condominium"]').value=s.condominium||"";const l=document.getElementById("adminPublished");l&&(l.value=s.published===!0?"true":"false");const d=document.getElementById("adminCitySelect");d&&(d.value=s.city||"",d.dispatchEvent(new Event("change")),setTimeout(()=>{const i=document.getElementById("adminNeighborhood");i&&(i.value=s.neighborhood||"")},50)),z=s.cover_image||((a=s.images)==null?void 0:a[0])||"",ge(s.images||[]),Be("Editar Imóvel")}})}function f(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let j=[],R=0;function yt(e){var c,v;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const t=document.getElementById("view-status-badge");e.published?(t.textContent="● Publicado",t.className="badge badge-green"):(t.textContent="○ Rascunho",t.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const a=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=a,document.getElementById("view-directions-link").href=a;const o=((c=e.images)==null?void 0:c[0])||X[0];document.getElementById("view-thumb-preview").src=o,j=(v=e.images)!=null&&v.length?e.images:X,R=0,fe(),document.getElementById("view-price").textContent=se(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const s=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),s&&(s.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(r=>r.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(r=>r.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const d="https://omarcorretor.com.br/property.html?id="+e.id,i=document.getElementById("share-link-input");i&&(i.value=d);const m=document.getElementById("share-panel");m&&(m.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function me(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function fe(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=j[R],e.alt=`Foto ${R+1}`;const s=j.length>1;n.style.display=s?"flex":"none",a.style.display=s?"flex":"none",t.textContent=s?`${R+1} / ${j.length}`:"",o.innerHTML=s?j.map((l,d)=>`<img src="${l}" class="view-thumb${d===R?" active":""}" data-i="${d}" alt="Foto ${d+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(l=>{l.addEventListener("click",()=>{R=+l.dataset.i,fe()})})}async function He(e){const{data:t}=await p.from("profiles").select("*").eq("id",e).maybeSingle();return t}function xe(e){var v,r;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const s=(e==null?void 0:e.name)||"Sem nome",l=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=s,o&&(o.textContent=l),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((v=s[0])==null?void 0:v.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const d=document.getElementById("avatar-dd-name"),i=document.getElementById("avatar-dd-role"),m=document.getElementById("avatar-dd-img"),c=document.getElementById("avatar-dd-initial");d&&(d.textContent=s),i&&(i.textContent=l),e!=null&&e.avatar_url&&m?(m.src=e.avatar_url,m.style.display="",c&&(c.style.display="none")):(c&&(c.textContent=((r=s[0])==null?void 0:r.toUpperCase())||"?",c.style.display=""),m&&(m.style.display="none"))}function O(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),F(),e==="contatos"&&_t(),e==="funil"&&ht(),e==="tarefas"&&wt()}function Ue(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:Ht,visual:Ut,"site-config":jt,"crm-config":Pt,integracoes:Ot,midia:Dt}).forEach(([a,o])=>{const s=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);s&&s.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>Ft(),{once:!0}),window.lucide&&lucide.createIcons()}}function F(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function bt(){var s,l,d,i,m,c,v,r,y;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",u=>{var E;u.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(E=document.getElementById("notif-dropdown"))==null||E.classList.add("hidden")}),(s=document.getElementById("avatar-dd-profile"))==null||s.addEventListener("click",()=>{F(),O("settings")}),(l=document.getElementById("avatar-dd-settings"))==null||l.addEventListener("click",()=>{F(),O("settings")}),(d=document.getElementById("avatar-dd-logout"))==null||d.addEventListener("click",async()=>{await p.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",u=>{var E;u.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((E=document.getElementById("avatar-dropdown"))==null||E.classList.add("hidden"),Lt())}),(i=document.getElementById("notif-mark-all"))==null||i.addEventListener("click",()=>{St(),F()}),(m=document.getElementById("btn-search-open"))==null||m.addEventListener("click",()=>{var u,h;(u=document.getElementById("search-overlay"))==null||u.classList.remove("hidden"),(h=document.getElementById("search-input"))==null||h.focus()}),(c=document.getElementById("search-overlay-close"))==null||c.addEventListener("click",()=>{var u;(u=document.getElementById("search-overlay"))==null||u.classList.add("hidden")}),(v=document.getElementById("search-overlay"))==null||v.addEventListener("click",u=>{u.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(r=document.getElementById("search-input"))==null||r.addEventListener("input",u=>{clearTimeout(o),o=setTimeout(()=>xt(u.target.value.trim()),280)}),(y=document.getElementById("search-input"))==null||y.addEventListener("keydown",u=>{var h;u.key==="Escape"&&((h=document.getElementById("search-overlay"))==null||h.classList.add("hidden"))}),document.addEventListener("click",F)}let je=!1,K=[],Je=[],ye=[],de=null,Q=null;async function ht(){var a;if(je)return;je=!0;const[{data:e},{data:t}]=await Promise.all([p.from("crm_pipelines").select("*").order("sort_order"),p.from("crm_stages").select("*").order("sort_order")]);K=e||[],Je=t||[];const n=document.getElementById("funil-pipe-sel");if(n){n.innerHTML=K.length?K.map(s=>`<option value="${s.id}">${f(s.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const o=K.find(s=>s.is_default)||K[0];o&&(n.value=o.id,de=o.id),n.addEventListener("change",async()=>{de=parseInt(n.value,10),await Pe()})}(a=document.getElementById("btn-funil-add-lead"))==null||a.addEventListener("click",()=>openLeadModal()),await Pe()}async function Pe(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=p.from("leads").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id)),de&&(t=t.eq("pipeline_id",de));const{data:n}=await t;ye=n||[],Ye()}function Ye(){const e=document.getElementById("kanban-board");if(!e)return;const t=Je.filter(a=>a.pipeline_id===de);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n={};t.forEach(a=>{n[a.name]=[]}),ye.forEach(a=>{var s,l,d,i;const o=a.stage||((s=t[0])==null?void 0:s.name);n[o]||(n[((l=t[0])==null?void 0:l.name)||""]=[]),(i=n[o]||n[(d=t[0])==null?void 0:d.name])==null||i.push(a)}),e.innerHTML=t.map(a=>{const o=n[a.name]||[],s=o.length?o.map(l=>`
        <div class="kanban-card" draggable="true" data-id="${l.id}" data-stage="${f(a.name)}">
          <div class="kanban-card-name">${f(l.name||"—")}</div>
          ${l.phone?`<div class="kanban-card-info">📞 ${f(l.phone)}</div>`:""}
          ${l.interest?`<div class="kanban-card-info">🏠 ${f(l.interest)}</div>`:""}
          ${l.budget_max?`<div class="kanban-card-info">💰 R$ ${Number(l.budget_max).toLocaleString("pt-BR")}</div>`:""}
          <div class="kanban-card-tags">
            ${l.source?`<span class="kanban-card-tag">${f(l.source)}</span>`:""}
          </div>
        </div>`).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${f(a.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${a.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${a.color||"#2563eb"}"></div>
            ${f(a.name)}
          </div>
          <span class="kanban-col-count">${o.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${f(a.name)}">${s}</div>
        <button class="kanban-add-btn" data-stage="${f(a.name)}">+ Adicionar lead</button>
      </div>`}).join(""),Et(),window.lucide&&lucide.createIcons()}function Et(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>openLeadModal())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=ye.find(a=>String(a.id)===String(t.dataset.id));n&&openLeadModal(n)}),t.addEventListener("dragstart",n=>{Q=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!Q||!a)return;await p.from("leads").update({stage:a}).eq("id",Q);const o=ye.find(s=>String(s.id)===String(Q));o&&(o.stage=a),Q=null,Ye()})}))}let A=[],Oe=!1,ee="pending";async function wt(){var e;Oe||(Oe=!0,await It(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>Bt()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),ee=t.dataset.filter,re()})}))}async function It(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=p.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}A=n||[],re()}function re(){const e=document.getElementById("tarefas-list");if(!e)return;let t=A;if(ee==="pending"&&(t=A.filter(n=>n.status!=="done")),ee==="done"&&(t=A.filter(n=>n.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${ee==="done"?"✅":"📋"}</div>
      <p>${ee==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}e.innerHTML=t.map(n=>{const a=n.due_date?new Date(n.due_date+"T00:00:00").toLocaleDateString("pt-BR"):"",o=n.due_date&&n.status!=="done"&&new Date(n.due_date)<new Date;return`
      <div class="tarefa-item${n.status==="done"?" done":""}" data-id="${n.id}">
        <input type="checkbox" class="tarefa-check" data-id="${n.id}" ${n.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${f(n.title)}</div>
          <div class="tarefa-meta">
            ${a?`<span style="${o?"color:#ef4444;":""}">📅 ${a}${o?" (atrasada)":""}</span>`:""}
            ${n.description?`<span>${f(n.description.substring(0,60))}${n.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${n.priority||"medium"}">${n.priority==="high"?"Alta":n.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${n.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(n=>{n.addEventListener("change",async()=>{const a=n.dataset.id,o=n.checked?"done":"pending";await p.from("tasks").update({status:o}).eq("id",a);const s=A.find(l=>String(l.id)===a);s&&(s.status=o),re()})}),e.querySelectorAll(".tarefa-del-btn").forEach(n=>{n.addEventListener("click",async()=>{confirm("Excluir esta tarefa?")&&(await p.from("tasks").delete().eq("id",n.dataset.id),A=A.filter(a=>String(a.id)!==String(n.dataset.id)),re())})})}function Bt(e=null){var s,l,d;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=document.createElement("div");a.id="tarefa-modal-root",a.className="modal-backdrop",a.innerHTML=`
    <div class="modal" style="max-width:480px;">
      <div class="modal-header">
        <h3>${n?"Editar Tarefa":"Nova Tarefa"}</h3>
        <button class="modal-close" id="tm-close">✕</button>
      </div>
      <div class="modal-body">
        <form id="tarefa-form" style="display:flex;flex-direction:column;gap:14px;">
          <div class="form-group">
            <label class="form-label">Título *</label>
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${f((e==null?void 0:e.title)||"")}">
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
            <textarea name="description" class="form-control" rows="2" placeholder="Detalhes…">${f((e==null?void 0:e.description)||"")}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="tm-cancel">Cancelar</button>
        <button class="btn-primary" id="tm-save" style="margin:0;">${n?"Salvar":"Criar Tarefa"}</button>
      </div>
    </div>
  `,document.body.appendChild(a);const o=()=>a.remove();(s=document.getElementById("tm-close"))==null||s.addEventListener("click",o),(l=document.getElementById("tm-cancel"))==null||l.addEventListener("click",o),a.addEventListener("click",i=>{i.target===a&&o()}),(d=document.getElementById("tm-save"))==null||d.addEventListener("click",async()=>{var y,u;const i=document.getElementById("tarefa-form");if(!i.checkValidity()){i.reportValidity();return}const m=new FormData(i),c=document.getElementById("tm-save");c.disabled=!0,c.textContent="Salvando…";const v={title:(y=m.get("title"))==null?void 0:y.trim(),description:((u=m.get("description"))==null?void 0:u.trim())||null,due_date:m.get("due_date")||null,priority:m.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null};let r;if(n){if({error:r}=await p.from("tasks").update(v).eq("id",e.id),!r){const h=A.findIndex(E=>String(E.id)===String(e.id));h>=0&&(A[h]={...A[h],...v})}}else{const{data:h,error:E}=await p.from("tasks").insert(v).select();r=E,!r&&(h!=null&&h[0])&&A.unshift(h[0])}if(c.disabled=!1,c.textContent=n?"Salvar":"Criar Tarefa",r){alert("Erro: "+r.message);return}o(),re()})}async function xt(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;g==null||g.role,g==null||g.tenant_id;const[{data:a},{data:o}]=await Promise.all([p.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),p.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),s=[];a!=null&&a.length&&(s.push('<div class="search-group-label">Imóveis</div>'),s.push(...a.map(l=>`
      <div class="search-result-item" data-type="property" data-id="${l.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${f(l.title||"—")}</div>
          <div class="search-result-sub">${f(l.reference||"")} · ${f(l.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(s.push('<div class="search-group-label">Leads / Contatos</div>'),s.push(...o.map(l=>`
      <div class="search-result-item" data-type="lead" data-id="${l.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${f(l.name||"—")}</div>
          <div class="search-result-sub">${f(l.email||l.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=s.length?s.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(l=>{l.addEventListener("click",()=>{var d;(d=document.getElementById("search-overlay"))==null||d.classList.add("hidden"),l.dataset.type==="lead"?O("contatos"):O("properties")})})}let H=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function Lt(){var l;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=p.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(d=>!H.includes(String(d.id))),s=document.getElementById("notif-badge");if(s&&(s.textContent=o.length,o.length>0?s.classList.remove("hidden"):s.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(d=>{const i=$t(d.created_at);return`
      <div class="notif-item${!H.includes(String(d.id))?" unread":""}" data-id="${d.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${f(d.name||"—")}</div>
          <div class="notif-item-sub">${f(d.phone||d.source||"")} · ${i}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(l=document.getElementById("notif-see-all"))==null||l.addEventListener("click",d=>{d.preventDefault(),F(),O("contatos")}),e.querySelectorAll(".notif-item").forEach(d=>{d.addEventListener("click",()=>{H.push(d.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(H)),d.classList.remove("unread"),F(),O("contatos")})})}function St(){var e;document.querySelectorAll(".notif-item").forEach(t=>H.push(t.dataset.id)),H=[...new Set(H)],localStorage.setItem("crm_notifs_read",JSON.stringify(H)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function $t(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function kt(){let e=p.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);g!=null&&g.tenant_id&&(e=e.eq("tenant_id",g.tenant_id));const{data:t}=await e,a=(t||[]).filter(s=>!H.includes(String(s.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let P=[],q=1;const Z=10;let De=!1;async function _t(){var t,n,a,o,s,l,d,i,m;document.getElementById("section-contatos")&&(De||(De=!0,await Ke(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{q=1,Y()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",c=>{c.key==="Enter"&&(q=1,Y())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>Qe()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",Tt),(s=document.getElementById("import-modal-close"))==null||s.addEventListener("click",Le),(l=document.getElementById("import-modal-cancel"))==null||l.addEventListener("click",Le),(d=document.getElementById("download-template"))==null||d.addEventListener("click",c=>{c.preventDefault();const v=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,r=new Blob([v],{type:"text/csv"}),y=document.createElement("a");y.href=URL.createObjectURL(r),y.download="modelo_contatos.csv",y.click()}),(i=document.getElementById("import-csv-file"))==null||i.addEventListener("change",Ct),(m=document.getElementById("import-modal-confirm"))==null||m.addEventListener("click",qt)))}async function Ke(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=p.from("leads").select("*").order("created_at",{ascending:!1});(g==null?void 0:g.role)==="corretor"?t=t.eq("assigned_to",g.id):g!=null&&g.tenant_id&&(t=t.eq("tenant_id",g.tenant_id));const{data:a}=await t;P=a||[],Y()}function Y(){var d,i,m;const e=(((d=document.getElementById("contato-search"))==null?void 0:d.value)||"").toLowerCase(),t=e?P.filter(c=>(c.name||"").toLowerCase().includes(e)||(c.email||"").toLowerCase().includes(e)||(c.phone||"").toLowerCase().includes(e)):P,n=t.length,a=Math.max(1,Math.ceil(n/Z));q>a&&(q=a);const o=t.slice((q-1)*Z,q*Z),s=document.getElementById("contatos-tbody");if(!s)return;o.length?s.innerHTML=o.map(c=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${c.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${c.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${f(c.name||"—")}</a>
        </td>
        <td>${f(c.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${c.email?f(c.email):"—"}</td>
        <td style="font-size:13px;">${c.phone?f(c.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${f(c.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td>
          <button class="icon-btn contato-edit-btn" data-id="${c.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):s.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const l=document.getElementById("contatos-pagination");if(l){const c=n===0?0:(q-1)*Z+1,v=Math.min(q*Z,n);l.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${c}–${v}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${q<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${q} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${q>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(i=l.querySelector("#pag-prev"))==null||i.addEventListener("click",()=>{q--,Y()}),(m=l.querySelector("#pag-next"))==null||m.addEventListener("click",()=>{q++,Y()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(c=>{c.addEventListener("click",v=>{v.preventDefault();const r=c.dataset.id,y=P.find(u=>String(u.id)===String(r));y&&Qe(y)})})}function Qe(e=null){var s,l,d;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=document.createElement("div");a.id="contato-modal-root",a.className="modal-backdrop",a.innerHTML=`
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
              <input name="name" required class="form-control" placeholder="Nome completo" value="${f((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${f((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${f((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${f((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${f((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${f((e==null?void 0:e.city_interest)||"")}">
            </div>
          </div>
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${f((e==null?void 0:e.notes)||"")}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cm-cancel">Cancelar</button>
        <button class="btn-primary" id="cm-save" style="margin:0;">${n?"Salvar":"Criar Contato"}</button>
      </div>
    </div>
  `,document.body.appendChild(a);const o=()=>a.remove();(s=document.getElementById("cm-close"))==null||s.addEventListener("click",o),(l=document.getElementById("cm-cancel"))==null||l.addEventListener("click",o),a.addEventListener("click",i=>{i.target===a&&o()}),(d=document.getElementById("cm-save"))==null||d.addEventListener("click",async()=>{var y,u,h,E,b,w,x;const i=document.getElementById("contato-form");if(!i.checkValidity()){i.reportValidity();return}const m=new FormData(i),c=document.getElementById("cm-save");c.disabled=!0,c.textContent="Salvando…";const v={name:(y=m.get("name"))==null?void 0:y.trim(),company:((u=m.get("company"))==null?void 0:u.trim())||null,email:((h=m.get("email"))==null?void 0:h.trim())||null,phone:((E=m.get("phone"))==null?void 0:E.trim())||null,job_title:((b=m.get("job_title"))==null?void 0:b.trim())||null,city_interest:((w=m.get("city_interest"))==null?void 0:w.trim())||null,notes:((x=m.get("notes"))==null?void 0:x.trim())||null,stage:(e==null?void 0:e.stage)||"novo",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null,source:"manual"};let r;if(n){if({error:r}=await p.from("leads").update(v).eq("id",e.id),!r){const S=P.findIndex(_=>String(_.id)===String(e.id));S>=0&&(P[S]={...P[S],...v})}}else{const{data:S,error:_}=await p.from("leads").insert(v).select();r=_,!r&&(S!=null&&S[0])&&P.unshift(S[0])}if(c.disabled=!1,c.textContent=n?"Salvar":"Criar Contato",r){alert("Erro: "+r.message);return}o(),Y()})}let J=[];function Ct(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{J=a.target.result.split(`
`).filter(d=>d.trim()).slice(1).map(d=>{const[i,m,c,v,r]=d.split(",").map(y=>y.trim().replace(/^"|"$/g,""));return{name:i,email:m,phone:c,company:v,job_title:r}}).filter(d=>d.name);const s=document.getElementById("import-preview");s&&(s.textContent=`${J.length} contato(s) encontrados para importar.`);const l=document.getElementById("import-modal-confirm");l&&(l.disabled=J.length===0)},n.readAsText(t)}async function qt(){if(!J.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=J.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(g==null?void 0:g.id)||null,tenant_id:(g==null?void 0:g.tenant_id)||null})),{error:n}=await p.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Le(),await Ke(),alert(`${t.length} contato(s) importados com sucesso!`)}function Tt(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),J=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Le(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const Mt="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function Se(e){return(await fetch(Mt,{method:"POST",headers:{Authorization:`Bearer ${nt}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function Fe(e){var i,m,c,v;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),s=document.getElementById("settings-avatar-input"),l=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:r}}=await p.auth.getUser();n.value=(r==null?void 0:r.email)||""}const d=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=d),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),s==null||s.addEventListener("change",r=>{const y=r.target.files[0];if(!y)return;const u=URL.createObjectURL(y);a&&(a.src=u,a.style.display=""),o&&(o.style.display="none")}),(i=document.getElementById("btn-change-password"))==null||i.addEventListener("click",async()=>{var b,w;const r=((b=document.getElementById("change-password-new"))==null?void 0:b.value)||"",y=((w=document.getElementById("change-password-confirm"))==null?void 0:w.value)||"",u=document.getElementById("change-password-msg"),h=document.getElementById("btn-change-password");if(u&&(u.style.display="none"),r.length<6){u&&(u.textContent="Mínimo 6 caracteres.",u.style.display="");return}if(r!==y){u&&(u.textContent="As senhas não coincidem.",u.style.display="");return}h&&(h.disabled=!0,h.textContent="Salvando…");const{error:E}=await p.auth.updateUser({password:r});h&&(h.disabled=!1,h.textContent="Salvar Nova Senha"),E?u&&(u.textContent="Erro: "+E.message,u.style.display=""):(u&&(u.style.color="#16a34a",u.textContent="Senha alterada com sucesso!",u.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),l==null||l.addEventListener("click",async()=>{var w;const r=t.value.trim();let y=(g==null?void 0:g.avatar_url)||"";const u=s==null?void 0:s.files[0],h=l.textContent;if(l.disabled=!0,l.textContent="Salvando…",u)try{const x=await Ce(u,400,.85),S=`avatars/${g.id}-${Date.now()}.jpg`,{error:_}=await p.storage.from("imoveis").upload(S,x,{contentType:"image/jpeg",upsert:!0});if(!_){const{data:{publicUrl:I}}=p.storage.from("imoveis").getPublicUrl(S);y=I}}catch(x){console.error("Avatar upload:",x)}const{error:E}=await p.from("profiles").update({name:r,avatar_url:y}).eq("id",g.id);if(l.disabled=!1,l.textContent=h,E){alert("Erro ao salvar perfil.");return}g={...g,name:r,avatar_url:y},xe(g);const b=document.getElementById("settings-avatar-initial");b&&(b.textContent=((w=r[0])==null?void 0:w.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"){const r=document.getElementById("settings-corretores-section");r&&(r.style.display=""),await be(),(m=document.getElementById("btn-invite-corretor"))==null||m.addEventListener("click",async()=>{var b,w;const u=(b=document.getElementById("invite-email"))==null?void 0:b.value.trim(),h=(w=document.getElementById("invite-password"))==null?void 0:w.value.trim(),E=document.getElementById("btn-invite-corretor");if(!u){alert("Informe o e-mail do corretor.");return}if(!h||h.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}E&&(E.disabled=!0,E.textContent="Criando…");try{const x=await Se({email:u,password:h});if(x.success){alert("Acesso criado! O corretor receberá um e-mail com o login e a senha que você definiu.");const S=document.getElementById("invite-email"),_=document.getElementById("invite-password");S&&(S.value=""),_&&(_.value=""),await be()}else alert("Erro: "+(x.error||"Falha desconhecida"))}catch(x){alert("Erro ao criar acesso: "+x.message)}finally{E&&(E.disabled=!1,E.textContent="+ Criar Acesso")}});const y=document.getElementById("settings-locations-section");y&&(y.style.display=""),await te(),(c=document.getElementById("loc-add-city-btn"))==null||c.addEventListener("click",async()=>{const u=document.getElementById("loc-new-city"),h=u==null?void 0:u.value.trim();if(!h)return;const{error:E}=await p.from("locations").insert({type:"cidade",name:h});if(E){alert("Erro ao adicionar cidade.");return}u&&(u.value=""),await te(),Me()}),(v=document.getElementById("loc-add-neighborhood-btn"))==null||v.addEventListener("click",async()=>{var w;const u=parseInt((w=document.getElementById("loc-new-neighborhood-city"))==null?void 0:w.value,10),h=document.getElementById("loc-new-neighborhood"),E=h==null?void 0:h.value.trim();if(!u||!E){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:b}=await p.from("locations").insert({type:"bairro",name:E,parent_id:u});if(b){alert("Erro ao adicionar bairro.");return}h&&(h.value=""),await te()})}}async function be(){const e=document.getElementById("corretores-list");if(!e)return;const{data:t,error:n}=await p.from("profiles").select("*").order("created_at");if(n||!t){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=t.map(a=>{const o=(a.name||"?")[0].toUpperCase(),s=a.avatar_url?`<img src="${a.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${f(o)}</div>`,l=a.id===(g==null?void 0:g.id),d=a.active!==!1,i=d?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',m=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${a.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${a.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${a.role==="admin"?" selected":""}>Admin</option>
         </select>`,c=l?"":d?`<button class="corretor-toggle-btn" data-uid="${a.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${a.id}" data-active="false">Liberar acesso</button>`,v=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${a.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${s}
        <div>
          <div class="corretor-name">${f(a.name||"—")}</div>
          <div class="corretor-role-badge">${a.role==="super_admin"?"⚡ Super Admin":a.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${i}
        ${m}
        ${c}
        ${v}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(a=>{a.addEventListener("change",async()=>{await p.from("profiles").update({role:a.value}).eq("id",a.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.uid,s=a.dataset.active==="true";a.disabled=!0,a.textContent="Aguarde…";try{const l=await Se({action:"toggle",userId:o,active:!s});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await be()})}),e.querySelectorAll(".corretor-del-btn").forEach(a=>{a.addEventListener("click",async()=>{var l,d;const o=a.dataset.uid,s=((d=(l=a.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:d.textContent)||"este corretor";if(confirm(`Excluir "${s}"? Esta ação não pode ser desfeita.`)){a.disabled=!0;try{const i=await Se({action:"delete",userId:o});i.success||alert("Erro ao excluir: "+(i.error||"Falha desconhecida"))}catch(i){alert("Erro: "+i.message)}await be()}})})}async function Ze(){const{data:e,error:t}=await p.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(oe=e||[],oe)}function V(){return oe.filter(e=>e.type==="cidade")}function Te(e){return oe.filter(t=>t.type==="bairro"&&t.parent_id===e)}function Me(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=V();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${f(a.name)}</option>`).join(""),t&&(e.value=t)}async function te(){await Ze();const e=V(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(s=>`
        <div class="loc-item">
          <span class="loc-item-name">${f(s.name)}</span>
          <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=oe.filter(s=>s.type==="bairro");n.innerHTML=o.length?o.map(s=>{const l=e.find(d=>d.id===s.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${f(s.name)}</div>
              ${l?`<div class="loc-item-sub">${f(l.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${s.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(s=>`<option value="${s.id}">${f(s.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{const l=s.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${l}" e todos os bairros vinculados?`))return;const{error:d}=await p.from("locations").delete().eq("id",s.dataset.id);if(d){alert("Erro ao excluir.");return}await te(),Me()})}),n.querySelectorAll(".loc-del-btn").forEach(s=>{s.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:l}=await p.from("locations").delete().eq("id",s.dataset.id);if(l){alert("Erro ao excluir.");return}await te()})})}function ze(){var n,a,o,s,l,d,i,m,c,v,r,y,u,h,E,b,w,x,S,_;document.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{const B=I.closest(".filter-btns"),L=I.classList.contains("active");B.querySelectorAll(".filter-btn").forEach(k=>k.classList.remove("active")),L||I.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var C;const I=(C=document.getElementById("f-city"))==null?void 0:C.value,B=V().find(M=>M.name===I),L=B?Te(B.id):[],k=document.getElementById("f-neighborhood");k&&(k.innerHTML='<option value="">Todos</option>'+L.map(M=>`<option value="${M.name}">${f(M.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{le(qe($))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach(k=>{const C=document.getElementById(k);C&&(C.value="")}),["f-type","f-city","f-construction","f-published"].forEach(k=>{const C=document.getElementById(k);C&&(C.value="")});const L=document.getElementById("f-neighborhood");L&&(L.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach(k=>k.classList.remove("active")),le($)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{O(I.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{O(I.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),(s=document.getElementById("modal-close"))==null||s.addEventListener("click",ue),(l=document.getElementById("modal-cancel"))==null||l.addEventListener("click",ue),(d=document.getElementById("property-modal"))==null||d.addEventListener("click",I=>{I.target.id==="property-modal"&&ue()}),(i=document.getElementById("btn-new-property"))==null||i.addEventListener("click",()=>{N=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",z="",ge([]),Be("Novo Imóvel")}),(m=document.getElementById("logout-btn"))==null||m.addEventListener("click",async()=>{await p.auth.signOut(),location.reload()}),(c=document.getElementById("view-prev"))==null||c.addEventListener("click",()=>{R=(R-1+j.length)%j.length,fe()}),(v=document.getElementById("view-next"))==null||v.addEventListener("click",()=>{R=(R+1)%j.length,fe()}),(r=document.getElementById("view-modal-close"))==null||r.addEventListener("click",me),(y=document.getElementById("view-modal-close2"))==null||y.addEventListener("click",me),(u=document.getElementById("view-modal"))==null||u.addEventListener("click",I=>{I.target.id==="view-modal"&&me()}),(h=document.getElementById("view-modal-share"))==null||h.addEventListener("click",()=>{const I=document.getElementById("share-panel");if(!I)return;const B=I.style.display!=="none";I.style.display=B?"none":"block"}),(E=document.getElementById("share-whatsapp"))==null||E.addEventListener("click",()=>{var k,C;const I=(k=document.getElementById("share-link-input"))==null?void 0:k.value;if(!I)return;const B=((C=document.getElementById("view-modal-title"))==null?void 0:C.textContent)||"Imóvel",L=encodeURIComponent("Olha esse imóvel que encontrei: "+B+`
`+I);window.open("https://wa.me/?text="+L,"_blank")}),(b=document.getElementById("share-instagram"))==null||b.addEventListener("click",()=>{var B,L;const I=(B=document.getElementById("share-link-input"))==null?void 0:B.value;I&&((L=navigator.clipboard)==null||L.writeText(I),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(w=document.getElementById("share-email"))==null||w.addEventListener("click",()=>{var C,M;const I=(C=document.getElementById("share-link-input"))==null?void 0:C.value;if(!I)return;const B=((M=document.getElementById("view-modal-title"))==null?void 0:M.textContent)||"Imóvel",L=encodeURIComponent("Imóvel: "+B),k=encodeURIComponent(`Olá! Segue o link do imóvel:

`+I);window.open("mailto:?subject="+L+"&body="+k,"_blank")}),(x=document.getElementById("share-copy"))==null||x.addEventListener("click",()=>{var B;const I=document.getElementById("share-link-input");I&&((B=navigator.clipboard)==null||B.writeText(I.value).then(()=>{const L=document.getElementById("share-copy"),k=L.textContent;L.textContent="✅ Copiado!",setTimeout(()=>{L.textContent=k},2e3)}))}),(S=document.getElementById("view-modal-edit"))==null||S.addEventListener("click",()=>{var Ne;if((g==null?void 0:g.role)!=="admin")return;const I=document.getElementById("view-modal-title").textContent,B=$.find(ce=>ce.title===I);if(!B)return;me(),N=B.id;const L=document.getElementById("property-form"),k=document.getElementById("form-submit-btn");k.textContent="Salvar Alterações",L.querySelector('[name="title"]').value=B.title||"",L.querySelector('[name="rua"]').value=B.rua||"",L.querySelector('[name="numero"]').value=B.numero||"",L.querySelector('[name="city"]').value=B.city||"",L.querySelector('[name="price"]').value=B.price||"",L.querySelector('[name="bedrooms"]').value=B.bedrooms||"",L.querySelector('[name="suites"]').value=B.suites||"",L.querySelector('[name="parking"]').value=B.parking||"",L.querySelector('[name="description"]').value=B.description||"",L.querySelector('[name="construction_status"]').value=B.construction_status||"",L.querySelector('[name="owner_name"]').value=B.owner_name||"",L.querySelector('[name="owner_phone"]').value=B.owner_phone||"",L.querySelector('[name="owner_email"]').value=B.owner_email||"",L.querySelector('[name="owner_notes"]').value=B.owner_notes||"",L.querySelector('[name="condominium"]').value=B.condominium||"";const C=document.getElementById("adminPublished");C&&(C.value=B.published===!0?"true":"false");const M=document.getElementById("adminCitySelect");M&&(M.value=B.city||"",M.dispatchEvent(new Event("change")),setTimeout(()=>{const ce=document.getElementById("adminNeighborhood");ce&&(ce.value=B.neighborhood||"")},50)),z=B.cover_image||((Ne=B.images)==null?void 0:Ne[0])||"",ge(B.images||[]),Be("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(I=>{I.addEventListener("click",()=>{var B;document.querySelectorAll(".tab-btn").forEach(L=>L.classList.remove("active")),I.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(L=>L.classList.add("hidden")),(B=document.getElementById(`tab-${I.dataset.tab}`))==null||B.classList.remove("hidden")})}),(_=document.getElementById("admin-properties"))==null||_.addEventListener("click",I=>{if(I.target.closest(".action-btns"))return;const B=I.target.closest("tr");if(!B)return;const L=Number(B.dataset.id);if(!L)return;const k=$.find(C=>C.id===L);k&&yt(k)})}document.addEventListener("DOMContentLoaded",async()=>{var s,l,d;await Promise.all([et(),Ze()]),G=D("company.whatsapp",G),ne=`https://wa.me/${G}`,_e(),vt(),pt();const e=document.getElementById("adminCitySelect"),t=document.getElementById("adminNeighborhood");e&&t&&(Me(),e.addEventListener("change",()=>{const i=V().find(c=>c.name===e.value),m=i?Te(i.id):[];t.innerHTML='<option value="">Selecione a cidade primeiro</option>'+m.map(c=>`<option value="${c.name}">${f(c.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),a=document.getElementById("admin-root");if(n){const i=new URLSearchParams(window.location.hash.replace("#","")),m=new URLSearchParams(window.location.search),c=i.get("type")||m.get("type")||"",v=We||c==="recovery"||c==="invite"||window.location.hash.includes("access_token")||m.has("code"),r=document.getElementById("password-reset-overlay");if(v){n.style.display="none",a&&a.classList.add("hidden"),r&&(r.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async u=>{var S,_;u.preventDefault();const h=((S=document.getElementById("new-password"))==null?void 0:S.value)||"",E=((_=document.getElementById("confirm-password"))==null?void 0:_.value)||"",b=document.getElementById("password-reset-msg"),w=u.target.querySelector('button[type="submit"]');if(b&&(b.style.display="none"),h!==E){b&&(b.textContent="As senhas não coincidem.",b.style.display="");return}w&&(w.disabled=!0,w.textContent="Salvando…");const{error:x}=await p.auth.updateUser({password:h});if(x){b&&(b.textContent="Erro: "+x.message,b.style.display=""),w&&(w.disabled=!1,w.textContent="Definir Senha");return}window.location.href=window.location.pathname}),m.has("code")&&await p.auth.exchangeCodeForSession(m.get("code")??"");return}const{data:{session:y}}=await p.auth.getSession();if(y){if(n.classList.add("hidden"),a&&a.classList.remove("hidden"),await pe(),Ie(),ze(),bt(),window.lucide&&lucide.createIcons(),g=await He(y.user.id),!g){await p.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden");return}if(g.active===!1){await p.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(g.needs_password_reset){n.style.display="none",a&&a.classList.add("hidden");const u=document.getElementById("password-reset-overlay");u&&(u.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async h=>{var _,I;h.preventDefault();const E=((_=document.getElementById("new-password"))==null?void 0:_.value)||"",b=((I=document.getElementById("confirm-password"))==null?void 0:I.value)||"",w=document.getElementById("password-reset-msg"),x=h.target.querySelector('button[type="submit"]');if(w&&(w.style.display="none"),E!==b){w&&(w.textContent="As senhas não coincidem.",w.style.display="");return}if(E.length<6){w&&(w.textContent="Mínimo 6 caracteres.",w.style.display="");return}x&&(x.disabled=!0,x.textContent="Salvando…");const{error:S}=await p.auth.updateUser({password:E});if(S){w&&(w.textContent="Erro: "+S.message,w.style.display=""),x&&(x.disabled=!1,x.textContent="Definir Senha");return}await p.from("profiles").update({needs_password_reset:!1}).eq("id",g.id),window.location.href=window.location.pathname});return}xe(g),Ue(g.role),await Fe(g),window.lucide&&lucide.createIcons(),kt()}else{a&&a.classList.add("hidden"),n.classList.remove("hidden");const u=document.getElementById("login-form");u&&((d=document.getElementById("forgot-password-btn"))==null||d.addEventListener("click",async()=>{var b,w;const h=(w=(b=u.querySelector('input[name="email"]'))==null?void 0:b.value)==null?void 0:w.trim();if(!h){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:E}=await p.auth.resetPasswordForEmail(h,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(E?"Erro: "+E.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),u.addEventListener("submit",async h=>{h.preventDefault();const E=new FormData(u),b=E.get("email"),w=E.get("password");if(await rt(b,w)){n.classList.add("hidden"),a&&a.classList.remove("hidden"),await pe(),Ie(),ze(),window.lucide&&lucide.createIcons();const{data:{session:S}}=await p.auth.getSession();if(g=S?await He(S.user.id):null,!g){await p.auth.signOut();return}if(g.active===!1){await p.auth.signOut(),n.classList.remove("hidden"),a&&a.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}xe(g),Ue(g.role),await Fe(g),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}))}}else Ie();await ie();const o=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();tt(o),at(G)});async function At(){const e=$.filter(o=>!o.reference);if(!e.length)return;const t=$.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,s)=>o.id-s.id);for(const o of a){const s="IO-"+String(n).padStart(4,"0"),{error:l}=await p.from("properties").update({reference:s}).eq("id",o.id);if(!l){const d=$.findIndex(i=>i.id===o.id);d>=0&&($[d].reference=s),n++}}le(qe($))}async function Nt(){const e=$.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(s=>!s.includes("/wm-")))continue;const a=[];let o=!1;for(const s of t.images)if(s.includes("/wm-"))a.push(s);else try{const l=await Rt(s);a.push(l),o=!0}catch{a.push(s)}if(o){await p.from("properties").update({images:a}).eq("id",t.id);const s=$.findIndex(l=>l.id===t.id);s>=0&&($[s].images=a)}}le(qe($))}}async function Rt(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),s=o.ok?await o.blob():null,l=s?URL.createObjectURL(s):null;return new Promise(d=>{const i=new Image;i.onload=()=>{URL.revokeObjectURL(a);const m=document.createElement("canvas"),c=1200;let v=i.width,r=i.height;v>c&&(r=Math.round(r*c/v),v=c),m.width=v,m.height=r;const y=m.getContext("2d");y.drawImage(i,0,0,v,r);const u=h=>{if(h){const E=Math.round(v*.18),b=Math.round(h.naturalHeight*E/h.naturalWidth),w=Math.round(v*.02);y.globalAlpha=.45,y.drawImage(h,v-E-w,r-b-w,E,b),y.globalAlpha=1}m.toBlob(async E=>{try{const b=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:w}=await p.storage.from("imoveis").upload(b,E,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(w){console.error("Upload watermark error:",w),d(e);return}const{data:{publicUrl:x}}=p.storage.from("imoveis").getPublicUrl(b);d(x)}catch(b){console.error("Watermark upload exception:",b),d(e)}},"image/jpeg",.82)};if(l){const h=new Image;h.onload=()=>{URL.revokeObjectURL(l),u(h)},h.onerror=()=>{URL.revokeObjectURL(l),u(null)},h.src=l}else u(null)},i.onerror=()=>{URL.revokeObjectURL(a),d(e)},i.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function T(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function Ae(e,t="assets"){const n=await Ce(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await p.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:s}}=p.storage.from("imoveis").getPublicUrl(a);return s}async function Ht(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await p.from("settings").select("key,value"),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>f(String(n[o]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const s=o.target.files[0];if(s)try{const l=await Ae(s,"logos");document.getElementById("co-logo-url").value=l,document.getElementById("co-logo-preview").src=l}catch(l){alert("Erro no upload: "+l.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const s=await W([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);s&&_e(),o.disabled=!1,o.textContent="Salvar Identidade",T(document.getElementById("co-identity-msg"),s)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const s=document.getElementById("co-whatsapp").value.trim(),l=await W([["company.whatsapp",s],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);l&&s&&(G=s,ne=`https://wa.me/${s}`),o.disabled=!1,o.textContent="Salvar Contatos",T(document.getElementById("co-contacts-msg"),l)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const s=await W([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",T(document.getElementById("co-social-msg"),s)})}async function Ut(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await p.from("settings").select("key,value"),n={};t==null||t.forEach(c=>{n[c.key]=c.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",s=n["visual.secondary_bg"]||"#1a2f4a",l=n["visual.hero_bg_url"]||"",d=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${f(l)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <div id="vis-hero-preview" style="margin-top:10px;display:${l?"":"none"}">
          <img src="${f(l)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function i(c,v,r){const y=document.getElementById(c),u=document.getElementById(v);y==null||y.addEventListener("input",h=>{u.value=h.target.value,r()}),u==null||u.addEventListener("input",h=>{/^#[0-9a-fA-F]{6}$/.test(h.target.value)&&(y.value=h.target.value,r())})}function m(){var v,r,y,u;const c=((v=document.getElementById("col-accent-hex"))==null?void 0:v.value)||"#b8962e";(r=document.getElementById("vp-bar"))==null||r.style.setProperty("background",c),(y=document.getElementById("vp-dot"))==null||y.style.setProperty("background",c),(u=document.getElementById("vp-btn"))==null||u.style.setProperty("background",c),document.documentElement.style.setProperty("--accent",c)}i("col-accent","col-accent-hex",m),i("col-primary","col-primary-hex",()=>{}),i("col-secondary","col-secondary-hex",()=>{}),m(),document.getElementById("vis-hero-file").addEventListener("change",async c=>{const v=c.target.files[0];if(v)try{const r=await Ae(v,"hero");document.getElementById("vis-hero-url").value=r;const y=document.getElementById("vis-hero-preview");y.innerHTML=`<img src="${r}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,y.style.display=""}catch(r){alert("Erro no upload: "+r.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const c=document.getElementById("visual-save-colors");c.disabled=!0,c.textContent="Salvando…";const v=await W([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);v&&_e(),c.disabled=!1,c.textContent="Salvar Cores",T(document.getElementById("visual-colors-msg"),v)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",m())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const c=document.getElementById("visual-save-images");c.disabled=!0,c.textContent="Salvando…";const v=await W([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);c.disabled=!1,c.textContent="Salvar Imagens",T(document.getElementById("visual-images-msg"),v)})}async function jt(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await p.from("site_content").select("*"),n={};t==null||t.forEach(i=>{n[i.key]=i});const a=(i,m)=>{var c;return f(((c=n[i])==null?void 0:c[`value_${m}`])||"")},o=["pt","en","es"],s={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},l=i=>o.map(m=>`<button class="content-tab${m===i?" active":""}" data-lang="${m}">${s[m]}</button>`).join(""),d=i=>`
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
  `,document.getElementById("sc-tabs").addEventListener("click",i=>{var c;const m=i.target.closest(".content-tab");m&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(v=>v.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(v=>v.classList.remove("active")),m.classList.add("active"),(c=document.querySelector(`#sc-panels [data-panel="${m.dataset.lang}"]`))==null||c.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const i=document.getElementById("sc-save-btn");i.disabled=!0,i.textContent="Salvando…";const m={};document.querySelectorAll(".sc-field").forEach(v=>{const r=v.dataset.key,y=v.dataset.lang;m[r]||(m[r]={}),m[r][y]=v.value});let c=!0;for(const[v,r]of Object.entries(m))await Ee(v,{pt:r.pt,en:r.en,es:r.es})||(c=!1);i.disabled=!1,i.textContent="Salvar Conteúdo",T(document.getElementById("sc-save-msg"),c)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const i=document.getElementById("seo-save-btn");i.disabled=!0,i.textContent="Salvando…";const m=document.getElementById("seo-title").value.trim(),c=document.getElementById("seo-desc").value.trim(),v=await Ee("seo.title_pt",{pt:m,en:m,es:m})&&await Ee("seo.description_pt",{pt:c,en:c,es:c});i.disabled=!1,i.textContent="Salvar SEO",T(document.getElementById("seo-save-msg"),v)})}async function Pt(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await U())}async function U(){const e=document.getElementById("crm-body");if(!e)return;const[{data:t},{data:n},{data:a},{data:o}]=await Promise.all([p.from("crm_pipelines").select("*").order("sort_order"),p.from("crm_stages").select("*").order("sort_order"),p.from("crm_tags").select("*").order("name"),p.from("crm_lead_statuses").select("*").order("sort_order")]),s=t||[],l=s.find(r=>r.is_default)||s[0],d=s.map(r=>`<option value="${r.id}"${r.id===(l==null?void 0:l.id)?" selected":""}>${f(r.name)}</option>`).join(""),m=(n||[]).filter(r=>r.pipeline_id===(l==null?void 0:l.id)).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${f(r.name)}</span>
      <input type="color" value="${r.color}" data-sid="${r.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${r.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',c=(a||[]).map(r=>`<span class="tag-chip" style="background:${r.color}" data-id="${r.id}">
      ${f(r.name)}
      <button class="tag-chip-del" data-id="${r.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',v=(o||[]).map(r=>`
    <div class="stage-item" data-id="${r.id}">
      <div class="stage-color-dot" style="background:${r.color}"></div>
      <span class="stage-name">${f(r.name)}</span>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const r=document.getElementById("crm-new-stage").value.trim(),y=document.getElementById("crm-new-stage-color").value,u=parseInt(document.getElementById("crm-pipe-sel").value,10);r&&(await p.from("crm_stages").insert({pipeline_id:u,name:r,color:y,sort_order:99}),document.getElementById("crm-new-stage").value="",await U())}),e.querySelectorAll(".stage-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await p.from("crm_stages").delete().eq("id",r.dataset.id),await U())})}),e.querySelectorAll(".stage-color-pick").forEach(r=>{r.addEventListener("change",async y=>{await p.from("crm_stages").update({color:y.target.value}).eq("id",r.dataset.sid);const u=r.closest(".stage-item").querySelector(".stage-color-dot");u&&(u.style.background=y.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const r=document.getElementById("crm-new-tag").value.trim(),y=document.getElementById("crm-new-tag-color").value;r&&(await p.from("crm_tags").insert({name:r,color:y}),document.getElementById("crm-new-tag").value="",await U())}),e.querySelectorAll(".tag-chip-del").forEach(r=>{r.addEventListener("click",async()=>{await p.from("crm_tags").delete().eq("id",r.dataset.id),await U()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const r=document.getElementById("crm-new-status").value.trim(),y=document.getElementById("crm-new-status-color").value,u=document.getElementById("crm-new-status-final").checked;r&&(await p.from("crm_lead_statuses").insert({name:r,color:y,is_final:u,sort_order:99}),document.getElementById("crm-new-status").value="",await U())}),e.querySelectorAll(".status-del").forEach(r=>{r.addEventListener("click",async()=>{confirm("Remover este status?")&&(await p.from("crm_lead_statuses").delete().eq("id",r.dataset.id),await U())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var y;const r=(y=prompt("Nome do novo funil:"))==null?void 0:y.trim();r&&(await p.from("crm_pipelines").insert({name:r,sort_order:99}),await U())})}async function Ot(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await p.from("integrations").select("*"),n={};t==null||t.forEach(d=>{n[d.key]=d});const a=d=>{var i;return f(((i=n[d])==null?void 0:i.value)||"")},o=d=>{var i;return(i=n[d])!=null&&i.enabled?"checked":""},s=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],l=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var v;const d=document.getElementById("intg-save-tracking");d.disabled=!0,d.textContent="Salvando…";let i=!0;const m=document.querySelectorAll(".intg-val"),c=document.querySelectorAll(".intg-toggle");for(let r=0;r<m.length;r++){const y=m[r].dataset.key,u=m[r].value.trim(),h=((v=c[r])==null?void 0:v.checked)??!1;await we(y,u,h)||(i=!1)}d.disabled=!1,d.textContent="Salvar Integrações",T(document.getElementById("intg-tracking-msg"),i)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const d=document.getElementById("intg-save-smtp");d.disabled=!0,d.textContent="Salvando…";const i=document.querySelectorAll(".smtp-field");let m=!0;for(const v of i)await we(v.dataset.key,v.value.trim(),!0)||(m=!1);const c=document.getElementById("smtp-pass").value;c&&(await we("smtp_pass",c,!0)||(m=!1)),d.disabled=!1,d.textContent="Salvar SMTP",T(document.getElementById("intg-smtp-msg"),m)})}async function Dt(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await $e(),document.getElementById("media-file-input").addEventListener("change",async n=>{var i,m;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),s=document.getElementById("media-progress-fill"),l=document.getElementById("media-progress-text");o.style.display="";let d=0;for(const c of a){l.textContent=`Enviando ${d+1}/${a.length}…`,s.style.width=`${Math.round(d/a.length*100)}%`;try{const v=await Ae(c,"media"),r=c.name.replace(/\.[^.]+$/,"").slice(0,60);await p.from("media_library").insert({name:r,url:v,type:"image",size:c.size,created_by:(m=(i=(await p.auth.getUser()).data)==null?void 0:i.user)==null?void 0:m.id})}catch(v){console.error("Media upload error:",v)}d++}s.style.width="100%",l.textContent=`✓ ${d} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",s.style.width="0"},2e3),await $e(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function $e(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await p.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${f(a.url)}">
      <img src="${f(a.url)}" alt="${f(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${f(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${f(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var s;o.stopPropagation(),(s=navigator.clipboard)==null||s.writeText(a.dataset.url).then(()=>{const l=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=l},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await p.from("media_library").delete().eq("id",a.dataset.id),await $e())})})}async function Ft(){var t,n,a,o,s;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(i=>i.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(i=>i.classList.add("hidden")),l.classList.add("active");const d=e.querySelector(`#sa-panel-${l.dataset.tab}`);d&&d.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&ae(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&zt(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&Xe(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&Ve(),l.dataset.tab==="platform"&&Ge()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",Xe),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",ae),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",Ve),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>Vt()),(s=e.querySelector("#sa-plat-save"))==null||s.addEventListener("click",Xt),ae(),Ge())}async function ae(){var d,i;const e=document.getElementById("sa-tenants-list"),t=((i=(d=document.getElementById("sa-tenant-search"))==null?void 0:d.value)==null?void 0:i.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=p.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const s=(a||[]).filter(m=>{var c,v;return!t||((c=m.name)==null?void 0:c.toLowerCase().includes(t))||((v=m.slug)==null?void 0:v.toLowerCase().includes(t))});if(!s.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const l=m=>m.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=s.map(m=>{var c;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        ${m.logo_url?`<img class="sa-tenant-logo" src="${f(m.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${f(m.name||"—")}</div>
          <div class="sa-list-sub">${f(m.slug||"")} · ${f(((c=m.plans)==null?void 0:c.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${l(m)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${m.id}" data-active="${m.active}" title="${m.active?"Desativar":"Ativar"}">${m.active?"⏸️":"▶️"}</button>
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${m.id}" title="Editar">✏️</button>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(m=>{m.addEventListener("click",async()=>{const c=m.dataset.active==="true";await p.from("tenants").update({active:!c}).eq("id",m.dataset.id),ae()})})}async function zt(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await p.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${f(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function Xe(){var d;const e=document.getElementById("sa-subs-list"),t=((d=document.getElementById("sa-sub-filter"))==null?void 0:d.value)||"";if(!e)return;e.dataset.loaded="1";let n=p.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const s={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},l={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(i=>{var m,c,v;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${f(((m=i.tenants)==null?void 0:m.name)||"—")}</div>
          <div class="sa-list-sub">${f(((c=i.plans)==null?void 0:c.name)||"—")} · R$ ${Number(((v=i.plans)==null?void 0:v.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${s[i.status]||"gray"}">${l[i.status]||i.status}</span>
        <span class="sa-list-date">${i.current_period_end?new Date(i.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function Ve(){var l,d;const e=document.getElementById("sa-users-list"),t=((d=(l=document.getElementById("sa-user-search"))==null?void 0:l.value)==null?void 0:d.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await p.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(i=>{var m,c;return!t||((m=i.name)==null?void 0:m.toLowerCase().includes(t))||((c=i.email)==null?void 0:c.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const s={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(i=>{var m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(i.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${f(i.name||"—")}</div>
          <div class="sa-list-sub">${f(((m=i.tenants)==null?void 0:m.name)||"Sem imobiliária")} · ${s[i.role]||i.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${i.active!==!1?"sa-badge-green":"sa-badge-red"}">${i.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function Ge(){const[e,t,n,a]=await Promise.all([p.from("tenants").select("id",{count:"exact",head:!0}),p.from("profiles").select("id",{count:"exact",head:!0}),p.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),p.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(s,l)=>{const d=document.getElementById(s);d&&(d.textContent=l??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function Xt(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await W([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),T(t,!0)}function Vt(){var a,o,s,l,d;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),p.from("plans").select("id, name").then(({data:i})=>{const m=document.getElementById("nt-plan");m&&i&&(m.innerHTML=i.map(c=>`<option value="${c.id}">${f(c.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",i=>{const m=document.getElementById("nt-slug");m&&!m.dataset.manual&&(m.value=i.target.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",i=>{i.target.dataset.manual="1"});const n=()=>t.remove();(s=document.getElementById("sa-modal-close-btn"))==null||s.addEventListener("click",n),(l=document.getElementById("nt-cancel"))==null||l.addEventListener("click",n),t.addEventListener("click",i=>{i.target===t&&n()}),(d=document.getElementById("nt-save"))==null||d.addEventListener("click",async()=>{var h,E,b,w,x,S,_;const i=(E=(h=document.getElementById("nt-name"))==null?void 0:h.value)==null?void 0:E.trim(),m=(w=(b=document.getElementById("nt-slug"))==null?void 0:b.value)==null?void 0:w.trim(),c=(S=(x=document.getElementById("nt-domain"))==null?void 0:x.value)==null?void 0:S.trim(),v=(_=document.getElementById("nt-plan"))==null?void 0:_.value,r=document.getElementById("nt-msg"),y=document.getElementById("nt-save");if(!i||!m){T(r,!1),r.textContent="Nome e slug são obrigatórios.";return}y&&(y.disabled=!0,y.textContent="Criando…");const{error:u}=await p.from("tenants").insert({name:i,slug:m,domain:c||null,plan_id:v||null,active:!0});if(y&&(y.disabled=!1,y.textContent="Criar Imobiliária"),u){T(r,!1),r.textContent=u.message;return}T(r,!0),setTimeout(()=>{n(),ae()},800)})}
