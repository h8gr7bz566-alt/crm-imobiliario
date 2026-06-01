import{s as y}from"./supabase-BcuJ3xoD.js";const O="00000000-0000-0000-0000-000000000000";let se={},he={},ee=O;function ve(e){ee=e||O,se={},he={}}const z=()=>ee;async function Mt(){const[e,t]=await Promise.all([y.from("settings").select("key,value").eq("tenant_id",ee),y.from("site_content").select("*").eq("tenant_id",ee)]);if(e.data&&e.data.forEach(n=>{se[n.key]=n.value}),t.data&&t.data.forEach(n=>{he[n.key]=n}),(!t.data||t.data.length===0)&&ee!==O){const[n,a]=await Promise.all([y.from("settings").select("key,value").eq("tenant_id",O),y.from("site_content").select("*").eq("tenant_id",O)]);n.data&&n.data.forEach(o=>{se[o.key]===void 0&&(se[o.key]=o.value)}),a.data&&a.data.forEach(o=>{he[o.key]||(he[o.key]=o)})}}const G=(e,t=null)=>se[e]!==void 0?se[e]:t,ke=(e,t="pt")=>{const n=he[e];return n&&(n["value_"+t]||n.value_pt)||null};async function xe(e){const t=new Date().toISOString(),n=e.map(([o,i])=>({key:o,value:i,tenant_id:ee,updated_at:t})),{error:a}=await y.from("settings").upsert(n,{onConflict:"key,tenant_id"});return a||e.forEach(([o,i])=>{se[o]=i}),!a}async function Ae(e,{pt:t,en:n,es:a}){const o=new Date().toISOString(),i={key:e,value_pt:t,value_en:n,value_es:a,tenant_id:ee,updated_at:o},{error:d}=await y.from("site_content").upsert(i,{onConflict:"key,tenant_id"});return d||(he[e]=i),ee!==O&&await y.from("site_content").upsert({key:e,value_pt:t,value_en:n,value_es:a,tenant_id:O,updated_at:o},{onConflict:"key,tenant_id"}),!d}async function Pe(e,t,n){const{error:a}=await y.from("integrations").upsert({key:e,value:t,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!a}function tt(){const e=document.documentElement,t=G("visual.accent_color","#b8962e"),n=G("visual.primary_bg","#0f1c2e"),a=G("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",t),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",a);const o=G("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(s=>{s.src=o});const i=G("company.favicon_url","/favicon.ico"),d=document.querySelector('link[rel="shortcut icon"]');d&&(d.href=i);const l=G("visual.hero_bg_url","");if(l){const s=document.querySelector(".hero, .hero-v2");s&&(s.style.backgroundImage="url('"+l+"')")}}function rt(e){e=e||"pt";const t=h=>ke(h,e)||"",n=document.querySelector('[data-i18n="hero.title"]');n&&t("hero.title")&&(n.innerHTML=t("hero.title"));const a=document.querySelector('[data-i18n="hero.subtitle"]')||document.querySelector(".hero-content > p");a&&t("hero.subtitle")&&(a.innerHTML=t("hero.subtitle"));const o=document.querySelector(".footer small, footer small");o&&t("footer.text")&&(o.innerHTML=t("footer.text"));const i=document.querySelector('[data-i18n="inst.p1"]'),d=document.querySelector('[data-i18n="inst.p2"]'),l=document.querySelector('[data-i18n="inst.p3"]');i&&t("inst.bio_p1")&&(i.innerHTML=t("inst.bio_p1")),d&&t("inst.bio_p2")&&(d.innerHTML=t("inst.bio_p2")),l&&t("inst.bio_p3")&&(l.innerHTML=t("inst.bio_p3"));const s=document.querySelector('[data-i18n="inst.stat1_num"]'),m=document.querySelector('[data-i18n="inst.stat2_num"]')||document.querySelector('[data-i18n-num="inst.stat2num"]'),r=document.querySelector('[data-i18n="inst.stat3_num"]'),c=document.querySelector('[data-i18n="inst.stat1_label"]')||document.querySelector('[data-i18n="inst.stat1"]'),p=document.querySelector('[data-i18n="inst.stat2_label"]')||document.querySelector('[data-i18n="inst.stat2"]'),u=document.querySelector('[data-i18n="inst.stat3_label"]')||document.querySelector('[data-i18n="inst.stat3"]');s&&t("inst.stat1_num")&&(s.innerHTML=t("inst.stat1_num")),m&&t("inst.stat2_num")&&(m.innerHTML=t("inst.stat2_num")),r&&t("inst.stat3_num")&&(r.innerHTML=t("inst.stat3_num")),c&&t("inst.stat1_label")&&(c.innerHTML=t("inst.stat1_label")),p&&t("inst.stat2_label")&&(p.innerHTML=t("inst.stat2_label")),u&&t("inst.stat3_label")&&(u.innerHTML=t("inst.stat3_label"));const b=document.getElementById("dep-grid");if(b){const h=ke("testimonials",e)||ke("testimonials","pt");if(h)try{const v=JSON.parse(h);if(Array.isArray(v)&&v.length>0){let k=function($){return String($||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},S=function($){let w=0;for(const I of $||"?")w=w*31+I.charCodeAt(0)&4294967295;return B[Math.abs(w)%B.length]};const B=["#0d2144","#1a3a5c","#0a1628","#164a3c","#2d1b3d","#3d1a1a","#1a2f4a"];b.innerHTML=v.map($=>`
            <div class="dep-card-v2">
              <div class="dep-stars-v2">${"★".repeat($.stars||5)}</div>
              <p class="dep-text-v2">"${k($.text)}"</p>
              <div class="dep-author-v2">
                <div class="dep-avatar-v2" style="background:${S($.name)}">${($.name||"?")[0].toUpperCase()}</div>
                <div>
                  <div class="dep-name-v2">${k($.name)}</div>
                  <div class="dep-role-v2">${k($.role)}</div>
                </div>
              </div>
            </div>`).join("")}}catch{}}const x=ke("seo.title_pt",e);x&&(document.title=x);const E=ke("seo.description_pt",e);if(E){const h=document.querySelector('meta[name="description"]');h&&(h.content=E)}}function ct(e){if(!e)return;const t="https://wa.me/"+e;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const a=n.getAttribute("href");if(a){const o=a.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=t+o}})}const zt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let le="5547999701743";const ne=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],Nt=5.7;function re(e,t){if(!e)return"—";const n=String(e).trim();let a;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?a=parseFloat(n.replace(/\./g,"").replace(",",".")):a=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(a)||a===0?n:t==="en"?"$ "+(a/Nt).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+a.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let _=[],f=null,_e=[],It=!1;y.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(It=!0)});function Xe(e,t,n){try{localStorage.setItem(e,JSON.stringify({v:t,exp:Date.now()+n}))}catch{}}function Me(e){try{const t=localStorage.getItem(e);if(!t)return null;const n=JSON.parse(t);return Date.now()>n.exp?(localStorage.removeItem(e),null):n.v}catch{return null}}async function $t({background:e=!1}={}){const t=window.location.hostname;if(t==="localhost"||t==="127.0.0.1"){const{data:r,error:c}=await y.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return c&&console.error("Supabase select error:",c),r||[]}const a=`imobi_tenant_${t.replace(/^www\./,"")}`;let o=z();if(!o||o===O){const r=Me(a);if(r)o=r,ve(o);else{const c=t.replace(/^www\./,"");for(const p of[c,"www."+c]){const{data:u}=await y.from("tenants").select("id").eq("domain",p).maybeSingle();if(u!=null&&u.id){o=u.id,ve(o);break}}o&&o!==O&&Xe(a,o,24*60*60*1e3)}}if(!o||o===O)return console.warn("[ImobiCRM] Tenant não encontrado para domínio:",t),[];const i=`imobi_props_${o}`,d=5*60*1e3;if(!e){const r=Me(i);if(r)return setTimeout(()=>$t({background:!0}),100),r}const{data:l,error:s}=await y.from("properties").select("*").eq("published",!0).eq("tenant_id",o).order("created_at",{ascending:!1});if(s)return console.error("Supabase select error:",s),Me(i)||[];const m=l||[];return Xe(i,m,d),e&&typeof ce=="function"&&ce().catch(()=>{}),m}async function jt(){let e=y.from("properties").select("*").order("created_at",{ascending:!1});(f==null?void 0:f.role)==="super_admin"||(f!=null&&f.tenant_id?e=e.eq("tenant_id",f.tenant_id):e=e.or("tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000"));const{data:t,error:n}=await e;return n?(console.error("Supabase select error:",n),[]):(_=t||[],ga(),fa(),_)}async function Rt(e){if(e.id){const{id:t,created_at:n,...a}=e,{error:o}=await y.from("properties").update(a).eq("id",t);if(o)throw o;const i=_.findIndex(d=>d.id===t);i>=0&&(_[i]={..._[i],...a})}else{e.reference||(e.reference="IO-"+Date.now().toString(36).toUpperCase().slice(-5));const{data:t,error:n}=await y.from("properties").insert(e).select();if(n)throw n;t!=null&&t[0]&&_.unshift(t[0])}}async function Ht(e){const{error:t}=await y.from("properties").delete().eq("id",e);if(t)throw t;_=_.filter(n=>n.id!==e)}async function Ut(e,t){const{error:n}=await y.auth.signInWithPassword({email:e,password:t});return!n}function Te(e,t=1200,n=.78){return new Promise((a,o)=>{const i=new Image,d=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(d);const l=document.createElement("canvas");let s=i.width,m=i.height;s>t&&(m=Math.round(m*t/s),s=t),l.width=s,l.height=m;const r=l.getContext("2d");r.drawImage(i,0,0,s,m);const c=new Image;c.crossOrigin="anonymous",c.onload=()=>{const p=Math.round(s*.18),u=Math.round(c.naturalHeight*p/c.naturalWidth),b=Math.round(s*.02),x=s-p-b,E=m-u-b;r.globalAlpha=.45,r.drawImage(c,x,E,p,u),r.globalAlpha=1,l.toBlob(h=>h?a(h):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},c.onerror=()=>{l.toBlob(p=>p?a(p):o(new Error("Canvas toBlob falhou")),"image/jpeg",n)},c.src="/logo.png"},i.onerror=o,i.src=d})}async function Dt(e){const t=await Te(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:a}=await y.storage.from("imoveis").upload(n,t,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(a)throw a;const{data:{publicUrl:o}}=y.storage.from("imoveis").getPublicUrl(n);return o}async function Ot(e,t){const n=Array.from(e).filter(o=>o.size>0),a=[];for(let o=0;o<n.length;o++)t&&t(o+1,n.length),a.push(await Dt(n[o]));return a}async function ce(){var p,u,b,x,E,h;const e=document.getElementById("vendas-carousel"),t=document.getElementById("properties");if(!e&&!t)return;const n=await $t();_=n,((p=document.getElementById("selecao-carousel"))==null?void 0:p.innerHTML)===""&&Pt(n);const a=((u=document.getElementById("city-filter"))==null?void 0:u.value)||"",o=((b=document.getElementById("neighborhood-filter"))==null?void 0:b.value)||"",i=((x=document.getElementById("bedrooms-filter"))==null?void 0:x.value)||"",d=((E=document.getElementById("parking-filter"))==null?void 0:E.value)||"",l=((h=document.getElementById("construction-filter"))==null?void 0:h.value)||"",{min:s,max:m}=Xt(),r=n.filter(v=>{if(a&&v.city!==a||o&&v.neighborhood!==o||i&&(i==="4+"&&Number(v.bedrooms)<4||i!=="4+"&&Number(v.bedrooms)!==Number(i))||d&&(d==="4+"&&Number(v.parking)<4||d!=="4+"&&Number(v.parking)!==Number(d))||l&&v.construction_status!==l)return!1;const B=String(v.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),k=parseInt(B,10)||0;return!(k<s||m!==1/0&&k>m)});if(e){if(!r.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=r.map(v=>{var w;const B=v.cover_image||((w=v.images)==null?void 0:w[0])||ne[0],k=[v.neighborhood,v.city].filter(Boolean).join(", "),S=`https://omarcorretor.com.br/og/${v.id}`,$=encodeURIComponent(`Olá! Tenho interesse no imóvel *${v.title}*${v.reference?` (Ref: ${v.reference})`:""}. Poderia me dar mais informações?
${S}`);return`
        <div class="selecao-card">
          <div class="img-wm-wrap"><img src="${B}" alt="${g(v.title)}" class="selecao-card-img"></div>
          <div class="selecao-card-body">
            <div class="selecao-card-title">${g(v.title)}</div>
            <div class="selecao-card-loc">${g(k)}</div>
            <div class="selecao-card-price">${g(re(v.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${v.id}" class="btn-det">Ver Detalhes</a>
              <a href="https://wa.me/${le}?text=${$}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!r.length){t.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}t.innerHTML=r.map(v=>{var w;const B=(w=v.images)!=null&&w.length?v.images:ne,k=B.length,S=`https://omarcorretor.com.br/og/${v.id}`,$=encodeURIComponent(`Olá! Tenho interesse no imóvel *${v.title}*${v.reference?` (Ref: ${v.reference})`:""}. Poderia me dar mais informações?
${S}`);return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${k}" data-idx="0" data-pid="${v.id}" data-images="${encodeURIComponent(JSON.stringify(B))}">
          <img src="${v.cover_image||B[0]}" alt="${g(v.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${k>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${g(v.title)}</strong>
          <div class="muted">${g(v.neighborhood||"")}, ${g(v.city||"")}</div>
          <div><strong>${g(re(v.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${v.bedrooms||"--"} | 🚗 ${v.parking||"--"} ${k>1?"| 📸 "+k:""}</div>
          <p class="muted">${g((v.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${v.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="https://wa.me/${le}?text=${$}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const c=document.getElementById("properties");c&&!c._carouselDelegated&&(c._carouselDelegated=!0,c.addEventListener("click",Ft))}function Pt(e){var o,i,d;const t=document.getElementById("selecao-carousel");if(!t)return;const n=e.slice(0,6);if(!n.length){(o=t.closest(".selecao-section"))==null||o.classList.add("hidden");return}t.innerHTML=n.map(l=>{var p;const s=l.cover_image||((p=l.images)==null?void 0:p[0])||ne[0],m=[l.neighborhood,l.city].filter(Boolean).join(", "),r=`https://omarcorretor.com.br/og/${l.id}`,c=encodeURIComponent(`Olá! Tenho interesse no imóvel *${l.title}*${l.reference?` (Ref: ${l.reference})`:""}. Poderia me dar mais informações?
${r}`);return`
      <div class="selecao-card">
        <div class="img-wm-wrap"><img src="${s}" alt="${g(l.title)}" class="selecao-card-img"></div>
        <div class="selecao-card-body">
          <div class="selecao-card-title">${g(l.title)}</div>
          <div class="selecao-card-loc">${g(m)}</div>
          <div class="selecao-card-price">${g(re(l.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${l.id}" class="btn-det">Ver Detalhes</a>
            <a href="https://wa.me/${le}?text=${c}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const a=t.closest(".selecao-carousel-wrap");(i=a==null?void 0:a.querySelector(".selecao-prev"))==null||i.addEventListener("click",()=>{t.scrollBy({left:-340,behavior:"smooth"})}),(d=a==null?void 0:a.querySelector(".selecao-next"))==null||d.addEventListener("click",()=>{t.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const t=document.getElementById("construction-filter");t&&(t.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),ce()};function Ft(e){var d;const t=e.target.closest(".carousel-btn");if(!t)return;e.preventDefault(),e.stopPropagation();const n=t.closest(".carousel-wrap");if(!n)return;const a=parseInt(n.dataset.total,10);if(!a||a<2)return;let o=parseInt(n.dataset.idx,10)||0;const i=t.classList.contains("carousel-next")?1:-1;o=(o+i+a)%a,n.dataset.idx=o;try{const l=JSON.parse(decodeURIComponent(n.dataset.images||"[]"));l.length&&l[o]&&(n.querySelector(".carousel-img").src=l[o])}catch{const s=_.find(r=>String(r.id)===String(n.dataset.pid)),m=(d=s==null?void 0:s.images)!=null&&d.length?s.images:ne;m[o]&&(n.querySelector(".carousel-img").src=m[o])}}function Xt(){var a;const e=((a=document.getElementById("price-range"))==null?void 0:a.value)||"";if(!e)return{min:0,max:1/0};const[t,n]=e.split("-");return{min:parseInt(t,10)||0,max:n?parseInt(n,10):1/0}}function Gt(){const e=document.getElementById("price-range");e&&e.addEventListener("change",()=>ce())}function Vt(){const e=document.getElementById("city-filter"),t=document.getElementById("neighborhood-filter");if(e&&t){const n=ge();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(a=>`<option value="${a.name}">${g(a.name)}</option>`).join(""),e.addEventListener("change",()=>{const a=ge().find(i=>i.name===e.value),o=a?ot(a.id):[];t.innerHTML='<option value="">Todos os bairros</option>'+o.map(i=>`<option value="${i.name}">${g(i.name)}</option>`).join(""),ce()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",ce)})}function Ce(e){const t=document.getElementById("admin-properties");if(t){if(!e.length){t.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}t.innerHTML=e.map(n=>{var d;const a=n.cover_image||((d=n.images)==null?void 0:d[0])||ne[0],o=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",i=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${a}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${g(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${g(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+g(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${g(o)}</td>
      <td class="cell-price">${g(re(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${i}</td>
      <td>
        <div class="action-btns">
          ${(f==null?void 0:f.role)==="admin"||(f==null?void 0:f.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(f==null?void 0:f.role)==="admin"||(f==null?void 0:f.role)==="super_admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function Wt(){const e=document.getElementById("f-city");if(!e)return;const t=ge(),n=e.value;e.innerHTML='<option value="">Todas</option>'+t.map(a=>`<option value="${a.name}">${g(a.name)}</option>`).join(""),n&&(e.value=n)}function Jt(){var e,t,n,a,o,i,d,l,s,m,r,c,p,u,b;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((t=document.getElementById("f-title"))==null?void 0:t.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((a=document.getElementById("f-city"))==null?void 0:a.value)||"",neighborhood:((o=document.getElementById("f-neighborhood"))==null?void 0:o.value)||"",condominium:(((i=document.getElementById("f-condominium"))==null?void 0:i.value)||"").trim().toLowerCase(),priceMin:parseFloat((d=document.getElementById("f-price-min"))==null?void 0:d.value)||0,priceMax:parseFloat((l=document.getElementById("f-price-max"))==null?void 0:l.value)||1/0,areaMin:parseFloat((s=document.getElementById("f-area-min"))==null?void 0:s.value)||0,areaMax:parseFloat((m=document.getElementById("f-area-max"))==null?void 0:m.value)||1/0,construction:((r=document.getElementById("f-construction"))==null?void 0:r.value)||"",published:((c=document.getElementById("f-published"))==null?void 0:c.value)||"",bedrooms:((p=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:p.dataset.val)||"",suites:((u=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:u.dataset.val)||"",parking:((b=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:b.dataset.val)||""}}function at(e){const t=Jt();return Object.values(t).some(a=>a!==""&&a!==0&&a!==1/0)?e.filter(a=>{if(t.ref&&!(a.reference||"").toLowerCase().includes(t.ref)||t.title&&!(a.title||"").toLowerCase().includes(t.title)||t.type&&!(a.title||"").toLowerCase().includes(t.type.toLowerCase())||t.city&&a.city!==t.city||t.neighborhood&&a.neighborhood!==t.neighborhood||t.condominium&&!(a.condominium||"").toLowerCase().includes(t.condominium))return!1;const o=parseInt(String(a.price||"").replace(/[^0-9]/g,""),10)||0;if(t.priceMin>0&&o<t.priceMin||t.priceMax<1/0&&o>t.priceMax)return!1;const i=parseFloat(a.area)||0;return!(t.areaMin>0&&i<t.areaMin||t.areaMax<1/0&&i>t.areaMax||t.construction&&a.construction_status!==t.construction||t.published!==""&&String(a.published)!==t.published||t.bedrooms&&(t.bedrooms==="5+"&&Number(a.bedrooms)<5||t.bedrooms!=="5+"&&Number(a.bedrooms)!==Number(t.bedrooms))||t.suites&&(t.suites==="5+"&&Number(a.suites)<5||t.suites!=="5+"&&Number(a.suites)!==Number(t.suites))||t.parking&&(t.parking==="5+"&&Number(a.parking)<5||t.parking!=="5+"&&Number(a.parking)!==Number(t.parking)))}):e}async function Ne(){if(!document.getElementById("admin-properties"))return;const e=await jt(),t=e.length,n=e.filter(d=>d.published===!0).length,a=document.getElementById("stat-total"),o=document.getElementById("stat-published"),i=document.getElementById("stat-leads");a&&(a.textContent=t),o&&(o.textContent=n),i&&(i.textContent="—"),Wt(),Ce(_)}let R=null,de="";function Ge(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ze(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function je(e){const t=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!t||!n)){if(!e.length){t.style.display="none";return}t.style.display="",n.innerHTML=e.map(a=>`
    <div class="cover-thumb-wrap${a===de?" selected":""}" data-url="${a}">
      <img src="${a}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(a=>{a.addEventListener("click",()=>{de=a.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(o=>o.classList.remove("selected")),a.classList.add("selected")})})}}function Fe(){const e=document.getElementById("property-form");if(!e)return;const t=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{var s;n.preventDefault();const a=new FormData(e),o=a.getAll("images");let i=[];const d=o.filter(m=>m.size>0);if(d.length){t.disabled=!0,t.textContent=`Enviando 0/${d.length} foto…`;try{i=await Ot(d,(m,r)=>{t.textContent=`Enviando ${m}/${r} foto…`})}catch(m){console.error("Erro no upload:",m),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(R){const m=_.find(r=>r.id===R);m!=null&&m.images&&(i=m.images)}i.length||(i=[...ne]);const l={...R?{id:R}:{},title:a.get("title"),rua:a.get("rua")||"",numero:a.get("numero")||"",city:a.get("city"),neighborhood:a.get("neighborhood"),price:a.get("price"),bedrooms:parseInt(a.get("bedrooms"),10)||0,suites:parseInt(a.get("suites"),10)||0,area:parseFloat(a.get("area"))||0,parking:parseInt(a.get("parking"),10)||0,published:a.get("published")==="true",images:i,description:a.get("description")||"",owner_name:a.get("owner_name")||"",owner_phone:a.get("owner_phone")||"",owner_email:a.get("owner_email")||"",owner_notes:a.get("owner_notes")||"",cover_image:de||"",construction_status:a.get("construction_status")||"",condominium:a.get("condominium")||"",tenant_id:R?((s=_.find(m=>m.id===R))==null?void 0:s.tenant_id)??(f==null?void 0:f.tenant_id)??null:(f==null?void 0:f.tenant_id)??null};try{await Rt(l),R=null,t.disabled=!1,t.textContent="Salvar Imóvel",e.reset();const m=document.getElementById("adminPublished");m&&(m.value="true");const r=document.getElementById("adminNeighborhood");r&&(r.innerHTML='<option value="">Selecione a cidade primeiro</option>');const c=document.getElementById("adminConstructionStatus");c&&(c.value=""),de="",je([]),ze(),await Ne()}catch(m){console.error(m),t.disabled=!1,t.textContent=R?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao salvar imóvel:
`+((m==null?void 0:m.message)||JSON.stringify(m)))}}),document.addEventListener("click",async n=>{var a;if(n.target.matches(".del-btn")){const o=Number(n.target.dataset.id);if(!o||!confirm("Remover este imóvel?"))return;try{await Ht(o),await Ne()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((f==null?void 0:f.role)!=="admin"&&(f==null?void 0:f.role)!=="super_admin")return;const o=Number(n.target.dataset.id);if(!o)return;const i=_.find(s=>s.id===o);if(!i)return;R=o,t.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=i.title||"",e.querySelector('[name="rua"]').value=i.rua||"",e.querySelector('[name="numero"]').value=i.numero||"",e.querySelector('[name="city"]').value=i.city||"",e.querySelector('[name="price"]').value=i.price||"",e.querySelector('[name="bedrooms"]').value=i.bedrooms||"",e.querySelector('[name="suites"]').value=i.suites||"",e.querySelector('[name="area"]').value=i.area||"",e.querySelector('[name="parking"]').value=i.parking||"",e.querySelector('[name="description"]').value=i.description||"",e.querySelector('[name="construction_status"]').value=i.construction_status||"",e.querySelector('[name="owner_name"]').value=i.owner_name||"",e.querySelector('[name="owner_phone"]').value=i.owner_phone||"",e.querySelector('[name="owner_email"]').value=i.owner_email||"",e.querySelector('[name="owner_notes"]').value=i.owner_notes||"",e.querySelector('[name="condominium"]').value=i.condominium||"";const d=document.getElementById("adminPublished");d&&(d.value=i.published===!0?"true":"false");const l=document.getElementById("adminCitySelect");l&&(l.value=i.city||"",l.dispatchEvent(new Event("change")),setTimeout(()=>{const s=document.getElementById("adminNeighborhood");s&&(s.value=i.neighborhood||"")},50)),de=i.cover_image||((a=i.images)==null?void 0:a[0])||"",je(i.images||[]),Ge("Editar Imóvel")}})}function g(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let Z=[],W=0;function Yt(e){var c,p;const t=document.getElementById("view-modal-edit");t&&(t.dataset.pid=e.id),document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const n=document.getElementById("view-status-badge");e.published?(n.textContent="● Publicado",n.className="badge badge-green"):(n.textContent="○ Rascunho",n.className="badge badge-gray");const a=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=a.length?`📍 ${a.join(", ")}`:"";const o=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.join(" "))}`;document.getElementById("view-map-link").href=o,document.getElementById("view-directions-link").href=o;const i=((c=e.images)==null?void 0:c[0])||ne[0];document.getElementById("view-thumb-preview").src=i,Z=(p=e.images)!=null&&p.length?e.images:ne,W=0,Re(),document.getElementById("view-price").textContent=re(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const d=document.getElementById("view-condominium-item"),l=document.getElementById("view-condominium");l&&(l.textContent=e.condominium||""),d&&(d.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(u=>u.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const s="https://omarcorretor.com.br/property.html?id="+e.id,m=document.getElementById("share-link-input");m&&(m.value=s);const r=document.getElementById("share-panel");r&&(r.style.display="none",r.dataset.pid=e.id),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function qe(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function Re(){const e=document.getElementById("view-main-img"),t=document.getElementById("view-counter"),n=document.getElementById("view-prev"),a=document.getElementById("view-next"),o=document.getElementById("view-thumbs");e.src=Z[W],e.alt=`Foto ${W+1}`;const i=Z.length>1;n.style.display=i?"flex":"none",a.style.display=i?"flex":"none",t.textContent=i?`${W+1} / ${Z.length}`:"",o.innerHTML=i?Z.map((d,l)=>`<img src="${d}" class="view-thumb${l===W?" active":""}" data-i="${l}" alt="Foto ${l+1}">`).join(""):"",o.querySelectorAll(".view-thumb").forEach(d=>{d.addEventListener("click",()=>{W=+d.dataset.i,Re()})})}async function mt(e){const{data:t}=await y.from("profiles").select("*").eq("id",e).maybeSingle();return t}function He(e){var c,p;const t=document.getElementById("topnav-avatar-initial"),n=document.getElementById("topnav-avatar-img"),a=document.getElementById("topnav-name"),o=document.getElementById("topnav-role");if(!a)return;const i=(e==null?void 0:e.name)||"Sem nome",d=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor";a.textContent=i,o&&(o.textContent=d),e!=null&&e.avatar_url&&n?(n.src=e.avatar_url,n.style.display="",t&&(t.style.display="none")):(t&&(t.textContent=((c=i[0])==null?void 0:c.toUpperCase())||"?",t.style.display=""),n&&(n.style.display="none"));const l=document.getElementById("avatar-dd-name"),s=document.getElementById("avatar-dd-role"),m=document.getElementById("avatar-dd-img"),r=document.getElementById("avatar-dd-initial");l&&(l.textContent=i),s&&(s.textContent=d),e!=null&&e.avatar_url&&m?(m.src=e.avatar_url,m.style.display="",r&&(r.style.display="none")):(r&&(r.textContent=((p=i[0])==null?void 0:p.toUpperCase())||"?",r.style.display=""),m&&(m.style.display="none"))}async function pt(e){const t=document.getElementById("avatar-dd-ver-site");if(!t)return;const n=(e==null?void 0:e.tenant_id)||z(),a=n&&n!==O,o=window.location.origin,i=a?`${o}/demo.html?key=${n}`:`${o}/index.html`;if(t.href=i,!!a)try{const{data:d}=await y.from("tenants").select("domain").eq("id",n).maybeSingle(),l=window.location.hostname.replace(/^www\./,""),s=((d==null?void 0:d.domain)||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim();s&&s!==l&&(t.href=`https://${s}`)}catch{}}function me(e){var n,a;document.querySelectorAll(".topnav-link, .topnav-dropdown-item").forEach(o=>o.classList.remove("active"));const t=document.querySelector(`.topnav-link[data-section="${e}"], .topnav-dropdown-item[data-section="${e}"]`);t&&t.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden")),(n=document.getElementById(`section-${e}`))==null||n.classList.remove("hidden"),(a=document.getElementById("topnav-links"))==null||a.classList.remove("open"),J(),e==="contatos"&&da(),e==="funil"&&Zt(),e==="tarefas"&&ta()}function ut(e){const t=document.getElementById("admin-root");if(t&&(t.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(a=>{a.style.display=""}),Object.entries({empresa:ya,visual:ba,"site-config":ha,"crm-config":xa,integracoes:Ea,midia:wa,depoimentos:ua}).forEach(([a,o])=>{const i=document.querySelector(`.topnav-dropdown-item[data-section="${a}"]`)||document.querySelector(`.nav-item[data-section="${a}"]`);i&&i.addEventListener("click",()=>o(),{once:!0})}),window.lucide&&lucide.createIcons()),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(a=>{a.style.display=""});const n=document.querySelector('.topnav-link[data-section="super-admin"]')||document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>Ia(),{once:!0}),window.lucide&&lucide.createIcons()}}function J(){var e,t;(e=document.getElementById("avatar-dropdown"))==null||e.classList.add("hidden"),(t=document.getElementById("notif-dropdown"))==null||t.classList.add("hidden")}function Kt(){var a,o,i;const e=document.getElementById("change-pass-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-pass-modal-root",t.className="modal-backdrop",t.innerHTML=`
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
    </div>`,document.body.appendChild(t);const n=()=>t.remove();(a=document.getElementById("cp-close"))==null||a.addEventListener("click",n),(o=document.getElementById("cp-cancel"))==null||o.addEventListener("click",n),t.addEventListener("click",d=>{d.target===t&&n()}),(i=document.getElementById("cp-save"))==null||i.addEventListener("click",async()=>{var c,p;const d=((c=document.getElementById("cp-new"))==null?void 0:c.value)||"",l=((p=document.getElementById("cp-confirm"))==null?void 0:p.value)||"",s=document.getElementById("cp-msg"),m=document.getElementById("cp-save");if(s.style.display="none",d.length<6){s.style.color="#ef4444",s.textContent="Mínimo 6 caracteres.",s.style.display="";return}if(d!==l){s.style.color="#ef4444",s.textContent="As senhas não coincidem.",s.style.display="";return}m.disabled=!0,m.textContent="Salvando…";const{error:r}=await y.auth.updateUser({password:d});if(m.disabled=!1,m.textContent="Salvar Senha",r){s.style.color="#ef4444",s.textContent="Erro: "+r.message,s.style.display="";return}s.style.color="#16a34a",s.textContent="✅ Senha alterada com sucesso!",s.style.display="",setTimeout(n,1500)})}function Qt(){var i,d,l,s,m;const e=document.getElementById("change-photo-modal-root");e&&e.remove();const t=document.createElement("div");t.id="change-photo-modal-root",t.className="modal-backdrop";const n=((i=document.getElementById("topnav-avatar-img"))==null?void 0:i.src)||"",a=n&&!n.endsWith("/");t.innerHTML=`
    <div class="modal" style="max-width:380px;">
      <div class="modal-header">
        <h3>Alterar Foto</h3>
        <button class="modal-close" id="cph-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;border:3px solid #e2e8f0;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
          <img id="cph-preview" src="${a?n:""}" alt="" style="width:100%;height:100%;object-fit:cover;display:${a?"":"none"};">
          <span id="cph-initial" style="font-size:32px;font-weight:700;color:#64748b;display:${a?"none":""};">${((f==null?void 0:f.name)||"?")[0].toUpperCase()}</span>
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
    </div>`,document.body.appendChild(t);const o=()=>t.remove();(d=document.getElementById("cph-close"))==null||d.addEventListener("click",o),(l=document.getElementById("cph-cancel"))==null||l.addEventListener("click",o),t.addEventListener("click",r=>{r.target===t&&o()}),(s=document.getElementById("cph-file"))==null||s.addEventListener("change",r=>{const c=r.target.files[0];if(!c)return;const p=URL.createObjectURL(c),u=document.getElementById("cph-preview"),b=document.getElementById("cph-initial");u&&(u.src=p,u.style.display=""),b&&(b.style.display="none"),document.getElementById("cph-save").disabled=!1}),(m=document.getElementById("cph-save"))==null||m.addEventListener("click",async()=>{var u;const r=(u=document.getElementById("cph-file"))==null?void 0:u.files[0];if(!r)return;const c=document.getElementById("cph-save"),p=document.getElementById("cph-msg");c.disabled=!0,c.textContent="Salvando…";try{const b=await Te(r,400,.85),x=`avatars/${f.id}-${Date.now()}.jpg`,{error:E}=await y.storage.from("imoveis").upload(x,b,{contentType:"image/jpeg",upsert:!0});if(E)throw E;const{data:{publicUrl:h}}=y.storage.from("imoveis").getPublicUrl(x);await y.from("profiles").update({avatar_url:h}).eq("id",f.id),f={...f,avatar_url:h},He(f),o()}catch(b){p.style.color="#ef4444",p.textContent="Erro: "+b.message,p.style.display="",c.disabled=!1,c.textContent="Salvar Foto"}})}function Ve(e,t){var i,d,l;const n=document.getElementById("add-corretor-modal-root");n&&n.remove();const a=document.createElement("div");a.id="add-corretor-modal-root",a.className="modal-backdrop",a.innerHTML=`
    <div class="modal" style="max-width:440px;">
      <div class="modal-header">
        <h3>Adicionar Usuário</h3>
        <button class="modal-close" id="ac-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
          <label class="form-label">Função *</label>
          <select id="ac-role" class="form-control">
            <option value="corretor">Corretor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">E-mail *</label>
          <input id="ac-email" type="email" class="form-control" placeholder="usuario@email.com">
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
    </div>`,document.body.appendChild(a);const o=()=>a.remove();(i=document.getElementById("ac-close"))==null||i.addEventListener("click",o),(d=document.getElementById("ac-cancel"))==null||d.addEventListener("click",o),a.addEventListener("click",s=>{s.target===a&&o()}),(l=document.getElementById("ac-save"))==null||l.addEventListener("click",async()=>{var p,u,b;const s=(p=document.getElementById("ac-email"))==null?void 0:p.value.trim(),m=(u=document.getElementById("ac-password"))==null?void 0:u.value.trim(),r=document.getElementById("ac-save"),c=document.getElementById("ac-note");if(!s){alert("Informe o e-mail do corretor.");return}if(!m||m.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}r.disabled=!0,r.textContent="Criando…",c.style.display="none";try{const x=e||(f==null?void 0:f.tenant_id)||null,E=((b=document.getElementById("ac-role"))==null?void 0:b.value)||"corretor",h=await ue({email:s,password:m,role:E,tenant_id:x});r.disabled=!1,r.textContent="+ Criar Acesso",h.success?(document.getElementById("ac-email").value="",document.getElementById("ac-password").value="",h.email_sent===!1?(c.innerHTML=`✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${g(s)}<br><strong>Senha:</strong> ${g(m)}`,c.style.color="#0f172a"):(c.textContent="✅ Acesso criado! O corretor receberá um e-mail com as credenciais.",c.style.color="#16a34a"),c.style.display="",typeof t=="function"&&setTimeout(t,1500)):alert("Erro: "+(h.error||"Falha desconhecida"))}catch(x){r.disabled=!1,r.textContent="+ Criar Acesso",alert("Erro: "+x.message)}})}function gt(){var i,d,l,s,m,r,c,p,u,b,x;const e=document.getElementById("topnav-avatar-wrap"),t=document.getElementById("avatar-dropdown");e==null||e.addEventListener("click",E=>{var v;E.stopPropagation(),(t==null?void 0:t.classList.toggle("hidden"))||(v=document.getElementById("notif-dropdown"))==null||v.classList.add("hidden")}),(i=document.getElementById("avatar-dd-change-photo"))==null||i.addEventListener("click",E=>{E.stopPropagation(),J(),Qt()}),(d=document.getElementById("avatar-dd-change-pass"))==null||d.addEventListener("click",E=>{E.stopPropagation(),J(),Kt()}),(l=document.getElementById("avatar-dd-add-corretor"))==null||l.addEventListener("click",E=>{E.stopPropagation(),J(),Ve()}),(s=document.getElementById("avatar-dd-settings"))==null||s.addEventListener("click",E=>{E.stopPropagation(),J(),me("settings")}),(m=document.getElementById("avatar-dd-logout"))==null||m.addEventListener("click",async E=>{E.stopPropagation(),await y.auth.signOut(),location.reload()});const n=document.getElementById("topnav-notif-wrap"),a=document.getElementById("notif-dropdown");n==null||n.addEventListener("click",E=>{var v;E.stopPropagation(),(a==null?void 0:a.classList.toggle("hidden"))||((v=document.getElementById("avatar-dropdown"))==null||v.classList.add("hidden"),oa())}),(r=document.getElementById("notif-mark-all"))==null||r.addEventListener("click",()=>{ia(),J()}),(c=document.getElementById("btn-search-open"))==null||c.addEventListener("click",()=>{var E,h;(E=document.getElementById("search-overlay"))==null||E.classList.remove("hidden"),(h=document.getElementById("search-input"))==null||h.focus()}),(p=document.getElementById("search-overlay-close"))==null||p.addEventListener("click",()=>{var E;(E=document.getElementById("search-overlay"))==null||E.classList.add("hidden")}),(u=document.getElementById("search-overlay"))==null||u.addEventListener("click",E=>{E.target.id==="search-overlay"&&document.getElementById("search-overlay").classList.add("hidden")});let o;(b=document.getElementById("search-input"))==null||b.addEventListener("input",E=>{clearTimeout(o),o=setTimeout(()=>na(E.target.value.trim()),280)}),(x=document.getElementById("search-input"))==null||x.addEventListener("keydown",E=>{var h;E.key==="Escape"&&((h=document.getElementById("search-overlay"))==null||h.classList.add("hidden"))}),document.addEventListener("click",J)}let We=!1,ie=[],nt=[],Ue=[],Je={},kt=[],te=null,Be=null,X={search:"",tags:new Set,status:""};async function Zt(){var t;if(We){await ft();return}We=!0,await ft(),(t=document.getElementById("btn-funil-add-lead"))==null||t.addEventListener("click",()=>Ke()),Ca();const e=document.getElementById("funil-pipe-sel");e==null||e.addEventListener("change",async()=>{te=parseInt(e.value,10),await De()})}function Ye(e){var i;const t=document.getElementById("kanban-filters");if(!t)return;t.style.display="block";const n=document.getElementById("kf-status");n&&(n.innerHTML='<option value="">Todos os status</option>'+kt.map(d=>`<option value="${g(d.name)}">${g(d.name)}</option>`).join(""),n.value=X.status,n.onchange=()=>{X.status=n.value,ye()});const a=document.getElementById("kf-tags");if(a){if(!e.length){a.style.display="none";return}a.style.display="flex",a.innerHTML=e.map(d=>{const l=X.tags.has(d.name);return`<button class="kf-tag-btn" data-tag="${g(d.name)}"
        style="padding:4px 12px;border-radius:20px;border:1.5px solid ${d.color};
               background:${l?d.color:d.color+"18"};
               color:${l?"#fff":d.color};
               font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;">
        ${g(d.name)}
      </button>`}).join(""),a.querySelectorAll(".kf-tag-btn").forEach(d=>{d.addEventListener("click",()=>{const l=d.dataset.tag;X.tags.has(l)?X.tags.delete(l):X.tags.add(l),Ye(e),ye()})})}const o=document.getElementById("kf-search");o&&(o.value=X.search,o.oninput=()=>{X.search=o.value.toLowerCase(),ye()}),(i=document.getElementById("kf-clear"))==null||i.addEventListener("click",()=>{X={search:"",tags:new Set,status:""},Ye(e),ye()})}async function ft(){const e=z(),[{data:t},{data:n},{data:a}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",e).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",e).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",e).order("sort_order")]);ie=t||[],kt=a||[],Je={},(n||[]).forEach(l=>{Je[l.name]=l});const o=ie.map(l=>l.id),{data:i}=o.length?await y.from("crm_stages").select("*").in("pipeline_id",o).order("sort_order"):{data:[]};nt=i||[],Ye(n||[]);const d=document.getElementById("funil-pipe-sel");if(d){const l=te;d.innerHTML=ie.length?ie.map(m=>`<option value="${m.id}">${g(m.name)}</option>`).join(""):'<option value="">Sem funis cadastrados</option>';const s=ie.find(m=>m.id===l)||ie.find(m=>m.is_default)||ie[0];s?(d.value=s.id,te=s.id):te=null}await De()}async function De(){const e=document.getElementById("kanban-board");if(!e)return;e.innerHTML='<div class="kanban-loading">Carregando…</div>';let t=y.from("leads").select("*").order("created_at",{ascending:!1});(f==null?void 0:f.role)==="corretor"?t=t.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id)),te&&(t=t.eq("pipeline_id",te));const{data:n}=await t;Ue=n||[],ye()}function ye(){const e=document.getElementById("kanban-board");if(!e)return;const t=nt.filter(i=>i.pipeline_id===te);if(!t.length){e.innerHTML='<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>';return}const n=X,a=Ue.filter(i=>{if(n.search&&!`${i.name||""} ${i.phone||""} ${i.email||""}`.toLowerCase().includes(n.search)||n.status&&i.status!==n.status)return!1;if(n.tags.size>0){const d=Array.isArray(i.tags)?i.tags:[];if(![...n.tags].every(l=>d.includes(l)))return!1}return!0}),o={};t.forEach(i=>{o[i.name]=[]}),a.forEach(i=>{var l,s,m,r;const d=i.stage||((l=t[0])==null?void 0:l.name);o[d]||(o[((s=t[0])==null?void 0:s.name)||""]=[]),(r=o[d]||o[(m=t[0])==null?void 0:m.name])==null||r.push(i)}),e.innerHTML=t.map(i=>{const d=o[i.name]||[],l=d.length?d.map(s=>{const m=(s.phone||"").replace(/\D/g,""),r=encodeURIComponent(`Olá ${s.name}! Aqui é da ${G("company.name","nossa imobiliária")}. Vi seu interesse e gostaria de ajudar. Posso falar agora?`);return`
        <div class="kanban-card" draggable="true" data-id="${s.id}" data-stage="${g(i.name)}" style="cursor:pointer;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;">
            <div class="kanban-card-name" style="flex:1;">${g(s.name||"—")}</div>
            ${m?`<a href="https://wa.me/${m}?text=${r}" target="_blank" rel="noopener"
              onclick="event.stopPropagation()"
              style="flex-shrink:0;width:28px;height:28px;background:#25d366;border-radius:6px;display:flex;align-items:center;justify-content:center;text-decoration:none;"
              title="Abrir WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>`:""}
          </div>
          ${s.phone?`<div class="kanban-card-info">📞 ${g(s.phone)}</div>`:""}
          ${s.email?`<div class="kanban-card-info" style="font-size:11px;color:#94a3b8;">✉ ${g(s.email)}</div>`:""}
          ${s.notes?`<div class="kanban-card-info" style="font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">📝 ${g(s.notes)}</div>`:""}
          <div class="kanban-card-tags" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">
            ${s.source?`<span class="kanban-card-tag">${g(s.source)}</span>`:""}
            ${Array.isArray(s.tags)?s.tags.map(c=>{const p=Je[c],u=(p==null?void 0:p.color)||"#0369a1";return`<span class="kanban-card-tag" style="background:${u}18;color:${u};border:1px solid ${u}44;">${g(c)}</span>`}).join(""):""}
          </div>
        </div>`}).join(""):'<div class="kanban-empty-col">Sem leads nesta etapa</div>';return`
      <div class="kanban-col" data-stage="${g(i.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${i.color||"#2563eb"}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${i.color||"#2563eb"}"></div>
            ${g(i.name)}
          </div>
          <span class="kanban-col-count">${d.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${g(i.name)}">${l}</div>
        <button class="kanban-add-btn" data-stage="${g(i.name)}">+ Adicionar lead</button>
      </div>`}).join(""),ea(),window.lucide&&lucide.createIcons()}function ea(){const e=document.getElementById("kanban-board");e&&(e.querySelectorAll(".kanban-add-btn").forEach(t=>{t.addEventListener("click",()=>Ke())}),e.querySelectorAll(".kanban-card").forEach(t=>{t.addEventListener("click",()=>{const n=Ue.find(a=>String(a.id)===String(t.dataset.id));n&&Ke(n)}),t.addEventListener("dragstart",n=>{Be=t.dataset.id,t.classList.add("dragging"),n.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>t.classList.remove("dragging"))}),e.querySelectorAll(".kanban-cards").forEach(t=>{t.addEventListener("dragover",n=>{n.preventDefault(),t.closest(".kanban-col").classList.add("drag-over")}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||t.closest(".kanban-col").classList.remove("drag-over")}),t.addEventListener("drop",async n=>{n.preventDefault(),t.closest(".kanban-col").classList.remove("drag-over");const a=t.dataset.stage;if(!Be||!a)return;await y.from("leads").update({stage:a}).eq("id",Be);const o=Ue.find(i=>String(i.id)===String(Be));o&&(o.stage=a),Be=null,ye()})}))}async function Ke(e=null){var m,r;(m=document.getElementById("lead-detail-panel"))==null||m.remove();const t=!e,n=z(),{data:a}=await y.from("crm_tags").select("*").eq("tenant_id",n).order("name"),{data:o}=await y.from("crm_lead_statuses").select("*").eq("tenant_id",n).order("sort_order"),i=nt.filter(c=>c.pipeline_id===te).map(c=>`<option value="${g(c.name)}" ${(e==null?void 0:e.stage)===c.name?"selected":""}>${g(c.name)}</option>`).join(""),d=((e==null?void 0:e.phone)||"").replace(/\D/g,""),l=document.createElement("div");l.id="lead-detail-panel",l.style.cssText="position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:#fff;box-shadow:-4px 0 32px rgba(0,0,0,.15);z-index:1000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;",l.innerHTML=`
    <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0;">${t?"+ Novo Lead":"✏️ Editar Lead"}</h3>
      <button id="ldp-close" style="background:none;border:none;cursor:pointer;font-size:22px;color:#94a3b8;line-height:1;">✕</button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:20px 24px;display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">NOME *</label>
        <input id="ldp-name" class="form-input" type="text" value="${g((e==null?void 0:e.name)||"")}" placeholder="Nome do cliente">
      </div>
      <div style="display:flex;gap:10px;">
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">TELEFONE</label>
          <input id="ldp-phone" class="form-input" type="tel" value="${g((e==null?void 0:e.phone)||"")}" placeholder="(00) 00000-0000">
        </div>
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">E-MAIL</label>
          <input id="ldp-email" class="form-input" type="email" value="${g((e==null?void 0:e.email)||"")}" placeholder="email@...">
        </div>
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ORIGEM</label>
        <input id="ldp-source" class="form-input" type="text" value="${g((e==null?void 0:e.source)||"")}" placeholder="site, indicação, instagram…">
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ETAPA DO FUNIL</label>
        <select id="ldp-stage" class="form-input">${i}</select>
      </div>
      ${o!=null&&o.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">STATUS</label>
        <select id="ldp-status" class="form-input">
          <option value="">— Sem status —</option>
          ${o.map(c=>`<option value="${c.name}" ${(e==null?void 0:e.status)===c.name?"selected":""}>${g(c.name)}</option>`).join("")}
        </select>
      </div>`:""}
      ${a!=null&&a.length?`
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:6px;">TAGS</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${a.map(c=>`
            <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:4px 10px;border-radius:20px;background:${c.color}18;border:1px solid ${c.color}44;font-size:12px;font-weight:600;color:${c.color};">
              <input type="checkbox" value="${c.name}" style="margin:0;" ${((e==null?void 0:e.tags)||[]).includes(c.name)?"checked":""}>
              ${g(c.name)}
            </label>`).join("")}
        </div>
      </div>`:""}
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ANOTAÇÕES</label>
        <textarea id="ldp-notes" class="form-input" rows="4" placeholder="Observações, interesses, próximos passos…" style="resize:vertical;">${g((e==null?void 0:e.notes)||"")}</textarea>
      </div>
      ${d?(()=>{const c=encodeURIComponent(`Olá ${e!=null&&e.name?e.name.split(" ")[0]:""}! Aqui é da ${G("company.name","nossa imobiliária")}. Vi seu interesse em imóveis e gostaria de ajudá-lo. Posso falar agora?`);return`<a href="https://wa.me/${d}?text=${c}" target="_blank" rel="noopener"
          style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25d366;color:#fff;text-decoration:none;border-radius:8px;padding:10px;font-size:13px;font-weight:700;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          Iniciar conversa no WhatsApp
        </a>`})():""}
      <div id="ldp-msg" style="font-size:13px;min-height:18px;"></div>
    </div>
    <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;flex-shrink:0;">
      ${t?"":'<button id="ldp-delete" style="background:#fee2e2;color:#dc2626;border:none;border-radius:8px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;">🗑️ Excluir</button>'}
      <button id="ldp-save" style="flex:1;background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 16px;font-size:14px;font-weight:700;cursor:pointer;">💾 Salvar</button>
    </div>
  `,document.body.appendChild(l),requestAnimationFrame(()=>{l.style.transform="translateX(0)"});const s=()=>{l.style.transform="translateX(100%)",setTimeout(()=>l.remove(),250)};document.getElementById("ldp-close").addEventListener("click",s),document.getElementById("ldp-save").addEventListener("click",async()=>{var h,v;const c=document.getElementById("ldp-save"),p=document.getElementById("ldp-msg"),u=document.getElementById("ldp-name").value.trim();if(!u){p.style.color="#ef4444",p.textContent="Nome é obrigatório.";return}c.disabled=!0,c.textContent="Salvando…";const b=[...l.querySelectorAll("input[type=checkbox]:checked")].map(B=>B.value),x={name:u,phone:document.getElementById("ldp-phone").value.trim()||null,email:document.getElementById("ldp-email").value.trim()||null,source:document.getElementById("ldp-source").value.trim()||null,stage:((h=document.getElementById("ldp-stage"))==null?void 0:h.value)||null,status:((v=document.getElementById("ldp-status"))==null?void 0:v.value)||null,notes:document.getElementById("ldp-notes").value.trim()||null,tags:b,tenant_id:z()};let E;if(t?{error:E}=await y.from("leads").insert(x):{error:E}=await y.from("leads").update(x).eq("id",e.id),c.disabled=!1,c.textContent="💾 Salvar",E){p.style.color="#ef4444",p.textContent="Erro: "+E.message;return}p.style.color="#22c55e",p.textContent="✅ Salvo!",setTimeout(()=>{s(),De()},700)}),(r=document.getElementById("ldp-delete"))==null||r.addEventListener("click",async()=>{confirm(`Excluir o lead "${e==null?void 0:e.name}"?`)&&(await y.from("leads").delete().eq("id",e.id),s(),De())})}let j=[],vt=!1,be="pending";async function ta(){var e;vt||(vt=!0,await aa(),(e=document.getElementById("btn-nova-tarefa"))==null||e.addEventListener("click",()=>St()),document.querySelectorAll(".tarefa-filter-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".tarefa-filter-btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"),be=t.dataset.filter,we()})}))}async function aa(){const e=document.getElementById("tarefas-list");e&&(e.innerHTML='<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>');let t=y.from("tasks").select("*").order("due_date",{ascending:!0,nullsFirst:!1});(f==null?void 0:f.role)==="corretor"?t=t.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:n,error:a}=await t;if(a){const o=document.getElementById("tarefas-list");o&&(o.innerHTML=`
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
      </div>`);return}j=n||[],we()}function Bt(e){if(!e)return null;const t=e.includes("T")?new Date(e):new Date(e+"T00:00:00");return isNaN(t.getTime())?null:t}function we(){const e=document.getElementById("tarefas-list");if(!e)return;let t=j;if(be==="pending"&&(t=j.filter(a=>a.status!=="done")),be==="done"&&(t=j.filter(a=>a.status==="done")),!t.length){e.innerHTML=`<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${be==="done"?"✅":"📋"}</div>
      <p>${be==="done"?"Nenhuma tarefa concluída.":"Nenhuma tarefa pendente."}</p>
    </div>`;return}const n=new Date;n.setHours(0,0,0,0),e.innerHTML=t.map(a=>{const o=Bt(a.due_date),i=o?o.toLocaleDateString("pt-BR"):"",d=o&&a.status!=="done"&&o<n;return`
      <div class="tarefa-item${a.status==="done"?" done":""}" data-id="${a.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${a.id}" ${a.status==="done"?"checked":""}>
        <div class="tarefa-body">
          <div class="tarefa-title">${g(a.title)}</div>
          <div class="tarefa-meta">
            ${i?`<span style="${d?"color:#ef4444;":""}">📅 ${i}${d?" (atrasada)":""}</span>`:""}
            ${a.description?`<span>${g(a.description.substring(0,60))}${a.description.length>60?"…":""}</span>`:""}
          </div>
        </div>
        <span class="tarefa-priority ${a.priority||"medium"}">${a.priority==="high"?"Alta":a.priority==="low"?"Baixa":"Média"}</span>
        <button class="tarefa-del-btn" data-id="${a.id}" title="Excluir">🗑️</button>
      </div>`}).join(""),e.querySelectorAll(".tarefa-check").forEach(a=>{a.addEventListener("change",async o=>{o.stopPropagation();const i=a.dataset.id,d=a.checked?"done":"pending";await y.from("tasks").update({status:d}).eq("id",i);const l=j.find(s=>String(s.id)===i);l&&(l.status=d),we()})}),e.querySelectorAll(".tarefa-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta tarefa?")&&(await y.from("tasks").delete().eq("id",a.dataset.id),j=j.filter(i=>String(i.id)!==String(a.dataset.id)),we())})}),e.querySelectorAll(".tarefa-item").forEach(a=>{a.addEventListener("click",o=>{if(o.target.closest(".tarefa-check")||o.target.closest(".tarefa-del-btn"))return;const i=a.dataset.id,d=j.find(l=>String(l.id)===i);d&&St(d)})})}function St(e=null){var s,m,r,c;const t=document.getElementById("tarefa-modal-root");t&&t.remove();const n=!!e,a=(e==null?void 0:e.status)==="done",o=Bt(e==null?void 0:e.due_date);o&&o.toLocaleDateString("pt-BR");const i=e!=null&&e.due_date?e.due_date.includes("T")?e.due_date.split("T")[0]:e.due_date:"",d=document.createElement("div");d.id="tarefa-modal-root",d.className="modal-backdrop",d.innerHTML=`
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
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${g((e==null?void 0:e.title)||"")}">
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
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${g((e==null?void 0:e.description)||"")}</textarea>
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
  `,document.body.appendChild(d);const l=()=>d.remove();(s=document.getElementById("tm-close"))==null||s.addEventListener("click",l),(m=document.getElementById("tm-cancel"))==null||m.addEventListener("click",l),d.addEventListener("click",p=>{p.target===d&&l()}),(r=document.getElementById("tm-toggle-done"))==null||r.addEventListener("click",async()=>{const p=a?"pending":"done";await y.from("tasks").update({status:p}).eq("id",e.id);const u=j.find(b=>String(b.id)===String(e.id));u&&(u.status=p),l(),p==="done"&&(be="done",document.querySelectorAll(".tarefa-filter-btn").forEach(b=>{b.classList.toggle("active",b.dataset.filter==="done")})),we()}),(c=document.getElementById("tm-save"))==null||c.addEventListener("click",async()=>{var h,v;const p=document.getElementById("tarefa-form");if(!p.checkValidity()){p.reportValidity();return}const u=new FormData(p),b=document.getElementById("tm-save");b.disabled=!0,b.textContent="Salvando…";const x={title:(h=u.get("title"))==null?void 0:h.trim(),description:((v=u.get("description"))==null?void 0:v.trim())||null,due_date:u.get("due_date")||null,priority:u.get("priority")||"medium",status:(e==null?void 0:e.status)||"pending",assigned_to:(f==null?void 0:f.id)||null,tenant_id:(f==null?void 0:f.tenant_id)||null};let E;if(n){if({error:E}=await y.from("tasks").update(x).eq("id",e.id),!E){const B=j.findIndex(k=>String(k.id)===String(e.id));B>=0&&(j[B]={...j[B],...x})}}else{const{data:B,error:k}=await y.from("tasks").insert(x).select();E=k,!E&&(B!=null&&B[0])&&j.unshift(B[0])}if(b.disabled=!1,b.textContent=n?"Salvar":"Criar Tarefa",E){alert("Erro: "+E.message);return}l(),we()})}async function na(e){const t=document.getElementById("search-results");if(!t)return;if(!e||e.length<2){t.innerHTML='<div class="search-hint">Digite para pesquisar…</div>';return}t.innerHTML='<div class="search-hint">Buscando…</div>';const n=`%${e}%`;f==null||f.role,f==null||f.tenant_id;const[{data:a},{data:o}]=await Promise.all([y.from("properties").select("id,title,reference,type,city").ilike("title",n).limit(5),y.from("leads").select("id,name,phone,email").or(`name.ilike.${n},phone.ilike.${n},email.ilike.${n}`).limit(5)]),i=[];a!=null&&a.length&&(i.push('<div class="search-group-label">Imóveis</div>'),i.push(...a.map(d=>`
      <div class="search-result-item" data-type="property" data-id="${d.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${g(d.title||"—")}</div>
          <div class="search-result-sub">${g(d.reference||"")} · ${g(d.city||"")}</div>
        </div>
      </div>`))),o!=null&&o.length&&(i.push('<div class="search-group-label">Leads / Contatos</div>'),i.push(...o.map(d=>`
      <div class="search-result-item" data-type="lead" data-id="${d.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${g(d.name||"—")}</div>
          <div class="search-result-sub">${g(d.email||d.phone||"")}</div>
        </div>
      </div>`))),t.innerHTML=i.length?i.join(""):'<div class="search-no-results">Nenhum resultado encontrado.</div>',t.querySelectorAll(".search-result-item").forEach(d=>{d.addEventListener("click",()=>{var l;(l=document.getElementById("search-overlay"))==null||l.classList.add("hidden"),d.dataset.type==="lead"?me("contatos"):me("properties")})})}let Y=JSON.parse(localStorage.getItem("crm_notifs_read")||"[]");async function oa(){var d;const e=document.getElementById("notif-list");if(!e)return;e.innerHTML='<div class="notif-empty">Carregando…</div>';let t=y.from("leads").select("id,name,phone,created_at,source").order("created_at",{ascending:!1}).limit(10);f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:n}=await t,a=n||[],o=a.filter(l=>!Y.includes(String(l.id))),i=document.getElementById("notif-badge");if(i&&(i.textContent=o.length,o.length>0?i.classList.remove("hidden"):i.classList.add("hidden")),!a.length){e.innerHTML='<div class="notif-empty">Nenhuma notificação.</div>';return}e.innerHTML=a.map(l=>{const s=sa(l.created_at);return`
      <div class="notif-item${!Y.includes(String(l.id))?" unread":""}" data-id="${l.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${g(l.name||"—")}</div>
          <div class="notif-item-sub">${g(l.phone||l.source||"")} · ${s}</div>
        </div>
      </div>`}).join(""),e.innerHTML+='<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>',(d=document.getElementById("notif-see-all"))==null||d.addEventListener("click",l=>{l.preventDefault(),J(),me("contatos")}),e.querySelectorAll(".notif-item").forEach(l=>{l.addEventListener("click",()=>{Y.push(l.dataset.id),localStorage.setItem("crm_notifs_read",JSON.stringify(Y)),l.classList.remove("unread"),J(),me("contatos")})})}function ia(){var e;document.querySelectorAll(".notif-item").forEach(t=>Y.push(t.dataset.id)),Y=[...new Set(Y)],localStorage.setItem("crm_notifs_read",JSON.stringify(Y)),(e=document.getElementById("notif-badge"))==null||e.classList.add("hidden"),document.querySelectorAll(".notif-item").forEach(t=>t.classList.remove("unread"))}function sa(e){if(!e)return"";const t=(Date.now()-new Date(e).getTime())/1e3;return t<60?"agora":t<3600?`${Math.floor(t/60)}min atrás`:t<86400?`${Math.floor(t/3600)}h atrás`:`${Math.floor(t/86400)}d atrás`}async function la(){let e=y.from("leads").select("id").order("created_at",{ascending:!1}).limit(20);f!=null&&f.tenant_id&&(e=e.eq("tenant_id",f.tenant_id));const{data:t}=await e,a=(t||[]).filter(i=>!Y.includes(String(i.id))),o=document.getElementById("notif-badge");o&&(o.textContent=a.length,a.length>0?o.classList.remove("hidden"):o.classList.add("hidden"))}let V=[],N=1;const Se=10;let yt=!1;async function da(){var t,n,a,o,i,d,l,s,m;document.getElementById("section-contatos")&&(yt||(yt=!0,await Lt(),(t=document.getElementById("btn-contato-search"))==null||t.addEventListener("click",()=>{N=1,pe()}),(n=document.getElementById("contato-search"))==null||n.addEventListener("keydown",r=>{r.key==="Enter"&&(N=1,pe())}),(a=document.getElementById("btn-novo-contato"))==null||a.addEventListener("click",()=>_t()),(o=document.getElementById("btn-import-contato"))==null||o.addEventListener("click",ma),(i=document.getElementById("import-modal-close"))==null||i.addEventListener("click",Qe),(d=document.getElementById("import-modal-cancel"))==null||d.addEventListener("click",Qe),(l=document.getElementById("download-template"))==null||l.addEventListener("click",r=>{r.preventDefault();const c=`nome,email,telefone,empresa,cargo
João Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor`,p=new Blob([c],{type:"text/csv"}),u=document.createElement("a");u.href=URL.createObjectURL(p),u.download="modelo_contatos.csv",u.click()}),(s=document.getElementById("import-csv-file"))==null||s.addEventListener("change",ra),(m=document.getElementById("import-modal-confirm"))==null||m.addEventListener("click",ca)))}async function Lt(){const e=document.getElementById("contatos-tbody");e&&(e.innerHTML='<tr><td colspan="8" class="empty-row">Carregando…</td></tr>');let t=y.from("leads").select("*").order("created_at",{ascending:!1});(f==null?void 0:f.role)==="corretor"?t=t.eq("assigned_to",f.id):f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:a}=await t;V=a||[],pe()}function pe(){var l,s,m;const e=(((l=document.getElementById("contato-search"))==null?void 0:l.value)||"").toLowerCase(),t=e?V.filter(r=>(r.name||"").toLowerCase().includes(e)||(r.email||"").toLowerCase().includes(e)||(r.phone||"").toLowerCase().includes(e)):V,n=t.length,a=Math.max(1,Math.ceil(n/Se));N>a&&(N=a);const o=t.slice((N-1)*Se,N*Se),i=document.getElementById("contatos-tbody");if(!i)return;o.length?i.innerHTML=o.map(r=>`
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${r.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${r.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${g(r.name||"—")}</a>
        </td>
        <td>${g(r.company||"")}</td>
        <td style="color:#64748b;font-size:13px;">${r.email?g(r.email):"—"}</td>
        <td style="font-size:13px;">${r.phone?g(r.phone):"—"}</td>
        <td style="font-size:13px;color:#64748b;">${g(r.job_title||"")}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td style="display:flex;gap:6px;align-items:center;">
          ${(()=>{const c=(r.phone||"").replace(/\D/g,"");if(!c)return"";const p=encodeURIComponent(`Olá ${(r.name||"").split(" ")[0]}! Aqui é da ${G("company.name","nossa imobiliária")}. Podemos conversar sobre seu interesse em imóveis?`);return`<a href="https://wa.me/${c}?text=${p}" target="_blank" rel="noopener" title="WhatsApp"
              style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
            </a>`})()}
          <button class="icon-btn contato-edit-btn" data-id="${r.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join(""):i.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>';const d=document.getElementById("contatos-pagination");if(d){const r=n===0?0:(N-1)*Se+1,c=Math.min(N*Se,n);d.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${r}–${c}</strong> de <strong>${n}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${N<=1?"disabled":""} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${N} / ${a}</span>
          <button class="btn-cancel" id="pag-next" ${N>=a?"disabled":""} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `,(s=d.querySelector("#pag-prev"))==null||s.addEventListener("click",()=>{N--,pe()}),(m=d.querySelector("#pag-next"))==null||m.addEventListener("click",()=>{N++,pe()})}document.querySelectorAll(".contato-edit-btn, .contato-name-link").forEach(r=>{r.addEventListener("click",c=>{c.preventDefault();const p=r.dataset.id,u=V.find(b=>String(b.id)===String(p));u&&_t(u)})})}async function _t(e=null){var h,v,B,k,S,$;const t=document.getElementById("contato-modal-root");t&&t.remove();const n=!!e,a=z(),[{data:o},{data:i},{data:d}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",a).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",a).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",a).order("sort_order")]),l=o||[],s=i||[],m=d||[],r=l.map(w=>w.id),{data:c}=r.length?await y.from("crm_stages").select("*").in("pipeline_id",r).order("sort_order"):{data:[]},p=c||[],u=(e==null?void 0:e.pipeline_id)||((h=l[0])==null?void 0:h.id)||"";function b(w){const I=p.filter(L=>L.pipeline_id===w);return I.length?'<option value="">— Selecionar etapa —</option>'+I.map(L=>`<option value="${g(L.name)}" ${(e==null?void 0:e.stage)===L.name?"selected":""}>${g(L.name)}</option>`).join(""):'<option value="">— Nenhuma etapa —</option>'}const x=document.createElement("div");x.id="contato-modal-root",x.className="modal-backdrop",x.innerHTML=`
    <div class="modal" style="max-width:600px;max-height:90vh;display:flex;flex-direction:column;">
      <div class="modal-header" style="flex-shrink:0;">
        <h3>${n?"Editar Contato":"Novo Contato"}</h3>
        <button class="modal-close" id="cm-close">✕</button>
      </div>
      <div class="modal-body" style="overflow-y:auto;flex:1;">
        <form id="contato-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nome *</label>
              <input name="name" required class="form-control" placeholder="Nome completo" value="${g((e==null?void 0:e.name)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${g((e==null?void 0:e.company)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${g((e==null?void 0:e.email)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${g((e==null?void 0:e.phone)||"")}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${g((e==null?void 0:e.job_title)||"")}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${g((e==null?void 0:e.city_interest)||"")}">
            </div>
          </div>

          ${l.length?`
          <div style="border-top:1px solid #f1f5f9;margin:8px 0 12px;padding-top:14px;">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;margin-bottom:10px;">FUNIL DE NEGOCIAÇÃO</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Funil</label>
                <select id="cm-pipe" name="pipeline_id" class="form-control">
                  <option value="">— Sem funil —</option>
                  ${l.map(w=>`<option value="${w.id}" ${String(e==null?void 0:e.pipeline_id)===String(w.id)?"selected":""}>${g(w.name)}</option>`).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Etapa</label>
                <select id="cm-stage" name="stage" class="form-control">
                  ${b(u)}
                </select>
              </div>
            </div>
          </div>`:""}

          ${m.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="">— Sem status —</option>
                ${m.map(w=>`<option value="${g(w.name)}" ${(e==null?void 0:e.status)===w.name?"selected":""}>${g(w.name)}</option>`).join("")}
              </select>
            </div>
          </div>`:""}

          ${s.length?`
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Tags</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                ${s.map(w=>`
                  <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:5px 12px;border-radius:20px;background:${w.color}18;border:1.5px solid ${w.color}55;font-size:12px;font-weight:600;color:${w.color};transition:opacity .15s;">
                    <input type="checkbox" name="tag" value="${g(w.name)}" style="margin:0;accent-color:${w.color};" ${((e==null?void 0:e.tags)||[]).includes(w.name)?"checked":""}>
                    ${g(w.name)}
                  </label>`).join("")}
              </div>
            </div>
          </div>`:""}

          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${g((e==null?void 0:e.notes)||"")}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer" style="flex-shrink:0;">
        ${n?'<button class="btn-danger" id="cm-delete" style="margin-right:auto;">🗑️ Excluir</button>':""}
        <button class="btn-cancel" id="cm-cancel">Cancelar</button>
        <button class="btn-primary" id="cm-save" style="margin:0;">${n?"Salvar":"Criar Contato"}</button>
      </div>
    </div>
  `,document.body.appendChild(x);const E=()=>x.remove();(v=document.getElementById("cm-close"))==null||v.addEventListener("click",E),(B=document.getElementById("cm-cancel"))==null||B.addEventListener("click",E),x.addEventListener("click",w=>{w.target===x&&E()}),(k=document.getElementById("cm-pipe"))==null||k.addEventListener("change",w=>{const I=document.getElementById("cm-stage");I&&(I.innerHTML=b(w.target.value))}),(S=document.getElementById("cm-delete"))==null||S.addEventListener("click",async()=>{if(!confirm(`Excluir o contato "${e==null?void 0:e.name}"?`))return;await y.from("leads").delete().eq("id",e.id);const w=V.findIndex(I=>String(I.id)===String(e.id));w>=0&&V.splice(w,1),E(),pe()}),($=document.getElementById("cm-save"))==null||$.addEventListener("click",async()=>{var F,H,U,K,oe,Ie,$e;const w=document.getElementById("contato-form");if(!w.checkValidity()){w.reportValidity();return}const I=new FormData(w),L=document.getElementById("cm-save");L.disabled=!0,L.textContent="Salvando…";const T=I.getAll("tag"),C=I.get("pipeline_id")||null,M={name:(F=I.get("name"))==null?void 0:F.trim(),company:((H=I.get("company"))==null?void 0:H.trim())||null,email:((U=I.get("email"))==null?void 0:U.trim())||null,phone:((K=I.get("phone"))==null?void 0:K.trim())||null,job_title:((oe=I.get("job_title"))==null?void 0:oe.trim())||null,city_interest:((Ie=I.get("city_interest"))==null?void 0:Ie.trim())||null,notes:(($e=I.get("notes"))==null?void 0:$e.trim())||null,pipeline_id:C,stage:I.get("stage")||null,status:I.get("status")||null,tags:T,assigned_to:(f==null?void 0:f.id)||null,tenant_id:(f==null?void 0:f.tenant_id)||null,source:(e==null?void 0:e.source)||"manual"};let q;if(n){if({error:q}=await y.from("leads").update(M).eq("id",e.id),!q){const D=V.findIndex(fe=>String(fe.id)===String(e.id));D>=0&&(V[D]={...V[D],...M})}}else{const{data:D,error:fe}=await y.from("leads").insert(M).select();q=fe,!q&&(D!=null&&D[0])&&V.unshift(D[0])}if(L.disabled=!1,L.textContent=n?"Salvar":"Criar Contato",q){alert("Erro: "+q.message);return}E(),pe()})}let Ee=[];function ra(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=a=>{Ee=a.target.result.split(`
`).filter(l=>l.trim()).slice(1).map(l=>{const[s,m,r,c,p]=l.split(",").map(u=>u.trim().replace(/^"|"$/g,""));return{name:s,email:m,phone:r,company:c,job_title:p}}).filter(l=>l.name);const i=document.getElementById("import-preview");i&&(i.textContent=`${Ee.length} contato(s) encontrados para importar.`);const d=document.getElementById("import-modal-confirm");d&&(d.disabled=Ee.length===0)},n.readAsText(t)}async function ca(){if(!Ee.length)return;const e=document.getElementById("import-modal-confirm");e&&(e.disabled=!0,e.textContent="Importando…");const t=Ee.map(a=>({...a,stage:"novo",source:"importado",assigned_to:(f==null?void 0:f.id)||null,tenant_id:(f==null?void 0:f.tenant_id)||null})),{error:n}=await y.from("leads").insert(t);if(e&&(e.disabled=!1,e.textContent="Importar"),n){alert("Erro na importação: "+n.message);return}Qe(),await Lt(),alert(`${t.length} contato(s) importados com sucesso!`)}function ma(){const e=document.getElementById("import-modal");e&&e.classList.remove("hidden"),Ee=[];const t=document.getElementById("import-preview");t&&(t.textContent="");const n=document.getElementById("import-modal-confirm");n&&(n.disabled=!0);const a=document.getElementById("import-csv-file");a&&(a.value="")}function Qe(){const e=document.getElementById("import-modal");e&&e.classList.add("hidden")}const pa="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function ue(e){return(await fetch(pa,{method:"POST",headers:{Authorization:`Bearer ${zt}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function bt(e){var s,m,r,c;const t=document.getElementById("settings-name"),n=document.getElementById("settings-email"),a=document.getElementById("settings-avatar-preview"),o=document.getElementById("settings-avatar-initial"),i=document.getElementById("settings-avatar-input"),d=document.getElementById("settings-save-profile");if(!t)return;if(t.value=(e==null?void 0:e.name)||"",n){const{data:{user:p}}=await y.auth.getUser();n.value=(p==null?void 0:p.email)||""}const l=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(o&&(o.textContent=l),e!=null&&e.avatar_url&&a&&(a.src=e.avatar_url,a.style.display="",o&&(o.style.display="none")),i==null||i.addEventListener("change",p=>{const u=p.target.files[0];if(!u)return;const b=URL.createObjectURL(u);a&&(a.src=b,a.style.display=""),o&&(o.style.display="none")}),(s=document.getElementById("btn-change-password"))==null||s.addEventListener("click",async()=>{var h,v;const p=((h=document.getElementById("change-password-new"))==null?void 0:h.value)||"",u=((v=document.getElementById("change-password-confirm"))==null?void 0:v.value)||"",b=document.getElementById("change-password-msg"),x=document.getElementById("btn-change-password");if(b&&(b.style.display="none"),p.length<6){b&&(b.textContent="Mínimo 6 caracteres.",b.style.display="");return}if(p!==u){b&&(b.textContent="As senhas não coincidem.",b.style.display="");return}x&&(x.disabled=!0,x.textContent="Salvando…");const{error:E}=await y.auth.updateUser({password:p});x&&(x.disabled=!1,x.textContent="Salvar Nova Senha"),E?b&&(b.textContent="Erro: "+E.message,b.style.display=""):(b&&(b.style.color="#16a34a",b.textContent="Senha alterada com sucesso!",b.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),d==null||d.addEventListener("click",async()=>{var v;const p=t.value.trim();let u=(f==null?void 0:f.avatar_url)||"";const b=i==null?void 0:i.files[0],x=d.textContent;if(d.disabled=!0,d.textContent="Salvando…",b)try{const B=await Te(b,400,.85),k=`avatars/${f.id}-${Date.now()}.jpg`,{error:S}=await y.storage.from("imoveis").upload(k,B,{contentType:"image/jpeg",upsert:!0});if(!S){const{data:{publicUrl:$}}=y.storage.from("imoveis").getPublicUrl(k);u=$}}catch(B){console.error("Avatar upload:",B)}const{error:E}=await y.from("profiles").update({name:p,avatar_url:u}).eq("id",f.id);if(d.disabled=!1,d.textContent=x,E){alert("Erro ao salvar perfil.");return}f={...f,name:p,avatar_url:u},He(f);const h=document.getElementById("settings-avatar-initial");h&&(h.textContent=((v=p[0])==null?void 0:v.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"||(e==null?void 0:e.role)==="super_admin"){const p=document.getElementById("settings-corretores-section");p&&(p.style.display=""),await Oe(),(m=document.getElementById("btn-invite-corretor"))==null||m.addEventListener("click",async()=>{var v,B;const b=(v=document.getElementById("invite-email"))==null?void 0:v.value.trim(),x=(B=document.getElementById("invite-password"))==null?void 0:B.value.trim(),E=document.getElementById("btn-invite-corretor"),h=document.getElementById("invite-note");if(!b){alert("Informe o e-mail do corretor.");return}if(!x||x.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}E&&(E.disabled=!0,E.textContent="Criando…"),h&&(h.style.display="none");try{const k=await ue({email:b,password:x,tenant_id:(f==null?void 0:f.tenant_id)||null});if(k.success){const S=document.getElementById("invite-email"),$=document.getElementById("invite-password");S&&(S.value=""),$&&($.value=""),await Oe(),h&&(k.email_sent===!1?(h.innerHTML=`
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${g(b)}<br>
                <strong>Senha:</strong> ${g(x)}`,h.style.color="#0f172a"):(h.textContent="✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.",h.style.color="#16a34a"),h.style.display="")}else alert("Erro: "+(k.error||"Falha desconhecida"))}catch(k){alert("Erro ao criar acesso: "+k.message)}finally{E&&(E.disabled=!1,E.textContent="+ Criar Acesso")}});const u=document.getElementById("settings-locations-section");u&&(u.style.display=""),await Le(),(r=document.getElementById("loc-add-city-btn"))==null||r.addEventListener("click",async()=>{const b=document.getElementById("loc-new-city"),x=b==null?void 0:b.value.trim();if(!x)return;const{error:E}=await y.from("locations").insert({type:"cidade",name:x});if(E){alert("Erro ao adicionar cidade.");return}b&&(b.value=""),await Le(),it()}),(c=document.getElementById("loc-add-neighborhood-btn"))==null||c.addEventListener("click",async()=>{var v;const b=parseInt((v=document.getElementById("loc-new-neighborhood-city"))==null?void 0:v.value,10),x=document.getElementById("loc-new-neighborhood"),E=x==null?void 0:x.value.trim();if(!b||!E){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:h}=await y.from("locations").insert({type:"bairro",name:E,parent_id:b});if(h){alert("Erro ao adicionar bairro.");return}x&&(x.value=""),await Le()})}}async function Oe(){const e=document.getElementById("corretores-list");if(!e)return;let t=y.from("profiles").select("*").order("created_at");f!=null&&f.tenant_id&&(t=t.eq("tenant_id",f.tenant_id));const{data:n,error:a}=await t;if(a||!n){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=n.map(o=>{const i=(o.name||"?")[0].toUpperCase(),d=o.avatar_url?`<img src="${o.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${g(i)}</div>`,l=o.id===(f==null?void 0:f.id),s=o.active!==!1,m=s?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',r=l?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${o.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${o.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${o.role==="admin"?" selected":""}>Admin</option>
         </select>`,c=l?"":s?`<button class="corretor-toggle-btn" data-uid="${o.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${o.id}" data-active="false">Liberar acesso</button>`,p=l?"":`<button class="corretor-del-btn icon-btn" data-uid="${o.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${d}
        <div>
          <div class="corretor-name">${g(o.name||"—")}</div>
          <div class="corretor-role-badge">${o.role==="super_admin"?"⚡ Super Admin":o.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${m}
        ${r}
        ${c}
        ${p}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(o=>{o.addEventListener("change",async()=>{await y.from("profiles").update({role:o.value}).eq("id",o.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(o=>{o.addEventListener("click",async()=>{const i=o.dataset.uid,d=o.dataset.active==="true";o.disabled=!0,o.textContent="Aguarde…";try{const l=await ue({action:"toggle",userId:i,active:!d});l.success||alert("Erro: "+(l.error||"Falha desconhecida"))}catch(l){alert("Erro: "+l.message)}await Oe()})}),e.querySelectorAll(".corretor-del-btn").forEach(o=>{o.addEventListener("click",async()=>{var l,s;const i=o.dataset.uid,d=((s=(l=o.closest(".corretor-item"))==null?void 0:l.querySelector(".corretor-name"))==null?void 0:s.textContent)||"este corretor";if(confirm(`Excluir "${d}"? Esta ação não pode ser desfeita.`)){o.disabled=!0;try{const m=await ue({action:"delete",userId:i});m.success||alert("Erro ao excluir: "+(m.error||"Falha desconhecida"))}catch(m){alert("Erro: "+m.message)}await Oe()}})})}async function Ct(){const{data:e,error:t}=await y.from("locations").select("*").order("name");return t?(console.error("loadLocations:",t),[]):(_e=e||[],_e)}function ge(){return _e.filter(e=>e.type==="cidade")}function ot(e){return _e.filter(t=>t.type==="bairro"&&t.parent_id===e)}function it(){const e=document.getElementById("adminCitySelect");if(!e)return;const t=e.value,n=ge();e.innerHTML='<option value="">Selecione</option>'+n.map(a=>`<option value="${a.name}">${g(a.name)}</option>`).join(""),t&&(e.value=t)}async function Le(){await Ct();const e=ge(),t=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),a=document.getElementById("loc-new-neighborhood-city");if(!t||!n)return;t.innerHTML=e.length?e.map(i=>`
        <div class="loc-item">
          <span class="loc-item-name">${g(i.name)}</span>
          <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const o=_e.filter(i=>i.type==="bairro");n.innerHTML=o.length?o.map(i=>{const d=e.find(l=>l.id===i.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${g(i.name)}</div>
              ${d?`<div class="loc-item-sub">${g(d.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${i.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',a&&(a.innerHTML='<option value="">Cidade…</option>'+e.map(i=>`<option value="${i.id}">${g(i.name)}</option>`).join("")),t.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{const d=i.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${d}" e todos os bairros vinculados?`))return;const{error:l}=await y.from("locations").delete().eq("id",i.dataset.id);if(l){alert("Erro ao excluir.");return}await Le(),it()})}),n.querySelectorAll(".loc-del-btn").forEach(i=>{i.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:d}=await y.from("locations").delete().eq("id",i.dataset.id);if(d){alert("Erro ao excluir.");return}await Le()})})}function ht(){var n,a,o,i,d,l,s,m,r,c,p,u,b,x,E,h,v,B,k,S;document.querySelectorAll(".filter-btn").forEach($=>{$.addEventListener("click",()=>{const w=$.closest(".filter-btns"),I=$.classList.contains("active");w.querySelectorAll(".filter-btn").forEach(L=>L.classList.remove("active")),I||$.classList.add("active")})}),(n=document.getElementById("f-city"))==null||n.addEventListener("change",()=>{var T;const $=(T=document.getElementById("f-city"))==null?void 0:T.value,w=ge().find(C=>C.name===$),I=w?ot(w.id):[],L=document.getElementById("f-neighborhood");L&&(L.innerHTML='<option value="">Todos</option>'+I.map(C=>`<option value="${C.name}">${g(C.name)}</option>`).join(""))}),(a=document.getElementById("f-search-btn"))==null||a.addEventListener("click",()=>{Ce(at(_))}),(o=document.getElementById("f-clear-btn"))==null||o.addEventListener("click",()=>{const $=document.querySelector(".admin-filter-panel");if($){$.querySelectorAll('input[type="text"], input[type="number"]').forEach(I=>{I.value=""}),$.querySelectorAll("select").forEach(I=>{I.selectedIndex=0});const w=document.getElementById("f-neighborhood");w&&(w.innerHTML='<option value="">Todos</option>'),$.querySelectorAll(".filter-btn.active").forEach(I=>I.classList.remove("active"))}Ce(_)}),document.querySelectorAll(".topnav-link[data-section], .topnav-dropdown-item[data-section]").forEach($=>{$.addEventListener("click",()=>{me($.dataset.section)})}),document.querySelectorAll(".nav-item[data-section]").forEach($=>{$.addEventListener("click",()=>{me($.dataset.section)})});const e=document.getElementById("topnav-links"),t=document.getElementById("topnav-hamburger");t==null||t.addEventListener("click",()=>{e==null||e.classList.toggle("open")}),document.querySelectorAll(".topnav-dropdown-btn").forEach($=>{$.addEventListener("click",w=>{w.stopPropagation();const I=$.closest(".topnav-dropdown");I==null||I.classList.toggle("open"),document.querySelectorAll(".topnav-dropdown").forEach(L=>{L!==I&&L.classList.remove("open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".topnav-dropdown").forEach($=>$.classList.remove("open"))}),(i=document.getElementById("modal-close"))==null||i.addEventListener("click",ze),(d=document.getElementById("modal-cancel"))==null||d.addEventListener("click",ze),(l=document.getElementById("property-modal"))==null||l.addEventListener("click",$=>{$.target.id==="property-modal"&&ze()}),(s=document.getElementById("btn-new-property"))==null||s.addEventListener("click",()=>{R=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",de="",je([]),Ge("Novo Imóvel")}),(m=document.getElementById("logout-btn"))==null||m.addEventListener("click",async()=>{await y.auth.signOut(),location.reload()}),(r=document.getElementById("view-prev"))==null||r.addEventListener("click",()=>{W=(W-1+Z.length)%Z.length,Re()}),(c=document.getElementById("view-next"))==null||c.addEventListener("click",()=>{W=(W+1)%Z.length,Re()}),(p=document.getElementById("view-modal-close"))==null||p.addEventListener("click",qe),(u=document.getElementById("view-modal-close2"))==null||u.addEventListener("click",qe),(b=document.getElementById("view-modal"))==null||b.addEventListener("click",$=>{$.target.id==="view-modal"&&qe()}),(x=document.getElementById("view-modal-share"))==null||x.addEventListener("click",()=>{const $=document.getElementById("share-panel");if(!$)return;const w=$.style.display!=="none";$.style.display=w?"none":"block"}),(E=document.getElementById("share-whatsapp"))==null||E.addEventListener("click",()=>{var H,U,K;const $=(H=document.getElementById("share-link-input"))==null?void 0:H.value;if(!$)return;const w=Number((U=document.getElementById("share-panel"))==null?void 0:U.dataset.pid),I=_.find(oe=>oe.id===w),L=(I==null?void 0:I.title)||((K=document.getElementById("view-modal-title"))==null?void 0:K.textContent)||"Imóvel",T=I!=null&&I.price?` — ${re(I.price,"pt")}`:"",C=I!=null&&I.reference?` | Ref: ${I.reference}`:"",M=[I==null?void 0:I.neighborhood,I==null?void 0:I.city].filter(Boolean).join(", "),q=M?`
📍 ${M}`:"",F=encodeURIComponent(`Olha esse imóvel que encontrei: *${L}*${T}${C}${q}

${$}`);window.open("https://wa.me/?text="+F,"_blank")}),(h=document.getElementById("share-instagram"))==null||h.addEventListener("click",()=>{var w,I;const $=(w=document.getElementById("share-link-input"))==null?void 0:w.value;$&&((I=navigator.clipboard)==null||I.writeText($),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),(v=document.getElementById("share-email"))==null||v.addEventListener("click",()=>{var T,C;const $=(T=document.getElementById("share-link-input"))==null?void 0:T.value;if(!$)return;const w=((C=document.getElementById("view-modal-title"))==null?void 0:C.textContent)||"Imóvel",I=encodeURIComponent("Imóvel: "+w),L=encodeURIComponent(`Olá! Segue o link do imóvel:

`+$);window.open("mailto:?subject="+I+"&body="+L,"_blank")}),(B=document.getElementById("share-copy"))==null||B.addEventListener("click",()=>{var w;const $=document.getElementById("share-link-input");$&&((w=navigator.clipboard)==null||w.writeText($.value).then(()=>{const I=document.getElementById("share-copy"),L=I.textContent;I.textContent="✅ Copiado!",setTimeout(()=>{I.textContent=L},2e3)}))}),(k=document.getElementById("view-modal-edit"))==null||k.addEventListener("click",()=>{var M;if((f==null?void 0:f.role)!=="admin"&&(f==null?void 0:f.role)!=="super_admin")return;const $=Number(document.getElementById("view-modal-edit").dataset.pid),w=_.find(q=>q.id===$);if(!w)return;qe(),R=w.id;const I=document.getElementById("property-form"),L=document.getElementById("form-submit-btn");L.textContent="Salvar Alterações",I.querySelector('[name="title"]').value=w.title||"",I.querySelector('[name="rua"]').value=w.rua||"",I.querySelector('[name="numero"]').value=w.numero||"",I.querySelector('[name="city"]').value=w.city||"",I.querySelector('[name="price"]').value=w.price||"",I.querySelector('[name="bedrooms"]').value=w.bedrooms||"",I.querySelector('[name="suites"]').value=w.suites||"",I.querySelector('[name="parking"]').value=w.parking||"",I.querySelector('[name="description"]').value=w.description||"",I.querySelector('[name="construction_status"]').value=w.construction_status||"",I.querySelector('[name="owner_name"]').value=w.owner_name||"",I.querySelector('[name="owner_phone"]').value=w.owner_phone||"",I.querySelector('[name="owner_email"]').value=w.owner_email||"",I.querySelector('[name="owner_notes"]').value=w.owner_notes||"",I.querySelector('[name="condominium"]').value=w.condominium||"";const T=document.getElementById("adminPublished");T&&(T.value=w.published===!0?"true":"false");const C=document.getElementById("adminCitySelect");C&&(C.value=w.city||"",C.dispatchEvent(new Event("change")),setTimeout(()=>{const q=document.getElementById("adminNeighborhood");q&&(q.value=w.neighborhood||"")},50)),de=w.cover_image||((M=w.images)==null?void 0:M[0])||"",je(w.images||[]),Ge("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach($=>{$.addEventListener("click",()=>{var w;document.querySelectorAll(".tab-btn").forEach(I=>I.classList.remove("active")),$.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(I=>I.classList.add("hidden")),(w=document.getElementById(`tab-${$.dataset.tab}`))==null||w.classList.remove("hidden")})}),(S=document.getElementById("admin-properties"))==null||S.addEventListener("click",$=>{if($.target.closest(".action-btns"))return;const w=$.target.closest("tr");if(!w)return;const I=Number(w.dataset.id);if(!I)return;const L=_.find(T=>T.id===I);L&&Yt(L)})}async function ua(){const e=document.getElementById("section-depoimentos");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("site_content").select("value_pt").eq("key","testimonials").eq("tenant_id",z()).maybeSingle();let n=[];try{n=JSON.parse((t==null?void 0:t.value_pt)||"[]")}catch{n=[]}function a(d){const l=["#0d2144","#1a3a5c","#0a1628","#164a3c","#2d1b3d","#3d1a1a","#1a2f4a"];let s=0;for(const m of d||"?")s=s*31+m.charCodeAt(0)&4294967295;return l[Math.abs(s)%l.length]}function o(){e.querySelector("#dep-save-msg"),e.innerHTML=`
      <div class="section-topbar">
        <div>
          <div class="section-title">Depoimentos</div>
          <div class="section-sub">Gerencie os depoimentos exibidos no site público</div>
        </div>
        <button class="btn-primary" id="dep-add-btn">+ Novo Depoimento</button>
      </div>

      <div id="dep-list" style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;max-width:800px">
        ${n.length===0?'<p style="color:#94a3b8;font-size:14px">Nenhum depoimento cadastrado ainda.</p>':n.map((s,m)=>`
            <div class="dep-admin-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px">
              <div style="width:40px;height:40px;border-radius:50%;background:${a(s.name)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0">${(s.name||"?")[0].toUpperCase()}</div>
              <div style="flex:1;min-width:0">
                <div style="color:#f59e0b;font-size:14px;margin-bottom:4px">${"★".repeat(s.stars||5)}</div>
                <p style="color:#374151;font-size:14px;line-height:1.5;margin:0 0 6px;font-style:italic">"${g(s.text||"")}"</p>
                <div style="font-weight:600;font-size:13px;color:#0f172a">${g(s.name||"")}</div>
                <div style="font-size:12px;color:#64748b">${g(s.role||"")}</div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0">
                <button class="btn-cancel" data-edit="${m}" style="padding:6px 12px;font-size:12px">Editar</button>
                <button class="icon-btn del-btn" data-del="${m}" style="background:#fee2e2;color:#dc2626;border:none" title="Remover"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>
              </div>
            </div>`).join("")}
      </div>

      <div id="dep-form-wrap" style="display:none;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:12px;padding:24px;max-width:600px;margin-bottom:24px">
        <h3 id="dep-form-title" style="margin:0 0 16px;font-size:16px;color:#0f172a">Novo Depoimento</h3>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label class="form-label">Avaliação</label>
            <select id="dep-stars" class="form-control" style="max-width:180px">
              <option value="5">★★★★★ (5 estrelas)</option>
              <option value="4">★★★★☆ (4 estrelas)</option>
              <option value="3">★★★☆☆ (3 estrelas)</option>
            </select>
          </div>
          <div>
            <label class="form-label">Depoimento <span style="color:#94a3b8;font-size:11px">(sem aspas)</span></label>
            <textarea id="dep-text" class="form-control" rows="3" placeholder="O Isaac foi muito além do esperado..."></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label class="form-label">Nome</label>
              <input id="dep-name" class="form-control" placeholder="Fernando Almeida">
            </div>
            <div>
              <label class="form-label">Cargo / Cidade</label>
              <input id="dep-role" class="form-control" placeholder="Investidor — São Paulo, SP">
            </div>
          </div>
          <div style="display:flex;gap:10px;margin-top:4px">
            <button class="btn-primary" id="dep-form-save">Salvar</button>
            <button class="btn-cancel" id="dep-form-cancel">Cancelar</button>
            <span id="dep-save-msg" class="cfg-save-msg" style="display:none;align-self:center"></span>
          </div>
        </div>
      </div>
    `,e.dataset.loaded="1";let d=-1;function l(s=-1){d=s;const m=e.querySelector("#dep-form-wrap");m.style.display="",e.querySelector("#dep-form-title").textContent=s>=0?"Editar Depoimento":"Novo Depoimento";const r=s>=0?n[s]:{};e.querySelector("#dep-stars").value=String(r.stars||5),e.querySelector("#dep-text").value=r.text||"",e.querySelector("#dep-name").value=r.name||"",e.querySelector("#dep-role").value=r.role||"",e.querySelector("#dep-text").focus()}e.querySelector("#dep-add-btn").addEventListener("click",()=>l(-1)),e.querySelector("#dep-form-cancel").addEventListener("click",()=>{e.querySelector("#dep-form-wrap").style.display="none",d=-1}),e.addEventListener("click",s=>{const m=s.target.closest("[data-edit]"),r=s.target.closest("[data-del]");if(m&&l(parseInt(m.dataset.edit)),r){const c=parseInt(r.dataset.del);confirm("Remover este depoimento?")&&(n.splice(c,1),i().then(()=>o()))}}),e.querySelector("#dep-form-save").addEventListener("click",async()=>{const s=e.querySelector("#dep-form-save"),m=e.querySelector("#dep-save-msg"),r=e.querySelector("#dep-text").value.trim(),c=e.querySelector("#dep-name").value.trim(),p=e.querySelector("#dep-role").value.trim(),u=parseInt(e.querySelector("#dep-stars").value);if(!r||!c){alert("Preencha o depoimento e o nome.");return}s.disabled=!0,s.textContent="Salvando…";const b={stars:u,text:r,name:c,role:p};d>=0?n[d]=b:n.push(b);const x=await i();s.disabled=!1,s.textContent="Salvar",P(m,x),x&&(e.querySelector("#dep-form-wrap").style.display="none",d=-1,o())})}async function i(){const d=JSON.stringify(n);return await Ae("testimonials",{pt:d,en:d,es:d})}o()}document.addEventListener("DOMContentLoaded",async()=>{var l,s,m;const t=window.location.hostname.replace(/^www\./,"");if(t&&t!=="localhost"&&t!=="127.0.0.1"){const r=`imobi_tenant_${t}`,c=Me(r);if(c)ve(c);else{let p=null;for(const u of[t,"www."+t]){const{data:b}=await y.from("tenants").select("id").eq("domain",u).maybeSingle();if(b!=null&&b.id){p=b;break}}p!=null&&p.id&&(ve(p.id),Xe(r,p.id,24*60*60*1e3))}}await Promise.all([Mt(),Ct()]),le=G("company.whatsapp",le),tt(),Gt(),Vt();const n=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");n&&a&&(it(),n.addEventListener("change",()=>{const r=ge().find(p=>p.name===n.value),c=r?ot(r.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+c.map(p=>`<option value="${p.name}">${g(p.name)}</option>`).join("")}));const o=document.getElementById("admin-login"),i=document.getElementById("admin-root");if(o){const r=new URLSearchParams(window.location.hash.replace("#","")),c=new URLSearchParams(window.location.search),p=r.get("type")||c.get("type")||"",u=It||p==="recovery"||p==="invite"||window.location.hash.includes("access_token")||c.has("code"),b=document.getElementById("password-reset-overlay");if(u){o.style.display="none",i&&i.classList.add("hidden"),b&&(b.style.display="flex"),(l=document.getElementById("password-reset-form"))==null||l.addEventListener("submit",async E=>{var $,w;E.preventDefault();const h=(($=document.getElementById("new-password"))==null?void 0:$.value)||"",v=((w=document.getElementById("confirm-password"))==null?void 0:w.value)||"",B=document.getElementById("password-reset-msg"),k=E.target.querySelector('button[type="submit"]');if(B&&(B.style.display="none"),h!==v){B&&(B.textContent="As senhas não coincidem.",B.style.display="");return}k&&(k.disabled=!0,k.textContent="Salvando…");const{error:S}=await y.auth.updateUser({password:h});if(S){B&&(B.textContent="Erro: "+S.message,B.style.display=""),k&&(k.disabled=!1,k.textContent="Definir Senha");return}window.location.href=window.location.pathname}),c.has("code")&&await y.auth.exchangeCodeForSession(c.get("code")??"");return}const{data:{session:x}}=await y.auth.getSession();if(x){if(o.classList.add("hidden"),i&&i.classList.remove("hidden"),Fe(),ht(),gt(),window.lucide&&lucide.createIcons(),f=await mt(x.user.id),!f){await y.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden");return}if(f.active===!1){await y.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(f.needs_password_reset){o.style.display="none",i&&i.classList.add("hidden");const E=document.getElementById("password-reset-overlay");E&&(E.style.display="flex"),(s=document.getElementById("password-reset-form"))==null||s.addEventListener("submit",async h=>{var w,I;h.preventDefault();const v=((w=document.getElementById("new-password"))==null?void 0:w.value)||"",B=((I=document.getElementById("confirm-password"))==null?void 0:I.value)||"",k=document.getElementById("password-reset-msg"),S=h.target.querySelector('button[type="submit"]');if(k&&(k.style.display="none"),v!==B){k&&(k.textContent="As senhas não coincidem.",k.style.display="");return}if(v.length<6){k&&(k.textContent="Mínimo 6 caracteres.",k.style.display="");return}S&&(S.disabled=!0,S.textContent="Salvando…");const{error:$}=await y.auth.updateUser({password:v});if($){k&&(k.textContent="Erro: "+$.message,k.style.display=""),S&&(S.disabled=!1,S.textContent="Definir Senha");return}await y.from("profiles").update({needs_password_reset:!1}).eq("id",f.id),window.location.href=window.location.pathname});return}ve((f==null?void 0:f.tenant_id)||null),He(f),pt(f),ut(f.role),await Ne(),await bt(f),window.lucide&&lucide.createIcons(),la()}else{i&&i.classList.add("hidden"),o.classList.remove("hidden");const E=document.getElementById("login-form");E&&((m=document.getElementById("forgot-password-btn"))==null||m.addEventListener("click",async()=>{var B,k;const h=(k=(B=E.querySelector('input[name="email"]'))==null?void 0:B.value)==null?void 0:k.trim();if(!h){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:v}=await y.auth.resetPasswordForEmail(h,{redirectTo:"https://omarcorretor.com.br/ios.imobi.html"});alert(v?"Erro: "+v.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),E.addEventListener("submit",async h=>{h.preventDefault();const v=E.querySelector('button[type="submit"]'),B=new FormData(E),k=B.get("email"),S=B.get("password");v&&(v.disabled=!0,v.textContent="Entrando…");try{if(await Ut(k,S)){o.classList.add("hidden"),i&&i.classList.remove("hidden"),Fe(),ht(),window.lucide&&lucide.createIcons();const{data:{session:w}}=await y.auth.getSession();if(f=w?await mt(w.user.id):null,!f){await y.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Perfil não encontrado. Entre em contato com o administrador.");return}if(f.active===!1){await y.auth.signOut(),o.classList.remove("hidden"),i&&i.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}gt(),ve((f==null?void 0:f.tenant_id)||null),He(f),pt(f),ut(f.role),await Ne(),await bt(f),window.lucide&&lucide.createIcons()}else alert("E-mail ou senha incorretos")}catch($){alert("Erro ao fazer login: "+(($==null?void 0:$.message)||String($)))}finally{v&&(v.disabled=!1,v.textContent="Entrar")}}))}}else Fe();await ce();const d=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();rt(d),ct(le),window._applyDynamicContent=rt,window._applyWhatsAppLinks=ct,document.querySelectorAll(".nav-dropdown-btn").forEach(r=>{var p;const c=(p=r.closest(".nav-dropdown"))==null?void 0:p.querySelector(".nav-dropdown-menu");c&&r.addEventListener("click",u=>{u.stopPropagation(),c.classList.toggle("js-open"),document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(b=>{b!==c&&b.classList.remove("js-open")})})}),document.addEventListener("click",()=>{document.querySelectorAll(".nav-dropdown-menu.js-open").forEach(r=>r.classList.remove("js-open"))})});async function ga(){const e=_.filter(o=>!o.reference);if(!e.length)return;const t=_.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10));let n=t.length?Math.max(...t)+1:1;const a=[...e].sort((o,i)=>o.id-i.id);for(const o of a){const i="IO-"+String(n).padStart(4,"0"),{error:d}=await y.from("properties").update({reference:i}).eq("id",o.id);if(!d){const l=_.findIndex(s=>s.id===o.id);l>=0&&(_[l].reference=i),n++}}Ce(at(_))}async function fa(){const e=_.filter(t=>{var n;return(n=t.images)==null?void 0:n.some(a=>!a.includes("/wm-"))});if(e.length){for(const t of e){if(!t.images.some(i=>!i.includes("/wm-")))continue;const a=[];let o=!1;for(const i of t.images)if(i.includes("/wm-"))a.push(i);else try{const d=await va(i);a.push(d),o=!0}catch{a.push(i)}if(o){await y.from("properties").update({images:a}).eq("id",t.id);const i=_.findIndex(d=>d.id===t.id);i>=0&&(_[i].images=a)}}Ce(at(_))}}async function va(e){try{const t=await fetch(e);if(!t.ok)return e;const n=await t.blob(),a=URL.createObjectURL(n),o=await fetch("/logo.png"),i=o.ok?await o.blob():null,d=i?URL.createObjectURL(i):null;return new Promise(l=>{const s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const m=document.createElement("canvas"),r=1200;let c=s.width,p=s.height;c>r&&(p=Math.round(p*r/c),c=r),m.width=c,m.height=p;const u=m.getContext("2d");u.drawImage(s,0,0,c,p);const b=x=>{if(x){const E=Math.round(c*.18),h=Math.round(x.naturalHeight*E/x.naturalWidth),v=Math.round(c*.02);u.globalAlpha=.45,u.drawImage(x,c-E-v,p-h-v,E,h),u.globalAlpha=1}m.toBlob(async E=>{try{const h=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:v}=await y.storage.from("imoveis").upload(h,E,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(v){console.error("Upload watermark error:",v),l(e);return}const{data:{publicUrl:B}}=y.storage.from("imoveis").getPublicUrl(h);l(B)}catch(h){console.error("Watermark upload exception:",h),l(e)}},"image/jpeg",.82)};if(d){const x=new Image;x.onload=()=>{URL.revokeObjectURL(d),b(x)},x.onerror=()=>{URL.revokeObjectURL(d),b(null)},x.src=d}else b(null)},s.onerror=()=>{URL.revokeObjectURL(a),l(e)},s.src=a})}catch(t){return console.error("applyWatermarkToUrl error:",t),e}}function P(e,t){e&&(e.textContent=t?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(t?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function st(e,t="assets"){const n=await Te(e,1200,.85),a=`${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:o}=await y.storage.from("imoveis").upload(a,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(o)throw o;const{data:{publicUrl:i}}=y.storage.from("imoveis").getPublicUrl(a);return i}async function ya(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",z()),n={};t==null||t.forEach(o=>{n[o.key]=o.value||""});const a=o=>g(String(n[o]||""));e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Empresa</div><div class="section-sub">Identidade, contatos e redes sociais</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏢</span> Identidade</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nome da Empresa</label>
          <input id="co-name" class="form-control" value="${a("company.name")}" placeholder="Nome completo">
          <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece no <strong>cabeçalho, rodapé e aba do navegador</strong> do site.</p>
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
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece no <strong>topo e rodapé do site</strong>. PNG transparente, mín. 200×60 px.</p>
        <div class="logo-preview-box" style="margin-top:10px">
          <img id="co-logo-preview" src="${a("company.logo_url")||"/logo.png"}" alt="Preview">
          <span style="font-size:12px;color:#9ca3af">Preview do logotipo</span>
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Favicon (URL)</label>
        <input id="co-favicon-url" class="form-control" value="${a("company.favicon_url")}" placeholder="/favicon.ico">
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Ícone exibido na <strong>aba do navegador</strong>.</p>
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
          <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Ativa o <strong>botão verde flutuante</strong> no site e no link de cada imóvel.</p>
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
  `,document.getElementById("co-logo-url").addEventListener("input",o=>{document.getElementById("co-logo-preview").src=o.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async o=>{const i=o.target.files[0];if(i)try{const d=await st(i,"logos");document.getElementById("co-logo-url").value=d,document.getElementById("co-logo-preview").src=d}catch(d){alert("Erro no upload: "+d.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const o=document.getElementById("co-save-identity");o.disabled=!0,o.textContent="Salvando…";const i=await xe([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);i&&tt(),o.disabled=!1,o.textContent="Salvar Identidade",P(document.getElementById("co-identity-msg"),i)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const o=document.getElementById("co-save-contacts");o.disabled=!0,o.textContent="Salvando…";const i=document.getElementById("co-whatsapp").value.trim(),d=await xe([["company.whatsapp",i],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);d&&i&&(le=i),o.disabled=!1,o.textContent="Salvar Contatos",P(document.getElementById("co-contacts-msg"),d)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const o=document.getElementById("co-save-social");o.disabled=!0,o.textContent="Salvando…";const i=await xe([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);o.disabled=!1,o.textContent="Salvar Redes Sociais",P(document.getElementById("co-social-msg"),i)})}async function ba(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("settings").select("key,value").eq("tenant_id",z()),n={};t==null||t.forEach(r=>{n[r.key]=r.value||""});const a=n["visual.accent_color"]||"#b8962e",o=n["visual.primary_bg"]||"#0f1c2e",i=n["visual.secondary_bg"]||"#1a2f4a",d=n["visual.hero_bg_url"]||"",l=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
        <div>
          <label class="form-label">Cor de Destaque</label>
          <p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">📍 Botões, links ativos e ícones no <strong>site e no CRM</strong>.</p>
        </div>
        <div class="color-swatch">
          <input type="color" id="col-accent" value="${a}">
          <input type="text"  id="col-accent-hex" value="${a}" maxlength="7" placeholder="#b8962e">
        </div>
      </div>
      <div class="color-row">
        <div>
          <label class="form-label">Fundo Principal</label>
          <p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">📍 Cor do <strong>cabeçalho e seções escuras</strong> do site.</p>
        </div>
        <div class="color-swatch">
          <input type="color" id="col-primary" value="${o}">
          <input type="text"  id="col-primary-hex" value="${o}" maxlength="7">
        </div>
      </div>
      <div class="color-row">
        <div>
          <label class="form-label">Fundo Secundário</label>
          <p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">📍 Cor das <strong>seções intermediárias</strong> do site.</p>
        </div>
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
        <label class="form-label">Imagem de Fundo do Hero (Banner Principal)</label>
        <div style="display:flex;gap:8px">
          <input id="vis-hero-url" class="form-control" value="${g(d)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 <strong>Foto de fundo do banner</strong> no topo do site. Recomendado: 1920×1080 px.</p>
        <div id="vis-hero-preview" style="margin-top:10px;display:${d?"":"none"}">
          <img src="${g(d)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function s(r,c,p){const u=document.getElementById(r),b=document.getElementById(c);u==null||u.addEventListener("input",x=>{b.value=x.target.value,p()}),b==null||b.addEventListener("input",x=>{/^#[0-9a-fA-F]{6}$/.test(x.target.value)&&(u.value=x.target.value,p())})}function m(){var c,p,u,b;const r=((c=document.getElementById("col-accent-hex"))==null?void 0:c.value)||"#b8962e";(p=document.getElementById("vp-bar"))==null||p.style.setProperty("background",r),(u=document.getElementById("vp-dot"))==null||u.style.setProperty("background",r),(b=document.getElementById("vp-btn"))==null||b.style.setProperty("background",r),document.documentElement.style.setProperty("--accent",r)}s("col-accent","col-accent-hex",m),s("col-primary","col-primary-hex",()=>{}),s("col-secondary","col-secondary-hex",()=>{}),m(),document.getElementById("vis-hero-file").addEventListener("change",async r=>{const c=r.target.files[0];if(c)try{const p=await st(c,"hero");document.getElementById("vis-hero-url").value=p;const u=document.getElementById("vis-hero-preview");u.innerHTML=`<img src="${p}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,u.style.display=""}catch(p){alert("Erro no upload: "+p.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const r=document.getElementById("visual-save-colors");r.disabled=!0,r.textContent="Salvando…";const c=await xe([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);c&&tt(),r.disabled=!1,r.textContent="Salvar Cores",P(document.getElementById("visual-colors-msg"),c)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",m())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const r=document.getElementById("visual-save-images");r.disabled=!0,r.textContent="Salvando…";const c=await xe([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);r.disabled=!1,r.textContent="Salvar Imagens",P(document.getElementById("visual-images-msg"),c)})}async function ha(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("site_content").select("*").eq("tenant_id",z()),n={};t==null||t.forEach(s=>{n[s.key]=s});const a=(s,m)=>{var r;return g(((r=n[s])==null?void 0:r[`value_${m}`])||"")},o=["pt","en","es"],i={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},d=s=>o.map(m=>`<button class="content-tab${m===s?" active":""}" data-lang="${m}">${i[m]}</button>`).join(""),l=s=>`
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${s}" value="${a("hero.title",s)}">
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto principal em <strong>destaque no banner do site</strong> (frase de impacto).</p>
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${s}" rows="3">${a("hero.subtitle",s)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto menor abaixo do título, também no <strong>banner principal</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${s}" rows="4">${a("inst.bio_p1",s)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece na seção <strong>"Sobre"</strong> do site.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${s}" rows="3">${a("inst.bio_p2",s)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Segundo parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${s}" rows="3">${a("inst.bio_p3",s)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Terceiro parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${s}" value="${a("inst.stat1_num",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${s}" value="${a("inst.stat2_num",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${s}" value="${a("inst.stat3_num",s)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${s}" value="${a("inst.stat1_label",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${s}" value="${a("inst.stat2_label",s)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${s}" value="${a("inst.stat3_label",s)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${s}" value="${a("footer.text",s)}">
    </div>
  `;e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${d("pt")}</div>
      <div id="sc-panels">
        ${o.map(s=>`<div class="content-panel${s==="pt"?" active":""}" data-panel="${s}">${l(s)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",s=>{var r;const m=s.target.closest(".content-tab");m&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(c=>c.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(c=>c.classList.remove("active")),m.classList.add("active"),(r=document.querySelector(`#sc-panels [data-panel="${m.dataset.lang}"]`))==null||r.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const s=document.getElementById("sc-save-btn");s.disabled=!0,s.textContent="Salvando…";const m={};document.querySelectorAll(".sc-field").forEach(c=>{const p=c.dataset.key,u=c.dataset.lang;m[p]||(m[p]={}),m[p][u]=c.value});let r=!0;for(const[c,p]of Object.entries(m))await Ae(c,{pt:p.pt,en:p.en,es:p.es})||(r=!1);s.disabled=!1,s.textContent="Salvar Conteúdo",P(document.getElementById("sc-save-msg"),r)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const s=document.getElementById("seo-save-btn");s.disabled=!0,s.textContent="Salvando…";const m=document.getElementById("seo-title").value.trim(),r=document.getElementById("seo-desc").value.trim(),c=await Ae("seo.title_pt",{pt:m,en:m,es:m})&&await Ae("seo.description_pt",{pt:r,en:r,es:r});s.disabled=!1,s.textContent="Salvar SEO",P(document.getElementById("seo-save-msg"),c)})}async function xa(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await Q())}async function Q(){const e=document.getElementById("crm-body");if(!e)return;const t=z(),[{data:n},{data:a},{data:o},{data:i}]=await Promise.all([y.from("crm_pipelines").select("*").eq("tenant_id",t).order("sort_order"),y.from("crm_stages").select("*").eq("tenant_id",t).order("sort_order"),y.from("crm_tags").select("*").eq("tenant_id",t).order("name"),y.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("sort_order")]),d=n||[],l=d.find(u=>u.is_default)||d[0],s=d.map(u=>`<option value="${u.id}"${u.id===(l==null?void 0:l.id)?" selected":""}>${g(u.name)}</option>`).join(""),r=(a||[]).filter(u=>u.pipeline_id===(l==null?void 0:l.id)).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${g(u.name)}</span>
      <input type="color" value="${u.color}" data-sid="${u.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${u.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',c=(o||[]).map(u=>`<span class="tag-chip" style="background:${u.color}" data-id="${u.id}">
      ${g(u.name)}
      <button class="tag-chip-del" data-id="${u.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',p=(i||[]).map(u=>`
    <div class="stage-item" data-id="${u.id}">
      <div class="stage-color-dot" style="background:${u.color}"></div>
      <span class="stage-name">${g(u.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${u.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${u.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${s}</select>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const u=document.getElementById("crm-new-stage").value.trim(),b=document.getElementById("crm-new-stage-color").value,x=parseInt(document.getElementById("crm-pipe-sel").value,10);u&&(await y.from("crm_stages").insert({pipeline_id:x,name:u,color:b,sort_order:99,tenant_id:z()}),document.getElementById("crm-new-stage").value="",await Q())}),e.querySelectorAll(".stage-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await y.from("crm_stages").delete().eq("id",u.dataset.id),await Q())})}),e.querySelectorAll(".stage-color-pick").forEach(u=>{u.addEventListener("change",async b=>{await y.from("crm_stages").update({color:b.target.value}).eq("id",u.dataset.sid);const x=u.closest(".stage-item").querySelector(".stage-color-dot");x&&(x.style.background=b.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const u=document.getElementById("crm-new-tag").value.trim(),b=document.getElementById("crm-new-tag-color").value;u&&(await y.from("crm_tags").insert({name:u,color:b,tenant_id:z()}),document.getElementById("crm-new-tag").value="",await Q())}),e.querySelectorAll(".tag-chip-del").forEach(u=>{u.addEventListener("click",async()=>{await y.from("crm_tags").delete().eq("id",u.dataset.id),await Q()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const u=document.getElementById("crm-new-status").value.trim(),b=document.getElementById("crm-new-status-color").value,x=document.getElementById("crm-new-status-final").checked;u&&(await y.from("crm_lead_statuses").insert({name:u,color:b,is_final:x,sort_order:99,tenant_id:z()}),document.getElementById("crm-new-status").value="",await Q())}),e.querySelectorAll(".status-del").forEach(u=>{u.addEventListener("click",async()=>{confirm("Remover este status?")&&(await y.from("crm_lead_statuses").delete().eq("id",u.dataset.id),await Q())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var x;const u=(x=prompt("Nome do novo funil:"))==null?void 0:x.trim();if(!u)return;const{error:b}=await y.from("crm_pipelines").insert({name:u,sort_order:99,tenant_id:z()});if(b){alert("Erro ao criar funil: "+b.message);return}We=!1,await Q()})}async function Ea(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:t}=await y.from("integrations").select("*"),n={};t==null||t.forEach(l=>{n[l.key]=l});const a=l=>{var s;return g(((s=n[l])==null?void 0:s.value)||"")},o=l=>{var s;return(s=n[l])!=null&&s.enabled?"checked":""},i=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],d=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
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
      ${d.map(l=>`
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var c;const l=document.getElementById("intg-save-tracking");l.disabled=!0,l.textContent="Salvando…";let s=!0;const m=document.querySelectorAll(".intg-val"),r=document.querySelectorAll(".intg-toggle");for(let p=0;p<m.length;p++){const u=m[p].dataset.key,b=m[p].value.trim(),x=((c=r[p])==null?void 0:c.checked)??!1;await Pe(u,b,x)||(s=!1)}l.disabled=!1,l.textContent="Salvar Integrações",P(document.getElementById("intg-tracking-msg"),s)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const l=document.getElementById("intg-save-smtp");l.disabled=!0,l.textContent="Salvando…";const s=document.querySelectorAll(".smtp-field");let m=!0;for(const c of s)await Pe(c.dataset.key,c.value.trim(),!0)||(m=!1);const r=document.getElementById("smtp-pass").value;r&&(await Pe("smtp_pass",r,!0)||(m=!1)),l.disabled=!1,l.textContent="Salvar SMTP",P(document.getElementById("intg-smtp-msg"),m)})}async function wa(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await Ze(),document.getElementById("media-file-input").addEventListener("change",async n=>{var s,m;const a=Array.from(n.target.files);if(!a.length)return;const o=document.getElementById("media-upload-progress"),i=document.getElementById("media-progress-fill"),d=document.getElementById("media-progress-text");o.style.display="";let l=0;for(const r of a){d.textContent=`Enviando ${l+1}/${a.length}…`,i.style.width=`${Math.round(l/a.length*100)}%`;try{const c=await st(r,"media"),p=r.name.replace(/\.[^.]+$/,"").slice(0,60);await y.from("media_library").insert({name:p,url:c,type:"image",size:r.size,created_by:(m=(s=(await y.auth.getUser()).data)==null?void 0:s.user)==null?void 0:m.id})}catch(c){console.error("Media upload error:",c)}l++}i.style.width="100%",d.textContent=`✓ ${l} arquivo(s) enviado(s)`,setTimeout(()=>{o.style.display="none",i.style.width="0"},2e3),await Ze(),n.target.value=""});const t=document.getElementById("media-drop-area");t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("drag-over")),t.addEventListener("drop",n=>{n.preventDefault(),t.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function Ze(){const e=document.getElementById("media-grid");if(!e)return;const{data:t,error:n}=await y.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(t!=null&&t.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=t.map(a=>`
    <div class="media-item" data-id="${a.id}" data-url="${g(a.url)}">
      <img src="${g(a.url)}" alt="${g(a.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${g(a.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${a.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${g(a.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation(),(i=navigator.clipboard)==null||i.writeText(a.dataset.url).then(()=>{const d=a.textContent;a.textContent="✓ Copiado!",setTimeout(()=>{a.textContent=d},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(a=>{a.addEventListener("click",async o=>{o.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await y.from("media_library").delete().eq("id",a.dataset.id),await Ze())})})}async function Ia(){var t,n,a,o,i;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
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
  `,e.querySelectorAll(".sa-tab").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(s=>s.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(s=>s.classList.add("hidden")),d.classList.add("active");const l=e.querySelector(`#sa-panel-${d.dataset.tab}`);l&&l.classList.remove("hidden"),d.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&ae(),d.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&$a(),d.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&xt(),d.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&Et(),d.dataset.tab==="platform"&&wt()})}),(t=e.querySelector("#sa-sub-filter"))==null||t.addEventListener("change",xt),(n=e.querySelector("#sa-tenant-search"))==null||n.addEventListener("input",ae),(a=e.querySelector("#sa-user-search"))==null||a.addEventListener("input",Et),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>Sa()),(i=e.querySelector("#sa-plat-save"))==null||i.addEventListener("click",ka),ae(),wt())}async function ae(){var l,s;const e=document.getElementById("sa-tenants-list"),t=((s=(l=document.getElementById("sa-tenant-search"))==null?void 0:l.value)==null?void 0:s.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=y.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${o.message}</div>`;return}const i=(a||[]).filter(m=>{var r,c;return!t||((r=m.name)==null?void 0:r.toLowerCase().includes(t))||((c=m.slug)==null?void 0:c.toLowerCase().includes(t))});if(!i.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const d=m=>m.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=i.map(m=>{var r;return`
    <div class="sa-list-row" data-action="open-panel" data-id="${m.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${m.logo_url?`<img class="sa-tenant-logo" src="${g(m.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${g(m.name||"—")}</div>
          <div class="sa-list-sub">${g(m.slug||"")} · ${g(((r=m.plans)==null?void 0:r.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${d(m)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${m.id}" data-active="${m.active}" title="${m.active?"Desativar":"Ativar"}">${m.active?"⏸️":"▶️"}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(m=>{m.addEventListener("click",async r=>{r.stopPropagation();const c=m.dataset.active==="true";await y.from("tenants").update({active:!c}).eq("id",m.dataset.id),ae()})}),e.querySelectorAll('[data-action="open-panel"]').forEach(m=>{m.addEventListener("click",()=>{const r=(i||[]).find(c=>String(c.id)===String(m.dataset.id));r&&La(r)})})}async function $a(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:t,error:n}=await y.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(t||[]).map(a=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${g(a.name)}</div>
      <div class="sa-plan-price">${a.price_brl===0?"Gratuito":"R$ "+Number(a.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${a.max_users===999?"Ilimitado":a.max_users} usuários</span>
        <span>🏠 ${a.max_properties===9999?"Ilimitado":a.max_properties} imóveis</span>
        <span>📋 ${a.max_leads===99999?"Ilimitado":a.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function xt(){var l;const e=document.getElementById("sa-subs-list"),t=((l=document.getElementById("sa-sub-filter"))==null?void 0:l.value)||"";if(!e)return;e.dataset.loaded="1";let n=y.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:a,error:o}=await n;if(o){e.innerHTML=`<div class="sa-error">Erro: ${o.message}</div>`;return}if(!(a!=null&&a.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const i={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},d={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=a.map(s=>{var m,r,c;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${g(((m=s.tenants)==null?void 0:m.name)||"—")}</div>
          <div class="sa-list-sub">${g(((r=s.plans)==null?void 0:r.name)||"—")} · R$ ${Number(((c=s.plans)==null?void 0:c.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${i[s.status]||"gray"}">${d[s.status]||s.status}</span>
        <span class="sa-list-date">${s.current_period_end?new Date(s.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function Et(){var d,l;const e=document.getElementById("sa-users-list"),t=((l=(d=document.getElementById("sa-user-search"))==null?void 0:d.value)==null?void 0:l.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:a}=await y.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(a){e.innerHTML=`<div class="sa-error">Erro: ${a.message}</div>`;return}const o=(n||[]).filter(s=>{var m,r;return!t||((m=s.name)==null?void 0:m.toLowerCase().includes(t))||((r=s.email)==null?void 0:r.toLowerCase().includes(t))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const i={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=o.map(s=>{var m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(s.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${g(s.name||"—")}</div>
          <div class="sa-list-sub">${g(((m=s.tenants)==null?void 0:m.name)||"Sem imobiliária")} · ${i[s.role]||s.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${s.active!==!1?"sa-badge-green":"sa-badge-red"}">${s.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function wt(){const[e,t,n,a]=await Promise.all([y.from("tenants").select("id",{count:"exact",head:!0}),y.from("profiles").select("id",{count:"exact",head:!0}),y.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),y.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),o=(i,d)=>{const l=document.getElementById(i);l&&(l.textContent=d??"—")};o("sa-stat-tenants",e.count),o("sa-stat-users",t.count),o("sa-stat-subs",n.count),o("sa-stat-props",a.count)}async function ka(){var n,a,o;const e=document.getElementById("sa-plat-save"),t=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await xe([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((a=document.getElementById("sa-plat-email"))==null?void 0:a.value)||""},{key:"platform.trial_days",value:((o=document.getElementById("sa-plat-trial"))==null?void 0:o.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),P(t,!0)}function Ba(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Sa(){var a,o,i,d,l,s;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const t=document.createElement("div");t.id="sa-new-tenant-modal",t.className="sa-modal-backdrop",t.innerHTML=`
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
  `,document.body.appendChild(t),y.from("plans").select("id, name").then(({data:m})=>{const r=document.getElementById("nt-plan");r&&m&&(r.innerHTML='<option value="">Sem plano</option>'+m.map(c=>`<option value="${c.id}">${g(c.name)}</option>`).join(""))}),(a=document.getElementById("nt-name"))==null||a.addEventListener("input",m=>{const r=document.getElementById("nt-slug");r&&!r.dataset.manual&&(r.value=Ba(m.target.value))}),(o=document.getElementById("nt-slug"))==null||o.addEventListener("input",m=>{m.target.dataset.manual="1"}),(i=document.getElementById("nt-pwd-toggle"))==null||i.addEventListener("click",()=>{const m=document.getElementById("nt-admin-password");m.type=m.type==="password"?"text":"password"});const n=()=>t.remove();(d=document.getElementById("sa-modal-close-btn"))==null||d.addEventListener("click",n),(l=document.getElementById("nt-cancel"))==null||l.addEventListener("click",n),t.addEventListener("click",m=>{m.target===t&&n()}),(s=document.getElementById("nt-save"))==null||s.addEventListener("click",async()=>{var S,$,w,I,L,T,C,M,q,F,H,U;const m=($=(S=document.getElementById("nt-name"))==null?void 0:S.value)==null?void 0:$.trim(),r=(I=(w=document.getElementById("nt-slug"))==null?void 0:w.value)==null?void 0:I.trim(),c=(T=(L=document.getElementById("nt-domain"))==null?void 0:L.value)==null?void 0:T.trim(),p=(C=document.getElementById("nt-plan"))==null?void 0:C.value,u=(q=(M=document.getElementById("nt-admin-email"))==null?void 0:M.value)==null?void 0:q.trim(),b=(H=(F=document.getElementById("nt-admin-password"))==null?void 0:F.value)==null?void 0:H.trim(),x=document.getElementById("nt-msg"),E=document.getElementById("nt-save");if(!m||!r){x.textContent="❌ Nome e slug são obrigatórios.",x.style.color="#ef4444";return}if(!u){x.textContent="❌ Informe o e-mail do admin.",x.style.color="#ef4444";return}if(!b||b.length<6){x.textContent="❌ A senha precisa ter mínimo 6 caracteres.",x.style.color="#ef4444";return}E.disabled=!0,E.textContent="Criando…",x.textContent="⏳ Criando imobiliária…",x.style.color="#64748b";const{data:h,error:v}=await y.from("tenants").insert({name:m,slug:r,domain:c||null,plan_id:p||null,active:!0}).select();if(v){E.disabled=!1,E.textContent="Criar Imobiliária",x.textContent="❌ "+v.message,x.style.color="#ef4444";return}const B=(U=h==null?void 0:h[0])==null?void 0:U.id;x.textContent="⏳ Criando usuário admin…";const k=await ue({email:u,password:b,role:"admin",tenant_id:B});if(!(k!=null&&k.success)){E.disabled=!1,E.textContent="Criar Imobiliária",x.innerHTML="⚠️ Imobiliária criada, mas erro ao criar usuário: "+g((k==null?void 0:k.error)||"Desconhecido"),x.style.color="#f59e0b",setTimeout(()=>{n(),ae()},3e3);return}B&&(k!=null&&k.user_id)&&!(k!=null&&k.linked)&&await y.from("profiles").update({tenant_id:B}).eq("id",k.user_id),E.disabled=!1,E.textContent="Criar Imobiliária",k.email_sent===!1?(x.innerHTML=`
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${g(k.email_error||"erro desconhecido")}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${g(u)}</strong><br>
          Senha: <strong>${g(b)}</strong>
        </div>`,x.style.color="#0f172a"):(x.textContent="✅ Imobiliária criada e e-mail enviado com sucesso!",x.style.color="#22c55e",setTimeout(()=>{n(),ae()},1500))})}function La(e){var a;(a=document.getElementById("tenant-panel"))==null||a.remove();const t=document.createElement("div");t.id="tenant-panel",t.style.cssText="position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;";const n=[{id:"properties",label:"🏠 Imóveis"},{id:"leads",label:"📋 Leads"},{id:"users",label:"👥 Corretores"},{id:"api",label:"🔗 Site & API"},{id:"config",label:"⚙️ Configurações"}];t.innerHTML=`
    <div style="background:#0a1628;padding:14px 24px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:10;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.3);">
      <button id="tp-back" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;padding:7px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">← Imobiliárias</button>
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
        ${e.logo_url?`<img src="${g(e.logo_url)}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0;">`:'<div style="width:36px;height:36px;background:rgba(255,255,255,.1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏢</div>'}
        <div style="min-width:0;">
          <div style="color:#fff;font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g(e.name)}</div>
          <div style="color:#94a3b8;font-size:12px;">${g(e.slug||"")} · ${e.active!==!1?'<span style="color:#4ade80;">● Ativo</span>':'<span style="color:#f87171;">● Inativo</span>'}</div>
        </div>
      </div>
      <button id="tp-edit-btn" style="background:#c9a84c;border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">✏️ Editar dados</button>
    </div>
    <div style="background:#fff;border-bottom:2px solid #e2e8f0;padding:0 24px;display:flex;gap:0;flex-shrink:0;overflow-x:auto;">
      ${n.map((o,i)=>`<button class="tp-tab" data-tab="${o.id}" style="padding:14px 20px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:${i===0?"700":"500"};color:${i===0?"#2563eb":"#64748b"};border-bottom:2px solid ${i===0?"#2563eb":"transparent"};margin-bottom:-2px;white-space:nowrap;transition:all .15s;">${o.label}</button>`).join("")}
    </div>
    <div id="tp-content" style="padding:24px;flex:1;max-width:1200px;margin:0 auto;width:100%;box-sizing:border-box;"></div>
  `,document.body.appendChild(t),document.getElementById("tp-back").addEventListener("click",()=>t.remove()),document.getElementById("tp-edit-btn").addEventListener("click",()=>Tt(e)),t.querySelectorAll(".tp-tab").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".tp-tab").forEach(i=>{i.style.fontWeight="500",i.style.color="#64748b",i.style.borderBottomColor="transparent"}),o.style.fontWeight="700",o.style.color="#2563eb",o.style.borderBottomColor="#2563eb",et(e,o.dataset.tab)})}),et(e,"properties")}function _a(e,t){const n=document.getElementById("tp-prop-edit-modal");n&&n.remove();const a=document.createElement("div");a.id="tp-prop-edit-modal",a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;";const o=(l,s,m,r="text",c="")=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${s}</label>
      <input id="${l}" type="${r}" value="${g(String(m||""))}" ${c}
        style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;outline:none;">
    </div>`,i=(l,s,m,r)=>`<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${s}</label>
      <select id="${l}" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;background:#fff;">
        ${m.map(([c,p])=>`<option value="${c}"${r===c?" selected":""}>${p}</option>`).join("")}
      </select>
    </div>`;a.innerHTML=`
    <div style="background:#fff;border-radius:16px;width:100%;max-width:680px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.25);">
      <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
        <h3 style="margin:0;font-size:17px;font-weight:700;color:#0f172a;">✏️ Editar Imóvel</h3>
        <button id="tpe-close" style="background:none;border:none;font-size:20px;cursor:pointer;color:#94a3b8;line-height:1;">✕</button>
      </div>
      <div style="padding:24px;overflow-y:auto;display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        ${o("tpe-title","TÍTULO *",e.title,"text",'style="grid-column:span 2;border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;"')}
        ${o("tpe-price","PREÇO (R$)",e.price)}
        ${o("tpe-area","ÁREA (m²)",e.area)}
        ${o("tpe-bedrooms","DORMITÓRIOS",e.bedrooms,"number")}
        ${o("tpe-suites","SUÍTES",e.suites,"number")}
        ${o("tpe-parking","VAGAS",e.parking,"number")}
        ${o("tpe-reference","REFERÊNCIA",e.reference)}
        ${o("tpe-city","CIDADE",e.city)}
        ${o("tpe-neighborhood","BAIRRO",e.neighborhood)}
        ${o("tpe-rua","RUA",e.rua)}
        ${o("tpe-numero","NÚMERO",e.numero)}
        ${i("tpe-construction","STATUS DA OBRA",[["","Selecione"],["pronto","Pronto"],["pre-lancamento","Pré-lançamento"],["lancamento","Lançamento"],["em-obra","Em obra"]],e.construction_status)}
        ${i("tpe-published","PUBLICAÇÃO",[["true","Publicado"],["false","Rascunho"]],String(e.published))}
        <div style="grid-column:span 2;display:flex;flex-direction:column;gap:4px;">
          <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">DESCRIÇÃO</label>
          <textarea id="tpe-description" rows="4" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;resize:vertical;font-family:inherit;">${g(e.description||"")}</textarea>
        </div>
        <div id="tpe-msg" style="grid-column:span 2;font-size:13px;min-height:16px;"></div>
      </div>
      <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;justify-content:flex-end;flex-shrink:0;">
        <button id="tpe-cancel" style="background:#f1f5f9;color:#475569;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">Cancelar</button>
        <button id="tpe-save" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 24px;cursor:pointer;font-size:14px;font-weight:700;">💾 Salvar</button>
      </div>
    </div>`,document.body.appendChild(a);const d=()=>a.remove();document.getElementById("tpe-close").addEventListener("click",d),document.getElementById("tpe-cancel").addEventListener("click",d),a.addEventListener("click",l=>{l.target===a&&d()}),document.getElementById("tpe-save").addEventListener("click",async()=>{const l=document.getElementById("tpe-save"),s=document.getElementById("tpe-msg"),m=document.getElementById("tpe-title").value.trim();if(!m){s.style.color="#ef4444",s.textContent="Título é obrigatório.";return}l.disabled=!0,l.textContent="Salvando…";const r={title:m,price:document.getElementById("tpe-price").value.trim()||null,area:document.getElementById("tpe-area").value.trim()||null,bedrooms:document.getElementById("tpe-bedrooms").value||null,suites:document.getElementById("tpe-suites").value||null,parking:document.getElementById("tpe-parking").value||null,reference:document.getElementById("tpe-reference").value.trim()||null,city:document.getElementById("tpe-city").value.trim()||null,neighborhood:document.getElementById("tpe-neighborhood").value.trim()||null,rua:document.getElementById("tpe-rua").value.trim()||null,numero:document.getElementById("tpe-numero").value.trim()||null,construction_status:document.getElementById("tpe-construction").value||null,published:document.getElementById("tpe-published").value==="true",description:document.getElementById("tpe-description").value.trim()||null},{error:c}=await y.from("properties").update(r).eq("id",e.id);if(c){s.style.color="#ef4444",s.textContent="Erro: "+c.message,l.disabled=!1,l.textContent="💾 Salvar";return}s.style.color="#16a34a",s.textContent="✅ Salvo!",setTimeout(()=>{d(),typeof t=="function"&&t()},800)})}async function et(e,t){var i,d,l,s,m;const n=document.getElementById("tp-content");if(!n)return;n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>';const a=()=>et(e,t),o=(r,c)=>`background:${r};color:${c};border:none;border-radius:6px;padding:5px 12px;cursor:pointer;font-size:12px;font-weight:600;white-space:nowrap;`;if(t==="properties"){const{data:r}=await y.from("properties").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1});if(!(r!=null&&r.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>';return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${r.length} imóvel(is)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:600px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">IMÓVEL</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">CIDADE</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">PREÇO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody id="tp-prop-tbody">${r.map(c=>{var p;return`
            <tr data-pid="${c.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  ${(p=c.images)!=null&&p[0]?`<img src="${c.images[0]}" style="width:52px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;">`:'<div style="width:52px;height:38px;background:#e2e8f0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>'}
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${g(c.title||"")}</div><div style="font-size:11px;color:#94a3b8;">${g(c.reference||"")}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${g([c.neighborhood,c.city].filter(Boolean).join(", "))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">${g(re(c.price,"pt"))}</td>
              <td style="padding:12px 16px;text-align:center;">${c.published?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Publicado</span>':'<span style="background:#f1f5f9;color:#64748b;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Rascunho</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-prop-edit" data-pid="${c.id}" style="${o("#eff6ff","#1d4ed8")}">✏️ Editar</button>
                  <button class="tp-prop-toggle" data-pid="${c.id}" data-pub="${c.published?"1":"0"}" style="${o(c.published?"#fef3c7":"#dcfce7",c.published?"#92400e":"#15803d")}">${c.published?"Despublicar":"Publicar"}</button>
                  <button class="tp-prop-del" data-pid="${c.id}" style="${o("#fee2e2","#dc2626")}">Excluir</button>
                </div>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`,n.querySelectorAll(".tp-prop-edit").forEach(c=>{c.addEventListener("click",()=>{const p=Number(c.dataset.pid),u=r.find(b=>b.id===p);u&&_a(u,a)})}),n.querySelectorAll(".tp-prop-toggle").forEach(c=>{c.addEventListener("click",async()=>{const p=Number(c.dataset.pid),u=c.dataset.pub==="1";c.disabled=!0,c.textContent="…",await y.from("properties").update({published:!u}).eq("id",p),a()})}),n.querySelectorAll(".tp-prop-del").forEach(c=>{c.addEventListener("click",async()=>{confirm("Excluir este imóvel permanentemente?")&&(c.disabled=!0,c.textContent="…",await y.from("properties").delete().eq("id",Number(c.dataset.pid)),a())})})}if(t==="leads"){const{data:r}=await y.from("leads").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}).limit(200);if(!(r!=null&&r.length)){n.innerHTML='<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">📋</div><p style="font-size:14px;">Nenhum lead ainda.</p></div>';return}const c=p=>({novo:"#dbeafe,#1d4ed8",contato:"#fef3c7,#92400e",proposta:"#ede9fe,#6d28d9",fechado:"#dcfce7,#15803d"})[p]||"#f1f5f9,#64748b";n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${r.length} lead(s)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:560px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">NOME</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">CONTATO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">ETAPA</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">DATA</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody>${r.map(p=>{const[u,b]=c(p.stage||p.status||"").split(","),x=(p.phone||"").replace(/\D/g,"");return`<tr data-lid="${p.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${g(p.name||"")}</td>
              <td style="padding:12px 16px;">
                <div style="font-size:13px;color:#475569;">${g(p.phone||"—")}</div>
                <div style="font-size:11px;color:#94a3b8;">${g(p.email||"")}</div>
              </td>
              <td style="padding:12px 16px;"><span style="background:${u};color:${b};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${g(p.stage||p.status||"Novo")}</span></td>
              <td style="padding:12px 16px;font-size:12px;color:#94a3b8;">${new Date(p.created_at).toLocaleDateString("pt-BR")}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;align-items:center;">
                  ${x?`<a href="https://wa.me/${x}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;" title="WhatsApp"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg></a>`:""}
                  <button class="tp-lead-del" data-lid="${p.id}" style="${o("#fee2e2","#dc2626")}">Excluir</button>
                </div>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table></div>
      </div>`,n.querySelectorAll(".tp-lead-del").forEach(p=>{p.addEventListener("click",async()=>{confirm("Excluir este lead permanentemente?")&&(p.disabled=!0,p.textContent="…",await y.from("leads").delete().eq("id",p.dataset.lid),a())})})}if(t==="users"){const{data:r}=await y.from("profiles").select("*").eq("tenant_id",e.id).order("created_at",{ascending:!1}),c='<button id="tp-add-corretor" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;font-weight:600;">+ Adicionar Usuário</button>';if(!(r!=null&&r.length)){n.innerHTML=`<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">👥</div><p style="font-size:14px;margin-bottom:16px;">Nenhum corretor cadastrado ainda.</p>${c}</div>`,(i=n.querySelector("#tp-add-corretor"))==null||i.addEventListener("click",()=>Ve(e.id,a));return}n.innerHTML=`
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${r.length} usuário(s)</h3>
          ${c}
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:520px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">USUÁRIO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">FUNÇÃO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody>${r.map(p=>`
            <tr data-uid="${p.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${g(p.name||p.email||"—")}</div><div style="font-size:11px;color:#94a3b8;">${g(p.email||"")}</div></td>
              <td style="padding:12px 16px;">
                <select class="tp-role-sel" data-uid="${p.id}" style="border:1px solid #e2e8f0;border-radius:6px;padding:4px 8px;font-size:13px;color:#0f172a;background:#fff;cursor:pointer;">
                  <option value="admin" ${p.role==="admin"?"selected":""}>Admin</option>
                  <option value="corretor" ${p.role==="corretor"?"selected":""}>Corretor</option>
                </select>
              </td>
              <td style="padding:12px 16px;text-align:center;">${p.active!==!1?'<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Ativo</span>':'<span style="background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Pausado</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-user-toggle" data-uid="${p.id}" data-active="${p.active!==!1?"1":"0"}" style="${o(p.active!==!1?"#fef3c7":"#dcfce7",p.active!==!1?"#92400e":"#15803d")}">${p.active!==!1?"Pausar":"Ativar"}</button>
                  <button class="tp-user-del" data-uid="${p.id}" style="${o("#fee2e2","#dc2626")}">Remover</button>
                </div>
              </td>
            </tr>`).join("")}
          </tbody>
        </table></div>
      </div>`,(d=n.querySelector("#tp-add-corretor"))==null||d.addEventListener("click",()=>Ve(e.id,a)),n.querySelectorAll(".tp-role-sel").forEach(p=>{p.addEventListener("change",async()=>{const u=p.dataset.uid;p.disabled=!0,await y.from("profiles").update({role:p.value}).eq("id",u),p.disabled=!1})}),n.querySelectorAll(".tp-user-toggle").forEach(p=>{p.addEventListener("click",async()=>{const u=p.dataset.uid,b=p.dataset.active==="1";p.disabled=!0,p.textContent="…",await y.from("profiles").update({active:!b}).eq("id",u),a()})}),n.querySelectorAll(".tp-user-del").forEach(p=>{p.addEventListener("click",async()=>{confirm("Remover este usuário da imobiliária? O acesso ao sistema será excluído permanentemente.")&&(p.disabled=!0,p.textContent="…",await ue({action:"delete",userId:p.dataset.uid}),a())})})}if(t==="api"){const r="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api",c=(e.domain||"").replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").trim(),p=c?`https://${c}`:`https://omarcorretor.com.br/demo.html?key=${e.id}`,u=c?"🌐 Site da Imobiliária":"🌐 Site Demonstração",b=c?"Site oficial da imobiliária integrado ao CRM.":"Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.",x=c?"Abrir site →":"Abrir site demo →";n.innerHTML=`
      <div style="display:grid;gap:20px;max-width:800px;">
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🔑 Chave de API</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Use para conectar qualquer site externo ao CRM desta imobiliária.</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <input type="text" value="${g(e.id)}" readonly style="flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:monospace;font-size:13px;background:#f8fafc;min-width:0;">
            <button id="tp-copy-key" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">${u}</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">${b}</p>
          <a href="${g(p)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">${x}</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${g(p)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${r}/properties?key=${g(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${r}/properties/{id}?key=${g(e.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${r}/leads?key=${g(e.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${r}/settings?key=${g(e.id)}</div>
          </div>
        </div>
      </div>`,(l=document.getElementById("tp-copy-key"))==null||l.addEventListener("click",()=>{var v;(v=navigator.clipboard)==null||v.writeText(e.id);const E=document.getElementById("tp-copy-key"),h=E.textContent;E.textContent="✅ Copiada!",setTimeout(()=>{E.textContent=h},2e3)})}if(t==="config"){const{data:r}=await y.from("settings").select("key,value").eq("tenant_id",e.id),c={};r==null||r.forEach(u=>{c[u.key]=u.value});const p=(u,b)=>`
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${u}</div>
        <div style="font-size:14px;color:#0f172a;">${g(String(b||"—"))}</div>
      </div>`;n.innerHTML=`
      <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);max-width:560px;">
        <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 20px;">⚙️ Configurações da imobiliária</h3>
        ${p("NOME DA EMPRESA",c["company.name"]||e.name)}
        ${p("TELEFONE",c["company.phone"])}
        ${p("E-MAIL",c["company.email"])}
        ${p("WHATSAPP",c["company.whatsapp"])}
        ${p("CIDADE",c["company.city"])}
        ${p("DOMÍNIO DO SITE",e.domain)}
        ${p("PLANO",((s=e.plans)==null?void 0:s.name)||"Sem plano")}
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
          <button id="tp-open-edit" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">✏️ Editar dados completos</button>
        </div>
      </div>`,(m=document.getElementById("tp-open-edit"))==null||m.addEventListener("click",()=>Tt(e))}}function Tt(e){var m,r,c,p,u,b,x,E;const t=document.getElementById("sa-edit-tenant-modal");t&&t.remove();const n=document.createElement("div");n.id="sa-edit-tenant-modal",n.className="sa-modal-backdrop";const a="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api";n.innerHTML=`
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
            ${e.logo_url?`<img src="${g(e.logo_url)}" style="width:100%;height:100%;object-fit:cover;">`:'<span style="font-size:28px;">🏢</span>'}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · 256×256px</div>
          </div>
        </div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${g(e.name||"")}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${g(e.slug||"")}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${g(e.domain||"")}" placeholder="abc.imobipro.com.br"></div>
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
            <input id="et-api-key" class="form-input" type="text" value="${g(e.id||"")}" readonly
              style="font-family:monospace;font-size:11px;background:#fff;color:#1e3a5f;flex:1;letter-spacing:.02em;">
            <button id="et-copy-key" class="btn-secondary-sm" style="white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Endpoints disponíveis</div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[["GET","properties","Lista imóveis publicados"],["GET","properties/ID","Detalhe de um imóvel"],["POST","leads","Registra lead / formulário de contato"],["GET","settings","Dados da empresa (nome, WhatsApp, logo…)"]].map(([h,v,B])=>`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${h==="GET"?"#dcfce7":"#fef9c3"};color:${h==="GET"?"#15803d":"#854d0e"};">${h}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${v}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${B}</div>
            </div>`).join("")}
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Exemplo rápido (JavaScript)</div>
        <pre style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;font-size:11px;overflow-x:auto;margin:0;line-height:1.6;"><code>const KEY = '${g(e.id)}'
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
  `,document.body.appendChild(n),y.from("plans").select("id, name").then(({data:h})=>{const v=document.getElementById("et-plan");v&&h&&(v.innerHTML='<option value="">Sem plano</option>'+h.map(B=>`<option value="${B.id}"${String(B.id)===String(e.plan_id)?" selected":""}>${g(B.name)}</option>`).join(""))}),(m=document.getElementById("et-logo-input"))==null||m.addEventListener("change",h=>{const v=h.target.files[0];if(!v)return;const B=URL.createObjectURL(v),k=document.getElementById("et-logo-preview");k&&(k.innerHTML=`<img src="${B}" style="width:100%;height:100%;object-fit:cover;">`)}),(r=document.getElementById("et-logo-preview"))==null||r.addEventListener("click",()=>{var h;(h=document.getElementById("et-logo-input"))==null||h.click()}),(c=document.getElementById("et-pwd-toggle"))==null||c.addEventListener("click",()=>{const h=document.getElementById("et-admin-password");h.type=h.type==="password"?"text":"password"}),(p=document.getElementById("et-copy-key"))==null||p.addEventListener("click",()=>{var k,S;const h=(k=document.getElementById("et-api-key"))==null?void 0:k.value;if(!h)return;(S=navigator.clipboard)==null||S.writeText(h);const v=document.getElementById("et-copy-key"),B=v.textContent;v.textContent="✅ Copiada!",setTimeout(()=>{v.textContent=B},2e3)});const o=["dados","config","api"];function i(h){o.forEach(v=>{document.getElementById(`et-pane-${v}`).style.display=v===h?"":"none";const B=document.getElementById(`et-tab-${v}`);B.style.borderBottomColor=v===h?"#2563eb":"transparent",B.style.color=v===h?"#2563eb":"#64748b",B.style.fontWeight=v===h?"600":"500"}),h==="config"&&l()}o.forEach(h=>{var v;return(v=document.getElementById(`et-tab-${h}`))==null?void 0:v.addEventListener("click",()=>i(h))});let d=!1;async function l(){var B;if(d)return;d=!0;const{data:h}=await y.from("settings").select("key,value").eq("tenant_id",e.id),v={};h==null||h.forEach(k=>{v[k.key]=k.value}),document.getElementById("et-pane-config").innerHTML=`
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${g(v["company.whatsapp"]||"")}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${g(v["company.phone"]||"")}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${g(v["company.email"]||"")}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${g(v["company.city"]||v["company.address"]||"")}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${g(v["company.slogan"]||"")}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `,(B=document.getElementById("et-cfg-save"))==null||B.addEventListener("click",async()=>{const k=document.getElementById("et-cfg-save"),S=document.getElementById("et-cfg-msg");k.disabled=!0,k.textContent="Salvando…",S.textContent="",S.style.color="#64748b";const $=document.getElementById("et-cfg-wa").value.trim().replace(/\D/g,""),w=document.getElementById("et-cfg-phone").value.trim(),I=document.getElementById("et-cfg-email").value.trim(),L=document.getElementById("et-cfg-city").value.trim(),T=document.getElementById("et-cfg-slogan").value.trim(),{error:C}=await y.from("settings").upsert([{key:"company.whatsapp",value:$,tenant_id:e.id},{key:"company.phone",value:w,tenant_id:e.id},{key:"company.email",value:I,tenant_id:e.id},{key:"company.city",value:L,tenant_id:e.id},{key:"company.address",value:L,tenant_id:e.id},{key:"company.slogan",value:T,tenant_id:e.id}],{onConflict:"tenant_id,key"});k.disabled=!1,k.textContent="💾 Salvar configurações",C?(S.textContent="❌ "+C.message,S.style.color="#ef4444"):(S.textContent="✅ Configurações salvas!",S.style.color="#22c55e")})}const s=()=>n.remove();(u=document.getElementById("et-close"))==null||u.addEventListener("click",s),(b=document.getElementById("et-cancel"))==null||b.addEventListener("click",s),n.addEventListener("click",h=>{h.target===n&&s()}),(x=document.getElementById("et-delete"))==null||x.addEventListener("click",async()=>{if(!confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${e.name}"?

Essa ação é irreversível e removerá o registro da plataforma.`))return;const v=document.getElementById("et-delete");v.disabled=!0,v.textContent="Excluindo…";const{error:B}=await y.from("tenants").delete().eq("id",e.id);if(B){alert("Erro ao excluir: "+B.message),v.disabled=!1,v.textContent="🗑️ Excluir";return}s(),ae()}),(E=document.getElementById("et-save"))==null||E.addEventListener("click",async()=>{var M,q,F,H,U,K,oe,Ie,$e,D,fe,lt;const h=(q=(M=document.getElementById("et-name"))==null?void 0:M.value)==null?void 0:q.trim(),v=(H=(F=document.getElementById("et-slug"))==null?void 0:F.value)==null?void 0:H.trim(),B=(K=(U=document.getElementById("et-domain"))==null?void 0:U.value)==null?void 0:K.trim(),k=(oe=document.getElementById("et-plan"))==null?void 0:oe.value,S=($e=(Ie=document.getElementById("et-admin-email"))==null?void 0:Ie.value)==null?void 0:$e.trim(),$=(fe=(D=document.getElementById("et-admin-password"))==null?void 0:D.value)==null?void 0:fe.trim(),w=(lt=document.getElementById("et-logo-input"))==null?void 0:lt.files[0],I=document.getElementById("et-msg"),L=document.getElementById("et-save");if(!h){I.textContent="❌ Nome é obrigatório.",I.style.color="#ef4444";return}L.disabled=!0,L.textContent="Salvando…",I.textContent="⏳ Salvando…",I.style.color="#64748b";let T=e.logo_url;if(w)try{const A=await Te(w,256,.85),dt=`tenant-logos/${e.id}-${Date.now()}.jpg`,{error:qt}=await y.storage.from("imoveis").upload(dt,A,{contentType:"image/jpeg",upsert:!0});if(!qt){const{data:{publicUrl:At}}=y.storage.from("imoveis").getPublicUrl(dt);T=At}}catch(A){console.error("Logo upload:",A)}const{error:C}=await y.from("tenants").update({name:h,slug:v||e.slug,domain:B||null,plan_id:k||null,logo_url:T}).eq("id",e.id);if(C){L.disabled=!1,L.textContent="Salvar",I.textContent="❌ "+C.message,I.style.color="#ef4444";return}if(S&&$&&$.length>=6){I.textContent="⏳ Criando usuário admin…";const A=await ue({email:S,password:$,role:"admin",tenant_id:e.id});A!=null&&A.success?(A!=null&&A.user_id&&!(A!=null&&A.linked)&&await y.from("profiles").update({tenant_id:e.id}).eq("id",A.user_id),I.textContent="✅ Salvo e admin criado!",I.style.color="#22c55e"):(I.textContent="⚠️ Salvo, mas erro ao criar admin: "+((A==null?void 0:A.error)||"Tente novamente"),I.style.color="#f59e0b")}else I.textContent="✅ Imobiliária atualizada!",I.style.color="#22c55e";L.disabled=!1,L.textContent="Salvar",setTimeout(()=>{s(),ae()},1200)})}function Ca(){var e;(e=document.getElementById("btn-import-leads"))==null||e.addEventListener("click",Ta)}function Ta(){const e=document.createElement("div");e.id="import-leads-overlay",e.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9000;display:flex;align-items:center;justify-content:center;",e.innerHTML=`
    <div id="import-leads-modal" style="background:#fff;border-radius:12px;width:min(680px,96vw);max-height:90vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.22);padding:32px 28px 24px;position:relative;">
      <button onclick="document.getElementById('import-leads-overlay').remove()" style="position:absolute;top:14px;right:18px;background:none;border:none;font-size:22px;cursor:pointer;color:#888;">✕</button>
      <h2 style="margin:0 0 6px;font-size:1.2rem;color:#1e293b;">📥 Importar Contatos</h2>
      <p style="margin:0 0 20px;color:#64748b;font-size:.9rem;">Envie um arquivo CSV ou Excel (.xlsx) com sua lista de contatos.</p>

      <!-- Step 1: Upload -->
      <div id="import-step-upload">
        <div id="import-drop-zone" style="border:2px dashed #c7d2e0;border-radius:10px;padding:36px 24px;text-align:center;cursor:pointer;transition:border-color .2s;"
             onclick="document.getElementById('import-file-input').click()"
             ondragover="event.preventDefault();this.style.borderColor='#3b82f6'"
             ondragleave="this.style.borderColor='#c7d2e0'"
             ondrop="handleImportDrop(event)">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" style="margin-bottom:10px;"><path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4M12 3v11M8 7l4-4 4 4"/></svg>
          <p style="margin:0 0 6px;color:#475569;font-weight:600;">Arraste o arquivo aqui</p>
          <p style="margin:0;color:#94a3b8;font-size:.82rem;">ou clique para selecionar &nbsp;·&nbsp; CSV ou XLSX</p>
        </div>
        <input type="file" id="import-file-input" accept=".csv,.xlsx,.xls" style="display:none" onchange="handleImportFile(this.files[0])">
        <div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <button onclick="downloadImportTemplate()" style="background:none;border:none;color:#3b82f6;cursor:pointer;font-size:.85rem;padding:0;text-decoration:underline;">⬇ Baixar modelo CSV</button>
          <span id="import-file-status" style="color:#64748b;font-size:.85rem;"></span>
        </div>
        <p id="import-upload-error" style="color:#ef4444;font-size:.83rem;margin:10px 0 0;display:none;"></p>
      </div>

      <!-- Step 2: Mapping -->
      <div id="import-step-map" style="display:none;">
        <div style="margin-bottom:14px;">
          <label style="font-size:.85rem;font-weight:600;color:#374151;display:block;margin-bottom:4px;">Etapa (estágio) dos leads importados</label>
          <select id="import-stage-sel" style="width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:7px;font-size:.9rem;color:#1e293b;">
            <option value="">Carregando etapas…</option>
          </select>
        </div>
        <p style="font-size:.85rem;font-weight:600;color:#374151;margin:0 0 10px;">Mapeie as colunas do arquivo:</p>
        <div id="import-field-rows" style="display:grid;gap:10px;"></div>
        <div style="margin-top:18px;border:1px solid #e2e8f0;border-radius:8px;overflow:auto;">
          <p style="font-size:.78rem;color:#94a3b8;margin:8px 12px 4px;">Pré-visualização (5 primeiras linhas)</p>
          <div id="import-preview-wrap" style="overflow-x:auto;"></div>
        </div>
        <div style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end;">
          <button onclick="resetImportStep()" style="padding:9px 20px;border:1px solid #d1d5db;border-radius:7px;background:#fff;cursor:pointer;font-size:.9rem;color:#374151;">← Voltar</button>
          <button onclick="confirmImportLeads()" id="btn-confirm-import" style="padding:9px 22px;background:#22c55e;color:#fff;border:none;border-radius:7px;cursor:pointer;font-weight:600;font-size:.9rem;">Importar leads</button>
        </div>
      </div>

      <!-- Step 3: Result -->
      <div id="import-step-result" style="display:none;text-align:center;padding:20px 0;">
        <div id="import-result-icon" style="font-size:3rem;margin-bottom:12px;">✅</div>
        <p id="import-result-msg" style="font-size:1rem;font-weight:600;color:#1e293b;margin:0 0 18px;"></p>
        <button onclick="document.getElementById('import-leads-overlay').remove();reloadFunilData()" style="padding:10px 26px;background:#3b82f6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Ver leads no funil</button>
      </div>
    </div>`,document.body.appendChild(e),qa()}async function qa(){const e=document.getElementById("import-stage-sel");if(!e)return;const t=await getTenantId(),{data:n}=await y.from("crm_lead_statuses").select("*").eq("tenant_id",t).order("position");n&&n.length?(e.innerHTML=n.map(a=>`<option value="${a.id}">${g(a.name)}</option>`).join(""),n[0].id,e.onchange=()=>{e.value}):e.innerHTML='<option value="">— sem etapas cadastradas —</option>'}
