// script.js — compartilha lógica entre index.html e admin.html com IndexedDB
(function(){
  const ADMIN_PASSWORD = 'ImobiPro@2026#Seg';
  const WHATSAPP_NUMBER = '5547999701743';
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

  const DB_NAME = 'imobiliario';
  const DB_VER = 1;
  const STORE_NAME = 'properties';

  const CITY_NEIGHBORHOODS = {
    'Balneário Camboriú (SC)': ['Centro','Barra Sul','Barra Norte','Pioneiros','Praia dos Amores','Nações','Estados','Ariribá'],
    'Itapema (SC)': ['Meia Praia','Centro','Morretes','Tabuleiro','Ilhota','Alto São Bento'],
    'Itajaí (SC)': ['Praia Brava','Centro','Fazenda','Cabeçudas','Ressacada','Cordeiros'],
    'Porto Belo (SC)': ['Perequê','Centro','Balneário Perequê','Alto Perequê'],
    'Florianópolis (SC)': ['Centro','Jurerê Internacional','Campeche','Trindade','Agronômica','Ingleses'],
    'Curitiba (PR)': ['Batel','Bigorrilho','Ecoville','Centro','Água Verde','Cabral'],
    'Ponta Grossa (PR)': ['Olarias','Estrela','Centro','Jardim América','Uvaranas','Nova Rússia','Oficinas'],
    'Carambeí (PR)': ['Centro','Boqueirão','Novo Horizonte','Jardim Eldorado','AFC','Catanduvas'],
    'Maringá (PR)': ['Zona 01','Zona 02','Zona 03','Zona 04','Zona 05','Zona 06','Zona 07']
  };

  const SAMPLE_PHOTOS = [
    'https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3'
  ];

  // ───── IndexedDB ─────
  function openDB(){
    return new Promise((resolve, reject)=>{
      const req = indexedDB.open(DB_NAME, DB_VER);
      req.onerror = ()=>reject(req.error);
      req.onsuccess = ()=>resolve(req.result);
      req.onupgradeneeded = e=>{
        const db = e.target.result;
        if(!db.objectStoreNames.contains(STORE_NAME)){
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  async function getAllProperties(){
    const db = await openDB();
    return new Promise((resolve, reject)=>{
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = ()=>resolve(req.result || []);
      req.onerror = ()=>reject(req.error);
    });
  }

  async function saveProperty(prop){
    const db = await openDB();
    return new Promise((resolve, reject)=>{
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(prop);
      req.onsuccess = ()=>{ resolve(); window.dispatchEvent(new CustomEvent('properties:updated')); };
      req.onerror = ()=>reject(req.error);
    });
  }

  async function deleteProperty(id){
    const db = await openDB();
    return new Promise((resolve, reject)=>{
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = ()=>{ resolve(); window.dispatchEvent(new CustomEvent('properties:updated')); };
      req.onerror = ()=>reject(req.error);
    });
  }

  // ───── File → Base64 ─────
  function fileToBase64(file){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onload = ()=>resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function filesToBase64List(fileList){
    const files = Array.from(fileList);
    const results = [];
    for(const f of files){
      const b64 = await fileToBase64(f);
      results.push(b64);
    }
    return results;
  }

  // ───── Render Public (Index) ─────
  async function renderPublic(){
    const container = document.getElementById('properties');
    if(!container) return;

    const props = await getAllProperties();
    const city = document.getElementById('city-filter')?.value || '';
    const neighborhood = document.getElementById('neighborhood-filter')?.value || '';
    const bedrooms = document.getElementById('bedrooms-filter')?.value || '';
    const parking = document.getElementById('parking-filter')?.value || '';
    const priceMin = parseInt(document.getElementById('price-min-filter')?.value || '10000', 10);
    const priceMax = parseInt(document.getElementById('price-max-filter')?.value || '130000000', 10);

    const filtered = props.filter(p => {
      if(city && p.city !== city) return false;
      if(neighborhood && p.neighborhood !== neighborhood) return false;
      if(bedrooms){
        if(bedrooms === '4+' && Number(p.bedrooms) < 4) return false;
        if(bedrooms !== '4+' && Number(p.bedrooms) !== Number(bedrooms)) return false;
      }
      if(parking){
        if(parking === '4+' && Number(p.parking) < 4) return false;
        if(parking !== '4+' && Number(p.parking) !== Number(parking)) return false;
      }
      const price = parseInt(String(p.price || '').replace(/[^0-9]/g, ''), 10) || 0;
      if(price < priceMin || price > priceMax) return false;
      return true;
    });

    if(!filtered.length){
      container.innerHTML = '<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';
      return;
    }

    container.innerHTML = filtered.map(p => {
      const images = p.images && p.images.length ? p.images : [SAMPLE_PHOTOS[0]];
      const carouselId = `car-${p.id}`;
      return `
        <div class="card property-card">
          <div class="carousel-wrap" id="${carouselId}" style="position:relative">
            <img src="${images[0]}" alt="${escapeHTML(p.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
            ${images.length > 1 ? `
              <button class="carousel-btn carousel-prev" data-carousel="${carouselId}" data-dir="-1" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5"><</button>
              <button class="carousel-btn carousel-next" data-carousel="${carouselId}" data-dir="1" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5">></button>
            ` : ''}
          </div>
          <div class="property-info">
            <strong>${escapeHTML(p.title)}</strong>
            <div class="muted">${escapeHTML(p.neighborhood || '')}, ${escapeHTML(p.city || '')}</div>
            <div><strong>${escapeHTML(p.price)}</strong></div>
            <div class="muted">🛏️ ${p.bedrooms || '--'} | 🚗 ${p.parking || '--'}</div>
            <p class="muted">${escapeHTML((p.description || '').slice(0, 110))}</p>
            <a class="btn hero-whatsapp-btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener" style="width:100%;justify-content:center;margin-top:6px">Falar sobre este imóvel</a>
          </div>
        </div>
      `;
    }).join('');

    // Attach carousel listeners
    document.querySelectorAll('.carousel-btn').forEach(btn => {
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        const wrap = document.getElementById(this.dataset.carousel);
        if(!wrap) return;
        const imgs = wrap.closest('.card').querySelector('.property-info');
        // store current index on the wrap
        let idx = parseInt(wrap.dataset.idx || '0', 10);
        const dir = parseInt(this.dataset.dir, 10);
        // find property
        const pid = parseInt(this.dataset.carousel.replace('car-',''), 10);
        // we need images from the property
        (async ()=>{
          const all = await getAllProperties();
          const prop = all.find(x => x.id === pid);
          if(!prop || !prop.images || !prop.images.length) return;
          const imgsArr = prop.images;
          idx = (idx + dir + imgsArr.length) % imgsArr.length;
          wrap.dataset.idx = idx;
          wrap.querySelector('.carousel-img').src = imgsArr[idx];
        })();
      });
    });
  }

  // ───── Hero Gallery ─────
  function renderHero(){
    const el = document.getElementById('hero-gallery');
    if(!el) return;
    el.innerHTML = SAMPLE_PHOTOS.map(u => `<img src="${u}" alt="casa">`).join('');
  }

  // ───── Filtros e Bairros (Público) ─────
  function attachContact(){
    const cityFilter = document.getElementById('city-filter');
    const neighborhoodFilter = document.getElementById('neighborhood-filter');
    const filterInputs = document.querySelectorAll('[id$="-filter"]');

    if(cityFilter && neighborhoodFilter){
      cityFilter.addEventListener('change', ()=>{
        const neighborhoods = CITY_NEIGHBORHOODS[cityFilter.value] || [];
        neighborhoodFilter.innerHTML = '<option value="">Todos os bairros</option>' + neighborhoods.map(n => `<option value="${n}">${n}</option>`).join('');
        renderPublic();
      });
    }

    filterInputs.forEach(el => {
      el.addEventListener('change', renderPublic);
      el.addEventListener('input', renderPublic);
    });
  }

  // ───── Bairros dinâmicos no admin ─────
  function attachAdminCityNeighborhood(){
    const citySel = document.getElementById('adminCitySelect');
    const neighSel = document.getElementById('adminNeighborhood');
    if(!citySel || !neighSel) return;
    citySel.addEventListener('change', ()=>{
      const list = CITY_NEIGHBORHOODS[citySel.value] || [];
      neighSel.innerHTML = '<option value="">Selecione o bairro</option>' + list.map(n => `<option value="${n}">${n}</option>`).join('');
    });
  }

  // ───── Render Admin ─────
  async function renderAdmin(){
    const el = document.getElementById('admin-properties');
    if(el){
      const props = await getAllProperties();
      el.innerHTML = props.length
        ? props.map(p => {
            const thumb = p.images && p.images.length ? p.images[0] : SAMPLE_PHOTOS[0];
            return `
              <div class="card">
                <img src="${thumb}" style="width:100%;height:130px;object-fit:cover;border-radius:8px;border:1px solid rgba(217,178,77,.35)">
                <div class="property-info">
                  <strong>${escapeHTML(p.title)}</strong>
                  <div class="muted">${escapeHTML(p.rua || '')}, ${escapeHTML(p.numero || '')} — ${escapeHTML(p.neighborhood || '')}, ${escapeHTML(p.city || '')}</div>
                  <div><strong>${escapeHTML(p.price)}</strong></div>
                  <div class="muted">🛏️ ${p.bedrooms || '--'} | 🚗 ${p.parking || '--'} | 📸 ${(p.images||[]).length} fotos</div>
                  <p class="muted">${escapeHTML((p.description || '').slice(0, 100))}</p>
                  <div style="margin-top:8px">
                    <button data-id="${p.id}" class="btn btn-outline del" style="color:#ff6b6b;border-color:rgba(255,107,107,0.3)">Remover</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')
        : '<div class="muted">Nenhum imóvel cadastrado.</div>';
    }

    const leadsEl = document.getElementById('leads');
    if(leadsEl){
      // leads are still stored in localStorage for simplicity
      const leads = (function(){
        try { return JSON.parse(localStorage.getItem('leads') || '[]'); } catch(e){ return []; }
      })();
      leadsEl.innerHTML = leads.length
        ? leads.map(l => `<div class="card"><strong>${escapeHTML(l.name)}</strong><div class="muted">${escapeHTML(l.contact)} • ${new Date(l.created).toLocaleString('pt-BR')}</div><p>${escapeHTML(l.message || '')}</p></div>`).join('')
        : '<div class="muted">Nenhum lead recebido.</div>';
    }
  }

  // ───── Admin Form ─────
  function attachAdminForm(){
    const form = document.getElementById('property-form');
    if(!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);
      const imageFiles = fd.get('images');
      let imagesBase64 = [];

      if(imageFiles && imageFiles instanceof FileList && imageFiles.length > 0){
        imagesBase64 = await filesToBase64List(imageFiles);
      }

      const prop = {
        title: fd.get('title'),
        rua: fd.get('rua') || '',
        numero: fd.get('numero') || '',
        city: fd.get('city'),
        neighborhood: fd.get('neighborhood'),
        price: fd.get('price'),
        bedrooms: parseInt(fd.get('bedrooms'), 10) || 0,
        parking: parseInt(fd.get('parking'), 10) || 0,
        images: imagesBase64.length ? imagesBase64 : [...SAMPLE_PHOTOS],
        description: fd.get('description'),
        createdAt: Date.now()
      };

      await saveProperty(prop);
      form.reset();
      document.getElementById('adminNeighborhood').innerHTML = '<option value="">Selecione o bairro</option>';
      await renderAdmin();
      await renderPublic();
      alert('Imóvel cadastrado com sucesso!');
    });

    document.addEventListener('click', async e => {
      if(e.target.matches('.del')){
        const id = Number(e.target.dataset.id);
        if(!id) return;
        await deleteProperty(id);
        await renderAdmin();
        await renderPublic();
      }
    });
  }

  function escapeHTML(s){
    if(!s) return '';
    return String(s).replace(/[&<>"']/g, c => ({'&':'&','<':'<','>':'>','"':'"',"'":'&#39;'}[c]));
  }

  // ───── Cross-tab sync ─────
  window.addEventListener('storage', async e => {
    if(e.key === 'leads'){
      await renderAdmin();
    }
  });

  window.addEventListener('properties:updated', async ()=>{
    await renderPublic();
    await renderAdmin();
  });

  // ───── Init ─────
  document.addEventListener('DOMContentLoaded', async () => {
    await renderPublic();
    renderHero();
    attachContact();
    attachAdminCityNeighborhood();
    await renderAdmin();
    attachAdminForm();

    const loginModal = document.getElementById('admin-login');
    const adminRoot = document.getElementById('admin-root');

    if(loginModal){
      const session = sessionStorage.getItem('adminAuth');
      if(session === 'true'){
        loginModal.classList.add('hidden');
        adminRoot.classList.remove('hidden');
        await renderAdmin();
      } else {
        adminRoot.classList.add('hidden');
        loginModal.classList.remove('hidden');
        const form = document.getElementById('login-form');
        form.addEventListener('submit', e => {
          e.preventDefault();
          const pw = new FormData(form).get('password');
          if(pw === ADMIN_PASSWORD){
            sessionStorage.setItem('adminAuth', 'true');
            loginModal.classList.add('hidden');
            adminRoot.classList.remove('hidden');
            renderAdmin();
          } else {
            alert('Senha incorreta');
          }
        });
      }
    }
  });
})();