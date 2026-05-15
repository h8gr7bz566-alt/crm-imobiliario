// script.js — compartilha lógica entre index.html e admin.html
(function(){
  // Senha segura do admin (altere periodicamente)
  const ADMIN_PASSWORD = 'ImobiPro@2026#Seg';
  const SAMPLE_PHOTOS = [
    'https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3'
  ];

  function getProperties(){
    try{return JSON.parse(localStorage.getItem('properties')||'[]')}catch(e){return []}
  }
  function saveProperties(list){
    localStorage.setItem('properties',JSON.stringify(list));
    window.dispatchEvent(new Event('properties:updated'));
  }

  function getLeads(){
    try{return JSON.parse(localStorage.getItem('leads')||'[]')}catch(e){return []}
  }
  function saveLeads(list){
    localStorage.setItem('leads',JSON.stringify(list));
    window.dispatchEvent(new Event('leads:updated'));
  }

  // Rendering for public site
  function renderPublic(){
    const container = document.getElementById('properties');
    if(!container) return;
    const props = getProperties();
    container.innerHTML = props.length? props.map(p=>`<div class="card property-card"><img src="${p.image||SAMPLE_PHOTOS[0]}" alt="${escapeHTML(p.title)}"><div class="property-info"><strong>${escapeHTML(p.title)}</strong><div class="muted">${escapeHTML(p.address||'')}</div><div>${escapeHTML(p.price)}</div><p class="muted">${escapeHTML((p.description||'').slice(0,120))}</p></div></div>`).join('') : '<div class="muted">Nenhum imóvel cadastrado ainda.</div>';
  }

  // Hero images
  function renderHero(){
    const el = document.getElementById('hero-gallery');
    if(!el) return;
    el.innerHTML = SAMPLE_PHOTOS.map(u=>`<img src="${u}" alt="casa">`).join('');
  }

  // Contact form (public)
  function attachContact(){
    const open = document.getElementById('contact-main');
    const modal = document.getElementById('contact-modal');
    const close = document.getElementById('close-contact');
    const form = document.getElementById('contact-form');
    if(open) open.addEventListener('click',()=>modal.classList.remove('hidden'));
    if(close) close.addEventListener('click',()=>modal.classList.add('hidden'));
    if(form) form.addEventListener('submit',e=>{
      e.preventDefault();
      const fd = new FormData(form);
      const lead = {id:Date.now(),name:fd.get('name'),contact:fd.get('contact'),message:fd.get('message'),created:new Date().toISOString()};
      const leads = getLeads(); leads.unshift(lead); saveLeads(leads);
      alert('Mensagem enviada (simulado).');
      modal.classList.add('hidden'); form.reset();
    });
  }

  // Admin renders
  function renderAdmin(){
    const el = document.getElementById('admin-properties');
    if(el){
      const props = getProperties();
      el.innerHTML = props.length? props.map((p,i)=>`<div class="card"><img src="${p.image||SAMPLE_PHOTOS[0]}" style="width:100%;height:120px;object-fit:cover;border-radius:6px"><div class="property-info"><strong>${escapeHTML(p.title)}</strong><div class="muted">${escapeHTML(p.address||'')}</div><div>${escapeHTML(p.price)}</div><p class="muted">${escapeHTML((p.description||'').slice(0,120))}</p><div style="margin-top:8px"><button data-index="${i}" class="btn small edit">Editar</button> <button data-index="${i}" class="btn small secondary del">Remover</button></div></div></div>`).join('') : '<div class="muted">Nenhum imóvel cadastrado.</div>';
    }

    const leadsEl = document.getElementById('leads');
    if(leadsEl){
      const leads = getLeads();
      leadsEl.innerHTML = leads.length? leads.map(l=>`<div class="card"><strong>${escapeHTML(l.name)}</strong><div class="muted">${escapeHTML(l.contact)} • ${new Date(l.created).toLocaleString()}</div><p>${escapeHTML(l.message||'')}</p></div>`).join('') : '<div class="muted">Nenhum lead recebido.</div>';
    }
  }

  // Admin form
  function attachAdminForm(){
    const form = document.getElementById('property-form');
    if(!form) return;
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const fd = new FormData(form);
      const properties = getProperties();
      const prop = {id:Date.now(),title:fd.get('title'),address:fd.get('address'),price:fd.get('price'),image:fd.get('image')||sampleImage(),description:fd.get('description')};
      properties.unshift(prop); saveProperties(properties);
      form.reset(); renderAdmin(); alert('Imóvel cadastrado.');
    });

    document.addEventListener('click',e=>{
      if(e.target.matches('.del')){
        const i = Number(e.target.dataset.index);
        const props = getProperties(); props.splice(i,1); saveProperties(props); renderAdmin();
      }
    });
  }

  function sampleImage(){ return SAMPLE_PHOTOS[Math.floor(Math.random()*SAMPLE_PHOTOS.length)]; }

  function escapeHTML(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];}); }

  // Sync between tabs using storage event
  window.addEventListener('storage',e=>{
    if(e.key==='properties' || e.key==='leads'){
      renderPublic(); renderAdmin();
    }
  });

  // Custom events
  window.addEventListener('properties:updated',()=>{ renderPublic(); renderAdmin(); });
  window.addEventListener('leads:updated',()=>{ renderAdmin(); });

  // Init on load
  document.addEventListener('DOMContentLoaded',()=>{
    renderHero(); renderPublic(); attachContact(); renderAdmin(); attachAdminForm();
    // Admin auth (simple): if on admin page, require password
    const loginModal = document.getElementById('admin-login');
    const adminRoot = document.getElementById('admin-root');
    if(loginModal){
      const session = sessionStorage.getItem('adminAuth');
      if(session === 'true'){
        loginModal.classList.add('hidden'); adminRoot.classList.remove('hidden');
      } else {
        adminRoot.classList.add('hidden'); loginModal.classList.remove('hidden');
        const form = document.getElementById('login-form');
        form.addEventListener('submit',e=>{
          e.preventDefault();
          const pw = new FormData(form).get('password');
          if(pw === ADMIN_PASSWORD){ sessionStorage.setItem('adminAuth','true'); loginModal.classList.add('hidden'); adminRoot.classList.remove('hidden'); renderAdmin(); }
          else alert('Senha incorreta');
        });
      }
    }
  });

})();
