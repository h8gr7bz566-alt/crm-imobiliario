// script.js — compartilha lógica entre index.html e admin.html
(function(){
  // Senha segura do admin (altere periodicamente)
  const ADMIN_PASSWORD = 'ImobiPro@2026#Seg';  
  // Mapeamento de cidades e bairros principais
  const CITY_NEIGHBORHOODS = {
    'Itapema (SC)': ['Meia Praia', 'Centro', 'Castelo Branco', 'Praia dos Amores'],
    'Balneário Camboriú (SC)': ['Centro', 'Barra Sul', 'Praia dos Amores', 'Prainha', 'Zona Nova'],
    'Itajaí (SC)': ['Centro', 'Bom Retiro', 'Centro Norte', 'Fazenda', 'Vila Operária'],
    'Porto Belo (SC)': ['Centro', 'Bombinhas', 'Canto Grande', 'Praia da Viração'],
    'Florianópolis (SC)': ['Lagoa da Conceição', 'Centro', 'Bom Abrigo', 'Praia Mole', 'Campeche'],
    'Curitiba (PR)': ['Centro', 'Batel', 'Água Verde', 'Bom Retiro', 'Rebouças'],
    'Ponta Grossa (PR)': ['Centro', 'Estrutural', 'Oficinas', 'Ronda', 'Campo Real'],
    'Maringá (PR)': ['Centro', 'Zona 1', 'Zona 4', 'Zona 6', 'Zona 8']
  };  const SAMPLE_PHOTOS = [
    'https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3'
  ];

  function fileToBase64(file){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onload = ()=>resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

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

  // Rendering for public site with filters
  function renderPublic(){
    const container = document.getElementById('properties');
    if(!container) return;
    const props = getProperties();
    
    // Get filter values
    const city = document.getElementById('city-filter')?.value || '';
    const neighborhood = document.getElementById('neighborhood-filter')?.value || '';
    const bedrooms = document.getElementById('bedrooms-filter')?.value || '';
    const parking = document.getElementById('parking-filter')?.value || '';
    const priceMin = parseInt(document.getElementById('price-min-filter')?.value || '0');
    const priceMax = parseInt(document.getElementById('price-max-filter')?.value || '999999999999');
    
    // Filter properties
    const filtered = props.filter(p=>{
      if(city && p.city !== city) return false;
      if(neighborhood && p.neighborhood !== neighborhood) return false;
      if(bedrooms && String(p.bedrooms) !== bedrooms) return false;
      if(parking && String(p.parking) !== parking) return false;
      const price = parseInt(p.price.replace(/[^0-9]/g,'')) || 0;
      if(price < priceMin || price > priceMax) return false;
      return true;
    });
    
    container.innerHTML = filtered.length? filtered.map(p=>`<div class="card property-card"><img src="${p.image||SAMPLE_PHOTOS[0]}" alt="${escapeHTML(p.title)}"><div class="property-info"><strong>${escapeHTML(p.title)}</strong><div class="muted">${escapeHTML(p.address||'')}</div><div class="muted">${escapeHTML(p.city||'')} - ${escapeHTML(p.neighborhood||'')}</div><div><strong>${escapeHTML(p.price)}</strong></div><div class="muted">🛏️ ${p.bedrooms||'--'} | 🚗 ${p.parking||'--'}</div><p class="muted">${escapeHTML((p.description||'').slice(0,100))}</p></div></div>`).join('') : '<div class="muted" style="padding:20px">Nenhum imóvel encontrado com esses filtros.</div>';
  }

  // Hero images
  function renderHero(){
    const el = document.getElementById('hero-gallery');
    if(!el) return;
    el.innerHTML = SAMPLE_PHOTOS.map(u=>`<img src="${u}" alt="casa">`).join('');
  }

  // Contact form (public) - simplified to WhatsApp
  function attachContact(){
    const open = document.getElementById('contact-main');
    const modal = document.getElementById('contact-modal');
    const close = document.getElementById('close-contact');
    if(open) open.addEventListener('click',()=>modal?.classList.remove('hidden'));
    if(close) close.addEventListener('click',()=>modal?.classList.add('hidden'));
    
    // Attach filter listeners
    const cityFilter = document.getElementById('city-filter');
    const neighborhoodFilter = document.getElementById('neighborhood-filter');
    const filterInputs = document.querySelectorAll('[id$="-filter"]');
    
    if(cityFilter){
      cityFilter.addEventListener('change',()=>{
        const selected = cityFilter.value;
        const neighborhoods = CITY_NEIGHBORHOODS[selected] || [];
        neighborhoodFilter.innerHTML = '<option value="">Todos os bairros</option>' + neighborhoods.map(n=>`<option value="${n}">${n}</option>`).join('');
        renderPublic();
      });
    }
    
    filterInputs.forEach(el=>el.addEventListener('change',()=>renderPublic()));
    filterInputs.forEach(el=>el.addEventListener('input',()=>renderPublic()));
  }

  // Admin renders
  function renderAdmin(){
    const el = document.getElementById('admin-properties');
    if(el){
      const props = getProperties();
      el.innerHTML = props.length? props.map((p,i)=>`<div class="card"><img src="${p.image||SAMPLE_PHOTOS[0]}" style="width:100%;height:120px;object-fit:cover;border-radius:6px"><div class="property-info"><strong>${escapeHTML(p.title)}</strong><div class="muted">${escapeHTML(p.address||'')} - ${escapeHTML(p.city||'')}</div><div class="muted">${escapeHTML(p.neighborhood||'')}</div><div><strong>${escapeHTML(p.price)}</strong></div><div class="muted">🛏️ ${p.bedrooms||'--'} | 🚗 ${p.parking||'--'}</div><p class="muted">${escapeHTML((p.description||'').slice(0,100))}</p><div style="margin-top:8px"><button data-index="${i}" class="btn small edit">Editar</button> <button data-index="${i}" class="btn small secondary del">Remover</button></div></div></div>`).join('') : '<div class="muted">Nenhum imóvel cadastrado.</div>';
    }

    const leadsEl = document.getElementById('leads');
    if(leadsEl){
      const leads = getLeads();
      leadsEl.innerHTML = leads.length? leads.map(l=>`<div class="card"><strong>${escapeHTML(l.name)}</strong><div class="muted">${escapeHTML(l.contact)} • ${new Date(l.created).toLocaleString('pt-BR')}</div><p>${escapeHTML(l.message||'')}</p></div>`).join('') : '<div class="muted">Nenhum lead recebido.</div>';
    }
  }

  // Admin form
  function attachAdminForm(){
    const form = document.getElementById('property-form');
    if(!form) return;
    form.addEventListener('submit', async e=>{
      e.preventDefault();
      const fd = new FormData(form);
      const imageFile = fd.get('image');
      let imageBase64 = '';
      
      if(imageFile && imageFile.size > 0){
        imageBase64 = await fileToBase64(imageFile);
      }
      
      const properties = getProperties();
      const prop = {
        id:Date.now(),
        title:fd.get('title'),
        address:fd.get('address'),
        city:fd.get('city'),
        neighborhood:fd.get('neighborhood'),
        price:fd.get('price'),
        bedrooms:parseInt(fd.get('bedrooms'))||0,
        parking:parseInt(fd.get('parking'))||0,
        image:imageBase64 || sampleImage(),
        description:fd.get('description')
      };
      properties.unshift(prop); 
      saveProperties(properties);
      form.reset(); 
      renderAdmin(); 
      alert('Imóvel cadastrado com sucesso!');
    });

    document.addEventListener('click',e=>{
      if(e.target.matches('.del')){
        const i = Number(e.target.dataset.index);
        const props = getProperties(); 
        props.splice(i,1); 
        saveProperties(props); 
        renderAdmin();
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
