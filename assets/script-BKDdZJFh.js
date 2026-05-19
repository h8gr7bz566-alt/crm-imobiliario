import{s as v}from"./supabase-BcuJ3xoD.js";let J={},ue={};async function Ue(){const[e,a]=await Promise.all([v.from("settings").select("key,value"),v.from("site_content").select("*")]);e.data&&e.data.forEach(n=>{J[n.key]=n.value}),a.data&&a.data.forEach(n=>{ue[n.key]=n})}const A=(e,a=null)=>J[e]!==void 0?J[e]:a,pe=(e,a="pt")=>{const n=ue[e];return n?n[`value_${a}`]??n.value_pt??null:null},He=()=>({...ue});async function W(e,a){const{error:n}=await v.from("settings").upsert({key:e,value:a,updated_at:new Date().toISOString()},{onConflict:"key"});return n||(J[e]=a),!n}async function X(e){const a=new Date().toISOString(),n=e.map(([s,o])=>({key:s,value:o,updated_at:a})),{error:t}=await v.from("settings").upsert(n,{onConflict:"key"});return t||e.forEach(([s,o])=>{J[s]=o}),!t}async function oe(e,{pt:a,en:n,es:t}){const s={key:e,value_pt:a,value_en:n,value_es:t,updated_at:new Date().toISOString()},{error:o}=await v.from("site_content").upsert(s,{onConflict:"key"});return o||(ue[e]=s),!o}async function ve(e,a,n){const{error:t}=await v.from("integrations").upsert({key:e,value:a,enabled:n,updated_at:new Date().toISOString()},{onConflict:"key"});return!t}function Ee(){const e=document.documentElement,a=A("visual.accent_color","#b8962e"),n=A("visual.primary_bg","#0f1c2e"),t=A("visual.secondary_bg","#1a2f4a");e.style.setProperty("--accent",a),e.style.setProperty("--primary-bg",n),e.style.setProperty("--secondary-bg",t);const s=A("company.logo_url","/logo.png");document.querySelectorAll(".logo-img").forEach(i=>{i.src=s});const o=A("company.favicon_url","/favicon.ico"),r=document.querySelector('link[rel="shortcut icon"]');r&&(r.href=o);const l=A("visual.hero_bg_url","");if(l){const i=document.querySelector(".hero");i&&(i.style.backgroundImage=`url('${l}')`)}}function je(e="pt"){const a=p=>pe(p,e)??"",n=document.querySelector('[data-i18n="hero.title"]');n&&a("hero.title")&&(n.innerHTML=a("hero.title"));const t=document.querySelector(".hero-content > p");t&&a("hero.subtitle")&&(t.innerHTML=a("hero.subtitle"));const s=document.querySelector(".footer small");s&&a("footer.text")&&(s.innerHTML=a("footer.text"));const o=document.querySelector('[data-i18n="inst.p1"]'),r=document.querySelector('[data-i18n="inst.p2"]'),l=document.querySelector('[data-i18n="inst.p3"]');o&&a("inst.bio_p1")&&(o.innerHTML=a("inst.bio_p1")),r&&a("inst.bio_p2")&&(r.innerHTML=a("inst.bio_p2")),l&&a("inst.bio_p3")&&(l.innerHTML=a("inst.bio_p3"));const i=document.querySelector('[data-i18n-num="inst.stat2num"]'),d=document.querySelector('[data-i18n="inst.stat1"]'),m=document.querySelector('[data-i18n="inst.stat2"]'),u=document.querySelector('[data-i18n="inst.stat3"]');i&&a("inst.stat2_num")&&(i.innerHTML=a("inst.stat2_num")),d&&a("inst.stat1_label")&&(d.innerHTML=a("inst.stat1_label")),m&&a("inst.stat2_label")&&(m.innerHTML=a("inst.stat2_label")),u&&a("inst.stat3_label")&&(u.innerHTML=a("inst.stat3_label"));const c=pe("seo.title_pt",e);c&&document.title&&(document.title=c);const f=pe("seo.description_pt",e);if(f){const p=document.querySelector('meta[name="description"]');p&&(p.content=f)}}function Fe(e){if(!e)return;const a=`https://wa.me/${e}`;document.querySelectorAll('a[href*="wa.me"]').forEach(n=>{const t=n.getAttribute("href");if(t){const s=t.replace(/^https:\/\/wa\.me\/[^?]+/,"");n.href=a+s}})}let H=null;async function De(){const{data:{user:e}}=await v.auth.getUser();if(!e)return;const{data:a}=await v.from("profiles").select("role").eq("id",e.id).single();!a||!["admin","super_admin"].includes(a.role)||(Oe(),ze(),Xe(),document.addEventListener("click",We,!0))}function Oe(){const e=document.createElement("style");e.textContent=`
    #em-bar {
      position:fixed;top:0;left:0;right:0;z-index:99999;
      background:#0f1c2e;border-bottom:2px solid #b8962e;
      display:flex;align-items:center;gap:12px;padding:8px 16px;
      font-family:system-ui,sans-serif;font-size:13px;color:#fff;
      box-shadow:0 2px 16px rgba(0,0,0,.5);
    }
    #em-bar .em-badge {
      background:#b8962e;color:#0f1c2e;font-weight:700;
      padding:3px 10px;border-radius:20px;font-size:11px;letter-spacing:.04em;
    }
    #em-bar .em-hint { color:rgba(255,255,255,.45);font-size:12px; }
    #em-bar .em-colors { display:flex;gap:10px;align-items:center;margin-left:auto; }
    #em-bar .em-ci { display:flex;align-items:center;gap:4px;font-size:11px;color:rgba(255,255,255,.65); }
    #em-bar .em-ci input[type=color] { width:26px;height:20px;border:none;padding:0;border-radius:4px;cursor:pointer;background:none; }
    #em-bar .em-exit {
      background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);
      color:#fff;padding:4px 12px;border-radius:6px;cursor:pointer;font-size:12px;
    }
    #em-bar .em-exit:hover { background:rgba(239,68,68,.25);border-color:#f87171; }

    body { padding-top:46px !important; }

    [data-editable] { cursor:pointer !important; }
    [data-editable]:hover {
      outline:2px dashed #b8962e !important;
      outline-offset:3px !important;
    }
    [data-editable].em-on { outline:2px solid #b8962e !important;outline-offset:3px !important; }

    #em-pop {
      position:fixed;z-index:100000;
      background:#1a2f4a;border:1px solid #b8962e;
      border-radius:12px;padding:18px;width:360px;max-width:calc(100vw - 24px);
      box-shadow:0 8px 40px rgba(0,0,0,.6);font-family:system-ui,sans-serif;
    }
    #em-pop .ep-title {
      font-size:11px;font-weight:700;color:#b8962e;
      text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;
    }
    #em-pop .ep-tabs { display:flex;gap:4px;margin-bottom:10px; }
    #em-pop .ep-tab {
      padding:3px 10px;border-radius:6px;
      border:1px solid rgba(255,255,255,.15);
      background:none;color:rgba(255,255,255,.55);font-size:11px;cursor:pointer;
    }
    #em-pop .ep-tab.active { background:#b8962e;color:#0f1c2e;border-color:#b8962e;font-weight:700; }
    #em-pop .ep-lbl { font-size:11px;color:rgba(255,255,255,.45);margin-bottom:4px; }
    #em-pop textarea, #em-pop input[type=text], #em-pop input[type=url] {
      width:100%;box-sizing:border-box;
      background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);
      border-radius:6px;color:#fff;padding:8px 10px;font-size:13px;
      resize:vertical;outline:none;font-family:inherit;
    }
    #em-pop textarea:focus, #em-pop input:focus { border-color:#b8962e; }
    #em-pop .ep-row { display:flex;gap:8px;margin-top:12px;align-items:center; }
    #em-pop .ep-save {
      background:#b8962e;color:#0f1c2e;font-weight:700;
      border:none;padding:7px 20px;border-radius:6px;cursor:pointer;font-size:13px;
    }
    #em-pop .ep-cancel {
      background:rgba(255,255,255,.07);color:#fff;
      border:1px solid rgba(255,255,255,.15);
      padding:7px 14px;border-radius:6px;cursor:pointer;font-size:13px;
    }
    #em-pop .ep-msg { font-size:11px; }
    #em-pop .ep-upload {
      display:flex;gap:6px;align-items:center;margin-top:6px;
    }
    #em-pop .ep-ubtn {
      background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);
      color:#fff;padding:5px 10px;border-radius:6px;cursor:pointer;font-size:12px;white-space:nowrap;
    }
    #em-pop .ep-preview {
      max-width:100%;max-height:80px;border-radius:6px;margin-top:8px;object-fit:contain;
    }
  `,document.head.appendChild(e)}function ze(){const e=A("visual.accent_color","#b8962e"),a=A("visual.primary_bg","#0f1c2e"),n=A("visual.secondary_bg","#1a2f4a"),t=document.createElement("div");t.id="em-bar",t.innerHTML=`
    <span class="em-badge">✏️ MODO EDIÇÃO</span>
    <span class="em-hint">Clique em qualquer elemento destacado para editar</span>
    <div class="em-colors">
      <div class="em-ci"><input type="color" id="em-c-accent"  value="${e}" title="Cor de destaque"><span>Destaque</span></div>
      <div class="em-ci"><input type="color" id="em-c-primary" value="${a}"   title="Fundo principal"><span>Fundo 1</span></div>
      <div class="em-ci"><input type="color" id="em-c-sec"     value="${n}"    title="Fundo secundário"><span>Fundo 2</span></div>
      <button class="em-exit" id="em-exit">✕ Sair da edição</button>
    </div>
  `,document.body.prepend(t);let s=null;const o=async()=>{const r=document.getElementById("em-c-accent").value,l=document.getElementById("em-c-primary").value,i=document.getElementById("em-c-sec").value;document.documentElement.style.setProperty("--accent",r),document.documentElement.style.setProperty("--primary-bg",l),document.documentElement.style.setProperty("--secondary-bg",i),await Promise.all([W("visual.accent_color",r),W("visual.primary_bg",l),W("visual.secondary_bg",i)])};["em-c-accent","em-c-primary","em-c-sec"].forEach(r=>document.getElementById(r).addEventListener("input",()=>{clearTimeout(s),s=setTimeout(o,700)})),document.getElementById("em-exit").addEventListener("click",()=>{const r=new URL(location.href);r.searchParams.delete("edit"),location.href=r.toString()})}function Xe(){[[".logo-img","image:company.logo_url","Logo"],[".brand-name","setting:company.name","Nome da empresa"],[".brand-title","setting:company.tagline","Slogan / CRECI"],[".topbar-phone-bare","setting:company.whatsapp","Número WhatsApp"],['.social-icon-link[aria-label="Facebook"]',"setting:social.facebook_url","Link Facebook"],['.social-icon-link[aria-label="Instagram"]',"setting:social.instagram_url","Link Instagram"],[".hero","image:visual.hero_bg_url","Imagem de fundo (Hero)"],['[data-i18n="hero.title"]',"content:hero.title","Título do Hero"],[".hero-content > p","content:hero.subtitle","Subtítulo do Hero"],[".hero-whatsapp-btn","setting:hero.cta_text","Botão CTA"],[".planta-title","content:planta.title","Título — Seção Planta"],[".planta-card-title","content:planta.card_title","Card — Planta título"],[".planta-card-desc","content:planta.card_desc","Card — Planta descrição"],[".selecao-title","content:home.available_title","Título — Imóveis Disponíveis"],[".selecao-sub","content:home.available_sub","Subtítulo — Imóveis Disponíveis"],["#institucional h2","content:inst.title","Título — Institucional"],['[data-i18n="inst.p1"]',"content:inst.bio_p1","Bio — parágrafo 1"],['[data-i18n="inst.p2"]',"content:inst.bio_p2","Bio — parágrafo 2"],['[data-i18n="inst.p3"]',"content:inst.bio_p3","Bio — parágrafo 3"],['#institucional .planta-cta, #institucional a[href*="wa.me"]',"setting:company.whatsapp","WhatsApp CTA"],["#institucional img","image:company.photo_url","Foto do corretor"],[".footer small","content:footer.text","Rodapé"]].forEach(([a,n,t])=>{document.querySelectorAll(a).forEach(s=>{s.dataset.editable||(s.dataset.editable=n,s.dataset.editLabel=t)})})}function We(e){if(H&&!H.contains(e.target)&&!e.target.closest("[data-editable]")){re();return}const a=e.target.closest("[data-editable]");a&&(e.preventDefault(),e.stopPropagation(),re(),document.querySelectorAll("[data-editable].em-on").forEach(n=>n.classList.remove("em-on")),a.classList.add("em-on"),Ve(a))}function Ve(e){const a=e.dataset.editable,n=e.dataset.editLabel||a,[t,s]=a.split(":"),o=document.createElement("div");o.id="em-pop",H=o,o.innerHTML=`<div class="ep-title">✏️ ${se(n)}</div>${Ge(t,s,e)}<div class="ep-row"><button class="ep-save" id="ep-save">Salvar</button><button class="ep-cancel" id="ep-cancel">Cancelar</button><span class="ep-msg" id="ep-msg"></span></div>`,document.body.appendChild(o),Ze(e,o),Je(o,t,s,e)}function Ge(e,a,n){if(e==="content"){const t=He()[a]||{},s=t.value_pt||n.innerText.trim(),o=t.value_en||"",r=t.value_es||"";return`
      <div class="ep-tabs">
        <button class="ep-tab active" data-lang="pt">🇧🇷 PT</button>
        <button class="ep-tab" data-lang="en">🇺🇸 EN</button>
        <button class="ep-tab" data-lang="es">🇪🇸 ES</button>
      </div>
      <div id="epl-pt"><div class="ep-lbl">Português</div><textarea id="epv-pt" rows="3">${se(s)}</textarea></div>
      <div id="epl-en" style="display:none"><div class="ep-lbl">English</div><textarea id="epv-en" rows="3">${se(o)}</textarea></div>
      <div id="epl-es" style="display:none"><div class="ep-lbl">Español</div><textarea id="epv-es" rows="3">${se(r)}</textarea></div>`}if(e==="setting"){const t=A(a,"");return`<div class="ep-lbl">Valor</div><input type="text" id="epv-setting" value="${ae(t)}" placeholder="${ae(label)}">`}if(e==="image"){const t=A(a,"");return`
      <div class="ep-lbl">URL da imagem</div>
      <input type="url" id="epv-image" value="${ae(t)}" placeholder="https://... ou /logo.png">
      <div class="ep-upload">
        <input type="file" id="epv-file" accept="image/*" style="display:none">
        <button class="ep-ubtn" id="ep-upbtn">📁 Upload</button>
        <span style="font-size:11px;color:rgba(255,255,255,.35)">ou cole a URL acima</span>
      </div>
      ${t?`<img class="ep-preview" id="ep-prev" src="${ae(t)}" alt="">`:'<img class="ep-preview" id="ep-prev" style="display:none" alt="">'}`}return""}function Je(e,a,n,t){if(e.querySelectorAll(".ep-tab").forEach(s=>{s.addEventListener("click",()=>{e.querySelectorAll(".ep-tab").forEach(o=>o.classList.remove("active")),s.classList.add("active"),["pt","en","es"].forEach(o=>{const r=e.querySelector(`#epl-${o}`);r&&(r.style.display=o===s.dataset.lang?"":"none")})})}),a==="image"){const s=e.querySelector("#epv-image"),o=e.querySelector("#ep-prev");s.addEventListener("input",()=>{o.src=s.value,o.style.display=s.value?"":"none"});const r=e.querySelector("#epv-file");e.querySelector("#ep-upbtn").addEventListener("click",()=>r.click()),r.addEventListener("change",async l=>{const i=l.target.files[0];if(!i)return;O(e,"Enviando…","#fbbf24");const d=`public/site/${n.replace(/\./g,"_")}_${Date.now()}.${i.name.split(".").pop()}`,{error:m}=await v.storage.from("media").upload(d,i,{upsert:!0});if(m){O(e,"Erro no upload","#f87171");return}const{data:{publicUrl:u}}=v.storage.from("media").getPublicUrl(d);s.value=u,o.src=u,o.style.display="",O(e,"Upload OK!","#4ade80")})}e.querySelector("#ep-save").addEventListener("click",async()=>{var o,r,l,i,d;O(e,"Salvando…","#fbbf24");let s=!1;if(a==="content"){const m=((o=e.querySelector("#epv-pt"))==null?void 0:o.value)||"",u=((r=e.querySelector("#epv-en"))==null?void 0:r.value)||"",c=((l=e.querySelector("#epv-es"))==null?void 0:l.value)||"";s=await oe(n,{pt:m,en:u,es:c}),s&&(t.innerHTML=m)}else if(a==="setting"){const m=((i=e.querySelector("#epv-setting"))==null?void 0:i.value)||"";s=await W(n,m),s&&Ye(n,m,t)}else if(a==="image"){const m=((d=e.querySelector("#epv-image"))==null?void 0:d.value)||"";s=await W(n,m),s&&Ke(n,m)}s?(O(e,"✓ Salvo!","#4ade80"),setTimeout(re,700)):O(e,"✗ Erro","#f87171")}),e.querySelector("#ep-cancel").addEventListener("click",re)}function Ye(e,a,n){if(e==="company.name"&&document.querySelectorAll(".brand-name").forEach(t=>t.textContent=a),e==="company.tagline"&&document.querySelectorAll(".brand-title").forEach(t=>t.textContent=a),e==="hero.cta_text"&&(n.textContent=a),e==="social.facebook_url"&&(n.href=a),e==="social.instagram_url"&&(n.href=a),e==="company.whatsapp"){const t=a.replace(/\D/g,"");document.querySelectorAll('a[href*="wa.me"]').forEach(s=>{const o=s.href.replace(/https:\/\/wa\.me\/[^?]+/,"");s.href=`https://wa.me/${t}${o}`}),document.querySelectorAll(".topbar-phone-bare").forEach(s=>s.textContent=a)}}function Ke(e,a){if(e==="company.logo_url"&&document.querySelectorAll(".logo-img").forEach(n=>n.src=a),e==="visual.hero_bg_url"){const n=document.querySelector(".hero");n&&(n.style.backgroundImage=`url('${a}')`)}if(e==="company.photo_url"){const n=document.querySelector("#institucional img");n&&(n.src=a)}}function Ze(e,a){const n=e.getBoundingClientRect(),t=window.innerWidth,s=window.innerHeight;let o=n.left,r=n.bottom+8;o+360>t-8&&(o=t-368),o<8&&(o=8),r+320>s&&(r=Math.max(50,n.top-8-320)),a.style.left=`${o}px`,a.style.top=`${r}px`}function re(){H==null||H.remove(),H=null,document.querySelectorAll("[data-editable].em-on").forEach(e=>e.classList.remove("em-on"))}function O(e,a,n){const t=e.querySelector("#ep-msg");t&&(t.textContent=a,t.style.color=n)}const se=e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),ae=e=>String(e).replace(/"/g,"&quot;"),Qe="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua25wYnpkY3JoYmZvenp2eHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjY1NjYsImV4cCI6MjA5NDQ0MjU2Nn0.5yX05Y4Nhp8UJlhFblK4z_1TRxBqJKrwOLQ91KxsLMM";let z="5547999701743",Y=`https://wa.me/${z}`;const F=["https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"],et=5.7;function K(e,a){if(!e)return"—";const n=String(e).trim();let t;return n.includes(",")&&n.lastIndexOf(",")>n.lastIndexOf(".")?t=parseFloat(n.replace(/\./g,"").replace(",",".")):t=parseFloat(n.replace(/[^\d.]/g,"")),isNaN(t)||t===0?n:a==="en"?"$ "+(t/et).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}):"R$ "+t.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0})}window.currentLang=window.currentLang||"pt";let L=[],S=null,Z=[],Ne=!1;v.auth.onAuthStateChange(e=>{e==="PASSWORD_RECOVERY"&&(Ne=!0)});async function tt(){const{data:e,error:a}=await v.from("properties").select("*").eq("published",!0).order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):e||[]}async function at(){const{data:e,error:a}=await v.from("properties").select("*").order("created_at",{ascending:!1});return a?(console.error("Supabase select error:",a),[]):(L=e||[],ft(),yt(),L)}async function nt(e){if(e.id){const{id:a,created_at:n,...t}=e,{error:s}=await v.from("properties").update(t).eq("id",a);if(s)throw s;const o=L.findIndex(r=>r.id===a);o>=0&&(L[o]={...L[o],...t})}else{if(!e.reference){const t=L.map(o=>o.reference||"").filter(o=>/^IO-\d+$/.test(o)).map(o=>parseInt(o.replace("IO-",""),10)),s=t.length?Math.max(...t)+1:1;e.reference="IO-"+String(s).padStart(4,"0")}const{data:a,error:n}=await v.from("properties").insert(e).select();if(n)throw n;a!=null&&a[0]&&L.unshift(a[0])}}async function ot(e){const{error:a}=await v.from("properties").delete().eq("id",e);if(a)throw a;L=L.filter(n=>n.id!==e)}async function st(e,a){const{error:n}=await v.auth.signInWithPassword({email:e,password:a});return!n}function we(e,a=1200,n=.78){return new Promise((t,s)=>{const o=new Image,r=URL.createObjectURL(e);o.onload=()=>{URL.revokeObjectURL(r);const l=document.createElement("canvas");let i=o.width,d=o.height;i>a&&(d=Math.round(d*a/i),i=a),l.width=i,l.height=d;const m=l.getContext("2d");m.drawImage(o,0,0,i,d);const u=new Image;u.crossOrigin="anonymous",u.onload=()=>{const c=Math.round(i*.18),f=Math.round(u.naturalHeight*c/u.naturalWidth),p=Math.round(i*.02),y=i-c-p,w=d-f-p;m.globalAlpha=.45,m.drawImage(u,y,w,c,f),m.globalAlpha=1,l.toBlob(g=>g?t(g):s(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.onerror=()=>{l.toBlob(c=>c?t(c):s(new Error("Canvas toBlob falhou")),"image/jpeg",n)},u.src="/logo.png"},o.onerror=s,o.src=r})}async function it(e){const a=await we(e),n=`${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:t}=await v.storage.from("imoveis").upload(n,a,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(t)throw t;const{data:{publicUrl:s}}=v.storage.from("imoveis").getPublicUrl(n);return s}async function rt(e,a){const n=Array.from(e).filter(s=>s.size>0),t=[];for(let s=0;s<n.length;s++)a&&a(s+1,n.length),t.push(await it(n[s]));return t}async function Q(){var u,c,f,p,y,w;const e=document.getElementById("vendas-carousel"),a=document.getElementById("properties");if(!e&&!a)return;const n=await tt();L=n,((u=document.getElementById("selecao-carousel"))==null?void 0:u.innerHTML)===""&&lt(n);const t=((c=document.getElementById("city-filter"))==null?void 0:c.value)||"",s=((f=document.getElementById("neighborhood-filter"))==null?void 0:f.value)||"",o=((p=document.getElementById("bedrooms-filter"))==null?void 0:p.value)||"",r=((y=document.getElementById("parking-filter"))==null?void 0:y.value)||"",l=((w=document.getElementById("construction-filter"))==null?void 0:w.value)||"",i=document.getElementById("price-slider"),d=i?parseInt(i.value,10):13e7,m=n.filter(g=>{if(t&&g.city!==t||s&&g.neighborhood!==s||o&&(o==="4+"&&Number(g.bedrooms)<4||o!=="4+"&&Number(g.bedrooms)!==Number(o))||r&&(r==="4+"&&Number(g.parking)<4||r!=="4+"&&Number(g.parking)!==Number(r))||l&&g.construction_status!==l)return!1;const h=String(g.price||"").replace(/,\d{0,2}$/,"").replace(/[^0-9]/g,""),B=parseInt(h,10)||0;return!(B<0||B>d)});if(e){if(!m.length){e.innerHTML='<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>';return}e.innerHTML=m.map(g=>{var $;const h=g.cover_image||(($=g.images)==null?void 0:$[0])||F[0],B=[g.neighborhood,g.city].filter(Boolean).join(", ");return`
        <div class="selecao-card">
          <img src="${h}" alt="${b(g.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${b(g.title)}</div>
            <div class="selecao-card-loc">${b(B)}</div>
            <div class="selecao-card-price">${b(K(g.price,window.currentLang||"pt"))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${g.id}" class="btn-det">Ver Detalhes</a>
              <a href="${Y}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `}).join("");return}if(!m.length){a.innerHTML='<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';return}a.innerHTML=m.map(g=>{var $;const h=($=g.images)!=null&&$.length?g.images:F,B=h.length;return`
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${B}" data-idx="0" data-pid="${g.id}">
          <img src="${g.cover_image||h[0]}" alt="${b(g.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${B>1?`
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          `:""}
        </div>
        <div class="property-info">
          <strong>${b(g.title)}</strong>
          <div class="muted">${b(g.neighborhood||"")}, ${b(g.city||"")}</div>
          <div><strong>${b(K(g.price,window.currentLang||"pt"))}</strong></div>
          <div class="muted">🛏️ ${g.bedrooms||"--"} | 🚗 ${g.parking||"--"} ${B>1?"| 📸 "+B:""}</div>
          <p class="muted">${b((g.description||"").slice(0,110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${g.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${Y}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join(""),document.querySelectorAll(".carousel-btn").forEach(g=>{g.removeEventListener("click",_e),g.addEventListener("click",_e)})}function lt(e){var s,o,r;const a=document.getElementById("selecao-carousel");if(!a)return;const n=e.slice(0,6);if(!n.length){(s=a.closest(".selecao-section"))==null||s.classList.add("hidden");return}a.innerHTML=n.map(l=>{var m;const i=l.cover_image||((m=l.images)==null?void 0:m[0])||F[0],d=[l.neighborhood,l.city].filter(Boolean).join(", ");return`
      <div class="selecao-card">
        <img src="${i}" alt="${b(l.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${b(l.title)}</div>
          <div class="selecao-card-loc">${b(d)}</div>
          <div class="selecao-card-price">${b(K(l.price,window.currentLang||"pt"))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${l.id}" class="btn-det">Ver Detalhes</a>
            <a href="${Y}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `}).join("");const t=a.closest(".selecao-carousel-wrap");(o=t==null?void 0:t.querySelector(".selecao-prev"))==null||o.addEventListener("click",()=>{a.scrollBy({left:-340,behavior:"smooth"})}),(r=t==null?void 0:t.querySelector(".selecao-next"))==null||r.addEventListener("click",()=>{a.scrollBy({left:340,behavior:"smooth"})})}window.filterByStatus=function(e){var n;const a=document.getElementById("construction-filter");a&&(a.value=e),(n=document.getElementById("vendas-section"))==null||n.scrollIntoView({behavior:"smooth"}),Q()};function _e(e){var l;e.stopPropagation();const a=e.currentTarget.closest(".carousel-wrap");if(!a)return;const n=parseInt(a.dataset.total,10);if(!n)return;let t=parseInt(a.dataset.idx,10)||0;const s=e.currentTarget.classList.contains("carousel-next")?1:-1;t=(t+s+n)%n,a.dataset.idx=t;const o=parseInt(a.dataset.pid,10),r=L.find(i=>i.id===o);(l=r==null?void 0:r.images)!=null&&l.length&&(a.querySelector(".carousel-img").src=r.images[t])}function ct(){const e=document.getElementById("price-slider"),a=document.getElementById("price-label");!e||!a||(e.min="0",e.max="130000000",e.step="1000000",e.value="130000000",a.textContent="Até R$ 130.000.000",e.addEventListener("input",()=>{const n=parseInt(e.value,10);a.textContent="Até R$ "+n.toLocaleString("pt-BR"),Q()}))}function dt(){const e=document.getElementById("city-filter"),a=document.getElementById("neighborhood-filter");if(e&&a){const n=D();e.innerHTML='<option value="">Todas as cidades</option>'+n.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),e.addEventListener("change",()=>{const t=D().find(o=>o.name===e.value),s=t?Ie(t.id):[];a.innerHTML='<option value="">Todos os bairros</option>'+s.map(o=>`<option value="${o.name}">${b(o.name)}</option>`).join(""),Q()})}document.querySelectorAll('[id$="-filter"]').forEach(n=>{n.addEventListener("change",Q)})}function ee(e){const a=document.getElementById("admin-properties");if(a){if(!e.length){a.innerHTML='<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>';return}a.innerHTML=e.map(n=>{var r;const t=n.cover_image||((r=n.images)==null?void 0:r[0])||F[0],s=[n.rua,n.numero?`nº ${n.numero}`:"",n.neighborhood,n.city].filter(Boolean).join(", ")||"—",o=n.published===!0?'<span class="badge badge-green">● Publicado</span>':'<span class="badge badge-gray">○ Rascunho</span>';return`<tr data-id="${n.id}">
      <td style="position:relative;width:80px;">
        <img src="${t}" class="table-thumb" alt="">
        ${n.reference?`<span class="ref-badge">${b(n.reference)}</span>`:""}
      </td>
      <td>
        <div class="cell-title">${b(n.title)}</div>
        <div class="cell-sub">#${n.id}${n.condominium?" · "+b(n.condominium):""}</div>
      </td>
      <td class="cell-addr col-addr">${b(s)}</td>
      <td class="cell-price">${b(K(n.price,"pt"))}</td>
      <td>${n.bedrooms??"—"}</td>
      <td>${n.parking??"—"}</td>
      <td>${o}</td>
      <td>
        <div class="action-btns">
          ${(S==null?void 0:S.role)==="admin"?`<button data-id="${n.id}" class="icon-btn edit-btn" title="Editar">✏️</button>`:""}
          ${(S==null?void 0:S.role)==="admin"?`<button data-id="${n.id}" class="icon-btn del-btn" title="Remover">🗑️</button>`:""}
        </div>
      </td>
    </tr>`}).join("")}}function mt(){const e=document.getElementById("f-city");if(!e)return;const a=D(),n=e.value;e.innerHTML='<option value="">Todas</option>'+a.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),n&&(e.value=n)}function ut(){var e,a,n,t,s,o,r,l,i,d,m,u,c,f,p;return{ref:(((e=document.getElementById("f-ref"))==null?void 0:e.value)||"").trim().toLowerCase(),title:(((a=document.getElementById("f-title"))==null?void 0:a.value)||"").trim().toLowerCase(),type:((n=document.getElementById("f-type"))==null?void 0:n.value)||"",city:((t=document.getElementById("f-city"))==null?void 0:t.value)||"",neighborhood:((s=document.getElementById("f-neighborhood"))==null?void 0:s.value)||"",condominium:(((o=document.getElementById("f-condominium"))==null?void 0:o.value)||"").trim().toLowerCase(),priceMin:parseFloat((r=document.getElementById("f-price-min"))==null?void 0:r.value)||0,priceMax:parseFloat((l=document.getElementById("f-price-max"))==null?void 0:l.value)||1/0,areaMin:parseFloat((i=document.getElementById("f-area-min"))==null?void 0:i.value)||0,areaMax:parseFloat((d=document.getElementById("f-area-max"))==null?void 0:d.value)||1/0,construction:((m=document.getElementById("f-construction"))==null?void 0:m.value)||"",published:((u=document.getElementById("f-published"))==null?void 0:u.value)||"",bedrooms:((c=document.querySelector("#f-bedrooms .filter-btn.active"))==null?void 0:c.dataset.val)||"",suites:((f=document.querySelector("#f-suites .filter-btn.active"))==null?void 0:f.dataset.val)||"",parking:((p=document.querySelector("#f-parking .filter-btn.active"))==null?void 0:p.dataset.val)||""}}function xe(e){const a=ut();return Object.values(a).some(t=>t!==""&&t!==0&&t!==1/0)?e.filter(t=>{if(a.ref&&!(t.reference||"").toLowerCase().includes(a.ref)||a.title&&!(t.title||"").toLowerCase().includes(a.title)||a.type&&!(t.title||"").toLowerCase().includes(a.type.toLowerCase())||a.city&&t.city!==a.city||a.neighborhood&&t.neighborhood!==a.neighborhood||a.condominium&&!(t.condominium||"").toLowerCase().includes(a.condominium))return!1;const s=parseInt(String(t.price||"").replace(/[^0-9]/g,""),10)||0;if(a.priceMin>0&&s<a.priceMin||a.priceMax<1/0&&s>a.priceMax)return!1;const o=parseFloat(t.area)||0;return!(a.areaMin>0&&o<a.areaMin||a.areaMax<1/0&&o>a.areaMax||a.construction&&t.construction_status!==a.construction||a.published!==""&&String(t.published)!==a.published||a.bedrooms&&(a.bedrooms==="5+"&&Number(t.bedrooms)<5||a.bedrooms!=="5+"&&Number(t.bedrooms)!==Number(a.bedrooms))||a.suites&&(a.suites==="5+"&&Number(t.suites)<5||a.suites!=="5+"&&Number(t.suites)!==Number(a.suites))||a.parking&&(a.parking==="5+"&&Number(t.parking)<5||a.parking!=="5+"&&Number(t.parking)!==Number(a.parking)))}):e}async function le(){if(!document.getElementById("admin-properties"))return;const e=await at(),a=e.length,n=e.filter(r=>r.published===!0).length,t=document.getElementById("stat-total"),s=document.getElementById("stat-published"),o=document.getElementById("stat-leads");t&&(t.textContent=a),s&&(s.textContent=n),o&&(o.textContent="—"),mt(),ee(L)}let M=null,j="";function fe(e){document.getElementById("modal-title").textContent=e||"Novo Imóvel",document.getElementById("property-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ie(){document.getElementById("property-modal").classList.add("hidden"),document.body.style.overflow=""}function ce(e){const a=document.getElementById("cover-picker"),n=document.getElementById("cover-strip");if(!(!a||!n)){if(!e.length){a.style.display="none";return}a.style.display="",n.innerHTML=e.map(t=>`
    <div class="cover-thumb-wrap${t===j?" selected":""}" data-url="${t}">
      <img src="${t}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join(""),n.querySelectorAll(".cover-thumb-wrap").forEach(t=>{t.addEventListener("click",()=>{j=t.dataset.url,n.querySelectorAll(".cover-thumb-wrap").forEach(s=>s.classList.remove("selected")),t.classList.add("selected")})})}}function ge(){const e=document.getElementById("property-form");if(!e)return;const a=document.getElementById("form-submit-btn");e.addEventListener("submit",async n=>{n.preventDefault();const t=new FormData(e),s=t.getAll("images");let o=[];const r=s.filter(i=>i.size>0);if(r.length){a.disabled=!0,a.textContent=`Enviando 0/${r.length} foto…`;try{o=await rt(r,(i,d)=>{a.textContent=`Enviando ${i}/${d} foto…`})}catch(i){console.error("Erro no upload:",i),a.disabled=!1,a.textContent=M?"Salvar Alterações":"Salvar Imóvel",alert(`Erro ao enviar fotos.
Verifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.`);return}}else if(M){const i=L.find(d=>d.id===M);i!=null&&i.images&&(o=i.images)}o.length||(o=[...F]);const l={...M?{id:M}:{},title:t.get("title"),rua:t.get("rua")||"",numero:t.get("numero")||"",city:t.get("city"),neighborhood:t.get("neighborhood"),price:t.get("price"),bedrooms:parseInt(t.get("bedrooms"),10)||0,suites:parseInt(t.get("suites"),10)||0,area:parseFloat(t.get("area"))||0,parking:parseInt(t.get("parking"),10)||0,published:t.get("published")==="true",images:o,description:t.get("description")||"",owner_name:t.get("owner_name")||"",owner_phone:t.get("owner_phone")||"",owner_email:t.get("owner_email")||"",owner_notes:t.get("owner_notes")||"",cover_image:j||"",construction_status:t.get("construction_status")||"",condominium:t.get("condominium")||""};try{await nt(l),M=null,a.disabled=!1,a.textContent="Salvar Imóvel",e.reset();const i=document.getElementById("adminPublished");i&&(i.value="true");const d=document.getElementById("adminNeighborhood");d&&(d.innerHTML='<option value="">Selecione a cidade primeiro</option>');const m=document.getElementById("adminConstructionStatus");m&&(m.value=""),j="",ce([]),ie(),await le()}catch(i){console.error(i),a.disabled=!1,a.textContent=M?"Salvar Alterações":"Salvar Imóvel",alert("Erro ao salvar imóvel. Verifique o console.")}}),document.addEventListener("click",async n=>{var t;if(n.target.matches(".del-btn")){const s=Number(n.target.dataset.id);if(!s||!confirm("Remover este imóvel?"))return;try{await ot(s),await le()}catch{alert("Erro ao remover imóvel.")}}if(n.target.matches(".edit-btn")){if((S==null?void 0:S.role)!=="admin")return;const s=Number(n.target.dataset.id);if(!s)return;const o=L.find(i=>i.id===s);if(!o)return;M=s,a.textContent="Salvar Alterações",e.querySelector('[name="title"]').value=o.title||"",e.querySelector('[name="rua"]').value=o.rua||"",e.querySelector('[name="numero"]').value=o.numero||"",e.querySelector('[name="city"]').value=o.city||"",e.querySelector('[name="price"]').value=o.price||"",e.querySelector('[name="bedrooms"]').value=o.bedrooms||"",e.querySelector('[name="suites"]').value=o.suites||"",e.querySelector('[name="area"]').value=o.area||"",e.querySelector('[name="parking"]').value=o.parking||"",e.querySelector('[name="description"]').value=o.description||"",e.querySelector('[name="construction_status"]').value=o.construction_status||"",e.querySelector('[name="owner_name"]').value=o.owner_name||"",e.querySelector('[name="owner_phone"]').value=o.owner_phone||"",e.querySelector('[name="owner_email"]').value=o.owner_email||"",e.querySelector('[name="owner_notes"]').value=o.owner_notes||"",e.querySelector('[name="condominium"]').value=o.condominium||"";const r=document.getElementById("adminPublished");r&&(r.value=o.published===!0?"true":"false");const l=document.getElementById("adminCitySelect");l&&(l.value=o.city||"",l.dispatchEvent(new Event("change")),setTimeout(()=>{const i=document.getElementById("adminNeighborhood");i&&(i.value=o.neighborhood||"")},50)),j=o.cover_image||((t=o.images)==null?void 0:t[0])||"",ce(o.images||[]),fe("Editar Imóvel")}})}function b(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}let R=[],P=0;function pt(e){var m,u;document.getElementById("view-code").textContent=e.id||"",document.getElementById("view-modal-title").textContent=e.title||"Imóvel";const a=document.getElementById("view-status-badge");e.published?(a.textContent="● Publicado",a.className="badge badge-green"):(a.textContent="○ Rascunho",a.className="badge badge-gray");const n=[e.rua,e.numero?`nº ${e.numero}`:"",e.neighborhood,e.city].filter(Boolean);document.getElementById("view-modal-address").textContent=n.length?`📍 ${n.join(", ")}`:"";const t=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.join(" "))}`;document.getElementById("view-map-link").href=t,document.getElementById("view-directions-link").href=t;const s=((m=e.images)==null?void 0:m[0])||F[0];document.getElementById("view-thumb-preview").src=s,R=(u=e.images)!=null&&u.length?e.images:F,P=0,de(),document.getElementById("view-price").textContent=K(e.price,"pt"),document.getElementById("view-bedrooms").textContent=e.bedrooms||"—",document.getElementById("view-suites").textContent=e.suites||"—",document.getElementById("view-parking").textContent=e.parking||"—",document.getElementById("view-area").textContent=e.area?`${e.area} m²`:"—";const o=document.getElementById("view-condominium-item"),r=document.getElementById("view-condominium");r&&(r.textContent=e.condominium||""),o&&(o.style.display=e.condominium?"":"none"),document.getElementById("view-description").textContent=e.description||"Sem descrição.",document.getElementById("conf-name").textContent=e.owner_name||"—",document.getElementById("conf-phone").textContent=e.owner_phone||"—",document.getElementById("conf-email").textContent=e.owner_email||"—",document.getElementById("conf-notes").textContent=e.owner_notes||"—",document.querySelectorAll("#view-modal .tab-btn").forEach(c=>c.classList.remove("active")),document.querySelectorAll("#view-modal .tab-panel").forEach(c=>c.classList.add("hidden")),document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add("active"),document.getElementById("tab-principal").classList.remove("hidden");const l="https://omarcorretor.com.br/property.html?id="+e.id,i=document.getElementById("share-link-input");i&&(i.value=l);const d=document.getElementById("share-panel");d&&(d.style.display="none"),document.getElementById("view-modal").classList.remove("hidden"),document.body.style.overflow="hidden"}function ne(){document.getElementById("view-modal").classList.add("hidden"),document.body.style.overflow=""}function de(){const e=document.getElementById("view-main-img"),a=document.getElementById("view-counter"),n=document.getElementById("view-prev"),t=document.getElementById("view-next"),s=document.getElementById("view-thumbs");e.src=R[P],e.alt=`Foto ${P+1}`;const o=R.length>1;n.style.display=o?"flex":"none",t.style.display=o?"flex":"none",a.textContent=o?`${P+1} / ${R.length}`:"",s.innerHTML=o?R.map((r,l)=>`<img src="${r}" class="view-thumb${l===P?" active":""}" data-i="${l}" alt="Foto ${l+1}">`).join(""):"",s.querySelectorAll(".view-thumb").forEach(r=>{r.addEventListener("click",()=>{P=+r.dataset.i,de()})})}async function ke(e){const{data:a}=await v.from("profiles").select("*").eq("id",e).maybeSingle();return a}function ye(e){var r;const a=document.getElementById("sidebar-avatar"),n=document.getElementById("sidebar-avatar-initial"),t=document.getElementById("sidebar-name"),s=document.getElementById("sidebar-role");if(!t)return;const o=(e==null?void 0:e.name)||"Sem nome";t.textContent=o,s.textContent=(e==null?void 0:e.role)==="super_admin"?"Super Admin":(e==null?void 0:e.role)==="admin"?"Administrador":"Corretor",n&&(n.textContent=((r=o[0])==null?void 0:r.toUpperCase())||"?"),a&&(e!=null&&e.avatar_url)&&(a.src=e.avatar_url,a.style.display="",n&&(n.style.display="none"))}function Ce(e){const a=document.getElementById("admin-root");if(a&&(a.dataset.role=e||"corretor"),(e==="admin"||e==="super_admin")&&(document.querySelectorAll(".admin-only").forEach(t=>{t.style.display=""}),Object.entries({empresa:ht,visual:Et,"site-config":wt,"crm-config":xt,integracoes:It,midia:Bt}).forEach(([t,s])=>{const o=document.querySelector(`.nav-item[data-section="${t}"]`);o&&o.addEventListener("click",()=>s(),{once:!0})})),e==="super_admin"){document.querySelectorAll(".super-admin-only").forEach(t=>{t.style.display=""});const n=document.querySelector('.nav-item[data-section="super-admin"]');n&&n.addEventListener("click",()=>St(),{once:!0})}}function vt(){const e=document.getElementById("sidebar-user");e&&e.addEventListener("click",()=>{var t,s;document.querySelectorAll(".nav-item").forEach(o=>o.classList.remove("active"));const a=document.querySelector('.nav-item[data-section="settings"]');a&&a.classList.add("active"),document.querySelectorAll(".admin-section").forEach(o=>o.classList.add("hidden"));const n=document.getElementById("section-settings");n&&n.classList.remove("hidden"),(t=document.getElementById("admin-sidebar"))==null||t.classList.remove("open"),(s=document.getElementById("sidebar-overlay"))==null||s.classList.remove("active")})}const gt="https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user";async function be(e){return(await fetch(gt,{method:"POST",headers:{Authorization:`Bearer ${Qe}`,"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async function qe(e){var i,d,m,u;const a=document.getElementById("settings-name"),n=document.getElementById("settings-email"),t=document.getElementById("settings-avatar-preview"),s=document.getElementById("settings-avatar-initial"),o=document.getElementById("settings-avatar-input"),r=document.getElementById("settings-save-profile");if(!a)return;if(a.value=(e==null?void 0:e.name)||"",n){const{data:{user:c}}=await v.auth.getUser();n.value=(c==null?void 0:c.email)||""}const l=((e==null?void 0:e.name)||"?")[0].toUpperCase();if(s&&(s.textContent=l),e!=null&&e.avatar_url&&t&&(t.src=e.avatar_url,t.style.display="",s&&(s.style.display="none")),o==null||o.addEventListener("change",c=>{const f=c.target.files[0];if(!f)return;const p=URL.createObjectURL(f);t&&(t.src=p,t.style.display=""),s&&(s.style.display="none")}),(i=document.getElementById("btn-change-password"))==null||i.addEventListener("click",async()=>{var g,h;const c=((g=document.getElementById("change-password-new"))==null?void 0:g.value)||"",f=((h=document.getElementById("change-password-confirm"))==null?void 0:h.value)||"",p=document.getElementById("change-password-msg"),y=document.getElementById("btn-change-password");if(p&&(p.style.display="none"),c.length<6){p&&(p.textContent="Mínimo 6 caracteres.",p.style.display="");return}if(c!==f){p&&(p.textContent="As senhas não coincidem.",p.style.display="");return}y&&(y.disabled=!0,y.textContent="Salvando…");const{error:w}=await v.auth.updateUser({password:c});y&&(y.disabled=!1,y.textContent="Salvar Nova Senha"),w?p&&(p.textContent="Erro: "+w.message,p.style.display=""):(p&&(p.style.color="#16a34a",p.textContent="Senha alterada com sucesso!",p.style.display=""),document.getElementById("change-password-new").value="",document.getElementById("change-password-confirm").value="")}),r==null||r.addEventListener("click",async()=>{var h;const c=a.value.trim();let f=(S==null?void 0:S.avatar_url)||"";const p=o==null?void 0:o.files[0],y=r.textContent;if(r.disabled=!0,r.textContent="Salvando…",p)try{const B=await we(p,400,.85),$=`avatars/${S.id}-${Date.now()}.jpg`,{error:C}=await v.storage.from("imoveis").upload($,B,{contentType:"image/jpeg",upsert:!0});if(!C){const{data:{publicUrl:U}}=v.storage.from("imoveis").getPublicUrl($);f=U}}catch(B){console.error("Avatar upload:",B)}const{error:w}=await v.from("profiles").update({name:c,avatar_url:f}).eq("id",S.id);if(r.disabled=!1,r.textContent=y,w){alert("Erro ao salvar perfil.");return}S={...S,name:c,avatar_url:f},ye(S);const g=document.getElementById("settings-avatar-initial");g&&(g.textContent=((h=c[0])==null?void 0:h.toUpperCase())||"?")}),(e==null?void 0:e.role)==="admin"){const c=document.getElementById("settings-corretores-section");c&&(c.style.display=""),await me(),(d=document.getElementById("btn-invite-corretor"))==null||d.addEventListener("click",async()=>{var g,h;const p=(g=document.getElementById("invite-email"))==null?void 0:g.value.trim(),y=(h=document.getElementById("invite-password"))==null?void 0:h.value.trim(),w=document.getElementById("btn-invite-corretor");if(!p){alert("Informe o e-mail do corretor.");return}if(!y||y.length<6){alert("A senha precisa ter no mínimo 6 caracteres.");return}w&&(w.disabled=!0,w.textContent="Criando…");try{const B=await be({email:p,password:y});if(B.success){alert("Acesso criado! O corretor receberá um e-mail com o login e a senha que você definiu.");const $=document.getElementById("invite-email"),C=document.getElementById("invite-password");$&&($.value=""),C&&(C.value=""),await me()}else alert("Erro: "+(B.error||"Falha desconhecida"))}catch(B){alert("Erro ao criar acesso: "+B.message)}finally{w&&(w.disabled=!1,w.textContent="+ Criar Acesso")}});const f=document.getElementById("settings-locations-section");f&&(f.style.display=""),await V(),(m=document.getElementById("loc-add-city-btn"))==null||m.addEventListener("click",async()=>{const p=document.getElementById("loc-new-city"),y=p==null?void 0:p.value.trim();if(!y)return;const{error:w}=await v.from("locations").insert({type:"cidade",name:y});if(w){alert("Erro ao adicionar cidade.");return}p&&(p.value=""),await V(),Be()}),(u=document.getElementById("loc-add-neighborhood-btn"))==null||u.addEventListener("click",async()=>{var h;const p=parseInt((h=document.getElementById("loc-new-neighborhood-city"))==null?void 0:h.value,10),y=document.getElementById("loc-new-neighborhood"),w=y==null?void 0:y.value.trim();if(!p||!w){alert("Selecione a cidade e informe o nome do bairro.");return}const{error:g}=await v.from("locations").insert({type:"bairro",name:w,parent_id:p});if(g){alert("Erro ao adicionar bairro.");return}y&&(y.value=""),await V()})}}async function me(){const e=document.getElementById("corretores-list");if(!e)return;const{data:a,error:n}=await v.from("profiles").select("*").order("created_at");if(n||!a){e.innerHTML='<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>';return}e.innerHTML=a.map(t=>{const s=(t.name||"?")[0].toUpperCase(),o=t.avatar_url?`<img src="${t.avatar_url}" class="corretor-avatar" alt="">`:`<div class="corretor-avatar-initial">${b(s)}</div>`,r=t.id===(S==null?void 0:S.id),l=t.active!==!1,i=l?'<span class="badge badge-green">Ativo</span>':'<span class="badge badge-gray">Pausado</span>',d=r?'<span class="corretor-you">Você</span>':`<select class="form-control corretor-role-sel" data-uid="${t.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${t.role==="corretor"?" selected":""}>Corretor</option>
           <option value="admin"${t.role==="admin"?" selected":""}>Admin</option>
         </select>`,m=r?"":l?`<button class="corretor-toggle-btn" data-uid="${t.id}" data-active="true">Pausar acesso</button>`:`<button class="corretor-toggle-btn btn-liberar" data-uid="${t.id}" data-active="false">Liberar acesso</button>`,u=r?"":`<button class="corretor-del-btn icon-btn" data-uid="${t.id}" title="Excluir corretor">🗑️</button>`;return`<div class="corretor-item">
      <div class="corretor-info">
        ${o}
        <div>
          <div class="corretor-name">${b(t.name||"—")}</div>
          <div class="corretor-role-badge">${t.role==="super_admin"?"⚡ Super Admin":t.role==="admin"?"👑 Admin":"🔑 Corretor"}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${i}
        ${d}
        ${m}
        ${u}
      </div>
    </div>`}).join(""),e.querySelectorAll(".corretor-role-sel").forEach(t=>{t.addEventListener("change",async()=>{await v.from("profiles").update({role:t.value}).eq("id",t.dataset.uid)})}),e.querySelectorAll(".corretor-toggle-btn").forEach(t=>{t.addEventListener("click",async()=>{const s=t.dataset.uid,o=t.dataset.active==="true";t.disabled=!0,t.textContent="Aguarde…";try{const r=await be({action:"toggle",userId:s,active:!o});r.success||alert("Erro: "+(r.error||"Falha desconhecida"))}catch(r){alert("Erro: "+r.message)}await me()})}),e.querySelectorAll(".corretor-del-btn").forEach(t=>{t.addEventListener("click",async()=>{var r,l;const s=t.dataset.uid,o=((l=(r=t.closest(".corretor-item"))==null?void 0:r.querySelector(".corretor-name"))==null?void 0:l.textContent)||"este corretor";if(confirm(`Excluir "${o}"? Esta ação não pode ser desfeita.`)){t.disabled=!0;try{const i=await be({action:"delete",userId:s});i.success||alert("Erro ao excluir: "+(i.error||"Falha desconhecida"))}catch(i){alert("Erro: "+i.message)}await me()}})})}async function Re(){const{data:e,error:a}=await v.from("locations").select("*").order("name");return a?(console.error("loadLocations:",a),[]):(Z=e||[],Z)}function D(){return Z.filter(e=>e.type==="cidade")}function Ie(e){return Z.filter(a=>a.type==="bairro"&&a.parent_id===e)}function Be(){const e=document.getElementById("adminCitySelect");if(!e)return;const a=e.value,n=D();e.innerHTML='<option value="">Selecione</option>'+n.map(t=>`<option value="${t.name}">${b(t.name)}</option>`).join(""),a&&(e.value=a)}async function V(){await Re();const e=D(),a=document.getElementById("loc-cities-list"),n=document.getElementById("loc-neighborhoods-list"),t=document.getElementById("loc-new-neighborhood-city");if(!a||!n)return;a.innerHTML=e.length?e.map(o=>`
        <div class="loc-item">
          <span class="loc-item-name">${b(o.name)}</span>
          <button class="loc-del-btn" data-id="${o.id}" title="Excluir">✕</button>
        </div>`).join(""):'<p class="loc-empty">Nenhuma cidade cadastrada.</p>';const s=Z.filter(o=>o.type==="bairro");n.innerHTML=s.length?s.map(o=>{const r=e.find(l=>l.id===o.parent_id);return`
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${b(o.name)}</div>
              ${r?`<div class="loc-item-sub">${b(r.name)}</div>`:""}
            </div>
            <button class="loc-del-btn" data-id="${o.id}" title="Excluir">✕</button>
          </div>`}).join(""):'<p class="loc-empty">Nenhum bairro cadastrado.</p>',t&&(t.innerHTML='<option value="">Cidade…</option>'+e.map(o=>`<option value="${o.id}">${b(o.name)}</option>`).join("")),a.querySelectorAll(".loc-del-btn").forEach(o=>{o.addEventListener("click",async()=>{const r=o.closest(".loc-item").querySelector(".loc-item-name").textContent;if(!confirm(`Excluir "${r}" e todos os bairros vinculados?`))return;const{error:l}=await v.from("locations").delete().eq("id",o.dataset.id);if(l){alert("Erro ao excluir.");return}await V(),Be()})}),n.querySelectorAll(".loc-del-btn").forEach(o=>{o.addEventListener("click",async()=>{if(!confirm("Excluir este bairro?"))return;const{error:r}=await v.from("locations").delete().eq("id",o.dataset.id);if(r){alert("Erro ao excluir.");return}await V()})})}function Ae(){var s,o,r,l,i,d,m,u,c,f,p,y,w,g,h,B,$,C,U,Le;document.querySelectorAll(".filter-btn").forEach(I=>{I.addEventListener("click",()=>{const E=I.closest(".filter-btns"),x=I.classList.contains("active");E.querySelectorAll(".filter-btn").forEach(_=>_.classList.remove("active")),x||I.classList.add("active")})}),(s=document.getElementById("f-city"))==null||s.addEventListener("change",()=>{var k;const I=(k=document.getElementById("f-city"))==null?void 0:k.value,E=D().find(T=>T.name===I),x=E?Ie(E.id):[],_=document.getElementById("f-neighborhood");_&&(_.innerHTML='<option value="">Todos</option>'+x.map(T=>`<option value="${T.name}">${b(T.name)}</option>`).join(""))}),(o=document.getElementById("f-search-btn"))==null||o.addEventListener("click",()=>{ee(xe(L))}),(r=document.getElementById("f-clear-btn"))==null||r.addEventListener("click",()=>{["f-title","f-condominium","f-price-min","f-price-max","f-area-min","f-area-max"].forEach(_=>{const k=document.getElementById(_);k&&(k.value="")}),["f-type","f-city","f-construction","f-published"].forEach(_=>{const k=document.getElementById(_);k&&(k.value="")});const x=document.getElementById("f-neighborhood");x&&(x.innerHTML='<option value="">Todos</option>'),document.querySelectorAll(".filter-btn.active").forEach(_=>_.classList.remove("active")),ee(L)}),document.querySelectorAll(".nav-item[data-section]").forEach(I=>{I.addEventListener("click",()=>{var E;document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active")),I.classList.add("active"),document.querySelectorAll(".admin-section").forEach(x=>x.classList.add("hidden")),(E=document.getElementById(`section-${I.dataset.section}`))==null||E.classList.remove("hidden")})});const e=document.getElementById("admin-sidebar"),a=document.getElementById("sidebar-overlay"),n=document.getElementById("sidebar-toggle"),t=()=>{e==null||e.classList.remove("open"),a==null||a.classList.remove("open")};n==null||n.addEventListener("click",()=>{e==null||e.classList.toggle("open"),a==null||a.classList.toggle("open")}),a==null||a.addEventListener("click",t),(l=document.getElementById("modal-close"))==null||l.addEventListener("click",ie),(i=document.getElementById("modal-cancel"))==null||i.addEventListener("click",ie),(d=document.getElementById("property-modal"))==null||d.addEventListener("click",I=>{I.target.id==="property-modal"&&ie()}),(m=document.getElementById("btn-new-property"))==null||m.addEventListener("click",()=>{M=null,document.getElementById("property-form").reset(),document.getElementById("adminPublished").value="true",document.getElementById("adminNeighborhood").innerHTML='<option value="">Selecione a cidade primeiro</option>',document.getElementById("form-submit-btn").textContent="Salvar Imóvel",j="",ce([]),fe("Novo Imóvel")}),(u=document.getElementById("logout-btn"))==null||u.addEventListener("click",async()=>{await v.auth.signOut(),location.reload()}),(c=document.getElementById("view-prev"))==null||c.addEventListener("click",()=>{P=(P-1+R.length)%R.length,de()}),(f=document.getElementById("view-next"))==null||f.addEventListener("click",()=>{P=(P+1)%R.length,de()}),(p=document.getElementById("view-modal-close"))==null||p.addEventListener("click",ne),(y=document.getElementById("view-modal-close2"))==null||y.addEventListener("click",ne),(w=document.getElementById("view-modal"))==null||w.addEventListener("click",I=>{I.target.id==="view-modal"&&ne()}),(g=document.getElementById("view-modal-share"))==null||g.addEventListener("click",()=>{const I=document.getElementById("share-panel");if(!I)return;const E=I.style.display!=="none";I.style.display=E?"none":"block"}),(h=document.getElementById("share-whatsapp"))==null||h.addEventListener("click",()=>{var _,k;const I=(_=document.getElementById("share-link-input"))==null?void 0:_.value;if(!I)return;const E=((k=document.getElementById("view-modal-title"))==null?void 0:k.textContent)||"Imóvel",x=encodeURIComponent("Olha esse imóvel que encontrei: "+E+`
`+I);window.open("https://wa.me/?text="+x,"_blank")}),(B=document.getElementById("share-instagram"))==null||B.addEventListener("click",()=>{var E,x;const I=(E=document.getElementById("share-link-input"))==null?void 0:E.value;I&&((x=navigator.clipboard)==null||x.writeText(I),alert("Link copiado! Cole na bio ou nos Stories do Instagram."))}),($=document.getElementById("share-email"))==null||$.addEventListener("click",()=>{var k,T;const I=(k=document.getElementById("share-link-input"))==null?void 0:k.value;if(!I)return;const E=((T=document.getElementById("view-modal-title"))==null?void 0:T.textContent)||"Imóvel",x=encodeURIComponent("Imóvel: "+E),_=encodeURIComponent(`Olá! Segue o link do imóvel:

`+I);window.open("mailto:?subject="+x+"&body="+_,"_blank")}),(C=document.getElementById("share-copy"))==null||C.addEventListener("click",()=>{var E;const I=document.getElementById("share-link-input");I&&((E=navigator.clipboard)==null||E.writeText(I.value).then(()=>{const x=document.getElementById("share-copy"),_=x.textContent;x.textContent="✅ Copiado!",setTimeout(()=>{x.textContent=_},2e3)}))}),(U=document.getElementById("view-modal-edit"))==null||U.addEventListener("click",()=>{var $e;if((S==null?void 0:S.role)!=="admin")return;const I=document.getElementById("view-modal-title").textContent,E=L.find(te=>te.title===I);if(!E)return;ne(),M=E.id;const x=document.getElementById("property-form"),_=document.getElementById("form-submit-btn");_.textContent="Salvar Alterações",x.querySelector('[name="title"]').value=E.title||"",x.querySelector('[name="rua"]').value=E.rua||"",x.querySelector('[name="numero"]').value=E.numero||"",x.querySelector('[name="city"]').value=E.city||"",x.querySelector('[name="price"]').value=E.price||"",x.querySelector('[name="bedrooms"]').value=E.bedrooms||"",x.querySelector('[name="suites"]').value=E.suites||"",x.querySelector('[name="parking"]').value=E.parking||"",x.querySelector('[name="description"]').value=E.description||"",x.querySelector('[name="construction_status"]').value=E.construction_status||"",x.querySelector('[name="owner_name"]').value=E.owner_name||"",x.querySelector('[name="owner_phone"]').value=E.owner_phone||"",x.querySelector('[name="owner_email"]').value=E.owner_email||"",x.querySelector('[name="owner_notes"]').value=E.owner_notes||"",x.querySelector('[name="condominium"]').value=E.condominium||"";const k=document.getElementById("adminPublished");k&&(k.value=E.published===!0?"true":"false");const T=document.getElementById("adminCitySelect");T&&(T.value=E.city||"",T.dispatchEvent(new Event("change")),setTimeout(()=>{const te=document.getElementById("adminNeighborhood");te&&(te.value=E.neighborhood||"")},50)),j=E.cover_image||(($e=E.images)==null?void 0:$e[0])||"",ce(E.images||[]),fe("Editar Imóvel")}),document.querySelectorAll(".tab-btn[data-tab]").forEach(I=>{I.addEventListener("click",()=>{var E;document.querySelectorAll(".tab-btn").forEach(x=>x.classList.remove("active")),I.classList.add("active"),document.querySelectorAll(".tab-panel").forEach(x=>x.classList.add("hidden")),(E=document.getElementById(`tab-${I.dataset.tab}`))==null||E.classList.remove("hidden")})}),(Le=document.getElementById("admin-properties"))==null||Le.addEventListener("click",I=>{if(I.target.closest(".action-btns"))return;const E=I.target.closest("tr");if(!E)return;const x=Number(E.dataset.id);if(!x)return;const _=L.find(k=>k.id===x);_&&pt(_)})}document.addEventListener("DOMContentLoaded",async()=>{var o,r,l;await Promise.all([Ue(),Re()]),z=A("company.whatsapp",z),Y=`https://wa.me/${z}`,Ee(),ct(),dt();const e=document.getElementById("adminCitySelect"),a=document.getElementById("adminNeighborhood");e&&a&&(Be(),e.addEventListener("change",()=>{const i=D().find(m=>m.name===e.value),d=i?Ie(i.id):[];a.innerHTML='<option value="">Selecione a cidade primeiro</option>'+d.map(m=>`<option value="${m.name}">${b(m.name)}</option>`).join("")}));const n=document.getElementById("admin-login"),t=document.getElementById("admin-root");if(n){const i=new URLSearchParams(window.location.hash.replace("#","")),d=new URLSearchParams(window.location.search),m=i.get("type")||d.get("type")||"",u=Ne||m==="recovery"||m==="invite"||window.location.hash.includes("access_token")||d.has("code"),c=document.getElementById("password-reset-overlay");if(u){n.style.display="none",t&&t.classList.add("hidden"),c&&(c.style.display="flex"),(o=document.getElementById("password-reset-form"))==null||o.addEventListener("submit",async p=>{var $,C;p.preventDefault();const y=(($=document.getElementById("new-password"))==null?void 0:$.value)||"",w=((C=document.getElementById("confirm-password"))==null?void 0:C.value)||"",g=document.getElementById("password-reset-msg"),h=p.target.querySelector('button[type="submit"]');if(g&&(g.style.display="none"),y!==w){g&&(g.textContent="As senhas não coincidem.",g.style.display="");return}h&&(h.disabled=!0,h.textContent="Salvando…");const{error:B}=await v.auth.updateUser({password:y});if(B){g&&(g.textContent="Erro: "+B.message,g.style.display=""),h&&(h.disabled=!1,h.textContent="Definir Senha");return}window.location.href=window.location.pathname}),d.has("code")&&await v.auth.exchangeCodeForSession(d.get("code")??"");return}const{data:{session:f}}=await v.auth.getSession();if(f){if(n.classList.add("hidden"),t&&t.classList.remove("hidden"),await le(),ge(),Ae(),vt(),S=await ke(f.user.id),!S){await v.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden");return}if(S.active===!1){await v.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}if(S.needs_password_reset){n.style.display="none",t&&t.classList.add("hidden");const p=document.getElementById("password-reset-overlay");p&&(p.style.display="flex"),(r=document.getElementById("password-reset-form"))==null||r.addEventListener("submit",async y=>{var C,U;y.preventDefault();const w=((C=document.getElementById("new-password"))==null?void 0:C.value)||"",g=((U=document.getElementById("confirm-password"))==null?void 0:U.value)||"",h=document.getElementById("password-reset-msg"),B=y.target.querySelector('button[type="submit"]');if(h&&(h.style.display="none"),w!==g){h&&(h.textContent="As senhas não coincidem.",h.style.display="");return}if(w.length<6){h&&(h.textContent="Mínimo 6 caracteres.",h.style.display="");return}B&&(B.disabled=!0,B.textContent="Salvando…");const{error:$}=await v.auth.updateUser({password:w});if($){h&&(h.textContent="Erro: "+$.message,h.style.display=""),B&&(B.disabled=!1,B.textContent="Definir Senha");return}await v.from("profiles").update({needs_password_reset:!1}).eq("id",S.id),window.location.href=window.location.pathname});return}ye(S),Ce(S.role),await qe(S)}else{t&&t.classList.add("hidden"),n.classList.remove("hidden");const p=document.getElementById("login-form");p&&((l=document.getElementById("forgot-password-btn"))==null||l.addEventListener("click",async()=>{var g,h;const y=(h=(g=p.querySelector('input[name="email"]'))==null?void 0:g.value)==null?void 0:h.trim();if(!y){alert("Digite seu e-mail no campo acima primeiro.");return}const{error:w}=await v.auth.resetPasswordForEmail(y,{redirectTo:"https://omarcorretor.com.br/admin.html"});alert(w?"Erro: "+w.message:"E-mail de redefinição enviado! Verifique sua caixa de entrada.")}),p.addEventListener("submit",async y=>{y.preventDefault();const w=new FormData(p),g=w.get("email"),h=w.get("password");if(await st(g,h)){n.classList.add("hidden"),t&&t.classList.remove("hidden"),await le(),ge(),Ae();const{data:{session:$}}=await v.auth.getSession();if(S=$?await ke($.user.id):null,!S){await v.auth.signOut();return}if(S.active===!1){await v.auth.signOut(),n.classList.remove("hidden"),t&&t.classList.add("hidden"),alert("Seu acesso está pausado. Entre em contato com o administrador.");return}ye(S),Ce(S.role),await qe(S)}else alert("E-mail ou senha incorretos")}))}}else ge();await Q();const s=(()=>{try{return localStorage.getItem("lang")||"pt"}catch{return"pt"}})();je(s),Fe(z),new URLSearchParams(location.search).get("edit")==="1"&&De()});async function ft(){const e=L.filter(s=>!s.reference);if(!e.length)return;const a=L.map(s=>s.reference||"").filter(s=>/^IO-\d+$/.test(s)).map(s=>parseInt(s.replace("IO-",""),10));let n=a.length?Math.max(...a)+1:1;const t=[...e].sort((s,o)=>s.id-o.id);for(const s of t){const o="IO-"+String(n).padStart(4,"0"),{error:r}=await v.from("properties").update({reference:o}).eq("id",s.id);if(!r){const l=L.findIndex(i=>i.id===s.id);l>=0&&(L[l].reference=o),n++}}ee(xe(L))}async function yt(){const e=L.filter(a=>{var n;return(n=a.images)==null?void 0:n.some(t=>!t.includes("/wm-"))});if(e.length){for(const a of e){if(!a.images.some(o=>!o.includes("/wm-")))continue;const t=[];let s=!1;for(const o of a.images)if(o.includes("/wm-"))t.push(o);else try{const r=await bt(o);t.push(r),s=!0}catch{t.push(o)}if(s){await v.from("properties").update({images:t}).eq("id",a.id);const o=L.findIndex(r=>r.id===a.id);o>=0&&(L[o].images=t)}}ee(xe(L))}}async function bt(e){try{const a=await fetch(e);if(!a.ok)return e;const n=await a.blob(),t=URL.createObjectURL(n),s=await fetch("/logo.png"),o=s.ok?await s.blob():null,r=o?URL.createObjectURL(o):null;return new Promise(l=>{const i=new Image;i.onload=()=>{URL.revokeObjectURL(t);const d=document.createElement("canvas"),m=1200;let u=i.width,c=i.height;u>m&&(c=Math.round(c*m/u),u=m),d.width=u,d.height=c;const f=d.getContext("2d");f.drawImage(i,0,0,u,c);const p=y=>{if(y){const w=Math.round(u*.18),g=Math.round(y.naturalHeight*w/y.naturalWidth),h=Math.round(u*.02);f.globalAlpha=.45,f.drawImage(y,u-w-h,c-g-h,w,g),f.globalAlpha=1}d.toBlob(async w=>{try{const g=`wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:h}=await v.storage.from("imoveis").upload(g,w,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(h){console.error("Upload watermark error:",h),l(e);return}const{data:{publicUrl:B}}=v.storage.from("imoveis").getPublicUrl(g);l(B)}catch(g){console.error("Watermark upload exception:",g),l(e)}},"image/jpeg",.82)};if(r){const y=new Image;y.onload=()=>{URL.revokeObjectURL(r),p(y)},y.onerror=()=>{URL.revokeObjectURL(r),p(null)},y.src=r}else p(null)},i.onerror=()=>{URL.revokeObjectURL(t),l(e)},i.src=t})}catch(a){return console.error("applyWatermarkToUrl error:",a),e}}function q(e,a){e&&(e.textContent=a?"✓ Salvo com sucesso!":"✗ Erro ao salvar.",e.className="cfg-save-msg "+(a?"ok":"err"),e.style.display="",setTimeout(()=>{e.style.display="none"},3e3))}async function Se(e,a="assets"){const n=await we(e,1200,.85),t=`${a}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`,{error:s}=await v.storage.from("imoveis").upload(t,n,{contentType:"image/jpeg",cacheControl:"31536000",upsert:!1});if(s)throw s;const{data:{publicUrl:o}}=v.storage.from("imoveis").getPublicUrl(t);return o}async function ht(){const e=document.getElementById("section-empresa");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("settings").select("key,value"),n={};a==null||a.forEach(s=>{n[s.key]=s.value||""});const t=s=>b(String(n[s]||""));e.innerHTML=`
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
  `,document.getElementById("co-logo-url").addEventListener("input",s=>{document.getElementById("co-logo-preview").src=s.target.value||"/logo.png"}),document.getElementById("co-logo-file").addEventListener("change",async s=>{const o=s.target.files[0];if(o)try{const r=await Se(o,"logos");document.getElementById("co-logo-url").value=r,document.getElementById("co-logo-preview").src=r}catch(r){alert("Erro no upload: "+r.message)}}),document.getElementById("co-save-identity").addEventListener("click",async()=>{const s=document.getElementById("co-save-identity");s.disabled=!0,s.textContent="Salvando…";const o=await X([["company.name",document.getElementById("co-name").value.trim()],["company.creci",document.getElementById("co-creci").value.trim()],["company.logo_url",document.getElementById("co-logo-url").value.trim()],["company.favicon_url",document.getElementById("co-favicon-url").value.trim()]]);o&&Ee(),s.disabled=!1,s.textContent="Salvar Identidade",q(document.getElementById("co-identity-msg"),o)}),document.getElementById("co-save-contacts").addEventListener("click",async()=>{const s=document.getElementById("co-save-contacts");s.disabled=!0,s.textContent="Salvando…";const o=document.getElementById("co-whatsapp").value.trim(),r=await X([["company.whatsapp",o],["company.phone",document.getElementById("co-phone").value.trim()],["company.email",document.getElementById("co-email").value.trim()],["company.address",document.getElementById("co-address").value.trim()]]);r&&o&&(z=o,Y=`https://wa.me/${o}`),s.disabled=!1,s.textContent="Salvar Contatos",q(document.getElementById("co-contacts-msg"),r)}),document.getElementById("co-save-social").addEventListener("click",async()=>{const s=document.getElementById("co-save-social");s.disabled=!0,s.textContent="Salvando…";const o=await X([["company.instagram_url",document.getElementById("co-instagram").value.trim()],["company.facebook_url",document.getElementById("co-facebook").value.trim()],["company.youtube_url",document.getElementById("co-youtube").value.trim()],["company.tiktok_url",document.getElementById("co-tiktok").value.trim()],["company.linkedin_url",document.getElementById("co-linkedin").value.trim()]]);s.disabled=!1,s.textContent="Salvar Redes Sociais",q(document.getElementById("co-social-msg"),o)})}async function Et(){const e=document.getElementById("section-visual");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("settings").select("key,value"),n={};a==null||a.forEach(m=>{n[m.key]=m.value||""});const t=n["visual.accent_color"]||"#b8962e",s=n["visual.primary_bg"]||"#0f1c2e",o=n["visual.secondary_bg"]||"#1a2f4a",r=n["visual.hero_bg_url"]||"",l=n["visual.price_max_slider"]||13e7;e.innerHTML=`
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
          <input id="vis-hero-url" class="form-control" value="${b(r)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <div id="vis-hero-preview" style="margin-top:10px;display:${r?"":"none"}">
          <img src="${b(r)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
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
  `;function i(m,u,c){const f=document.getElementById(m),p=document.getElementById(u);f==null||f.addEventListener("input",y=>{p.value=y.target.value,c()}),p==null||p.addEventListener("input",y=>{/^#[0-9a-fA-F]{6}$/.test(y.target.value)&&(f.value=y.target.value,c())})}function d(){var u,c,f,p;const m=((u=document.getElementById("col-accent-hex"))==null?void 0:u.value)||"#b8962e";(c=document.getElementById("vp-bar"))==null||c.style.setProperty("background",m),(f=document.getElementById("vp-dot"))==null||f.style.setProperty("background",m),(p=document.getElementById("vp-btn"))==null||p.style.setProperty("background",m),document.documentElement.style.setProperty("--accent",m)}i("col-accent","col-accent-hex",d),i("col-primary","col-primary-hex",()=>{}),i("col-secondary","col-secondary-hex",()=>{}),d(),document.getElementById("vis-hero-file").addEventListener("change",async m=>{const u=m.target.files[0];if(u)try{const c=await Se(u,"hero");document.getElementById("vis-hero-url").value=c;const f=document.getElementById("vis-hero-preview");f.innerHTML=`<img src="${c}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`,f.style.display=""}catch(c){alert("Erro no upload: "+c.message)}}),document.getElementById("visual-save-colors").addEventListener("click",async()=>{const m=document.getElementById("visual-save-colors");m.disabled=!0,m.textContent="Salvando…";const u=await X([["visual.accent_color",document.getElementById("col-accent-hex").value],["visual.primary_bg",document.getElementById("col-primary-hex").value],["visual.secondary_bg",document.getElementById("col-secondary-hex").value]]);u&&Ee(),m.disabled=!1,m.textContent="Salvar Cores",q(document.getElementById("visual-colors-msg"),u)}),document.getElementById("visual-reset-colors").addEventListener("click",async()=>{confirm("Restaurar cores padrão?")&&(document.getElementById("col-accent").value="#b8962e",document.getElementById("col-accent-hex").value="#b8962e",document.getElementById("col-primary").value="#0f1c2e",document.getElementById("col-primary-hex").value="#0f1c2e",document.getElementById("col-secondary").value="#1a2f4a",document.getElementById("col-secondary-hex").value="#1a2f4a",d())}),document.getElementById("visual-save-images").addEventListener("click",async()=>{const m=document.getElementById("visual-save-images");m.disabled=!0,m.textContent="Salvando…";const u=await X([["visual.hero_bg_url",document.getElementById("vis-hero-url").value.trim()],["visual.price_max_slider",parseInt(document.getElementById("vis-price-max").value,10)||13e7]]);m.disabled=!1,m.textContent="Salvar Imagens",q(document.getElementById("visual-images-msg"),u)})}async function wt(){const e=document.getElementById("section-site-config");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("site_content").select("*"),n={};a==null||a.forEach(i=>{n[i.key]=i});const t=(i,d)=>{var m;return b(((m=n[i])==null?void 0:m[`value_${d}`])||"")},s=["pt","en","es"],o={pt:"🇧🇷 Português",en:"🇺🇸 English",es:"🇪🇸 Español"},r=i=>s.map(d=>`<button class="content-tab${d===i?" active":""}" data-lang="${d}">${o[d]}</button>`).join(""),l=i=>`
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
      <div class="content-tabs" id="sc-tabs">${r("pt")}</div>
      <div id="sc-panels">
        ${s.map(i=>`<div class="content-panel${i==="pt"?" active":""}" data-panel="${i}">${l(i)}</div>`).join("")}
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
  `,document.getElementById("sc-tabs").addEventListener("click",i=>{var m;const d=i.target.closest(".content-tab");d&&(document.querySelectorAll("#sc-tabs .content-tab").forEach(u=>u.classList.remove("active")),document.querySelectorAll("#sc-panels .content-panel").forEach(u=>u.classList.remove("active")),d.classList.add("active"),(m=document.querySelector(`#sc-panels [data-panel="${d.dataset.lang}"]`))==null||m.classList.add("active"))}),document.getElementById("sc-save-btn").addEventListener("click",async()=>{const i=document.getElementById("sc-save-btn");i.disabled=!0,i.textContent="Salvando…";const d={};document.querySelectorAll(".sc-field").forEach(u=>{const c=u.dataset.key,f=u.dataset.lang;d[c]||(d[c]={}),d[c][f]=u.value});let m=!0;for(const[u,c]of Object.entries(d))await oe(u,{pt:c.pt,en:c.en,es:c.es})||(m=!1);i.disabled=!1,i.textContent="Salvar Conteúdo",q(document.getElementById("sc-save-msg"),m)}),document.getElementById("seo-save-btn").addEventListener("click",async()=>{const i=document.getElementById("seo-save-btn");i.disabled=!0,i.textContent="Salvando…";const d=document.getElementById("seo-title").value.trim(),m=document.getElementById("seo-desc").value.trim(),u=await oe("seo.title_pt",{pt:d,en:d,es:d})&&await oe("seo.description_pt",{pt:m,en:m,es:m});i.disabled=!1,i.textContent="Salvar SEO",q(document.getElementById("seo-save-msg"),u)})}async function xt(){const e=document.getElementById("section-crm-config");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `,await N())}async function N(){const e=document.getElementById("crm-body");if(!e)return;const[{data:a},{data:n},{data:t},{data:s}]=await Promise.all([v.from("crm_pipelines").select("*").order("sort_order"),v.from("crm_stages").select("*").order("sort_order"),v.from("crm_tags").select("*").order("name"),v.from("crm_lead_statuses").select("*").order("sort_order")]),o=a||[],r=o.find(c=>c.is_default)||o[0],l=o.map(c=>`<option value="${c.id}"${c.id===(r==null?void 0:r.id)?" selected":""}>${b(c.name)}</option>`).join(""),d=(n||[]).filter(c=>c.pipeline_id===(r==null?void 0:r.id)).map(c=>`
    <div class="stage-item" data-id="${c.id}">
      <div class="stage-color-dot" style="background:${c.color}"></div>
      <span class="stage-name">${b(c.name)}</span>
      <input type="color" value="${c.color}" data-sid="${c.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${c.id}" title="Remover etapa">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>',m=(t||[]).map(c=>`<span class="tag-chip" style="background:${c.color}" data-id="${c.id}">
      ${b(c.name)}
      <button class="tag-chip-del" data-id="${c.id}" title="Remover">✕</button>
    </span>`).join("")||'<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>',u=(s||[]).map(c=>`
    <div class="stage-item" data-id="${c.id}">
      <div class="stage-color-dot" style="background:${c.color}"></div>
      <span class="stage-name">${b(c.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${c.is_final?"Final":""}</span>
      <button class="icon-btn del-btn status-del" data-id="${c.id}" title="Remover">🗑️</button>
    </div>`).join("")||'<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>';e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${l}</select>
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
  `,document.getElementById("crm-add-stage").addEventListener("click",async()=>{const c=document.getElementById("crm-new-stage").value.trim(),f=document.getElementById("crm-new-stage-color").value,p=parseInt(document.getElementById("crm-pipe-sel").value,10);c&&(await v.from("crm_stages").insert({pipeline_id:p,name:c,color:f,sort_order:99}),document.getElementById("crm-new-stage").value="",await N())}),e.querySelectorAll(".stage-del").forEach(c=>{c.addEventListener("click",async()=>{confirm("Remover esta etapa?")&&(await v.from("crm_stages").delete().eq("id",c.dataset.id),await N())})}),e.querySelectorAll(".stage-color-pick").forEach(c=>{c.addEventListener("change",async f=>{await v.from("crm_stages").update({color:f.target.value}).eq("id",c.dataset.sid);const p=c.closest(".stage-item").querySelector(".stage-color-dot");p&&(p.style.background=f.target.value)})}),document.getElementById("crm-add-tag").addEventListener("click",async()=>{const c=document.getElementById("crm-new-tag").value.trim(),f=document.getElementById("crm-new-tag-color").value;c&&(await v.from("crm_tags").insert({name:c,color:f}),document.getElementById("crm-new-tag").value="",await N())}),e.querySelectorAll(".tag-chip-del").forEach(c=>{c.addEventListener("click",async()=>{await v.from("crm_tags").delete().eq("id",c.dataset.id),await N()})}),document.getElementById("crm-add-status").addEventListener("click",async()=>{const c=document.getElementById("crm-new-status").value.trim(),f=document.getElementById("crm-new-status-color").value,p=document.getElementById("crm-new-status-final").checked;c&&(await v.from("crm_lead_statuses").insert({name:c,color:f,is_final:p,sort_order:99}),document.getElementById("crm-new-status").value="",await N())}),e.querySelectorAll(".status-del").forEach(c=>{c.addEventListener("click",async()=>{confirm("Remover este status?")&&(await v.from("crm_lead_statuses").delete().eq("id",c.dataset.id),await N())})}),document.getElementById("crm-add-pipeline").addEventListener("click",async()=>{var f;const c=(f=prompt("Nome do novo funil:"))==null?void 0:f.trim();c&&(await v.from("crm_pipelines").insert({name:c,sort_order:99}),await N())})}async function It(){const e=document.getElementById("section-integracoes");if(!e||e.dataset.loaded)return;e.dataset.loaded="1";const{data:a}=await v.from("integrations").select("*"),n={};a==null||a.forEach(l=>{n[l.key]=l});const t=l=>{var i;return b(((i=n[l])==null?void 0:i.value)||"")},s=l=>{var i;return(i=n[l])!=null&&i.enabled?"checked":""},o=[{key:"meta_pixel_id",icon:"📘",label:"Meta Pixel",desc:"ID do Pixel do Facebook/Instagram para rastreamento de conversões",placeholder:"123456789012345"},{key:"ga_measurement_id",icon:"📊",label:"Google Analytics 4",desc:"Measurement ID do GA4 (ex: G-XXXXXXXXXX)",placeholder:"G-XXXXXXXXXX"},{key:"gtm_container_id",icon:"🏷️",label:"Google Tag Manager",desc:"ID do container do GTM (ex: GTM-XXXXXXX)",placeholder:"GTM-XXXXXXX"},{key:"webhook_new_lead",icon:"🔔",label:"Webhook — Novo Lead",desc:"URL chamada quando um novo lead chega (POST com JSON)",placeholder:"https://..."},{key:"webhook_new_property",icon:"🏠",label:"Webhook — Novo Imóvel",desc:"URL chamada quando um imóvel é publicado",placeholder:"https://..."}],r=[{key:"smtp_host",label:"Host SMTP",placeholder:"smtp.gmail.com"},{key:"smtp_port",label:"Porta",placeholder:"587"},{key:"smtp_user",label:"Usuário",placeholder:"email@dominio.com"},{key:"smtp_from_name",label:"Nome do remetente",placeholder:"Omar Corretor"}];e.innerHTML=`
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${o.map(l=>`
        <div class="integration-row">
          <div class="integration-icon">${l.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${l.label}</div>
            <div class="integration-desc">${l.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${l.key}" ${s(l.key)}>
              <span class="toggle-slider"></span>
            </label>
            <input type="text" class="integration-value intg-val" data-key="${l.key}"
              value="${t(l.key)}" placeholder="${l.placeholder}">
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
      ${r.map(l=>`
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label">${l.label}</label>
          <input class="form-control smtp-field" data-key="${l.key}" value="${t(l.key)}" placeholder="${l.placeholder}">
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
  `,document.getElementById("intg-save-tracking").addEventListener("click",async()=>{var u;const l=document.getElementById("intg-save-tracking");l.disabled=!0,l.textContent="Salvando…";let i=!0;const d=document.querySelectorAll(".intg-val"),m=document.querySelectorAll(".intg-toggle");for(let c=0;c<d.length;c++){const f=d[c].dataset.key,p=d[c].value.trim(),y=((u=m[c])==null?void 0:u.checked)??!1;await ve(f,p,y)||(i=!1)}l.disabled=!1,l.textContent="Salvar Integrações",q(document.getElementById("intg-tracking-msg"),i)}),document.getElementById("intg-save-smtp").addEventListener("click",async()=>{const l=document.getElementById("intg-save-smtp");l.disabled=!0,l.textContent="Salvando…";const i=document.querySelectorAll(".smtp-field");let d=!0;for(const u of i)await ve(u.dataset.key,u.value.trim(),!0)||(d=!1);const m=document.getElementById("smtp-pass").value;m&&(await ve("smtp_pass",m,!0)||(d=!1)),l.disabled=!1,l.textContent="Salvar SMTP",q(document.getElementById("intg-smtp-msg"),d)})}async function Bt(){const e=document.getElementById("section-midia");if(!e||e.dataset.loaded)return;e.dataset.loaded="1",e.innerHTML=`
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
  `,await he(),document.getElementById("media-file-input").addEventListener("change",async n=>{var i,d;const t=Array.from(n.target.files);if(!t.length)return;const s=document.getElementById("media-upload-progress"),o=document.getElementById("media-progress-fill"),r=document.getElementById("media-progress-text");s.style.display="";let l=0;for(const m of t){r.textContent=`Enviando ${l+1}/${t.length}…`,o.style.width=`${Math.round(l/t.length*100)}%`;try{const u=await Se(m,"media"),c=m.name.replace(/\.[^.]+$/,"").slice(0,60);await v.from("media_library").insert({name:c,url:u,type:"image",size:m.size,created_by:(d=(i=(await v.auth.getUser()).data)==null?void 0:i.user)==null?void 0:d.id})}catch(u){console.error("Media upload error:",u)}l++}o.style.width="100%",r.textContent=`✓ ${l} arquivo(s) enviado(s)`,setTimeout(()=>{s.style.display="none",o.style.width="0"},2e3),await he(),n.target.value=""});const a=document.getElementById("media-drop-area");a.addEventListener("dragover",n=>{n.preventDefault(),a.classList.add("drag-over")}),a.addEventListener("dragleave",()=>a.classList.remove("drag-over")),a.addEventListener("drop",n=>{n.preventDefault(),a.classList.remove("drag-over"),document.getElementById("media-file-input").files=n.dataTransfer.files,document.getElementById("media-file-input").dispatchEvent(new Event("change"))})}async function he(){const e=document.getElementById("media-grid");if(!e)return;const{data:a,error:n}=await v.from("media_library").select("*").order("created_at",{ascending:!1}).limit(100);if(n||!(a!=null&&a.length)){e.innerHTML='<div class="media-empty">Nenhuma imagem enviada ainda.</div>';return}e.innerHTML=a.map(t=>`
    <div class="media-item" data-id="${t.id}" data-url="${b(t.url)}">
      <img src="${b(t.url)}" alt="${b(t.name||"")}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${b(t.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${t.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${b(t.name||"imagem")}</div>
    </div>
  `).join(""),e.querySelectorAll(".media-copy-btn").forEach(t=>{t.addEventListener("click",s=>{var o;s.stopPropagation(),(o=navigator.clipboard)==null||o.writeText(t.dataset.url).then(()=>{const r=t.textContent;t.textContent="✓ Copiado!",setTimeout(()=>{t.textContent=r},1500)})})}),e.querySelectorAll(".media-del-btn").forEach(t=>{t.addEventListener("click",async s=>{s.stopPropagation(),confirm("Excluir esta imagem da biblioteca?")&&(await v.from("media_library").delete().eq("id",t.dataset.id),await he())})})}async function St(){var a,n,t,s,o,r;const e=document.getElementById("section-super-admin");!e||e.dataset.loaded||(e.dataset.loaded="1",e.innerHTML=`
    <div class="cfg-card">
      <div class="cfg-card-title" style="display:flex;align-items:center;justify-content:space-between;">
        <span>⚡ Painel Global da Plataforma</span>
        <button id="sa-edit-site-btn" style="display:flex;align-items:center;gap:6px;background:#b8962e;color:#0f1c2e;border:none;padding:7px 16px;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;text-decoration:none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Editar Site
        </button>
      </div>
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
  `,e.querySelectorAll(".sa-tab").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll(".sa-tab").forEach(d=>d.classList.remove("active")),e.querySelectorAll(".sa-panel").forEach(d=>d.classList.add("hidden")),l.classList.add("active");const i=e.querySelector(`#sa-panel-${l.dataset.tab}`);i&&i.classList.remove("hidden"),l.dataset.tab==="tenants"&&!e.querySelector("#sa-tenants-list").dataset.loaded&&G(),l.dataset.tab==="plans"&&!e.querySelector("#sa-plans-list").dataset.loaded&&Lt(),l.dataset.tab==="subscriptions"&&!e.querySelector("#sa-subs-list").dataset.loaded&&Te(),l.dataset.tab==="global-users"&&!e.querySelector("#sa-users-list").dataset.loaded&&Me(),l.dataset.tab==="platform"&&Pe()})}),(a=e.querySelector("#sa-edit-site-btn"))==null||a.addEventListener("click",()=>{window.open(location.origin+"/?edit=1","_blank")}),(n=e.querySelector("#sa-sub-filter"))==null||n.addEventListener("change",Te),(t=e.querySelector("#sa-tenant-search"))==null||t.addEventListener("input",G),(s=e.querySelector("#sa-user-search"))==null||s.addEventListener("input",Me),(o=e.querySelector("#sa-tenant-new"))==null||o.addEventListener("click",()=>_t()),(r=e.querySelector("#sa-plat-save"))==null||r.addEventListener("click",$t),G(),Pe())}async function G(){var l,i;const e=document.getElementById("sa-tenants-list"),a=((i=(l=document.getElementById("sa-tenant-search"))==null?void 0:l.value)==null?void 0:i.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";let n=v.from("tenants").select("*, plans(name, price_brl)").order("created_at",{ascending:!1});const{data:t,error:s}=await n;if(s){e.innerHTML=`<div class="sa-error">Erro ao carregar: ${s.message}</div>`;return}const o=(t||[]).filter(d=>{var m,u;return!a||((m=d.name)==null?void 0:m.toLowerCase().includes(a))||((u=d.slug)==null?void 0:u.toLowerCase().includes(a))});if(!o.length){e.innerHTML='<div class="sa-empty">Nenhuma imobiliária encontrada.</div>';return}const r=d=>d.active?'<span class="sa-badge sa-badge-green">Ativo</span>':'<span class="sa-badge sa-badge-red">Inativo</span>';e.innerHTML=o.map(d=>{var m;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        ${d.logo_url?`<img class="sa-tenant-logo" src="${b(d.logo_url)}" alt="">`:'<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${b(d.name||"—")}</div>
          <div class="sa-list-sub">${b(d.slug||"")} · ${b(((m=d.plans)==null?void 0:m.name)||"Sem plano")}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${r(d)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${d.id}" data-active="${d.active}" title="${d.active?"Desativar":"Ativar"}">${d.active?"⏸️":"▶️"}</button>
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${d.id}" title="Editar">✏️</button>
      </div>
    </div>
  `}).join(""),e.querySelectorAll('[data-action="toggle-tenant"]').forEach(d=>{d.addEventListener("click",async()=>{const m=d.dataset.active==="true";await v.from("tenants").update({active:!m}).eq("id",d.dataset.id),G()})})}async function Lt(){const e=document.getElementById("sa-plans-list");if(!e)return;e.dataset.loaded="1";const{data:a,error:n}=await v.from("plans").select("*").order("price_brl");if(n){e.innerHTML=`<div class="sa-error">Erro: ${n.message}</div>`;return}e.innerHTML=(a||[]).map(t=>`
    <div class="sa-plan-card">
      <div class="sa-plan-name">${b(t.name)}</div>
      <div class="sa-plan-price">${t.price_brl===0?"Gratuito":"R$ "+Number(t.price_brl).toLocaleString("pt-BR",{minimumFractionDigits:2})+"/mês"}</div>
      <div class="sa-plan-limits">
        <span>👥 ${t.max_users===999?"Ilimitado":t.max_users} usuários</span>
        <span>🏠 ${t.max_properties===9999?"Ilimitado":t.max_properties} imóveis</span>
        <span>📋 ${t.max_leads===99999?"Ilimitado":t.max_leads} leads</span>
      </div>
    </div>
  `).join("")}async function Te(){var l;const e=document.getElementById("sa-subs-list"),a=((l=document.getElementById("sa-sub-filter"))==null?void 0:l.value)||"";if(!e)return;e.dataset.loaded="1";let n=v.from("subscriptions").select("*, tenants(name), plans(name, price_brl)").order("created_at",{ascending:!1});a&&(n=n.eq("status",a));const{data:t,error:s}=await n;if(s){e.innerHTML=`<div class="sa-error">Erro: ${s.message}</div>`;return}if(!(t!=null&&t.length)){e.innerHTML='<div class="sa-empty">Nenhuma assinatura encontrada.</div>';return}const o={active:"green",trialing:"blue",past_due:"orange",cancelled:"red",paused:"gray"},r={active:"Ativo",trialing:"Trial",past_due:"Inadimplente",cancelled:"Cancelado",paused:"Pausado"};e.innerHTML=t.map(i=>{var d,m,u;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${b(((d=i.tenants)==null?void 0:d.name)||"—")}</div>
          <div class="sa-list-sub">${b(((m=i.plans)==null?void 0:m.name)||"—")} · R$ ${Number(((u=i.plans)==null?void 0:u.price_brl)||0).toLocaleString("pt-BR",{minimumFractionDigits:2})}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${o[i.status]||"gray"}">${r[i.status]||i.status}</span>
        <span class="sa-list-date">${i.current_period_end?new Date(i.current_period_end).toLocaleDateString("pt-BR"):"—"}</span>
      </div>
    </div>
  `}).join("")}async function Me(){var r,l;const e=document.getElementById("sa-users-list"),a=((l=(r=document.getElementById("sa-user-search"))==null?void 0:r.value)==null?void 0:l.toLowerCase())||"";if(!e)return;e.dataset.loaded="1";const{data:n,error:t}=await v.from("profiles").select("*, tenants(name)").order("created_at",{ascending:!1}).limit(100);if(t){e.innerHTML=`<div class="sa-error">Erro: ${t.message}</div>`;return}const s=(n||[]).filter(i=>{var d,m;return!a||((d=i.name)==null?void 0:d.toLowerCase().includes(a))||((m=i.email)==null?void 0:m.toLowerCase().includes(a))});if(!s.length){e.innerHTML='<div class="sa-empty">Nenhum usuário encontrado.</div>';return}const o={super_admin:"⚡ Super Admin",admin:"👑 Admin",corretor:"🔑 Corretor"};e.innerHTML=s.map(i=>{var d;return`
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(i.name||"?")[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${b(i.name||"—")}</div>
          <div class="sa-list-sub">${b(((d=i.tenants)==null?void 0:d.name)||"Sem imobiliária")} · ${o[i.role]||i.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${i.active!==!1?"sa-badge-green":"sa-badge-red"}">${i.active!==!1?"Ativo":"Inativo"}</span>
      </div>
    </div>
  `}).join("")}async function Pe(){const[e,a,n,t]=await Promise.all([v.from("tenants").select("id",{count:"exact",head:!0}),v.from("profiles").select("id",{count:"exact",head:!0}),v.from("subscriptions").select("id",{count:"exact",head:!0}).eq("status","active"),v.from("properties").select("id",{count:"exact",head:!0}).eq("published",!0)]),s=(o,r)=>{const l=document.getElementById(o);l&&(l.textContent=r??"—")};s("sa-stat-tenants",e.count),s("sa-stat-users",a.count),s("sa-stat-subs",n.count),s("sa-stat-props",t.count)}async function $t(){var n,t,s;const e=document.getElementById("sa-plat-save"),a=document.getElementById("sa-plat-msg");e&&(e.disabled=!0,e.textContent="Salvando…"),await X([{key:"platform.name",value:((n=document.getElementById("sa-plat-name"))==null?void 0:n.value)||""},{key:"platform.support_email",value:((t=document.getElementById("sa-plat-email"))==null?void 0:t.value)||""},{key:"platform.trial_days",value:((s=document.getElementById("sa-plat-trial"))==null?void 0:s.value)||"14"}]),e&&(e.disabled=!1,e.textContent="Salvar Configurações"),q(a,!0)}function _t(){var t,s,o,r,l;const e=document.getElementById("sa-new-tenant-modal");e&&e.remove();const a=document.createElement("div");a.id="sa-new-tenant-modal",a.className="sa-modal-backdrop",a.innerHTML=`
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
  `,document.body.appendChild(a),v.from("plans").select("id, name").then(({data:i})=>{const d=document.getElementById("nt-plan");d&&i&&(d.innerHTML=i.map(m=>`<option value="${m.id}">${b(m.name)}</option>`).join(""))}),(t=document.getElementById("nt-name"))==null||t.addEventListener("input",i=>{const d=document.getElementById("nt-slug");d&&!d.dataset.manual&&(d.value=i.target.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""))}),(s=document.getElementById("nt-slug"))==null||s.addEventListener("input",i=>{i.target.dataset.manual="1"});const n=()=>a.remove();(o=document.getElementById("sa-modal-close-btn"))==null||o.addEventListener("click",n),(r=document.getElementById("nt-cancel"))==null||r.addEventListener("click",n),a.addEventListener("click",i=>{i.target===a&&n()}),(l=document.getElementById("nt-save"))==null||l.addEventListener("click",async()=>{var y,w,g,h,B,$,C;const i=(w=(y=document.getElementById("nt-name"))==null?void 0:y.value)==null?void 0:w.trim(),d=(h=(g=document.getElementById("nt-slug"))==null?void 0:g.value)==null?void 0:h.trim(),m=($=(B=document.getElementById("nt-domain"))==null?void 0:B.value)==null?void 0:$.trim(),u=(C=document.getElementById("nt-plan"))==null?void 0:C.value,c=document.getElementById("nt-msg"),f=document.getElementById("nt-save");if(!i||!d){q(c,!1),c.textContent="Nome e slug são obrigatórios.";return}f&&(f.disabled=!0,f.textContent="Criando…");const{error:p}=await v.from("tenants").insert({name:i,slug:d,domain:m||null,plan_id:u||null,active:!0});if(f&&(f.disabled=!1,f.textContent="Criar Imobiliária"),p){q(c,!1),c.textContent=p.message;return}q(c,!0),setTimeout(()=>{n(),G()},800)})}
